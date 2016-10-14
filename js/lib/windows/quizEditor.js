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

    function showAlert(message){
        var alert = $('<div class="alert alert-info" id="alertBox" role="alert">' + message + '</div>');
        $('#alertSpot').html('').append(alert);
    }

    function hideAlert(){
        $('#alertSpot').html('');
    }

    function getParentQuestionInfo(element, model){
        var el = $(element);
        id = el.data('id');
        var questionDiv, answersList, id;
        var requery = false;
        var question = model.Questions[id];
        grabElements();
        function getJqEl(){
            return $(element);
        }
        function grabElements(){
            questionDiv = el.parents('[class="question"][data-id="' + id + '"]');
            if(requery || questionDiv.length === 0){
                questionDiv = $('[class="question"][data-id="' + id + '"]');
            }
            answersList = questionDiv.find('.answerList');
        }
        return {
            id: id,
            questionDiv: questionDiv,
            question: question,
            answersList: answersList,
            requery: function(){
                requery = true;
                grabElements();
                return this;
            }
        };
    }

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
        if(e.data.dirty){
            var message = "Are you sure you want to close this quiz? You will lose your unsaved changes.";
            var options = {
                title: "Are you sure?",
                buttons:[
                    {
                        text: "Yes",
                        click: function(){
                            $(this).dialog('close');
                            e.data.close();
                        }
                    },
                    {
                        text: "Never mind",
                        click: function(){
                            $(this).dialog('close');
                        }
                    }
                ]
            };
            utils.showDialog(options, message);
            return;
        }
        e.data.close();
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
                        $(this).dialog('close');
                        repository.deleteQuiz(id, deptId);
                        e.data.close();
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
        e.data.editing = true;
    }
    
    function editQuestionEvent(e){
        var qInfo = getParentQuestionInfo(this, e.data.model);
        var temp = templating.questionEditor(qInfo.question);
        var jqEl = $(temp);
        qInfo.questionDiv.html(jqEl.html());
        attachHandlers(qInfo.questionDiv, e.data);
        e.data.editing = true;
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
        qm.bind('currentQuiz').once.to(function(quiz){
            e.data.model = quiz;
            e.data.rerender();
        });
        repository.storeQuestion(question);
    }
    
    function addAnswerEvent(e){
        var jqThis = $(this);
        var qInfo = getParentQuestionInfo(jqThis, e.data.model);
        var lastAnswer = qInfo.answersList.find('.answerText').last();
        if(lastAnswer.length > 0 && lastAnswer.val().trim() === ""){
            showAlert("You cannot add another answer until you type something for the last one.");
            return;
        }
        hideAlert();
        var newIndex = lastAnswer.length > 0 ? parseFloat(lastAnswer.data('index')) + 1 : 0;
        var newAnswer = {questionId: qInfo.id, index: newIndex};
        if(newIndex === 0) newAnswer.correct = true;
        var temp = templating.answerEditor(newAnswer);
        var jqTemp = $(temp);
        attachHandlers(jqTemp, e.data);
        qInfo.answersList.append(jqTemp);
//        jqTemp.find('.answerText').change();
    }

    function deleteAnswerEvent(e){
        questionChangeEvent.call(this);
        var jqThis = $(this);
        var qInfo = getParentQuestionInfo(jqThis, e.data.model);
        jqThis.parents('.answer').remove();
         if(qInfo.requery().answersList.find('.answer').length === 0){
            showAlert("You need at least one answer for a question.");
        }
    }
    
    function cancelEditEvent(e){
        var qInfo = getParentQuestionInfo(this, e.data.model);
        if(qInfo.id.indexOf('NewQuestion') !== 0){
            var temp = templating.question(qInfo.question);
            var jqEl = $(temp);
            qInfo.questionDiv.html(jqEl.html());
            attachHandlers(qInfo.questionDiv, e.data);
        }else{
            qInfo.questionDiv.remove();
            delete e.data.model[qInfo.id];
        }
        e.data.editing = false;
        hideAlert();
    }
    
    function deleteQuestionEvent(e){
        var qInfo = getParentQuestionInfo(this, e.data.model);
        var message = "Are you sure you want to delete this question? This cannot be undone.";
        var question = qInfo.question;
        var options =  {
            title: "Are you sure?",
            buttons:[
                {
                    text: "Delete this permanently.",
                    click:function(){
                        $(this).dialog('close');
                        qm.intercept('currentQuiz').once.withFunc(function(quiz){
                            e.data.model = quiz;
                            e.data.rerender();
                            return true;
                        });
                        repository.deleteQuestion(question);
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
        
        e.data.editing = false;
    }
    
    
    function resetOrderEvent(e){
        e.data.dom.find('.questionsList').sortable('cancel');
        e.data.toggleQuestionButtons(true);
        e.data.model.QuestionOrders = e.data.model.cachedOrder;
        e.data.dirty = false;
        this.style.display = 'none';
        hideAlert();
    }

    
    function questionChangeEvent(){
        $(this).parents('.question').find('.saveQuestion').prop('disabled', false).prop('title', '');
    }
    
    function attachHandlers(element, quizEditor){
        element.find('button.saveButton').click(quizEditor, saveButtonEvent);
        element.find('button.cancelButton').click(quizEditor,cancelButtonEvent);
        element.find('button.deleteButton').click(quizEditor,deleteButtonEvent);
        element.find('button.addQuestion').click(quizEditor,addQuestionEvent);
        element.find('button.editQuestion').click(quizEditor, editQuestionEvent);
        element.find('button.saveQuestion').click(quizEditor, saveQuestionEvent);
        element.find('button.deleteQuestion').click(quizEditor,deleteQuestionEvent);
        element.find('button.addAnswer').click(quizEditor, addAnswerEvent);
        element.find('button.cancelEdit').click(quizEditor,cancelEditEvent);
        element.find('button.resetOrder').hide().click(quizEditor, resetOrderEvent);
        element.find('button.deleteAnswerButton').click(quizEditor,deleteAnswerEvent);
        element.find('input.questionInput').change(quizEditor, questionChangeEvent);
        element.find('input[name="Name"]').change(quizEditor, function(e){
            e.data.dirty = true;
        });
//        element.find('button.downloadButton').click(quizEditor, downloadQuiz);
//        element.find('button.cloneButton').click(quizEditor, cloneQuiz);
        element.find('.questionsList').sortable({
            handle:'.moveBlock',
            items: '.question',
            containment: 'parent',
            axis: 'y',
            cursor: 'move',
            update: function(){
                if(!quizEditor.model.cachedOrder)
                    quizEditor.model.cachedOrder = quizEditor.model.QuestionOrders;
                var newOrder = [];
                var questions = $(this).find('.question');
                questions.each(function(i, el){
                    var jqEl = $(el);
                    newOrder.push(jqEl.data('id'));
                });
                var diff = false;
                for(var i in newOrder){
                    if(quizEditor.model.cachedOrder[i] !== newOrder[i]){
                        diff=true;
                        break;
                    }
                }
                var resetButton = element.find('button.resetOrder');
                if(diff){
                    quizEditor.model.QuestionOrders = newOrder;
                    quizEditor.dirty = true;
                    showAlert('The new order of your questions will not be saved until you click the save button.');
                    resetButton.show();
                }else{
                    hideAlert();
                    resetButton.hide();
                    quizEditor.dirty = false;
                }
                quizEditor.toggleQuestionButtons(!diff);
            }
        });
        element.tooltip();
    }
    
    function quizEditor(quiz){
        quizProto.call(this);
        this.template = templating.quizEditor;
        qm.bind('dirty').to(function(val, qe){
            qe.saveButton.prop('disabled',!val);
            if(!val) qe.saveButton.prop('title', "There are no changes to save.");
            else qe.saveButton.prop('title', "Save changes to this quiz.");
            qe.toggleQuestionButtons(!val);
        }, this);
        qm.bind('editing').to(function(val,qe){
            qe.toggleQuestionButtons(!val);
            var saveButton = qe.saveButton;
            if(val){
                saveButton.prop('disabled',true).prop('title', "You must save your question first.");
                qe.dom.find('.addQuestion').prop('title',"You cannot add a new question until you finish with the one you're currently editing.");
                qe.dom.find('.downloadButton').addClass('disabled',true).find('a').click(function(e){
                    e.preventDefault();
                });
                return;
            }
            saveButton.prop('title','');
            if(qe.dirty) saveButton.prop('disabled', false);
            if(!qe.dirty) qe.dom.find('.downloadButton').removeClass('disabled').find('a').off('click');
        },this);
        this.model = quiz || {};
    }
    
    function quizProto(){
        this.toggleQuestionButtons = function(activate){
            this.dom.find('.editQuestion, .addQuestion').prop('disabled',!activate);
            var qList = this.dom.find('.questionsList');
            if (qList.sortable('instance')){
                qList.sortable('option','disabled', !activate);
            }
            if(activate){
                this.dom.find('.moveBlock').show();
                return;
            }
            this.dom.find('.moveBlock').hide();
        };
        this.close = function(){
            this.hide();
            qm.unset('currentQuiz');
            qm.unbind('dirty').unset();
            qm.unbind('editing').unset();
        },
        this.attachHandlers = function(){
            attachHandlers(this.dom, this);
        };
        Object.defineProperties(this,{
            data:{
                get: function data(){
                    this.model['Name'] = this.dom.find('[name="Name"]').val();
                    this.model['DeparmentId'] = qm.currentDepartment.Id;
                    return this.model;
                }
            },
            editing:{
                get: function editing(){
                    if(qm.prop('editing') == null){
                        qm.prop('editing', false);
                    }
                    return qm.prop('editing');
                },
                set: function editing(x){
                    qm.prop('editing',x);
                }
            }
        });
    }
    quizEditor.prototype = mainWindow;
    
    return quizEditor;
});
