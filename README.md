# Dharma Kovan API

## Overview

Once deployed, this server will create a tunnel to the kovan node,
and expose endpoints for interaction.

## API Description

`/dummy-tokens/{token-address}/balance/{user-address}`

HTTP Verb | Description
----------|------------
GET | Returns the token balance for given token and address 
POST | Sets the token balance a given token and address

### Examples

```
https://faucet.dharma.io/dummy-tokens/0xb8ab05755244567c92ef0d76e8d22e8d2fcbec78/balance/0x111106090abaB3A6eeeeee9345bC60c78a8BEf57
```

## Setup

The application runs on Node.js, and forwards requests via SSH to the Kovan Parity node.

### Prepping an EC2 Instance

```bash
sudo yum install git
sudo yum install -y gcc-c++ make
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
. ~/.nvm/nvm.sh
nvm install --lts
node -e "console.log('Running Node.js ' + process.version)"
```

### Port Fowarding
Note: This assumes that your instance has SSH permission for the parity node.

```bash
ssh -i '~/.ssh/dharma_kovan_parity.pem' -f -o 'ServerAliveInterval 10' -o 'ServerAliveCountMax 3' \
    -N -L 8546:localhost:8545 ubuntu@kovan.dharma.io
```

### Installing Dependencies

```bash
git clone https://github.com/dharmaprotocol/kovan-endpoints
cd kovan-endpoints
npm install
```

### Running Application

```bash
npm install -g forever
screen
forever app.js
```