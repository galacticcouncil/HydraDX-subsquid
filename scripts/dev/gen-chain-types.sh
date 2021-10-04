#!/bin/bash

set -e

mkdir -p chain-interfaces/default

npx ts-node --skip-project node_modules/.bin/polkadot-types-from-defs \
  --input chain-interfaces \
  --package chain-interfaces
