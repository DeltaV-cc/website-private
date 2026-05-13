(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const Rf=`#webgl{position:absolute;margin:0;padding:0;width:100%;height:100%;top:0;left:0;overflow:hidden;overscroll-behavior-y:none;overscroll-behavior-x:none;touch-action:none}#webgl canvas{position:absolute!important;top:0!important;left:0!important;width:100%!important;height:100%!important;background:transparent!important}
`;function Jn(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function du(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}/*!
 * GSAP 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var rn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Br={duration:.5,overwrite:!1,delay:0},Cl,Pt,pt,un=1e8,Je=1/un,Qo=Math.PI*2,Df=Qo/4,Lf=0,pu=Math.sqrt,Pf=Math.cos,Uf=Math.sin,yt=function(e){return typeof e=="string"},at=function(e){return typeof e=="function"},ii=function(e){return typeof e=="number"},Il=function(e){return typeof e>"u"},Fn=function(e){return typeof e=="object"},Wt=function(e){return e!==!1},yl=function(){return typeof window<"u"},Qs=function(e){return at(e)||yt(e)},gu=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ut=Array.isArray,Oo=/(?:-?\.?\d|\.)+/gi,mu=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Er=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ha=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,_u=/[+-]=-?[.\d]+/,Eu=/[^,'"\[\]\s]+/gi,Nf=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,tt,cn,Go,Sl,an={},_a={},vu,xu=function(e){return(_a=Ji(e,an))&&Kt},Ml=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ea=function(e,t){return!t&&console.warn(e)},Cu=function(e,t){return e&&(an[e]=t)&&_a&&(_a[e]=t)||an},xs=function(){return 0},Ff={suppressEvents:!0,isStart:!0,kill:!1},ha={suppressEvents:!0,kill:!1},Qf={suppressEvents:!0},wl={},Ei=[],ko={},Iu,$t={},za={},Ac=30,ua=[],Tl="",bl=function(e){var t=e[0],n,i;if(Fn(t)||at(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=ua.length;i--&&!ua[i].targetTest(t););n=ua[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Xu(e[i],n)))||e.splice(i,1);return e},Vi=function(e){return e._gsap||bl(An(e))[0]._gsap},yu=function(e,t,n){return(n=e[t])&&at(n)?e[t]():Il(n)&&e.getAttribute&&e.getAttribute(t)||n},qt=function(e,t){return(e=e.split(",")).forEach(t)||e},ct=function(e){return Math.round(e*1e5)/1e5||0},St=function(e){return Math.round(e*1e7)/1e7||0},yr=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},Of=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},va=function(){var e=Ei.length,t=Ei.slice(0),n,i;for(ko={},Ei.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Su=function(e,t,n,i){Ei.length&&!Pt&&va(),e.render(t,n,i||Pt&&t<0&&(e._initted||e._startAt)),Ei.length&&!Pt&&va()},Mu=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Eu).length<2?t:yt(e)?e.trim():e},wu=function(e){return e},dn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Gf=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Ji=function(e,t){for(var n in t)e[n]=t[n];return e},fc=function s(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Fn(t[n])?s(e[n]||(e[n]={}),t[n]):t[n]);return e},xa=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},ds=function(e){var t=e.parent||tt,n=e.keyframes?Gf(Ut(e.keyframes)):dn;if(Wt(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},kf=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Tu=function(e,t,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var a=e[i],o;if(r)for(o=t[r];a&&a[r]>o;)a=a._prev;return a?(t._next=a._next,a._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=a,t.parent=t._dp=e,t},Ra=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=t._prev,a=t._next;r?r._next=a:e[n]===t&&(e[n]=a),a?a._prev=r:e[i]===t&&(e[i]=r),t._next=t._prev=t.parent=null},Ci=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove(e),e._act=0},Wi=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Hf=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Ho=function(e,t,n,i){return e._startAt&&(Pt?e._startAt.revert(ha):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},zf=function s(e){return!e||e._ts&&s(e.parent)},dc=function(e){return e._repeat?Rr(e._tTime,e=e.duration()+e._rDelay)*e:0},Rr=function(e,t){var n=Math.floor(e/=t);return e&&n===e?n-1:n},Ca=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Da=function(e){return e._end=St(e._start+(e._tDur/Math.abs(e._ts||e._rts||Je)||0))},La=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=St(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Da(e),n._dirty||Wi(n,e)),e},bu=function(e,t){var n;if((t._time||t._initted&&!t._dur)&&(n=Ca(e.rawTime(),t),(!t._dur||Ds(0,t.totalDuration(),n)-t._tTime>Je)&&t.render(n,!0)),Wi(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Je}},Bn=function(e,t,n,i){return t.parent&&Ci(t),t._start=St((ii(n)?n:n||e!==tt?ln(e,n,t):e._time)+t._delay),t._end=St(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Tu(e,t,"_first","_last",e._sort?"_start":0),zo(t)||(e._recent=t),i||bu(e,t),e._ts<0&&La(e,e._tTime),e},Bu=function(e,t){return(an.ScrollTrigger||Ml("scrollTrigger",t))&&an.ScrollTrigger.create(t,e)},Ru=function(e,t,n,i,r){if(Rl(e,t,r),!e._initted)return 1;if(!n&&e._pt&&!Pt&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Iu!==en.frame)return Ei.push(e),e._lazy=[r,i],1},Vf=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},zo=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},Wf=function(e,t,n,i){var r=e.ratio,a=t<0||!t&&(!e._start&&Vf(e)&&!(!e._initted&&zo(e))||(e._ts<0||e._dp._ts<0)&&!zo(e))?0:1,o=e._rDelay,l=0,c,h,A;if(o&&e._repeat&&(l=Ds(0,e._tDur,t),h=Rr(l,o),e._yoyo&&h&1&&(a=1-a),h!==Rr(e._tTime,o)&&(r=1-a,e.vars.repeatRefresh&&e._initted&&e.invalidate())),a!==r||Pt||i||e._zTime===Je||!t&&e._zTime){if(!e._initted&&Ru(e,t,i,n,l))return;for(A=e._zTime,e._zTime=t||(n?Je:0),n||(n=t&&!A),e.ratio=a,e._from&&(a=1-a),e._time=0,e._tTime=l,c=e._pt;c;)c.r(a,c.d),c=c._next;t<0&&Ho(e,t,n,!0),e._onUpdate&&!n&&fn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&fn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===a&&(a&&Ci(e,1),!n&&!Pt&&(fn(e,a?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},qf=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Dr=function(e,t,n,i){var r=e._repeat,a=St(t)||0,o=e._tTime/e._tDur;return o&&!i&&(e._time*=a/e._dur),e._dur=a,e._tDur=r?r<0?1e10:St(a*(r+1)+e._rDelay*r):a,o>0&&!i&&La(e,e._tTime=e._tDur*o),e.parent&&Da(e),n||Wi(e.parent,e),e},pc=function(e){return e instanceof zt?Wi(e):Dr(e,e._dur)},Xf={_start:0,endTime:xs,totalDuration:xs},ln=function s(e,t,n){var i=e.labels,r=e._recent||Xf,a=e.duration()>=un?r.endTime(!1):e._dur,o,l,c;return yt(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",o=t.indexOf("="),l==="<"||l===">"?(o>=0&&(t=t.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(o<0?r:n).totalDuration()/100:1)):o<0?(t in i||(i[t]=a),i[t]):(l=parseFloat(t.charAt(o-1)+t.substr(o+1)),c&&n&&(l=l/100*(Ut(n)?n[0]:n).totalDuration()),o>1?s(e,t.substr(0,o-1),n)+l:a+l)):t==null?a:+t},ps=function(e,t,n){var i=ii(t[1]),r=(i?2:1)+(e<2?0:1),a=t[r],o,l;if(i&&(a.duration=t[1]),a.parent=n,e){for(o=a,l=n;l&&!("immediateRender"in o);)o=l.vars.defaults||{},l=Wt(l.vars.inherit)&&l.parent;a.immediateRender=Wt(o.immediateRender),e<2?a.runBackwards=1:a.startAt=t[r-1]}return new gt(t[0],a,t[r+1])},Si=function(e,t){return e||e===0?t(e):t},Ds=function(e,t,n){return n<e?e:n>t?t:n},Dt=function(e,t){return!yt(e)||!(t=Nf.exec(e))?"":t[1]},Yf=function(e,t,n){return Si(n,function(i){return Ds(e,t,i)})},Vo=[].slice,Du=function(e,t){return e&&Fn(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Fn(e[0]))&&!e.nodeType&&e!==cn},Kf=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var r;return yt(i)&&!t||Du(i,1)?(r=n).push.apply(r,An(i)):n.push(i)})||n},An=function(e,t,n){return pt&&!t&&pt.selector?pt.selector(e):yt(e)&&!n&&(Go||!Lr())?Vo.call((t||Sl).querySelectorAll(e),0):Ut(e)?Kf(e,n):Du(e)?Vo.call(e,0):e?[e]:[]},Wo=function(e){return e=An(e)[0]||Ea("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return An(t,n.querySelectorAll?n:n===e?Ea("Invalid scope")||Sl.createElement("div"):e)}},Lu=function(e){return e.sort(function(){return .5-Math.random()})},Pu=function(e){if(at(e))return e;var t=Fn(e)?e:{each:e},n=qi(t.ease),i=t.from||0,r=parseFloat(t.base)||0,a={},o=i>0&&i<1,l=isNaN(i)||o,c=t.axis,h=i,A=i;return yt(i)?h=A={center:.5,edges:.5,end:1}[i]||0:!o&&l&&(h=i[0],A=i[1]),function(u,f,m){var p=(m||t).length,d=a[p],g,x,_,E,C,y,w,b,v;if(!d){if(v=t.grid==="auto"?0:(t.grid||[1,un])[1],!v){for(w=-un;w<(w=m[v++].getBoundingClientRect().left)&&v<p;);v--}for(d=a[p]=[],g=l?Math.min(v,p)*h-.5:i%v,x=v===un?0:l?p*A/v-.5:i/v|0,w=0,b=un,y=0;y<p;y++)_=y%v-g,E=x-(y/v|0),d[y]=C=c?Math.abs(c==="y"?E:_):pu(_*_+E*E),C>w&&(w=C),C<b&&(b=C);i==="random"&&Lu(d),d.max=w-b,d.min=b,d.v=p=(parseFloat(t.amount)||parseFloat(t.each)*(v>p?p-1:c?c==="y"?p/v:v:Math.max(v,p/v))||0)*(i==="edges"?-1:1),d.b=p<0?r-p:r,d.u=Dt(t.amount||t.each)||0,n=n&&p<0?Vu(n):n}return p=(d[u]-d.min)/d.max||0,St(d.b+(n?n(p):p)*d.v)+d.u}},qo=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=St(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(ii(n)?0:Dt(n))}},Uu=function(e,t){var n=Ut(e),i,r;return!n&&Fn(e)&&(i=n=e.radius||un,e.values?(e=An(e.values),(r=!ii(e[0]))&&(i*=i)):e=qo(e.increment)),Si(t,n?at(e)?function(a){return r=e(a),Math.abs(r-a)<=i?r:a}:function(a){for(var o=parseFloat(r?a.x:a),l=parseFloat(r?a.y:0),c=un,h=0,A=e.length,u,f;A--;)r?(u=e[A].x-o,f=e[A].y-l,u=u*u+f*f):u=Math.abs(e[A]-o),u<c&&(c=u,h=A);return h=!i||c<=i?e[h]:a,r||h===a||ii(a)?h:h+Dt(a)}:qo(e))},Nu=function(e,t,n,i){return Si(Ut(e)?!t:n===!0?!!(n=0):!i,function(){return Ut(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},Jf=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(r,a){return a(r)},i)}},jf=function(e,t){return function(n){return e(parseFloat(n))+(t||Dt(n))}},Zf=function(e,t,n){return Qu(e,t,0,1,n)},Fu=function(e,t,n){return Si(n,function(i){return e[~~t(i)]})},$f=function s(e,t,n){var i=t-e;return Ut(e)?Fu(e,s(0,e.length),t):Si(n,function(r){return(i+(r-e)%i)%i+e})},ed=function s(e,t,n){var i=t-e,r=i*2;return Ut(e)?Fu(e,s(0,e.length-1),t):Si(n,function(a){return a=(r+(a-e)%r)%r||0,e+(a>i?r-a:a)})},Cs=function(e){for(var t=0,n="",i,r,a,o;~(i=e.indexOf("random(",t));)a=e.indexOf(")",i),o=e.charAt(i+7)==="[",r=e.substr(i+7,a-i-7).match(o?Eu:Oo),n+=e.substr(t,i-t)+Nu(o?r:+r[0],o?0:+r[1],+r[2]||1e-5),t=a+1;return n+e.substr(t,e.length-t)},Qu=function(e,t,n,i,r){var a=t-e,o=i-n;return Si(r,function(l){return n+((l-e)/a*o||0)})},td=function s(e,t,n,i){var r=isNaN(e+t)?0:function(f){return(1-f)*e+f*t};if(!r){var a=yt(e),o={},l,c,h,A,u;if(n===!0&&(i=1)&&(n=null),a)e={p:e},t={p:t};else if(Ut(e)&&!Ut(t)){for(h=[],A=e.length,u=A-2,c=1;c<A;c++)h.push(s(e[c-1],e[c]));A--,r=function(m){m*=A;var p=Math.min(u,~~m);return h[p](m-p)},n=t}else i||(e=Ji(Ut(e)?[]:{},e));if(!h){for(l in t)Bl.call(o,e,l,"get",t[l]);r=function(m){return Pl(m,o)||(a?e.p:e)}}}return Si(n,r)},gc=function(e,t,n){var i=e.labels,r=un,a,o,l;for(a in i)o=i[a]-t,o<0==!!n&&o&&r>(o=Math.abs(o))&&(l=a,r=o);return l},fn=function(e,t,n){var i=e.vars,r=i[t],a=pt,o=e._ctx,l,c,h;if(r)return l=i[t+"Params"],c=i.callbackScope||e,n&&Ei.length&&va(),o&&(pt=o),h=l?r.apply(c,l):r.call(c),pt=a,h},cs=function(e){return Ci(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Pt),e.progress()<1&&fn(e,"onInterrupt"),e},vr,Ou=[],Gu=function(e){if(!yl()){Ou.push(e);return}e=!e.name&&e.default||e;var t=e.name,n=at(e),i=t&&!n&&e.init?function(){this._props=[]}:e,r={init:xs,render:Pl,add:Bl,kill:md,modifier:gd,rawVars:0},a={targetTest:0,get:0,getSetter:Ll,aliases:{},register:0};if(Lr(),e!==i){if($t[t])return;dn(i,dn(xa(e,r),a)),Ji(i.prototype,Ji(r,xa(e,a))),$t[i.prop=t]=i,e.targetTest&&(ua.push(i),wl[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Cu(t,i),e.register&&e.register(Kt,i,Xt)},Ye=255,hs={aqua:[0,Ye,Ye],lime:[0,Ye,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ye],navy:[0,0,128],white:[Ye,Ye,Ye],olive:[128,128,0],yellow:[Ye,Ye,0],orange:[Ye,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ye,0,0],pink:[Ye,192,203],cyan:[0,Ye,Ye],transparent:[Ye,Ye,Ye,0]},Va=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Ye+.5|0},ku=function(e,t,n){var i=e?ii(e)?[e>>16,e>>8&Ye,e&Ye]:0:hs.black,r,a,o,l,c,h,A,u,f,m;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),hs[e])i=hs[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),a=e.charAt(2),o=e.charAt(3),e="#"+r+r+a+a+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Ye,i&Ye,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Ye,e&Ye]}else if(e.substr(0,3)==="hsl"){if(i=m=e.match(Oo),!t)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,a=h<=.5?h*(c+1):h+c-h*c,r=h*2-a,i.length>3&&(i[3]*=1),i[0]=Va(l+1/3,r,a),i[1]=Va(l,r,a),i[2]=Va(l-1/3,r,a);else if(~e.indexOf("="))return i=e.match(mu),n&&i.length<4&&(i[3]=1),i}else i=e.match(Oo)||hs.transparent;i=i.map(Number)}return t&&!m&&(r=i[0]/Ye,a=i[1]/Ye,o=i[2]/Ye,A=Math.max(r,a,o),u=Math.min(r,a,o),h=(A+u)/2,A===u?l=c=0:(f=A-u,c=h>.5?f/(2-A-u):f/(A+u),l=A===r?(a-o)/f+(a<o?6:0):A===a?(o-r)/f+2:(r-a)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Hu=function(e){var t=[],n=[],i=-1;return e.split(vi).forEach(function(r){var a=r.match(Er)||[];t.push.apply(t,a),n.push(i+=a.length+1)}),t.c=n,t},mc=function(e,t,n){var i="",r=(e+i).match(vi),a=t?"hsla(":"rgba(",o=0,l,c,h,A;if(!r)return e;if(r=r.map(function(u){return(u=ku(u,t,1))&&a+(t?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=Hu(e),l=n.c,l.join(i)!==h.c.join(i)))for(c=e.replace(vi,"1").split(Er),A=c.length-1;o<A;o++)i+=c[o]+(~l.indexOf(o)?r.shift()||a+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=e.split(vi),A=c.length-1;o<A;o++)i+=c[o]+r[o];return i+c[A]},vi=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in hs)s+="|"+e+"\\b";return new RegExp(s+")","gi")}(),nd=/hsl[a]?\(/,zu=function(e){var t=e.join(" "),n;if(vi.lastIndex=0,vi.test(t))return n=nd.test(t),e[1]=mc(e[1],n),e[0]=mc(e[0],n,Hu(e[1])),!0},Is,en=function(){var s=Date.now,e=500,t=33,n=s(),i=n,r=1e3/240,a=r,o=[],l,c,h,A,u,f,m=function p(d){var g=s()-i,x=d===!0,_,E,C,y;if(g>e&&(n+=g-t),i+=g,C=i-n,_=C-a,(_>0||x)&&(y=++A.frame,u=C-A.time*1e3,A.time=C=C/1e3,a+=_+(_>=r?4:r-_),E=1),x||(l=c(p)),E)for(f=0;f<o.length;f++)o[f](C,u,y,d)};return A={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(d){return u/(1e3/(d||60))},wake:function(){vu&&(!Go&&yl()&&(cn=Go=window,Sl=cn.document||{},an.gsap=Kt,(cn.gsapVersions||(cn.gsapVersions=[])).push(Kt.version),xu(_a||cn.GreenSockGlobals||!cn.gsap&&cn||{}),h=cn.requestAnimationFrame,Ou.forEach(Gu)),l&&A.sleep(),c=h||function(d){return setTimeout(d,a-A.time*1e3+1|0)},Is=1,m(2))},sleep:function(){(h?cn.cancelAnimationFrame:clearTimeout)(l),Is=0,c=xs},lagSmoothing:function(d,g){e=d||1/0,t=Math.min(g||33,e)},fps:function(d){r=1e3/(d||240),a=A.time*1e3+r},add:function(d,g,x){var _=g?function(E,C,y,w){d(E,C,y,w),A.remove(_)}:d;return A.remove(d),o[x?"unshift":"push"](_),Lr(),_},remove:function(d,g){~(g=o.indexOf(d))&&o.splice(g,1)&&f>=g&&f--},_listeners:o},A}(),Lr=function(){return!Is&&en.wake()},ke={},id=/^[\d.\-M][\d.\-,\s]/,rd=/["']/g,sd=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],r=1,a=n.length,o,l,c;r<a;r++)l=n[r],o=r!==a-1?l.lastIndexOf(","):l.length,c=l.substr(0,o),t[i]=isNaN(c)?c.replace(rd,"").trim():+c,i=l.substr(o+1).trim();return t},ad=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},od=function(e){var t=(e+"").split("("),n=ke[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[sd(t[1])]:ad(e).split(",").map(Mu)):ke._CE&&id.test(e)?ke._CE("",e):n},Vu=function(e){return function(t){return 1-e(1-t)}},Wu=function s(e,t){for(var n=e._first,i;n;)n instanceof zt?s(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?s(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},qi=function(e,t){return e&&(at(e)?e:ke[e]||od(e))||t},Zi=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var r={easeIn:t,easeOut:n,easeInOut:i},a;return qt(e,function(o){ke[o]=an[o]=r,ke[a=o.toLowerCase()]=n;for(var l in r)ke[a+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=ke[o+"."+l]=r[l]}),r},qu=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Wa=function s(e,t,n){var i=t>=1?t:1,r=(n||(e?.3:.45))/(t<1?t:1),a=r/Qo*(Math.asin(1/i)||0),o=function(h){return h===1?1:i*Math.pow(2,-10*h)*Uf((h-a)*r)+1},l=e==="out"?o:e==="in"?function(c){return 1-o(1-c)}:qu(o);return r=Qo/r,l.config=function(c,h){return s(e,c,h)},l},qa=function s(e,t){t===void 0&&(t=1.70158);var n=function(a){return a?--a*a*((t+1)*a+t)+1:0},i=e==="out"?n:e==="in"?function(r){return 1-n(1-r)}:qu(n);return i.config=function(r){return s(e,r)},i};qt("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;Zi(s+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});ke.Linear.easeNone=ke.none=ke.Linear.easeIn;Zi("Elastic",Wa("in"),Wa("out"),Wa());(function(s,e){var t=1/e,n=2*t,i=2.5*t,r=function(o){return o<t?s*o*o:o<n?s*Math.pow(o-1.5/e,2)+.75:o<i?s*(o-=2.25/e)*o+.9375:s*Math.pow(o-2.625/e,2)+.984375};Zi("Bounce",function(a){return 1-r(1-a)},r)})(7.5625,2.75);Zi("Expo",function(s){return s?Math.pow(2,10*(s-1)):0});Zi("Circ",function(s){return-(pu(1-s*s)-1)});Zi("Sine",function(s){return s===1?1:-Pf(s*Df)+1});Zi("Back",qa("in"),qa("out"),qa());ke.SteppedEase=ke.steps=an.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),r=t?1:0,a=1-Je;return function(o){return((i*Ds(0,a,o)|0)+r)*n}}};Br.ease=ke["quad.out"];qt("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Tl+=s+","+s+"Params,"});var Xu=function(e,t){this.id=Lf++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:yu,this.set=t?t.getSetter:Ll},Pr=function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Dr(this,+t.duration,1,1),this.data=t.data,pt&&(this._ctx=pt,pt.data.push(this)),Is||en.wake()}var e=s.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Dr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Lr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(La(this,n),!r._dp||r.parent||bu(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Bn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Je||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Su(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+dc(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+dc(this),i):this.duration()?Math.min(1,this._time/this._dur):this.ratio},e.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?Rr(this._tTime,r)+1:1},e.timeScale=function(n){if(!arguments.length)return this._rts===-Je?0:this._rts;if(this._rts===n)return this;var i=this.parent&&this._ts?Ca(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Je?0:this._rts,this.totalTime(Ds(-Math.abs(this._delay),this._tDur,i),!0),Da(this),Hf(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Lr(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Je&&(this._tTime-=Je)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Bn(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Wt(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ca(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=Qf);var i=Pt;return Pt=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Pt=i,this},e.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(i._ts||1),i=i._dp;return!this.parent&&this._sat?this._sat.vars.immediateRender?-1:this._sat.globalTime(n):r},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,pc(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,pc(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ln(this,n),Wt(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Wt(i))},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Je:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Je,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-Je)},e.eventCallback=function(n,i,r){var a=this.vars;return arguments.length>1?(i?(a[n]=i,r&&(a[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete a[n],this):a[n]},e.then=function(n){var i=this;return new Promise(function(r){var a=at(n)?n:wu,o=function(){var c=i.then;i.then=null,at(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=c),r(a),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?o():i._prom=o})},e.kill=function(){cs(this)},s}();dn(Pr.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Je,_prom:0,_ps:!1,_rts:1});var zt=function(s){du(e,s);function e(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=Wt(n.sortChildren),tt&&Bn(n.parent||tt,Jn(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&Bu(Jn(r),n.scrollTrigger),r}var t=e.prototype;return t.to=function(i,r,a){return ps(0,arguments,this),this},t.from=function(i,r,a){return ps(1,arguments,this),this},t.fromTo=function(i,r,a,o){return ps(2,arguments,this),this},t.set=function(i,r,a){return r.duration=0,r.parent=this,ds(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new gt(i,r,ln(this,a),1),this},t.call=function(i,r,a){return Bn(this,gt.delayedCall(0,i,r),a)},t.staggerTo=function(i,r,a,o,l,c,h){return a.duration=r,a.stagger=a.stagger||o,a.onComplete=c,a.onCompleteParams=h,a.parent=this,new gt(i,a,ln(this,l)),this},t.staggerFrom=function(i,r,a,o,l,c,h){return a.runBackwards=1,ds(a).immediateRender=Wt(a.immediateRender),this.staggerTo(i,r,a,o,l,c,h)},t.staggerFromTo=function(i,r,a,o,l,c,h,A){return o.startAt=a,ds(o).immediateRender=Wt(o.immediateRender),this.staggerTo(i,r,o,l,c,h,A)},t.render=function(i,r,a){var o=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:St(i),A=this._zTime<0!=i<0&&(this._initted||!c),u,f,m,p,d,g,x,_,E,C,y,w;if(this!==tt&&h>l&&i>=0&&(h=l),h!==this._tTime||a||A){if(o!==this._time&&c&&(h+=this._time-o,i+=this._time-o),u=h,E=this._start,_=this._ts,g=!_,A&&(c||(o=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(y=this._yoyo,d=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(d*100+i,r,a);if(u=St(h%d),h===l?(p=this._repeat,u=c):(p=~~(h/d),p&&p===h/d&&(u=c,p--),u>c&&(u=c)),C=Rr(this._tTime,d),!o&&this._tTime&&C!==p&&this._tTime-C*d-this._dur<=0&&(C=p),y&&p&1&&(u=c-u,w=1),p!==C&&!this._lock){var b=y&&C&1,v=b===(y&&p&1);if(p<C&&(b=!b),o=b?0:c,this._lock=1,this.render(o||(w?0:St(p*d)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&fn(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1),o&&o!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,v&&(this._lock=2,o=b?c:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!g)return this;Wu(this,w)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(x=qf(this,St(o),St(u)),x&&(h-=u-(u=x._start))),this._tTime=h,this._time=u,this._act=!_,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,o=0),!o&&u&&!r&&!p&&(fn(this,"onStart"),this._tTime!==h))return this;if(u>=o&&i>=0)for(f=this._first;f;){if(m=f._next,(f._act||u>=f._start)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,r,a);if(f.render(f._ts>0?(u-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(u-f._start)*f._ts,r,a),u!==this._time||!this._ts&&!g){x=0,m&&(h+=this._zTime=-Je);break}}f=m}else{f=this._last;for(var M=i<0?i:u;f;){if(m=f._prev,(f._act||M<=f._end)&&f._ts&&x!==f){if(f.parent!==this)return this.render(i,r,a);if(f.render(f._ts>0?(M-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(M-f._start)*f._ts,r,a||Pt&&(f._initted||f._startAt)),u!==this._time||!this._ts&&!g){x=0,m&&(h+=this._zTime=M?-Je:Je);break}}f=m}}if(x&&!r&&(this.pause(),x.render(u>=o?0:-Je)._zTime=u>=o?1:-1,this._ts))return this._start=E,Da(this),this.render(i,r,a);this._onUpdate&&!r&&fn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&o)&&(E===this._start||Math.abs(_)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ci(this,1),!r&&!(i<0&&!o)&&(h||o||!l)&&(fn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,r){var a=this;if(ii(r)||(r=ln(this,r,i)),!(i instanceof Pr)){if(Ut(i))return i.forEach(function(o){return a.add(o,r)}),this;if(yt(i))return this.addLabel(i,r);if(at(i))i=gt.delayedCall(0,i);else return this}return this!==i?Bn(this,i,r):this},t.getChildren=function(i,r,a,o){i===void 0&&(i=!0),r===void 0&&(r=!0),a===void 0&&(a=!0),o===void 0&&(o=-un);for(var l=[],c=this._first;c;)c._start>=o&&(c instanceof gt?r&&l.push(c):(a&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,a)))),c=c._next;return l},t.getById=function(i){for(var r=this.getChildren(1,1,1),a=r.length;a--;)if(r[a].vars.id===i)return r[a]},t.remove=function(i){return yt(i)?this.removeLabel(i):at(i)?this.killTweensOf(i):(Ra(this,i),i===this._recent&&(this._recent=this._last),Wi(this))},t.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=St(en.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},t.addLabel=function(i,r){return this.labels[i]=ln(this,r),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,r,a){var o=gt.delayedCall(0,r||xs,a);return o.data="isPause",this._hasPause=1,Bn(this,o,ln(this,i))},t.removePause=function(i){var r=this._first;for(i=ln(this,i);r;)r._start===i&&r.data==="isPause"&&Ci(r),r=r._next},t.killTweensOf=function(i,r,a){for(var o=this.getTweensOf(i,a),l=o.length;l--;)di!==o[l]&&o[l].kill(i,r);return this},t.getTweensOf=function(i,r){for(var a=[],o=An(i),l=this._first,c=ii(r),h;l;)l instanceof gt?Of(l._targets,o)&&(c?(!di||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&a.push(l):(h=l.getTweensOf(o,r)).length&&a.push.apply(a,h),l=l._next;return a},t.tweenTo=function(i,r){r=r||{};var a=this,o=ln(a,i),l=r,c=l.startAt,h=l.onStart,A=l.onStartParams,u=l.immediateRender,f,m=gt.to(a,dn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale())||Je,onStart:function(){if(a.pause(),!f){var d=r.duration||Math.abs((o-(c&&"time"in c?c.time:a._time))/a.timeScale());m._dur!==d&&Dr(m,d,0,1).render(m._time,!0,!0),f=1}h&&h.apply(m,A||[])}},r));return u?m.render(0):m},t.tweenFromTo=function(i,r,a){return this.tweenTo(r,dn({startAt:{time:ln(this,i)}},a))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),gc(this,ln(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),gc(this,ln(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Je)},t.shiftChildren=function(i,r,a){a===void 0&&(a=0);for(var o=this._first,l=this.labels,c;o;)o._start>=a&&(o._start+=i,o._end+=i),o=o._next;if(r)for(c in l)l[c]>=a&&(l[c]+=i);return Wi(this)},t.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,a;r;)a=r._next,this.remove(r),r=a;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Wi(this)},t.totalDuration=function(i){var r=0,a=this,o=a._last,l=un,c,h,A;if(arguments.length)return a.timeScale((a._repeat<0?a.duration():a.totalDuration())/(a.reversed()?-i:i));if(a._dirty){for(A=a.parent;o;)c=o._prev,o._dirty&&o.totalDuration(),h=o._start,h>l&&a._sort&&o._ts&&!a._lock?(a._lock=1,Bn(a,o,h-o._delay,1)._lock=0):l=h,h<0&&o._ts&&(r-=h,(!A&&!a._dp||A&&A.smoothChildTiming)&&(a._start+=h/a._ts,a._time-=h,a._tTime-=h),a.shiftChildren(-h,!1,-1/0),l=0),o._end>r&&o._ts&&(r=o._end),o=c;Dr(a,a===tt&&a._time>r?a._time:r,1,1),a._dirty=0}return a._tDur},e.updateRoot=function(i){if(tt._ts&&(Su(tt,Ca(i,tt)),Iu=en.frame),en.frame>=Ac){Ac+=rn.autoSleep||120;var r=tt._first;if((!r||!r._ts)&&rn.autoSleep&&en._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||en.sleep()}}},e}(Pr);dn(zt.prototype,{_lock:0,_hasPause:0,_forcing:0});var ld=function(e,t,n,i,r,a,o){var l=new Xt(this._pt,e,t,0,1,$u,null,r),c=0,h=0,A,u,f,m,p,d,g,x;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=Cs(i)),a&&(x=[n,i],a(x,e,t),n=x[0],i=x[1]),u=n.match(Ha)||[];A=Ha.exec(i);)m=A[0],p=i.substring(c,A.index),f?f=(f+1)%5:p.substr(-5)==="rgba("&&(f=1),m!==u[h++]&&(d=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:p||h===1?p:",",s:d,c:m.charAt(1)==="="?yr(d,m)-d:parseFloat(m)-d,m:f&&f<4?Math.round:0},c=Ha.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=o,(_u.test(i)||g)&&(l.e=0),this._pt=l,l},Bl=function(e,t,n,i,r,a,o,l,c,h){at(i)&&(i=i(r||0,e,a));var A=e[t],u=n!=="get"?n:at(A)?c?e[t.indexOf("set")||!at(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():A,f=at(A)?c?fd:ju:Dl,m;if(yt(i)&&(~i.indexOf("random(")&&(i=Cs(i)),i.charAt(1)==="="&&(m=yr(u,i)+(Dt(u)||0),(m||m===0)&&(i=m))),!h||u!==i||Xo)return!isNaN(u*i)&&i!==""?(m=new Xt(this._pt,e,t,+u||0,i-(u||0),typeof A=="boolean"?pd:Zu,0,f),c&&(m.fp=c),o&&m.modifier(o,this,e),this._pt=m):(!A&&!(t in e)&&Ml(t,i),ld.call(this,e,t,u,i,f,l||rn.stringFilter,c))},cd=function(e,t,n,i,r){if(at(e)&&(e=gs(e,r,t,n,i)),!Fn(e)||e.style&&e.nodeType||Ut(e)||gu(e))return yt(e)?gs(e,r,t,n,i):e;var a={},o;for(o in e)a[o]=gs(e[o],r,t,n,i);return a},Yu=function(e,t,n,i,r,a){var o,l,c,h;if($t[e]&&(o=new $t[e]).init(r,o.rawVars?t[e]:cd(t[e],i,r,a,n),n,i,a)!==!1&&(n._pt=l=new Xt(n._pt,r,e,0,1,o.render,o,0,o.priority),n!==vr))for(c=n._ptLookup[n._targets.indexOf(r)],h=o._props.length;h--;)c[o._props[h]]=l;return o},di,Xo,Rl=function s(e,t,n){var i=e.vars,r=i.ease,a=i.startAt,o=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.onUpdateParams,A=i.callbackScope,u=i.runBackwards,f=i.yoyoEase,m=i.keyframes,p=i.autoRevert,d=e._dur,g=e._startAt,x=e._targets,_=e.parent,E=_&&_.data==="nested"?_.vars.targets:x,C=e._overwrite==="auto"&&!Cl,y=e.timeline,w,b,v,M,H,X,L,U,N,W,Q,z,Z;if(y&&(!m||!r)&&(r="none"),e._ease=qi(r,Br.ease),e._yEase=f?Vu(qi(f===!0?r:f,Br.ease)):0,f&&e._yoyo&&!e._repeat&&(f=e._yEase,e._yEase=e._ease,e._ease=f),e._from=!y&&!!i.runBackwards,!y||m&&!i.stagger){if(U=x[0]?Vi(x[0]).harness:0,z=U&&i[U.prop],w=xa(i,wl),g&&(g._zTime<0&&g.progress(1),t<0&&u&&o&&!p?g.render(-1,!0):g.revert(u&&d?ha:Ff),g._lazy=0),a){if(Ci(e._startAt=gt.set(x,dn({data:"isStart",overwrite:!1,parent:_,immediateRender:!0,lazy:!g&&Wt(l),startAt:null,delay:0,onUpdate:c,onUpdateParams:h,callbackScope:A,stagger:0},a))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Pt||!o&&!p)&&e._startAt.revert(ha),o&&d&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&d&&!g){if(t&&(o=!1),v=dn({overwrite:!1,data:"isFromStart",lazy:o&&!g&&Wt(l),immediateRender:o,stagger:0,parent:_},w),z&&(v[U.prop]=z),Ci(e._startAt=gt.set(x,v)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Pt?e._startAt.revert(ha):e._startAt.render(-1,!0)),e._zTime=t,!o)s(e._startAt,Je,Je);else if(!t)return}for(e._pt=e._ptCache=0,l=d&&Wt(l)||l&&!d,b=0;b<x.length;b++){if(H=x[b],L=H._gsap||bl(x)[b]._gsap,e._ptLookup[b]=W={},ko[L.id]&&Ei.length&&va(),Q=E===x?b:E.indexOf(H),U&&(N=new U).init(H,z||w,e,Q,E)!==!1&&(e._pt=M=new Xt(e._pt,H,N.name,0,1,N.render,N,0,N.priority),N._props.forEach(function(J){W[J]=M}),N.priority&&(X=1)),!U||z)for(v in w)$t[v]&&(N=Yu(v,w,e,Q,H,E))?N.priority&&(X=1):W[v]=M=Bl.call(e,H,v,"get",w[v],Q,E,0,i.stringFilter);e._op&&e._op[b]&&e.kill(H,e._op[b]),C&&e._pt&&(di=e,tt.killTweensOf(H,W,e.globalTime(t)),Z=!e.parent,di=0),e._pt&&l&&(ko[L.id]=1)}X&&eA(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!Z,m&&t<=0&&y.render(un,!0,!0)},hd=function(e,t,n,i,r,a,o){var l=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,h,A,u;if(!l)for(l=e._ptCache[t]=[],A=e._ptLookup,u=e._targets.length;u--;){if(c=A[u][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return Xo=1,e.vars[t]="+=0",Rl(e,o),Xo=0,1;l.push(c)}for(u=l.length;u--;)h=l[u],c=h._pt||h,c.s=(i||i===0)&&!r?i:c.s+(i||0)+a*c.c,c.c=n-c.s,h.e&&(h.e=ct(n)+Dt(h.e)),h.b&&(h.b=c.s+Dt(h.b))},ud=function(e,t){var n=e[0]?Vi(e[0]).harness:0,i=n&&n.aliases,r,a,o,l;if(!i)return t;r=Ji({},t);for(a in i)if(a in r)for(l=i[a].split(","),o=l.length;o--;)r[l[o]]=r[a];return r},Ad=function(e,t,n,i){var r=t.ease||i||"power1.inOut",a,o;if(Ut(t))o=n[e]||(n[e]=[]),t.forEach(function(l,c){return o.push({t:c/(t.length-1)*100,v:l,e:r})});else for(a in t)o=n[a]||(n[a]=[]),a==="ease"||o.push({t:parseFloat(e),v:t[a],e:r})},gs=function(e,t,n,i,r){return at(e)?e.call(t,n,i,r):yt(e)&&~e.indexOf("random(")?Cs(e):e},Ku=Tl+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Ju={};qt(Ku+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return Ju[s]=1});var gt=function(s){du(e,s);function e(n,i,r,a){var o;typeof i=="number"&&(r.duration=i,i=r,r=null),o=s.call(this,a?i:ds(i))||this;var l=o.vars,c=l.duration,h=l.delay,A=l.immediateRender,u=l.stagger,f=l.overwrite,m=l.keyframes,p=l.defaults,d=l.scrollTrigger,g=l.yoyoEase,x=i.parent||tt,_=(Ut(n)||gu(n)?ii(n[0]):"length"in i)?[n]:An(n),E,C,y,w,b,v,M,H;if(o._targets=_.length?bl(_):Ea("GSAP target "+n+" not found. https://greensock.com",!rn.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=f,m||u||Qs(c)||Qs(h)){if(i=o.vars,E=o.timeline=new zt({data:"nested",defaults:p||{},targets:x&&x.data==="nested"?x.vars.targets:_}),E.kill(),E.parent=E._dp=Jn(o),E._start=0,u||Qs(c)||Qs(h)){if(w=_.length,M=u&&Pu(u),Fn(u))for(b in u)~Ku.indexOf(b)&&(H||(H={}),H[b]=u[b]);for(C=0;C<w;C++)y=xa(i,Ju),y.stagger=0,g&&(y.yoyoEase=g),H&&Ji(y,H),v=_[C],y.duration=+gs(c,Jn(o),C,v,_),y.delay=(+gs(h,Jn(o),C,v,_)||0)-o._delay,!u&&w===1&&y.delay&&(o._delay=h=y.delay,o._start+=h,y.delay=0),E.to(v,y,M?M(C,v,_):0),E._ease=ke.none;E.duration()?c=h=0:o.timeline=0}else if(m){ds(dn(E.vars.defaults,{ease:"none"})),E._ease=qi(m.ease||i.ease||"none");var X=0,L,U,N;if(Ut(m))m.forEach(function(W){return E.to(_,W,">")}),E.duration();else{y={};for(b in m)b==="ease"||b==="easeEach"||Ad(b,m[b],y,m.easeEach);for(b in y)for(L=y[b].sort(function(W,Q){return W.t-Q.t}),X=0,C=0;C<L.length;C++)U=L[C],N={ease:U.e,duration:(U.t-(C?L[C-1].t:0))/100*c},N[b]=U.v,E.to(_,N,X),X+=N.duration;E.duration()<c&&E.to({},{duration:c-E.duration()})}}c||o.duration(c=E.duration())}else o.timeline=0;return f===!0&&!Cl&&(di=Jn(o),tt.killTweensOf(_),di=0),Bn(x,Jn(o),r),i.reversed&&o.reverse(),i.paused&&o.paused(!0),(A||!c&&!m&&o._start===St(x._time)&&Wt(A)&&zf(Jn(o))&&x.data!=="nested")&&(o._tTime=-Je,o.render(Math.max(0,-h)||0)),d&&Bu(Jn(o),d),o}var t=e.prototype;return t.render=function(i,r,a){var o=this._time,l=this._tDur,c=this._dur,h=i<0,A=i>l-Je&&!h?l:i<Je?0:i,u,f,m,p,d,g,x,_,E;if(!c)Wf(this,i,r,a);else if(A!==this._tTime||!i||a||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h){if(u=A,_=this.timeline,this._repeat){if(p=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(p*100+i,r,a);if(u=St(A%p),A===l?(m=this._repeat,u=c):(m=~~(A/p),m&&m===A/p&&(u=c,m--),u>c&&(u=c)),g=this._yoyo&&m&1,g&&(E=this._yEase,u=c-u),d=Rr(this._tTime,p),u===o&&!a&&this._initted)return this._tTime=A,this;m!==d&&(_&&this._yEase&&Wu(_,g),this.vars.repeatRefresh&&!g&&!this._lock&&(this._lock=a=1,this.render(St(p*m),!0).invalidate()._lock=0))}if(!this._initted){if(Ru(this,h?i:u,a,r,A))return this._tTime=0,this;if(o!==this._time)return this;if(c!==this._dur)return this.render(i,r,a)}if(this._tTime=A,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=x=(E||this._ease)(u/c),this._from&&(this.ratio=x=1-x),u&&!o&&!r&&!m&&(fn(this,"onStart"),this._tTime!==A))return this;for(f=this._pt;f;)f.r(x,f.d),f=f._next;_&&_.render(i<0?i:!u&&g?-Je:_._dur*_._ease(u/this._dur),r,a)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&Ho(this,i,r,a),fn(this,"onUpdate")),this._repeat&&m!==d&&this.vars.onRepeat&&!r&&this.parent&&fn(this,"onRepeat"),(A===this._tDur||!A)&&this._tTime===A&&(h&&!this._onUpdate&&Ho(this,i,!0,!0),(i||!c)&&(A===this._tDur&&this._ts>0||!A&&this._ts<0)&&Ci(this,1),!r&&!(h&&!o)&&(A||o||g)&&(fn(this,A===l?"onComplete":"onReverseComplete",!0),this._prom&&!(A<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},t.resetTo=function(i,r,a,o){Is||en.wake(),this._ts||this.play();var l=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||Rl(this,l),c=this._ease(l/this._dur),hd(this,i,r,a,o,c,l)?this.resetTo(i,r,a,o):(La(this,0),this.parent||Tu(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?cs(this):this;if(this.timeline){var a=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,di&&di.vars.overwrite!==!0)._first||cs(this),this.parent&&a!==this.timeline.totalDuration()&&Dr(this,this._dur*this.timeline._tDur/a,0,1),this}var o=this._targets,l=i?An(i):o,c=this._ptLookup,h=this._pt,A,u,f,m,p,d,g;if((!r||r==="all")&&kf(o,l))return r==="all"&&(this._pt=0),cs(this);for(A=this._op=this._op||[],r!=="all"&&(yt(r)&&(p={},qt(r,function(x){return p[x]=1}),r=p),r=ud(o,r)),g=o.length;g--;)if(~l.indexOf(o[g])){u=c[g],r==="all"?(A[g]=r,m=u,f={}):(f=A[g]=A[g]||{},m=r);for(p in m)d=u&&u[p],d&&((!("kill"in d.d)||d.d.kill(p)===!0)&&Ra(this,d,"_pt"),delete u[p]),f!=="all"&&(f[p]=1)}return this._initted&&!this._pt&&h&&cs(this),this},e.to=function(i,r){return new e(i,r,arguments[2])},e.from=function(i,r){return ps(1,arguments)},e.delayedCall=function(i,r,a,o){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:a,onReverseCompleteParams:a,callbackScope:o})},e.fromTo=function(i,r,a){return ps(2,arguments)},e.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(i,r)},e.killTweensOf=function(i,r,a){return tt.killTweensOf(i,r,a)},e}(Pr);dn(gt.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});qt("staggerTo,staggerFrom,staggerFromTo",function(s){gt[s]=function(){var e=new zt,t=Vo.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var Dl=function(e,t,n){return e[t]=n},ju=function(e,t,n){return e[t](n)},fd=function(e,t,n,i){return e[t](i.fp,n)},dd=function(e,t,n){return e.setAttribute(t,n)},Ll=function(e,t){return at(e[t])?ju:Il(e[t])&&e.setAttribute?dd:Dl},Zu=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},pd=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},$u=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Pl=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},gd=function(e,t,n,i){for(var r=this._pt,a;r;)a=r._next,r.p===i&&r.modifier(e,t,n),r=a},md=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Ra(this,t,"_pt"):t.dep||(n=1),t=i;return!n},_d=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},eA=function(e){for(var t=e._pt,n,i,r,a;t;){for(n=t._next,i=r;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:a)?t._prev._next=t:r=t,(t._next=i)?i._prev=t:a=t,t=n}e._pt=r},Xt=function(){function s(t,n,i,r,a,o,l,c,h){this.t=n,this.s=r,this.c=a,this.p=i,this.r=o||Zu,this.d=l||this,this.set=c||Dl,this.pr=h||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=_d,this.m=n,this.mt=r,this.tween=i},s}();qt(Tl+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(s){return wl[s]=1});an.TweenMax=an.TweenLite=gt;an.TimelineLite=an.TimelineMax=zt;tt=new zt({sortChildren:!1,defaults:Br,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});rn.stringFilter=zu;var Ur=[],Aa={},Ed=[],_c=0,Xa=function(e){return(Aa[e]||Ed).map(function(t){return t()})},Yo=function(){var e=Date.now(),t=[];e-_c>2&&(Xa("matchMediaInit"),Ur.forEach(function(n){var i=n.queries,r=n.conditions,a,o,l,c;for(o in i)a=cn.matchMedia(i[o]).matches,a&&(l=1),a!==r[o]&&(r[o]=a,c=1);c&&(n.revert(),l&&t.push(n))}),Xa("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n)}),_c=e,Xa("matchMedia"))},tA=function(){function s(t,n){this.selector=n&&Wo(n),this.data=[],this._r=[],this.isReverted=!1,t&&this.add(t)}var e=s.prototype;return e.add=function(n,i,r){at(n)&&(r=i,i=n,n=at);var a=this,o=function(){var c=pt,h=a.selector,A;return c&&c!==a&&c.data.push(a),r&&(a.selector=Wo(r)),pt=a,A=i.apply(a,arguments),at(A)&&a._r.push(A),pt=c,a.selector=h,a.isReverted=!1,A};return a.last=o,n===at?o(a):n?a[n]=o:o},e.ignore=function(n){var i=pt;pt=null,n(this),pt=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof gt&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var r=this;if(n){var a=this.getTweens();this.data.forEach(function(l){l.data==="isFlip"&&(l.revert(),l.getChildren(!0,!0,!1).forEach(function(c){return a.splice(a.indexOf(c),1)}))}),a.map(function(l){return{g:l.globalTime(0),t:l}}).sort(function(l,c){return c.g-l.g||-1}).forEach(function(l){return l.t.revert(n)}),this.data.forEach(function(l){return!(l instanceof Pr)&&l.revert&&l.revert(n)}),this._r.forEach(function(l){return l(n,r)}),this.isReverted=!0}else this.data.forEach(function(l){return l.kill&&l.kill()});if(this.clear(),i){var o=Ur.indexOf(this);~o&&Ur.splice(o,1)}},e.revert=function(n){this.kill(n||{})},s}(),vd=function(){function s(t){this.contexts=[],this.scope=t}var e=s.prototype;return e.add=function(n,i,r){Fn(n)||(n={matches:n});var a=new tA(0,r||this.scope),o=a.conditions={},l,c,h;this.contexts.push(a),i=a.add("onMatch",i),a.queries=n;for(c in n)c==="all"?h=1:(l=cn.matchMedia(n[c]),l&&(Ur.indexOf(a)<0&&Ur.push(a),(o[c]=l.matches)&&(h=1),l.addListener?l.addListener(Yo):l.addEventListener("change",Yo)));return h&&i(a),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s}(),Ia={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Gu(i)})},timeline:function(e){return new zt(e)},getTweensOf:function(e,t){return tt.getTweensOf(e,t)},getProperty:function(e,t,n,i){yt(e)&&(e=An(e)[0]);var r=Vi(e||{}).get,a=n?wu:Mu;return n==="native"&&(n=""),e&&(t?a(($t[t]&&$t[t].get||r)(e,t,n,i)):function(o,l,c){return a(($t[o]&&$t[o].get||r)(e,o,l,c))})},quickSetter:function(e,t,n){if(e=An(e),e.length>1){var i=e.map(function(h){return Kt.quickSetter(h,t,n)}),r=i.length;return function(h){for(var A=r;A--;)i[A](h)}}e=e[0]||{};var a=$t[t],o=Vi(e),l=o.harness&&(o.harness.aliases||{})[t]||t,c=a?function(h){var A=new a;vr._pt=0,A.init(e,n?h+n:h,vr,0,[e]),A.render(1,A),vr._pt&&Pl(1,vr)}:o.set(e,l);return a?c:function(h){return c(e,l,n?h+n:h,o,1)}},quickTo:function(e,t,n){var i,r=Kt.to(e,Ji((i={},i[t]="+=0.1",i.paused=!0,i),n||{})),a=function(l,c,h){return r.resetTo(t,l,c,h)};return a.tween=r,a},isTweening:function(e){return tt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=qi(e.ease,Br.ease)),fc(Br,e||{})},config:function(e){return fc(rn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,r=e.defaults,a=e.extendTimeline;(i||"").split(",").forEach(function(o){return o&&!$t[o]&&!an[o]&&Ea(t+" effect requires "+o+" plugin.")}),za[t]=function(o,l,c){return n(An(o),dn(l||{},r),c)},a&&(zt.prototype[t]=function(o,l,c){return this.add(za[t](o,Fn(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){ke[e]=qi(t)},parseEase:function(e,t){return arguments.length?qi(e,t):ke},getById:function(e){return tt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new zt(e),i,r;for(n.smoothChildTiming=Wt(e.smoothChildTiming),tt.remove(n),n._dp=0,n._time=n._tTime=tt._time,i=tt._first;i;)r=i._next,(t||!(!i._dur&&i instanceof gt&&i.vars.onComplete===i._targets[0]))&&Bn(n,i,i._start-i._delay),i=r;return Bn(tt,n,0),n},context:function(e,t){return e?new tA(e,t):pt},matchMedia:function(e){return new vd(e)},matchMediaRefresh:function(){return Ur.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Yo()},addEventListener:function(e,t){var n=Aa[e]||(Aa[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Aa[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:$f,wrapYoyo:ed,distribute:Pu,random:Nu,snap:Uu,normalize:Zf,getUnit:Dt,clamp:Yf,splitColor:ku,toArray:An,selector:Wo,mapRange:Qu,pipe:Jf,unitize:jf,interpolate:td,shuffle:Lu},install:xu,effects:za,ticker:en,updateRoot:zt.updateRoot,plugins:$t,globalTimeline:tt,core:{PropTween:Xt,globals:Cu,Tween:gt,Timeline:zt,Animation:Pr,getCache:Vi,_removeLinkedListItem:Ra,reverting:function(){return Pt},context:function(e){return e&&pt&&(pt.data.push(e),e._ctx=pt),pt},suppressOverwrites:function(e){return Cl=e}}};qt("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Ia[s]=gt[s]});en.add(zt.updateRoot);vr=Ia.to({},{duration:0});var xd=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},Cd=function(e,t){var n=e._targets,i,r,a;for(i in t)for(r=n.length;r--;)a=e._ptLookup[r][i],a&&(a=a.d)&&(a._pt&&(a=xd(a,i)),a&&a.modifier&&a.modifier(t[i],e,n[r],i))},Ya=function(e,t){return{name:e,rawVars:1,init:function(i,r,a){a._onInit=function(o){var l,c;if(yt(r)&&(l={},qt(r,function(h){return l[h]=1}),r=l),t){l={};for(c in r)l[c]=t(r[c]);r=l}Cd(o,r)}}}},Kt=Ia.registerPlugin({name:"attr",init:function(e,t,n,i,r){var a,o,l;this.tween=n;for(a in t)l=e.getAttribute(a)||"",o=this.add(e,"setAttribute",(l||0)+"",t[a],i,r,0,0,a),o.op=a,o.b=l,this._props.push(a)},render:function(e,t){for(var n=t._pt;n;)Pt?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Ya("roundProps",qo),Ya("modifiers"),Ya("snap",Uu))||Ia;gt.version=zt.version=Kt.version="3.11.5";vu=1;yl()&&Lr();ke.Power0;ke.Power1;ke.Power2;ke.Power3;ke.Power4;ke.Linear;ke.Quad;ke.Cubic;ke.Quart;ke.Quint;ke.Strong;ke.Elastic;ke.Back;ke.SteppedEase;ke.Bounce;ke.Sine;ke.Expo;ke.Circ;/*!
 * CSSPlugin 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ec,pi,Sr,Ul,Hi,vc,Nl,Id=function(){return typeof window<"u"},ri={},Qi=180/Math.PI,Mr=Math.PI/180,$i=Math.atan2,xc=1e8,Fl=/([A-Z])/g,yd=/(left|right|width|margin|padding|x)/i,Sd=/[\s,\(]\S/,Rn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Ko=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Md=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},wd=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Td=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},nA=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},iA=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},bd=function(e,t,n){return e.style[t]=n},Bd=function(e,t,n){return e.style.setProperty(t,n)},Rd=function(e,t,n){return e._gsap[t]=n},Dd=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},Ld=function(e,t,n,i,r){var a=e._gsap;a.scaleX=a.scaleY=n,a.renderTransform(r,a)},Pd=function(e,t,n,i,r){var a=e._gsap;a[t]=n,a.renderTransform(r,a)},nt="transform",In=nt+"Origin",Ud=function s(e,t){var n=this,i=this.target,r=i.style;if(e in ri){if(this.tfm=this.tfm||{},e!=="transform")e=Rn[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=jn(i,a)}):this.tfm[e]=i._gsap.x?i._gsap[e]:jn(i,e);else return Rn.transform.split(",").forEach(function(a){return s.call(n,a,t)});if(this.props.indexOf(nt)>=0)return;i._gsap.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(In,t,"")),e=nt}(r||t)&&this.props.push(e,t,r[e])},rA=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Nd=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,r,a;for(r=0;r<e.length;r+=3)e[r+1]?t[e[r]]=e[r+2]:e[r+2]?n[e[r]]=e[r+2]:n.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(Fl,"-$1").toLowerCase());if(this.tfm){for(a in this.tfm)i[a]=this.tfm[a];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=Nl(),(!r||!r.isStart)&&!n[nt]&&(rA(n),i.uncache=1)}},sA=function(e,t){var n={target:e,props:[],revert:Nd,save:Ud};return e._gsap||Kt.core.getCache(e),t&&t.split(",").forEach(function(i){return n.save(i)}),n},aA,Jo=function(e,t){var n=pi.createElementNS?pi.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):pi.createElement(e);return n.style?n:pi.createElement(e)},Ln=function s(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Fl,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&s(e,Nr(t)||t,1)||""},Cc="O,Moz,ms,Ms,Webkit".split(","),Nr=function(e,t,n){var i=t||Hi,r=i.style,a=5;if(e in r&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);a--&&!(Cc[a]+e in r););return a<0?null:(a===3?"ms":a>=0?Cc[a]:"")+e},jo=function(){Id()&&window.document&&(Ec=window,pi=Ec.document,Sr=pi.documentElement,Hi=Jo("div")||{style:{}},Jo("div"),nt=Nr(nt),In=nt+"Origin",Hi.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",aA=!!Nr("perspective"),Nl=Kt.core.reverting,Ul=1)},Ka=function s(e){var t=Jo("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=this.parentNode,i=this.nextSibling,r=this.style.cssText,a;if(Sr.appendChild(t),t.appendChild(this),this.style.display="block",e)try{a=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=s}catch{}else this._gsapBBox&&(a=this._gsapBBox());return n&&(i?n.insertBefore(this,i):n.appendChild(this)),Sr.removeChild(t),this.style.cssText=r,a},Ic=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},oA=function(e){var t;try{t=e.getBBox()}catch{t=Ka.call(e,!0)}return t&&(t.width||t.height)||e.getBBox===Ka||(t=Ka.call(e,!0)),t&&!t.width&&!t.x&&!t.y?{x:+Ic(e,["x","cx","x1"])||0,y:+Ic(e,["y","cy","y1"])||0,width:0,height:0}:t},lA=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&oA(e))},ys=function(e,t){if(t){var n=e.style;t in ri&&t!==In&&(t=nt),n.removeProperty?((t.substr(0,2)==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(t.replace(Fl,"-$1").toLowerCase())):n.removeAttribute(t)}},gi=function(e,t,n,i,r,a){var o=new Xt(e._pt,t,n,0,1,a?iA:nA);return e._pt=o,o.b=i,o.e=r,e._props.push(n),o},yc={deg:1,rad:1,turn:1},Fd={grid:1,flex:1},Ii=function s(e,t,n,i){var r=parseFloat(n)||0,a=(n+"").trim().substr((r+"").length)||"px",o=Hi.style,l=yd.test(t),c=e.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),A=100,u=i==="px",f=i==="%",m,p,d,g;return i===a||!r||yc[i]||yc[a]?r:(a!=="px"&&!u&&(r=s(e,t,n,"px")),g=e.getCTM&&lA(e),(f||a==="%")&&(ri[t]||~t.indexOf("adius"))?(m=g?e.getBBox()[l?"width":"height"]:e[h],ct(f?r/m*A:r/100*m)):(o[l?"width":"height"]=A+(u?a:i),p=~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,g&&(p=(e.ownerSVGElement||{}).parentNode),(!p||p===pi||!p.appendChild)&&(p=pi.body),d=p._gsap,d&&f&&d.width&&l&&d.time===en.time&&!d.uncache?ct(r/d.width*A):((f||a==="%")&&!Fd[Ln(p,"display")]&&(o.position=Ln(e,"position")),p===e&&(o.position="static"),p.appendChild(Hi),m=Hi[h],p.removeChild(Hi),o.position="absolute",l&&f&&(d=Vi(p),d.time=en.time,d.width=p[h]),ct(u?m*r/A:m&&r?A/m*r:0))))},jn=function(e,t,n,i){var r;return Ul||jo(),t in Rn&&t!=="transform"&&(t=Rn[t],~t.indexOf(",")&&(t=t.split(",")[0])),ri[t]&&t!=="transform"?(r=Ms(e,i),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:Sa(Ln(e,In))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=ya[t]&&ya[t](e,t,n)||Ln(e,t)||yu(e,t)||(t==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?Ii(e,t,r,n)+n:r},Qd=function(e,t,n,i){if(!n||n==="none"){var r=Nr(t,e,1),a=r&&Ln(e,r,1);a&&a!==n?(t=r,n=a):t==="borderColor"&&(n=Ln(e,"borderTopColor"))}var o=new Xt(this._pt,e.style,t,0,1,$u),l=0,c=0,h,A,u,f,m,p,d,g,x,_,E,C;if(o.b=n,o.e=i,n+="",i+="",i==="auto"&&(e.style[t]=i,i=Ln(e,t)||i,e.style[t]=n),h=[n,i],zu(h),n=h[0],i=h[1],u=n.match(Er)||[],C=i.match(Er)||[],C.length){for(;A=Er.exec(i);)d=A[0],x=i.substring(l,A.index),m?m=(m+1)%5:(x.substr(-5)==="rgba("||x.substr(-5)==="hsla(")&&(m=1),d!==(p=u[c++]||"")&&(f=parseFloat(p)||0,E=p.substr((f+"").length),d.charAt(1)==="="&&(d=yr(f,d)+E),g=parseFloat(d),_=d.substr((g+"").length),l=Er.lastIndex-_.length,_||(_=_||rn.units[t]||E,l===i.length&&(i+=_,o.e+=_)),E!==_&&(f=Ii(e,t,p,_)||0),o._pt={_next:o._pt,p:x||c===1?x:",",s:f,c:g-f,m:m&&m<4||t==="zIndex"?Math.round:0});o.c=l<i.length?i.substring(l,i.length):""}else o.r=t==="display"&&i==="none"?iA:nA;return _u.test(i)&&(o.e=0),this._pt=o,o},Sc={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Od=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Sc[n]||n,t[1]=Sc[i]||i,t.join(" ")},Gd=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,r=t.u,a=n._gsap,o,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)o=r[c],ri[o]&&(l=1,o=o==="transformOrigin"?In:nt),ys(n,o);l&&(ys(n,nt),a&&(a.svg&&n.removeAttribute("transform"),Ms(n,1),a.uncache=1,rA(i)))}},ya={clearProps:function(e,t,n,i,r){if(r.data!=="isFromStart"){var a=e._pt=new Xt(e._pt,t,n,0,0,Gd);return a.u=i,a.pr=-10,a.tween=r,e._props.push(n),1}}},Ss=[1,0,0,1,0,0],cA={},hA=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Mc=function(e){var t=Ln(e,nt);return hA(t)?Ss:t.substr(7).match(mu).map(ct)},Ql=function(e,t){var n=e._gsap||Vi(e),i=e.style,r=Mc(e),a,o,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?Ss:r):(r===Ss&&!e.offsetParent&&e!==Sr&&!n.svg&&(l=i.display,i.display="block",a=e.parentNode,(!a||!e.offsetParent)&&(c=1,o=e.nextElementSibling,Sr.appendChild(e)),r=Mc(e),l?i.display=l:ys(e,"display"),c&&(o?a.insertBefore(e,o):a?a.appendChild(e):Sr.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},Zo=function(e,t,n,i,r,a){var o=e._gsap,l=r||Ql(e,!0),c=o.xOrigin||0,h=o.yOrigin||0,A=o.xOffset||0,u=o.yOffset||0,f=l[0],m=l[1],p=l[2],d=l[3],g=l[4],x=l[5],_=t.split(" "),E=parseFloat(_[0])||0,C=parseFloat(_[1])||0,y,w,b,v;n?l!==Ss&&(w=f*d-m*p)&&(b=E*(d/w)+C*(-p/w)+(p*x-d*g)/w,v=E*(-m/w)+C*(f/w)-(f*x-m*g)/w,E=b,C=v):(y=oA(e),E=y.x+(~_[0].indexOf("%")?E/100*y.width:E),C=y.y+(~(_[1]||_[0]).indexOf("%")?C/100*y.height:C)),i||i!==!1&&o.smooth?(g=E-c,x=C-h,o.xOffset=A+(g*f+x*p)-g,o.yOffset=u+(g*m+x*d)-x):o.xOffset=o.yOffset=0,o.xOrigin=E,o.yOrigin=C,o.smooth=!!i,o.origin=t,o.originIsAbsolute=!!n,e.style[In]="0px 0px",a&&(gi(a,o,"xOrigin",c,E),gi(a,o,"yOrigin",h,C),gi(a,o,"xOffset",A,o.xOffset),gi(a,o,"yOffset",u,o.yOffset)),e.setAttribute("data-svg-origin",E+" "+C)},Ms=function(e,t){var n=e._gsap||new Xu(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,r=n.scaleX<0,a="px",o="deg",l=getComputedStyle(e),c=Ln(e,In)||"0",h,A,u,f,m,p,d,g,x,_,E,C,y,w,b,v,M,H,X,L,U,N,W,Q,z,Z,J,le,P,ee,$,se;return h=A=u=p=d=g=x=_=E=0,f=m=1,n.svg=!!(e.getCTM&&lA(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[nt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[nt]!=="none"?l[nt]:"")),i.scale=i.rotate=i.translate="none"),w=Ql(e,n.svg),n.svg&&(n.uncache?(z=e.getBBox(),c=n.xOrigin-z.x+"px "+(n.yOrigin-z.y)+"px",Q=""):Q=!t&&e.getAttribute("data-svg-origin"),Zo(e,Q||c,!!Q||n.originIsAbsolute,n.smooth!==!1,w)),C=n.xOrigin||0,y=n.yOrigin||0,w!==Ss&&(H=w[0],X=w[1],L=w[2],U=w[3],h=N=w[4],A=W=w[5],w.length===6?(f=Math.sqrt(H*H+X*X),m=Math.sqrt(U*U+L*L),p=H||X?$i(X,H)*Qi:0,x=L||U?$i(L,U)*Qi+p:0,x&&(m*=Math.abs(Math.cos(x*Mr))),n.svg&&(h-=C-(C*H+y*L),A-=y-(C*X+y*U))):(se=w[6],ee=w[7],J=w[8],le=w[9],P=w[10],$=w[11],h=w[12],A=w[13],u=w[14],b=$i(se,P),d=b*Qi,b&&(v=Math.cos(-b),M=Math.sin(-b),Q=N*v+J*M,z=W*v+le*M,Z=se*v+P*M,J=N*-M+J*v,le=W*-M+le*v,P=se*-M+P*v,$=ee*-M+$*v,N=Q,W=z,se=Z),b=$i(-L,P),g=b*Qi,b&&(v=Math.cos(-b),M=Math.sin(-b),Q=H*v-J*M,z=X*v-le*M,Z=L*v-P*M,$=U*M+$*v,H=Q,X=z,L=Z),b=$i(X,H),p=b*Qi,b&&(v=Math.cos(b),M=Math.sin(b),Q=H*v+X*M,z=N*v+W*M,X=X*v-H*M,W=W*v-N*M,H=Q,N=z),d&&Math.abs(d)+Math.abs(p)>359.9&&(d=p=0,g=180-g),f=ct(Math.sqrt(H*H+X*X+L*L)),m=ct(Math.sqrt(W*W+se*se)),b=$i(N,W),x=Math.abs(b)>2e-4?b*Qi:0,E=$?1/($<0?-$:$):0),n.svg&&(Q=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!hA(Ln(e,nt)),Q&&e.setAttribute("transform",Q))),Math.abs(x)>90&&Math.abs(x)<270&&(r?(f*=-1,x+=p<=0?180:-180,p+=p<=0?180:-180):(m*=-1,x+=x<=0?180:-180)),t=t||n.uncache,n.x=h-((n.xPercent=h&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-h)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+a,n.y=A-((n.yPercent=A&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-A)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+a,n.z=u+a,n.scaleX=ct(f),n.scaleY=ct(m),n.rotation=ct(p)+o,n.rotationX=ct(d)+o,n.rotationY=ct(g)+o,n.skewX=x+o,n.skewY=_+o,n.transformPerspective=E+a,(n.zOrigin=parseFloat(c.split(" ")[2])||0)&&(i[In]=Sa(c)),n.xOffset=n.yOffset=0,n.force3D=rn.force3D,n.renderTransform=n.svg?Hd:aA?uA:kd,n.uncache=0,n},Sa=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ja=function(e,t,n){var i=Dt(t);return ct(parseFloat(t)+parseFloat(Ii(e,"x",n+"px",i)))+i},kd=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,uA(e,t)},Ri="0deg",$r="0px",Di=") ",uA=function(e,t){var n=t||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.z,c=n.rotation,h=n.rotationY,A=n.rotationX,u=n.skewX,f=n.skewY,m=n.scaleX,p=n.scaleY,d=n.transformPerspective,g=n.force3D,x=n.target,_=n.zOrigin,E="",C=g==="auto"&&e&&e!==1||g===!0;if(_&&(A!==Ri||h!==Ri)){var y=parseFloat(h)*Mr,w=Math.sin(y),b=Math.cos(y),v;y=parseFloat(A)*Mr,v=Math.cos(y),a=Ja(x,a,w*v*-_),o=Ja(x,o,-Math.sin(y)*-_),l=Ja(x,l,b*v*-_+_)}d!==$r&&(E+="perspective("+d+Di),(i||r)&&(E+="translate("+i+"%, "+r+"%) "),(C||a!==$r||o!==$r||l!==$r)&&(E+=l!==$r||C?"translate3d("+a+", "+o+", "+l+") ":"translate("+a+", "+o+Di),c!==Ri&&(E+="rotate("+c+Di),h!==Ri&&(E+="rotateY("+h+Di),A!==Ri&&(E+="rotateX("+A+Di),(u!==Ri||f!==Ri)&&(E+="skew("+u+", "+f+Di),(m!==1||p!==1)&&(E+="scale("+m+", "+p+Di),x.style[nt]=E||"translate(0, 0)"},Hd=function(e,t){var n=t||this,i=n.xPercent,r=n.yPercent,a=n.x,o=n.y,l=n.rotation,c=n.skewX,h=n.skewY,A=n.scaleX,u=n.scaleY,f=n.target,m=n.xOrigin,p=n.yOrigin,d=n.xOffset,g=n.yOffset,x=n.forceCSS,_=parseFloat(a),E=parseFloat(o),C,y,w,b,v;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Mr,c*=Mr,C=Math.cos(l)*A,y=Math.sin(l)*A,w=Math.sin(l-c)*-u,b=Math.cos(l-c)*u,c&&(h*=Mr,v=Math.tan(c-h),v=Math.sqrt(1+v*v),w*=v,b*=v,h&&(v=Math.tan(h),v=Math.sqrt(1+v*v),C*=v,y*=v)),C=ct(C),y=ct(y),w=ct(w),b=ct(b)):(C=A,b=u,y=w=0),(_&&!~(a+"").indexOf("px")||E&&!~(o+"").indexOf("px"))&&(_=Ii(f,"x",a,"px"),E=Ii(f,"y",o,"px")),(m||p||d||g)&&(_=ct(_+m-(m*C+p*w)+d),E=ct(E+p-(m*y+p*b)+g)),(i||r)&&(v=f.getBBox(),_=ct(_+i/100*v.width),E=ct(E+r/100*v.height)),v="matrix("+C+","+y+","+w+","+b+","+_+","+E+")",f.setAttribute("transform",v),x&&(f.style[nt]=v)},zd=function(e,t,n,i,r){var a=360,o=yt(r),l=parseFloat(r)*(o&&~r.indexOf("rad")?Qi:1),c=l-i,h=i+c+"deg",A,u;return o&&(A=r.split("_")[1],A==="short"&&(c%=a,c!==c%(a/2)&&(c+=c<0?a:-a)),A==="cw"&&c<0?c=(c+a*xc)%a-~~(c/a)*a:A==="ccw"&&c>0&&(c=(c-a*xc)%a-~~(c/a)*a)),e._pt=u=new Xt(e._pt,t,n,i,c,Md),u.e=h,u.u="deg",e._props.push(n),u},wc=function(e,t){for(var n in t)e[n]=t[n];return e},Vd=function(e,t,n){var i=wc({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",a=n.style,o,l,c,h,A,u,f,m;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),a[nt]=t,o=Ms(n,1),ys(n,nt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[nt],a[nt]=t,o=Ms(n,1),a[nt]=c);for(l in ri)c=i[l],h=o[l],c!==h&&r.indexOf(l)<0&&(f=Dt(c),m=Dt(h),A=f!==m?Ii(n,l,c,m):parseFloat(c),u=parseFloat(h),e._pt=new Xt(e._pt,o,l,A,u-A,Ko),e._pt.u=m||0,e._props.push(l));wc(o,i)};qt("padding,margin,Width,Radius",function(s,e){var t="Top",n="Right",i="Bottom",r="Left",a=(e<3?[t,n,i,r]:[t+r,t+n,i+n,i+r]).map(function(o){return e<2?s+o:"border"+o+s});ya[e>1?"border"+s:s]=function(o,l,c,h,A){var u,f;if(arguments.length<4)return u=a.map(function(m){return jn(o,m,c)}),f=u.join(" "),f.split(u[0]).length===5?u[0]:f;u=(h+"").split(" "),f={},a.forEach(function(m,p){return f[m]=u[p]=u[p]||u[(p-1)/2|0]}),o.init(l,f,A)}});var AA={name:"css",register:jo,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,r){var a=this._props,o=e.style,l=n.vars.startAt,c,h,A,u,f,m,p,d,g,x,_,E,C,y,w,b;Ul||jo(),this.styles=this.styles||sA(e),b=this.styles.props,this.tween=n;for(p in t)if(p!=="autoRound"&&(h=t[p],!($t[p]&&Yu(p,t,n,i,e,r)))){if(f=typeof h,m=ya[p],f==="function"&&(h=h.call(n,i,e,r),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=Cs(h)),m)m(this,e,p,h,n)&&(w=1);else if(p.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(p)+"").trim(),h+="",vi.lastIndex=0,vi.test(c)||(d=Dt(c),g=Dt(h)),g?d!==g&&(c=Ii(e,p,c,g)+g):d&&(h+=d),this.add(o,"setProperty",c,h,i,r,0,0,p),a.push(p),b.push(p,0,o[p]);else if(f!=="undefined"){if(l&&p in l?(c=typeof l[p]=="function"?l[p].call(n,i,e,r):l[p],yt(c)&&~c.indexOf("random(")&&(c=Cs(c)),Dt(c+"")||(c+=rn.units[p]||Dt(jn(e,p))||""),(c+"").charAt(1)==="="&&(c=jn(e,p))):c=jn(e,p),u=parseFloat(c),x=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),x&&(h=h.substr(2)),A=parseFloat(h),p in Rn&&(p==="autoAlpha"&&(u===1&&jn(e,"visibility")==="hidden"&&A&&(u=0),b.push("visibility",0,o.visibility),gi(this,o,"visibility",u?"inherit":"hidden",A?"inherit":"hidden",!A)),p!=="scale"&&p!=="transform"&&(p=Rn[p],~p.indexOf(",")&&(p=p.split(",")[0]))),_=p in ri,_){if(this.styles.save(p),E||(C=e._gsap,C.renderTransform&&!t.parseTransform||Ms(e,t.parseTransform),y=t.smoothOrigin!==!1&&C.smooth,E=this._pt=new Xt(this._pt,o,nt,0,1,C.renderTransform,C,0,-1),E.dep=1),p==="scale")this._pt=new Xt(this._pt,C,"scaleY",C.scaleY,(x?yr(C.scaleY,x+A):A)-C.scaleY||0,Ko),this._pt.u=0,a.push("scaleY",p),p+="X";else if(p==="transformOrigin"){b.push(In,0,o[In]),h=Od(h),C.svg?Zo(e,h,0,y,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==C.zOrigin&&gi(this,C,"zOrigin",C.zOrigin,g),gi(this,o,p,Sa(c),Sa(h)));continue}else if(p==="svgOrigin"){Zo(e,h,1,y,0,this);continue}else if(p in cA){zd(this,C,p,u,x?yr(u,x+h):h);continue}else if(p==="smoothOrigin"){gi(this,C,"smooth",C.smooth,h);continue}else if(p==="force3D"){C[p]=h;continue}else if(p==="transform"){Vd(this,h,e);continue}}else p in o||(p=Nr(p)||p);if(_||(A||A===0)&&(u||u===0)&&!Sd.test(h)&&p in o)d=(c+"").substr((u+"").length),A||(A=0),g=Dt(h)||(p in rn.units?rn.units[p]:d),d!==g&&(u=Ii(e,p,c,g)),this._pt=new Xt(this._pt,_?C:o,p,u,(x?yr(u,x+A):A)-u,!_&&(g==="px"||p==="zIndex")&&t.autoRound!==!1?Td:Ko),this._pt.u=g||0,d!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=wd);else if(p in o)Qd.call(this,e,p,c,x?x+h:h);else if(p in e)this.add(e,p,c||e[p],x?x+h:h,i,r);else if(p!=="parseTransform"){Ml(p,h);continue}_||(p in o?b.push(p,0,o[p]):b.push(p,1,c||e[p])),a.push(p)}}w&&eA(this)},render:function(e,t){if(t.tween._time||!Nl())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:jn,aliases:Rn,getSetter:function(e,t,n){var i=Rn[t];return i&&i.indexOf(",")<0&&(t=i),t in ri&&t!==In&&(e._gsap.x||jn(e,"x"))?n&&vc===n?t==="scale"?Dd:Rd:(vc=n||{})&&(t==="scale"?Ld:Pd):e.style&&!Il(e.style[t])?bd:~t.indexOf("-")?Bd:Ll(e,t)},core:{_removeProperty:ys,_getMatrix:Ql}};Kt.utils.checkPrefix=Nr;Kt.core.getStyleSaver=sA;(function(s,e,t,n){var i=qt(s+","+e+","+t,function(r){ri[r]=1});qt(e,function(r){rn.units[r]="deg",cA[r]=1}),Rn[i[13]]=s+","+e,qt(n,function(r){var a=r.split(":");Rn[a[1]]=i[a[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");qt("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){rn.units[s]="px"});Kt.registerPlugin(AA);var Fr=Kt.registerPlugin(AA)||Kt;Fr.core.Tween;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ol="153",Wd=0,Tc=1,qd=2,fA=1,Xd=2,Yn=3,si=0,Yt=1,Cn=2,xi=0,wr=1,Ma=2,bc=3,Bc=4,Yd=5,_r=100,Kd=101,Jd=102,Rc=103,Dc=104,jd=200,Zd=201,$d=202,ep=203,dA=204,pA=205,tp=206,np=207,ip=208,rp=209,sp=210,ap=0,op=1,lp=2,$o=3,cp=4,hp=5,up=6,Ap=7,gA=0,fp=1,dp=2,Pn=0,mA=1,Gl=2,_A=3,EA=4,pp=5,vA=300,Qr=301,Or=302,el=303,tl=304,Pa=306,Un=1e3,tn=1001,wa=1002,xt=1003,nl=1004,fa=1005,Rt=1006,xA=1007,yi=1008,Mt=1009,gp=1010,mp=1011,kl=1012,CA=1013,mi=1014,nn=1015,sn=1016,IA=1017,yA=1018,Xi=1020,_p=1021,Tt=1023,Ep=1024,vp=1025,Yi=1026,Gr=1027,us=1028,SA=1029,As=1030,MA=1031,wA=1033,da=33776,ja=33777,Za=33778,pa=33779,il=35840,Lc=35841,rl=35842,Pc=35843,TA=36196,sl=37492,al=37496,ol=37808,Uc=37809,Nc=37810,Fc=37811,Qc=37812,Oc=37813,Gc=37814,kc=37815,Hc=37816,zc=37817,Vc=37818,Wc=37819,qc=37820,Xc=37821,ga=36492,xp=36283,Yc=36284,Kc=36285,Jc=36286,ws=2300,kr=2301,$a=2302,jc=2400,Zc=2401,$c=2402,Cp=2500,Ip=0,bA=1,ll=2,BA=3e3,Ki=3001,yp=3200,Sp=3201,RA=0,Mp=1,ni="",xe="srgb",pn="srgb-linear",DA="display-p3",eo=7680,wp=519,Tp=512,bp=513,Bp=514,Rp=515,Dp=516,Lp=517,Pp=518,Up=519,cl=35044,eh="300 es",hl=1035,Zn=2e3,Ta=2001;class qr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let th=1234567;const ms=Math.PI/180,Hr=180/Math.PI;function yn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[s&255]+bt[s>>8&255]+bt[s>>16&255]+bt[s>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function wt(s,e,t){return Math.max(e,Math.min(t,s))}function Hl(s,e){return(s%e+e)%e}function Np(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Fp(s,e,t){return s!==e?(t-s)/(e-s):0}function _s(s,e,t){return(1-t)*s+t*e}function Qp(s,e,t,n){return _s(s,e,1-Math.exp(-t*n))}function Op(s,e=1){return e-Math.abs(Hl(s,e*2)-e)}function Gp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function kp(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Hp(s,e){return s+Math.floor(Math.random()*(e-s+1))}function zp(s,e){return s+Math.random()*(e-s)}function Vp(s){return s*(.5-Math.random())}function Wp(s){s!==void 0&&(th=s);let e=th+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function qp(s){return s*ms}function Xp(s){return s*Hr}function ul(s){return(s&s-1)===0&&s!==0}function LA(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function ba(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Yp(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),A=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*A,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*A,o*c);break;case"ZXZ":s.set(l*A,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*m,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*m,o*c);break;case"ZYZ":s.set(l*m,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function $n(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ke(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Kp={DEG2RAD:ms,RAD2DEG:Hr,generateUUID:yn,clamp:wt,euclideanModulo:Hl,mapLinear:Np,inverseLerp:Fp,lerp:_s,damp:Qp,pingpong:Op,smoothstep:Gp,smootherstep:kp,randInt:Hp,randFloat:zp,randFloatSpread:Vp,seededRandom:Wp,degToRad:qp,radToDeg:Xp,isPowerOfTwo:ul,ceilPowerOfTwo:LA,floorPowerOfTwo:ba,setQuaternionFromProperEuler:Yp,normalize:Ke,denormalize:$n};class ce{constructor(e=0,t=0){ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ue{constructor(e,t,n,i,r,a,o,l,c){Ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],A=n[7],u=n[2],f=n[5],m=n[8],p=i[0],d=i[3],g=i[6],x=i[1],_=i[4],E=i[7],C=i[2],y=i[5],w=i[8];return r[0]=a*p+o*x+l*C,r[3]=a*d+o*_+l*y,r[6]=a*g+o*E+l*w,r[1]=c*p+h*x+A*C,r[4]=c*d+h*_+A*y,r[7]=c*g+h*E+A*w,r[2]=u*p+f*x+m*C,r[5]=u*d+f*_+m*y,r[8]=u*g+f*E+m*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],A=h*a-o*c,u=o*l-h*r,f=c*r-a*l,m=t*A+n*u+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/m;return e[0]=A*p,e[1]=(i*c-h*n)*p,e[2]=(o*n-i*a)*p,e[3]=u*p,e[4]=(h*t-i*l)*p,e[5]=(i*r-o*t)*p,e[6]=f*p,e[7]=(n*l-c*t)*p,e[8]=(a*t-n*r)*p,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(to.makeScale(e,t)),this}rotate(e){return this.premultiply(to.makeRotation(-e)),this}translate(e,t){return this.premultiply(to.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const to=new Ue;function PA(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Ts(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}const nh={};function Es(s){s in nh||(nh[s]=!0,console.warn(s))}function Tr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function no(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Jp=new Ue().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),jp=new Ue().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function Zp(s){return s.convertSRGBToLinear().applyMatrix3(jp)}function $p(s){return s.applyMatrix3(Jp).convertLinearToSRGB()}const eg={[pn]:s=>s,[xe]:s=>s.convertSRGBToLinear(),[DA]:Zp},tg={[pn]:s=>s,[xe]:s=>s.convertLinearToSRGB(),[DA]:$p},mn={enabled:!0,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(s){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!s},get workingColorSpace(){return pn},set workingColorSpace(s){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=eg[e],i=tg[t];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${e}" to "${t}".`);return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this.workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this.workingColorSpace)}};let er;class UA{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{er===void 0&&(er=Ts("canvas")),er.width=e.width,er.height=e.height;const n=er.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=er}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ts("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Tr(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Tr(t[n]/255)*255):t[n]=Tr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ng=0;class NA{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ng++}),this.uuid=yn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(io(i[a].image)):r.push(io(i[a]))}else r=io(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function io(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?UA.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ig=0;class It extends qr{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=tn,i=tn,r=Rt,a=yi,o=Tt,l=Mt,c=It.DEFAULT_ANISOTROPY,h=ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ig++}),this.uuid=yn(),this.name="",this.source=new NA(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Ki?xe:ni),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vA)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Un:e.x=e.x-Math.floor(e.x);break;case tn:e.x=e.x<0?0:1;break;case wa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Un:e.y=e.y-Math.floor(e.y);break;case tn:e.y=e.y<0?0:1;break;case wa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===xe?Ki:BA}set encoding(e){Es("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ki?xe:ni}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=vA;It.DEFAULT_ANISOTROPY=1;class je{constructor(e=0,t=0,n=0,i=1){je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],A=l[8],u=l[1],f=l[5],m=l[9],p=l[2],d=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(A-p)<.01&&Math.abs(m-d)<.01){if(Math.abs(h+u)<.1&&Math.abs(A+p)<.1&&Math.abs(m+d)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,E=(f+1)/2,C=(g+1)/2,y=(h+u)/4,w=(A+p)/4,b=(m+d)/4;return _>E&&_>C?_<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(_),i=y/n,r=w/n):E>C?E<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(E),n=y/i,r=b/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=w/r,i=b/r),this.set(n,i,r,t),this}let x=Math.sqrt((d-m)*(d-m)+(A-p)*(A-p)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(d-m)/x,this.y=(A-p)/x,this.z=(u-h)/x,this.w=Math.acos((c+f+g-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sn extends qr{constructor(e=1,t=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new je(0,0,e,t),this.scissorTest=!1,this.viewport=new je(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(Es("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Ki?xe:ni),this.texture=new It(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Rt,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new NA(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class FA extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=xt,this.minFilter=xt,this.wrapR=tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class QA extends It{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=xt,this.minFilter=xt,this.wrapR=tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mi{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],A=n[i+3];const u=r[a+0],f=r[a+1],m=r[a+2],p=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=A;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=m,e[t+3]=p;return}if(A!==p||l!==u||c!==f||h!==m){let d=1-o;const g=l*u+c*f+h*m+A*p,x=g>=0?1:-1,_=1-g*g;if(_>Number.EPSILON){const C=Math.sqrt(_),y=Math.atan2(C,g*x);d=Math.sin(d*y)/C,o=Math.sin(o*y)/C}const E=o*x;if(l=l*d+u*E,c=c*d+f*E,h=h*d+m*E,A=A*d+p*E,d===1-o){const C=1/Math.sqrt(l*l+c*c+h*h+A*A);l*=C,c*=C,h*=C,A*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=A}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],A=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+h*A+l*f-c*u,e[t+1]=l*m+h*u+c*A-o*f,e[t+2]=c*m+h*f+o*u-l*A,e[t+3]=h*m-o*A-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),A=o(r/2),u=l(n/2),f=l(i/2),m=l(r/2);switch(a){case"XYZ":this._x=u*h*A+c*f*m,this._y=c*f*A-u*h*m,this._z=c*h*m+u*f*A,this._w=c*h*A-u*f*m;break;case"YXZ":this._x=u*h*A+c*f*m,this._y=c*f*A-u*h*m,this._z=c*h*m-u*f*A,this._w=c*h*A+u*f*m;break;case"ZXY":this._x=u*h*A-c*f*m,this._y=c*f*A+u*h*m,this._z=c*h*m+u*f*A,this._w=c*h*A-u*f*m;break;case"ZYX":this._x=u*h*A-c*f*m,this._y=c*f*A+u*h*m,this._z=c*h*m-u*f*A,this._w=c*h*A+u*f*m;break;case"YZX":this._x=u*h*A+c*f*m,this._y=c*f*A+u*h*m,this._z=c*h*m-u*f*A,this._w=c*h*A-u*f*m;break;case"XZY":this._x=u*h*A-c*f*m,this._y=c*f*A-u*h*m,this._z=c*h*m+u*f*A,this._w=c*h*A+u*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],A=t[10],u=n+o+A;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>A){const f=2*Math.sqrt(1+n-o-A);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>A){const f=2*Math.sqrt(1+o-n-A);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+A-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),A=Math.sin((1-t)*h)/c,u=Math.sin(t*h)/c;return this._w=a*A+this._w*u,this._x=n*A+this._x*u,this._y=i*A+this._y*u,this._z=r*A+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ih.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ih.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*i-o*n,h=l*n+o*t-r*i,A=l*i+r*n-a*t,u=-r*t-a*n-o*i;return this.x=c*l+u*-r+h*-o-A*-a,this.y=h*l+u*-a+A*-r-c*-o,this.z=A*l+u*-o+c*-a-h*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ro.copy(this).projectOnVector(e),this.sub(ro)}reflect(e){return this.sub(ro.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ro=new D,ih=new Mi;class ai{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){if(e.updateWorldMatrix(!1,!1),e.boundingBox!==void 0)e.boundingBox===null&&e.computeBoundingBox(),tr.copy(e.boundingBox),tr.applyMatrix4(e.matrixWorld),this.union(tr);else{const i=e.geometry;if(i!==void 0)if(t&&i.attributes!==void 0&&i.attributes.position!==void 0){const r=i.attributes.position;for(let a=0,o=r.count;a<o;a++)Hn.fromBufferAttribute(r,a).applyMatrix4(e.matrixWorld),this.expandByPoint(Hn)}else i.boundingBox===null&&i.computeBoundingBox(),tr.copy(i.boundingBox),tr.applyMatrix4(e.matrixWorld),this.union(tr)}const n=e.children;for(let i=0,r=n.length;i<r;i++)this.expandByObject(n[i],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Hn),Hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(es),Os.subVectors(this.max,es),nr.subVectors(e.a,es),ir.subVectors(e.b,es),rr.subVectors(e.c,es),oi.subVectors(ir,nr),li.subVectors(rr,ir),Li.subVectors(nr,rr);let t=[0,-oi.z,oi.y,0,-li.z,li.y,0,-Li.z,Li.y,oi.z,0,-oi.x,li.z,0,-li.x,Li.z,0,-Li.x,-oi.y,oi.x,0,-li.y,li.x,0,-Li.y,Li.x,0];return!so(t,nr,ir,rr,Os)||(t=[1,0,0,0,1,0,0,0,1],!so(t,nr,ir,rr,Os))?!1:(Gs.crossVectors(oi,li),t=[Gs.x,Gs.y,Gs.z],so(t,nr,ir,rr,Os))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new D,new D,new D,new D,new D,new D,new D,new D],Hn=new D,tr=new ai,nr=new D,ir=new D,rr=new D,oi=new D,li=new D,Li=new D,es=new D,Os=new D,Gs=new D,Pi=new D;function so(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Pi.fromArray(s,r);const o=i.x*Math.abs(Pi.x)+i.y*Math.abs(Pi.y)+i.z*Math.abs(Pi.z),l=e.dot(Pi),c=t.dot(Pi),h=n.dot(Pi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const rg=new ai,ts=new D,ao=new D;class Qn{constructor(e=new D,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):rg.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ts.subVectors(e,this.center);const t=ts.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(ts,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ts.copy(e.center).add(ao)),this.expandByPoint(ts.copy(e.center).sub(ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zn=new D,oo=new D,ks=new D,ci=new D,lo=new D,Hs=new D,co=new D;class Ua{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=zn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(zn.copy(this.origin).addScaledVector(this.direction,t),zn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){oo.copy(e).add(t).multiplyScalar(.5),ks.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(oo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(ks),o=ci.dot(this.direction),l=-ci.dot(ks),c=ci.lengthSq(),h=Math.abs(1-a*a);let A,u,f,m;if(h>0)if(A=a*l-o,u=a*o-l,m=r*h,A>=0)if(u>=-m)if(u<=m){const p=1/h;A*=p,u*=p,f=A*(A+a*u+2*o)+u*(a*A+u+2*l)+c}else u=r,A=Math.max(0,-(a*u+o)),f=-A*A+u*(u+2*l)+c;else u=-r,A=Math.max(0,-(a*u+o)),f=-A*A+u*(u+2*l)+c;else u<=-m?(A=Math.max(0,-(-a*r+o)),u=A>0?-r:Math.min(Math.max(-r,-l),r),f=-A*A+u*(u+2*l)+c):u<=m?(A=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(A=Math.max(0,-(a*r+o)),u=A>0?r:Math.min(Math.max(-r,-l),r),f=-A*A+u*(u+2*l)+c);else u=a>0?-r:r,A=Math.max(0,-(a*u+o)),f=-A*A+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,A),i&&i.copy(oo).addScaledVector(ks,u),f}intersectSphere(e,t){zn.subVectors(e.center,this.origin);const n=zn.dot(this.direction),i=zn.dot(zn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,A=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),A>=0?(o=(e.min.z-u.z)*A,l=(e.max.z-u.z)*A):(o=(e.max.z-u.z)*A,l=(e.min.z-u.z)*A),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,zn)!==null}intersectTriangle(e,t,n,i,r){lo.subVectors(t,e),Hs.subVectors(n,e),co.crossVectors(lo,Hs);let a=this.direction.dot(co),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ci.subVectors(this.origin,e);const l=o*this.direction.dot(Hs.crossVectors(ci,Hs));if(l<0)return null;const c=o*this.direction.dot(lo.cross(ci));if(c<0||l+c>a)return null;const h=-o*ci.dot(co);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ne{constructor(e,t,n,i,r,a,o,l,c,h,A,u,f,m,p,d){Ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,A,u,f,m,p,d)}set(e,t,n,i,r,a,o,l,c,h,A,u,f,m,p,d){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=A,g[14]=u,g[3]=f,g[7]=m,g[11]=p,g[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ne().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/sr.setFromMatrixColumn(e,0).length(),r=1/sr.setFromMatrixColumn(e,1).length(),a=1/sr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),A=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*A,m=o*h,p=o*A;t[0]=l*h,t[4]=-l*A,t[8]=c,t[1]=f+m*c,t[5]=u-p*c,t[9]=-o*l,t[2]=p-u*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){const u=l*h,f=l*A,m=c*h,p=c*A;t[0]=u+p*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*A,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=p+u*o,t[10]=a*l}else if(e.order==="ZXY"){const u=l*h,f=l*A,m=c*h,p=c*A;t[0]=u-p*o,t[4]=-a*A,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=p-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const u=a*h,f=a*A,m=o*h,p=o*A;t[0]=l*h,t[4]=m*c-f,t[8]=u*c+p,t[1]=l*A,t[5]=p*c+u,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const u=a*l,f=a*c,m=o*l,p=o*c;t[0]=l*h,t[4]=p-u*A,t[8]=m*A+f,t[1]=A,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*A+m,t[10]=u-p*A}else if(e.order==="XZY"){const u=a*l,f=a*c,m=o*l,p=o*c;t[0]=l*h,t[4]=-A,t[8]=c*h,t[1]=u*A+p,t[5]=a*h,t[9]=f*A-m,t[2]=m*A-f,t[6]=o*h,t[10]=p*A+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sg,e,ag)}lookAt(e,t,n){const i=this.elements;return jt.subVectors(e,t),jt.lengthSq()===0&&(jt.z=1),jt.normalize(),hi.crossVectors(n,jt),hi.lengthSq()===0&&(Math.abs(n.z)===1?jt.x+=1e-4:jt.z+=1e-4,jt.normalize(),hi.crossVectors(n,jt)),hi.normalize(),zs.crossVectors(jt,hi),i[0]=hi.x,i[4]=zs.x,i[8]=jt.x,i[1]=hi.y,i[5]=zs.y,i[9]=jt.y,i[2]=hi.z,i[6]=zs.z,i[10]=jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],A=n[5],u=n[9],f=n[13],m=n[2],p=n[6],d=n[10],g=n[14],x=n[3],_=n[7],E=n[11],C=n[15],y=i[0],w=i[4],b=i[8],v=i[12],M=i[1],H=i[5],X=i[9],L=i[13],U=i[2],N=i[6],W=i[10],Q=i[14],z=i[3],Z=i[7],J=i[11],le=i[15];return r[0]=a*y+o*M+l*U+c*z,r[4]=a*w+o*H+l*N+c*Z,r[8]=a*b+o*X+l*W+c*J,r[12]=a*v+o*L+l*Q+c*le,r[1]=h*y+A*M+u*U+f*z,r[5]=h*w+A*H+u*N+f*Z,r[9]=h*b+A*X+u*W+f*J,r[13]=h*v+A*L+u*Q+f*le,r[2]=m*y+p*M+d*U+g*z,r[6]=m*w+p*H+d*N+g*Z,r[10]=m*b+p*X+d*W+g*J,r[14]=m*v+p*L+d*Q+g*le,r[3]=x*y+_*M+E*U+C*z,r[7]=x*w+_*H+E*N+C*Z,r[11]=x*b+_*X+E*W+C*J,r[15]=x*v+_*L+E*Q+C*le,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],A=e[6],u=e[10],f=e[14],m=e[3],p=e[7],d=e[11],g=e[15];return m*(+r*l*A-i*c*A-r*o*u+n*c*u+i*o*f-n*l*f)+p*(+t*l*f-t*c*u+r*a*u-i*a*f+i*c*h-r*l*h)+d*(+t*c*A-t*o*f-r*a*A+n*a*f+r*o*h-n*c*h)+g*(-i*o*h-t*l*A+t*o*u+i*a*A-n*a*u+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],A=e[9],u=e[10],f=e[11],m=e[12],p=e[13],d=e[14],g=e[15],x=A*d*c-p*u*c+p*l*f-o*d*f-A*l*g+o*u*g,_=m*u*c-h*d*c-m*l*f+a*d*f+h*l*g-a*u*g,E=h*p*c-m*A*c+m*o*f-a*p*f-h*o*g+a*A*g,C=m*A*l-h*p*l-m*o*u+a*p*u+h*o*d-a*A*d,y=t*x+n*_+i*E+r*C;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/y;return e[0]=x*w,e[1]=(p*u*r-A*d*r-p*i*f+n*d*f+A*i*g-n*u*g)*w,e[2]=(o*d*r-p*l*r+p*i*c-n*d*c-o*i*g+n*l*g)*w,e[3]=(A*l*r-o*u*r-A*i*c+n*u*c+o*i*f-n*l*f)*w,e[4]=_*w,e[5]=(h*d*r-m*u*r+m*i*f-t*d*f-h*i*g+t*u*g)*w,e[6]=(m*l*r-a*d*r-m*i*c+t*d*c+a*i*g-t*l*g)*w,e[7]=(a*u*r-h*l*r+h*i*c-t*u*c-a*i*f+t*l*f)*w,e[8]=E*w,e[9]=(m*A*r-h*p*r-m*n*f+t*p*f+h*n*g-t*A*g)*w,e[10]=(a*p*r-m*o*r+m*n*c-t*p*c-a*n*g+t*o*g)*w,e[11]=(h*o*r-a*A*r-h*n*c+t*A*c+a*n*f-t*o*f)*w,e[12]=C*w,e[13]=(h*p*i-m*A*i+m*n*u-t*p*u-h*n*d+t*A*d)*w,e[14]=(m*o*i-a*p*i-m*n*l+t*p*l+a*n*d-t*o*d)*w,e[15]=(a*A*i-h*o*i+h*n*l-t*A*l-a*n*u+t*o*u)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,A=o+o,u=r*c,f=r*h,m=r*A,p=a*h,d=a*A,g=o*A,x=l*c,_=l*h,E=l*A,C=n.x,y=n.y,w=n.z;return i[0]=(1-(p+g))*C,i[1]=(f+E)*C,i[2]=(m-_)*C,i[3]=0,i[4]=(f-E)*y,i[5]=(1-(u+g))*y,i[6]=(d+x)*y,i[7]=0,i[8]=(m+_)*w,i[9]=(d-x)*w,i[10]=(1-(u+p))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=sr.set(i[0],i[1],i[2]).length();const a=sr.set(i[4],i[5],i[6]).length(),o=sr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],_n.copy(this);const c=1/r,h=1/a,A=1/o;return _n.elements[0]*=c,_n.elements[1]*=c,_n.elements[2]*=c,_n.elements[4]*=h,_n.elements[5]*=h,_n.elements[6]*=h,_n.elements[8]*=A,_n.elements[9]*=A,_n.elements[10]*=A,t.setFromRotationMatrix(_n),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=Zn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),A=(t+e)/(t-e),u=(n+i)/(n-i);let f,m;if(o===Zn)f=-(a+r)/(a-r),m=-2*a*r/(a-r);else if(o===Ta)f=-a/(a-r),m=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=A,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Zn){const l=this.elements,c=1/(t-e),h=1/(n-i),A=1/(a-r),u=(t+e)*c,f=(n+i)*h;let m,p;if(o===Zn)m=(a+r)*A,p=-2*A;else if(o===Ta)m=r*A,p=-1*A;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=p,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const sr=new D,_n=new Ne,sg=new D(0,0,0),ag=new D(1,1,1),hi=new D,zs=new D,jt=new D,rh=new Ne,sh=new Mi;class Na{constructor(e=0,t=0,n=0,i=Na.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],A=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-wt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-A,r),this._z=0);break;case"ZXY":this._x=Math.asin(wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-A,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-wt(A,-1,1)),Math.abs(A)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(wt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-A,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return sh.setFromEuler(this),this.setFromQuaternion(sh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Na.DEFAULT_ORDER="XYZ";class OA{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let og=0;const ah=new D,ar=new Mi,Vn=new Ne,Vs=new D,ns=new D,lg=new D,cg=new Mi,oh=new D(1,0,0),lh=new D(0,1,0),ch=new D(0,0,1),hg={type:"added"},hh={type:"removed"};class it extends qr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:og++}),this.uuid=yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=it.DEFAULT_UP.clone();const e=new D,t=new Na,n=new Mi,i=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Ue}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=it.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new OA,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ar.setFromAxisAngle(e,t),this.quaternion.multiply(ar),this}rotateOnWorldAxis(e,t){return ar.setFromAxisAngle(e,t),this.quaternion.premultiply(ar),this}rotateX(e){return this.rotateOnAxis(oh,e)}rotateY(e){return this.rotateOnAxis(lh,e)}rotateZ(e){return this.rotateOnAxis(ch,e)}translateOnAxis(e,t){return ah.copy(e).applyQuaternion(this.quaternion),this.position.add(ah.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(oh,e)}translateY(e){return this.translateOnAxis(lh,e)}translateZ(e){return this.translateOnAxis(ch,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Vs.copy(e):Vs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(ns,Vs,this.up):Vn.lookAt(Vs,ns,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),ar.setFromRotationMatrix(Vn),this.quaternion.premultiply(ar.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(hg)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(hh)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){for(let e=0;e<this.children.length;e++){const t=this.children[e];t.parent=null,t.dispatchEvent(hh)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t){let n=[];this[e]===t&&n.push(this);for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectsByProperty(e,t);a.length>0&&(n=n.concat(a))}return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,e,lg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ns,cg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const A=l[c];r(e.shapes,A)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),A=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),A.length>0&&(n.shapes=A),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}it.DEFAULT_UP=new D(0,1,0);it.DEFAULT_MATRIX_AUTO_UPDATE=!0;it.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const En=new D,Wn=new D,ho=new D,qn=new D,or=new D,lr=new D,uh=new D,uo=new D,Ao=new D,fo=new D;let Ws=!1;class xn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),En.subVectors(e,t),i.cross(En);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){En.subVectors(i,t),Wn.subVectors(n,t),ho.subVectors(e,t);const a=En.dot(En),o=En.dot(Wn),l=En.dot(ho),c=Wn.dot(Wn),h=Wn.dot(ho),A=a*c-o*o;if(A===0)return r.set(-2,-1,-1);const u=1/A,f=(c*l-o*h)*u,m=(a*h-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,qn),qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getUV(e,t,n,i,r,a,o,l){return Ws===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ws=!0),this.getInterpolation(e,t,n,i,r,a,o,l)}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,qn),l.setScalar(0),l.addScaledVector(r,qn.x),l.addScaledVector(a,qn.y),l.addScaledVector(o,qn.z),l}static isFrontFacing(e,t,n,i){return En.subVectors(n,t),Wn.subVectors(e,t),En.cross(Wn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return En.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),En.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return xn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return Ws===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ws=!0),xn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return xn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;or.subVectors(i,n),lr.subVectors(r,n),uo.subVectors(e,n);const l=or.dot(uo),c=lr.dot(uo);if(l<=0&&c<=0)return t.copy(n);Ao.subVectors(e,i);const h=or.dot(Ao),A=lr.dot(Ao);if(h>=0&&A<=h)return t.copy(i);const u=l*A-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(or,a);fo.subVectors(e,r);const f=or.dot(fo),m=lr.dot(fo);if(m>=0&&f<=m)return t.copy(r);const p=f*c-l*m;if(p<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(n).addScaledVector(lr,o);const d=h*m-f*A;if(d<=0&&A-h>=0&&f-m>=0)return uh.subVectors(r,i),o=(A-h)/(A-h+(f-m)),t.copy(i).addScaledVector(uh,o);const g=1/(d+p+u);return a=p*g,o=u*g,t.copy(n).addScaledVector(or,a).addScaledVector(lr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}let ug=0;class Nn extends qr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=yn(),this.name="",this.type="Material",this.blending=wr,this.side=si,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=dA,this.blendDst=pA,this.blendEquation=_r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=$o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=eo,this.stencilZFail=eo,this.stencilZPass=eo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wr&&(n.blending=this.blending),this.side!==si&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const GA={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vn={h:0,s:0,l:0},qs={h:0,s:0,l:0};function po(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class we{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=xe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mn.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=mn.workingColorSpace){return this.r=e,this.g=t,this.b=n,mn.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=mn.workingColorSpace){if(e=Hl(e,1),t=wt(t,0,1),n=wt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=po(a,r,e+1/3),this.g=po(a,r,e),this.b=po(a,r,e-1/3)}return mn.toWorkingColorSpace(this,i),this}setStyle(e,t=xe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=xe){const n=GA[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tr(e.r),this.g=Tr(e.g),this.b=Tr(e.b),this}copyLinearToSRGB(e){return this.r=no(e.r),this.g=no(e.g),this.b=no(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=xe){return mn.fromWorkingColorSpace(Bt.copy(this),e),Math.round(wt(Bt.r*255,0,255))*65536+Math.round(wt(Bt.g*255,0,255))*256+Math.round(wt(Bt.b*255,0,255))}getHexString(e=xe){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mn.workingColorSpace){mn.fromWorkingColorSpace(Bt.copy(this),t);const n=Bt.r,i=Bt.g,r=Bt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const A=a-o;switch(c=h<=.5?A/(a+o):A/(2-a-o),a){case n:l=(i-r)/A+(i<r?6:0);break;case i:l=(r-n)/A+2;break;case r:l=(n-i)/A+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=mn.workingColorSpace){return mn.fromWorkingColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=xe){mn.fromWorkingColorSpace(Bt.copy(this),e);const t=Bt.r,n=Bt.g,i=Bt.b;return e!==xe?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(vn),vn.h+=e,vn.s+=t,vn.l+=n,this.setHSL(vn.h,vn.s,vn.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(vn),e.getHSL(qs);const n=_s(vn.h,qs.h,t),i=_s(vn.s,qs.s,t),r=_s(vn.l,qs.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new we;we.NAMES=GA;class _i extends Nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=gA,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const dt=new D,Xs=new ce;class Ht{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=cl,this.updateRange={offset:0,count:-1},this.gpuType=nn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Xs.fromBufferAttribute(this,t),Xs.applyMatrix3(e),this.setXY(t,Xs.x,Xs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix3(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyMatrix4(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.applyNormalMatrix(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dt.fromBufferAttribute(this,t),dt.transformDirection(e),this.setXYZ(t,dt.x,dt.y,dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$n(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$n(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$n(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$n(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array),r=Ke(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==cl&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class kA extends Ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class HA extends Ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Mn extends Ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ag=0;const on=new Ne,go=new it,cr=new D,Zt=new ai,is=new ai,vt=new D;class wn extends qr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=yn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(PA(e)?HA:kA)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ue().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return on.makeRotationFromQuaternion(e),this.applyMatrix4(on),this}rotateX(e){return on.makeRotationX(e),this.applyMatrix4(on),this}rotateY(e){return on.makeRotationY(e),this.applyMatrix4(on),this}rotateZ(e){return on.makeRotationZ(e),this.applyMatrix4(on),this}translate(e,t,n){return on.makeTranslation(e,t,n),this.applyMatrix4(on),this}scale(e,t,n){return on.makeScale(e,t,n),this.applyMatrix4(on),this}lookAt(e){return go.lookAt(e),go.updateMatrix(),this.applyMatrix4(go.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cr).negate(),this.translate(cr.x,cr.y,cr.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Mn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Zt.setFromBufferAttribute(r),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Zt.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Zt.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Zt.min),this.boundingBox.expandByPoint(Zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Zt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];is.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Zt.min,is.min),Zt.expandByPoint(vt),vt.addVectors(Zt.max,is.max),Zt.expandByPoint(vt)):(Zt.expandByPoint(is.min),Zt.expandByPoint(is.max))}Zt.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)vt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(vt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)vt.fromBufferAttribute(o,c),l&&(cr.fromBufferAttribute(e,c),vt.add(cr)),i=Math.max(i,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let M=0;M<o;M++)c[M]=new D,h[M]=new D;const A=new D,u=new D,f=new D,m=new ce,p=new ce,d=new ce,g=new D,x=new D;function _(M,H,X){A.fromArray(i,M*3),u.fromArray(i,H*3),f.fromArray(i,X*3),m.fromArray(a,M*2),p.fromArray(a,H*2),d.fromArray(a,X*2),u.sub(A),f.sub(A),p.sub(m),d.sub(m);const L=1/(p.x*d.y-d.x*p.y);isFinite(L)&&(g.copy(u).multiplyScalar(d.y).addScaledVector(f,-p.y).multiplyScalar(L),x.copy(f).multiplyScalar(p.x).addScaledVector(u,-d.x).multiplyScalar(L),c[M].add(g),c[H].add(g),c[X].add(g),h[M].add(x),h[H].add(x),h[X].add(x))}let E=this.groups;E.length===0&&(E=[{start:0,count:n.length}]);for(let M=0,H=E.length;M<H;++M){const X=E[M],L=X.start,U=X.count;for(let N=L,W=L+U;N<W;N+=3)_(n[N+0],n[N+1],n[N+2])}const C=new D,y=new D,w=new D,b=new D;function v(M){w.fromArray(r,M*3),b.copy(w);const H=c[M];C.copy(H),C.sub(w.multiplyScalar(w.dot(H))).normalize(),y.crossVectors(b,H);const L=y.dot(h[M])<0?-1:1;l[M*4]=C.x,l[M*4+1]=C.y,l[M*4+2]=C.z,l[M*4+3]=L}for(let M=0,H=E.length;M<H;++M){const X=E[M],L=X.start,U=X.count;for(let N=L,W=L+U;N<W;N+=3)v(n[N+0]),v(n[N+1]),v(n[N+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,A=new D;if(e)for(let u=0,f=e.count;u<f;u+=3){const m=e.getX(u+0),p=e.getX(u+1),d=e.getX(u+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,p),a.fromBufferAttribute(t,d),h.subVectors(a,r),A.subVectors(i,r),h.cross(A),o.fromBufferAttribute(n,m),l.fromBufferAttribute(n,p),c.fromBufferAttribute(n,d),o.add(h),l.add(h),c.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(p,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),A.subVectors(i,r),h.cross(A),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,A=o.normalized,u=new c.constructor(l.length*h);let f=0,m=0;for(let p=0,d=l.length;p<d;p++){o.isInterleavedBufferAttribute?f=l[p]*o.data.stride+o.offset:f=l[p]*h;for(let g=0;g<h;g++)u[m++]=c[f++]}return new Ht(u,h,A)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wn,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,A=c.length;h<A;h++){const u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let A=0,u=c.length;A<u;A++){const f=c[A];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],A=r[c];for(let u=0,f=A.length;u<f;u++)h.push(A[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const A=a[c];this.addGroup(A.start,A.count,A.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ah=new Ne,Ui=new Ua,Ys=new Qn,fh=new D,hr=new D,ur=new D,Ar=new D,mo=new D,Ks=new D,Js=new ce,js=new ce,Zs=new ce,dh=new D,ph=new D,gh=new D,$s=new D,ea=new D;class Vt extends it{constructor(e=new wn,t=new _i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){Ks.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],A=r[l];h!==0&&(mo.fromBufferAttribute(A,e),a?Ks.addScaledVector(mo,h):Ks.addScaledVector(mo.sub(t),h))}t.add(Ks)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ys.copy(n.boundingSphere),Ys.applyMatrix4(r),Ui.copy(e.ray).recast(e.near),!(Ys.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(Ys,fh)===null||Ui.origin.distanceToSquared(fh)>(e.far-e.near)**2))&&(Ah.copy(r).invert(),Ui.copy(e.ray).applyMatrix4(Ah),!(n.boundingBox!==null&&Ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ui)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,A=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,p=u.length;m<p;m++){const d=u[m],g=a[d.materialIndex],x=Math.max(d.start,f.start),_=Math.min(o.count,Math.min(d.start+d.count,f.start+f.count));for(let E=x,C=_;E<C;E+=3){const y=o.getX(E),w=o.getX(E+1),b=o.getX(E+2);i=ta(this,g,e,n,c,h,A,y,w,b),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=d.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),p=Math.min(o.count,f.start+f.count);for(let d=m,g=p;d<g;d+=3){const x=o.getX(d),_=o.getX(d+1),E=o.getX(d+2);i=ta(this,a,e,n,c,h,A,x,_,E),i&&(i.faceIndex=Math.floor(d/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,p=u.length;m<p;m++){const d=u[m],g=a[d.materialIndex],x=Math.max(d.start,f.start),_=Math.min(l.count,Math.min(d.start+d.count,f.start+f.count));for(let E=x,C=_;E<C;E+=3){const y=E,w=E+1,b=E+2;i=ta(this,g,e,n,c,h,A,y,w,b),i&&(i.faceIndex=Math.floor(E/3),i.face.materialIndex=d.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),p=Math.min(l.count,f.start+f.count);for(let d=m,g=p;d<g;d+=3){const x=d,_=d+1,E=d+2;i=ta(this,a,e,n,c,h,A,x,_,E),i&&(i.faceIndex=Math.floor(d/3),t.push(i))}}}}function fg(s,e,t,n,i,r,a,o){let l;if(e.side===Yt?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===si,o),l===null)return null;ea.copy(o),ea.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(ea);return c<t.near||c>t.far?null:{distance:c,point:ea.clone(),object:s}}function ta(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,hr),s.getVertexPosition(l,ur),s.getVertexPosition(c,Ar);const h=fg(s,e,t,n,hr,ur,Ar,$s);if(h){i&&(Js.fromBufferAttribute(i,o),js.fromBufferAttribute(i,l),Zs.fromBufferAttribute(i,c),h.uv=xn.getInterpolation($s,hr,ur,Ar,Js,js,Zs,new ce)),r&&(Js.fromBufferAttribute(r,o),js.fromBufferAttribute(r,l),Zs.fromBufferAttribute(r,c),h.uv1=xn.getInterpolation($s,hr,ur,Ar,Js,js,Zs,new ce),h.uv2=h.uv1),a&&(dh.fromBufferAttribute(a,o),ph.fromBufferAttribute(a,l),gh.fromBufferAttribute(a,c),h.normal=xn.getInterpolation($s,hr,ur,Ar,dh,ph,gh,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const A={a:o,b:l,c,normal:new D,materialIndex:0};xn.getNormal(hr,ur,Ar,A.normal),h.face=A}return h}class Ls extends wn{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],A=[];let u=0,f=0;m("z","y","x",-1,-1,n,t,e,a,r,0),m("z","y","x",1,-1,n,t,-e,a,r,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Mn(c,3)),this.setAttribute("normal",new Mn(h,3)),this.setAttribute("uv",new Mn(A,2));function m(p,d,g,x,_,E,C,y,w,b,v){const M=E/w,H=C/b,X=E/2,L=C/2,U=y/2,N=w+1,W=b+1;let Q=0,z=0;const Z=new D;for(let J=0;J<W;J++){const le=J*H-L;for(let P=0;P<N;P++){const ee=P*M-X;Z[p]=ee*x,Z[d]=le*_,Z[g]=U,c.push(Z.x,Z.y,Z.z),Z[p]=0,Z[d]=0,Z[g]=y>0?1:-1,h.push(Z.x,Z.y,Z.z),A.push(P/w),A.push(1-J/b),Q+=1}}for(let J=0;J<b;J++)for(let le=0;le<w;le++){const P=u+le+N*J,ee=u+le+N*(J+1),$=u+(le+1)+N*(J+1),se=u+(le+1)+N*J;l.push(P,ee,se),l.push(ee,$,se),z+=6}o.addGroup(f,z,v),f+=z,u+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ls(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function zr(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Gt(s){const e={};for(let t=0;t<s.length;t++){const n=zr(s[t]);for(const i in n)e[i]=n[i]}return e}function dg(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function zA(s){return s.getRenderTarget()===null?s.outputColorSpace:pn}const bs={clone:zr,merge:Gt};var pg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,gg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Lt extends Nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pg,this.fragmentShader=gg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=zr(e.uniforms),this.uniformsGroups=dg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class VA extends it{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=Zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class kt extends VA{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ms*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hr*2*Math.atan(Math.tan(ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ms*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fr=-90,dr=1;class mg extends it{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null;const i=new kt(fr,dr,e,t);i.layers=this.layers,this.add(i);const r=new kt(fr,dr,e,t);r.layers=this.layers,this.add(r);const a=new kt(fr,dr,e,t);a.layers=this.layers,this.add(a);const o=new kt(fr,dr,e,t);o.layers=this.layers,this.add(o);const l=new kt(fr,dr,e,t);l.layers=this.layers,this.add(l);const c=new kt(fr,dr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ta)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[i,r,a,o,l,c]=this.children,h=e.getRenderTarget(),A=e.toneMapping,u=e.xr.enabled;e.toneMapping=Pn,e.xr.enabled=!1;const f=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0),e.render(t,i),e.setRenderTarget(n,1),e.render(t,r),e.setRenderTarget(n,2),e.render(t,a),e.setRenderTarget(n,3),e.render(t,o),e.setRenderTarget(n,4),e.render(t,l),n.texture.generateMipmaps=f,e.setRenderTarget(n,5),e.render(t,c),e.setRenderTarget(h),e.toneMapping=A,e.xr.enabled=u,n.texture.needsPMREMUpdate=!0}}class WA extends It{constructor(e,t,n,i,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Qr,super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class _g extends Sn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Es("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ki?xe:ni),this.texture=new WA(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Rt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ls(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:zr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Yt,blending:xi});r.uniforms.tEquirect.value=t;const a=new Vt(i,r),o=t.minFilter;return t.minFilter===yi&&(t.minFilter=Rt),new mg(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const _o=new D,Eg=new D,vg=new Ue;class Oi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=_o.subVectors(n,t).cross(Eg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(_o),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vg.getNormalMatrix(e),i=this.coplanarPoint(_o).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new Qn,na=new D;class zl{constructor(e=new Oi,t=new Oi,n=new Oi,i=new Oi,r=new Oi,a=new Oi){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Zn){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],A=i[6],u=i[7],f=i[8],m=i[9],p=i[10],d=i[11],g=i[12],x=i[13],_=i[14],E=i[15];if(n[0].setComponents(l-r,u-c,d-f,E-g).normalize(),n[1].setComponents(l+r,u+c,d+f,E+g).normalize(),n[2].setComponents(l+a,u+h,d+m,E+x).normalize(),n[3].setComponents(l-a,u-h,d-m,E-x).normalize(),n[4].setComponents(l-o,u-A,d-p,E-_).normalize(),t===Zn)n[5].setComponents(l+o,u+A,d+p,E+_).normalize();else if(t===Ta)n[5].setComponents(o,A,p,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(na.x=i.normal.x>0?e.max.x:e.min.x,na.y=i.normal.y>0?e.max.y:e.min.y,na.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(na)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qA(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function xg(s,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const A=c.array,u=c.usage,f=s.createBuffer();s.bindBuffer(h,f),s.bufferData(h,A,u),c.onUploadCallback();let m;if(A instanceof Float32Array)m=s.FLOAT;else if(A instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)m=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else m=s.UNSIGNED_SHORT;else if(A instanceof Int16Array)m=s.SHORT;else if(A instanceof Uint32Array)m=s.UNSIGNED_INT;else if(A instanceof Int32Array)m=s.INT;else if(A instanceof Int8Array)m=s.BYTE;else if(A instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(A instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+A);return{buffer:f,type:m,bytesPerElement:A.BYTES_PER_ELEMENT,version:c.version}}function r(c,h,A){const u=h.array,f=h.updateRange;s.bindBuffer(A,c),f.count===-1?s.bufferSubData(A,0,u):(t?s.bufferSubData(A,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(A,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const A=n.get(c);A===void 0?n.set(c,i(c,h)):A.version<c.version&&(r(A.buffer,c,h),A.version=c.version)}return{get:a,remove:o,update:l}}class Vl extends wn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,A=e/o,u=t/l,f=[],m=[],p=[],d=[];for(let g=0;g<h;g++){const x=g*u-a;for(let _=0;_<c;_++){const E=_*A-r;m.push(E,-x,0),p.push(0,0,1),d.push(_/o),d.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<o;x++){const _=x+c*g,E=x+c*(g+1),C=x+1+c*(g+1),y=x+1+c*g;f.push(_,E,y),f.push(E,C,y)}this.setIndex(f),this.setAttribute("position",new Mn(m,3)),this.setAttribute("normal",new Mn(p,3)),this.setAttribute("uv",new Mn(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.width,e.height,e.widthSegments,e.heightSegments)}}var Cg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ig=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yg=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Sg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Tg="vec3 transformed = vec3( position );",bg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Rg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Pg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ug=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ng=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Og=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Gg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,kg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Hg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zg=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Vg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kg=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Jg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,jg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$g=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,em=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,im=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,am=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,om=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,cm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,hm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,um=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Am=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,gm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`,mm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_m=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Em=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometry.viewDir, geometry.normal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,xm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Im=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ym=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Sm=`#ifdef USE_MAP
	diffuseColor *= texture2D( map, vMapUv );
#endif`,Mm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rm=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Lm=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Pm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Um=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,Nm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Om=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Gm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,km=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Hm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ym=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Km=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$m=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,e_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,t_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,n_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,i_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,r_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,s_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,a_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,o_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,l_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,h_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,u_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,A_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,f_=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,d_=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,p_=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,g_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const m_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,__=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,E_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,x_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,C_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,I_=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,y_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,S_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,M_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,w_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,T_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,b_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,B_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,R_=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,D_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,P_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,N_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,F_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Q_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,O_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,H_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,z_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,q_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,X_=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Y_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,K_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,J_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Pe={alphamap_fragment:Cg,alphamap_pars_fragment:Ig,alphatest_fragment:yg,alphatest_pars_fragment:Sg,aomap_fragment:Mg,aomap_pars_fragment:wg,begin_vertex:Tg,beginnormal_vertex:bg,bsdfs:Bg,iridescence_fragment:Rg,bumpmap_pars_fragment:Dg,clipping_planes_fragment:Lg,clipping_planes_pars_fragment:Pg,clipping_planes_pars_vertex:Ug,clipping_planes_vertex:Ng,color_fragment:Fg,color_pars_fragment:Qg,color_pars_vertex:Og,color_vertex:Gg,common:kg,cube_uv_reflection_fragment:Hg,defaultnormal_vertex:zg,displacementmap_pars_vertex:Vg,displacementmap_vertex:Wg,emissivemap_fragment:qg,emissivemap_pars_fragment:Xg,encodings_fragment:Yg,encodings_pars_fragment:Kg,envmap_fragment:Jg,envmap_common_pars_fragment:jg,envmap_pars_fragment:Zg,envmap_pars_vertex:$g,envmap_physical_pars_fragment:um,envmap_vertex:em,fog_vertex:tm,fog_pars_vertex:nm,fog_fragment:im,fog_pars_fragment:rm,gradientmap_pars_fragment:sm,lightmap_fragment:am,lightmap_pars_fragment:om,lights_lambert_fragment:lm,lights_lambert_pars_fragment:cm,lights_pars_begin:hm,lights_toon_fragment:Am,lights_toon_pars_fragment:fm,lights_phong_fragment:dm,lights_phong_pars_fragment:pm,lights_physical_fragment:gm,lights_physical_pars_fragment:mm,lights_fragment_begin:_m,lights_fragment_maps:Em,lights_fragment_end:vm,logdepthbuf_fragment:xm,logdepthbuf_pars_fragment:Cm,logdepthbuf_pars_vertex:Im,logdepthbuf_vertex:ym,map_fragment:Sm,map_pars_fragment:Mm,map_particle_fragment:wm,map_particle_pars_fragment:Tm,metalnessmap_fragment:bm,metalnessmap_pars_fragment:Bm,morphcolor_vertex:Rm,morphnormal_vertex:Dm,morphtarget_pars_vertex:Lm,morphtarget_vertex:Pm,normal_fragment_begin:Um,normal_fragment_maps:Nm,normal_pars_fragment:Fm,normal_pars_vertex:Qm,normal_vertex:Om,normalmap_pars_fragment:Gm,clearcoat_normal_fragment_begin:km,clearcoat_normal_fragment_maps:Hm,clearcoat_pars_fragment:zm,iridescence_pars_fragment:Vm,output_fragment:Wm,packing:qm,premultiplied_alpha_fragment:Xm,project_vertex:Ym,dithering_fragment:Km,dithering_pars_fragment:Jm,roughnessmap_fragment:jm,roughnessmap_pars_fragment:Zm,shadowmap_pars_fragment:$m,shadowmap_pars_vertex:e_,shadowmap_vertex:t_,shadowmask_pars_fragment:n_,skinbase_vertex:i_,skinning_pars_vertex:r_,skinning_vertex:s_,skinnormal_vertex:a_,specularmap_fragment:o_,specularmap_pars_fragment:l_,tonemapping_fragment:c_,tonemapping_pars_fragment:h_,transmission_fragment:u_,transmission_pars_fragment:A_,uv_pars_fragment:f_,uv_pars_vertex:d_,uv_vertex:p_,worldpos_vertex:g_,background_vert:m_,background_frag:__,backgroundCube_vert:E_,backgroundCube_frag:v_,cube_vert:x_,cube_frag:C_,depth_vert:I_,depth_frag:y_,distanceRGBA_vert:S_,distanceRGBA_frag:M_,equirect_vert:w_,equirect_frag:T_,linedashed_vert:b_,linedashed_frag:B_,meshbasic_vert:R_,meshbasic_frag:D_,meshlambert_vert:L_,meshlambert_frag:P_,meshmatcap_vert:U_,meshmatcap_frag:N_,meshnormal_vert:F_,meshnormal_frag:Q_,meshphong_vert:O_,meshphong_frag:G_,meshphysical_vert:k_,meshphysical_frag:H_,meshtoon_vert:z_,meshtoon_frag:V_,points_vert:W_,points_frag:q_,shadow_vert:X_,shadow_frag:Y_,sprite_vert:K_,sprite_frag:J_},re={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ue}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ue},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0},uvTransform:{value:new Ue}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ue},alphaMap:{value:null},alphaMapTransform:{value:new Ue},alphaTest:{value:0}}},bn={basic:{uniforms:Gt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Pe.meshbasic_vert,fragmentShader:Pe.meshbasic_frag},lambert:{uniforms:Gt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new we(0)}}]),vertexShader:Pe.meshlambert_vert,fragmentShader:Pe.meshlambert_frag},phong:{uniforms:Gt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30}}]),vertexShader:Pe.meshphong_vert,fragmentShader:Pe.meshphong_frag},standard:{uniforms:Gt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Pe.meshphysical_vert,fragmentShader:Pe.meshphysical_frag},toon:{uniforms:Gt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new we(0)}}]),vertexShader:Pe.meshtoon_vert,fragmentShader:Pe.meshtoon_frag},matcap:{uniforms:Gt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Pe.meshmatcap_vert,fragmentShader:Pe.meshmatcap_frag},points:{uniforms:Gt([re.points,re.fog]),vertexShader:Pe.points_vert,fragmentShader:Pe.points_frag},dashed:{uniforms:Gt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Pe.linedashed_vert,fragmentShader:Pe.linedashed_frag},depth:{uniforms:Gt([re.common,re.displacementmap]),vertexShader:Pe.depth_vert,fragmentShader:Pe.depth_frag},normal:{uniforms:Gt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Pe.meshnormal_vert,fragmentShader:Pe.meshnormal_frag},sprite:{uniforms:Gt([re.sprite,re.fog]),vertexShader:Pe.sprite_vert,fragmentShader:Pe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Pe.background_vert,fragmentShader:Pe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Pe.backgroundCube_vert,fragmentShader:Pe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Pe.cube_vert,fragmentShader:Pe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Pe.equirect_vert,fragmentShader:Pe.equirect_frag},distanceRGBA:{uniforms:Gt([re.common,re.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Pe.distanceRGBA_vert,fragmentShader:Pe.distanceRGBA_frag},shadow:{uniforms:Gt([re.lights,re.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:Pe.shadow_vert,fragmentShader:Pe.shadow_frag}};bn.physical={uniforms:Gt([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ue},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ue},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ue},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ue},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ue},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ue},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ue}}]),vertexShader:Pe.meshphysical_vert,fragmentShader:Pe.meshphysical_frag};const ia={r:0,b:0,g:0};function j_(s,e,t,n,i,r,a){const o=new we(0);let l=r===!0?0:1,c,h,A=null,u=0,f=null;function m(d,g){let x=!1,_=g.isScene===!0?g.background:null;switch(_&&_.isTexture&&(_=(g.backgroundBlurriness>0?t:e).get(_)),_===null?p(o,l):_&&_.isColor&&(p(_,1),x=!0),s.xr.getEnvironmentBlendMode()){case"opaque":x=!0;break;case"additive":n.buffers.color.setClear(0,0,0,1,a),x=!0;break;case"alpha-blend":n.buffers.color.setClear(0,0,0,0,a),x=!0;break}(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Pa)?(h===void 0&&(h=new Vt(new Ls(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:zr(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:Yt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(y,w,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,h.material.toneMapped=_.colorSpace!==xe,(A!==_||u!==_.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,A=_,u=_.version,f=s.toneMapping),h.layers.enableAll(),d.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new Vt(new Vl(2,2),new Lt({name:"BackgroundMaterial",uniforms:zr(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=_.colorSpace!==xe,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(A!==_||u!==_.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,A=_,u=_.version,f=s.toneMapping),c.layers.enableAll(),d.unshift(c,c.geometry,c.material,0,0,null))}function p(d,g){d.getRGB(ia,zA(s)),n.buffers.color.setClear(ia.r,ia.g,ia.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(d,g=1){o.set(d),l=g,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(d){l=d,p(o,l)},render:m}}function Z_(s,e,t,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=d(null);let c=l,h=!1;function A(U,N,W,Q,z){let Z=!1;if(a){const J=p(Q,W,N);c!==J&&(c=J,f(c.object)),Z=g(U,Q,W,z),Z&&x(U,Q,W,z)}else{const J=N.wireframe===!0;(c.geometry!==Q.id||c.program!==W.id||c.wireframe!==J)&&(c.geometry=Q.id,c.program=W.id,c.wireframe=J,Z=!0)}z!==null&&t.update(z,s.ELEMENT_ARRAY_BUFFER),(Z||h)&&(h=!1,b(U,N,W,Q),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function u(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(U){return n.isWebGL2?s.bindVertexArray(U):r.bindVertexArrayOES(U)}function m(U){return n.isWebGL2?s.deleteVertexArray(U):r.deleteVertexArrayOES(U)}function p(U,N,W){const Q=W.wireframe===!0;let z=o[U.id];z===void 0&&(z={},o[U.id]=z);let Z=z[N.id];Z===void 0&&(Z={},z[N.id]=Z);let J=Z[Q];return J===void 0&&(J=d(u()),Z[Q]=J),J}function d(U){const N=[],W=[],Q=[];for(let z=0;z<i;z++)N[z]=0,W[z]=0,Q[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:W,attributeDivisors:Q,object:U,attributes:{},index:null}}function g(U,N,W,Q){const z=c.attributes,Z=N.attributes;let J=0;const le=W.getAttributes();for(const P in le)if(le[P].location>=0){const $=z[P];let se=Z[P];if(se===void 0&&(P==="instanceMatrix"&&U.instanceMatrix&&(se=U.instanceMatrix),P==="instanceColor"&&U.instanceColor&&(se=U.instanceColor)),$===void 0||$.attribute!==se||se&&$.data!==se.data)return!0;J++}return c.attributesNum!==J||c.index!==Q}function x(U,N,W,Q){const z={},Z=N.attributes;let J=0;const le=W.getAttributes();for(const P in le)if(le[P].location>=0){let $=Z[P];$===void 0&&(P==="instanceMatrix"&&U.instanceMatrix&&($=U.instanceMatrix),P==="instanceColor"&&U.instanceColor&&($=U.instanceColor));const se={};se.attribute=$,$&&$.data&&(se.data=$.data),z[P]=se,J++}c.attributes=z,c.attributesNum=J,c.index=Q}function _(){const U=c.newAttributes;for(let N=0,W=U.length;N<W;N++)U[N]=0}function E(U){C(U,0)}function C(U,N){const W=c.newAttributes,Q=c.enabledAttributes,z=c.attributeDivisors;W[U]=1,Q[U]===0&&(s.enableVertexAttribArray(U),Q[U]=1),z[U]!==N&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](U,N),z[U]=N)}function y(){const U=c.newAttributes,N=c.enabledAttributes;for(let W=0,Q=N.length;W<Q;W++)N[W]!==U[W]&&(s.disableVertexAttribArray(W),N[W]=0)}function w(U,N,W,Q,z,Z,J){J===!0?s.vertexAttribIPointer(U,N,W,z,Z):s.vertexAttribPointer(U,N,W,Q,z,Z)}function b(U,N,W,Q){if(n.isWebGL2===!1&&(U.isInstancedMesh||Q.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const z=Q.attributes,Z=W.getAttributes(),J=N.defaultAttributeValues;for(const le in Z){const P=Z[le];if(P.location>=0){let ee=z[le];if(ee===void 0&&(le==="instanceMatrix"&&U.instanceMatrix&&(ee=U.instanceMatrix),le==="instanceColor"&&U.instanceColor&&(ee=U.instanceColor)),ee!==void 0){const $=ee.normalized,se=ee.itemSize,he=t.get(ee);if(he===void 0)continue;const me=he.buffer,Be=he.type,Ie=he.bytesPerElement,ot=n.isWebGL2===!0&&(Be===s.INT||Be===s.UNSIGNED_INT||ee.gpuType===CA);if(ee.isInterleavedBufferAttribute){const Oe=ee.data,G=Oe.stride,ht=ee.offset;if(Oe.isInstancedInterleavedBuffer){for(let _e=0;_e<P.locationSize;_e++)C(P.location+_e,Oe.meshPerAttribute);U.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=Oe.meshPerAttribute*Oe.count)}else for(let _e=0;_e<P.locationSize;_e++)E(P.location+_e);s.bindBuffer(s.ARRAY_BUFFER,me);for(let _e=0;_e<P.locationSize;_e++)w(P.location+_e,se/P.locationSize,Be,$,G*Ie,(ht+se/P.locationSize*_e)*Ie,ot)}else{if(ee.isInstancedBufferAttribute){for(let Oe=0;Oe<P.locationSize;Oe++)C(P.location+Oe,ee.meshPerAttribute);U.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Oe=0;Oe<P.locationSize;Oe++)E(P.location+Oe);s.bindBuffer(s.ARRAY_BUFFER,me);for(let Oe=0;Oe<P.locationSize;Oe++)w(P.location+Oe,se/P.locationSize,Be,$,se*Ie,se/P.locationSize*Oe*Ie,ot)}}else if(J!==void 0){const $=J[le];if($!==void 0)switch($.length){case 2:s.vertexAttrib2fv(P.location,$);break;case 3:s.vertexAttrib3fv(P.location,$);break;case 4:s.vertexAttrib4fv(P.location,$);break;default:s.vertexAttrib1fv(P.location,$)}}}}y()}function v(){X();for(const U in o){const N=o[U];for(const W in N){const Q=N[W];for(const z in Q)m(Q[z].object),delete Q[z];delete N[W]}delete o[U]}}function M(U){if(o[U.id]===void 0)return;const N=o[U.id];for(const W in N){const Q=N[W];for(const z in Q)m(Q[z].object),delete Q[z];delete N[W]}delete o[U.id]}function H(U){for(const N in o){const W=o[N];if(W[U.id]===void 0)continue;const Q=W[U.id];for(const z in Q)m(Q[z].object),delete Q[z];delete W[U.id]}}function X(){L(),h=!0,c!==l&&(c=l,f(c.object))}function L(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:A,reset:X,resetDefaultState:L,dispose:v,releaseStatesOfGeometry:M,releaseStatesOfProgram:H,initAttributes:_,enableAttribute:E,disableUnusedAttributes:y}}function $_(s,e,t,n){const i=n.isWebGL2;let r;function a(c){r=c}function o(c,h){s.drawArrays(r,c,h),t.update(h,r,1)}function l(c,h,A){if(A===0)return;let u,f;if(i)u=s,f="drawArraysInstanced";else if(u=e.get("ANGLE_instanced_arrays"),f="drawArraysInstancedANGLE",u===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}u[f](r,c,h,A),t.update(h,r,A)}this.setMode=a,this.render=o,this.renderInstances=l}function eE(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,A=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),d=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),g=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),_=u>0,E=a||e.has("OES_texture_float"),C=_&&E,y=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:A,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:d,maxVaryings:g,maxFragmentUniforms:x,vertexTextures:_,floatFragmentTextures:E,floatVertexTextures:C,maxSamples:y}}function tE(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Oi,o=new Ue,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(A,u){const f=A.length!==0||u||n!==0||i;return i=u,n=A.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(A,u){t=h(A,u,0)},this.setState=function(A,u,f){const m=A.clippingPlanes,p=A.clipIntersection,d=A.clipShadows,g=s.get(A);if(!i||m===null||m.length===0||r&&!d)r?h(null):c();else{const x=r?0:n,_=x*4;let E=g.clippingState||null;l.value=E,E=h(m,u,_,f);for(let C=0;C!==_;++C)E[C]=t[C];g.clippingState=E,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(A,u,f,m){const p=A!==null?A.length:0;let d=null;if(p!==0){if(d=l.value,m!==!0||d===null){const g=f+p*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(d===null||d.length<g)&&(d=new Float32Array(g));for(let _=0,E=f;_!==p;++_,E+=4)a.copy(A[_]).applyMatrix4(x,o),a.normal.toArray(d,E),d[E+3]=a.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=p,e.numIntersection=0,d}}function nE(s){let e=new WeakMap;function t(a,o){return o===el?a.mapping=Qr:o===tl&&(a.mapping=Or),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===el||o===tl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new _g(l.height/2);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Ps extends VA{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const xr=4,mh=[.125,.215,.35,.446,.526,.582],ki=20,Eo=new Ps,_h=new we;let vo=null;const Gi=(1+Math.sqrt(5))/2,pr=1/Gi,Eh=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,Gi,pr),new D(0,Gi,-pr),new D(pr,0,Gi),new D(-pr,0,Gi),new D(Gi,pr,0),new D(-Gi,pr,0)];class vh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){vo=this._renderer.getRenderTarget(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ih(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ch(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vo),e.scissorTest=!1,ra(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Qr||e.mapping===Or?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vo=this._renderer.getRenderTarget();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:sn,format:Tt,colorSpace:pn,depthBuffer:!1},i=xh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=iE(r)),this._blurMaterial=rE(r,e,t)}return i}_compileMaterial(e){const t=new Vt(this._lodPlanes[0],e);this._renderer.compile(t,Eo)}_sceneToCubeUV(e,t,n,i){const o=new kt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,A=h.autoClear,u=h.toneMapping;h.getClearColor(_h),h.toneMapping=Pn,h.autoClear=!1;const f=new _i({name:"PMREM.Background",side:Yt,depthWrite:!1,depthTest:!1}),m=new Vt(new Ls,f);let p=!1;const d=e.background;d?d.isColor&&(f.color.copy(d),e.background=null,p=!0):(f.color.copy(_h),p=!0);for(let g=0;g<6;g++){const x=g%3;x===0?(o.up.set(0,l[g],0),o.lookAt(c[g],0,0)):x===1?(o.up.set(0,0,l[g]),o.lookAt(0,c[g],0)):(o.up.set(0,l[g],0),o.lookAt(0,0,c[g]));const _=this._cubeSize;ra(i,x*_,g>2?_:0,_,_),h.setRenderTarget(i),p&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=u,h.autoClear=A,e.background=d}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Qr||e.mapping===Or;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ih()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ch());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Vt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ra(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Eo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=Eh[(i-1)%Eh.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,A=new Vt(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ki-1),p=r/m,d=isFinite(r)?1+Math.floor(h*p):ki;d>ki&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${ki}`);const g=[];let x=0;for(let w=0;w<ki;++w){const b=w/p,v=Math.exp(-b*b/2);g.push(v),w===0?x+=v:w<d&&(x+=2*v)}for(let w=0;w<g.length;w++)g[w]=g[w]/x;u.envMap.value=e.texture,u.samples.value=d,u.weights.value=g,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:_}=this;u.dTheta.value=m,u.mipInt.value=_-n;const E=this._sizeLods[i],C=3*E*(i>_-xr?i-_+xr:0),y=4*(this._cubeSize-E);ra(t,C,y,3*E,2*E),l.setRenderTarget(t),l.render(A,Eo)}}function iE(s){const e=[],t=[],n=[];let i=s;const r=s-xr+1+mh.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>s-xr?l=mh[a-s+xr-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,A=1+c,u=[h,h,A,h,A,A,h,h,A,A,h,A],f=6,m=6,p=3,d=2,g=1,x=new Float32Array(p*m*f),_=new Float32Array(d*m*f),E=new Float32Array(g*m*f);for(let y=0;y<f;y++){const w=y%3*2/3-1,b=y>2?0:-1,v=[w,b,0,w+2/3,b,0,w+2/3,b+1,0,w,b,0,w+2/3,b+1,0,w,b+1,0];x.set(v,p*m*y),_.set(u,d*m*y);const M=[y,y,y,y,y,y];E.set(M,g*m*y)}const C=new wn;C.setAttribute("position",new Ht(x,p)),C.setAttribute("uv",new Ht(_,d)),C.setAttribute("faceIndex",new Ht(E,g)),e.push(C),i>xr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function xh(s,e,t){const n=new Sn(s,e,t);return n.texture.mapping=Pa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ra(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function rE(s,e,t){const n=new Float32Array(ki),i=new D(0,1,0);return new Lt({name:"SphericalGaussianBlur",defines:{n:ki,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Ch(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Ih(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xi,depthTest:!1,depthWrite:!1})}function Wl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function sE(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===el||l===tl,h=l===Qr||l===Or;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let A=e.get(o);return t===null&&(t=new vh(s)),A=c?t.fromEquirectangular(o,A):t.fromCubemap(o,A),e.set(o,A),A.texture}else{if(e.has(o))return e.get(o).texture;{const A=o.image;if(c&&A&&A.height>0||h&&A&&i(A)){t===null&&(t=new vh(s));const u=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,u),o.addEventListener("dispose",r),u.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function aE(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function oE(s,e,t,n){const i={},r=new WeakMap;function a(A){const u=A.target;u.index!==null&&e.remove(u.index);for(const m in u.attributes)e.remove(u.attributes[m]);for(const m in u.morphAttributes){const p=u.morphAttributes[m];for(let d=0,g=p.length;d<g;d++)e.remove(p[d])}u.removeEventListener("dispose",a),delete i[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(A,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(A){const u=A.attributes;for(const m in u)e.update(u[m],s.ARRAY_BUFFER);const f=A.morphAttributes;for(const m in f){const p=f[m];for(let d=0,g=p.length;d<g;d++)e.update(p[d],s.ARRAY_BUFFER)}}function c(A){const u=[],f=A.index,m=A.attributes.position;let p=0;if(f!==null){const x=f.array;p=f.version;for(let _=0,E=x.length;_<E;_+=3){const C=x[_+0],y=x[_+1],w=x[_+2];u.push(C,y,y,w,w,C)}}else{const x=m.array;p=m.version;for(let _=0,E=x.length/3-1;_<E;_+=3){const C=_+0,y=_+1,w=_+2;u.push(C,y,y,w,w,C)}}const d=new(PA(u)?HA:kA)(u,1);d.version=p;const g=r.get(A);g&&e.remove(g),r.set(A,d)}function h(A){const u=r.get(A);if(u){const f=A.index;f!==null&&u.version<f.version&&c(A)}else c(A);return r.get(A)}return{get:o,update:l,getWireframeAttribute:h}}function lE(s,e,t,n){const i=n.isWebGL2;let r;function a(u){r=u}let o,l;function c(u){o=u.type,l=u.bytesPerElement}function h(u,f){s.drawElements(r,f,o,u*l),t.update(f,r,1)}function A(u,f,m){if(m===0)return;let p,d;if(i)p=s,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,f,o,u*l,m),t.update(f,r,m)}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=A}function cE(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function hE(s,e){return s[0]-e[0]}function uE(s,e){return Math.abs(e[1])-Math.abs(s[1])}function AE(s,e,t){const n={},i=new Float32Array(8),r=new WeakMap,a=new je,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,A){const u=c.morphTargetInfluences;if(e.isWebGL2===!0){const m=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,p=m!==void 0?m.length:0;let d=r.get(h);if(d===void 0||d.count!==p){let N=function(){L.dispose(),r.delete(h),h.removeEventListener("dispose",N)};var f=N;d!==void 0&&d.texture.dispose();const _=h.morphAttributes.position!==void 0,E=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,y=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],b=h.morphAttributes.color||[];let v=0;_===!0&&(v=1),E===!0&&(v=2),C===!0&&(v=3);let M=h.attributes.position.count*v,H=1;M>e.maxTextureSize&&(H=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const X=new Float32Array(M*H*4*p),L=new FA(X,M,H,p);L.type=nn,L.needsUpdate=!0;const U=v*4;for(let W=0;W<p;W++){const Q=y[W],z=w[W],Z=b[W],J=M*H*4*W;for(let le=0;le<Q.count;le++){const P=le*U;_===!0&&(a.fromBufferAttribute(Q,le),X[J+P+0]=a.x,X[J+P+1]=a.y,X[J+P+2]=a.z,X[J+P+3]=0),E===!0&&(a.fromBufferAttribute(z,le),X[J+P+4]=a.x,X[J+P+5]=a.y,X[J+P+6]=a.z,X[J+P+7]=0),C===!0&&(a.fromBufferAttribute(Z,le),X[J+P+8]=a.x,X[J+P+9]=a.y,X[J+P+10]=a.z,X[J+P+11]=Z.itemSize===4?a.w:1)}}d={count:p,texture:L,size:new ce(M,H)},r.set(h,d),h.addEventListener("dispose",N)}let g=0;for(let _=0;_<u.length;_++)g+=u[_];const x=h.morphTargetsRelative?1:1-g;A.getUniforms().setValue(s,"morphTargetBaseInfluence",x),A.getUniforms().setValue(s,"morphTargetInfluences",u),A.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),A.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}else{const m=u===void 0?0:u.length;let p=n[h.id];if(p===void 0||p.length!==m){p=[];for(let E=0;E<m;E++)p[E]=[E,0];n[h.id]=p}for(let E=0;E<m;E++){const C=p[E];C[0]=E,C[1]=u[E]}p.sort(uE);for(let E=0;E<8;E++)E<m&&p[E][1]?(o[E][0]=p[E][0],o[E][1]=p[E][1]):(o[E][0]=Number.MAX_SAFE_INTEGER,o[E][1]=0);o.sort(hE);const d=h.morphAttributes.position,g=h.morphAttributes.normal;let x=0;for(let E=0;E<8;E++){const C=o[E],y=C[0],w=C[1];y!==Number.MAX_SAFE_INTEGER&&w?(d&&h.getAttribute("morphTarget"+E)!==d[y]&&h.setAttribute("morphTarget"+E,d[y]),g&&h.getAttribute("morphNormal"+E)!==g[y]&&h.setAttribute("morphNormal"+E,g[y]),i[E]=w,x+=w):(d&&h.hasAttribute("morphTarget"+E)===!0&&h.deleteAttribute("morphTarget"+E),g&&h.hasAttribute("morphNormal"+E)===!0&&h.deleteAttribute("morphNormal"+E),i[E]=0)}const _=h.morphTargetsRelative?1:1-x;A.getUniforms().setValue(s,"morphTargetBaseInfluence",_),A.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function fE(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,A=e.get(l,h);return i.get(A)!==c&&(e.update(A),i.set(A,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER)),A}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const XA=new It,YA=new FA,KA=new QA,JA=new WA,yh=[],Sh=[],Mh=new Float32Array(16),wh=new Float32Array(9),Th=new Float32Array(4);function Xr(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=yh[i];if(r===void 0&&(r=new Float32Array(i),yh[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function mt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function _t(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Fa(s,e){let t=Sh[e];t===void 0&&(t=new Int32Array(e),Sh[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function dE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function pE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2fv(this.addr,e),_t(t,e)}}function gE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;s.uniform3fv(this.addr,e),_t(t,e)}}function mE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4fv(this.addr,e),_t(t,e)}}function _E(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(mt(t,n))return;Th.set(n),s.uniformMatrix2fv(this.addr,!1,Th),_t(t,n)}}function EE(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(mt(t,n))return;wh.set(n),s.uniformMatrix3fv(this.addr,!1,wh),_t(t,n)}}function vE(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(mt(t,n))return;Mh.set(n),s.uniformMatrix4fv(this.addr,!1,Mh),_t(t,n)}}function xE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function CE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2iv(this.addr,e),_t(t,e)}}function IE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;s.uniform3iv(this.addr,e),_t(t,e)}}function yE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4iv(this.addr,e),_t(t,e)}}function SE(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function ME(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;s.uniform2uiv(this.addr,e),_t(t,e)}}function wE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;s.uniform3uiv(this.addr,e),_t(t,e)}}function TE(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;s.uniform4uiv(this.addr,e),_t(t,e)}}function bE(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2D(e||XA,i)}function BE(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||KA,i)}function RE(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||JA,i)}function DE(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||YA,i)}function LE(s){switch(s){case 5126:return dE;case 35664:return pE;case 35665:return gE;case 35666:return mE;case 35674:return _E;case 35675:return EE;case 35676:return vE;case 5124:case 35670:return xE;case 35667:case 35671:return CE;case 35668:case 35672:return IE;case 35669:case 35673:return yE;case 5125:return SE;case 36294:return ME;case 36295:return wE;case 36296:return TE;case 35678:case 36198:case 36298:case 36306:case 35682:return bE;case 35679:case 36299:case 36307:return BE;case 35680:case 36300:case 36308:case 36293:return RE;case 36289:case 36303:case 36311:case 36292:return DE}}function PE(s,e){s.uniform1fv(this.addr,e)}function UE(s,e){const t=Xr(e,this.size,2);s.uniform2fv(this.addr,t)}function NE(s,e){const t=Xr(e,this.size,3);s.uniform3fv(this.addr,t)}function FE(s,e){const t=Xr(e,this.size,4);s.uniform4fv(this.addr,t)}function QE(s,e){const t=Xr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function OE(s,e){const t=Xr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function GE(s,e){const t=Xr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function kE(s,e){s.uniform1iv(this.addr,e)}function HE(s,e){s.uniform2iv(this.addr,e)}function zE(s,e){s.uniform3iv(this.addr,e)}function VE(s,e){s.uniform4iv(this.addr,e)}function WE(s,e){s.uniform1uiv(this.addr,e)}function qE(s,e){s.uniform2uiv(this.addr,e)}function XE(s,e){s.uniform3uiv(this.addr,e)}function YE(s,e){s.uniform4uiv(this.addr,e)}function KE(s,e,t){const n=this.cache,i=e.length,r=Fa(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||XA,r[a])}function JE(s,e,t){const n=this.cache,i=e.length,r=Fa(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||KA,r[a])}function jE(s,e,t){const n=this.cache,i=e.length,r=Fa(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||JA,r[a])}function ZE(s,e,t){const n=this.cache,i=e.length,r=Fa(t,i);mt(n,r)||(s.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||YA,r[a])}function $E(s){switch(s){case 5126:return PE;case 35664:return UE;case 35665:return NE;case 35666:return FE;case 35674:return QE;case 35675:return OE;case 35676:return GE;case 5124:case 35670:return kE;case 35667:case 35671:return HE;case 35668:case 35672:return zE;case 35669:case 35673:return VE;case 5125:return WE;case 36294:return qE;case 36295:return XE;case 36296:return YE;case 35678:case 36198:case 36298:case 36306:case 35682:return KE;case 35679:case 36299:case 36307:return JE;case 35680:case 36300:case 36308:case 36293:return jE;case 36289:case 36303:case 36311:case 36292:return ZE}}class e0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.setValue=LE(t.type)}}class t0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.size=t.size,this.setValue=$E(t.type)}}class n0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const xo=/(\w+)(\])?(\[|\.)?/g;function bh(s,e){s.seq.push(e),s.map[e.id]=e}function i0(s,e,t){const n=s.name,i=n.length;for(xo.lastIndex=0;;){const r=xo.exec(n),a=xo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){bh(t,c===void 0?new e0(o,s,e):new t0(o,s,e));break}else{let A=t.map[o];A===void 0&&(A=new n0(o),bh(t,A)),t=A}}}class ma{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);i0(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Bh(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}let r0=0;function s0(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function a0(s){switch(s){case pn:return["Linear","( value )"];case xe:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),["Linear","( value )"]}}function Rh(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+s0(s.getShaderSource(e),a)}else return i}function o0(s,e){const t=a0(e);return"vec4 "+s+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function l0(s,e){let t;switch(e){case mA:t="Linear";break;case Gl:t="Reinhard";break;case _A:t="OptimizedCineon";break;case EA:t="ACESFilmic";break;case pp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function c0(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(fs).join(`
`)}function h0(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function u0(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function fs(s){return s!==""}function Dh(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Lh(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const A0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Al(s){return s.replace(A0,f0)}function f0(s,e){const t=Pe[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return Al(t)}const d0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ph(s){return s.replace(d0,p0)}function p0(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Uh(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function g0(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===fA?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Xd?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Yn&&(e="SHADOWMAP_TYPE_VSM"),e}function m0(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Qr:case Or:e="ENVMAP_TYPE_CUBE";break;case Pa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _0(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Or:e="ENVMAP_MODE_REFRACTION";break}return e}function E0(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case gA:e="ENVMAP_BLENDING_MULTIPLY";break;case fp:e="ENVMAP_BLENDING_MIX";break;case dp:e="ENVMAP_BLENDING_ADD";break}return e}function v0(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function x0(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=g0(t),c=m0(t),h=_0(t),A=E0(t),u=v0(t),f=t.isWebGL2?"":c0(t),m=h0(r),p=i.createProgram();let d,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(fs).join(`
`),d.length>0&&(d+=`
`),g=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(fs).join(`
`),g.length>0&&(g+=`
`)):(d=[Uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),g=[f,Uh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+A:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?Pe.tonemapping_pars_fragment:"",t.toneMapping!==Pn?l0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Pe.encodings_pars_fragment,o0("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fs).join(`
`)),a=Al(a),a=Dh(a,t),a=Lh(a,t),o=Al(o),o=Dh(o,t),o=Lh(o,t),a=Ph(a),o=Ph(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,g=["#define varying in",t.glslVersion===eh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===eh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const _=x+d+a,E=x+g+o,C=Bh(i,i.VERTEX_SHADER,_),y=Bh(i,i.FRAGMENT_SHADER,E);if(i.attachShader(p,C),i.attachShader(p,y),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p),s.debug.checkShaderErrors){const v=i.getProgramInfoLog(p).trim(),M=i.getShaderInfoLog(C).trim(),H=i.getShaderInfoLog(y).trim();let X=!0,L=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,C,y);else{const U=Rh(i,C,"vertex"),N=Rh(i,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Program Info Log: `+v+`
`+U+`
`+N)}else v!==""?console.warn("THREE.WebGLProgram: Program Info Log:",v):(M===""||H==="")&&(L=!1);L&&(this.diagnostics={runnable:X,programLog:v,vertexShader:{log:M,prefix:d},fragmentShader:{log:H,prefix:g}})}i.deleteShader(C),i.deleteShader(y);let w;this.getUniforms=function(){return w===void 0&&(w=new ma(i,p)),w};let b;return this.getAttributes=function(){return b===void 0&&(b=u0(i,p)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=r0++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=C,this.fragmentShader=y,this}let C0=0;class I0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new y0(e),t.set(e,n)),n}}class y0{constructor(e){this.id=C0++,this.code=e,this.usedTimes=0}}function S0(s,e,t,n,i,r,a){const o=new OA,l=new I0,c=[],h=i.isWebGL2,A=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return v===0?"uv":`uv${v}`}function d(v,M,H,X,L){const U=X.fog,N=L.geometry,W=v.isMeshStandardMaterial?X.environment:null,Q=(v.isMeshStandardMaterial?t:e).get(v.envMap||W),z=Q&&Q.mapping===Pa?Q.image.height:null,Z=m[v.type];v.precision!==null&&(f=i.getMaxPrecision(v.precision),f!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",f,"instead."));const J=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,le=J!==void 0?J.length:0;let P=0;N.morphAttributes.position!==void 0&&(P=1),N.morphAttributes.normal!==void 0&&(P=2),N.morphAttributes.color!==void 0&&(P=3);let ee,$,se,he;if(Z){const At=bn[Z];ee=At.vertexShader,$=At.fragmentShader}else ee=v.vertexShader,$=v.fragmentShader,l.update(v),se=l.getVertexShaderID(v),he=l.getFragmentShaderID(v);const me=s.getRenderTarget(),Be=L.isInstancedMesh===!0,Ie=!!v.map,ot=!!v.matcap,Oe=!!Q,G=!!v.aoMap,ht=!!v.lightMap,_e=!!v.bumpMap,Le=!!v.normalMap,Ce=!!v.displacementMap,Ve=!!v.emissiveMap,Re=!!v.metalnessMap,Te=!!v.roughnessMap,We=v.anisotropy>0,ut=v.clearcoat>0,Xe=v.iridescence>0,T=v.sheen>0,I=v.transmission>0,O=We&&!!v.anisotropyMap,j=ut&&!!v.clearcoatMap,q=ut&&!!v.clearcoatNormalMap,te=ut&&!!v.clearcoatRoughnessMap,ue=Xe&&!!v.iridescenceMap,ne=Xe&&!!v.iridescenceThicknessMap,R=T&&!!v.sheenColorMap,ge=T&&!!v.sheenRoughnessMap,de=!!v.specularMap,Ee=!!v.specularColorMap,Ae=!!v.specularIntensityMap,pe=I&&!!v.transmissionMap,Fe=I&&!!v.thicknessMap,Ze=!!v.gradientMap,B=!!v.alphaMap,ae=v.alphaTest>0,V=!!v.extensions,ie=!!N.attributes.uv1,oe=!!N.attributes.uv2,ze=!!N.attributes.uv3;return{isWebGL2:h,shaderID:Z,shaderType:v.type,shaderName:v.name,vertexShader:ee,fragmentShader:$,defines:v.defines,customVertexShaderID:se,customFragmentShaderID:he,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:f,instancing:Be,instancingColor:Be&&L.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:me===null?s.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:pn,map:Ie,matcap:ot,envMap:Oe,envMapMode:Oe&&Q.mapping,envMapCubeUVHeight:z,aoMap:G,lightMap:ht,bumpMap:_e,normalMap:Le,displacementMap:u&&Ce,emissiveMap:Ve,normalMapObjectSpace:Le&&v.normalMapType===Mp,normalMapTangentSpace:Le&&v.normalMapType===RA,metalnessMap:Re,roughnessMap:Te,anisotropy:We,anisotropyMap:O,clearcoat:ut,clearcoatMap:j,clearcoatNormalMap:q,clearcoatRoughnessMap:te,iridescence:Xe,iridescenceMap:ue,iridescenceThicknessMap:ne,sheen:T,sheenColorMap:R,sheenRoughnessMap:ge,specularMap:de,specularColorMap:Ee,specularIntensityMap:Ae,transmission:I,transmissionMap:pe,thicknessMap:Fe,gradientMap:Ze,opaque:v.transparent===!1&&v.blending===wr,alphaMap:B,alphaTest:ae,combine:v.combine,mapUv:Ie&&p(v.map.channel),aoMapUv:G&&p(v.aoMap.channel),lightMapUv:ht&&p(v.lightMap.channel),bumpMapUv:_e&&p(v.bumpMap.channel),normalMapUv:Le&&p(v.normalMap.channel),displacementMapUv:Ce&&p(v.displacementMap.channel),emissiveMapUv:Ve&&p(v.emissiveMap.channel),metalnessMapUv:Re&&p(v.metalnessMap.channel),roughnessMapUv:Te&&p(v.roughnessMap.channel),anisotropyMapUv:O&&p(v.anisotropyMap.channel),clearcoatMapUv:j&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:q&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:R&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:ge&&p(v.sheenRoughnessMap.channel),specularMapUv:de&&p(v.specularMap.channel),specularColorMapUv:Ee&&p(v.specularColorMap.channel),specularIntensityMapUv:Ae&&p(v.specularIntensityMap.channel),transmissionMapUv:pe&&p(v.transmissionMap.channel),thicknessMapUv:Fe&&p(v.thicknessMap.channel),alphaMapUv:B&&p(v.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Le||We),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,vertexUv1s:ie,vertexUv2s:oe,vertexUv3s:ze,pointsUvs:L.isPoints===!0&&!!N.attributes.uv&&(Ie||B),fog:!!U,useFog:v.fog===!0,fogExp2:U&&U.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:A,skinning:L.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:P,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&H.length>0,shadowMapType:s.shadowMap.type,toneMapping:v.toneMapped?s.toneMapping:Pn,useLegacyLights:s.useLegacyLights,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Cn,flipSided:v.side===Yt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:V&&v.extensions.derivatives===!0,extensionFragDepth:V&&v.extensions.fragDepth===!0,extensionDrawBuffers:V&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:V&&v.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),customProgramCacheKey:v.customProgramCacheKey()}}function g(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const H in v.defines)M.push(H),M.push(v.defines[H]);return v.isRawShaderMaterial===!1&&(x(M,v),_(M,v),M.push(s.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function x(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function _(v,M){o.disableAll(),M.isWebGL2&&o.enable(0),M.supportsVertexTextures&&o.enable(1),M.instancing&&o.enable(2),M.instancingColor&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),v.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.useLegacyLights&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),v.push(o.mask)}function E(v){const M=m[v.type];let H;if(M){const X=bn[M];H=bs.clone(X.uniforms)}else H=v.uniforms;return H}function C(v,M){let H;for(let X=0,L=c.length;X<L;X++){const U=c[X];if(U.cacheKey===M){H=U,++H.usedTimes;break}}return H===void 0&&(H=new x0(s,M,v,r),c.push(H)),H}function y(v){if(--v.usedTimes===0){const M=c.indexOf(v);c[M]=c[c.length-1],c.pop(),v.destroy()}}function w(v){l.remove(v)}function b(){l.dispose()}return{getParameters:d,getProgramCacheKey:g,getUniforms:E,acquireProgram:C,releaseProgram:y,releaseShaderCache:w,programs:c,dispose:b}}function M0(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function w0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Nh(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Fh(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(A,u,f,m,p,d){let g=s[e];return g===void 0?(g={id:A.id,object:A,geometry:u,material:f,groupOrder:m,renderOrder:A.renderOrder,z:p,group:d},s[e]=g):(g.id=A.id,g.object=A,g.geometry=u,g.material=f,g.groupOrder=m,g.renderOrder=A.renderOrder,g.z=p,g.group=d),e++,g}function o(A,u,f,m,p,d){const g=a(A,u,f,m,p,d);f.transmission>0?n.push(g):f.transparent===!0?i.push(g):t.push(g)}function l(A,u,f,m,p,d){const g=a(A,u,f,m,p,d);f.transmission>0?n.unshift(g):f.transparent===!0?i.unshift(g):t.unshift(g)}function c(A,u){t.length>1&&t.sort(A||w0),n.length>1&&n.sort(u||Nh),i.length>1&&i.sort(u||Nh)}function h(){for(let A=e,u=s.length;A<u;A++){const f=s[A];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function T0(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new Fh,s.set(n,[a])):i>=r.length?(a=new Fh,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function b0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new we};break;case"SpotLight":t={position:new D,direction:new D,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new D,halfWidth:new D,halfHeight:new D};break}return s[e.id]=t,t}}}function B0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let R0=0;function D0(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function L0(s,e){const t=new b0,n=B0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let h=0;h<9;h++)i.probe.push(new D);const r=new D,a=new Ne,o=new Ne;function l(h,A){let u=0,f=0,m=0;for(let H=0;H<9;H++)i.probe[H].set(0,0,0);let p=0,d=0,g=0,x=0,_=0,E=0,C=0,y=0,w=0,b=0;h.sort(D0);const v=A===!0?Math.PI:1;for(let H=0,X=h.length;H<X;H++){const L=h[H],U=L.color,N=L.intensity,W=L.distance,Q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=U.r*N*v,f+=U.g*N*v,m+=U.b*N*v;else if(L.isLightProbe)for(let z=0;z<9;z++)i.probe[z].addScaledVector(L.sh.coefficients[z],N);else if(L.isDirectionalLight){const z=t.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity*v),L.castShadow){const Z=L.shadow,J=n.get(L);J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,i.directionalShadow[p]=J,i.directionalShadowMap[p]=Q,i.directionalShadowMatrix[p]=L.shadow.matrix,E++}i.directional[p]=z,p++}else if(L.isSpotLight){const z=t.get(L);z.position.setFromMatrixPosition(L.matrixWorld),z.color.copy(U).multiplyScalar(N*v),z.distance=W,z.coneCos=Math.cos(L.angle),z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),z.decay=L.decay,i.spot[g]=z;const Z=L.shadow;if(L.map&&(i.spotLightMap[w]=L.map,w++,Z.updateMatrices(L),L.castShadow&&b++),i.spotLightMatrix[g]=Z.matrix,L.castShadow){const J=n.get(L);J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,i.spotShadow[g]=J,i.spotShadowMap[g]=Q,y++}g++}else if(L.isRectAreaLight){const z=t.get(L);z.color.copy(U).multiplyScalar(N),z.halfWidth.set(L.width*.5,0,0),z.halfHeight.set(0,L.height*.5,0),i.rectArea[x]=z,x++}else if(L.isPointLight){const z=t.get(L);if(z.color.copy(L.color).multiplyScalar(L.intensity*v),z.distance=L.distance,z.decay=L.decay,L.castShadow){const Z=L.shadow,J=n.get(L);J.shadowBias=Z.bias,J.shadowNormalBias=Z.normalBias,J.shadowRadius=Z.radius,J.shadowMapSize=Z.mapSize,J.shadowCameraNear=Z.camera.near,J.shadowCameraFar=Z.camera.far,i.pointShadow[d]=J,i.pointShadowMap[d]=Q,i.pointShadowMatrix[d]=L.shadow.matrix,C++}i.point[d]=z,d++}else if(L.isHemisphereLight){const z=t.get(L);z.skyColor.copy(L.color).multiplyScalar(N*v),z.groundColor.copy(L.groundColor).multiplyScalar(N*v),i.hemi[_]=z,_++}}x>0&&(e.isWebGL2||s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=m;const M=i.hash;(M.directionalLength!==p||M.pointLength!==d||M.spotLength!==g||M.rectAreaLength!==x||M.hemiLength!==_||M.numDirectionalShadows!==E||M.numPointShadows!==C||M.numSpotShadows!==y||M.numSpotMaps!==w)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=x,i.point.length=d,i.hemi.length=_,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=y+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,M.directionalLength=p,M.pointLength=d,M.spotLength=g,M.rectAreaLength=x,M.hemiLength=_,M.numDirectionalShadows=E,M.numPointShadows=C,M.numSpotShadows=y,M.numSpotMaps=w,i.version=R0++)}function c(h,A){let u=0,f=0,m=0,p=0,d=0;const g=A.matrixWorldInverse;for(let x=0,_=h.length;x<_;x++){const E=h[x];if(E.isDirectionalLight){const C=i.directional[u];C.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(g),u++}else if(E.isSpotLight){const C=i.spot[m];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(g),C.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(g),m++}else if(E.isRectAreaLight){const C=i.rectArea[p];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(g),o.identity(),a.copy(E.matrixWorld),a.premultiply(g),o.extractRotation(a),C.halfWidth.set(E.width*.5,0,0),C.halfHeight.set(0,E.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),p++}else if(E.isPointLight){const C=i.point[f];C.position.setFromMatrixPosition(E.matrixWorld),C.position.applyMatrix4(g),f++}else if(E.isHemisphereLight){const C=i.hemi[d];C.direction.setFromMatrixPosition(E.matrixWorld),C.direction.transformDirection(g),d++}}}return{setup:l,setupView:c,state:i}}function Qh(s,e){const t=new L0(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(A){n.push(A)}function o(A){i.push(A)}function l(A){t.setup(n,A)}function c(A){t.setupView(n,A)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function P0(s,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new Qh(s,e),t.set(r,[l])):a>=o.length?(l=new Qh(s,e),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class U0 extends Nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class N0 extends Nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const F0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Q0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function O0(s,e,t){let n=new zl;const i=new ce,r=new ce,a=new je,o=new U0({depthPacking:Sp}),l=new N0,c={},h=t.maxTextureSize,A={[si]:Yt,[Yt]:si,[Cn]:Cn},u=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:F0,fragmentShader:Q0}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new wn;m.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const p=new Vt(m,u),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fA;let g=this.type;this.render=function(C,y,w){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||C.length===0)return;const b=s.getRenderTarget(),v=s.getActiveCubeFace(),M=s.getActiveMipmapLevel(),H=s.state;H.setBlending(xi),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const X=g!==Yn&&this.type===Yn,L=g===Yn&&this.type!==Yn;for(let U=0,N=C.length;U<N;U++){const W=C[U],Q=W.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;i.copy(Q.mapSize);const z=Q.getFrameExtents();if(i.multiply(z),r.copy(Q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/z.x),i.x=r.x*z.x,Q.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/z.y),i.y=r.y*z.y,Q.mapSize.y=r.y)),Q.map===null||X===!0||L===!0){const J=this.type!==Yn?{minFilter:xt,magFilter:xt}:{};Q.map!==null&&Q.map.dispose(),Q.map=new Sn(i.x,i.y,J),Q.map.texture.name=W.name+".shadowMap",Q.camera.updateProjectionMatrix()}s.setRenderTarget(Q.map),s.clear();const Z=Q.getViewportCount();for(let J=0;J<Z;J++){const le=Q.getViewport(J);a.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),H.viewport(a),Q.updateMatrices(W,J),n=Q.getFrustum(),E(y,w,Q.camera,W,this.type)}Q.isPointLightShadow!==!0&&this.type===Yn&&x(Q,w),Q.needsUpdate=!1}g=this.type,d.needsUpdate=!1,s.setRenderTarget(b,v,M)};function x(C,y){const w=e.update(p);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,f.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Sn(i.x,i.y)),u.uniforms.shadow_pass.value=C.map.texture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,s.setRenderTarget(C.mapPass),s.clear(),s.renderBufferDirect(y,null,w,u,p,null),f.uniforms.shadow_pass.value=C.mapPass.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,s.setRenderTarget(C.map),s.clear(),s.renderBufferDirect(y,null,w,f,p,null)}function _(C,y,w,b){let v=null;const M=w.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(M!==void 0)v=M;else if(v=w.isPointLight===!0?l:o,s.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0){const H=v.uuid,X=y.uuid;let L=c[H];L===void 0&&(L={},c[H]=L);let U=L[X];U===void 0&&(U=v.clone(),L[X]=U),v=U}if(v.visible=y.visible,v.wireframe=y.wireframe,b===Yn?v.side=y.shadowSide!==null?y.shadowSide:y.side:v.side=y.shadowSide!==null?y.shadowSide:A[y.side],v.alphaMap=y.alphaMap,v.alphaTest=y.alphaTest,v.map=y.map,v.clipShadows=y.clipShadows,v.clippingPlanes=y.clippingPlanes,v.clipIntersection=y.clipIntersection,v.displacementMap=y.displacementMap,v.displacementScale=y.displacementScale,v.displacementBias=y.displacementBias,v.wireframeLinewidth=y.wireframeLinewidth,v.linewidth=y.linewidth,w.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const H=s.properties.get(v);H.light=w}return v}function E(C,y,w,b,v){if(C.visible===!1)return;if(C.layers.test(y.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===Yn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,C.matrixWorld);const X=e.update(C),L=C.material;if(Array.isArray(L)){const U=X.groups;for(let N=0,W=U.length;N<W;N++){const Q=U[N],z=L[Q.materialIndex];if(z&&z.visible){const Z=_(C,z,b,v);s.renderBufferDirect(w,null,X,Z,C,Q)}}}else if(L.visible){const U=_(C,L,b,v);s.renderBufferDirect(w,null,X,U,C,null)}}const H=C.children;for(let X=0,L=H.length;X<L;X++)E(H[X],y,w,b,v)}}function G0(s,e,t){const n=t.isWebGL2;function i(){let B=!1;const ae=new je;let V=null;const ie=new je(0,0,0,0);return{setMask:function(oe){V!==oe&&!B&&(s.colorMask(oe,oe,oe,oe),V=oe)},setLocked:function(oe){B=oe},setClear:function(oe,ze,rt,At,Ti){Ti===!0&&(oe*=At,ze*=At,rt*=At),ae.set(oe,ze,rt,At),ie.equals(ae)===!1&&(s.clearColor(oe,ze,rt,At),ie.copy(ae))},reset:function(){B=!1,V=null,ie.set(-1,0,0,0)}}}function r(){let B=!1,ae=null,V=null,ie=null;return{setTest:function(oe){oe?me(s.DEPTH_TEST):Be(s.DEPTH_TEST)},setMask:function(oe){ae!==oe&&!B&&(s.depthMask(oe),ae=oe)},setFunc:function(oe){if(V!==oe){switch(oe){case ap:s.depthFunc(s.NEVER);break;case op:s.depthFunc(s.ALWAYS);break;case lp:s.depthFunc(s.LESS);break;case $o:s.depthFunc(s.LEQUAL);break;case cp:s.depthFunc(s.EQUAL);break;case hp:s.depthFunc(s.GEQUAL);break;case up:s.depthFunc(s.GREATER);break;case Ap:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}V=oe}},setLocked:function(oe){B=oe},setClear:function(oe){ie!==oe&&(s.clearDepth(oe),ie=oe)},reset:function(){B=!1,ae=null,V=null,ie=null}}}function a(){let B=!1,ae=null,V=null,ie=null,oe=null,ze=null,rt=null,At=null,Ti=null;return{setTest:function(st){B||(st?me(s.STENCIL_TEST):Be(s.STENCIL_TEST))},setMask:function(st){ae!==st&&!B&&(s.stencilMask(st),ae=st)},setFunc:function(st,Tn,Nt){(V!==st||ie!==Tn||oe!==Nt)&&(s.stencilFunc(st,Tn,Nt),V=st,ie=Tn,oe=Nt)},setOp:function(st,Tn,Nt){(ze!==st||rt!==Tn||At!==Nt)&&(s.stencilOp(st,Tn,Nt),ze=st,rt=Tn,At=Nt)},setLocked:function(st){B=st},setClear:function(st){Ti!==st&&(s.clearStencil(st),Ti=st)},reset:function(){B=!1,ae=null,V=null,ie=null,oe=null,ze=null,rt=null,At=null,Ti=null}}}const o=new i,l=new r,c=new a,h=new WeakMap,A=new WeakMap;let u={},f={},m=new WeakMap,p=[],d=null,g=!1,x=null,_=null,E=null,C=null,y=null,w=null,b=null,v=!1,M=null,H=null,X=null,L=null,U=null;const N=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,Q=0;const z=s.getParameter(s.VERSION);z.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(z)[1]),W=Q>=1):z.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),W=Q>=2);let Z=null,J={};const le=s.getParameter(s.SCISSOR_BOX),P=s.getParameter(s.VIEWPORT),ee=new je().fromArray(le),$=new je().fromArray(P);function se(B,ae,V,ie){const oe=new Uint8Array(4),ze=s.createTexture();s.bindTexture(B,ze),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let rt=0;rt<V;rt++)n&&(B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY)?s.texImage3D(ae,0,s.RGBA,1,1,ie,0,s.RGBA,s.UNSIGNED_BYTE,oe):s.texImage2D(ae+rt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,oe);return ze}const he={};he[s.TEXTURE_2D]=se(s.TEXTURE_2D,s.TEXTURE_2D,1),he[s.TEXTURE_CUBE_MAP]=se(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(he[s.TEXTURE_2D_ARRAY]=se(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),he[s.TEXTURE_3D]=se(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),me(s.DEPTH_TEST),l.setFunc($o),Ce(!1),Ve(Tc),me(s.CULL_FACE),_e(xi);function me(B){u[B]!==!0&&(s.enable(B),u[B]=!0)}function Be(B){u[B]!==!1&&(s.disable(B),u[B]=!1)}function Ie(B,ae){return f[B]!==ae?(s.bindFramebuffer(B,ae),f[B]=ae,n&&(B===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=ae),B===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=ae)),!0):!1}function ot(B,ae){let V=p,ie=!1;if(B)if(V=m.get(ae),V===void 0&&(V=[],m.set(ae,V)),B.isWebGLMultipleRenderTargets){const oe=B.texture;if(V.length!==oe.length||V[0]!==s.COLOR_ATTACHMENT0){for(let ze=0,rt=oe.length;ze<rt;ze++)V[ze]=s.COLOR_ATTACHMENT0+ze;V.length=oe.length,ie=!0}}else V[0]!==s.COLOR_ATTACHMENT0&&(V[0]=s.COLOR_ATTACHMENT0,ie=!0);else V[0]!==s.BACK&&(V[0]=s.BACK,ie=!0);ie&&(t.isWebGL2?s.drawBuffers(V):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(V))}function Oe(B){return d!==B?(s.useProgram(B),d=B,!0):!1}const G={[_r]:s.FUNC_ADD,[Kd]:s.FUNC_SUBTRACT,[Jd]:s.FUNC_REVERSE_SUBTRACT};if(n)G[Rc]=s.MIN,G[Dc]=s.MAX;else{const B=e.get("EXT_blend_minmax");B!==null&&(G[Rc]=B.MIN_EXT,G[Dc]=B.MAX_EXT)}const ht={[jd]:s.ZERO,[Zd]:s.ONE,[$d]:s.SRC_COLOR,[dA]:s.SRC_ALPHA,[sp]:s.SRC_ALPHA_SATURATE,[ip]:s.DST_COLOR,[tp]:s.DST_ALPHA,[ep]:s.ONE_MINUS_SRC_COLOR,[pA]:s.ONE_MINUS_SRC_ALPHA,[rp]:s.ONE_MINUS_DST_COLOR,[np]:s.ONE_MINUS_DST_ALPHA};function _e(B,ae,V,ie,oe,ze,rt,At){if(B===xi){g===!0&&(Be(s.BLEND),g=!1);return}if(g===!1&&(me(s.BLEND),g=!0),B!==Yd){if(B!==x||At!==v){if((_!==_r||y!==_r)&&(s.blendEquation(s.FUNC_ADD),_=_r,y=_r),At)switch(B){case wr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ma:s.blendFunc(s.ONE,s.ONE);break;case bc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Bc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case wr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ma:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case bc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Bc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}E=null,C=null,w=null,b=null,x=B,v=At}return}oe=oe||ae,ze=ze||V,rt=rt||ie,(ae!==_||oe!==y)&&(s.blendEquationSeparate(G[ae],G[oe]),_=ae,y=oe),(V!==E||ie!==C||ze!==w||rt!==b)&&(s.blendFuncSeparate(ht[V],ht[ie],ht[ze],ht[rt]),E=V,C=ie,w=ze,b=rt),x=B,v=!1}function Le(B,ae){B.side===Cn?Be(s.CULL_FACE):me(s.CULL_FACE);let V=B.side===Yt;ae&&(V=!V),Ce(V),B.blending===wr&&B.transparent===!1?_e(xi):_e(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.premultipliedAlpha),l.setFunc(B.depthFunc),l.setTest(B.depthTest),l.setMask(B.depthWrite),o.setMask(B.colorWrite);const ie=B.stencilWrite;c.setTest(ie),ie&&(c.setMask(B.stencilWriteMask),c.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),c.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Te(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?me(s.SAMPLE_ALPHA_TO_COVERAGE):Be(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ce(B){M!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),M=B)}function Ve(B){B!==Wd?(me(s.CULL_FACE),B!==H&&(B===Tc?s.cullFace(s.BACK):B===qd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Be(s.CULL_FACE),H=B}function Re(B){B!==X&&(W&&s.lineWidth(B),X=B)}function Te(B,ae,V){B?(me(s.POLYGON_OFFSET_FILL),(L!==ae||U!==V)&&(s.polygonOffset(ae,V),L=ae,U=V)):Be(s.POLYGON_OFFSET_FILL)}function We(B){B?me(s.SCISSOR_TEST):Be(s.SCISSOR_TEST)}function ut(B){B===void 0&&(B=s.TEXTURE0+N-1),Z!==B&&(s.activeTexture(B),Z=B)}function Xe(B,ae,V){V===void 0&&(Z===null?V=s.TEXTURE0+N-1:V=Z);let ie=J[V];ie===void 0&&(ie={type:void 0,texture:void 0},J[V]=ie),(ie.type!==B||ie.texture!==ae)&&(Z!==V&&(s.activeTexture(V),Z=V),s.bindTexture(B,ae||he[B]),ie.type=B,ie.texture=ae)}function T(){const B=J[Z];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function I(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function O(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function j(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function q(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function te(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ue(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ne(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function R(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ge(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function de(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ee(B){ee.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),ee.copy(B))}function Ae(B){$.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),$.copy(B))}function pe(B,ae){let V=A.get(ae);V===void 0&&(V=new WeakMap,A.set(ae,V));let ie=V.get(B);ie===void 0&&(ie=s.getUniformBlockIndex(ae,B.name),V.set(B,ie))}function Fe(B,ae){const ie=A.get(ae).get(B);h.get(ae)!==ie&&(s.uniformBlockBinding(ae,ie,B.__bindingPointIndex),h.set(ae,ie))}function Ze(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},Z=null,J={},f={},m=new WeakMap,p=[],d=null,g=!1,x=null,_=null,E=null,C=null,y=null,w=null,b=null,v=!1,M=null,H=null,X=null,L=null,U=null,ee.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:me,disable:Be,bindFramebuffer:Ie,drawBuffers:ot,useProgram:Oe,setBlending:_e,setMaterial:Le,setFlipSided:Ce,setCullFace:Ve,setLineWidth:Re,setPolygonOffset:Te,setScissorTest:We,activeTexture:ut,bindTexture:Xe,unbindTexture:T,compressedTexImage2D:I,compressedTexImage3D:O,texImage2D:ge,texImage3D:de,updateUBOMapping:pe,uniformBlockBinding:Fe,texStorage2D:ne,texStorage3D:R,texSubImage2D:j,texSubImage3D:q,compressedTexSubImage2D:te,compressedTexSubImage3D:ue,scissor:Ee,viewport:Ae,reset:Ze}}function k0(s,e,t,n,i,r,a){const o=i.isWebGL2,l=i.maxTextures,c=i.maxCubemapSize,h=i.maxTextureSize,A=i.maxSamples,u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,f=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new WeakMap;let p;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(T,I){return g?new OffscreenCanvas(T,I):Ts("canvas")}function _(T,I,O,j){let q=1;if((T.width>j||T.height>j)&&(q=j/Math.max(T.width,T.height)),q<1||I===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const te=I?ba:Math.floor,ue=te(q*T.width),ne=te(q*T.height);p===void 0&&(p=x(ue,ne));const R=O?x(ue,ne):p;return R.width=ue,R.height=ne,R.getContext("2d").drawImage(T,0,0,ue,ne),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+ue+"x"+ne+")."),R}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function E(T){return ul(T.width)&&ul(T.height)}function C(T){return o?!1:T.wrapS!==tn||T.wrapT!==tn||T.minFilter!==xt&&T.minFilter!==Rt}function y(T,I){return T.generateMipmaps&&I&&T.minFilter!==xt&&T.minFilter!==Rt}function w(T){s.generateMipmap(T)}function b(T,I,O,j,q=!1){if(o===!1)return I;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let te=I;return I===s.RED&&(O===s.FLOAT&&(te=s.R32F),O===s.HALF_FLOAT&&(te=s.R16F),O===s.UNSIGNED_BYTE&&(te=s.R8)),I===s.RG&&(O===s.FLOAT&&(te=s.RG32F),O===s.HALF_FLOAT&&(te=s.RG16F),O===s.UNSIGNED_BYTE&&(te=s.RG8)),I===s.RGBA&&(O===s.FLOAT&&(te=s.RGBA32F),O===s.HALF_FLOAT&&(te=s.RGBA16F),O===s.UNSIGNED_BYTE&&(te=j===xe&&q===!1?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)),(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function v(T,I,O){return y(T,O)===!0||T.isFramebufferTexture&&T.minFilter!==xt&&T.minFilter!==Rt?Math.log2(Math.max(I.width,I.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?I.mipmaps.length:1}function M(T){return T===xt||T===nl||T===fa?s.NEAREST:s.LINEAR}function H(T){const I=T.target;I.removeEventListener("dispose",H),L(I),I.isVideoTexture&&m.delete(I)}function X(T){const I=T.target;I.removeEventListener("dispose",X),N(I)}function L(T){const I=n.get(T);if(I.__webglInit===void 0)return;const O=T.source,j=d.get(O);if(j){const q=j[I.__cacheKey];q.usedTimes--,q.usedTimes===0&&U(T),Object.keys(j).length===0&&d.delete(O)}n.remove(T)}function U(T){const I=n.get(T);s.deleteTexture(I.__webglTexture);const O=T.source,j=d.get(O);delete j[I.__cacheKey],a.memory.textures--}function N(T){const I=T.texture,O=n.get(T),j=n.get(I);if(j.__webglTexture!==void 0&&(s.deleteTexture(j.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++)s.deleteFramebuffer(O.__webglFramebuffer[q]),O.__webglDepthbuffer&&s.deleteRenderbuffer(O.__webglDepthbuffer[q]);else{if(s.deleteFramebuffer(O.__webglFramebuffer),O.__webglDepthbuffer&&s.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&s.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let q=0;q<O.__webglColorRenderbuffer.length;q++)O.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(O.__webglColorRenderbuffer[q]);O.__webglDepthRenderbuffer&&s.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let q=0,te=I.length;q<te;q++){const ue=n.get(I[q]);ue.__webglTexture&&(s.deleteTexture(ue.__webglTexture),a.memory.textures--),n.remove(I[q])}n.remove(I),n.remove(T)}let W=0;function Q(){W=0}function z(){const T=W;return T>=l&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+l),W+=1,T}function Z(T){const I=[];return I.push(T.wrapS),I.push(T.wrapT),I.push(T.wrapR||0),I.push(T.magFilter),I.push(T.minFilter),I.push(T.anisotropy),I.push(T.internalFormat),I.push(T.format),I.push(T.type),I.push(T.generateMipmaps),I.push(T.premultiplyAlpha),I.push(T.flipY),I.push(T.unpackAlignment),I.push(T.colorSpace),I.join()}function J(T,I){const O=n.get(T);if(T.isVideoTexture&&ut(T),T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){const j=T.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Ie(O,T,I);return}}t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+I)}function le(T,I){const O=n.get(T);if(T.version>0&&O.__version!==T.version){Ie(O,T,I);return}t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+I)}function P(T,I){const O=n.get(T);if(T.version>0&&O.__version!==T.version){Ie(O,T,I);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+I)}function ee(T,I){const O=n.get(T);if(T.version>0&&O.__version!==T.version){ot(O,T,I);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+I)}const $={[Un]:s.REPEAT,[tn]:s.CLAMP_TO_EDGE,[wa]:s.MIRRORED_REPEAT},se={[xt]:s.NEAREST,[nl]:s.NEAREST_MIPMAP_NEAREST,[fa]:s.NEAREST_MIPMAP_LINEAR,[Rt]:s.LINEAR,[xA]:s.LINEAR_MIPMAP_NEAREST,[yi]:s.LINEAR_MIPMAP_LINEAR},he={[Tp]:s.NEVER,[Up]:s.ALWAYS,[bp]:s.LESS,[Rp]:s.LEQUAL,[Bp]:s.EQUAL,[Pp]:s.GEQUAL,[Dp]:s.GREATER,[Lp]:s.NOTEQUAL};function me(T,I,O){if(O?(s.texParameteri(T,s.TEXTURE_WRAP_S,$[I.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,$[I.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,$[I.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,se[I.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,se[I.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(I.wrapS!==tn||I.wrapT!==tn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,M(I.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,M(I.minFilter)),I.minFilter!==xt&&I.minFilter!==Rt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),I.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,he[I.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const j=e.get("EXT_texture_filter_anisotropic");if(I.magFilter===xt||I.minFilter!==fa&&I.minFilter!==yi||I.type===nn&&e.has("OES_texture_float_linear")===!1||o===!1&&I.type===sn&&e.has("OES_texture_half_float_linear")===!1)return;(I.anisotropy>1||n.get(I).__currentAnisotropy)&&(s.texParameterf(T,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(I.anisotropy,i.getMaxAnisotropy())),n.get(I).__currentAnisotropy=I.anisotropy)}}function Be(T,I){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,I.addEventListener("dispose",H));const j=I.source;let q=d.get(j);q===void 0&&(q={},d.set(j,q));const te=Z(I);if(te!==T.__cacheKey){q[te]===void 0&&(q[te]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[te].usedTimes++;const ue=q[T.__cacheKey];ue!==void 0&&(q[T.__cacheKey].usedTimes--,ue.usedTimes===0&&U(I)),T.__cacheKey=te,T.__webglTexture=q[te].texture}return O}function Ie(T,I,O){let j=s.TEXTURE_2D;(I.isDataArrayTexture||I.isCompressedArrayTexture)&&(j=s.TEXTURE_2D_ARRAY),I.isData3DTexture&&(j=s.TEXTURE_3D);const q=Be(T,I),te=I.source;t.bindTexture(j,T.__webglTexture,s.TEXTURE0+O);const ue=n.get(te);if(te.version!==ue.__version||q===!0){t.activeTexture(s.TEXTURE0+O),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,I.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,I.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.NONE);const ne=C(I)&&E(I.image)===!1;let R=_(I.image,ne,!1,h);R=Xe(I,R);const ge=E(R)||o,de=r.convert(I.format,I.colorSpace);let Ee=r.convert(I.type),Ae=b(I.internalFormat,de,Ee,I.colorSpace);me(j,I,ge);let pe;const Fe=I.mipmaps,Ze=o&&I.isVideoTexture!==!0,B=ue.__version===void 0||q===!0,ae=v(I,R,ge);if(I.isDepthTexture)Ae=s.DEPTH_COMPONENT,o?I.type===nn?Ae=s.DEPTH_COMPONENT32F:I.type===mi?Ae=s.DEPTH_COMPONENT24:I.type===Xi?Ae=s.DEPTH24_STENCIL8:Ae=s.DEPTH_COMPONENT16:I.type===nn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),I.format===Yi&&Ae===s.DEPTH_COMPONENT&&I.type!==kl&&I.type!==mi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),I.type=mi,Ee=r.convert(I.type)),I.format===Gr&&Ae===s.DEPTH_COMPONENT&&(Ae=s.DEPTH_STENCIL,I.type!==Xi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),I.type=Xi,Ee=r.convert(I.type))),B&&(Ze?t.texStorage2D(s.TEXTURE_2D,1,Ae,R.width,R.height):t.texImage2D(s.TEXTURE_2D,0,Ae,R.width,R.height,0,de,Ee,null));else if(I.isDataTexture)if(Fe.length>0&&ge){Ze&&B&&t.texStorage2D(s.TEXTURE_2D,ae,Ae,Fe[0].width,Fe[0].height);for(let V=0,ie=Fe.length;V<ie;V++)pe=Fe[V],Ze?t.texSubImage2D(s.TEXTURE_2D,V,0,0,pe.width,pe.height,de,Ee,pe.data):t.texImage2D(s.TEXTURE_2D,V,Ae,pe.width,pe.height,0,de,Ee,pe.data);I.generateMipmaps=!1}else Ze?(B&&t.texStorage2D(s.TEXTURE_2D,ae,Ae,R.width,R.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,R.width,R.height,de,Ee,R.data)):t.texImage2D(s.TEXTURE_2D,0,Ae,R.width,R.height,0,de,Ee,R.data);else if(I.isCompressedTexture)if(I.isCompressedArrayTexture){Ze&&B&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ae,Ae,Fe[0].width,Fe[0].height,R.depth);for(let V=0,ie=Fe.length;V<ie;V++)pe=Fe[V],I.format!==Tt?de!==null?Ze?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,pe.width,pe.height,R.depth,de,pe.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,V,Ae,pe.width,pe.height,R.depth,0,pe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(s.TEXTURE_2D_ARRAY,V,0,0,0,pe.width,pe.height,R.depth,de,Ee,pe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,V,Ae,pe.width,pe.height,R.depth,0,de,Ee,pe.data)}else{Ze&&B&&t.texStorage2D(s.TEXTURE_2D,ae,Ae,Fe[0].width,Fe[0].height);for(let V=0,ie=Fe.length;V<ie;V++)pe=Fe[V],I.format!==Tt?de!==null?Ze?t.compressedTexSubImage2D(s.TEXTURE_2D,V,0,0,pe.width,pe.height,de,pe.data):t.compressedTexImage2D(s.TEXTURE_2D,V,Ae,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(s.TEXTURE_2D,V,0,0,pe.width,pe.height,de,Ee,pe.data):t.texImage2D(s.TEXTURE_2D,V,Ae,pe.width,pe.height,0,de,Ee,pe.data)}else if(I.isDataArrayTexture)Ze?(B&&t.texStorage3D(s.TEXTURE_2D_ARRAY,ae,Ae,R.width,R.height,R.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,R.width,R.height,R.depth,de,Ee,R.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ae,R.width,R.height,R.depth,0,de,Ee,R.data);else if(I.isData3DTexture)Ze?(B&&t.texStorage3D(s.TEXTURE_3D,ae,Ae,R.width,R.height,R.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,R.width,R.height,R.depth,de,Ee,R.data)):t.texImage3D(s.TEXTURE_3D,0,Ae,R.width,R.height,R.depth,0,de,Ee,R.data);else if(I.isFramebufferTexture){if(B)if(Ze)t.texStorage2D(s.TEXTURE_2D,ae,Ae,R.width,R.height);else{let V=R.width,ie=R.height;for(let oe=0;oe<ae;oe++)t.texImage2D(s.TEXTURE_2D,oe,Ae,V,ie,0,de,Ee,null),V>>=1,ie>>=1}}else if(Fe.length>0&&ge){Ze&&B&&t.texStorage2D(s.TEXTURE_2D,ae,Ae,Fe[0].width,Fe[0].height);for(let V=0,ie=Fe.length;V<ie;V++)pe=Fe[V],Ze?t.texSubImage2D(s.TEXTURE_2D,V,0,0,de,Ee,pe):t.texImage2D(s.TEXTURE_2D,V,Ae,de,Ee,pe);I.generateMipmaps=!1}else Ze?(B&&t.texStorage2D(s.TEXTURE_2D,ae,Ae,R.width,R.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,de,Ee,R)):t.texImage2D(s.TEXTURE_2D,0,Ae,de,Ee,R);y(I,ge)&&w(j),ue.__version=te.version,I.onUpdate&&I.onUpdate(I)}T.__version=I.version}function ot(T,I,O){if(I.image.length!==6)return;const j=Be(T,I),q=I.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+O);const te=n.get(q);if(q.version!==te.__version||j===!0){t.activeTexture(s.TEXTURE0+O),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,I.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,I.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.NONE);const ue=I.isCompressedTexture||I.image[0].isCompressedTexture,ne=I.image[0]&&I.image[0].isDataTexture,R=[];for(let V=0;V<6;V++)!ue&&!ne?R[V]=_(I.image[V],!1,!0,c):R[V]=ne?I.image[V].image:I.image[V],R[V]=Xe(I,R[V]);const ge=R[0],de=E(ge)||o,Ee=r.convert(I.format,I.colorSpace),Ae=r.convert(I.type),pe=b(I.internalFormat,Ee,Ae,I.colorSpace),Fe=o&&I.isVideoTexture!==!0,Ze=te.__version===void 0||j===!0;let B=v(I,ge,de);me(s.TEXTURE_CUBE_MAP,I,de);let ae;if(ue){Fe&&Ze&&t.texStorage2D(s.TEXTURE_CUBE_MAP,B,pe,ge.width,ge.height);for(let V=0;V<6;V++){ae=R[V].mipmaps;for(let ie=0;ie<ae.length;ie++){const oe=ae[ie];I.format!==Tt?Ee!==null?Fe?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,ie,0,0,oe.width,oe.height,Ee,oe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,ie,pe,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,ie,0,0,oe.width,oe.height,Ee,Ae,oe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,ie,pe,oe.width,oe.height,0,Ee,Ae,oe.data)}}}else{ae=I.mipmaps,Fe&&Ze&&(ae.length>0&&B++,t.texStorage2D(s.TEXTURE_CUBE_MAP,B,pe,R[0].width,R[0].height));for(let V=0;V<6;V++)if(ne){Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,0,0,R[V].width,R[V].height,Ee,Ae,R[V].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,pe,R[V].width,R[V].height,0,Ee,Ae,R[V].data);for(let ie=0;ie<ae.length;ie++){const ze=ae[ie].image[V].image;Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,ie+1,0,0,ze.width,ze.height,Ee,Ae,ze.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,ie+1,pe,ze.width,ze.height,0,Ee,Ae,ze.data)}}else{Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,0,0,Ee,Ae,R[V]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,pe,Ee,Ae,R[V]);for(let ie=0;ie<ae.length;ie++){const oe=ae[ie];Fe?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,ie+1,0,0,Ee,Ae,oe.image[V]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+V,ie+1,pe,Ee,Ae,oe.image[V])}}}y(I,de)&&w(s.TEXTURE_CUBE_MAP),te.__version=q.version,I.onUpdate&&I.onUpdate(I)}T.__version=I.version}function Oe(T,I,O,j,q){const te=r.convert(O.format,O.colorSpace),ue=r.convert(O.type),ne=b(O.internalFormat,te,ue,O.colorSpace);n.get(I).__hasExternalTextures||(q===s.TEXTURE_3D||q===s.TEXTURE_2D_ARRAY?t.texImage3D(q,0,ne,I.width,I.height,I.depth,0,te,ue,null):t.texImage2D(q,0,ne,I.width,I.height,0,te,ue,null)),t.bindFramebuffer(s.FRAMEBUFFER,T),We(I)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,j,q,n.get(O).__webglTexture,0,Te(I)):(q===s.TEXTURE_2D||q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,j,q,n.get(O).__webglTexture,0),t.bindFramebuffer(s.FRAMEBUFFER,null)}function G(T,I,O){if(s.bindRenderbuffer(s.RENDERBUFFER,T),I.depthBuffer&&!I.stencilBuffer){let j=s.DEPTH_COMPONENT16;if(O||We(I)){const q=I.depthTexture;q&&q.isDepthTexture&&(q.type===nn?j=s.DEPTH_COMPONENT32F:q.type===mi&&(j=s.DEPTH_COMPONENT24));const te=Te(I);We(I)?u.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,te,j,I.width,I.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,te,j,I.width,I.height)}else s.renderbufferStorage(s.RENDERBUFFER,j,I.width,I.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(I.depthBuffer&&I.stencilBuffer){const j=Te(I);O&&We(I)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,j,s.DEPTH24_STENCIL8,I.width,I.height):We(I)?u.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,j,s.DEPTH24_STENCIL8,I.width,I.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{const j=I.isWebGLMultipleRenderTargets===!0?I.texture:[I.texture];for(let q=0;q<j.length;q++){const te=j[q],ue=r.convert(te.format,te.colorSpace),ne=r.convert(te.type),R=b(te.internalFormat,ue,ne,te.colorSpace),ge=Te(I);O&&We(I)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ge,R,I.width,I.height):We(I)?u.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ge,R,I.width,I.height):s.renderbufferStorage(s.RENDERBUFFER,R,I.width,I.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ht(T,I){if(I&&I.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(I.depthTexture&&I.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(I.depthTexture).__webglTexture||I.depthTexture.image.width!==I.width||I.depthTexture.image.height!==I.height)&&(I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0),J(I.depthTexture,0);const j=n.get(I.depthTexture).__webglTexture,q=Te(I);if(I.depthTexture.format===Yi)We(I)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(I.depthTexture.format===Gr)We(I)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function _e(T){const I=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!I.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");ht(I.__webglFramebuffer,T)}else if(O){I.__webglDepthbuffer=[];for(let j=0;j<6;j++)t.bindFramebuffer(s.FRAMEBUFFER,I.__webglFramebuffer[j]),I.__webglDepthbuffer[j]=s.createRenderbuffer(),G(I.__webglDepthbuffer[j],T,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,I.__webglFramebuffer),I.__webglDepthbuffer=s.createRenderbuffer(),G(I.__webglDepthbuffer,T,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function Le(T,I,O){const j=n.get(T);I!==void 0&&Oe(j.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D),O!==void 0&&_e(T)}function Ce(T){const I=T.texture,O=n.get(T),j=n.get(I);T.addEventListener("dispose",X),T.isWebGLMultipleRenderTargets!==!0&&(j.__webglTexture===void 0&&(j.__webglTexture=s.createTexture()),j.__version=I.version,a.memory.textures++);const q=T.isWebGLCubeRenderTarget===!0,te=T.isWebGLMultipleRenderTargets===!0,ue=E(T)||o;if(q){O.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)O.__webglFramebuffer[ne]=s.createFramebuffer()}else{if(O.__webglFramebuffer=s.createFramebuffer(),te)if(i.drawBuffers){const ne=T.texture;for(let R=0,ge=ne.length;R<ge;R++){const de=n.get(ne[R]);de.__webglTexture===void 0&&(de.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&We(T)===!1){const ne=te?I:[I];O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let R=0;R<ne.length;R++){const ge=ne[R];O.__webglColorRenderbuffer[R]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[R]);const de=r.convert(ge.format,ge.colorSpace),Ee=r.convert(ge.type),Ae=b(ge.internalFormat,de,Ee,ge.colorSpace,T.isXRRenderTarget===!0),pe=Te(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,pe,Ae,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+R,s.RENDERBUFFER,O.__webglColorRenderbuffer[R])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),G(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(q){t.bindTexture(s.TEXTURE_CUBE_MAP,j.__webglTexture),me(s.TEXTURE_CUBE_MAP,I,ue);for(let ne=0;ne<6;ne++)Oe(O.__webglFramebuffer[ne],T,I,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne);y(I,ue)&&w(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){const ne=T.texture;for(let R=0,ge=ne.length;R<ge;R++){const de=ne[R],Ee=n.get(de);t.bindTexture(s.TEXTURE_2D,Ee.__webglTexture),me(s.TEXTURE_2D,de,ue),Oe(O.__webglFramebuffer,T,de,s.COLOR_ATTACHMENT0+R,s.TEXTURE_2D),y(de,ue)&&w(s.TEXTURE_2D)}t.unbindTexture()}else{let ne=s.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?ne=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ne,j.__webglTexture),me(ne,I,ue),Oe(O.__webglFramebuffer,T,I,s.COLOR_ATTACHMENT0,ne),y(I,ue)&&w(ne),t.unbindTexture()}T.depthBuffer&&_e(T)}function Ve(T){const I=E(T)||o,O=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let j=0,q=O.length;j<q;j++){const te=O[j];if(y(te,I)){const ue=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ne=n.get(te).__webglTexture;t.bindTexture(ue,ne),w(ue),t.unbindTexture()}}}function Re(T){if(o&&T.samples>0&&We(T)===!1){const I=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],O=T.width,j=T.height;let q=s.COLOR_BUFFER_BIT;const te=[],ue=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ne=n.get(T),R=T.isWebGLMultipleRenderTargets===!0;if(R)for(let ge=0;ge<I.length;ge++)t.bindFramebuffer(s.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,ne.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,ne.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ne.__webglFramebuffer);for(let ge=0;ge<I.length;ge++){te.push(s.COLOR_ATTACHMENT0+ge),T.depthBuffer&&te.push(ue);const de=ne.__ignoreDepthValues!==void 0?ne.__ignoreDepthValues:!1;if(de===!1&&(T.depthBuffer&&(q|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(q|=s.STENCIL_BUFFER_BIT)),R&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ne.__webglColorRenderbuffer[ge]),de===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[ue]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[ue])),R){const Ee=n.get(I[ge]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ee,0)}s.blitFramebuffer(0,0,O,j,0,0,O,j,q,s.NEAREST),f&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,te)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),R)for(let ge=0;ge<I.length;ge++){t.bindFramebuffer(s.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.RENDERBUFFER,ne.__webglColorRenderbuffer[ge]);const de=n.get(I[ge]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,ne.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ge,s.TEXTURE_2D,de,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,ne.__webglMultisampledFramebuffer)}}function Te(T){return Math.min(A,T.samples)}function We(T){const I=n.get(T);return o&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&I.__useRenderToTexture!==!1}function ut(T){const I=a.render.frame;m.get(T)!==I&&(m.set(T,I),T.update())}function Xe(T,I){const O=T.colorSpace,j=T.format,q=T.type;return T.isCompressedTexture===!0||T.format===hl||O!==pn&&O!==ni&&(O===xe?o===!1?e.has("EXT_sRGB")===!0&&j===Tt?(T.format=hl,T.minFilter=Rt,T.generateMipmaps=!1):I=UA.sRGBToLinear(I):(j!==Tt||q!==Mt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),I}this.allocateTextureUnit=z,this.resetTextureUnits=Q,this.setTexture2D=J,this.setTexture2DArray=le,this.setTexture3D=P,this.setTextureCube=ee,this.rebindTextures=Le,this.setupRenderTarget=Ce,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=We}function H0(s,e,t){const n=t.isWebGL2;function i(r,a=ni){let o;if(r===Mt)return s.UNSIGNED_BYTE;if(r===IA)return s.UNSIGNED_SHORT_4_4_4_4;if(r===yA)return s.UNSIGNED_SHORT_5_5_5_1;if(r===gp)return s.BYTE;if(r===mp)return s.SHORT;if(r===kl)return s.UNSIGNED_SHORT;if(r===CA)return s.INT;if(r===mi)return s.UNSIGNED_INT;if(r===nn)return s.FLOAT;if(r===sn)return n?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===_p)return s.ALPHA;if(r===Tt)return s.RGBA;if(r===Ep)return s.LUMINANCE;if(r===vp)return s.LUMINANCE_ALPHA;if(r===Yi)return s.DEPTH_COMPONENT;if(r===Gr)return s.DEPTH_STENCIL;if(r===hl)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===us)return s.RED;if(r===SA)return s.RED_INTEGER;if(r===As)return s.RG;if(r===MA)return s.RG_INTEGER;if(r===wA)return s.RGBA_INTEGER;if(r===da||r===ja||r===Za||r===pa)if(a===xe)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===da)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===ja)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Za)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===pa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===da)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===ja)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Za)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===pa)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===il||r===Lc||r===rl||r===Pc)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===il)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Lc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===rl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Pc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===TA)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===sl||r===al)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===sl)return a===xe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===al)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===ol||r===Uc||r===Nc||r===Fc||r===Qc||r===Oc||r===Gc||r===kc||r===Hc||r===zc||r===Vc||r===Wc||r===qc||r===Xc)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===ol)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Uc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Nc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Fc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Qc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Oc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Gc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===kc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Hc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===zc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Vc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Wc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===qc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Xc)return a===xe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===ga)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===ga)return a===xe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(r===xp||r===Yc||r===Kc||r===Jc)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===ga)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Yc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Kc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Jc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Xi?n?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class z0 extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class ei extends it{constructor(){super(),this.isGroup=!0,this.type="Group"}}const V0={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const p of e.hand.values()){const d=t.getJointPose(p,n),g=this._getHandJoint(c,p);d!==null&&(g.matrix.fromArray(d.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=d.radius),g.visible=d!==null}const h=c.joints["index-finger-tip"],A=c.joints["thumb-tip"],u=h.position.distanceTo(A.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(V0)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new ei;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class W0 extends It{constructor(e,t,n,i,r,a,o,l,c,h){if(h=h!==void 0?h:Yi,h!==Yi&&h!==Gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Yi&&(n=mi),n===void 0&&h===Gr&&(n=Xi),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:xt,this.minFilter=l!==void 0?l:xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class q0 extends qr{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,A=null,u=null,f=null,m=null;const p=t.getContextAttributes();let d=null,g=null;const x=[],_=[];let E=null;const C=new kt;C.layers.enable(1),C.viewport=new je;const y=new kt;y.layers.enable(2),y.viewport=new je;const w=[C,y],b=new z0;b.layers.enable(1),b.layers.enable(2);let v=null,M=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getCamera=function(){},this.setUserCamera=function(P){E=P},this.getController=function(P){let ee=x[P];return ee===void 0&&(ee=new Co,x[P]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(P){let ee=x[P];return ee===void 0&&(ee=new Co,x[P]=ee),ee.getGripSpace()},this.getHand=function(P){let ee=x[P];return ee===void 0&&(ee=new Co,x[P]=ee),ee.getHandSpace()};function H(P){const ee=_.indexOf(P.inputSource);if(ee===-1)return;const $=x[ee];$!==void 0&&($.update(P.inputSource,P.frame,c||a),$.dispatchEvent({type:P.type,data:P.inputSource}))}function X(){i.removeEventListener("select",H),i.removeEventListener("selectstart",H),i.removeEventListener("selectend",H),i.removeEventListener("squeeze",H),i.removeEventListener("squeezestart",H),i.removeEventListener("squeezeend",H),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",L);for(let P=0;P<x.length;P++){const ee=_[P];ee!==null&&(_[P]=null,x[P].disconnect(ee))}v=null,M=null,e.setRenderTarget(d),f=null,u=null,A=null,i=null,g=null,le.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(P){r=P,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(P){o=P,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(P){c=P},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return A},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(P){if(i=P,i!==null){if(d=e.getRenderTarget(),i.addEventListener("select",H),i.addEventListener("selectstart",H),i.addEventListener("selectend",H),i.addEventListener("squeeze",H),i.addEventListener("squeezestart",H),i.addEventListener("squeezeend",H),i.addEventListener("end",X),i.addEventListener("inputsourceschange",L),p.xrCompatible!==!0&&await t.makeXRCompatible(),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ee={antialias:i.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ee),i.updateRenderState({baseLayer:f}),g=new Sn(f.framebufferWidth,f.framebufferHeight,{format:Tt,type:Mt,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ee=null,$=null,se=null;p.depth&&(se=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=p.stencil?Gr:Yi,$=p.stencil?Xi:mi);const he={colorFormat:t.RGBA8,depthFormat:se,scaleFactor:r};A=new XRWebGLBinding(i,t),u=A.createProjectionLayer(he),i.updateRenderState({layers:[u]}),g=new Sn(u.textureWidth,u.textureHeight,{format:Tt,type:Mt,depthTexture:new W0(u.textureWidth,u.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const me=e.properties.get(g);me.__ignoreDepthValues=u.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),le.setContext(i),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function L(P){for(let ee=0;ee<P.removed.length;ee++){const $=P.removed[ee],se=_.indexOf($);se>=0&&(_[se]=null,x[se].disconnect($))}for(let ee=0;ee<P.added.length;ee++){const $=P.added[ee];let se=_.indexOf($);if(se===-1){for(let me=0;me<x.length;me++)if(me>=_.length){_.push($),se=me;break}else if(_[me]===null){_[me]=$,se=me;break}if(se===-1)break}const he=x[se];he&&he.connect($)}}const U=new D,N=new D;function W(P,ee,$){U.setFromMatrixPosition(ee.matrixWorld),N.setFromMatrixPosition($.matrixWorld);const se=U.distanceTo(N),he=ee.projectionMatrix.elements,me=$.projectionMatrix.elements,Be=he[14]/(he[10]-1),Ie=he[14]/(he[10]+1),ot=(he[9]+1)/he[5],Oe=(he[9]-1)/he[5],G=(he[8]-1)/he[0],ht=(me[8]+1)/me[0],_e=Be*G,Le=Be*ht,Ce=se/(-G+ht),Ve=Ce*-G;ee.matrixWorld.decompose(P.position,P.quaternion,P.scale),P.translateX(Ve),P.translateZ(Ce),P.matrixWorld.compose(P.position,P.quaternion,P.scale),P.matrixWorldInverse.copy(P.matrixWorld).invert();const Re=Be+Ce,Te=Ie+Ce,We=_e-Ve,ut=Le+(se-Ve),Xe=ot*Ie/Te*Re,T=Oe*Ie/Te*Re;P.projectionMatrix.makePerspective(We,ut,Xe,T,Re,Te),P.projectionMatrixInverse.copy(P.projectionMatrix).invert()}function Q(P,ee){ee===null?P.matrixWorld.copy(P.matrix):P.matrixWorld.multiplyMatrices(ee.matrixWorld,P.matrix),P.matrixWorldInverse.copy(P.matrixWorld).invert()}this.updateCameraXR=function(P){if(i===null)return P;E&&(P=E),b.near=y.near=C.near=P.near,b.far=y.far=C.far=P.far,(v!==b.near||M!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),v=b.near,M=b.far);const ee=P.parent,$=b.cameras;Q(b,ee);for(let se=0;se<$.length;se++)Q($[se],ee);return $.length===2?W(b,C,y):b.projectionMatrix.copy(C.projectionMatrix),E&&z(b,ee),b};function z(P,ee){const $=E;ee===null?$.matrix.copy(P.matrixWorld):($.matrix.copy(ee.matrixWorld),$.matrix.invert(),$.matrix.multiply(P.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0);const se=$.children;for(let he=0,me=se.length;he<me;he++)se[he].updateMatrixWorld(!0);$.projectionMatrix.copy(P.projectionMatrix),$.projectionMatrixInverse.copy(P.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Hr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(P){l=P,u!==null&&(u.fixedFoveation=P),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=P)};let Z=null;function J(P,ee){if(h=ee.getViewerPose(c||a),m=ee,h!==null){const $=h.views;f!==null&&(e.setRenderTargetFramebuffer(g,f.framebuffer),e.setRenderTarget(g));let se=!1;$.length!==b.cameras.length&&(b.cameras.length=0,se=!0);for(let he=0;he<$.length;he++){const me=$[he];let Be=null;if(f!==null)Be=f.getViewport(me);else{const ot=A.getViewSubImage(u,me);Be=ot.viewport,he===0&&(e.setRenderTargetTextures(g,ot.colorTexture,u.ignoreDepthValues?void 0:ot.depthStencilTexture),e.setRenderTarget(g))}let Ie=w[he];Ie===void 0&&(Ie=new kt,Ie.layers.enable(he),Ie.viewport=new je,w[he]=Ie),Ie.matrix.fromArray(me.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(me.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(Be.x,Be.y,Be.width,Be.height),he===0&&(b.matrix.copy(Ie.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),se===!0&&b.cameras.push(Ie)}}for(let $=0;$<x.length;$++){const se=_[$],he=x[$];se!==null&&he!==void 0&&he.update(se,ee,c||a)}Z&&Z(P,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),m=null}const le=new qA;le.setAnimationLoop(J),this.setAnimationLoop=function(P){Z=P},this.dispose=function(){}}}function X0(s,e){function t(d,g){d.matrixAutoUpdate===!0&&d.updateMatrix(),g.value.copy(d.matrix)}function n(d,g){g.color.getRGB(d.fogColor.value,zA(s)),g.isFog?(d.fogNear.value=g.near,d.fogFar.value=g.far):g.isFogExp2&&(d.fogDensity.value=g.density)}function i(d,g,x,_,E){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(d,g):g.isMeshToonMaterial?(r(d,g),A(d,g)):g.isMeshPhongMaterial?(r(d,g),h(d,g)):g.isMeshStandardMaterial?(r(d,g),u(d,g),g.isMeshPhysicalMaterial&&f(d,g,E)):g.isMeshMatcapMaterial?(r(d,g),m(d,g)):g.isMeshDepthMaterial?r(d,g):g.isMeshDistanceMaterial?(r(d,g),p(d,g)):g.isMeshNormalMaterial?r(d,g):g.isLineBasicMaterial?(a(d,g),g.isLineDashedMaterial&&o(d,g)):g.isPointsMaterial?l(d,g,x,_):g.isSpriteMaterial?c(d,g):g.isShadowMaterial?(d.color.value.copy(g.color),d.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(d,g){d.opacity.value=g.opacity,g.color&&d.diffuse.value.copy(g.color),g.emissive&&d.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(d.map.value=g.map,t(g.map,d.mapTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.bumpMap&&(d.bumpMap.value=g.bumpMap,t(g.bumpMap,d.bumpMapTransform),d.bumpScale.value=g.bumpScale,g.side===Yt&&(d.bumpScale.value*=-1)),g.normalMap&&(d.normalMap.value=g.normalMap,t(g.normalMap,d.normalMapTransform),d.normalScale.value.copy(g.normalScale),g.side===Yt&&d.normalScale.value.negate()),g.displacementMap&&(d.displacementMap.value=g.displacementMap,t(g.displacementMap,d.displacementMapTransform),d.displacementScale.value=g.displacementScale,d.displacementBias.value=g.displacementBias),g.emissiveMap&&(d.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,d.emissiveMapTransform)),g.specularMap&&(d.specularMap.value=g.specularMap,t(g.specularMap,d.specularMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest);const x=e.get(g).envMap;if(x&&(d.envMap.value=x,d.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=g.reflectivity,d.ior.value=g.ior,d.refractionRatio.value=g.refractionRatio),g.lightMap){d.lightMap.value=g.lightMap;const _=s.useLegacyLights===!0?Math.PI:1;d.lightMapIntensity.value=g.lightMapIntensity*_,t(g.lightMap,d.lightMapTransform)}g.aoMap&&(d.aoMap.value=g.aoMap,d.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,d.aoMapTransform))}function a(d,g){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,g.map&&(d.map.value=g.map,t(g.map,d.mapTransform))}function o(d,g){d.dashSize.value=g.dashSize,d.totalSize.value=g.dashSize+g.gapSize,d.scale.value=g.scale}function l(d,g,x,_){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,d.size.value=g.size*x,d.scale.value=_*.5,g.map&&(d.map.value=g.map,t(g.map,d.uvTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest)}function c(d,g){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,d.rotation.value=g.rotation,g.map&&(d.map.value=g.map,t(g.map,d.mapTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest)}function h(d,g){d.specular.value.copy(g.specular),d.shininess.value=Math.max(g.shininess,1e-4)}function A(d,g){g.gradientMap&&(d.gradientMap.value=g.gradientMap)}function u(d,g){d.metalness.value=g.metalness,g.metalnessMap&&(d.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,d.metalnessMapTransform)),d.roughness.value=g.roughness,g.roughnessMap&&(d.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,d.roughnessMapTransform)),e.get(g).envMap&&(d.envMapIntensity.value=g.envMapIntensity)}function f(d,g,x){d.ior.value=g.ior,g.sheen>0&&(d.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),d.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(d.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,d.sheenColorMapTransform)),g.sheenRoughnessMap&&(d.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,d.sheenRoughnessMapTransform))),g.clearcoat>0&&(d.clearcoat.value=g.clearcoat,d.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(d.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,d.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(d.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Yt&&d.clearcoatNormalScale.value.negate())),g.iridescence>0&&(d.iridescence.value=g.iridescence,d.iridescenceIOR.value=g.iridescenceIOR,d.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(d.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,d.iridescenceMapTransform)),g.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),g.transmission>0&&(d.transmission.value=g.transmission,d.transmissionSamplerMap.value=x.texture,d.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(d.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,d.transmissionMapTransform)),d.thickness.value=g.thickness,g.thicknessMap&&(d.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=g.attenuationDistance,d.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(d.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(d.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=g.specularIntensity,d.specularColor.value.copy(g.specularColor),g.specularColorMap&&(d.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,d.specularColorMapTransform)),g.specularIntensityMap&&(d.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,d.specularIntensityMapTransform))}function m(d,g){g.matcap&&(d.matcap.value=g.matcap)}function p(d,g){const x=e.get(g).light;d.referencePosition.value.setFromMatrixPosition(x.matrixWorld),d.nearDistance.value=x.shadow.camera.near,d.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Y0(s,e,t,n){let i={},r={},a=[];const o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,_){const E=_.program;n.uniformBlockBinding(x,E)}function c(x,_){let E=i[x.id];E===void 0&&(m(x),E=h(x),i[x.id]=E,x.addEventListener("dispose",d));const C=_.program;n.updateUBOMapping(x,C);const y=e.render.frame;r[x.id]!==y&&(u(x),r[x.id]=y)}function h(x){const _=A();x.__bindingPointIndex=_;const E=s.createBuffer(),C=x.__size,y=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,E),s.bufferData(s.UNIFORM_BUFFER,C,y),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,_,E),E}function A(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const _=i[x.id],E=x.uniforms,C=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,_);for(let y=0,w=E.length;y<w;y++){const b=E[y];if(f(b,y,C)===!0){const v=b.__offset,M=Array.isArray(b.value)?b.value:[b.value];let H=0;for(let X=0;X<M.length;X++){const L=M[X],U=p(L);typeof L=="number"?(b.__data[0]=L,s.bufferSubData(s.UNIFORM_BUFFER,v+H,b.__data)):L.isMatrix3?(b.__data[0]=L.elements[0],b.__data[1]=L.elements[1],b.__data[2]=L.elements[2],b.__data[3]=L.elements[0],b.__data[4]=L.elements[3],b.__data[5]=L.elements[4],b.__data[6]=L.elements[5],b.__data[7]=L.elements[0],b.__data[8]=L.elements[6],b.__data[9]=L.elements[7],b.__data[10]=L.elements[8],b.__data[11]=L.elements[0]):(L.toArray(b.__data,H),H+=U.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,v,b.__data)}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,_,E){const C=x.value;if(E[_]===void 0){if(typeof C=="number")E[_]=C;else{const y=Array.isArray(C)?C:[C],w=[];for(let b=0;b<y.length;b++)w.push(y[b].clone());E[_]=w}return!0}else if(typeof C=="number"){if(E[_]!==C)return E[_]=C,!0}else{const y=Array.isArray(E[_])?E[_]:[E[_]],w=Array.isArray(C)?C:[C];for(let b=0;b<y.length;b++){const v=y[b];if(v.equals(w[b])===!1)return v.copy(w[b]),!0}}return!1}function m(x){const _=x.uniforms;let E=0;const C=16;let y=0;for(let w=0,b=_.length;w<b;w++){const v=_[w],M={boundary:0,storage:0},H=Array.isArray(v.value)?v.value:[v.value];for(let X=0,L=H.length;X<L;X++){const U=H[X],N=p(U);M.boundary+=N.boundary,M.storage+=N.storage}if(v.__data=new Float32Array(M.storage/Float32Array.BYTES_PER_ELEMENT),v.__offset=E,w>0){y=E%C;const X=C-y;y!==0&&X-M.boundary<0&&(E+=C-y,v.__offset=E)}E+=M.storage}return y=E%C,y>0&&(E+=C-y),x.__size=E,x.__cache={},this}function p(x){const _={boundary:0,storage:0};return typeof x=="number"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function d(x){const _=x.target;_.removeEventListener("dispose",d);const E=a.indexOf(_.__bindingPointIndex);a.splice(E,1),s.deleteBuffer(i[_.id]),delete i[_.id],delete r[_.id]}function g(){for(const x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:g}}function K0(){const s=Ts("canvas");return s.style.display="block",s}class jA{constructor(e={}){const{canvas:t=K0(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:A=!1}=e;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=a;const f=new Uint32Array(4),m=new Int32Array(4);let p=null,d=null;const g=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputColorSpace=xe,this.useLegacyLights=!0,this.toneMapping=Pn,this.toneMappingExposure=1;const _=this;let E=!1,C=0,y=0,w=null,b=-1,v=null;const M=new je,H=new je;let X=null;const L=new we(0);let U=0,N=t.width,W=t.height,Q=1,z=null,Z=null;const J=new je(0,0,N,W),le=new je(0,0,N,W);let P=!1;const ee=new zl;let $=!1,se=!1,he=null;const me=new Ne,Be=new ce,Ie=new D,ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Oe(){return w===null?Q:1}let G=n;function ht(S,k){for(let Y=0;Y<S.length;Y++){const F=S[Y],K=t.getContext(F,k);if(K!==null)return K}return null}try{const S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:A};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ol}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",V,!1),t.addEventListener("webglcontextcreationerror",ie,!1),G===null){const k=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&k.shift(),G=ht(k,S),G===null)throw ht(k)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}G instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let _e,Le,Ce,Ve,Re,Te,We,ut,Xe,T,I,O,j,q,te,ue,ne,R,ge,de,Ee,Ae,pe,Fe;function Ze(){_e=new aE(G),Le=new eE(G,_e,e),_e.init(Le),Ae=new H0(G,_e,Le),Ce=new G0(G,_e,Le),Ve=new cE(G),Re=new M0,Te=new k0(G,_e,Ce,Re,Le,Ae,Ve),We=new nE(_),ut=new sE(_),Xe=new xg(G,Le),pe=new Z_(G,_e,Xe,Le),T=new oE(G,Xe,Ve,pe),I=new fE(G,T,Xe,Ve),ge=new AE(G,Le,Te),ue=new tE(Re),O=new S0(_,We,ut,_e,Le,pe,ue),j=new X0(_,Re),q=new T0,te=new P0(_e,Le),R=new j_(_,We,ut,Ce,I,u,l),ne=new O0(_,I,Le),Fe=new Y0(G,Ve,Le,Ce),de=new $_(G,_e,Ve,Le),Ee=new lE(G,_e,Ve,Le),Ve.programs=O.programs,_.capabilities=Le,_.extensions=_e,_.properties=Re,_.renderLists=q,_.shadowMap=ne,_.state=Ce,_.info=Ve}Ze();const B=new q0(_,G);this.xr=B,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const S=_e.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=_e.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(S){S!==void 0&&(Q=S,this.setSize(N,W,!1))},this.getSize=function(S){return S.set(N,W)},this.setSize=function(S,k,Y=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=S,W=k,t.width=Math.floor(S*Q),t.height=Math.floor(k*Q),Y===!0&&(t.style.width=S+"px",t.style.height=k+"px"),this.setViewport(0,0,S,k)},this.getDrawingBufferSize=function(S){return S.set(N*Q,W*Q).floor()},this.setDrawingBufferSize=function(S,k,Y){N=S,W=k,Q=Y,t.width=Math.floor(S*Y),t.height=Math.floor(k*Y),this.setViewport(0,0,S,k)},this.getCurrentViewport=function(S){return S.copy(M)},this.getViewport=function(S){return S.copy(J)},this.setViewport=function(S,k,Y,F){S.isVector4?J.set(S.x,S.y,S.z,S.w):J.set(S,k,Y,F),Ce.viewport(M.copy(J).multiplyScalar(Q).floor())},this.getScissor=function(S){return S.copy(le)},this.setScissor=function(S,k,Y,F){S.isVector4?le.set(S.x,S.y,S.z,S.w):le.set(S,k,Y,F),Ce.scissor(H.copy(le).multiplyScalar(Q).floor())},this.getScissorTest=function(){return P},this.setScissorTest=function(S){Ce.setScissorTest(P=S)},this.setOpaqueSort=function(S){z=S},this.setTransparentSort=function(S){Z=S},this.getClearColor=function(S){return S.copy(R.getClearColor())},this.setClearColor=function(){R.setClearColor.apply(R,arguments)},this.getClearAlpha=function(){return R.getClearAlpha()},this.setClearAlpha=function(){R.setClearAlpha.apply(R,arguments)},this.clear=function(S=!0,k=!0,Y=!0){let F=0;if(S){let K=!1;if(w!==null){const fe=w.texture.format;K=fe===wA||fe===MA||fe===SA}if(K){const fe=w.texture.type,ve=fe===Mt||fe===mi||fe===kl||fe===Xi||fe===IA||fe===yA,Se=R.getClearColor(),Me=R.getClearAlpha(),Qe=Se.r,be=Se.g,De=Se.b,$e=Re.get(w).__webglFramebuffer;ve?(f[0]=Qe,f[1]=be,f[2]=De,f[3]=Me,G.clearBufferuiv(G.COLOR,$e,f)):(m[0]=Qe,m[1]=be,m[2]=De,m[3]=Me,G.clearBufferiv(G.COLOR,$e,m))}else F|=G.COLOR_BUFFER_BIT}k&&(F|=G.DEPTH_BUFFER_BIT),Y&&(F|=G.STENCIL_BUFFER_BIT),G.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",V,!1),t.removeEventListener("webglcontextcreationerror",ie,!1),q.dispose(),te.dispose(),Re.dispose(),We.dispose(),ut.dispose(),I.dispose(),pe.dispose(),Fe.dispose(),O.dispose(),B.dispose(),B.removeEventListener("sessionstart",st),B.removeEventListener("sessionend",Tn),he&&(he.dispose(),he=null),Nt.stop()};function ae(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function V(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const S=Ve.autoReset,k=ne.enabled,Y=ne.autoUpdate,F=ne.needsUpdate,K=ne.type;Ze(),Ve.autoReset=S,ne.enabled=k,ne.autoUpdate=Y,ne.needsUpdate=F,ne.type=K}function ie(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function oe(S){const k=S.target;k.removeEventListener("dispose",oe),ze(k)}function ze(S){rt(S),Re.remove(S)}function rt(S){const k=Re.get(S).programs;k!==void 0&&(k.forEach(function(Y){O.releaseProgram(Y)}),S.isShaderMaterial&&O.releaseShaderCache(S))}this.renderBufferDirect=function(S,k,Y,F,K,fe){k===null&&(k=ot);const ve=K.isMesh&&K.matrixWorld.determinant()<0,Se=wf(S,k,Y,F,K);Ce.setMaterial(F,ve);let Me=Y.index,Qe=1;F.wireframe===!0&&(Me=T.getWireframeAttribute(Y),Qe=2);const be=Y.drawRange,De=Y.attributes.position;let $e=be.start*Qe,lt=(be.start+be.count)*Qe;fe!==null&&($e=Math.max($e,fe.start*Qe),lt=Math.min(lt,(fe.start+fe.count)*Qe)),Me!==null?($e=Math.max($e,0),lt=Math.min(lt,Me.count)):De!=null&&($e=Math.max($e,0),lt=Math.min(lt,De.count));const gn=lt-$e;if(gn<0||gn===1/0)return;pe.setup(K,F,Se,Y,Me);let Gn,ft=de;if(Me!==null&&(Gn=Xe.get(Me),ft=Ee,ft.setIndex(Gn)),K.isMesh)F.wireframe===!0?(Ce.setLineWidth(F.wireframeLinewidth*Oe()),ft.setMode(G.LINES)):ft.setMode(G.TRIANGLES);else if(K.isLine){let He=F.linewidth;He===void 0&&(He=1),Ce.setLineWidth(He*Oe()),K.isLineSegments?ft.setMode(G.LINES):K.isLineLoop?ft.setMode(G.LINE_LOOP):ft.setMode(G.LINE_STRIP)}else K.isPoints?ft.setMode(G.POINTS):K.isSprite&&ft.setMode(G.TRIANGLES);if(K.isInstancedMesh)ft.renderInstances($e,gn,K.count);else if(Y.isInstancedBufferGeometry){const He=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Qa=Math.min(Y.instanceCount,He);ft.renderInstances($e,gn,Qa)}else ft.render($e,gn)},this.compile=function(S,k){function Y(F,K,fe){F.transparent===!0&&F.side===Cn&&F.forceSinglePass===!1?(F.side=Yt,F.needsUpdate=!0,Fs(F,K,fe),F.side=si,F.needsUpdate=!0,Fs(F,K,fe),F.side=Cn):Fs(F,K,fe)}d=te.get(S),d.init(),x.push(d),S.traverseVisible(function(F){F.isLight&&F.layers.test(k.layers)&&(d.pushLight(F),F.castShadow&&d.pushShadow(F))}),d.setupLights(_.useLegacyLights),S.traverse(function(F){const K=F.material;if(K)if(Array.isArray(K))for(let fe=0;fe<K.length;fe++){const ve=K[fe];Y(ve,S,F)}else Y(K,S,F)}),x.pop(),d=null};let At=null;function Ti(S){At&&At(S)}function st(){Nt.stop()}function Tn(){Nt.start()}const Nt=new qA;Nt.setAnimationLoop(Ti),typeof self<"u"&&Nt.setContext(self),this.setAnimationLoop=function(S){At=S,B.setAnimationLoop(S),S===null?Nt.stop():Nt.start()},B.addEventListener("sessionstart",st),B.addEventListener("sessionend",Tn),this.render=function(S,k){if(k!==void 0&&k.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(k=B.updateCameraXR(k)),S.isScene===!0&&S.onBeforeRender(_,S,k,w),d=te.get(S,x.length),d.init(),x.push(d),me.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ee.setFromProjectionMatrix(me),se=this.localClippingEnabled,$=ue.init(this.clippingPlanes,se),p=q.get(S,g.length),p.init(),g.push(p),ac(S,k,0,_.sortObjects),p.finish(),_.sortObjects===!0&&p.sort(z,Z),$===!0&&ue.beginShadows();const Y=d.state.shadowsArray;if(ne.render(Y,S,k),$===!0&&ue.endShadows(),this.info.autoReset===!0&&this.info.reset(),this.info.render.frame++,R.render(p,S),d.setupLights(_.useLegacyLights),k.isArrayCamera){const F=k.cameras;for(let K=0,fe=F.length;K<fe;K++){const ve=F[K];oc(p,S,ve,ve.viewport)}}else oc(p,S,k);w!==null&&(Te.updateMultisampleRenderTarget(w),Te.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(_,S,k),pe.resetDefaultState(),b=-1,v=null,x.pop(),x.length>0?d=x[x.length-1]:d=null,g.pop(),g.length>0?p=g[g.length-1]:p=null};function ac(S,k,Y,F){if(S.visible===!1)return;if(S.layers.test(k.layers)){if(S.isGroup)Y=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(k);else if(S.isLight)d.pushLight(S),S.castShadow&&d.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ee.intersectsSprite(S)){F&&Ie.setFromMatrixPosition(S.matrixWorld).applyMatrix4(me);const ve=I.update(S),Se=S.material;Se.visible&&p.push(S,ve,Se,Y,Ie.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ee.intersectsObject(S))){S.isSkinnedMesh&&S.skeleton.frame!==Ve.render.frame&&(S.skeleton.update(),S.skeleton.frame=Ve.render.frame);const ve=I.update(S),Se=S.material;if(F&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ie.copy(S.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ie.copy(ve.boundingSphere.center)),Ie.applyMatrix4(S.matrixWorld).applyMatrix4(me)),Array.isArray(Se)){const Me=ve.groups;for(let Qe=0,be=Me.length;Qe<be;Qe++){const De=Me[Qe],$e=Se[De.materialIndex];$e&&$e.visible&&p.push(S,ve,$e,Y,Ie.z,De)}}else Se.visible&&p.push(S,ve,Se,Y,Ie.z,null)}}const fe=S.children;for(let ve=0,Se=fe.length;ve<Se;ve++)ac(fe[ve],k,Y,F)}function oc(S,k,Y,F){const K=S.opaque,fe=S.transmissive,ve=S.transparent;d.setupLightsView(Y),$===!0&&ue.setGlobalState(_.clippingPlanes,Y),fe.length>0&&Mf(K,fe,k,Y),F&&Ce.viewport(M.copy(F)),K.length>0&&Ns(K,k,Y),fe.length>0&&Ns(fe,k,Y),ve.length>0&&Ns(ve,k,Y),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function Mf(S,k,Y,F){const K=Le.isWebGL2;he===null&&(he=new Sn(1,1,{generateMipmaps:!0,type:_e.has("EXT_color_buffer_half_float")?sn:Mt,minFilter:yi,samples:K&&o===!0?4:0})),_.getDrawingBufferSize(Be),K?he.setSize(Be.x,Be.y):he.setSize(ba(Be.x),ba(Be.y));const fe=_.getRenderTarget();_.setRenderTarget(he),_.getClearColor(L),U=_.getClearAlpha(),U<1&&_.setClearColor(16777215,.5),_.clear();const ve=_.toneMapping;_.toneMapping=Pn,Ns(S,Y,F),Te.updateMultisampleRenderTarget(he),Te.updateRenderTargetMipmap(he);let Se=!1;for(let Me=0,Qe=k.length;Me<Qe;Me++){const be=k[Me],De=be.object,$e=be.geometry,lt=be.material,gn=be.group;if(lt.side===Cn&&De.layers.test(F.layers)){const Gn=lt.side;lt.side=Yt,lt.needsUpdate=!0,lc(De,Y,F,$e,lt,gn),lt.side=Gn,lt.needsUpdate=!0,Se=!0}}Se===!0&&(Te.updateMultisampleRenderTarget(he),Te.updateRenderTargetMipmap(he)),_.setRenderTarget(fe),_.setClearColor(L,U),_.toneMapping=ve}function Ns(S,k,Y){const F=k.isScene===!0?k.overrideMaterial:null;for(let K=0,fe=S.length;K<fe;K++){const ve=S[K],Se=ve.object,Me=ve.geometry,Qe=F===null?ve.material:F,be=ve.group;Se.layers.test(Y.layers)&&lc(Se,k,Y,Me,Qe,be)}}function lc(S,k,Y,F,K,fe){S.onBeforeRender(_,k,Y,F,K,fe),S.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),K.onBeforeRender(_,k,Y,F,S,fe),K.transparent===!0&&K.side===Cn&&K.forceSinglePass===!1?(K.side=Yt,K.needsUpdate=!0,_.renderBufferDirect(Y,k,F,K,S,fe),K.side=si,K.needsUpdate=!0,_.renderBufferDirect(Y,k,F,K,S,fe),K.side=Cn):_.renderBufferDirect(Y,k,F,K,S,fe),S.onAfterRender(_,k,Y,F,K,fe)}function Fs(S,k,Y){k.isScene!==!0&&(k=ot);const F=Re.get(S),K=d.state.lights,fe=d.state.shadowsArray,ve=K.state.version,Se=O.getParameters(S,K.state,fe,k,Y),Me=O.getProgramCacheKey(Se);let Qe=F.programs;F.environment=S.isMeshStandardMaterial?k.environment:null,F.fog=k.fog,F.envMap=(S.isMeshStandardMaterial?ut:We).get(S.envMap||F.environment),Qe===void 0&&(S.addEventListener("dispose",oe),Qe=new Map,F.programs=Qe);let be=Qe.get(Me);if(be!==void 0){if(F.currentProgram===be&&F.lightsStateVersion===ve)return cc(S,Se),be}else Se.uniforms=O.getUniforms(S),S.onBuild(Y,Se,_),S.onBeforeCompile(Se,_),be=O.acquireProgram(Se,Me),Qe.set(Me,be),F.uniforms=Se.uniforms;const De=F.uniforms;(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(De.clippingPlanes=ue.uniform),cc(S,Se),F.needsLights=bf(S),F.lightsStateVersion=ve,F.needsLights&&(De.ambientLightColor.value=K.state.ambient,De.lightProbe.value=K.state.probe,De.directionalLights.value=K.state.directional,De.directionalLightShadows.value=K.state.directionalShadow,De.spotLights.value=K.state.spot,De.spotLightShadows.value=K.state.spotShadow,De.rectAreaLights.value=K.state.rectArea,De.ltc_1.value=K.state.rectAreaLTC1,De.ltc_2.value=K.state.rectAreaLTC2,De.pointLights.value=K.state.point,De.pointLightShadows.value=K.state.pointShadow,De.hemisphereLights.value=K.state.hemi,De.directionalShadowMap.value=K.state.directionalShadowMap,De.directionalShadowMatrix.value=K.state.directionalShadowMatrix,De.spotShadowMap.value=K.state.spotShadowMap,De.spotLightMatrix.value=K.state.spotLightMatrix,De.spotLightMap.value=K.state.spotLightMap,De.pointShadowMap.value=K.state.pointShadowMap,De.pointShadowMatrix.value=K.state.pointShadowMatrix);const $e=be.getUniforms(),lt=ma.seqWithValue($e.seq,De);return F.currentProgram=be,F.uniformsList=lt,be}function cc(S,k){const Y=Re.get(S);Y.outputColorSpace=k.outputColorSpace,Y.instancing=k.instancing,Y.skinning=k.skinning,Y.morphTargets=k.morphTargets,Y.morphNormals=k.morphNormals,Y.morphColors=k.morphColors,Y.morphTargetsCount=k.morphTargetsCount,Y.numClippingPlanes=k.numClippingPlanes,Y.numIntersection=k.numClipIntersection,Y.vertexAlphas=k.vertexAlphas,Y.vertexTangents=k.vertexTangents,Y.toneMapping=k.toneMapping}function wf(S,k,Y,F,K){k.isScene!==!0&&(k=ot),Te.resetTextureUnits();const fe=k.fog,ve=F.isMeshStandardMaterial?k.environment:null,Se=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:pn,Me=(F.isMeshStandardMaterial?ut:We).get(F.envMap||ve),Qe=F.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,be=!!Y.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),De=!!Y.morphAttributes.position,$e=!!Y.morphAttributes.normal,lt=!!Y.morphAttributes.color,gn=F.toneMapped?_.toneMapping:Pn,Gn=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ft=Gn!==void 0?Gn.length:0,He=Re.get(F),Qa=d.state.lights;if($===!0&&(se===!0||S!==v)){const Jt=S===v&&F.id===b;ue.setState(F,S,Jt)}let Et=!1;F.version===He.__version?(He.needsLights&&He.lightsStateVersion!==Qa.state.version||He.outputColorSpace!==Se||K.isInstancedMesh&&He.instancing===!1||!K.isInstancedMesh&&He.instancing===!0||K.isSkinnedMesh&&He.skinning===!1||!K.isSkinnedMesh&&He.skinning===!0||He.envMap!==Me||F.fog===!0&&He.fog!==fe||He.numClippingPlanes!==void 0&&(He.numClippingPlanes!==ue.numPlanes||He.numIntersection!==ue.numIntersection)||He.vertexAlphas!==Qe||He.vertexTangents!==be||He.morphTargets!==De||He.morphNormals!==$e||He.morphColors!==lt||He.toneMapping!==gn||Le.isWebGL2===!0&&He.morphTargetsCount!==ft)&&(Et=!0):(Et=!0,He.__version=F.version);let bi=He.currentProgram;Et===!0&&(bi=Fs(F,k,K));let hc=!1,Zr=!1,Oa=!1;const Ft=bi.getUniforms(),Bi=He.uniforms;if(Ce.useProgram(bi.program)&&(hc=!0,Zr=!0,Oa=!0),F.id!==b&&(b=F.id,Zr=!0),hc||v!==S){if(Ft.setValue(G,"projectionMatrix",S.projectionMatrix),Le.logarithmicDepthBuffer&&Ft.setValue(G,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),v!==S&&(v=S,Zr=!0,Oa=!0),F.isShaderMaterial||F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshStandardMaterial||F.envMap){const Jt=Ft.map.cameraPosition;Jt!==void 0&&Jt.setValue(G,Ie.setFromMatrixPosition(S.matrixWorld))}(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Ft.setValue(G,"isOrthographic",S.isOrthographicCamera===!0),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial||F.isShadowMaterial||K.isSkinnedMesh)&&Ft.setValue(G,"viewMatrix",S.matrixWorldInverse)}if(K.isSkinnedMesh){Ft.setOptional(G,K,"bindMatrix"),Ft.setOptional(G,K,"bindMatrixInverse");const Jt=K.skeleton;Jt&&(Le.floatVertexTextures?(Jt.boneTexture===null&&Jt.computeBoneTexture(),Ft.setValue(G,"boneTexture",Jt.boneTexture,Te),Ft.setValue(G,"boneTextureSize",Jt.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const Ga=Y.morphAttributes;if((Ga.position!==void 0||Ga.normal!==void 0||Ga.color!==void 0&&Le.isWebGL2===!0)&&ge.update(K,Y,bi),(Zr||He.receiveShadow!==K.receiveShadow)&&(He.receiveShadow=K.receiveShadow,Ft.setValue(G,"receiveShadow",K.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(Bi.envMap.value=Me,Bi.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),Zr&&(Ft.setValue(G,"toneMappingExposure",_.toneMappingExposure),He.needsLights&&Tf(Bi,Oa),fe&&F.fog===!0&&j.refreshFogUniforms(Bi,fe),j.refreshMaterialUniforms(Bi,F,Q,W,he),ma.upload(G,He.uniformsList,Bi,Te)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(ma.upload(G,He.uniformsList,Bi,Te),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Ft.setValue(G,"center",K.center),Ft.setValue(G,"modelViewMatrix",K.modelViewMatrix),Ft.setValue(G,"normalMatrix",K.normalMatrix),Ft.setValue(G,"modelMatrix",K.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const Jt=F.uniformsGroups;for(let ka=0,Bf=Jt.length;ka<Bf;ka++)if(Le.isWebGL2){const uc=Jt[ka];Fe.update(uc,bi),Fe.bind(uc,bi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return bi}function Tf(S,k){S.ambientLightColor.needsUpdate=k,S.lightProbe.needsUpdate=k,S.directionalLights.needsUpdate=k,S.directionalLightShadows.needsUpdate=k,S.pointLights.needsUpdate=k,S.pointLightShadows.needsUpdate=k,S.spotLights.needsUpdate=k,S.spotLightShadows.needsUpdate=k,S.rectAreaLights.needsUpdate=k,S.hemisphereLights.needsUpdate=k}function bf(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,k,Y){Re.get(S.texture).__webglTexture=k,Re.get(S.depthTexture).__webglTexture=Y;const F=Re.get(S);F.__hasExternalTextures=!0,F.__hasExternalTextures&&(F.__autoAllocateDepthBuffer=Y===void 0,F.__autoAllocateDepthBuffer||_e.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(S,k){const Y=Re.get(S);Y.__webglFramebuffer=k,Y.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(S,k=0,Y=0){w=S,C=k,y=Y;let F=!0,K=null,fe=!1,ve=!1;if(S){const Me=Re.get(S);Me.__useDefaultFramebuffer!==void 0?(Ce.bindFramebuffer(G.FRAMEBUFFER,null),F=!1):Me.__webglFramebuffer===void 0?Te.setupRenderTarget(S):Me.__hasExternalTextures&&Te.rebindTextures(S,Re.get(S.texture).__webglTexture,Re.get(S.depthTexture).__webglTexture);const Qe=S.texture;(Qe.isData3DTexture||Qe.isDataArrayTexture||Qe.isCompressedArrayTexture)&&(ve=!0);const be=Re.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(K=be[k],fe=!0):Le.isWebGL2&&S.samples>0&&Te.useMultisampledRTT(S)===!1?K=Re.get(S).__webglMultisampledFramebuffer:K=be,M.copy(S.viewport),H.copy(S.scissor),X=S.scissorTest}else M.copy(J).multiplyScalar(Q).floor(),H.copy(le).multiplyScalar(Q).floor(),X=P;if(Ce.bindFramebuffer(G.FRAMEBUFFER,K)&&Le.drawBuffers&&F&&Ce.drawBuffers(S,K),Ce.viewport(M),Ce.scissor(H),Ce.setScissorTest(X),fe){const Me=Re.get(S.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+k,Me.__webglTexture,Y)}else if(ve){const Me=Re.get(S.texture),Qe=k||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,Me.__webglTexture,Y||0,Qe)}b=-1},this.readRenderTargetPixels=function(S,k,Y,F,K,fe,ve){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Re.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ve!==void 0&&(Se=Se[ve]),Se){Ce.bindFramebuffer(G.FRAMEBUFFER,Se);try{const Me=S.texture,Qe=Me.format,be=Me.type;if(Qe!==Tt&&Ae.convert(Qe)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const De=be===sn&&(_e.has("EXT_color_buffer_half_float")||Le.isWebGL2&&_e.has("EXT_color_buffer_float"));if(be!==Mt&&Ae.convert(be)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&!(be===nn&&(Le.isWebGL2||_e.has("OES_texture_float")||_e.has("WEBGL_color_buffer_float")))&&!De){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=S.width-F&&Y>=0&&Y<=S.height-K&&G.readPixels(k,Y,F,K,Ae.convert(Qe),Ae.convert(be),fe)}finally{const Me=w!==null?Re.get(w).__webglFramebuffer:null;Ce.bindFramebuffer(G.FRAMEBUFFER,Me)}}},this.copyFramebufferToTexture=function(S,k,Y=0){const F=Math.pow(2,-Y),K=Math.floor(k.image.width*F),fe=Math.floor(k.image.height*F);Te.setTexture2D(k,0),G.copyTexSubImage2D(G.TEXTURE_2D,Y,0,0,S.x,S.y,K,fe),Ce.unbindTexture()},this.copyTextureToTexture=function(S,k,Y,F=0){const K=k.image.width,fe=k.image.height,ve=Ae.convert(Y.format),Se=Ae.convert(Y.type);Te.setTexture2D(Y,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,Y.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,Y.unpackAlignment),k.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,F,S.x,S.y,K,fe,ve,Se,k.image.data):k.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,F,S.x,S.y,k.mipmaps[0].width,k.mipmaps[0].height,ve,k.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,F,S.x,S.y,ve,Se,k.image),F===0&&Y.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),Ce.unbindTexture()},this.copyTextureToTexture3D=function(S,k,Y,F,K=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const fe=S.max.x-S.min.x+1,ve=S.max.y-S.min.y+1,Se=S.max.z-S.min.z+1,Me=Ae.convert(F.format),Qe=Ae.convert(F.type);let be;if(F.isData3DTexture)Te.setTexture3D(F,0),be=G.TEXTURE_3D;else if(F.isDataArrayTexture)Te.setTexture2DArray(F,0),be=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,F.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,F.unpackAlignment);const De=G.getParameter(G.UNPACK_ROW_LENGTH),$e=G.getParameter(G.UNPACK_IMAGE_HEIGHT),lt=G.getParameter(G.UNPACK_SKIP_PIXELS),gn=G.getParameter(G.UNPACK_SKIP_ROWS),Gn=G.getParameter(G.UNPACK_SKIP_IMAGES),ft=Y.isCompressedTexture?Y.mipmaps[0]:Y.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,ft.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ft.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,S.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,S.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,S.min.z),Y.isDataTexture||Y.isData3DTexture?G.texSubImage3D(be,K,k.x,k.y,k.z,fe,ve,Se,Me,Qe,ft.data):Y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),G.compressedTexSubImage3D(be,K,k.x,k.y,k.z,fe,ve,Se,Me,ft.data)):G.texSubImage3D(be,K,k.x,k.y,k.z,fe,ve,Se,Me,Qe,ft),G.pixelStorei(G.UNPACK_ROW_LENGTH,De),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,$e),G.pixelStorei(G.UNPACK_SKIP_PIXELS,lt),G.pixelStorei(G.UNPACK_SKIP_ROWS,gn),G.pixelStorei(G.UNPACK_SKIP_IMAGES,Gn),K===0&&F.generateMipmaps&&G.generateMipmap(be),Ce.unbindTexture()},this.initTexture=function(S){S.isCubeTexture?Te.setTextureCube(S,0):S.isData3DTexture?Te.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Te.setTexture2DArray(S,0):Te.setTexture2D(S,0),Ce.unbindTexture()},this.resetState=function(){C=0,y=0,w=null,Ce.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===xe?Ki:BA}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ki?xe:pn}}class J0 extends jA{}J0.prototype.isWebGL1Renderer=!0;class j0 extends it{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(e){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=e}}class Z0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=cl,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=yn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Qt=new D;class ql{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}setX(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ke(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=$n(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=$n(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=$n(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=$n(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ke(t,this.array),n=Ke(n,this.array),i=Ke(i,this.array),r=Ke(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ql(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Oh=new D,Gh=new je,kh=new je,$0=new D,Hh=new Ne,gr=new D,Io=new Qn,zh=new Ne,yo=new Ua;class ev extends Vt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Ne,this.bindMatrixInverse=new Ne,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ai),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)gr.fromBufferAttribute(t,n),this.applyBoneTransform(n,gr),this.boundingBox.expandByPoint(gr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Qn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)gr.fromBufferAttribute(t,n),this.applyBoneTransform(n,gr),this.boundingSphere.expandByPoint(gr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Io.copy(this.boundingSphere),Io.applyMatrix4(i),e.ray.intersectsSphere(Io)!==!1&&(zh.copy(i).invert(),yo.copy(e.ray).applyMatrix4(zh),!(this.boundingBox!==null&&yo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,yo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new je,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Gh.fromBufferAttribute(i.attributes.skinIndex,e),kh.fromBufferAttribute(i.attributes.skinWeight,e),Oh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=kh.getComponent(r);if(a!==0){const o=Gh.getComponent(r);Hh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector($0.copy(Oh).applyMatrix4(Hh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class ZA extends it{constructor(){super(),this.isBone=!0,this.type="Bone"}}class $A extends It{constructor(e=null,t=1,n=1,i,r,a,o,l,c=xt,h=xt,A,u){super(null,a,o,l,c,h,i,r,A,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vh=new Ne,tv=new Ne;class Xl{constructor(e=[],t=[]){this.uuid=yn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.boneTextureSize=0,this.frame=-1,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ne)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ne;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:tv;Vh.multiplyMatrices(o,t[r]),Vh.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Xl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=LA(e),e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new $A(t,e,e,Tt,nn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this.boneTextureSize=e,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new ZA),this.bones.push(a),this.boneInverses.push(new Ne().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Ba extends Ht{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const mr=new Ne,Wh=new Ne,sa=[],qh=new ai,nv=new Ne,rs=new Vt,ss=new Qn;class ef extends Vt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ba(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,nv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ai),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),qh.copy(e.boundingBox).applyMatrix4(mr),this.boundingBox.union(qh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,mr),ss.copy(e.boundingSphere).applyMatrix4(mr),this.boundingSphere.union(ss)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(rs.geometry=this.geometry,rs.material=this.material,rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ss.copy(this.boundingSphere),ss.applyMatrix4(n),e.ray.intersectsSphere(ss)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,mr),Wh.multiplyMatrices(n,mr),rs.matrixWorld=Wh,rs.raycast(e,sa);for(let a=0,o=sa.length;a<o;a++){const l=sa[a];l.instanceId=r,l.object=this,t.push(l)}sa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ba(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class tf extends Nn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xh=new D,Yh=new D,Kh=new Ne,So=new Ua,aa=new Qn;class Yl extends it{constructor(e=new wn,t=new tf){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Xh.fromBufferAttribute(t,i-1),Yh.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Xh.distanceTo(Yh);e.setAttribute("lineDistance",new Mn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),aa.copy(n.boundingSphere),aa.applyMatrix4(i),aa.radius+=r,e.ray.intersectsSphere(aa)===!1)return;Kh.copy(i).invert(),So.copy(e.ray).applyMatrix4(Kh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new D,h=new D,A=new D,u=new D,f=this.isLineSegments?2:1,m=n.index,d=n.attributes.position;if(m!==null){const g=Math.max(0,a.start),x=Math.min(m.count,a.start+a.count);for(let _=g,E=x-1;_<E;_+=f){const C=m.getX(_),y=m.getX(_+1);if(c.fromBufferAttribute(d,C),h.fromBufferAttribute(d,y),So.distanceSqToSegment(c,h,u,A)>l)continue;u.applyMatrix4(this.matrixWorld);const b=e.ray.origin.distanceTo(u);b<e.near||b>e.far||t.push({distance:b,point:A.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const g=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let _=g,E=x-1;_<E;_+=f){if(c.fromBufferAttribute(d,_),h.fromBufferAttribute(d,_+1),So.distanceSqToSegment(c,h,u,A)>l)continue;u.applyMatrix4(this.matrixWorld);const y=e.ray.origin.distanceTo(u);y<e.near||y>e.far||t.push({distance:y,point:A.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Jh=new D,jh=new D;class iv extends Yl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Jh.fromBufferAttribute(t,i),jh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Jh.distanceTo(jh);e.setAttribute("lineDistance",new Mn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class rv extends Yl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class nf extends Nn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zh=new Ne,fl=new Ua,oa=new Qn,la=new D;class sv extends it{constructor(e=new wn,t=new nf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(i),oa.radius+=r,e.ray.intersectsSphere(oa)===!1)return;Zh.copy(i).invert(),fl.copy(e.ray).applyMatrix4(Zh);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,A=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,p=f;m<p;m++){const d=c.getX(m);la.fromBufferAttribute(A,d),$h(la,d,l,i,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(A.count,a.start+a.count);for(let m=u,p=f;m<p;m++)la.fromBufferAttribute(A,m),$h(la,m,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function $h(s,e,t,n,i,r,a){const o=fl.distanceSqToPoint(s);if(o<t){const l=new D;fl.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class dl extends It{constructor(e,t,n,i,r,a,o,l,c,h,A,u){super(null,a,o,l,c,h,i,r,A,u),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}}class av extends dl{constructor(e,t,n,i,r,a){super(e,t,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=tn}}class Kl extends Nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=RA,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wi extends Kl{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return wt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ui(s,e,t){return rf(s)?new s.constructor(s.subarray(e,t!==void 0?t:s.length)):s.slice(e,t)}function ca(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function rf(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function ov(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function eu(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function sf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class Us{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class lv extends Us{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:jc,endingEnd:jc}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Zc:r=e,o=2*t-n;break;case $c:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zc:a=e,l=2*n-t;break;case $c:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,A=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),p=m*m,d=p*m,g=-u*d+2*u*p-u*m,x=(1+u)*d+(-1.5-2*u)*p+(-.5+u)*m+1,_=(-1-f)*d+(1.5+f)*p+.5*m,E=f*d-f*p;for(let C=0;C!==o;++C)r[C]=g*a[h+C]+x*a[c+C]+_*a[l+C]+E*a[A+C];return r}}class cv extends Us{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),A=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*A+a[l+u]*h;return r}}class hv extends Us{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class On{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ca(t,this.TimeBufferType),this.values=ca(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ca(e.times,Array),values:ca(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new hv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new cv(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new lv(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ws:t=this.InterpolantFactoryMethodDiscrete;break;case kr:t=this.InterpolantFactoryMethodLinear;break;case $a:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ws;case this.InterpolantFactoryMethodLinear:return kr;case this.InterpolantFactoryMethodSmooth:return $a}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=ui(n,r,a),this.values=ui(this.values,r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&rf(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=ui(this.times),t=ui(this.values),n=this.getValueSize(),i=this.getInterpolation()===$a,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const A=o*n,u=A-n,f=A+n;for(let m=0;m!==n;++m){const p=t[A+m];if(p!==t[u+m]||p!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const A=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[A+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=ui(e,0,a),this.values=ui(t,0,a*n)):(this.times=e,this.values=t),this}clone(){const e=ui(this.times,0),t=ui(this.values,0),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}On.prototype.TimeBufferType=Float32Array;On.prototype.ValueBufferType=Float32Array;On.prototype.DefaultInterpolation=kr;class Yr extends On{}Yr.prototype.ValueTypeName="bool";Yr.prototype.ValueBufferType=Array;Yr.prototype.DefaultInterpolation=ws;Yr.prototype.InterpolantFactoryMethodLinear=void 0;Yr.prototype.InterpolantFactoryMethodSmooth=void 0;class af extends On{}af.prototype.ValueTypeName="color";class Bs extends On{}Bs.prototype.ValueTypeName="number";class uv extends Us{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Mi.slerpFlat(r,0,a,c-o,a,c,l);return r}}class ji extends On{InterpolantFactoryMethodLinear(e){return new uv(this.times,this.values,this.getValueSize(),e)}}ji.prototype.ValueTypeName="quaternion";ji.prototype.DefaultInterpolation=kr;ji.prototype.InterpolantFactoryMethodSmooth=void 0;class Kr extends On{}Kr.prototype.ValueTypeName="string";Kr.prototype.ValueBufferType=Array;Kr.prototype.DefaultInterpolation=ws;Kr.prototype.InterpolantFactoryMethodLinear=void 0;Kr.prototype.InterpolantFactoryMethodSmooth=void 0;class Rs extends On{}Rs.prototype.ValueTypeName="vector";class Av{constructor(e,t=-1,n,i=Cp){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=yn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(dv(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(On.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=ov(l);l=eu(l,1,h),c=eu(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Bs(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const A=h[1];let u=i[A];u||(i[A]=u=[]),u.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(A,u,f,m,p){if(f.length!==0){const d=[],g=[];sf(f,d,g,m),d.length!==0&&p.push(new A(u,d,g))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let A=0;A<c.length;A++){const u=c[A].keys;if(!(!u||u.length===0))if(u[0].morphTargets){const f={};let m;for(m=0;m<u.length;m++)if(u[m].morphTargets)for(let p=0;p<u[m].morphTargets.length;p++)f[u[m].morphTargets[p]]=-1;for(const p in f){const d=[],g=[];for(let x=0;x!==u[m].morphTargets.length;++x){const _=u[m];d.push(_.time),g.push(_.morphTarget===p?1:0)}i.push(new Bs(".morphTargetInfluence["+p+"]",d,g))}l=f.length*a}else{const f=".bones["+t[A].name+"]";n(Rs,f+".position",u,"pos",i),n(ji,f+".quaternion",u,"rot",i),n(Rs,f+".scale",u,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function fv(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Bs;case"vector":case"vector2":case"vector3":case"vector4":return Rs;case"color":return af;case"quaternion":return ji;case"bool":case"boolean":return Yr;case"string":return Kr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function dv(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=fv(s.type);if(s.times===void 0){const t=[],n=[];sf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Vr={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class pv{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,A){return c.push(h,A),this},this.removeHandler=function(h){const A=c.indexOf(h);return A!==-1&&c.splice(A,2),this},this.getHandler=function(h){for(let A=0,u=c.length;A<u;A+=2){const f=c[A],m=c[A+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const gv=new pv;class Jr{constructor(e){this.manager=e!==void 0?e:gv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}const Xn={};class mv extends Error{constructor(e,t){super(e),this.response=t}}class vs extends Jr{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Vr.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Xn[e]!==void 0){Xn[e].push({onLoad:t,onProgress:n,onError:i});return}Xn[e]=[],Xn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Xn[e],A=c.body.getReader(),u=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=u?parseInt(u):0,m=f!==0;let p=0;const d=new ReadableStream({start(g){x();function x(){A.read().then(({done:_,value:E})=>{if(_)g.close();else{p+=E.byteLength;const C=new ProgressEvent("progress",{lengthComputable:m,loaded:p,total:f});for(let y=0,w=h.length;y<w;y++){const b=h[y];b.onProgress&&b.onProgress(C)}g.enqueue(E),x()}})}}});return new Response(d)}else throw new mv(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const A=/charset="?([^;"\s]*)"?/i.exec(o),u=A&&A[1]?A[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(m=>f.decode(m))}}}).then(c=>{Vr.add(e,c);const h=Xn[e];delete Xn[e];for(let A=0,u=h.length;A<u;A++){const f=h[A];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Xn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Xn[e];for(let A=0,u=h.length;A<u;A++){const f=h[A];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class _v extends Jr{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Vr.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Ts("img");function l(){h(),Vr.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(A){h(),i&&i(A),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class of extends Jr{constructor(e){super(e)}load(e,t,n,i){const r=new It,a=new _v(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Jl extends it{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Mo=new Ne,tu=new D,nu=new D;class jl{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zl,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;tu.setFromMatrixPosition(e.matrixWorld),t.position.copy(tu),nu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nu),t.updateMatrixWorld(),Mo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Mo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Mo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Ev extends jl{constructor(){super(new kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Hr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class vv extends Jl{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ev}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const iu=new Ne,as=new D,wo=new D;class xv extends jl{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ce(4,2),this._viewportCount=6,this._viewports=[new je(2,1,1,1),new je(0,1,1,1),new je(3,1,1,1),new je(1,1,1,1),new je(3,0,1,1),new je(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),as.setFromMatrixPosition(e.matrixWorld),n.position.copy(as),wo.copy(n.position),wo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wo),n.updateMatrixWorld(),i.makeTranslation(-as.x,-as.y,-as.z),iu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(iu)}}class Cv extends Jl{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new xv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Iv extends jl{constructor(){super(new Ps(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yv extends Jl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(it.DEFAULT_UP),this.updateMatrix(),this.target=new it,this.shadow=new Iv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class pl{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Sv extends Jr{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Vr.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){Vr.add(e,l),t&&t(l),r.manager.itemEnd(e)}).catch(function(l){i&&i(l),r.manager.itemError(e),r.manager.itemEnd(e)}),r.manager.itemStart(e)}}class Mv{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ru(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ru();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ru(){return(typeof performance>"u"?Date:performance).now()}const Zl="\\[\\]\\.:\\/",wv=new RegExp("["+Zl+"]","g"),$l="[^"+Zl+"]",Tv="[^"+Zl.replace("\\.","")+"]",bv=/((?:WC+[\/:])*)/.source.replace("WC",$l),Bv=/(WCOD+)?/.source.replace("WCOD",Tv),Rv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$l),Dv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$l),Lv=new RegExp("^"+bv+Bv+Rv+Dv+"$"),Pv=["material","materials","bones","map"];class Uv{constructor(e,t,n){const i=n||qe.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class qe{constructor(e,t,n){this.path=t,this.parsedPath=n||qe.parseTrackName(t),this.node=qe.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new qe.Composite(e,t,n):new qe(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(wv,"")}static parseTrackName(e){const t=Lv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Pv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=qe.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}qe.Composite=Uv;qe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};qe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};qe.prototype.GetterByBindingType=[qe.prototype._getValue_direct,qe.prototype._getValue_array,qe.prototype._getValue_arrayElement,qe.prototype._getValue_toArray];qe.prototype.SetterByBindingTypeAndVersioning=[[qe.prototype._setValue_direct,qe.prototype._setValue_direct_setNeedsUpdate,qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_array,qe.prototype._setValue_array_setNeedsUpdate,qe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_arrayElement,qe.prototype._setValue_arrayElement_setNeedsUpdate,qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[qe.prototype._setValue_fromArray,qe.prototype._setValue_fromArray_setNeedsUpdate,qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class To{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(wt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ol}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ol);var Nv=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function lf(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var cf={exports:{}};(function(s){var e=Object.prototype.hasOwnProperty,t="~";function n(){}Object.create&&(n.prototype=Object.create(null),new n().__proto__||(t=!1));function i(l,c,h){this.fn=l,this.context=c,this.once=h||!1}function r(l,c,h,A,u){if(typeof h!="function")throw new TypeError("The listener must be a function");var f=new i(h,A||l,u),m=t?t+c:c;return l._events[m]?l._events[m].fn?l._events[m]=[l._events[m],f]:l._events[m].push(f):(l._events[m]=f,l._eventsCount++),l}function a(l,c){--l._eventsCount===0?l._events=new n:delete l._events[c]}function o(){this._events=new n,this._eventsCount=0}o.prototype.eventNames=function(){var c=[],h,A;if(this._eventsCount===0)return c;for(A in h=this._events)e.call(h,A)&&c.push(t?A.slice(1):A);return Object.getOwnPropertySymbols?c.concat(Object.getOwnPropertySymbols(h)):c},o.prototype.listeners=function(c){var h=t?t+c:c,A=this._events[h];if(!A)return[];if(A.fn)return[A.fn];for(var u=0,f=A.length,m=new Array(f);u<f;u++)m[u]=A[u].fn;return m},o.prototype.listenerCount=function(c){var h=t?t+c:c,A=this._events[h];return A?A.fn?1:A.length:0},o.prototype.emit=function(c,h,A,u,f,m){var p=t?t+c:c;if(!this._events[p])return!1;var d=this._events[p],g=arguments.length,x,_;if(d.fn){switch(d.once&&this.removeListener(c,d.fn,void 0,!0),g){case 1:return d.fn.call(d.context),!0;case 2:return d.fn.call(d.context,h),!0;case 3:return d.fn.call(d.context,h,A),!0;case 4:return d.fn.call(d.context,h,A,u),!0;case 5:return d.fn.call(d.context,h,A,u,f),!0;case 6:return d.fn.call(d.context,h,A,u,f,m),!0}for(_=1,x=new Array(g-1);_<g;_++)x[_-1]=arguments[_];d.fn.apply(d.context,x)}else{var E=d.length,C;for(_=0;_<E;_++)switch(d[_].once&&this.removeListener(c,d[_].fn,void 0,!0),g){case 1:d[_].fn.call(d[_].context);break;case 2:d[_].fn.call(d[_].context,h);break;case 3:d[_].fn.call(d[_].context,h,A);break;case 4:d[_].fn.call(d[_].context,h,A,u);break;default:if(!x)for(C=1,x=new Array(g-1);C<g;C++)x[C-1]=arguments[C];d[_].fn.apply(d[_].context,x)}}return!0},o.prototype.on=function(c,h,A){return r(this,c,h,A,!1)},o.prototype.once=function(c,h,A){return r(this,c,h,A,!0)},o.prototype.removeListener=function(c,h,A,u){var f=t?t+c:c;if(!this._events[f])return this;if(!h)return a(this,f),this;var m=this._events[f];if(m.fn)m.fn===h&&(!u||m.once)&&(!A||m.context===A)&&a(this,f);else{for(var p=0,d=[],g=m.length;p<g;p++)(m[p].fn!==h||u&&!m[p].once||A&&m[p].context!==A)&&d.push(m[p]);d.length?this._events[f]=d.length===1?d[0]:d:a(this,f)}return this},o.prototype.removeAllListeners=function(c){var h;return c?(h=t?t+c:c,this._events[h]&&a(this,h)):(this._events=new n,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=t,o.EventEmitter=o,s.exports=o})(cf);var Fv=cf.exports;const Qv=lf(Fv),et=new Qv;var gl={exports:{}};(function(s,e){(function(t,n){var i="1.0.34",r="",a="?",o="function",l="undefined",c="object",h="string",A="major",u="model",f="name",m="type",p="vendor",d="version",g="architecture",x="console",_="mobile",E="tablet",C="smarttv",y="wearable",w="embedded",b=350,v="Amazon",M="Apple",H="ASUS",X="BlackBerry",L="Browser",U="Chrome",N="Edge",W="Firefox",Q="Google",z="Huawei",Z="LG",J="Microsoft",le="Motorola",P="Opera",ee="Samsung",$="Sharp",se="Sony",he="Xiaomi",me="Zebra",Be="Facebook",Ie="Chromium OS",ot="Mac OS",Oe=function(O,j){var q={};for(var te in O)j[te]&&j[te].length%2===0?q[te]=j[te].concat(O[te]):q[te]=O[te];return q},G=function(O){for(var j={},q=0;q<O.length;q++)j[O[q].toUpperCase()]=O[q];return j},ht=function(O,j){return typeof O===h?_e(j).indexOf(_e(O))!==-1:!1},_e=function(O){return O.toLowerCase()},Le=function(O){return typeof O===h?O.replace(/[^\d\.]/g,r).split(".")[0]:n},Ce=function(O,j){if(typeof O===h)return O=O.replace(/^\s\s*/,r),typeof j===l?O:O.substring(0,b)},Ve=function(O,j){for(var q=0,te,ue,ne,R,ge,de;q<j.length&&!ge;){var Ee=j[q],Ae=j[q+1];for(te=ue=0;te<Ee.length&&!ge&&Ee[te];)if(ge=Ee[te++].exec(O),ge)for(ne=0;ne<Ae.length;ne++)de=ge[++ue],R=Ae[ne],typeof R===c&&R.length>0?R.length===2?typeof R[1]==o?this[R[0]]=R[1].call(this,de):this[R[0]]=R[1]:R.length===3?typeof R[1]===o&&!(R[1].exec&&R[1].test)?this[R[0]]=de?R[1].call(this,de,R[2]):n:this[R[0]]=de?de.replace(R[1],R[2]):n:R.length===4&&(this[R[0]]=de?R[3].call(this,de.replace(R[1],R[2])):n):this[R]=de||n;q+=2}},Re=function(O,j){for(var q in j)if(typeof j[q]===c&&j[q].length>0){for(var te=0;te<j[q].length;te++)if(ht(j[q][te],O))return q===a?n:q}else if(ht(j[q],O))return q===a?n:q;return O},Te={"1.0":"/8","1.2":"/1","1.3":"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},We={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2","8.1":"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},ut={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[d,[f,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[d,[f,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[f,d],[/opios[\/ ]+([\w\.]+)/i],[d,[f,P+" Mini"]],[/\bopr\/([\w\.]+)/i],[d,[f,P]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(weibo)__([\d\.]+)/i],[f,d],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[d,[f,"UC"+L]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[d,[f,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[d,[f,"WeChat"]],[/konqueror\/([\w\.]+)/i],[d,[f,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[d,[f,"IE"]],[/yabrowser\/([\w\.]+)/i],[d,[f,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[f,/(.+)/,"$1 Secure "+L],d],[/\bfocus\/([\w\.]+)/i],[d,[f,W+" Focus"]],[/\bopt\/([\w\.]+)/i],[d,[f,P+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[d,[f,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[d,[f,"Dolphin"]],[/coast\/([\w\.]+)/i],[d,[f,P+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[d,[f,"MIUI "+L]],[/fxios\/([-\w\.]+)/i],[d,[f,W]],[/\bqihu|(qi?ho?o?|360)browser/i],[[f,"360 "+L]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[f,/(.+)/,"$1 "+L],d],[/(comodo_dragon)\/([\w\.]+)/i],[[f,/_/g," "],d],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[f,d],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[f],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[f,Be],d],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[f,d],[/\bgsa\/([\w\.]+) .*safari\//i],[d,[f,"GSA"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[d,[f,U+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[f,U+" WebView"],d],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[d,[f,"Android "+L]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[f,d],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[d,[f,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[d,f],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[f,[d,Re,Te]],[/(webkit|khtml)\/([\w\.]+)/i],[f,d],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[f,"Netscape"],d],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[d,[f,W+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[f,d],[/(cobalt)\/([\w\.]+)/i],[f,[d,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[g,"amd64"]],[/(ia32(?=;))/i],[[g,_e]],[/((?:i[346]|x)86)[;\)]/i],[[g,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[g,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[g,"armhf"]],[/windows (ce|mobile); ppc;/i],[[g,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[g,/ower/,r,_e]],[/(sun4\w)[;\)]/i],[[g,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[g,_e]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[u,[p,ee],[m,E]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[u,[p,ee],[m,_]],[/\((ip(?:hone|od)[\w ]*);/i],[u,[p,M],[m,_]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[u,[p,M],[m,E]],[/(macintosh);/i],[u,[p,M]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[u,[p,$],[m,_]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[u,[p,z],[m,E]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[u,[p,z],[m,_]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[u,/_/g," "],[p,he],[m,_]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[u,/_/g," "],[p,he],[m,E]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[u,[p,"OPPO"],[m,_]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[u,[p,"Vivo"],[m,_]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[u,[p,"Realme"],[m,_]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[u,[p,le],[m,_]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[u,[p,le],[m,E]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[u,[p,Z],[m,E]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[u,[p,Z],[m,_]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[u,[p,"Lenovo"],[m,E]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[u,/_/g," "],[p,"Nokia"],[m,_]],[/(pixel c)\b/i],[u,[p,Q],[m,E]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[u,[p,Q],[m,_]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[u,[p,se],[m,_]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[u,"Xperia Tablet"],[p,se],[m,E]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[u,[p,"OnePlus"],[m,_]],[/(alexa)webm/i,/(kf[a-z]{2}wi)( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[u,[p,v],[m,E]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[u,/(.+)/g,"Fire Phone $1"],[p,v],[m,_]],[/(playbook);[-\w\),; ]+(rim)/i],[u,p,[m,E]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[u,[p,X],[m,_]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[u,[p,H],[m,E]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[u,[p,H],[m,_]],[/(nexus 9)/i],[u,[p,"HTC"],[m,E]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[p,[u,/_/g," "],[m,_]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[u,[p,"Acer"],[m,E]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[u,[p,"Meizu"],[m,_]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[p,u,[m,_]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[p,u,[m,E]],[/(surface duo)/i],[u,[p,J],[m,E]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[u,[p,"Fairphone"],[m,_]],[/(u304aa)/i],[u,[p,"AT&T"],[m,_]],[/\bsie-(\w*)/i],[u,[p,"Siemens"],[m,_]],[/\b(rct\w+) b/i],[u,[p,"RCA"],[m,E]],[/\b(venue[\d ]{2,7}) b/i],[u,[p,"Dell"],[m,E]],[/\b(q(?:mv|ta)\w+) b/i],[u,[p,"Verizon"],[m,E]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[u,[p,"Barnes & Noble"],[m,E]],[/\b(tm\d{3}\w+) b/i],[u,[p,"NuVision"],[m,E]],[/\b(k88) b/i],[u,[p,"ZTE"],[m,E]],[/\b(nx\d{3}j) b/i],[u,[p,"ZTE"],[m,_]],[/\b(gen\d{3}) b.+49h/i],[u,[p,"Swiss"],[m,_]],[/\b(zur\d{3}) b/i],[u,[p,"Swiss"],[m,E]],[/\b((zeki)?tb.*\b) b/i],[u,[p,"Zeki"],[m,E]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[p,"Dragon Touch"],u,[m,E]],[/\b(ns-?\w{0,9}) b/i],[u,[p,"Insignia"],[m,E]],[/\b((nxa|next)-?\w{0,9}) b/i],[u,[p,"NextBook"],[m,E]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[p,"Voice"],u,[m,_]],[/\b(lvtel\-)?(v1[12]) b/i],[[p,"LvTel"],u,[m,_]],[/\b(ph-1) /i],[u,[p,"Essential"],[m,_]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[u,[p,"Envizen"],[m,E]],[/\b(trio[-\w\. ]+) b/i],[u,[p,"MachSpeed"],[m,E]],[/\btu_(1491) b/i],[u,[p,"Rotor"],[m,E]],[/(shield[\w ]+) b/i],[u,[p,"Nvidia"],[m,E]],[/(sprint) (\w+)/i],[p,u,[m,_]],[/(kin\.[onetw]{3})/i],[[u,/\./g," "],[p,J],[m,_]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[u,[p,me],[m,E]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[u,[p,me],[m,_]],[/smart-tv.+(samsung)/i],[p,[m,C]],[/hbbtv.+maple;(\d+)/i],[[u,/^/,"SmartTV"],[p,ee],[m,C]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[p,Z],[m,C]],[/(apple) ?tv/i],[p,[u,M+" TV"],[m,C]],[/crkey/i],[[u,U+"cast"],[p,Q],[m,C]],[/droid.+aft(\w)( bui|\))/i],[u,[p,v],[m,C]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[u,[p,$],[m,C]],[/(bravia[\w ]+)( bui|\))/i],[u,[p,se],[m,C]],[/(mitv-\w{5}) bui/i],[u,[p,he],[m,C]],[/Hbbtv.*(technisat) (.*);/i],[p,u,[m,C]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[p,Ce],[u,Ce],[m,C]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[m,C]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[p,u,[m,x]],[/droid.+; (shield) bui/i],[u,[p,"Nvidia"],[m,x]],[/(playstation [345portablevi]+)/i],[u,[p,se],[m,x]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[u,[p,J],[m,x]],[/((pebble))app/i],[p,u,[m,y]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[u,[p,M],[m,y]],[/droid.+; (glass) \d/i],[u,[p,Q],[m,y]],[/droid.+; (wt63?0{2,3})\)/i],[u,[p,me],[m,y]],[/(quest( 2| pro)?)/i],[u,[p,Be],[m,y]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[p,[m,w]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[u,[m,_]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[u,[m,E]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[m,E]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[m,_]],[/(android[-\w\. ]{0,9});.+buil/i],[u,[p,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[d,[f,N+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[d,[f,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i],[f,d],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[d,f]],os:[[/microsoft (windows) (vista|xp)/i],[f,d],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[f,[d,Re,We]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[f,"Windows"],[d,Re,We]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/cfnetwork\/.+darwin/i],[[d,/_/g,"."],[f,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[f,ot],[d,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[d,f],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[f,d],[/\(bb(10);/i],[d,[f,X]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[d,[f,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[d,[f,W+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[d,[f,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[d,[f,"watchOS"]],[/crkey\/([\d\.]+)/i],[d,[f,U+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[f,Ie],d],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[f,d],[/(sunos) ?([\w\.\d]*)/i],[[f,"Solaris"],d],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,/(unix) ?([\w\.]*)/i],[f,d]]},Xe=function(O,j){if(typeof O===c&&(j=O,O=n),!(this instanceof Xe))return new Xe(O,j).getResult();var q=typeof t!==l&&t.navigator?t.navigator:n,te=O||(q&&q.userAgent?q.userAgent:r),ue=q&&q.userAgentData?q.userAgentData:n,ne=j?Oe(ut,j):ut;return this.getBrowser=function(){var R={};return R[f]=n,R[d]=n,Ve.call(R,te,ne.browser),R[A]=Le(R[d]),q&&q.brave&&typeof q.brave.isBrave==o&&(R[f]="Brave"),R},this.getCPU=function(){var R={};return R[g]=n,Ve.call(R,te,ne.cpu),R},this.getDevice=function(){var R={};return R[p]=n,R[u]=n,R[m]=n,Ve.call(R,te,ne.device),!R[m]&&ue&&ue.mobile&&(R[m]=_),R[u]=="Macintosh"&&q&&typeof q.standalone!==l&&q.maxTouchPoints&&q.maxTouchPoints>2&&(R[u]="iPad",R[m]=E),R},this.getEngine=function(){var R={};return R[f]=n,R[d]=n,Ve.call(R,te,ne.engine),R},this.getOS=function(){var R={};return R[f]=n,R[d]=n,Ve.call(R,te,ne.os),!R[f]&&ue&&ue.platform!="Unknown"&&(R[f]=ue.platform.replace(/chrome os/i,Ie).replace(/macos/i,ot)),R},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return te},this.setUA=function(R){return te=typeof R===h&&R.length>b?Ce(R,b):R,this},this.setUA(te),this};Xe.VERSION=i,Xe.BROWSER=G([f,d,A]),Xe.CPU=G([g]),Xe.DEVICE=G([u,p,m,x,_,C,E,y,w]),Xe.ENGINE=Xe.OS=G([f,d]),s.exports&&(e=s.exports=Xe),e.UAParser=Xe;var T=typeof t!==l&&(t.jQuery||t.Zepto);if(T&&!T.ua){var I=new Xe;T.ua=I.getResult(),T.ua.get=function(){return I.getUA()},T.ua.set=function(O){I.setUA(O);var j=I.getResult();for(var q in j)T.ua[q]=j[q]}}})(typeof window=="object"?window:Nv)})(gl,gl.exports);var Ov=gl.exports;const Gv=lf(Ov),ye={width:0,height:0,aspect:0,devicePixelRatio:0,boundResize:null,init(s){const e=new Gv;this.container=s,this.width=s.clientWidth,this.height=s.clientHeight,this.screenWidth=window.screen.width,this.screenHeight=window.screen.height,this.aspect=this.width/this.height,this.devicePixelRatio=window.devicePixelRatio;const t=e.getOS();t.name=t.name.toLowerCase();const n=e.getBrowser();n.name=n.name.toLowerCase(),this.os={android:t.name.includes("android"),ios:t.name.includes("ios"),windows:t.name.includes("windows"),mac:t.name.includes("mac os"),linux:t.name.includes("linux"),name:t.name,version:t.version},this.device={mobile:this.os.android||this.os.ios||e.getDevice().type==="mobile",desktop:this.os.windows||this.os.mac||this.os.linux||e.getDevice().type===void 0},this.browser={firefox:n.name.includes("firefox"),chrome:n.name.includes("chrome"),edge:n.name.includes("edge"),safari:n.name.includes("safari"),name:n.name,version:n.version},this.boundResize=this.resize.bind(this),window.addEventListener("resize",this.boundResize)},resize(){this.width=this.container.clientWidth,this.height=this.container.clientHeight,this.aspect=this.width/this.height,et.emit("resize",{width:this.width,height:this.height,aspect:this.aspect})}},ti={domElement:null,isDragging:!1,dragStart:new ce,dragEnd:new ce,dragDelta:new ce,position:new ce,position01:new ce,position11:new ce,prevPosition:new ce,vel:new ce,speed:0,init(s){this.isDragging=!1,this.dragStart=new ce,this.dragEnd=new ce,this.dragDelta=new ce,this.position=new ce(ye.width/2,ye.height/2),this.position01=new ce(this.position.x/ye.width,this.position.y/ye.height),this.position11=new ce(this.position.x/ye.width*2-1,-(this.position.y/ye.height)*2+1),this.prevPosition=new ce().copy(this.position),this.vel=new ce,this.speed=0,this.boundOnPointerDrag=this.onPointerDrag.bind(this),this.boundOnPointerUp=this.onPointerUp.bind(this),this.boundOnPointerDown=this.onPointerDown.bind(this),this.boundOnPointerMove=this.onPointerMove.bind(this),this.boundOnWheel=this.onWheel.bind(this),this.boundOnClick=this.onClick.bind(this),s.addEventListener("pointerup",this.boundOnPointerUp),s.addEventListener("pointerdown",this.boundOnPointerDown),s.addEventListener("pointermove",this.boundOnPointerMove),s.addEventListener("wheel",this.boundOnWheel),s.addEventListener("click",this.boundOnClick),et.on("update",this.update,this)},onClick(s){et.emit("click",s)},onWheel(s){et.emit("wheel",s)},onPointerDown(s){this.isDragging=!0,this.dragStart.copy(this.position),Ct.domElement.addEventListener("pointermove",this.boundOnPointerDrag),et.emit("pointerdown",s)},onPointerUp(s){this.isDragging=!1,this.dragEnd.copy(this.position),this.dragDelta.set(0,0),Ct.domElement.removeEventListener("pointermove",this.boundOnPointerDrag),et.emit("pointerup",s)},onPointerMove(s){this.position.set(s.clientX,s.clientY),this.position01.set(this.position.x/ye.width,1-this.position.y/ye.height),this.position11.set(this.position.x/ye.width*2-1,-(this.position.y/ye.height)*2+1),et.emit("pointermove",s)},onPointerDrag(s){this.dragEnd.copy(this.position),this.dragDelta.subVectors(this.dragEnd,this.dragStart),this.dragStart.copy(this.dragEnd),et.emit("pointerdrag",s)},update(){this.vel.subVectors(this.position,this.prevPosition),this.speed=this.vel.length(),this.prevPosition.copy(this.position)}},Ct={fps:0,prevFps:0,time:0,pixelRatio:1.5,renderer:null,domElement:null,uniforms:{time:{value:Fr.ticker.time},res:{value:new ce(ye.width,ye.height)},aspect:{value:ye.aspect},pixelRatio:{value:ye.pixelRatio},dt:{value:0},deltaRatio:{value:0}},accumulatedDeltas:[],glsl:"",lowFpsThresholdReached:!1,timeOfResize:0,init({container:s=null,eventsNode:e=null}={}){ye.init(s),this.renderer=new jA,this.renderer.sortObjects=!1,this.renderer.debug.checkShaderErrors=!1,this.renderer.setSize(ye.width,ye.height),this.renderer.setClearColor("#000000",0);let t=ye.device.mobile?1:1.5;this.pixelRatio=Math.min(ye.devicePixelRatio,t),this.renderer.setPixelRatio(this.pixelRatio),this.domElement=document.createElement("div"),this.domElement.id="webgl",this.domElement.appendChild(this.renderer.domElement),s.appendChild(this.domElement),ti.init(e||this.domElement),this.time=0,this.fps=0,this.accumulatedDeltas=[],this.uniforms={time:{value:this.time},res:{value:new ce(ye.width*this.pixelRatio,ye.height*this.pixelRatio)},aspect:{value:ye.aspect},pixelRatio:{value:this.pixelRatio},dt:{value:0},deltaRatio:{value:0}},this.glsl=`
            uniform float time;
            uniform vec2 res;
            uniform float aspect;
            uniform float pixelRatio;
            uniform float dt;
            uniform float deltaRatio;
        `,et.on("update",this.update,this),et.on("earlyupdate",this.earlyUpdate,this),et.on("resize",this.resize,this)},earlyUpdate(s){if(this.time=s.time,this.uniforms.time.value=s.time,this.uniforms.dt.value=s.deltaTime/1e3,this.uniforms.deltaRatio.value=Fr.ticker.deltaRatio(),this.accumulatedDeltas.push(s.deltaTime),s.frame%60==0){let e=0;for(let t=this.accumulatedDeltas.length;t--;)e+=this.accumulatedDeltas[t];e/=this.accumulatedDeltas.length,this.prevFps=this.fps,this.fps=(1e3/e).toFixed(2),this.accumulatedDeltas.length=0}},update(s){},resize(s){const{width:e,height:t,aspect:n}=s;this.uniforms.res.value.set(e*this.pixelRatio,t*this.pixelRatio),this.uniforms.aspect.value=n,this.renderer.setSize(e,t)}},hf={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );
			gl_FragColor.a *= opacity;


		}`};class jr{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const kv=new Ps(-1,1,1,-1,0,1),ec=new wn;ec.setAttribute("position",new Mn([-1,3,0,-1,-1,0,3,-1,0],3));ec.setAttribute("uv",new Mn([0,2,0,0,2,0],2));class tc{constructor(e){this._mesh=new Vt(ec,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,kv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class uf extends jr{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Lt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=bs.clone(e.uniforms),this.material=new Lt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new tc(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class su extends jr{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),r=e.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class Hv extends jr{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class zv{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ce);this._width=n.width,this._height=n.height,t=new Sn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:sn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new uf(hf),this.clock=new Mv}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}su!==void 0&&(a instanceof su?n=!0:a instanceof Hv&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ce);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Vv extends jr{constructor(e,t,n,i,r){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r!==void 0?r:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new we}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let r,a;this.overrideMaterial!==void 0&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),r=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,r),this.overrideMaterial!==void 0&&(this.scene.overrideMaterial=a),e.autoClear=i}}class ml extends kt{constructor(e){const{fov:t=50,aspect:n=ye.width/ye.height,near:i=.1,far:r=1e3,radius:a=5}=e;super(t,n,i,r),this.position.z=a,et.on("resize",this._resize.bind(this))}_resize(e){const{width:t,height:n}=e;this.aspect=t/n,this.updateProjectionMatrix()}}const Af=Math.PI,Cr=Math.PI*2,Wv=function(s,e){const t=(s+Math.PI)%Cr-Math.PI,n=(e+Math.PI)%Cr-Math.PI;let i=n-t;return Math.abs(i)>Math.PI&&(i=n<0?n+Cr-t:n-(t+Cr)),i},qv=function(s){return(-s+90)*Af/180},Xv=function(s){return s*Af/180},Ir=s=>1-Math.exp(Math.log(1-s)*Ct.uniforms.deltaRatio.value);class Yv extends ml{constructor(e){super(e);const{startPos:t=new D(0,0,3),target:n=new D(0,0,0),displacementStrength:i=new ce(0)}=e;this.orbitPos=new D().subVectors(t,n),this.unitizedAzimuth=0,this.prevUnitizedAzimuth=0,this.dragDelta=new ce,this.cumulativeDragDelta=new ce,this.orbitStrength=.6*Cr,this.orbitDamping=.6,this.globalDamping=.1,this.focalPoint=n,this.spherical=new To().setFromVector3(this.orbitPos),this.sphericalTarget=new To().setFromVector3(this.orbitPos),this.smoothSphericalTarget=new To().setFromVector3(this.orbitPos),this.displacementStrength=i,this.displacementDamping=.02,this.displacement=new ce(0,0),this.lookAt(this.focalPoint),et.on("update",this._update.bind(this))}_update(){this.unitizedAzimuth=Math.abs(this.spherical.phi/Cr-1),this.unitizedAzimuth-this.prevUnitizedAzimuth,1-Math.pow(this.unitizedAzimuth,2),this.sphericalTarget.theta+=this.cumulativeDragDelta.x,this.sphericalTarget.phi+=this.cumulativeDragDelta.y,this.sphericalTarget.makeSafe(),this.smoothSphericalTarget.theta+=(this.sphericalTarget.theta-this.smoothSphericalTarget.theta)*Ir(this.globalDamping),this.smoothSphericalTarget.phi+=(this.sphericalTarget.phi-this.smoothSphericalTarget.phi)*Ir(this.globalDamping),this.smoothSphericalTarget.makeSafe(),this.displacement.x+=(ti.position11.x-this.displacement.x)*Ir(this.displacementDamping),this.displacement.y+=(ti.position11.y-this.displacement.y)*Ir(this.displacementDamping),this.spherical.copy(this.smoothSphericalTarget),this.spherical.theta+=this.displacement.x*this.displacementStrength.x,this.spherical.phi-=this.displacement.y*this.displacementStrength.y,this.spherical.makeSafe(),this.position.setFromSphericalCoords(this.spherical.radius,this.spherical.phi,this.spherical.theta),this.lookAt(this.focalPoint),this.prevUnitizedAzimuth=this.unitizedAzimuth,this.cumulativeDragDelta.multiplyScalar(1-this.orbitDamping)}_onPointerDrag(){this.dragDelta.set(-ti.dragDelta.x,-ti.dragDelta.y),this.cumulativeDragDelta.addScaledVector(this.dragDelta,this.orbitStrength/ye.height*this.orbitDamping)}tweenToLatLong(e,t){let n=qv(e),i=Xv(t);const r=Wv(this.sphericalTarget.theta,i);let a=this.sphericalTarget.theta+r,o=n;Fr.to(this.sphericalTarget,{theta:a,duration:.25,ease:"easeOut"}),Fr.to(this.sphericalTarget,{phi:o,duration:.25,ease:"easeOut"})}_onWheel(){}}class Kv extends Ps{constructor(e){const{aspect:t=1,left:n=ye.width/-2,right:i=ye.width/2,top:r=ye.height/2,bottom:a=ye.height/-2,near:o=.1,far:l=1e3,radius:c=5,preventResize:h=!0}=e;super(n,i,r,a,o,l),this.position.z=c,this.aspect=t,h||et.on("resize",this._resize.bind(this))}_resize(e){const{width:t,height:n}=e;this.left=t/-2,this.right=t/2,this.top=n/2,this.bottom=n/-2,this.updateProjectionMatrix()}}class Jv extends j0{constructor(e){super();const{camera:t}=e;switch(t.type){case"perspective":this.camera=new ml(t);break;case"orthographic":this.camera=new Kv(t);break;case"displacement":this.camera=new Yv(t);break;default:this.camera=new ml(t)}}upload(e,t){Ct.renderer.compile(e,t)}}const nc=function(){let s,e;const t=new Promise((n,i)=>{s=n,e=i});return t.resolve=s,t.reject=e,t},_l=new of;class jv{constructor(e=4){this.pool=e,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0}_initWorker(e){if(!this.workers[e]){const t=this.workerCreator();t.addEventListener("message",this._onMessage.bind(this,e)),this.workers[e]=t}}_getIdleWorker(){for(let e=0;e<this.pool;e++)if(!(this.workerStatus&1<<e))return e;return-1}_onMessage(e,t){const n=this.workersResolve[e];if(n&&n(t),this.queue.length){const{resolve:i,msg:r,transfer:a}=this.queue.shift();this.workersResolve[e]=i,this.workers[e].postMessage(r,a)}else this.workerStatus^=1<<e}setWorkerCreator(e){this.workerCreator=e}setWorkerLimit(e){this.pool=e}postMessage(e,t){return new Promise(n=>{const i=this._getIdleWorker();i!==-1?(this._initWorker(i),this.workerStatus|=1<<i,this.workersResolve[i]=n,this.workers[i].postMessage(e,t)):this.queue.push({resolve:n,msg:e,transfer:t})})}dispose(){this.workers.forEach(e=>e.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}}const Zv=0,$v=2,ex=1,tx=2,nx=0,ff=9,ic=15,df=16,rc=22,pf=37,sc=43,gf=76,mf=83,_f=97,Ef=100,vf=103,xf=109;class ix{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}}class os{constructor(e,t,n,i){this._dataView=new DataView(e.buffer,e.byteOffset+t,n),this._littleEndian=i,this._offset=0}_nextUint8(){const e=this._dataView.getUint8(this._offset);return this._offset+=1,e}_nextUint16(){const e=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,e}_nextUint32(){const e=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,e}_nextUint64(){const e=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,e}_nextInt32(){const e=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,e}_skip(e){return this._offset+=e,this}_scan(e,t=0){const n=this._offset;let i=0;for(;this._dataView.getUint8(this._offset)!==t&&i<e;)i++,this._offset++;return i<e&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+n,i)}}const Ot=[171,75,84,88,32,50,48,187,13,10,26,10];function au(s){return typeof TextDecoder<"u"?new TextDecoder().decode(s):Buffer.from(s).toString("utf8")}function rx(s){const e=new Uint8Array(s.buffer,s.byteOffset,Ot.length);if(e[0]!==Ot[0]||e[1]!==Ot[1]||e[2]!==Ot[2]||e[3]!==Ot[3]||e[4]!==Ot[4]||e[5]!==Ot[5]||e[6]!==Ot[6]||e[7]!==Ot[7]||e[8]!==Ot[8]||e[9]!==Ot[9]||e[10]!==Ot[10]||e[11]!==Ot[11])throw new Error("Missing KTX 2.0 identifier.");const t=new ix,n=17*Uint32Array.BYTES_PER_ELEMENT,i=new os(s,Ot.length,n,!0);t.vkFormat=i._nextUint32(),t.typeSize=i._nextUint32(),t.pixelWidth=i._nextUint32(),t.pixelHeight=i._nextUint32(),t.pixelDepth=i._nextUint32(),t.layerCount=i._nextUint32(),t.faceCount=i._nextUint32();const r=i._nextUint32();t.supercompressionScheme=i._nextUint32();const a=i._nextUint32(),o=i._nextUint32(),l=i._nextUint32(),c=i._nextUint32(),h=i._nextUint64(),A=i._nextUint64(),u=new os(s,Ot.length+n,3*r*8,!0);for(let Q=0;Q<r;Q++)t.levels.push({levelData:new Uint8Array(s.buffer,s.byteOffset+u._nextUint64(),u._nextUint64()),uncompressedByteLength:u._nextUint64()});const f=new os(s,a,o,!0),m={vendorId:f._skip(4)._nextUint16(),descriptorType:f._nextUint16(),versionNumber:f._nextUint16(),descriptorBlockSize:f._nextUint16(),colorModel:f._nextUint8(),colorPrimaries:f._nextUint8(),transferFunction:f._nextUint8(),flags:f._nextUint8(),texelBlockDimension:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],bytesPlane:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],samples:[]},p=(m.descriptorBlockSize/4-6)/4;for(let Q=0;Q<p;Q++){const z={bitOffset:f._nextUint16(),bitLength:f._nextUint8(),channelType:f._nextUint8(),samplePosition:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&z.channelType?(z.sampleLower=f._nextInt32(),z.sampleUpper=f._nextInt32()):(z.sampleLower=f._nextUint32(),z.sampleUpper=f._nextUint32()),m.samples[Q]=z}t.dataFormatDescriptor.length=0,t.dataFormatDescriptor.push(m);const d=new os(s,l,c,!0);for(;d._offset<c;){const Q=d._nextUint32(),z=d._scan(Q),Z=au(z),J=d._scan(Q-z.byteLength);t.keyValue[Z]=Z.match(/^ktx/i)?au(J):J,d._offset%4&&d._skip(4-d._offset%4)}if(A<=0)return t;const g=new os(s,h,A,!0),x=g._nextUint16(),_=g._nextUint16(),E=g._nextUint32(),C=g._nextUint32(),y=g._nextUint32(),w=g._nextUint32(),b=[];for(let Q=0;Q<r;Q++)b.push({imageFlags:g._nextUint32(),rgbSliceByteOffset:g._nextUint32(),rgbSliceByteLength:g._nextUint32(),alphaSliceByteOffset:g._nextUint32(),alphaSliceByteLength:g._nextUint32()});const v=h+g._offset,M=v+E,H=M+C,X=H+y,L=new Uint8Array(s.buffer,s.byteOffset+v,E),U=new Uint8Array(s.buffer,s.byteOffset+M,C),N=new Uint8Array(s.buffer,s.byteOffset+H,y),W=new Uint8Array(s.buffer,s.byteOffset+X,w);return t.globalData={endpointCount:x,selectorCount:_,imageDescs:b,endpointsData:L,selectorsData:U,tablesData:N,extendedData:W},t}let bo,Kn,El;const Bo={env:{emscripten_notify_memory_growth:function(s){El=new Uint8Array(Kn.exports.memory.buffer)}}};class sx{init(){return bo||(bo=typeof fetch<"u"?fetch("data:application/wasm;base64,"+ou).then(e=>e.arrayBuffer()).then(e=>WebAssembly.instantiate(e,Bo)).then(this._init):WebAssembly.instantiate(Buffer.from(ou,"base64"),Bo).then(this._init),bo)}_init(e){Kn=e.instance,Bo.env.emscripten_notify_memory_growth(0)}decode(e,t=0){if(!Kn)throw new Error("ZSTDDecoder: Await .init() before decoding.");const n=e.byteLength,i=Kn.exports.malloc(n);El.set(e,i),t=t||Number(Kn.exports.ZSTD_findDecompressedSize(i,n));const r=Kn.exports.malloc(t),a=Kn.exports.ZSTD_decompress(r,t,i,n),o=El.slice(r,r+a);return Kn.exports.free(i),Kn.exports.free(r),o}}const ou="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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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",Ro=new WeakMap;let Do=0,Lo;class Dn extends Jr{constructor(e){super(e),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new jv,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER<"u"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(e){return this.transcoderPath=e,this}setWorkerLimit(e){return this.workerPool.setWorkerLimit(e),this}detectSupport(e){return e.isWebGPURenderer===!0?this.workerConfig={astcSupported:e.hasFeature("texture-compression-astc"),etc1Supported:!1,etc2Supported:e.hasFeature("texture-compression-etc2"),dxtSupported:e.hasFeature("texture-compression-bc"),bptcSupported:!1,pvrtcSupported:!1}:(this.workerConfig={astcSupported:e.extensions.has("WEBGL_compressed_texture_astc"),etc1Supported:e.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:e.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:e.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:e.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:e.extensions.has("WEBGL_compressed_texture_pvrtc")||e.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},e.capabilities.isWebGL2&&(this.workerConfig.etc1Supported=!1)),this}init(){if(!this.transcoderPending){const e=new vs(this.manager);e.setPath(this.transcoderPath),e.setWithCredentials(this.withCredentials);const t=e.loadAsync("basis_transcoder.js"),n=new vs(this.manager);n.setPath(this.transcoderPath),n.setResponseType("arraybuffer"),n.setWithCredentials(this.withCredentials);const i=n.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([t,i]).then(([r,a])=>{const o=Dn.BasisWorker.toString(),l=["/* constants */","let _EngineFormat = "+JSON.stringify(Dn.EngineFormat),"let _TranscoderFormat = "+JSON.stringify(Dn.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(Dn.BasisFormat),"/* basis_transcoder.js */",r,"/* worker */",o.substring(o.indexOf("{")+1,o.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([l])),this.transcoderBinary=a,this.workerPool.setWorkerCreator(()=>{const c=new Worker(this.workerSourceURL),h=this.transcoderBinary.slice(0);return c.postMessage({type:"init",config:this.workerConfig,transcoderBinary:h},[h]),c})}),Do>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),Do++}return this.transcoderPending}load(e,t,n,i){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");const r=new vs(this.manager);r.setResponseType("arraybuffer"),r.setWithCredentials(this.withCredentials),r.load(e,a=>{if(Ro.has(a))return Ro.get(a).promise.then(t).catch(i);this._createTexture(a).then(o=>t?t(o):null).catch(i)},n,i)}_createTextureFrom(e,t){const{faces:n,width:i,height:r,format:a,type:o,error:l,dfdTransferFn:c,dfdFlags:h}=e;if(o==="error")return Promise.reject(l);let A;if(t.faceCount===6)A=new dl,A.image=n,A.format=a,A.type=Mt;else{const u=n[0].mipmaps;A=t.layerCount>1?new av(u,i,r,t.layerCount,a,Mt):new dl(u,i,r,a,Mt)}return A.minFilter=n[0].mipmaps.length===1?Rt:yi,A.magFilter=Rt,A.generateMipmaps=!1,A.needsUpdate=!0,A.colorSpace=c===tx?xe:ni,A.premultiplyAlpha=!!(h&ex),A}async _createTexture(e,t={}){const n=rx(new Uint8Array(e));if(n.vkFormat!==nx){const a=[],o=[];for(let c=0;c<n.levels.length;c++)o.push(ox(n,c).then(function(h){a[c]=h}));await Promise.all(o);const l=a[0];return l.mipmaps=a.map(c=>({data:c.source.data,width:c.source.data.width,height:c.source.data.height,depth:c.source.data.depth})),l}const i=t,r=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:e,taskConfig:i},[e])).then(a=>this._createTextureFrom(a.data,n));return Ro.set(e,{promise:r}),r}dispose(){return this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),Do--,this}}Dn.BasisFormat={ETC1S:0,UASTC_4x4:1};Dn.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16};Dn.EngineFormat={RGBAFormat:Tt,RGBA_ASTC_4x4_Format:ol,RGBA_BPTC_Format:ga,RGBA_ETC2_EAC_Format:al,RGBA_PVRTC_4BPPV1_Format:rl,RGBA_S3TC_DXT5_Format:pa,RGB_ETC1_Format:TA,RGB_ETC2_Format:sl,RGB_PVRTC_4BPPV1_Format:il,RGB_S3TC_DXT1_Format:da};Dn.BasisWorker=function(){let s,e,t;const n=_EngineFormat,i=_TranscoderFormat,r=_BasisFormat;self.addEventListener("message",function(m){const p=m.data;switch(p.type){case"init":s=p.config,a(p.transcoderBinary);break;case"transcode":e.then(()=>{try{const{faces:d,buffers:g,width:x,height:_,hasAlpha:E,format:C,dfdTransferFn:y,dfdFlags:w}=o(p.buffer);self.postMessage({type:"transcode",id:p.id,faces:d,width:x,height:_,hasAlpha:E,format:C,dfdTransferFn:y,dfdFlags:w},g)}catch(d){console.error(d),self.postMessage({type:"error",id:p.id,error:d.message})}});break}});function a(m){e=new Promise(p=>{t={wasmBinary:m,onRuntimeInitialized:p},BASIS(t)}).then(()=>{t.initializeBasis(),t.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function o(m){const p=new t.KTX2File(new Uint8Array(m));function d(){p.close(),p.delete()}if(!p.isValid())throw d(),new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");const g=p.isUASTC()?r.UASTC_4x4:r.ETC1S,x=p.getWidth(),_=p.getHeight(),E=p.getLayers()||1,C=p.getLevels(),y=p.getFaces(),w=p.getHasAlpha(),b=p.getDFDTransferFunc(),v=p.getDFDFlags(),{transcoderFormat:M,engineFormat:H}=A(g,x,_,w);if(!x||!_||!C)throw d(),new Error("THREE.KTX2Loader:	Invalid texture");if(!p.startTranscoding())throw d(),new Error("THREE.KTX2Loader: .startTranscoding failed");const X=[],L=[];for(let U=0;U<y;U++){const N=[];for(let W=0;W<C;W++){const Q=[];let z,Z;for(let le=0;le<E;le++){const P=p.getImageLevelInfo(W,le,U);U===0&&W===0&&le===0&&(P.origWidth%4!==0||P.origHeight%4!==0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),C>1?(z=P.origWidth,Z=P.origHeight):(z=P.width,Z=P.height);const ee=new Uint8Array(p.getImageTranscodedSizeInBytes(W,le,0,M));if(!p.transcodeImage(ee,W,le,U,M,0,-1,-1))throw d(),new Error("THREE.KTX2Loader: .transcodeImage failed.");Q.push(ee)}const J=f(Q);N.push({data:J,width:z,height:Z}),L.push(J.buffer)}X.push({mipmaps:N,width:x,height:_,format:H})}return d(),{faces:X,buffers:L,width:x,height:_,hasAlpha:w,format:H,dfdTransferFn:b,dfdFlags:v}}const l=[{if:"astcSupported",basisFormat:[r.UASTC_4x4],transcoderFormat:[i.ASTC_4x4,i.ASTC_4x4],engineFormat:[n.RGBA_ASTC_4x4_Format,n.RGBA_ASTC_4x4_Format],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.BC7_M5,i.BC7_M5],engineFormat:[n.RGBA_BPTC_Format,n.RGBA_BPTC_Format],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.BC1,i.BC3],engineFormat:[n.RGB_S3TC_DXT1_Format,n.RGBA_S3TC_DXT5_Format],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.ETC1,i.ETC2],engineFormat:[n.RGB_ETC2_Format,n.RGBA_ETC2_EAC_Format],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.ETC1],engineFormat:[n.RGB_ETC1_Format],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[r.ETC1S,r.UASTC_4x4],transcoderFormat:[i.PVRTC1_4_RGB,i.PVRTC1_4_RGBA],engineFormat:[n.RGB_PVRTC_4BPPV1_Format,n.RGBA_PVRTC_4BPPV1_Format],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0}],c=l.sort(function(m,p){return m.priorityETC1S-p.priorityETC1S}),h=l.sort(function(m,p){return m.priorityUASTC-p.priorityUASTC});function A(m,p,d,g){let x,_;const E=m===r.ETC1S?c:h;for(let C=0;C<E.length;C++){const y=E[C];if(s[y.if]&&y.basisFormat.includes(m)&&!(g&&y.transcoderFormat.length<2)&&!(y.needsPowerOfTwo&&!(u(p)&&u(d))))return x=y.transcoderFormat[g?1:0],_=y.engineFormat[g?1:0],{transcoderFormat:x,engineFormat:_}}return console.warn("THREE.KTX2Loader: No suitable compressed texture format found. Decoding to RGBA32."),x=i.RGBA32,_=n.RGBAFormat,{transcoderFormat:x,engineFormat:_}}function u(m){return m<=2?!0:(m&m-1)===0&&m!==0}function f(m){if(m.length===1)return m[0];let p=0;for(let x=0;x<m.length;x++){const _=m[x];p+=_.byteLength}const d=new Uint8Array(p);let g=0;for(let x=0;x<m.length;x++){const _=m[x];d.set(_,g),g+=_.byteLength}return d}};const lu={[xf]:Tt,[_f]:Tt,[pf]:Tt,[sc]:Tt,[vf]:As,[mf]:As,[df]:As,[rc]:As,[Ef]:us,[gf]:us,[ic]:us,[ff]:us},Po={[xf]:nn,[_f]:sn,[pf]:Mt,[sc]:Mt,[vf]:nn,[mf]:sn,[df]:Mt,[rc]:Mt,[Ef]:nn,[gf]:sn,[ic]:Mt,[ff]:Mt},ax={[sc]:xe,[rc]:xe,[ic]:xe};async function ox(s,e=0){const{vkFormat:t}=s,n=Math.max(1,s.pixelWidth>>e),i=Math.max(1,s.pixelHeight>>e),r=Math.max(1,s.pixelDepth>>e);if(lu[t]===void 0)throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");const a=s.levels[e];let o,l;if(s.supercompressionScheme===Zv)o=a.levelData;else if(s.supercompressionScheme===$v)Lo||(Lo=new Promise(async h=>{const A=new sx;await A.init(),h(A)})),o=(await Lo).decode(a.levelData,a.uncompressedByteLength);else throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");Po[t]===nn?l=new Float32Array(o.buffer,o.byteOffset,o.byteLength/Float32Array.BYTES_PER_ELEMENT):Po[t]===sn?l=new Uint16Array(o.buffer,o.byteOffset,o.byteLength/Uint16Array.BYTES_PER_ELEMENT):l=o;const c=r===0?new $A(l,n,i):new QA(l,n,i,r);return c.type=Po[t],c.format=lu[t],c.colorSpace=ax[t]||ni,c.needsUpdate=!0,Promise.resolve(c)}const zi=new Dn;zi.setTranscoderPath("assets/libs/basis/");function cu(s,e){if(e===Ip)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ll||e===bA){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===ll)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class lx extends Jr{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new fx(t)}),this.register(function(t){return new xx(t)}),this.register(function(t){return new Cx(t)}),this.register(function(t){return new Ix(t)}),this.register(function(t){return new px(t)}),this.register(function(t){return new gx(t)}),this.register(function(t){return new mx(t)}),this.register(function(t){return new _x(t)}),this.register(function(t){return new Ax(t)}),this.register(function(t){return new Ex(t)}),this.register(function(t){return new dx(t)}),this.register(function(t){return new vx(t)}),this.register(function(t){return new hx(t)}),this.register(function(t){return new yx(t)}),this.register(function(t){return new Sx(t)})}load(e,t,n,i){const r=this;let a;this.resourcePath!==""?a=this.resourcePath:this.path!==""?a=this.path:a=pl.extractUrlBase(e),this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new vs(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Cf){try{a[Ge.KHR_BINARY_GLTF]=new Mx(e)}catch(A){i&&i(A);return}r=JSON.parse(a[Ge.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Ox(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const A=this.pluginCallbacks[h](c);o[A.name]=A,a[A.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const A=r.extensionsUsed[h],u=r.extensionsRequired||[];switch(A){case Ge.KHR_MATERIALS_UNLIT:a[A]=new ux;break;case Ge.KHR_DRACO_MESH_COMPRESSION:a[A]=new wx(r,this.dracoLoader);break;case Ge.KHR_TEXTURE_TRANSFORM:a[A]=new Tx;break;case Ge.KHR_MESH_QUANTIZATION:a[A]=new bx;break;default:u.indexOf(A)>=0&&o[A]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+A+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function cx(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Ge={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class hx{constructor(e){this.parser=e,this.name=Ge.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new we(16777215);l.color!==void 0&&h.fromArray(l.color);const A=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new yv(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Cv(h),c.distance=A;break;case"spot":c=new vv(h),c.distance=A,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,fi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class ux{constructor(){this.name=Ge.KHR_MATERIALS_UNLIT}getMaterialType(){return _i}extendParams(e,t,n){const i=[];e.color=new we(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.fromArray(a),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,xe))}return Promise.all(i)}}class Ax{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class fx{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ce(o,o)}return Promise.all(r)}}class dx{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class px{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];return a.sheenColorFactor!==void 0&&t.sheenColor.fromArray(a.sheenColorFactor),a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,xe)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class gx{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class mx{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new we(o[0],o[1],o[2]),Promise.all(r)}}class _x{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Ex{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new we(o[0],o[1],o[2]),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,xe)),Promise.all(r)}}class vx{constructor(e){this.parser=e,this.name=Ge.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wi}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class xx{constructor(e){this.parser=e,this.name=Ge.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class Cx{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Ix{constructor(e){this.parser=e,this.name=Ge.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class yx{constructor(e){this.name=Ge.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,A=i.byteStride,u=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,A,u,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*A);return a.decodeGltfBuffer(new Uint8Array(f),h,A,u,i.mode,i.filter),f})})}else return null}}class Sx{constructor(e){this.name=Ge.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==hn.TRIANGLES&&c.mode!==hn.TRIANGLE_STRIP&&c.mode!==hn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),A=h.isGroup?h.children:[h],u=c[0].count,f=[];for(const m of A){const p=new Ne,d=new D,g=new Mi,x=new D(1,1,1),_=new ef(m.geometry,m.material,u);for(let E=0;E<u;E++)l.TRANSLATION&&d.fromBufferAttribute(l.TRANSLATION,E),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,E),l.SCALE&&x.fromBufferAttribute(l.SCALE,E),_.setMatrixAt(E,p.compose(d,g,x));for(const E in l)E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"&&m.geometry.setAttribute(E,l[E]);it.prototype.copy.call(_,m),this.parser.assignFinalMaterial(_),f.push(_)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Cf="glTF",ls=12,hu={JSON:1313821514,BIN:5130562};class Mx{constructor(e){this.name=Ge.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ls),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Cf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ls,r=new DataView(e,ls);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===hu.JSON){const c=new Uint8Array(e,ls+a,o);this.content=n.decode(c)}else if(l===hu.BIN){const c=ls+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class wx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ge.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const A=vl[h]||h.toLowerCase();o[A]=a[h]}for(const h in e.attributes){const A=vl[h]||h.toLowerCase();if(a[h]!==void 0){const u=n.accessors[e.attributes[h]],f=br[u.componentType];c[A]=f.name,l[A]=u.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(A){i.decodeDracoFile(h,function(u){for(const f in u.attributes){const m=u.attributes[f],p=l[f];p!==void 0&&(m.normalized=p)}A(u)},o,c)})})}}class Tx{constructor(){this.name=Ge.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class bx{constructor(){this.name=Ge.KHR_MESH_QUANTIZATION}}class If extends Us{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,A=(n-t)/h,u=A*A,f=u*A,m=e*c,p=m-c,d=-2*f+3*u,g=f-u,x=1-d,_=g-u+A;for(let E=0;E!==o;E++){const C=a[p+E+o],y=a[p+E+l]*h,w=a[m+E+o],b=a[m+E]*h;r[E]=x*C+_*y+d*w+g*b}return r}}const Bx=new Mi;class Rx extends If{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return Bx.fromArray(r).normalize().toArray(r),r}}const hn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},br={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},uu={9728:xt,9729:Rt,9984:nl,9985:xA,9986:fa,9987:yi},Au={33071:tn,33648:wa,10497:Un},Uo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},vl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ai={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Dx={CUBICSPLINE:void 0,LINEAR:kr,STEP:ws},No={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Lx(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Kl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:si})),s.DefaultMaterial}function Fi(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function fi(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Px(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const A=e[c];if(A.POSITION!==void 0&&(n=!0),A.NORMAL!==void 0&&(i=!0),A.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const A=e[c];if(n){const u=A.POSITION!==void 0?t.getDependency("accessor",A.POSITION):s.attributes.position;a.push(u)}if(i){const u=A.NORMAL!==void 0?t.getDependency("accessor",A.NORMAL):s.attributes.normal;o.push(u)}if(r){const u=A.COLOR_0!==void 0?t.getDependency("accessor",A.COLOR_0):s.attributes.color;l.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],A=c[1],u=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=A),r&&(s.morphAttributes.color=u),s.morphTargetsRelative=!0,s})}function Ux(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Nx(s){let e;const t=s.extensions&&s.extensions[Ge.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Fo(t.attributes):e=s.indices+":"+Fo(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+Fo(s.targets[n]);return e}function Fo(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function xl(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Fx(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const Qx=new Ne;class Ox{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new cx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new of(this.options.manager):this.textureLoader=new Sv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new vs(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};Fi(r,o,i),fi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ge.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(pl.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=Uo[i.type],o=br[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Ht(c,a,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=Uo[i.type],c=br[i.componentType],h=c.BYTES_PER_ELEMENT,A=h*l,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let p,d;if(f&&f!==A){const g=Math.floor(u/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count;let _=t.cache.get(x);_||(p=new c(o,g*f,i.count*f/h),_=new Z0(p,f/h),t.cache.add(x,_)),d=new ql(_,l,u%f/h,m)}else o===null?p=new c(i.count*l):p=new c(o,u,i.count*l),d=new Ht(p,l,m);if(i.sparse!==void 0){const g=Uo.SCALAR,x=br[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,E=i.sparse.values.byteOffset||0,C=new x(a[1],_,i.sparse.count*g),y=new c(a[2],E,i.sparse.count*l);o!==null&&(d=new Ht(d.array.slice(),d.itemSize,d.normalized));for(let w=0,b=C.length;w<b;w++){const v=C[w];if(d.setX(v,y[w*l]),l>=2&&d.setY(v,y[w*l+1]),l>=3&&d.setZ(v,y[w*l+2]),l>=4&&d.setW(v,y[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return d})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(r.samplers||{})[a.sampler]||{};return h.magFilter=uu[u.magFilter]||Rt,h.minFilter=uu[u.minFilter]||yi,h.wrapS=Au[u.wrapS]||Un,h.wrapT=Au[u.wrapT]||Un,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(A=>A.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(A){c=!0;const u=new Blob([A],{type:a.mimeType});return l=o.createObjectURL(u),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(A){return new Promise(function(u,f){let m=u;t.isImageBitmapLoader===!0&&(m=function(p){const d=new It(p);d.needsUpdate=!0,u(d)}),t.load(pl.resolveURL(A,r.path),m,void 0,f)})}).then(function(A){return c===!0&&o.revokeObjectURL(l),A.userData.mimeType=a.mimeType||Fx(a.uri),A}).catch(function(A){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),A});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[Ge.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ge.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[Ge.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new nf,Nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new tf,Nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Kl}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[Ge.KHR_MATERIALS_UNLIT]){const A=i[Ge.KHR_MATERIALS_UNLIT];a=A.getMaterialType(),c.push(A.extendParams(o,r,t))}else{const A=r.pbrMetallicRoughness||{};if(o.color=new we(1,1,1),o.opacity=1,Array.isArray(A.baseColorFactor)){const u=A.baseColorFactor;o.color.fromArray(u),o.opacity=u[3]}A.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",A.baseColorTexture,xe)),o.metalness=A.metallicFactor!==void 0?A.metallicFactor:1,o.roughness=A.roughnessFactor!==void 0?A.roughnessFactor:1,A.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",A.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",A.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Cn);const h=r.alphaMode||No.OPAQUE;if(h===No.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===No.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==_i&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ce(1,1),r.normalTexture.scale!==void 0)){const A=r.normalTexture.scale;o.normalScale.set(A,A)}return r.occlusionTexture!==void 0&&a!==_i&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==_i&&(o.emissive=new we().fromArray(r.emissiveFactor)),r.emissiveTexture!==void 0&&a!==_i&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,xe)),Promise.all(c).then(function(){const A=new a(o);return r.name&&(A.name=r.name),fi(A,r),t.associations.set(A,{materials:e}),r.extensions&&Fi(i,A,r),A})}createUniqueName(e){const t=qe.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[Ge.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return fu(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=Nx(c),A=i[h];if(A)a.push(A.promise);else{let u;c.extensions&&c.extensions[Ge.KHR_DRACO_MESH_COMPRESSION]?u=r(c):u=fu(new wn,c,t),i[h]={primitive:c,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?Lx(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],A=[];for(let f=0,m=h.length;f<m;f++){const p=h[f],d=a[f];let g;const x=c[f];if(d.mode===hn.TRIANGLES||d.mode===hn.TRIANGLE_STRIP||d.mode===hn.TRIANGLE_FAN||d.mode===void 0)g=r.isSkinnedMesh===!0?new ev(p,x):new Vt(p,x),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),d.mode===hn.TRIANGLE_STRIP?g.geometry=cu(g.geometry,bA):d.mode===hn.TRIANGLE_FAN&&(g.geometry=cu(g.geometry,ll));else if(d.mode===hn.LINES)g=new iv(p,x);else if(d.mode===hn.LINE_STRIP)g=new Yl(p,x);else if(d.mode===hn.LINE_LOOP)g=new rv(p,x);else if(d.mode===hn.POINTS)g=new sv(p,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+d.mode);Object.keys(g.geometry.morphAttributes).length>0&&Ux(g,r),g.name=t.createUniqueName(r.name||"mesh_"+e),fi(g,r),d.extensions&&Fi(i,g,d),t.assignFinalMaterial(g),A.push(g)}for(let f=0,m=A.length;f<m;f++)t.associations.set(A[f],{meshes:e,primitives:f});if(A.length===1)return r.extensions&&Fi(i,A[0],r),A[0];const u=new ei;r.extensions&&Fi(i,u,r),t.associations.set(u,{meshes:e});for(let f=0,m=A.length;f<m;f++)u.add(A[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new kt(Kp.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ps(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),fi(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const A=a[c];if(A){o.push(A);const u=new Ne;r!==null&&u.fromArray(r.array,c*16),l.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Xl(o,l)})}loadAnimation(e){const n=this.json.animations[e],i=n.name?n.name:"animation_"+e,r=[],a=[],o=[],l=[],c=[];for(let h=0,A=n.channels.length;h<A;h++){const u=n.channels[h],f=n.samplers[u.sampler],m=u.target,p=m.node,d=n.parameters!==void 0?n.parameters[f.input]:f.input,g=n.parameters!==void 0?n.parameters[f.output]:f.output;m.node!==void 0&&(r.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",d)),o.push(this.getDependency("accessor",g)),l.push(f),c.push(m))}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c)]).then(function(h){const A=h[0],u=h[1],f=h[2],m=h[3],p=h[4],d=[];for(let g=0,x=A.length;g<x;g++){const _=A[g],E=u[g],C=f[g],y=m[g],w=p[g];if(_===void 0)continue;_.updateMatrix();let b;switch(Ai[w.path]){case Ai.weights:b=Bs;break;case Ai.rotation:b=ji;break;case Ai.position:case Ai.scale:default:b=Rs;break}const v=_.name?_.name:_.uuid,M=y.interpolation!==void 0?Dx[y.interpolation]:kr,H=[];Ai[w.path]===Ai.weights?_.traverse(function(L){L.morphTargetInfluences&&H.push(L.name?L.name:L.uuid)}):H.push(v);let X=C.array;if(C.normalized){const L=xl(X.constructor),U=new Float32Array(X.length);for(let N=0,W=X.length;N<W;N++)U[N]=X[N]*L;X=U}for(let L=0,U=H.length;L<U;L++){const N=new b(H[L]+"."+Ai[w.path],E.array,X,M);y.interpolation==="CUBICSPLINE"&&(N.createInterpolant=function(Q){const z=this instanceof ji?Rx:If;return new z(this.times,this.values,this.getValueSize()/3,Q)},N.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),d.push(N)}}return new Av(i,void 0,d)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],A=c[1],u=c[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,Qx)});for(let f=0,m=A.length;f<m;f++)h.add(A[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new ZA:c.length>1?h=new ei:c.length===1?h=c[0]:h=new it,h!==c[0])for(let A=0,u=c.length;A<u;A++)h.add(c[A]);if(r.name&&(h.userData.name=r.name,h.name=a),fi(h,r),r.extensions&&Fi(n,h,r),r.matrix!==void 0){const A=new Ne;A.fromArray(r.matrix),h.applyMatrix4(A)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new ei;n.name&&(r.name=i.createUniqueName(n.name)),fi(r,n),n.extensions&&Fi(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,A=l.length;h<A;h++)r.add(l[h]);const c=h=>{const A=new Map;for(const[u,f]of i.associations)(u instanceof Nn||u instanceof It)&&A.set(u,f);return h.traverse(u=>{const f=i.associations.get(u);f!=null&&A.set(u,f)}),A};return i.associations=c(r),r})}}function Gx(s,e,t){const n=e.attributes,i=new ai;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new D(l[0],l[1],l[2]),new D(c[0],c[1],c[2])),o.normalized){const h=xl(br[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new D,l=new D;for(let c=0,h=r.length;c<h;c++){const A=r[c];if(A.POSITION!==void 0){const u=t.json.accessors[A.POSITION],f=u.min,m=u.max;if(f!==void 0&&m!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),u.normalized){const p=xl(br[u.componentType]);l.multiplyScalar(p)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new Qn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function fu(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in n){const o=vl[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return fi(s,e),Gx(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Px(s,e.targets,t):s})}class kx extends lx{constructor(){super()}loadModel(e){return new Promise((t,n)=>{this.load(e,function(i){t(i.scene.children[0])},null,n)})}}const yf=new kx().setPath("assets/geometry/");class Hx extends Lt{constructor(e={}){e={...e},super({uniforms:{...Ct.uniforms,uMaxPetals:{value:e.petals},uPetalWidth:{value:e.petalWidth},uSpeed:{value:e.speed},tColor:{value:null},tColorRamp:{value:null},tNormal:{value:null},tTranslucent:{value:null},tAlpha:{value:null},tMatcap:{value:null},tCavity:{value:null},uMousePos:{value:ti.position11},uMouseVel:{value:ti.vel},uMouseSpeed:{value:0}},side:Cn,vertexShader:` 
                ${Ct.glsl}

                attribute int index;
                attribute float random;

                uniform float uMaxPetals;
                uniform float uPetalWidth;
                uniform float uSpeed;
                uniform vec2 uMousePos;
                uniform float uMouseSpeed;

                uniform sampler2D tColorRamp;

                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vEye;
                varying vec3 vNormal;
                varying vec3 vHighlight;
                varying vec3 vColor1;
                varying vec3 vColor2;
                varying vec3 vColor3;
                varying vec3 vColor;
                varying float vGlobal01;

                varying float vFalloff;
                varying float vAo;
                varying vec3 vMouseHighlight;
                varying vec3 vCenterHighlight;

                varying mat3 vTBN;

                mat2 rotateAngle(float a) {
                    float s = sin(a);
                    float c = cos(a);
                    mat2 m = mat2(c, -s, s, c);
                    return m;
                }

                // https://github.com/minus34/cesium1/blob/master/Cesium/Shaders/Builtin/Functions/saturation.glsl
                vec3 czm_saturation(vec3 rgb, float adjustment)
                {
                    // Algorithm from Chapter 16 of OpenGL Shading Language
                    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
                    vec3 intensity = vec3(dot(rgb, W));
                    return mix(intensity, rgb, adjustment);
                }
        
                void main() {
                    vUv = uv;

                    float t = time * uSpeed + 4.0;
                    float maxPetals = uMaxPetals;
                    float id = float(index) / maxPetals;

                    float global01 = fract(t + id);
                    float global10 = 1.0 - global01;
                    float global010 = 1.0 - abs(global01 * 2.0 - 1.0);
                    float global010smooth = 1.0 - pow(1.0 - global010, 3.0);

                    vGlobal01 = global01;

                    vec3 n = normal;
                    vec3 pos = position;
                    // pos.y *= 1.5;
                    // pos.x *= 1.1;
                    // pos.yz *= uPetalWidth * mix(1.0, 0.85, random);
                    pos.x *= 1.0 - pow(1.0 - clamp(global01 * 9.5, 0.0, 1.0), 2.0) * 0.9;

                    pos.y *= 1.5;
                    pos.yz *= uPetalWidth * mix(1.0, 0.8, random);
                    pos.z += random * 0.11;

                    float angle1 = ((1.0 - uv.y) - 0.5);
                    angle1 *= mix(2.0, 0.3, clamp(global01 * 3.0, 0.0, 1.0));
                    mat2 rotMatrix1 = rotateAngle(-angle1);
                    pos.yz = rotMatrix1 * pos.yz;
                    n.yz = rotMatrix1 * n.yz;

                    float angle2 = -uv.x * 2.0;
                    angle2 += sin(t * 50.0 - uv.x * 4.0 + id * 25.0) * 0.05;
                    angle2 *= global10 * global10;
                    angle2 += pow(vUv.x - 0.02, 7.0) * 0.1 * sin(-1.0 + vUv.x * 6.0 + global10 * 25.0) * global10;
                    // angle2 += pow(vUv.x - 0.02, 9.0) * 0.5 * global010;

                    float angle3 = global01;
                    mat2 rotMatrix3 = rotateAngle(angle3 + angle2);
                    pos.xy = rotMatrix3 * pos.xy;
                    n.xy = rotMatrix3 * n.xy;

                    float angle4 = float(index) * 4.85402768505;
                    angle4 += random * 0.3;
                    mat2 rotMatrix4 = rotateAngle(angle4);
                    pos.xz = rotMatrix4 * pos.xz;
                    n.xz = rotMatrix4 * n.xz;

                    float yoffset = 1.3;
                    pos *= global010smooth;
                    pos *= 1.0 - pow(clamp(global01 + 0.35, 0.0, 1.0), 8.0);
                    pos.y -= global01 * yoffset;
                    pos.y += 0.5;

                    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
                    vPos = worldPos.xyz;
                    vNormal = normalMatrix * n;

                    vec4 modelViewPos = viewMatrix * worldPos;
                    gl_Position = projectionMatrix * modelViewPos;

                    vEye = -normalize(modelViewPos.xyz);
                    vec3 screenpos = gl_Position.xyz / gl_Position.w;

                    vec3 lightPos = vec3(12.5, 29.1, 4.6);
                    float falloff = dot(normalize(vPos), normalize(lightPos)) * 0.5 + 0.12;
                    falloff *= 1.0;
                    falloff = clamp(falloff, 0.0, 1.0);
                    vFalloff = falloff;

                    float ao = 1.0;
                    ao = vUv.x;
                    ao = pow(ao, 2.0);
                    // ao *= 1.0 - pow(1.04 - global01, 22.0);
                    ao += pow(1.0 - vUv.x, 2.0) * 4.0;
                    // ao += pow(global10, 9.0) * 0.2;
                    ao = clamp(ao, 0.0, 1.0);
                    ao = mix(1.0, ao, 1.0);
                    ao *= 0.75;
                    ao += (1.0 - pow(vUv.x, 2.0)) * 0.5;
                    vAo = ao;

                    vec3 color1a = vec3(0.8, 1.0, 0.0);
                    vec3 color2a = vec3(0.5, 0.1, 1.0);
                    vec3 color3a = vec3(0.5, 0.0, 1.0);

                    vec3 color1b = vec3(0.5, 1.0, 1.0);
                    vec3 color2b = vec3(0.5, 0.0, 1.0);
                    vec3 color3b = vec3(1.0, 0.0, 0.2);

                    vColor1 = color1a;
                    vColor2 = color2a;
                    vColor3 = color3a;

                    float colorMix = -global01 * 0.8 - vUv.x * 0.2 + t + 0.3;
                    vColor1 = texture2D(tColorRamp, vec2(0.0, colorMix)).rgb;
                    // vColor1 += vec3(0.1);
                    vColor2 = texture2D(tColorRamp, vec2(1.0, colorMix * 1.31415)).rgb;

                    // vColor = mix(vColor1, vColor2, clamp(1.0 - pow(vUv.x, 3.0), 0.0, 1.0)) * 0.8;
                    vColor = mix(vColor1, vColor2, clamp(1.0 - pow(vUv.x, 4.0) - pow(global10, 4.0) * 0.8, 0.0, 1.0)) * 0.8;

                    vColor = czm_saturation(vColor, 1.2);


                    vec2 screenuv = screenpos.xy;
                    vHighlight = pow(1.0 - clamp(distance(vec2(0.2, 0.8), screenuv), 0.0, 3.0) / 3.0, 2.0) * 3.0 * vColor3;

                    vec2 mouseuv = uMousePos.xy;
                    mouseuv.x *= aspect;
                    screenuv.x *= aspect;
                    vMouseHighlight = pow(1.0 - clamp(distance(mouseuv, screenuv), 0.0, 1.0), 3.0) * 0.2 * clamp(uMouseSpeed, 0.0, 10.0) * vColor * pow(falloff, 0.5);
                    
                    vec3 tangent = normalize(vPos);
                    vec3 bitangent = cross(tangent, vNormal);
                    vTBN = mat3(tangent, bitangent, vNormal);
                }`,fragmentShader:` 
                ${Ct.glsl}
        
                varying vec2 vUv;
                varying vec3 vPos;
                varying vec3 vNormal;
                varying float vGlobal01;
                varying vec3 vEye;
                varying vec3 vHighlight;

                varying vec3 vColor1;
                varying vec3 vColor2;
                varying vec3 vColor3;
                varying vec3 vColor;

                varying mat3 vTBN;

                varying float vFalloff;
                varying float vAo;
                varying vec3 vMouseHighlight;

                uniform sampler2D tColor;
                uniform sampler2D tAlpha;
                uniform sampler2D tNormal;
                uniform sampler2D tTranslucent;
                uniform sampler2D tMatcap;
                uniform sampler2D tCavity;
                varying vec3 vCenterHighlight;

                uniform vec2 uMousePos;
                uniform vec2 uMouseVel;
                uniform float uMouseSpeed;

                //http://www.thetenthplanet.de/archives/1180
                mat3 cotangentFrame(vec3 N, vec3 p, vec2 uv) {
                    // get edge vectors of the pixel triangle
                    vec3 dp1 = dFdx(p);
                    vec3 dp2 = dFdy(p);
                    vec2 duv1 = dFdx(uv);
                    vec2 duv2 = dFdy(uv);

                    // solve the linear system
                    vec3 dp2perp = cross(dp2, N);
                    vec3 dp1perp = cross(N, dp1);
                    vec3 T = dp2perp * duv1.x + dp1perp * duv2.x;
                    vec3 B = dp2perp * duv1.y + dp1perp * duv2.y;

                    // construct a scale-invariant frame 
                    return mat3(normalize(T), normalize(B), N);
                }

                //https://github.com/hughsk/matcap/blob/master/matcap.glsl
                vec2 matcap(vec3 eye, vec3 normal) {
                    vec3 reflected = reflect(eye, normal);
                    float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
                    return reflected.xy / m + 0.5;
                }
        
                void main() {
                    float cavity = texture2D(tCavity, vUv).r * 2.0 - 1.0;
                    vec3 normal = vNormal;
                    vec3 normalTexture = texture2D(tNormal, vUv).rgb * 2.0 - 1.0;
                    float translucent = texture2D(tTranslucent, vUv).r;

                    vec3 color = vColor;
                    color += vHighlight * translucent;
                    color += translucent * vColor3;
                    color *= max(0.05, clamp(vFalloff + 0.2, 0.0, 1.0)) * 1.7;
                    color *= vAo;

                    normalTexture.xy *= 1.5;
                    normal = normalize(vTBN * normalTexture);

                    float fresnel = dot(vEye, normal) * 0.5 + 0.5;
                    color += cavity * 0.7;

                    vec2 matcapUv = matcap(vEye, normal);
                    float reflection = texture2D(tMatcap, matcapUv).r;
                    reflection -= 0.5;

                    float reflectionAmount = (1.0 - vGlobal01 * 2.0) * fresnel * vAo * 0.7;
                    reflectionAmount += vPos.y * 0.1;
                    color *= 0.9;
                    color += reflectionAmount * reflection * 0.7;

                    float b = pow(1.0 - vGlobal01, 7.0);
                    float innerLight = clamp(1.0 - vPos.y * 1.8 + 0.4, 0.0, 1.0) * b * 3.0;
                    innerLight = pow(innerLight, 2.0);
                    color += innerLight * vColor2 * 2.0;
                    color += innerLight * 0.35;

                    color += vMouseHighlight * translucent * vColor * 3.0;

                    color = pow(color, vec3(3.0)) * 2.0;

                    gl_FragColor = vec4(color, 1.0);
                }`})}}class zx extends ei{constructor(e={}){super(),e={...e},zi.detectSupport(Ct.renderer),this.textures=[],this.petalCount=e.petalCount,this.petalWidth=e.petalWidth,this.speed=e.flowerSpeed*.1,this.pointerGlow=e.pointerGlow?1:0,this.pointerGlowFactor=0,this.pointerGlowDamping=.04,this.pointerPos11Smooth=new ce,this.ready=nc(),this.initInstancedMesh(e)}async initInstancedMesh(e){const t=ye.device.mobile||ye.screenWidth<1500?"petalMobile.glb":"petal.glb",i=(await yf.loadModel(t)).geometry,r=new Hx({petals:this.petalCount,petalWidth:this.petalWidth,speed:this.speed});let a=new Int32Array(this.petalCount),o=new Float32Array(this.petalCount);for(let p=0;p<this.petalCount;p++)a[p]=p,o[p]=Math.random();const l=new Ba(a,1,!1,1),c=new Ba(o,1,!1,1);i.setAttribute("index",l),i.setAttribute("random",c),this.mesh=new ef(i,r,this.petalCount),this.textures=await Promise.all([zi.loadAsync("./assets/images/petal1_translucency_512_pow.ktx2"),zi.loadAsync("./assets/images/petal1_normal_1024.ktx2"),_l.loadAsync("./assets/images/matcap2.jpg"),zi.loadAsync("./assets/images/petal1_cavity_512.ktx2"),_l.loadAsync("./assets/images/colorramp.jpg")]),this.textures.forEach(p=>{p.colorSpace=pn});const[h,A,u,f,m]=this.textures;h.colorSpace=xe,m.wrapT=Un,this.mesh.material.uniforms.tNormal.value=A,this.mesh.material.uniforms.tTranslucent.value=h,this.mesh.material.uniforms.tMatcap.value=u,this.mesh.material.uniforms.tCavity.value=f,this.mesh.material.uniforms.tColorRamp.value=m,this.add(this.mesh),this.pointerGlow&&(et.on("update",this.update.bind(this)),this.mesh.material.uniforms.uMousePos.value=this.pointerPos11Smooth),this.ready.resolve()}update(){if(this.pointerGlow){let e=Ir(this.pointerGlowDamping);this.pointerGlowFactor+=(ti.speed-this.pointerGlowFactor)*e,this.pointerGlowFactor*=1-e,this.pointerPos11Smooth.lerp(ti.position11,Ir(.2)),this.mesh.material.uniforms.uMouseSpeed.value=this.pointerGlowFactor}}}class Vx extends Lt{constructor(e={}){e={...e},super({uniforms:{...Ct.uniforms,tNoise:{value:null},tColorRamp:{value:null}},transparent:!0,blending:Ma,vertexShader:` 
                ${Ct.glsl}
        
                varying vec2 vUv;
                varying vec3 vViewDir;
                varying vec3 vNormal;
                varying vec3 vWorldNormal;
                varying vec3 vV;
                varying vec3 vPos;
        
                void main() {
                    vec4 worldPos = modelMatrix * vec4(position, 1.0);
                    vec4 modelViewPos = viewMatrix * worldPos;
                    gl_Position = projectionMatrix * modelViewPos;
        
                    vec3 worldNormal = mat3(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz) * normal;
        
                    vWorldNormal = worldNormal;
                    vV = worldPos.xyz - cameraPosition;
        
                    vUv = uv;
                    vNormal = normalMatrix * normal;
                    vViewDir = -modelViewPos.xyz;
                    vPos = position;
                }`,fragmentShader:` 
                ${Ct.glsl}

                uniform sampler2D tNoise;
                uniform sampler2D tColorRamp;
        
                varying vec2 vUv;
                varying vec3 vViewDir;
                varying vec3 vNormal;
                varying vec3 vWorldNormal;
                varying vec3 vV;
                varying vec3 vPos;
        
                void main() {

                    vec2 uv = vUv;
                    uv.x *= 0.5;
                    uv.y *= 3.0;
                    float t = time * 0.043;
                    uv.x -= t;

                    vec2 uv3 = vUv;
                    uv3.x *= 1.0;
                    uv3.y *= 3.0;
                    uv3.x -= t * 1.6;

                    vec2 uv5 = vUv;
                    uv5.x -= t * 0.5;
                    uv5.y *= 2.0;

                    uv.y += sin(time * 2.0 + uv.x * 45.0) * 0.02 * vUv.x;
                    uv.x += cos(time * 2.4 + uv.y * 45.0) * 0.02 * vUv.x;

                    float noise = texture2D(tNoise, uv).r;
                    float noise3 = texture2D(tNoise, uv3).r;
                    float noise4 = texture2D(tNoise, uv5).r;

                    vec2 uv4 = vUv;
                    uv4.x *= 0.5;
                    uv4.y *= 2.0;
                    uv4.x -= t * 1.6;

                    noise *= noise3;
                    noise += noise4 * 0.2;
                    noise = smoothstep(0.0, 1.0, noise);

                    vec2 uv6 = vUv;
                    uv6.x *= 0.05;
                    uv6.y *= 3.0;
                    uv6.x -= t;

                    float n6 = texture2D(tNoise, uv6).r;

                    float wave = fract(vUv.x * 2.0 - time * 0.3 + n6 * 0.1);
                    // wave += noise * 0.2;
                    wave += smoothstep(0.2, 0.0, wave);
                    float ogwave = wave;
                    wave = pow(wave, 5.0);
                    // wave *= 0.5;
                    wave = smoothstep(0.1, 0.8, wave);

                    wave += noise * 1.5 * ogwave;

                    float colorMix = -vUv.x * 0.8 + time * 0.1 + vPos.x;
                    colorMix = clamp(colorMix, 0.0, 1.0);
                    vec3 color = texture2D(tColorRamp, vec2(sin(time * 0.05 + 0.2) * 0.5 + 0.5, colorMix)).rgb;
                    color += pow(wave, 3.0) * 0.1;
                    float alpha = 0.0;

                    alpha = wave;
                    alpha *= 1.0 - vUv.x;
                    alpha *= smoothstep(0.05, 0.2, vUv.x);
                    alpha *= 1.0 - vUv.x;

                    alpha *= alpha;

                    color = pow(color, vec3(3.0));


                    gl_FragColor = vec4(color, alpha);
                }`})}}class Wx extends ei{constructor(e={}){super(),e={},zi.detectSupport(Ct.renderer),this.textures=[],this.computationShader=null,this.particleShader=null,this.textures=[],this.ready=nc(),this.init()}async init(){const e="circle.glb",n=(await yf.loadModel(e)).geometry,i=new Vx;let r=new Int32Array(this.petalCount),a=new Float32Array(this.petalCount);for(let c=0;c<this.petalCount;c++)r[c]=c,a[c]=Math.random();this.mesh=new Vt(n,i),this.mesh.scale.set(8,8,8),this.mesh.position.y-=.5,this.textures=await Promise.all([zi.loadAsync("./assets/images/scalarnoise.ktx2"),_l.loadAsync("./assets/images/colorramp.jpg")]),this.textures.forEach(c=>{c.colorSpace=pn});const[o,l]=this.textures;o.wrapS=Un,o.wrapT=Un,l.wrapT=Un,this.mesh.material.uniforms.tNoise.value=o,this.mesh.material.uniforms.tColorRamp.value=l,this.add(this.mesh),this.ready.resolve()}update(){}}class qx extends Jv{constructor(e){const t=ye.device.mobile?1.1:1;e={camera:{type:"displacement",startPos:new D(0,1.8*t,1.4*t),displacementStrength:new ce(-.2,-.2).multiplyScalar(e.cameraMoveStrength)},...e},super(e),this.textures=[],this.flower=null,this.glowPlane=null,this.particles=null,this.ready=nc(),this.init(e)}async init(e){let t=[];const{flowerPosition:n,flowerRotation:i}=e;this.flower=new zx(e),this.rotation.fromArray(i),this.position.fromArray(n),this.add(this.flower),t.push(this.flower.ready),this.textures=[...this.textures,...this.flower.textures],e.shockwave&&(this.shockwave=new Wx,this.add(this.shockwave),t.push(this.shockwave.ready),this.textures=[...this.textures,this.shockwave.textures]),await Promise.all(t),et.on("update",this.update.bind(this)),this.ready.resolve()}upload(e,t){super.upload(e,t),this.textures.forEach(n=>{Ct.renderer.initTexture(n)})}update(e){}}const Xx={uniforms:{tDiffuse:{value:null},resolution:{value:new ce(1/1024,1/512)}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	precision highp float;

	uniform sampler2D tDiffuse;

	uniform vec2 resolution;

	varying vec2 vUv;

	// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)

	//----------------------------------------------------------------------------------
	// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag
	// SDK Version: v3.00
	// Email:       gameworks@nvidia.com
	// Site:        http://developer.nvidia.com/
	//
	// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions
	// are met:
	//  * Redistributions of source code must retain the above copyright
	//    notice, this list of conditions and the following disclaimer.
	//  * Redistributions in binary form must reproduce the above copyright
	//    notice, this list of conditions and the following disclaimer in the
	//    documentation and/or other materials provided with the distribution.
	//  * Neither the name of NVIDIA CORPORATION nor the names of its
	//    contributors may be used to endorse or promote products derived
	//    from this software without specific prior written permission.
	//
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ''AS IS'' AND ANY
	// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
	// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
	// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
	// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
	// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
	// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	//----------------------------------------------------------------------------------

	#ifndef FXAA_DISCARD
			//
			// Only valid for PC OpenGL currently.
			// Probably will not work when FXAA_GREEN_AS_LUMA = 1.
			//
			// 1 = Use discard on pixels which don't need AA.
			//     For APIs which enable concurrent TEX+ROP from same surface.
			// 0 = Return unchanged color on pixels which don't need AA.
			//
			#define FXAA_DISCARD 0
	#endif

	/*--------------------------------------------------------------------------*/
	#define FxaaTexTop(t, p) texture2D(t, p, -100.0)
	#define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), -100.0)
	/*--------------------------------------------------------------------------*/

	#define NUM_SAMPLES 5

	// assumes colors have premultipliedAlpha, so that the calculated color contrast is scaled by alpha
	float contrast( vec4 a, vec4 b ) {
			vec4 diff = abs( a - b );
			return max( max( max( diff.r, diff.g ), diff.b ), diff.a );
	}

	/*============================================================================

									FXAA3 QUALITY - PC

	============================================================================*/

	/*--------------------------------------------------------------------------*/
	vec4 FxaaPixelShader(
			vec2 posM,
			sampler2D tex,
			vec2 fxaaQualityRcpFrame,
			float fxaaQualityEdgeThreshold,
			float fxaaQualityinvEdgeThreshold
	) {
			vec4 rgbaM = FxaaTexTop(tex, posM);
			vec4 rgbaS = FxaaTexOff(tex, posM, vec2( 0.0, 1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaE = FxaaTexOff(tex, posM, vec2( 1.0, 0.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaN = FxaaTexOff(tex, posM, vec2( 0.0,-1.0), fxaaQualityRcpFrame.xy);
			vec4 rgbaW = FxaaTexOff(tex, posM, vec2(-1.0, 0.0), fxaaQualityRcpFrame.xy);
			// . S .
			// W M E
			// . N .

			bool earlyExit = max( max( max(
					contrast( rgbaM, rgbaN ),
					contrast( rgbaM, rgbaS ) ),
					contrast( rgbaM, rgbaE ) ),
					contrast( rgbaM, rgbaW ) )
					< fxaaQualityEdgeThreshold;
			// . 0 .
			// 0 0 0
			// . 0 .

			#if (FXAA_DISCARD == 1)
					if(earlyExit) FxaaDiscard;
			#else
					if(earlyExit) return rgbaM;
			#endif

			float contrastN = contrast( rgbaM, rgbaN );
			float contrastS = contrast( rgbaM, rgbaS );
			float contrastE = contrast( rgbaM, rgbaE );
			float contrastW = contrast( rgbaM, rgbaW );

			float relativeVContrast = ( contrastN + contrastS ) - ( contrastE + contrastW );
			relativeVContrast *= fxaaQualityinvEdgeThreshold;

			bool horzSpan = relativeVContrast > 0.;
			// . 1 .
			// 0 0 0
			// . 1 .

			// 45 deg edge detection and corners of objects, aka V/H contrast is too similar
			if( abs( relativeVContrast ) < .3 ) {
					// locate the edge
					vec2 dirToEdge;
					dirToEdge.x = contrastE > contrastW ? 1. : -1.;
					dirToEdge.y = contrastS > contrastN ? 1. : -1.;
					// . 2 .      . 1 .
					// 1 0 2  ~=  0 0 1
					// . 1 .      . 0 .

					// tap 2 pixels and see which ones are "outside" the edge, to
					// determine if the edge is vertical or horizontal

					vec4 rgbaAlongH = FxaaTexOff(tex, posM, vec2( dirToEdge.x, -dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongH = contrast( rgbaM, rgbaAlongH );
					// . 1 .
					// 0 0 1
					// . 0 H

					vec4 rgbaAlongV = FxaaTexOff(tex, posM, vec2( -dirToEdge.x, dirToEdge.y ), fxaaQualityRcpFrame.xy);
					float matchAlongV = contrast( rgbaM, rgbaAlongV );
					// V 1 .
					// 0 0 1
					// . 0 .

					relativeVContrast = matchAlongV - matchAlongH;
					relativeVContrast *= fxaaQualityinvEdgeThreshold;

					if( abs( relativeVContrast ) < .3 ) { // 45 deg edge
							// 1 1 .
							// 0 0 1
							// . 0 1

							// do a simple blur
							return mix(
									rgbaM,
									(rgbaN + rgbaS + rgbaE + rgbaW) * .25,
									.4
							);
					}

					horzSpan = relativeVContrast > 0.;
			}

			if(!horzSpan) rgbaN = rgbaW;
			if(!horzSpan) rgbaS = rgbaE;
			// . 0 .      1
			// 1 0 1  ->  0
			// . 0 .      1

			bool pairN = contrast( rgbaM, rgbaN ) > contrast( rgbaM, rgbaS );
			if(!pairN) rgbaN = rgbaS;

			vec2 offNP;
			offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
			offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;

			bool doneN = false;
			bool doneP = false;

			float nDist = 0.;
			float pDist = 0.;

			vec2 posN = posM;
			vec2 posP = posM;

			int iterationsUsed = 0;
			int iterationsUsedN = 0;
			int iterationsUsedP = 0;
			for( int i = 0; i < NUM_SAMPLES; i++ ) {
					iterationsUsed = i;

					float increment = float(i + 1);

					if(!doneN) {
							nDist += increment;
							posN = posM + offNP * nDist;
							vec4 rgbaEndN = FxaaTexTop(tex, posN.xy);
							doneN = contrast( rgbaEndN, rgbaM ) > contrast( rgbaEndN, rgbaN );
							iterationsUsedN = i;
					}

					if(!doneP) {
							pDist += increment;
							posP = posM - offNP * pDist;
							vec4 rgbaEndP = FxaaTexTop(tex, posP.xy);
							doneP = contrast( rgbaEndP, rgbaM ) > contrast( rgbaEndP, rgbaN );
							iterationsUsedP = i;
					}

					if(doneN || doneP) break;
			}


			if ( !doneP && !doneN ) return rgbaM; // failed to find end of edge

			float dist = min(
					doneN ? float( iterationsUsedN ) / float( NUM_SAMPLES - 1 ) : 1.,
					doneP ? float( iterationsUsedP ) / float( NUM_SAMPLES - 1 ) : 1.
			);

			// hacky way of reduces blurriness of mostly diagonal edges
			// but reduces AA quality
			dist = pow(dist, .5);

			dist = 1. - dist;

			return mix(
					rgbaM,
					rgbaN,
					dist * .5
			);
	}

	void main() {
			const float edgeDetectionQuality = .2;
			const float invEdgeDetectionQuality = 1. / edgeDetectionQuality;

			gl_FragColor = FxaaPixelShader(
					vUv,
					tDiffuse,
					resolution,
					edgeDetectionQuality, // [0,1] contrast needed, otherwise early discard
					invEdgeDetectionQuality
			);

	}
	`},Yx={shaderID:"luminosityHighPass",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new we(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Wr extends jr{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ce(e.x,e.y):new ce(256,256),this.clearColor=new we(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Sn(r,a,{type:sn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let A=0;A<this.nMips;A++){const u=new Sn(r,a,{type:sn});u.texture.name="UnrealBloomPass.h"+A,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new Sn(r,a,{type:sn});f.texture.name="UnrealBloomPass.v"+A,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),a=Math.round(a/2)}const o=Yx;this.highPassUniforms=bs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Lt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader,defines:{}}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let A=0;A<this.nMips;A++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[A])),this.separableBlurMaterials[A].uniforms.texSize.value=new ce(r,a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.needsUpdate=!0;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1),new D(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=hf;this.copyUniforms=bs.clone(h.uniforms),this.copyUniforms.opacity.value=1,this.materialCopy=new Lt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Ma,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new we,this.oldClearAlpha=1,this.basic=new _i,this.fsQuad=new tc(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.materialCopy.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.texSize.value=new ce(n,i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,r){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),r&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Wr.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Wr.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.materialCopy,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){return new Lt({defines:{KERNEL_RADIUS:e,SIGMA:e},uniforms:{colorTexture:{value:null},texSize:{value:new ce(.5,.5)},direction:{value:new ce(.5,.5)}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 texSize;
				uniform vec2 direction;

				float gaussianPdf(in float x, in float sigma) {
					return 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;
				}
				void main() {
					vec2 invSize = 1.0 / texSize;
					float fSigma = float(SIGMA);
					float weightSum = gaussianPdf(0.0, fSigma);
					vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianPdf(x, fSigma);
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Lt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Wr.BlurDirectionX=new ce(1,0);Wr.BlurDirectionY=new ce(0,1);const Kx={uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			gl_FragColor = LinearTosRGB( gl_FragColor );

		}`};class Jx extends jr{constructor(e=Pn,t=1){super(),this.toneMapping=e,this.toneMappingExposure=t;const n=Kx;this.uniforms=bs.clone(n.uniforms),this.material=new Lt({uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),e===mA?this.material.defines.LINEAR_TONE_MAPPING="":e===Gl?this.material.defines.REINHARD_TONE_MAPPING="":e===_A?this.material.defines.CINEON_TONE_MAPPING="":e===EA&&(this.material.defines.ACES_FILMIC_TONE_MAPPING=""),this.fsQuad=new tc(this.material)}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=this.toneMappingExposure,this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const jx={enabled:!0,mainScene:null,effectComposer:null,fxaaPass:null,options:{flowerSpeed:.35,flowerPosition:[-.1,-.15,0],flowerRotation:[0,-.1,-.4],petalCount:95,petalWidth:.9,shockwave:!0,pointerGlow:!0,bloomStrength:1,cameraMoveStrength:1},async init(s){this.options={...this.options,...s},await this.createScenes(),et.on("resize",this.resize,this),et.on("prerender",this.prerender,this),et.on("webgl_active",this.active,this),Fr.ticker.add(this.render.bind(this))},async createScenes(){this.mainScene=new qx(this.options),await Promise.all([this.mainScene.ready]),this.mainScene.upload(this.mainScene,this.mainScene.camera);const s=Ct.pixelRatio;this.effectComposer=new zv(Ct.renderer),this.effectComposer.setPixelRatio(s),this.effectComposer.setSize(ye.width,ye.height);const e=new Vv(this.mainScene,this.mainScene.camera);if(this.fxaaPass=new uf(Xx),this.fxaaPass.material.uniforms.resolution.value.x=1/(ye.width*s),this.fxaaPass.material.uniforms.resolution.value.y=1/(ye.height*s),this.effectComposer.addPass(e),this.effectComposer.addPass(this.fxaaPass),ye.screenWidth>1500&&!ye.device.mobile&&this.options.bloomStrength>0){const n=new Wr(new ce(ye.width,ye.height),.18*this.options.bloomStrength,.4,.8);this.effectComposer.addPass(n)}const t=new Jx(Gl);this.effectComposer.addPass(t)},active(s=!0){this.enabled=s},render(s,e,t){if(!this.enabled)return;const n={time:s,deltaTime:e,frame:t};et.emit("earlyupdate",n),et.emit("update",n),et.emit("lateupdate",n),et.emit("prerender",n),this.effectComposer.render(this.mainScene,this.mainScene.camera)},prerender(){},resize(s){Ct.renderer.setSize(ye.width,ye.height);const e=Ct.pixelRatio;this.effectComposer.setSize(ye.width,ye.height),this.fxaaPass.material.uniforms.resolution.value.x=1/(ye.width*e),this.fxaaPass.material.uniforms.resolution.value.y=1/(ye.height*e)}},Sf=document.createElement("style");Sf.textContent=Rf;document.head.append(Sf);window.__webgl={start:async({container:s=null,eventsNode:e=null,customOptions:t={flowerSpeed:.3,petalCount:65,petalWidth:1.4,shockwave:!1,bloomStrength:.3,cameraMoveStrength:.8,flowerRotation:[0,.2,-.5]}}={})=>{Ct.init({container:s,eventsNode:e}),await jx.init(t)},events:et};window.__webgl.start({container:document.body});
