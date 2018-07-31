# Contents

* [To-do List](#kenyans-applying-to-us-universities-to-do-list)

* [How to publish new articles](#how-to-publish-new-articles)

The test instance is running at [https://masomo254.herokuapp.com/](https://applicants-254.herokuapp.com/) from the `prod` branch.

## To-do List

<sub><sup>[:arrow_up: Back to top](#contents)</sup></sub>

If you have some time on your hands, help us achieve any of the following. We're welcome to pull requests and suggestions on how to imporove this project.

* :white_check_mark: Transfer the college guide from WordPress to markdown documents.

* :white_check_mark: Write a module for converting markdown documents to the HTML needed for the website. As soon as a writer transforms their markdown doc using `markdown_to_HTML.js`, we want it up on the website without having to fiddle with HTML docs.

  * :white_check_mark: Ensure that the content is placed inside main_div

  * :white_check_mark: Display an article's metadata on the web page.

* :white_check_mark: Include a calendar on the home page. Add events related to college applications.

* Style the website to be presentable even on mobile.

* Generate shop data from the database. Implement logic for maintaining shop's inventory.

* ~~Support basic user accounts. Current students in the US should be able to sign up as mentors/collaborators. Applicants should be able to sign up as applicants. Match them up, but let the users find other means of chatting, e.g. WhatsApp. Don't write a messaging platform!~~

## How to Publish New Articles

<sub><sup>[:arrow_up: Back to top](#contents)</sup></sub>

Write an appropriate markdown document in `./posts_markdown/`. Include relevant metadata at the top of the markdown document. Please name your .md file in this format: `YYYY-MM-DD-title.md`. For instance, in `./posts_markdown/2017-06-03-new-sat-rentals-available.md`, you might have metadata:

    ```markdown
    ---

    title: New SAT Rentals Available
    author: Chege Gitau
    date: 2017-06-03
    tags: [resources, sat-prep]
    abstract: We now have Princeton Review prep books for Math IC and Math IIC, and Barron's prep books for Biology E/M and Chemistry.

    ---

    We're now offering SAT Prep Books...{Rest of the Document}
    ```

That's it! There are under-the-hood scripts that will make sure that the post and appropriate hyperlinks appear on the website.