define(['handlebars'], function(Handlebars) {

return Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<!DOCTYPE html>\n<html>\n    <head>\n        <title>"
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "</title>\n        <style>\n            span{font-family: sans-serif;}\n            table{border-style:solid;border-width: thin; border-color: #ccccff}\n            .jh-type-array{background-color: lightblue;}\n            .jh-key{color:#672d00}\n        </style>\n    </head>\n    <body>\n        <div>"
    + ((stack1 = ((helper = (helper = helpers.Table || (depth0 != null ? depth0.Table : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Table","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n        <p>Download the raw JSON quiz <a href=\"data:text/json;charset=utf-8,"
    + ((stack1 = ((helper = (helper = helpers.Json || (depth0 != null ? depth0.Json : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Json","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\" download=\""
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + ".json\">here</a></p>\n    </body>\n</html>\n";
},"useData":true})

});