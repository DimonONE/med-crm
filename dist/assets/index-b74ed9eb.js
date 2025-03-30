import{r as x,j as e,M as b,a as q,u as z,P as O,c as w,f as V,Q as d,g as Q}from"./index-174441ce.js";import"./styles.module-60436982.js";import{u as X,a as Y,b as Z,c as ee,d as te,e as se,f as oe,C as ae}from"./appointmentTableApi-7237472a.js";import{e as S}from"./utils-045dd2ef.js";import"./styles.module-eea2a584.js";import{H as ne}from"./HeaderTemplate-984a79c6.js";import{S as H}from"./arrow-bottom-filter-f10855f5.js";import{B as ce}from"./BackButton-2c2f05b3.js";import{D as L}from"./CardsNavigate-53561f7c.js";import{T as re}from"./TechInfo-cbb62d88.js";import"./Checkbox-c31ebb38.js";import"./Typography-b2a44073.js";import"./extendSxProp-8679fc64.js";import"./Modal-b312630b.js";import"./DatePicker-56f2bea3.js";/* empty css               */import"./Popper-369ab347.js";import"./lodash-a0d09d41.js";import"./useMutation-b7943c53.js";import"./useBaseQuery-ce99f95b.js";import"./useQuery-b3e65d19.js";import"./services-ico-d45ad7ff.js";import"./styles.module-4a1edd24.js";import"./styles.module-6aece55b.js";function U({copyId:h,handlePaste:B}){const[n,g]=x.useState(!1),f=async u=>{try{const a=await navigator.clipboard.readText(),c=JSON.parse(a);return{isCopy:!!c[u],id:c[u],params:c}}catch{return{isCopy:!1,id:"",params:{}}}},y=async(u,a)=>{try{const{isCopy:c,id:T,params:I}=await f(u);c&&a({id:T,params:I})}catch(c){console.error("Ошибка чтения буфера обмена:",c)}};return x.useEffect(()=>{(async()=>{const{isCopy:u}=await f(h);g(!u)})()},[h]),e.jsx(b,{disabled:n,onClick:()=>y(h,B),children:"Вставить"})}const le="_wrapper_188hu_1",ie="_draggable_188hu_7",me="_reception_188hu_21",de="_headBlock_188hu_26",pe="_blockWithPadding_188hu_27",ue="_arrowBottom_188hu_36",he="_active_188hu_43",be="_lineBlock_188hu_47",ge="_itemBlock_188hu_51",fe="_toggle_188hu_56",ke="_backButton_188hu_75",o={wrapper:le,draggable:ie,reception:me,headBlock:de,blockWithPadding:pe,arrowBottom:ue,active:he,lineBlock:be,itemBlock:ge,toggle:fe,backButton:ke};function xe(h){const B=q(),n=z(),{mutate:g}=te(),{mutate:f}=se(),[y,u]=x.useState(!1),{template:a,refetchData:c,onCreateReception:T,onDeleteSubTemplate:I}=h,{handleTemplates:A}=oe(),D=t=>{const s=a.bodyBlocks.find(({id:k})=>k===t);if(!s)return;const i={...s,lineBlocks:s.lineBlocks.map(({blocks:k,..._})=>({..._,blockInfo:k}))};A([i]),n(O.template.create(B.subTemplateId,a.id.toString()))},E=async t=>{try{await navigator.clipboard.writeText(t),d("Copied!",{type:"info"})}catch(s){console.error("Ошибка копирования в буфер обмена:",s)}},G=async({id:t,params:s})=>{const k=(await Q({url:`/template/get-one/${s.coreTemplateId}`,method:"GET"})).data.subTemplates.find(r=>r.id===Number(t));if(!k)return;const _=k.bodyBlocks.sort((r,j)=>r.id-j.id).map((r,j)=>{const P={name:r.name,positionId:r.positionId,lineBlocks:r.lineBlocks.map(({id:$,blocks:C,...v})=>({...v,blockInfo:C.map(({id:m,status:R,...F})=>({...F,status:R,value:F.value??null}))})),subTemplateId:a.id};return new Promise(($,C)=>{g(P,{onSuccess:async()=>{$(),k.bodyBlocks.length===j+1&&(d("Copied!",{type:"success"}),c())},onError:v=>{d(S(v),{type:"error"}),C(v)}})})});try{await Promise.all(_)}catch(r){console.error("Ошибка при выполнении мутаций:",r)}},l=async(t,{id:s,params:i})=>{const _=(await Q({url:`/template/get-one/${i.coreTemplateId}`,method:"GET"})).data.subTemplates.find(m=>m.id===i.id);if(!_)throw new Error("subTemplate of undefined");const r=_.bodyBlocks.find(m=>m.id===Number(s));if(!r)throw new Error("bodyBlock of undefined");const j=a.bodyBlocks.find(m=>m.id===t);if(!j)throw new Error("targetTemplate of undefined");const P=m=>m.map(({id:R,blocks:F,...K})=>({...K,blockInfo:F.map(({id:Be,status:M,...J})=>({...J,status:M,value:J.value??null}))})),$=P(j.lineBlocks),C=P(r.lineBlocks),v={id:t,name:j.name,positionId:r.positionId,lineBlocks:[...$,...C].sort((m,R)=>m.positionId-R.positionId),subTemplateId:a.id};g(v,{onSuccess:async()=>{d("Copied!",{type:"success"}),c()},onError:m=>{d(S(m),{type:"error"})}})},p=async t=>{f(t,{onSuccess:async()=>{d("Deleted!",{type:"success"}),c()},onError:s=>{d(S(s),{type:"error"})}})},N=t=>e.jsxs(e.Fragment,{children:[e.jsx(b,{onClick:()=>{T(),t()},children:"Создать прием"}),e.jsx(U,{copyId:"templateId",handlePaste:s=>{G(s),t()}}),e.jsx(b,{onClick:()=>{E(`{"templateId":${a.id}, "coreTemplateId":${a.templateId}}`),t()},children:"Копировать"}),e.jsx(b,{onClick:()=>I(a.id),children:"Удалить прием"})]}),W=(t,s)=>e.jsxs(e.Fragment,{children:[e.jsx(b,{onClick:()=>{n(O.template.create(B.subTemplateId,a.id.toString())),t()},children:"Создать блок"}),e.jsx(b,{onClick:()=>{E(`{"subTemplateId":${s}, "id":${a.id}, "coreTemplateId":${a.templateId}}`),t()},children:"Копировать"}),e.jsx(U,{copyId:"subTemplateId",handlePaste:i=>{l(s,i),t()}}),e.jsx(b,{onClick:()=>{D(s),t()},children:"Редактировать"}),e.jsx(b,{onClick:()=>s&&p(s),children:"Удалить"})]});return e.jsxs(e.Fragment,{children:[e.jsx(L,{menuItems:N,children:e.jsxs("button",{type:"button",className:w(o.draggable,o.reception),onClick:()=>u(t=>!t),children:[e.jsx("div",{className:o.headBlock,style:{textAlign:"left"},children:a.name}),e.jsx("div",{className:w(o.arrowBottom,{[o.active]:y}),children:e.jsx(H,{})})]})}),y&&e.jsxs("div",{children:[a.bodyBlocks.sort((t,s)=>t.id-s.id).map(t=>e.jsxs("div",{className:w(o.draggable),children:[e.jsxs("div",{className:o.headBlock,children:[t.name," "]}),e.jsx("div",{className:w(o.blockWithPadding,o.lineBlock),children:t.lineBlocks.map(s=>e.jsx("div",{className:o.itemBlock,children:s.blocks.map(i=>e.jsx("div",{children:x.createElement(ae,{...i,key:i.lineId,type:"preview",subTemplateId:t.subTemplateId,bodyBlockId:s.id,status:i.status})},i.id))},s.id))}),e.jsx(L,{menuItems:s=>W(s,t.id),children:e.jsx("div",{className:o.arrowBottom,children:e.jsx(H,{})})})]},t.id)),a.bodyBlocks.length?null:e.jsx("div",{className:o.draggable,children:e.jsx(L,{menuItems:W,children:e.jsx("div",{className:o.arrowBottom,children:e.jsx(H,{})})})})]})]})}function Ue(){const h=q(),B=z(),{data:n,isLoading:g,refetch:f}=X(h.subTemplateId),{mutate:y}=Y(),{mutate:u}=Z(),{mutate:a}=ee(),[c,T]=x.useState(!1),[I,A]=x.useState([]),D=l=>{const p={name:`Прием №${l}`,templateId:Number(h.subTemplateId)};y(p,{onSuccess:()=>{f()},onError:N=>{d(S(N),{type:"error"})}})},E=l=>{a(l,{onSuccess:()=>{d("Success!",{type:"success"}),B(-1)},onError:p=>{d(S(p),{type:"error"})}})},G=l=>{u(l,{onSuccess:()=>{f(),d("Success!",{type:"success"})},onError:p=>{d(S(p),{type:"error"})}})};return x.useEffect(()=>{!g&&!(n!=null&&n.subTemplates.length)&&D(1)},[g,n]),x.useEffect(()=>{const l=(n==null?void 0:n.subTemplates.sort((p,N)=>p.id-N.id))??[];A(l)},[n]),g?null:n!=null&&n.subTemplates?e.jsxs(e.Fragment,{children:[e.jsx(ne,{}),e.jsxs("div",{className:o.wrapper,children:[e.jsx(ce,{title:"",link:O.template.root,className:o.backButton}),e.jsx("div",{className:o.draggable,children:e.jsxs("div",{className:o.headBlock,children:[n.category,". ",n.name]})}),e.jsx(re,{techInfo:{info:n.techInfo}}),I.map(l=>e.jsxs("div",{children:[e.jsx(xe,{template:l,subTemplates:I,refetchData:()=>f(),onCreateReception:()=>D(n.subTemplates.length+1),onDeleteSubTemplate:p=>G(p)}),e.jsx("div",{className:w(o.draggable,o.reception),children:e.jsx("div",{className:o.headBlock,children:"Краткое резюме посещения"})})]},l.id)),e.jsxs("div",{className:o.toggleBlock,children:[e.jsx(V,{open:c,onClose:()=>T(!1),style:{top:-50,left:30},children:e.jsx(b,{onClick:()=>E(Number(h.subTemplateId)),children:"Удалить"})}),e.jsx("button",{type:"button",onClick:()=>T(!0),className:w(o.toggle,{[o.active]:c}),children:"+"})]})]})]}):(B(-1),null)}export{Ue as default};
