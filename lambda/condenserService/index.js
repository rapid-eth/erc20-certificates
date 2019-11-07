
const util = require('../util');
const ethers = require('ethers')
const abi = require('./ERC20Certificate').abi
const {address, signingKey} = require('../secrets')

const wallet = new ethers.Wallet(signingKey)

const parseBody = async (body) => {
    console.log('parsing...')
    let { certificateList, sender, contractAddress } = body
    let contract = new ethers.Contract(contractAddress, abi, util.provider);
    return await signBatch(contract, certificateList, sender)
}

const signBatch = async (tokenContract, certificateList, redeemerAddress) => {
    let amount = ethers.utils.bigNumberify(0)
    let certIDArray = []
    for (let i = 0; i < certificateList.length; i++) {
        const c = certificateList[i];
        if (!(await verifyCert(c, redeemerAddress, tokenContract))) {
            console.log('INVALID CERT', c)
            return {
                error: 'Invalid Certificate',
                certificate: c
            }
        }

        const amt = await tokenContract.getCertificateAmount(c.id)
        amount = amount.add(amt)
        certIDArray.push(c.id)
    }

    const condensedIDHash = await tokenContract.condenseCertificateIDs(certIDArray)
    const condensedHash = await tokenContract.getCondensedCertificateHash(condensedIDHash, amount, redeemerAddress)

    let signature = await util.signHash(condensedHash, wallet)

    if (amount.lt(Number.MAX_SAFE_INTEGER)) {
        amount = parseInt(amount.toString(), 10)
    }

    return {
        signature,
        amount,
        certificateIds: certIDArray
    }
}

const verifyCert = async (cert, redeemerAddress, tokenContract) => {
    const cHash = await tokenContract.getCertificateHash(cert.id, redeemerAddress)
    let isDS = await tokenContract.isDelegateSigned(cHash, cert.signature, cert.id)
    return isDS
}


module.exports = {
    parseBody,
    address
}