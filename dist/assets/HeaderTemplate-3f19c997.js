import{q as oe,s as re,t as P,o as u,r as x,v as ae,w as le,T as ce,x as ue,y as de,z as pe,j as n,C as he,D as me,E as B,c as xe,B as ge,F as fe,G as Ee,M as ve,f as O,L as Ce,u as we,H as ye,P as G}from"./index-b7b75947.js";import"./styles.module-60436982.js";import{l as je}from"./appointmentTableApi-fec392a1.js";import"./styles.module-eea2a584.js";import{S as k}from"./arrow-bottom-filter-f53bd9bf.js";function Te(s){return oe("MuiCollapse",s)}re("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const be=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],Se=s=>{const{orientation:t,classes:o}=s,d={root:["root",`${t}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${t}`],wrapperInner:["wrapperInner",`${t}`]};return me(d,Te,o)},ze=P("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(s,t)=>{const{ownerState:o}=s;return[t.root,t[o.orientation],o.state==="entered"&&t.entered,o.state==="exited"&&!o.in&&o.collapsedSize==="0px"&&t.hidden]}})(({theme:s,ownerState:t})=>u({height:0,overflow:"hidden",transition:s.transitions.create("height")},t.orientation==="horizontal"&&{height:"auto",width:0,transition:s.transitions.create("width")},t.state==="entered"&&u({height:"auto",overflow:"visible"},t.orientation==="horizontal"&&{width:"auto"}),t.state==="exited"&&!t.in&&t.collapsedSize==="0px"&&{visibility:"hidden"})),_e=P("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(s,t)=>t.wrapper})(({ownerState:s})=>u({display:"flex",width:"100%"},s.orientation==="horizontal"&&{width:"auto",height:"100%"})),Re=P("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(s,t)=>t.wrapperInner})(({ownerState:s})=>u({width:"100%"},s.orientation==="horizontal"&&{width:"auto",height:"100%"})),J=x.forwardRef(function(t,o){const d=ae({props:t,name:"MuiCollapse"}),{addEndListener:r,children:i,className:m,collapsedSize:l="0px",component:y,easing:z,in:_,onEnter:c,onEntered:p,onEntering:v,onExit:C,onExited:K,onExiting:W,orientation:A="vertical",style:F,timeout:g=le.standard,TransitionComponent:Q=ce}=d,V=ue(d,be),R=u({},d,{orientation:A,collapsedSize:l}),j=Se(R),I=de(),L=x.useRef(),f=x.useRef(null),H=x.useRef(),N=typeof l=="number"?`${l}px`:l,T=A==="horizontal",b=T?"width":"height";x.useEffect(()=>()=>{clearTimeout(L.current)},[]);const D=x.useRef(null),X=pe(o,D),w=e=>a=>{if(e){const h=D.current;a===void 0?e(h):e(h,a)}},M=()=>f.current?f.current[T?"clientWidth":"clientHeight"]:0,Y=w((e,a)=>{f.current&&T&&(f.current.style.position="absolute"),e.style[b]=N,c&&c(e,a)}),Z=w((e,a)=>{const h=M();f.current&&T&&(f.current.style.position="");const{duration:S,easing:$}=B({style:F,timeout:g,easing:z},{mode:"enter"});if(g==="auto"){const U=I.transitions.getAutoHeightDuration(h);e.style.transitionDuration=`${U}ms`,H.current=U}else e.style.transitionDuration=typeof S=="string"?S:`${S}ms`;e.style[b]=`${h}px`,e.style.transitionTimingFunction=$,v&&v(e,a)}),ee=w((e,a)=>{e.style[b]="auto",p&&p(e,a)}),te=w(e=>{e.style[b]=`${M()}px`,C&&C(e)}),ne=w(K),se=w(e=>{const a=M(),{duration:h,easing:S}=B({style:F,timeout:g,easing:z},{mode:"exit"});if(g==="auto"){const $=I.transitions.getAutoHeightDuration(a);e.style.transitionDuration=`${$}ms`,H.current=$}else e.style.transitionDuration=typeof h=="string"?h:`${h}ms`;e.style[b]=N,e.style.transitionTimingFunction=S,W&&W(e)}),ie=e=>{g==="auto"&&(L.current=setTimeout(e,H.current||0)),r&&r(D.current,e)};return n.jsx(Q,u({in:_,onEnter:Y,onEntered:ee,onEntering:Z,onExit:te,onExited:ne,onExiting:se,addEndListener:ie,nodeRef:D,timeout:g==="auto"?null:g},V,{children:(e,a)=>n.jsx(ze,u({as:y,className:he(j.root,m,{entered:j.entered,exited:!_&&N==="0px"&&j.hidden}[e]),style:u({[T?"minWidth":"minHeight"]:N},F),ownerState:u({},R,{state:e}),ref:X},a,{children:n.jsx(_e,{ownerState:u({},R,{state:e}),className:j.wrapper,ref:f,children:n.jsx(Re,{ownerState:u({},R,{state:e}),className:j.wrapperInner,children:i})})}))}))});J.muiSupportAuto=!0;const Ne=J,De="_button_1cspa_1",$e="_menu_1cspa_12",Fe="_title_1cspa_17",He="_subTitle_1cspa_18",Me="_label_1cspa_23",E={button:De,menu:$e,title:Fe,subTitle:He,label:Me};function q({title:s,selectOptions:t,onClick:o,className:d}){const[r,i]=x.useState(null),[m,l]=x.useState(null),y=c=>{i(c.currentTarget)},z=(c,p)=>{i(null),l(null),o(c,p)},_=c=>{l(m===c?null:c)};return n.jsxs("div",{className:xe(E.root,d),children:[n.jsxs(ge,{className:E.button,onClick:y,children:[s,r?n.jsx(fe,{}):n.jsx(Ee,{})]}),n.jsx(ve,{anchorEl:r,open:!!r,onClose:()=>{i(null),l(null)},className:E.menu,children:t.map(({label:c,value:p,subTemplates:v})=>n.jsxs("div",{children:[n.jsxs(O,{onClick:()=>_(p),className:E.title,children:[m===p?n.jsx(k,{}):n.jsx(k,{}),n.jsx("span",{className:E.label,children:c})]}),n.jsx(Ne,{in:m===p,timeout:"auto",unmountOnExit:!0,children:n.jsx(Ce,{component:"div",disablePadding:!0,children:v==null?void 0:v.map(C=>n.jsx(O,{onClick:()=>z(p.toString(),C.value.toString()),sx:{pl:4},className:E.subTitle,children:n.jsx("span",{className:E.label,children:C.label})},C.value))})})]},p))})]})}function Ue({children:s}){const t=we(),{data:o}=je({offset:0,limit:1e3,category:""}),d=(o==null?void 0:o.data.reduce((r,i)=>{var l;const m=r.find(y=>y.label===i.category);return m?(l=m.subTemplates)==null||l.push({value:i.id,label:i.name}):r.push({value:i.id,label:i.category,subTemplates:[{value:i.id,label:i.name}]}),r},[]))??[];return n.jsx(ye,{children:n.jsxs(n.Fragment,{children:[n.jsx(q,{title:"Свои шаблоны",selectOptions:d,onClick:(r,i)=>t(G.template.preview(r,i))}),n.jsx(q,{title:"Шаблоны клиники",selectOptions:d,onClick:(r,i)=>t(G.template.preview(r,i))}),s]})})}export{Ue as H};
