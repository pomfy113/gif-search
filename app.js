var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/hello-squirrel', function (req, res){
    res.send('Hello squirrel! Again! Again!');
});

app.get('/hello-gif', function (req, res) {
  var gifUrl = 'https://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
})

app.get('/greetings/:name', function (req, res) {
    var name = req.params.name;
    res.render('greetings', {name: name});
})

app.listen(3000, function () {
  console.log('Gif Search listening on port localhost:3000!');
});
