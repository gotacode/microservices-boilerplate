import { GetExampleUseCase } from '../../application/use-cases/getExample.usecase.js';

export const exampleController = (req, res) => {
  const { name, age } = req.body;
  res.status(200).json({ message: `Olá, ${name}! Você tem ${age} anos.` });
};

export const getExampleController = async (req, res, next) => {
  try {
    const useCase = new GetExampleUseCase();
    const result = await useCase.execute();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
