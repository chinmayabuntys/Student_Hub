const express = require('express');
const cors = require('cors');
const { configDotenv } = require('dotenv');

configDotenv();   // ⭐ move here

const connectDB = require('./dbConnection/db');
const stdRoute = require('./routes/stdRouter');
const stdSubRouter = require('./routes/stdSubRouter');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: 'server is running' });
});

app.use('/api/std', stdRoute);
app.use('/api/subject', stdSubRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});