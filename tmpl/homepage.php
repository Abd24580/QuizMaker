<?php

/* 
 * Copyright (C) 2016 jfalkenstein
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

?>

<!DOCTYPE html>
<html>
    <head>
        <title>QuizMaker</title>
        <link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="../bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
        <link rel="stylesheet" type="text/css" href="../css/additional.css">
        <script src="../bower_components/jquery/dist/jquery.min.js" type="text/javascript"></script>
        <script src="../bower_components/bootstrap/dist/js/bootstrap.js" type="text/javascript"></script>
        <script src="../bower_components/handlebars/handlebars.min.js" type="text/javascript"></script>
        <script id="quiz-template" type="text/x-handlers-template">
            <?php include 'quiz.hb.php';?>
        </script>
        <script id="question-partial" type="text/x-handlers-template">
            <?php include 'question.hb.php';?>
        </script>
        <script id="deptEditor-template" type="text/x-handlers-template">
            <?php include 'deptEditor.hb.php';?>
        </script>
        <script id="navBar-template" type="text/x-handlebars-template">
            <?php include 'navbar.hb.php'; ?>
        </script>
        <script data-main="../js/app" src="../js/require.js"></script>
        
        
        <script type="text/javascript">
            
        </script>
    </head>
    <body>
        <div id="navBarContainer"></div>
        
        <div class="container">
            <div class="col-sm-6 col-sm-offset-3" id="mainCanvas"></div>
        </div>
        
    </body>
</html>