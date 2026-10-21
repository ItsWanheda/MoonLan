"""Two cables between the same two switches (v0.7.9).

No LAG between them, and spanning tree holds one of the two in
blocking. LLDP is collected per pair, so this used to come out as one
link — whichever cable LLDP listed last, the blocked one as likely as
not — and the other cable was on no map. Both are drawn now: the link
of the tree is the cable that carries traffic, and the other is a link
of its own beside it, marked `parallel`, with its own ports and its own
STP state.
"""

import types
import unittest

from moonlan.lldp import LldpNeighbor
from moonlan.snmp_collector import PortInfo, SwitchData
from moonlan.topology import build_topology, parallel_links

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


if __name__ == "__main__":
    unittest.main()
