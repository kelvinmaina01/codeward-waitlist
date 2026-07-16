var Ar=Object.defineProperty;var Nt=e=>{throw TypeError(e)};var Cr=(e,t,r)=>t in e?Ar(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var g=(e,t,r)=>Cr(e,typeof t!="symbol"?t+"":t,r),ft=(e,t,r)=>t.has(e)||Nt("Cannot "+r);var l=(e,t,r)=>(ft(e,t,"read from private field"),r?r.call(e):t.get(e)),m=(e,t,r)=>t.has(e)?Nt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(ft(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),b=(e,t,r)=>(ft(e,t,"access private method"),r);var Mt=(e,t,r,s)=>({set _(n){f(e,t,n,r)},get _(){return l(e,t,s)}});import{createPool as Xt}from"@vercel/postgres";import{Http2ServerRequest as Ue,constants as Or}from"http2";import{Readable as It}from"stream";import Tr from"crypto";var Ut=(e,t,r)=>(s,n)=>{let a=-1;return i(0);async function i(o){if(o<=a)throw new Error("next() called multiple times");a=o;let c,d=!1,p;if(e[o]?(p=e[o][0][0],s.req.routeIndex=o):p=o===e.length&&n||void 0,p)try{c=await p(s,()=>i(o+1))}catch(h){if(h instanceof Error&&t)s.error=h,c=await t(h,s),d=!0;else throw h}else s.finalized===!1&&r&&(c=await r(s));return c&&(s.finalized===!1||d)&&(s.res=c),s}},Pr=Symbol(),Lr=(e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,s=>s.toLowerCase())}}).formData(),xt=e=>"headers"in e,_r=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,a=(xt(e)?e.headers:e.raw.headers).get("Content-Type"),i=a==null?void 0:a.split(";")[0].trim().toLowerCase();return i==="multipart/form-data"||i==="application/x-www-form-urlencoded"?$r(e,{all:r,dot:s}):{}};async function $r(e,t){const r=xt(e)?e.headers:e.raw.headers,s=await e.arrayBuffer(),n=Lr(s,r.get("Content-Type")||"");xt(e)||(e.bodyCache.formData=n);const a=await n;return a?jr(a,t):{}}function jr(e,t){const r=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?Dr(r,n,s):r[n]=s}),t.dot&&Object.entries(r).forEach(([s,n])=>{s.includes(".")&&(Hr(r,s,n),delete r[s])}),r}var Dr=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Hr=(e,t,r)=>{if(/(?:^|\.)__proto__\./.test(t))return;let s=e;const n=t.split(".");n.forEach((a,i)=>{i===n.length-1?s[a]=r:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},Qt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Nr=e=>{const{groups:t,path:r}=Mr(e),s=Qt(r);return Ir(s,t)},Mr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const n=`@${s}`;return t.push([n,r]),n}),{groups:t,path:e}},Ir=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[r][1]);break}}return e},Ze={},Ur=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return Ze[s]||(r[2]?Ze[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Ze[s]=[e,r[1],!0]),Ze[s]}return null},dt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},qr=e=>dt(e,decodeURI),Zt=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const a=t.indexOf("?",s),i=t.indexOf("#",s),o=a===-1?i===-1?void 0:i:i===-1?a:Math.min(a,i),c=t.slice(r,o);return qr(c.includes("%25")?c.replace(/%25/g,"%2525"):c)}else if(n===63||n===35)break}return t.slice(r,s)},Br=e=>{const t=Zt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ae=(e,t,...r)=>(r.length&&(t=ae(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),er=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&s===""?r.push("/"):r.push(s);const a=n.replace("?","");s+="/"+a,r.push(s)}else s+="/"+n}),r.filter((n,a,i)=>i.indexOf(n)===a)},ut=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?dt(e,At):e):e,tr=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const o=e.charCodeAt(i+t.length+1);if(o===61){const c=i+t.length+2,d=e.indexOf("&",c);return ut(e.slice(c,d===-1?void 0:d))}else if(o==38||isNaN(o))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let o=e.indexOf("=",a);o>i&&i!==-1&&(o=-1);let c=e.slice(a+1,o===-1?i===-1?void 0:i:o);if(s&&(c=ut(c)),a=i,c==="")continue;let d;o===-1?d="":(d=e.slice(o+1,i===-1?void 0:i),s&&(d=ut(d))),r?(n[c]&&Array.isArray(n[c])||(n[c]=[]),n[c].push(d)):n[c]??(n[c]=d)}return t?n[t]:n},Fr=tr,zr=(e,t)=>tr(e,t,!0),At=decodeURIComponent,qt=e=>dt(e,At),ke,$,G,rr,sr,Et,q,Wt,Wr=(Wt=class{constructor(e,t="/",r=[[]]){m(this,G);g(this,"raw");m(this,ke);m(this,$);g(this,"routeIndex",0);g(this,"path");g(this,"bodyCache",{});m(this,q,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(a=>(n==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,$,r),f(this,ke,{})}param(e){return e?b(this,G,rr).call(this,e):b(this,G,sr).call(this)}query(e){return Fr(this.url,e)}queries(e){return zr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){return _r(this,e)}json(){return l(this,q).call(this,"text").then(e=>JSON.parse(e))}text(){return l(this,q).call(this,"text")}arrayBuffer(){return l(this,q).call(this,"arrayBuffer")}bytes(){return l(this,q).call(this,"arrayBuffer").then(e=>new Uint8Array(e))}blob(){return l(this,q).call(this,"blob")}formData(){return l(this,q).call(this,"formData")}addValidatedData(e,t){l(this,ke)[e]=t}valid(e){return l(this,ke)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Pr](){return l(this,$)}get matchedRoutes(){return l(this,$)[0].map(([[,e]])=>e)}get routePath(){return l(this,$)[0].map(([[,e]])=>e)[this.routeIndex].path}},ke=new WeakMap,$=new WeakMap,G=new WeakSet,rr=function(e){const t=l(this,$)[0][this.routeIndex][1][e],r=b(this,G,Et).call(this,t);return r&&/\%/.test(r)?qt(r):r},sr=function(){const e={},t=Object.keys(l(this,$)[0][this.routeIndex][1]);for(const r of t){const s=b(this,G,Et).call(this,l(this,$)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?qt(s):s)}return e},Et=function(e){return l(this,$)[1]?l(this,$)[1][e]:e},q=new WeakMap,Wt),Gr={Stringify:1},nr=async(e,t,r,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(n?n[0]+=e:n=[e],Promise.all(a.map(o=>o({phase:t,buffer:n,context:s}))).then(o=>Promise.all(o.filter(Boolean).map(c=>nr(c,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},Kr="text/plain; charset=UTF-8",gt=(e,t)=>({"Content-Type":e,...t}),Ne=(e,t)=>new Response(e,t),ze,We,B,Ae,F,O,Ge,Ce,Oe,ce,Ke,Ye,X,we,Gt,Yr=(Gt=class{constructor(e,t){m(this,X);m(this,ze);m(this,We);g(this,"env",{});m(this,B);g(this,"finalized",!1);g(this,"error");m(this,Ae);m(this,F);m(this,O);m(this,Ge);m(this,Ce);m(this,Oe);m(this,ce);m(this,Ke);m(this,Ye);g(this,"render",(...e)=>(l(this,Ce)??f(this,Ce,t=>this.html(t)),l(this,Ce).call(this,...e)));g(this,"setLayout",e=>f(this,Ge,e));g(this,"getLayout",()=>l(this,Ge));g(this,"setRenderer",e=>{f(this,Ce,e)});g(this,"header",(e,t,r)=>{this.finalized&&f(this,O,Ne(l(this,O).body,l(this,O)));const s=l(this,O)?l(this,O).headers:l(this,ce)??f(this,ce,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});g(this,"status",e=>{f(this,Ae,e)});g(this,"set",(e,t)=>{l(this,B)??f(this,B,new Map),l(this,B).set(e,t)});g(this,"get",e=>l(this,B)?l(this,B).get(e):void 0);g(this,"newResponse",(...e)=>b(this,X,we).call(this,...e));g(this,"body",(e,t,r)=>b(this,X,we).call(this,e,t,r));g(this,"text",(e,t,r)=>!l(this,ce)&&!l(this,Ae)&&!t&&!r&&!this.finalized?new Response(e):b(this,X,we).call(this,e,t,gt(Kr,r)));g(this,"json",(e,t,r)=>b(this,X,we).call(this,JSON.stringify(e),t,gt("application/json",r)));g(this,"html",(e,t,r)=>{const s=n=>b(this,X,we).call(this,n,t,gt("text/html; charset=UTF-8",r));return typeof e=="object"?nr(e,Gr.Stringify,!1,{}).then(s):s(e)});g(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});g(this,"notFound",()=>(l(this,Oe)??f(this,Oe,()=>Ne()),l(this,Oe).call(this,this)));f(this,ze,e),t&&(f(this,F,t.executionCtx),this.env=t.env,f(this,Oe,t.notFoundHandler),f(this,Ye,t.path),f(this,Ke,t.matchResult))}get req(){return l(this,We)??f(this,We,new Wr(l(this,ze),l(this,Ye),l(this,Ke))),l(this,We)}get event(){if(l(this,F)&&"respondWith"in l(this,F))return l(this,F);throw Error("This context has no FetchEvent")}get executionCtx(){if(l(this,F))return l(this,F);throw Error("This context has no ExecutionContext")}get res(){return l(this,O)||f(this,O,Ne(null,{headers:l(this,ce)??f(this,ce,new Headers)}))}set res(e){if(l(this,O)&&e){e=Ne(e.body,e);for(const[t,r]of l(this,O).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=l(this,O).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}f(this,O,e),this.finalized=!0}get var(){return l(this,B)?Object.fromEntries(l(this,B)):{}}},ze=new WeakMap,We=new WeakMap,B=new WeakMap,Ae=new WeakMap,F=new WeakMap,O=new WeakMap,Ge=new WeakMap,Ce=new WeakMap,Oe=new WeakMap,ce=new WeakMap,Ke=new WeakMap,Ye=new WeakMap,X=new WeakSet,we=function(e,t,r){const s=l(this,O)?new Headers(l(this,O).headers):l(this,ce)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,o]of a)i.toLowerCase()==="set-cookie"?s.append(i,o):s.set(i,o)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const o of i)s.append(a,o)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??l(this,Ae);return Ne(e,{status:n,headers:s})},Gt),R="ALL",Vr="all",Jr=["get","post","put","delete","options","patch"],ar="Can not add a route since the matcher is already built.",ir=class extends Error{},Xr="__COMPOSED_HANDLER",Qr=e=>e.text("404 Not Found",404),Bt=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},j,S,or,D,ie,et,tt,Te,Zr=(Te=class{constructor(t={}){m(this,S);g(this,"get");g(this,"post");g(this,"put");g(this,"delete");g(this,"options");g(this,"patch");g(this,"all");g(this,"on");g(this,"use");g(this,"router");g(this,"getPath");g(this,"_basePath","/");m(this,j,"/");g(this,"routes",[]);m(this,D,Qr);g(this,"errorHandler",Bt);g(this,"onError",t=>(this.errorHandler=t,this));g(this,"notFound",t=>(f(this,D,t),this));g(this,"fetch",(t,...r)=>b(this,S,tt).call(this,t,r[1],r[0],t.method));g(this,"request",(t,r,s,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ae("/",t)}`,r),s,n)));g(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(b(this,S,tt).call(this,t.request,t,void 0,t.request.method))})});[...Jr,Vr].forEach(a=>{this[a]=(i,...o)=>(typeof i=="string"?f(this,j,i):b(this,S,ie).call(this,a,l(this,j),i),o.forEach(c=>{b(this,S,ie).call(this,a,l(this,j),c)}),this)}),this.on=(a,i,...o)=>{for(const c of[i].flat()){f(this,j,c);for(const d of[a].flat())o.map(p=>{b(this,S,ie).call(this,d.toUpperCase(),l(this,j),p)})}return this},this.use=(a,...i)=>(typeof a=="string"?f(this,j,a):(f(this,j,"*"),i.unshift(a)),i.forEach(o=>{b(this,S,ie).call(this,R,l(this,j),o)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??Zt:Br}route(t,r){const s=this.basePath(t);return r.routes.map(n=>{var i;let a;r.errorHandler===Bt?a=n.handler:(a=async(o,c)=>(await Ut([],r.errorHandler)(o,()=>n.handler(o,c))).res,a[Xr]=n.handler),b(i=s,S,ie).call(i,n.method,n.path,a,n.basePath)}),this}basePath(t){const r=b(this,S,or).call(this);return r._basePath=ae(this._basePath,t),r}mount(t,r,s){let n,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?n=c=>c:n=s.replaceRequest));const i=a?c=>{const d=a(c);return Array.isArray(d)?d:[d]}:c=>{let d;try{d=c.executionCtx}catch{}return[c.env,d]};n||(n=(()=>{const c=ae(this._basePath,t),d=c==="/"?0:c.length;return p=>{const h=new URL(p.url);return h.pathname=this.getPath(p).slice(d)||"/",new Request(h,p)}})());const o=async(c,d)=>{const p=await r(n(c.req.raw),...i(c));if(p)return p;await d()};return b(this,S,ie).call(this,R,ae(t,"*"),o),this}},j=new WeakMap,S=new WeakSet,or=function(){const t=new Te({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,D,l(this,D)),t.routes=this.routes,t},D=new WeakMap,ie=function(t,r,s,n){t=t.toUpperCase(),r=ae(this._basePath,r);const a={basePath:n!==void 0?ae(this._basePath,n):this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,a]),this.routes.push(a)},et=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},tt=function(t,r,s,n){if(n==="HEAD")return(async()=>new Response(null,await b(this,S,tt).call(this,t,r,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(n,a),o=new Yr(t,{path:a,matchResult:i,env:s,executionCtx:r,notFoundHandler:l(this,D)});if(i[0].length===1){let d;try{d=i[0][0][0][0](o,async()=>{o.res=await l(this,D).call(this,o)})}catch(p){return b(this,S,et).call(this,p,o)}return d instanceof Promise?d.then(p=>p||(o.finalized?o.res:l(this,D).call(this,o))).catch(p=>b(this,S,et).call(this,p,o)):d??l(this,D).call(this,o)}const c=Ut(i[0],this.errorHandler,l(this,D));return(async()=>{try{const d=await c(o);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return b(this,S,et).call(this,d,o)}})()},Te),lr=[];function es(e,t){const r=this.buildAllMatchers(),s=((n,a)=>{const i=r[n]||r[R],o=i[2][a];if(o)return o;const c=a.match(i[0]);if(!c)return[[],lr];const d=c.indexOf("",1);return[i[1][d],c]});return this.match=s,s(e,t)}var it="[^/]+",qe=".*",Be="(?:|/.*)",xe=Symbol(),ts=new Set(".\\+*[^]$()");function rs(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===qe||e===Be?1:t===qe||t===Be?-1:e===it?1:t===it?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var de,pe,H,ue,ss=(ue=class{constructor(){m(this,de);m(this,pe);m(this,H,Object.create(null))}insert(t,r,s,n,a){if(t.length===0){if(l(this,de)!==void 0)throw xe;if(a)return;f(this,de,r);return}const[i,...o]=t,c=i==="*"?o.length===0?["","",qe]:["","",it]:i==="/*"?["","",Be]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(c){const p=c[1];let h=c[2]||it;if(p&&c[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw xe;if(d=l(this,H)[h],!d){if(Object.keys(l(this,H)).some(u=>u!==qe&&u!==Be))throw xe;if(a)return;d=l(this,H)[h]=new ue,p!==""&&f(d,pe,n.varIndex++)}!a&&p!==""&&s.push([p,l(d,pe)])}else if(d=l(this,H)[i],!d){if(Object.keys(l(this,H)).some(p=>p.length>1&&p!==qe&&p!==Be))throw xe;if(a)return;d=l(this,H)[i]=new ue}d.insert(o,r,s,n,a)}buildRegExpStr(){const r=Object.keys(l(this,H)).sort(rs).map(s=>{const n=l(this,H)[s];return(typeof l(n,pe)=="number"?`(${s})@${l(n,pe)}`:ts.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof l(this,de)=="number"&&r.unshift(`#${l(this,de)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},de=new WeakMap,pe=new WeakMap,H=new WeakMap,ue),lt,Ve,Kt,ns=(Kt=class{constructor(){m(this,lt,{varIndex:0});m(this,Ve,new ss)}insert(e,t,r){const s=[],n=[];for(let i=0;;){let o=!1;if(e=e.replace(/\{[^}]+\}/g,c=>{const d=`@\\${i}`;return n[i]=[d,c],i++,o=!0,d}),!o)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=n.length-1;i>=0;i--){const[o]=n[i];for(let c=a.length-1;c>=0;c--)if(a[c].indexOf(o)!==-1){a[c]=a[c].replace(o,n[i][1]);break}}return l(this,Ve).insert(a,t,s,l(this,lt),r),s}buildRegExp(){let e=l(this,Ve).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},lt=new WeakMap,Ve=new WeakMap,Kt),as=[/^$/,[],Object.create(null)],rt=Object.create(null);function cr(e){return rt[e]??(rt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function is(){rt=Object.create(null)}function os(e){var d;const t=new ns,r=[];if(e.length===0)return as;const s=e.map(p=>[!/\*|\/:/.test(p[0]),...p]).sort(([p,h],[u,w])=>p?1:u?-1:h.length-w.length),n=Object.create(null);for(let p=0,h=-1,u=s.length;p<u;p++){const[w,v,k]=s[p];w?n[v]=[k.map(([T])=>[T,Object.create(null)]),lr]:h++;let E;try{E=t.insert(v,h,w)}catch(T){throw T===xe?new ir(v):T}w||(r[h]=k.map(([T,x])=>{const N=Object.create(null);for(x-=1;x>=0;x--){const[M,De]=E[x];N[M]=De}return[T,N]}))}const[a,i,o]=t.buildRegExp();for(let p=0,h=r.length;p<h;p++)for(let u=0,w=r[p].length;u<w;u++){const v=(d=r[p][u])==null?void 0:d[1];if(!v)continue;const k=Object.keys(v);for(let E=0,T=k.length;E<T;E++)v[k[E]]=o[v[k[E]]]}const c=[];for(const p in i)c[p]=r[i[p]];return[a,c,n]}function be(e,t){if(e){for(const r of Object.keys(e).sort((s,n)=>n.length-s.length))if(cr(r).test(t))return[...e[r]]}}var Q,Z,ct,dr,Yt,ls=(Yt=class{constructor(){m(this,ct);g(this,"name","RegExpRouter");m(this,Q);m(this,Z);g(this,"match",es);f(this,Q,{[R]:Object.create(null)}),f(this,Z,{[R]:Object.create(null)})}add(e,t,r){var o;const s=l(this,Q),n=l(this,Z);if(!s||!n)throw new Error(ar);s[e]||[s,n].forEach(c=>{c[e]=Object.create(null),Object.keys(c[R]).forEach(d=>{c[e][d]=[...c[R][d]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const c=cr(t);e===R?Object.keys(s).forEach(d=>{var p;(p=s[d])[t]||(p[t]=be(s[d],t)||be(s[R],t)||[])}):(o=s[e])[t]||(o[t]=be(s[e],t)||be(s[R],t)||[]),Object.keys(s).forEach(d=>{(e===R||e===d)&&Object.keys(s[d]).forEach(p=>{c.test(p)&&s[d][p].push([r,a])})}),Object.keys(n).forEach(d=>{(e===R||e===d)&&Object.keys(n[d]).forEach(p=>c.test(p)&&n[d][p].push([r,a]))});return}const i=er(t)||[t];for(let c=0,d=i.length;c<d;c++){const p=i[c];Object.keys(n).forEach(h=>{var u;(e===R||e===h)&&((u=n[h])[p]||(u[p]=[...be(s[h],p)||be(s[R],p)||[]]),n[h][p].push([r,a-d+c+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(l(this,Z)).concat(Object.keys(l(this,Q))).forEach(t=>{e[t]||(e[t]=b(this,ct,dr).call(this,t))}),f(this,Q,f(this,Z,void 0)),is(),e}},Q=new WeakMap,Z=new WeakMap,ct=new WeakSet,dr=function(e){const t=[];let r=e===R;return[l(this,Q),l(this,Z)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==R&&t.push(...Object.keys(s[R]).map(a=>[a,s[R][a]]))}),r?os(t):null},Yt),ee,z,Vt,cs=(Vt=class{constructor(e){g(this,"name","SmartRouter");m(this,ee,[]);m(this,z,[]);f(this,ee,e.routers)}add(e,t,r){if(!l(this,z))throw new Error(ar);l(this,z).push([e,t,r])}match(e,t){if(!l(this,z))throw new Error("Fatal error");const r=l(this,ee),s=l(this,z),n=r.length;let a=0,i;for(;a<n;a++){const o=r[a];try{for(let c=0,d=s.length;c<d;c++)o.add(...s[c]);i=o.match(e,t)}catch(c){if(c instanceof ir)continue;throw c}this.match=o.match.bind(o),f(this,ee,[o]),f(this,z,void 0);break}if(a===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(l(this,z)||l(this,ee).length!==1)throw new Error("No active router has been determined yet.");return l(this,ee)[0]}},ee=new WeakMap,z=new WeakMap,Vt),Me=Object.create(null),ds=e=>{for(const t in e)return!0;return!1},te,A,he,Pe,C,U,V,Le,ps=(Le=class{constructor(t,r,s){m(this,U);m(this,te);m(this,A);m(this,he);m(this,Pe,0);m(this,C,Me);if(f(this,A,s||Object.create(null)),f(this,te,[]),t&&r){const n=Object.create(null);n[t]={handler:r,possibleKeys:[],score:0},f(this,te,[n])}f(this,he,[])}insert(t,r,s){f(this,Pe,++Mt(this,Pe)._);let n=this;const a=Nr(r),i=[];for(let o=0,c=a.length;o<c;o++){const d=a[o],p=a[o+1],h=Ur(d,p),u=Array.isArray(h)?h[0]:d;if(u in l(n,A)){n=l(n,A)[u],h&&i.push(h[1]);continue}l(n,A)[u]=new Le,h&&(l(n,he).push(h),i.push(h[1])),n=l(n,A)[u]}return l(n,te).push({[t]:{handler:s,possibleKeys:i.filter((o,c,d)=>d.indexOf(o)===c),score:l(this,Pe)}}),n}search(t,r){var p;const s=[];f(this,C,Me);let a=[this];const i=Qt(r),o=[],c=i.length;let d=null;for(let h=0;h<c;h++){const u=i[h],w=h===c-1,v=[];for(let E=0,T=a.length;E<T;E++){const x=a[E],N=l(x,A)[u];N&&(f(N,C,l(x,C)),w?(l(N,A)["*"]&&b(this,U,V).call(this,s,l(N,A)["*"],t,l(x,C)),b(this,U,V).call(this,s,N,t,l(x,C))):v.push(N));for(let M=0,De=l(x,he).length;M<De;M++){const me=l(x,he)[M],_=l(x,C)===Me?{}:{...l(x,C)};if(me==="*"){const K=l(x,A)["*"];K&&(b(this,U,V).call(this,s,K,t,l(x,C)),f(K,C,_),v.push(K));continue}const[pt,Qe,se]=me;if(!u&&!(se instanceof RegExp))continue;const L=l(x,A)[pt];if(se instanceof RegExp){if(d===null){d=new Array(c);let Y=r[0]==="/"?1:0;for(let ne=0;ne<c;ne++)d[ne]=Y,Y+=i[ne].length+1}const K=r.substring(d[h]),ve=se.exec(K);if(ve){if(_[Qe]=ve[0],b(this,U,V).call(this,s,L,t,l(x,C),_),ve[0].length===K.length&&l(L,A)["*"]&&b(this,U,V).call(this,s,l(L,A)["*"],t,l(x,C),_),ds(l(L,A))){f(L,C,_);const Y=((p=ve[0].match(/\//))==null?void 0:p.length)??0;(o[Y]||(o[Y]=[])).push(L)}continue}}(se===!0||se.test(u))&&(_[Qe]=u,w?(b(this,U,V).call(this,s,L,t,_,l(x,C)),l(L,A)["*"]&&b(this,U,V).call(this,s,l(L,A)["*"],t,_,l(x,C))):(f(L,C,_),v.push(L)))}}const k=o.shift();a=k?v.concat(k):v}return s.length>1&&s.sort((h,u)=>h.score-u.score),[s.map(({handler:h,params:u})=>[h,u])]}},te=new WeakMap,A=new WeakMap,he=new WeakMap,Pe=new WeakMap,C=new WeakMap,U=new WeakSet,V=function(t,r,s,n,a){for(let i=0,o=l(r,te).length;i<o;i++){const c=l(r,te)[i],d=c[s]||c[R],p={};if(d!==void 0&&(d.params=Object.create(null),t.push(d),n!==Me||a&&a!==Me))for(let h=0,u=d.possibleKeys.length;h<u;h++){const w=d.possibleKeys[h],v=p[d.score];d.params[w]=a!=null&&a[w]&&!v?a[w]:n[w]??(a==null?void 0:a[w]),p[d.score]=!0}}},Le),fe,Jt,hs=(Jt=class{constructor(){g(this,"name","TrieRouter");m(this,fe);f(this,fe,new ps)}add(e,t,r){const s=er(t);if(s){for(let n=0,a=s.length;n<a;n++)l(this,fe).insert(e,s[n],r);return}l(this,fe).insert(e,t,r)}match(e,t){return l(this,fe).search(e,t)}},fe=new WeakMap,Jt),Ct=class extends Zr{constructor(e={}){super(e),this.router=e.router??new cs({routers:[new ls,new hs]})}},pr=/^[\w!#$%&'*.^`|~+-]+$/,fs=/^[ !#-:<-[\]-~]*$/,Ft=e=>{let t=0,r=e.length;for(;t<r;){const s=e.charCodeAt(t);if(s!==32&&s!==9)break;t++}for(;r>t;){const s=e.charCodeAt(r-1);if(s!==32&&s!==9)break;r--}return t===0&&r===e.length?e:e.slice(t,r)},us=(e,t)=>{if(t&&e.indexOf(t)===-1)return{};const r=e.split(";"),s=Object.create(null);for(const n of r){const a=n.indexOf("=");if(a===-1)continue;const i=Ft(n.substring(0,a));if(t&&t!==i||!pr.test(i)||i in s)continue;let o=Ft(n.substring(a+1));if(o.startsWith('"')&&o.endsWith('"')&&(o=o.slice(1,-1)),fs.test(o)&&(s[i]=o.indexOf("%")!==-1?dt(o,At):o,t))break}return s},gs=(e,t,r={})=>{if(!pr.test(e))throw new Error("Invalid cookie name");let s=`${e}=${t}`;if(e.startsWith("__Secure-")&&!r.secure)throw new Error("__Secure- Cookie must have Secure attributes");if(e.startsWith("__Host-")){if(!r.secure)throw new Error("__Host- Cookie must have Secure attributes");if(r.path!=="/")throw new Error('__Host- Cookie must have Path attributes with "/"');if(r.domain)throw new Error("__Host- Cookie must not have Domain attributes")}for(const n of["domain","path","sameSite","priority"])if(r[n]&&/[;\r\n]/.test(r[n]))throw new Error(`${n} must not contain ";", "\\r", or "\\n"`);if(r&&typeof r.maxAge=="number"&&r.maxAge>=0){if(r.maxAge>3456e4)throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");s+=`; Max-Age=${r.maxAge|0}`}if(r.domain&&r.prefix!=="host"&&(s+=`; Domain=${r.domain}`),r.path&&(s+=`; Path=${r.path}`),r.expires){if(r.expires.getTime()-Date.now()>3456e7)throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");s+=`; Expires=${r.expires.toUTCString()}`}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.sameSite&&(s+=`; SameSite=${r.sameSite.charAt(0).toUpperCase()+r.sameSite.slice(1)}`),r.priority&&(s+=`; Priority=${r.priority.charAt(0).toUpperCase()+r.priority.slice(1)}`),r.partitioned){if(!r.secure)throw new Error("Partitioned Cookie must have Secure attributes");s+="; Partitioned"}return s},mt=(e,t,r)=>(t=encodeURIComponent(t),gs(e,t,r)),hr=(e,t,r)=>{const s=e.req.raw.headers.get("Cookie");{if(!s)return;let n=t;return r==="secure"?n="__Secure-"+t:r==="host"&&(n="__Host-"+t),us(s,n)[n]}},ms=(e,t,r)=>{let s;return(r==null?void 0:r.prefix)==="secure"?s=mt("__Secure-"+e,t,{path:"/",...r,secure:!0}):(r==null?void 0:r.prefix)==="host"?s=mt("__Host-"+e,t,{...r,path:"/",secure:!0,domain:void 0}):s=mt(e,t,{path:"/",...r}),s},fr=(e,t,r,s)=>{const n=ms(t,r,s);e.header("Set-Cookie",n,{append:!0})},vs=(e,t,r)=>{const s=hr(e,t,r==null?void 0:r.prefix);return fr(e,t,"",{...r,maxAge:0}),s};typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);let vt=null;function Ot(e){var t,r,s;if(!vt){const n=((t=e==null?void 0:e.env)==null?void 0:t.POSTGRES_URL)||((r=e==null?void 0:e.env)==null?void 0:r.DATABASE_POSTGRES_URL)||((s=e==null?void 0:e.env)==null?void 0:s.DATABASE_URL)||(typeof process<"u"&&process.env?process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL:void 0);vt=Xt({connectionString:n})}return vt}const re=new Ct;re.use("*",async(e,t)=>{const r=new URL(e.req.url).pathname;if(r==="/admin/login"||r.startsWith("/static/"))return t();const s=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return hr(e,"codeward_admin_session")===s?t():e.redirect("/admin/login")});re.get("/login",e=>{const t=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Admin Login — Codeward</title>
<link rel="icon" type="image/gif" href="/static/images/logo.gif"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400..700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/admin.css"/>
<style>
  body {
    background: #000;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
  }
  .login-card {
    background: #09090b;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 48px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }
  .login-header {
    text-align: center;
    margin-bottom: 32px;
  }
  .login-header img {
    width: 48px;
    border-radius: 50%;
    margin-bottom: 16px;
  }
  .login-header h1 {
    font-size: 24px;
    margin: 0;
    font-weight: 600;
  }
  .field {
    margin-bottom: 20px;
  }
  .field label {
    display: block;
    margin-bottom: 8px;
    color: #a1a1aa;
    font-size: 14px;
  }
  .field input {
    width: 100%;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 12px;
    padding: 12px 16px;
    color: #fff;
    font-size: 16px;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .field input:focus {
    outline: none;
    border-color: #22c55e;
  }
  .login-btn {
    width: 100%;
    background: #fff;
    color: #000;
    border: none;
    border-radius: 12px;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 8px;
  }
  .login-btn:hover {
    background: #f4f4f5;
  }
  .error-msg {
    color: #ef4444;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
    display: none;
  }
  .error-msg.visible {
    display: block;
  }
</style>
</head>
<body>
  <div class="login-card">
    <div class="login-header">
      <img src="/static/images/logo.gif" alt="Codeward" />
      <h1>Admin Login</h1>
    </div>
    <div class="error-msg ${e.req.query("error")?"visible":""}">Invalid username or password.</div>
    <form method="post" action="/admin/login">
      <div class="field">
        <label>Username</label>
        <input type="text" name="username" required autofocus />
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit" class="login-btn">Sign in</button>
    </form>
  </div>
</body>
</html>`;return e.html(t)});re.post("/login",async e=>{const t=await e.req.parseBody(),r=e.env.ADMIN_USERNAME||process.env.ADMIN_USERNAME||"kelvin.reallife8@gmail.com",s=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return t.username===r&&t.password===s?(fr(e,"codeward_admin_session",s,{path:"/admin",httpOnly:!0,secure:!0,maxAge:3600*24*7}),e.redirect("/admin")):e.redirect("/admin/login?error=1")});re.get("/logout",e=>(vs(e,"codeward_admin_session",{path:"/admin"}),e.redirect("/admin/login")));const st={"software-engineer":"Software Engineer","senior-engineer":"Senior / Staff Engineer","engineering-lead":"Engineering Lead / Manager","cto-vp":"CTO / VP of Engineering","devops-platform":"DevOps / Platform Engineer","security-engineer":"Security Engineer",freelancer:"Freelance Developer","open-source":"Open Source Contributor",student:"Student / Bootcamp",founder:"Founder / Indie Hacker",other:"Other"};function I(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ye(e){if(e==null)return"";const t=String(e);return/[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}re.get("/",async e=>{var Lt,_t,$t,jt,Dt,Ht;const{env:t}=e,r=new URL(e.req.url),s=(r.searchParams.get("q")||"").trim(),n=(r.searchParams.get("role")||"").trim(),a=Math.max(1,parseInt(r.searchParams.get("page")||"1",10)||1),i=25,o=r.searchParams.get("msg")||"";let c="";o==="retrigger_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; font-weight: 500; display: flex; align-items: center; gap: 8px;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> Email successfully resent!</div>':o==="retrigger_failed"&&(c='<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; font-weight: 500; display: flex; align-items: center; gap: 8px;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg> Failed to resend email. Please check the logs.</div>');let d="WHERE 1=1";const p=[];let h=1;if(s){d+=` AND (LOWER(name) LIKE $${h++} OR LOWER(email) LIKE $${h++} OR LOWER(company) LIKE $${h++})`;const y=`%${s.toLowerCase()}%`;p.push(y,y,y)}n&&(d+=` AND role = $${h++}`,p.push(n));const u=await Ot(e).connect(),w=await u.query(`SELECT COUNT(*) as cnt FROM waitlist_entries ${d}`,p),v=Number(((Lt=w.rows[0])==null?void 0:Lt.cnt)??0),k=Math.max(1,Math.ceil(v/i)),E=Math.min(a,k),T=(E-1)*i,x=[...p,i,T],M=(await u.query(`SELECT id, name, email, role, company, github, position, created_at, email_sent, linkedin_clicked
     FROM waitlist_entries ${d}
     ORDER BY created_at DESC
     LIMIT $${h++} OFFSET $${h++}`,x)).rows||[],De=await u.query("SELECT COUNT(*) as cnt FROM waitlist_entries"),me=Number(((_t=De.rows[0])==null?void 0:_t.cnt)??0),_=await u.query(`SELECT 
       SUM(CASE WHEN email_sent = 1 THEN 1 ELSE 0 END) as sent,
       SUM(CASE WHEN email_sent = 0 THEN 1 ELSE 0 END) as failed
     FROM waitlist_entries`),pt=Number((($t=_.rows[0])==null?void 0:$t.sent)??0),Qe=Number(((jt=_.rows[0])==null?void 0:jt.failed)??0),se=await u.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE"),L=Number(((Dt=se.rows[0])==null?void 0:Dt.cnt)??0),ve=(await u.query("SELECT role, COUNT(*) as cnt FROM waitlist_entries GROUP BY role ORDER BY cnt DESC")).rows,Y=await u.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE company IS NOT NULL AND company != ''"),ne=Number(((Ht=Y.rows[0])==null?void 0:Ht.cnt)??0),xr=Object.entries(st).map(([y,P])=>`<option value="${y}" ${n===y?"selected":""}>${I(P)}</option>`).join(""),Er=M.length?M.map(y=>{const P=new Date(y.created_at+"Z"),He=isNaN(P.getTime())?y.created_at:P.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})+" · "+P.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});return`
        <tr>
          <td class="pos-cell">#${616+y.position}</td>
          <td>
            <div class="name-cell">${I(y.name)}</div>
            <div class="email-cell">${I(y.email)}</div>
          </td>
          <td><span class="role-badge">${I(st[y.role]||y.role)}</span></td>
          <td>${y.company?I(y.company):'<span class="muted">—</span>'}</td>
          <td>${y.github?`<a href="${I(y.github)}" target="_blank" rel="noopener" class="github-link">${I(y.github.replace(/^https?:\/\/(www\.)?github\.com\//,"@"))}</a>`:'<span class="muted">—</span>'}</td>
          <td class="date-cell">${He}</td>
          <td>
            ${y.email_sent===1?'<span class="role-badge" style="background:#059669;color:#fff;">Sent</span>':`<div style="display:flex;gap:8px;align-items:center;">
                   <span class="role-badge" style="background:#dc2626;color:#fff;">Failed</span>
                   <form method="post" action="/admin/retrigger" style="margin:0;">
                     <input type="hidden" name="email" value="${I(y.email)}" />
                     <button type="submit" class="filter-btn" style="padding:2px 8px;font-size:11px;">Retrigger</button>
                   </form>
                 </div>`}
          </td>
          <td>
            ${y.linkedin_clicked===1?'<span class="role-badge" style="background:#0077b5;color:#fff;">Yes</span>':'<span class="role-badge" style="opacity:0.5;">No</span>'}
          </td>
        </tr>`}).join(""):'<tr><td colspan="7" class="empty-row">No waitlist entries match your filters.</td></tr>',Rr=(ve||[]).map(y=>{const P=Number(y.cnt),He=me?Math.round(P/me*100):0;return`
      <div class="role-bar-row">
        <div class="role-bar-label">${I(st[y.role]||y.role)}</div>
        <div class="role-bar-track"><div class="role-bar-fill" style="width:${He}%"></div></div>
        <div class="role-bar-count">${P}</div>
      </div>`}).join(""),ht=y=>{const P=new URLSearchParams;return s&&P.set("q",s),n&&P.set("role",n),P.set("page",String(E)),Object.entries(y).forEach(([He,kr])=>P.set(He,String(kr))),"?"+P.toString()},Sr=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Codeward Admin — Waitlist</title>
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/admin.css"/>
</head>
<body>
<div class="admin-page">

  <header class="admin-header">
    <div class="admin-brand">
      <span class="logo-text">code</span>
      <span class="w-shield">
        <svg viewBox="0 0 18 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="1" y="0" width="16" height="3" rx="1"/>
          <path d="M1 5 L5 5 L9 17 L13 5 L17 5 L17 21 L13 21 L13 11 L9 21 L5 11 L5 21 L1 21 Z"/>
        </svg>
      </span>
      <span class="logo-text">ard</span>
      <span class="admin-tag">admin</span>
    </div>
    <div style="display: flex; gap: 16px; align-items: center;">
      <a href="/" class="back-link">&larr; View public page</a>
      <a href="/admin/logout" class="back-link" style="color: #ef4444;">Logout</a>
    </div>
  </header>

  ${c}

  <section class="stats-row" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
    <div class="stat-card">
      <span class="stat-num">${me.toLocaleString()}</span>
      <span class="stat-label">total signups</span>
    </div>
    <div class="stat-card">
      <span class="stat-num accent">+${L.toLocaleString()}</span>
      <span class="stat-label">joined today</span>
    </div>
    <div class="stat-card">
      <span class="stat-num">${ne.toLocaleString()}</span>
      <span class="stat-label">with company listed</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#10b981;">${pt.toLocaleString()}</span>
      <span class="stat-label">emails sent</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#ef4444;">${Qe.toLocaleString()}</span>
      <span class="stat-label">emails failed</span>
    </div>
  </section>

  <section class="panel role-breakdown-panel">
    <h2 class="panel-title">Role breakdown</h2>
    <div class="role-bars">
      ${Rr||'<p class="muted">No data yet.</p>'}
    </div>
  </section>

  <section class="panel">
    <div class="panel-toolbar">
      <h2 class="panel-title">Waitlist entries</h2>
      <a class="export-btn" href="/admin/export.csv${s||n?ht({}):""}">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        Export CSV
      </a>
    </div>

    <form class="filter-bar" method="get" action="/admin">
      <input type="text" name="q" placeholder="Search name, email, or company…" value="${I(s)}" class="search-input"/>
      <select name="role" class="role-select">
        <option value="">All roles</option>
        ${xr}
      </select>
      <button type="submit" class="filter-btn">Filter</button>
      ${s||n?'<a href="/admin" class="clear-btn">Clear</a>':""}
    </form>

    <div class="table-wrap">
      <table class="entries-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name / Email</th>
            <th>Role</th>
            <th>Company</th>
            <th>GitHub</th>
            <th>Joined</th>
            <th>Email Status</th>
            <th>LinkedIn?</th>
          </tr>
        </thead>
        <tbody>
          ${Er}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="page-info">Showing ${M.length?T+1:0}–${T+M.length} of ${v.toLocaleString()}</span>
      <div class="page-buttons">
        <a href="/admin${ht({page:Math.max(1,E-1)})}" class="page-btn ${E<=1?"disabled":""}">&larr; Prev</a>
        <span class="page-current">Page ${E} of ${k}</span>
        <a href="/admin${ht({page:Math.min(k,E+1)})}" class="page-btn ${E>=k?"disabled":""}">Next &rarr;</a>
      </div>
    </div>
  </section>

</div>
</body>
</html>`;return e.html(Sr)});re.get("/export.csv",async e=>{const{env:t}=e,r=new URL(e.req.url),s=(r.searchParams.get("q")||"").trim(),n=(r.searchParams.get("role")||"").trim();let a="WHERE 1=1";const i=[];let o=1;if(s){a+=` AND (LOWER(name) LIKE $${o++} OR LOWER(email) LIKE $${o++} OR LOWER(company) LIKE $${o++})`;const v=`%${s.toLowerCase()}%`;i.push(v,v,v)}n&&(a+=` AND role = $${o++}`,i.push(n));const p=(await(await Ot(e).connect()).query(`SELECT id, name, email, role, company, github, position, created_at
     FROM waitlist_entries ${a}
     ORDER BY created_at ASC`,i)).rows||[],u=[["Position","Name","Email","Role","Company","GitHub","Joined At (UTC)"].join(",")];for(const v of p)u.push([616+v.position,ye(v.name),ye(v.email),ye(st[v.role]||v.role),ye(v.company||""),ye(v.github||""),ye(v.created_at)].join(","));const w=u.join(`
`);return new Response(w,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="codeward-waitlist-${new Date().toISOString().slice(0,10)}.csv"`}})});re.post("/retrigger",async e=>{const{env:t}=e,s=((await e.req.parseBody()).email||"").toString().trim();if(!s)return e.redirect("/admin");const n=await Ot(e).connect(),i=(await n.query("SELECT name, position FROM waitlist_entries WHERE email = $1",[s])).rows[0];return i&&await ur(t,s,i.name,i.position)?(await n.query("UPDATE waitlist_entries SET email_sent = 1 WHERE email = $1",[s]),e.redirect("/admin?msg=retrigger_success")):e.redirect("/admin?msg=retrigger_failed")});typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);let bt=null;function bs(e){var t,r,s;if(!bt){const n=((t=e==null?void 0:e.env)==null?void 0:t.POSTGRES_URL)||((r=e==null?void 0:e.env)==null?void 0:r.DATABASE_POSTGRES_URL)||((s=e==null?void 0:e.env)==null?void 0:s.DATABASE_URL)||(typeof process<"u"&&process.env?process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL:void 0);bt=Xt({connectionString:n})}return bt}function Ee(e){return bs(e).sql}function ys(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const ge=new Ct;ge.onError((e,t)=>(console.error("Hono Global Error:",e),t.json({error:e.message||"Internal Server Error"},500)));ge.route("/admin",re);const Re=617;ge.get("/api/stats",async e=>{var n;const{env:t}=e,{rows:r}=await Ee(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,s=Number(((n=r[0])==null?void 0:n.cnt)??0);return e.json({count:Re+s})});ge.post("/api/join",async e=>{const{env:t}=e;let r;try{r=await e.req.json()}catch{return e.json({error:"Invalid request body"},400)}const s=(r.name||"").toString().trim(),n=(r.email||"").toString().trim().toLowerCase(),a=(r.role||"").toString().trim(),i=(r.company||"").toString().trim(),o=(r.github||"").toString().trim();if(s.length<2)return e.json({error:"Please enter your full name."},400);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n))return e.json({error:"Please enter a valid email address."},400);if(!a)return e.json({error:"Please select your role."},400);const{rows:c}=await Ee(e)`SELECT id, position FROM waitlist_entries WHERE email = ${n}`,d=c[0];if(d){const{rows:v}=await Ee(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,k=v[0];return e.json({alreadyJoined:!0,position:Re+Number(d.position),total:Re+Number((k==null?void 0:k.cnt)??0)})}const{rows:p}=await Ee(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,h=p[0],u=Number((h==null?void 0:h.cnt)??0)+1;await Ee(e)`INSERT INTO waitlist_entries (name, email, role, company, github, position) VALUES (${s}, ${n}, ${a}, ${i||null}, ${o||null}, ${u})`;let w=0;return t.RESEND_API_KEY&&await ur(t,n,s,u)&&(w=1),await Ee(e)`UPDATE waitlist_entries SET email_sent = ${w} WHERE email = ${n}`,e.json({success:!0,position:Re+u,total:Re+Number((h==null?void 0:h.cnt)??0)+1})});async function ur(e,t,r,s){const n=e.RESEND_API_KEY||process.env.RESEND_API_KEY;if(!n)return!1;try{const a=(Re+s).toLocaleString(),i=`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>Codeward — waitlist confirmation preview</title>
</head>
<body style="margin:0;padding:32px 16px;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#0d1117;border:1px solid #22232a;border-radius:12px;overflow:hidden;">

  <!-- Banner -->
  <tr>
    <td style="padding:0;">
      <img src="https://i.ibb.co/5HqfYFJ/object-remover-result-1784051501162.png" width="560" style="display:block;width:100%;height:auto;max-width:560px;" alt="Codeward" />
    </td>
  </tr>

  <!-- Personal note section — photo LEFT, text right -->
  <tr>
    <td style="padding:28px 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="72" valign="middle" style="text-align:left;">
            <img src="https://i.ibb.co/QFJtchYr/kelvinimage.avif" width="72" height="72"
                 style="width:72px;height:72px;border-radius:50%;object-fit:cover;border:2px solid #7c6fff;display:inline-block;" alt="Kelvin, founder of Codeward">
          </td>
          <td valign="middle" style="padding-left:14px;text-align:left;">
            <p style="font-size:14px;font-weight:600;color:#ffffff;margin:0 0 2px;">Kelvin, from Codeward</p>
            <p style="font-size:12.5px;color:#5f6169;margin:0;">Founder</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <tr>
    <td style="padding:20px 32px 0;text-align:center;">
      <h1 style="font-family:'Poppins',sans-serif;font-size:22px;line-height:30px;font-weight:600;color:#ffffff;margin:0 0 16px;">
        You're on the list.
      </h1>
      <p style="font-size:14.5px;line-height:23px;color:#c9d1d9;margin:0 0 14px;text-align:left;">
        Hi ${ys(r)} — thanks for requesting early access to Codeward. I wanted to reach out myself rather than send a form reply.
      </p>
      <p style="font-size:14.5px;line-height:23px;color:#c9d1d9;margin:0 0 14px;text-align:left;">
        You're joining <strong style="color:#ffffff;">${a} other engineers</strong> already in queue. We're rolling out access to a small group of teams at a time, on purpose — every new repo we onboard gets run through all 11 of our review agents, and we'd rather scale that carefully than rush it and give you a worse first run.
      </p>
      <p style="font-size:14.5px;line-height:23px;color:#c9d1d9;margin:0 0 4px;text-align:left;">
        That means there's a real wait ahead. I promise it's worth it — and I'll personally email you the moment your spot opens up. One email, that's it.
      </p>
    </td>
  </tr>

  <!-- Divider -->
  <tr><td style="padding:28px 32px 0;"><hr style="border:none;border-top:1px dashed #2a2b33;margin:0;"></td></tr>

  <!-- What we're building — AGENTS TABLE -->
  <tr>
    <td style="padding:28px 32px 8px;">
      <p style="font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#7c6fff;margin:0 0 4px;">While you wait</p>
      <p style="font-size:15px;font-weight:600;color:#ffffff;margin:0 0 18px;">11 agents, working on your first run</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="padding:0 0 8px;border-bottom:1px solid #22232a;font-size:11.5px;font-weight:600;letter-spacing:0.03em;text-transform:uppercase;color:#5f6169;">Agent</td>
          <td style="padding:0 0 8px;border-bottom:1px solid #22232a;font-size:11.5px;font-weight:600;letter-spacing:0.03em;text-transform:uppercase;color:#5f6169;" width="70">Checks</td>
          <td style="padding:0 0 8px;border-bottom:1px solid #22232a;font-size:11.5px;font-weight:600;letter-spacing:0.03em;text-transform:uppercase;color:#5f6169;">What it covers</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">Security Agent</td>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;color:#8b8d98;vertical-align:top;">18</td>
          <td style="padding:10px 0;border-bottom:1px solid #1a1b20;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">Secrets, SQLi, missing RLS, prompt injection, and CVEs, caught before merge.</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">Bloat Agent</td>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;color:#8b8d98;vertical-align:top;">18</td>
          <td style="padding:10px 0;border-bottom:1px solid #1a1b20;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">Duplicate functions, dead code, and god files, found by AST scan and auto-refactored.</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">Broken Code Agent</td>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;color:#8b8d98;vertical-align:top;">18</td>
          <td style="padding:10px 0;border-bottom:1px solid #1a1b20;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">Your test suite run 10× to catch flaky tests, plus live race conditions and memory leaks.</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">Architecture Agent</td>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;color:#8b8d98;vertical-align:top;">18</td>
          <td style="padding:10px 0;border-bottom:1px solid #1a1b20;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">N+1 queries, missing indexes, and cold-start latency, measured against your real traffic shape.</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">AI-Era Agent</td>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;color:#8b8d98;vertical-align:top;">18</td>
          <td style="padding:10px 0;border-bottom:1px solid #1a1b20;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">The checks most tools don't run yet: prompt injection, RAG drift, PII in AI pipelines.</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">Compliance Agent</td>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;color:#8b8d98;vertical-align:top;">10</td>
          <td style="padding:10px 0;border-bottom:1px solid #1a1b20;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">EU AI Act, GDPR, and WCAG drift, checked nightly so audits stop being a surprise.</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">Data &amp; DX Agent</td>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;color:#8b8d98;vertical-align:top;">20</td>
          <td style="padding:10px 0;border-bottom:1px solid #1a1b20;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">A weekly report on pipeline health, onboarding time, and the debt your team actually feels.</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">Gordon, the Chat Agent</td>
          <td style="padding:10px 8px 10px 0;border-bottom:1px solid #1a1b20;font-size:13px;color:#8b8d98;vertical-align:top;">—</td>
          <td style="padding:10px 0;border-bottom:1px solid #1a1b20;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">Always on. Ask Gordon your biggest risk right now — he doesn't guess, he runs the agents and checks.</td>
        </tr>
        <tr>
          <td style="padding:10px 8px 10px 0;font-size:13px;font-weight:600;color:#ffffff;vertical-align:top;">3 more agents</td>
          <td style="padding:10px 8px 10px 0;font-size:13px;color:#8b8d98;vertical-align:top;">—</td>
          <td style="padding:10px 0;font-size:13px;line-height:19px;color:#8b8d98;vertical-align:top;">Still being tested before they join the lineup — more on these soon.</td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Queue status card -->
  <tr>
    <td style="padding:22px 32px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#111318;border:1px solid #22232a;border-radius:10px;">
        <tr>
          <td style="padding:18px 20px;">
            <p style="font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#5dcaa5;margin:0 0 6px;">Current status</p>
            <p style="font-size:13.5px;line-height:21px;color:#c9d1d9;margin:0;">
              We're deliberately capacity-limited right now while we harden the sandbox for scale. As we grow past our current cohort, we'll open more spots — no fixed date, but you'll be the first to know.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Sign-off -->
  <tr>
    <td style="padding:24px 32px 28px;text-align:left;">
      <p style="font-size:14px;line-height:22px;color:#c9d1d9;margin:0 0 4px;">Thanks for your patience — talk soon,</p>
      <p style="font-family:'Poppins',sans-serif;font-size:14px;font-weight:600;color:#ffffff;margin:0;">Kelvin</p>
      <p style="font-size:12.5px;color:#5f6169;margin:2px 0 0;">Founder, Codeward</p>
    </td>
  </tr>

</table>

<!-- Footer card, matching reference design -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:20px auto 0;">
  <tr>
    <td style="position:relative;background:#2c2d32;border-radius:14px;padding:22px 24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td valign="top">
            <p style="font-size:14px;font-weight:700;color:#ffffff;margin:0 0 8px;">Codeward</p>
            <p style="font-size:13px;line-height:20px;color:#9a9ba3;margin:0 0 14px;">Nairobi, Kenya</p>
            <a href="#" style="font-size:12.5px;color:#c9c9cf;text-decoration:underline;">Unsubscribe from these emails</a>
          </td>
          <td valign="middle" style="text-align:right;white-space:nowrap;">
            <a href="https://linkedin.com/company/get-codeward" style="display:inline-block;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);color:#ffffff;text-decoration:none;font-size:13px;font-weight:500;padding:8px 16px;border-radius:18px;vertical-align:middle;">
              Follow on LinkedIn
            </a>
          </td>
        </tr>
      </table>
      <span style="position:absolute;top:10px;left:10px;width:6px;height:6px;border-radius:50%;background:#6b6c74;"></span>
      <span style="position:absolute;top:10px;right:10px;width:6px;height:6px;border-radius:50%;background:#6b6c74;"></span>
      <span style="position:absolute;bottom:10px;left:10px;width:6px;height:6px;border-radius:50%;background:#6b6c74;"></span>
      <span style="position:absolute;bottom:10px;right:10px;width:6px;height:6px;border-radius:50%;background:#6b6c74;"></span>
    </td>
  </tr>
</table>

</body>
</html>`,o=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward <waitlist@codeward.cloud>",to:[t],subject:"You are on the Codeward waitlist",html:i})});if(!o.ok){const c=await o.text();console.error("Resend API Error:",o.status,c)}return o.ok}catch(a){return console.error("Failed to send email",a),!1}}ge.post("/api/track-linkedin",async e=>{const{env:t}=e;let r;try{r=await e.req.json()}catch{return e.json({error:"Invalid body"},400)}return r.email&&await sql`UPDATE waitlist_entries SET linkedin_clicked = 1 WHERE email = ${r.email}`,e.json({success:!0})});ge.get("/",e=>e.html(ws));const ws=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Codeward — Join the Waitlist</title>
<meta name="description" content="Codeward runs your actual code inside an ephemeral sandbox — 120+ checks, 8 specialised agents, hard merge blocks on critical findings. Join the private beta waitlist."/>
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/style.css"/>
</head>
<body>

<div class="confetti-canvas-wrap" id="confetti-wrap" aria-hidden="true"></div>

<main class="page">

  <!-- ============ HERO ============ -->
  <section class="hero" id="hero">
    <h1 class="hero-title reveal">The automated principal engineer <em>sitting on every Pull Request.</em></h1>
    <p class="hero-sub reveal">Codeward runs your actual code inside an ephemeral sandbox — 120+ checks, 11 specialised agents, hard merge blocks on critical findings. All in under 6 minutes. No YAML files.</p>

    <a href="#join-form" class="hero-cta">
      <span>Join the waitlist</span>
      <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
    </a>
  </section>

  <!-- ============ COUNTER STRIP ============ -->
  <section class="counter-section">
    <div class="counter-strip reveal">
      <div class="counter-item">
        <span class="num" data-count-to="617" data-count-start="536" id="live-counter">536</span>
        <span class="label">engineers on waitlist</span>
      </div>
      <div class="counter-divider"></div>
      <div class="counter-item">
        <span class="num"><span data-count-to="120" data-count-start="0">0</span><span class="accent">+</span></span>
        <span class="label">automated debt checks</span>
      </div>
      <div class="counter-divider"></div>
      <div class="counter-item">
        <span class="num">&lt;<span class="accent" data-count-to="6" data-count-start="0">0</span>min</span>
        <span class="label">per commit analysis</span>
      </div>
      <div class="counter-divider"></div>
      <div class="counter-item">
        <span class="num">$<span class="accent">0.08</span></span>
        <span class="label">average cost per run</span>
      </div>
    </div>

    <div class="agents-row reveal" aria-label="Active agents">
      <span class="agent-pill"><span class="dot dot-red"></span>Security &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-red"></span>Broken Code &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-amber"></span>Bloat &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-purple"></span>Architecture &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-green"></span>AI-Era &middot; 18 checks</span>
      <span class="agent-pill"><span class="dot dot-green"></span>Compliance &middot; 10 checks</span>
      <span class="agent-pill"><span class="dot dot-purple"></span>Data / DX &middot; 20 checks</span>
      <span class="agent-pill"><span class="dot dot-green"></span>Chat Agent &middot; always on</span>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ============ PROBLEM CARDS ============ -->
  <section class="section-block">
    <div class="section-header-left reveal">
      <h2 class="section-heading">Shipping fast shouldn't mean shipping blind</h2>
    </div>
    <div class="problem-grid">
      <article class="problem-item reveal">
        <div class="problem-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="problem-content">
          <h3>Code review is a human bottleneck</h3>
          <p>Senior engineers spend hours in review cycles that could catch the same issues automatically — memory leaks, race conditions, missing auth — before anyone even opens the PR.</p>
        </div>
      </article>
      <article class="problem-item reveal">
        <div class="problem-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        </div>
        <div class="problem-content">
          <h3>Static analysers miss runtime behaviour</h3>
          <p>SonarQube sees your AST. Codeward boots your stack, seeds a prod-like database, fires 100 concurrent requests, and runs your tests 10 times. Different class of signal entirely.</p>
        </div>
      </article>
      <article class="problem-item reveal">
        <div class="problem-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/></svg>
        </div>
        <div class="problem-content">
          <h3>No tool was built for AI-native codebases</h3>
          <p>Prompt injection, unbounded token spend, unvalidated LLM output, RAG pipeline drift — these didn't exist two years ago. Your current CI doesn't check any of them.</p>
        </div>
      </article>
      <article class="problem-item reveal">
        <div class="problem-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
        <div class="problem-content">
          <h3>Compliance drift happens between audits</h3>
          <p>GDPR, EU AI Act, WCAG 2.2 — violations accumulate silently between quarterly reviews. Codeward runs compliance checks nightly so you're always audit-ready.</p>
        </div>
      </article>
    </div>
    <div class="section-cta-wrap reveal">
      <a href="#join-form" class="hero-cta">
        <span>Join the waitlist</span>
      </a>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ============ "TESTIMONIALS" — REAL PROBLEMS ============ -->
  <section class="section-block">
    <div class="section-header-left reveal">
      <h2 class="section-heading">You're not the only one losing sleep over this</h2>
    </div>
    <div class="testimonial-grid">
      <article class="testimonial-item reveal">
        <p class="testimonial-text">"Our review queue is the actual bottleneck on our release train now. I spend more time re-reviewing the same class of bugs — unhandled edge cases, silent failures in async code — than I spend writing my own PRs. We need something that runs the code, not just reads it."</p>
        <div class="testimonial-author">
          <img src="https://s13.gifyu.com/images/blLkq.png" class="testimonial-avatar" alt="Daniel" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0;" onerror="this.src='https://s13.gifyu.com/images/blLkq.jpg'" />
          <div class="author-info">
            <div class="name">Daniel Kessler</div>
            <div class="role">Software Engineer &middot; GenSpark AI</div>
          </div>
        </div>
      </article>
      <article class="testimonial-item reveal">
        <p class="testimonial-text">"We're a 6-person team in Lagos shipping fast for three different clients at once. There's no time for a dedicated QA pass, and honestly no budget for one either. Every bug that reaches a client demo costs us trust we can't easily rebuild. We're flying without a net."</p>
        <div class="testimonial-author">
          <img src="https://s13.gifyu.com/images/blLk7.png" class="testimonial-avatar" alt="Amara" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0;" onerror="this.src='https://s13.gifyu.com/images/blLk7.jpg'" />
          <div class="author-info">
            <div class="name">Amara Okafor</div>
            <div class="role">Co-founder &amp; Lead Engineer &middot; Lagos, Nigeria</div>
          </div>
        </div>
      </article>
      <article class="testimonial-item reveal">
        <p class="testimonial-text">"Our seed round runway means every engineering hour has to count. I've caught myself shipping on Friday nights praying nothing breaks over the weekend. We're building an AI product and honestly have no idea if our prompt handling has security holes. We need eyes on this we can't afford to hire yet."</p>
        <div class="testimonial-author">
          <img src="https://s13.gifyu.com/images/blLkI.png" class="testimonial-avatar" alt="Tunde" style="width: 48px; height: 48px; border-radius: 50%; object-fit: cover; flex-shrink: 0;" onerror="this.src='https://s13.gifyu.com/images/blLkI.jpg'" />
          <div class="author-info">
            <div class="name">Tunde Martins</div>
            <div class="role">Founder &amp; CTO &middot; Nairobi, Kenya</div>
          </div>
        </div>
      </article>
    </div>
    <div class="section-cta-wrap">
      <a href="#join-form" class="hero-cta">
        <span>Join the waitlist</span>
      </a>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ============ HOW IT WORKS ============ -->
  <section class="section-block">
    <div class="section-header-left reveal">
      <h2 class="section-heading">One push. Six minutes. Full clarity.</h2>
    </div>
    <div class="how-grid">
      <article class="how-item reveal">
        <span class="how-step">01</span>
        <h3>Connect your repo</h3>
        <p>No YAML, no config files. Point Codeward at your repository and it's live on your very next pull request.</p>
      </article>
      <article class="how-item reveal">
        <span class="how-step">02</span>
        <h3>We boot your real stack</h3>
        <p>An ephemeral Firecracker sandbox spins up your actual app, seeds a prod-like database, and fires realistic concurrent traffic at it.</p>
      </article>
      <article class="how-item reveal">
        <span class="how-step">03</span>
        <h3>11 agents, 120+ checks</h3>
        <p>Security, architecture, bloat, AI-era risks, compliance and more — all running in parallel against your live, running code.</p>
      </article>
      <article class="how-item reveal">
        <span class="how-step">04</span>
        <h3>Hard merge blocks</h3>
        <p>Critical findings block the merge automatically. Everything else lands as inline PR comments your team can action immediately.</p>
      </article>
    </div>
    <div class="section-cta-wrap">
      <a href="#join-form" class="hero-cta">
        <span>Join the waitlist</span>
      </a>
    </div>
  </section>

  <div class="section-divider"></div>

  <!-- ============ FORM SECTION ============ -->
  <section class="form-section" id="join-form">
    <div class="form-container reveal" id="form-card">
      <div id="form-view">
        <div class="form-card-header">
          <h2>Join the waitlist</h2>
          <p>We're rolling out access to a small group of teams first. Your spot in queue is first-come, first-served.</p>
        </div>

        <div class="live-count">
          <div class="live-dot"></div>
          <span><span class="count-num" id="count-display">617</span> engineers already in</span>
        </div>

        <form id="waitlist-form" novalidate>
          <div class="field-group">
            <div class="field-row">
              <div class="field" id="field-name">
                <label>Full name <span class="required">required</span></label>
                <input type="text" name="name" id="name" placeholder="Tim Cook" autocomplete="name"/>
                <span class="field-error">Please enter your name.</span>
              </div>
              <div class="field" id="field-email">
                <label>Work email <span class="required">required</span></label>
                <input type="email" name="email" id="email" placeholder="tim@apple.com" autocomplete="email"/>
                <span class="field-error">Enter a valid email address.</span>
              </div>
            </div>

            <div class="field-row">
              <div class="field" id="field-role">
                <label>What best describes you? <span class="required">required</span></label>
                <select name="role" id="role">
                  <option value="" disabled selected>Select your role</option>
                  <option value="software-engineer">Software Engineer</option>
                  <option value="senior-engineer">Senior / Staff Engineer</option>
                  <option value="engineering-lead">Engineering Lead / Manager</option>
                  <option value="cto-vp">CTO / VP of Engineering</option>
                  <option value="devops-platform">DevOps / Platform Engineer</option>
                  <option value="security-engineer">Security Engineer</option>
                  <option value="freelancer">Freelance Developer</option>
                  <option value="open-source">Open Source Contributor</option>
                  <option value="student">Student / Bootcamp</option>
                  <option value="founder">Founder / Indie Hacker</option>
                  <option value="other">Other</option>
                </select>
                <span class="field-error">Please select your role.</span>
              </div>

              <div class="field">
                <label>Company / Organisation <span class="optional">optional</span></label>
                <input type="text" name="company" id="company" placeholder="Apple, Vercel, Stripe…"/>
              </div>
            </div>

            <div class="field">
              <label>GitHub profile or repo URL <span class="optional">optional</span></label>
              <input type="url" name="github" id="github" placeholder="https://github.com/timcook"/>
            </div>
          </div>

          <button type="submit" class="submit-btn" id="submit-btn">
            Request early access
          </button>

          <div class="form-footer">
            <p>No spam. We'll notify you when your access is ready — one email, that's it. Unsubscribe anytime.</p>
          </div>
        </form>
      </div>
    </div>
  </section>

</main>

<!-- ============ SUCCESS MODAL ============ -->
<div class="modal-overlay" id="modal-overlay">
  <div class="modal-content" id="modal-card">
    <button class="modal-close" id="modal-close" aria-label="Close">&times;</button>

    <div class="success-ring">
      <svg viewBox="0 0 72 72" aria-hidden="true">
        <circle class="track" cx="36" cy="36" r="32"/>
        <circle class="progress" cx="36" cy="36" r="32"/>
      </svg>
      <span class="check">&#10003;</span>
    </div>

    <div class="success-position">
      You're on the list at
      <strong>#<span id="your-position">617</span></strong>
    </div>

    <div class="success-msg">
      <h3>Welcome to Codeward! 🎉</h3>
      <p>Congratulations — you've secured your spot. Our team is working around the clock to get every check, every agent, and every sandbox ready for a smooth, safe launch. As an early member, you'll get priority access, founder pricing, and a direct line to shape the roadmap.</p>
    </div>

    <div class="devs-joined">
      <div class="dev-text">
        <strong id="total-count">617 engineers</strong> are already waiting.<br/>
        Firecracker sandboxes ready. Agents standing by.
      </div>
    </div>

    <a href="https://www.linkedin.com/company/get-codeward" target="_blank" rel="noopener noreferrer" class="linkedin-cta" id="linkedin-cta">
      <svg class="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      Follow us on LinkedIn
    </a>

    <button class="modal-done-btn" id="modal-done">Got it, thanks!</button>
  </div>
</div>

<script src="/static/app.js"><\/script>
</body>
</html>`;var oe=class extends Error{constructor(e,t){super(e,t),this.name="RequestError"}},xs=e=>e instanceof oe?e:new oe(e.message,{cause:e}),Es=global.Request,Fe=class extends Es{constructor(t,r){var s;typeof t=="object"&&$e in t&&(t=t[$e]()),typeof((s=r==null?void 0:r.body)==null?void 0:s.getReader)<"u"&&(r.duplex??(r.duplex="half")),super(t,r)}},Rs=e=>{const t=[],r=e.rawHeaders;for(let s=0;s<r.length;s+=2){const{[s]:n,[s+1]:a}=r;n.charCodeAt(0)!==58&&t.push([n,a])}return new Headers(t)},gr=Symbol("wrapBodyStream"),Ss=(e,t,r,s,n)=>{const a={method:e,headers:r,signal:n.signal};if(e==="TRACE"){a.method="GET";const i=new Fe(t,a);return Object.defineProperty(i,"method",{get(){return"TRACE"}}),i}if(!(e==="GET"||e==="HEAD"))if("rawBody"in s&&s.rawBody instanceof Buffer)a.body=new ReadableStream({start(i){i.enqueue(s.rawBody),i.close()}});else if(s[gr]){let i;a.body=new ReadableStream({async pull(o){try{i||(i=It.toWeb(s).getReader());const{done:c,value:d}=await i.read();c?o.close():o.enqueue(d)}catch(c){o.error(c)}}})}else a.body=It.toWeb(s);return new Fe(t,a)},$e=Symbol("getRequestCache"),nt=Symbol("requestCache"),at=Symbol("incomingKey"),ot=Symbol("urlKey"),yt=Symbol("headersKey"),J=Symbol("abortControllerKey"),ks=Symbol("getAbortController"),Xe={get method(){return this[at].method||"GET"},get url(){return this[ot]},get headers(){return this[yt]||(this[yt]=Rs(this[at]))},[ks](){return this[$e](),this[J]},[$e](){return this[J]||(this[J]=new AbortController),this[nt]||(this[nt]=Ss(this.method,this[ot],this.headers,this[at],this[J]))}};["body","bodyUsed","cache","credentials","destination","integrity","mode","redirect","referrer","referrerPolicy","signal","keepalive"].forEach(e=>{Object.defineProperty(Xe,e,{get(){return this[$e]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(Xe,e,{value:function(){return this[$e]()[e]()}})});Object.defineProperty(Xe,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,r){const s={method:this.method,url:this.url,headers:this.headers,nativeRequest:this[nt]};return`Request (lightweight) ${r(s,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(Xe,Fe.prototype);var As=(e,t)=>{const r=Object.create(Xe);r[at]=e;const s=e.url||"";if(s[0]!=="/"&&(s.startsWith("http://")||s.startsWith("https://"))){if(e instanceof Ue)throw new oe("Absolute URL for :path is not allowed in HTTP/2");try{const o=new URL(s);r[ot]=o.href}catch(o){throw new oe("Invalid absolute URL",{cause:o})}return r}const n=(e instanceof Ue?e.authority:e.headers.host)||t;if(!n)throw new oe("Missing host header");let a;if(e instanceof Ue){if(a=e.scheme,!(a==="http"||a==="https"))throw new oe("Unsupported scheme")}else a=e.socket&&e.socket.encrypted?"https":"http";const i=new URL(`${a}://${n}${s}`);if(i.hostname.length!==n.length&&i.hostname!==n.replace(/:\d+$/,""))throw new oe("Invalid host header");return r[ot]=i.href,r},Ie=Symbol("responseCache"),Se=Symbol("getResponseCache"),le=Symbol("cache"),Tt=global.Response,Je,W,_e,je=(_e=class{constructor(t,r){m(this,Je);m(this,W);let s;if(f(this,Je,t),r instanceof _e){const n=r[Ie];if(n){f(this,W,n),this[Se]();return}else f(this,W,l(r,W)),s=new Headers(l(r,W).headers)}else f(this,W,r);(typeof t=="string"||typeof(t==null?void 0:t.getReader)<"u"||t instanceof Blob||t instanceof Uint8Array)&&(this[le]=[(r==null?void 0:r.status)||200,t,s||(r==null?void 0:r.headers)])}[Se](){return delete this[le],this[Ie]||(this[Ie]=new Tt(l(this,Je),l(this,W)))}get headers(){const t=this[le];return t?(t[2]instanceof Headers||(t[2]=new Headers(t[2]||{"content-type":"text/plain; charset=UTF-8"})),t[2]):this[Se]().headers}get status(){var t;return((t=this[le])==null?void 0:t[0])??this[Se]().status}get ok(){const t=this.status;return t>=200&&t<300}},Je=new WeakMap,W=new WeakMap,_e);["body","bodyUsed","redirected","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty(je.prototype,e,{get(){return this[Se]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(je.prototype,e,{value:function(){return this[Se]()[e]()}})});Object.defineProperty(je.prototype,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,r){const s={status:this.status,headers:this.headers,ok:this.ok,nativeResponse:this[Ie]};return`Response (lightweight) ${r(s,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(je,Tt);Object.setPrototypeOf(je.prototype,Tt.prototype);async function Cs(e){return Promise.race([e,Promise.resolve().then(()=>Promise.resolve(void 0))])}function mr(e,t,r){const s=o=>{e.cancel(o).catch(()=>{})};return t.on("close",s),t.on("error",s),(r??e.read()).then(i,n),e.closed.finally(()=>{t.off("close",s),t.off("error",s)});function n(o){o&&t.destroy(o)}function a(){e.read().then(i,n)}function i({done:o,value:c}){try{if(o)t.end();else if(!t.write(c))t.once("drain",a);else return e.read().then(i,n)}catch(d){n(d)}}}function Os(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");return t.destroyed?void 0:mr(e.getReader(),t)}var Rt=e=>{const t={};e instanceof Headers||(e=new Headers(e??void 0));const r=[];for(const[s,n]of e)s==="set-cookie"?r.push(n):t[s]=n;return r.length>0&&(t["set-cookie"]=r),t["content-type"]??(t["content-type"]="text/plain; charset=UTF-8"),t},Ts="x-hono-already-sent";typeof global.crypto>"u"&&(global.crypto=Tr);var Pt=Symbol("outgoingEnded"),zt=Symbol("incomingDraining"),Ps=500,Ls=64*1024*1024,wt=e=>{var o,c,d;const t=e;if(e.destroyed||t[zt])return;if(t[zt]=!0,e instanceof Ue){try{(c=(o=e.stream)==null?void 0:o.close)==null||c.call(o,Or.NGHTTP2_NO_ERROR)}catch{}return}let r=0;const s=()=>{clearTimeout(a),e.off("data",i),e.off("end",s),e.off("error",s)},n=()=>{s();const p=e.socket;p&&!p.destroyed&&p.destroySoon()},a=setTimeout(n,Ps);(d=a.unref)==null||d.call(a);const i=p=>{r+=p.length,r>Ls&&n()};e.on("data",i),e.on("end",s),e.on("error",s),e.resume()},_s=()=>new Response(null,{status:400}),vr=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),St=(e,t)=>{const r=e instanceof Error?e:new Error("unknown error",{cause:e});r.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${r.message}`),t.destroy(r))},br=e=>{"flushHeaders"in e&&e.writable&&e.flushHeaders()},yr=async(e,t)=>{var i,o;let[r,s,n]=e[le],a=!1;if(!n)n={"content-type":"text/plain; charset=UTF-8"};else if(n instanceof Headers)a=n.has("content-length"),n=Rt(n);else if(Array.isArray(n)){const c=new Headers(n);a=c.has("content-length"),n=Rt(c)}else for(const c in n)if(c.length===14&&c.toLowerCase()==="content-length"){a=!0;break}a||(typeof s=="string"?n["Content-Length"]=Buffer.byteLength(s):s instanceof Uint8Array?n["Content-Length"]=s.byteLength:s instanceof Blob&&(n["Content-Length"]=s.size)),t.writeHead(r,n),typeof s=="string"||s instanceof Uint8Array?t.end(s):s instanceof Blob?t.end(new Uint8Array(await s.arrayBuffer())):(br(t),await((i=Os(s,t))==null?void 0:i.catch(c=>St(c,t)))),(o=t[Pt])==null||o.call(t)},$s=e=>typeof e.then=="function",js=async(e,t,r={})=>{var n;if($s(e))if(r.errorHandler)try{e=await e}catch(a){const i=await r.errorHandler(a);if(!i)return;e=i}else e=await e.catch(vr);if(le in e)return yr(e,t);const s=Rt(e.headers);if(e.body){const a=e.body.getReader(),i=[];let o=!1,c;if(s["transfer-encoding"]!=="chunked"){let d=2;for(let p=0;p<d;p++){c||(c=a.read());const h=await Cs(c).catch(u=>{console.error(u),o=!0});if(!h){if(p===1){await new Promise(u=>setTimeout(u)),d=3;continue}break}if(c=void 0,h.value&&i.push(h.value),h.done){o=!0;break}}o&&!("content-length"in s)&&(s["content-length"]=i.reduce((p,h)=>p+h.length,0))}t.writeHead(e.status,s),i.forEach(d=>{t.write(d)}),o?t.end():(i.length===0&&br(t),await mr(a,t,c))}else s[Ts]||(t.writeHead(e.status,s),t.end());(n=t[Pt])==null||n.call(t)},Ds=(e,t={})=>{const r=t.autoCleanupIncoming??!0;return t.overrideGlobalObjects!==!1&&global.Request!==Fe&&(Object.defineProperty(global,"Request",{value:Fe}),Object.defineProperty(global,"Response",{value:je})),async(s,n)=>{let a,i;try{i=As(s,t.hostname);let o=!r||s.method==="GET"||s.method==="HEAD";if(o||(s[gr]=!0,s.on("end",()=>{o=!0}),s instanceof Ue&&(n[Pt]=()=>{o||setTimeout(()=>{o||setTimeout(()=>{wt(s)})})}),n.on("finish",()=>{o||wt(s)})),n.on("close",()=>{i[J]&&(s.errored?i[J].abort(s.errored.toString()):n.writableFinished||i[J].abort("Client connection prematurely closed.")),o||setTimeout(()=>{o||setTimeout(()=>{wt(s)})})}),a=e(i,{incoming:s,outgoing:n}),le in a)return yr(a,n)}catch(o){if(a)return St(o,n);if(t.errorHandler){if(a=await t.errorHandler(i?o:xs(o)),!a)return}else i?a=vr(o):a=_s()}try{return await js(a,n,t)}catch(o){return St(o,n)}}},Hs=e=>Ds(e.fetch);const kt=new Ct,Ns=Object.assign({"/src/index.tsx":ge});let wr=!1;for(const[,e]of Object.entries(Ns))e&&(kt.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),kt.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),wr=!0);if(!wr)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");const zs=Hs(kt);export{zs as default};
