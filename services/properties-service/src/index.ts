import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import propertiesRoutes from './routes/properties.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'DomusGo API funcionando correctamente 🚀' });
});

app.use('/properties', propertiesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});