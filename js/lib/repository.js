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

define(['dataObjects', 'quizMaker', 'underscore'], function(dos, qm, _){
   
    function applyDepartments(data){
        for(var d in data.data){
            qm.departments[d] = new dos.department(data.data[d]);
            stopLoading();
        }
        qm.currentDepartment = _.findWhere(qm.departments, {Id: qm.currentDepartment.Id});
        qm.updateBindings('departments');
    }
    function applyQuiz(data){
        var quiz = new dos.quiz(data.data);
        stopLoading();
        qm.departments[quiz.DepartmentId].Quizzes[quiz.Id] = quiz.Name;
        qm.currentQuiz = quiz;
    }
      
    function postData(parameters){
        displayLoading();
        sendAjaxRequest(
            parameters.data,
            'POST',
            parameters.callback
        );
    }  
      
    function getData(parameters){
        displayLoading();
        sendAjaxRequest(
            parameters.data, 
            'GET', 
            parameters.callback
        );
    }
    
    
    function sendAjaxRequest(data, method, callback){
        $.ajax({
            data: data,
            dataType: 'json',
            method: method,
            url: 'index.php',
        }).done(callback);
    } 
    
    function displayLoading(){
            
    }
    function stopLoading (){

    }

    function getDepartments (){
        var parameters = {
            data: {
                SUBJECT: 'departmentlist'
            },
            callback: applyDepartments
        };
        getData(parameters);
    }
    function storeDepartment (department){
        var parameters = {
            data: department,
            callback: applyDepartments
        };
        parameters.data['SUBJECT'] = 'department';
        parameters.data['ACTION'] = (department.Id) ? 'update' : 'create';
        postData(parameters);
    }
    
    function deleteDepartment(id){
        var parameters = {
            data: {
                Id: id,
                SUBJECT: 'department',
                ACTION: 'delete'
            },
            callback: applyDepartments
        };
        postData(parameters);
    }
    
    function getQuiz(id, departmentId){
        var parameters = {
            data: {
                Id: id,
                DepartmentId: departmentId,
                SUBJECT: 'quiz'
            },
            callback: applyQuiz
        };
        getData(parameters);
    }
    
    function storeQuiz(quiz){
        var parameters = {
            data: quiz.toObject(),
            callback: applyQuiz
        };
        parameters.data['SUBJECT'] = 'quiz';
        parameters.data['ACTION'] = (quiz.Id) ? 'update' : 'create';
        postData(parameters);
    }
    
    function deleteQuiz(id, departmentId){
        var parameters = {
            data:{
                Id: id,
                DepartmentId: departmentId,
                SUBJECT: 'quiz',
                ACTION: 'delete'
            },
            callback: applyDepartments
        };
        postData(parameters);
    }
    
    function cloneQuiz(id){
        
    }
    
    function reorderQuiz(){
        
    }
    
    
   return {
        displayLoading: displayLoading,
        stopLoading: stopLoading,
        getDepartments: getDepartments,
        storeDepartment: storeDepartment,
        deleteDepartment: deleteDepartment,
        getQuiz: getQuiz,
        storeQuiz: storeQuiz,
        deleteQuiz: deleteQuiz
    };
});

