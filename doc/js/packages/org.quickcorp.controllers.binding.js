'use strict';
Package('org.quickcorp.controllers.binding',[
  Class("BindingController",Controller,{
    bindChangeToiFrame (instance, propertyName, iFrameSelectorName, executeScripts = false) {
      // instance example: component.data
      // propertyName example: "content"
      // selectorName example: "iframe[name=result]"
      // So the value of component.data.content will bind its changes to the selector iframe[name=result]
      function addContextualContent (element, content){
        try {
          const scriptEl = document.createRange().createContextualFragment(content);
          element.contentDocument.body.innerHTML = "";
          element.contentDocument.body.append(scriptEl);
        } catch (e){
          logger.debug("Something was wrong inserting the contextual fragment");
        }
      }
      function addSimpleContent(element, content){
        element.contentDocument.body.innerHTML = content;
      }
      instance[propertyName] = New(DDO,{name:propertyName, value:"", instance:instance, fset: function (content){ Tag(iFrameSelectorName).map(element=> (executeScripts)? (addContextualContent(element, content)):(addSimpleContent(element, content)) ) ;return content;}} );
      instance[propertyName] = "" // initialise value
    },
    bindChangeToSelector (instance, propertyName, selectorName) {
      // instance example: component.data
      // propertyName example: "content"
      // selectorName example: "component[name=result]"
      // So the value of component.data.content will bind its changes to the selector component[name=result]
      instance[propertyName] = New(DDO,{name:propertyName, value:"", instance:instance, fset: function (content){ Tag(selectorName).map(element=>element.innerHTML=content) ;return content;}} );
      instance[propertyName] = "" // initialise value
    },
    bindChangeToCallback (instance, propertyName, callback){
      // instance example: component.data
      // propertyName example: "content"
      // callback example: function (contentValue){... }
      // So the value of component.data.content will bind its changes to the callback function
       instance[propertyName] = New(DDO,{name:propertyName, value:"", instance:instance, fset: function (content){ callback(content);return content;}} );
       instance[propertyName] = "" // initialise value
    }
  })
]);
