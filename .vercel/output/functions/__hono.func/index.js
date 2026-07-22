var Hs=Object.defineProperty;var Wt=e=>{throw TypeError(e)};var Ms=(e,t,s)=>t in e?Hs(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var w=(e,t,s)=>Ms(e,typeof t!="symbol"?t+"":t,s),bt=(e,t,s)=>t.has(e)||Wt("Cannot "+s);var h=(e,t,s)=>(bt(e,t,"read from private field"),s?s.call(e):t.get(e)),E=(e,t,s)=>t.has(e)?Wt("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),v=(e,t,s,r)=>(bt(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),R=(e,t,s)=>(bt(e,t,"access private method"),s);var Gt=(e,t,s,r)=>({set _(a){v(e,t,a,s)},get _(){return h(e,t,r)}});import{Http2ServerRequest as ze,constants as qs}from"http2";import{Readable as Yt}from"stream";import Bs from"crypto";var Kt=(e,t,s)=>(r,a)=>{let n=-1;return i(0);async function i(l){if(l<=n)throw new Error("next() called multiple times");n=l;let p,o=!1,c;if(e[l]?(c=e[l][0][0],r.req.routeIndex=l):c=l===e.length&&a||void 0,c)try{p=await c(r,()=>i(l+1))}catch(d){if(d instanceof Error&&t)r.error=d,p=await t(d,r),o=!0;else throw d}else r.finalized===!1&&s&&(p=await s(r));return p&&(r.finalized===!1||o)&&(r.res=p),r}},Us=Symbol(),Fs=(e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,r=>r.toLowerCase())}}).formData(),Rt=e=>"headers"in e,zs=async(e,t=Object.create(null))=>{const{all:s=!1,dot:r=!1}=t,n=(Rt(e)?e.headers:e.raw.headers).get("Content-Type"),i=n==null?void 0:n.split(";")[0].trim().toLowerCase();return i==="multipart/form-data"||i==="application/x-www-form-urlencoded"?Ws(e,{all:s,dot:r}):{}};async function Ws(e,t){const s=Rt(e)?e.headers:e.raw.headers,r=await e.arrayBuffer(),a=Fs(r,s.get("Content-Type")||"");Rt(e)||(e.bodyCache.formData=a);const n=await a;return n?Gs(n,t):{}}function Gs(e,t){const s=Object.create(null);return e.forEach((r,a)=>{t.all||a.endsWith("[]")?Ys(s,a,r):s[a]=r}),t.dot&&Object.entries(s).forEach(([r,a])=>{r.includes(".")&&(Ks(s,r,a),delete s[r])}),s}var Ys=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},Ks=(e,t,s)=>{if(/(?:^|\.)__proto__\./.test(t))return;let r=e;const a=t.split(".");a.forEach((n,i)=>{i===a.length-1?r[n]=s:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},is=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Vs=e=>{const{groups:t,path:s}=Js(e),r=is(s);return Qs(r,t)},Js=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{const a=`@${r}`;return t.push([a,s]),a}),{groups:t,path:e}},Qs=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[r]=t[s];for(let a=e.length-1;a>=0;a--)if(e[a].includes(r)){e[a]=e[a].replace(r,t[s][1]);break}}return e},rt={},Xs=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const r=`${e}#${t}`;return rt[r]||(s[2]?rt[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:rt[r]=[e,s[1],!0]),rt[r]}return null},ft=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},Zs=e=>ft(e,decodeURI),os=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let r=s;for(;r<t.length;r++){const a=t.charCodeAt(r);if(a===37){const n=t.indexOf("?",r),i=t.indexOf("#",r),l=n===-1?i===-1?void 0:i:i===-1?n:Math.min(n,i),p=t.slice(s,l);return Zs(p.includes("%25")?p.replace(/%25/g,"%2525"):p)}else if(a===63||a===35)break}return t.slice(s,r)},er=e=>{const t=os(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},pe=(e,t,...s)=>(s.length&&(t=pe(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),ls=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let r="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))r+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){s.length===0&&r===""?s.push("/"):s.push(r);const n=a.replace("?","");r+="/"+n,s.push(r)}else r+="/"+a}),s.filter((a,n,i)=>i.indexOf(a)===n)},yt=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?ft(e,Lt):e):e,cs=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let i=e.indexOf("?",8);if(i===-1)return;for(e.startsWith(t,i+1)||(i=e.indexOf(`&${t}`,i+1));i!==-1;){const l=e.charCodeAt(i+t.length+1);if(l===61){const p=i+t.length+2,o=e.indexOf("&",p);return yt(e.slice(p,o===-1?void 0:o))}else if(l==38||isNaN(l))return"";i=e.indexOf(`&${t}`,i+1)}if(r=/[%+]/.test(e),!r)return}const a={};r??(r=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const i=e.indexOf("&",n+1);let l=e.indexOf("=",n);l>i&&i!==-1&&(l=-1);let p=e.slice(n+1,l===-1?i===-1?void 0:i:l);if(r&&(p=yt(p)),n=i,p==="")continue;let o;l===-1?o="":(o=e.slice(l+1,i===-1?void 0:i),r&&(o=yt(o))),s?(a[p]&&Array.isArray(a[p])||(a[p]=[]),a[p].push(o)):a[p]??(a[p]=o)}return t?a[t]:a},tr=cs,sr=(e,t)=>cs(e,t,!0),Lt=decodeURIComponent,Vt=e=>ft(e,Lt),Oe,N,K,ds,ps,At,F,es,rr=(es=class{constructor(e,t="/",s=[[]]){E(this,K);w(this,"raw");E(this,Oe);E(this,N);w(this,"routeIndex",0);w(this,"path");w(this,"bodyCache",{});E(this,F,e=>{const{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;const a=Object.keys(t)[0];return a?t[a].then(n=>(a==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,v(this,N,s),v(this,Oe,{})}param(e){return e?R(this,K,ds).call(this,e):R(this,K,ps).call(this)}query(e){return tr(this.url,e)}queries(e){return sr(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){return zs(this,e)}json(){return h(this,F).call(this,"text").then(e=>JSON.parse(e))}text(){return h(this,F).call(this,"text")}arrayBuffer(){return h(this,F).call(this,"arrayBuffer")}bytes(){return h(this,F).call(this,"arrayBuffer").then(e=>new Uint8Array(e))}blob(){return h(this,F).call(this,"blob")}formData(){return h(this,F).call(this,"formData")}addValidatedData(e,t){h(this,Oe)[e]=t}valid(e){return h(this,Oe)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Us](){return h(this,N)}get matchedRoutes(){return h(this,N)[0].map(([[,e]])=>e)}get routePath(){return h(this,N)[0].map(([[,e]])=>e)[this.routeIndex].path}},Oe=new WeakMap,N=new WeakMap,K=new WeakSet,ds=function(e){const t=h(this,N)[0][this.routeIndex][1][e],s=R(this,K,At).call(this,t);return s&&/\%/.test(s)?Vt(s):s},ps=function(){const e={},t=Object.keys(h(this,N)[0][this.routeIndex][1]);for(const s of t){const r=R(this,K,At).call(this,h(this,N)[0][this.routeIndex][1][s]);r!==void 0&&(e[s]=/\%/.test(r)?Vt(r):r)}return e},At=function(e){return h(this,N)[1]?h(this,N)[1][e]:e},F=new WeakMap,es),ar={Stringify:1},hs=async(e,t,s,r,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(a?a[0]+=e:a=[e],Promise.all(n.map(l=>l({phase:t,buffer:a,context:r}))).then(l=>Promise.all(l.filter(Boolean).map(p=>hs(p,t,!1,r,a))).then(()=>a[0]))):Promise.resolve(e)},nr="text/plain; charset=UTF-8",wt=(e,t)=>({"Content-Type":e,...t}),Be=(e,t)=>new Response(e,t),Ke,Ve,z,Te,W,$,Je,Le,Pe,ge,Qe,Xe,te,ke,ts,ir=(ts=class{constructor(e,t){E(this,te);E(this,Ke);E(this,Ve);w(this,"env",{});E(this,z);w(this,"finalized",!1);w(this,"error");E(this,Te);E(this,W);E(this,$);E(this,Je);E(this,Le);E(this,Pe);E(this,ge);E(this,Qe);E(this,Xe);w(this,"render",(...e)=>(h(this,Le)??v(this,Le,t=>this.html(t)),h(this,Le).call(this,...e)));w(this,"setLayout",e=>v(this,Je,e));w(this,"getLayout",()=>h(this,Je));w(this,"setRenderer",e=>{v(this,Le,e)});w(this,"header",(e,t,s)=>{this.finalized&&v(this,$,Be(h(this,$).body,h(this,$)));const r=h(this,$)?h(this,$).headers:h(this,ge)??v(this,ge,new Headers);t===void 0?r.delete(e):s!=null&&s.append?r.append(e,t):r.set(e,t)});w(this,"status",e=>{v(this,Te,e)});w(this,"set",(e,t)=>{h(this,z)??v(this,z,new Map),h(this,z).set(e,t)});w(this,"get",e=>h(this,z)?h(this,z).get(e):void 0);w(this,"newResponse",(...e)=>R(this,te,ke).call(this,...e));w(this,"body",(e,t,s)=>R(this,te,ke).call(this,e,t,s));w(this,"text",(e,t,s)=>!h(this,ge)&&!h(this,Te)&&!t&&!s&&!this.finalized?new Response(e):R(this,te,ke).call(this,e,t,wt(nr,s)));w(this,"json",(e,t,s)=>R(this,te,ke).call(this,JSON.stringify(e),t,wt("application/json",s)));w(this,"html",(e,t,s)=>{const r=a=>R(this,te,ke).call(this,a,t,wt("text/html; charset=UTF-8",s));return typeof e=="object"?hs(e,ar.Stringify,!1,{}).then(r):r(e)});w(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});w(this,"notFound",()=>(h(this,Pe)??v(this,Pe,()=>Be()),h(this,Pe).call(this,this)));v(this,Ke,e),t&&(v(this,W,t.executionCtx),this.env=t.env,v(this,Pe,t.notFoundHandler),v(this,Xe,t.path),v(this,Qe,t.matchResult))}get req(){return h(this,Ve)??v(this,Ve,new rr(h(this,Ke),h(this,Xe),h(this,Qe))),h(this,Ve)}get event(){if(h(this,W)&&"respondWith"in h(this,W))return h(this,W);throw Error("This context has no FetchEvent")}get executionCtx(){if(h(this,W))return h(this,W);throw Error("This context has no ExecutionContext")}get res(){return h(this,$)||v(this,$,Be(null,{headers:h(this,ge)??v(this,ge,new Headers)}))}set res(e){if(h(this,$)&&e){e=Be(e.body,e);for(const[t,s]of h(this,$).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=h(this,$).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of r)e.headers.append("set-cookie",a)}else e.headers.set(t,s)}v(this,$,e),this.finalized=!0}get var(){return h(this,z)?Object.fromEntries(h(this,z)):{}}},Ke=new WeakMap,Ve=new WeakMap,z=new WeakMap,Te=new WeakMap,W=new WeakMap,$=new WeakMap,Je=new WeakMap,Le=new WeakMap,Pe=new WeakMap,ge=new WeakMap,Qe=new WeakMap,Xe=new WeakMap,te=new WeakSet,ke=function(e,t,s){const r=h(this,$)?new Headers(h(this,$).headers):h(this,ge)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,l]of n)i.toLowerCase()==="set-cookie"?r.append(i,l):r.set(i,l)}if(s)for(const[n,i]of Object.entries(s))if(typeof i=="string")r.set(n,i);else{r.delete(n);for(const l of i)r.append(n,l)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??h(this,Te);return Be(e,{status:a,headers:r})},ts),C="ALL",or="all",lr=["get","post","put","delete","options","patch"],us="Can not add a route since the matcher is already built.",fs=class extends Error{},cr="__COMPOSED_HANDLER",dr=e=>e.text("404 Not Found",404),Jt=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},H,O,ms,M,he,at,nt,_e,pr=(_e=class{constructor(t={}){E(this,O);w(this,"get");w(this,"post");w(this,"put");w(this,"delete");w(this,"options");w(this,"patch");w(this,"all");w(this,"on");w(this,"use");w(this,"router");w(this,"getPath");w(this,"_basePath","/");E(this,H,"/");w(this,"routes",[]);E(this,M,dr);w(this,"errorHandler",Jt);w(this,"onError",t=>(this.errorHandler=t,this));w(this,"notFound",t=>(v(this,M,t),this));w(this,"fetch",(t,...s)=>R(this,O,nt).call(this,t,s[1],s[0],t.method));w(this,"request",(t,s,r,a)=>t instanceof Request?this.fetch(s?new Request(t,s):t,r,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${pe("/",t)}`,s),r,a)));w(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(R(this,O,nt).call(this,t.request,t,void 0,t.request.method))})});[...lr,or].forEach(n=>{this[n]=(i,...l)=>(typeof i=="string"?v(this,H,i):R(this,O,he).call(this,n,h(this,H),i),l.forEach(p=>{R(this,O,he).call(this,n,h(this,H),p)}),this)}),this.on=(n,i,...l)=>{for(const p of[i].flat()){v(this,H,p);for(const o of[n].flat())l.map(c=>{R(this,O,he).call(this,o.toUpperCase(),h(this,H),c)})}return this},this.use=(n,...i)=>(typeof n=="string"?v(this,H,n):(v(this,H,"*"),i.unshift(n)),i.forEach(l=>{R(this,O,he).call(this,C,h(this,H),l)}),this);const{strict:r,...a}=t;Object.assign(this,a),this.getPath=r??!0?t.getPath??os:er}route(t,s){const r=this.basePath(t);return s.routes.map(a=>{var i;let n;s.errorHandler===Jt?n=a.handler:(n=async(l,p)=>(await Kt([],s.errorHandler)(l,()=>a.handler(l,p))).res,n[cr]=a.handler),R(i=r,O,he).call(i,a.method,a.path,n,a.basePath)}),this}basePath(t){const s=R(this,O,ms).call(this);return s._basePath=pe(this._basePath,t),s}mount(t,s,r){let a,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?a=p=>p:a=r.replaceRequest));const i=n?p=>{const o=n(p);return Array.isArray(o)?o:[o]}:p=>{let o;try{o=p.executionCtx}catch{}return[p.env,o]};a||(a=(()=>{const p=pe(this._basePath,t),o=p==="/"?0:p.length;return c=>{const d=new URL(c.url);return d.pathname=this.getPath(c).slice(o)||"/",new Request(d,c)}})());const l=async(p,o)=>{const c=await s(a(p.req.raw),...i(p));if(c)return c;await o()};return R(this,O,he).call(this,C,pe(t,"*"),l),this}},H=new WeakMap,O=new WeakSet,ms=function(){const t=new _e({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,v(t,M,h(this,M)),t.routes=this.routes,t},M=new WeakMap,he=function(t,s,r,a){t=t.toUpperCase(),s=pe(this._basePath,s);const n={basePath:a!==void 0?pe(this._basePath,a):this._basePath,path:s,method:t,handler:r};this.router.add(t,s,[r,n]),this.routes.push(n)},at=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},nt=function(t,s,r,a){if(a==="HEAD")return(async()=>new Response(null,await R(this,O,nt).call(this,t,s,r,"GET")))();const n=this.getPath(t,{env:r}),i=this.router.match(a,n),l=new ir(t,{path:n,matchResult:i,env:r,executionCtx:s,notFoundHandler:h(this,M)});if(i[0].length===1){let o;try{o=i[0][0][0][0](l,async()=>{l.res=await h(this,M).call(this,l)})}catch(c){return R(this,O,at).call(this,c,l)}return o instanceof Promise?o.then(c=>c||(l.finalized?l.res:h(this,M).call(this,l))).catch(c=>R(this,O,at).call(this,c,l)):o??h(this,M).call(this,l)}const p=Kt(i[0],this.errorHandler,h(this,M));return(async()=>{try{const o=await p(l);if(!o.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return o.res}catch(o){return R(this,O,at).call(this,o,l)}})()},_e),gs=[];function hr(e,t){const s=this.buildAllMatchers(),r=((a,n)=>{const i=s[a]||s[C],l=i[2][n];if(l)return l;const p=n.match(i[0]);if(!p)return[[],gs];const o=p.indexOf("",1);return[i[1][o],p]});return this.match=r,r(e,t)}var dt="[^/]+",We=".*",Ge="(?:|/.*)",Re=Symbol(),ur=new Set(".\\+*[^]$()");function fr(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===We||e===Ge?1:t===We||t===Ge?-1:e===dt?1:t===dt?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var ve,be,q,xe,mr=(xe=class{constructor(){E(this,ve);E(this,be);E(this,q,Object.create(null))}insert(t,s,r,a,n){if(t.length===0){if(h(this,ve)!==void 0)throw Re;if(n)return;v(this,ve,s);return}const[i,...l]=t,p=i==="*"?l.length===0?["","",We]:["","",dt]:i==="/*"?["","",Ge]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let o;if(p){const c=p[1];let d=p[2]||dt;if(c&&p[2]&&(d===".*"||(d=d.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(d))))throw Re;if(o=h(this,q)[d],!o){if(Object.keys(h(this,q)).some(u=>u!==We&&u!==Ge))throw Re;if(n)return;o=h(this,q)[d]=new xe,c!==""&&v(o,be,a.varIndex++)}!n&&c!==""&&r.push([c,h(o,be)])}else if(o=h(this,q)[i],!o){if(Object.keys(h(this,q)).some(c=>c.length>1&&c!==We&&c!==Ge))throw Re;if(n)return;o=h(this,q)[i]=new xe}o.insert(l,s,r,a,n)}buildRegExpStr(){const s=Object.keys(h(this,q)).sort(fr).map(r=>{const a=h(this,q)[r];return(typeof h(a,be)=="number"?`(${r})@${h(a,be)}`:ur.has(r)?`\\${r}`:r)+a.buildRegExpStr()});return typeof h(this,ve)=="number"&&s.unshift(`#${h(this,ve)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},ve=new WeakMap,be=new WeakMap,q=new WeakMap,xe),ht,Ze,ss,gr=(ss=class{constructor(){E(this,ht,{varIndex:0});E(this,Ze,new mr)}insert(e,t,s){const r=[],a=[];for(let i=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,p=>{const o=`@\\${i}`;return a[i]=[o,p],i++,l=!0,o}),!l)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=a.length-1;i>=0;i--){const[l]=a[i];for(let p=n.length-1;p>=0;p--)if(n[p].indexOf(l)!==-1){n[p]=n[p].replace(l,a[i][1]);break}}return h(this,Ze).insert(n,t,r,h(this,ht),s),r}buildRegExp(){let e=h(this,Ze).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,n,i)=>n!==void 0?(s[++t]=Number(n),"$()"):(i!==void 0&&(r[Number(i)]=++t),"")),[new RegExp(`^${e}`),s,r]}},ht=new WeakMap,Ze=new WeakMap,ss),vr=[/^$/,[],Object.create(null)],it=Object.create(null);function vs(e){return it[e]??(it[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function br(){it=Object.create(null)}function yr(e){var o;const t=new gr,s=[];if(e.length===0)return vr;const r=e.map(c=>[!/\*|\/:/.test(c[0]),...c]).sort(([c,d],[u,m])=>c?1:u?-1:d.length-m.length),a=Object.create(null);for(let c=0,d=-1,u=r.length;c<u;c++){const[m,f,g]=r[c];m?a[f]=[g.map(([x])=>[x,Object.create(null)]),gs]:d++;let y;try{y=t.insert(f,d,m)}catch(x){throw x===Re?new fs(f):x}m||(s[d]=g.map(([x,S])=>{const A=Object.create(null);for(S-=1;S>=0;S--){const[T,J]=y[S];A[T]=J}return[x,A]}))}const[n,i,l]=t.buildRegExp();for(let c=0,d=s.length;c<d;c++)for(let u=0,m=s[c].length;u<m;u++){const f=(o=s[c][u])==null?void 0:o[1];if(!f)continue;const g=Object.keys(f);for(let y=0,x=g.length;y<x;y++)f[g[y]]=l[f[g[y]]]}const p=[];for(const c in i)p[c]=s[i[c]];return[n,p,a]}function Se(e,t){if(e){for(const s of Object.keys(e).sort((r,a)=>a.length-r.length))if(vs(s).test(t))return[...e[s]]}}var se,re,ut,bs,rs,wr=(rs=class{constructor(){E(this,ut);w(this,"name","RegExpRouter");E(this,se);E(this,re);w(this,"match",hr);v(this,se,{[C]:Object.create(null)}),v(this,re,{[C]:Object.create(null)})}add(e,t,s){var l;const r=h(this,se),a=h(this,re);if(!r||!a)throw new Error(us);r[e]||[r,a].forEach(p=>{p[e]=Object.create(null),Object.keys(p[C]).forEach(o=>{p[e][o]=[...p[C][o]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const p=vs(t);e===C?Object.keys(r).forEach(o=>{var c;(c=r[o])[t]||(c[t]=Se(r[o],t)||Se(r[C],t)||[])}):(l=r[e])[t]||(l[t]=Se(r[e],t)||Se(r[C],t)||[]),Object.keys(r).forEach(o=>{(e===C||e===o)&&Object.keys(r[o]).forEach(c=>{p.test(c)&&r[o][c].push([s,n])})}),Object.keys(a).forEach(o=>{(e===C||e===o)&&Object.keys(a[o]).forEach(c=>p.test(c)&&a[o][c].push([s,n]))});return}const i=ls(t)||[t];for(let p=0,o=i.length;p<o;p++){const c=i[p];Object.keys(a).forEach(d=>{var u;(e===C||e===d)&&((u=a[d])[c]||(u[c]=[...Se(r[d],c)||Se(r[C],c)||[]]),a[d][c].push([s,n-o+p+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(h(this,re)).concat(Object.keys(h(this,se))).forEach(t=>{e[t]||(e[t]=R(this,ut,bs).call(this,t))}),v(this,se,v(this,re,void 0)),br(),e}},se=new WeakMap,re=new WeakMap,ut=new WeakSet,bs=function(e){const t=[];let s=e===C;return[h(this,se),h(this,re)].forEach(r=>{const a=r[e]?Object.keys(r[e]).map(n=>[n,r[e][n]]):[];a.length!==0?(s||(s=!0),t.push(...a)):e!==C&&t.push(...Object.keys(r[C]).map(n=>[n,r[C][n]]))}),s?yr(t):null},rs),ae,G,as,xr=(as=class{constructor(e){w(this,"name","SmartRouter");E(this,ae,[]);E(this,G,[]);v(this,ae,e.routers)}add(e,t,s){if(!h(this,G))throw new Error(us);h(this,G).push([e,t,s])}match(e,t){if(!h(this,G))throw new Error("Fatal error");const s=h(this,ae),r=h(this,G),a=s.length;let n=0,i;for(;n<a;n++){const l=s[n];try{for(let p=0,o=r.length;p<o;p++)l.add(...r[p]);i=l.match(e,t)}catch(p){if(p instanceof fs)continue;throw p}this.match=l.match.bind(l),v(this,ae,[l]),v(this,G,void 0);break}if(n===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(h(this,G)||h(this,ae).length!==1)throw new Error("No active router has been determined yet.");return h(this,ae)[0]}},ae=new WeakMap,G=new WeakMap,as),Ue=Object.create(null),Er=e=>{for(const t in e)return!0;return!1},ne,L,ye,$e,P,B,X,De,Sr=(De=class{constructor(t,s,r){E(this,B);E(this,ne);E(this,L);E(this,ye);E(this,$e,0);E(this,P,Ue);if(v(this,L,r||Object.create(null)),v(this,ne,[]),t&&s){const a=Object.create(null);a[t]={handler:s,possibleKeys:[],score:0},v(this,ne,[a])}v(this,ye,[])}insert(t,s,r){v(this,$e,++Gt(this,$e)._);let a=this;const n=Vs(s),i=[];for(let l=0,p=n.length;l<p;l++){const o=n[l],c=n[l+1],d=Xs(o,c),u=Array.isArray(d)?d[0]:o;if(u in h(a,L)){a=h(a,L)[u],d&&i.push(d[1]);continue}h(a,L)[u]=new De,d&&(h(a,ye).push(d),i.push(d[1])),a=h(a,L)[u]}return h(a,ne).push({[t]:{handler:r,possibleKeys:i.filter((l,p,o)=>o.indexOf(l)===p),score:h(this,$e)}}),a}search(t,s){var c;const r=[];v(this,P,Ue);let n=[this];const i=is(s),l=[],p=i.length;let o=null;for(let d=0;d<p;d++){const u=i[d],m=d===p-1,f=[];for(let y=0,x=n.length;y<x;y++){const S=n[y],A=h(S,L)[u];A&&(v(A,P,h(S,P)),m?(h(A,L)["*"]&&R(this,B,X).call(this,r,h(A,L)["*"],t,h(S,P)),R(this,B,X).call(this,r,A,t,h(S,P))):f.push(A));for(let T=0,J=h(S,ye).length;T<J;T++){const st=h(S,ye)[T],_=h(S,P)===Ue?{}:{...h(S,P)};if(st==="*"){const U=h(S,L)["*"];U&&(R(this,B,X).call(this,r,U,t,h(S,P)),v(U,P,_),f.push(U));continue}const[He,Me,oe]=st;if(!u&&!(oe instanceof RegExp))continue;const I=h(S,L)[He];if(oe instanceof RegExp){if(o===null){o=new Array(p);let Q=s[0]==="/"?1:0;for(let le=0;le<p;le++)o[le]=Q,Q+=i[le].length+1}const U=s.substring(o[d]),qe=oe.exec(U);if(qe){if(_[Me]=qe[0],R(this,B,X).call(this,r,I,t,h(S,P),_),qe[0].length===U.length&&h(I,L)["*"]&&R(this,B,X).call(this,r,h(I,L)["*"],t,h(S,P),_),Er(h(I,L))){v(I,P,_);const Q=((c=qe[0].match(/\//))==null?void 0:c.length)??0;(l[Q]||(l[Q]=[])).push(I)}continue}}(oe===!0||oe.test(u))&&(_[Me]=u,m?(R(this,B,X).call(this,r,I,t,_,h(S,P)),h(I,L)["*"]&&R(this,B,X).call(this,r,h(I,L)["*"],t,_,h(S,P))):(v(I,P,_),f.push(I)))}}const g=l.shift();n=g?f.concat(g):f}return r.length>1&&r.sort((d,u)=>d.score-u.score),[r.map(({handler:d,params:u})=>[d,u])]}},ne=new WeakMap,L=new WeakMap,ye=new WeakMap,$e=new WeakMap,P=new WeakMap,B=new WeakSet,X=function(t,s,r,a,n){for(let i=0,l=h(s,ne).length;i<l;i++){const p=h(s,ne)[i],o=p[r]||p[C],c={};if(o!==void 0&&(o.params=Object.create(null),t.push(o),a!==Ue||n&&n!==Ue))for(let d=0,u=o.possibleKeys.length;d<u;d++){const m=o.possibleKeys[d],f=c[o.score];o.params[m]=n!=null&&n[m]&&!f?n[m]:a[m]??(n==null?void 0:n[m]),c[o.score]=!0}}},De),we,ns,kr=(ns=class{constructor(){w(this,"name","TrieRouter");E(this,we);v(this,we,new Sr)}add(e,t,s){const r=ls(t);if(r){for(let a=0,n=r.length;a<n;a++)h(this,we).insert(e,r[a],s);return}h(this,we).insert(e,t,s)}match(e,t){return h(this,we).search(e,t)}},we=new WeakMap,ns),Pt=class extends pr{constructor(e={}){super(e),this.router=e.router??new xr({routers:[new wr,new kr]})}},ys=/^[\w!#$%&'*.^`|~+-]+$/,Rr=/^[ !#-:<-[\]-~]*$/,Qt=e=>{let t=0,s=e.length;for(;t<s;){const r=e.charCodeAt(t);if(r!==32&&r!==9)break;t++}for(;s>t;){const r=e.charCodeAt(s-1);if(r!==32&&r!==9)break;s--}return t===0&&s===e.length?e:e.slice(t,s)},Ar=(e,t)=>{if(t&&e.indexOf(t)===-1)return{};const s=e.split(";"),r=Object.create(null);for(const a of s){const n=a.indexOf("=");if(n===-1)continue;const i=Qt(a.substring(0,n));if(t&&t!==i||!ys.test(i)||i in r)continue;let l=Qt(a.substring(n+1));if(l.startsWith('"')&&l.endsWith('"')&&(l=l.slice(1,-1)),Rr.test(l)&&(r[i]=l.indexOf("%")!==-1?ft(l,Lt):l,t))break}return r},Cr=(e,t,s={})=>{if(!ys.test(e))throw new Error("Invalid cookie name");let r=`${e}=${t}`;if(e.startsWith("__Secure-")&&!s.secure)throw new Error("__Secure- Cookie must have Secure attributes");if(e.startsWith("__Host-")){if(!s.secure)throw new Error("__Host- Cookie must have Secure attributes");if(s.path!=="/")throw new Error('__Host- Cookie must have Path attributes with "/"');if(s.domain)throw new Error("__Host- Cookie must not have Domain attributes")}for(const a of["domain","path","sameSite","priority"])if(s[a]&&/[;\r\n]/.test(s[a]))throw new Error(`${a} must not contain ";", "\\r", or "\\n"`);if(s&&typeof s.maxAge=="number"&&s.maxAge>=0){if(s.maxAge>3456e4)throw new Error("Cookies Max-Age SHOULD NOT be greater than 400 days (34560000 seconds) in duration.");r+=`; Max-Age=${s.maxAge|0}`}if(s.domain&&s.prefix!=="host"&&(r+=`; Domain=${s.domain}`),s.path&&(r+=`; Path=${s.path}`),s.expires){if(s.expires.getTime()-Date.now()>3456e7)throw new Error("Cookies Expires SHOULD NOT be greater than 400 days (34560000 seconds) in the future.");r+=`; Expires=${s.expires.toUTCString()}`}if(s.httpOnly&&(r+="; HttpOnly"),s.secure&&(r+="; Secure"),s.sameSite&&(r+=`; SameSite=${s.sameSite.charAt(0).toUpperCase()+s.sameSite.slice(1)}`),s.priority&&(r+=`; Priority=${s.priority.charAt(0).toUpperCase()+s.priority.slice(1)}`),s.partitioned){if(!s.secure)throw new Error("Partitioned Cookie must have Secure attributes");r+="; Partitioned"}return r},xt=(e,t,s)=>(t=encodeURIComponent(t),Cr(e,t,s)),ws=(e,t,s)=>{const r=e.req.raw.headers.get("Cookie");{if(!r)return;let a=t;return s==="secure"?a="__Secure-"+t:s==="host"&&(a="__Host-"+t),Ar(r,a)[a]}},Or=(e,t,s)=>{let r;return(s==null?void 0:s.prefix)==="secure"?r=xt("__Secure-"+e,t,{path:"/",...s,secure:!0}):(s==null?void 0:s.prefix)==="host"?r=xt("__Host-"+e,t,{...s,path:"/",secure:!0,domain:void 0}):r=xt(e,t,{path:"/",...s}),r},xs=(e,t,s,r)=>{const a=Or(t,s,r);e.header("Set-Cookie",a,{append:!0})},Tr=(e,t,s)=>{const r=ws(e,t,s==null?void 0:s.prefix);return xs(e,t,"",{...s,maxAge:0}),r};typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);function ie(e){return Z(e)}const j=new Pt;let Xt=!1;async function Lr(e){if(!Xt)try{const t=await ie(e).connect();await t.query("ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';"),await t.query("ALTER TABLE waitlist_entries ADD COLUMN IF NOT EXISTS invited_at TIMESTAMP;"),Xt=!0}catch(t){console.error("Failed schema upgrade:",t)}}j.use("*",async(e,t)=>{const s=new URL(e.req.url).pathname;if(s==="/admin/login"||s.startsWith("/static/"))return t();const r=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return ws(e,"codeward_admin_session")===r?(await Lr(e),t()):e.redirect("/admin/login")});function Es(e){let t=0;const s=(e.email.split("@")[1]||"").toLowerCase();return s&&!["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","proton.me","protonmail.com","aol.com","live.com","yandex.com","mail.com"].includes(s)&&(t+=35),["senior-engineer","engineering-lead","cto-vp","founder","security-engineer","devops-platform"].includes(e.role)&&(t+=30),e.github&&e.github.trim().length>0&&(t+=20),e.company&&e.company.trim().length>0&&(t+=15),t>=65?{score:t,label:"🔥 High",class:"priority-high",level:"high"}:t>=35?{score:t,label:"⚡ Medium",class:"priority-medium",level:"medium"}:{score:t,label:"🟢 Standard",class:"priority-standard",level:"standard"}}async function Ss(e,t,s,r){var n;const a=e.RESEND_API_KEY||(typeof process<"u"?(n=process.env)==null?void 0:n.RESEND_API_KEY:void 0);if(!a)return!1;try{const i=`<!DOCTYPE html>
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
        Hi ${D(s)}, your spot in the Codeward private beta is now active. Your repository sandboxes and 11 review agents are standing by.
      </p>
      <a href="https://app.codeward.cloud/onboarding?token=beta_access_${r}" style="display:inline-block;background:#22c55e;color:#000000;font-weight:600;font-size:15px;padding:14px 28px;border-radius:99px;text-decoration:none;">
        Access Codeward Sandbox &rarr;
      </a>
    </td>
  </tr>
</table>
</body>
</html>`;return(await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward <founders@codeward.cloud>",to:[t],subject:"🎉 Your Codeward Early Access is Ready!",html:i})})).ok}catch(i){return console.error("Failed sending beta invite email:",i),!1}}j.get("/login",e=>{const t=`<!DOCTYPE html>
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
</html>`;return e.html(t)});j.post("/login",async e=>{const t=await e.req.parseBody(),s=e.env.ADMIN_USERNAME||process.env.ADMIN_USERNAME||"kelvin.reallife8@gmail.com",r=e.env.ADMIN_PASSWORD||process.env.ADMIN_PASSWORD||"paraKenya8#";return t.username===s&&t.password===r?(xs(e,"codeward_admin_session",r,{path:"/admin",httpOnly:!0,secure:!0,maxAge:3600*24*7}),e.redirect("/admin")):e.redirect("/admin/login?error=1")});j.get("/logout",e=>(Tr(e,"codeward_admin_session",{path:"/admin"}),e.redirect("/admin/login")));const ot={"software-engineer":"Software Engineer","senior-engineer":"Senior / Staff Engineer","engineering-lead":"Engineering Lead / Manager","cto-vp":"CTO / VP of Engineering","devops-platform":"DevOps / Platform Engineer","security-engineer":"Security Engineer",freelancer:"Freelance Developer","open-source":"Open Source Contributor",student:"Student / Bootcamp",founder:"Founder / Indie Hacker",other:"Other"};function D(e){return(e||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function de(e){if(e==null)return"";const t=String(e);return/[",\n]/.test(t)?'"'+t.replace(/"/g,'""')+'"':t}j.get("/",async e=>{var Ht,Mt,qt,Bt,Ut,Ft,zt;const{env:t}=e,s=new URL(e.req.url),r=(s.searchParams.get("q")||"").trim(),a=(s.searchParams.get("role")||"").trim(),n=(s.searchParams.get("priority")||"").trim(),i=(s.searchParams.get("status")||"").trim(),l=Math.max(1,parseInt(s.searchParams.get("page")||"1",10)||1),p=25,o=s.searchParams.get("msg")||"";let c="";o==="retrigger_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Email successfully resent!</div>':o==="invite_success"?c='<div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 12px 16px; border-radius: 8px; font-weight: 500;">🎉 Early access invitation sent successfully!</div>':o==="add_lead_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ VIP Lead added to waitlist!</div>':o==="bulk_success"?c='<div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #10b981; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Bulk action executed successfully!</div>':o==="delete_success"&&(c='<div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; padding: 12px 16px; border-radius: 8px; font-weight: 500;">✓ Waitlist entry deleted.</div>');let d="WHERE 1=1";const u=[];let m=1;if(r){d+=` AND (LOWER(name) LIKE $${m++} OR LOWER(email) LIKE $${m++} OR LOWER(company) LIKE $${m++})`;const b=`%${r.toLowerCase()}%`;u.push(b,b,b)}a&&(d+=` AND role = $${m++}`,u.push(a)),i&&(d+=` AND COALESCE(status, 'pending') = $${m++}`,u.push(i));const f=await ie(e).connect();let y=((await f.query(`SELECT id, name, email, role, company, github, position, created_at, email_sent, linkedin_clicked, status, invited_at
     FROM waitlist_entries ${d}
     ORDER BY created_at DESC`,u)).rows||[]).map(b=>{const k=Es(b);return{...b,priority:k}});n&&(y=y.filter(b=>b.priority.level===n));const x=y.length,S=Math.max(1,Math.ceil(x/p)),A=Math.min(l,S),T=(A-1)*p,J=y.slice(T,T+p),st=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries"),_=Number(((Ht=st.rows[0])==null?void 0:Ht.cnt)??0),He=await f.query(`SELECT 
       SUM(CASE WHEN email_sent = 1 THEN 1 ELSE 0 END) as sent,
       SUM(CASE WHEN email_sent = 0 THEN 1 ELSE 0 END) as failed,
       SUM(CASE WHEN COALESCE(status, 'pending') = 'invited' THEN 1 ELSE 0 END) as invited
     FROM waitlist_entries`),Me=Number(((Mt=He.rows[0])==null?void 0:Mt.sent)??0);Number(((qt=He.rows[0])==null?void 0:qt.failed)??0);const oe=Number(((Bt=He.rows[0])==null?void 0:Bt.invited)??0),I=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE created_at::DATE = CURRENT_DATE"),U=Number(((Ut=I.rows[0])==null?void 0:Ut.cnt)??0),Q=(await f.query("SELECT role, COUNT(*) as cnt FROM waitlist_entries GROUP BY role ORDER BY cnt DESC")).rows,le=await f.query("SELECT COUNT(*) as cnt FROM waitlist_entries WHERE company IS NOT NULL AND company != ''");Number(((Ft=le.rows[0])==null?void 0:Ft.cnt)??0);const gt={},Ls=new Set(["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","proton.me","protonmail.com","aol.com","live.com"]);let Dt=0;for(const b of y){const k=(b.email.split("@")[1]||"").toLowerCase();k&&(Ls.has(k)||(Dt++,gt[k]=(gt[k]||0)+1))}const It=Object.entries(gt).sort((b,k)=>k[1]-b[1]).slice(0,5),Nt=((await f.query(`SELECT DATE(created_at) as day, COUNT(*) as cnt
     FROM waitlist_entries
     GROUP BY DATE(created_at)
     ORDER BY day DESC
     LIMIT 10`)).rows||[]).reverse(),Ps=Math.max(1,...Nt.map(b=>Number(b.cnt))),_s=Nt.map(b=>{const k=Number(b.cnt),ce=Math.round(k/Ps*100),Ee=new Date(b.day).toLocaleDateString("en-US",{month:"short",day:"numeric"});return`
      <div class="chart-bar-col">
        <div class="chart-bar-track">
          <span class="chart-bar-value">${k}</span>
          <div class="chart-bar-fill" style="height: ${Math.max(15,ce)}%;"></div>
        </div>
        <span class="chart-bar-label">${Ee}</span>
      </div>
    `}).join(""),$s=Object.entries(ot).map(([b,k])=>`<option value="${b}" ${a===b?"selected":""}>${D(k)}</option>`).join(""),Ds=J.length?J.map(b=>{const k=new Date(b.created_at+"Z"),ce=isNaN(k.getTime())?b.created_at:k.toLocaleDateString("en-US",{month:"short",day:"numeric"})+" · "+k.toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit"}),Ee=b.status==="invited";return`
        <tr>
          <td><input type="checkbox" class="entry-checkbox" name="ids" value="${b.id}"/></td>
          <td class="pos-cell">#${616+b.position}</td>
          <td><span class="priority-badge ${b.priority.class}">${b.priority.label} (${b.priority.score})</span></td>
          <td>
            <div class="name-cell">${D(b.name)}</div>
            <div class="email-cell">${D(b.email)}</div>
          </td>
          <td><span class="role-badge">${D(ot[b.role]||b.role)}</span></td>
          <td>${b.company?D(b.company):'<span class="muted">—</span>'}</td>
          <td>${b.github?`<a href="${D(b.github)}" target="_blank" rel="noopener" class="github-link">${D(b.github.replace(/^https?:\/\/(www\.)?github\.com\//,"@"))}</a>`:'<span class="muted">—</span>'}</td>
          <td class="date-cell">${ce}</td>
          <td>
            ${Ee?'<span class="status-badge status-invited">Beta Invited</span>':'<span class="status-badge status-pending">In Queue</span>'}
          </td>
          <td>
            <div style="display:flex;gap:6px;align-items:center;">
              <form method="post" action="/admin/invite" style="margin:0;">
                <input type="hidden" name="email" value="${D(b.email)}" />
                <button type="submit" class="action-btn invite-btn">${Ee?"Re-invite":"Invite"}</button>
              </form>
              <form method="post" action="/admin/retrigger" style="margin:0;">
                <input type="hidden" name="email" value="${D(b.email)}" />
                <button type="submit" class="action-btn">Resend Waitlist</button>
              </form>
              <form method="post" action="/admin/delete" style="margin:0;" onsubmit="return confirm('Delete ${D(b.name)} from waitlist?');">
                <input type="hidden" name="id" value="${b.id}" />
                <button type="submit" class="action-btn danger-btn">&times;</button>
              </form>
            </div>
          </td>
        </tr>`}).join(""):'<tr><td colspan="10" class="empty-row">No waitlist entries match your filters.</td></tr>',Is=(Q||[]).map(b=>{const k=Number(b.cnt),ce=_?Math.round(k/_*100):0;return`
      <div class="role-bar-row">
        <div class="role-bar-label">${D(ot[b.role]||b.role)}</div>
        <div class="role-bar-track"><div class="role-bar-fill" style="width:${ce}%"></div></div>
        <div class="role-bar-count">${k}</div>
      </div>`}).join(""),vt=b=>{const k=new URLSearchParams;return r&&k.set("q",r),a&&k.set("role",a),n&&k.set("priority",n),i&&k.set("status",i),k.set("page",String(A)),Object.entries(b).forEach(([ce,Ee])=>k.set(ce,String(Ee))),"?"+k.toString()},jt=(t==null?void 0:t.RESEND_API_KEY)||(typeof process<"u"?(zt=process.env)==null?void 0:zt.RESEND_API_KEY:void 0),Ns=_?Math.round(Me/_*100):100,js=`<!DOCTYPE html>
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
      <div class="health-dot ${jt?"":"red"}"></div>
      <span>Resend API: <strong>${jt?"Active":"Missing API Key"}</strong></span>
    </div>
    <div class="health-item">
      <span>Delivery Rate: <strong>${Ns}%</strong></span>
    </div>
    <div class="health-item">
      <span>Corporate Leads: <strong>${Dt}</strong></span>
    </div>
  </div>

  ${c}

  <section class="stats-row">
    <div class="stat-card">
      <span class="stat-num">${_.toLocaleString()}</span>
      <span class="stat-label">total signups</span>
    </div>
    <div class="stat-card">
      <span class="stat-num accent">+${U.toLocaleString()}</span>
      <span class="stat-label">joined today</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#3b82f6;">${oe.toLocaleString()}</span>
      <span class="stat-label">invited to beta</span>
    </div>
    <div class="stat-card">
      <span class="stat-num" style="color:#10b981;">${Me.toLocaleString()}</span>
      <span class="stat-label">emails sent</span>
    </div>
  </section>

  <!-- ── ANALYTICS GRID ── -->
  <div class="analytics-grid">
    <section class="panel chart-card">
      <h2 class="panel-title">Daily Signup Trend (Last 10 Days)</h2>
      <div class="chart-container">
        ${_s||'<p class="muted">No recent signups.</p>'}
      </div>
    </section>

    <section class="panel">
      <h2 class="panel-title">Top Corporate Domains</h2>
      <div class="domain-list">
        ${It.length?It.map(([b,k])=>`
            <div class="domain-item">
              <span class="domain-name">@${D(b)}</span>
              <span class="domain-count">${k} lead${k>1?"s":""}</span>
            </div>
          `).join(""):'<p class="muted" style="font-size:13px;">No corporate domains yet.</p>'}
      </div>
    </section>
  </div>

  <!-- ── ROLE BREAKDOWN PANEL ── -->
  <section class="panel role-breakdown-panel">
    <h2 class="panel-title">Role breakdown</h2>
    <div class="role-bars">
      ${Is||'<p class="muted">No data yet.</p>'}
    </div>
  </section>

  <!-- ── MAIN WAITLIST TABLE PANEL ── -->
  <section class="panel">
    <div class="panel-toolbar">
      <h2 class="panel-title">Waitlist entries (${x.toLocaleString()})</h2>
      <div style="display:flex;gap:10px;">
        <a class="export-btn" href="/admin/export.csv${vt({})}">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Export CSV
        </a>
      </div>
    </div>

    <!-- Filter Bar -->
    <form class="filter-bar" method="get" action="/admin">
      <input type="text" name="q" placeholder="Search name, email, or company…" value="${D(r)}" class="search-input"/>
      
      <select name="role" class="role-select">
        <option value="">All roles</option>
        ${$s}
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
      ${r||a||n||i?'<a href="/admin" class="clear-btn">Clear</a>':""}
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
            ${Ds}
          </tbody>
        </table>
      </div>
    </form>

    <div class="pagination">
      <span class="page-info">Showing ${J.length?T+1:0}–${T+J.length} of ${x.toLocaleString()}</span>
      <div class="page-buttons">
        <a href="/admin${vt({page:Math.max(1,A-1)})}" class="page-btn ${A<=1?"disabled":""}">&larr; Prev</a>
        <span class="page-current">Page ${A} of ${S}</span>
        <a href="/admin${vt({page:Math.min(S,A+1)})}" class="page-btn ${A>=S?"disabled":""}">Next &rarr;</a>
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
</html>`;return e.html(js)});j.post("/invite",async e=>{const{env:t}=e,r=((await e.req.parseBody()).email||"").toString().trim();if(!r)return e.redirect("/admin");const a=await ie(e).connect(),i=(await a.query("SELECT name, position FROM waitlist_entries WHERE email = $1",[r])).rows[0];return i&&await Ss(t,r,i.name,i.position)?(await a.query("UPDATE waitlist_entries SET status = 'invited', invited_at = CURRENT_TIMESTAMP WHERE email = $1",[r]),e.redirect("/admin?msg=invite_success")):e.redirect("/admin?msg=retrigger_failed")});j.post("/bulk-action",async e=>{const{env:t}=e,s=await e.req.parseBody(),r=(s.action||"").toString();let a=s.ids;if(!a)return e.redirect("/admin");Array.isArray(a)||(a=[a]);const n=await ie(e).connect();for(const i of a){const l=parseInt(i.toString(),10);if(isNaN(l))continue;const o=(await n.query("SELECT email, name, position FROM waitlist_entries WHERE id = $1",[l])).rows[0];o&&(r==="invite"?await Ss(t,o.email,o.name,o.position)&&await n.query("UPDATE waitlist_entries SET status = 'invited', invited_at = CURRENT_TIMESTAMP WHERE id = $1",[l]):r==="retrigger"?await mt(t,o.email,o.name,o.position)&&await n.query("UPDATE waitlist_entries SET email_sent = 1 WHERE id = $1",[l]):r==="delete"&&await n.query("DELETE FROM waitlist_entries WHERE id = $1",[l]))}return e.redirect("/admin?msg=bulk_success")});j.post("/add-lead",async e=>{var p;const{env:t}=e,s=await e.req.parseBody(),r=(s.name||"").toString().trim(),a=(s.email||"").toString().trim().toLowerCase(),n=(s.role||"founder").toString().trim(),i=(s.company||"").toString().trim(),l=(s.github||"").toString().trim();if(r.length>=2&&a.includes("@")){const o=await ie(e).connect(),c=await o.query("SELECT COUNT(*) as cnt FROM waitlist_entries"),d=Number(((p=c.rows[0])==null?void 0:p.cnt)??0)+1;await o.query(`INSERT INTO waitlist_entries (name, email, role, company, github, position) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       ON CONFLICT (email) DO NOTHING`,[r,a,n,i||null,l||null,d]),await mt(t,a,r,d),await o.query("UPDATE waitlist_entries SET email_sent = 1 WHERE email = $1",[a])}return e.redirect("/admin?msg=add_lead_success")});j.post("/delete",async e=>{const t=await e.req.parseBody(),s=parseInt((t.id||"").toString(),10);return isNaN(s)||await(await ie(e).connect()).query("DELETE FROM waitlist_entries WHERE id = $1",[s]),e.redirect("/admin?msg=delete_success")});j.get("/export.csv",async e=>{const{env:t}=e,s=new URL(e.req.url),r=(s.searchParams.get("q")||"").trim(),a=(s.searchParams.get("role")||"").trim(),n=(s.searchParams.get("status")||"").trim();let i="WHERE 1=1";const l=[];let p=1;if(r){i+=` AND (LOWER(name) LIKE $${p++} OR LOWER(email) LIKE $${p++} OR LOWER(company) LIKE $${p++})`;const g=`%${r.toLowerCase()}%`;l.push(g,g,g)}a&&(i+=` AND role = $${p++}`,l.push(a)),n&&(i+=` AND COALESCE(status, 'pending') = $${p++}`,l.push(n));const d=(await(await ie(e).connect()).query(`SELECT id, name, email, role, company, github, position, created_at, status, invited_at
     FROM waitlist_entries ${i}
     ORDER BY created_at ASC`,l)).rows||[],m=[["Position","Priority Score","Name","Email","Role","Company","GitHub","Beta Status","Joined At (UTC)"].join(",")];for(const g of d){const y=Es(g);m.push([616+g.position,`${y.score} (${y.level})`,de(g.name),de(g.email),de(ot[g.role]||g.role),de(g.company||""),de(g.github||""),de(g.status||"pending"),de(g.created_at)].join(","))}const f=m.join(`
`);return new Response(f,{headers:{"Content-Type":"text/csv; charset=utf-8","Content-Disposition":`attachment; filename="codeward-waitlist-${new Date().toISOString().slice(0,10)}.csv"`}})});j.post("/retrigger",async e=>{const{env:t}=e,r=((await e.req.parseBody()).email||"").toString().trim();if(!r)return e.redirect("/admin");const a=await ie(e).connect(),i=(await a.query("SELECT name, position FROM waitlist_entries WHERE email = $1",[r])).rows[0];return i&&await mt(t,r,i.name,i.position)?(await a.query("UPDATE waitlist_entries SET email_sent = 1 WHERE email = $1",[r]),e.redirect("/admin?msg=retrigger_success")):e.redirect("/admin?msg=retrigger_failed")});typeof process<"u"&&process.env&&(process.env.POSTGRES_URL=process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL);function Pr(e){const r=`https://${new URL(e).hostname}/sql`;async function a(i,l=[]){const p=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json","Neon-Connection-String":e},body:JSON.stringify({query:i,params:l})});if(!p.ok){const c=await p.text();throw new Error(`DB error ${p.status}: ${c}`)}const o=await p.json();return{rows:o.rows??[],rowCount:o.rowCount??0}}async function n(i,...l){let p="";const o=[];return i.forEach((c,d)=>{p+=c,d<l.length&&(o.push(l[d]===void 0?null:l[d]),p+=`$${o.length}`)}),a(p,o)}return n.connect=async()=>({query:a,release:()=>{}}),n.query=a,n}let Et=null;function Z(e){var t,s,r;if(!Et){const a=((t=e==null?void 0:e.env)==null?void 0:t.POSTGRES_URL)||((s=e==null?void 0:e.env)==null?void 0:s.DATABASE_POSTGRES_URL)||((r=e==null?void 0:e.env)==null?void 0:r.DATABASE_URL)||(typeof process<"u"&&process.env?process.env.POSTGRES_URL||process.env.DATABASE_POSTGRES_URL||process.env.DATABASE_URL:void 0);if(!a)throw new Error("No database connection string found in environment");Et=Pr(a)}return Et}function Ae(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}const V=new Pt;V.onError((e,t)=>(console.error("Hono Global Error:",e),t.json({error:e.message||"Internal Server Error"},500)));V.route("/admin",j);V.get("/terms",e=>e.html(`<!DOCTYPE html>
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
      <p>If you have any questions regarding these terms or your personal data, please reach out to us at <a href="mailto:support@codeward.ai" style="color: var(--brand-green); text-decoration: underline;">support@codeward.ai</a>.</p>
    </div>

    <div class="legal-footer">
      <span>&copy; ${new Date().getFullYear()} Codeward. All rights reserved.</span>
      <a href="/" class="back-link" style="margin-bottom: 0;">Back to Home</a>
    </div>
  </div>
</body>
</html>`));const ue=617;V.get("/api/stats",async e=>{var a;const{env:t}=e,{rows:s}=await Z(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,r=Number(((a=s[0])==null?void 0:a.cnt)??0);return e.json({count:ue+r})});function _r(e){function t(f,g){const y=(f&65535)+(g&65535);return(f>>16)+(g>>16)+(y>>16)<<16|y&65535}function s(f,g){return f<<g|f>>>32-g}function r(f,g,y,x,S,A){return t(s(t(t(g,f),t(x,A)),S),y)}function a(f,g,y,x,S,A,T){return r(g&y|~g&x,f,g,S,A,T)}function n(f,g,y,x,S,A,T){return r(g&x|y&~x,f,g,S,A,T)}function i(f,g,y,x,S,A,T){return r(g^y^x,f,g,S,A,T)}function l(f,g,y,x,S,A,T){return r(y^(g|~x),f,g,S,A,T)}function p(f){const g=(f.length+8>>6)+1,y=new Array(g*16).fill(0);for(let x=0;x<f.length;x++)y[x>>2]|=f.charCodeAt(x)<<x%4*8;return y[f.length>>2]|=128<<f.length%4*8,y[g*16-2]=f.length*8,y}const o=p(e.toLowerCase().trim());let c=1732584193,d=-271733879,u=-1732584194,m=271733878;for(let f=0;f<o.length;f+=16){const[g,y,x,S]=[c,d,u,m];c=a(c,d,u,m,o[f+0],7,-680876936),d=a(m,c,d,u,o[f+1],12,-389564586),u=a(u,m,c,d,o[f+2],17,606105819),m=a(d,u,m,c,o[f+3],22,-1044525330),c=a(c,d,u,m,o[f+4],7,-176418897),d=a(m,c,d,u,o[f+5],12,1200080426),u=a(u,m,c,d,o[f+6],17,-1473231341),m=a(d,u,m,c,o[f+7],22,-45705983),c=a(c,d,u,m,o[f+8],7,1770035416),d=a(m,c,d,u,o[f+9],12,-1958414417),u=a(u,m,c,d,o[f+10],17,-42063),m=a(d,u,m,c,o[f+11],22,-1990404162),c=a(c,d,u,m,o[f+12],7,1804603682),d=a(m,c,d,u,o[f+13],12,-40341101),u=a(u,m,c,d,o[f+14],17,-1502002290),m=a(d,u,m,c,o[f+15],22,1236535329),c=n(c,d,u,m,o[f+1],5,-165796510),d=n(m,c,d,u,o[f+6],9,-1069501632),u=n(u,m,c,d,o[f+11],14,643717713),m=n(d,u,m,c,o[f+0],20,-373897302),c=n(c,d,u,m,o[f+5],5,-701558691),d=n(m,c,d,u,o[f+10],9,38016083),u=n(u,m,c,d,o[f+15],14,-660478335),m=n(d,u,m,c,o[f+4],20,-405537848),c=n(c,d,u,m,o[f+9],5,568446438),d=n(m,c,d,u,o[f+14],9,-1019803690),u=n(u,m,c,d,o[f+3],14,-187363961),m=n(d,u,m,c,o[f+8],20,1163531501),c=n(c,d,u,m,o[f+13],5,-1444681467),d=n(m,c,d,u,o[f+2],9,-51403784),u=n(u,m,c,d,o[f+7],14,1735328473),m=n(d,u,m,c,o[f+12],20,-1926607734),c=i(c,d,u,m,o[f+5],4,-378558),d=i(m,c,d,u,o[f+8],11,-2022574463),u=i(u,m,c,d,o[f+11],16,1839030562),m=i(d,u,m,c,o[f+14],23,-35309556),c=i(c,d,u,m,o[f+1],4,-1530992060),d=i(m,c,d,u,o[f+4],11,1272893353),u=i(u,m,c,d,o[f+7],16,-155497632),m=i(d,u,m,c,o[f+10],23,-1094730640),c=i(c,d,u,m,o[f+13],4,681279174),d=i(m,c,d,u,o[f+0],11,-358537222),u=i(u,m,c,d,o[f+3],16,-722521979),m=i(d,u,m,c,o[f+6],23,76029189),c=i(c,d,u,m,o[f+9],4,-640364487),d=i(m,c,d,u,o[f+12],11,-421815835),u=i(u,m,c,d,o[f+15],16,530742520),m=i(d,u,m,c,o[f+2],23,-995338651),c=l(c,d,u,m,o[f+0],6,-198630844),d=l(m,c,d,u,o[f+7],10,1126891415),u=l(u,m,c,d,o[f+14],15,-1416354905),m=l(d,u,m,c,o[f+5],21,-57434055),c=l(c,d,u,m,o[f+12],6,1700485571),d=l(m,c,d,u,o[f+3],10,-1894986606),u=l(u,m,c,d,o[f+10],15,-1051523),m=l(d,u,m,c,o[f+1],21,-2054922799),c=l(c,d,u,m,o[f+8],6,1873313359),d=l(m,c,d,u,o[f+15],10,-30611744),u=l(u,m,c,d,o[f+6],15,-1560198380),m=l(d,u,m,c,o[f+13],21,1309151649),c=l(c,d,u,m,o[f+4],6,-145523070),d=l(m,c,d,u,o[f+11],10,-1120210379),u=l(u,m,c,d,o[f+2],15,718787259),m=l(d,u,m,c,o[f+9],21,-343485551),c=t(c,g),d=t(d,y),u=t(u,x),m=t(m,S)}return[c,d,u,m].map(f=>{let g="";for(let y=0;y<4;y++)g+=("0"+(f>>y*8&255).toString(16)).slice(-2);return g}).join("")}V.get("/api/avatars",async e=>{try{const{rows:t}=await Z(e)`SELECT name, email FROM waitlist_entries ORDER BY id DESC LIMIT 8`,s=t.map(r=>{let a="";try{a=_r(r.email||"")}catch{}const n=(r.name||"").trim(),i=n.split(" ")[0]||"",l=n.split(" ")[1]||"";return{initials:((i[0]||"")+(l[0]||"")).toUpperCase()||"?",emailHash:a}});return e.json({avatars:s},200,{"Cache-Control":"public, max-age=60"})}catch{return e.json({avatars:[]})}});V.post("/api/join",async e=>{var g;const{env:t}=e;let s;try{s=await e.req.json()}catch{return e.json({error:"Invalid request body"},400)}const r=(s.name||"").toString().trim(),a=(s.email||"").toString().trim().toLowerCase(),n=(s.role||"").toString().trim(),i=(s.company||"").toString().trim(),l=(s.github||"").toString().trim();if(r.length<2)return e.json({error:"Please enter your full name."},400);if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a))return e.json({error:"Please enter a valid email address."},400);if(!n)return e.json({error:"Please select your role."},400);const{rows:p}=await Z(e)`SELECT id, position FROM waitlist_entries WHERE email = ${a}`,o=p[0];if(o){const{rows:y}=await Z(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,x=y[0];return e.json({alreadyJoined:!0,position:ue+Number(o.position),total:ue+Number((x==null?void 0:x.cnt)??0)})}const{rows:c}=await Z(e)`SELECT COUNT(*) as cnt FROM waitlist_entries`,d=c[0],u=Number((d==null?void 0:d.cnt)??0)+1;await Z(e)`INSERT INTO waitlist_entries (name, email, role, company, github, position) VALUES (${r}, ${a}, ${n}, ${i||null}, ${l||null}, ${u})`;let m=0;if((t==null?void 0:t.RESEND_API_KEY)||(typeof process<"u"?(g=process.env)==null?void 0:g.RESEND_API_KEY:void 0)){await mt(t,a,r,u)&&(m=1);try{await $r(t,r,a,n,i,l,ue+u)}catch(x){console.error("Failed sending admin notification email:",x)}}return await Z(e)`UPDATE waitlist_entries SET email_sent = ${m} WHERE email = ${a}`,e.json({success:!0,position:ue+u,total:ue+Number((d==null?void 0:d.cnt)??0)+1})});async function mt(e,t,s,r){const a=e.RESEND_API_KEY||process.env.RESEND_API_KEY;if(!a)return!1;try{const n=(ue+r).toLocaleString(),i=`<!DOCTYPE html>
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
        Hi ${Ae(s)} — thanks for requesting early access to Codeward. I wanted to reach out myself rather than send a form reply.
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
</html>`,l=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward <waitlist@codeward.cloud>",to:[t],subject:"You are on the Codeward waitlist",html:i})});if(!l.ok){const p=await l.text();console.error("Resend API Error:",l.status,p)}return l.ok}catch(n){return console.error("Failed to send email",n),!1}}async function $r(e,t,s,r,a,n,i){const l=e.RESEND_API_KEY||process.env.RESEND_API_KEY;if(!l)return!1;try{const p=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify({from:"Codeward System <waitlist@codeward.cloud>",to:["kelvin.reallife8@gmail.com"],subject:`New Waitlist Sign-up: ${t}`,html:`
          <h3>New Waitlist Sign-up Details</h3>
          <p><strong>Name:</strong> ${Ae(t)}</p>
          <p><strong>Email:</strong> ${Ae(s)}</p>
          <p><strong>Role:</strong> ${Ae(r)}</p>
          <p><strong>Company:</strong> ${Ae(a||"None")}</p>
          <p><strong>GitHub:</strong> ${Ae(n||"None")}</p>
          <p><strong>Position:</strong> #${i}</p>
        `})});if(!p.ok){const o=await p.text();console.error("Resend API Error (Admin Notification):",p.status,o)}return p.ok}catch(p){return console.error("Failed to send admin email",p),!1}}V.post("/api/track-linkedin",async e=>{const{env:t}=e;let s;try{s=await e.req.json()}catch{return e.json({error:"Invalid body"},400)}return s.email&&await sql`UPDATE waitlist_entries SET linkedin_clicked = 1 WHERE email = ${s.email}`,e.json({success:!0})});V.get("/",e=>(e.header("Cache-Control","no-store, no-cache, must-revalidate, proxy-revalidate"),e.header("Pragma","no-cache"),e.header("Expires","0"),e.html(Dr)));const Dr=`<!DOCTYPE html>
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
</html>`;var fe=class extends Error{constructor(e,t){super(e,t),this.name="RequestError"}},Ir=e=>e instanceof fe?e:new fe(e.message,{cause:e}),Nr=global.Request,Ye=class extends Nr{constructor(t,s){var r;typeof t=="object"&&Ne in t&&(t=t[Ne]()),typeof((r=s==null?void 0:s.body)==null?void 0:r.getReader)<"u"&&(s.duplex??(s.duplex="half")),super(t,s)}},jr=e=>{const t=[],s=e.rawHeaders;for(let r=0;r<s.length;r+=2){const{[r]:a,[r+1]:n}=s;a.charCodeAt(0)!==58&&t.push([a,n])}return new Headers(t)},ks=Symbol("wrapBodyStream"),Hr=(e,t,s,r,a)=>{const n={method:e,headers:s,signal:a.signal};if(e==="TRACE"){n.method="GET";const i=new Ye(t,n);return Object.defineProperty(i,"method",{get(){return"TRACE"}}),i}if(!(e==="GET"||e==="HEAD"))if("rawBody"in r&&r.rawBody instanceof Buffer)n.body=new ReadableStream({start(i){i.enqueue(r.rawBody),i.close()}});else if(r[ks]){let i;n.body=new ReadableStream({async pull(l){try{i||(i=Yt.toWeb(r).getReader());const{done:p,value:o}=await i.read();p?l.close():l.enqueue(o)}catch(p){l.error(p)}}})}else n.body=Yt.toWeb(r);return new Ye(t,n)},Ne=Symbol("getRequestCache"),lt=Symbol("requestCache"),ct=Symbol("incomingKey"),pt=Symbol("urlKey"),St=Symbol("headersKey"),ee=Symbol("abortControllerKey"),Mr=Symbol("getAbortController"),tt={get method(){return this[ct].method||"GET"},get url(){return this[pt]},get headers(){return this[St]||(this[St]=jr(this[ct]))},[Mr](){return this[Ne](),this[ee]},[Ne](){return this[ee]||(this[ee]=new AbortController),this[lt]||(this[lt]=Hr(this.method,this[pt],this.headers,this[ct],this[ee]))}};["body","bodyUsed","cache","credentials","destination","integrity","mode","redirect","referrer","referrerPolicy","signal","keepalive"].forEach(e=>{Object.defineProperty(tt,e,{get(){return this[Ne]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(tt,e,{value:function(){return this[Ne]()[e]()}})});Object.defineProperty(tt,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,s){const r={method:this.method,url:this.url,headers:this.headers,nativeRequest:this[lt]};return`Request (lightweight) ${s(r,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(tt,Ye.prototype);var qr=(e,t)=>{const s=Object.create(tt);s[ct]=e;const r=e.url||"";if(r[0]!=="/"&&(r.startsWith("http://")||r.startsWith("https://"))){if(e instanceof ze)throw new fe("Absolute URL for :path is not allowed in HTTP/2");try{const l=new URL(r);s[pt]=l.href}catch(l){throw new fe("Invalid absolute URL",{cause:l})}return s}const a=(e instanceof ze?e.authority:e.headers.host)||t;if(!a)throw new fe("Missing host header");let n;if(e instanceof ze){if(n=e.scheme,!(n==="http"||n==="https"))throw new fe("Unsupported scheme")}else n=e.socket&&e.socket.encrypted?"https":"http";const i=new URL(`${n}://${a}${r}`);if(i.hostname.length!==a.length&&i.hostname!==a.replace(/:\d+$/,""))throw new fe("Invalid host header");return s[pt]=i.href,s},Fe=Symbol("responseCache"),Ce=Symbol("getResponseCache"),me=Symbol("cache"),_t=global.Response,et,Y,Ie,je=(Ie=class{constructor(t,s){E(this,et);E(this,Y);let r;if(v(this,et,t),s instanceof Ie){const a=s[Fe];if(a){v(this,Y,a),this[Ce]();return}else v(this,Y,h(s,Y)),r=new Headers(h(s,Y).headers)}else v(this,Y,s);(typeof t=="string"||typeof(t==null?void 0:t.getReader)<"u"||t instanceof Blob||t instanceof Uint8Array)&&(this[me]=[(s==null?void 0:s.status)||200,t,r||(s==null?void 0:s.headers)])}[Ce](){return delete this[me],this[Fe]||(this[Fe]=new _t(h(this,et),h(this,Y)))}get headers(){const t=this[me];return t?(t[2]instanceof Headers||(t[2]=new Headers(t[2]||{"content-type":"text/plain; charset=UTF-8"})),t[2]):this[Ce]().headers}get status(){var t;return((t=this[me])==null?void 0:t[0])??this[Ce]().status}get ok(){const t=this.status;return t>=200&&t<300}},et=new WeakMap,Y=new WeakMap,Ie);["body","bodyUsed","redirected","statusText","trailers","type","url"].forEach(e=>{Object.defineProperty(je.prototype,e,{get(){return this[Ce]()[e]}})});["arrayBuffer","blob","clone","formData","json","text"].forEach(e=>{Object.defineProperty(je.prototype,e,{value:function(){return this[Ce]()[e]()}})});Object.defineProperty(je.prototype,Symbol.for("nodejs.util.inspect.custom"),{value:function(e,t,s){const r={status:this.status,headers:this.headers,ok:this.ok,nativeResponse:this[Fe]};return`Response (lightweight) ${s(r,{...t,depth:e==null?null:e-1})}`}});Object.setPrototypeOf(je,_t);Object.setPrototypeOf(je.prototype,_t.prototype);async function Br(e){return Promise.race([e,Promise.resolve().then(()=>Promise.resolve(void 0))])}function Rs(e,t,s){const r=l=>{e.cancel(l).catch(()=>{})};return t.on("close",r),t.on("error",r),(s??e.read()).then(i,a),e.closed.finally(()=>{t.off("close",r),t.off("error",r)});function a(l){l&&t.destroy(l)}function n(){e.read().then(i,a)}function i({done:l,value:p}){try{if(l)t.end();else if(!t.write(p))t.once("drain",n);else return e.read().then(i,a)}catch(o){a(o)}}}function Ur(e,t){if(e.locked)throw new TypeError("ReadableStream is locked.");return t.destroyed?void 0:Rs(e.getReader(),t)}var Ct=e=>{const t={};e instanceof Headers||(e=new Headers(e??void 0));const s=[];for(const[r,a]of e)r==="set-cookie"?s.push(a):t[r]=a;return s.length>0&&(t["set-cookie"]=s),t["content-type"]??(t["content-type"]="text/plain; charset=UTF-8"),t},Fr="x-hono-already-sent";typeof global.crypto>"u"&&(global.crypto=Bs);var $t=Symbol("outgoingEnded"),Zt=Symbol("incomingDraining"),zr=500,Wr=64*1024*1024,kt=e=>{var l,p,o;const t=e;if(e.destroyed||t[Zt])return;if(t[Zt]=!0,e instanceof ze){try{(p=(l=e.stream)==null?void 0:l.close)==null||p.call(l,qs.NGHTTP2_NO_ERROR)}catch{}return}let s=0;const r=()=>{clearTimeout(n),e.off("data",i),e.off("end",r),e.off("error",r)},a=()=>{r();const c=e.socket;c&&!c.destroyed&&c.destroySoon()},n=setTimeout(a,zr);(o=n.unref)==null||o.call(n);const i=c=>{s+=c.length,s>Wr&&a()};e.on("data",i),e.on("end",r),e.on("error",r),e.resume()},Gr=()=>new Response(null,{status:400}),As=e=>new Response(null,{status:e instanceof Error&&(e.name==="TimeoutError"||e.constructor.name==="TimeoutError")?504:500}),Ot=(e,t)=>{const s=e instanceof Error?e:new Error("unknown error",{cause:e});s.code==="ERR_STREAM_PREMATURE_CLOSE"?console.info("The user aborted a request."):(console.error(e),t.headersSent||t.writeHead(500,{"Content-Type":"text/plain"}),t.end(`Error: ${s.message}`),t.destroy(s))},Cs=e=>{"flushHeaders"in e&&e.writable&&e.flushHeaders()},Os=async(e,t)=>{var i,l;let[s,r,a]=e[me],n=!1;if(!a)a={"content-type":"text/plain; charset=UTF-8"};else if(a instanceof Headers)n=a.has("content-length"),a=Ct(a);else if(Array.isArray(a)){const p=new Headers(a);n=p.has("content-length"),a=Ct(p)}else for(const p in a)if(p.length===14&&p.toLowerCase()==="content-length"){n=!0;break}n||(typeof r=="string"?a["Content-Length"]=Buffer.byteLength(r):r instanceof Uint8Array?a["Content-Length"]=r.byteLength:r instanceof Blob&&(a["Content-Length"]=r.size)),t.writeHead(s,a),typeof r=="string"||r instanceof Uint8Array?t.end(r):r instanceof Blob?t.end(new Uint8Array(await r.arrayBuffer())):(Cs(t),await((i=Ur(r,t))==null?void 0:i.catch(p=>Ot(p,t)))),(l=t[$t])==null||l.call(t)},Yr=e=>typeof e.then=="function",Kr=async(e,t,s={})=>{var a;if(Yr(e))if(s.errorHandler)try{e=await e}catch(n){const i=await s.errorHandler(n);if(!i)return;e=i}else e=await e.catch(As);if(me in e)return Os(e,t);const r=Ct(e.headers);if(e.body){const n=e.body.getReader(),i=[];let l=!1,p;if(r["transfer-encoding"]!=="chunked"){let o=2;for(let c=0;c<o;c++){p||(p=n.read());const d=await Br(p).catch(u=>{console.error(u),l=!0});if(!d){if(c===1){await new Promise(u=>setTimeout(u)),o=3;continue}break}if(p=void 0,d.value&&i.push(d.value),d.done){l=!0;break}}l&&!("content-length"in r)&&(r["content-length"]=i.reduce((c,d)=>c+d.length,0))}t.writeHead(e.status,r),i.forEach(o=>{t.write(o)}),l?t.end():(i.length===0&&Cs(t),await Rs(n,t,p))}else r[Fr]||(t.writeHead(e.status,r),t.end());(a=t[$t])==null||a.call(t)},Vr=(e,t={})=>{const s=t.autoCleanupIncoming??!0;return t.overrideGlobalObjects!==!1&&global.Request!==Ye&&(Object.defineProperty(global,"Request",{value:Ye}),Object.defineProperty(global,"Response",{value:je})),async(r,a)=>{let n,i;try{i=qr(r,t.hostname);let l=!s||r.method==="GET"||r.method==="HEAD";if(l||(r[ks]=!0,r.on("end",()=>{l=!0}),r instanceof ze&&(a[$t]=()=>{l||setTimeout(()=>{l||setTimeout(()=>{kt(r)})})}),a.on("finish",()=>{l||kt(r)})),a.on("close",()=>{i[ee]&&(r.errored?i[ee].abort(r.errored.toString()):a.writableFinished||i[ee].abort("Client connection prematurely closed.")),l||setTimeout(()=>{l||setTimeout(()=>{kt(r)})})}),n=e(i,{incoming:r,outgoing:a}),me in n)return Os(n,a)}catch(l){if(n)return Ot(l,a);if(t.errorHandler){if(n=await t.errorHandler(i?l:Ir(l)),!n)return}else i?n=As(l):n=Gr()}try{return await Kr(n,a,t)}catch(l){return Ot(l,a)}}},Jr=e=>Vr(e.fetch);const Tt=new Pt,Qr=Object.assign({"/src/index.tsx":V});let Ts=!1;for(const[,e]of Object.entries(Qr))e&&(Tt.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Tt.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Ts=!0);if(!Ts)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");const aa=Jr(Tt);export{aa as default};
