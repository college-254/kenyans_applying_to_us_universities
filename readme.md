# Contents

* [Deploying the Site](#deploying-the-site)

* [To-do List](#kenyans-applying-to-us-universities-to-do-list)

* [How to publish new articles](#how-to-publish-new-articles)

## Deploying the Site

The site is primarily served from Google Cloud Platform, but we also maintain a backup site on Heroku.

To deploy, switch to the `running-on-gcloud` and `running-on-heroku` branches. In each branch, pull the changes from the master branch, and then follow the deployment instructions in the readme.

Please make sure that you've not broken the site.

## To-do List

<sub><sup>[:arrow_up: Back to top](#contents)</sup></sub>

If you have some time on your hands, help us achieve any of the following. We're welcome to pull requests and suggestions on how to imporove this project.

* Support basic user accounts. 
  * Current students in the US should be able to sign up as mentors/collaborators. 
  * Applicants should be able to sign up as applicants. 
  * Match them up, but let the users find other means of chatting, e.g. WhatsApp. Don't write a messaging platform!

* WordPress used to provide stats for us. We now need to fetch the logs ourselves and get some stats from them.

* There is a version on Heroku and one on gcloud. Figure out a way of ensuring 100% up-time without spending any $$$.

:white_check_mark: Transfer the college guide from WordPress to markdown documents.

:white_check_mark: Generate HTML directly from markdown. All future posts should be written in markdown.

:white_check_mark: Include a calendar on the home page with events related to college applications.

:white_check_mark: Style the website to be presentable even on mobile.

## How to Publish New Articles

<sub><sup>[:arrow_up: Back to top](#contents)</sup></sub>

1. Write an appropriate markdown document in `./posts_markdown/`. Include relevant metadata at the top of the markdown document. Please name your .md file in this format: `YYYY-MM-DD-title.md`. For instance, in `./posts_markdown/2017-06-03-new-sat-rentals-available.md`, you might have metadata:

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

2. Add an hyperlink in the appropriate section of `./partials/navbar.ejs`.