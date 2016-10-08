<?php

/* 
 * Copyright (C) 2016 jtfalkenstein
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
                <li class="dropdown" id="deptDropDown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
                        {{#if currentDepartment}}
                            Select Department                            
                        {{else}}
                        <strong>{{currentDepartment.Name}}</strong>
                        {{/if}}
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" id="deptsDropDown">
                        {{#each departments}}
                            <li><a href="#" data-department data-Id="{{Id}}" data-Name="{{Name}}">{{Name}}</a></li>
                        {{/each}}
                        <li role="separator" class="divider"></li>
                        <li><a href="#" id="createDepartment">Create New Department</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">
                        {{#if currentDepartment}}
                            {{#if currentQuiz}}
                            <strong>{{currentQuiz.Name}}</strong>
                            {{else}}
                            Select Quiz
                            {{#/if}}
                        {{else}}
                        Select department first
                        {{/if}}
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu" id="quizDropDown">
                        {{#each currentDepartment.Quizzes}}
                        <li><a href="#" data-quiz data-Id="{{@key}}" data-Name="{{this}}">{{this}}</a></li>
                        {{/each}}
                        <li role="separator" class="divider"></li>
                        <li><a href="#" id="createQuiz">Create new quiz</a></li>
                    </ul>
                </li>
                {{#if currentDepartment}}
                <li><a href="link" id="editDept">Edit Department</a></li>
                {{/if}}
            </ul>
        </div>
    </div>
</nav>

