#!/usr/bin/env bash

set -e

: "${NETWORK_NAME?Need to set NETWORK_NAME}"

export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cp -R $DIR/skale-network/meta/$NETWORK_NAME/ $DIR/src/meta/