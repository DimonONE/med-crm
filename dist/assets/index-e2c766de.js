import{a as u,u as h,r as N,Q as f,j as s,N as d,P as l,c as t,d as p,B as m}from"./index-fa80df68.js";import{u as _}from"./sessionApi-ff99e280.js";import{L as b}from"./LoadImage-23e11f8d.js";import{e as T}from"./utils-045dd2ef.js";import{B as g}from"./BackButton-7ca9a21c.js";import{F as y}from"./FileLoader-9416bd51.js";import{M as I}from"./Modal-3bd2326b.js";import"./useQuery-229aca3d.js";import"./useBaseQuery-e8d907b8.js";import"./close-gray-ico-004632ab.js";import"./styles.module-47d05e94.js";import"./styles.module-4a1edd24.js";import"./styles.module-eea2a584.js";const B="_root_1vi9m_1",F="_container_1vi9m_8",P="_content_1vi9m_19",D="_userImg_1vi9m_24",M="_info_1vi9m_30",A="_title_1vi9m_34",L="_subTitle_1vi9m_40",Y="_note_1vi9m_46",k="_loadFails_1vi9m_54",C="_submit_1vi9m_67",e={root:B,container:F,content:P,userImg:D,info:M,title:A,subTitle:L,note:Y,loadFails:k,submit:C,delete:"_delete_1vi9m_68"};function V(){var r;const n=u(),c=h(),{data:i,error:o,isLoading:v}=_(n.personnelId||"",{enabled:!!n.personnelId}),[x,a]=N.useState(!1),j=()=>{a(!1),c(l.personnel.root)};return o?(f(T(o),{type:"error"}),s.jsx(d,{to:l.personnel.root})):!i&&!v?s.jsx(d,{to:l.personnel.root}):i?s.jsxs("div",{className:e.root,children:[s.jsx(g,{title:"Подробнее"}),s.jsxs("div",{className:e.container,children:[s.jsxs("div",{className:e.content,children:[s.jsxs("div",{children:[s.jsx(b,{className:e.userImg,defaultImage:i.image}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Телефон"}),s.jsx("div",{className:e.subTitle,children:i.phone})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"ИНН"}),s.jsx("div",{className:e.subTitle,children:i.tin})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Страна"}),s.jsx("div",{className:e.subTitle,children:i.country})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Адрес"}),s.jsx("div",{className:e.subTitle,children:i.address})]}),i.notice&&s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Заметка"}),s.jsx("div",{className:t(e.subTitle,e.note),children:i.notice})]})]}),s.jsxs("div",{children:[s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Должность"}),s.jsx("div",{className:e.subTitle,children:(r=i.role)==null?void 0:r.name})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Имя"}),s.jsx("div",{className:e.subTitle,children:i.fullName})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Пол"}),s.jsx("div",{className:e.subTitle,children:i.sex})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Дата регистрации"}),s.jsx("div",{className:e.subTitle,children:p(i.createdAt).format("DD.MM.YYYY")})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Кем выдан"}),s.jsx("div",{className:e.subTitle,children:i.passportIssuingAuthority})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Почта"}),s.jsx("div",{className:e.subTitle,children:i.email})]}),s.jsxs("div",{className:e.info,children:[s.jsx("div",{className:e.title,children:"Город \\ Поселок"}),s.jsx("div",{className:e.subTitle,children:i.city})]})]}),s.jsxs("div",{className:e.loadFails,children:[s.jsx("span",{className:e.title,children:"Прикрепленные документы"}),s.jsx(y,{id:"personnel-info-load-file",title:"Загрузить",onDownload:()=>{},onDelete:()=>{},hiddenButton:!0})]})]}),s.jsxs("div",{children:[s.jsx(m,{className:t(e.submit,"form-submit"),type:"submit",color:"secondary",onClick:()=>c(l.personnel.edit(i.id)),children:"Редактировать"}),s.jsx(m,{className:t(e.delete,"form-submit"),type:"submit",color:"primary",onClick:()=>a(!0),children:"Удалить"})]})]}),s.jsx(I,{isOpen:x,onSuccess:j,onClose:()=>a(!1),type:"warn",children:s.jsx("div",{children:"Удалить фперсонал?"})})]}):null}export{V as default};