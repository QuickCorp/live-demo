'use strict';
Package('org.quickcorp.custom.controllers.codemirror',[
  Class("BindingController",Controller,{
    bindChangeToiFrame (instance, propertyName, iFrameSelectorName) {
      // instance example: component.data
      // propertyName example: "content"
      // selectorName example: "iframe[name=result]"
      // So the value of component.data.content will bind its changes to the selector iframe[name=result]
      function addContextualContent (element, content){
        const scriptEl = document.createRange().createContextualFragment(content);
        element.contentDocument.body.innerHTML = "";
        element.contentDocument.body.append(scriptEl);
      }
      instance[propertyName] = New(DDO,{name:propertyName, value:"", instance:instance, fset: function (content){ Tag(iFrameSelectorName).map(element=>addContextualContent(element, content)) ;return content;}} );
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
  }),
  Class('EncryptionController',BindingController,{
    dependencies:[],
    component:null,
    editor:null,
    _new_:function (o){
      this.__new__(o);
      global.encryptionController=this;
      //TODO: Implement
    },
    done:function (){
      var controller = this;
      delete this.component.fieldType;
      this.component.createBindingEvents();
      Tag('textarea[codemirror]').map((element)=>{
        controller.editor = CodeMirror.fromTextArea(element, {
          lineNumbers: true,
          styleActiveLine: true,
          matchBrackets: true
        });
//        controller.editor.setOption("theme", "blackboard");
        controller.editor.setOption("mode","javascript");
        controller.editor.on('change',function (editor){
          controller.component.executeBindings();
          controller.component.data.content = editor.getValue();
        });

        // data binding
        controller.bindChangeToiFrame(controller.component.data,"content","iframe[name=result]");
      });
    },
    submit:function (){
      this.component.data._encoded_ = _Crypt.encrypt(this.component.data.content,this.component.data.passphrase);
      location.href="#result";
    },
    clipboard: function (){
      var controller = this;
      Tag('message').map((element)=>{
        element.innerHTML = 'Copied to clipboard!';
      });
      var clipboard_content = New(Component,{
        name:'clipboard',
        templateURI:'',
        body:document.createElement('input'),
        tplsource:'none'
      });
      clipboard_content.attachIn('body');
      clipboard_content.body.defaultValue = controller.editor.getValue();
      clipboard_content.body.select();
      document.execCommand('copy');
      document.body.removeChild(clipboard_content.body);
      location.href='#resultcopied';

    }
  })
]);
