module.exports = (err, _req, res, _next) => {
    console.error('Error:', err.message);
    res.status(400).json({ ok: false, error: err.message });
  };
  