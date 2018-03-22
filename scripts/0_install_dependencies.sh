#!/bin/bash

yum install -y gcc-c++ make

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

. ~/.nvm/nvm.sh

nvm install --lts

node -e "console.log('Running Node.js ' + process.version)"

npm install