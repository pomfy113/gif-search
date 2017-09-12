var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var http = require('http');

app.get('/', function (req, res) {
  console.log(req.query.term)
  var queryString = req.query.term;
  // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
  var term = encodeURIComponent(queryString);
  // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
  var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

  http.get(url, function(response) {
    // SET ENCODING OF RESPONSE TO UTF8
    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d) {
      // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
      body += d;
    });

    response.on('end', function() {
      // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
      var parsed = JSON.parse(body);
      // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
      res.render('home', {gifs: parsed.data})
    });
  });
})

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/hello-squirrel', function (req, res){
    res.send('Hello squirrel! Again! Again!');
})

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'https://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
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
