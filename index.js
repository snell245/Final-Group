var express = require('express');
var pug = require('pug');
var path = require('path');
var route = require('./routes/routes.js');
var bodyParser = require('body-parser');
var config = require('./config.json');

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

//SET UP THE ROUTES
app.get('/', function(req, res){
    res.render('home', {
        "title": "Home",
        "config": config
    });
});

app.get('/login', function(req, res){
    res.render('create', {
        'title': req.params.name,
    });
});


app.get('/', route.index);
app.get('/create', function(req, res){
    res.render('./create');
});
app.get('/edit:id', route.edit);
app.get('/details/:id', route.details);
app.post('/create', urlencodedParser, route.createUser);
app.post('/edit/:id', urlencodedParser, route.editUser);
app.get('/delete/:id', route.delete);

app.listen(3000);