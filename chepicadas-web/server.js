import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
app.disable('x-powered-by');

// ---- Seguridad + performance ----
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https://*.google.com', 'https://*.gstatic.com', 'https://*.googleusercontent.com'],
        frameSrc: ['https://www.google.com', 'https://maps.google.com'],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'", 'https://wa.me', 'https://api.whatsapp.com'],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);
app.use(compression());

// ---- Cache: CSS/JS/HTML revalidan (no-cache + ETag); media, caché larga ----
const LONG_CACHE = /\.(?:png|jpe?g|webp|avif|gif|svg|ico|woff2?|mp4|webm|pdf)$/i;
const staticOpts = {
  etag: true,
  lastModified: true,
  setHeaders(res, filePath) {
    res.setHeader('Cache-Control', LONG_CACHE.test(filePath) ? 'public, max-age=604800' : 'no-cache');
  },
};

// Solo se exponen estas carpetas/archivos (nunca server.js, package.json ni node_modules)
app.use('/css', express.static(join(__dirname, 'css'), staticOpts));
app.use('/js', express.static(join(__dirname, 'js'), staticOpts));
app.use('/assets', express.static(join(__dirname, 'assets'), staticOpts));

// Archivos sueltos de la raíz
['/favicon.svg', '/robots.txt', '/sitemap.xml', '/carta.pdf'].forEach((file) => {
  app.get(file, (req, res) => res.sendFile(join(__dirname, file), { headers: { 'Cache-Control': 'no-cache' } }));
});

// ---- Páginas: URL limpia → archivo .html de la raíz ----
const PAGES = {
  '/': 'index.html',
  '/carta': 'carta.html',
  '/historia': 'historia.html',
  '/sucursales': 'sucursales.html',
  '/reservas': 'reservas.html',
};
for (const [route, file] of Object.entries(PAGES)) {
  const send = (req, res) => res.sendFile(join(__dirname, file), { headers: { 'Cache-Control': 'no-cache' } });
  app.get(route, send);
  if (route !== '/') app.get(`${route}.html`, send); // /carta.html también funciona
}

// ---- 404 con diseño propio ----
app.use((req, res) => {
  res.status(404).sendFile(join(__dirname, '404.html'), { headers: { 'Cache-Control': 'no-cache' } });
});

app.listen(PORT, () => {
  console.log(`Che Picadas escuchando en http://localhost:${PORT}`);
});
