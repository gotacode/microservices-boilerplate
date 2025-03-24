import path from 'path';
import { Pact } from '@pact-foundation/pact';
import { publishMessage } from '../../src/infrastructure/messaging/snsClient.js';

describe('SNS Publisher Contract', () => {
  const provider = new Pact({
    consumer: 'ExampleMicroservice',
    provider: 'SNSBroker',
    port: 1234,
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info'
  });

  it('should send a valid SNS message', async () => {
    const event = {
      event: 'EXAMPLE_EVENT',
      timestamp: new Date().toISOString()
    };

    // Simulação apenas, já que SNS é externo
    const result = await publishMessage('arn:aws:sns:us-east-1:123456789012:example-topic', event);
    expect(result).toBeDefined();
  });
});
