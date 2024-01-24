const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { db } = require('../connectionDB.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
router.use(auth);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Get all sessions
router.get('/getAll', (req, res) => {
  db.all(
    `SELECT * FROM session as s , patient as p where p.idPat = s.idPat and s.idPsy =? `,
    [req.idPsy],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      res.json({
        error: false,
        data: rows,
      });
    }
  );
});

router.get('/getOne', (req, res) => {
  const { idPat, date } = req.query;
  console.log(idPat, date);
  db.all(
    `SELECT * FROM session as s , patient as p where p.idPat = s.idPat and s.idPsy =? and s.idPat = ? and s.date = ?`,
    [req.idPsy, idPat, date],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      res.json({
        error: false,
        data: rows,
      });
    }
  );
});

router.delete('/delete', (req, res) => {
  const { idPat, date } = req.body;
  db.all(
    'select * from session where idPat = ? and idPsy = ? and date = ?',
    [parseInt(idPat), parseInt(req.idPsy), date],
    (err, rows) => {
      if (err) {
        return res.status(400).json({ error: true, data: err.message });
      }
      db.run(
        `DELETE FROM session WHERE idPat = ? and idPsy = ? and date = ? `,
        [parseInt(idPat), parseInt(req.idPsy), date],
        (err) => {
          if (err) {
            res.status(400).json({ error: true, data: err.message });
            return;
          }
        }
      );
      try {
        fs.unlinkSync(path.join('uploads', rows[0].records));
        console.log('File deleted!');
        return res.json({
          error: false,
          data: 'Session deleted successfully',
        });
      } catch (err) {
        console.error(err.message);
        return res.json({
          error: true,
          data: 'Unkown error',
        });
      }
    }
  );
});
router.post('/add', upload.single('records'), (req, res) => {
  const { idPat, date, notes } = req.body;
  const records = req.file?.originalname;

  db.run(
    `INSERT INTO session (idPat,idPsy,date,notes,records) VALUES (?,?,?,?,?)`,
    [idPat, req.idPsy, date, notes, records],
    (err) => {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      res.json({
        error: false,
        data: 'Session added successfully',
      });
    }
  );
});

module.exports = router;
