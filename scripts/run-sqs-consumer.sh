#!/bin/bash
echo "Iniciando consumo de mensagens SQS..."
node --loader ts-node/esm src/infrastructure/messaging/sqsConsumer.js
