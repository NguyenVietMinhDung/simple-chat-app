const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Schema } = mongoose;

const app = express();

const authentication = {
  username: 'dungvmnguyen',
  password: 'caubehaudau67NTH',
};

const CommentSchema = new Schema({
  name: String,
  message: String,
});

const CommentModel = mongoose.model('Comment', CommentSchema);

const dbName = 'simple_chat_app';

const uri = `mongodb+srv://${authentication.username}:${authentication.password}@cluster0.npv8s.mongodb.net/${dbName}`;

mongoose.connect(uri, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Mongodb connected');
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  preflightContinue: false,
}));

app.get('/comments', (req, res) => {
  CommentModel.find({}, (err, messages) => {
    res.send(messages);
  });
});

app.post('/comments', (req, res) => {
  const comment = new CommentModel(req.body);
  comment.save((err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.sendStatus(200);
  })
});

const server = app.listen(8000, () => {
  console.log('Server is running on port', server.address().port);
});
