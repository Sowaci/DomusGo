import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import imagesRoutes from './routes/images.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'DomusGo Media Service funcionando correctamente 🚀' });
});

app.use('/images', imagesRoutes);

app.listen(PORT, () => {
  console.log(`Media Service corriendo en http://localhost:${PORT}`);
});