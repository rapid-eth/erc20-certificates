require('module-alias/register')

const ethers = require("ethers");
const ipfs = require("./ipfs");
const misc = require("./misc");
const signing = require("./signing");

const url = "http://127.0.0.1:7545";
let provider;
let networkID
let networkName
if (process.env.NETWORK === "mainnet") {
  //provider = ethers.getDefaultProvider('rinkeby');
  const infuraURL = 'https://mainnet.infura.io/v3/3bbfc77a4c3b4c8abf44928522104e9a'
  provider = new ethers.providers.JsonRpcProvider(infuraURL);
  networkID = "1";
  networkName = 'mainnet'
} else if (process.env.NETWORK === "rinkeby") {
  //provider = ethers.getDefaultProvider('rinkeby');
  const infuraURL = 'https://rinkeby.infura.io/v3/9dd73bc075d441f684db7bc34f4e5950'
  provider = new ethers.providers.JsonRpcProvider(infuraURL);
  networkID = "4";
  networkName = 'rinkeby'
} else {
  provider = new ethers.providers.JsonRpcProvider(url);
  networkID = "5777";
  networkName = 'ganache'
}

const secrets = require('@root/secrets.json')
const mnemonic = secrets.mnemonic;

const ethersAccount = i => {
  const path = "m/44'/60'/0'/0/" + i;
  const w = ethers.Wallet.fromMnemonic(mnemonic, path);
  return new ethers.Wallet(w.signingKey.privateKey, provider);
};

const getContract = (address, abi) => {
  return new ethers.Contract(address, abi, provider);
}
const readDeployedFile = (name) => {
  let contract = require(`@deployed/${networkName}/${name}.json`)
  return contract
}
const getDeployedContract = (name) => {
  let contract = require(`@deployed/${networkName}/${name}.json`)
  return getContract(contract.networks[networkID].address, contract.abi)
}
const emptyAddress = '0x0000000000000000000000000000000000000000'

module.exports = {
  ...ipfs,
  ...misc,
  ...signing,
  readDeployedFile,
  getDeployedContract,
  networkID,
  networkName,
  ethersAccount,
  provider,
  getContract,
  emptyAddress,
  parseUnits: ethers.utils.parseUnits
};
