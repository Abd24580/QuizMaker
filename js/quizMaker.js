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


$(function(){
    
});

(function($){
    
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
            var self = this;
            $.each(params.QuestionsArray, function(p, o){
                self.Questions[p] = new question(o);
            });
        }
    };
    
    function repository(qm){
        this.qm = qm;
        function displayLoading(){
            
        }
        
        function stopLoading(){
            
        }
        
        function applyDepartments(data){
            for(var d in data.data){
                this.departments[d] = new department(data.data[d]);
                this.stopLoading();
            }
        }
        
        function getDepartments(){
            var parameters = {
                data: {
                    SUBJECT: 'departmentlist'
                },
                callback: applyDepartments
            };
            getData(parameters);
        }
        
        function storeDepartment(department){
            var parameters = {
                data: department,
                callback: applyDepartments
            };
            parameters.data['SUBJECT'] = 'department';
            parameters.data['ACTION'] = (department.Id) ? 'update' : 'create';
            postData(parameters);
        }
        
        function getData(parameters){
            displayLoading();
            sendAjaxRequest(
                parameters.data, 
                'GET', 
                parameters.callback,
                this.qm
            );
        }
        
        function postData(parameters){
            displayLoading();
            sendAjaxRequest(
                parameters.data,
                'POST',
                parameters.callback,
                this.qm
            );
        }
        
        function sendAjaxRequest(data, method, callback, context){
            $.ajax({
                data: data,
                dataType: 'json',
                method: method,
                url: 'index.php',
                context: context
            }).done(callback);
        }
        
        return {
            stopLoading: stopLoading,
            getDepartments: getDepartments,
            storeDepartment: storeDepartment
        };
    }
    
    
    
    function quizMaker(){
        this._repository = new repository(this);
        this._departments = {};
        this.stopLoading = this._repository.stopLoading;
        this._bindings = {};
    };
    
    quizMaker.prototype = {
        get departments(){
            return this._departments;
        },
        set departments(x){
            this._departments = x;
            this.updateBindings('departments');
        },
        
        
        
        setBinding: function(propertyName, func){
            if(!this._bindings[propertyName])
                this._bindings[propertyName] = [];
            this._bindings[propertyName].push(func);
        },
        
        updateBindings: function(propertyName){
            var bindings = this._bindings[propertyName];
            if(!bindings) return;
            for(var f in bindings){
                bindings[f](this[propertyName]);
            }
        },
        
        
        
        refreshDepartments: function(){
            this._repository.getDepartments();
        },
        createDepartment: function(name){
            var dept = new department({Name: name});
            this._repository.storeDepartment(dept);
        }
        
        
    };
    
    
    qm = new quizMaker();
    
})(jQuery);