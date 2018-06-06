var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('pages/home_page');
});

app.get(/college-guide*/, (request, response) => {
    response.render(`college-guide/${request.url.split("/")[2]}`);
});

app.get('/about', (request, response) => {
    response.render('pages/about_page');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});