import{R as S,b as A,r as b,j as e,c as g,e as v,d as H,u as W,B as F}from"./index-fa80df68.js";import{I as C,S as m}from"./arrow-bottom-filter-c2bfa726.js";import{T,a as k,b as B,c as x,d as s,e as L}from"./TableRow-25070048.js";const R="_tableHead_1vsmr_1",E="_tableBody_1vsmr_2",M="_status_1vsmr_6",Y="_error_1vsmr_13",r={tableHead:R,tableBody:E,status:M,error:Y},G=S.forwardRef((t,i)=>{const[,c]=A(),[a,j]=b.useState(void 0),{clinicList:o,dataLength:p,hasNextPage:u,handleUpdateFilters:N,handleFetchNextPage:f,onScroll:y}=t,d=l=>{j(n=>n===l?null:l)};return b.useEffect(()=>{const l={fieldSort:a};if(l.fieldSort!==void 0){const n=new URLSearchParams;Object.entries(l).forEach(([P,_])=>{_!=null&&n.set(P,_)}),c(n)}N({fieldSort:a})},[a]),o.length?e.jsx("div",{id:"all-clinic-table",ref:i,onScroll:y,className:g(r.root,"container"),children:e.jsx(T,{className:"table-container",component:v,children:e.jsx(k,{sx:{minWidth:850},"aria-label":"simple table",children:e.jsxs(C,{scrollableTarget:"all-clinic-table",next:f,hasMore:u||!1,loader:null,dataLength:p,children:[e.jsx(B,{children:e.jsxs(x,{className:r.tableHead,children:[e.jsx(s,{sx:{minWidth:150},className:"table-head-cell",children:e.jsxs("span",{className:"d-flex",children:["ДАТА РЕГ.",e.jsxs("button",{type:"button",onClick:()=>d("createdAt"),children:[" ",e.jsx(m,{})," "]})]})}),e.jsx(s,{sx:{minWidth:150},className:"table-head-cell",children:e.jsxs("span",{className:"d-flex",children:["ГОРОД",e.jsxs("button",{type:"button",onClick:()=>d("country"),children:[" ",e.jsx(m,{})," "]})]})}),e.jsx(s,{sx:{minWidth:220},className:"table-head-cell",children:"АДРЕС"}),e.jsx(s,{sx:{minWidth:220},className:"table-head-cell",children:"ТЕЛЕФОН"}),e.jsx(s,{sx:{minWidth:250},className:"table-head-cell",children:"ГЛАВВРАЧ"}),e.jsx(s,{sx:{minWidth:180},className:"table-head-cell",children:e.jsxs("span",{className:"d-flex",children:["ТАРИФ",e.jsxs("button",{type:"button",onClick:()=>d("endPaidDate"),children:[" ",e.jsx(m,{})]})]})}),e.jsx(s,{className:"table-head-cell",children:"СТАТУС"})]})}),e.jsx(L,{children:o.map(l=>e.jsxs(x,{sx:{"&:last-child td, &:last-child th":{border:0}},className:r.tableBody,children:[e.jsx(s,{className:"table-body-cell",component:"th",scope:"row",children:H(l.createdAt).format("DD.MM.YYYY")}),e.jsx(s,{className:"table-body-cell",component:"th",scope:"row",children:l.city}),e.jsx(s,{className:"table-body-cell",component:"th",scope:"row",children:l.address}),e.jsx(s,{className:"table-body-cell",align:"left",children:l.phone}),e.jsx(s,{className:"table-body-cell",align:"left",children:l.fullName}),e.jsx(s,{className:"table-body-cell",children:l.dateOfBirth}),e.jsx(s,{className:g("table-body-cell",r.status,{[r.error]:!l.status}),children:l.status?"Разблокировать":"Заблокировать"})]},l.id))})]})})})}):null}),D="_table_yov1m_1",w="_header_yov1m_11",I="_itemContainer_yov1m_12",O="_buttonLink_yov1m_29",h={table:D,header:w,itemContainer:I,buttonLink:O},J=S.forwardRef((t,i)=>{const c=W(),[a,j]=b.useState(),{applicationsList:o,hasNextPage:p,dataLength:u,handleUpdateFilters:N,handleFetchNextPage:f,onScroll:y}=t,d=l=>{j(n=>n===l?null:l)};return b.useEffect(()=>{N({fieldSort:a})},[a]),e.jsx("div",{id:"all-clinic-applications",className:g(h.root,"container"),ref:i,onScroll:y,children:e.jsx(T,{className:"table-container",component:v,children:e.jsx(k,{sx:{minWidth:850},"aria-label":"simple table",children:e.jsxs(C,{scrollableTarget:"all-clinic-applications",next:f,hasMore:p||!1,loader:null,dataLength:u,children:[e.jsx(B,{children:e.jsxs(x,{className:h.tableHead,children:[e.jsx(s,{sx:{width:300},className:"table-head-cell",children:e.jsxs("span",{className:"d-flex",children:["ДАТА ПОДАЧИ",e.jsxs("button",{type:"button",onClick:()=>d("createdAt"),children:[" ",e.jsx(m,{})," "]})]})}),e.jsx(s,{sx:{width:"70%"},className:"table-head-cell"})]})}),e.jsxs(L,{children:[o.length?null:"List empty",o.map(l=>e.jsxs(x,{sx:{"&:last-child td, &:last-child th":{border:0}},className:h.tableBody,children:[e.jsx(s,{className:"table-body-cell",component:"th",scope:"row",children:l.createdAt}),e.jsx(s,{className:"table-body-cell",component:"th",scope:"row",children:e.jsx(F,{className:h.buttonLink,color:"secondary",onClick:()=>c(l.link),children:"Подробнее"})})]},l.id))]})]})})})})});function Q(t,i){return t==null?void 0:t.pages.flatMap(c=>c.map(a=>a)).find(c=>{var a;return((a=c.clinic)==null?void 0:a.id)===i})}export{G as A,J as C,Q as s};
