var showdown = require("showdown");
var fs = require("fs");

var converter = new showdown.Converter({metadata: true});
converter.setOption("completeHTMLDocument", true);

var command_args = process.argv;
var folder_destination = command_args[2];

for (var i = 3; i < command_args.length; i++) {
    var input_file_name = command_args[i];
    fs.readFile(input_file_name, "utf8", (error, data) => {
        if (error) throw error;
        var output_file_name = `./views/pages/${folder_destination}/${input_file_name.split("/")[1].split(".md")[0]}.html`;
        fs.open(output_file_name, 'w', (error, file_descriptor) => {
            fs.write(
                file_descriptor, converter.makeHtml(data), 
                (err, written, str) => {
                    console.log(`Wrote ${written} bytes to ${output_file_name}`);
            });
        });
    });
}

