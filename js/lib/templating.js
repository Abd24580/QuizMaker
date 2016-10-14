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
    'templates/question.hbs',
    'templates/deptEditor.hbs',
    'templates/navbar.hbs',
    'templates/quizEditor.hbs',
    'templates/questionEditor.hbs',
    'templates/answerEditor.hbs',
    'templates/downloadQuiz.hbs'
],function(hb,JsonHuman, tQuestion, tDeptEdit,tNavBar, tQuiz,tQuestionEditor, tAnswerEditor,tDownloadQuiz){
    
    var deptEditorTemplate = tDeptEdit;
    var quizEditorTemplate = tQuiz;
    var navBarTemplate = tNavBar;
    var answerEditorTemplate = tAnswerEditor;
    var questionEditorTemplate = tQuestionEditor;
    var questionTemplate = tQuestion;
    var downloadQuizTemplate = tDownloadQuiz;
    
    return {
        initialize: function (){
            var self = this;
            hb.registerPartial('question-partial', this.question);
            hb.registerPartial('questionEditor-partial', this.questionEditor);
            hb.registerPartial('answerEditor-partial', this.answerEditor);
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
                var lis = [], qos = quiz.QuestionOrders;
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
        }, 
        get deptEditor(){
            return deptEditorTemplate;
        },
        get quizEditor(){
            return quizEditorTemplate;
        },
        get navBar(){
            return navBarTemplate;
        },
        get answerEditor(){
            return answerEditorTemplate;
        },
        get questionEditor(){
            return questionEditorTemplate;
        },
        get question(){
            return questionTemplate;
        },
        get downloadQuiz(){
            return downloadQuizTemplate;
        }
        
    };
});