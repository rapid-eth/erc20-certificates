const express = require('express')
const port = process.env.PORT || 3000
const app = express();

const condenserService = require('./condenserService')

app.use(express.json());

app.get("/", async (req,res) => {
    res.send("Local condenser service")
})

app.get("/delegate", async (req,res) => {
    res.send("0x38733B81924735C81E9F494AA34E4D7F5753FB74")
})

app.post("/condense", async (req,res) => {
    const body = req.body
    let result = await condenserService.parseBody(body)
    res.send(result)
})

app.listen(port, () => console.log(`App listening on port ${port}!`));
