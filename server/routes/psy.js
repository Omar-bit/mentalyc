const express = require('express');
const router = express.Router();
const { db } = require('../connectionDB.js');
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { name, pwd } = req.body;
  db.all(
    `SELECT * FROM psy WHERE name=? AND pwd=?`,
    [name, pwd],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      if (rows.length > 0) {
        const token = jwt.sign(
          { idPsy: rows[0].idPsy, name: rows[0].name },
          'secret'
        );

        res.json({
          error: false,
          data: {
            token: token,
            idPsy: rows[0].id,
            name: rows[0].name,
          },
        });
      } else {
        res.json({
          error: true,
          data: 'name or password is wrong',
        });
      }
    }
  );
});
module.exports = router;
