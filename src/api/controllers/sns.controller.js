import { publishMessage } from '../../infrastructure/messaging/snsClient.js';

export const publishExampleController = async (req, res, next) => {
  try {
    const response = await publishMessage(process.env.SNS_TOPIC_ARN, {
      event: 'EXAMPLE_EVENT',
      timestamp: new Date().toISOString()
    });

    res.status(200).json({ messageId: response.MessageId });
  } catch (err) {
    next(err);
  }
};
