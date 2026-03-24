import express from 'express';
import cors from 'cors';
import photosRouter from './src/routes/photos.js';
import eventsRouter from './src/routes/events.js';
import debugRouter from './src/routes/debug-drive.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://www.dizistheeasyway.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api/photos', photosRouter);
app.use('/api/events', eventsRouter);
app.use('/api/debug-drive', debugRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
