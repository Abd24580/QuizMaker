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
        <script src="../js/quizMaker.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function(){
                qm.setBinding('departments', function(depts){
                    var deptsDropDown = $('#deptsDropDown');
                    deptsDropDown.html('');
                    for(var d in depts){
                        deptsDropDown.append('<li><a href=# id=' + depts[d].Id + '>' + depts[d].Name + '</a></li>');
                    }
                });
            
                qm.departments = <?php echo json_encode($departments); ?>;
            });
            
        </script>
    </head>
    <body>
        <nav class="navbar navbar-default navbar-fixed-top">
            <div class="container-fluid">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                    <ul class="dropdown-menu" id="deptsDropDown">

                    </ul>
                </li>
            </div>
            
        </nav>
    </body>
</html>