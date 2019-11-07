


exports.handler = async (event) => {

    const body = JSON.parse(event.body)





}

const fail = (errorMessage, code) => {
    if (!code) {
        code = 400
    }
    return {
        headers: responseHeaders,
        statusCode: code,
        body: JSON.stringify({ lambda: lambdaName , error: errorMessage }),
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