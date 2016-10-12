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
    'text!templates/questionSection.hbs',
    'text!templates/deptEditor.hbs',
    'text!templates/navbar.hbs',
    'text!templates/quiz.hbs'
],function(hb, tQuestion, tQuestionSection, tDeptEdit,tNavBar, tQuiz){
    
    var deptEditorTemplate;
    var quizEditorTemplate;
    var navBarTemplate;
    
    return {
        initialize: function (){
            hb.registerPartial('question-partial', tQuestion);
            hb.registerPartial('questionSection-partial', tQuestionSection);
            
            hb.registerHelper("listAnswers", function(question, options){
                var answersArray = question.AnswersArray;
                var lis = [];
                for(var a in answersArray){
                    if(a === question.CorrectIndex){
                        lis.push(options.fn('<strong>' + answersArray[a] + '</strong>'));
                        continue;
                    }
                    lis.push(options.fn(answersArray[a]));
                }
                return lis.join(' ');
            });
            
            
            hb.registerHelper('listQuestions', function(quiz, options){
                
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
        }
    };
});