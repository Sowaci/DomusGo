import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'DomusGo User Service funcionando correctamente 🚀' });
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`User Service corriendo en http://localhost:${PORT}`);
});