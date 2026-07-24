var ia=Object.defineProperty;var as=e=>{throw TypeError(e)};var oa=(e,t,s)=>t in e?ia(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var w=(e,t,s)=>oa(e,typeof t!="symbol"?t+"":t,s),Et=(e,t,s)=>t.has(e)||as("Cannot "+s);var h=(e,t,s)=>(Et(e,t,"read from private field"),s?s.call(e):t.get(e)),E=(e,t,s)=>t.has(e)?as("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),y=(e,t,s,a)=>(Et(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),k=(e,t,s)=>(Et(e,t,"access private method"),s);var rs=(e,t,s,a)=>({set _(r){y(e,t,r,s)},get _(){return h(e,t,a)}});import{Http2ServerRequest as ze,constants as la}from"http2";import{Readable as ns}from"stream";import ca from"crypto";var is=(e,t,s)=>(a,r)=>{let n=-1;return i(0);async function i(l){if(l<=n)throw new Error("next() called multiple times");n=l;let p,o=!1,c;if(e[l]?(c=e[l][0][0],a.req.routeIndex=l):c=l===e.length&&r||void 0,c)try{p=await c(a,()=>i(l+1))}catch(d){if(d instanceof Error&&t)a.error=d,p=await t(d,a),o=!0;else throw d}else a.finalized===!1&&s&&(p=await s(a));return p&&(a.finalized===!1||o)&&(a.res=p),a}},da=Symbol(),pa=(e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,a=>a.toLowerCase())}}).formData(),Ot=e=>"headers"in e,ha=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,n=(Ot(e)?e.headers:e.raw.headers).get("Content-Type"),i=n==null?void 0:n.split(";")[0].trim().toLowerCase();return i==="multipart/form-data"||i==="application/x-www-form-urlencoded"?ua(e,{all:s,dot:a}):{}};async function ua(e,t){const s=Ot(e)?e.headers:e.raw.headers,a=await e.arrayBuffer(),r=pa(a,s.get("Content-Type")||"");Ot(e)||(e.bodyCache.formData=r);const n=await r;return n?fa(n,t):{}}function fa(e,t){const s=Object.create(null);return e.forEach((a,r)=>{t.all||r.endsWith("[]")?ma(s,r,a):s[r]=a}),t.dot&&Object.entries(s).forEach(([a,r])=>{a.includes(".")&&(ga(s,a,r),delete s[a])}),s}var ma=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},ga=(e,t,s)=>{if(/(?:^|\.)__proto__\./.test(t))return;let a=e;const r=t.split(".");r.forEach((n,i)=>{i===r.length-1?a[n]=s:((!a[n]||typeof a[n]!="object"||Array.isArray(a[n])||a[n]instanceof File)&&(a[n]=Object.create(null)),a=a[n])})},ys=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},va=e=>{const{groups:t,path:s}=ya(e),a=ys(s);return ba(a,t)},ya=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const r=`@${a}`;return t.push([r,s]),r}),{groups:t,path:e}},ba=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let r=e.length-1;r>=0;r--)if(e[r].includes(a)){e[r]=e[r].replace(a,t[s][1]);break}}return e},nt={},wa=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return nt[a]||(s[2]?nt[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:nt[a]=[e,s[1],!0]),nt[a]}return null},gt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},xa=e=>gt(e,decodeURI),bs=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const r=t.charCodeAt(a);if(r===37){const n=t.indexOf("?",a),i=t.indexOf("#",a),l=n===-1?i===-1?void 0:i:i===-1?n:Math.min(n,i),p=t.slice(s,l);return xa(p.includes("%25")?p.replace(/%25/g,"%2525"):p)}else if(r===63||r===35)break}return t.slice(s,a)},Ea=e=>{const t=bs(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ue=(e,t,...s)=>(s.length&&(t=ue(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),ws=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))a+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){s.length===0&&a===""?s.push("/"):s.push(a);const n=r.replace("?","");a+="/"+n,s.push(a)}else a+="/"+r}),s.filter((r,n,i)=>i.indexOf(r)===n)},St=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?gt(e,Dt):e):e,xs=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const l=e.charCodeAt(i+t.length+1);if(l===61){const p=i+t.length+2,o=e.indexOf("&",p);return St(e.slice(p,o===-1?void 0:o))}else if(l==38||isNaN(l))return"";i=e.indexOf(`&${t}`,i+1)}if(a=/[%+]/.test(e),!a)return}const r={};a??(a=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const i=e.indexOf("&",n+1);let l=e.indexOf("=",n);l>i&&i!==-1&&(l=-1);let p=e.slice(n+1,l===-1?i===-1?void 0:i:l);if(a&&(p=St(p)),n=i,p==="")continue;let o;l===-1?o="":(o=e.slice(l+1,i===-1?void 0:i),a&&(o=St(o))),s?(r[p]&&Array.isArray(r[p])||(r[p]=[]),r[p].push(o)):r[p]??(r[p]=o)}return t?r[t]:r},Sa=xs,Ra=(e,t)=>xs(e,t,!0),Dt=decodeURIComponent,os=e=>gt(e,Dt),_e,H,J,Es,Ss,Lt,z,hs,ka=(hs=class{constructor(e,t="/",s=[[]]){E(this,J);w(this,"raw");E(this,_e);E(this,H);w(this,"routeIndex",0);w(this,"path");w(this,"bodyCache",{});E(this,z,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const r=Object.keys(t)[0];return r?t[r].then(n=>(r==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,y(this,H,s),y(this,_e,{})}param(e){return e?k(this,J,Es).call(this,e):k(this,J,Ss).call(this)}query(e){return Sa(this.url,e)}queries(e){return Ra(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){return ha(this,e)}json(){return h(this,z).call(this,"text").then(e=>JSON.parse(e))}text(){return h(this,z).call(this,"text")}arrayBuffer(){return h(this,z).call(this,"arrayBuffer")}bytes(){return h(this,z).call(this,"arrayBuffer").then(e=>new Uint8Array(e))}blob(){return h(this,z).call(this,"blob")}formData(){return h(this,z).call(this,"formData")}addValidatedData(e,t){h(this,_e)[e]=t}valid(e){return h(this,_e)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[da](){return h(this,H)}get matchedRoutes(){return h(this,H)[0].map(([[,e]])=>e)}get routePath(){return h(this,H)[0].map(([[,e]])=>e)[this.routeIndex].path}},_e=new WeakMap,H=new WeakMap,J=new WeakSet,Es=function(e){const t=h(this,H)[0][this.routeIndex][1][e],s=k(this,J,Lt).call(this,t);return s&&/\%/.test(s)?os(s):s},Ss=function(){const e={},t=Object.keys(h(this,H)[0][this.routeIndex][1]);for(const s of t){const a=k(this,J,Lt).call(this,h(this,H)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?os(a):a)}return e},Lt=function(e){return h(this,H)[1]?h(this,H)[1][e]:e},z=new WeakMap,hs),Ca={Stringify:1},Rs=async(e,t,s,a,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(r?r[0]+=e:r=[e],Promise.all(n.map(l=>l({phase:t,buffer:r,context:a}))).then(l=>Promise.all(l.filter(Boolean).map(p=>Rs(p,t,!1,a,r))).then(()=>r[0]))):Promise.resolve(e)},Aa="text/plain; charset=UTF-8",Rt=(e,t)=>({"Content-Type":e,...t}),qe=(e,t)=>new Response(e,t),Ve,Je,G,Pe,Y,D,Qe,$e,De,ye,Xe,Ze,ne,Ae,us,Ta=(us=class{constructor(e,t){E(this,ne);E(this,Ve);E(this,Je);w(this,"env",{});E(this,G);w(this,"finalized",!1);w(this,"error");E(this,Pe);E(this,Y);E(this,D);E(this,Qe);E(this,$e);E(this,De);E(this,ye);E(this,Xe);E(this,Ze);w(this,"render",(...e)=>(h(this,$e)??y(this,$e,t=>this.html(t)),h(this,$e).call(this,...e)));w(this,"setLayout",e=>y(this,Qe,e));w(this,"getLayout",()=>h(this,Qe));w(this,"setRenderer",e=>{y(this,$e,e)});w(this,"header",(e,t,s)=>{this.finalized&&y(this,D,qe(h(this,D).body,h(this,D)));const a=h(this,D)?h(this,D).headers:h(this,ye)??y(this,ye,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});w(this,"status",e=>{y(this,Pe,e)});w(this,"set",(e,t)=>{h(this,G)??y(this,G,new Map),h(this,G).set(e,t)});w(this,"get",e=>h(this,G)?h(this,G).get(e):void 0);w(this,"newResponse",(...e)=>k(this,ne,Ae).call(this,...e));w(this,"body",(e,t,s)=>k(this,ne,Ae).call(this,e,t,s));w(this,"text",(e,t,s)=>!h(this,ye)&&!h(this,Pe)&&!t&&!s&&!this.finalized?new Response(e):k(this,ne,Ae).call(this,e,t,Rt(Aa,s)));w(this,"json",(e,t,s)=>k(this,ne,Ae).call(this,JSON.stringify(e),t,Rt("application/json",s)));w(this,"html",(e,t,s)=>{const a=r=>k(this,ne,Ae).call(this,r,t,Rt("text/html; charset=UTF-8",s));return typeof e=="object"?Rs(e,Ca.Stringify,!1,{}).then(a):a(e)});w(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});w(this,"notFound",()=>(h(this,De)??y(this,De,()=>qe()),h(this,De).call(this,this)));y(this,Ve,e),t&&(y(this,Y,t.executionCtx),this.env=t.env,y(this,De,t.notFoundHandler),y(this,Ze,t.path),y(this,Xe,t.matchResult))}get req(){return h(this,Je)??y(this,Je,new ka(h(this,Ve),h(this,Ze),h(this,Xe))),h(this,Je)}get event(){if(h(this,Y)&&"respondWith"in h(this,Y))return h(this,Y);throw Error("This context has no FetchEvent")}get executionCtx(){if(h(this,Y))return h(this,Y);throw Error("This context has no ExecutionContext")}get res(){return h(this,D)||y(this,D,qe(null,{headers:h(this,ye)??y(this,ye,new Headers)}))}set res(e){if(h(this,D)&&e){e=qe(e.body,e);for(const[t,s]of h(this,D).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=h(this,D).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of a)e.headers.append("set-cookie",r)}else e.headers.set(t,s)}y(this,D,e),this.finalized=!0}get var(){return h(this,G)?Object.fromEntries(h(this,G)):{}}},Ve=new WeakMap,Je=new WeakMap,G=new WeakMap,Pe=new WeakMap,Y=new WeakMap,D=new WeakMap,Qe=new WeakMap,$e=new WeakMap,De=new WeakMap,ye=new WeakMap,Xe=new WeakMap,Ze=new WeakMap,ne=new WeakSet,Ae=function(e,t,s){const a=h(this,D)?new Headers(h(this,D).headers):h(this,ye)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,l]of n)i.toLowerCase()==="set-cookie"?a.append(i,l):a.set(i,l)}if(s)for(const[n,i]of Object.entries(s))if(typeof i=="string")a.set(n,i);else{a.delete(n);for(const l of i)a.append(n,l)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??h(this,Pe);return qe(e,{status:r,headers:a})},us),A="ALL",Oa="all",La=["get","post","put","delete","options","patch"],ks="Can not add a route since the matcher is already built.",Cs=class extends Error{},_a="__COMPOSED_HANDLER",Pa=e=>e.text("404 Not Found",404),ls=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},M,T,As,U,fe,it,ot,Ne,$a=(Ne=class{constructor(t={}){E(this,T);w(this,"get");w(this,"post");w(this,"put");w(this,"delete");w(this,"options");w(this,"patch");w(this,"all");w(this,"on");w(this,"use");w(this,"router");w(this,"getPath");w(this,"_basePath","/");E(this,M,"/");w(this,"routes",[]);E(this,U,Pa);w(this,"errorHandler",ls);w(this,"onError",t=>(this.errorHandler=t,this));w(this,"notFound",t=>(y(this,U,t),this));w(this,"fetch",(t,...s)=>k(this,T,ot).call(this,t,s[1],s[0],t.method));w(this,"request",(t,s,a,r)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ue("/",t)}`,s),a,r)));w(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(k(this,T,ot).call(this,t.request,t,void 0,t.request.method))})});[...La,Oa].forEach(n=>{this[n]=(i,...l)=>(typeof i=="string"?y(this,M,i):k(this,T,fe).call(this,n,h(this,M),i),l.forEach(p=>{k(this,T,fe).call(this,n,h(this,M),p)}),this)}),this.on=(n,i,...l)=>{for(const p of[i].flat()){y(this,M,p);for(const o of[n].flat())l.map(c=>{k(this,T,fe).call(this,o.toUpperCase(),h(this,M),c)})}return this},this.use=(n,...i)=>(typeof n=="string"?y(this,M,n):(y(this,M,"*"),i.unshift(n)),i.forEach(l=>{k(this,T,fe).call(this,A,h(this,M),l)}),this);const{strict:a,...r}=t;Object.assign(this,r),this.getPath=a??!0?t.getPath??bs:Ea}route(t,s){const a=this.basePath(t);return s.routes.map(r=>{var i;let n;s.errorHandler===ls?n=r.handler:(n=async(l,p)=>(await is([],s.errorHandler)(l,()=>r.handler(l,p))).res,n[_a]=r.handler),k(i=a,T,fe).call(i,r.method,r.path,n,r.basePath)}),this}basePath(t){const s=k(this,T,As).call(this);return s._basePath=ue(this._basePath,t),s}mount(t,s,a){let r,n;a&&(typeof a=="function"?n=a:(n=a.optionHandler,a.replaceRequest===!1?r=p=>p:r=a.replaceRequest));const i=n?p=>{const o=n(p);return Array.isArray(o)?o:[o]}:p=>{let o;try{o=p.executionCtx}catch{}return[p.env,o]};r||(r=(()=>{const p=ue(this._basePath,t),o=p==="/"?0:p.length;return c=>{const d=new URL(c.url);return d.pathname=this.getPath(c).slice(o)||"/",new Request(d,c)}})());const l=async(p,o)=>{const c=await s(r(p.req.raw),...i(p));if(c)return c;await o()};return k(this,T,fe).call(this,A,ue(t,"*"),l),this}},M=new WeakMap,T=new WeakSet,As=function(){const t=new Ne({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,y(t,U,h(this,U)),t.routes=this.routes,t},U=new WeakMap,fe=function(t,s,a,r){t=t.toUpperCase(),s=ue(this._basePath,s);const n={basePath:r!==void 0?ue(this._basePath,r):this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,n]),this.routes.push(n)},it=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},ot=function(t,s,a,r){if(r==="HEAD")return(async()=>new Response(null,await k(this,T,ot).call(this,t,s,a,"GET")))();const n=this.getPath(t,{env:a}),i=this.router.match(r,n),l=new Ta(t,{path:n,matchResult:i,env:a,executionCtx:s,notFoundHandler:h(this,U)});if(i[0].length===1){let o;try{o=i[0][0][0][0](l,async()=>{l.res=await h(this,U).call(this,l)})}catch(c){return k(this,T,it).call(this,c,l)}return o instanceof Promise?o.then(c=>c||(l.finalized?l.res:h(this,U).call(this,l))).catch(c=>k(this,T,it).call(this,c,l)):o??h(this,U).call(this,l)}const p=is(i[0],this.errorHandler,h(this,U));return(async()=>{try{const o=await p(l);if(!o.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return o.res}catch(o){return k(this,T,it).call(this,o,l)}})()},Ne),Ts=[];function Da(e,t){const s=this.buildAllMatchers(),a=((r,n)=>{const i=s[r]||s[A],l=i[2][n];if(l)return l;const p=n.match(i[0]);if(!p)return[[],Ts];const o=p.indexOf("",1);return[i[1][o],p]});return this.match=a,a(e,t)}var ht="[^/]+",Ge=".*",Ye="(?:|/.*)",Te=Symbol(),Na=new Set(".\\+*[^]$()");function Ia(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ge||e===Ye?1:t===Ge||t===Ye?-1:e===ht?1:t===ht?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var be,we,B,Se,ja=(Se=class{constructor(){E(this,be);E(this,we);E(this,B,Object.create(null))}insert(t,s,a,r,n){if(t.length===0){if(h(this,be)!==void 0)throw Te;if(n)return;y(this,be,s);return}const[i,...l]=t,p=i==="*"?l.length===0?["","",Ge]:["","",ht]:i==="/*"?["","",Ye]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let o;if(p){const c=p[1];let d=p[2]||ht;if(c&&p[2]&&(d===".*"||(d=d.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(d))))throw Te;if(o=h(this,B)[d],!o){if(Object.keys(h(this,B)).some(u=>u!==Ge&&u!==Ye))throw Te;if(n)return;o=h(this,B)[d]=new Se,c!==""&&y(o,we,r.varIndex++)}!n&&c!==""&&a.push([c,h(o,we)])}else if(o=h(this,B)[i],!o){if(Object.keys(h(this,B)).some(c=>c.length>1&&c!==Ge&&c!==Ye))throw Te;if(n)return;o=h(this,B)[i]=new Se}o.insert(l,s,a,r,n)}buildRegExpStr(){const s=Object.keys(h(this,B)).sort(Ia).map(a=>{const r=h(this,B)[a];return(typeof h(r,we)=="number"?`(${a})@${h(r,we)}`:Na.has(a)?`\\${a}`:a)+r.buildRegExpStr()});return typeof h(this,be)=="number"&&s.unshift(`#${h(this,be)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},be=new WeakMap,we=new WeakMap,B=new WeakMap,Se),ft,et,fs,Ha=(fs=class{constructor(){E(this,ft,{varIndex:0});E(this,et,new ja)}insert(e,t,s){const a=[],r=[];for(let i=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,p=>{const o=`@\\${i}`;return r[i]=[o,p],i++,l=!0,o}),!l)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=r.length-1;i>=0;i--){const[l]=r[i];for(let p=n.length-1;p>=0;p--)if(n[p].indexOf(l)!==-1){n[p]=n[p].replace(l,r[i][1]);break}}return h(this,et).insert(n,t,a,h(this,ft),s),a}buildRegExp(){let e=h(this,et).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,n,i)=>n!==void 0?(s[++t]=Number(n),"$()"):(i!==void 0&&(a[Number(i)]=++t),"")),[new RegExp(`^${e}`),s,a]}},ft=new WeakMap,et=new WeakMap,fs),Ma=[/^$/,[],Object.create(null)],lt=Object.create(null);function Os(e){return lt[e]??(lt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Ua(){lt=Object.create(null)}function Ba(e){var o;const t=new Ha,s=[];if(e.length===0)return Ma;const a=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,d],[u,m])=>c?1:u?-1:d.length-m.length),r=Object.create(null);for(let c=0,d=-1,u=a.length;c<u;c++){const[m,f,v]=a[c];m?r[f]=[v.map(([x])=>[x,Object.create(null)]),Ts]:d++;let b;try{b=t.insert(f,d,m)}catch(x){throw x===Te?new Cs(f):x}m||(s[d]=v.map(([x,R])=>{const C=Object.create(null);for(R-=1;R>=0;R--){const[O,Z]=b[R];C[O]=Z}return[x,C]}))}const[n,i,l]=t.buildRegExp();for(let c=0,d=s.length;c<d;c++)for(let u=0,m=s[c].length;u<m;u++){const f=(o=s[c][u])==null?void 0:o[1];if(!f)continue;const v=Object.keys(f);for(let b=0,x=v.length;b<x;b++)f[v[b]]=l[f[v[b]]]}const p=[];for(const c in i)p[c]=s[i[c]];return[n,p,r]}function Ce(e,t){if(e){for(const s of Object.keys(e).sort((a,r)=>r.length-a.length))if(Os(s).test(t))return[...e[s]]}}var ie,oe,mt,Ls,ms,qa=(ms=class{constructor(){E(this,mt);w(this,"name","RegExpRouter");E(this,ie);E(this,oe);w(this,"match",Da);y(this,ie,{[A]:Object.create(null)}),y(this,oe,{[A]:Object.create(null)})}add(e,t,s){var l;const a=h(this,ie),r=h(this,oe);if(!a||!r)throw new Error(ks);a[e]||[a,r].forEach(p=>{p[e]=Object.create(null),Object.keys(p[A]).forEach(o=>{p[e][o]=[...p[A][o]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const p=Os(t);e===A?Object.keys(a).forEach(o=>{var c;(c=a[o])[t]||(c[t]=Ce(a[o],t)||Ce(a[A],t)||[])}):(l=a[e])[t]||(l[t]=Ce(a[e],t)||Ce(a[A],t)||[]),Object.keys(a).forEach(o=>{(e===A||e===o)&&Object.keys(a[o]).forEach(c=>{p.test(c)&&a[o][c].push([s,n])})}),Object.keys(r).forEach(o=>{(e===A||e===o)&&Object.keys(r[o]).forEach(c=>p.test(c)&&r[o][c].push([s,n]))});return}const i=ws(t)||[t];for(let p=0,o=i.length;p<o;p++){const c=i[p];Object.keys(r).forEach(d=>{var u;(e===A||e===d)&&((u=r[d])[c]||(u[c]=[...Ce(a[d],c)||Ce(a[A],c)||[]]),r[d][c].push([s,n-o+p+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(h(this,oe)).concat(Object.keys(h(this,ie))).forEach(t=>{e[t]||(e[t]=k(this,mt,Ls).call(this,t))}),y(this,ie,y(this,oe,void 0)),Ua(),e}},ie=new WeakMap,oe=new WeakMap,mt=new WeakSet,Ls=function(e){const t=[];let s=e===A;return[h(this,ie),h(this,oe)].forEach(a=>{const r=a[e]?Object.keys(a[e]).map(n=>[n,a[e][n]]):[];r.length!==0?(s||(s=!0),t.push(...r)):e!==A&&t.push(...Object.keys(a[A]).map(n=>[n,a[A][n]]))}),s?Ba(t):null},ms),le,K,gs,Fa=(gs=class{constructor(e){w(this,"name","SmartRouter");E(this,le,[]);E(this,K,[]);y(this,le,e.routers)}add(e,t,s){if(!h(this,K))throw new Error(ks);h(this,K).push([e,t,s])}match(e,t){if(!h(this,K))throw new Error("Fatal error");const s=h(this,le),a=h(this,K),r=s.length;let n=0,i;for(;n<r;n++){const l=s[n];try{for(let p=0,o=a.length;p<o;p++)l.add(...a[p]);i=l.match(e,t)}catch(p){if(p instanceof Cs)continue;throw p}this.match=l.match.bind(l),y(this,le,[l]),y(this,K,void 0);break}if(n===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(h(this,K)||h(this,le).length!==1)throw new Error("No active router has been determined yet.");return h(this,le)[0]}},le=new WeakMap,K=new WeakMap,gs),Fe=Object.create(null),Wa=e=>{for(const t in e)return!0;return!1},ce,L,xe,Ie,_,q,te,je,za=(je=class{constructor(t,s,a){E(this,q);E(this,ce);E(this,L);E(this,xe);E(this,Ie,0);E(this,_,Fe);if(y(this,L,a||Object.create(null)),y(this,ce,[]),t&&s){const r=Object.create(null);r[t]={handler:s,possibleKeys:[],score:0},y(this,ce,[r])}y(this,xe,[])}insert(t,s,a){y(this,Ie,++rs(this,Ie)._);let r=this;const n=va(s),i=[];for(let l=0,p=n.length;l<p;l++){const o=n[l],c=n[l+1],d=wa(o,c),u=Array.isArray(d)?d[0]:o;if(u in h(r,L)){r=h(r,L)[u],d&&i.push(d[1]);continue}h(r,L)[u]=new je,d&&(h(r,xe).push(d),i.push(d[1])),r=h(r,L)[u]}return h(r,ce).push({[t]:{handler:a,possibleKeys:i.filter((l,p,o)=>o.indexOf(l)===p),score:h(this,Ie)}}),r}search(t,s){var c;const a=[];y(this,_,Fe);let n=[this];const i=ys(s),l=[],p=i.length;let o=null;for(let d=0;d<p;d++){const u=i[d],m=d===p-1,f=[];for(let b=0,x=n.length;b<x;b++){const R=n[b],C=h(R,L)[u];C&&(y(C,_,h(R,_)),m?(h(C,L)["*"]&&k(this,q,te).call(this,a,h(C,L)["*"],t,h(R,_)),k(this,q,te).call(this,a,C,t,h(R,_))):f.push(C));for(let O=0,Z=h(R,xe).length;O<Z;O++){const at=h(R,xe)[O],P=h(R,_)===Fe?{}:{...h(R,_)};if(at==="*"){const F=h(R,L)["*"];F&&(k(this,q,te).call(this,a,F,t,h(R,_)),y(F,_,P),f.push(F));continue}const[Be,rt,de]=at;if(!u&&!(de instanceof RegExp))continue;const $=h(R,L)[Be];if(de instanceof RegExp){if(o===null){o=new Array(p);let I=s[0]==="/"?1:0;for(let pe=0;pe<p;pe++)o[pe]=I,I+=i[pe].length+1}const F=s.substring(o[d]),ee=de.exec(F);if(ee){if(P[rt]=ee[0],k(this,q,te).call(this,a,$,t,h(R,_),P),ee[0].length===F.length&&h($,L)["*"]&&k(this,q,te).call(this,a,h($,L)["*"],t,h(R,_),P),Wa(h($,L))){y($,_,P);const I=((c=ee[0].match(/\//))==null?void 0:c.length)??0;(l[I]||(l[I]=[])).push($)}continue}}(de===!0||de.test(u))&&(P[rt]=u,m?(k(this,q,te).call(this,a,$,t,P,h(R,_)),h($,L)["*"]&&k(this,q,te).call(this,a,h($,L)["*"],t,P,h(R,_))):(y($,_,P),f.push($)))}}const v=l.shift();n=v?f.concat(v):f}return a.length>1&&a.sort((d,u)=>d.score-u.score),[a.map(({handler:d,params:u})=>[d,u])]}},ce=new WeakMap,L=new WeakMap,xe=new WeakMap,Ie=new WeakMap,_=new WeakMap,q=new WeakSet,te=function(t,s,a,r,n){for(let i=0,l=h(s,ce).length;i<l;i++){const p=h(s,ce)[i],o=p[a]||p[A],c={};if(o!==void 0&&(o.params=Object.create(null),t.push(o),r!==Fe||n&&n!==Fe))for(let d=0,u=o.possibleKeys.length;d<u;d++){const m=o.possibleKeys[d],f=c[o.score];o.params[m]=n!=null&&n[m]&&!f?n[m]:r[m]??(n==null?void 0:n[m]),c[o.score]=!0}}},je),Ee,vs,Ga=(vs=class{constructor(){w(this,"name","TrieRouter");E(this,Ee);y(this,Ee,new za)}add(e,t,s){const a=ws(t);if(a){for(let r=0,n=a.length;r<n;r++)h(this,Ee).insert(e,a[r],s);return}h(this,Ee).insert(e,t,s)}match(e,t){return h(this,Ee).search(e,t)}},Ee=new WeakMap,vs),Nt=class extends $a{constructor(e={}){super(e),this.router=e.router??new Fa({routers:[new qa,new Ga]})}},_s=/^[\w!#$%&'*.^`|~+-]+$/,Ya=/^[ !#-:<-[\]-~]*$/,cs=e=>{let t=0,s=e.length;for(;t<s;){const a=e.charCodeAt(t);if(a!==32&&a!==9)break;t++}for(;s>t;){const a=e.charCodeAt(s-1);if(a!==32&&a!==9)break;s--}return t===0&&s===e.length?e:e.slice(t,s)},Ka=(e,t)=>{if(t&&e.indexOf(t)===-1)return{};const s=e.split(";"),a=Object.create(null);for(const r of s){const n=r.indexOf("=");if(n===-1)continue;const i=cs(r.substring(0,n));if(t&&t!==i||!_s.test(i)||i in a)continue;let l=cs(r.substring(n+1));if(l.startsWith('"')&&l.endsWith('"')&&(l=l.slice(1,-1)),Ya.test(l)&&(a[i]=l.indexOf("%")!==-1?gt(l,Dt):l,t))break}return a},Va=(e,t,s={})=>{if(!_s.test(e))throw new Error("Invalid cookie name");let a=`${e}=${t}`;if(e.startsWith("__Secure-")&&!s.secure)throw new Error("__Secure- Cookie must have Secure attributes");if(e.startsWith("__Host-")){if(!s.secure)throw new Error("__Host- Cookie must have Secure attributes");if(s.path!=="/")throw new Error('__Host- Cookie must have Path attributes with "/"');if(s.domain)throw new Error("__Host- Cookie must not have Domain attributes")}for(const r of["domain","path","sameSite","priority"])if(s[r]&&/[;\r\n]/.test(s[r]))throw new Error(`${r} must not contain ";", "\\r", or "\\n"`);if(s&&typeof s.maxAge=="number"&&s.maxAge>=0){if(s.maxAge>3456e4)throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");a+=`; Max-Age=${s.maxAge|0}`}if(s.domain&&s.prefix!=="host"&&(a+=`; Domain=${s.domain}`),s.path&&(a+=`; Path=${s.path}`),s.expires){if(s.expires.getTime()-Date.now()>3456e7)throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");a+=`; Expires=${s.expires.toUTCString()}`}if(s.httpOnly&&(a+="; HttpOnly"),s.secure&&(a+="; Secure"),s.sameSite&&(a+=`; SameSite=${s.sameSite.charAt(0).toUpperCase()+s.sameSite.slice(1)}`),s.priority&&(a+=`; Priority=${s.priority.charAt(0).toUpperCase()+s.priority.slice(1)}`),s.partitioned){if(!s.secure)throw new Error("Partitioned Cookie must have Secure attributes");a+="; Partitioned"}return a},kt=(e,t,s)=>(t=encodeURIComponent(t),Va(e,t,s)),Ps=(e,t,s)=>{const a=e.req.raw.headers.get("Cookie");{if(!a)return;let r=t;return s==="secure"?r="__Secure-"+t:s==="host"&&(r="__Host-"+t),Ka(a,r)[r]}},Ja=(e,t,s)=>{let a;return(s==null?void 0:s.prefix)==="secure"?a=kt("__Secure-"+e,t,{path:"/",...s,secure:!0}):(s==null?void 0:s.prefix)==="host"?a=kt("__Host-"+e,t,{...s,path:"/",secure:!0,domain:void 0}):a=kt(e,t,{path:"/",...s}),a},$s=(e,t,s,a)=>{const r=Ja(t,s,a);e.header("Set-Cookie",r,{append:!0})},Qa=(e,t,s)=>{const a=Ps(e,t,s==null?void 0:s.prefix);return $s(e,t,"",{...s,maxAge:0}),a};typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);function Q(e){return ae(e)}const j=new Nt;let ds=!1;async function Xa(e){if(!ds)try{const t=await Q(e).connect();await t.query("ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';"),await t.query("ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS invited_at TIMESTAMP;"),ds=!0}catch(t){console.error("Failed schema upgrade:",t)}}j.use("*",async(e,t)=>{const s=new URL(e.req.url).pathname;if(s==="/admin/login"||s.startsWith("/static/"))return t();const a=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return Ps(e,"codeward_admin_session")===a?(await Xa(e),t()):e.redirect("/admin/login")});function Ds(e){let t=0;const s=(e.email.split("@")[1]||"").toLowerCase();return s&&!["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","proton.me","protonmail.com","aol.com","live.com","yandex.com","mail.com"].includes(s)&&(t+=35),["senior-engineer","engineering-lead","cto-vp","founder","security-engineer","devops-platform"].includes(e.role)&&(t+=30),e.github&&e.github.trim().length>0&&(t+=20),e.company&&e.company.trim().length>0&&(t+=15),t>=65?{score:t,label:"🔥 High",class:"priority-high",level:"high"}:t>=35?{score:t,label:"⚡ Medium",class:"priority-medium",level:"medium"}:{score:t,label:"🟢 Standard",class:"priority-standard",level:"standard"}}async function Ns(e,t,s,a){var n;const r=e.RESEND_API_KEY||(typeof process<"u"?(n=process.env)==null?void 0:n.RESEND_API_KEY:void 0);if(!r)return!1;try{const i=`<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="color-scheme" content="dark">
</head>
<body style="margin:0;padding:32px 16px;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#0d1117;border:1px solid #22232a;border-radius:12px;overflow:hidden;">
  <tr>
    <td style="padding:32px 24px;text-align:center;">
      <h1 style="color:#ffffff;font-size:24px;margin-bottom:12px;">Your Codeward Access is Ready! 🎉</h1>
      <p style="color:#c9d1d9;font-size:15px;line-height:24px;margin-bottom:24px;">
        Hi ${N(s)}, your spot in the Codeward private beta is now active. Your repository sandboxes and 11 review agents are standing by.
      </p>
      <a href="https://app.codeward.cloud/onboarding?token=beta_access_${a}" style="display:inline-block;background:#22c55e;color:#000000;font-weight:600;font-size:15px;padding:14px 28px;border-radius:99px;text-decoration:none;">
        Access Codeward Sandbox &rarr;
      </a>
    </td>
  </tr>
</table>
</body>
</html>`;return(await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward <founders@codeward.cloud>",to:[t],subject:"🎉 Your Codeward Early Access is Ready!",html:i})})).ok}catch(i){return console.error("Failed sending beta invite email:",i),!1}}j.get("/login",e=>{const t=`<!DOCTYPE html>
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
  .login-btn:hover { background: #f4f4f5; }
  .error-msg {
    color: #ef4444;
    font-size: 14px;
    text-align: center;
    margin-bottom: 16px;
    display: none;
  }
  .error-msg.visible { display: block; }
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
</html>`;return e.html(t)});j.post("/login",async e=>{const t=await e.req.parseBody(),s=e.env.ADMIN_USERNAME||process.env.ADMIN_USERNAME||"kelvin.reallife8@gmail.com",a=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return t.username===s&&t.password===a?($s(e,"codeward_admin_session",a,{path:"/admin",httpOnly:!0,secure:!0,maxAge:3600*24*7}),e.redirect("/admin")):e.redirect("/admin/login?error=1")});j.get("/logout",e=>(Qa(e,"codeward_admin_session",{path:"/admin"}),e.redirect("/admin/login")));const ct={"software-engineer":"Software Engineer","senior-engineer":"Senior / Staff Engineer","engineering-lead":"Engineering Lead / Manager","cto-vp":"CTO / VP of Engineering","devops-platform":"DevOps / Platform Engineer","security-engineer":"Security Engineer",freelancer:"Freelance Developer","open-source":"Open Source Contributor",student:"Student / Bootcamp",founder:"Founder / Indie Hacker",other:"Other"};function N(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function se(e){if(e==null)return"";const t=String(e);return/[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}j.get("/",async e=>{var Wt,zt,Gt,Yt,Kt,Vt,Jt,Qt,Xt,Zt;const{env:t}=e,s=new URL(e.req.url),a=(s.searchParams.get("q")||"").trim(),r=(s.searchParams.get("role")||"").trim(),n=(s.searchParams.get("priority")||"").trim(),i=(s.searchParams.get("status")||"").trim(),l=Math.max(1,parseInt(s.searchParams.get("page")||"1",10)||1),p=25,o=s.searchParams.get("msg")||"";let c="";o==="retrigger_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Email successfully resent!</div>':o==="invite_success"?c='<div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 12px 16px; border-radius: 8px; font-weight: 500;">🎉 Early access invitation sent successfully!</div>':o==="add_lead_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ VIP Lead added to waitlist!</div>':o==="bulk_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Bulk action executed successfully!</div>':o==="delete_success"&&(c='<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Waitlist entry deleted.</div>');let d="WHERE 1=1";const u=[];let m=1;if(a){d+=` AND (LOWER(name) LIKE $${m++} OR LOWER(email) LIKE $${m++} OR LOWER(company) LIKE $${m++})`;const g=`%${a.toLowerCase()}%`;u.push(g,g,g)}r&&(d+=` AND role = $${m++}`,u.push(r)),i&&(d+=` AND COALESCE(status, 'pending') = $${m++}`,u.push(i));const f=await Q(e).connect();let b=((await f.query(`SELECT id, name, email, role, company, github, position, created_at, email_sent, linkedin_clicked, status, invited_at
     FROM waitlist_entries ${d}
     ORDER BY created_at DESC`,u)).rows||[]).map(g=>{const S=Ds(g);return{...g,priority:S}});n&&(b=b.filter(g=>g.priority.level===n));const x=b.length,R=Math.max(1,Math.ceil(x/p)),C=Math.min(l,R),O=(C-1)*p,Z=b.slice(O,O+p),at=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries"),P=Number(((Wt=at.rows[0])==null?void 0:Wt.cnt)??0),Be=await f.query(`SELECT 
       SUM(CASE WHEN email_sent = 1 THEN 1 ELSE 0 END) as sent,
       SUM(CASE WHEN email_sent = 0 THEN 1 ELSE 0 END) as failed,
       SUM(CASE WHEN COALESCE(status, 'pending') = 'invited' THEN 1 ELSE 0 END) as invited
     FROM waitlist_entries`),rt=Number(((zt=Be.rows[0])==null?void 0:zt.sent)??0);Number(((Gt=Be.rows[0])==null?void 0:Gt.failed)??0),Number(((Yt=Be.rows[0])==null?void 0:Yt.invited)??0);const de=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE"),$=Number(((Kt=de.rows[0])==null?void 0:Kt.cnt)??0),F=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE - INTERVAL '1 day'"),ee=Number(((Vt=F.rows[0])==null?void 0:Vt.cnt)??0);let I="";if(ee===0)$>0?I='<span class="growth-badge positive">↑ +100% vs yesterday</span>':I='<span class="growth-badge neutral">0% vs yesterday</span>';else{const g=Math.round(($-ee)/ee*100);g>0?I=`<span class="growth-badge positive">↑ +${g}% vs yesterday</span>`:g<0?I=`<span class="growth-badge negative">↓ ${g}% vs yesterday</span>`:I='<span class="growth-badge neutral">0% vs yesterday</span>'}const pe=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'"),qs=Number(((Jt=pe.rows[0])==null?void 0:Jt.cnt)??0),Fs=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'"),Ht=Number(((Qt=Fs.rows[0])==null?void 0:Qt.cnt)??0),Ws=(Ht/30).toFixed(1),zs=(await f.query("SELECT role, COUNT(*) as cnt FROM waitlist_entries GROUP BY role ORDER BY cnt DESC")).rows,Gs=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE company IS NOT NULL AND company != ''");Number(((Xt=Gs.rows[0])==null?void 0:Xt.cnt)??0);const yt={},Ys=new Set(["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","proton.me","protonmail.com","aol.com","live.com"]);let Mt=0;for(const g of b){const S=(g.email.split("@")[1]||"").toLowerCase();S&&(Ys.has(S)||(Mt++,yt[S]=(yt[S]||0)+1))}const Ut=Object.entries(yt).sort((g,S)=>S[1]-g[1]).slice(0,5),Bt=parseInt(s.searchParams.get("days")||"14",10),Re=[7,14,30,60].includes(Bt)?Bt:14,bt=((await f.query(`SELECT DATE(created_at) as day, COUNT(*) as cnt,
            SUM(CASE WHEN company IS NOT NULL AND company != '' THEN 1 ELSE 0 END) as corp_cnt
     FROM waitlist_entries
     GROUP BY DATE(created_at)
     ORDER BY day DESC
     LIMIT $1`,[Re])).rows||[]).reverse(),Ks=Math.max(1,...bt.map(g=>Number(g.cnt)));let qt="N/A",wt=0;bt.forEach(g=>{const S=Number(g.cnt);S>wt&&(wt=S,qt=new Date(g.day).toLocaleDateString("en-US",{month:"short",day:"numeric"}))});const Vs=new Date().toISOString().split("T")[0],Js=bt.map(g=>{const S=Number(g.cnt),W=Number(g.corp_cnt||0),ke=Math.round(S/Ks*100),es=new Date(g.day),ts=es.toLocaleDateString("en-US",{month:"short",day:"numeric"}),ss=es.toISOString().split("T")[0]===Vs;return`
      <div class="chart-bar-col" title="${ts}: ${S} total (${W} corporate)">
        <div class="chart-bar-track">
          <span class="chart-bar-value">${S}</span>
          <div class="chart-bar-fill ${ss?"today-bar":""}" style="height: ${Math.max(14,ke)}%;"></div>
        </div>
        <span class="chart-bar-label" style="${ss?"color:#f59e0b;font-weight:700;":""}">${ts}</span>
      </div>
    `}).join(""),Qs=await f.query(`SELECT EXTRACT(DOW FROM created_at) as dow, COUNT(*) as cnt
     FROM waitlist_entries
     GROUP BY dow
     ORDER BY dow`),xt={0:0,1:0,2:0,3:0,4:0,5:0,6:0};(Qs.rows||[]).forEach(g=>{xt[Math.floor(Number(g.dow))]=Number(g.cnt)});const Xs=Math.max(1,...Object.values(xt)),Zs=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ea=[1,2,3,4,5,6,0].map(g=>{const S=xt[g]||0,W=Math.round(S/Xs*100);return`
      <div class="dow-card">
        <span class="dow-name">${Zs[g]}</span>
        <span class="dow-count">${S}</span>
        <div class="dow-bar-track">
          <div class="dow-bar-fill" style="width: ${W}%;"></div>
        </div>
      </div>
    `}).join(""),ta=Object.entries(ct).map(([g,S])=>`<option value="${g}" ${r===g?"selected":""}>${N(S)}</option>`).join(""),sa=Z.length?Z.map(g=>{const S=new Date(g.created_at+"Z"),W=isNaN(S.getTime())?g.created_at:S.toLocaleDateString("en-US",{month:"short",day:"numeric"})+" · "+S.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),ke=g.status==="invited";return`
        <tr>
          <td><input type="checkbox" class="entry-checkbox" name="ids" value="${g.id}"/></td>
          <td class="pos-cell">#${616+g.position}</td>
          <td><span class="priority-badge ${g.priority.class}">${g.priority.label} (${g.priority.score})</span></td>
          <td>
            <div class="name-cell">${N(g.name)}</div>
            <div class="email-cell">${N(g.email)}</div>
          </td>
          <td><span class="role-badge">${N(ct[g.role]||g.role)}</span></td>
          <td>${g.company?N(g.company):'<span class="muted">—</span>'}</td>
          <td>${g.github?`<a href="${N(g.github)}" target="_blank" rel="noopener" class="github-link">${N(g.github.replace(/^https?:\/\/(www\.)?github\.com\//,"@"))}</a>`:'<span class="muted">—</span>'}</td>
          <td class="date-cell">${W}</td>
          <td>
            ${ke?'<span class="status-badge status-invited">Beta Invited</span>':'<span class="status-badge status-pending">In Queue</span>'}
          </td>
          <td>
            <div style="display:flex;gap:6px;align-items:center;">
              <form method="post" action="/admin/invite" style="margin:0;">
                <input type="hidden" name="email" value="${N(g.email)}" />
                <button type="submit" class="action-btn invite-btn">${ke?"Re-invite":"Invite"}</button>
              </form>
              <form method="post" action="/admin/retrigger" style="margin:0;">
                <input type="hidden" name="email" value="${N(g.email)}" />
                <button type="submit" class="action-btn">Resend Waitlist</button>
              </form>
              <form method="post" action="/admin/delete" style="margin:0;" onsubmit="return confirm('Delete ${N(g.name)} from waitlist?');">
                <input type="hidden" name="id" value="${g.id}" />
                <button type="submit" class="action-btn danger-btn">&times;</button>
              </form>
            </div>
          </td>
        </tr>`}).join(""):'<tr><td colspan="10" class="empty-row">No waitlist entries match your filters.</td></tr>',aa=(zs||[]).map(g=>{const S=Number(g.cnt),W=P?Math.round(S/P*100):0;return`
      <div class="role-bar-row">
        <div class="role-bar-label">${N(ct[g.role]||g.role)}</div>
        <div class="role-bar-track"><div class="role-bar-fill" style="width:${W}%"></div></div>
        <div class="role-bar-count">${S}</div>
      </div>`}).join(""),he=g=>{const S=new URLSearchParams;return a&&S.set("q",a),r&&S.set("role",r),n&&S.set("priority",n),i&&S.set("status",i),S.set("page",String(C)),Object.entries(g).forEach(([W,ke])=>S.set(W,String(ke))),"?"+S.toString()},Ft=(t==null?void 0:t.RESEND_API_KEY)||(typeof process<"u"?(Zt=process.env)==null?void 0:Zt.RESEND_API_KEY:void 0),ra=P?Math.round(rt/P*100):100,na=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Codeward Admin — Waitlist Control</title>
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
    <div style="display: flex; gap: 12px; align-items: center;">
      <button class="action-btn invite-btn" onclick="document.getElementById('vip-modal').classList.add('active')">+ Add VIP Lead</button>
      <a href="/" class="back-link">&larr; Public site</a>
      <a href="/admin/logout" class="back-link" style="color: #ef4444;">Logout</a>
    </div>
  </header>

  <!-- ── SYSTEM HEALTH BAR ── -->
  <div class="health-bar">
    <div class="health-item">
      <div class="health-dot"></div>
      <span>Neon PostgreSQL: <strong>Connected</strong></span>
    </div>
    <div class="health-item">
      <div class="health-dot ${Ft?"":"red"}"></div>
      <span>Resend API: <strong>${Ft?"Active":"Missing API Key"}</strong></span>
    </div>
    <div class="health-item">
      <span>Delivery Rate: <strong>${ra}%</strong></span>
    </div>
    <div class="health-item">
      <span>Corporate Leads: <strong>${Mt}</strong></span>
    </div>
  </div>

  ${c}

  <section class="stats-row" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
    <div class="stat-card">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span class="stat-num">${P.toLocaleString()}</span>
      </div>
      <span class="stat-label">total signups</span>
    </div>
    <div class="stat-card">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span class="stat-num accent">+${$.toLocaleString()}</span>
        ${I}
      </div>
      <span class="stat-label">joined today</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#a855f7;">${qs.toLocaleString()}</span>
      <span class="stat-label">last 7 days</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#3b82f6;">${Ht.toLocaleString()} <span style="font-size:12px;color:var(--muted);font-weight:400;">(${Ws}/day)</span></span>
      <span class="stat-label">last 30 days</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#f59e0b;">${wt}</span>
      <span class="stat-label">peak day (${qt})</span>
    </div>
  </section>

  <!-- ── ANALYTICS GRID ── -->
  <div class="analytics-grid">
    <section class="panel chart-card" style="grid-column: span 2;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
        <h2 class="panel-title" style="margin:0;">Daily Signups & Velocity</h2>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div class="timeframe-picker">
            <a href="${he({days:7})}" class="timeframe-btn ${Re===7?"active":""}">7D</a>
            <a href="${he({days:14})}" class="timeframe-btn ${Re===14?"active":""}">14D</a>
            <a href="${he({days:30})}" class="timeframe-btn ${Re===30?"active":""}">30D</a>
            <a href="${he({days:60})}" class="timeframe-btn ${Re===60?"active":""}">60D</a>
          </div>
          <a href="/admin/export-daily-csv" class="action-btn" style="text-decoration:none;">
            📥 Export Daily CSV
          </a>
        </div>
      </div>

      <div class="chart-container">
        ${Js||'<p class="muted">No recent signups.</p>'}
      </div>

      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot regular"></div> Daily Signups</div>
        <div class="legend-item"><div class="legend-dot today"></div> Today's Signups</div>
        <div style="margin-left:auto;font-size:11px;color:var(--muted);">Showing last ${Re} days</div>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Top Corporate Domains</h2>
      <div class="domain-list">
        ${Ut.length?Ut.map(([g,S])=>`
            <div class="domain-item">
              <span class="domain-name">@${N(g)}</span>
              <span class="domain-count">${S} lead${S>1?"s":""}</span>
            </div>
          `).join(""):'<p class="muted" style="font-size:13px;">No corporate domains yet.</p>'}
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Day-of-Week Pattern (Mon–Sun)</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px;">Signup velocity across days of the week:</p>
      <div class="dow-grid">
        ${ea}
      </div>
    </section>
  </div>

  <!-- ── ROLE BREAKDOWN PANEL ── -->
  <section class="panel role-breakdown-panel">
    <h2 class="panel-title">Role breakdown</h2>
    <div class="role-bars">
      ${aa||'<p class="muted">No data yet.</p>'}
    </div>
  </section>

  <!-- ── MAIN WAITLIST TABLE PANEL ── -->
  <section class="panel">
    <div class="panel-toolbar">
      <h2 class="panel-title">Waitlist entries (${x.toLocaleString()})</h2>
      <div style="display:flex;gap:10px;">
        <a class="export-btn" href="/admin/export.csv${he({})}">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Export CSV
        </a>
      </div>
    </div>

    <!-- Filter Bar -->
    <form class="filter-bar" method="get" action="/admin">
      <input type="text" name="q" placeholder="Search name, email, or company…" value="${N(a)}" class="search-input"/>
      
      <select name="role" class="role-select">
        <option value="">All roles</option>
        ${ta}
      </select>

      <select name="priority" class="role-select">
        <option value="">All priorities</option>
        <option value="high" ${n==="high"?"selected":""}>🔥 High Priority (VIP)</option>
        <option value="medium" ${n==="medium"?"selected":""}>⚡ Medium Priority</option>
        <option value="standard" ${n==="standard"?"selected":""}>🟢 Standard</option>
      </select>

      <select name="status" class="role-select">
        <option value="">All statuses</option>
        <option value="pending" ${i==="pending"?"selected":""}>In Queue</option>
        <option value="invited" ${i==="invited"?"selected":""}>Beta Invited</option>
      </select>

      <button type="submit" class="filter-btn">Filter</button>
      ${a||r||n||i?'<a href="/admin" class="clear-btn">Clear</a>':""}
    </form>

    <!-- Bulk Action Toolbar -->
    <form id="bulk-form" method="post" action="/admin/bulk-action">
      <div class="bulk-toolbar" id="bulk-bar" style="display:none;">
        <span class="bulk-count" id="bulk-count-text">0 selected</span>
        <button type="submit" name="action" value="invite" class="action-btn invite-btn">Bulk Invite to Beta</button>
        <button type="submit" name="action" value="retrigger" class="action-btn">Bulk Resend Email</button>
        <button type="submit" name="action" value="delete" class="action-btn danger-btn" onclick="return confirm('Delete selected entries?');">Bulk Delete</button>
      </div>

      <div class="table-wrap">
        <table class="entries-table">
          <thead>
            <tr>
              <th width="30"><input type="checkbox" id="select-all"/></th>
              <th>Pos</th>
              <th>Score</th>
              <th>Name / Email</th>
              <th>Role</th>
              <th>Company</th>
              <th>GitHub</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${sa}
          </tbody>
        </table>
      </div>
    </form>

    <div class="pagination">
      <span class="page-info">Showing ${Z.length?O+1:0}–${O+Z.length} of ${x.toLocaleString()}</span>
      <div class="page-buttons">
        <a href="/admin${he({page:Math.max(1,C-1)})}" class="page-btn ${C<=1?"disabled":""}">&larr; Prev</a>
        <span class="page-current">Page ${C} of ${R}</span>
        <a href="/admin${he({page:Math.min(R,C+1)})}" class="page-btn ${C>=R?"disabled":""}">Next &rarr;</a>
      </div>
    </div>
  </section>

</div>

<!-- ── ADD VIP LEAD MODAL ── -->
<div class="admin-modal-overlay" id="vip-modal">
  <div class="admin-modal">
    <div class="admin-modal-header">
      <h3>Add VIP Waitlist Lead</h3>
      <button class="admin-modal-close" onclick="document.getElementById('vip-modal').classList.remove('active')">&times;</button>
    </div>
    <form class="modal-form" method="post" action="/admin/add-lead">
      <div class="modal-field">
        <label>Full Name</label>
        <input type="text" name="name" placeholder="e.g. Elon Musk" required />
      </div>
      <div class="modal-field">
        <label>Email Address</label>
        <input type="email" name="email" placeholder="e.g. elon@x.com" required />
      </div>
      <div class="modal-field">
        <label>Role</label>
        <select name="role" required>
          <option value="cto-vp">CTO / VP of Engineering</option>
          <option value="founder" selected>Founder / Indie Hacker</option>
          <option value="engineering-lead">Engineering Lead / Manager</option>
          <option value="senior-engineer">Senior / Staff Engineer</option>
          <option value="software-engineer">Software Engineer</option>
        </select>
      </div>
      <div class="modal-field">
        <label>Company</label>
        <input type="text" name="company" placeholder="e.g. xAI, Tesla" />
      </div>
      <div class="modal-field">
        <label>GitHub Profile</label>
        <input type="text" name="github" placeholder="https://github.com/elonmusk" />
      </div>
      <div style="display:flex;gap:10px;margin-top:12px;">
        <button type="submit" class="filter-btn" style="flex:1;">Add Lead &rarr;</button>
        <button type="button" class="clear-btn" onclick="document.getElementById('vip-modal').classList.remove('active')">Cancel</button>
      </div>
    </form>
  </div>
</div>

<script>
  // Bulk selection handling
  const selectAll = document.getElementById('select-all');
  const checkboxes = document.querySelectorAll('.entry-checkbox');
  const bulkBar = document.getElementById('bulk-bar');
  const bulkText = document.getElementById('bulk-count-text');

  function updateBulkBar() {
    const checked = document.querySelectorAll('.entry-checkbox:checked');
    if (checked.length > 0) {
      bulkBar.style.display = 'flex';
      bulkText.textContent = checked.length + ' selected';
    } else {
      bulkBar.style.display = 'none';
    }
  }

  if (selectAll) {
    selectAll.addEventListener('change', () => {
      checkboxes.forEach(cb => cb.checked = selectAll.checked);
      updateBulkBar();
    });
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', updateBulkBar);
  });
<\/script>

</body>
</html>`;return e.html(na)});j.post("/invite",async e=>{const{env:t}=e,a=((await e.req.parseBody()).email||"").toString().trim();if(!a)return e.redirect("/admin");const r=await Q(e).connect(),i=(await r.query("SELECT name, position FROM waitlist_entries WHERE email = $1",[a])).rows[0];return i&&await Ns(t,a,i.name,i.position)?(await r.query("UPDATE waitlist_entries SET status = 'invited', invited_at = CURRENT_TIMESTAMP WHERE email = $1",[a]),e.redirect("/admin?msg=invite_success")):e.redirect("/admin?msg=retrigger_failed")});j.post("/bulk-action",async e=>{const{env:t}=e,s=await e.req.parseBody(),a=(s.action||"").toString();let r=s.ids;if(!r)return e.redirect("/admin");Array.isArray(r)||(r=[r]);const n=await Q(e).connect();for(const i of r){const l=parseInt(i.toString(),10);if(isNaN(l))continue;const o=(await n.query("SELECT email, name, position FROM waitlist_entries WHERE id = $1",[l])).rows[0];o&&(a==="invite"?await Ns(t,o.email,o.name,o.position)&&await n.query("UPDATE waitlist_entries SET status = 'invited', invited_at = CURRENT_TIMESTAMP WHERE id = $1",[l]):a==="retrigger"?await vt(t,o.email,o.name,o.position)&&await n.query("UPDATE waitlist_entries SET email_sent = 1 WHERE id = $1",[l]):a==="delete"&&await n.query("DELETE FROM waitlist_entries WHERE id = $1",[l]))}return e.redirect("/admin?msg=bulk_success")});j.post("/add-lead",async e=>{var p;const{env:t}=e,s=await e.req.parseBody(),a=(s.name||"").toString().trim(),r=(s.email||"").toString().trim().toLowerCase(),n=(s.role||"founder").toString().trim(),i=(s.company||"").toString().trim(),l=(s.github||"").toString().trim();if(a.length>=2&&r.includes("@")){const o=await Q(e).connect(),c=await o.query("SELECT COUNT(*) as cnt FROM waitlist_entries"),d=Number(((p=c.rows[0])==null?void 0:p.cnt)??0)+1;await o.query(`INSERT INTO waitlist_entries (name, email, role, company, github, position) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT (email) DO NOTHING`,[a,r,n,i||null,l||null,d]),await vt(t,r,a,d),await o.query("UPDATE waitlist_entries SET email_sent = 1 WHERE email = $1",[r])}return e.redirect("/admin?msg=add_lead_success")});j.post("/delete",async e=>{const t=await e.req.parseBody(),s=parseInt((t.id||"").toString(),10);return isNaN(s)||await(await Q(e).connect()).query("DELETE FROM waitlist_entries WHERE id = $1",[s]),e.redirect("/admin?msg=delete_success")});j.get("/export.csv",async e=>{const{env:t}=e,s=new URL(e.req.url),a=(s.searchParams.get("q")||"").trim(),r=(s.searchParams.get("role")||"").trim(),n=(s.searchParams.get("status")||"").trim();let i="WHERE 1=1";const l=[];let p=1;if(a){i+=` AND (LOWER(name) LIKE $${p++} OR LOWER(email) LIKE $${p++} OR LOWER(company) LIKE $${p++})`;const v=`%${a.toLowerCase()}%`;l.push(v,v,v)}r&&(i+=` AND role = $${p++}`,l.push(r)),n&&(i+=` AND COALESCE(status, 'pending') = $${p++}`,l.push(n));const d=(await(await Q(e).connect()).query(`SELECT id, name, email, role, company, github, position, created_at, status, invited_at
     FROM waitlist_entries ${i}
     ORDER BY created_at ASC`,l)).rows||[],m=[["Position","Priority Score","Name","Email","Role","Company","GitHub","Beta Status","Joined At (UTC)"].join(",")];for(const v of d){const b=Ds(v);m.push([616+v.position,`${b.score} (${b.level})`,se(v.name),se(v.email),se(ct[v.role]||v.role),se(v.company||""),se(v.github||""),se(v.status||"pending"),se(v.created_at)].join(","))}const f=m.join(`
`);return new Response(f,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="codeward-waitlist-${new Date().toISOString().slice(0,10)}.csv"`}})});j.get("/export-daily-csv",async e=>{const s=await(await Q(e).connect()).query(`SELECT DATE(created_at) as date,
            COUNT(*) as total_signups,
            SUM(CASE WHEN company IS NOT NULL AND company != '' THEN 1 ELSE 0 END) as corporate_signups,
            SUM(CASE WHEN COALESCE(status, 'pending') = 'invited' THEN 1 ELSE 0 END) as invited_count
     FROM waitlist_entries
     GROUP BY DATE(created_at)
     ORDER BY date DESC`),r=[["Date","Total Signups","Corporate Signups","Invited Count"].join(",")];for(const i of s.rows||[]){const l=i.date?new Date(i.date).toISOString().split("T")[0]:"";r.push([se(l),i.total_signups||0,i.corporate_signups||0,i.invited_count||0].join(","))}const n=r.join(`
`);return new Response(n,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="codeward-daily-signups-${new Date().toISOString().slice(0,10)}.csv"`}})});j.post("/retrigger",async e=>{const{env:t}=e,a=((await e.req.parseBody()).email||"").toString().trim();if(!a)return e.redirect("/admin");const r=await Q(e).connect(),i=(await r.query("SELECT name, position FROM waitlist_entries WHERE email = $1",[a])).rows[0];return i&&await vt(t,a,i.name,i.position)?(await r.query("UPDATE waitlist_entries SET email_sent = 1 WHERE email = $1",[a]),e.redirect("/admin?msg=retrigger_success")):e.redirect("/admin?msg=retrigger_failed")});typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);function Za(e){const a=`https://${new URL(e).hostname}/sql`;async function r(i,l=[]){const p=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","Neon-Connection-String":e},body:JSON.stringify({query:i,params:l})});if(!p.ok){const c=await p.text();throw new Error(`DB error ${p.status}: ${c}`)}const o=await p.json();return{rows:o.rows??[],rowCount:o.rowCount??0}}async function n(i,...l){let p="";const o=[];return i.forEach((c,d)=>{p+=c,d<l.length&&(o.push(l[d]===void 0?null:l[d]),p+=`$${o.length}`)}),r(p,o)}return n.connect=async()=>({query:r,release:()=>{}}),n.query=r,n}let Ct=null;function ae(e){var t,s,a;if(!Ct){const r=((t=e==null?void 0:e.env)==null?void 0:t.POSTGRES_URL)||((s=e==null?void 0:e.env)==null?void 0:s.DATABASE_POSTGRES_URL)||((a=e==null?void 0:e.env)==null?void 0:a.DATABASE_URL)||(typeof process<"u"&&process.env?process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL:void 0);if(!r)throw new Error("No database connection string found in environment");Ct=Za(r)}return Ct}function Oe(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const X=new Nt;X.onError((e,t)=>(console.error("Hono Global Error:",e),t.json({error:e.message||"Internal Server Error"},500)));X.route("/admin",j);X.get("/terms",e=>e.html(`<!DOCTYPE html>
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
      word-break: break-word;
      overflow-wrap: break-word;
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
      font-size: clamp(28px, 6vw, 36px);
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
      flex-wrap: wrap;
      gap: 16px;
      color: var(--muted);
      font-size: 14px;
    }
    @media (max-width: 640px) {
      .legal-container {
        padding: 36px 16px 60px;
      }
      .legal-header {
        margin-bottom: 32px;
        padding-bottom: 24px;
      }
      .legal-section {
        margin-bottom: 28px;
      }
      .legal-section h2 {
        font-size: 18px;
      }
      .legal-section p {
        font-size: 15px;
      }
      .legal-footer {
        flex-direction: column;
        align-items: flex-start;
      }
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
      <p>If you have any questions regarding these terms or your personal data, please reach out to us at <a href="mailto:support@codeward.cloud" style="color: var(--brand-green); text-decoration: underline;">support@codeward.cloud</a>.</p>
    </div>

    <div class="legal-footer">
      <span>&copy; ${new Date().getFullYear()} Codeward. All rights reserved.</span>
      <a href="/" class="back-link" style="margin-bottom: 0;">Back to Home</a>
    </div>
  </div>
</body>
</html>`));const me=617;X.get("/api/stats",async e=>{var r;const{env:t}=e,{rows:s}=await ae(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,a=Number(((r=s[0])==null?void 0:r.cnt)??0);return e.json({count:me+a})});function er(e){function t(f,v){const b=(f&65535)+(v&65535);return(f>>16)+(v>>16)+(b>>16)<<16|b&65535}function s(f,v){return f<<v|f>>>32-v}function a(f,v,b,x,R,C){return t(s(t(t(v,f),t(x,C)),R),b)}function r(f,v,b,x,R,C,O){return a(v&b|~v&x,f,v,R,C,O)}function n(f,v,b,x,R,C,O){return a(v&x|b&~x,f,v,R,C,O)}function i(f,v,b,x,R,C,O){return a(v^b^x,f,v,R,C,O)}function l(f,v,b,x,R,C,O){return a(b^(v|~x),f,v,R,C,O)}function p(f){const v=(f.length+8>>6)+1,b=new Array(v*16).fill(0);for(let x=0;x<f.length;x++)b[x>>2]|=f.charCodeAt(x)<<x%4*8;return b[f.length>>2]|=128<<f.length%4*8,b[v*16-2]=f.length*8,b}const o=p(e.toLowerCase().trim());let c=1732584193,d=-271733879,u=-1732584194,m=271733878;for(let f=0;f<o.length;f+=16){const[v,b,x,R]=[c,d,u,m];c=r(c,d,u,m,o[f+0],7,-680876936),d=r(m,c,d,u,o[f+1],12,-389564586),u=r(u,m,c,d,o[f+2],17,606105819),m=r(d,u,m,c,o[f+3],22,-1044525330),c=r(c,d,u,m,o[f+4],7,-176418897),d=r(m,c,d,u,o[f+5],12,1200080426),u=r(u,m,c,d,o[f+6],17,-1473231341),m=r(d,u,m,c,o[f+7],22,-45705983),c=r(c,d,u,m,o[f+8],7,1770035416),d=r(m,c,d,u,o[f+9],12,-1958414417),u=r(u,m,c,d,o[f+10],17,-42063),m=r(d,u,m,c,o[f+11],22,-1990404162),c=r(c,d,u,m,o[f+12],7,1804603682),d=r(m,c,d,u,o[f+13],12,-40341101),u=r(u,m,c,d,o[f+14],17,-1502002290),m=r(d,u,m,c,o[f+15],22,1236535329),c=n(c,d,u,m,o[f+1],5,-165796510),d=n(m,c,d,u,o[f+6],9,-1069501632),u=n(u,m,c,d,o[f+11],14,643717713),m=n(d,u,m,c,o[f+0],20,-373897302),c=n(c,d,u,m,o[f+5],5,-701558691),d=n(m,c,d,u,o[f+10],9,38016083),u=n(u,m,c,d,o[f+15],14,-660478335),m=n(d,u,m,c,o[f+4],20,-405537848),c=n(c,d,u,m,o[f+9],5,568446438),d=n(m,c,d,u,o[f+14],9,-1019803690),u=n(u,m,c,d,o[f+3],14,-187363961),m=n(d,u,m,c,o[f+8],20,1163531501),c=n(c,d,u,m,o[f+13],5,-1444681467),d=n(m,c,d,u,o[f+2],9,-51403784),u=n(u,m,c,d,o[f+7],14,1735328473),m=n(d,u,m,c,o[f+12],20,-1926607734),c=i(c,d,u,m,o[f+5],4,-378558),d=i(m,c,d,u,o[f+8],11,-2022574463),u=i(u,m,c,d,o[f+11],16,1839030562),m=i(d,u,m,c,o[f+14],23,-35309556),c=i(c,d,u,m,o[f+1],4,-1530992060),d=i(m,c,d,u,o[f+4],11,1272893353),u=i(u,m,c,d,o[f+7],16,-155497632),m=i(d,u,m,c,o[f+10],23,-1094730640),c=i(c,d,u,m,o[f+13],4,681279174),d=i(m,c,d,u,o[f+0],11,-358537222),u=i(u,m,c,d,o[f+3],16,-722521979),m=i(d,u,m,c,o[f+6],23,76029189),c=i(c,d,u,m,o[f+9],4,-640364487),d=i(m,c,d,u,o[f+12],11,-421815835),u=i(u,m,c,d,o[f+15],16,530742520),m=i(d,u,m,c,o[f+2],23,-995338651),c=l(c,d,u,m,o[f+0],6,-198630844),d=l(m,c,d,u,o[f+7],10,1126891415),u=l(u,m,c,d,o[f+14],15,-1416354905),m=l(d,u,m,c,o[f+5],21,-57434055),c=l(c,d,u,m,o[f+12],6,1700485571),d=l(m,c,d,u,o[f+3],10,-1894986606),u=l(u,m,c,d,o[f+10],15,-1051523),m=l(d,u,m,c,o[f+1],21,-2054922799),c=l(c,d,u,m,o[f+8],6,1873313359),d=l(m,c,d,u,o[f+15],10,-30611744),u=l(u,m,c,d,o[f+6],15,-1560198380),m=l(d,u,m,c,o[f+13],21,1309151649),c=l(c,d,u,m,o[f+4],6,-145523070),d=l(m,c,d,u,o[f+11],10,-1120210379),u=l(u,m,c,d,o[f+2],15,718787259),m=l(d,u,m,c,o[f+9],21,-343485551),c=t(c,v),d=t(d,b),u=t(u,x),m=t(m,R)}return[c,d,u,m].map(f=>{let v="";for(let b=0;b<4;b++)v+=("0"+(f>>b*8&255).toString(16)).slice(-2);return v}).join("")}X.get("/api/avatars",async e=>{try{const{rows:t}=await ae(e)`SELECT name, email FROM waitlist_entries ORDER BY id DESC LIMIT 8`,s=t.map(a=>{let r="";try{r=er(a.email||"")}catch{}const n=(a.name||"").trim(),i=n.split(" ")[0]||"",l=n.split(" ")[1]||"";return{initials:((i[0]||"")+(l[0]||"")).toUpperCase()||"?",emailHash:r}});return e.json({avatars:s},200,{"Cache-Control":"public, max-age=60"})}catch{return e.json({avatars:[]})}});X.post("/api/join",async e=>{var v;const{env:t}=e;let s;try{s=await e.req.json()}catch{return e.json({error:"Invalid request body"},400)}const a=(s.name||"").toString().trim(),r=(s.email||"").toString().trim().toLowerCase(),n=(s.role||"").toString().trim(),i=(s.company||"").toString().trim(),l=(s.github||"").toString().trim();if(a.length<2)return e.json({error:"Please enter your full name."},400);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return e.json({error:"Please enter a valid email address."},400);if(!n)return e.json({error:"Please select your role."},400);const{rows:p}=await ae(e)`SELECT id, position FROM waitlist_entries WHERE email = ${r}`,o=p[0];if(o){const{rows:b}=await ae(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,x=b[0];return e.json({alreadyJoined:!0,position:me+Number(o.position),total:me+Number((x==null?void 0:x.cnt)??0)})}const{rows:c}=await ae(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,d=c[0],u=Number((d==null?void 0:d.cnt)??0)+1;await ae(e)`INSERT INTO waitlist_entries (name, email, role, company, github, position) VALUES (${a}, ${r}, ${n}, ${i||null}, ${l||null}, ${u})`;let m=0;if((t==null?void 0:t.RESEND_API_KEY)||(typeof process<"u"?(v=process.env)==null?void 0:v.RESEND_API_KEY:void 0)){await vt(t,r,a,u)&&(m=1);try{await tr(t,a,r,n,i,l,me+u)}catch(x){console.error("Failed sending admin notification email:",x)}}return await ae(e)`UPDATE waitlist_entries SET email_sent = ${m} WHERE email = ${r}`,e.json({success:!0,position:me+u,total:me+Number((d==null?void 0:d.cnt)??0)+1})});async function vt(e,t,s,a){const r=e.RESEND_API_KEY||process.env.RESEND_API_KEY;if(!r)return!1;try{const n=(me+a).toLocaleString(),i=`<!DOCTYPE html>
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
        Hi ${Oe(s)} — thanks for requesting early access to Codeward. I wanted to reach out myself rather than send a form reply.
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
</html>`,l=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${r}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward <waitlist@codeward.cloud>",to:[t],subject:"You are on the Codeward waitlist",html:i})});if(!l.ok){const p=await l.text();console.error("Resend API Error:",l.status,p)}return l.ok}catch(n){return console.error("Failed to send email",n),!1}}async function tr(e,t,s,a,r,n,i){const l=e.RESEND_API_KEY||process.env.RESEND_API_KEY;if(!l)return!1;try{const p=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward System <waitlist@codeward.cloud>",to:["kelvin.reallife8@gmail.com"],subject:`New Waitlist Sign-up: ${t}`,html:`
          <h3>New Waitlist Sign-up Details</h3>
          <p><strong>Name:</strong> ${Oe(t)}</p>
          <p><strong>Email:</strong> ${Oe(s)}</p>
          <p><strong>Role:</strong> ${Oe(a)}</p>
          <p><strong>Company:</strong> ${Oe(r||"None")}</p>
          <p><strong>GitHub:</strong> ${Oe(n||"None")}</p>
          <p><strong>Position:</strong> #${i}</p>
        `})});if(!p.ok){const o=await p.text();console.error("Resend API Error (Admin Notification):",p.status,o)}return p.ok}catch(p){return console.error("Failed to send admin email",p),!1}}X.post("/api/track-linkedin",async e=>{const{env:t}=e;let s;try{s=await e.req.json()}catch{return e.json({error:"Invalid body"},400)}return s.email&&await sql`UPDATE waitlist_entries SET linkedin_clicked = 1 WHERE email = ${s.email}`,e.json({success:!0})});X.get("/",e=>(e.header("Cache-Control","no-store, no-cache, must-revalidate, proxy-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(sr)));const sr=`<!DOCTYPE html>
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
    <div class="form-container form-card reveal" id="form-card">
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
</html>`;var ge=class extends Error{constructor(e,t){super(e,t),this.name="RequestError"}},ar=e=>e instanceof ge?e:new ge(e.message,{cause:e}),rr=global.Request,Ke=class extends rr{constructor(t,s){var a;typeof t=="object"&&Me in t&&(t=t[Me]()),typeof((a=s==null?void 0:s.body)==null?void 0:a.getReader)<"u"&&(s.duplex??(s.duplex="half")),super(t,s)}},nr=e=>{const t=[],s=e.rawHeaders;for(let a=0;a<s.length;a+=2){const{[a]:r,[a+1]:n}=s;r.charCodeAt(0)!==58&&t.push([r,n])}return new Headers(t)},Is=Symbol("wrapBodyStream"),ir=(e,t,s,a,r)=>{const n={method:e,headers:s,signal:r.signal};if(e==="TRACE"){n.method="GET";const i=new Ke(t,n);return Object.defineProperty(i,"method",{get(){return"TRACE"}}),i}if(!(e==="GET"||e==="HEAD"))if("rawBody"in a&&a.rawBody instanceof Buffer)n.body=new ReadableStream({start(i){i.enqueue(a.rawBody),i.close()}});else if(a[Is]){let i;n.body=new ReadableStream({async pull(l){try{i||(i=ns.toWeb(a).getReader());const{done:p,value:o}=await i.read();p?l.close():l.enqueue(o)}catch(p){l.error(p)}}})}else n.body=ns.toWeb(a);return new Ke(t,n)},Me=Symbol("getRequestCache"),dt=Symbol("requestCache"),pt=Symbol("incomingKey"),ut=Symbol("urlKey"),At=Symbol("headersKey"),re=Symbol("abortControllerKey"),or=Symbol("getAbortController"),st={get method(){return this[pt].method||"GET"},get url(){return this[ut]},get headers(){return this[At]||(this[At]=nr(this[pt]))},[or](){return this[Me](),this[re]},[Me](){return this[re]||(this[re]=new AbortController),this[dt]||(this[dt]=ir(this.method,this[ut],this.headers,this[pt],this[re]))}};["body","bodyUsed","cache","credentials","destination","integrity","mode","redirect","referrer","referrerPolicy","signal","keepalive"].forEach(e=>{Object.defineProperty(st,e,{get(){return this[Me]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(st,e,{value:function(){return this[Me]()[e]()}})});Object.defineProperty(st,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,s){const a={method:this.method,url:this.url,headers:this.headers,nativeRequest:this[dt]};return`Request (lightweight) ${s(a,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(st,Ke.prototype);var lr=(e,t)=>{const s=Object.create(st);s[pt]=e;const a=e.url||"";if(a[0]!=="/"&&(a.startsWith("http://")||a.startsWith("https://"))){if(e instanceof ze)throw new ge("Absolute URL for :path is not allowed in HTTP/2");try{const l=new URL(a);s[ut]=l.href}catch(l){throw new ge("Invalid absolute URL",{cause:l})}return s}const r=(e instanceof ze?e.authority:e.headers.host)||t;if(!r)throw new ge("Missing host header");let n;if(e instanceof ze){if(n=e.scheme,!(n==="http"||n==="https"))throw new ge("Unsupported scheme")}else n=e.socket&&e.socket.encrypted?"https":"http";const i=new URL(`${n}://${r}${a}`);if(i.hostname.length!==r.length&&i.hostname!==r.replace(/:\d+$/,""))throw new ge("Invalid host header");return s[ut]=i.href,s},We=Symbol("responseCache"),Le=Symbol("getResponseCache"),ve=Symbol("cache"),It=global.Response,tt,V,He,Ue=(He=class{constructor(t,s){E(this,tt);E(this,V);let a;if(y(this,tt,t),s instanceof He){const r=s[We];if(r){y(this,V,r),this[Le]();return}else y(this,V,h(s,V)),a=new Headers(h(s,V).headers)}else y(this,V,s);(typeof t=="string"||typeof(t==null?void 0:t.getReader)<"u"||t instanceof Blob||t instanceof Uint8Array)&&(this[ve]=[(s==null?void 0:s.status)||200,t,a||(s==null?void 0:s.headers)])}[Le](){return delete this[ve],this[We]||(this[We]=new It(h(this,tt),h(this,V)))}get headers(){const t=this[ve];return t?(t[2]instanceof Headers||(t[2]=new Headers(t[2]||{"content-type":"text/plain; charset=UTF-8"})),t[2]):this[Le]().headers}get status(){var t;return((t=this[ve])==null?void 0:t[0])??this[Le]().status}get ok(){const t=this.status;return t>=200&&t<300}},tt=new WeakMap,V=new WeakMap,He);["body","bodyUsed","redirected","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty(Ue.prototype,e,{get(){return this[Le]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(Ue.prototype,e,{value:function(){return this[Le]()[e]()}})});Object.defineProperty(Ue.prototype,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,s){const a={status:this.status,headers:this.headers,ok:this.ok,nativeResponse:this[We]};return`Response (lightweight) ${s(a,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(Ue,It);Object.setPrototypeOf(Ue.prototype,It.prototype);async function cr(e){return Promise.race([e,Promise.resolve().then(()=>Promise.resolve(void 0))])}function js(e,t,s){const a=l=>{e.cancel(l).catch(()=>{})};return t.on("close",a),t.on("error",a),(s??e.read()).then(i,r),e.closed.finally(()=>{t.off("close",a),t.off("error",a)});function r(l){l&&t.destroy(l)}function n(){e.read().then(i,r)}function i({done:l,value:p}){try{if(l)t.end();else if(!t.write(p))t.once("drain",n);else return e.read().then(i,r)}catch(o){r(o)}}}function dr(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");return t.destroyed?void 0:js(e.getReader(),t)}var _t=e=>{const t={};e instanceof Headers||(e=new Headers(e??void 0));const s=[];for(const[a,r]of e)a==="set-cookie"?s.push(r):t[a]=r;return s.length>0&&(t["set-cookie"]=s),t["content-type"]??(t["content-type"]="text/plain; charset=UTF-8"),t},pr="x-hono-already-sent";typeof global.crypto>"u"&&(global.crypto=ca);var jt=Symbol("outgoingEnded"),ps=Symbol("incomingDraining"),hr=500,ur=64*1024*1024,Tt=e=>{var l,p,o;const t=e;if(e.destroyed||t[ps])return;if(t[ps]=!0,e instanceof ze){try{(p=(l=e.stream)==null?void 0:l.close)==null||p.call(l,la.NGHTTP2_NO_ERROR)}catch{}return}let s=0;const a=()=>{clearTimeout(n),e.off("data",i),e.off("end",a),e.off("error",a)},r=()=>{a();const c=e.socket;c&&!c.destroyed&&c.destroySoon()},n=setTimeout(r,hr);(o=n.unref)==null||o.call(n);const i=c=>{s+=c.length,s>ur&&r()};e.on("data",i),e.on("end",a),e.on("error",a),e.resume()},fr=()=>new Response(null,{status:400}),Hs=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),Pt=(e,t)=>{const s=e instanceof Error?e:new Error("unknown error",{cause:e});s.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${s.message}`),t.destroy(s))},Ms=e=>{"flushHeaders"in e&&e.writable&&e.flushHeaders()},Us=async(e,t)=>{var i,l;let[s,a,r]=e[ve],n=!1;if(!r)r={"content-type":"text/plain; charset=UTF-8"};else if(r instanceof Headers)n=r.has("content-length"),r=_t(r);else if(Array.isArray(r)){const p=new Headers(r);n=p.has("content-length"),r=_t(p)}else for(const p in r)if(p.length===14&&p.toLowerCase()==="content-length"){n=!0;break}n||(typeof a=="string"?r["Content-Length"]=Buffer.byteLength(a):a instanceof Uint8Array?r["Content-Length"]=a.byteLength:a instanceof Blob&&(r["Content-Length"]=a.size)),t.writeHead(s,r),typeof a=="string"||a instanceof Uint8Array?t.end(a):a instanceof Blob?t.end(new Uint8Array(await a.arrayBuffer())):(Ms(t),await((i=dr(a,t))==null?void 0:i.catch(p=>Pt(p,t)))),(l=t[jt])==null||l.call(t)},mr=e=>typeof e.then=="function",gr=async(e,t,s={})=>{var r;if(mr(e))if(s.errorHandler)try{e=await e}catch(n){const i=await s.errorHandler(n);if(!i)return;e=i}else e=await e.catch(Hs);if(ve in e)return Us(e,t);const a=_t(e.headers);if(e.body){const n=e.body.getReader(),i=[];let l=!1,p;if(a["transfer-encoding"]!=="chunked"){let o=2;for(let c=0;c<o;c++){p||(p=n.read());const d=await cr(p).catch(u=>{console.error(u),l=!0});if(!d){if(c===1){await new Promise(u=>setTimeout(u)),o=3;continue}break}if(p=void 0,d.value&&i.push(d.value),d.done){l=!0;break}}l&&!("content-length"in a)&&(a["content-length"]=i.reduce((c,d)=>c+d.length,0))}t.writeHead(e.status,a),i.forEach(o=>{t.write(o)}),l?t.end():(i.length===0&&Ms(t),await js(n,t,p))}else a[pr]||(t.writeHead(e.status,a),t.end());(r=t[jt])==null||r.call(t)},vr=(e,t={})=>{const s=t.autoCleanupIncoming??!0;return t.overrideGlobalObjects!==!1&&global.Request!==Ke&&(Object.defineProperty(global,"Request",{value:Ke}),Object.defineProperty(global,"Response",{value:Ue})),async(a,r)=>{let n,i;try{i=lr(a,t.hostname);let l=!s||a.method==="GET"||a.method==="HEAD";if(l||(a[Is]=!0,a.on("end",()=>{l=!0}),a instanceof ze&&(r[jt]=()=>{l||setTimeout(()=>{l||setTimeout(()=>{Tt(a)})})}),r.on("finish",()=>{l||Tt(a)})),r.on("close",()=>{i[re]&&(a.errored?i[re].abort(a.errored.toString()):r.writableFinished||i[re].abort("Client connection prematurely closed.")),l||setTimeout(()=>{l||setTimeout(()=>{Tt(a)})})}),n=e(i,{incoming:a,outgoing:r}),ve in n)return Us(n,r)}catch(l){if(n)return Pt(l,r);if(t.errorHandler){if(n=await t.errorHandler(i?l:ar(l)),!n)return}else i?n=Hs(l):n=fr()}try{return await gr(n,r,t)}catch(l){return Pt(l,r)}}},yr=e=>vr(e.fetch);const $t=new Nt,br=Object.assign({"/src/index.tsx":X});let Bs=!1;for(const[,e]of Object.entries(br))e&&($t.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),$t.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Bs=!0);if(!Bs)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");const Tr=yr($t);export{Tr as default};
