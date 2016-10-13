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

define([
    'handlebars',
    'text!templates/question.hbs',
    'text!templates/deptEditor.hbs',
    'text!templates/navbar.hbs',
    'text!templates/quiz.hbs',
    'text!templates/questionEditor.hbs',
    'text!templates/answerEditor.hbs'
],function(hb,tQuestion, tDeptEdit,tNavBar, tQuiz,tQuestionEditor, tAnswerEditor){
    
    var deptEditorTemplate;
    var quizEditorTemplate;
    var navBarTemplate;
    var answerEditorTemplate;
    var questionTemlate;
    
    return {
        initialize: function (){
            hb.registerPartial('question-partial', tQuestion);
            hb.registerPartial('questionEditor-partial', tQuestionEditor);
            hb.registerPartial('answerEditor-partial', tAnswerEditor);
            hb.registerHelper("listAnswers", function(question, options){
                var answersArray = question.AnswersArray;
                var lis = [];
                
                function push(index, answer, answerText, correct){
                    lis.push(
                        options.fn(
                            {
                                index:index, 
                                answer:answer,
                                answerText: answerText || answer, 
                                questionId: question.Id,
                                correct: !!correct
                            })
                        );
                }
                
                for(var a in answersArray){
                    if(a === question.CorrectIndex){
                        push(a, answersArray[a], '<strong>' + answersArray[a] + '</strong>',true);
                        continue;
                    }
                    push(options.fn(answersArray[a]));
                }
                return lis.join(' ');
                
                
            });
            
            
            hb.registerHelper('listQuestions', function(quiz, options){
                var lis = [], qos = quiz.QuestionOrders;
                for(var o in qos){
                    var question = quiz.Questions[qos[o]];
                    if(question.editing){
                        lis.push(options.inverse(question));
                        continue;
                    }
                    lis.push(options.fn(quiz.Questions[qos[o]]));
                }
                for(var q in quiz.Questions){
                    if(q.indexOf('NewQuestion') === 0){
                        lis.push(options.inverse(quiz.Questions[q]));
                    }
                }
                return lis.join(' ');
            });
        }, 
        get deptEditor(){
            if(!deptEditorTemplate){
                deptEditorTemplate = hb.compile(tDeptEdit);
            }
            return deptEditorTemplate;
        },
        get quizEditor(){
            if(!quizEditorTemplate){
                quizEditorTemplate = hb.compile(tQuiz);
            }
            return quizEditorTemplate;
        },
        get navBar(){
            if(!navBarTemplate){
                navBarTemplate = hb.compile(tNavBar);
            }
            return navBarTemplate;
        },
        get answerEditor(){
            if(!answerEditorTemplate){
                answerEditorTemplate = hb.compile(tAnswerEditor);
            }
            return answerEditorTemplate;
        },
        get questionEditor(){
            if(!questionTemlate){
                questionTemlate = hb.compile(tQuestionEditor);
            }
            return questionTemlate;
        }
    };
});