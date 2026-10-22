/* MoonLan UI strings (English only).
   Placeholders like {name} and {n} are substituted by fmt() in app.js. */

const I18N = {
  en: {
    title: "MoonLan — network map",
    tagline: "local network map",
    journalBtn: "Journal",
    sidebarToggle: "List and search",
    freezeBtn: "Freeze layout",
    portLabelsBtn: "Port numbers on the lines: {mode}",
    portLabelsMenu: "Port numbers on the lines",
    portLabels_off: "Off",
    portLabels_selected: "For the selection",
    portLabels_all: "Everywhere",
    portLabelsNumbers: "Numbers only",
    layoutPinnedMark: "pinned: {n}",
    layoutPinnedHint:
      "Pinned nodes stay where they are for everyone, and only they are "
      + "kept. Everything else is laid out again on every load, starting "
      + "next to the pinned ones; the groups and switches round a pinned "
      + "node start where they stood when it was pinned. To pin or unpin "
      + "a node, use Arrange or press P with it selected.",
    menuPin: "Pin",
    menuUnpin: "Unpin",
    menuRememberNeighbours: "Remember the places around it",
    reasonNoNeighbours: "no groups or switches around it",
    neighboursRemembered: "Places around it remembered: {n}",
    menuOpenCard: "Open card",
    menuOpenPorts: "Ports",
    menuSelected: "{n} nodes selected",
    menuPing: "Ping",
    menuTraceroute: "Traceroute",
    menuPingGroup: "Ping the devices here ({n})",
    menuPingSelection: "Ping the selection ({n})",
    menu_web: "Web interface",
    menu_ssh: "SSH",
    menu_rdp: "Remote desktop (.rdp)",
    menuCopyIp: "Copy IP",
    menuCopyMac: "Copy MAC",
    reasonNo_ip: "IP unknown",
    reasonNo_mac: "MAC unknown",
    reasonNo_name: "no name known",
    reasonNo_switch: "switch unknown",
    reasonNo_port: "port unknown",
    reasonNoService: "no connection to the service",
    reasonNoPing: "no ping on the server",
    reasonNoTraceroute: "no traceroute on the server",
    reasonNoDevices: "no devices here",
    reasonTooMany: "{n} nodes: at most {limit} per action (context_menu.max_targets)",
    copied: "Copied: {text}",
    copyFailed: "Could not copy {text}",
    actionsNodes: "{n} nodes",
    actionStarting: "Starting…",
    actionRunning: "Running on the MoonLan server…",
    actionDone: "Done",
    actionSimulated: "Demo mode: nothing is sent to the network, the result is simulated.",
    actionTarget: "Target",
    actionThisRun: "This run: 4 packets from the MoonLan server",
    actionMonitor: "Continuous monitoring",
    actionTool: "Tool",
    pingSummary: "Answered: {n} of {total}",
    pingLoss: "loss {loss}% ({received} of {sent} answered)",
    pingRtt: "RTT min / avg / max",
    ms: "ms",
    colNode: "Node",
    colLoss: "Loss",
    colRtt: "Avg RTT",
    colVerdict: "Result",
    monitorNone: "not monitored",
    monitorUp: "answering; last reply {time}",
    monitorDown: "not answering; last reply {time}",
    monitorNever: "not answering; it never has",
    verdictOk: "answers",
    verdictPartial: "losses",
    verdictNoReply: "no reply",
    verdictNoIp: "IP unknown",
    verdictTimeout: "timed out",
    verdictFailed: "failed",
    refuseTooMany: "{n} nodes selected, but one action may name at most {limit} (context_menu.max_targets). Select fewer.",
    refuseBusy: "The server is already running {limit} checks, which is the ceiling (context_menu.max_running). Try again in a few seconds.",
    refuseNoTool: "There is no {tool} on the MoonLan server.",
    refuseAddress: "The server takes node ids, not addresses: {list}",
    refuseUnknown: "The server does not know these nodes — the map may be older than its last scan; reload the page: {list}",
    refuseJobGone: "The server no longer keeps this result.",
    refuseTraceOne: "Traceroute runs to one node at a time.",
    refuseOther: "The server refused: {error}",
    arrangeBtn: "Arrange",
    arrangeOnBtn: "Arranging",
    arrangeHint:
      "In arrange mode dragging a node pins it at the new spot, and the "
      + "right button unpins it. Outside it a dragged node goes back to "
      + "the physics \u2014 except a pinned one: it stays pinned at the "
      + "new spot.",
    resetLayoutBtn: "Reset layout",
    pinnedMark: "\ud83d\udccc",
    pinnedHint:
      "A user pinned this node by hand. The physics does not move it, "
      + "and its position is kept on the map's server.",
    pinnedHintShort: "This node is pinned",
    hintMore: "More",
    unpinBtn: "Unpin this node",
    unpinConfirm: "Unpin \u201c{node}\u201d and give it back to the layout engine?",
    resetLayoutConfirm:
      "Forget every saved position, for everyone? The map will lay "
      + "itself out from scratch, and pinned nodes will lose their "
      + "places. This cannot be undone.",
    unfreezeBtn: "Unfreeze",
    rescanBtn: "Rescan network",
    searchPlaceholder: "Search: name, IP, MAC or manufacturer…",
    switchesHeader: "Switches",
    devicesHeader: "Devices",
    journalTitle: "Event journal",
    noEvents: "No events yet",
    emptyLine1: "The map is empty.",
    emptyLine2:
      "Add switches to <code>config.yaml</code> and choose " +
      "“Rescan network” in the Actions menu (⋯), or start the service with " +
      "<code>MOONLAN_DEMO=1</code> to see a demo network.",
    scanning: "Scanning the network…",
    scanningShort: "scan {done}/{total}",
    scanningShortStart: "scanning…",
    scanFailedShort: "failed {time}",
    serviceOfflineShort: "offline",
    arrangePinned: "Pinned: {n}.",
    scanPrefix: "Last scan: ",
    scanFailed: "Last scan failed: ",
    noData: "No data yet",
    close: "Close",
    ev_new_mac: "New device",
    ev_host_down: "Host down",
    ev_host_up: "Host back online",
    ev_alarm_raised: "Alarm raised",
    ev_alarm_cleared: "Alarm cleared",
    name: "Name",
    ipAddr: "IP address",
    macAddr: "MAC address",
    bridgeMac: "Bridge MAC",
    switchLabel: "Switch",
    portLabel: "Port",
    vlan: "VLAN",
    lastReply: "Last reply",
    firstSeen: "First seen",
    portsUpTotal: "Ports (up/total)",
    descr: "Description",
    speed: "Speed",
    pseudoTitle: "Switch without SNMP",
    pseudoHint:
      "An unmanaged switch or access point is visible behind this port " +
      "({n} devices).",
    devicesBehindPort: "Devices behind port",
    devicesCount: "{n} ({live} seen right now)",
    portOnSide: "Port on {name} side",
    linkSource: "Source",
    srcLldp: "LLDP",
    srcFdb: "MAC tables",
    srcBoth: "LLDP and MAC tables",
    srcHintLldp:
      "Both devices announce each other over LLDP: the link and the "
      + "ports on both ends are their own statement, not an inference.",
    srcHintFdb:
      "Inferred from the MAC address tables. The devices do not "
      + "announce each other over LLDP (it may be off, or the frames "
      + "may not reach), so the ports are the best available guess.",
    chassisId: "Chassis ID",
    mgmtIp: "Management address",
    remotePort: "Port on the neighbour",
    capabilities: "Capabilities",
    capsUnknown: "not announced",
    bridgeHint:
      "LLDP reports a bridge behind this port — a switch MoonLan does "
      + "not poll. It was not configured here; the devices behind it "
      + "hang off this node.",
    bridgeHintShort: "An unpolled switch known from LLDP",
    lldpUnknownHint:
      "An LLDP device that announces no capabilities (the optional TLVs "
      + "are disabled on it). The absence of the bridge flag proves "
      + "nothing about what it is, so it gets no node of its own and "
      + "raises no alarm — it is listed on its port instead.",
    al_unmanaged_bridge_detected: "Unmanaged bridge",
    bridgeSharesPortHint:
      "Several LLDP devices answer behind this port, so an unmanaged "
      + "switch sits on the cable and they hang off it. The devices on "
      + "the port stay with that switch: nothing says which bridge each "
      + "of them is behind.",
    bridgeSharesPortHintShort: "Several LLDP devices on the port: an unmanaged switch is behind it",
    lldpLabel: "LLDP",
    lldpUnidentified: "unidentified LLDP device",
    lldpCrowded: "several LLDP devices",
    lldpCrowdedHint:
      "Several LLDP devices answer behind this port, so an unmanaged "
      + "switch sits on the cable. They are all real and all shown — "
      + "but which of them is on the cable itself cannot be told, so no "
      + "link is drawn from this port.",
    lldpCrowdedHintShort: "Several LLDP devices on the port, so no link is drawn from it",
    portLabelName: "Port name configured on the switch (LLDP)",
    andMore: "and {n} more",
    sameDevice: "Same device as",
    kind_router: "router",
    kind_access_point: "access point",
    kind_phone: "phone",
    kind_bridge: "bridge",
    kind_repeater: "repeater",
    kind_station: "end station",
    kind_other: "device",
    kind_unknown: "unidentified LLDP device",
    nameFromLldpHint:
      "The caption comes from LLDP: the device named itself, but no ARP "
      + "table gave it an address and reverse DNS has no record of it. "
      + "Routers are deliberately kept out of the host inventory.",
    nameFromLldpHintShort: "Name from LLDP: the IP address and DNS name are unknown",
    externalNetwork: "External network",
    externalPort: "external uplink",
    externalHint:
      "This port leaves the network — a provider handover or an uplink "
      + "to someone else's equipment (config.uplink_ports). What is "
      + "behind it is collected under one node instead of being drawn "
      + "device by device, and switches there raise no alarms: they are "
      + "the boundary, not something anyone forgot to configure.",
    externalHintShort: "Network boundary: a provider handover or someone else's equipment",
    bridgeAssumedHint:
      "Probably a bridge — an inference, not the device's own claim. "
      + "This switch reports LLDP capabilities for no neighbour at all, "
      + "so the empty field says nothing; the device was taken for a "
      + "bridge because it announced a system name and a management "
      + "address. Its alarm is raised at info for the same reason.",
    bridgeAssumedHintShort: "A bridge by inference: the device does not say so itself",
    routerAddr: "Router address (routers:)",
    uplinkHintChip: "way out?",
    uplinkWhy_public_address: "A device behind this port answers at {ip}.",
    uplinkWhy_foreign_subnet:
      "{name} is managed at {ip}, in a subnet MoonLan sees nowhere else, "
      + "and nothing of ours answers behind this port.",
    uplinkHint:
      "This looks like a way out of the network. Add "
      + "\"{switch}:{port}\" to uplink_ports in config.yaml and the "
      + "devices behind it will be collected under one \"External "
      + "network\" node, with no bridge alarms raised there.",
    colNoAnswer:
      "The switch did not answer for this counter ({oids}), so the "
      + "column shows \u2014 rather than 0. Unknown is not zero: no alarm "
      + "is raised or cleared on it either.",
    remembered: "from the inventory",
    fromSaved: "from a saved reading",
    readingFrom: "Reading taken",
    hostFromSavedHint:
      "{switch} did not finish its poll inside the budget, so this "
      + "device is drawn where the last reading that did arrive put it, "
      + "taken at {time}. Nobody has looked for it since: \u201clast "
      + "seen\u201d above is the last time it really was found, and it "
      + "is not moving while this lasts. Cables do not change every ten "
      + "minutes, which is why the place is still shown \u2014 but a "
      + "copy of a reading is not an observation.",
    hostFromSavedHintShort: "Location from the reading of {time}: {switch} did not fit its poll budget",
    rememberedHint:
      "The MAC is visible only on trunk ports right now, but the "
      + "inventory knows the port this device sits on, so it is drawn "
      + "there rather than guessed onto a trunk.",
    rememberedHintShort: "Port from the inventory: seen only on a trunk right now",
    offlineGroupGuessHint:
      "These devices are missing from the current switch tables and the "
      + "port shown is a trunk — nothing was ever seen there as a "
      + "device, so this location is inherited guesswork rather than a "
      + "record of where they were last seen.",
    offlineGroupGuessHintShort: "Missing from the switch tables; the port is an inherited guess",
    behindBridge: "Behind",
    colPartial:
      "The switch answered for this counter ({oids}) and then stopped "
      + "partway through the table; {filled} port(s) were read one at a "
      + "time from the 32-bit counter instead. Any port still showing "
      + "\u2014 is unknown, not zero.",
    lldpNeighbour: "LLDP neighbour",
    lldpForwarded: "LLDP forwarded",
    lldpForwardedHint:
      "This LLDP did not come from the cable: the same neighbour is on "
      + "another port, or its MAC sits in the switch's forwarding table "
      + "behind a different one. LLDP frame forwarding is most likely "
      + "enabled. The data is unreliable and is not used to draw links.",
    lldpForwardedHintShort: "These LLDP frames did not come from the cable and are not used for links",
    stpBtn: "STP",
    stpTitle: "Spanning tree",
    stpHint:
      "A switch with STP disabled still answers every dot1dStp* object: "
      + "priority 0, cost 0 and itself as the root. Root, cost and root "
      + "port are therefore shown only where the tree demonstrably "
      + "operates — at least one port enabled and not disabled, and a "
      + "topology change that actually happened.",
    stpState: "State",
    stpStateOff: "not operating",
    stpStateMember: "in the tree",
    stpStateRoot: "root bridge",
    stpPriority: "Priority",
    stpRoot: "Root",
    stpCost: "Cost to root",
    stpRootPort: "Root port",
    stpChanges: "Topology changes",
    stpLastChange: "Since the last one",
    stpRootMark: "STP root",
    stpBlocking: "BLOCKING",
    linkOrderUnknown:
      "The order of the switches behind this port could not be worked "
      + "out: their MAC tables do not show each other, and neither side "
      + "reports the other over LLDP. They are all drawn on the nearest "
      + "known switch, which is where they are reachable through \u2014 "
      + "not necessarily what they are plugged into. A dashed line means "
      + "a guess at the order, not a measured cable.",
    linkOrderUnknownShort: "The order of the switches behind the port is unknown; the dashed line is a guess",
    linkCycleUnresolved:
      "This link is part of a ring among polled switches in which no "
      + "port is held in discarding by the spanning tree. One of its "
      + "links is wrong, and nothing in the data says which \u2014 so "
      + "none was removed, and all of them are marked rather than shown "
      + "as facts.",
    linkCycleUnresolvedShort: "A ring with no blocked port: one of its links is wrong",
    linkStpBlocking:
      "The spanning tree is holding a port of this link in discarding, "
      + "so it carries no traffic. A ring with a blocked port is what a "
      + "working network with a physical ring looks like.",
    switchLinks: "Links ({n})",
    stpRootless:
      "Answer dot1dStp* and name no root: {switches}. Their port tables "
      + "are real, but they do not implement the objects that hold the "
      + "root \u2014 RouterOS is one such agent. A bridge in a tree "
      + "knows its root, so these are not counted as a spanning tree of "
      + "their own, and they do not make the network fragmented.",
    stpBlockingHint:
      "Spanning tree holds this port in the blocking state: the link "
      + "exists but carries no user traffic. It is the standby path of "
      + "a redundant pair.",
    stpBlockingHintShort: "STP holds the port in blocking: a standby path",
    stpVerdictNone: "STP is not running anywhere in this network",
    stpVerdictSingle: "One spanning tree, root {root}",
    stpVerdictFragmented: "The tree is fragmented: {n} separate roots",
    stpFragmentedVlanHint:
      "Several roots on a physically connected network is not "
      + "necessarily a fault. BPDUs are untagged and are handled in "
      + "the VLAN of the port they arrive on, so segments whose trunk "
      + "ports sit in different VLANs form separate trees by design "
      + "and never meet. Check the VLAN membership of the trunk ports "
      + "before treating this as damage.",
    stpBridgeIdFixed:
      "This switch reports the Bridge ID with the priority in the low "
      + "byte, where the standard puts it in the high one — its own "
      + "reading of the number is 256 times smaller. MoonLan shows the "
      + "corrected value, which is why it differs from the switch's "
      + "own web interface.",
    al_stp_root_changed: "STP root changed",
    al_stp_topology_change: "STP topology changes",
    al_stp_fragmented: "STP fragmented",
    al_port_flapping: "Port flapping",
    al_loop_detected: "Loop detected",
    al_loop_detection_disabled: "Loop detection off",
    colLoop: "Loop",
    loopOk: "none",
    loopYes: "LOOP",
    loopNoData: "no data",
    loopOff: "\u2014",
    loopRawHint:
      "Loop Detection reports {raw} for this port. Only the value that "
      + "means \u201cno loop\u201d is known for this model, so anything "
      + "else is read as a loop \u2014 the raw value is in the alarm so "
      + "the first real one documents itself.",
    loopOffHint:
      "Loop Detection is switched off for this port on the switch "
      + "itself, so nothing here is being watched.",
    loopNoDataHint:
      "No status arrived for this port. That is unknown, not "
      + "\u201cno loop\u201d.",
    loopMark: "LOOP",
    loopDetection: "Loop Detection",
    loopCardOn: "on, interval {interval} s, recovery {recover} s",
    loopCardOff: "switched off on the switch",
    loopCardUnknown: "state unknown \u2014 the switch did not report it",
    loopCardLoop: "LOOP on {ports}",
    loopCardUnsupported: "the model does not report it over SNMP",
    loopCardNotPolled: "no data yet \u2014 the counters cycle has not run since the last scan",
    loopCardPartial: "answered only in part \u2014 some ports are unknown",
    loopUnsupportedHint:
      "This switch model keeps no loop-detection state in any MIB "
      + "MoonLan can read, so nothing is claimed about it in either "
      + "direction. Its sysObjectID is {oid} \u2014 see \u201cLoop "
      + "Detection\u201d in the README for how to walk the private "
      + "branch and add a profile to config.yaml.",
    loopUnsupportedHintShort: "The loop-detection state of this model is unknown",
    loopProfileHint: "profile {profile}, matched by {how}",
    dataFrom: "Data from",
    staleSwitchScans: "{n} scans running without a full poll",
    staleSwitchHint:
      "This switch has answered but not finished a full poll for {n} "
      + "scans running, so everything on this card is from {time}. It is "
      + "reachable \u2014 no \u201cswitch down\u201d alarm is raised for "
      + "it \u2014 but its numbers have stopped moving. Its poll budget "
      + "is too small for it: give it more time, or a shorter SNMP "
      + "timeout of its own so the requests it never answers are given "
      + "up on sooner. See switches: and snmp.host_budget_seconds in "
      + "config.yaml.",
    staleSwitchHintShort: "Data from {time}: a full poll has not finished for {n} scans running",
    al_switch_stale: "Switch data not refreshing",
    ageUnderMinute: "less than a minute ago",
    ageMinutes: "{n} min ago",
    ageHours: "{h} h ago",
    ageHoursMinutes: "{h} h {n} min ago",
    rateMeasured:
      "Measured {when}. The counters cycle has not reached this switch "
      + "since \u2014 it is being scanned, or it answers slowly. The "
      + "number is real, only not current.",
    rateTooOld:
      "Last measured {when}. That is too long ago to show as a rate, so "
      + "the cell is empty \u2014 but this port has been measured, "
      + "which a port that never has never says. See "
      + "stale_rate_hide_minutes in config.yaml.",
    scanningProgress: "Scanning: {done} of {total}",
    scanOverBudgetMark: "\u00b7 {n} switch(es) ran out of time",
    scanOverBudgetHint:
      "These switches did not finish answering inside their poll "
      + "budget, so their part of the map is from an earlier scan: "
      + "{switches}. They are not unreachable \u2014 they answer, only "
      + "too slowly \u2014 and no alarm is raised for them. Their cards "
      + "say when their data was taken.",
    serviceOffline: "No connection to the service · data from {time}",
    serviceOfflineHint:
      "The page is not getting answers from MoonLan \u2014 it may be "
      + "restarting, or this machine has lost the route to it. The map "
      + "is the last picture that arrived, and it is not being "
      + "refreshed. This says nothing about the switches: they are not "
      + "being polled from here right now, that is all. Polling "
      + "continues, and the notice clears by itself.",
    overBudgetHint:
      "This switch did not finish answering inside its poll budget, so "
      + "everything on this card is the last reading that did arrive, "
      + "taken at {time}. That is not the same as the switch being "
      + "unreachable \u2014 it answers, only too slowly \u2014 and no "
      + "\u201cswitch down\u201d alarm is raised for it. Give it more "
      + "time or a shorter SNMP timeout of its own: see "
      + "snmp.host_budget_seconds in config.yaml.",
    overBudgetHintShort: "Data from {time}: the switch did not fit its poll budget",
    portFlapping: "flapping",
    portFlappingHint:
      "The port has changed link state {n} time(s) inside the window; "
      + "the last transition was {when}. A cable, a connector, a dying "
      + "transceiver — or someone unplugging it.",
    lagAggregate: "Aggregate (LACP)",
    portsOf: "Ports of {name}",
    lacp: "LACP",
    lagTrunk: "LAG trunk",
    gbps: "Gbit/s",
    mbps: "Mbit/s",
    portsBtn: "Ports",
    portsTitle: "Ports — {name}",
    colPort: "Port",
    colSpeed: "Speed",
    colIn: "In, Mbit/s",
    colOut: "Out, Mbit/s",
    colErr: "Err/min",
    colDisc: "Disc/min",
    errTooltip:
      "Damaged frames: bad cable or patch cord, duplex mismatch, a dying "
      + "transceiver. Rare on healthy hardware — worth looking into.",
    discTooltip:
      "Frames dropped on purpose or for lack of buffer: VLAN filtering, "
      + "storm control, traffic bursts. Usually normal.",
    openPortsLink: "Open switch ports",
    alarmsBtn: "Alarms",
    alarmsTitle: "Alarms",
    alarmsActive: "Active",
    alarmsCleared: "Recently cleared",
    noAlarms: "None",
    al_host_down: "Host down",
    al_switch_down: "Switch down",
    al_port_errors: "Port errors",
    al_port_discards: "Port discards",
    al_port_util: "High port load",
    al_new_mac: "New device",
    clearedAt: "cleared ",
    durS: "s",
    durM: "m",
    durH: "h",
    monitorBtn: "Monitor",
    al_port_hosts_down: "Mass host outage",
    al_lag_degraded: "LAG degraded",
    al_port_frame_corruption: "Frame corruption",
    suspectMacs: "Suspected frame corruption: {n} addresses",
    suspectMacsHint:
      "The MAC table of this port holds addresses a few bits away from "
      + "a real one: the switch learned them from damaged frames. Check "
      + "the cable, the patch cord and the port itself.",
    lagMembersShort: "({active}/{total} members)",
    clearBtn: "Clear",
    clearConfirm: "Clear this alarm?",
    flapChip: "FLAP",
    flapTooltip: "Notifications muted: {n} raises in {h} h",
    lastRaiseLabel: "last raise",
    lastSeenLabel: "Last seen",
    lastArpLabel: "Last ARP entry",
    ipConfirmedLabel: "IP confirmed (ARP)",
    ipNotConfirmed: "not confirmed",
    randomMac: "random MAC",
    vendorLabel: "Manufacturer",
    vendor_unregistered: "not in the IEEE register",
    vendor_local: "random or hand-set address",
    vendor_group: "group address",
    vendor_no_registry: "register not loaded",
    vendorNoRegistryHint: "The IEEE register of MAC blocks is not on the server. An administrator loads it there: {command}",
    randomMacHint:
      "A locally administered address. Phones and laptops randomize it "
      + "per network, so such devices keep reappearing under new MACs.",
    staleButAliveHint:
      "The MAC is missing from the switch tables, but the address is "
      + "answering: the device may have changed its MAC or it sits "
      + "behind equipment MoonLan does not poll.",
    staleButAliveHintShort: "The MAC is gone from the tables, but the address answers",
    approximate: "approximate",
    approximateHint:
      "Approximate location: the MAC address is visible only on trunk "
      + "ports, so the device sits behind a switch MoonLan does not poll. "
      + "It is drawn on the trunk it was seen through.",
    approximateHintShort: "Approximate location: seen only on a trunk",
    approximateWhy:
      "Seen on the downlink trunk {switch} {port} — the side of that "
      + "cable that leads away from the root, which is why the device "
      + "is drawn behind it.",
    uplinkOnlyHint:
      "Seen only on uplink ports, so the exact place is unknown. A MAC "
      + "address on an uplink says the device is on the far side of "
      + "that cable — not behind the switch that reported it — so "
      + "nothing here can be drawn.",
    uplinkOnlyHintShort: "Seen only on uplinks, location unknown",
    uplinkOnlySeenOn: "Seen on",
    ev_ip_released: "IP address released",
    staleHint:
      "The MAC address is missing from the current switch tables — " +
      "the device is shown at the port where it was seen last.",
    unlocatedHeader: "Not on map",
    unlocatedHint:
      "The device is known from ARP but was not found on any port of " +
      "the polled switches — it is most likely behind a router or an " +
      "unpolled switch.",
    unlocatedHintShort: "Known from ARP, not found on the polled switches' ports",
    offMapHint:
      "The MAC address has not shown up in any switch table for a " +
      "while; the device stays in the inventory until the retention " +
      "window ends.",
    ev_hosts_purged: "Old hosts removed",
    ev_link_dropped: "Link withdrawn",
    ev_layout_saved: "Layout saved",
    ev_layout_cleared: "Layout reset",
    ev_layout_pinned: "Pinned",
    ev_layout_released: "Unpinned",
    evNodes: "{n}: {names}",
    evNodesMore: "{n}: {names} and {more} more",
    al_tls_cert_expiring: "Certificate ending",
    ev_monitor_on: "Monitoring on",
    ev_monitor_off: "Monitoring off",
    evBy: "by {user}",
    evConsole: "the server console",
    noticeOpen: "Sign-in is not set up — the map is open to everyone.",
    noticeOpenHint: "To create an administrator, run on the server:",
    noticeHttp: "The connection is not protected: the password and the session cross the network in clear text.",
    noticeHttpsAt: "The protected address: {link}",
    role_viewer: "Viewer",
    role_user: "User",
    role_admin: "Administrator",
    reasonNeedRole: "needs the role “{role}”",
    reasonSignInOff: "sign-in is not set up yet",
    dragNotSaved: "Not saved: moving a pinned node needs the role “{role}”",
    usersBtn: "Users",
    moreBtn: "Actions",
    reasonScanning: "a scan is already running",
    logoutBtn: "Sign out",
    userChipHint: "Your account: password, second factor",
    signInTitle: "Sign in to MoonLan",
    signInAgain: "The session has ended. Sign in again — the map carries on where it was.",
    fieldName: "Name",
    fieldPassword: "Password",
    signInBtn: "Sign in",
    codeTitle: "Second factor",
    codeHint: "The 6-digit code from the app or the key — or one of the recovery codes.",
    codeHintKey: "Touch your key — or, if it is lost, type one of the recovery codes.",
    codeHintKeyOff: "The second factor of this account is a key, and signing in with a key is off on this server. Type one of the recovery codes, or ask an administrator: python -m moonlan.users reset-passkeys <name>.",
    signInKeyBtn: "Sign in with a key",
    useKeyBtn: "Use the key",
    fieldCode: "Code",
    confirmBtn: "Confirm",
    backBtn: "Back",
    httpSignIn: "The connection is not encrypted (HTTP): the password crosses the network in clear text.",
    httpsSignIn: "This map is served over HTTPS, and a password sent over plain HTTP is not accepted. Sign in at {link}",
    err_https_required: "A password is not accepted over plain HTTP here. Sign in at the protected address.",
    err_invalid_credentials: "Wrong name or password.",
    err_locked: "The account is locked after too many failed attempts. Try again in {minutes} min, or ask an administrator to unlock it.",
    err_too_many_attempts: "Too many attempts from this computer. Wait {seconds} s.",
    err_disabled: "This account is disabled.",
    err_invalid_code: "Wrong code.",
    err_code_used: "This code has been used already — wait for the next one.",
    err_ticket_expired: "The time for the code ran out. Sign in again.",
    err_sign_in_off: "Sign-in is not set up.",
    err_sign_in_required: "Sign in first.",
    err_wrong_password: "Wrong password.",
    err_too_short: "At least 10 characters.",
    err_too_long: "Too long.",
    err_same_as_name: "The password cannot be the name.",
    err_same_as_current: "The new password is the same as the current one.",
    err_mismatch: "The two new passwords differ.",
    err_no_pending_secret: "Show the secret first.",
    err_last_admin: "This is the last enabled administrator: without one, sign-in switches off and the map is open to everyone. Make someone else an administrator first.",
    err_exists: "This name is taken.",
    err_bad_name: "A name is letters, digits, “.”, “_” and “-”, up to 32 characters, no spaces.",
    err_bad_role: "No such role.",
    err_unknown: "No such account.",
    err_other: "The server refused: {error}",
    newPasswordTitle: "Set your own password",
    newPasswordHint: "This password was temporary. Set your own to go on.",
    fieldCurrentPassword: "Current password",
    fieldNewPassword: "New password",
    fieldRepeatPassword: "The new one again",
    passwordRules: "At least 10 characters and not the name. Length is what counts, not symbols: a phrase of a few words makes a good password.",
    saveBtn: "Save",
    passwordChanged: "Password changed. Other sessions of this account closed: {n}.",
    totpTitle: "Second factor (TOTP)",
    totpRequired: "An administrator needs a second factor before anything else.",
    totpHttp: "Over plain HTTP the secret crosses the network in clear text. It is safer to bind it on the server — {command} — or over HTTPS.",
    totpBoundOnServer: "Bound it on the server already? Sign out and sign in again with a code.",
    showSecretBtn: "Show the secret",
    totpScanHint: "Scan the QR code with an authenticator app, or type the secret in by hand; for a hardware key, use the otpauth line.",
    totpSecretLabel: "Secret",
    totpUriLabel: "otpauth line",
    qrUnavailable: "The QR code could not be drawn (the library did not load from cdnjs). Type the secret in by hand.",
    totpConfirmHint: "Then the code it shows now, and your password.",
    bindBtn: "Bind",
    recoveryTitle: "Recovery codes",
    recoveryHint: "Each works once, in place of a code from the app — for a lost phone or key. Write them down or print them now: they are not shown again.",
    recoveryDoneBtn: "Codes saved",
    copyBtn: "Copy",
    accountTitle: "Account",
    accountRole: "Role",
    accountTotp: "Second factor",
    totpOn: "on",
    totpOff: "off",
    recoveryLeft: "recovery codes left: {n}",
    changePasswordBtn: "Change password",
    bindTotpBtn: "Turn on TOTP",
    rebindTotpBtn: "Bind TOTP again",
    rebindHint: "A new secret and new recovery codes; the old ones stop working once a code from the new secret is confirmed.",
    accountKeys: "Keys",
    keysNone: "none",
    keyPasswordlessShort: "without a password",
    keySecondShort: "after the password",
    keyUnconfirmed: "sign-in without a password not confirmed by the key — remove the key and add it again",
    keyAddedOn: "added {date}",
    keyUsedOn: "last used {date}",
    keyNeverUsed: "not used yet",
    addKeyBtn: "Add a key",
    keyAddTitle: "Add a key",
    keyAddHint: "A security key, or the passkey of a phone or a computer. Your password first, then touch the key when the browser asks.",
    fieldKeyLabel: "Name, to tell it from the others",
    keyLabelPlaceholder: "e.g. blue key",
    keyPasswordless: "Sign in with this key without a password",
    keyPasswordlessHint: "The key then has to keep the sign-in on itself and ask for its PIN or a finger; without a PIN set, Windows or the browser offers to set one. Unticked, it is a second factor after the password.",
    keyAdded: "Key “{label}” added.",
    totpOrKey: "Or a key instead of TOTP:",
    passkeyWhy_insecure: "The page is not opened over HTTPS: browsers offer keys only to a protected page.",
    passkeyWhy_elsewhere: "Keys work at {link} — the address they are bound to.",
    passkeyWhy_no_public_url: "The server has no public address (listen.public_url): keys are off.",
    passkeyWhy_public_url_ip: "The server's public address is an IP address; a key is bound to a host name, never to an IP.",
    passkeyWhy_public_url_http: "The server's public address is plain http; keys need HTTPS.",
    passkeyWhy_no_fido2: "The server lacks the fido2 package: keys are off (docs/OPERATIONS.md).",
    passkeyWhy_no_webauthn: "This browser cannot use keys (no WebAuthn).",
    keyErr_NotAllowedError: "The key did not answer: cancelled, timed out, or no key was touched.",
    keyErr_InvalidStateError: "This key is added to your account already.",
    keyErr_SecurityError: "The browser refused: the page's address does not match the one keys are bound to, or its certificate is not trusted.",
    keyErr_NotSupportedError: "This key supports none of the algorithms MoonLan accepts.",
    keyErr_AbortError: "Cancelled.",
    keyErr_ConstraintError: "This key cannot do what was asked (a PIN, or keeping the sign-in on itself).",
    keyErr_other: "The key or the browser failed: {error}",
    keyErr_certificate: "The browser does not trust this site's certificate, and turns keys off on such a page. Install the root certificate on this computer — see docs/HTTPS.md.",
    keyErr_signIn: "No key answered: cancelled or timed out — or the key keeps no sign-in for this site because it was added as a second factor. Then sign in with the password, and the key after it.",
    err_passkeys_off: "Signing in with a key is off on this server.",
    err_challenge_expired: "The request ran out (five minutes) or was used already. Try again.",
    err_key_refused: "The server did not accept the key's answer.",
    err_too_many_keys: "Ten keys at most. Remove one first.",
    err_key_exists: "This key is added already.",
    err_cannot_passwordless: "This key cannot sign in without a password: it keeps no sign-ins, has no room left, or has no PIN. Untick “Sign in with this key without a password” and it becomes a second factor after the password.",
    keyErr_addPasswordless: "The key did not keep the sign-in: cancelled or timed out — or it cannot sign in without a password (keeps no sign-ins, no room left, no PIN). Untick “Sign in with this key without a password” and it becomes a second factor after the password.",
    err_no_user_verification: "The key asked for no PIN or finger. Signing in without a password needs that — or sign in with the password and use the key after it.",
    err_key_unknown: "This key is not added to any account here.",
    err_key_second_only: "This key was added to work after the password only. Sign in with the password first.",
    err_no_keys: "This account has no keys.",
    al_passkey_clone_suspected: "Key may be copied",
    ev_user_passkey_added: "Key added",
    ev_user_passkey_removed: "Key removed",
    ev_user_passkeys_reset: "Keys removed",
    ev_passkey_clone_suspected: "Key may be copied",
    "evMethod_password": "password",
    "evMethod_password+totp": "password and TOTP",
    "evMethod_password+passkey": "password and a key",
    "evMethod_passkey": "a key",
    usersTitle: "Users",
    addBtn: "Add",
    userCreated: "{name}: temporary password {password} — hand it over once; the person sets their own at the first sign-in.",
    userNewPassword: "{name}: new temporary password {password}",
    stateActive: "active",
    stateDisabled: "disabled",
    stateLocked: "locked until {time}",
    stateMustChange: "new password at sign-in",
    userTotpOn: "TOTP on",
    userTotpOff: "no TOTP",
    userTotpAdminMissing: "no second factor — binds one at the next sign-in",
    userKeys: "keys: {n}",
    userLastLogin: "last sign-in {time}",
    userNever: "never signed in",
    userSessions: "sessions: {n}",
    userYou: "you",
    actNewPassword: "New password",
    actResetTotp: "Reset TOTP",
    actResetKeys: "Reset keys",
    actRemoveKey: "Remove",
    userMenuHint: "Account actions",
    userMenuFor: "Actions for {name}",
    reasonYourAccount: "this is your account",
    reasonLastAdmin: "the last administrator",
    reasonNoTotp: "TOTP is not on",
    reasonNoKeys: "no keys",
    reasonNoSessions: "no sessions",
    reasonNotLocked: "not locked",
    actUnlock: "Unlock",
    actSignOut: "Sign out everywhere",
    actDisable: "Disable",
    actEnable: "Enable",
    actDelete: "Delete",
    confirmDelete: "Delete {name} for good?",
    confirmDisable: "Disable {name}? Their sessions are closed.",
    confirmResetTotp: "Remove the second factor and recovery codes of {name}?",
    confirmResetKeys: "Remove every key of {name}? Their sessions are closed; an administrator without TOTP binds a new second factor at the next sign-in.",
    confirmRemoveKey: "Remove the key “{label}” of {name}? Their sessions are closed.",
    confirmRemoveOwnKey: "Remove the key “{label}”? Your other sessions are closed.",
    keyRemoved: "Key removed. Other sessions closed: {n}.",
    err_last_factor: "This is the administrator's last second factor. Bind TOTP or add another key first — or, if every key is lost, reset the keys.",
    err_unknown_key: "No such key.",
    confirmNewPassword: "Give {name} a new temporary password? Their sessions are closed.",
    usersDone: "Done.",
    ev_login: "Signed in",
    ev_logout: "Signed out",
    ev_account_locked: "Account locked",
    ev_user_added: "Account created",
    ev_user_role: "Role changed",
    ev_user_password: "Password changed",
    ev_user_disabled: "Account disabled",
    ev_user_enabled: "Account enabled",
    ev_user_totp_reset: "Second factor removed",
    ev_user_totp_enabled: "Second factor bound",
    ev_user_unlocked: "Account unlocked",
    ev_user_sessions_closed: "Signed out everywhere",
    ev_user_deleted: "Account deleted",
    evTemporary: "temporary password",
    evRecoveryUsed: "with a recovery code, {n} left",
    evLockedFor: "for {n} min",
    offlineGroup: "Offline",
    offlineGroupTitle: "Offline devices · {n}",
    offlineGroupHint:
      "These devices are missing from the current switch tables; they "
      + "are shown on the port where they were seen last.",
    trunkGroup: "Beyond the trunk",
    trunkGroupTitle: "Beyond the trunk · {n}",
    trunkGroupHint:
      "Visible through the trunk {switch} {port}. The exact place is "
      + "unknown: the devices are somewhere past that cable.",
    trunkGroupSilent: "Of those, not answering",
  }
};
