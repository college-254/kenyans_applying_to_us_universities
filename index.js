var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const markdown_to_html = require("./markdown_to_HTML.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('pages/home_page');
});

app.get(/college-guide*/, (request, response) => {
    generate_html(
        `./views${request.path}.md`, "pages/article_template", response
    );
});

app.get(/blog-posts*/, (request, response) => {
    generate_html(
        `./views${request.path}.md`, "pages/article_template", response
    );
});

app.get('/book-rentals', (request, response) => {
    response.render('pages/book_rentals_page');
});

app.get('/about', (request, response) => {
    response.render('pages/about_page');
});

app.get('/contribute', (request, response) => {
    response.render('pages/contributors_page');
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

function generate_html(markdown_filepath, target_template, response) {
    markdown_to_html.html_from_markdown_file(
        markdown_filepath,
        (err, parsed_html) => {
            if (err) response.render("pages/4xx_error_page");
            else response.render(target_template, parsed_html);
        }
    );
}