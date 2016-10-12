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
    'repository', 
    'dataObjects', 
    'quizMaker',
    'underscore', 
    'handlebars', 
    'text!templates/deptEditor.hbs',
    'text!templates/navbar.hbs',
    'text!templates/quiz.hbs'
],function(repository, dos, qm, _, hb, tDeptEdit, tNavBar, tQuiz){
    
    var deptEditorTemplate = hb.compile(tDeptEdit);
    var quizEditorTemplate = hb.compile(tQuiz);
    var navBarTemplate = hb.compile(tNavBar);

    var mainWindow = {
        get saveButton(){
            return this.dom.find('.saveButton');
        },
        get deleteButton(){
            return this.dom.find('.deleteButton');
        },
        get cancelButton(){
            return this.dom.find('.cancelButton');
        },
        render: function(){
            var mc = $('#mainCanvas');
            mc.hide();
            this.attachHandlers();
            mc.html('').append(this.dom);
            mc.show('fade', 500);
        },
        rerender: function(){
            delete this._dom;
            var mc = $('#mainCanvas');
            this.attachHandlers();
            mc.html('').append(this.dom);
        },
        hide: function(){
            this.dom.hide('fade',400);
        },
        show: function(){
            this.dom.show('fade',400);
        },  
        get template(){
            return this._template;
        },
        set template(x){
            this._template = x;
        },
        get model(){
            return this._model;
        },
        set model(x){
            this._model = x;
        },
        get dom(){
            if(!this._dom){
                var html = this.template(this.model);
                this._dom = $(html);
            }
            return this._dom;
        }
    };
    
    
    function deptEditor(department){
        this.model = department || {};
        this.template = deptEditorTemplate;
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
                var val = e.data.data['Id'];
                repository.deleteDepartment(val);
                qm.unset('currentDepartment');
                e.data.hide();
            });
            this.cancelButton.click(this, function(e){
                e.data.hide();
            });
        };
    }
    
    deptEditor.prototype = mainWindow;
    
    
    
    
    
    
    function quizEditor(quiz){
        this.model = quiz || {};
        this.template = quizEditorTemplate;
        Object.defineProperties(this,{
            'data':{
                get: function data(){
                    this.model['Name'] = this.dom.find('[name="Name"]').val();
                    return this.model;
                }
            },'addQuestion':{
                get: function addQuestion(){
                    return this.dom.find('.addQuestion');
                }
            }
        });
        this.attachHandlers = function(){
            this.saveButton.click(this, function(e){
                var quiz = new dos.quiz(e.data.data);
                quiz.DepartmentId = qm.currentDepartment.Id;
                qm.bind('currentQuiz').once.to(function(quiz){
                    e.data.model = quiz;
                    e.data.rerender();
                });
                repository.storeQuiz(quiz);
            });
            
            this.cancelButton.click(this, function(e){
                e.data.hide();
            });
            
            this.deleteButton.click(this, function(e){
                var div = $('<div class="dialog">Are you sure you want to delete this quiz? This cannot be undone.</div>');
                div.addClass('dialog');
                var id = e.data.data['Id'];
                var deptId = e.data.data['DepartmentId'];
                
                div.dialog({
                    resizable: false,
                    height: 'auto',
                    width: 400,
                    modal: true,
                    show: 400,
                    buttons:[
                        {
                            text: "Delete this permanently.",
                            click:function(){
                                e.data.hide();
                                $(this).dialog('close');
                                repository.deleteQuiz(id, deptId);
                                qm.unset('currentQuiz');
                            }
                        },
                        {
                            text: "Cancel",
                            click: function(){
                                $(this).dialog('close');
                            }
                        }
                    ]
                });
            });
        };
        
    }
    
    quizEditor.prototype = mainWindow;
    
    
    function navBar(){
        this.template = navBarTemplate;
        this.model = qm;
    }
    
    
    var navProto = {
        render: function(){
            delete this._dom;
            this.dom.find('[data-department]').click(this,function(e){
                var jq = $(this);
                qm.currentDepartment = qm.departments[jq.data('id')];
            });
            this.dom.find('[data-quiz]').click(function(){
                var jq = $(this);
                var id = qm.bind('currentQuiz').to(function(quiz){
                    var win = new quizEditor(quiz);
                    win.render();
                    qm.unbind('currentQuiz', id);
                });
                repository.getQuiz(jq.data('id'), qm.currentDepartment.Id);
            }); 
            this.dom.find('#createDepartment').click(function(){
                var de = new deptEditor();
                de.render();
            });
            this.dom.find('#editDept').click(function(){
                var dept = qm.currentDepartment;
                var de = new deptEditor(dept);
                de.render();
            });
            this.dom.find('#createQuiz').click(function(){
                var qe = new quizEditor();
                qe.render();
            });
            $('#navBarContainer').html('').append(this.dom);
            
        },
        get dom(){
            if(!this._dom){
                this._dom = $(this.template(this.model));
            }
            return this._dom;
        },
        get template(){
            return this._template;
        },
        set template(x){
            this._template = x;
        },
        get model(){
            return this._model;
        },
        set model(x){
            this._model = x;
        }
    };
    
    navBar.prototype = navProto;
    
    
    return {
        deptEditor: deptEditor,
        quizEditor: quizEditor,
        navBar: navBar
    };
});