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
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get('/getAll', (req, res) => {
  db.all(
    `SELECT * FROM session as s , patient as p where p.idPat = s.idPat and s.idPsy =? order by Date(s.date) desc`,
    [req.idPsy],
    (err, rows) => {
      if (err) {
        res.status(400).json({ error: true, data: err.message });
        return;
      }
      console.log(rows);
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
          error: false,
          data: 'Unkown error',
        });
      }
    }
  );
});

router.post('/add', upload.single('records'), (req, res) => {
  const { idPat, date, notes } = req.body;
  const records = req.file.filename;

  const newName = generateUniqueName();
  let d = new Date();
  d = d.getHours() + ':' + d.getMinutes();
  /*fs.writeFile(
    path.join(__dirname, '..', 'uploads', newName + '.mp3'),
    fs.readFileSync(path.join(__dirname, '..', 'uploads', records)),
    (err) => {
      if (err) console.log(err);
      console.log('The file has been saved as MP3!');
    }
  );*/
  fs.writeFileSync(
    path.join(__dirname, '..', 'uploads', newName + '.mp3'),
    fs.readFileSync(path.join(__dirname, '..', 'uploads', records))
  );
  db.run(
    `INSERT INTO session (idPat,idPsy,date,notes,records) VALUES (?,?,?,?,?)`,
    [idPat, req.idPsy, date + ' ' + d, notes, newName + '.mp3'],
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
function generateUniqueName() {
  let date = new Date();
  return date.getTime();
}
module.exports = router;
