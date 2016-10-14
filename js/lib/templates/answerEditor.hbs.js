define(['handlebars'], function(Handlebars) {

return Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row answer\">\n    <div class=\"col-xs-9 form-group\">\n        <input type=\"text\" class=\"form-control answerText questionInput\" name=\""
    + alias4(((helper = (helper = helpers.questionId || (depth0 != null ? depth0.questionId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"questionId","hash":{},"data":data}) : helper)))
    + "Answer\" value=\""
    + alias4(((helper = (helper = helpers.answer || (depth0 != null ? depth0.answer : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer","hash":{},"data":data}) : helper)))
    + "\" data-index=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <div class=\"col-xs-3 form-group\">\n        <label for=\""
    + alias4(((helper = (helper = helpers.questionId || (depth0 != null ? depth0.questionId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"questionId","hash":{},"data":data}) : helper)))
    + "Answer"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" title=\"Is this the correct answer?\">Correct?</label>\n        <input class=\"answerRadio questionInput\" type=\"radio\" name=\""
    + alias4(((helper = (helper = helpers.questionId || (depth0 != null ? depth0.questionId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"questionId","hash":{},"data":data}) : helper)))
    + "Correct\" id=\""
    + alias4(((helper = (helper = helpers.questionId || (depth0 != null ? depth0.questionId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"questionId","hash":{},"data":data}) : helper)))
    + "Answer"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" title=\"Is this the correct answer?\" class=\"correctAnswer\" data-index=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.correct : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n        <button class=\"btn btn-danger btn-sm deleteAnswerButton buttonRight\" data-id=\""
    + alias4(((helper = (helper = helpers.questionId || (depth0 != null ? depth0.questionId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"questionId","hash":{},"data":data}) : helper)))
    + "\" data-index=\""
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" title=\"Remove this answer\">\n            <span class=\"glyphicon glyphicon-minus-sign\"></span>\n        </button>\n    </div>\n</div>\n";
},"useData":true})

});