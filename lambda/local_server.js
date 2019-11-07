const express = require('express')
const port = process.env.PORT || 3000
const app = express();

const condenserService = require('./condenserService')

app.use(express.json());

app.get("/", async (req,res) => {
    res.send("Local condenser service")
})

app.get("/signer", async (req,res) => {
    res.send(condenserService.address)
})

app.post("/condense", async (req,res) => {
    const body = req.body
    let result = await condenserService.parseBody(body)
    res.send(result)
})

app.listen(port, () => console.log(`App listening on port ${port}!`));
