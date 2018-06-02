/**
 * A helper module for converting markdown documents into EJS
 * files.
 */

var showdown = require("showdown");
var fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var converter = new showdown.Converter({metadata: true});
converter.setOption("completeHTMLDocument", true);
converter.setOption("tables", true);

var re_less_than = /{REPLACE_ME}&lt;/g;
var re_greater_than = /{REPLACE_ME}&gt;/g;

var command_args = process.argv;
var folder_destination = command_args[2];



for (var i = 3; i < command_args.length; i++) {

    var input_file_name = command_args[i];

    fs.readFile(input_file_name, "utf8", (error, data) => {

        if (error) throw error;

        var output_file_name = `./views/${folder_destination}/${input_file_name.split("/")[1].split(".md")[0]}.ejs`;
        fs.open(output_file_name, 'w', (error, file_descriptor) => {
            
            var dom = new JSDOM(converter.makeHtml(data));
            var document = dom.window.document;

            // Append information to match the rest of the HTML docs 
            var element = document.getElementsByTagName("head")[0];
            element.insertAdjacentHTML("beforeend", "{REPLACE_ME}<% include ../partials/header.ejs %{REPLACE_ME}>");
            
            element = document.getElementsByTagName("body")[0];
            element.insertAdjacentHTML(
                "afterbegin",
                "{REPLACE_ME}<% include ../partials/navbar.ejs %{REPLACE_ME}><div id='main_div'>"
            );
            element.insertAdjacentHTML(
                "beforeend",
                "</div><footer class='w3-container w3-black'>{REPLACE_ME}<% include ../partials/footer.ejs %{REPLACE_ME}></footer>"
            );

            // Spent too much time trying to escape < > in the serializer
            // Resulted to a manual search and replacement.
            var serialized_html = dom.serialize();
            serialized_html = serialized_html.replace(re_greater_than, '>');
            serialized_html = serialized_html.replace(re_less_than, '<');

            fs.write(
                file_descriptor, serialized_html,
                (err, written, str) => {
                    fs.close(file_descriptor, (err) => {
                        console.log(`Wrote ${written} bytes to ${output_file_name}`);
                    });
                });
            
        });
    });
}

