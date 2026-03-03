import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';



const app = express();
const PORT = Number.parseInt(process.env.PORT, 10) || 3000;

// Глобальні middleware
app.use(logger);         // 1. Логер першим — бачить усі запити
app.use(express.json({
  type: ['application/json', 'application/vnd.api+json'],
}));                     // 2. Парсинг JSON-тіла
app.use(cors());         // 3. Дозвіл для запитів з інших доменів


// підключаємо групу маршрутів для роботи з нотатками
app.use(notesRoutes);
  
// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);


// підключення до MongoDB
await connectMongoDB();

// запуск сервера
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server started on port ${PORT}`);
});








