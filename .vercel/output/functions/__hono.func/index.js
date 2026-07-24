var da=Object.defineProperty;var is=e=>{throw TypeError(e)};var pa=(e,t,s)=>t in e?da(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var x=(e,t,s)=>pa(e,typeof t!="symbol"?t+"":t,s),St=(e,t,s)=>t.has(e)||is("Cannot "+s);var u=(e,t,s)=>(St(e,t,"read from private field"),s?s.call(e):t.get(e)),E=(e,t,s)=>t.has(e)?is("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),v=(e,t,s,a)=>(St(e,t,"write to private field"),a?a.call(e,s):t.set(e,s),s),C=(e,t,s)=>(St(e,t,"access private method"),s);var ns=(e,t,s,a)=>({set _(r){v(e,t,r,s)},get _(){return u(e,t,a)}});import{Http2ServerRequest as Ke,constants as ha}from"http2";import{Readable as os}from"stream";import ua from"crypto";var ls=(e,t,s)=>(a,r)=>{let i=-1;return n(0);async function n(l){if(l<=i)throw new Error("next() called multiple times");i=l;let p,o=!1,c;if(e[l]?(c=e[l][0][0],a.req.routeIndex=l):c=l===e.length&&r||void 0,c)try{p=await c(a,()=>n(l+1))}catch(d){if(d instanceof Error&&t)a.error=d,p=await t(d,a),o=!0;else throw d}else a.finalized===!1&&s&&(p=await s(a));return p&&(a.finalized===!1||o)&&(a.res=p),a}},fa=Symbol(),ma=(e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,a=>a.toLowerCase())}}).formData(),Lt=e=>"headers"in e,ga=async(e,t=Object.create(null))=>{const{all:s=!1,dot:a=!1}=t,i=(Lt(e)?e.headers:e.raw.headers).get("Content-Type"),n=i==null?void 0:i.split(";")[0].trim().toLowerCase();return n==="multipart/form-data"||n==="application/x-www-form-urlencoded"?ya(e,{all:s,dot:a}):{}};async function ya(e,t){const s=Lt(e)?e.headers:e.raw.headers,a=await e.arrayBuffer(),r=ma(a,s.get("Content-Type")||"");Lt(e)||(e.bodyCache.formData=r);const i=await r;return i?ba(i,t):{}}function ba(e,t){const s=Object.create(null);return e.forEach((a,r)=>{t.all||r.endsWith("[]")?va(s,r,a):s[r]=a}),t.dot&&Object.entries(s).forEach(([a,r])=>{a.includes(".")&&(wa(s,a,r),delete s[a])}),s}var va=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},wa=(e,t,s)=>{if(/(?:^|\.)__proto__\./.test(t))return;let a=e;const r=t.split(".");r.forEach((i,n)=>{n===r.length-1?a[i]=s:((!a[i]||typeof a[i]!="object"||Array.isArray(a[i])||a[i]instanceof File)&&(a[i]=Object.create(null)),a=a[i])})},ws=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},xa=e=>{const{groups:t,path:s}=Ea(e),a=ws(s);return Ra(a,t)},Ea=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,a)=>{const r=`@${a}`;return t.push([r,s]),r}),{groups:t,path:e}},Ra=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[a]=t[s];for(let r=e.length-1;r>=0;r--)if(e[r].includes(a)){e[r]=e[r].replace(a,t[s][1]);break}}return e},lt={},Sa=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const a=`${e}#${t}`;return lt[a]||(s[2]?lt[a]=t&&t[0]!==":"&&t[0]!=="*"?[a,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:lt[a]=[e,s[1],!0]),lt[a]}return null},bt=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},ka=e=>bt(e,decodeURI),xs=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let a=s;for(;a<t.length;a++){const r=t.charCodeAt(a);if(r===37){const i=t.indexOf("?",a),n=t.indexOf("#",a),l=i===-1?n===-1?void 0:n:n===-1?i:Math.min(i,n),p=t.slice(s,l);return ka(p.includes("%25")?p.replace(/%25/g,"%2525"):p)}else if(r===63||r===35)break}return t.slice(s,a)},Ca=e=>{const t=xs(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},ge=(e,t,...s)=>(s.length&&(t=ge(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),Es=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let a="";return t.forEach(r=>{if(r!==""&&!/\:/.test(r))a+="/"+r;else if(/\:/.test(r))if(/\?/.test(r)){s.length===0&&a===""?s.push("/"):s.push(a);const i=r.replace("?","");a+="/"+i,s.push(a)}else a+="/"+r}),s.filter((r,i,n)=>n.indexOf(r)===i)},kt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?bt(e,It):e):e,Rs=(e,t,s)=>{let a;if(!s&&t&&!/[%+]/.test(t)){let n=e.indexOf("?",8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){const l=e.charCodeAt(n+t.length+1);if(l===61){const p=n+t.length+2,o=e.indexOf("&",p);return kt(e.slice(p,o===-1?void 0:o))}else if(l==38||isNaN(l))return"";n=e.indexOf(`&${t}`,n+1)}if(a=/[%+]/.test(e),!a)return}const r={};a??(a=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const n=e.indexOf("&",i+1);let l=e.indexOf("=",i);l>n&&n!==-1&&(l=-1);let p=e.slice(i+1,l===-1?n===-1?void 0:n:l);if(a&&(p=kt(p)),i=n,p==="")continue;let o;l===-1?o="":(o=e.slice(l+1,n===-1?void 0:n),a&&(o=kt(o))),s?(r[p]&&Array.isArray(r[p])||(r[p]=[]),r[p].push(o)):r[p]??(r[p]=o)}return t?r[t]:r},Aa=Rs,Ta=(e,t)=>Rs(e,t,!0),It=decodeURIComponent,cs=e=>bt(e,It),Pe,H,se,Ss,ks,$t,Q,fs,_a=(fs=class{constructor(e,t="/",s=[[]]){E(this,se);x(this,"raw");E(this,Pe);E(this,H);x(this,"routeIndex",0);x(this,"path");x(this,"bodyCache",{});E(this,Q,e=>{const{bodyCache:t,raw:s}=this,a=t[e];if(a)return a;const r=Object.keys(t)[0];return r?t[r].then(i=>(r==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,v(this,H,s),v(this,Pe,{})}param(e){return e?C(this,se,Ss).call(this,e):C(this,se,ks).call(this)}query(e){return Aa(this.url,e)}queries(e){return Ta(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,a)=>{t[a]=s}),t}async parseBody(e){return ga(this,e)}json(){return u(this,Q).call(this,"text").then(e=>JSON.parse(e))}text(){return u(this,Q).call(this,"text")}arrayBuffer(){return u(this,Q).call(this,"arrayBuffer")}bytes(){return u(this,Q).call(this,"arrayBuffer").then(e=>new Uint8Array(e))}blob(){return u(this,Q).call(this,"blob")}formData(){return u(this,Q).call(this,"formData")}addValidatedData(e,t){u(this,Pe)[e]=t}valid(e){return u(this,Pe)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[fa](){return u(this,H)}get matchedRoutes(){return u(this,H)[0].map(([[,e]])=>e)}get routePath(){return u(this,H)[0].map(([[,e]])=>e)[this.routeIndex].path}},Pe=new WeakMap,H=new WeakMap,se=new WeakSet,Ss=function(e){const t=u(this,H)[0][this.routeIndex][1][e],s=C(this,se,$t).call(this,t);return s&&/\%/.test(s)?cs(s):s},ks=function(){const e={},t=Object.keys(u(this,H)[0][this.routeIndex][1]);for(const s of t){const a=C(this,se,$t).call(this,u(this,H)[0][this.routeIndex][1][s]);a!==void 0&&(e[s]=/\%/.test(a)?cs(a):a)}return e},$t=function(e){return u(this,H)[1]?u(this,H)[1][e]:e},Q=new WeakMap,fs),Oa={Stringify:1},Cs=async(e,t,s,a,r)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(r?r[0]+=e:r=[e],Promise.all(i.map(l=>l({phase:t,buffer:r,context:a}))).then(l=>Promise.all(l.filter(Boolean).map(p=>Cs(p,t,!1,a,r))).then(()=>r[0]))):Promise.resolve(e)},La="text/plain; charset=UTF-8",Ct=(e,t)=>({"Content-Type":e,...t}),We=(e,t)=>new Response(e,t),Xe,Ze,X,Ne,Z,D,et,Ie,Me,xe,tt,st,ce,Le,ms,$a=(ms=class{constructor(e,t){E(this,ce);E(this,Xe);E(this,Ze);x(this,"env",{});E(this,X);x(this,"finalized",!1);x(this,"error");E(this,Ne);E(this,Z);E(this,D);E(this,et);E(this,Ie);E(this,Me);E(this,xe);E(this,tt);E(this,st);x(this,"render",(...e)=>(u(this,Ie)??v(this,Ie,t=>this.html(t)),u(this,Ie).call(this,...e)));x(this,"setLayout",e=>v(this,et,e));x(this,"getLayout",()=>u(this,et));x(this,"setRenderer",e=>{v(this,Ie,e)});x(this,"header",(e,t,s)=>{this.finalized&&v(this,D,We(u(this,D).body,u(this,D)));const a=u(this,D)?u(this,D).headers:u(this,xe)??v(this,xe,new Headers);t===void 0?a.delete(e):s!=null&&s.append?a.append(e,t):a.set(e,t)});x(this,"status",e=>{v(this,Ne,e)});x(this,"set",(e,t)=>{u(this,X)??v(this,X,new Map),u(this,X).set(e,t)});x(this,"get",e=>u(this,X)?u(this,X).get(e):void 0);x(this,"newResponse",(...e)=>C(this,ce,Le).call(this,...e));x(this,"body",(e,t,s)=>C(this,ce,Le).call(this,e,t,s));x(this,"text",(e,t,s)=>!u(this,xe)&&!u(this,Ne)&&!t&&!s&&!this.finalized?new Response(e):C(this,ce,Le).call(this,e,t,Ct(La,s)));x(this,"json",(e,t,s)=>C(this,ce,Le).call(this,JSON.stringify(e),t,Ct("application/json",s)));x(this,"html",(e,t,s)=>{const a=r=>C(this,ce,Le).call(this,r,t,Ct("text/html; charset=UTF-8",s));return typeof e=="object"?Cs(e,Oa.Stringify,!1,{}).then(a):a(e)});x(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});x(this,"notFound",()=>(u(this,Me)??v(this,Me,()=>We()),u(this,Me).call(this,this)));v(this,Xe,e),t&&(v(this,Z,t.executionCtx),this.env=t.env,v(this,Me,t.notFoundHandler),v(this,st,t.path),v(this,tt,t.matchResult))}get req(){return u(this,Ze)??v(this,Ze,new _a(u(this,Xe),u(this,st),u(this,tt))),u(this,Ze)}get event(){if(u(this,Z)&&"respondWith"in u(this,Z))return u(this,Z);throw Error("This context has no FetchEvent")}get executionCtx(){if(u(this,Z))return u(this,Z);throw Error("This context has no ExecutionContext")}get res(){return u(this,D)||v(this,D,We(null,{headers:u(this,xe)??v(this,xe,new Headers)}))}set res(e){if(u(this,D)&&e){e=We(e.body,e);for(const[t,s]of u(this,D).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const a=u(this,D).headers.getSetCookie();e.headers.delete("set-cookie");for(const r of a)e.headers.append("set-cookie",r)}else e.headers.set(t,s)}v(this,D,e),this.finalized=!0}get var(){return u(this,X)?Object.fromEntries(u(this,X)):{}}},Xe=new WeakMap,Ze=new WeakMap,X=new WeakMap,Ne=new WeakMap,Z=new WeakMap,D=new WeakMap,et=new WeakMap,Ie=new WeakMap,Me=new WeakMap,xe=new WeakMap,tt=new WeakMap,st=new WeakMap,ce=new WeakSet,Le=function(e,t,s){const a=u(this,D)?new Headers(u(this,D).headers):u(this,xe)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[n,l]of i)n.toLowerCase()==="set-cookie"?a.append(n,l):a.set(n,l)}if(s)for(const[i,n]of Object.entries(s))if(typeof n=="string")a.set(i,n);else{a.delete(i);for(const l of n)a.append(i,l)}const r=typeof t=="number"?t:(t==null?void 0:t.status)??u(this,Ne);return We(e,{status:r,headers:a})},ms),T="ALL",Da="all",Pa=["get","post","put","delete","options","patch"],As="Can not add a route since the matcher is already built.",Ts=class extends Error{},Na="__COMPOSED_HANDLER",Ia=e=>e.text("404 Not Found",404),ds=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},U,_,_s,q,ye,ct,dt,He,Ma=(He=class{constructor(t={}){E(this,_);x(this,"get");x(this,"post");x(this,"put");x(this,"delete");x(this,"options");x(this,"patch");x(this,"all");x(this,"on");x(this,"use");x(this,"router");x(this,"getPath");x(this,"_basePath","/");E(this,U,"/");x(this,"routes",[]);E(this,q,Ia);x(this,"errorHandler",ds);x(this,"onError",t=>(this.errorHandler=t,this));x(this,"notFound",t=>(v(this,q,t),this));x(this,"fetch",(t,...s)=>C(this,_,dt).call(this,t,s[1],s[0],t.method));x(this,"request",(t,s,a,r)=>t instanceof Request?this.fetch(s?new Request(t,s):t,a,r):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${ge("/",t)}`,s),a,r)));x(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(C(this,_,dt).call(this,t.request,t,void 0,t.request.method))})});[...Pa,Da].forEach(i=>{this[i]=(n,...l)=>(typeof n=="string"?v(this,U,n):C(this,_,ye).call(this,i,u(this,U),n),l.forEach(p=>{C(this,_,ye).call(this,i,u(this,U),p)}),this)}),this.on=(i,n,...l)=>{for(const p of[n].flat()){v(this,U,p);for(const o of[i].flat())l.map(c=>{C(this,_,ye).call(this,o.toUpperCase(),u(this,U),c)})}return this},this.use=(i,...n)=>(typeof i=="string"?v(this,U,i):(v(this,U,"*"),n.unshift(i)),n.forEach(l=>{C(this,_,ye).call(this,T,u(this,U),l)}),this);const{strict:a,...r}=t;Object.assign(this,r),this.getPath=a??!0?t.getPath??xs:Ca}route(t,s){const a=this.basePath(t);return s.routes.map(r=>{var n;let i;s.errorHandler===ds?i=r.handler:(i=async(l,p)=>(await ls([],s.errorHandler)(l,()=>r.handler(l,p))).res,i[Na]=r.handler),C(n=a,_,ye).call(n,r.method,r.path,i,r.basePath)}),this}basePath(t){const s=C(this,_,_s).call(this);return s._basePath=ge(this._basePath,t),s}mount(t,s,a){let r,i;a&&(typeof a=="function"?i=a:(i=a.optionHandler,a.replaceRequest===!1?r=p=>p:r=a.replaceRequest));const n=i?p=>{const o=i(p);return Array.isArray(o)?o:[o]}:p=>{let o;try{o=p.executionCtx}catch{}return[p.env,o]};r||(r=(()=>{const p=ge(this._basePath,t),o=p==="/"?0:p.length;return c=>{const d=new URL(c.url);return d.pathname=this.getPath(c).slice(o)||"/",new Request(d,c)}})());const l=async(p,o)=>{const c=await s(r(p.req.raw),...n(p));if(c)return c;await o()};return C(this,_,ye).call(this,T,ge(t,"*"),l),this}},U=new WeakMap,_=new WeakSet,_s=function(){const t=new He({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,v(t,q,u(this,q)),t.routes=this.routes,t},q=new WeakMap,ye=function(t,s,a,r){t=t.toUpperCase(),s=ge(this._basePath,s);const i={basePath:r!==void 0?ge(this._basePath,r):this._basePath,path:s,method:t,handler:a};this.router.add(t,s,[a,i]),this.routes.push(i)},ct=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},dt=function(t,s,a,r){if(r==="HEAD")return(async()=>new Response(null,await C(this,_,dt).call(this,t,s,a,"GET")))();const i=this.getPath(t,{env:a}),n=this.router.match(r,i),l=new $a(t,{path:i,matchResult:n,env:a,executionCtx:s,notFoundHandler:u(this,q)});if(n[0].length===1){let o;try{o=n[0][0][0][0](l,async()=>{l.res=await u(this,q).call(this,l)})}catch(c){return C(this,_,ct).call(this,c,l)}return o instanceof Promise?o.then(c=>c||(l.finalized?l.res:u(this,q).call(this,l))).catch(c=>C(this,_,ct).call(this,c,l)):o??u(this,q).call(this,l)}const p=ls(n[0],this.errorHandler,u(this,q));return(async()=>{try{const o=await p(l);if(!o.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return o.res}catch(o){return C(this,_,ct).call(this,o,l)}})()},He),Os=[];function Ha(e,t){const s=this.buildAllMatchers(),a=((r,i)=>{const n=s[r]||s[T],l=n[2][i];if(l)return l;const p=i.match(n[0]);if(!p)return[[],Os];const o=p.indexOf("",1);return[n[1][o],p]});return this.match=a,a(e,t)}var ft="[^/]+",Ve=".*",Je="(?:|/.*)",$e=Symbol(),ja=new Set(".\\+*[^]$()");function Ua(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===Ve||e===Je?1:t===Ve||t===Je?-1:e===ft?1:t===ft?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var Ee,Re,B,Ce,qa=(Ce=class{constructor(){E(this,Ee);E(this,Re);E(this,B,Object.create(null))}insert(t,s,a,r,i){if(t.length===0){if(u(this,Ee)!==void 0)throw $e;if(i)return;v(this,Ee,s);return}const[n,...l]=t,p=n==="*"?l.length===0?["","",Ve]:["","",ft]:n==="/*"?["","",Je]:n.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let o;if(p){const c=p[1];let d=p[2]||ft;if(c&&p[2]&&(d===".*"||(d=d.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(d))))throw $e;if(o=u(this,B)[d],!o){if(Object.keys(u(this,B)).some(h=>h!==Ve&&h!==Je))throw $e;if(i)return;o=u(this,B)[d]=new Ce,c!==""&&v(o,Re,r.varIndex++)}!i&&c!==""&&a.push([c,u(o,Re)])}else if(o=u(this,B)[n],!o){if(Object.keys(u(this,B)).some(c=>c.length>1&&c!==Ve&&c!==Je))throw $e;if(i)return;o=u(this,B)[n]=new Ce}o.insert(l,s,a,r,i)}buildRegExpStr(){const s=Object.keys(u(this,B)).sort(Ua).map(a=>{const r=u(this,B)[a];return(typeof u(r,Re)=="number"?`(${a})@${u(r,Re)}`:ja.has(a)?`\\${a}`:a)+r.buildRegExpStr()});return typeof u(this,Ee)=="number"&&s.unshift(`#${u(this,Ee)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},Ee=new WeakMap,Re=new WeakMap,B=new WeakMap,Ce),gt,at,gs,Ba=(gs=class{constructor(){E(this,gt,{varIndex:0});E(this,at,new qa)}insert(e,t,s){const a=[],r=[];for(let n=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,p=>{const o=`@\\${n}`;return r[n]=[o,p],n++,l=!0,o}),!l)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let n=r.length-1;n>=0;n--){const[l]=r[n];for(let p=i.length-1;p>=0;p--)if(i[p].indexOf(l)!==-1){i[p]=i[p].replace(l,r[n][1]);break}}return u(this,at).insert(i,t,a,u(this,gt),s),a}buildRegExp(){let e=u(this,at).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],a=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(r,i,n)=>i!==void 0?(s[++t]=Number(i),"$()"):(n!==void 0&&(a[Number(n)]=++t),"")),[new RegExp(`^${e}`),s,a]}},gt=new WeakMap,at=new WeakMap,gs),Fa=[/^$/,[],Object.create(null)],pt=Object.create(null);function Ls(e){return pt[e]??(pt[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function Wa(){pt=Object.create(null)}function za(e){var o;const t=new Ba,s=[];if(e.length===0)return Fa;const a=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,d],[h,m])=>c?1:h?-1:d.length-m.length),r=Object.create(null);for(let c=0,d=-1,h=a.length;c<h;c++){const[m,f,b]=a[c];m?r[f]=[b.map(([S])=>[S,Object.create(null)]),Os]:d++;let y;try{y=t.insert(f,d,m)}catch(S){throw S===$e?new Ts(f):S}m||(s[d]=b.map(([S,w])=>{const k=Object.create(null);for(w-=1;w>=0;w--){const[O,j]=y[w];k[O]=j}return[S,k]}))}const[i,n,l]=t.buildRegExp();for(let c=0,d=s.length;c<d;c++)for(let h=0,m=s[c].length;h<m;h++){const f=(o=s[c][h])==null?void 0:o[1];if(!f)continue;const b=Object.keys(f);for(let y=0,S=b.length;y<S;y++)f[b[y]]=l[f[b[y]]]}const p=[];for(const c in n)p[c]=s[n[c]];return[i,p,r]}function Oe(e,t){if(e){for(const s of Object.keys(e).sort((a,r)=>r.length-a.length))if(Ls(s).test(t))return[...e[s]]}}var de,pe,yt,$s,ys,Ya=(ys=class{constructor(){E(this,yt);x(this,"name","RegExpRouter");E(this,de);E(this,pe);x(this,"match",Ha);v(this,de,{[T]:Object.create(null)}),v(this,pe,{[T]:Object.create(null)})}add(e,t,s){var l;const a=u(this,de),r=u(this,pe);if(!a||!r)throw new Error(As);a[e]||[a,r].forEach(p=>{p[e]=Object.create(null),Object.keys(p[T]).forEach(o=>{p[e][o]=[...p[T][o]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const p=Ls(t);e===T?Object.keys(a).forEach(o=>{var c;(c=a[o])[t]||(c[t]=Oe(a[o],t)||Oe(a[T],t)||[])}):(l=a[e])[t]||(l[t]=Oe(a[e],t)||Oe(a[T],t)||[]),Object.keys(a).forEach(o=>{(e===T||e===o)&&Object.keys(a[o]).forEach(c=>{p.test(c)&&a[o][c].push([s,i])})}),Object.keys(r).forEach(o=>{(e===T||e===o)&&Object.keys(r[o]).forEach(c=>p.test(c)&&r[o][c].push([s,i]))});return}const n=Es(t)||[t];for(let p=0,o=n.length;p<o;p++){const c=n[p];Object.keys(r).forEach(d=>{var h;(e===T||e===d)&&((h=r[d])[c]||(h[c]=[...Oe(a[d],c)||Oe(a[T],c)||[]]),r[d][c].push([s,i-o+p+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(u(this,pe)).concat(Object.keys(u(this,de))).forEach(t=>{e[t]||(e[t]=C(this,yt,$s).call(this,t))}),v(this,de,v(this,pe,void 0)),Wa(),e}},de=new WeakMap,pe=new WeakMap,yt=new WeakSet,$s=function(e){const t=[];let s=e===T;return[u(this,de),u(this,pe)].forEach(a=>{const r=a[e]?Object.keys(a[e]).map(i=>[i,a[e][i]]):[];r.length!==0?(s||(s=!0),t.push(...r)):e!==T&&t.push(...Object.keys(a[T]).map(i=>[i,a[T][i]]))}),s?za(t):null},ys),he,ee,bs,Ga=(bs=class{constructor(e){x(this,"name","SmartRouter");E(this,he,[]);E(this,ee,[]);v(this,he,e.routers)}add(e,t,s){if(!u(this,ee))throw new Error(As);u(this,ee).push([e,t,s])}match(e,t){if(!u(this,ee))throw new Error("Fatal error");const s=u(this,he),a=u(this,ee),r=s.length;let i=0,n;for(;i<r;i++){const l=s[i];try{for(let p=0,o=a.length;p<o;p++)l.add(...a[p]);n=l.match(e,t)}catch(p){if(p instanceof Ts)continue;throw p}this.match=l.match.bind(l),v(this,he,[l]),v(this,ee,void 0);break}if(i===r)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,n}get activeRouter(){if(u(this,ee)||u(this,he).length!==1)throw new Error("No active router has been determined yet.");return u(this,he)[0]}},he=new WeakMap,ee=new WeakMap,bs),ze=Object.create(null),Ka=e=>{for(const t in e)return!0;return!1},ue,L,Se,je,$,W,ne,Ue,Va=(Ue=class{constructor(t,s,a){E(this,W);E(this,ue);E(this,L);E(this,Se);E(this,je,0);E(this,$,ze);if(v(this,L,a||Object.create(null)),v(this,ue,[]),t&&s){const r=Object.create(null);r[t]={handler:s,possibleKeys:[],score:0},v(this,ue,[r])}v(this,Se,[])}insert(t,s,a){v(this,je,++ns(this,je)._);let r=this;const i=xa(s),n=[];for(let l=0,p=i.length;l<p;l++){const o=i[l],c=i[l+1],d=Sa(o,c),h=Array.isArray(d)?d[0]:o;if(h in u(r,L)){r=u(r,L)[h],d&&n.push(d[1]);continue}u(r,L)[h]=new Ue,d&&(u(r,Se).push(d),n.push(d[1])),r=u(r,L)[h]}return u(r,ue).push({[t]:{handler:a,possibleKeys:n.filter((l,p,o)=>o.indexOf(l)===p),score:u(this,je)}}),r}search(t,s){var c;const a=[];v(this,$,ze);let i=[this];const n=ws(s),l=[],p=n.length;let o=null;for(let d=0;d<p;d++){const h=n[d],m=d===p-1,f=[];for(let y=0,S=i.length;y<S;y++){const w=i[y],k=u(w,L)[h];k&&(v(k,$,u(w,$)),m?(u(k,L)["*"]&&C(this,W,ne).call(this,a,u(k,L)["*"],t,u(w,$)),C(this,W,ne).call(this,a,k,t,u(w,$))):f.push(k));for(let O=0,j=u(w,Se).length;O<j;O++){const fe=u(w,Se)[O],N=u(w,$)===ze?{}:{...u(w,$)};if(fe==="*"){const K=u(w,L)["*"];K&&(C(this,W,ne).call(this,a,K,t,u(w,$)),v(K,$,N),f.push(K));continue}const[vt,ae,G]=fe;if(!h&&!(G instanceof RegExp))continue;const M=u(w,L)[vt];if(G instanceof RegExp){if(o===null){o=new Array(p);let ie=s[0]==="/"?1:0;for(let V=0;V<p;V++)o[V]=ie,ie+=n[V].length+1}const K=s.substring(o[d]),re=G.exec(K);if(re){if(N[ae]=re[0],C(this,W,ne).call(this,a,M,t,u(w,$),N),re[0].length===K.length&&u(M,L)["*"]&&C(this,W,ne).call(this,a,u(M,L)["*"],t,u(w,$),N),Ka(u(M,L))){v(M,$,N);const ie=((c=re[0].match(/\//))==null?void 0:c.length)??0;(l[ie]||(l[ie]=[])).push(M)}continue}}(G===!0||G.test(h))&&(N[ae]=h,m?(C(this,W,ne).call(this,a,M,t,N,u(w,$)),u(M,L)["*"]&&C(this,W,ne).call(this,a,u(M,L)["*"],t,N,u(w,$))):(v(M,$,N),f.push(M)))}}const b=l.shift();i=b?f.concat(b):f}return a.length>1&&a.sort((d,h)=>d.score-h.score),[a.map(({handler:d,params:h})=>[d,h])]}},ue=new WeakMap,L=new WeakMap,Se=new WeakMap,je=new WeakMap,$=new WeakMap,W=new WeakSet,ne=function(t,s,a,r,i){for(let n=0,l=u(s,ue).length;n<l;n++){const p=u(s,ue)[n],o=p[a]||p[T],c={};if(o!==void 0&&(o.params=Object.create(null),t.push(o),r!==ze||i&&i!==ze))for(let d=0,h=o.possibleKeys.length;d<h;d++){const m=o.possibleKeys[d],f=c[o.score];o.params[m]=i!=null&&i[m]&&!f?i[m]:r[m]??(i==null?void 0:i[m]),c[o.score]=!0}}},Ue),ke,vs,Ja=(vs=class{constructor(){x(this,"name","TrieRouter");E(this,ke);v(this,ke,new Va)}add(e,t,s){const a=Es(t);if(a){for(let r=0,i=a.length;r<i;r++)u(this,ke).insert(e,a[r],s);return}u(this,ke).insert(e,t,s)}match(e,t){return u(this,ke).search(e,t)}},ke=new WeakMap,vs),Mt=class extends Ma{constructor(e={}){super(e),this.router=e.router??new Ga({routers:[new Ya,new Ja]})}},Ds=/^[\w!#$%&'*.^`|~+-]+$/,Qa=/^[ !#-:<-[\]-~]*$/,ps=e=>{let t=0,s=e.length;for(;t<s;){const a=e.charCodeAt(t);if(a!==32&&a!==9)break;t++}for(;s>t;){const a=e.charCodeAt(s-1);if(a!==32&&a!==9)break;s--}return t===0&&s===e.length?e:e.slice(t,s)},Xa=(e,t)=>{if(t&&e.indexOf(t)===-1)return{};const s=e.split(";"),a=Object.create(null);for(const r of s){const i=r.indexOf("=");if(i===-1)continue;const n=ps(r.substring(0,i));if(t&&t!==n||!Ds.test(n)||n in a)continue;let l=ps(r.substring(i+1));if(l.startsWith('"')&&l.endsWith('"')&&(l=l.slice(1,-1)),Qa.test(l)&&(a[n]=l.indexOf("%")!==-1?bt(l,It):l,t))break}return a},Za=(e,t,s={})=>{if(!Ds.test(e))throw new Error("Invalid cookie name");let a=`${e}=${t}`;if(e.startsWith("__Secure-")&&!s.secure)throw new Error("__Secure- Cookie must have Secure attributes");if(e.startsWith("__Host-")){if(!s.secure)throw new Error("__Host- Cookie must have Secure attributes");if(s.path!=="/")throw new Error('__Host- Cookie must have Path attributes with "/"');if(s.domain)throw new Error("__Host- Cookie must not have Domain attributes")}for(const r of["domain","path","sameSite","priority"])if(s[r]&&/[;\r\n]/.test(s[r]))throw new Error(`${r} must not contain ";", "\\r", or "\\n"`);if(s&&typeof s.maxAge=="number"&&s.maxAge>=0){if(s.maxAge>3456e4)throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");a+=`; Max-Age=${s.maxAge|0}`}if(s.domain&&s.prefix!=="host"&&(a+=`; Domain=${s.domain}`),s.path&&(a+=`; Path=${s.path}`),s.expires){if(s.expires.getTime()-Date.now()>3456e7)throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");a+=`; Expires=${s.expires.toUTCString()}`}if(s.httpOnly&&(a+="; HttpOnly"),s.secure&&(a+="; Secure"),s.sameSite&&(a+=`; SameSite=${s.sameSite.charAt(0).toUpperCase()+s.sameSite.slice(1)}`),s.priority&&(a+=`; Priority=${s.priority.charAt(0).toUpperCase()+s.priority.slice(1)}`),s.partitioned){if(!s.secure)throw new Error("Partitioned Cookie must have Secure attributes");a+="; Partitioned"}return a},At=(e,t,s)=>(t=encodeURIComponent(t),Za(e,t,s)),Ps=(e,t,s)=>{const a=e.req.raw.headers.get("Cookie");{if(!a)return;let r=t;return s==="secure"?r="__Secure-"+t:s==="host"&&(r="__Host-"+t),Xa(a,r)[r]}},er=(e,t,s)=>{let a;return(s==null?void 0:s.prefix)==="secure"?a=At("__Secure-"+e,t,{path:"/",...s,secure:!0}):(s==null?void 0:s.prefix)==="host"?a=At("__Host-"+e,t,{...s,path:"/",secure:!0,domain:void 0}):a=At(e,t,{path:"/",...s}),a},Ns=(e,t,s,a)=>{const r=er(t,s,a);e.header("Set-Cookie",r,{append:!0})},tr=(e,t,s)=>{const a=Ps(e,t,s==null?void 0:s.prefix);return Ns(e,t,"",{...s,maxAge:0}),a};typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);function z(e){return F(e)}const P=new Mt;let hs=!1;async function sr(e){if(!hs)try{const t=await z(e).connect();await t.query("ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';"),await t.query("ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS invited_at TIMESTAMP;"),await t.query("ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS last_email_error TEXT;"),await t.query(`
      CREATE TABLE IF NOT EXISTS daily_milestones (
        day DATE PRIMARY KEY,
        milestone_10_sent INTEGER DEFAULT 0
      );
    `),hs=!0}catch(t){console.error("Failed schema upgrade:",t)}}P.use("*",async(e,t)=>{const s=new URL(e.req.url).pathname;if(s==="/admin/login"||s.startsWith("/static/"))return t();const a=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return Ps(e,"codeward_admin_session")===a?(await sr(e),t()):e.redirect("/admin/login")});function Is(e){let t=0;const s=(e.email.split("@")[1]||"").toLowerCase();return s&&!["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","proton.me","protonmail.com","aol.com","live.com","yandex.com","mail.com"].includes(s)&&(t+=35),["senior-engineer","engineering-lead","cto-vp","founder","security-engineer","devops-platform"].includes(e.role)&&(t+=30),e.github&&e.github.trim().length>0&&(t+=20),e.company&&e.company.trim().length>0&&(t+=15),t>=65?{score:t,label:"🔥 High",class:"priority-high",level:"high"}:t>=35?{score:t,label:"⚡ Medium",class:"priority-medium",level:"medium"}:{score:t,label:"🟢 Standard",class:"priority-standard",level:"standard"}}async function Ms(e,t,s,a){const r=`<!DOCTYPE html>
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
        Hi ${A(s)}, your spot in the Codeward private beta is now active. Your repository sandboxes and 11 review agents are standing by.
      </p>
      <a href="https://app.codeward.cloud/onboarding?token=beta_access_${a}" style="display:inline-block;background:#22c55e;color:#000000;font-weight:600;font-size:15px;padding:14px 28px;border-radius:99px;text-decoration:none;">
        Access Codeward Sandbox &rarr;
      </a>
    </td>
  </tr>
</table>
</body>
</html>`;return it(e,{from:"Codeward <founders@codeward.cloud>",to:[t],subject:"🎉 Your Codeward Early Access is Ready!",html:r})}P.get("/login",e=>{const t=`<!DOCTYPE html>
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
</html>`;return e.html(t)});P.post("/login",async e=>{const t=await e.req.parseBody(),s=e.env.ADMIN_USERNAME||process.env.ADMIN_USERNAME||"kelvin.reallife8@gmail.com",a=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return t.username===s&&t.password===a?(Ns(e,"codeward_admin_session",a,{path:"/admin",httpOnly:!0,secure:!0,maxAge:3600*24*7}),e.redirect("/admin")):e.redirect("/admin/login?error=1")});P.get("/logout",e=>(tr(e,"codeward_admin_session",{path:"/admin"}),e.redirect("/admin/login")));const Ye={"software-engineer":"Software Engineer","senior-engineer":"Senior / Staff Engineer","engineering-lead":"Engineering Lead / Manager","cto-vp":"CTO / VP of Engineering","devops-platform":"DevOps / Platform Engineer","security-engineer":"Security Engineer",freelancer:"Freelance Developer","open-source":"Open Source Contributor",student:"Student / Bootcamp",founder:"Founder / Indie Hacker",other:"Other"};function A(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function oe(e){if(e==null)return"";const t=String(e);return/[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}P.get("/",async e=>{var Yt,Gt,Kt,Vt,Jt,Qt,Xt,Zt,es,ts;const{env:t}=e,s=new URL(e.req.url),a=(s.searchParams.get("q")||"").trim(),r=(s.searchParams.get("role")||"").trim(),i=(s.searchParams.get("priority")||"").trim(),n=(s.searchParams.get("status")||"").trim(),l=Math.max(1,parseInt(s.searchParams.get("page")||"1",10)||1),p=25,o=s.searchParams.get("msg")||"";let c="";o==="retrigger_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Email successfully resent!</div>':o==="invite_success"?c='<div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 12px 16px; border-radius: 8px; font-weight: 500;">🎉 Early access invitation sent successfully!</div>':o==="add_lead_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ VIP Lead added to waitlist!</div>':o==="bulk_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Bulk action executed successfully!</div>':o==="delete_success"?c='<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Waitlist entry deleted.</div>':o==="queue_processed"?c=`<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">⚡ Queue processed: ${s.searchParams.get("cnt")||"0"} pending email(s) successfully resent!</div>`:o==="digest_success"?c='<div style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.3); color: #c084fc; padding: 12px 16px; border-radius: 8px; font-weight: 500;">📧 Weekly digest report dispatched to your inbox!</div>':o==="digest_failed"&&(c='<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; padding: 12px 16px; border-radius: 8px; font-weight: 500;">⚠️ Failed to dispatch weekly digest email.</div>');let d="WHERE 1=1";const h=[];let m=1;if(a){d+=` AND (LOWER(name) LIKE $${m++} OR LOWER(email) LIKE $${m++} OR LOWER(company) LIKE $${m++})`;const g=`%${a.toLowerCase()}%`;h.push(g,g,g)}r&&(d+=` AND role = $${m++}`,h.push(r)),n&&(d+=` AND COALESCE(status, 'pending') = $${m++}`,h.push(n));const f=await z(e).connect(),y=(await f.query(`SELECT id, name, email, role, company, position, created_at, last_email_error
     FROM waitlist_entries
     WHERE email_sent = 0 OR last_email_error IS NOT NULL
     ORDER BY created_at DESC`)).rows||[];let w=((await f.query(`SELECT id, name, email, role, company, github, position, created_at, email_sent, linkedin_clicked, status, invited_at
     FROM waitlist_entries ${d}
     ORDER BY created_at DESC`,h)).rows||[]).map(g=>{const R=Is(g);return{...g,priority:R}});i&&(w=w.filter(g=>g.priority.level===i));const k=w.length,O=Math.max(1,Math.ceil(k/p)),j=Math.min(l,O),fe=(j-1)*p,N=w.slice(fe,fe+p),vt=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries"),ae=Number(((Yt=vt.rows[0])==null?void 0:Yt.cnt)??0),G=await f.query(`SELECT 
       SUM(CASE WHEN email_sent = 1 THEN 1 ELSE 0 END) as sent,
       SUM(CASE WHEN email_sent = 0 THEN 1 ELSE 0 END) as failed,
       SUM(CASE WHEN COALESCE(status, 'pending') = 'invited' THEN 1 ELSE 0 END) as invited
     FROM waitlist_entries`),M=Number(((Gt=G.rows[0])==null?void 0:Gt.sent)??0);Number(((Kt=G.rows[0])==null?void 0:Kt.failed)??0),Number(((Vt=G.rows[0])==null?void 0:Vt.invited)??0);const K=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE"),re=Number(((Jt=K.rows[0])==null?void 0:Jt.cnt)??0),ie=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE - INTERVAL '1 day'"),V=Number(((Qt=ie.rows[0])==null?void 0:Qt.cnt)??0);let Ae="";if(V===0)re>0?Ae='<span class="growth-badge positive">↑ +100% vs yesterday</span>':Ae='<span class="growth-badge neutral">0% vs yesterday</span>';else{const g=Math.round((re-V)/V*100);g>0?Ae=`<span class="growth-badge positive">↑ +${g}% vs yesterday</span>`:g<0?Ae=`<span class="growth-badge negative">↓ ${g}% vs yesterday</span>`:Ae='<span class="growth-badge neutral">0% vs yesterday</span>'}const zs=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'"),Ys=Number(((Xt=zs.rows[0])==null?void 0:Xt.cnt)??0),Gs=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'"),Ut=Number(((Zt=Gs.rows[0])==null?void 0:Zt.cnt)??0),Ks=(Ut/30).toFixed(1),Vs=(await f.query("SELECT role, COUNT(*) as cnt FROM waitlist_entries GROUP BY role ORDER BY cnt DESC")).rows,Js=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE company IS NOT NULL AND company != ''");Number(((es=Js.rows[0])==null?void 0:es.cnt)??0);const wt={},Qs=new Set(["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","proton.me","protonmail.com","aol.com","live.com"]);let qt=0;for(const g of w){const R=(g.email.split("@")[1]||"").toLowerCase();R&&(Qs.has(R)||(qt++,wt[R]=(wt[R]||0)+1))}const Bt=Object.entries(wt).sort((g,R)=>R[1]-g[1]).slice(0,5),Ft=parseInt(s.searchParams.get("days")||"14",10),Te=[7,14,30,60].includes(Ft)?Ft:14,xt=((await f.query(`SELECT DATE(created_at) as day, COUNT(*) as cnt,
            SUM(CASE WHEN company IS NOT NULL AND company != '' THEN 1 ELSE 0 END) as corp_cnt
     FROM waitlist_entries
     GROUP BY DATE(created_at)
     ORDER BY day DESC
     LIMIT $1`,[Te])).rows||[]).reverse(),Xs=Math.max(1,...xt.map(g=>Number(g.cnt)));let Wt="N/A",Et=0;xt.forEach(g=>{const R=Number(g.cnt);R>Et&&(Et=R,Wt=new Date(g.day).toLocaleDateString("en-US",{month:"short",day:"numeric"}))});const Zs=new Date().toISOString().split("T")[0],ea=xt.map(g=>{const R=Number(g.cnt),J=Number(g.corp_cnt||0),_e=Math.round(R/Xs*100),ss=new Date(g.day),as=ss.toLocaleDateString("en-US",{month:"short",day:"numeric"}),rs=ss.toISOString().split("T")[0]===Zs;return`
      <div class="chart-bar-col" title="${as}: ${R} total (${J} corporate)">
        <div class="chart-bar-track">
          <span class="chart-bar-value">${R}</span>
          <div class="chart-bar-fill ${rs?"today-bar":""}" style="height: ${Math.max(14,_e)}%;"></div>
        </div>
        <span class="chart-bar-label" style="${rs?"color:#f59e0b;font-weight:700;":""}">${as}</span>
      </div>
    `}).join(""),ta=await f.query(`SELECT EXTRACT(DOW FROM created_at) as dow, COUNT(*) as cnt
     FROM waitlist_entries
     GROUP BY dow
     ORDER BY dow`),Rt={0:0,1:0,2:0,3:0,4:0,5:0,6:0};(ta.rows||[]).forEach(g=>{Rt[Math.floor(Number(g.dow))]=Number(g.cnt)});const sa=Math.max(1,...Object.values(Rt)),aa=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ra=[1,2,3,4,5,6,0].map(g=>{const R=Rt[g]||0,J=Math.round(R/sa*100);return`
      <div class="dow-card">
        <span class="dow-name">${aa[g]}</span>
        <span class="dow-count">${R}</span>
        <div class="dow-bar-track">
          <div class="dow-bar-fill" style="width: ${J}%;"></div>
        </div>
      </div>
    `}).join(""),ia=Object.entries(Ye).map(([g,R])=>`<option value="${g}" ${r===g?"selected":""}>${A(R)}</option>`).join(""),na=N.length?N.map(g=>{const R=new Date(g.created_at+"Z"),J=isNaN(R.getTime())?g.created_at:R.toLocaleDateString("en-US",{month:"short",day:"numeric"})+" · "+R.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),_e=g.status==="invited";return`
        <tr>
          <td><input type="checkbox" class="entry-checkbox" name="ids" value="${g.id}"/></td>
          <td class="pos-cell">#${616+g.position}</td>
          <td><span class="priority-badge ${g.priority.class}">${g.priority.label} (${g.priority.score})</span></td>
          <td>
            <div class="name-cell">${A(g.name)}</div>
            <div class="email-cell">${A(g.email)}</div>
          </td>
          <td><span class="role-badge">${A(Ye[g.role]||g.role)}</span></td>
          <td>${g.company?A(g.company):'<span class="muted">—</span>'}</td>
          <td>${g.github?`<a href="${A(g.github)}" target="_blank" rel="noopener" class="github-link">${A(g.github.replace(/^https?:\/\/(www\.)?github\.com\//,"@"))}</a>`:'<span class="muted">—</span>'}</td>
          <td class="date-cell">${J}</td>
          <td>
            ${_e?'<span class="status-badge status-invited">Beta Invited</span>':'<span class="status-badge status-pending">In Queue</span>'}
          </td>
          <td>
            <div style="display:flex;gap:6px;align-items:center;">
              <form method="post" action="/admin/invite" style="margin:0;">
                <input type="hidden" name="email" value="${A(g.email)}" />
                <button type="submit" class="action-btn invite-btn">${_e?"Re-invite":"Invite"}</button>
              </form>
              <form method="post" action="/admin/retrigger" style="margin:0;">
                <input type="hidden" name="email" value="${A(g.email)}" />
                <button type="submit" class="action-btn">Resend Waitlist</button>
              </form>
              <form method="post" action="/admin/delete" style="margin:0;" onsubmit="return confirm('Delete ${A(g.name)} from waitlist?');">
                <input type="hidden" name="id" value="${g.id}" />
                <button type="submit" class="action-btn danger-btn">&times;</button>
              </form>
            </div>
          </td>
        </tr>`}).join(""):'<tr><td colspan="10" class="empty-row">No waitlist entries match your filters.</td></tr>',oa=(Vs||[]).map(g=>{const R=Number(g.cnt),J=ae?Math.round(R/ae*100):0;return`
      <div class="role-bar-row">
        <div class="role-bar-label">${A(Ye[g.role]||g.role)}</div>
        <div class="role-bar-track"><div class="role-bar-fill" style="width:${J}%"></div></div>
        <div class="role-bar-count">${R}</div>
      </div>`}).join(""),me=g=>{const R=new URLSearchParams;return a&&R.set("q",a),r&&R.set("role",r),i&&R.set("priority",i),n&&R.set("status",n),R.set("page",String(j)),Object.entries(g).forEach(([J,_e])=>R.set(J,String(_e))),"?"+R.toString()},zt=(t==null?void 0:t.RESEND_API_KEY)||(typeof process<"u"?(ts=process.env)==null?void 0:ts.RESEND_API_KEY:void 0),la=ae?Math.round(M/ae*100):100,ca=`<!DOCTYPE html>
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
      <div class="health-dot ${zt?"":"red"}"></div>
      <span>Resend API: <strong>${zt?"Active":"Missing API Key"}</strong></span>
    </div>
    <div class="health-item">
      <span>Delivery Rate: <strong>${la}%</strong></span>
    </div>
    <div class="health-item">
      <span>Corporate Leads: <strong>${qt}</strong></span>
    </div>
  </div>

  ${c}

  <section class="stats-row" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
    <div class="stat-card">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span class="stat-num">${ae.toLocaleString()}</span>
      </div>
      <span class="stat-label">total signups</span>
    </div>
    <div class="stat-card">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <span class="stat-num accent">+${re.toLocaleString()}</span>
        ${Ae}
      </div>
      <span class="stat-label">joined today</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#a855f7;">${Ys.toLocaleString()}</span>
      <span class="stat-label">last 7 days</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#3b82f6;">${Ut.toLocaleString()} <span style="font-size:12px;color:var(--muted);font-weight:400;">(${Ks}/day)</span></span>
      <span class="stat-label">last 30 days</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#f59e0b;">${Et}</span>
      <span class="stat-label">peak day (${Wt})</span>
    </div>
  </section>

  <!-- ── ANALYTICS GRID ── -->
  <div class="analytics-grid">
    <section class="panel chart-card" style="grid-column: span 2;">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
        <h2 class="panel-title" style="margin:0;">Daily Signups & Velocity</h2>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <div class="timeframe-picker">
            <a href="${me({days:7})}" class="timeframe-btn ${Te===7?"active":""}">7D</a>
            <a href="${me({days:14})}" class="timeframe-btn ${Te===14?"active":""}">14D</a>
            <a href="${me({days:30})}" class="timeframe-btn ${Te===30?"active":""}">30D</a>
            <a href="${me({days:60})}" class="timeframe-btn ${Te===60?"active":""}">60D</a>
          </div>
          <a href="/admin/export-daily-csv" class="action-btn" style="text-decoration:none;">
            📥 Export Daily CSV
          </a>
        </div>
      </div>

      <div class="chart-container">
        ${ea||'<p class="muted">No recent signups.</p>'}
      </div>

      <div class="chart-legend">
        <div class="legend-item"><div class="legend-dot regular"></div> Daily Signups</div>
        <div class="legend-item"><div class="legend-dot today"></div> Today's Signups</div>
        <div style="margin-left:auto;font-size:11px;color:var(--muted);">Showing last ${Te} days</div>
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Top Corporate Domains</h2>
      <div class="domain-list">
        ${Bt.length?Bt.map(([g,R])=>`
            <div class="domain-item">
              <span class="domain-name">@${A(g)}</span>
              <span class="domain-count">${R} lead${R>1?"s":""}</span>
            </div>
          `).join(""):'<p class="muted" style="font-size:13px;">No corporate domains yet.</p>'}
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Day-of-Week Pattern (Mon–Sun)</h2>
      <p style="font-size:12px;color:var(--muted);margin-bottom:8px;">Signup velocity across days of the week:</p>
      <div class="dow-grid">
        ${ra}
      </div>
    </section>
  <!-- ── FAILED & PENDING EMAIL QUEUE PANEL ── -->
  <section class="panel" style="border: 1px solid ${y.length>0?"rgba(239, 68, 68, 0.4)":"var(--border)"}; background: ${y.length>0?"rgba(239, 68, 68, 0.03)":"var(--surface)"};">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
      <div>
        <h2 class="panel-title" style="margin:0;color:${y.length>0?"#f87171":"var(--text)"};">
          ${y.length>0?"⚠️ Failed & Pending Email Queue ("+y.length+")":"📬 Email Queue Status"}
        </h2>
        <p style="font-size:12.5px;color:var(--muted);margin-top:2px;">
          ${y.length>0?"Emails that encountered Resend rate limits or API delivery issues":"All waitlist emails have been delivered successfully!"}
        </p>
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <form method="post" action="/admin/send-weekly-digest" style="margin:0;">
          <button type="submit" class="action-btn" style="background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid rgba(168,85,247,0.3);">
            📧 Send Weekly Digest Now
          </button>
        </form>
        ${y.length>0?`
          <form method="post" action="/admin/retry-failed-queue" style="margin:0;">
            <button type="submit" class="action-btn invite-btn" style="background:#ef4444;">
              ⚡ Process Queue / Retry All (${y.length})
            </button>
          </form>
        `:""}
      </div>
    </div>

    ${y.length>0?`
      <div class="table-wrap">
        <table class="entries-table">
          <thead>
            <tr>
              <th>Pos</th>
              <th>Name / Email</th>
              <th>Role</th>
              <th>Failure Reason</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${y.slice(0,10).map(g=>`
              <tr>
                <td class="pos-cell">#${616+g.position}</td>
                <td>
                  <div class="name-cell">${A(g.name)}</div>
                  <div class="email-cell">${A(g.email)}</div>
                </td>
                <td>${A(Ye[g.role]||g.role)}</td>
                <td>
                  <span style="font-family:var(--font-mono);font-size:11px;color:#f87171;background:rgba(239,68,68,0.12);padding:3px 8px;border-radius:6px;border:1px solid rgba(239,68,68,0.25);">
                    ${A(g.last_email_error||"Delivery Pending")}
                  </span>
                </td>
                <td>
                  <form method="post" action="/admin/retrigger" style="margin:0;">
                    <input type="hidden" name="email" value="${A(g.email)}" />
                    <button type="submit" class="action-btn">Retry Send</button>
                  </form>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      ${y.length>10?`<p style="font-size:12px;color:var(--muted);margin-top:10px;">Showing 10 of ${y.length} queued emails.</p>`:""}
    `:""}
  </section>

  <!-- ── ROLE BREAKDOWN PANEL ── -->
  <section class="panel role-breakdown-panel">
    <h2 class="panel-title">Role breakdown</h2>
    <div class="role-bars">
      ${oa||'<p class="muted">No data yet.</p>'}
    </div>
  </section>

  <!-- ── MAIN WAITLIST TABLE PANEL ── -->
  <section class="panel">
    <div class="panel-toolbar">
      <h2 class="panel-title">Waitlist entries (${k.toLocaleString()})</h2>
      <div style="display:flex;gap:10px;">
        <a class="export-btn" href="/admin/export.csv${me({})}">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Export CSV
        </a>
      </div>
    </div>

    <!-- Filter Bar -->
    <form class="filter-bar" method="get" action="/admin">
      <input type="text" name="q" placeholder="Search name, email, or company…" value="${A(a)}" class="search-input"/>
      
      <select name="role" class="role-select">
        <option value="">All roles</option>
        ${ia}
      </select>

      <select name="priority" class="role-select">
        <option value="">All priorities</option>
        <option value="high" ${i==="high"?"selected":""}>🔥 High Priority (VIP)</option>
        <option value="medium" ${i==="medium"?"selected":""}>⚡ Medium Priority</option>
        <option value="standard" ${i==="standard"?"selected":""}>🟢 Standard</option>
      </select>

      <select name="status" class="role-select">
        <option value="">All statuses</option>
        <option value="pending" ${n==="pending"?"selected":""}>In Queue</option>
        <option value="invited" ${n==="invited"?"selected":""}>Beta Invited</option>
      </select>

      <button type="submit" class="filter-btn">Filter</button>
      ${a||r||i||n?'<a href="/admin" class="clear-btn">Clear</a>':""}
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
            ${na}
          </tbody>
        </table>
      </div>
    </form>

    <div class="pagination">
      <span class="page-info">Showing ${N.length?fe+1:0}–${fe+N.length} of ${k.toLocaleString()}</span>
      <div class="page-buttons">
        <a href="/admin${me({page:Math.max(1,j-1)})}" class="page-btn ${j<=1?"disabled":""}">&larr; Prev</a>
        <span class="page-current">Page ${j} of ${O}</span>
        <a href="/admin${me({page:Math.min(O,j+1)})}" class="page-btn ${j>=O?"disabled":""}">Next &rarr;</a>
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
</html>`;return e.html(ca)});P.post("/invite",async e=>{const{env:t}=e,a=((await e.req.parseBody()).email||"").toString().trim();if(!a)return e.redirect("/admin");const r=await z(e).connect(),n=(await r.query("SELECT name, position FROM waitlist_entries WHERE email = $1",[a])).rows[0];if(n){const l=await Ms(t,a,n.name,n.position);if(l.ok)return await r.query("UPDATE waitlist_entries SET status = 'invited', invited_at = CURRENT_TIMESTAMP, last_email_error = NULL WHERE email = $1",[a]),e.redirect("/admin?msg=invite_success");await r.query("UPDATE waitlist_entries SET last_email_error = $1 WHERE email = $2",[l.error||"Failed sending invite",a])}return e.redirect("/admin?msg=retrigger_failed")});P.post("/bulk-action",async e=>{const{env:t}=e,s=await e.req.parseBody(),a=(s.action||"").toString();let r=s.ids;if(!r)return e.redirect("/admin");Array.isArray(r)||(r=[r]);const i=await z(e).connect();for(const n of r){const l=parseInt(n.toString(),10);if(isNaN(l))continue;const o=(await i.query("SELECT email, name, position FROM waitlist_entries WHERE id = $1",[l])).rows[0];if(o){if(a==="invite"){const c=await Ms(t,o.email,o.name,o.position);c.ok?await i.query("UPDATE waitlist_entries SET status = 'invited', invited_at = CURRENT_TIMESTAMP, last_email_error = NULL WHERE id = $1",[l]):await i.query("UPDATE waitlist_entries SET last_email_error = $1 WHERE id = $2",[c.error||"Bulk invite failed",l])}else if(a==="retrigger"){const c=await nt(t,o.email,o.name,o.position);c.ok?await i.query("UPDATE waitlist_entries SET email_sent = 1, last_email_error = NULL WHERE id = $1",[l]):await i.query("UPDATE waitlist_entries SET email_sent = 0, last_email_error = $1 WHERE id = $2",[c.error||"Bulk retrigger failed",l])}else a==="delete"&&await i.query("DELETE FROM waitlist_entries WHERE id = $1",[l]);await new Promise(c=>setTimeout(c,600))}}return e.redirect("/admin?msg=bulk_success")});P.post("/retry-failed-queue",async e=>{const{env:t}=e,s=await z(e).connect(),r=(await s.query("SELECT id, email, name, position FROM waitlist_entries WHERE email_sent = 0 OR last_email_error IS NOT NULL")).rows||[];let i=0;for(const n of r){const l=await nt(t,n.email,n.name,n.position);l.ok?(await s.query("UPDATE waitlist_entries SET email_sent = 1, last_email_error = NULL WHERE id = $1",[n.id]),i++):await s.query("UPDATE waitlist_entries SET last_email_error = $1 WHERE id = $2",[l.error||"Failed retry",n.id]),await new Promise(p=>setTimeout(p,600))}return e.redirect(`/admin?msg=queue_processed&cnt=${i}`)});P.post("/send-weekly-digest",async e=>{const{env:t}=e;return(await Hs(t,e)).ok?e.redirect("/admin?msg=digest_success"):e.redirect("/admin?msg=digest_failed")});P.post("/add-lead",async e=>{var p;const{env:t}=e,s=await e.req.parseBody(),a=(s.name||"").toString().trim(),r=(s.email||"").toString().trim().toLowerCase(),i=(s.role||"founder").toString().trim(),n=(s.company||"").toString().trim(),l=(s.github||"").toString().trim();if(a.length>=2&&r.includes("@")){const o=await z(e).connect(),c=await o.query("SELECT COUNT(*) as cnt FROM waitlist_entries"),d=Number(((p=c.rows[0])==null?void 0:p.cnt)??0)+1;await o.query(`INSERT INTO waitlist_entries (name, email, role, company, github, position) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT (email) DO NOTHING`,[a,r,i,n||null,l||null,d]);const h=await nt(t,r,a,d);h.ok?await o.query("UPDATE waitlist_entries SET email_sent = 1, last_email_error = NULL WHERE email = $1",[r]):await o.query("UPDATE waitlist_entries SET email_sent = 0, last_email_error = $1 WHERE email = $2",[h.error||"Add lead email failed",r])}return e.redirect("/admin?msg=add_lead_success")});P.post("/delete",async e=>{const t=await e.req.parseBody(),s=parseInt((t.id||"").toString(),10);return isNaN(s)||await(await z(e).connect()).query("DELETE FROM waitlist_entries WHERE id = $1",[s]),e.redirect("/admin?msg=delete_success")});P.get("/export.csv",async e=>{const{env:t}=e,s=new URL(e.req.url),a=(s.searchParams.get("q")||"").trim(),r=(s.searchParams.get("role")||"").trim(),i=(s.searchParams.get("status")||"").trim();let n="WHERE 1=1";const l=[];let p=1;if(a){n+=` AND (LOWER(name) LIKE $${p++} OR LOWER(email) LIKE $${p++} OR LOWER(company) LIKE $${p++})`;const b=`%${a.toLowerCase()}%`;l.push(b,b,b)}r&&(n+=` AND role = $${p++}`,l.push(r)),i&&(n+=` AND COALESCE(status, 'pending') = $${p++}`,l.push(i));const d=(await(await z(e).connect()).query(`SELECT id, name, email, role, company, github, position, created_at, status, invited_at
     FROM waitlist_entries ${n}
     ORDER BY created_at ASC`,l)).rows||[],m=[["Position","Priority Score","Name","Email","Role","Company","GitHub","Beta Status","Joined At (UTC)"].join(",")];for(const b of d){const y=Is(b);m.push([616+b.position,`${y.score} (${y.level})`,oe(b.name),oe(b.email),oe(Ye[b.role]||b.role),oe(b.company||""),oe(b.github||""),oe(b.status||"pending"),oe(b.created_at)].join(","))}const f=m.join(`
`);return new Response(f,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="codeward-waitlist-${new Date().toISOString().slice(0,10)}.csv"`}})});P.get("/export-daily-csv",async e=>{const s=await(await z(e).connect()).query(`SELECT DATE(created_at) as date,
            COUNT(*) as total_signups,
            SUM(CASE WHEN company IS NOT NULL AND company != '' THEN 1 ELSE 0 END) as corporate_signups,
            SUM(CASE WHEN COALESCE(status, 'pending') = 'invited' THEN 1 ELSE 0 END) as invited_count
     FROM waitlist_entries
     GROUP BY DATE(created_at)
     ORDER BY date DESC`),r=[["Date","Total Signups","Corporate Signups","Invited Count"].join(",")];for(const n of s.rows||[]){const l=n.date?new Date(n.date).toISOString().split("T")[0]:"";r.push([oe(l),n.total_signups||0,n.corporate_signups||0,n.invited_count||0].join(","))}const i=r.join(`
`);return new Response(i,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="codeward-daily-signups-${new Date().toISOString().slice(0,10)}.csv"`}})});P.post("/retrigger",async e=>{const{env:t}=e,a=((await e.req.parseBody()).email||"").toString().trim();if(!a)return e.redirect("/admin");const r=await z(e).connect(),n=(await r.query("SELECT name, position FROM waitlist_entries WHERE email = $1",[a])).rows[0];if(n){const l=await nt(t,a,n.name,n.position);if(l.ok)return await r.query("UPDATE waitlist_entries SET email_sent = 1, last_email_error = NULL WHERE email = $1",[a]),e.redirect("/admin?msg=retrigger_success");await r.query("UPDATE waitlist_entries SET email_sent = 0, last_email_error = $1 WHERE email = $2",[l.error||"Retrigger email failed",a])}return e.redirect("/admin?msg=retrigger_failed")});typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);function ar(e){const a=`https://${new URL(e).hostname}/sql`;async function r(n,l=[]){const p=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","Neon-Connection-String":e},body:JSON.stringify({query:n,params:l})});if(!p.ok){const c=await p.text();throw new Error(`DB error ${p.status}: ${c}`)}const o=await p.json();return{rows:o.rows??[],rowCount:o.rowCount??0}}async function i(n,...l){let p="";const o=[];return n.forEach((c,d)=>{p+=c,d<l.length&&(o.push(l[d]===void 0?null:l[d]),p+=`$${o.length}`)}),r(p,o)}return i.connect=async()=>({query:r,release:()=>{}}),i.query=r,i}let Tt=null;function F(e){var t,s,a;if(!Tt){const r=((t=e==null?void 0:e.env)==null?void 0:t.POSTGRES_URL)||((s=e==null?void 0:e.env)==null?void 0:s.DATABASE_POSTGRES_URL)||((a=e==null?void 0:e.env)==null?void 0:a.DATABASE_URL)||(typeof process<"u"&&process.env?process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL:void 0);if(!r)throw new Error("No database connection string found in environment");Tt=ar(r)}return Tt}function I(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const Y=new Mt;Y.onError((e,t)=>(console.error("Hono Global Error:",e),t.json({error:e.message||"Internal Server Error"},500)));Y.route("/admin",P);Y.get("/terms",e=>e.html(`<!DOCTYPE html>
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
</html>`));const be=617;Y.get("/api/stats",async e=>{var r;const{env:t}=e,{rows:s}=await F(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,a=Number(((r=s[0])==null?void 0:r.cnt)??0);return e.json({count:be+a})});function rr(e){function t(f,b){const y=(f&65535)+(b&65535);return(f>>16)+(b>>16)+(y>>16)<<16|y&65535}function s(f,b){return f<<b|f>>>32-b}function a(f,b,y,S,w,k){return t(s(t(t(b,f),t(S,k)),w),y)}function r(f,b,y,S,w,k,O){return a(b&y|~b&S,f,b,w,k,O)}function i(f,b,y,S,w,k,O){return a(b&S|y&~S,f,b,w,k,O)}function n(f,b,y,S,w,k,O){return a(b^y^S,f,b,w,k,O)}function l(f,b,y,S,w,k,O){return a(y^(b|~S),f,b,w,k,O)}function p(f){const b=(f.length+8>>6)+1,y=new Array(b*16).fill(0);for(let S=0;S<f.length;S++)y[S>>2]|=f.charCodeAt(S)<<S%4*8;return y[f.length>>2]|=128<<f.length%4*8,y[b*16-2]=f.length*8,y}const o=p(e.toLowerCase().trim());let c=1732584193,d=-271733879,h=-1732584194,m=271733878;for(let f=0;f<o.length;f+=16){const[b,y,S,w]=[c,d,h,m];c=r(c,d,h,m,o[f+0],7,-680876936),d=r(m,c,d,h,o[f+1],12,-389564586),h=r(h,m,c,d,o[f+2],17,606105819),m=r(d,h,m,c,o[f+3],22,-1044525330),c=r(c,d,h,m,o[f+4],7,-176418897),d=r(m,c,d,h,o[f+5],12,1200080426),h=r(h,m,c,d,o[f+6],17,-1473231341),m=r(d,h,m,c,o[f+7],22,-45705983),c=r(c,d,h,m,o[f+8],7,1770035416),d=r(m,c,d,h,o[f+9],12,-1958414417),h=r(h,m,c,d,o[f+10],17,-42063),m=r(d,h,m,c,o[f+11],22,-1990404162),c=r(c,d,h,m,o[f+12],7,1804603682),d=r(m,c,d,h,o[f+13],12,-40341101),h=r(h,m,c,d,o[f+14],17,-1502002290),m=r(d,h,m,c,o[f+15],22,1236535329),c=i(c,d,h,m,o[f+1],5,-165796510),d=i(m,c,d,h,o[f+6],9,-1069501632),h=i(h,m,c,d,o[f+11],14,643717713),m=i(d,h,m,c,o[f+0],20,-373897302),c=i(c,d,h,m,o[f+5],5,-701558691),d=i(m,c,d,h,o[f+10],9,38016083),h=i(h,m,c,d,o[f+15],14,-660478335),m=i(d,h,m,c,o[f+4],20,-405537848),c=i(c,d,h,m,o[f+9],5,568446438),d=i(m,c,d,h,o[f+14],9,-1019803690),h=i(h,m,c,d,o[f+3],14,-187363961),m=i(d,h,m,c,o[f+8],20,1163531501),c=i(c,d,h,m,o[f+13],5,-1444681467),d=i(m,c,d,h,o[f+2],9,-51403784),h=i(h,m,c,d,o[f+7],14,1735328473),m=i(d,h,m,c,o[f+12],20,-1926607734),c=n(c,d,h,m,o[f+5],4,-378558),d=n(m,c,d,h,o[f+8],11,-2022574463),h=n(h,m,c,d,o[f+11],16,1839030562),m=n(d,h,m,c,o[f+14],23,-35309556),c=n(c,d,h,m,o[f+1],4,-1530992060),d=n(m,c,d,h,o[f+4],11,1272893353),h=n(h,m,c,d,o[f+7],16,-155497632),m=n(d,h,m,c,o[f+10],23,-1094730640),c=n(c,d,h,m,o[f+13],4,681279174),d=n(m,c,d,h,o[f+0],11,-358537222),h=n(h,m,c,d,o[f+3],16,-722521979),m=n(d,h,m,c,o[f+6],23,76029189),c=n(c,d,h,m,o[f+9],4,-640364487),d=n(m,c,d,h,o[f+12],11,-421815835),h=n(h,m,c,d,o[f+15],16,530742520),m=n(d,h,m,c,o[f+2],23,-995338651),c=l(c,d,h,m,o[f+0],6,-198630844),d=l(m,c,d,h,o[f+7],10,1126891415),h=l(h,m,c,d,o[f+14],15,-1416354905),m=l(d,h,m,c,o[f+5],21,-57434055),c=l(c,d,h,m,o[f+12],6,1700485571),d=l(m,c,d,h,o[f+3],10,-1894986606),h=l(h,m,c,d,o[f+10],15,-1051523),m=l(d,h,m,c,o[f+1],21,-2054922799),c=l(c,d,h,m,o[f+8],6,1873313359),d=l(m,c,d,h,o[f+15],10,-30611744),h=l(h,m,c,d,o[f+6],15,-1560198380),m=l(d,h,m,c,o[f+13],21,1309151649),c=l(c,d,h,m,o[f+4],6,-145523070),d=l(m,c,d,h,o[f+11],10,-1120210379),h=l(h,m,c,d,o[f+2],15,718787259),m=l(d,h,m,c,o[f+9],21,-343485551),c=t(c,b),d=t(d,y),h=t(h,S),m=t(m,w)}return[c,d,h,m].map(f=>{let b="";for(let y=0;y<4;y++)b+=("0"+(f>>y*8&255).toString(16)).slice(-2);return b}).join("")}Y.get("/api/avatars",async e=>{try{const{rows:t}=await F(e)`SELECT name, email FROM waitlist_entries ORDER BY id DESC LIMIT 8`,s=t.map(a=>{let r="";try{r=rr(a.email||"")}catch{}const i=(a.name||"").trim(),n=i.split(" ")[0]||"",l=i.split(" ")[1]||"";return{initials:((n[0]||"")+(l[0]||"")).toUpperCase()||"?",emailHash:r}});return e.json({avatars:s},200,{"Cache-Control":"public, max-age=60"})}catch{return e.json({avatars:[]})}});Y.post("/api/join",async e=>{var y,S;const{env:t}=e;let s;try{s=await e.req.json()}catch{return e.json({error:"Invalid request body"},400)}const a=(s.name||"").toString().trim(),r=(s.email||"").toString().trim().toLowerCase(),i=(s.role||"").toString().trim(),n=(s.company||"").toString().trim(),l=(s.github||"").toString().trim();if(a.length<2)return e.json({error:"Please enter your full name."},400);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r))return e.json({error:"Please enter a valid email address."},400);if(!i)return e.json({error:"Please select your role."},400);const{rows:p}=await F(e)`SELECT id, position FROM waitlist_entries WHERE email = ${r}`,o=p[0];if(o){const{rows:w}=await F(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,k=w[0];return e.json({alreadyJoined:!0,position:be+Number(o.position),total:be+Number((k==null?void 0:k.cnt)??0)})}const{rows:c}=await F(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,d=c[0],h=Number((d==null?void 0:d.cnt)??0)+1;await F(e)`INSERT INTO waitlist_entries (name, email, role, company, github, position) VALUES (${a}, ${r}, ${i}, ${n||null}, ${l||null}, ${h})`;let m=0,f=null;if((t==null?void 0:t.RESEND_API_KEY)||(typeof process<"u"?(y=process.env)==null?void 0:y.RESEND_API_KEY:void 0)){const w=await nt(t,r,a,h);w.ok?m=1:f=w.error||"Failed sending email";try{await ir(t,a,r,i,n,l,be+h)}catch(k){console.error("Failed sending admin notification email:",k)}}else f="Missing RESEND_API_KEY environment variable";await F(e)`UPDATE waitlist_entries SET email_sent = ${m}, last_email_error = ${f} WHERE email = ${r}`;try{const{rows:w}=await F(e)`SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE`,k=Number(((S=w[0])==null?void 0:S.cnt)??0);k>=10&&await nr(t,e,k)}catch(w){console.error("Failed daily milestone check:",w)}return e.json({success:!0,position:be+h,total:be+Number((d==null?void 0:d.cnt)??0)+1})});async function it(e,t){var n;const s=e.RESEND_API_KEY||(typeof process<"u"?(n=process.env)==null?void 0:n.RESEND_API_KEY:void 0);if(!s)return{ok:!1,error:"Missing RESEND_API_KEY"};let a=0;const r=3;let i="";for(;a<r;){a++;try{const l=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(t)});if(l.ok)return{ok:!0};const p=l.status,o=await l.text();if(i=`HTTP ${p}: ${o.slice(0,150)}`,p===429||p>=500){const c=a*1e3;await new Promise(d=>setTimeout(d,c));continue}else break}catch(l){i=(l==null?void 0:l.message)||"Network fetch error",await new Promise(p=>setTimeout(p,1e3))}}return{ok:!1,error:i}}async function nt(e,t,s,a){const r=(be+a).toLocaleString(),i=`<!DOCTYPE html>
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
        Hi ${I(s)} — thanks for requesting early access to Codeward. I wanted to reach out myself rather than send a form reply.
      </p>
      <p style="font-size:14.5px;line-height:23px;color:#c9d1d9;margin:0 0 14px;text-align:left;">
        You're joining <strong style="color:#ffffff;">${r} other engineers</strong> already in queue. We're rolling out access to a small group of teams at a time, on purpose — every new repo we onboard gets run through all 11 of our review agents, and we'd rather scale that carefully than rush it and give you a worse first run.
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
</html>`;return it(e,{from:"Codeward <waitlist@codeward.cloud>",to:[t],subject:"You are on the Codeward waitlist",html:i})}async function ir(e,t,s,a,r,i,n){return(await it(e,{from:"Codeward System <waitlist@codeward.cloud>",to:["kelvin.reallife8@gmail.com"],subject:`New Waitlist Sign-up: ${t}`,html:`
      <h3>New Waitlist Sign-up Details</h3>
      <p><strong>Name:</strong> ${I(t)}</p>
      <p><strong>Email:</strong> ${I(s)}</p>
      <p><strong>Role:</strong> ${I(a)}</p>
      <p><strong>Company:</strong> ${I(r||"None")}</p>
      <p><strong>GitHub:</strong> ${I(i||"None")}</p>
      <p><strong>Position:</strong> #${n}</p>
    `})).ok}async function nr(e,t,s){const a=F(t);try{const r=new Date().toISOString().split("T")[0],{rows:i}=await a`SELECT milestone_10_sent FROM daily_milestones WHERE day = ${r}`;if(i.length>0&&i[0].milestone_10_sent===1)return!1;const{rows:n}=await a`
      SELECT name, email, role, company, github, created_at
      FROM waitlist_entries
      WHERE created_at::DATE = CURRENT_DATE
      ORDER BY created_at ASC
    `;let l=0;const p=new Set(["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","proton.me","protonmail.com"]);n.forEach(h=>{const m=(h.email.split("@")[1]||"").toLowerCase();m&&!p.has(m)&&l++});const o=n.map((h,m)=>`
      <tr style="border-bottom: 1px solid #22232a;">
        <td style="padding: 10px; color: #7c6fff; font-weight: 600;">#${m+1}</td>
        <td style="padding: 10px; color: #ffffff;"><strong>${I(h.name)}</strong><br/><span style="color:#8b8d98;font-size:12px;">${I(h.email)}</span></td>
        <td style="padding: 10px; color: #c9d1d9;">${I(h.role)}</td>
        <td style="padding: 10px; color: #22c55e;">${h.company?I(h.company):'<span style="color:#5f6169;">—</span>'}</td>
      </tr>
    `).join(""),c=`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="color-scheme" content="dark"></head>
<body style="margin:0;padding:32px 16px;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#0d1117;border:1px solid #22232a;border-radius:12px;overflow:hidden;">
  <tr>
    <td style="padding:32px 24px;background:linear-gradient(135deg, rgba(34,197,94,0.15), rgba(124,111,255,0.15));text-align:center;">
      <h1 style="color:#ffffff;font-size:24px;margin:0 0 8px;">🎯 Target Achieved! 10+ Daily Signups!</h1>
      <p style="color:#c9d1d9;font-size:15px;margin:0;">Congratulations Kelvin! Codeward hit <strong>${s} signups</strong> today!</p>
    </td>
  </tr>
  <tr>
    <td style="padding:24px;">
      <div style="display:flex;gap:16px;margin-bottom:24px;">
        <div style="flex:1;background:#161b22;padding:16px;border-radius:8px;border:1px solid #21262d;text-align:center;">
          <div style="font-size:24px;font-weight:700;color:#22c55e;">${s}</div>
          <div style="font-size:12px;color:#8b8d98;text-transform:uppercase;">Today's Signups</div>
        </div>
        <div style="flex:1;background:#161b22;padding:16px;border-radius:8px;border:1px solid #21262d;text-align:center;">
          <div style="font-size:24px;font-weight:700;color:#3b82f6;">${l}</div>
          <div style="font-size:12px;color:#8b8d98;text-transform:uppercase;">Corporate Leads</div>
        </div>
      </div>
      <h3 style="color:#ffffff;font-size:16px;margin-bottom:12px;">Today's Leads Breakdown</h3>
      <table width="100%" style="border-collapse:collapse;font-size:13px;background:#161b22;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#21262d;color:#8b8d98;text-transform:uppercase;font-size:11px;">
            <th style="padding:10px;text-align:left;">#</th>
            <th style="padding:10px;text-align:left;">Lead</th>
            <th style="padding:10px;text-align:left;">Role</th>
            <th style="padding:10px;text-align:left;">Company</th>
          </tr>
        </thead>
        <tbody>
          ${o}
        </tbody>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;if((await it(e,{from:"Codeward System <waitlist@codeward.cloud>",to:["kelvin.reallife8@gmail.com"],subject:`🎯 Target Achieved! ${s} Signups Today on Codeward!`,html:c})).ok)return await a`
        INSERT INTO daily_milestones (day, milestone_10_sent)
        VALUES (${r}, 1)
        ON CONFLICT (day) DO UPDATE SET milestone_10_sent = 1
      `,!0}catch(r){console.error("Failed sending daily milestone email:",r)}return!1}async function Hs(e,t){var a,r,i;const s=F(t);try{const{rows:n}=await s`SELECT COUNT(*) as cnt FROM waitlist_entries`,l=Number(((a=n[0])==null?void 0:a.cnt)??0),{rows:p}=await s`
      SELECT COUNT(*) as cnt FROM waitlist_entries
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    `,o=Number(((r=p[0])==null?void 0:r.cnt)??0),{rows:c}=await s`
      SELECT COUNT(*) as cnt FROM waitlist_entries
      WHERE created_at >= CURRENT_DATE - INTERVAL '14 days'
        AND created_at < CURRENT_DATE - INTERVAL '7 days'
    `,d=Number(((i=c[0])==null?void 0:i.cnt)??0);let h="0%";if(d===0)h=o>0?"+100%":"0%";else{const y=Math.round((o-d)/d*100);h=y>=0?`+${y}%`:`${y}%`}const{rows:m}=await s`
      SELECT name, email, role, company, github, created_at
      FROM waitlist_entries
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      ORDER BY created_at DESC
      LIMIT 10
    `,f=m.map(y=>`
      <tr style="border-bottom: 1px solid #22232a;">
        <td style="padding: 10px; color: #ffffff;"><strong>${I(y.name)}</strong><br/><span style="color:#8b8d98;font-size:12px;">${I(y.email)}</span></td>
        <td style="padding: 10px; color: #c9d1d9;">${I(y.role)}</td>
        <td style="padding: 10px; color: #22c55e;">${y.company?I(y.company):'<span style="color:#5f6169;">—</span>'}</td>
      </tr>
    `).join(""),b=`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="color-scheme" content="dark"></head>
<body style="margin:0;padding:32px 16px;background:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#0d1117;border:1px solid #22232a;border-radius:12px;overflow:hidden;">
  <tr>
    <td style="padding:32px 24px;background:#161b22;border-bottom:1px solid #22232a;">
      <h1 style="color:#ffffff;font-size:22px;margin:0 0 6px;">📊 Codeward Weekly Digest</h1>
      <p style="color:#8b8d98;font-size:14px;margin:0;">Weekly performance report & lead breakdown</p>
    </td>
  </tr>
  <tr>
    <td style="padding:24px;">
      <div style="display:flex;gap:12px;margin-bottom:24px;">
        <div style="flex:1;background:#161b22;padding:16px;border-radius:8px;border:1px solid #21262d;text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#22c55e;">${o}</div>
          <div style="font-size:11px;color:#8b8d98;text-transform:uppercase;">Past 7 Days</div>
          <div style="font-size:11px;color:#4ade80;margin-top:4px;">${h} WoW</div>
        </div>
        <div style="flex:1;background:#161b22;padding:16px;border-radius:8px;border:1px solid #21262d;text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#3b82f6;">${l}</div>
          <div style="font-size:11px;color:#8b8d98;text-transform:uppercase;">Total Waitlist</div>
        </div>
        <div style="flex:1;background:#161b22;padding:16px;border-radius:8px;border:1px solid #21262d;text-align:center;">
          <div style="font-size:22px;font-weight:700;color:#a855f7;">${(o/7).toFixed(1)}</div>
          <div style="font-size:11px;color:#8b8d98;text-transform:uppercase;">Avg / Day</div>
        </div>
      </div>

      <h3 style="color:#ffffff;font-size:15px;margin-bottom:12px;">Recent Leads This Week</h3>
      <table width="100%" style="border-collapse:collapse;font-size:13px;background:#161b22;border-radius:8px;overflow:hidden;">
        <thead>
          <tr style="background:#21262d;color:#8b8d98;text-transform:uppercase;font-size:11px;">
            <th style="padding:10px;text-align:left;">Name / Email</th>
            <th style="padding:10px;text-align:left;">Role</th>
            <th style="padding:10px;text-align:left;">Company</th>
          </tr>
        </thead>
        <tbody>
          ${f||'<tr><td colspan="3" style="padding:16px;text-align:center;color:#5f6169;">No signups recorded this week.</td></tr>'}
        </tbody>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;return it(e,{from:"Codeward Digest <waitlist@codeward.cloud>",to:["kelvin.reallife8@gmail.com"],subject:`📊 Codeward Weekly Digest (${o} new signups, ${h} WoW)`,html:b})}catch(n){return{ok:!1,error:(n==null?void 0:n.message)||"Failed generating weekly digest"}}}Y.get("/api/cron/weekly-digest",async e=>{const t=await Hs(e.env,e);return t.ok?e.json({success:!0,message:"Weekly digest email dispatched!"}):e.json({error:t.error||"Failed sending weekly digest"},500)});Y.post("/api/track-linkedin",async e=>{const{env:t}=e;let s;try{s=await e.req.json()}catch{return e.json({error:"Invalid body"},400)}return s.email&&await sql`UPDATE waitlist_entries SET linkedin_clicked = 1 WHERE email = ${s.email}`,e.json({success:!0})});Y.get("/",e=>(e.header("Cache-Control","no-store, no-cache, must-revalidate, proxy-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(or)));const or=`<!DOCTYPE html>
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
</html>`;var ve=class extends Error{constructor(e,t){super(e,t),this.name="RequestError"}},lr=e=>e instanceof ve?e:new ve(e.message,{cause:e}),cr=global.Request,Qe=class extends cr{constructor(t,s){var a;typeof t=="object"&&Be in t&&(t=t[Be]()),typeof((a=s==null?void 0:s.body)==null?void 0:a.getReader)<"u"&&(s.duplex??(s.duplex="half")),super(t,s)}},dr=e=>{const t=[],s=e.rawHeaders;for(let a=0;a<s.length;a+=2){const{[a]:r,[a+1]:i}=s;r.charCodeAt(0)!==58&&t.push([r,i])}return new Headers(t)},js=Symbol("wrapBodyStream"),pr=(e,t,s,a,r)=>{const i={method:e,headers:s,signal:r.signal};if(e==="TRACE"){i.method="GET";const n=new Qe(t,i);return Object.defineProperty(n,"method",{get(){return"TRACE"}}),n}if(!(e==="GET"||e==="HEAD"))if("rawBody"in a&&a.rawBody instanceof Buffer)i.body=new ReadableStream({start(n){n.enqueue(a.rawBody),n.close()}});else if(a[js]){let n;i.body=new ReadableStream({async pull(l){try{n||(n=os.toWeb(a).getReader());const{done:p,value:o}=await n.read();p?l.close():l.enqueue(o)}catch(p){l.error(p)}}})}else i.body=os.toWeb(a);return new Qe(t,i)},Be=Symbol("getRequestCache"),ht=Symbol("requestCache"),ut=Symbol("incomingKey"),mt=Symbol("urlKey"),_t=Symbol("headersKey"),le=Symbol("abortControllerKey"),hr=Symbol("getAbortController"),ot={get method(){return this[ut].method||"GET"},get url(){return this[mt]},get headers(){return this[_t]||(this[_t]=dr(this[ut]))},[hr](){return this[Be](),this[le]},[Be](){return this[le]||(this[le]=new AbortController),this[ht]||(this[ht]=pr(this.method,this[mt],this.headers,this[ut],this[le]))}};["body","bodyUsed","cache","credentials","destination","integrity","mode","redirect","referrer","referrerPolicy","signal","keepalive"].forEach(e=>{Object.defineProperty(ot,e,{get(){return this[Be]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(ot,e,{value:function(){return this[Be]()[e]()}})});Object.defineProperty(ot,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,s){const a={method:this.method,url:this.url,headers:this.headers,nativeRequest:this[ht]};return`Request (lightweight) ${s(a,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(ot,Qe.prototype);var ur=(e,t)=>{const s=Object.create(ot);s[ut]=e;const a=e.url||"";if(a[0]!=="/"&&(a.startsWith("http://")||a.startsWith("https://"))){if(e instanceof Ke)throw new ve("Absolute URL for :path is not allowed in HTTP/2");try{const l=new URL(a);s[mt]=l.href}catch(l){throw new ve("Invalid absolute URL",{cause:l})}return s}const r=(e instanceof Ke?e.authority:e.headers.host)||t;if(!r)throw new ve("Missing host header");let i;if(e instanceof Ke){if(i=e.scheme,!(i==="http"||i==="https"))throw new ve("Unsupported scheme")}else i=e.socket&&e.socket.encrypted?"https":"http";const n=new URL(`${i}://${r}${a}`);if(n.hostname.length!==r.length&&n.hostname!==r.replace(/:\d+$/,""))throw new ve("Invalid host header");return s[mt]=n.href,s},Ge=Symbol("responseCache"),De=Symbol("getResponseCache"),we=Symbol("cache"),Ht=global.Response,rt,te,qe,Fe=(qe=class{constructor(t,s){E(this,rt);E(this,te);let a;if(v(this,rt,t),s instanceof qe){const r=s[Ge];if(r){v(this,te,r),this[De]();return}else v(this,te,u(s,te)),a=new Headers(u(s,te).headers)}else v(this,te,s);(typeof t=="string"||typeof(t==null?void 0:t.getReader)<"u"||t instanceof Blob||t instanceof Uint8Array)&&(this[we]=[(s==null?void 0:s.status)||200,t,a||(s==null?void 0:s.headers)])}[De](){return delete this[we],this[Ge]||(this[Ge]=new Ht(u(this,rt),u(this,te)))}get headers(){const t=this[we];return t?(t[2]instanceof Headers||(t[2]=new Headers(t[2]||{"content-type":"text/plain; charset=UTF-8"})),t[2]):this[De]().headers}get status(){var t;return((t=this[we])==null?void 0:t[0])??this[De]().status}get ok(){const t=this.status;return t>=200&&t<300}},rt=new WeakMap,te=new WeakMap,qe);["body","bodyUsed","redirected","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty(Fe.prototype,e,{get(){return this[De]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(Fe.prototype,e,{value:function(){return this[De]()[e]()}})});Object.defineProperty(Fe.prototype,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,s){const a={status:this.status,headers:this.headers,ok:this.ok,nativeResponse:this[Ge]};return`Response (lightweight) ${s(a,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(Fe,Ht);Object.setPrototypeOf(Fe.prototype,Ht.prototype);async function fr(e){return Promise.race([e,Promise.resolve().then(()=>Promise.resolve(void 0))])}function Us(e,t,s){const a=l=>{e.cancel(l).catch(()=>{})};return t.on("close",a),t.on("error",a),(s??e.read()).then(n,r),e.closed.finally(()=>{t.off("close",a),t.off("error",a)});function r(l){l&&t.destroy(l)}function i(){e.read().then(n,r)}function n({done:l,value:p}){try{if(l)t.end();else if(!t.write(p))t.once("drain",i);else return e.read().then(n,r)}catch(o){r(o)}}}function mr(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");return t.destroyed?void 0:Us(e.getReader(),t)}var Dt=e=>{const t={};e instanceof Headers||(e=new Headers(e??void 0));const s=[];for(const[a,r]of e)a==="set-cookie"?s.push(r):t[a]=r;return s.length>0&&(t["set-cookie"]=s),t["content-type"]??(t["content-type"]="text/plain; charset=UTF-8"),t},gr="x-hono-already-sent";typeof global.crypto>"u"&&(global.crypto=ua);var jt=Symbol("outgoingEnded"),us=Symbol("incomingDraining"),yr=500,br=64*1024*1024,Ot=e=>{var l,p,o;const t=e;if(e.destroyed||t[us])return;if(t[us]=!0,e instanceof Ke){try{(p=(l=e.stream)==null?void 0:l.close)==null||p.call(l,ha.NGHTTP2_NO_ERROR)}catch{}return}let s=0;const a=()=>{clearTimeout(i),e.off("data",n),e.off("end",a),e.off("error",a)},r=()=>{a();const c=e.socket;c&&!c.destroyed&&c.destroySoon()},i=setTimeout(r,yr);(o=i.unref)==null||o.call(i);const n=c=>{s+=c.length,s>br&&r()};e.on("data",n),e.on("end",a),e.on("error",a),e.resume()},vr=()=>new Response(null,{status:400}),qs=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),Pt=(e,t)=>{const s=e instanceof Error?e:new Error("unknown error",{cause:e});s.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${s.message}`),t.destroy(s))},Bs=e=>{"flushHeaders"in e&&e.writable&&e.flushHeaders()},Fs=async(e,t)=>{var n,l;let[s,a,r]=e[we],i=!1;if(!r)r={"content-type":"text/plain; charset=UTF-8"};else if(r instanceof Headers)i=r.has("content-length"),r=Dt(r);else if(Array.isArray(r)){const p=new Headers(r);i=p.has("content-length"),r=Dt(p)}else for(const p in r)if(p.length===14&&p.toLowerCase()==="content-length"){i=!0;break}i||(typeof a=="string"?r["Content-Length"]=Buffer.byteLength(a):a instanceof Uint8Array?r["Content-Length"]=a.byteLength:a instanceof Blob&&(r["Content-Length"]=a.size)),t.writeHead(s,r),typeof a=="string"||a instanceof Uint8Array?t.end(a):a instanceof Blob?t.end(new Uint8Array(await a.arrayBuffer())):(Bs(t),await((n=mr(a,t))==null?void 0:n.catch(p=>Pt(p,t)))),(l=t[jt])==null||l.call(t)},wr=e=>typeof e.then=="function",xr=async(e,t,s={})=>{var r;if(wr(e))if(s.errorHandler)try{e=await e}catch(i){const n=await s.errorHandler(i);if(!n)return;e=n}else e=await e.catch(qs);if(we in e)return Fs(e,t);const a=Dt(e.headers);if(e.body){const i=e.body.getReader(),n=[];let l=!1,p;if(a["transfer-encoding"]!=="chunked"){let o=2;for(let c=0;c<o;c++){p||(p=i.read());const d=await fr(p).catch(h=>{console.error(h),l=!0});if(!d){if(c===1){await new Promise(h=>setTimeout(h)),o=3;continue}break}if(p=void 0,d.value&&n.push(d.value),d.done){l=!0;break}}l&&!("content-length"in a)&&(a["content-length"]=n.reduce((c,d)=>c+d.length,0))}t.writeHead(e.status,a),n.forEach(o=>{t.write(o)}),l?t.end():(n.length===0&&Bs(t),await Us(i,t,p))}else a[gr]||(t.writeHead(e.status,a),t.end());(r=t[jt])==null||r.call(t)},Er=(e,t={})=>{const s=t.autoCleanupIncoming??!0;return t.overrideGlobalObjects!==!1&&global.Request!==Qe&&(Object.defineProperty(global,"Request",{value:Qe}),Object.defineProperty(global,"Response",{value:Fe})),async(a,r)=>{let i,n;try{n=ur(a,t.hostname);let l=!s||a.method==="GET"||a.method==="HEAD";if(l||(a[js]=!0,a.on("end",()=>{l=!0}),a instanceof Ke&&(r[jt]=()=>{l||setTimeout(()=>{l||setTimeout(()=>{Ot(a)})})}),r.on("finish",()=>{l||Ot(a)})),r.on("close",()=>{n[le]&&(a.errored?n[le].abort(a.errored.toString()):r.writableFinished||n[le].abort("Client connection prematurely closed.")),l||setTimeout(()=>{l||setTimeout(()=>{Ot(a)})})}),i=e(n,{incoming:a,outgoing:r}),we in i)return Fs(i,r)}catch(l){if(i)return Pt(l,r);if(t.errorHandler){if(i=await t.errorHandler(n?l:lr(l)),!i)return}else n?i=qs(l):i=vr()}try{return await xr(i,r,t)}catch(l){return Pt(l,r)}}},Rr=e=>Er(e.fetch);const Nt=new Mt,Sr=Object.assign({"/src/index.tsx":Y});let Ws=!1;for(const[,e]of Object.entries(Sr))e&&(Nt.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Nt.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Ws=!0);if(!Ws)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");const Dr=Rr(Nt);export{Dr as default};
