const fs = require('fs');
const path = require('path');
const Web3API = require('web3');

const main = async () => {
    const web3 = new Web3API(new Web3API.providers.HttpProvider('https://mainnet.infura.io'));
    const tokenAddress = "0x..";
    const fromAddress = "0x..";

    // ABI to transfer ERC20 Token
    let abi = JSON.parse(fs.readFileSync(path.join(__dirname, '.', 'main_contract.json'), 'utf-8'));
    // Get ERC20 Token contract instance
    let contract = new web3.eth.Contract(abi, tokenAddress);
    // How many tokens do I have before sending?
    let balance = await contract.methods.balanceOf(fromAddress).call();
    console.log(`Balance: ${balance}`);
};

main();