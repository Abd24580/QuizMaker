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

define(['handlebars'],function(hb){
    
    return {
        initialize: function (){
            hb.registerPartial('question-partial', $('#question-partial').html());
            hb.registerHelper("listAnswers", function(question, options){
                var answersArray = question.AnswersArray;
                var lis = [];
                for(var a in answersArray){
                    if(a === question.CorrectIndex){
                        lis.push(options.fn('<strong>' + answersArray[a] + '</strong>'));
                        continue;
                    }
                    lis.push(options.fn(answersArray[a]));
                }
                return lis.join(' ');
            });
        }
    };
});