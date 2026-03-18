import fs from 'fs';
import path from 'path';
import { createServer } from 'http';
import next from 'next';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure error logging
const logStream = fs.createWriteStream(
  path.join(__dirname, 'node_errors.log'),
  { flags: 'a' }
);

// Unified error handler
const logError = (type, error) => {
  const timestamp = new Date().toISOString();
  const message = error.stack || error.toString();
  logStream.write(`[${timestamp}] ${type}: ${message}\n`);
  console.error(`${type}:`, error);
};

// Error handlers
process.on('uncaughtException', (err) => {
  logError('UNCAUGHT_EXCEPTION', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logError('UNHANDLED_REJECTION', reason);
});

// Load Next config (ESM)
const nextConfig = (await import('./next.config.js')).default;

// Initialize Next.js app
const app = next({
  dev: false,
  conf: nextConfig,
  dir: __dirname
});

// Create and start server
try {
  await app.prepare();
  const server = createServer((req, res) => {
    app.getRequestHandler()(req, res).catch(err => {
      logError('ROUTE_HANDLER_ERROR', err);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
  });

  // Passenger handles port binding
  server.listen();

  console.log('Application started - Passenger handles port binding');
} catch (err) {
  logError('APP_INIT_FAILURE', err);
  process.exit(1);
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  logStream.end(() => process.exit(0));
});