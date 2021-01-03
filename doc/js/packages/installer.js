"use strict";
Package("com.qcobjects.pwa.installer",[
  Class("Installer",Object,{
    root:null,
    install (){
      logger.debug("installer actioned");
      var promptEvent = global.promptEvent;
      if (promptEvent) {
        logger.debug("prompt event");

          promptEvent.prompt();
          promptEvent.userChoice
              .then(function (choiceResult) {
                logger.debug(choiceResult);
                  // The user actioned the prompt (good or bad).
                  // good is handled in
                  promptEvent = null;
//                   root.classList.remove('available');
              })
              .catch(function (installError) {
                logger.debug(installError);
                  // Boo. update the UI.
                  promptEvent = null;
                  this.root.classList.remove("available");
              });
      } else {
        logger.debug("not asking for install");
      }
    },
    installed (e){
      logger.debug(e);
      logger.debug("app is already installed");
      global.promptEvent = null;
//         This fires after onbeforinstallprompt OR after manual add to homescreen.
      this.root.classList.remove("available");

    },
    beforeinstallprompt (e){
      logger.debug("registering installer event");
      global.promptEvent = e;
      global.promptEvent.preventDefault();
      this.root.classList.add("available");
      return false;
    },
    _new_:function (o){
      var root = o.root;
      window.addEventListener("beforeinstallprompt", this.beforeinstallprompt,false);
      window.addEventListener("appinstalled", this.installed,false);

      root.addEventListener("click", this.install.bind(this));
      root.addEventListener("touchend", this.install.bind(this));
    }
  })
]);
