#!/bin/sh
FUNCTION_NAME=condenser
rm -rf ./node_modules
npm install --production

echo "Creating temp dir..."
mkdir temp

cp -r ./node_modules temp/.
cp -r ./condenserService temp/.

cp ./secrets.json ./util.js ./index.js ./package.json temp/.

echo "Zipping ..."
cd temp
zip -r -q ../aws_lamda_deploy.zip .
cd ..

echo "Updating lambda function: ${FUNCTION_NAME}..."
aws lambda --profile lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://aws_lamda_deploy.zip 

echo "Removing deploy zip file and temp dir"
rm aws_lamda_deploy.zip
rm -rf temp
echo "DONE"
