#!/bin/bash
TOPIC_NAME=$1
if [ -z "$TOPIC_NAME" ]; then
  echo "Usage: $0 <TopicName>"
  exit 1
fi

echo "Creating SNS Topic: $TOPIC_NAME..."
aws sns create-topic --name "$TOPIC_NAME" --region us-east-1
