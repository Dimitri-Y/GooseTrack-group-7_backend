## Goose Track

Code for server "GooseTrack".

This project is a task scheduler management web application that allows users to manage their daily, monthly or yearly routines. The main goal of the project is to provide users with tools to control their task schedule at any time of the day.

The project provides for the possibility of user registration, authentication and authorization. Additionally, users can create and track their tasks in the calendar, categorize them, view statistics, and edit and delete their tasks.
Also, the possibility of creating and modifying feedback, viewing feedback of other users has been implemented.

In addition, the application has a friendly and clear user interface that allows you to perform all the necessary actions conveniently and quickly. The project also ensures user security through password encryption and token-based identification.

Functional capabilities:

Registration and authorization, editing of users
Add, view and delete tasks in your calendar
CRUD feedback about the app
Get task categories and add/delete them
Display of detailed statistics on tasks
Displaying feedback from all users

Technology stack used in the project:
Node.js is a JavaScript execution environment on the server
Express.js is a framework for developing web applications on Node.js
MongoDB is a NoSQL database
Mongoose - a library for working with MongoDB in Node.js

Build:

- `yarn start' &mdash; server start in production mode -`yarn start:dev`&mdash; start the server in development mode
- `yarn' &mdash; start the server in production mode (production on render.com)
- `yarn lint' &mdash; run a code check run with eslint, must run before each PR and fix all linter errors
- `yarn lint:fix` &mdash; the same linter check, but with automatic fixes for simple errors
