[![Tests](https://github.com/ItsWanheda/MoonLan/actions/workflows/tests.yml/badge.svg)](https://github.com/ItsWanheda/MoonLan/actions/workflows/tests.yml)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11%2B-3776AB.svg)](https://www.python.org/)

# 🌙 MoonLan

**MoonLan** is a self-hosted Linux network-mapping and monitoring service that discovers physical LAN topology from switch data collected over SNMP and presents it in a live web interface.

> **Design principle:** show what the network actually told us, and clearly label what is inferred, stale, approximate, or unknown.

![MoonLan network map](docs/img/map.png)

---

## ✨ What it does

| Area | Capabilities |
|---|---|
| 🔭 Discovery | SNMP v2c, FDB/MAC tables, LLDP, LACP, VLAN/PVID, ARP/DNS |
| 🗺️ Topology | Direct-link inference, trunk awareness, STP-aware rings, unmanaged bridges |
| 📈 Monitoring | Ping, traffic rates, errors, discards, flapping, loop detection |
| 🚨 Alarms | Stateful alarms with Email, Telegram, Syslog notifications |
| 🧭 Operations | Shared layout, pinned nodes, search, journal, port/STP/alarms panels |
| 🧪 Diagnostics | FDB, hosts, ports, STP, loop detection, topology, arbitrary MIB walks |
| 🛡️ Safety | Per-host poll budgets, stale-data labels, command argument validation |
| 🌐 UI | English/Russian interface, demo mode, responsive dark network map |

---

## 🚀 Quick start

### Install

~~~bash
git clone https://github.com/ItsWanheda/MoonLan.git
cd MoonLan

python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
~~~

### Configure

Copy **config.example.yaml** to your own configuration and add the switches you want MoonLan to poll.

Then set:

~~~bash
export MOONLAN_CONFIG=/absolute/path/to/config.yaml
~~~

Important configuration topics are documented in **docs/CONFIGURATION.md**.

### Run

~~~bash
python run.py
~~~

Open:

~~~text
http://127.0.0.1:8000/
~~~

For a safe first run, use demo mode:

~~~bash
python run.py --demo
~~~

---

## 🧪 Tests

MoonLan uses Python's standard **unittest** runner:

~~~bash
python -m unittest discover -s tests -v
~~~

CI runs the suite on Python 3.11 and 3.12 for pushes to **main** and pull requests.

When fixing topology, polling, persistence, or vendor-specific behavior, add a regression test for the failure mode. The suite intentionally protects subtle rules such as stale readings, FDB validation, topology inference, layout persistence, command safety, and partial SNMP failures.

---

## 🏗️ Architecture

~~~text
SNMP switches / routers
          │
          ▼
   SnmpCollector + probes
          │
          ▼
 ┌─────────────────────────┐
 │ topology inference      │
 │ LLDP / FDB / LACP       │
 │ STP / VLAN / ARP        │
 └────────────┬────────────┘
              │
              ▼
        TopologyState
          │       │
          ▼       ▼
       SQLite   FastAPI
          │       │
          └───┬───┘
              ▼
        Web interface
~~~

The collector, topology engine, persistence layer, API, and UI are intentionally separated. A slow or partially responding switch should not make the rest of the network disappear.

See **docs/ARCHITECTURE.md** for the data flow and optimization boundaries.

---

## 🔌 REST API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | **/api/health** | Lightweight liveness check |
| GET | **/api/status** | Scan, service, and resource state |
| GET | **/api/topology** | Current topology and live device state |
| GET | **/api/switch/{ip}/ports** | Port status, rates, errors, LLDP, LAG, loop state |
| GET | **/api/stp** | STP state and network verdict |
| GET | **/api/alarms** | Active or historical alarms |
| POST | **/api/alarms/{id}/clear** | Clear an active alarm |
| GET | **/api/journal** | Event history |
| GET | **/api/search?q=...** | Device search |
| GET/PATCH/DELETE | **/api/layout** | Shared layout management |
| GET | **/api/node-menu?id=...** | Resolve context-menu actions |
| GET/POST | **/api/actions** | Inspect/start ping or traceroute jobs |
| GET | **/api/actions/{id}** | Inspect an action job |

Detailed endpoint notes: **docs/API.md**.

---

## 🧭 Project structure

~~~text
MoonLan/
├── run.py
├── config.example.yaml
├── requirements.txt
├── moonlan/
│   ├── snmp_collector.py   # SNMP polling and device data
│   ├── topology.py         # topology inference and map state
│   ├── counters.py         # traffic/error counters and rates
│   ├── lldp.py             # LLDP processing
│   ├── stp.py              # STP/RSTP processing
│   ├── loopdetect.py       # vendor loop-detection profiles
│   ├── alarms.py           # stateful alarm engine
│   ├── notify.py           # notifications
│   ├── db.py               # SQLite persistence
│   ├── pinger.py           # continuous ping monitoring
│   ├── probes.py           # safe on-demand ping/traceroute
│   ├── menu.py             # context-menu URL validation
│   ├── diag.py             # diagnostics CLI
│   └── server.py           # FastAPI application
├── tests/
├── web/
└── docs/
~~~

---

## 📚 Documentation

- **Configuration** — docs/CONFIGURATION.md
- **Architecture** — docs/ARCHITECTURE.md
- **API reference** — docs/API.md
- **Operations & troubleshooting** — docs/OPERATIONS.md
- **Roadmap** — docs/ROADMAP.md
- **Contributing** — CONTRIBUTING.md
- **Security policy** — SECURITY.md
- **Changelog** — CHANGELOG.md
- **Russian README** — README_RU.md
- **Russian changelog** — CHANGELOG_RU.md

---

## 🛡️ Security

MoonLan is intended for trusted/self-hosted network environments.

- Treat SNMP v2c communities as secrets.
- Do not expose the service directly to an untrusted network.
- On-demand actions accept MoonLan node IDs, not arbitrary addresses.
- Ping/traceroute are executed without a shell.
- Configurable context-menu URLs are scheme-validated and values are URL-encoded.
- Read **SECURITY.md** before exposing MoonLan beyond a lab or trusted LAN.

---

## 🤝 Contributing

Small, focused changes are preferred over broad rewrites.

1. Reproduce the issue.
2. Add a regression test.
3. Preserve existing public APIs/class names unless a breaking change is intentional.
4. Run the full test suite.
5. Update documentation and changelog when behavior changes.
6. Use a clear Conventional Commit-style message.

See **CONTRIBUTING.md**.

---

## 📜 License

MIT — see **LICENSE**.

### Why MoonLan?

Network maps are useful only when they distinguish **observation from inference**. MoonLan deliberately keeps that distinction visible: a measured cable, an FDB-derived relationship, an approximate trunk placement, and a stale reading should never look like the same thing.
