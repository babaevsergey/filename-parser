import express from 'express';
import { createServer as createViteServer } from 'vite';
import { readFile, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
  });

  app.use(express.static(resolve(__dirname, '../public')));
  app.use(vite.middlewares);

  const filePath = resolve(__dirname, '../public', 'resources.json');

  app.use(express.json());

  app.get('/api/materials', async (req, res) => {
    try {
      const data = await readFile(filePath, 'utf-8');

      // Отключаем кеширование
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Could not read file' });
    }
  });

  app.post('/api/materials', async (req, res) => {
    const updatedMaterials = req.body;
    await writeFile(filePath, JSON.stringify(updatedMaterials, null, 2));
    res.json({ message: 'Materials updated' });
  });

  app.delete('/api/materials', async (req, res) => {
    const { material, size } = req.body;
    const data = await readFile(filePath, 'utf-8');
    const materials = JSON.parse(data);

    if (size) {
      materials[material] = materials[material].filter(s => s !== size);
    } else {
      delete materials[material];
    }

    await writeFile(filePath, JSON.stringify(materials, null, 2));
    res.json({ message: 'Material or size deleted' });
  });

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../public', 'index.html'));
  });

  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    console.log(__filename);
    console.log(__dirname);
    console.log(filePath);
  });
}

createServer();
