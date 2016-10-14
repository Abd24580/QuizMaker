define(['handlebars'], function(Handlebars) {

return Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                            <strong>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentDepartment : depth0)) != null ? stack1.Name : stack1), depth0))
    + "</strong>                            \r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                            Select Department\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                            <li><a href=\"#\" data-department data-id=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "</a></li>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "                <li class=\"dropdown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentQuiz : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "                        <span class=\"caret\"></span>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\" id=\"quizDropDown\">\r\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.currentDepartment : depth0)) != null ? stack1.Quizzes : stack1),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentDepartment : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </ul>\r\n                </li>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                        <strong>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.currentQuiz : depth0)) != null ? stack1.Name : stack1), depth0))
    + "</strong>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                        Select Quiz\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, alias2=container.lambda;

  return "                        <li><a href=\"#\" data-quiz data-id=\""
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias1(alias2(depth0, depth0))
    + "\">"
    + alias1(alias2(depth0, depth0))
    + "</a></li>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                        <li role=\"separator\" class=\"divider\"></li>\r\n                        <li><a href=\"#\" id=\"createQuiz\">Create new quiz</a></li>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "                <li><a href=\"#\" id=\"editDept\">Edit Department</a></li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<nav class=\"navbar navbar-default navbar-fixed-top\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"navbar-header\">\r\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#collapsingMenu\">\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n                <span class=\"icon-bar\"></span>\r\n            </button>\r\n            <span class=\"navbar-brand\">QuizMaker</span>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\" id=\"collapsingMenu\">\r\n            <ul class=\"nav navbar-nav\">\r\n                <li class=\"dropdown\" id=\"deptDropDown\">\r\n                    <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentDepartment : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "                        <span class=\"caret\"></span>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu\" id=\"deptsDropDown\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.departments : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                        <li role=\"separator\" class=\"divider\"></li>\r\n                        <li><a href=\"#\" id=\"createDepartment\">Create New Department</a></li>\r\n                    </ul>\r\n                </li>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentDepartment : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.currentDepartment : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n            <div class=\"nav navbar-nav navbar-right\">\r\n                <div id=\"loadingBar\" class=\"hidden-md-up navbar-right\"><img src='../imgs/ajax-loader.gif'></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</nav>\r\n";
},"useData":true})

});