#!/bin/bash

if [ "$1" == "college-guide" ]; then
	for filename in college_guide_markdown/*.md; do
		node markdown_to_ejs.js college-guide $filename
	done
fi