# Changelog

All notable changes to MoonLan, newest first.

Dates are release dates. Every version was verified on the production
network it was written for before the next one started.

Russian version — [CHANGELOG_RU.md](CHANGELOG_RU.md).

---

## v0.6.13 — 2026-09-18

> **A dash means never measured, not quietly expired.**
> Four absences that looked alike, and one that pointed the wrong way.

### Port Counter Freshness

The ports panel lost whole columns of counters and got them back a minute later.

Nothing was wrong with the switches: `current()` dropped every rate older than three counter intervals, the port fell out of the answer, and the panel drew `—` — the same `—` it draws for a column the agent does not implement.

Opposite diagnoses.

A measurement is now reported however old it is, with its age:

* Shown dimmed past three counter intervals.
* Withheld past `stale_rate_hide_minutes` (`30`), where a rate really has become a memory.
* Even then, the empty cell says when the port was last measured.
* Only a port never measured at all gets a bare `—`.

### Counter Cycle Scheduling

Half of why those cycles were being missed: the counters cycle gave up the instant it found a host's lock taken by the scan, and a scan holds a host for as long as its poll budget allows.

Any budget of two intervals or more therefore guaranteed a missed cycle after every scan.

The operator had set `180` against an interval of `60` and made himself four permanently ageing switches.

The counters cycle now waits up to:

```text
min(counters_interval / 2, 20)
```

seconds.

A budget at or above twice the interval is also reported at startup and in `diag --config`, per device.

### Stale Switch Detection

`10.3.7.10` was not polled in full once in six hours:

* 30 scans
* 30 budget failures
* The map still showed it alive from its last complete reading

That is a third state beside **answering** and **down**.

After `stale_switch_scans` (`5`) consecutive scans, the card counts them and dates the reading. A `switch_stale` alarm is raised as a warning, logged to syslog, and cleared by one full poll.

It never becomes `switch_down`.

Sending somebody to look for a dead device that is actually answering wastes the trip.

Each poll now records how long it took, and `diag --config` prints it. A budget set by eye is a budget set wrong.

### STP Root Detection

The STP panel called `mb0` the root while the map drew it as an ordinary switch.

Both read the same fields from the same objects, but at different moments.

`judge_network`, the only test capable of recognising a root reporting zeros about itself, ran after `build_topology` had already decided the node was not operating.

It now runs first.

### SNMP Community Diagnostics

`community: public` went back into the config by accident, every switch went dark, and `diag --walk` said:

> "the subtree is empty, or the agent does not implement it"

Both halves were wrong.

SNMPv2c does not answer a wrong community at all, and that silence is shaped exactly like an unimplemented object.

MoonLan now:

1. Asks `sysDescr`.
2. Pings the host.
3. Uses the result to distinguish an unreachable device from a wrong community.
4. Names the community first when the host answers ICMP and nothing else.

When all switches go silent at once, MoonLan reports it as one fact rather than `N` separate failures.

### STP Tree Grouping

The panel showed two spanning trees, the second one rooted at the string `"unknown"` and holding three RouterOS bridges, with `stp_fragmented` repeatedly raising and clearing over it.

A walk of `1.3.6.1.2.1.17.2` on an RB941 returns the protocol, priority, and whole port table — but none of the scalars in between.

The bridge therefore names no root while its uptime is six weeks and `TimeSinceTopologyChange` is zero. The historical heuristic interpreted that as "converged long ago".

A bridge in a tree knows its root.

Where there is none, the heuristic no longer gets to guess.

The absence of a root is also no longer allowed to become a grouping key. Switches with no root are listed under the table rather than counted as an island.

---

## v0.6.12 — 2026-09-17

> **One slow agent delays itself, not the whole map.**

Four MikroTik boxes joined `switches:` and the map stopped updating.

They were not silent: they answered, taking 272 and 468 seconds each, and the scan waited for the last one. The next scan then returned immediately because that one was still running.

`return_exceptions=True` (v0.6.6) had covered a switch that raises, not one that is slow.

Every request stayed inside `snmp.timeout`; nothing bounded their total duration.

### Per-Switch Host Budgets

`snmp.host_budget_seconds` now provides a per-switch execution budget.

Default:

