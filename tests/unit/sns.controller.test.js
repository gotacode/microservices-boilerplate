import { publishExampleController } from '../../src/api/controllers/sns.controller.js';
import * as snsClient from '../../src/infrastructure/messaging/snsClient.js';

jest.mock('../../src/infrastructure/messaging/snsClient.js');

describe('publishExampleController', () => {
  it('should return 200 with messageId', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    snsClient.publishMessage.mockResolvedValue({ MessageId: 'mock-id' });

    await publishExampleController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ messageId: 'mock-id' });
  });
});
