const express = require('express');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const redis = require('redis');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

const redisClient = require('./config/redisconnect')


const layouts = ['layout1', 'layout2', 'layout3'];

function consistentHash(key) {
  const hash = crypto.createHash('md5').update(key).digest('hex');
  const hashValue = parseInt(hash, 16);
  return hashValue % layouts.length;
}

app.get('/layout', async (req, res) => {
  try {
    let userId = req.cookies.userId;

    if (!userId) {
      userId = crypto.randomBytes(16).toString('hex');
      res.cookie('userId', userId, { maxAge: 24 * 60 * 60 * 1000 });
    }

    const cachedLayout = await redisClient.get(userId);

    if (cachedLayout) {
      res.json({ layout: cachedLayout });
    } else {
      const layoutIndex = consistentHash(userId);
      const layout = layouts[layoutIndex];
      await redisClient.set(userId, layout);
      res.json({ layout });
    }
  } catch (error) {
    console.error('Error serving layout:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app