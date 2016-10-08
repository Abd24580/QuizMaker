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
    function deptEditor(qm, department){
        this.model = department;
        this.template = Handlebars.compile($('#deptEditor-template').html());
        this.saveButton.click(this,function(e){
            qm.storeDepartment(e.data.data);
            e.data.hide();
        });
        this.deleteButton.click(this, function(e){
            var val = e.data.data['Id'];
            qm.deleteDepartment(val);
            e.data.hide();
        });
    }
    
    function quizCreator(quiz){
        this.model = quiz;
        this.template = Handlebars.compile($('#quizCreator-template').html());
        
        this.dom = this.getDom();
        
    }
    
    
    var mainCanvas = {
        get model(){
            return this._model;
        },
        set model(x){
            this._model = x;
        },
        get template(){
            return this._template;
        },
        set template(x){
            this._template = x;
        },
        get dom(){
            if(!this._dom){
                var html = this.template(this.model);
                this._dom = $(html);
            }
            return this._dom;
        },
        get saveButton(){
            return this.dom.find('.saveButton');
        },
        get deleteButton(){
            return this.dom.find('.deleteButton');
        },
        get data(){
            var data = {};
            var inputs = this.dom.find('input, textarea, select');
            inputs.each(function(i, el){
                data[el.name] = $(el).val();
            });
            return data;
        },
        render: function(){
            $('#mainCanvas').html('').append(this.dom);
        },
        hide: function(){
            this.dom.hide(500);
        },
        show: function(){
            this.dom.show(500);
        }
    };
    
    deptEditor.prototype = mainCanvas;
    quizCreator.prototype = mainCanvas;
    
    return {
        deptEditor: deptEditor,
        quizCreator: quizCreator
    };
});