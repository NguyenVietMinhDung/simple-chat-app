const express = require('express');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');
const { databaseConfig } = require('./config');

const app = express();

const { Schema } = mongoose;
const CommentSchema = new Schema({
  name: String,
  message: String,
  createdAt: Date,
});
CommentSchema.plugin(mongoosePaginate);
const CommentModel = mongoose.model('Comment', CommentSchema);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  preflightContinue: false,
}));

app.get('/comments', (req, res) => {
  const { page, limit } = req.query;
  CommentModel.paginate({}, {
    page: Number.parseInt(page),
    limit: Number.parseInt(limit),
  }, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.send(result);
  });
});

app.post('/comments', (req, res) => {
  const comment = new CommentModel(req.body);
  comment.save((err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    io.emit('comment', ...Object.values(req.body));
    res.sendStatus(200);
  });
});

app.delete('/comments', (req, res) => {
  CommentModel.remove({}, (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
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
