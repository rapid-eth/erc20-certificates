const fs = require("fs");

const readContractFile = (name) => {
    let contract = require(`@contracts/${name}.json`)
    return contract
}


const readFile = (file) => {
    let content = fs.readFileSync(file, "utf8");
    console.log(content)
}

const writeToFile = (filename, obj) => {
    fs.writeFileSync(filename, JSON.stringify(obj, null, 4), "utf8");
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const getNonce = async (address) => {
    return await provider.getTransactionCount(address)
}

const bnToInt = (bn) => {
    return parseInt(bn.toString())
}

module.exports = {
    readContractFile,

    readFile,
    writeToFile,
    sleep,
    getNonce,
    bnToInt
}