```yaml
host_budget_seconds: 120
```

A switch that runs past its budget is left out of that scan, allowing the rest of the network to receive its map on time.

It is **not** reported as unreachable.

It answers, only too slowly.

Therefore:

* No `switch_down` alarm is raised.
* Existing `switch_down` alarms are not cleared.
* The last complete reading remains on the map.
* The switch card is dated.
* The header reports how many switches ran out of time.

### Per-Switch SNMP Configuration

A `switches:` entry may now be a mapping:

```yaml
switches:
  - ip: 10.0.0.10
    community: public
    timeout: 5
    retries: 1
    retries_on_break: 2
    host_budget_seconds: 120
```

Supported per-switch settings:

* `community`
* `timeout`
* `retries`
* `retries_on_break`
* `host_budget_seconds`

Everything else is inherited from `snmp:`.

The existing plain list of addresses continues to work unchanged.

A slow box usually wants a **shorter timeout and one retry**, not a longer one. The requests consuming the time are the ones it will never answer.

`diag --config` now prints the settings each switch is actually polled with and marks settings explicitly overridden for that switch.

### Dead OID Cooldown

`1.0.8802.1.1.2.1.4.2.1.3` — the LLDP management-address table — returned zero rows from both RouterOS boxes after the full retry budget, every cycle.

The other thirteen walks on the same devices succeeded.

The agent does not implement the table and cannot say so, whereas an agent that can answer `noSuchObject` does so in one round trip.

After `snmp.dead_oid_strikes` consecutive walks return no rows **and** end in a timeout, that OID is left alone on that host for `snmp.dead_oid_cooldown_scans` scans and then tried again.

Only that exact outcome counts.

A partial answer is handled by `retries_on_break`.

Both edges are logged, and the skipped walk reports:

> "no answer"

rather than an empty table.

Data missing because MoonLan stopped asking must never be mistaken for data the device denies having.

`diag --skipped` asks the running service what is currently paused and for how much longer.

### RouterOS LLDP MAC Handling

Both RouterOS boxes also reported:

> "4 of 4 neighbours sit on a local port that could not be matched to an interface"

`lldpRemLocalPortNum` is `0` on every row there, so the remote table says nothing about the local port.

But that was not what broke placement.

`lldpRemChassisId` announces subtype `macAddress` and then carries seventeen bytes of ASCII instead of six octets. A string is in nobody's forwarding table, so the FDB fallback — which knows all four of these addresses — never got the chance to place them.

A MAC spelled out is still a MAC.

All four neighbours now land on their correct ports.

`lldpRemLocalPortNum` is additionally tried as a bridge-port number, between the forwarding table and the bare `ifIndex`.

### Scan Status

The header now counts switches while a scan runs:

```text
Scanning: 6 of 8
```

`/api/status` carries the same fields.

A scan that gives up waiting for a switch reports that fact in amber, with the affected names available in the tooltip.

Ten minutes of a map that did not move, with nothing in the interface saying why, is what sent the operator to `journalctl`.

---

## v0.6.11 — 2026-09-17

> **One root is one root, and a panel header stays put.**

RSTP went live on the network this project was written for, and the STP panel exposed three of its own defects.

### Bridge ID Parsing

A Bridge ID is a 4-bit priority and a 12-bit system ID extension, not one number.

Some agents put the priority in the low byte.

As a result, one root was read as:

```text
4096/34:0a:...
```

from an HPE and:

```text
16/34:0a:...
```

from an Edge-Core.

The network was consequently reported as having two trees.

Bridge IDs are now parsed according to 802.1t. Shifted encoding is detected, corrected, and logged rather than silently repaired.

Roots are compared by MAC address.

### RSTP Operating-State Detection

Four D-Link switches running RSTP were called "not operating" because the only test was historical:

* topology changes
* or a topology change newer than the switch uptime

A tree switched on an hour ago has neither.

Two tests now come first:

1. A bridge that accepted somebody else's root at a non-zero cost is participating.
2. A switch whose neighbours follow its own address is the root — the one thing a switch cannot establish about itself.

`diag --stp` and the panel now report which test decided the state.

A switch that answers BRIDGE-MIB with nothing meaningful — zero Bridge ID, no topology changes, and no port out of disabled — is reported as exactly that rather than as a tree that failed to converge.

