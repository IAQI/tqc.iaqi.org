#!/usr/bin/env python3
"""Make an archived WordPress site load its theme assets locally.

Finds wp-content/ and wp-includes/ URLs on the given original hosts in every
HTML file under YEAR_DIR, downloads any that are missing (plus files that
their CSS url(...) references, including @import url(...), point to), and rewrites the links to
relative paths. Links whose file could not be downloaded are left untouched.

usage: python3 -I tools/localize_assets.py [--insecure] YEAR_DIR HOST [HOST...]
  e.g. python3 -I tools/localize_assets.py 2020 tqc2020.lu.lv

--insecure skips TLS certificate verification; use it only for an original
host whose certificate has expired (as happened for www.tqcconference.org).
"""
import os, re, ssl, sys, urllib.request, urllib.parse

args = sys.argv[1:]
insecure = '--insecure' in args
args = [a for a in args if a != '--insecure']
if len(args) < 2:
    sys.exit(__doc__)
year, hosts = args[0], args[1:]
hostre = '|'.join(re.escape(h) for h in hosts)
# attribute values (href/src/srcset-ish) pointing at assets on the hosts
ASSET = re.compile(r"(https?:)?//(%s)/((?:wp-content|wp-includes)/[^'\"\s)<>,]+)" % hostre)
ctx = ssl.create_default_context()
if insecure:
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

def fetch(host, path):
    # never write outside YEAR_DIR, whatever url() paths remote CSS contains
    base = os.path.realpath(year)
    dest = os.path.realpath(os.path.join(base, path))
    if (os.path.isabs(path) or os.path.commonpath([base, dest]) != base
            or not os.path.normpath(path).startswith(('wp-content' + os.sep, 'wp-includes' + os.sep))):
        print('SKIP', host, path)
        return None, False
    if os.path.exists(dest):
        return dest, False
    url = 'https://%s/%s' % (host, urllib.parse.quote(path))
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        data = urllib.request.urlopen(req, context=ctx, timeout=30).read()
    except Exception as e:
        print('FAIL', url, e)
        return None, False
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, 'wb') as f:
        f.write(data)
    print('GOT ', url, len(data))
    return dest, True

def css_deps(host, path, dest):
    text = open(dest, encoding='utf-8', errors='replace').read()
    for m in re.finditer(r"url\(\s*['\"]?([^'\")]+)['\"]?\s*\)", text):
        ref = m.group(1)
        if ref.startswith(('data:', '#', 'http:', 'https:', '//')):
            continue
        dep = os.path.normpath(os.path.join(os.path.dirname(path), ref.split('?')[0].split('#')[0]))
        d, new = fetch(host, dep)
        if d and new and dep.endswith('.css'):
            css_deps(host, dep, d)

htmls = [os.path.join(r, f) for r, _, fs in os.walk(year) for f in fs if f.endswith('.html')]
wanted = set()
for h in htmls:
    for m in ASSET.finditer(open(h, encoding='utf-8', errors='replace').read()):
        path = m.group(3).split('?')[0].split('#')[0].replace('&#038;', '&')
        wanted.add((m.group(2), urllib.parse.unquote(path)))

for host, path in sorted(wanted):
    dest, _ = fetch(host, path)
    if dest and path.endswith('.css'):
        css_deps(host, path, dest)

for h in htmls:
    depth = os.path.relpath(h, year).count(os.sep)
    prefix = '../' * depth
    text = open(h, encoding='utf-8', errors='replace').read()
    new = ASSET.sub(lambda m: prefix + m.group(3)
                    if os.path.exists(os.path.join(year, urllib.parse.unquote(m.group(3).split('?')[0].split('#')[0])))
                    else m.group(0), text)
    if new != text:
        open(h, 'w', encoding='utf-8').write(new)
