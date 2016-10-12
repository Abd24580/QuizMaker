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
    'dataObjects',
    'underscore',
    'jquery',
    'jquery-ui'
],function(templating, dos, qm, repository, utils, mainWindow, dos,_, $){
    
    function quizEditor(quiz){
        this.model = quiz || {};
        this.template = templating.quizEditor;
        Object.defineProperties(this,{
            'data':{
                get: function data(){
                    this.model['Name'] = this.dom.find('[name="Name"]').val();
                    return this.model;
                }
            },'addQuestionButton':{
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
            
            this.addQuestionButton.click(this, function(e){
                var q = new dos.question();
                var id = _.uniqueId('NewQuestion');
                q.Id = id;
                e.data.model.addQuestion(q);
                e.data.rerender();
            });
            
            this.dom.find('button.editQuestion').click(this, function(e){
                var jqThis = $(this);
                var id = jqThis.data('id');
                e.data.model.Questions[id].editing = true;
            });
            
            this.dom.find('button.saveQuestion').click(this, function(e){
                var jqThis = $(this);
                var id = jqThis.data('id');
                var isNewQuestion = id.indexOf('NewQuestion') === 0;
                var questionDiv = jqThis.parents('div.question[data-id="' + id + '"]');
                var answerInputs = questionDiv.find('[name="' + id + 'Answer"]');
                var answers = [];
                answerInputs.each(function(i, el){
                    answers.push(el.value);
                });
                var corrAnswer = questionDiv.find('[name="' + id + 'Correct"]:checked').data('index');
                var questionParams = {
                    DepartmentId: qm.currentDepartment.Id,
                    QuizId: qm.currentQuiz.Id,
                    QuestionText: questionDiv.find('[name="QuestionText"]').val(),
                    AnswersArray: answers,
                    CorrectIndex: corrAnswer,
                    IncorrectMessage: questionDiv.find('[name="IncorrectMessage"]').val()
                };
                var question = new dos.question(questionParams);
                question.Id = isNewQuestion ? null : id;
                repository.storeQuestion(question);
            });
            
            this.dom.find('button.addAnswer').click(this, function(e){
                var jqThis = $(this);
                var id = jqThis.data('id');
                var questionDiv = jqThis.parents('div.question[data-id="' + id + '"]');
                //Add new input grouping here...
            });
            
            
            
        };
    }
    
    quizEditor.prototype = mainWindow;
    
    return quizEditor;
});
