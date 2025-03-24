import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { logger } from '../../config/logger.js';
import { processMessageWithRetry } from './sqsHandler.js';

const sqs = new SQSClient({ region: process.env.AWS_REGION });
const queueUrl = process.env.SQS_QUEUE_URL;

export const pollMessages = async () => {
  try {
    const command = new ReceiveMessageCommand({
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 5,
      WaitTimeSeconds: 20,
    });

    const response = await sqs.send(command);
    if (response.Messages) {
      for (const message of response.Messages) {
        try {
          await processMessageWithRetry(message);
          await sqs.send(new DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: message.ReceiptHandle
          }));
        } catch (err) {
          logger.error({ err }, 'Failed to process message');
        }
      }
    }
  } catch (err) {
    logger.error({ err }, 'Error polling messages from SQS');
  }
};
