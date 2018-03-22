#!/bin/bash

###
#  Setup SSH tunneling with port forwarding into hosted Kovan node.
#  NOTE: Assumes a key exists on the instance for the Kovan node.
###
echo -e "Forwarding port 8546 to Dharma's kovan node."
ssh -i '~/.ssh/dharma_kovan_parity.pem' -f -o 'ServerAliveInterval 10' -o 'ServerAliveCountMax 3' \
    -N -L 8546:localhost:8545 ubuntu@kovan.dharma.io

##
# Setup Dependencies
##
echo -e "Installing application dependencies"
# Install git
sudo yum install git

# Install Node.js
sudo yum install -y gcc-c++ make
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
node -e "console.log('Running Node.js ' + process.version)"

# Install app
git clone https://github.com/dharmaprotocol/kovan-endpoints
cd kovan-endpoints
npm install

##
# Run application
##
npm install -g forever
screen
forever app.js