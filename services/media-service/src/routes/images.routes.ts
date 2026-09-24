import { Router } from 'express';
import { upload } from '../config/multer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

router.post('/', upload.single('image'), async (req, res) => {
  const { propertyId } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No se envió ninguna imagen' });
  }

  const newImage = await prisma.image.create({
    data: {
      propertyId: Number(propertyId),
      filename: file.filename,
      url: `http://localhost:4002/uploads/${file.filename}`,
    },
  });

  res.status(201).json(newImage);
});

router.get('/:propertyId', async (req, res) => {
  const { propertyId } = req.params;

  const images = await prisma.image.findMany({
    where: { propertyId: Number(propertyId) },
  });

  res.json(images);
});

export default router;