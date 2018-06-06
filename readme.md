# Contents

* [To-do List](#kenyans-applying-to-us-universities-to-do-list)

* [How to publish new articles](#how-to-publish-new-articles)

## To-do List

If you have some time on your hands, help us achieve any of the following. We're welcome to pull requests. Cheers!

* :white_check_mark: Transfer the college guide from WordPress to markdown documents.

* CSS is a pain. Help out by writing better CSS rules. As a collorary, avoid having inline CSS styling since it's hard to keep track of. Let the HTML files be be vanilla, and have the stylesheets work their magic.

* (In Progress) Write a module for converting markdown documents to the HTML needed for the website. As soon as a writer transforms their markdown doc using `markdown_to_HTML.js`, we want it up on the website without having to fiddle with HTML docs.

* Make navigating the website easier (college guide, announcements, resources, dates, shop).

* Support user accounts.

## How to Publish New Articles

1. Write an appropriate markdown document in `./posts_markdown/`. Include relevant metadata at the top of the markdown document. [Pandoc has more info on how to write YAML metadata](https://pandoc.org/MANUAL.html). Please name your .md file in this format: `YYYY-MM-DD-title.md`.

  For instance, in `./posts_markdown/2018-06-03-new-sat-rentals-available.md`, you might have metadata of the form:

```markdown
----

title: New SAT Rentals Available
author: Chege Gitau
tags: [resources, sat-prep]
abstract: |
  We now have Princeton Review prep books for Math IC and Math IIC, and Barron's prep books for Biology E/M and Chemistry.

  See the blog post for price info.

---
```

1. From the root folder, run `$ node markdown_to_HTML.js blog-posts/YYYY-MM-DD-title.md` to create a complete HTML document. If you change the markdown document from step 1, re-run step 2 to ensure that the generated HTML documents are up to date.