// external
const Dharma = require('@dharmaprotocol/dharma.js');
const promisify = require('tiny-promisify');

exports.init = async(web3, contracts) => {
    const networkId = await promisify(web3.version.getNetwork)();
    const config = {};

    contracts.forEach((contract) => {
        if (!(networkId in contract.networks)) {
            throw new Error(`Did not find networkId: ${networkId} in ${contract.constructor.name} networks`);
        }

        config[contract] = contract.networks[networkId].address;
    });

    return new Dharma.default(web3.currentProvider, config);
};