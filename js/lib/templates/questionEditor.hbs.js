define(['handlebars'], function(Handlebars) {

return Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["answerEditor-partial"],depth0,{"name":"answerEditor-partial","data":data,"indent":"                    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=question data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\" data-department=\""
    + alias4(((helper = (helper = helpers.DepartmentId || (depth0 != null ? depth0.DepartmentId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"DepartmentId","hash":{},"data":data}) : helper)))
    + "\" data-quiz=\""
    + alias4(((helper = (helper = helpers.QuizId || (depth0 != null ? depth0.QuizId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"QuizId","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"row\">\n        <div class=\"col-sm-10 form-horizontal\">\n            <label>Question:</label>\n            <input class=\"form-control questionText questionInput\" type=\"text\" name=\"QuestionText\" value=\""
    + alias4(((helper = (helper = helpers.QuestionText || (depth0 != null ? depth0.QuestionText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"QuestionText","hash":{},"data":data}) : helper)))
    + "\">\n        </div>\n        <div class=\"col-sm-2\">\n            <div class=\"buttonRight\">\n                <button class=\"btn btn-default btn-sm cancelEdit\" data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\" title=\"Cancel edit\"><span class=\"glyphicon glyphicon-remove\"></span></button>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\"\n            <p class=\"answers\">Answers:</p>\n            <div class=\"answerList form-inline\">\n"
    + ((stack1 = (helpers.listAnswers || (depth0 && depth0.listAnswers) || alias2).call(alias1,depth0,{"name":"listAnswers","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <button class=\"btn btn-default btn-sm addAnswer\" data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\">Add answer</button>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-10\">\n            <p class=\"incorrectMessage questionInput\">Incorrect Message: <input type=\"text\" class=\"form-control\" name=\"IncorrectMessage\" value=\""
    + alias4(((helper = (helper = helpers.IncorrectMessage || (depth0 != null ? depth0.IncorrectMessage : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"IncorrectMessage","hash":{},"data":data}) : helper)))
    + "\">\n        </div>\n        <div class=\"col-sm-2\">\n            <div class=\"buttonRight\">\n                <button class=\"btn btn-primary btn-sm saveQuestion questionInput\" disabled data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\" title=\"There are no changes to save yet.\"><span class=\"glyphicon glyphicon-floppy-disk\"></span></button>\n                <button class=\"btn btn-danger btn-sm deleteQuestion questionInput\" data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\" title=\"Delete this question\"><span class=\"glyphicon glyphicon-trash\"></span></button>\n            </div>\n        </div>\n    </div>\n</div>\n";
},"usePartial":true,"useData":true})

});