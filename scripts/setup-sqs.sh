#!/bin/bash
QUEUE_NAME=$1
if [ -z "$QUEUE_NAME" ]; then
  echo "Usage: $0 <QueueName>"
  exit 1
fi

echo "Creating SQS Queue: $QUEUE_NAME..."
aws sqs create-queue --queue-name "$QUEUE_NAME" --region us-east-1
