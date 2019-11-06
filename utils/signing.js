const ethers = require("ethers");

const createStringMessageSignature = async (msg, wallet) => {
    const messageHash = ethers.utils.solidityKeccak256(["string"], [msg]);
    const messageHashBytes = ethers.utils.arrayify(messageHash);
    return await wallet.signMessage(messageHashBytes);
};

const createBytesMessageSignature = async (bytes, wallet) => {
    const messageHash = ethers.utils.solidityKeccak256(["bytes"], [bytes]);
    const messageHashBytes = ethers.utils.arrayify(messageHash);
    return await wallet.signMessage(messageHashBytes);
};

const signHash = async (hash, wallet) => {
    const messageHashBytes = ethers.utils.arrayify(hash);
    return await wallet.signMessage(messageHashBytes);
}

const callContract = async (contract, wallet, funcName, contractParams) => {
    try {
        const contractWithSigner = contract.connect(wallet);
        const tx = await contractWithSigner.functions[funcName](
            ...contractParams, { gasLimit: 6000000 }
        );
        await tx.wait();
        return tx;
    } catch (err) {
        console.log("***ERROR CALLING CONTRACT***");
        console.log(err);
    }
};

const callContractParams = async (contract, wallet, funcName, contractParams, txParams) => {
    try {
        const contractWithSigner = contract.connect(wallet);
        const response = await contractWithSigner.functions[funcName](
            ...contractParams, txParams
        );
        return response;
    } catch (err) {
        console.log("***ERROR CALLING CONTRACT***");
        console.log(err);
    }
};

const createCertificateSignature = async (certID, contractAddress, address, anchorWallet) => {
    const messageHash = ethers.utils.solidityKeccak256(["bytes", "address", "address"], [certID, contractAddress, address]);
    const messageHashBytes = ethers.utils.arrayify(messageHash);
    const sig = await anchorWallet.signMessage(messageHashBytes);
    return sig;
}

const deployContract = async (abi, bytecode, wallet, params) => {
    try {
        const factory = new ethers.ContractFactory(abi, bytecode, wallet);
        const unsignedTx = factory.getDeployTransaction(...params)
        //let gasEstimate = await provider.estimateGas(unsignedTx)  
        const contract = await factory.deploy(...params);
        await contract.deployed()
        return contract
    } catch (err) {
        console.log("***ERROR deploying CONTRACT***");
        console.log(err);
    }
}

module.exports = {
    createStringMessageSignature,
    createBytesMessageSignature,
    signHash,
    callContract,
    callContractParams,
    createCertificateSignature,
    deployContract
}