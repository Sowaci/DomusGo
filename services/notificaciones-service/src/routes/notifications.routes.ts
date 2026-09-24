import { Router } from 'express';
import prisma from '../config/prisma';

const router = Router();


router.post('/', async (req, res) => {
  const { userId, type, message } = req.body;

  const notification = await prisma.notification.create({
    data: {
      userId,
      type,
      message,
    },
  });

  console.log(`📩 Notificación simulada para el usuario ${userId}: "${message}"`);

  res.status(201).json(notification);
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const notifications = await prisma.notification.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: 'desc' },
  });

  res.json(notifications);
});

export default router;