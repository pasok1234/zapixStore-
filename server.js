const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./api/routes/auth');
const accountRoutes = require('./api/routes/account');
const configsRoutes = require('./api/routes/configs');
const { initDatabase } = require('./api/database/db');

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', accountRoutes);
app.use('/api/v1', configsRoutes);

app.use(express.static('.', {
  extensions: ['html']
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`сайт запущен на http://localhost:${PORT}`);
    console.log(`ендпоинты апишки http://localhost:${PORT}/api/v1`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});
