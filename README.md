# tqc.iaqi.org
static copies of TQC websites

## Downloading from live sites

```bash
wget --mirror \
     --convert-links \
     --adjust-extension \
     --page-requisites \
     --no-parent \
     --reject-regex ".*(\?|#).*" \
     --exclude-directories="*/wp-json/*,*/xmlrpc.php*" \
     --wait=0.5 \
     --random-wait \
     --compression=auto \
     --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" \
     https://tqc-conference.org/
```

## Downloading from Wayback Machine

```bash
wget --mirror \
     --convert-links \
     --adjust-extension \
     --page-requisites \
     --no-parent \
     --no-check-certificate \
     --wait=0.5 \
     --random-wait \
     --compression=auto \
     --user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" \
     --reject-regex ".*(web\.archive\.org/web/[0-9]+[a-z_]*/|/static/|/__wb/)" \
     https://web.archive.org/web/20230324034500/https://tqc2018.org/
```

**Note**: Wayback Machine archives require:
- Removing `--reject-regex` that blocks query parameters (Wayback uses them)
- Adding `--no-check-certificate` for older snapshots
- Using `--reject-regex` to skip Wayback's UI elements and timestamp variations