### Shared Panel Layout

A port reported as blocking with no cable in it is not a blocked link. RouterOS reports blocking on every spare socket.

The panel skeleton introduced in v0.6.2 is now a shared class, so the STP, alarms, journal, and details panels keep their header and close button in view while their contents scroll.

### Fragmented STP Trees

`stp_fragmented` now says what it may actually represent:

> Segments whose trunk ports sit in different VLANs form separate trees by design.

The panel lists the VLANs beside each root.

---

## v0.6.10 — 2026-09-14

> **Devices seen through a trunk are grouped beyond it, not on it.**

A device visible only through a trunk is placed on that trunk and marked approximate.

The port is correct; the place behind it is unknown.

Twenty such devices drawn one dot at a time make the port look like twenty computers plugged directly into the switch, mixed in with its real neighbours.

They now receive a container:

```text
Beyond the trunk · N
```

The container expands into the list of devices behind the trunk.

It is deliberately **not** a "switch without SNMP". That node claims a switch exists, while here MoonLan only knows that something exists beyond the trunk.

Pseudo-switches are still never created on a trunk. Many MACs on a trunk are exactly what a trunk is for.

The group hangs off whatever stands on that cable when something does, and never off a switch MoonLan polls. If the devices were behind that switch, they would appear on its downlink ports.

Threshold:

```yaml
trunk_group_threshold: 3
```

---

## v0.6.9 — 2026-09-14

> **A device seen on an uplink is not behind it.**

The switch that reports a MAC address on the cable it came in on is telling you where the device is **not**.

The placement rule had been reading it the other way: the deepest switch in the tree won every claim it could make.

An Edge-Core whose only live port was its own uplink consequently collected twenty devices belonging to the rest of the network.

Placement now considers direction first and depth second.

Additional rules:

* The root's trunks count as pointing down because nothing is above the root.
* A device whose every sighting is on an uplink is not placed.
* Such devices go to **Not on map** rather than being attached to somebody's uplink.

Host placement finally has tests.

The rule had been reordered three times without one, with each fix breaking the case the previous fix had made work.

---

## v0.6.8 — 2026-09-14

> **Identify the model before believing what it reports.**

In SNMPv2c, an agent answers a request for an object it does not implement with a successful reply carrying `noSuchObject`.

A probe that accepts "the agent replied" therefore succeeds on every live device.

Three switches were read from a branch belonging to another vendor and then reported as having their loop protection switched off.

A branch now counts as identified only when it answers with data.

Loop-detection profiles are keyed by the `sysObjectID` each model actually answers with. A D-Link product's private branch is not necessarily under its own identifier.

`unknown` is no longer printed as `switched off`.

Additional fixes:

* An aggregate `ifIndex` that is not present in the interface table is dropped instead of drawing a trunk nobody has.
* A switch MoonLan polls no longer raises `unmanaged bridge` about itself.
* An empty `sysName` no longer captions a node with its address twice.

### Diagnostic Anonymisation

Diagnostic dumps left the repository.

`diag --anonymize` now rewrites reports through documentation ranges:

* RFC 5737
* RFC 7042

A substitution table remains consistent for the entire run.

`docs/diag_example/` contains one anonymised sample of each report.

---

## v0.6.7 — 2026-09-11

### Loop Detection

Loop Detection is read from vendors' private MIBs because there is no standard MIB for it.

Profiles describe a model family:

* The `sysObjectID` it answers with
* Where its branch starts
* Scalar suffixes
* Per-port columns
* The raw status meaning "no loop"

Built-in profiles cover:

* D-Link DGS-1210-26 Rev.F1
* D-Link DES-1210-28/ME
* D-Link DES-3526

Additional profiles can be added in `config.yaml` without changing code.

Loop Detection runs on the counters cycle rather than the ten-minute scan because a loop is an incident.

Only the "no loop" value has been observed on this hardware, so the rule is inverted:

> Anything else raises `loop_detected` with severity `critical` and includes the raw value in the alarm text.

The first real loop documents itself.

A model that reports nothing is shown as reporting nothing — never as "no loops".

---

## v0.6.6 — 2026-09-11

