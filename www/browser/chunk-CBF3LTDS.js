import{a as X,b as Y}from"./chunk-SP5YGHZS.js";import{c as Q}from"./chunk-KKLBPVE2.js";import{a as J,b as K}from"./chunk-6RIQF3XD.js";import"./chunk-AEZTMUAG.js";import{A as E,B as U,E as P,G as D,M as F,S as H,U as A,V as B,W as M,X as R,Y as N,Z as V,_ as W,aa as z,c as _,e as b,f as w,g as u,ga as L,h as t,i as k,j as f,k as n,l as s,m as g,ma as O,n as x,na as q,o as I,oa as G,p as y,r as m,w as T,y as j,z as S}from"./chunk-CEFJHDG2.js";import"./chunk-IQNCHDZD.js";import"./chunk-V4Z7YT6R.js";import"./chunk-UHCRRYBY.js";import"./chunk-4PGTP63H.js";import"./chunk-QO6X3PUD.js";import"./chunk-HC6MZPB3.js";import"./chunk-N3PT3BRI.js";import"./chunk-7JAEJH63.js";import"./chunk-FERD25SW.js";import"./chunk-SYQESB6R.js";import"./chunk-LEIMCQKJ.js";import"./chunk-MM5QLNJM.js";import"./chunk-72KDLSWN.js";import"./chunk-5OMUW5VI.js";import"./chunk-OBXDPQ3V.js";import"./chunk-F2COMJ2U.js";import"./chunk-MCRJI3T3.js";import"./chunk-P5GPMOSE.js";import"./chunk-NGJP4CJH.js";import"./chunk-3TXEPWZY.js";import"./chunk-YTQOYWXA.js";import"./chunk-PUKYQ4VT.js";import"./chunk-G3CV3VGG.js";import"./chunk-UMQDWHM2.js";import"./chunk-PB7KHMCD.js";import"./chunk-5FWCUKLR.js";import"./chunk-4U6PRYVA.js";import"./chunk-QXT6YJJ4.js";import"./chunk-JWIEPCRG.js";import"./chunk-QPVVTFFW.js";import"./chunk-J6ICYO4L.js";import"./chunk-LF5XB4YN.js";import{f as h}from"./chunk-RW4GY4BD.js";function ae(c,o){if(c&1){let Z=x();n(0,"ion-toolbar",4)(1,"ion-button",5),I("click",function(){b(Z);let i=y();return w(i.uploadImage())}),m(2,"Gravar fotografia"),s()()}}var be=(()=>{let o=class o{constructor(r,i,l,v,$,ee,te,ie){this.preferences=r,this.router=i,this.loadingController=l,this.toastController=v,this.alertController=$,this.api=ee,this.route=te,this.http=ie,this.imageUrl="https://ionicframework.com/docs/img/demos/card-media.png",this.photo=!1,this.product_id=this.route.snapshot.params.product_id,this.takePicture=()=>h(this,null,function*(){this.photo=!1;let C=yield Y.getPhoto({quality:50,allowEditing:!1,resultType:X.Base64}),a=new Image;a.src="data:image/jpeg;base64,"+C.base64String,a.onload=()=>{let e=document.createElement("canvas"),d=e.getContext("2d");if(d){let p=1e3/a.width;e.width=1e3,e.height=a.height*p,d.drawImage(a,0,0,e.width,e.height),this.imageUrl=e.toDataURL("image/jpeg",.5),this.photo=!0}else console.error("Erro ao obter o contexto 2D do canvas")}}),this.uploadImage=()=>h(this,null,function*(){if(!this.photo||!this.imageUrl){console.error("Nenhuma foto dispon\xEDvel para envio");return}let a=yield(yield fetch(this.imageUrl)).blob(),e=new FormData;e.append("image",a,"photo.jpg"),e.append("product_id",this.product_id);let d={headers:new E({Authorization:"Bearer "+this.access_token})};this.http.post("https://ai.autorcpecas.pt/api/upload-image",e,d).subscribe(p=>{this.alertController.create({header:"Imagem gravada",message:"Pode avan\xE7ar",backdropDismiss:!1,buttons:[{text:"Continuar a tirar fotografias",handler:()=>{this.imageUrl="https://ionicframework.com/docs/img/demos/card-media.png",this.photo=!1}},{text:"Concluir",handler:()=>{this.router.navigateByUrl("references")}}]}).then(re=>{re.present()})},p=>{console.error("Erro ao enviar a imagem:",p)})})}ngOnInit(){this.preferences.checkName("access_token").then(r=>{r.value?this.access_token=r.value:this.router.navigateByUrl("/")})}};o.\u0275fac=function(i){return new(i||o)(t(K),t(D),t(q),t(G),t(O),t(J),t(P),t(U))},o.\u0275cmp=_({type:o,selectors:[["app-image"]],standalone:!0,features:[T],decls:15,vars:2,consts:[[3,"src"],["color","success",4,"ngIf"],["color","primary"],["expand","full","fill","clear","color","dark",3,"click"],["color","success"],["expand","full","fill","clear","color","light",3,"click"]],template:function(i,l){i&1&&(g(0,"app-header"),n(1,"ion-content")(2,"ion-card")(3,"ion-card-header")(4,"ion-card-title"),m(5,"Tirar foto"),s(),n(6,"ion-card-subtitle"),m(7,"Utilize um local bem iluminado e tire fotografias, uma a uma. A primeira ser\xE1 a imagem de capa."),s()(),n(8,"ion-card-content"),g(9,"ion-img",0),s()()(),n(10,"ion-footer"),k(11,ae,3,0,"ion-toolbar",1),n(12,"ion-toolbar",2)(13,"ion-button",3),I("click",function(){return l.takePicture()}),m(14,"Tirar foto"),s()()()),i&2&&(u(9),f("src",l.imageUrl),u(2),f("ngIf",l.photo==!0))},dependencies:[V,L,S,j,F,Q,A,M,N,R,B,z,W,H]});let c=o;return c})();export{be as ImagePage};