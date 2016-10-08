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



define(['dataBinder', 'repository', 'dataObjects'],function(dataBinder, repository, dos){
    
    function quizMaker(){
        this._repository = new repository(this);
        this._dataBinder = new dataBinder(this);
        this.stopLoading = this._repository.stopLoading;
    };
    
    quizMaker.prototype = {
        //Getters and setters
        
        get departments(){
            var dept = this.prop('departments');
            if(!dept){
                this.prop('departments',{});
                dept = this.prop('departments');
            }
            return dept;
        },
        set departments(x){
            this.prop('departments',x);
        },
        get currentDepartment(){
            return this.prop('currentDepartment');
        },
        set currentDepartment(x){
            this.prop('currentDepartment',x);
        },
        get currentQuiz(){
            return this.prop('currentQuiz');
        },
        set currentQuiz(x){
            this.prop('currentQuiz', x);
        },
        
        
        
        
        
        prop:function(propName, value){
            if(!value){
                return this['__'+ propName];
            }
            this['__'+propName] = value;
            this.updateBindings(propName);
        },
        
        
        
        
        
        
        bind: function (propertyName){
            return this._dataBinder.bind(propertyName);
        },
        
        
        updateBindings: function(propertyName){
            this._dataBinder.update(propertyName);
        },
        
        
        refreshDepartments: function(){
            this._repository.getDepartments();
        },
        storeDepartment: function(data){
            var dept = new dos.department(data);
            this._repository.storeDepartment(dept);
        },
        deleteDepartment: function(id){
            
        },
        
        
        setQuiz: function(id){
            
        },
        createQuiz: function(data){
            
        },
        updateQuiz: function(quiz){
            
        },
        deleteQuiz: function(id){
            
        },
        reorderQuiz:function(order){
            
        }
    };
    
    return new quizMaker();
    
});
