<?php

/* 
 * Copyright (C) 2016 Jon
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
<div class="quizEditor">
    <input type="hidden" name="Id" value="{{Id}}">
    <input type="hidden" name="DepartmentId" value="{{DepartmentId}}">
    <div class="form-group lead">
        <label for="Name">Quiz Name:</label>
        <input type="text" name="Name" id="Name" value="{{Name}}" >
    </div>
    <h3>Questions:</h3>
    {{#each Questions}}
        {{> question-partial this}}
    {{/each}}
    
</div>

