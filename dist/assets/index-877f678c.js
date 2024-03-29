import{u as b,r as n,P as h,j as s,c as f,d as v,B as g,a as A,b as y}from"./index-fa80df68.js";import{A as k}from"./index.esm-af256b33.js";import{s as e,a as w,u as I}from"./styles.module-fa517f9e.js";import"./index.esm-68c64567.js";import{B}from"./BackButton-7ca9a21c.js";import{D as L}from"./DatePicker-ccbcad4d.js";import{M}from"./Modal-3bd2326b.js";import"./styles.module-4a1edd24.js";import"./styles.module-eea2a584.js";import{S as C,a as D}from"./SidebarItemList-af78babf.js";import{f as R,h as N,d as E}from"./helpers-96bd5b30.js";import{s as O,A as Y}from"./utils-a2a86ef2.js";import"./hooks-80c184ed.js";import"./useBaseQuery-e8d907b8.js";import"./useQuery-229aca3d.js";import"./useMutation-d5f6a419.js";/* empty css               */import"./Typography-03a50c65.js";import"./extendSxProp-ac3efb2b.js";import"./Sidebar-bdc4a97e.js";import"./arrow-bottom-filter-c2bfa726.js";import"./TableRow-25070048.js";function F({selectClinic:i}){var t;const c=b(),[l,a]=n.useState(!1),[,r]=n.useState(null);if(!i)return c(h.root),null;const d=()=>{w(i),c(h.superAdmin.editClinic(i.clinic.id))},o=()=>{a(!1)};return s.jsxs("div",{className:f(e.root),children:[s.jsx(B,{title:"",link:h.root}),s.jsxs("div",{className:e.row,children:[s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:i.clinic.name}),s.jsxs("span",{className:e.subTitle,children:["Код клиники: ",i.clinic.id]})]}),s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:"Дата регистрации"}),s.jsx("span",{className:e.subTitle,children:v(i.createdAt).format("DD.MM.YYYY")})]})]}),s.jsxs("div",{className:e.row,children:[s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:"Тип клиники"}),s.jsx("span",{className:e.subTitle,children:(t=i.clinic.type)==null?void 0:t.name})]}),s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:"Телефон"}),s.jsx("span",{className:e.subTitle,children:i.phone})]})]}),s.jsx("div",{className:e.row,children:s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:"Главврач"}),s.jsx("span",{className:e.subTitle,children:i.fullName})]})}),s.jsxs("div",{className:e.row,children:[s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:"Почта"}),s.jsx("span",{className:e.subTitle,children:i.email})]}),s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:"Оплачено до"}),s.jsx("span",{className:e.subTitle,children:s.jsx(L,{defaultValue:v(i.clinic.endPaidDate),onChange:m=>m&&r(m)})})]})]}),s.jsxs("div",{className:e.row,children:[s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:"Адрес"}),s.jsx("span",{className:e.subTitle,children:i.clinic.address})]}),s.jsxs("div",{className:e.column,children:[s.jsx("div",{className:e.title,children:"Город"}),s.jsx("span",{className:e.subTitle,children:i.clinic.city})]})]}),s.jsx("div",{className:e.row,children:i.clinic.description&&s.jsxs("div",{children:[s.jsx("div",{className:e.title,children:"Краткое описание"}),s.jsx("span",{className:e.subTitle,children:i.clinic.description})]})}),s.jsx(g,{color:"secondary",className:e.editButton,onClick:d,children:"Редактировать"}),s.jsxs("div",{className:f(e.row,e.buttonsRemove),children:[s.jsx("button",{type:"button",className:e.remove,children:"Блокировать"}),s.jsx("button",{type:"button",className:e.remove,onClick:()=>a(!0),children:"Удалить клинику"})]}),s.jsx(M,{isOpen:l,onSuccess:o,onClose:()=>a(!1),type:"warn",children:s.jsxs("div",{children:["Вы уверены, что хотите удалить клинику ",s.jsx("br",{}),s.jsxs("span",{className:e.modalNameClinic,children:[i.clinic.name,"?"]})]})})]})}function Q(i,c,l,a,r,d,o,t){return{id:i,createdAt:c,city:l,address:a,phone:r,fullName:d,dateOfBirth:o,status:t}}function U(i){return i!=null&&i.pages.length?i.pages.flatMap(c=>c.map(l=>l.clinic&&Q(l.clinic.id,l.clinic.createdAt,l.clinic.country,l.clinic.address,l.clinic.phone,l.clinic.name,l.clinic.endPaidDate,l.clinic.status))).filter(Boolean):[]}function G(i){return i!=null&&i.pages.length?i.pages.flatMap(c=>c.map(l=>{var a;return l.clinic&&{id:l.clinic.id.toString(),title:l.clinic.name,subTitle:`Код клиники: ${(a=l.clinic)==null?void 0:a.id}`,link:h.superAdmin.selectClinic(l.clinic.id)}})).filter(Boolean):[]}function ms(){const i=A(),[c]=y(),l=b(),{data:a,fetchNextPage:r,updateQueryParameters:d,hasNextPage:o}=I({status:"approval",fieldSort:c.get("fieldSort")}),[t,m]=n.useState(null),x=n.useRef(null),p=n.useRef(null),S=n.useMemo(()=>G(a),[a]),P=n.useMemo(()=>U(a),[a]),T=O(a,Number(i.clinicId));return n.useEffect(()=>{const u=t?R(t):{};d({...u})},[t]),n.useEffect(()=>{N(x,p)()},[i]),s.jsx("div",{className:"super-admin-page",children:s.jsxs("div",{className:"d-flex",children:[s.jsx(C,{ref:x,items:S,selectId:i==null?void 0:i.clinicId,onScroll:N(x,p),children:s.jsx(D,{isSearch:!0,filters:"Все категории",handleChange:u=>{m(j=>({...j,filter:u}))}})}),s.jsx("div",{children:i.clinicId?s.jsx(F,{selectClinic:T}):s.jsx(Y,{ref:p,clinicList:P,hasNextPage:o,handleFetchNextPage:r,handleUpdateFilters:u=>{m(j=>({...j,...u}))},dataLength:E(a),onScroll:N(p,x)})}),s.jsxs(g,{className:"fixed-button",onClick:()=>l(h.superAdmin.addClinic),children:[s.jsx(k,{}),"Добавить клинику"]})]})})}export{ms as default};
