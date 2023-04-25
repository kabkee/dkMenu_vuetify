import{g as k,m as B,u as P,t as n,c as u,p as N,a as t,b as p,o as y,d as b,w as o,e as c,r as x,f as T,h as I}from"./index.7561923a.js";import{V as R,a as V}from"./VBtn.23d989fe.js";import{m as L,a as $,b as z,c as A,d as D,e as E,u as G,f as j,g as H,h as M,i as U,j as Y,k as S,V as C}from"./router.df7fa4a5.js";import{m as q,u as F,a as J,V as K,b as O,c as Q}from"./VMain.5e908053.js";const W=k()({name:"VBottomNavigation",props:{bgColor:String,color:String,grow:Boolean,mode:{type:String,validator:e=>!e||["horizontal","shift"].includes(e)},height:{type:[Number,String],default:56},active:{type:Boolean,default:!0},...L(),...$(),...z(),...A(),...q({name:"bottom-navigation"}),...D({tag:"header"}),...E({modelValue:!0,selectedClass:"v-btn--selected"}),...B()},emits:{"update:modelValue":e=>!0},setup(e,s){let{slots:a}=s;const{themeClasses:l}=P(),{borderClasses:m}=G(e),{backgroundColorClasses:d,backgroundColorStyles:v}=j(n(e,"bgColor")),{densityClasses:_}=H(e),{elevationClasses:g}=M(e),{roundedClasses:f}=U(e),{ssrBootStyles:r}=F(),h=u(()=>Number(e.height)-(e.density==="comfortable"?8:0)-(e.density==="compact"?16:0)),i=n(e,"active"),{layoutItemStyles:w}=J({id:e.name,order:u(()=>parseInt(e.order,10)),position:u(()=>"bottom"),layoutSize:u(()=>i.value?h.value:0),elementSize:h,active:i,absolute:n(e,"absolute")});return Y(e,R),N({VBtn:{color:n(e,"color"),density:n(e,"density"),stacked:u(()=>e.mode!=="horizontal"),variant:"text"}},{scoped:!0}),S(()=>t(e.tag,{class:["v-bottom-navigation",{"v-bottom-navigation--active":i.value,"v-bottom-navigation--grow":e.grow,"v-bottom-navigation--shift":e.mode==="shift"},l.value,d.value,m.value,_.value,g.value,f.value],style:[v.value,w.value,{height:p(h.value),transform:`translateY(${p(i.value?0:100,"%")})`},r.value]},{default:()=>[a.default&&t("div",{class:"v-bottom-navigation__content"},[a.default()])]})),{}}}),X={__name:"BottomNav",setup(e){return(s,a)=>(y(),b(W,{color:"teal",grow:""},{default:o(()=>[t(V,{to:"/"},{default:o(()=>[t(C,null,{default:o(()=>[c("mdi-calendar-blank")]),_:1}),c(" \b\uC2DD\uB2E8\uD45C ")]),_:1}),t(V,{to:"/roullet"},{default:o(()=>[t(C,null,{default:o(()=>[c("mdi-movie-roll")]),_:1}),c(" \uB8F0\uB81B ")]),_:1})]),_:1}))}},Z={__name:"View",setup(e){return(s,a)=>{const l=x("router-view");return y(),b(K,null,{default:o(()=>[t(l),t(X)]),_:1})}}};const ee=k()({name:"VApp",props:{...O({fullHeight:!0}),...B()},setup(e,s){let{slots:a}=s;const l=T(e),{layoutClasses:m,layoutStyles:d,getLayoutItem:v,items:_,layoutRef:g}=Q(e),{rtlClasses:f}=I();return S(()=>{var r;return t("div",{ref:g,class:["v-application",l.themeClasses.value,m.value,f.value],style:d.value},[t("div",{class:"v-application__wrap"},[(r=a.default)==null?void 0:r.call(a)])])}),{getLayoutItem:v,items:_,theme:l}}}),le={__name:"Default",setup(e){return(s,a)=>(y(),b(ee,null,{default:o(()=>[t(Z)]),_:1}))}};export{le as default};