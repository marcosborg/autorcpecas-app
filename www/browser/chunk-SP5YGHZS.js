import{a as f,b as h,c as b}from"./chunk-AEZTMUAG.js";import{f as s}from"./chunk-RW4GY4BD.js";var m=function(o){return o.Prompt="PROMPT",o.Camera="CAMERA",o.Photos="PHOTOS",o}(m||{}),d=function(o){return o.Rear="REAR",o.Front="FRONT",o}(d||{}),y=function(o){return o.Uri="uri",o.Base64="base64",o.DataUrl="dataUrl",o}(y||{});var u=class extends b{getPhoto(t){return s(this,null,function*(){return new Promise((r,a)=>s(this,null,function*(){if(t.webUseInput||t.source===m.Photos)this.fileInputExperience(t,r,a);else if(t.source===m.Prompt){let e=document.querySelector("pwa-action-sheet");e||(e=document.createElement("pwa-action-sheet"),document.body.appendChild(e)),e.header=t.promptLabelHeader||"Photo",e.cancelable=!1,e.options=[{title:t.promptLabelPhoto||"From Photos"},{title:t.promptLabelPicture||"Take Picture"}],e.addEventListener("onSelection",i=>s(this,null,function*(){i.detail===0?this.fileInputExperience(t,r,a):this.cameraExperience(t,r,a)}))}else this.cameraExperience(t,r,a)}))})}pickImages(t){return s(this,null,function*(){return new Promise((r,a)=>s(this,null,function*(){this.multipleFileInputExperience(r,a)}))})}cameraExperience(t,r,a){return s(this,null,function*(){if(customElements.get("pwa-camera-modal")){let e=document.createElement("pwa-camera-modal");e.facingMode=t.direction===d.Front?"user":"environment",document.body.appendChild(e);try{yield e.componentOnReady(),e.addEventListener("onPhoto",i=>s(this,null,function*(){let n=i.detail;n===null?a(new f("User cancelled photos app")):n instanceof Error?a(n):r(yield this._getCameraPhoto(n,t)),e.dismiss(),document.body.removeChild(e)})),e.present()}catch{this.fileInputExperience(t,r,a)}}else console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements."),this.fileInputExperience(t,r,a)})}fileInputExperience(t,r,a){let e=document.querySelector("#_capacitor-camera-input"),i=()=>{var n;(n=e.parentNode)===null||n===void 0||n.removeChild(e)};e||(e=document.createElement("input"),e.id="_capacitor-camera-input",e.type="file",e.hidden=!0,document.body.appendChild(e),e.addEventListener("change",n=>{let c=e.files[0],l="jpeg";if(c.type==="image/png"?l="png":c.type==="image/gif"&&(l="gif"),t.resultType==="dataUrl"||t.resultType==="base64"){let p=new FileReader;p.addEventListener("load",()=>{if(t.resultType==="dataUrl")r({dataUrl:p.result,format:l});else if(t.resultType==="base64"){let w=p.result.split(",")[1];r({base64String:w,format:l})}i()}),p.readAsDataURL(c)}else r({webPath:URL.createObjectURL(c),format:l}),i()}),e.addEventListener("cancel",n=>{a(new f("User cancelled photos app")),i()})),e.accept="image/*",e.capture=!0,t.source===m.Photos||t.source===m.Prompt?e.removeAttribute("capture"):t.direction===d.Front?e.capture="user":t.direction===d.Rear&&(e.capture="environment"),e.click()}multipleFileInputExperience(t,r){let a=document.querySelector("#_capacitor-camera-input-multiple"),e=()=>{var i;(i=a.parentNode)===null||i===void 0||i.removeChild(a)};a||(a=document.createElement("input"),a.id="_capacitor-camera-input-multiple",a.type="file",a.hidden=!0,a.multiple=!0,document.body.appendChild(a),a.addEventListener("change",i=>{let n=[];for(let c=0;c<a.files.length;c++){let l=a.files[c],p="jpeg";l.type==="image/png"?p="png":l.type==="image/gif"&&(p="gif"),n.push({webPath:URL.createObjectURL(l),format:p})}t({photos:n}),e()}),a.addEventListener("cancel",i=>{r(new f("User cancelled photos app")),e()})),a.accept="image/*",a.click()}_getCameraPhoto(t,r){return new Promise((a,e)=>{let i=new FileReader,n=t.type.split("/")[1];r.resultType==="uri"?a({webPath:URL.createObjectURL(t),format:n,saved:!1}):(i.readAsDataURL(t),i.onloadend=()=>{let c=i.result;r.resultType==="dataUrl"?a({dataUrl:c,format:n,saved:!1}):a({base64String:c.split(",")[1],format:n,saved:!1})},i.onerror=c=>{e(c)})})}checkPermissions(){return s(this,null,function*(){if(typeof navigator>"u"||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");try{return{camera:(yield window.navigator.permissions.query({name:"camera"})).state,photos:"granted"}}catch{throw this.unavailable("Camera permissions are not available in this browser")}})}requestPermissions(){return s(this,null,function*(){throw this.unimplemented("Not implemented on web.")})}pickLimitedLibraryPhotos(){return s(this,null,function*(){throw this.unavailable("Not implemented on web.")})}getLimitedLibraryPhotos(){return s(this,null,function*(){throw this.unavailable("Not implemented on web.")})}},v=new u;var _=h("Camera",{web:()=>new u});export{y as a,_ as b};
