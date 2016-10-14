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

define([
    './mainWindow', 
    './popUps',
    'dataObjects',
    'quizMaker',
    'templating',
    'repository',
    'jquery', 
    'jquery-ui', 
],function(mainWindow, utils, dos, qm,templating, repository, $){
    function deptEditor(department){
        this.model = department || {};
        this.template = templating.deptEditor;
        Object.defineProperty(this,'data', {
            get: function data(){
                var data = this.model;
                var inputs = this.dom.find('input, textarea, select');
                inputs.each(function(i, el){
                    data[el.name] = $(el).val();
                });
                return data;
            }
        });
        this.attachHandlers = function(){
            this.saveButton.click(this,function(e){
                if(!e.data.model || e.data.model.Name !== e.data.data['Name']){
                    var dept = new dos.department(e.data.data);
                    qm.bind('departments').once.to(function(depts){
                        var d = _.findWhere(depts, {Name: e.data.data.Name});
                        if(!!d) qm.currentDepartment = d;
                     });
                    repository.storeDepartment(dept);
                }
                e.data.hide();
            });
            this.deleteButton.click(this, function(e){
                
                var options = {
                    title: "Are you sure?",
                    buttons:{
                        "Yes": function(){
                            var val = e.data.data['Id'];
                            repository.deleteDepartment(val);
                            qm.unset('currentDepartment');
                            e.data.hide('fade', 400);
                            $(this).dialog('close');
                        },
                        "Cancel": function(){
                            $(this).dialog('close');
                        }
                    }
                };
                var message = "Are you sure you want to delete this department? "
                            + "Doing so would delete all quizzes it contains as well. "
                            + "<strong>This <em>CANNOT</em> be undone.</strong>";
                    
                utils.showDialog(options, message);
            });
            this.cancelButton.click(this, function(e){
                e.data.hide();
            });
        };
    }
    deptEditor.prototype = mainWindow;
    
    return deptEditor;
});
