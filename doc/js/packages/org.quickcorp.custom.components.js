"use strict";
Package("org.quickcorp.custom.components",[
  Class('SideMarkdownComponent',Component,{
  dependencies:[],
  body:document.createElement('div'),
  templateURI:'doc/templates/components/markdown/en/page_en_4.md',
  cached:false,
  controller:null,
  view:null,
  templateHandler: 'MarkdownTemplateHandler',
  done:function (){
    var component = this;
    var toc = this.body.innerHTML.match(/<!-- TOC([\s\S]*?)<!-- \/TOC -->/gmi)[0];
    this.body.innerHTML = `<details open="">
      <summary>Reference</summary>
      `+toc+`
    </details>`;
    component.i18n_translate(); // force execution of i18n translation if available
    this.shadowRoot.subelements('ul>li>a').map(element=>{
      element.addEventListener('click',function (event){
        global.sideNavController.close();
      })
    });
    _super_('Component','done').call(this);
  }
}),
  Class('MarkdownComponent',Component,{
    dependencies:[],
    name:'markdowncomponent',
    templateHandler: 'MarkdownTemplateHandler'
  })
]);
