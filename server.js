const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

let Score = require('./luckytest.model');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/luckytest', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


// create a GET route
app.get('/', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

const scoreRoutes = express.Router();


scoreRoutes.route('/').get(function(req, res) {
    Score.find(function(err, scores) {
        if (err) {
            console.log(err);
        } else {
            res.json(scores);
        }
    }).sort({'turn' : 1})
    ;
    
});


scoreRoutes.route('/sort').get(function(req, res) {
    Score.find(function(err, scores) {
        if (err) {
            console.log(err);
        } else {
            res.json(scores);
        }
    }).limit(100).sort({'turn' : 1})
        ;
});

scoreRoutes.route('/superior/:id').get(function(req, res) {
    let page = parseInt(req.params.id);
    Score.find().count({'turn' : {$gt : page}},(err,num) => {
        res.json(num);
    })
        ;
});

scoreRoutes.route('/count').get(function(req, res) {
    let page = parseInt(req.params.id);
    Score.find().count((err,num) => {
        res.json(num);
    })
        ;
});


scoreRoutes.route('/add').post(function(req, res) {
    let score = new Score(req.body);
    score.save()
        .then(() => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(() => {
            res.status(400).send('adding new todo failed');
        });
});

app.use('/scores', scoreRoutes);
