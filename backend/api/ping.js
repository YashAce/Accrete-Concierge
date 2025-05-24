const express = require('express');
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { userId, message } = req.body;

    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid or missing userId');
    }

    if (!message || typeof message !== 'string') {
      throw new Error('Invalid or missing message');
    }

    const ts = new Date().toISOString();
    
    return res.status(200).json({ ok: true, ts, message: "Ping Received!" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
