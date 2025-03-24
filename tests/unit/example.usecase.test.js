import { GetExampleUseCase } from '../../src/application/use-cases/getExample.usecase.js';

describe('GetExampleUseCase', () => {
  it('should return a valid example entity', async () => {
    const useCase = new GetExampleUseCase();
    const result = await useCase.execute();

    expect(result).toHaveProperty('id', '123');
    expect(result).toHaveProperty('name', 'Example name');
    expect(result).toHaveProperty('createdAt');
  });
});
