# Contents

* [Kenyans Applying to US Universities To-do List](#kenyans-applying-to-us-universities-to-do-list)

* [How to write new articles](#how-to-publish-new-articles)

## Kenyans Applying to US Universities To-do List

:white_check_mark: Transfer the college guide from WordPress.

* Automate the inclusion of links to new posts into the relevant html files.

* Make navigating the website easier (college guide, announcements, resources, dates, shop).

* Support user accounts.

## How to Publish New Articles

1. Write an appropriate markdown document in `./posts_markdown/`. Include relevant metadata at the top of the markdown document. [Pandoc has more info on how to write YAML metadata](https://pandoc.org/MANUAL.html). Please name your .md file in this format: `YYYY-MM-DD-title.md`.

1. From the root folder, run `$ node markdown_to_html blog-posts/YYYY-MM-DD-title.md` to create a complete HTML document.