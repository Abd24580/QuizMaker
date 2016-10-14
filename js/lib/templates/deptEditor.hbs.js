define(['handlebars'], function(Handlebars) {

return Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <h2>Edit department</h2>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <h2>Create department</h2>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "<button class=\"deleteButton btn btn-danger\">Delete</button>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"deptEditor\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.Id : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"form-group\">\n        <label for=\"newDeptName\">Department Name:</label>\n        <input type=\"text\" class=\"form-control\" id=\"newDeptName\" name=\"Name\" value=\""
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <input type=\"hidden\" name=\"Id\" value=\""
    + alias4(((helper = (helper = helpers.Id || (depth0 != null ? depth0.Id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Id","hash":{},"data":data}) : helper)))
    + "\">\n    <button class=\"saveButton btn btn-primary\">Save</button>\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.Id : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <button class=\"cancelButton btn btn-default\">Cancel</button>\n</div>\n";
},"useData":true})

});