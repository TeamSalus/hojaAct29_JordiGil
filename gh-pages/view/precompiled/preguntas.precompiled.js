(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['preguntas.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"respuestas__trueFalse\">\r\n        <button class=\"btnAnswer\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"answer1") || (depth0 != null ? lookupProperty(depth0,"answer1") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer1","hash":{},"data":data,"loc":{"start":{"line":10,"column":34},"end":{"line":10,"column":47}}}) : helper))) != null ? stack1 : "")
    + "</button>\r\n        <button class=\"btnAnswer\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"answer2") || (depth0 != null ? lookupProperty(depth0,"answer2") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer2","hash":{},"data":data,"loc":{"start":{"line":11,"column":34},"end":{"line":11,"column":47}}}) : helper))) != null ? stack1 : "")
    + "</button>\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"respuestas__multiples\">\r\n        <button class=\"btnAnswer\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"answer1") || (depth0 != null ? lookupProperty(depth0,"answer1") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer1","hash":{},"data":data,"loc":{"start":{"line":15,"column":34},"end":{"line":15,"column":47}}}) : helper))) != null ? stack1 : "")
    + "</button>\r\n        <button class=\"btnAnswer\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"answer2") || (depth0 != null ? lookupProperty(depth0,"answer2") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer2","hash":{},"data":data,"loc":{"start":{"line":16,"column":34},"end":{"line":16,"column":47}}}) : helper))) != null ? stack1 : "")
    + "</button>\r\n        <button class=\"btnAnswer\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"answer3") || (depth0 != null ? lookupProperty(depth0,"answer3") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer3","hash":{},"data":data,"loc":{"start":{"line":17,"column":34},"end":{"line":17,"column":47}}}) : helper))) != null ? stack1 : "")
    + "</button>\r\n        <button class=\"btnAnswer\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"answer4") || (depth0 != null ? lookupProperty(depth0,"answer4") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"answer4","hash":{},"data":data,"loc":{"start":{"line":18,"column":34},"end":{"line":18,"column":47}}}) : helper))) != null ? stack1 : "")
    + "</button>\r\n    </div>\r\n</div>\r\n\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"pregunta\">\r\n    <p class=\"pregunta__categoria\" id=\"categoria\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"category") || (depth0 != null ? lookupProperty(depth0,"category") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data,"loc":{"start":{"line":2,"column":50},"end":{"line":2,"column":64}}}) : helper))) != null ? stack1 : "")
    + "</p>\r\n    <div class=\"pregunta__titulo\">\r\n        <p id=\"pregunta\" class=\"pregunta__titulo__nombre\">"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"question") || (depth0 != null ? lookupProperty(depth0,"question") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"question","hash":{},"data":data,"loc":{"start":{"line":4,"column":58},"end":{"line":4,"column":72}}}) : helper))) != null ? stack1 : "")
    + "</p>\r\n    </div>\r\n</div>\r\n<div class=\"respuestas\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"trueFalse") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":22,"column":7}}})) != null ? stack1 : "");
},"useData":true});
})();