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
    'json-human',
    'underscore',
    'text!templates/question.hbs',
    'text!templates/deptEditor.hbs',
    'text!templates/navbar.hbs',
    'text!templates/quizEditor.hbs',
    'text!templates/questionEditor.hbs',
    'text!templates/answerEditor.hbs',
    'text!templates/downloadQuiz.hbs',
    'text!templates/quizCloner.hbs'
],function(hb,JsonHuman,_, tQuestion, tDeptEdit,tNavBar, tQuiz,tQuestionEditor, tAnswerEditor,tDownloadQuiz, tQuizCloner){
    
    var deptEditorTemplate;
    var quizEditorTemplate;
    var navBarTemplate;
    var answerEditorTemplate;
    var questionEditorTemplate;
    var questionTemplate;
    var downloadQuizTemplate;
    var quizClonerTemplate;
    
    function registerHelpers(self){
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
                
                for(var i in answersArray){
                    if(i == question.CorrectIndex){
                        push(i, answersArray[i], '<strong>' + answersArray[i] + ' (<em>correct</em>)</strong>',true);
                        continue;
                    }
                    push(i, answersArray[i]);
                }
                return new hb.SafeString(lis.join('\n'));
            });
        hb.registerHelper('listQuestions', function(quiz, options){
            var lis = [], qos = quiz.QuestionOrder;
            for(var o in qos){
                var question = quiz.Questions[qos[o]];
                question.QuestionNumber = parseInt(o) + 1;
                lis.push(options.fn(question));
            }
            return lis.join('\n');
        });
        hb.registerHelper('plusOne', function(item){
            var num = parseInt(item);
            if(isNaN(num)) return "";
            return (++num).toString();
        });
        hb.registerHelper('downloadQuizHref', function(quiz){
            var Table = JsonHuman.format(JSON.parse(JSON.stringify(quiz))).outerHTML;
            var Json = encodeURIComponent(JSON.stringify(quiz, null, 2));
            var html = self.downloadQuiz({Name: quiz.Name, Json: Json, Table: Table}); 
            return "data:text/html;charset=utf-8," + encodeURIComponent(html);
        });
        hb.registerHelper('listDepartments', function (qm, options){
            var opts = [];
            for(var id in qm.departments){
                var selected = {Selected: (id === qm.currentDepartment.Id)};
                opts.push(options.fn(_.extend(qm.departments[id], selected)));
            }
            return opts.join('\n');
        });
        hb.registerHelper('count', function(item){
           if(_.isArray(item))
               return item.length.toString();
           if(_.isObject(item))
               return _.keys(item).length.toString();
           return "";
        });
    }
    
    function registerPartials(self){
        hb.registerPartial('question-partial', self.question);
        hb.registerPartial('questionEditor-partial', self.questionEditor);
        hb.registerPartial('answerEditor-partial', self.answerEditor);
    }
    
    return {
        initialize: function (){
            var self = this;
            registerPartials(self);
            registerHelpers(self);
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
            if(!questionEditorTemplate){
                questionEditorTemplate = hb.compile(tQuestionEditor);
            }
            return questionEditorTemplate;
        },
        get question(){
            if(!questionTemplate){
                questionTemplate = hb.compile(tQuestion);
            }
            return questionTemplate;
        },
        get downloadQuiz(){
            if(!downloadQuizTemplate){
                downloadQuizTemplate = hb.compile(tDownloadQuiz);
            }
            return downloadQuizTemplate;
        },
        get questionCloner(){
            if(!quizClonerTemplate){
                quizClonerTemplate = hb.compile(tQuizCloner);
            }
            return quizClonerTemplate;
        }
        
    };
});
