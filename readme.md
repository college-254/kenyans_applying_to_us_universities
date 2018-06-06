# Contents

* [Kenyans Applying to US Universities To-do List](#kenyans-applying-to-us-universities-to-do-list)

* [How to write new articles](#how-to-publish-new-articles)

## Kenyans Applying to US Universities To-do List

* Transfer the college guide from WordPress.

  * The CSS of the pages isn't quite right. Fix that.

* Automate the inclusion of links to new posts into the relevant html files.

* Make navigating the website easier (college guide, announcements, resources, dates, shop).

* Support user accounts.

## How to Publish New Articles

1. Write an appropriate markdown document in `./posts_markdown/`. Include relevant metadata at the top of the markdown document. [Pandoc has more info on how to write YAML metadata](https://pandoc.org/MANUAL.html). Please name your .md file in this format: `YYYY-MM-DD-title.md`.

  For instance, in `./posts_markdown/2018-06-03-new-sat-rentals-available.md`, you might have metadata of the form:

    ```
    ----
    title: New SAT Rentals Available
    author: Chege Gitau
    tags: [resources, sat-prep]
    abstract: |
      We now have Princeton Review prep books for Math IC and Math IIC, and Barron's prep books for Biology E/M and Chemistry.

      See the blog post for price info.
    ```

1. From the root folder, run `$ node markdown_to_HTML.js blog-posts/YYYY-MM-DD-title.md` to create a complete HTML document. If you change the markdown document from step 1, re-run step 2 to ensure that the generated HTML documents are up to date.