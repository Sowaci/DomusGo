import { Router } from 'express';
import prisma from '../config/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const properties = await prisma.property.findMany();
  res.json(properties);
});

router.post('/', async (req, res) => {
  const { title, description, price, type, bedrooms, bathrooms, areaSqm, location } = req.body;

  const newProperty = await prisma.property.create({
    data: {
      title,
      description,
      price,
      type,
      bedrooms,
      bathrooms,
      areaSqm,
      location,
    },
  });

  res.status(201).json(newProperty);
});

// PUT /properties/:id → actualiza un inmueble existente (solo los campos enviados)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updatedProperty = await prisma.property.update({
    where: { id: Number(id) },
    data,
  });

  res.json(updatedProperty);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await prisma.property.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
});

export default router;