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

define([
    'templating',
    'dataObjects', 
    'quizMaker',
    'repository',
    './utils',
    './mainWindow',
    'jquery',
    'jquery-ui'
],function(templating, dos, qm, repository, utils, mainWindow, $){
    
    function quizEditor(quiz){
        this.model = quiz || {};
        this.template = templating.quizEditor;
        Object.defineProperties(this,{
            'data':{
                get: function data(){
                    this.model['Name'] = this.dom.find('[name="Name"]').val();
                    return this.model;
                }
            },'addQuestion':{
                get: function addQuestion(){
                    return this.dom.find('.addQuestion');
                }
            }
        });
        this.attachHandlers = function(){
            this.saveButton.click(this, function(e){
                var quiz = new dos.quiz(e.data.data);
                quiz.DepartmentId = qm.currentDepartment.Id;
                qm.bind('currentQuiz').once.to(function(quiz){
                    e.data.model = quiz;
                    e.data.rerender();
                });
                repository.storeQuiz(quiz);
            });
            
            this.cancelButton.click(this, function(e){
                e.data.hide();
                qm.unset('currentQuiz');
            });
            
            this.deleteButton.click(this, function(e){
                var message = "Are you sure you want to delete this quiz? This cannot be undone.";
                var id = e.data.data['Id'];
                var deptId = e.data.data['DepartmentId'];
                var options =  {
                    title: "Are you sure?",
                    buttons:[
                        {
                            text: "Delete this permanently.",
                            click:function(){
                                e.data.hide();
                                $(this).dialog('close');
                                repository.deleteQuiz(id, deptId);
                                qm.unset('currentQuiz');
                            }
                        },
                        {
                            text: "Cancel",
                            click: function(){
                                $(this).dialog('close');
                            }
                        }
                    ]
                };
                
                utils.showDialog(options, message);
            });
        };
    }
    
    quizEditor.prototype = mainWindow;
    
    return quizEditor;
});
