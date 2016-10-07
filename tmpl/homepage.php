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
        
        
        
        
        <script src="../js/quizMaker.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function(){
                qm.departments = <?php echo json_encode($departments); ?>;
            });
            
        </script>
    </head>
    <body>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapsingMenu">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                <span class="navbar-brand">QuizMaker</span>
                </div>
                <div class="collapse navbar-collapse" id="collapsingMenu">
                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
                                Select Department 
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" id="deptsDropDown">
                                <li data-keep role="separator" class="divider"></li>
                                <li data-keep><a href="#" id="createDepartment">Create new department</a></li>
                            </ul>
                        </li>
                        <li><p class="navbar-text" id="currentDepartment">No department currently selected.</p></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
                                Select Quiz
                                <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu" id="quizDropDown">
                                <li data-keep role="separator" class="divider"></li>
                                <li data-keep><a href="#" id="createDepartment">Create new quiz</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <div class="container">
            
            <!-- sidebar -->
            <div class="col-sm-2 col-xs-3" id="sidebar"></div>
            <div class="col-sm-10 col-xs-7" id="mainCanvas"></div>
        </div>
        
    </body>
</html>