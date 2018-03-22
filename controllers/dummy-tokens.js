const Web3 = require('web3');

const config = require('../config');

const { DummyTokenContract } = require('@dharmaprotocol/dharma.js/dist/lib/src/wrappers/contract_wrappers/dummy_token_wrapper');

const TokenRegistry = require('../lib/token-registry');

const web3 = new Web3(new Web3.providers.HttpProvider(`http://${config.kovan.host}:${config.kovan.port}`));

const txDefaults = { from: config.kovan.owner };

/**
 * Given a token symbol, returns a promise for a DummyTokenContract.
 *
 * @param tokenSymbol
 * @returns {Promise<DummyTokenContract>}
 */
let getDummyToken = async (tokenAddress) => {
    return await DummyTokenContract.at(tokenAddress, web3);
};

/**
 * Given a token symbol as "tokenSymbol" (e.g. "REP"), an account address, and a value,
 * sets the account balance for that token and renders the result.
 */
exports.setTokenBalance = async (req, res) => {
    const { tokenAddress, address } = req.params;
    const { balance  } = req.body;

    try {
        const dummyToken = await getDummyToken(tokenAddress);
        const txHash = await dummyToken.setBalance.sendTransactionAsync(address, balance, txDefaults);

        res.status(200).json({ txHash  });
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ error: err.message })
    }
};

/**
 * Given a token symbol as "tokenSymbol" (e.g. "REP"), and an account address,
 * renders a JSON object including the account balance for that token.
 */
exports.getTokenBalance = async (req, res) => {
    const { address, tokenAddress } = req.params;

    try {
        console.log(tokenAddress);
        const dummyToken = await getDummyToken(tokenAddress);
        const balance = await dummyToken.balanceOf.callAsync(address);

        res.status(200).json({ balance });
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ error: err.message })
    }
};