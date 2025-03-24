import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const sns = new SNSClient({ region: process.env.AWS_REGION });

export const publishMessage = async (topicArn, message) => {
  const command = new PublishCommand({
    TopicArn: topicArn,
    Message: JSON.stringify(message),
  });

  return await sns.send(command);
};
