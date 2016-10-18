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

define(['underscore','quizMaker','templating', 'repository', 'jquery', 'jquery-ui'], function(_,qm,templating,repo,$){
    
    
    var modalDialogOptions = {
        resizable: false,
        height: 'auto',
        width: 400,
        modal: true,
        show: 400,
        hide: 400
    };    
    
    
    function showQuizCloner(){
        var template = templating.questionCloner;
        var html = template(qm);
        var div = $(html);
        var currentQuiz = qm.currentQuiz;
        var options = {
            buttons: [
                {
                    text: "Clone!",
                    click: function(){
                    }
                }
            ]
        };
        div.dialog(modalDialogOptions);
    }
    
    
    return {
        showDialog: function(options, dialogText){
            var div = $('<div class="dialog">' + dialogText + '</div>');
            
            var selectedOptions = _.extend(modalDialogOptions, options);
            div.dialog(selectedOptions);      
        },
        showQuizCloner: showQuizCloner
    };
    
});
