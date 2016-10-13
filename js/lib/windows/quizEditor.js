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
    
    function saveButtonEvent(e){
        var quiz = new dos.quiz(e.data.data);
        quiz.DepartmentId = qm.currentDepartment.Id;
        qm.bind('currentQuiz').once.to(function(quiz){
            e.data.model = quiz;
            e.data.rerender();
        });
        repository.storeQuiz(quiz);
    };
    
    function cancelButtonEvent(e){
        e.data.hide();
        qm.unset('currentQuiz');
    };
    
    function deleteButtonEvent(e){
        var message = "Are you sure you want to delete this quiz? This cannot be undone.";
        var id = qm.currentQuiz.Id;
        var deptId = qm.currentDepartment.Id;
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
    }
    
    function addQuestionEvent(e){
        var q = new dos.question({
            DepartmentId: qm.currentDepartment.Id,
            QuizId: qm.currentQuiz.Id,
            Id: _.uniqueId('NewQuestion')
        });
        e.data.model.addQuestion(q);
        var temp = templating.questionEditor(q);
        var jqTemp = $(temp);
        var qList = e.data.dom.find('.questionsList');
        qList.append(jqTemp);
        attachHandlers(jqTemp, e.data);
    }
    
    function editQuestionEvent(e){
        var jqThis = $(this);
        var id = jqThis.data('id');
        var questionDiv = jqThis.parents('[class="question"][data-id="' + id + '"]');
        var question = e.data.model.Questions[id];
        var temp = templating.questionEditor(question);
        var jqEl = $(temp);
        questionDiv.html(jqEl.html());
        attachHandlers(questionDiv, e.data);
    }
    
    function saveQuestionEvent(e){
        var jqThis = $(this);
        var id = jqThis.data('id');
        var isNewQuestion = id.indexOf('NewQuestion') === 0;
        var questionDiv = jqThis.parents('div.question[data-id="' + id + '"]');
        var answerInputs = questionDiv.find('[name="' + id + 'Answer"]');
        var answers = [];
        answerInputs.each(function(i, el){
            answers.push(el.value);
        });
        var corrAnswer = questionDiv.find('[name="' + id + 'Correct"][checked]').data('index');
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
        qm.bind('currentQuiz').once.to(function(quiz){
            e.data.model = quiz;
            e.data.rerender();
        });
        repository.storeQuestion(question);
    }
    
    function addAnswerEvent(e){
        var jqThis = $(this);
        var id = jqThis.data('id');
        var questionDiv = jqThis.parents('div.question[data-id="' + id + '"]');
        var answersList = questionDiv.find('.answerList');
        var lastAnswer = answersList.find('.answerText').last();
        var newIndex = lastAnswer.length > 0 ? parseFloat(lastAnswer.data('index')) + 1 : 0;
        var newAnswer = {questionId: id, index: newIndex};
        if(newIndex === 0) newAnswer.correct = true;
        var temp = templating.answerEditor(newAnswer);
        var jqTemp = $(temp);
        attachHandlers(jqTemp, e.data);
        answersList.append(temp);  
    }
    
    function attachHandlers(element, data){
        
        element.find('.saveButton').click(data, saveButtonEvent);
        element.find('.cancelButton').click(data,cancelButtonEvent);
        element.find('.deleteButton').click(data,deleteButtonEvent);
        element.find('.addQuestion').click(data,addQuestionEvent);
        element.find('button.editQuestion').click(data, editQuestionEvent);
        element.find('button.saveQuestion').click(data, saveQuestionEvent);
        element.find('button.addAnswer').click(data, addAnswerEvent);
    }
    
    
    
    function quizEditor(quiz){
        this.model = quiz || {};
        this.template = templating.quizEditor;
        Object.defineProperties(this,{
            'data':{
                get: function data(){
                    this.model['Name'] = this.dom.find('[name="Name"]').val();
                    this.model['DeparmentId'] = qm.currentDepartment.Id;
                    return this.model;
                }
            }
        })
        this.attachHandlers = function(){
            attachHandlers(this.dom, this);
        };
    }
    
    quizEditor.prototype = mainWindow;
    
    return quizEditor;
});
