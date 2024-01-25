const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cors());
const psyRouter = require('./routes/psy.js');
const patientRouter = require('./routes/patient.js');
const sessionRouter = require('./routes/session.js');
const { db } = require('./connectionDB.js');
app.get('/', (req, res) => {
  res.send('Working...');
});
app.use('/api/psy', psyRouter);
app.use('/api/patient', patientRouter);
app.use('/api/session', sessionRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server started on port ' + port));
