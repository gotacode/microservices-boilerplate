import pRetry from 'p-retry';
import { logger } from '../../config/logger.js';

const processedMessages = new Set(); // Simulação de idempotência (ideal: persistência)

const handleMessage = async (message) => {
  const messageId = message.MessageId;
  if (processedMessages.has(messageId)) {
    logger.info({ messageId }, 'Duplicate message ignored (idempotent)');
    return;
  }

  const payload = JSON.parse(message.Body);
  logger.info({ messageId, payload }, 'Processing message');

  // Simula erro para teste de retry
  if (payload.failOnce && !payload.retryAttempted) {
    payload.retryAttempted = true;
    throw new Error('Simulated transient failure');
  }

  processedMessages.add(messageId);
  logger.info({ messageId }, 'Message processed successfully');
};

export const processMessageWithRetry = (message) =>
  pRetry(() => handleMessage(message), {
    retries: 3,
    onFailedAttempt: error => {
      logger.warn({ attempt: error.attemptNumber }, 'Retrying message...');
    }
  });