> **One impossible OID stopped the counters for the whole network.**

A synthetic aggregate carries a negative `ifIndex`.

`pyasn1` refuses to build a request for it, and the exception escaped through `asyncio.gather`.

Every column on all five switches was therefore empty for as long as the service ran.

Fixed in four layers.

Offline groups now hang off the bridge on their port instead of beside it.

---

## v0.6.5 — 2026-09-10

A walk that stops answering halfway is now picked back up from the last OID that arrived, up to `snmp.retries_on_break` times.

On a switch with 36 interfaces, the gigabit uplinks at the end of the table were missing in three polls.

A partial answer is now reported as a **partial answer**, rather than `NO ANSWER`.

Ports a resumed walk still misses are fetched individually using the 32-bit counter.

A packet column of zeros beside terabytes of octets is interpreted as unfilled rather than real traffic.

SNMP defaults were raised to:

```yaml
timeout: 5
retries: 2
```

A mean timeout does not look like a timeout further down the line; it looks like a switch that does not implement the OID.

---

## v0.6.4 — 2026-09-10

### Honest Counters

`bytes()` on a pysnmp integer allocates a zero buffer as long as the number.

That is how `diag --walk` asked for 1.49 GB on an octet counter and was killed.

A counter column the agent never answered now reads:

```text
—
```

rather than:

```text
0.0
```

It raises no alarm in either direction.

Each direction independently falls back to its 32-bit counter.

Additional topology fixes:

* A quiet device stays on the port where it lives instead of moving to the core's trunk.
* The external network hangs off the provider's bridge.
* MoonLan's own router port no longer looks like a way out of the network.

---

## v0.6.3 — 2026-09-10

* Readable links and addresses in the cards.
* The address an operator actually uses appears beneath a router's name.
* `uplink_ports` announces itself from the port that looks like an uplink.
* A second MoonLan instance can safely run beside the live service.
* `MOONLAN_CONFIG` provides per-instance configuration.
* SQLite runs in WAL mode for safe concurrent access.

---

## v0.6.2 — 2026-09-10

> **One device, one node.**

A bridge whose MAC is also present in the MAC table of its own port is drawn once, with its name and address, instead of twice.

Additional UI and topology improvements:

* Routers are named and drawn as diamonds.
* Port labels are shown only where they are actual labels rather than firmware templates.
* The ports panel keeps its header and port column in view.
* `uplink_ports` collects everything beyond a provider handover under one node.

---

## v0.6.1 — 2026-09-09

Fixes from the production network, starting with the crash that left it with no map when several bridges shared one port.

Changes include:

* A neighbour is treated as a bridge only when it says it is one.
* A busy access port is no longer called `LLDP forwarding`.
* LLDP neighbours are placed using evidence rather than whichever key matched first.
* 38 rows from one MikroTik are collapsed into one device.
* A failed scan reports its failure in the header instead of displaying an empty map.

---

## v0.6.0 — 2026-09-09

### LLDP

* LLDP neighbours, capabilities, and management addresses.
* Links confirmed by LLDP include a source marker:

  * `fdb`
  * `lldp`
  * `both`
* Bridges MoonLan does not poll are named on the map.
* `unmanaged_bridge_detected` raises when an unmanaged bridge appears behind an access port.

### STP

Honest STP status is the foundation this entire branch grew out of.

A switch with spanning tree disabled still answers every `dot1dStp*` object:

```text
priority = 0
cost = 0
root = itself
```

Reading those values at face value turns five disabled switches into five root bridges.

Root, cost, and root port are now used only for switches that demonstrably run a spanning tree.

Everything else reads:

```text
not operating
```

The reason is retained for `diag --stp`.

### Port Flapping

`port_flapping` detects a link that bounces between two counter polls by reading `ifLastChange` alongside `ifOperStatus`.

### Diagnostics

`diag --walk` was added for exploring private MIBs.

---

## v0.5.8 — 2026-09-07

* MAC confirmation before a new address becomes a device.
* Frame corruption detection for cases where a failing cable causes a switch to learn addresses a few bits away from the real address.
* Placement of devices visible only through trunks.

---

Earlier versions are summarised in the roadmap table of the README and in [docs/ROADMAP.md](docs/ROADMAP.md).
