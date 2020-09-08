const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');
const { databaseConfig } = require('./config');

const app = express();

const { Schema } = mongoose;
const CommentSchema = new Schema({
  name: String,
  message: String,
});
const CommentModel = mongoose.model('Comment', CommentSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  preflightContinue: false,
}));

app.get('/comments', (req, res) => {
  CommentModel.find({}, (err, comments) => {
    res.send(comments);
  });
});

app.post('/comments', (req, res) => {
  const comment = new CommentModel(req.body);
  comment.save((err) => {
    if (err) {
      res.sendStatus(500);
    }
    io.emit('comment', ...Object.values(req.body));
    res.sendStatus(200);
  });
});

mongoose.connect(databaseConfig.getConnectionUrl(), (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Mongodb connected');
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log('Server is running on port', server.address().port);
});

const io = socket.listen(server);
io.set('origins', '*:*');
io.on('connection', () => {
  console.log('A user is connected');
});
