import { getExampleController } from '../../src/api/controllers/example.controller.js';

describe('getExampleController', () => {
  it('should return 200 with example entity', async () => {
    const req = { params: { id: '123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getExampleController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ id: '123', name: 'Example name' })
    );
  });

  it('should return 400 when id is missing', async () => {
    const req = { params: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getExampleController(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Example id is required.' });
    expect(next).not.toHaveBeenCalled();
  });
});
