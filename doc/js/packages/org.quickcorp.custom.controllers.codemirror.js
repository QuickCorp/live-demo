'use strict';
Import ("org.quickcorp.controllers.binding").then(function (){
  Package('org.quickcorp.custom.controllers.codemirror',[
    Class('LiveCodeController',BindingController,{
      dependencies:[],
      component:null,
      editor:null,
      _new_:function (o){
        this.__new__(o);
        global.liveCodeController=this;
        //TODO: Implement
      },
      done:function (){
        var controller = this;
        delete this.component.fieldType;
        this.component.createBindingEvents();
        this.component.body.subelements('textarea[codemirror]').map((element)=>{
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
      run () {
        var controller = this;
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
        var ifr = Tag("iframe[name=result]").pop();
        ifr.src = "";
        addContextualContent(ifr, controller.component.data.content);
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
})
