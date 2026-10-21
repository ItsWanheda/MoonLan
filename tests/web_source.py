"""The page's own files as text, for the tests that hold the interface
to what it says. The JavaScript is not run here; where a test needs to
run a function of it, it does so through `node` when there is one."""

import json
import re
from pathlib import Path

WEB = Path(__file__).resolve().parent.parent / "web"
APP = (WEB / "app.js").read_text(encoding="utf-8")
I18N = (WEB / "i18n.js").read_text(encoding="utf-8")
INDEX = (WEB / "index.html").read_text(encoding="utf-8")
STYLE = (WEB / "style.css").read_text(encoding="utf-8")


def strings(lang):
    """key -> text of one language, the "…" + "…" pieces joined"""
    body = re.search(rf"^  {lang}: {{$(.*?)^  }},$", I18N, re.S | re.M).group(1)
    parts = re.split(r'^    "?([\w+.-]+)"?:', body, flags=re.M)
    return {
        key: "".join(
            json.loads('"' + piece + '"')
            for piece in re.findall(r'"((?:[^"\\]|\\.)*)"', expr)
        )
        for key, expr in zip(parts[1::2], parts[2::2])
    }


def function(name):
    """The source of a top-level function of app.js, braces and all"""
    body = APP[APP.index(f"function {name}("):]
    return body[:body.index("\n}\n") + 2]
