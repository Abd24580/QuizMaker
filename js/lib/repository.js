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

define(['dataObjects'], function(dos){
    
    function repository(qm){
        this.qm = qm;
    }
    
    repository.prototype = {
        displayLoading: function(){
            
        },
        stopLoading: function(){
            
        },
        applyDepartments: function(data){
            for(var d in data.data){
                this.departments[d] = new dos.department(data.data[d]);
                this.stopLoading();
            }
            this.updateBindings('departments');
        },
        getDepartments: function(){
            var parameters = {
                data: {
                    SUBJECT: 'departmentlist'
                },
                callback: this.applyDepartments
            };
            this.getData(parameters);
        },
        storeDepartment: function(department){
            var parameters = {
                data: department,
                callback: this.applyDepartments
            };
            parameters.data['SUBJECT'] = 'department';
            parameters.data['ACTION'] = (department.Id) ? 'update' : 'create';
            this.postData(parameters);
        },
        getData: function(parameters){
            this.displayLoading();
            this.sendAjaxRequest(
                parameters.data, 
                'GET', 
                parameters.callback,
                this.qm
            );
        },
        postData: function(parameters){
            this.displayLoading();
            this.sendAjaxRequest(
                parameters.data,
                'POST',
                parameters.callback,
                this.qm
            );
        },
        sendAjaxRequest: function(data, method, callback, context){
            $.ajax({
                data: data,
                dataType: 'json',
                method: method,
                url: 'index.php',
                context: context
            }).done(callback);
        } 
    };
    
    return repository;
});

