var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var port = process.env.PORT || 8080;

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

app.get(/blog-posts*/, (request, response) => {
    response.render(`blog-posts/${request.url.split("/")[2]}`);
});

app.get('/book-rentals', (request, response) => {
    response.render('pages/book_rentals_page');
});

app.get('/about', (request, response) => {
    response.render('pages/about_page');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});