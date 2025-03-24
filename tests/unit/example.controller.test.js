import { getExampleController } from '../../src/api/controllers/example.controller.js';

describe('getExampleController', () => {
  it('should return 200 with example entity', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getExampleController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: '123', name: 'Example name' })
    );
  });
});
