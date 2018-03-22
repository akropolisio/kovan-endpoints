// contracts
const { TokenRegistry } = require('@dharmaprotocol/contracts');

const Dharma = require('./dharma');

exports.init = async(web3) => {
    const dharma = await Dharma.init(web3, [TokenRegistry]);

    return dharma.contracts.loadTokenRegistry();
};