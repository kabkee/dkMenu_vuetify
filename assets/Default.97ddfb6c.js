import{g as k,m as B,u as P,t as u,c as r,p as N,a as t,b as C,o as p,d as V,w as o,e as n,r as x,f as T,h as I}from"./index.88ebfd03.js";import{m as R,u as L,V as $,a as y}from"./VBtn.491f723f.js";import{m as z,a as A,b as D,c as E,d as G,u as H,e as M,f as U,g as Y,h as j,i as S,V as b}from"./router.ba6e1e3e.js";import{m as q,u as F,a as J,V as K,b as O,c as Q}from"./VMain.ea3c9f8a.js";const W=k()({name:"VBottomNavigation",props:{bgColor:String,color:String,grow:Boolean,mode:{type:String,validator:e=>!e||["horizontal","shift"].includes(e)},height:{type:[Number,String],default:56},active:{type:Boolean,default:!0},...z(),...A(),...D(),...E(),...q({name:"bottom-navigation"}),...G({tag:"header"}),...R({modelValue:!0,selectedClass:"v-btn--selected"}),...B()},emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const{themeClasses:l}=P(),{borderClasses:m}=H(e),{backgroundColorClasses:d,backgroundColorStyles:v}=M(u(e,"bgColor")),{densityClasses:_}=U(e),{elevationClasses:f}=Y(e),{roundedClasses:g}=j(e),{ssrBootStyles:i}=F(),h=r(()=>Number(e.height)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0)),c=u(e,"active"),{layoutItemStyles:w}=J({id:e.name,order:r(()=>parseInt(e.order,10)),position:r(()=>"bottom"),layoutSize:r(()=>c.value?h.value:0),elementSize:h,active:c,absolute:u(e,"absolute")});return L(e,$),N({VBtn:{color:u(e,"color"),density:u(e,"density"),stacked:r(()=>e.mode!=="horizontal"),variant:"text"}},{scoped:!0}),S(()=>t(e.tag,{class:["v-bottom-navigation",{"v-bottom-navigation--active":c.value,"v-bottom-navigation--grow":e.grow,"v-bottom-navigation--shift":e.mode==="shift"},l.value,d.value,m.value,_.value,f.value,g.value],style:[v.value,w.value,{height:C(h.value),transform:`translateY(${C(c.value?0:100,"%")})`},i.value]},{default:()=>[a.default&&t("div",{class:"v-bottom-navigation__content"},[a.default()])]})),{}}}),X={__name:"BottomNav",setup(e){return(s,a)=>(p(),V(W,{color:"teal",grow:""},{default:o(()=>[t(y,{to:"/"},{default:o(()=>[t(b,null,{default:o(()=>[n("mdi-calendar-blank")]),_:1}),n(" \b\uC2DD\uB2E8\uD45C ")]),_:1}),t(y,{to:"/roullet"},{default:o(()=>[t(b,null,{default:o(()=>[n("mdi-movie-roll")]),_:1}),n(" \uB8F0\uB81B ")]),_:1}),t(y,{to:"/ladder"},{default:o(()=>[t(b,null,{default:o(()=>[n("mdi-ladder")]),_:1}),n(" \uC0AC\uB2E4\uB9AC ")]),_:1})]),_:1}))}},Z={__name:"View",setup(e){return(s,a)=>{const l=x("router-view");return p(),V(K,null,{default:o(()=>[t(l),t(X)]),_:1})}}};const ee=k()({name:"VApp",props:{...O({fullHeight:!0}),...B()},setup(e,s){let{slots:a}=s;const l=T(e),{layoutClasses:m,layoutStyles:d,getLayoutItem:v,items:_,layoutRef:f}=Q(e),{rtlClasses:g}=I();return S(()=>{var i;return t("div",{ref:f,class:["v-application",l.themeClasses.value,m.value,g.value],style:d.value},[t("div",{class:"v-application__wrap"},[(i=a.default)==null?void 0:i.call(a)])])}),{getLayoutItem:v,items:_,theme:l}}}),le={__name:"Default",setup(e){return(s,a)=>(p(),V(ee,null,{default:o(()=>[t(Z)]),_:1}))}};export{le as default};
