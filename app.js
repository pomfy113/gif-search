DEBUG=http:incoming,http:outgoing node index.js


var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();
var debug = require('debugger')();

// Use 'public folder'
app.use(express.static('public'));
// Use handlebars for layouts
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// It's a squirrel!
app.get('/hello-squirrel', function (req, res){
    res.send('Hello squirrel! Again! Again!');
})

// Greetings with a dog!
app.get('/hello-gif', function (req, res) {
  var gifUrl = 'https://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
})

// Extra page; basic about stuff
app.get('/about', function(req, res){
    res.render('about')
})

//app.get('/', function (req, res) {
//    console.log(req.query)
//    res.render('home')
//})

// Grabs name from URL and adds it into greeting string
app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
})

// Homepage giphy search engine
app.get('/', function (req, res) {
    // Sends response back to server for my sake
    console.log(res)

    // Giphy search API; grab the term and searches gifs related to it
    // If no search term or first time booting, render home on its own
    giphy.search(req.query.term, function (err, response) {
        if(response == undefined){
            res.render('home')
        }
    else{
        res.render('home', {term: req.query.term, gifs: response.data})
    }
  });
});

// Listening function
app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});
