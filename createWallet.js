const Web3API = require('web3');

const main = () => {
    const web3 = new Web3API(new Web3API.providers.HttpProvider('https://mainnet.infura.io'));
    
    let account = web3.eth.accounts.create(web3.utils.randomHex(32));
    let wallet = web3.eth.accounts.wallet.add(account);
    let keystore = wallet.encrypt(web3.utils.randomHex(32));

    console.log({
        account: account,
        wallet: wallet,
        keystore: keystore
    });
};

main();