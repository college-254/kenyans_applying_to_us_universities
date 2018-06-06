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
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// The converter translates markdown documents into HTML
var converter = new showdown.Converter({metadata: true});
converter.setOption("completeHTMLDocument", true);
converter.setOption("tables", true);

var re_less_than = /{REPLACE_ME}&lt;/g; // g is a flag for 'global search'
var re_greater_than = /{REPLACE_ME}&gt;/g;

var command_args = process.argv;
var folder_destination = command_args[2];

// Convert all of the markdown documents specified in the input
for (var i = 3; i < command_args.length; i++) {
    var input_file_name = command_args[i];

    fs.readFile(input_file_name, "utf8", (error, data) => {

        if (error) throw error;
        
        // Prepare the HTML document that will hold the markdown doc's contents
        var output_file_name = input_file_name.split("/")[1].split(".md")[0]
        var output_file_path = `./views/${folder_destination}/${output_file_name}.ejs`;
        fs.open(output_file_path, 'w', (error, file_descriptor) => {

            var dom = new JSDOM(converter.makeHtml(data));
            var document = dom.window.document;

            // Append information to match the rest of the HTML docs 
            var element = document.getElementsByTagName("head")[0];

            // console.log(document.getElementsByTagName("head"));
            element.insertAdjacentHTML("beforeend", "{REPLACE_ME}<% include ../partials/header.ejs %{REPLACE_ME}>");
            
            element = document.getElementsByTagName("body")[0];
            element.outerHTML = `
                {REPLACE_ME}<% include ../partials/navbar.ejs %{REPLACE_ME}>
                <div id='main_div'>${element.innerHTML}</div>
                {REPLACE_ME}<% include ../partials/footer.ejs %{REPLACE_ME}>`;

            var document_title = converter.getMetadata().title;
            if (!document_title) {
                console.log(`Please include a title in ${input_file_name} then run this script again`);
                return;
            }

            /* Spent too much time trying to escape < > in the serializer
               Resulted to a manual search and replacement. Unless angle brackets
               are part of tags, JSDOM autoescapes them. We need angle brackets
               for EJS templating, hence this egregious work around.
            */
            var serialized_html = dom.serialize();
            serialized_html = serialized_html.replace(re_greater_than, '>');
            serialized_html = serialized_html.replace(re_less_than, '<');

            // Write the HTML document that will have the markdown doc's content
            fs.write(
                file_descriptor, serialized_html,
                (err, written, str) => {

                    if (err) throw(err);
                    
                    console.log(`Wrote ${written} bytes to ${output_file_path}`);
                    fs.close(file_descriptor, (err) => {
                        
                        if (err) throw(err);

                        /* Now that we've written the intended file, let's 
                           update the navigation bar with new links if possible.
                           If we don't do this, the user would be expected to know
                           the actual URL beforehand.
                        */
                        fs.readFile(
                            "./views/partials/navbar.ejs", 
                            {"encoding": "utf8", "flag": "r+"}, 
                            (error, data) => {

                                if (error) throw(error);

                                var navbar_doc = new JSDOM(data).window.document;
                                var navbar_element = navbar_doc.getElementById(folder_destination);
                                var new_link = `<a href=/${folder_destination}/${output_file_name}>${document_title}</a>\n`;
                                if (navbar_element) {
                                    if (!navbar_element.innerHTML.includes(document_title)) {
                                        navbar_element.insertAdjacentHTML("beforeend", new_link);
                                        console.log(`Updated ${folder_destination} with ${document_title}`);
                                        fs.writeFile(
                                            "./views/partials/navbar.ejs",
                                            navbar_doc.getElementsByTagName("body")[0].innerHTML,
                                            (err) => {
                                                if (err) throw (err);
                                                console.log("Successfully modified navbar.ejs");
                                            });
                                    } else {
                                        console.log("The link in the navbar already existed; it wasn't modified.");
                                    }
                                } else {
                                    console.log(`There's no link to ${document_title}. Are
                                        sure that users will be able to find this page?`);
                                }
                            }
                        );
                    });
                }
            ); 
        });
    });
}

