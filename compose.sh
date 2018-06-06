#!/bin/bash

# To generate the html for all the college guide articles,
# run `$ ./compose.sh college-guide`
if [ "$1" == "college-guide" ]; then
	for filename in college_guide_markdown/*.md; do
		node markdown_to_HTML.js college-guide $filename
	done
fi