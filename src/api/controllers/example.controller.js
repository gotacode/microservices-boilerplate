import { GetExampleUseCase } from '../../application/use-cases/getExample.usecase.js';
import { InMemoryExampleRepository } from '../../infrastructure/repositories/inMemoryExample.repository.js';

const exampleRepository = new InMemoryExampleRepository();
const getExampleUseCase = new GetExampleUseCase(exampleRepository);

export const exampleController = (req, res) => {
  const { name, age } = req.body;
  res.status(200).json({ message: `Olá, ${name}! Você tem ${age} anos.` });
};

export const getExampleController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Example id is required.' });
    }

    const result = await getExampleUseCase.execute({ id });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
