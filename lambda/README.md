## Condenser Microservice Module

This microservice was designed to be reusable in any node js based architecture. It works well in a serverless environment such as AWS's Lambda but can also be used in express or other node js server paradigms. To run and test locally, from this directory try running 

    npm install
    npm run local

Note you will need to create your own secrets.json file (hidden with .gitignore for security purposes). You can do this simply by running:

    npm run secrets

If you would like to take advantage of the existing AWS lambda deploy script, you'll need to first create an AWS Lambda of your own named `condenser`, ensure you have aws cli tools installed as well as a local profile (aws programmatic user with access keys) set up named lambda which has AWSLambdaFullAccess policy permissions.

If you have done all that you can simply run `npm run deploy` from this directory, which will execute the [script](./scripts/zipDeploy.sh) to deploy the lambda function.