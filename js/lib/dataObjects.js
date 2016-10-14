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
        var params = params || {};
        this.Id = params.Id || null;
        this.Name = params.Name || null;
        this.Quizzes = params.Quizzes || {};
    }
    
    function question(params){
        var params = params || {};
        this.Id = params.Id || null;
        this.DepartmentId = params.DepartmentId || null;
        this.QuizId = params.QuizId || null;
        this.QuestionText = params.QuestionText || null;
        this.AnswersArray = params.AnswersArray || [""];
        this.CorrectIndex = params.CorrectIndex != null ? params.CorrectIndex : 0;
        this.IncorrectMessage = params.IncorrectMessage || null;
    }    
    
    function quiz(params){
        var params = params || {};
        this.Id = params.Id || null;
        this.Name = params.Name || null;
        this.DepartmentId = params.DepartmentId || null;
        this.QuestionOrders = params.QuestionOrders || [];
        this.Questions = {};
        this.parseParamsToQuestions(params);
    }
    quiz.prototype = {
        parseParamsToQuestions: function(params){
            if(!params || !params.QuestionsArray) return;
            for(var q in params.QuestionsArray){
                this.Questions[q] = new question(params.QuestionsArray[q]);
            }
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