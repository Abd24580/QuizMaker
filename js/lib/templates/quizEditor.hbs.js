define(['handlebars'], function(Handlebars) {

return Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "            <div class=\"buttonRight\">\n                <a class=\"btn btn-default btn-sm downloadButton\" href=\""
    + ((stack1 = (helpers.downloadQuizHref || (depth0 && depth0.downloadQuizHref) || alias2).call(alias1,depth0,{"name":"downloadQuizHref","hash":{},"data":data})) != null ? stack1 : "")
    + "\" download=\""
    + container.escapeExpression(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + ".html\" title=\"Download Quiz as html\"><span class=\"glyphicon glyphicon-download-alt\"></span></a>\n                <button class=\"btn btn-default btn-sm cloneButton\" title=\"Clone this quiz\"><span class=\"glyphicon glyphicon-duplicate\"></span></button>\n            </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials["question-partial"],depth0,{"name":"question-partial","data":data,"indent":"                ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "                        <button class=\"btn btn-success btn-sm addQuestion\">Add new Question</button>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "                        <p>You must first save the quiz before you can add any questions.</p>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "<button class=\"deleteButton btn btn-danger\">Delete</button>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"quizEditor\" data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\" data-department=\""
    + alias4(((helper = (helper = helpers.DepartmentId || (depth0 != null ? depth0.DepartmentId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"DepartmentId","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"row\">\n        <div class=\"form-group lead col-sm-9 col-md-10\">\n            <label>Quiz Name:</label>\n            <input class=\"form-control\" type=\"text\" name=\"Name\" value=\""
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "\" >\n        </div>\n        <div class=\"col-md-2 col-sm-3\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.Id : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"questionsList col-xs-12\">\n            <h3>Questions:</h3>\n"
    + ((stack1 = (helpers.listQuestions || (depth0 && depth0.listQuestions) || alias2).call(alias1,depth0,{"name":"listQuestions","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-sm-6\">\n            <div class=\"row\">\n                <div class=\"col-xs-12\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.Id : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "                    <button class=\"btn btn-info btn-sm resetOrder\">Reset question order</button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-xs-12\">\n                    <button class=\"saveButton btn btn-primary\">Save</button>\n                    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.Id : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    <button class=\"cancelButton btn btn-default\">Cancel</button>\n                </div>\n            </div>\n        </div>\n        <div id=\"alertSpot\" class=\"col-sm-6\"></div>\n    </div>\n</div>\n";
},"usePartial":true,"useData":true})

});