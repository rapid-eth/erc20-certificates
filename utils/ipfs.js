
const IPFS = require('ipfs-http-client')
const ipfs = new IPFS('ipfs.infura.io', '5001', { protocol: 'https' })

const ipfsAddImage = async (imageFile) => {
    let content = fs.readFileSync(imageFile);
    let imageBuffer = Buffer.from(content) //todo file to buffer
    let upload = await ipfs.add(Buffer.from(imageBuffer))
    return upload[0].hash
};

const ipfsAddJSON = async (jsonObject) => {
    const content = Buffer.from(JSON.stringify(jsonObject))
    let imageBuffer = Buffer.from(content) //todo file to buffer
    let upload = await ipfs.add(Buffer.from(imageBuffer))
    return upload[0].hash
};

module.exports = {
    ipfsAddImage,
    ipfsAddJSON
}