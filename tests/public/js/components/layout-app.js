"use strict";function e(e){return e+":init"}window.trigger=function(e,t,n=!0,o=!0){if("createEvent"in document){let i=document.createEvent("HTMLEvents");i.initEvent(t,n,o),e.dispatchEvent(i)}else{let n=document.createEventObject();n.eventType=t,e.fireEvent("on"+n.eventType,n)}};var t=window.trigger;!function(n,o,i=[]){function c(r){let u=!0;return i.forEach((e=>{window[e]||(u=!1)})),u&&(i.forEach((t=>{document.removeEventListener(e(t),c)})),window[o]=n()||{},t(document,e(o))),u}c()||i.forEach((t=>{document.addEventListener(e(t),c)}))}((function(){console.log("Hello from layout-app.js")}),"appComponentLayoutApp");

//# sourceMappingURL=maps/layout-app.js.map
