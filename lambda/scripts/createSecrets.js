const fs = require('fs')
const ethers = require('ethers')

const privKeyRegex = /^[A-Fa-f0-9]{64}$/

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`Enter your private key --> `, (signingKey) => {
    if (!privKeyRegex.test(signingKey)) {
        console.log('invalid private key')
    } else {

        const w = new ethers.Wallet(signingKey)
        const address = w.address
        fs.writeFileSync(__dirname + '/../secrets.json', JSON.stringify({address,signingKey}, null, 4));
        console.log('Wrote secrets.json file to parent directory')
    }
    readline.close()
})

