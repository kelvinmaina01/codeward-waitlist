var Rr=Object.defineProperty;var Ht=e=>{throw TypeError(e)};var Cr=(e,t,r)=>t in e?Rr(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var b=(e,t,r)=>Cr(e,typeof t!="symbol"?t+"":t,r),ft=(e,t,r)=>t.has(e)||Ht("Cannot "+r);var u=(e,t,r)=>(ft(e,t,"read from private field"),r?r.call(e):t.get(e)),w=(e,t,r)=>t.has(e)?Ht("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),g=(e,t,r,s)=>(ft(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),k=(e,t,r)=>(ft(e,t,"access private method"),r);var It=(e,t,r,s)=>({set _(a){g(e,t,a,r)},get _(){return u(e,t,s)}});import{Http2ServerRequest as qe,constants as Ar}from"http2";import{Readable as Mt}from"stream";import Or from"crypto";var Ut=(e,t,r)=>(s,a)=>{let n=-1;return i(0);async function i(l){if(l<=n)throw new Error("next() called multiple times");n=l;let p,o=!1,c;if(e[l]?(c=e[l][0][0],s.req.routeIndex=l):c=l===e.length&&a||void 0,c)try{p=await c(s,()=>i(l+1))}catch(d){if(d instanceof Error&&t)s.error=d,p=await t(d,s),o=!0;else throw d}else s.finalized===!1&&r&&(p=await r(s));return p&&(s.finalized===!1||o)&&(s.res=p),s}},Pr=Symbol(),Lr=(e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,s=>s.toLowerCase())}}).formData(),xt=e=>"headers"in e,Tr=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,n=(xt(e)?e.headers:e.raw.headers).get("Content-Type"),i=n==null?void 0:n.split(";")[0].trim().toLowerCase();return i==="multipart/form-data"||i==="application/x-www-form-urlencoded"?_r(e,{all:r,dot:s}):{}};async function _r(e,t){const r=xt(e)?e.headers:e.raw.headers,s=await e.arrayBuffer(),a=Lr(s,r.get("Content-Type")||"");xt(e)||(e.bodyCache.formData=a);const n=await a;return n?$r(n,t):{}}function $r(e,t){const r=Object.create(null);return e.forEach((s,a)=>{t.all||a.endsWith("[]")?jr(r,a,s):r[a]=s}),t.dot&&Object.entries(r).forEach(([s,a])=>{s.includes(".")&&(Dr(r,s,a),delete r[s])}),r}var jr=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Dr=(e,t,r)=>{if(/(?:^|\.)__proto__\./.test(t))return;let s=e;const a=t.split(".");a.forEach((n,i)=>{i===a.length-1?s[n]=r:((!s[n]||typeof s[n]!="object"||Array.isArray(s[n])||s[n]instanceof File)&&(s[n]=Object.create(null)),s=s[n])})},Qt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Nr=e=>{const{groups:t,path:r}=Hr(e),s=Qt(r);return Ir(s,t)},Hr=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const a=`@${s}`;return t.push([a,r]),a}),{groups:t,path:e}},Ir=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let a=e.length-1;a>=0;a--)if(e[a].includes(s)){e[a]=e[a].replace(s,t[r][1]);break}}return e},et={},Mr=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return et[s]||(r[2]?et[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:et[s]=[e,r[1],!0]),et[s]}return null},pt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Ur=e=>pt(e,decodeURI),Xt=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const a=t.charCodeAt(s);if(a===37){const n=t.indexOf("?",s),i=t.indexOf("#",s),l=n===-1?i===-1?void 0:i:i===-1?n:Math.min(n,i),p=t.slice(r,l);return Ur(p.includes("%25")?p.replace(/%25/g,"%2525"):p)}else if(a===63||a===35)break}return t.slice(r,s)},qr=e=>{const t=Xt(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},oe=(e,t,...r)=>(r.length&&(t=oe(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Zt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))s+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){r.length===0&&s===""?r.push("/"):r.push(s);const n=a.replace("?","");s+="/"+n,r.push(s)}else s+="/"+a}),r.filter((a,n,i)=>i.indexOf(a)===n)},mt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?pt(e,Ct):e):e,er=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const l=e.charCodeAt(i+t.length+1);if(l===61){const p=i+t.length+2,o=e.indexOf("&",p);return mt(e.slice(p,o===-1?void 0:o))}else if(l==38||isNaN(l))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const a={};s??(s=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const i=e.indexOf("&",n+1);let l=e.indexOf("=",n);l>i&&i!==-1&&(l=-1);let p=e.slice(n+1,l===-1?i===-1?void 0:i:l);if(s&&(p=mt(p)),n=i,p==="")continue;let o;l===-1?o="":(o=e.slice(l+1,i===-1?void 0:i),s&&(o=mt(o))),r?(a[p]&&Array.isArray(a[p])||(a[p]=[]),a[p].push(o)):a[p]??(a[p]=o)}return t?a[t]:a},zr=er,Fr=(e,t)=>er(e,t,!0),Ct=decodeURIComponent,qt=e=>pt(e,Ct),Ce,D,G,tr,rr,Et,q,Wt,Br=(Wt=class{constructor(e,t="/",r=[[]]){w(this,G);b(this,"raw");w(this,Ce);w(this,D);b(this,"routeIndex",0);b(this,"path");b(this,"bodyCache",{});w(this,q,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const a=Object.keys(t)[0];return a?t[a].then(n=>(a==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,g(this,D,r),g(this,Ce,{})}param(e){return e?k(this,G,tr).call(this,e):k(this,G,rr).call(this)}query(e){return zr(this.url,e)}queries(e){return Fr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){return Tr(this,e)}json(){return u(this,q).call(this,"text").then(e=>JSON.parse(e))}text(){return u(this,q).call(this,"text")}arrayBuffer(){return u(this,q).call(this,"arrayBuffer")}bytes(){return u(this,q).call(this,"arrayBuffer").then(e=>new Uint8Array(e))}blob(){return u(this,q).call(this,"blob")}formData(){return u(this,q).call(this,"formData")}addValidatedData(e,t){u(this,Ce)[e]=t}valid(e){return u(this,Ce)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Pr](){return u(this,D)}get matchedRoutes(){return u(this,D)[0].map(([[,e]])=>e)}get routePath(){return u(this,D)[0].map(([[,e]])=>e)[this.routeIndex].path}},Ce=new WeakMap,D=new WeakMap,G=new WeakSet,tr=function(e){const t=u(this,D)[0][this.routeIndex][1][e],r=k(this,G,Et).call(this,t);return r&&/\%/.test(r)?qt(r):r},rr=function(){const e={},t=Object.keys(u(this,D)[0][this.routeIndex][1]);for(const r of t){const s=k(this,G,Et).call(this,u(this,D)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?qt(s):s)}return e},Et=function(e){return u(this,D)[1]?u(this,D)[1][e]:e},q=new WeakMap,Wt),Wr={Stringify:1},sr=async(e,t,r,s,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(a?a[0]+=e:a=[e],Promise.all(n.map(l=>l({phase:t,buffer:a,context:s}))).then(l=>Promise.all(l.filter(Boolean).map(p=>sr(p,t,!1,s,a))).then(()=>a[0]))):Promise.resolve(e)},Gr="text/plain; charset=UTF-8",gt=(e,t)=>({"Content-Type":e,...t}),Ie=(e,t)=>new Response(e,t),We,Ge,z,Ae,F,T,Ke,Oe,Pe,he,Ye,Ve,Z,Ee,Gt,Kr=(Gt=class{constructor(e,t){w(this,Z);w(this,We);w(this,Ge);b(this,"env",{});w(this,z);b(this,"finalized",!1);b(this,"error");w(this,Ae);w(this,F);w(this,T);w(this,Ke);w(this,Oe);w(this,Pe);w(this,he);w(this,Ye);w(this,Ve);b(this,"render",(...e)=>(u(this,Oe)??g(this,Oe,t=>this.html(t)),u(this,Oe).call(this,...e)));b(this,"setLayout",e=>g(this,Ke,e));b(this,"getLayout",()=>u(this,Ke));b(this,"setRenderer",e=>{g(this,Oe,e)});b(this,"header",(e,t,r)=>{this.finalized&&g(this,T,Ie(u(this,T).body,u(this,T)));const s=u(this,T)?u(this,T).headers:u(this,he)??g(this,he,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});b(this,"status",e=>{g(this,Ae,e)});b(this,"set",(e,t)=>{u(this,z)??g(this,z,new Map),u(this,z).set(e,t)});b(this,"get",e=>u(this,z)?u(this,z).get(e):void 0);b(this,"newResponse",(...e)=>k(this,Z,Ee).call(this,...e));b(this,"body",(e,t,r)=>k(this,Z,Ee).call(this,e,t,r));b(this,"text",(e,t,r)=>!u(this,he)&&!u(this,Ae)&&!t&&!r&&!this.finalized?new Response(e):k(this,Z,Ee).call(this,e,t,gt(Gr,r)));b(this,"json",(e,t,r)=>k(this,Z,Ee).call(this,JSON.stringify(e),t,gt("application/json",r)));b(this,"html",(e,t,r)=>{const s=a=>k(this,Z,Ee).call(this,a,t,gt("text/html; charset=UTF-8",r));return typeof e=="object"?sr(e,Wr.Stringify,!1,{}).then(s):s(e)});b(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});b(this,"notFound",()=>(u(this,Pe)??g(this,Pe,()=>Ie()),u(this,Pe).call(this,this)));g(this,We,e),t&&(g(this,F,t.executionCtx),this.env=t.env,g(this,Pe,t.notFoundHandler),g(this,Ve,t.path),g(this,Ye,t.matchResult))}get req(){return u(this,Ge)??g(this,Ge,new Br(u(this,We),u(this,Ve),u(this,Ye))),u(this,Ge)}get event(){if(u(this,F)&&"respondWith"in u(this,F))return u(this,F);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,F))return u(this,F);throw Error("This context has no ExecutionContext")}get res(){return u(this,T)||g(this,T,Ie(null,{headers:u(this,he)??g(this,he,new Headers)}))}set res(e){if(u(this,T)&&e){e=Ie(e.body,e);for(const[t,r]of u(this,T).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=u(this,T).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of s)e.headers.append("set-cookie",a)}else e.headers.set(t,r)}g(this,T,e),this.finalized=!0}get var(){return u(this,z)?Object.fromEntries(u(this,z)):{}}},We=new WeakMap,Ge=new WeakMap,z=new WeakMap,Ae=new WeakMap,F=new WeakMap,T=new WeakMap,Ke=new WeakMap,Oe=new WeakMap,Pe=new WeakMap,he=new WeakMap,Ye=new WeakMap,Ve=new WeakMap,Z=new WeakSet,Ee=function(e,t,r){const s=u(this,T)?new Headers(u(this,T).headers):u(this,he)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,l]of n)i.toLowerCase()==="set-cookie"?s.append(i,l):s.set(i,l)}if(r)for(const[n,i]of Object.entries(r))if(typeof i=="string")s.set(n,i);else{s.delete(n);for(const l of i)s.append(n,l)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??u(this,Ae);return Ie(e,{status:a,headers:s})},Gt),C="ALL",Yr="all",Vr=["get","post","put","delete","options","patch"],ar="Can not add a route since the matcher is already built.",nr=class extends Error{},Jr="__COMPOSED_HANDLER",Qr=e=>e.text("404 Not Found",404),zt=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},N,A,ir,H,le,tt,rt,Le,Xr=(Le=class{constructor(t={}){w(this,A);b(this,"get");b(this,"post");b(this,"put");b(this,"delete");b(this,"options");b(this,"patch");b(this,"all");b(this,"on");b(this,"use");b(this,"router");b(this,"getPath");b(this,"_basePath","/");w(this,N,"/");b(this,"routes",[]);w(this,H,Qr);b(this,"errorHandler",zt);b(this,"onError",t=>(this.errorHandler=t,this));b(this,"notFound",t=>(g(this,H,t),this));b(this,"fetch",(t,...r)=>k(this,A,rt).call(this,t,r[1],r[0],t.method));b(this,"request",(t,r,s,a)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${oe("/",t)}`,r),s,a)));b(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(k(this,A,rt).call(this,t.request,t,void 0,t.request.method))})});[...Vr,Yr].forEach(n=>{this[n]=(i,...l)=>(typeof i=="string"?g(this,N,i):k(this,A,le).call(this,n,u(this,N),i),l.forEach(p=>{k(this,A,le).call(this,n,u(this,N),p)}),this)}),this.on=(n,i,...l)=>{for(const p of[i].flat()){g(this,N,p);for(const o of[n].flat())l.map(c=>{k(this,A,le).call(this,o.toUpperCase(),u(this,N),c)})}return this},this.use=(n,...i)=>(typeof n=="string"?g(this,N,n):(g(this,N,"*"),i.unshift(n)),i.forEach(l=>{k(this,A,le).call(this,C,u(this,N),l)}),this);const{strict:s,...a}=t;Object.assign(this,a),this.getPath=s??!0?t.getPath??Xt:qr}route(t,r){const s=this.basePath(t);return r.routes.map(a=>{var i;let n;r.errorHandler===zt?n=a.handler:(n=async(l,p)=>(await Ut([],r.errorHandler)(l,()=>a.handler(l,p))).res,n[Jr]=a.handler),k(i=s,A,le).call(i,a.method,a.path,n,a.basePath)}),this}basePath(t){const r=k(this,A,ir).call(this);return r._basePath=oe(this._basePath,t),r}mount(t,r,s){let a,n;s&&(typeof s=="function"?n=s:(n=s.optionHandler,s.replaceRequest===!1?a=p=>p:a=s.replaceRequest));const i=n?p=>{const o=n(p);return Array.isArray(o)?o:[o]}:p=>{let o;try{o=p.executionCtx}catch{}return[p.env,o]};a||(a=(()=>{const p=oe(this._basePath,t),o=p==="/"?0:p.length;return c=>{const d=new URL(c.url);return d.pathname=this.getPath(c).slice(o)||"/",new Request(d,c)}})());const l=async(p,o)=>{const c=await r(a(p.req.raw),...i(p));if(c)return c;await o()};return k(this,A,le).call(this,C,oe(t,"*"),l),this}},N=new WeakMap,A=new WeakSet,ir=function(){const t=new Le({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,g(t,H,u(this,H)),t.routes=this.routes,t},H=new WeakMap,le=function(t,r,s,a){t=t.toUpperCase(),r=oe(this._basePath,r);const n={basePath:a!==void 0?oe(this._basePath,a):this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,n]),this.routes.push(n)},tt=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},rt=function(t,r,s,a){if(a==="HEAD")return(async()=>new Response(null,await k(this,A,rt).call(this,t,r,s,"GET")))();const n=this.getPath(t,{env:s}),i=this.router.match(a,n),l=new Kr(t,{path:n,matchResult:i,env:s,executionCtx:r,notFoundHandler:u(this,H)});if(i[0].length===1){let o;try{o=i[0][0][0][0](l,async()=>{l.res=await u(this,H).call(this,l)})}catch(c){return k(this,A,tt).call(this,c,l)}return o instanceof Promise?o.then(c=>c||(l.finalized?l.res:u(this,H).call(this,l))).catch(c=>k(this,A,tt).call(this,c,l)):o??u(this,H).call(this,l)}const p=Ut(i[0],this.errorHandler,u(this,H));return(async()=>{try{const o=await p(l);if(!o.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return o.res}catch(o){return k(this,A,tt).call(this,o,l)}})()},Le),or=[];function Zr(e,t){const r=this.buildAllMatchers(),s=((a,n)=>{const i=r[a]||r[C],l=i[2][n];if(l)return l;const p=n.match(i[0]);if(!p)return[[],or];const o=p.indexOf("",1);return[i[1][o],p]});return this.match=s,s(e,t)}var ot="[^/]+",ze=".*",Fe="(?:|/.*)",ke=Symbol(),es=new Set(".\\+*[^]$()");function ts(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===ze||e===Fe?1:t===ze||t===Fe?-1:e===ot?1:t===ot?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ue,fe,I,ve,rs=(ve=class{constructor(){w(this,ue);w(this,fe);w(this,I,Object.create(null))}insert(t,r,s,a,n){if(t.length===0){if(u(this,ue)!==void 0)throw ke;if(n)return;g(this,ue,r);return}const[i,...l]=t,p=i==="*"?l.length===0?["","",ze]:["","",ot]:i==="/*"?["","",Fe]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let o;if(p){const c=p[1];let d=p[2]||ot;if(c&&p[2]&&(d===".*"||(d=d.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(d))))throw ke;if(o=u(this,I)[d],!o){if(Object.keys(u(this,I)).some(h=>h!==ze&&h!==Fe))throw ke;if(n)return;o=u(this,I)[d]=new ve,c!==""&&g(o,fe,a.varIndex++)}!n&&c!==""&&s.push([c,u(o,fe)])}else if(o=u(this,I)[i],!o){if(Object.keys(u(this,I)).some(c=>c.length>1&&c!==ze&&c!==Fe))throw ke;if(n)return;o=u(this,I)[i]=new ve}o.insert(l,r,s,a,n)}buildRegExpStr(){const r=Object.keys(u(this,I)).sort(ts).map(s=>{const a=u(this,I)[s];return(typeof u(a,fe)=="number"?`(${s})@${u(a,fe)}`:es.has(s)?`\\${s}`:s)+a.buildRegExpStr()});return typeof u(this,ue)=="number"&&r.unshift(`#${u(this,ue)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},ue=new WeakMap,fe=new WeakMap,I=new WeakMap,ve),ct,Je,Kt,ss=(Kt=class{constructor(){w(this,ct,{varIndex:0});w(this,Je,new rs)}insert(e,t,r){const s=[],a=[];for(let i=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,p=>{const o=`@\\${i}`;return a[i]=[o,p],i++,l=!0,o}),!l)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=a.length-1;i>=0;i--){const[l]=a[i];for(let p=n.length-1;p>=0;p--)if(n[p].indexOf(l)!==-1){n[p]=n[p].replace(l,a[i][1]);break}}return u(this,Je).insert(n,t,s,u(this,ct),r),s}buildRegExp(){let e=u(this,Je).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,n,i)=>n!==void 0?(r[++t]=Number(n),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},ct=new WeakMap,Je=new WeakMap,Kt),as=[/^$/,[],Object.create(null)],st=Object.create(null);function lr(e){return st[e]??(st[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function ns(){st=Object.create(null)}function is(e){var o;const t=new ss,r=[];if(e.length===0)return as;const s=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,d],[h,m])=>c?1:h?-1:d.length-m.length),a=Object.create(null);for(let c=0,d=-1,h=s.length;c<h;c++){const[m,f,y]=s[c];m?a[f]=[y.map(([x])=>[x,Object.create(null)]),or]:d++;let v;try{v=t.insert(f,d,m)}catch(x){throw x===ke?new nr(f):x}m||(r[d]=y.map(([x,E])=>{const R=Object.create(null);for(E-=1;E>=0;E--){const[O,Ne]=v[E];R[O]=Ne}return[x,R]}))}const[n,i,l]=t.buildRegExp();for(let c=0,d=r.length;c<d;c++)for(let h=0,m=r[c].length;h<m;h++){const f=(o=r[c][h])==null?void 0:o[1];if(!f)continue;const y=Object.keys(f);for(let v=0,x=y.length;v<x;v++)f[y[v]]=l[f[y[v]]]}const p=[];for(const c in i)p[c]=r[i[c]];return[n,p,a]}function we(e,t){if(e){for(const r of Object.keys(e).sort((s,a)=>a.length-s.length))if(lr(r).test(t))return[...e[r]]}}var ee,te,dt,cr,Yt,os=(Yt=class{constructor(){w(this,dt);b(this,"name","RegExpRouter");w(this,ee);w(this,te);b(this,"match",Zr);g(this,ee,{[C]:Object.create(null)}),g(this,te,{[C]:Object.create(null)})}add(e,t,r){var l;const s=u(this,ee),a=u(this,te);if(!s||!a)throw new Error(ar);s[e]||[s,a].forEach(p=>{p[e]=Object.create(null),Object.keys(p[C]).forEach(o=>{p[e][o]=[...p[C][o]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const p=lr(t);e===C?Object.keys(s).forEach(o=>{var c;(c=s[o])[t]||(c[t]=we(s[o],t)||we(s[C],t)||[])}):(l=s[e])[t]||(l[t]=we(s[e],t)||we(s[C],t)||[]),Object.keys(s).forEach(o=>{(e===C||e===o)&&Object.keys(s[o]).forEach(c=>{p.test(c)&&s[o][c].push([r,n])})}),Object.keys(a).forEach(o=>{(e===C||e===o)&&Object.keys(a[o]).forEach(c=>p.test(c)&&a[o][c].push([r,n]))});return}const i=Zt(t)||[t];for(let p=0,o=i.length;p<o;p++){const c=i[p];Object.keys(a).forEach(d=>{var h;(e===C||e===d)&&((h=a[d])[c]||(h[c]=[...we(s[d],c)||we(s[C],c)||[]]),a[d][c].push([r,n-o+p+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(u(this,te)).concat(Object.keys(u(this,ee))).forEach(t=>{e[t]||(e[t]=k(this,dt,cr).call(this,t))}),g(this,ee,g(this,te,void 0)),ns(),e}},ee=new WeakMap,te=new WeakMap,dt=new WeakSet,cr=function(e){const t=[];let r=e===C;return[u(this,ee),u(this,te)].forEach(s=>{const a=s[e]?Object.keys(s[e]).map(n=>[n,s[e][n]]):[];a.length!==0?(r||(r=!0),t.push(...a)):e!==C&&t.push(...Object.keys(s[C]).map(n=>[n,s[C][n]]))}),r?is(t):null},Yt),re,B,Vt,ls=(Vt=class{constructor(e){b(this,"name","SmartRouter");w(this,re,[]);w(this,B,[]);g(this,re,e.routers)}add(e,t,r){if(!u(this,B))throw new Error(ar);u(this,B).push([e,t,r])}match(e,t){if(!u(this,B))throw new Error("Fatal error");const r=u(this,re),s=u(this,B),a=r.length;let n=0,i;for(;n<a;n++){const l=r[n];try{for(let p=0,o=s.length;p<o;p++)l.add(...s[p]);i=l.match(e,t)}catch(p){if(p instanceof nr)continue;throw p}this.match=l.match.bind(l),g(this,re,[l]),g(this,B,void 0);break}if(n===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(u(this,B)||u(this,re).length!==1)throw new Error("No active router has been determined yet.");return u(this,re)[0]}},re=new WeakMap,B=new WeakMap,Vt),Me=Object.create(null),cs=e=>{for(const t in e)return!0;return!1},se,P,me,Te,L,U,J,_e,ds=(_e=class{constructor(t,r,s){w(this,U);w(this,se);w(this,P);w(this,me);w(this,Te,0);w(this,L,Me);if(g(this,P,s||Object.create(null)),g(this,se,[]),t&&r){const a=Object.create(null);a[t]={handler:r,possibleKeys:[],score:0},g(this,se,[a])}g(this,me,[])}insert(t,r,s){g(this,Te,++It(this,Te)._);let a=this;const n=Nr(r),i=[];for(let l=0,p=n.length;l<p;l++){const o=n[l],c=n[l+1],d=Mr(o,c),h=Array.isArray(d)?d[0]:o;if(h in u(a,P)){a=u(a,P)[h],d&&i.push(d[1]);continue}u(a,P)[h]=new _e,d&&(u(a,me).push(d),i.push(d[1])),a=u(a,P)[h]}return u(a,se).push({[t]:{handler:s,possibleKeys:i.filter((l,p,o)=>o.indexOf(l)===p),score:u(this,Te)}}),a}search(t,r){var c;const s=[];g(this,L,Me);let n=[this];const i=Qt(r),l=[],p=i.length;let o=null;for(let d=0;d<p;d++){const h=i[d],m=d===p-1,f=[];for(let v=0,x=n.length;v<x;v++){const E=n[v],R=u(E,P)[h];R&&(g(R,L,u(E,L)),m?(u(R,P)["*"]&&k(this,U,J).call(this,s,u(R,P)["*"],t,u(E,L)),k(this,U,J).call(this,s,R,t,u(E,L))):f.push(R));for(let O=0,Ne=u(E,me).length;O<Ne;O++){const ye=u(E,me)[O],j=u(E,L)===Me?{}:{...u(E,L)};if(ye==="*"){const Y=u(E,P)["*"];Y&&(k(this,U,J).call(this,s,Y,t,u(E,L)),g(Y,L,j),f.push(Y));continue}const[ht,Ze,ne]=ye;if(!h&&!(ne instanceof RegExp))continue;const $=u(E,P)[ht];if(ne instanceof RegExp){if(o===null){o=new Array(p);let V=r[0]==="/"?1:0;for(let ie=0;ie<p;ie++)o[ie]=V,V+=i[ie].length+1}const Y=r.substring(o[d]),be=ne.exec(Y);if(be){if(j[Ze]=be[0],k(this,U,J).call(this,s,$,t,u(E,L),j),be[0].length===Y.length&&u($,P)["*"]&&k(this,U,J).call(this,s,u($,P)["*"],t,u(E,L),j),cs(u($,P))){g($,L,j);const V=((c=be[0].match(/\//))==null?void 0:c.length)??0;(l[V]||(l[V]=[])).push($)}continue}}(ne===!0||ne.test(h))&&(j[Ze]=h,m?(k(this,U,J).call(this,s,$,t,j,u(E,L)),u($,P)["*"]&&k(this,U,J).call(this,s,u($,P)["*"],t,j,u(E,L))):(g($,L,j),f.push($)))}}const y=l.shift();n=y?f.concat(y):f}return s.length>1&&s.sort((d,h)=>d.score-h.score),[s.map(({handler:d,params:h})=>[d,h])]}},se=new WeakMap,P=new WeakMap,me=new WeakMap,Te=new WeakMap,L=new WeakMap,U=new WeakSet,J=function(t,r,s,a,n){for(let i=0,l=u(r,se).length;i<l;i++){const p=u(r,se)[i],o=p[s]||p[C],c={};if(o!==void 0&&(o.params=Object.create(null),t.push(o),a!==Me||n&&n!==Me))for(let d=0,h=o.possibleKeys.length;d<h;d++){const m=o.possibleKeys[d],f=c[o.score];o.params[m]=n!=null&&n[m]&&!f?n[m]:a[m]??(n==null?void 0:n[m]),c[o.score]=!0}}},_e),ge,Jt,ps=(Jt=class{constructor(){b(this,"name","TrieRouter");w(this,ge);g(this,ge,new ds)}add(e,t,r){const s=Zt(t);if(s){for(let a=0,n=s.length;a<n;a++)u(this,ge).insert(e,s[a],r);return}u(this,ge).insert(e,t,r)}match(e,t){return u(this,ge).search(e,t)}},ge=new WeakMap,Jt),At=class extends Xr{constructor(e={}){super(e),this.router=e.router??new ls({routers:[new os,new ps]})}},dr=/^[\w!#$%&'*.^`|~+-]+$/,hs=/^[ !#-:<-[\]-~]*$/,Ft=e=>{let t=0,r=e.length;for(;t<r;){const s=e.charCodeAt(t);if(s!==32&&s!==9)break;t++}for(;r>t;){const s=e.charCodeAt(r-1);if(s!==32&&s!==9)break;r--}return t===0&&r===e.length?e:e.slice(t,r)},us=(e,t)=>{if(t&&e.indexOf(t)===-1)return{};const r=e.split(";"),s=Object.create(null);for(const a of r){const n=a.indexOf("=");if(n===-1)continue;const i=Ft(a.substring(0,n));if(t&&t!==i||!dr.test(i)||i in s)continue;let l=Ft(a.substring(n+1));if(l.startsWith('"')&&l.endsWith('"')&&(l=l.slice(1,-1)),hs.test(l)&&(s[i]=l.indexOf("%")!==-1?pt(l,Ct):l,t))break}return s},fs=(e,t,r={})=>{if(!dr.test(e))throw new Error("Invalid cookie name");let s=`${e}=${t}`;if(e.startsWith("__Secure-")&&!r.secure)throw new Error("__Secure- Cookie must have Secure attributes");if(e.startsWith("__Host-")){if(!r.secure)throw new Error("__Host- Cookie must have Secure attributes");if(r.path!=="/")throw new Error('__Host- Cookie must have Path attributes with "/"');if(r.domain)throw new Error("__Host- Cookie must not have Domain attributes")}for(const a of["domain","path","sameSite","priority"])if(r[a]&&/[;\r\n]/.test(r[a]))throw new Error(`${a} must not contain ";", "\\r", or "\\n"`);if(r&&typeof r.maxAge=="number"&&r.maxAge>=0){if(r.maxAge>3456e4)throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");s+=`; Max-Age=${r.maxAge|0}`}if(r.domain&&r.prefix!=="host"&&(s+=`; Domain=${r.domain}`),r.path&&(s+=`; Path=${r.path}`),r.expires){if(r.expires.getTime()-Date.now()>3456e7)throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");s+=`; Expires=${r.expires.toUTCString()}`}if(r.httpOnly&&(s+="; HttpOnly"),r.secure&&(s+="; Secure"),r.sameSite&&(s+=`; SameSite=${r.sameSite.charAt(0).toUpperCase()+r.sameSite.slice(1)}`),r.priority&&(s+=`; Priority=${r.priority.charAt(0).toUpperCase()+r.priority.slice(1)}`),r.partitioned){if(!r.secure)throw new Error("Partitioned Cookie must have Secure attributes");s+="; Partitioned"}return s},vt=(e,t,r)=>(t=encodeURIComponent(t),fs(e,t,r)),pr=(e,t,r)=>{const s=e.req.raw.headers.get("Cookie");{if(!s)return;let a=t;return r==="secure"?a="__Secure-"+t:r==="host"&&(a="__Host-"+t),us(s,a)[a]}},ms=(e,t,r)=>{let s;return(r==null?void 0:r.prefix)==="secure"?s=vt("__Secure-"+e,t,{path:"/",...r,secure:!0}):(r==null?void 0:r.prefix)==="host"?s=vt("__Host-"+e,t,{...r,path:"/",secure:!0,domain:void 0}):s=vt(e,t,{path:"/",...r}),s},hr=(e,t,r,s)=>{const a=ms(t,r,s);e.header("Set-Cookie",a,{append:!0})},gs=(e,t,r)=>{const s=pr(e,t,r==null?void 0:r.prefix);return hr(e,t,"",{...r,maxAge:0}),s};typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);function Ot(e){return Q(e)}const ae=new At;ae.use("*",async(e,t)=>{const r=new URL(e.req.url).pathname;if(r==="/admin/login"||r.startsWith("/static/"))return t();const s=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return pr(e,"codeward_admin_session")===s?t():e.redirect("/admin/login")});ae.get("/login",e=>{const t=`<!DOCTYPE html>
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
</html>`;return e.html(t)});ae.post("/login",async e=>{const t=await e.req.parseBody(),r=e.env.ADMIN_USERNAME||process.env.ADMIN_USERNAME||"kelvin.reallife8@gmail.com",s=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return t.username===r&&t.password===s?(hr(e,"codeward_admin_session",s,{path:"/admin",httpOnly:!0,secure:!0,maxAge:3600*24*7}),e.redirect("/admin")):e.redirect("/admin/login?error=1")});ae.get("/logout",e=>(gs(e,"codeward_admin_session",{path:"/admin"}),e.redirect("/admin/login")));const at={"software-engineer":"Software Engineer","senior-engineer":"Senior / Staff Engineer","engineering-lead":"Engineering Lead / Manager","cto-vp":"CTO / VP of Engineering","devops-platform":"DevOps / Platform Engineer","security-engineer":"Security Engineer",freelancer:"Freelance Developer","open-source":"Open Source Contributor",student:"Student / Bootcamp",founder:"Founder / Indie Hacker",other:"Other"};function M(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function xe(e){if(e==null)return"";const t=String(e);return/[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}ae.get("/",async e=>{var Tt,_t,$t,jt,Dt,Nt;const{env:t}=e,r=new URL(e.req.url),s=(r.searchParams.get("q")||"").trim(),a=(r.searchParams.get("role")||"").trim(),n=Math.max(1,parseInt(r.searchParams.get("page")||"1",10)||1),i=25,l=r.searchParams.get("msg")||"";let p="";l==="retrigger_success"?p='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; font-weight: 500; display: flex; align-items: center; gap: 8px;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg> Email successfully resent!</div>':l==="retrigger_failed"&&(p='<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #ef4444; padding: 12px 16px; border-radius: 8px; margin-bottom: 24px; font-weight: 500; display: flex; align-items: center; gap: 8px;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg> Failed to resend email. Please check the logs.</div>');let o="WHERE 1=1";const c=[];let d=1;if(s){o+=` AND (LOWER(name) LIKE $${d++} OR LOWER(email) LIKE $${d++} OR LOWER(company) LIKE $${d++})`;const S=`%${s.toLowerCase()}%`;c.push(S,S,S)}a&&(o+=` AND role = $${d++}`,c.push(a));const h=await Ot(e).connect(),m=await h.query(`SELECT COUNT(*) as cnt FROM waitlist_entries ${o}`,c),f=Number(((Tt=m.rows[0])==null?void 0:Tt.cnt)??0),y=Math.max(1,Math.ceil(f/i)),v=Math.min(n,y),x=(v-1)*i,E=[...c,i,x],O=(await h.query(`SELECT id, name, email, role, company, github, position, created_at, email_sent, linkedin_clicked
     FROM waitlist_entries ${o}
     ORDER BY created_at DESC
     LIMIT $${d++} OFFSET $${d++}`,E)).rows||[],Ne=await h.query("SELECT COUNT(*) as cnt FROM waitlist_entries"),ye=Number(((_t=Ne.rows[0])==null?void 0:_t.cnt)??0),j=await h.query(`SELECT 
       SUM(CASE WHEN email_sent = 1 THEN 1 ELSE 0 END) as sent,
       SUM(CASE WHEN email_sent = 0 THEN 1 ELSE 0 END) as failed
     FROM waitlist_entries`),ht=Number((($t=j.rows[0])==null?void 0:$t.sent)??0),Ze=Number(((jt=j.rows[0])==null?void 0:jt.failed)??0),ne=await h.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE"),$=Number(((Dt=ne.rows[0])==null?void 0:Dt.cnt)??0),be=(await h.query("SELECT role, COUNT(*) as cnt FROM waitlist_entries GROUP BY role ORDER BY cnt DESC")).rows,V=await h.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE company IS NOT NULL AND company != ''"),ie=Number(((Nt=V.rows[0])==null?void 0:Nt.cnt)??0),wr=Object.entries(at).map(([S,_])=>`<option value="${S}" ${a===S?"selected":""}>${M(_)}</option>`).join(""),xr=O.length?O.map(S=>{const _=new Date(S.created_at+"Z"),He=isNaN(_.getTime())?S.created_at:_.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})+" · "+_.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"});return`
        <tr>
          <td class="pos-cell">#${616+S.position}</td>
          <td>
            <div class="name-cell">${M(S.name)}</div>
            <div class="email-cell">${M(S.email)}</div>
          </td>
          <td><span class="role-badge">${M(at[S.role]||S.role)}</span></td>
          <td>${S.company?M(S.company):'<span class="muted">—</span>'}</td>
          <td>${S.github?`<a href="${M(S.github)}" target="_blank" rel="noopener" class="github-link">${M(S.github.replace(/^https?:\/\/(www\.)?github\.com\//,"@"))}</a>`:'<span class="muted">—</span>'}</td>
          <td class="date-cell">${He}</td>
          <td>
            ${S.email_sent===1?'<span class="role-badge" style="background:#059669;color:#fff;">Sent</span>':`<div style="display:flex;gap:8px;align-items:center;">
                   <span class="role-badge" style="background:#dc2626;color:#fff;">Failed</span>
                   <form method="post" action="/admin/retrigger" style="margin:0;">
                     <input type="hidden" name="email" value="${M(S.email)}" />
                     <button type="submit" class="filter-btn" style="padding:2px 8px;font-size:11px;">Retrigger</button>
                   </form>
                 </div>`}
          </td>
          <td>
            ${S.linkedin_clicked===1?'<span class="role-badge" style="background:#0077b5;color:#fff;">Yes</span>':'<span class="role-badge" style="opacity:0.5;">No</span>'}
          </td>
        </tr>`}).join(""):'<tr><td colspan="7" class="empty-row">No waitlist entries match your filters.</td></tr>',Er=(be||[]).map(S=>{const _=Number(S.cnt),He=ye?Math.round(_/ye*100):0;return`
      <div class="role-bar-row">
        <div class="role-bar-label">${M(at[S.role]||S.role)}</div>
        <div class="role-bar-track"><div class="role-bar-fill" style="width:${He}%"></div></div>
        <div class="role-bar-count">${_}</div>
      </div>`}).join(""),ut=S=>{const _=new URLSearchParams;return s&&_.set("q",s),a&&_.set("role",a),_.set("page",String(v)),Object.entries(S).forEach(([He,Sr])=>_.set(He,String(Sr))),"?"+_.toString()},kr=`<!DOCTYPE html>
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

  ${p}

  <section class="stats-row" style="grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));">
    <div class="stat-card">
      <span class="stat-num">${ye.toLocaleString()}</span>
      <span class="stat-label">total signups</span>
    </div>
    <div class="stat-card">
      <span class="stat-num accent">+${$.toLocaleString()}</span>
      <span class="stat-label">joined today</span>
    </div>
    <div class="stat-card">
      <span class="stat-num">${ie.toLocaleString()}</span>
      <span class="stat-label">with company listed</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#10b981;">${ht.toLocaleString()}</span>
      <span class="stat-label">emails sent</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#ef4444;">${Ze.toLocaleString()}</span>
      <span class="stat-label">emails failed</span>
    </div>
  </section>

  <section class="panel role-breakdown-panel">
    <h2 class="panel-title">Role breakdown</h2>
    <div class="role-bars">
      ${Er||'<p class="muted">No data yet.</p>'}
    </div>
  </section>

  <section class="panel">
    <div class="panel-toolbar">
      <h2 class="panel-title">Waitlist entries</h2>
      <a class="export-btn" href="/admin/export.csv${s||a?ut({}):""}">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        Export CSV
      </a>
    </div>

    <form class="filter-bar" method="get" action="/admin">
      <input type="text" name="q" placeholder="Search name, email, or company…" value="${M(s)}" class="search-input"/>
      <select name="role" class="role-select">
        <option value="">All roles</option>
        ${wr}
      </select>
      <button type="submit" class="filter-btn">Filter</button>
      ${s||a?'<a href="/admin" class="clear-btn">Clear</a>':""}
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
          ${xr}
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <span class="page-info">Showing ${O.length?x+1:0}–${x+O.length} of ${f.toLocaleString()}</span>
      <div class="page-buttons">
        <a href="/admin${ut({page:Math.max(1,v-1)})}" class="page-btn ${v<=1?"disabled":""}">&larr; Prev</a>
        <span class="page-current">Page ${v} of ${y}</span>
        <a href="/admin${ut({page:Math.min(y,v+1)})}" class="page-btn ${v>=y?"disabled":""}">Next &rarr;</a>
      </div>
    </div>
  </section>

</div>
</body>
</html>`;return e.html(kr)});ae.get("/export.csv",async e=>{const{env:t}=e,r=new URL(e.req.url),s=(r.searchParams.get("q")||"").trim(),a=(r.searchParams.get("role")||"").trim();let n="WHERE 1=1";const i=[];let l=1;if(s){n+=` AND (LOWER(name) LIKE $${l++} OR LOWER(email) LIKE $${l++} OR LOWER(company) LIKE $${l++})`;const f=`%${s.toLowerCase()}%`;i.push(f,f,f)}a&&(n+=` AND role = $${l++}`,i.push(a));const c=(await(await Ot(e).connect()).query(`SELECT id, name, email, role, company, github, position, created_at
     FROM waitlist_entries ${n}
     ORDER BY created_at ASC`,i)).rows||[],h=[["Position","Name","Email","Role","Company","GitHub","Joined At (UTC)"].join(",")];for(const f of c)h.push([616+f.position,xe(f.name),xe(f.email),xe(at[f.role]||f.role),xe(f.company||""),xe(f.github||""),xe(f.created_at)].join(","));const m=h.join(`
`);return new Response(m,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="codeward-waitlist-${new Date().toISOString().slice(0,10)}.csv"`}})});ae.post("/retrigger",async e=>{const{env:t}=e,s=((await e.req.parseBody()).email||"").toString().trim();if(!s)return e.redirect("/admin");const a=await Ot(e).connect(),i=(await a.query("SELECT name, position FROM waitlist_entries WHERE email = $1",[s])).rows[0];return i&&await ur(t,s,i.name,i.position)?(await a.query("UPDATE waitlist_entries SET email_sent = 1 WHERE email = $1",[s]),e.redirect("/admin?msg=retrigger_success")):e.redirect("/admin?msg=retrigger_failed")});typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);function vs(e){const s=`https://${new URL(e).hostname}/sql`;async function a(i,l=[]){const p=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","Neon-Connection-String":e},body:JSON.stringify({query:i,params:l})});if(!p.ok){const c=await p.text();throw new Error(`DB error ${p.status}: ${c}`)}const o=await p.json();return{rows:o.rows??[],rowCount:o.rowCount??0}}async function n(i,...l){let p="";const o=[];return i.forEach((c,d)=>{p+=c,d<l.length&&(o.push(l[d]===void 0?null:l[d]),p+=`$${o.length}`)}),a(p,o)}return n.connect=async()=>({query:a,release:()=>{}}),n.query=a,n}let yt=null;function Q(e){var t,r,s;if(!yt){const a=((t=e==null?void 0:e.env)==null?void 0:t.POSTGRES_URL)||((r=e==null?void 0:e.env)==null?void 0:r.DATABASE_POSTGRES_URL)||((s=e==null?void 0:e.env)==null?void 0:s.DATABASE_URL)||(typeof process<"u"&&process.env?process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL:void 0);if(!a)throw new Error("No database connection string found in environment");yt=vs(a)}return yt}function Se(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const K=new At;K.onError((e,t)=>(console.error("Hono Global Error:",e),t.json({error:e.message||"Internal Server Error"},500)));K.route("/admin",ae);K.get("/terms",e=>e.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Terms & Privacy Policy — Codeward</title>
  <meta name="description" content="Codeward's Terms of Service and Privacy Policy outlining our commitment to data privacy, security, and developer control." />
  <link rel="icon" type="image/gif" href="/static/images/logo.gif" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/static/style.css?v=4" />
  <style>
    .legal-container {
      max-width: 760px;
      margin: 0 auto;
      padding: 60px 24px 100px;
    }
    .legal-header {
      margin-bottom: 48px;
      padding-bottom: 32px;
      border-bottom: 1px solid var(--border);
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--muted);
      font-size: 14px;
      text-decoration: none;
      margin-bottom: 24px;
      transition: color 0.2s;
    }
    .back-link:hover {
      color: var(--brand-green);
    }
    .legal-title {
      font-size: 36px;
      font-weight: 700;
      color: var(--text);
      letter-spacing: -0.02em;
      margin-bottom: 12px;
    }
    .legal-updated {
      font-size: 14px;
      color: var(--muted);
    }
    .legal-section {
      margin-bottom: 40px;
    }
    .legal-section h2 {
      font-size: 20px;
      font-weight: 600;
      color: var(--brand-green);
      margin-bottom: 16px;
      letter-spacing: -0.01em;
    }
    .legal-section p {
      font-size: 16px;
      color: #a1a1aa;
      line-height: 1.7;
      margin-bottom: 16px;
    }
    .legal-section ul {
      margin: 0 0 16px 20px;
      color: #a1a1aa;
      line-height: 1.7;
    }
    .legal-section li {
      margin-bottom: 8px;
    }
    .legal-footer {
      margin-top: 60px;
      padding-top: 32px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--muted);
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="legal-container">
    <div class="legal-header">
      <a href="/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Waitlist
      </a>
      <h1 class="legal-title">Terms & Privacy Policy</h1>
      <p class="legal-updated">Last updated: July 2026</p>
    </div>

    <div class="legal-section">
      <h2>1. Data Privacy Guarantee</h2>
      <p>Your privacy is our top priority. We only collect the information provided in our waitlist form (name, email address, company/organisation, role, and GitHub profile) for the explicit purpose of managing your waitlist position and notifying you when Codeward early access is ready.</p>
      <p>We strictly do not sell your personal data, send unsolicited spam, or share your information with unapproved third parties.</p>
    </div>

    <div class="legal-section">
      <h2>2. Information Collection & Usage</h2>
      <p>When you sign up for the Codeward waitlist, we collect:</p>
      <ul>
        <li><strong>Full Name & Email Address:</strong> Used to identify your reservation and send access notifications.</li>
        <li><strong>Role & Company:</strong> Used to prioritize sandbox provisioning for developer teams.</li>
        <li><strong>GitHub Profile:</strong> Optional information to verify developer identity for early preview access.</li>
      </ul>
    </div>

    <div class="legal-section">
      <h2>3. Security & Control</h2>
      <p>All waitlist data is encrypted in transit using standard TLS protocols and stored securely in our database. We maintain strict access controls so your contact details remain protected.</p>
      <p>You have full ownership of your data. You may request complete removal of your email and personal details from our system at any time by contacting our support team.</p>
    </div>

    <div class="legal-section">
      <h2>4. Terms of Service</h2>
      <p>By submitting the waitlist form, you agree to receive communications regarding Codeward's progress, product launches, and access invitations. Early access spots are allocated at Codeward's discretion based on capacity.</p>
    </div>

    <div class="legal-section">
      <h2>5. Contact Us</h2>
      <p>If you have any questions regarding these terms or your personal data, please reach out to us at <a href="mailto:support@codeward.ai" style="color: var(--brand-green); text-decoration: underline;">support@codeward.ai</a>.</p>
    </div>

    <div class="legal-footer">
      <span>&copy; ${new Date().getFullYear()} Codeward. All rights reserved.</span>
      <a href="/" class="back-link" style="margin-bottom: 0;">Back to Home</a>
    </div>
  </div>
</body>
</html>`));const ce=617;K.get("/api/stats",async e=>{var a;const{env:t}=e,{rows:r}=await Q(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,s=Number(((a=r[0])==null?void 0:a.cnt)??0);return e.json({count:ce+s})});function ys(e){function t(f,y){const v=(f&65535)+(y&65535);return(f>>16)+(y>>16)+(v>>16)<<16|v&65535}function r(f,y){return f<<y|f>>>32-y}function s(f,y,v,x,E,R){return t(r(t(t(y,f),t(x,R)),E),v)}function a(f,y,v,x,E,R,O){return s(y&v|~y&x,f,y,E,R,O)}function n(f,y,v,x,E,R,O){return s(y&x|v&~x,f,y,E,R,O)}function i(f,y,v,x,E,R,O){return s(y^v^x,f,y,E,R,O)}function l(f,y,v,x,E,R,O){return s(v^(y|~x),f,y,E,R,O)}function p(f){const y=(f.length+8>>6)+1,v=new Array(y*16).fill(0);for(let x=0;x<f.length;x++)v[x>>2]|=f.charCodeAt(x)<<x%4*8;return v[f.length>>2]|=128<<f.length%4*8,v[y*16-2]=f.length*8,v}const o=p(e.toLowerCase().trim());let c=1732584193,d=-271733879,h=-1732584194,m=271733878;for(let f=0;f<o.length;f+=16){const[y,v,x,E]=[c,d,h,m];c=a(c,d,h,m,o[f+0],7,-680876936),d=a(m,c,d,h,o[f+1],12,-389564586),h=a(h,m,c,d,o[f+2],17,606105819),m=a(d,h,m,c,o[f+3],22,-1044525330),c=a(c,d,h,m,o[f+4],7,-176418897),d=a(m,c,d,h,o[f+5],12,1200080426),h=a(h,m,c,d,o[f+6],17,-1473231341),m=a(d,h,m,c,o[f+7],22,-45705983),c=a(c,d,h,m,o[f+8],7,1770035416),d=a(m,c,d,h,o[f+9],12,-1958414417),h=a(h,m,c,d,o[f+10],17,-42063),m=a(d,h,m,c,o[f+11],22,-1990404162),c=a(c,d,h,m,o[f+12],7,1804603682),d=a(m,c,d,h,o[f+13],12,-40341101),h=a(h,m,c,d,o[f+14],17,-1502002290),m=a(d,h,m,c,o[f+15],22,1236535329),c=n(c,d,h,m,o[f+1],5,-165796510),d=n(m,c,d,h,o[f+6],9,-1069501632),h=n(h,m,c,d,o[f+11],14,643717713),m=n(d,h,m,c,o[f+0],20,-373897302),c=n(c,d,h,m,o[f+5],5,-701558691),d=n(m,c,d,h,o[f+10],9,38016083),h=n(h,m,c,d,o[f+15],14,-660478335),m=n(d,h,m,c,o[f+4],20,-405537848),c=n(c,d,h,m,o[f+9],5,568446438),d=n(m,c,d,h,o[f+14],9,-1019803690),h=n(h,m,c,d,o[f+3],14,-187363961),m=n(d,h,m,c,o[f+8],20,1163531501),c=n(c,d,h,m,o[f+13],5,-1444681467),d=n(m,c,d,h,o[f+2],9,-51403784),h=n(h,m,c,d,o[f+7],14,1735328473),m=n(d,h,m,c,o[f+12],20,-1926607734),c=i(c,d,h,m,o[f+5],4,-378558),d=i(m,c,d,h,o[f+8],11,-2022574463),h=i(h,m,c,d,o[f+11],16,1839030562),m=i(d,h,m,c,o[f+14],23,-35309556),c=i(c,d,h,m,o[f+1],4,-1530992060),d=i(m,c,d,h,o[f+4],11,1272893353),h=i(h,m,c,d,o[f+7],16,-155497632),m=i(d,h,m,c,o[f+10],23,-1094730640),c=i(c,d,h,m,o[f+13],4,681279174),d=i(m,c,d,h,o[f+0],11,-358537222),h=i(h,m,c,d,o[f+3],16,-722521979),m=i(d,h,m,c,o[f+6],23,76029189),c=i(c,d,h,m,o[f+9],4,-640364487),d=i(m,c,d,h,o[f+12],11,-421815835),h=i(h,m,c,d,o[f+15],16,530742520),m=i(d,h,m,c,o[f+2],23,-995338651),c=l(c,d,h,m,o[f+0],6,-198630844),d=l(m,c,d,h,o[f+7],10,1126891415),h=l(h,m,c,d,o[f+14],15,-1416354905),m=l(d,h,m,c,o[f+5],21,-57434055),c=l(c,d,h,m,o[f+12],6,1700485571),d=l(m,c,d,h,o[f+3],10,-1894986606),h=l(h,m,c,d,o[f+10],15,-1051523),m=l(d,h,m,c,o[f+1],21,-2054922799),c=l(c,d,h,m,o[f+8],6,1873313359),d=l(m,c,d,h,o[f+15],10,-30611744),h=l(h,m,c,d,o[f+6],15,-1560198380),m=l(d,h,m,c,o[f+13],21,1309151649),c=l(c,d,h,m,o[f+4],6,-145523070),d=l(m,c,d,h,o[f+11],10,-1120210379),h=l(h,m,c,d,o[f+2],15,718787259),m=l(d,h,m,c,o[f+9],21,-343485551),c=t(c,y),d=t(d,v),h=t(h,x),m=t(m,E)}return[c,d,h,m].map(f=>{let y="";for(let v=0;v<4;v++)y+=("0"+(f>>v*8&255).toString(16)).slice(-2);return y}).join("")}K.get("/api/avatars",async e=>{try{const{rows:t}=await Q(e)`SELECT name, email FROM waitlist_entries ORDER BY id DESC LIMIT 8`,r=t.map(s=>{let a="";try{a=ys(s.email||"")}catch{}const n=(s.name||"").trim(),i=n.split(" ")[0]||"",l=n.split(" ")[1]||"";return{initials:((i[0]||"")+(l[0]||"")).toUpperCase()||"?",emailHash:a}});return e.json({avatars:r},200,{"Cache-Control":"public, max-age=60"})}catch{return e.json({avatars:[]})}});K.post("/api/join",async e=>{const{env:t}=e;let r;try{r=await e.req.json()}catch{return e.json({error:"Invalid request body"},400)}const s=(r.name||"").toString().trim(),a=(r.email||"").toString().trim().toLowerCase(),n=(r.role||"").toString().trim(),i=(r.company||"").toString().trim(),l=(r.github||"").toString().trim();if(s.length<2)return e.json({error:"Please enter your full name."},400);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a))return e.json({error:"Please enter a valid email address."},400);if(!n)return e.json({error:"Please select your role."},400);const{rows:p}=await Q(e)`SELECT id, position FROM waitlist_entries WHERE email = ${a}`,o=p[0];if(o){const{rows:y}=await Q(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,v=y[0];return e.json({alreadyJoined:!0,position:ce+Number(o.position),total:ce+Number((v==null?void 0:v.cnt)??0)})}const{rows:c}=await Q(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,d=c[0],h=Number((d==null?void 0:d.cnt)??0)+1;await Q(e)`INSERT INTO waitlist_entries (name, email, role, company, github, position) VALUES (${s}, ${a}, ${n}, ${i||null}, ${l||null}, ${h})`;let m=0;if(process.env.RESEND_API_KEY){await ur(t,a,s,h)&&(m=1);try{await bs(t,s,a,n,i,l,ce+h)}catch(v){console.error("Failed sending admin notification email:",v)}}return await Q(e)`UPDATE waitlist_entries SET email_sent = ${m} WHERE email = ${a}`,e.json({success:!0,position:ce+h,total:ce+Number((d==null?void 0:d.cnt)??0)+1})});async function ur(e,t,r,s){const a=e.RESEND_API_KEY||process.env.RESEND_API_KEY;if(!a)return!1;try{const n=(ce+s).toLocaleString(),i=`<!DOCTYPE html>
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
        Hi ${Se(r)} — thanks for requesting early access to Codeward. I wanted to reach out myself rather than send a form reply.
      </p>
      <p style="font-size:14.5px;line-height:23px;color:#c9d1d9;margin:0 0 14px;text-align:left;">
        You're joining <strong style="color:#ffffff;">${n} other engineers</strong> already in queue. We're rolling out access to a small group of teams at a time, on purpose — every new repo we onboard gets run through all 11 of our review agents, and we'd rather scale that carefully than rush it and give you a worse first run.
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
</html>`,l=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward <waitlist@codeward.cloud>",to:[t],subject:"You are on the Codeward waitlist",html:i})});if(!l.ok){const p=await l.text();console.error("Resend API Error:",l.status,p)}return l.ok}catch(n){return console.error("Failed to send email",n),!1}}async function bs(e,t,r,s,a,n,i){const l=e.RESEND_API_KEY||process.env.RESEND_API_KEY;if(!l)return!1;try{const p=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward System <waitlist@codeward.cloud>",to:["kelvin.reallife8@gmail.com"],subject:`New Waitlist Sign-up: ${t}`,html:`
          <h3>New Waitlist Sign-up Details</h3>
          <p><strong>Name:</strong> ${Se(t)}</p>
          <p><strong>Email:</strong> ${Se(r)}</p>
          <p><strong>Role:</strong> ${Se(s)}</p>
          <p><strong>Company:</strong> ${Se(a||"None")}</p>
          <p><strong>GitHub:</strong> ${Se(n||"None")}</p>
          <p><strong>Position:</strong> #${i}</p>
        `})});if(!p.ok){const o=await p.text();console.error("Resend API Error (Admin Notification):",p.status,o)}return p.ok}catch(p){return console.error("Failed to send admin email",p),!1}}K.post("/api/track-linkedin",async e=>{const{env:t}=e;let r;try{r=await e.req.json()}catch{return e.json({error:"Invalid body"},400)}return r.email&&await sql`UPDATE waitlist_entries SET linkedin_clicked = 1 WHERE email = ${r.email}`,e.json({success:!0})});K.get("/",e=>(e.header("Cache-Control","no-store, no-cache, must-revalidate, proxy-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(ws)));const ws=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Codeward — Ephemeral Sandbox Code Review & Automated PR Agents</title>
<meta name="description" content="Codeward runs your actual code inside an ephemeral sandbox — 120+ checks, 11 specialised agents, and hard merge blocks on critical findings. Join the private beta waitlist."/>
<meta name="keywords" content="automated code review, code review agents, ephemeral sandbox, pull request automated testing, security audit CI, codeward, continuous compliance, flaky test detection"/>
<link rel="canonical" href="https://waitlist.codeward.cloud/"/>

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://waitlist.codeward.cloud/"/>
<meta property="og:title" content="Codeward — Ephemeral Sandbox Code Review & Automated PR Agents"/>
<meta property="og:description" content="Codeward runs your actual code inside an ephemeral sandbox with 11 specialised agents. Catch security issues, memory leaks, and architectural debt before merge."/>
<meta property="og:image" content="https://i.ibb.co/5HqfYFJ/object-remover-result-1784051501162.png"/>

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:url" content="https://waitlist.codeward.cloud/"/>
<meta name="twitter:title" content="Codeward — Ephemeral Sandbox Code Review & Automated PR Agents"/>
<meta name="twitter:description" content="Codeward runs your actual code inside an ephemeral sandbox with 11 specialised agents. Catch security issues, memory leaks, and architectural debt before merge."/>
<meta name="twitter:image" content="https://i.ibb.co/5HqfYFJ/object-remover-result-1784051501162.png"/>

<!-- Structured Data (JSON-LD) for SEO & AEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "name": "Codeward",
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "description": "An autonomous code quality platform running code inside ephemeral sandboxes to perform deep security, architectural, and runtime checks before merge.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Codeward?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Codeward is an automated principal engineer that sits on every Pull Request. It runs your actual code inside an ephemeral sandbox with 11 specialized agents, executing 120+ checks including security, bloat, architecture, and AI-era compliance."
          }
        },
        {
          "@type": "Question",
          "name": "How does Codeward review code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It analyzes code autonomously inside an ephemeral sandbox, looking for memory leaks, N+1 queries, prompt injections, and more, all under 6 minutes without requiring YAML configuration."
          }
        },
        {
          "@type": "Question",
          "name": "How can I get early access to Codeward?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can request early access by joining the private beta waitlist at waitlist.codeward.cloud. Access is rolling out to a small group of teams at a time."
          }
        }
      ]
    }
  ]
}
<\/script>

<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/static/style.css?v=4"/>

<!-- Vercel Web Analytics -->
<script defer src="/_vercel/insights/script.js"><\/script>
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

  <!-- ============ LINKEDIN FOLLOW BANNER ============ -->
  <section class="linkedin-banner">
    <div class="linkedin-banner-graphic" aria-hidden="true">
      <!-- Floating UI cards -->
      <div class="banner-card banner-card--1">
        <div class="bc-dot bc-dot--green"></div>
        <div class="bc-line"></div>
        <div class="bc-line bc-line--short"></div>
      </div>
      <div class="banner-card banner-card--2">
        <div class="bc-bar"></div>
        <div class="bc-bar bc-bar--tall"></div>
        <div class="bc-bar"></div>
        <div class="bc-bar bc-bar--tall"></div>
      </div>
      <div class="banner-card banner-card--3">
        <div class="bc-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          New update
        </div>
        <div class="bc-line"></div>
        <div class="bc-line bc-line--short"></div>
      </div>
    </div>
    <div class="linkedin-banner-body">
      <h2 class="linkedin-banner-heading">Follow Us &amp; Spread the Word</h2>
      <p class="linkedin-banner-sub">Stay in the loop — get early updates, launch stories, and engineering insights on LinkedIn.</p>
    </div>
    <div class="linkedin-banner-cta">
      <a href="https://www.linkedin.com/company/get-codeward" target="_blank" rel="noopener noreferrer" class="linkedin-banner-btn">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
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

        <div class="social-proof-row">
          <div class="avatar-stack" id="avatar-stack">
            <!-- avatars injected by JS -->
          </div>
          <div class="live-count">
            <div class="live-dot"></div>
            <span><span class="count-num" id="count-display">617</span> engineers already in</span>
          </div>
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
                <label>Work or personal email <span class="required">required</span></label>
                <input type="email" name="email" id="email" placeholder="you@company.com or you@gmail.com" autocomplete="email"/>
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
                  <option value="data-engineer">Data Engineer</option>
                  <option value="data-scientist-ml">Data Scientist / ML Engineer</option>
                  <option value="data-analyst">Analytics Engineer / Data Analyst</option>
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

          <div class="field checkbox-field" id="field-terms">
            <label class="checkbox-label">
              <input type="checkbox" name="terms" id="terms" required />
              <span>I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Privacy Policy</a></span>
            </label>
            <span class="field-error">You must accept the terms to join.</span>
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

<script src="/static/app.js?v=4"><\/script>

</body>
</html>`;var de=class extends Error{constructor(e,t){super(e,t),this.name="RequestError"}},xs=e=>e instanceof de?e:new de(e.message,{cause:e}),Es=global.Request,Be=class extends Es{constructor(t,r){var s;typeof t=="object"&&je in t&&(t=t[je]()),typeof((s=r==null?void 0:r.body)==null?void 0:s.getReader)<"u"&&(r.duplex??(r.duplex="half")),super(t,r)}},ks=e=>{const t=[],r=e.rawHeaders;for(let s=0;s<r.length;s+=2){const{[s]:a,[s+1]:n}=r;a.charCodeAt(0)!==58&&t.push([a,n])}return new Headers(t)},fr=Symbol("wrapBodyStream"),Ss=(e,t,r,s,a)=>{const n={method:e,headers:r,signal:a.signal};if(e==="TRACE"){n.method="GET";const i=new Be(t,n);return Object.defineProperty(i,"method",{get(){return"TRACE"}}),i}if(!(e==="GET"||e==="HEAD"))if("rawBody"in s&&s.rawBody instanceof Buffer)n.body=new ReadableStream({start(i){i.enqueue(s.rawBody),i.close()}});else if(s[fr]){let i;n.body=new ReadableStream({async pull(l){try{i||(i=Mt.toWeb(s).getReader());const{done:p,value:o}=await i.read();p?l.close():l.enqueue(o)}catch(p){l.error(p)}}})}else n.body=Mt.toWeb(s);return new Be(t,n)},je=Symbol("getRequestCache"),nt=Symbol("requestCache"),it=Symbol("incomingKey"),lt=Symbol("urlKey"),bt=Symbol("headersKey"),X=Symbol("abortControllerKey"),Rs=Symbol("getAbortController"),Xe={get method(){return this[it].method||"GET"},get url(){return this[lt]},get headers(){return this[bt]||(this[bt]=ks(this[it]))},[Rs](){return this[je](),this[X]},[je](){return this[X]||(this[X]=new AbortController),this[nt]||(this[nt]=Ss(this.method,this[lt],this.headers,this[it],this[X]))}};["body","bodyUsed","cache","credentials","destination","integrity","mode","redirect","referrer","referrerPolicy","signal","keepalive"].forEach(e=>{Object.defineProperty(Xe,e,{get(){return this[je]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(Xe,e,{value:function(){return this[je]()[e]()}})});Object.defineProperty(Xe,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,r){const s={method:this.method,url:this.url,headers:this.headers,nativeRequest:this[nt]};return`Request (lightweight) ${r(s,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(Xe,Be.prototype);var Cs=(e,t)=>{const r=Object.create(Xe);r[it]=e;const s=e.url||"";if(s[0]!=="/"&&(s.startsWith("http://")||s.startsWith("https://"))){if(e instanceof qe)throw new de("Absolute URL for :path is not allowed in HTTP/2");try{const l=new URL(s);r[lt]=l.href}catch(l){throw new de("Invalid absolute URL",{cause:l})}return r}const a=(e instanceof qe?e.authority:e.headers.host)||t;if(!a)throw new de("Missing host header");let n;if(e instanceof qe){if(n=e.scheme,!(n==="http"||n==="https"))throw new de("Unsupported scheme")}else n=e.socket&&e.socket.encrypted?"https":"http";const i=new URL(`${n}://${a}${s}`);if(i.hostname.length!==a.length&&i.hostname!==a.replace(/:\d+$/,""))throw new de("Invalid host header");return r[lt]=i.href,r},Ue=Symbol("responseCache"),Re=Symbol("getResponseCache"),pe=Symbol("cache"),Pt=global.Response,Qe,W,$e,De=($e=class{constructor(t,r){w(this,Qe);w(this,W);let s;if(g(this,Qe,t),r instanceof $e){const a=r[Ue];if(a){g(this,W,a),this[Re]();return}else g(this,W,u(r,W)),s=new Headers(u(r,W).headers)}else g(this,W,r);(typeof t=="string"||typeof(t==null?void 0:t.getReader)<"u"||t instanceof Blob||t instanceof Uint8Array)&&(this[pe]=[(r==null?void 0:r.status)||200,t,s||(r==null?void 0:r.headers)])}[Re](){return delete this[pe],this[Ue]||(this[Ue]=new Pt(u(this,Qe),u(this,W)))}get headers(){const t=this[pe];return t?(t[2]instanceof Headers||(t[2]=new Headers(t[2]||{"content-type":"text/plain; charset=UTF-8"})),t[2]):this[Re]().headers}get status(){var t;return((t=this[pe])==null?void 0:t[0])??this[Re]().status}get ok(){const t=this.status;return t>=200&&t<300}},Qe=new WeakMap,W=new WeakMap,$e);["body","bodyUsed","redirected","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty(De.prototype,e,{get(){return this[Re]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(De.prototype,e,{value:function(){return this[Re]()[e]()}})});Object.defineProperty(De.prototype,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,r){const s={status:this.status,headers:this.headers,ok:this.ok,nativeResponse:this[Ue]};return`Response (lightweight) ${r(s,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(De,Pt);Object.setPrototypeOf(De.prototype,Pt.prototype);async function As(e){return Promise.race([e,Promise.resolve().then(()=>Promise.resolve(void 0))])}function mr(e,t,r){const s=l=>{e.cancel(l).catch(()=>{})};return t.on("close",s),t.on("error",s),(r??e.read()).then(i,a),e.closed.finally(()=>{t.off("close",s),t.off("error",s)});function a(l){l&&t.destroy(l)}function n(){e.read().then(i,a)}function i({done:l,value:p}){try{if(l)t.end();else if(!t.write(p))t.once("drain",n);else return e.read().then(i,a)}catch(o){a(o)}}}function Os(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");return t.destroyed?void 0:mr(e.getReader(),t)}var kt=e=>{const t={};e instanceof Headers||(e=new Headers(e??void 0));const r=[];for(const[s,a]of e)s==="set-cookie"?r.push(a):t[s]=a;return r.length>0&&(t["set-cookie"]=r),t["content-type"]??(t["content-type"]="text/plain; charset=UTF-8"),t},Ps="x-hono-already-sent";typeof global.crypto>"u"&&(global.crypto=Or);var Lt=Symbol("outgoingEnded"),Bt=Symbol("incomingDraining"),Ls=500,Ts=64*1024*1024,wt=e=>{var l,p,o;const t=e;if(e.destroyed||t[Bt])return;if(t[Bt]=!0,e instanceof qe){try{(p=(l=e.stream)==null?void 0:l.close)==null||p.call(l,Ar.NGHTTP2_NO_ERROR)}catch{}return}let r=0;const s=()=>{clearTimeout(n),e.off("data",i),e.off("end",s),e.off("error",s)},a=()=>{s();const c=e.socket;c&&!c.destroyed&&c.destroySoon()},n=setTimeout(a,Ls);(o=n.unref)==null||o.call(n);const i=c=>{r+=c.length,r>Ts&&a()};e.on("data",i),e.on("end",s),e.on("error",s),e.resume()},_s=()=>new Response(null,{status:400}),gr=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),St=(e,t)=>{const r=e instanceof Error?e:new Error("unknown error",{cause:e});r.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${r.message}`),t.destroy(r))},vr=e=>{"flushHeaders"in e&&e.writable&&e.flushHeaders()},yr=async(e,t)=>{var i,l;let[r,s,a]=e[pe],n=!1;if(!a)a={"content-type":"text/plain; charset=UTF-8"};else if(a instanceof Headers)n=a.has("content-length"),a=kt(a);else if(Array.isArray(a)){const p=new Headers(a);n=p.has("content-length"),a=kt(p)}else for(const p in a)if(p.length===14&&p.toLowerCase()==="content-length"){n=!0;break}n||(typeof s=="string"?a["Content-Length"]=Buffer.byteLength(s):s instanceof Uint8Array?a["Content-Length"]=s.byteLength:s instanceof Blob&&(a["Content-Length"]=s.size)),t.writeHead(r,a),typeof s=="string"||s instanceof Uint8Array?t.end(s):s instanceof Blob?t.end(new Uint8Array(await s.arrayBuffer())):(vr(t),await((i=Os(s,t))==null?void 0:i.catch(p=>St(p,t)))),(l=t[Lt])==null||l.call(t)},$s=e=>typeof e.then=="function",js=async(e,t,r={})=>{var a;if($s(e))if(r.errorHandler)try{e=await e}catch(n){const i=await r.errorHandler(n);if(!i)return;e=i}else e=await e.catch(gr);if(pe in e)return yr(e,t);const s=kt(e.headers);if(e.body){const n=e.body.getReader(),i=[];let l=!1,p;if(s["transfer-encoding"]!=="chunked"){let o=2;for(let c=0;c<o;c++){p||(p=n.read());const d=await As(p).catch(h=>{console.error(h),l=!0});if(!d){if(c===1){await new Promise(h=>setTimeout(h)),o=3;continue}break}if(p=void 0,d.value&&i.push(d.value),d.done){l=!0;break}}l&&!("content-length"in s)&&(s["content-length"]=i.reduce((c,d)=>c+d.length,0))}t.writeHead(e.status,s),i.forEach(o=>{t.write(o)}),l?t.end():(i.length===0&&vr(t),await mr(n,t,p))}else s[Ps]||(t.writeHead(e.status,s),t.end());(a=t[Lt])==null||a.call(t)},Ds=(e,t={})=>{const r=t.autoCleanupIncoming??!0;return t.overrideGlobalObjects!==!1&&global.Request!==Be&&(Object.defineProperty(global,"Request",{value:Be}),Object.defineProperty(global,"Response",{value:De})),async(s,a)=>{let n,i;try{i=Cs(s,t.hostname);let l=!r||s.method==="GET"||s.method==="HEAD";if(l||(s[fr]=!0,s.on("end",()=>{l=!0}),s instanceof qe&&(a[Lt]=()=>{l||setTimeout(()=>{l||setTimeout(()=>{wt(s)})})}),a.on("finish",()=>{l||wt(s)})),a.on("close",()=>{i[X]&&(s.errored?i[X].abort(s.errored.toString()):a.writableFinished||i[X].abort("Client connection prematurely closed.")),l||setTimeout(()=>{l||setTimeout(()=>{wt(s)})})}),n=e(i,{incoming:s,outgoing:a}),pe in n)return yr(n,a)}catch(l){if(n)return St(l,a);if(t.errorHandler){if(n=await t.errorHandler(i?l:xs(l)),!n)return}else i?n=gr(l):n=_s()}try{return await js(n,a,t)}catch(l){return St(l,a)}}},Ns=e=>Ds(e.fetch);const Rt=new At,Hs=Object.assign({"/src/index.tsx":K});let br=!1;for(const[,e]of Object.entries(Hs))e&&(Rt.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Rt.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),br=!0);if(!br)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");const Fs=Ns(Rt);export{Fs as default};
