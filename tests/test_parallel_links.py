"""Two cables between the same two switches (v0.7.9).

No LAG between them, and spanning tree holds one of the two in
blocking. LLDP is collected per pair, so this used to come out as one
link — whichever cable LLDP listed last, the blocked one as likely as
not — and the other cable was on no map. Both are drawn now: the link
of the tree is the cable that carries traffic, and the other is a link
of its own beside it, marked `parallel`, with its own ports and its own
STP state.

From one end alone, one neighbour on two ports is what forwarded LLDP
looks like, and `analyse_ports` flags both ports. The two ends together
tell a second cable apart (`second_cables`), and only then.
"""

import types
import unittest

from moonlan import demo
from moonlan.lldp import LldpNeighbor, analyse_ports
from moonlan.snmp_collector import PortInfo, SwitchData, aggregate_port
from moonlan.topology import build_topology, parallel_links, second_cables

CORE = "10.0.0.10"
ACCESS = "10.0.0.22"


def switch(ip, name, octet, ports):
    sw = SwitchData(ip=ip, reachable=True, sys_name=name,
                    bridge_mac=f"02:00:00:00:00:{octet:02x}")
    sw.own_macs = {sw.bridge_mac}
    for if_index, port_name in ports.items():
        sw.ports[if_index] = PortInfo(if_index=if_index, name=port_name,
                                      oper_up=True, speed_mbps=1000)
    return sw


def neighbor(local, chassis, remote_port):
    return LldpNeighbor(
        local_ifindex=local, local_port_num=local, port_matched_by="loc_id",
        chassis_id=chassis, chassis_subtype=4, port_id=remote_port,
        port_subtype=5, cap_enabled={"bridge"}, cap_known=True,
    )


def stp_blocking(*names):
    """A running spanning tree holding these ports in blocking."""
    ports = [types.SimpleNamespace(name=name) for name in names]
    return types.SimpleNamespace(
        operating=True, blocking_ports=lambda: ports,
        is_root=lambda own_macs: False,
    )


def two_cables(core_side=True, access_side=True, blocked=("1/28",)):
    """core Gi0/3 — access 1/27 carries traffic; core Gi0/4 — access 1/28
    is the second cable, which STP on the access switch blocks."""
    core = switch(CORE, "core-sw", 1, {i: f"Gi0/{i}" for i in range(1, 27)})
    access = switch(ACCESS, "access-sw", 2, {i: f"1/{i}" for i in range(1, 29)})
    core.fdb[access.bridge_mac] = 3
    access.fdb[core.bridge_mac] = 27
    if core_side:
        # the blocked cable first: LLDP order must not decide
        core.lldp_neighbors = [neighbor(4, access.bridge_mac, "1/28"),
                               neighbor(3, access.bridge_mac, "1/27")]
    if access_side:
        access.lldp_neighbors = [neighbor(28, core.bridge_mac, "Gi0/4"),
                                 neighbor(27, core.bridge_mac, "Gi0/3")]
    access.stp = stp_blocking(*blocked)
    return [core, access]


def as_collected(switches):
    """lldp_forwarded and lldp_crowded, set the way the collector sets
    them: each switch on its own"""
    for sw in switches:
        sw.lldp_forwarded, sw.lldp_crowded = analyse_ports(
            sw.lldp_neighbors, lambda i, sw=sw: aggregate_port(sw, i), sw.fdb
        )
    return switches


def links_between(switches):
    _, links, *_ = build_topology(switches)
    return sorted(links, key=lambda link: bool(link.get("parallel")))


def ends(link):
    """(core's port, access's port), whichever way the link points."""
    ports = {link["a"]: link["a_port"], link["b"]: link["b_port"]}
    return ports[CORE], ports[ACCESS]


