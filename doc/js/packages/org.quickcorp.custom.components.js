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
  }),
  Class ("LiveCodeComponent", Component, {
    name:"live-code",
    shadowed: false,
    tplsource: "inline",
    template: `
    <style>
      @import url('./doc/css/github-style.css');
      @import url('./doc/css/snippet.css');

        /* If you use shadowed=true
        This style will be automatically shadowed in the browser */
        div.container {
          box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(228, 228, 234, 0.5) 0px 9px 23px 0px;
          transition: all 0.3s ease-in-out;
          width: 100%;
          margin: 0 auto;
          min-height: 100%;
          height: auto;
          border-radius: 30px;
          display: block;
          padding: 3%;
          background-color: #ffffff;
        }


        a{
          /* These are technically the same, but use both */
          overflow-wrap: break-word;
          word-wrap: break-word;

          -ms-word-break: break-all;
          /* This is the dangerous one in WebKit, as it breaks things wherever */
          word-break: break-all;
          /* Instead use this non-standard one: */
          word-break: break-word;

          /* Adds a hyphen where the word breaks, if supported (No Blink) */
          -ms-hyphens: auto;
          -moz-hyphens: auto;
          -webkit-hyphens: auto;
          hyphens: auto;
        }
        p:not(:first-child) {
          margin: 1% 5%;
          font-size: medium;
          display: block;
        }
        h1, h2 {
          margin: 2% 3%;
        }
        ul {
          margin: auto 4%;
        }

        .livecode_grid {
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: 50% 50%;
        }
    </style>
    <div class="container">

    <div class="livecode_grid" >
      <component class="code_editor" name="{{editorname}}" componentClass="FormField" controllerClass="LiveCodeController">
      </component>
      <div class="code_result">
        <p><button onclick="location.href='#result'" >RUN</button></p>
        <p></p>
      <iframe style="border:1px solid black; width:100%; height:70%" name="result" id="result" ></iframe>
      </div>

    </div>


    </div>
    `
  })
]);
