const fs = require('fs');
const path = require('path');
const Web3API = require('web3');

const main = async () => {
    const web3 = new Web3API(new Web3API.providers.HttpProvider('https://mainnet.infura.io'));
    const tokenAddress = "0x..";
    const fromAddress = "0x..";
    const toAddress = "0x..";

    // ABI to transfer ERC20 Token
    let abi = JSON.parse(fs.readFileSync(path.join(__dirname, '.', 'main_contract.json'), 'utf-8'));
    // Get ERC20 Token contract instance
    let contract = new web3.eth.Contract(abi, tokenAddress, {
        from: fromAddress
    });
    // calculate ERC20 token amount
    let amount = 1;
    let tokenAmount = web3.utils.toWei(amount.toString(), 'ether')
    // Will call estimate the gas a method execution will take when executed in the EVM without.
    let estimateGas = await web3.eth.estimateGas({
        "value": '0x0', // Only tokens
        "data": contract.methods.transfer(toAddress, tokenAmount).encodeABI(),
        "from": fromAddress,
        "to": toAddress
    });
    console.log({
        tokenAmount: tokenAmount,
        estimateGas: estimateGas * 1.10
    });
};

main();