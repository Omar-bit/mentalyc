const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { db } = require('../connectionDB.js');
router.use(auth);
router.get('/getAll', (req, res) => {
  db.all(`SELECT * FROM patient where idPsy = ${req.idPsy}`, (err, rows) => {
    if (err) {
      res.status(400).json({ error: true, data: err.message });
      return;
    }
    res.json({
      error: false,
      data: rows,
    });
  });
});
router.get('/get/:id', (req, res) => {
  db.all(
    `SELECT * FROM patient WHERE idPat=?`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      res.json({
        error: false,
        data: rows[0],
      });
    }
  );
});
router.post('/add', auth, (req, res) => {
  const { name, phone, birthdate } = req.body;

  db.run(
    `INSERT INTO patient  VALUES (?, ?,?,?,?)`,
    [null, req.idPsy, name, phone, birthdate],
    function (err) {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      res.json({
        error: false,
        data: {
          idPat: this.lastID,
          idPsy: req.idPsy,
          name,
          phone,
        },
      });
    }
  );
});
router.delete('/delete/:id', (req, res) => {
  db.run(
    `DELETE FROM patient WHERE idPat=? and idPsy = ?`,
    [req.params.id, req.idPsy],
    function (err) {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      res.json({
        error: false,
        data: 'success',
      });
    }
  );
});
router.put('/update/:id', (req, res) => {
  const { name, phone, birthdate } = req.body;
  db.run(
    `UPDATE patient SET name=?,phone=? ,birthdate=? WHERE idPat=?`,
    [name, phone, birthdate, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      res.json({
        error: false,
        data: 'success',
      });
    }
  );
});
module.exports = router;
