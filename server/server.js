import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './routes/api.js';
import secrets from './config/secrets.js';

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(secrets.mongo_connection, { 
  dbName: 'habit-coach',
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
}

app.use(cors());
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello, welcome to the Habit Coach API!');
});

api(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});