class ParallelLinksTest(unittest.TestCase):
    def test_both_cables_are_drawn(self):
        main, second = links_between(two_cables())
        self.assertEqual({main["a"], main["b"]}, {second["a"], second["b"]})
        # the link of the tree is the cable that carries traffic…
        self.assertEqual(ends(main), ("Gi0/3", "1/27"))
        self.assertFalse(main.get("stp_blocking"))
        self.assertNotIn("parallel", main)
        # …and the blocked one is beside it, with its own ports
        self.assertEqual(ends(second), ("Gi0/4", "1/28"))
        self.assertTrue(second["parallel"])
        self.assertTrue(second["stp_blocking"])
        self.assertEqual(second["source"], "lldp")
        self.assertEqual(second["speed_mbps"], 1000)

    def test_seen_from_one_end_only(self):
        for kwargs in ({"access_side": False}, {"core_side": False}):
            with self.subTest(**kwargs):
                links = links_between(two_cables(**kwargs))
                self.assertEqual(len(links), 2)
                self.assertEqual({ends(link) for link in links},
                                 {("Gi0/3", "1/27"), ("Gi0/4", "1/28")})

    def test_one_cable_seen_from_both_ends_is_one_link(self):
        switches = two_cables()
        core, access = switches
        core.lldp_neighbors = core.lldp_neighbors[1:]
        access.lldp_neighbors = access.lldp_neighbors[1:]
        self.assertEqual(len(links_between(switches)), 1)

    def test_a_lacp_bundle_stays_one_link(self):
        switches = two_cables(blocked=())
        core, access = switches
        # both cables are members of one aggregate on each side
        core.ports[100] = PortInfo(if_index=100, name="Po1", oper_up=True,
                                   speed_mbps=2000)
        access.ports[100] = PortInfo(if_index=100, name="Po1", oper_up=True,
                                     speed_mbps=2000)
        core.lag_members = {3: 100, 4: 100}
        access.lag_members = {27: 100, 28: 100}
        links = links_between(switches)
        self.assertEqual(len(links), 1)
        self.assertEqual(links[0]["lag"]["count"], 2)

    def test_the_second_cable_is_a_trunk(self):
        _, _, _, _, _, _, info = build_topology(two_cables())
        self.assertIn("Gi0/4", info["trunk_names"][CORE])
        self.assertIn("1/28", info["trunk_names"][ACCESS])

    def test_nothing_without_a_link(self):
        self.assertEqual(parallel_links(two_cables(), []), [])


class SecondCableOrForwardingTest(unittest.TestCase):
    def test_each_end_alone_sees_forwarding(self):
        core, access = as_collected(two_cables())
        self.assertEqual(core.lldp_forwarded, {3, 4})
        self.assertEqual(access.lldp_forwarded, {27, 28})

    def test_both_ends_together_see_two_cables(self):
        switches = as_collected(two_cables())
        self.assertEqual(second_cables(switches), {CORE: {3, 4}, ACCESS: {27, 28}})
        main, second = links_between(switches)
        self.assertEqual(ends(main), ("Gi0/3", "1/27"))
        self.assertEqual(main["source"], "both")
        self.assertEqual(ends(second), ("Gi0/4", "1/28"))
        self.assertTrue(second["parallel"])
        # the ports panel and the cards say the same as the map
        core, access = switches
        self.assertEqual((core.lldp_forwarded, access.lldp_forwarded),
                         (set(), set()))

    def assertForwarding(self, switches):
        self.assertEqual(second_cables(switches), {})
        core, _ = switches
        build_topology(switches)
        self.assertEqual(core.lldp_forwarded, {3, 4})

    def test_one_far_port_on_two_near_ones_is_forwarding(self):
        switches = two_cables()
        core, access = switches
        # the same frame of the same far port, on two ports of the core
        core.lldp_neighbors = [neighbor(3, access.bridge_mac, "1/27"),
                               neighbor(4, access.bridge_mac, "1/27")]
        access.lldp_neighbors = [neighbor(27, core.bridge_mac, "Gi0/3")]
        self.assertForwarding(as_collected(switches))

    def test_one_end_alone_is_not_enough(self):
        self.assertForwarding(as_collected(two_cables(access_side=False)))

    def test_a_port_with_a_talker_of_its_own(self):
        switches = two_cables()
        core, _ = switches
        core.lldp_neighbors.append(neighbor(4, "02:00:00:00:00:99", "ether1"))
        self.assertForwarding(as_collected(switches))

    def test_nothing_blocked_is_no_second_cable(self):
        # two cables with nothing in blocking would be a loop
        self.assertForwarding(as_collected(two_cables(blocked=())))

    def test_the_far_switch_behind_a_third_port(self):
        switches = two_cables()
        core, access = switches
        core.fdb[access.bridge_mac] = 9
        self.assertForwarding(as_collected(switches))


class DemoTest(unittest.TestCase):
    def test_the_demo_has_two_cables_between_two_switches(self):
        # the demo's own warnings (a switch reporting a LAG it has not,
        # one nobody sees) are not this test's business
        with self.assertLogs("moonlan", "WARNING"):
            _, links, *_ = build_topology(demo.demo_network())
        pair = [link for link in links
                if {link["a"], link["b"]} == {"10.0.0.10", "10.0.0.22"}]
        self.assertEqual(len(pair), 2)
        main, second = sorted(pair, key=lambda link: bool(link.get("parallel")))
        self.assertFalse(main.get("stp_blocking"))
        self.assertEqual(main["source"], "both")
        self.assertTrue(second["parallel"])
        self.assertTrue(second["stp_blocking"])
        self.assertIn(demo.SECOND_CABLE_NAME, (second["a_port"], second["b_port"]))


if __name__ == "__main__":
    unittest.main()
