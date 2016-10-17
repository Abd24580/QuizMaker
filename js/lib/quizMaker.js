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



define(['underscore'],function(_){

    function quizMaker(){
        this.bindings = {};
        this.interceptions = {};
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
        unset: function(propName, noUpdate){
            delete this['__' + propName];
            if(noUpdate) return this;
            this.updateBindings(propName);
            return this;
        },
        prop:function(propName, value){
            if(value == null){
                return this['__'+ propName];
            }
            this['__'+propName] = value;
            this.updateBindings(propName);
            return this;
        },
        
        bind: function (propertyName){
            var self = this;
            var onceOnly = false;
            
            function addRemovalFunction(propertyName, id){
                var newId = _.uniqueId(id);
                self.bindings[propertyName][newId] = {
                    binding: function(){
                        self.unbind(propertyName, id);
                        self.unbind(propertyName, newId);
                    }
                };
            }
            
            return {
                to: function(binding, data){ //binding = function(property, data)
                    if(!self.bindings[propertyName])
                        self.bindings[propertyName] = {};
                    var id = _.uniqueId(propertyName);
                    self.bindings[propertyName][id] = {
                        binding: binding,
                        data:data
                    };
                    if(onceOnly){
                        addRemovalFunction(propertyName, id);
                    }
                    return id;
                },
                get once() {
                    onceOnly = true;
                    return this;
                },
                get exclusively(){
                    self.unbind(propertyName).unset();
                    return this;
                }
            };
        },
        unbind: function(propertyName, id){
            if(id){
                if(this.bindings[propertyName])delete this.bindings[propertyName][id];
                if(this.interceptions[propertyName]) delete this.interceptions[propertyName][id];
            }else {
                delete this.bindings[propertyName];
                delete this.interceptions[propertyName];
            }
            var self = this;
            return {
                unset: function(){
                    return self.unset(propertyName, true);
                }
            };
        },
        /**
         * // func = 
         * @param {type} propertyName
         * @param {function} Signature: function (property) => boolean,
         * where true allows the 
         * @returns {undefined}
         */
        intercept: function(propertyName){ 
            if(!this.interceptions[propertyName])
                this.interceptions[propertyName] = {};
            if(!this.interceptions.onesies)
                this.interceptions.onesies = {};
            var self = this;
            var onceOnly = false;;
            return {
                get once(){
                    onceOnly = true;
                    return this;
                },
                withFunc: function(func){
                    var id = _.uniqueId(propertyName);
                    self.interceptions[propertyName][id] = func;
                    if(onceOnly){
                        self.interceptions.onesies[id] = true;
                    }
                    return id;
                }
            };
        },
        updateBindings: function(propertyName){
            if(!this.bindings) return;
            var bindings = this.bindings[propertyName];
            var interceptions = this.interceptions[propertyName];
            var intercepted = false;
            if(interceptions && !_.isEmpty(interceptions)){
                for(var id in interceptions){
                    var func = interceptions[id];
                    intercepted = func(this.prop(propertyName));
                    if(this.interceptions.onesies[id]){
                        delete interceptions[id];
                        delete this.interceptions.onesies[id];
                    }
                    if(intercepted) return;
                }
            }
            for(var f in bindings){
                if(bindings[f]){
                    bindings[f].binding(this.prop(propertyName), bindings[f].data);
                }
            }
        },
    };
    
    
    
    var instance;
    return (function(){
        if(!instance){
            instance = new quizMaker();
        }
        return instance;
    })();
    
});
