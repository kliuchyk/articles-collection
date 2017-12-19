const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

// Bring in Models
const Article = require('./models/article');

const app = express();

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Check for DB Errors
db.on('error', (err) => {
    console.log(err);
});

// Load view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Home route  
app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles: articles 
            });
        }
    });
});

// Add route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Articles'
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});