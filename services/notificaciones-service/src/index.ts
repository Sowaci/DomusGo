import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notificationsRoutes from './routes/notifications.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4003;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'DomusGo Notificaciones Service funcionando correctamente 🚀' });
});

app.use('/notifications', notificationsRoutes);

app.listen(PORT, () => {
  console.log(`Notificaciones Service corriendo en http://localhost:${PORT}`);
});