'use strict';
Package('org.quickcorp.custom.tools',[
  Class('MarkdownTemplateHandler',DefaultTemplateHandler,{
    assign:function (data){
      var converter = new showdown.Converter();
      converter.setFlavor('github');
      return converter.makeHtml(this.template);
    }
  })
]);
