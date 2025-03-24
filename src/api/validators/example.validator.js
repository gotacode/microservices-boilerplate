import { z } from 'zod';

const exampleSchema = z.object({
  name: z.string(),
  age: z.number().int().positive()
});

export const validateExamplePayload = (req, res, next) => {
  try {
    req.body = exampleSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
};
