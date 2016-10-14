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
    'templating',
    'quizMaker',
    'repository',
    './quizEditor',
    './deptEditor',
    'jquery',
    'jquery-ui',
    'bootstrap',
], function(templating,qm,repository,quizEditor, deptEditor, $){
    function navBar(){
        this.template = templating.navBar;
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
                qm.bind('currentQuiz').once.to(function(quiz){
                    var win = new quizEditor(quiz);
                    win.render();
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
    return navBar;
});
