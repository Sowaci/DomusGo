import { Router } from 'express';
import prisma from '../config/prisma';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', async (req, res) => {
  const { minPrice, maxPrice, type, location, bedrooms, minArea, maxArea } = req.query;

  const where: any = {
    isAvailable: true,
  };

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  if (type) {
    const types = (type as string).split(',').map((t) => t.trim());
    where.type = { in: types };
  }
  
  if (location) {
    where.location = {
      contains: location as string,
      mode: 'insensitive',
    };
  }

  if (bedrooms) {
    where.bedrooms = Number(bedrooms);
  }

  if (minArea || maxArea) {
    where.areaSqm = {};
    if (minArea) where.areaSqm.gte = Number(minArea);
    if (maxArea) where.areaSqm.lte = Number(maxArea);
  }

  const properties = await prisma.property.findMany({ where });

  res.json(properties);
});

router.post('/', authMiddleware, async (req, res) => {
  const { title, description, price, type, bedrooms, bathrooms, areaSqm, location } = req.body;

  const newProperty = await prisma.property.create({
    data: { title, description, price, type, bedrooms, bathrooms, areaSqm, location },
  });

  res.status(201).json(newProperty);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updatedProperty = await prisma.property.update({
    where: { id: Number(id) },
    data,
  });

  res.json(updatedProperty);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  await prisma.property.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
});

export default router;