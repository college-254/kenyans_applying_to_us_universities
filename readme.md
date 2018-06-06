# Contents

* [To-do List](#kenyans-applying-to-us-universities-to-do-list)

* [How to publish new articles](#how-to-publish-new-articles)

## To-do List

If you have some time on your hands, help us achieve any of the following. We're welcome to pull requests and suggestions on how to imporove this project.

* :white_check_mark: Transfer the college guide from WordPress to markdown documents.

* :white_check_mark: Write a module for converting markdown documents to the HTML needed for the website. As soon as a writer transforms their markdown doc using `markdown_to_HTML.js`, we want it up on the website without having to fiddle with HTML docs.

  * :white_check_mark: Ensure that the content is placed inside main_div

  * :white_check_mark: Display an article's metadata on the web page.

* Make navigating the website easier (college guide, announcements, resources, dates, shop) by including top level links and buttons.

* Support user accounts.

## How to Publish New Articles

1. Write an appropriate markdown document in `./posts_markdown/`. Include relevant metadata at the top of the markdown document. Please name your .md file in this format: `YYYY-MM-DD-title.md`. For instance, in `./posts_markdown/2017-06-03-new-sat-rentals-available.md`, you might have metadata of the form:

    ```markdown
    ---

    title: New SAT Rentals Available
    author: Chege Gitau
    date: 2017-06-03
    tags: [resources, sat-prep]
    abstract: We now have Princeton Review prep books for Math IC and Math IIC, and Barron's prep books for Biology E/M and Chemistry.

    ---
    ```

1. From the root folder, run `$ node markdown_to_HTML.js blog-posts/YYYY-MM-DD-title.md` to create a complete HTML document. If you change the markdown document from step 1, re-run step 2 to ensure that the generated HTML documents are up to date.