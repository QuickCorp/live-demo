"use strict";
Import ("installer");
Import ("org.quickcorp.custom.controllers.codemirror");
Package("org.quickcorp.custom.controllers",[
    Class("MainController",Controller,{
      dependencies:[],
      component:null,
      _new_:function (o){
        this.__new__(o);
        //TODO: Implement
      },
        done:function(){

        }
    }),
    Class("PWAController",Object,{
        component:null,
        _new_:function (o){
            logger.debug("PWAController Element Initialized");
            this.component = o.component;
        },
        done: function (){
            document.head.innerHTML+=this.component.body.innerHTML;
            this.component.body.innerHTML="";
        }
    }),

  Class("SideNavController",Object,{
  dependencies:[],
  component:null,
  visibility:false,
  effect:null,
  open:function (){
    if (this.effect != null){
      this.effect.apply(this.component.body, 0,1);
    }
    this.component.body.style.width="35%";
    this.component.body.style.overflowX="visible";
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("main").map(main=>main.style.left="35%"));
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("main").map(main=>main.style.width="65%"));
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("header").map(header=>header.style.left="35%"));
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("header").map(header=>header.style.width="65%"));
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("header").map(header=>header.style.position="relative"));
    global.componentsStack.filter(component=>component.name==="layout-basic")[0].subcomponents.filter(component=>component.name==="appbar").map(component=> component.shadowRoot.subelements("component[name=topmenu]").map(topmenu=>topmenu.style.left="40%"));
    global.componentsStack.filter(component=>component.name==="layout-basic")[0].subcomponents.filter(component=>component.name==="appbar").map(component=> component.shadowRoot.subelements("component[name=topmenu]").map(topmenu=>topmenu.style.width="60%"));
    this.component.body.parentElement.subelements(".navbtn")[0].style.display="none";
    this.component.body.parentElement.subelements(".closebtn")[0].style.display="block";
    this.visibility = true;
    return this.visibility;
  },
  close:function (){
    if (this.effect != null){
      this.effect.apply(this.component.body, 1,0);
    }
    this.component.body.style.width="0px";
    this.component.body.style.overflowX="hidden";
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("main").map(main=>main.style.left="0"));
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("main").map(main=>main.style.width="100%"));
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("header").map(header=>header.style.left="0"));
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("header").map(header=>header.style.width="100%"));
    global.componentsStack.filter(component=>component.name==="layout-basic").map(component=> component.body.subelements("header").map(header=>header.style.position=""));
    global.componentsStack.filter(component=>component.name==="layout-basic")[0].subcomponents.filter(component=>component.name==="appbar").map(component=> component.shadowRoot.subelements("component[name=topmenu]").map(topmenu=>topmenu.style.left="55px"));
    global.componentsStack.filter(component=>component.name==="layout-basic")[0].subcomponents.filter(component=>component.name==="appbar").map(component=> component.shadowRoot.subelements("component[name=topmenu]").map(topmenu=>topmenu.style.width="100%"));
    this.component.body.parentElement.subelements(".navbtn")[0].style.display="block";
    this.component.body.parentElement.subelements(".closebtn")[0].style.display="none";
    this.visibility = false;
    return this.visibility;
  },
  toggle:function (){
    if (this.visibility){
      this.close();
    } else {
      this.open();
    }
  },
  _new_:function (o){
      this.__new__(o);
            global.sideNavController = this;
      var controller = this;
      global._sdk_.then(function (){
        controller.effect = New(Fade,{duration:300});
          controller.close();
      });
      //TODO: Implement

    }
  }),
  Class('MarkdownController',Controller,{
    dependencies:[],
    done: function (){
      var controller = this;
      controller.dependencies.push(New(SourceJS,{external:false,url:'doc/js/prism-okaidia.js',done:function(){}}));
      controller.dependencies.push(New(SourceCSS,{external:false,url:'doc/css/prism-okaidia.css',done:function(){}}));

    }
  }),
    Class("HeaderController",Controller,{
      dependencies:[],
      component:null,
        installer:null,
        loadInstallerButton:function (){
          this.installer = this.component.body.subelements("#installerbutton").reduce(e=>New(ClassFactory("Installer"),{root:e}));
        },
      _new_:function (o){
        this.__new__(o);
        //TODO: Implement
      },
        done: function (){
//            this.loadInstallerButton();
        }
    }),
  Class("Controller1",Controller,{
    dependencies:[],
    component:null,
    _new_:function (o){
      this.__new__(o);
      //TODO: Implement
    }
  }),
  Class("Controller2",Controller,{
    dependencies:[],
    component:null,
    _new_:function (o){
      this.__new__(o);
      //TODO: Implement
    }
  }),
]);
