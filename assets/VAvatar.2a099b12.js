import{g as _,ac as M,R as T,a5 as p,a4 as G,a as u,c as x,S as E,i as L,$ as U,k as S,D as z,ad as J,W as K,a1 as B,a2 as X,K as Y,b as Q,ae as Z,M as ee,m as te,f as ne}from"./index.88ebfd03.js";import{q as ae,x as se,i as I,a as ie,c as re,l as oe,d as le,k as ue,w as ce,f as de,h as ve,n as fe,V as me,C as ge}from"./router.ba6e1e3e.js";function g(e){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"center center",s=arguments.length>2?arguments[2]:void 0;return _()({name:e,props:{disabled:Boolean,group:Boolean,hideOnLeave:Boolean,leaveAbsolute:Boolean,mode:{type:String,default:s},origin:{type:String,default:r}},setup(a,c){let{slots:i}=c;const t={onBeforeEnter(n){n.style.transformOrigin=a.origin},onLeave(n){if(a.leaveAbsolute){const{offsetTop:f,offsetLeft:l,offsetWidth:d,offsetHeight:m}=n;n._transitionInitialStyles={position:n.style.position,top:n.style.top,left:n.style.left,width:n.style.width,height:n.style.height},n.style.position="absolute",n.style.top=`${f}px`,n.style.left=`${l}px`,n.style.width=`${d}px`,n.style.height=`${m}px`}a.hideOnLeave&&n.style.setProperty("display","none","important")},onAfterLeave(n){if(a.leaveAbsolute&&(n==null?void 0:n._transitionInitialStyles)){const{position:f,top:l,left:d,width:m,height:h}=n._transitionInitialStyles;delete n._transitionInitialStyles,n.style.position=f||"",n.style.top=l||"",n.style.left=d||"",n.style.width=m||"",n.style.height=h||""}}};return()=>{const n=a.group?M:T;return p(n,{name:a.disabled?"":e,css:!a.disabled,...a.group?void 0:{mode:a.mode},...a.disabled?{}:t},i.default)}}})}function O(e,r){let s=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"in-out";return _()({name:e,props:{mode:{type:String,default:s},disabled:Boolean},setup(a,c){let{slots:i}=c;return()=>p(T,{name:a.disabled?"":e,css:!a.disabled,...a.disabled?{}:r},i.default)}})}function N(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";const s=(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1)?"width":"height",a=G(`offset-${s}`);return{onBeforeEnter(t){t._parent=t.parentNode,t._initialStyle={transition:t.style.transition,overflow:t.style.overflow,[s]:t.style[s]}},onEnter(t){const n=t._initialStyle;t.style.setProperty("transition","none","important"),t.style.overflow="hidden";const f=`${t[a]}px`;t.style[s]="0",t.offsetHeight,t.style.transition=n.transition,e&&t._parent&&t._parent.classList.add(e),requestAnimationFrame(()=>{t.style[s]=f})},onAfterEnter:i,onEnterCancelled:i,onLeave(t){t._initialStyle={transition:"",overflow:t.style.overflow,[s]:t.style[s]},t.style.overflow="hidden",t.style[s]=`${t[a]}px`,t.offsetHeight,requestAnimationFrame(()=>t.style[s]="0")},onAfterLeave:c,onLeaveCancelled:c};function c(t){e&&t._parent&&t._parent.classList.remove(e),i(t)}function i(t){const n=t._initialStyle[s];t.style.overflow=t._initialStyle.overflow,n!=null&&(t.style[s]=n),delete t._initialStyle}}g("fab-transition","center center","out-in");g("dialog-bottom-transition");g("dialog-top-transition");g("fade-transition");g("scale-transition");g("scroll-x-transition");g("scroll-x-reverse-transition");g("scroll-y-transition");g("scroll-y-reverse-transition");g("slide-x-transition");g("slide-x-reverse-transition");const Ie=g("slide-y-transition");g("slide-y-reverse-transition");const Ve=O("expand-transition",N()),Pe=O("expand-x-transition",N("",!0));function ye(e){return{aspectStyles:x(()=>{const r=Number(e.aspectRatio);return r?{paddingBottom:String(1/r*100)+"%"}:void 0})}}const he=_()({name:"VResponsive",props:{aspectRatio:[String,Number],contentClass:String,...ae()},setup(e,r){let{slots:s}=r;const{aspectStyles:a}=ye(e),{dimensionStyles:c}=se(e);return I(()=>{var i;return u("div",{class:"v-responsive",style:c.value},[u("div",{class:"v-responsive__sizer",style:a.value},null),(i=s.additional)==null?void 0:i.call(s),s.default&&u("div",{class:["v-responsive__content",e.contentClass]},[s.default()])])}),{}}});function Se(e,r){if(!E)return;const s=r.modifiers||{},a=r.value,{handler:c,options:i}=typeof a=="object"?a:{handler:a,options:{}},t=new IntersectionObserver(function(){var m;let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],f=arguments.length>1?arguments[1]:void 0;const l=(m=e._observe)==null?void 0:m[r.instance.$.uid];if(!l)return;const d=n.some(h=>h.isIntersecting);c&&(!s.quiet||l.init)&&(!s.once||d||l.init)&&c(d,n,f),d&&s.once?W(e,r):l.init=!0},i);e._observe=Object(e._observe),e._observe[r.instance.$.uid]={init:!1,observer:t},t.observe(e)}function W(e,r){var a;const s=(a=e._observe)==null?void 0:a[r.instance.$.uid];!s||(s.observer.unobserve(e),delete e._observe[r.instance.$.uid])}const _e={mounted:Se,unmounted:W},be=_e,we=L({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),w=(e,r)=>{let{slots:s}=r;const{transition:a,...c}=e,{component:i=T,...t}=typeof a=="object"?a:{};return p(i,U(typeof a=="string"?{name:a}:t,c),s)},xe=_()({name:"VImg",directives:{intersect:be},props:{aspectRatio:[String,Number],alt:String,cover:Boolean,eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},srcset:String,width:[String,Number],...we()},emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,r){let{emit:s,slots:a}=r;const c=S(""),i=S(),t=S(e.eager?"loading":"idle"),n=S(),f=S(),l=x(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),d=x(()=>l.value.aspect||n.value/f.value||0);z(()=>e.src,()=>{m(t.value!=="idle")}),z(d,(o,v)=>{!o&&v&&i.value&&b(i.value)}),J(()=>m());function m(o){if(!(e.eager&&o)&&!(E&&!o&&!e.eager)){if(t.value="loading",l.value.lazySrc){const v=new Image;v.src=l.value.lazySrc,b(v,null)}!l.value.src||K(()=>{var v,y;if(s("loadstart",((v=i.value)==null?void 0:v.currentSrc)||l.value.src),(y=i.value)!=null&&y.complete){if(i.value.naturalWidth||V(),t.value==="error")return;d.value||b(i.value,null),h()}else d.value||b(i.value),P()})}}function h(){var o;P(),t.value="loaded",s("load",((o=i.value)==null?void 0:o.currentSrc)||l.value.src)}function V(){var o;t.value="error",s("error",((o=i.value)==null?void 0:o.currentSrc)||l.value.src)}function P(){const o=i.value;o&&(c.value=o.currentSrc||o.src)}let $=-1;function b(o){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const y=()=>{clearTimeout($);const{naturalHeight:k,naturalWidth:A}=o;k||A?(n.value=A,f.value=k):!o.complete&&t.value==="loading"&&v!=null?$=window.setTimeout(y,v):(o.currentSrc.endsWith(".svg")||o.currentSrc.startsWith("data:image/svg+xml"))&&(n.value=1,f.value=1)};y()}const C=x(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),j=()=>{var y;if(!l.value.src||t.value==="idle")return null;const o=u("img",{class:["v-img__img",C.value],src:l.value.src,srcset:l.value.srcset,alt:e.alt,sizes:e.sizes,ref:i,onLoad:h,onError:V},null),v=(y=a.sources)==null?void 0:y.call(a);return u(w,{transition:e.transition,appear:!0},{default:()=>[B(v?u("picture",{class:"v-img__picture"},[v,o]):o,[[Z,t.value==="loaded"]])]})},D=()=>u(w,{transition:e.transition},{default:()=>[l.value.lazySrc&&t.value!=="loaded"&&u("img",{class:["v-img__img","v-img__img--preload",C.value],src:l.value.lazySrc,alt:e.alt},null)]}),F=()=>a.placeholder?u(w,{transition:e.transition,appear:!0},{default:()=>[(t.value==="loading"||t.value==="error"&&!a.error)&&u("div",{class:"v-img__placeholder"},[a.placeholder()])]}):null,q=()=>a.error?u(w,{transition:e.transition,appear:!0},{default:()=>[t.value==="error"&&u("div",{class:"v-img__error"},[a.error()])]}):null,H=()=>e.gradient?u("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,R=S(!1);{const o=z(d,v=>{v&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{R.value=!0})}),o())})}return I(()=>B(u(he,{class:["v-img",{"v-img--booting":!R.value}],style:{width:Q(e.width==="auto"?n.value:e.width)},aspectRatio:d.value,"aria-label":e.alt,role:e.alt?"img":void 0},{additional:()=>u(Y,null,[u(j,null,null),u(D,null,null),u(H,null,null),u(F,null,null),u(q,null,null)]),default:a.default}),[[X("intersect"),{handler:m,options:e.options},null,{once:!0}]])),{currentSrc:c,image:i,state:t,naturalWidth:n,naturalHeight:f}}});const ze=L({start:Boolean,end:Boolean,icon:ee,image:String,...ie(),...re(),...oe(),...le(),...te(),...ue({variant:"flat"})},"v-avatar"),$e=_()({name:"VAvatar",props:ze(),setup(e,r){let{slots:s}=r;const{themeClasses:a}=ne(e),{colorClasses:c,colorStyles:i,variantClasses:t}=ce(e),{densityClasses:n}=de(e),{roundedClasses:f}=ve(e),{sizeClasses:l,sizeStyles:d}=fe(e);return I(()=>u(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},a.value,c.value,n.value,f.value,l.value,t.value],style:[i.value,d.value]},{default:()=>{var m;return[e.image?u(xe,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?u(me,{key:"icon",icon:e.icon},null):(m=s.default)==null?void 0:m.call(s),ge(!1,"v-avatar")]}})),{}}});export{be as I,w as M,xe as V,Ve as a,$e as b,Pe as c,Ie as d,we as m};
