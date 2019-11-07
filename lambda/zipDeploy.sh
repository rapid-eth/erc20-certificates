#!/bin/sh

FUNCTION_NAME=$1
LAMBDAS_DIR=./lambdas
TARGET=$LAMBDAS_DIR/$FUNCTION_NAME

if [ ! -d "$TARGET" ]; then
  echo "$TARGET does not exist, exiting..."
  exit 0
fi

echo "Creating temp dir..."
mkdir temp

cp -r ./node_modules temp/.
cp ./validation.js ./common.js ./certificates.json ./address.json temp/.
cp ./package.json temp/.
cp -r $TARGET/* temp/.


echo "Zipping ..."
cd temp
zip -r -q ../aws_lamda_deploy.zip .
cd ..

echo "Updating lambda function: ${FUNCTION_NAME}..."
aws lambda --profile lambda update-function-code --function-name verify-$FUNCTION_NAME --zip-file fileb://aws_lamda_deploy.zip 

echo "Removing deploy zip file and temp dir"
rm aws_lamda_deploy.zip
rm -rf temp
echo "DONE"
