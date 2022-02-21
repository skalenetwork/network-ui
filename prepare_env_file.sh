#!/usr/bin/env bash

set -e

: "${NETWORKS?Need to set NETWORKS}"
: "${DOCS_WEBSITE_URL?Need to set DOCS_WEBSITE_URL}"
: "${MAIN_WEBSITE_URL?Need to set MAIN_WEBSITE_URL}"
: "${NETWORK_NAME?Need to set NETWORK_NAME}"
: "${CHAIN_ID?Need to set CHAIN_ID}"
: "${EXPLORER_URL?Need to set EXPLORER_URL}"
: "${BASE_PROXY_URL?Need to set BASE_PROXY_URL}"

export DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

rm -f $DIR/.env

echo "REACT_APP_NETWORKS=$NETWORKS" >> $DIR/.env
echo "REACT_APP_DOCS_WEBSITE_URL=$DOCS_WEBSITE_URL" >> $DIR/.env
echo "REACT_APP_MAIN_WEBSITE_URL=$MAIN_WEBSITE_URL" >> $DIR/.env
echo "REACT_APP_NETWORK_NAME=$NETWORK_NAME" >> $DIR/.env
echo "REACT_APP_CHAIN_ID=$CHAIN_ID" >> $DIR/.env
echo "REACT_APP_EXPLORER_URL=$EXPLORER_URL" >> $DIR/.env
echo "REACT_APP_BASE_PROXY_URL=$BASE_PROXY_URL" >> $DIR/.env
