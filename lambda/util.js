const ethers = require("ethers");


const infuraURL = 'https://rinkeby.infura.io/v3/9dd73bc075d441f684db7bc34f4e5950'
const provider = new ethers.providers.JsonRpcProvider(infuraURL);

const signHash = async (hash, wallet) => {
    const messageHashBytes = ethers.utils.arrayify(hash);
    return await wallet.signMessage(messageHashBytes);
}
module.exports = {
    provider,
    signHash
}