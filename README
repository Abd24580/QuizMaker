#QuizMaker

##Project summary:
QuizMaker was created as an editor for quizzes. It does not administer them, only
allows users to edit existing quizzes and create new quizzes. Quizzes consist
of multiple choice questions. Each question has a message for when the user gets
a question wrong. Quizzes are organized into departments.

##Technologies used:
*   Backend: PHP 5.3 compatible. It is intended to be run either on centralized
web server or within a portable solution, like QuickPHP on a flash drive. Logging
service is provided by the [KLogger](https://github.com/katzgrau/KLogger/) library.

*   Front end: A single page application written in JavaScript, making use of jQuery
and jQuery-UI, Bootstrap, UnderscoreJs, HandlebarsJS templating, and RequireJs.

*   HTML quiz downloading functionality is provided by the [JSON-Human]
(http://marianoguerra.github.io/json.human.js) project.

*   Quiz and department data is stored exclusively in JSON format. As such, QuizMaker
is not intended for heavy parallel usage by multiple users. Such heavy use could lock
up the json files for read/write access.

##Package manager information:
For this project, Bower was used to access js & css dependencies, while Composer
was used to access PHP dependencies. Respective config files are included for these,
though the necessary files and directories are included in this repository, so these
are unnecessary except if you want to do further development on this project.


##Configuration:
*   All http requests should be directed at index.php. This will serve the home page.
As a single-page application, all content can be accessed from that single page.
*   Configuration for settings such as the log level, log file location, and data
storage location can be configured in config/config.php. This is a simple PHP associative
array. Default location for logs and data are "log/" and "data/", respectively.
These will be created the first time they are needed. Default log level is "debug",
which provides the most information. However, lower levels can be set which will log
less information about requests.
