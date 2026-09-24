import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

console.log('PROPERTIES_SERVICE_URL:', process.env.PROPERTIES_SERVICE_URL);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'DomusGo API Gateway funcionando correctamente 🚀' });
});

app.use(
  '/api/properties',
  createProxyMiddleware({
    target: process.env.PROPERTIES_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/properties${path === '/' ? '' : path}`,
  })
);

app.use(
  '/api/auth',
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/auth${path === '/' ? '' : path}`,
  })
);

app.use(
  '/api/images',
  createProxyMiddleware({
    target: process.env.MEDIA_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/images${path === '/' ? '' : path}`,
  })
);

app.use(
  '/api/notifications',
  createProxyMiddleware({
    target: process.env.NOTIFICATIONS_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: (path) => `/notifications${path === '/' ? '' : path}`,
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});