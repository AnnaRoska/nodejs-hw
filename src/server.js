import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  pinoHttp({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
      },
    },
  }),
);

app.get('/notes', (_req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  const id = Number.parseInt(req.params.noteId, 10);

  if (Number.isNaN(id)) {
    res.status(400).json({ message: 'Please provide a valid ID' });
    return;
  }
    res.status(200).json( { message: `Retrieved note with ID: ${id}` } );
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});


app.use((error, req, res, next) => {
  res.status(500).json({
    message: error.message,
  });
});

const PORT = Number.parseInt(process.env.PORT, 10) || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server started on port ${PORT}`);
});








