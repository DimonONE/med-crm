import{a as h,u as N,r as f,Q as p,j as s,N as m,P as l,c as t,d as _,B as v}from"./index-47557d54.js";import{u as b}from"./sessionApi-12fe77ce.js";import{L as T}from"./LoadImage-2beb6735.js";import{e as g}from"./utils-045dd2ef.js";import{B as y}from"./BackButton-b0d4b446.js";import{F as I}from"./FileLoader-aae1cc7b.js";import{M as B}from"./Modal-28a1387e.js";import"./useQuery-4996d838.js";import"./useBaseQuery-01eea3a2.js";import"./close-gray-ico-49cb4fac.js";import"./styles.module-47d05e94.js";import"./styles.module-4a1edd24.js";import"./styles.module-eea2a584.js";const F="_root_1vi9m_1",P="_container_1vi9m_8",D="_content_1vi9m_19",M="_userImg_1vi9m_24",A="_info_1vi9m_30",C="_title_1vi9m_34",L="_subTitle_1vi9m_40",Y="_note_1vi9m_46",k="_loadFails_1vi9m_54",E="_submit_1vi9m_67",e={root:F,container:P,content:D,userImg:M,info:A,title:C,subTitle:L,note:Y,loadFails:k,submit:E,delete:"_delete_1vi9m_68"};function W(){var r,d;const n=h(),o=N(),[x,a]=f.useState(!1),{data:i,error:c,isLoading:j}=b(n.personnelId||"",{enabled:!!n.personnelId});console.log("data",i);const u=()=>{a(!1),o(l.personnel.root)};return c?(p(g(c),{type:"error"}),s.jsx(m,{to:l.personnel.root})):!i&&!j?s.jsx(m,{to:l.personnel.root}):i?s.jsxs("div",{className:e.root,children:[s.jsx(y,{title:"Подробнее"}),s.jsxs("div",{className:e.container,children:[s.jsxs("div",{className:e.content,children:[s.jsxs("div",{children:[s.jsx(T,{className:e.userImg,defaultImage:i.image}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Телефон"}),s.jsx("div",{className:e.subTitle,children:i.phone})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"ИНН"}),s.jsx("div",{className:e.subTitle,children:i.tin})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Страна"}),s.jsx("div",{className:e.subTitle,children:i.country})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Адрес"}),s.jsx("div",{className:e.subTitle,children:i.address})]}),i.notice&&s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Заметка"}),s.jsx("div",{className:t(e.subTitle,e.note),children:i.notice})]})]}),s.jsxs("div",{children:[s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Должность"}),s.jsx("div",{className:e.subTitle,children:(r=i.role)==null?void 0:r.name})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Имя"}),s.jsx("div",{className:e.subTitle,children:i.fullName})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Пол"}),s.jsx("div",{className:e.subTitle,children:i.sex})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Дата регистрации"}),s.jsx("div",{className:e.subTitle,children:_(i.createdAt).format("DD.MM.YYYY")})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Кем выдан"}),s.jsx("div",{className:e.subTitle,children:i.passportIssuingAuthority})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Почта"}),s.jsx("div",{className:e.subTitle,children:i.email})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Город \\ Поселок"}),s.jsx("div",{className:e.subTitle,children:i.city})]})]}),s.jsxs("div",{className:e.loadFails,children:[s.jsx("span",{className:e.title,children:"Прикрепленные документы"}),s.jsx(I,{id:"personnel-info-load-file",title:"Загрузить",onDownload:()=>{},onDelete:()=>{},hiddenButton:!0})]})]}),s.jsxs("div",{children:[s.jsx(v,{className:t(e.submit,"form-submit"),type:"submit",color:"secondary",onClick:()=>o(l.personnel.edit(i.id)),children:"Редактировать"}),((d=i.role)==null?void 0:d.name)!=="medChief"&&s.jsx(v,{className:t(e.delete,"form-submit"),type:"submit",color:"primary",onClick:()=>a(!0),children:"Удалить"})]})]}),s.jsx(B,{isOpen:x,onSuccess:u,onClose:()=>a(!1),type:"warn",children:s.jsx("div",{children:"Удалить персонал?"})})]}):null}export{W as default};
