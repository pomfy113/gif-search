var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');
var giphy = require('giphy-api')();

// Use 'public folder'
app.use(express.static('public'));
// Use handlebars for layouts
app.engine('handlebars', exphbs({defaultLayout: 'main'}));


app.set('view engine', 'handlebars');

app.get('/hello-squirrel', function (req, res){
    res.send('Hello squirrel! Again! Again!');
})

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'https://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
})

app.get('/about', function(req, res){
    res.render('about')
})

//app.get('/', function (req, res) {
//    console.log(req.query)
//    res.render('home')
//})

app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
})

app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});

app.get('/', function (req, res) {
  giphy.search(req.query.term, function (err, response) {
    if(response == undefined){
        res.render('home')
    }
    else{
    res.render('home', {gifs: response.data})
    }
  }


);
});
