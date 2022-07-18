(function(){"use strict";var e={6820:function(e,t,n){var r=n(6369),o=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},i=[],u={name:"App"},a=u,c=n(1001),s=(0,c.Z)(a,o,i,!1,null,"ba0442ec",null),f=s.exports,l=n(1120),d=n(4239),p=(n(3434),n(6735),n(4319)),h=(n(6791),n(4269)),m=(n(446),n(8186)),Z=(n(2763),n(5094)),b=(n(4889),n(5705)),v=(n(7322),n(6631)),g=(n(6562),n(4159)),P=(n(4825),n(7165)),y=(n(4408),n(4639)),w=(n(8146),n(8848)),O=(n(9061),n(2075)),k=(n(3089),n(4398)),S=(n(7505),n(7061)),j=(n(1049),n(140)),C=(n(8984),n(797)),E=(n(7938),n(2628)),T=(n(6871),n(1765)),_=(n(9571),n(4958)),A=(n(2680),n(8889)),L=(n(5825),n(9858)),N=(n(109),n(6142)),x=(n(3429),n(7722)),I=(n(836),n(6811)),F=(n(319),n(3481));r.ZP.use(F.Z),r.ZP.use(I.Z),r.ZP.use(x.Z),r.ZP.use(N.Z),r.ZP.use(L.Z),r.ZP.use(A.Z),r.ZP.use(_.Z),r.ZP.use(T.Z),r.ZP.use(E.Z),r.ZP.use(C.Z),r.ZP.use(j.Z),r.ZP.use(S.Z),r.ZP.use(k.Z),r.ZP.use(O.Z),r.ZP.use(w.Z),r.ZP.use(y.Z),r.ZP.use(P.Z),r.ZP.use(g.Z),r.ZP.use(v.Z),r.ZP.use(b.Z),r.ZP.use(Z.Z),r.ZP.use(m.Z),r.ZP.use(h.Z),r.ZP.use(p.Z);n(9743);r.ZP.config.productionTip=!1,new r.ZP({router:l.Z,store:d.Z,render:e=>e(f)}).$mount("#app")},1120:function(e,t,n){var r=n(6369),o=n(2631),i=n(4239);const u=o.Z.prototype.push;o.Z.prototype.push=function(e,t,n){return t||n?u.call(this,e,t,n):u.call(this,e).catch((e=>e))},r.ZP.use(o.Z);const a=[{path:"/",redirect:"/home",component:()=>n.e(66).then(n.bind(n,4066)),children:[{path:"home",component:()=>Promise.all([n.e(471),n.e(889)]).then(n.bind(n,3889))},{path:"qa",component:()=>n.e(634).then(n.bind(n,8634))},{path:"video",component:()=>n.e(910).then(n.bind(n,4910))},{path:"my",component:()=>Promise.all([n.e(471),n.e(156)]).then(n.bind(n,5156))}]},{path:"/login",component:()=>Promise.all([n.e(471),n.e(298)]).then(n.bind(n,7298))},{path:"/user/collect",component:()=>n.e(237).then(n.bind(n,2237)),meta:{needLogin:!0}},{path:"/user/history",component:()=>n.e(661).then(n.bind(n,5661)),meta:{needLogin:!0}},{path:"/search",component:()=>Promise.all([n.e(471),n.e(224)]).then(n.bind(n,5224))},{path:"/article/:id",component:()=>Promise.all([n.e(471),n.e(60)]).then(n.bind(n,4060))},{path:"/user/edit",component:()=>Promise.all([n.e(471),n.e(563)]).then(n.bind(n,3563)),meta:{needLogin:!0}}],c=new o.Z({routes:a});c.beforeEach(((e,t,n)=>{e.meta.needLogin?i.Z.getters.token?n():n("/login?url="+e.path):n()})),t["Z"]=c},4239:function(e,t,n){var r=n(6369),o=n(3822),i=n(7247);r.ZP.use(o.ZP);const u="TOUTIAO_USER",a=new o.ZP.Store({state:{user:(0,i.rV)(u)||{}},getters:{token:e=>e.user.token},mutations:{setUser(e,t){e.user=t,(0,i.LS)(u,t)}},actions:{},modules:{}});t["Z"]=a},9743:function(e,t,n){var r=n(5743),o=n.n(r),i=n(6369),u=(n(8212),n(893)),a=n.n(u);o().locale("zh-cn"),o().extend(a()),i.ZP.filter("relativeTime",(e=>o()().to(o()(e)))),t["Z"]=o()},7247:function(e,t,n){n.d(t,{LS:function(){return r},rV:function(){return o}});const r=(e,t)=>"object"===typeof t?localStorage.setItem(e,JSON.stringify(t)):localStorage.setItem(e,t),o=e=>{const t=localStorage.getItem(e);try{return JSON.parse(t)}catch(n){return t}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.m=e,function(){var e=[];n.O=function(t,r,o,i){if(!r){var u=1/0;for(f=0;f<e.length;f++){r=e[f][0],o=e[f][1],i=e[f][2];for(var a=!0,c=0;c<r.length;c++)(!1&i||u>=i)&&Object.keys(n.O).every((function(e){return n.O[e](r[c])}))?r.splice(c--,1):(a=!1,i<u&&(u=i));if(a){e.splice(f--,1);var s=o();void 0!==s&&(t=s)}}return t}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[r,o,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,r){return n.f[r](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/"+e+"."+{60:"f957bffd",66:"62e2b7cf",156:"0d8f74ea",224:"0e371afb",237:"d222114b",298:"35b809a2",471:"42aa7e51",563:"b08145e8",634:"62c6a018",661:"8fa6b00a",889:"0be497a9",910:"3ef58582"}[e]+".js"}}(),function(){n.miniCssF=function(e){return"css/"+e+"."+{60:"4b587739",156:"6a6240ed",224:"73c3b39a",298:"503d36b3",563:"fc7d9a49",889:"a9596609"}[e]+".css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="toutiao-demo:";n.l=function(r,o,i,u){if(e[r])e[r].push(o);else{var a,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),f=0;f<s.length;f++){var l=s[f];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+i){a=l;break}}a||(c=!0,a=document.createElement("script"),a.charset="utf-8",a.timeout=120,n.nc&&a.setAttribute("nonce",n.nc),a.setAttribute("data-webpack",t+i),a.src=r),e[r]=[o];var d=function(t,n){a.onerror=a.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p=""}(),function(){var e=function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)n();else{var u=i&&("load"===i.type?"missing":i.type),a=i&&i.target&&i.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=u,c.request=a,o.parentNode.removeChild(o),r(c)}};return o.onerror=o.onload=i,o.href=t,document.head.appendChild(o),o},t=function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=n[r],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var u=document.getElementsByTagName("style");for(r=0;r<u.length;r++){o=u[r],i=o.getAttribute("data-href");if(i===e||i===t)return o}},r=function(r){return new Promise((function(o,i){var u=n.miniCssF(r),a=n.p+u;if(t(u,a))return o();e(r,a,o,i)}))},o={143:0};n.f.miniCss=function(e,t){var n={60:1,156:1,224:1,298:1,563:1,889:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=r(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,r){var o=n.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else{var i=new Promise((function(n,r){o=e[t]=[n,r]}));r.push(o[2]=i);var u=n.p+n.u(t),a=new Error,c=function(r){if(n.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=r&&("load"===r.type?"missing":r.type),u=r&&r.target&&r.target.src;a.message="Loading chunk "+t+" failed.\n("+i+": "+u+")",a.name="ChunkLoadError",a.type=i,a.request=u,o[1](a)}};n.l(u,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,u=r[0],a=r[1],c=r[2],s=0;if(u.some((function(t){return 0!==e[t]}))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var f=c(n)}for(t&&t(r);s<u.length;s++)i=u[s],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(f)},r=self["webpackChunktoutiao_demo"]=self["webpackChunktoutiao_demo"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(6820)}));r=n.O(r)})();