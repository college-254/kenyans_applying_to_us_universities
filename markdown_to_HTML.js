/**
 * A helper module for converting markdown documents into EJS files, which can
 * be rendered as HTML documents.
 * 
 * Usage: `$ node markdown_to_HTML.js {dest_folder} {filepath_to_markdown}`
 * 
 * Example: `$ node markdown_to_HTML.js blog-posts posts_markdown/2017-06-11-studying-your-way-to-nigh-perfect-scores.md`
 * 
 * Author: Chege Gitau, d.chege711@gmail.com
 * 
 */

var showdown = require("showdown");
var fs = require("fs");

// The converter translates markdown documents into HTML
var converter = new showdown.Converter({
    metadata: true,
    tables: true,
    completeHTMLDocument: false
});

/**
 * @description Parse the specified markdown file and return its metadata and 
 * body contents in HTML.
 * 
 * @param {String} file_path The location of the markdown file.
 * 
 * @param {Function} callback The first parameter is set only when the function
 * fails to read the specified file. Otherwise the parsed html is passed as the
 * second parameter as an object with the keys `metadata_html` and `content_html`
 * 
 */
exports.html_from_markdown_file = function(file_path, callback) {
    fs.readFile(file_path, "utf8", (err, data) => {
        if (err) { 
            console.error(err); 
            callback(err);
        } else {
            let content_html = converter.makeHtml(data);
            let metadata = converter.getMetadata();
            let metadata_html = `<title>${metadata.title}</title>`;
            delete metadata.title;
            Object.keys(metadata).forEach((key) => {
                metadata_html += `<meta name="${key}" content="${metadata[key]}">`;
            });
            console.log(content_html);
            callback(null, {
                metadata_html: metadata_html, content_html: content_html
            });
        }
    });
};

if (require.main === module) {
    exports.html_from_markdown_file(
        "./posts_markdown/2017-06-11-studying-your-way-to-nigh-perfect-scores.md",
        (err, results) => {
            if (err) console.error(err);
            else console.log(results);
        }
    );
}