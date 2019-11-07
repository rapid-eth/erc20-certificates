
const condenserService = require('./condenserService')


exports.handler = async (event) => {

    const body = JSON.parse(event.body)
    console.log("made it")
    console.log(body)

    try {
        let result = await condenserService.parseBody(body)
        return success(result)
    } catch (err) {
        fail(err)
    }




}

const fail = (errorMessage, code) => {
    if (!code) {
        code = 400
    }
    return {
        headers: responseHeaders,
        statusCode: code,
        body: JSON.stringify({error: errorMessage}),
    }
}
const success = (success) => {
    return {
        headers: responseHeaders,
        statusCode: 200,
        body: JSON.stringify(success),
    }
}

const responseHeaders = {
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Origin": "*"
}