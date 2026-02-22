#!/usr/bin/env bash
set -euo pipefail

if rg -n '^(<<<<<<<|=======|>>>>>>>)' --glob '!.git/**' .; then
  echo
  echo "ERROR: Git conflict markers found. Resolve conflicts before committing."
  exit 1
fi

echo "OK: no Git conflict markers found."
