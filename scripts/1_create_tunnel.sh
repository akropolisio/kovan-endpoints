#!/usr/bin/env bash

echo -e "Forwarding port 8546 to Dharma's kovan node."

# Setup SSH tunneling with port forwarding into hosted Kovan node.
ssh -f -o 'ServerAliveInterval 10' -o 'ServerAliveCountMax 3' \
    -N -L 8546:localhost:8545 ubuntu@kovan.dharma.io