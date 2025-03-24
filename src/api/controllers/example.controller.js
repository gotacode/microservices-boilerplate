export const exampleController = (req, res) => {
  const { name, age } = req.body;
  res.status(200).json({ message: `Olá, ${name}! Você tem ${age} anos.` });
};
