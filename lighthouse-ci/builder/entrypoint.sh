#!/bin/bash

TMP_PROFILE_DIR=$(mktemp -d -t lighthouse.XXXXXXXXXX)

su chromeuser /chromeuser-script.sh
sleep 3s

# Create directory to write reports to.
mkdir reports

node /server.js
