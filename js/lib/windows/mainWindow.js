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

define(['quizMaker','jquery', 'jquery-ui'], function(qm,$){
    
    return {
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
            delete this.dirty;
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
            if(this.dirty == null)
                this.dirty = false;
            else this.dirty = true;
        },
        get dom(){
            if(!this._dom){
                var html = this.template(this.model);
                this._dom = $(html);
            }
            return this._dom;
        },
        get dirty(){
            return qm.prop("dirty");
        },
        set dirty(x){
            qm.prop("dirty", x);
        }
    };
});
