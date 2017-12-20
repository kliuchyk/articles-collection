const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Load view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

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

// Get Single Article
app.get('/article/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article: article
        });
    });
});

// Add route
app.get('/articles/add', (req, res) => {
    res.render('add_article', {
        title: 'Add Articles'
    });
});

// Add Submit POST Route
app.post('/articles/add', (req, res) => {
    const article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    
    article.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// Update Submit POST Route
app.post('/articles/edit/:id', (req, res) => {
    const article = {}
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id: req.params.id}
    
    Article.update(query, article, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// Deleting Article
app.delete('/article/:id', (req, res) => {
    let query = {_id:req.params.id}
    Article.remove(query, (err) => {
        if (err) {
            console.log(err);
        }
        res.send('Seccess');
    });
});

// Edit Article
app.get('/article/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            title: 'Edit Article',
            article: article
        });
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000...');
});