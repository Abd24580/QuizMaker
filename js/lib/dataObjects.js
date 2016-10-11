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


define(function(){
   
    function department(params){
        this.Id = params.Id;
        this.Name = params.Name;
        this.Quizzes = params.Quizzes;
    }
    
    function question(params){
        this.Id = params.Id;
        this.DepartmentId = params.DepartmentId;
        this.QuizId = params.QuizId;
        this.QuestionText = params.QuestionText;
        this.AnswersArray = params.AnswersArray;
        this.CorrectIndex = params.CorrectIndex;
        this.IncorrectMessage = params.IncorrectMessage;
    }    
    
    function quiz(params){
        this.Id = params.Id;
        this.Name = params.Name;
        this.DepartmentId = params.DepartmentId;
        this.QuestionOrders = params.QuestionOrders;
        this.Questions = {};
        this.parseParamsToQuestions(params);
    }
    quiz.prototype = {
        parseParamsToQuestions: function(params){
            if(!params || !params.QuestionsArray) return;
            var self = this;
            $.each(params.QuestionsArray, function(p, o){
                self.Questions[p] = new question(o);
            });
        },
        addQuestion: function(question){
            this.Questions[question.Id] = question;
        },
        deleteQuestion: function(id){
            delete this.Questions[id];
        },
        toObject: function(){
            var self = this;
            var obj = {
                Id: self.Id,
                Name: self.Name,
                DepartmentId: self.DepartmentId,
                QuestionOrders: self.QuestionOrders,
                Questions: self.Questions
            };
            return obj;
        }
    };
    
    return {
        department: department,
        quiz: quiz,
        question: question
    };
});