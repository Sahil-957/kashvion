const express = require('express');
const cors = require('cors');
const billsRouter = require('./routes/bills');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/bills', billsRouter);

module.exports = app;
