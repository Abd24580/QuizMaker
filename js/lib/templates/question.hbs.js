define(['handlebars'], function(Handlebars) {

return Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "                <div class=\"col-sm-6 answerBlock\">"
    + container.escapeExpression((helpers.plusOne || (depth0 && depth0.plusOne) || alias2).call(alias1,(depth0 != null ? depth0.index : depth0),{"name":"plusOne","hash":{},"data":data}))
    + ". "
    + ((stack1 = ((helper = (helper = helpers.answerText || (depth0 != null ? depth0.answerText : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"answerText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return " <p class=\"incorrectMessage\"><strong>Response if incorrect:</strong> "
    + container.escapeExpression(((helper = (helper = helpers.IncorrectMessage || (depth0 != null ? depth0.IncorrectMessage : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"IncorrectMessage","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=question data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\" data-department=\""
    + alias4(((helper = (helper = helpers.DepartmentId || (depth0 != null ? depth0.DepartmentId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"DepartmentId","hash":{},"data":data}) : helper)))
    + "\" data-quiz=\""
    + alias4(((helper = (helper = helpers.QuizId || (depth0 != null ? depth0.QuizId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"QuizId","hash":{},"data":data}) : helper)))
    + "\">\n    \n    <div class=\"row\">\n        <div class=\"col-sm-10\">\n            <h4>"
    + alias4(((helper = (helper = helpers.QuestionNumber || (depth0 != null ? depth0.QuestionNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"QuestionNumber","hash":{},"data":data}) : helper)))
    + ". "
    + alias4(((helper = (helper = helpers.QuestionText || (depth0 != null ? depth0.QuestionText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"QuestionText","hash":{},"data":data}) : helper)))
    + "</h4>\n        </div>\n        <div class=\"col-sm-2\">\n            <div class=\"buttonRight\">\n                <button class=\"btn btn-success btn-sm editQuestion\" data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\" title=\"Edit this question\"><span class=\"glyphicon glyphicon-edit\"></span></button>\n                <span class=\"glyphicon glyphicon-move moveBlock\"></span>\n            </div>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-xs-12\">\n            <p class=\"answers\">Answers:</p>\n            <div class=\"answerList\">\n"
    + ((stack1 = (helpers.listAnswers || (depth0 && depth0.listAnswers) || alias2).call(alias1,depth0,{"name":"listAnswers","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </div>\n    </div>\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.IncorrectMessage : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true})

});