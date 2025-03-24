#!/bin/bash
if [ -z "$1" ]; then
  echo "Uso: $0 '<config-json>'"
  echo "Exemplo:"
  echo "$0 '{"TableName": "Users", "AttributeDefinitions": [{"AttributeName": "id", "AttributeType": "S"}], "KeySchema": [{"AttributeName": "id", "KeyType": "HASH"}]}'"
  exit 1
fi

CONFIG_JSON="$1"

# Parse individual components using jq
TABLE_NAME=$(echo $CONFIG_JSON | jq -r '.TableName')
ATTRIBUTE_DEFINITIONS=$(echo $CONFIG_JSON | jq -c '.AttributeDefinitions')
KEY_SCHEMA=$(echo $CONFIG_JSON | jq -c '.KeySchema')

echo "Criando tabela DynamoDB: $TABLE_NAME"
aws dynamodb create-table \
    --table-name "$TABLE_NAME" \
    --attribute-definitions "$ATTRIBUTE_DEFINITIONS" \
    --key-schema "$KEY_SCHEMA" \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
    --endpoint-url http://localhost:8000 \
    --region us-east-1
