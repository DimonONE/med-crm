import{r as b,j as e,N as I,P as F,c as p,d as w,S as O,B as f,Q as q,a as C}from"./index-b7b75947.js";import{a as i}from"./styles.module-431a1913.js";import{a as M,b as A,E as a,F as r}from"./formik.esm-4440c82b.js";import{c as P,a as l}from"./index.esm-f3eb9c4c.js";import{u as S}from"./sessionApi-8469633a.js";import{L as E}from"./LoadImage-7e045af5.js";import{e as _}from"./utils-045dd2ef.js";import{s as j}from"./utils-dfdb9c39.js";import{D as L}from"./DatePicker-7916f172.js";import{F as k}from"./FileLoader-47d88ffe.js";import{M as V}from"./Modal-60b947f0.js";import{c as D}from"./patientsApi-86bd4d01.js";import"./styles.module-a343e3ff.js";/* empty css               */import"./styles.module-a9f82462.js";import"./styles.module-6cec8057.js";import"./styles.module-eea2a584.js";import"./styles.module-f9591ad8.js";import{B as G}from"./BackButton-b2e45c58.js";import"./useQuery-00968507.js";import"./useBaseQuery-020bfd66.js";import"./close-gray-ico-51fb0ef4.js";import"./styles.module-8bcd8ee9.js";import"./Typography-953e41f9.js";import"./extendSxProp-09d42ce9.js";import"./hooks-196f33c9.js";import"./useMutation-3de9e6b6.js";import"./styles.module-4a1edd24.js";function $({patientId:s,isCreate:x}){const{data:m,isLoading:h}=S(s||"",{enabled:!!s}),{mutate:y}=D(),[g,u]=b.useState(!1),t=o=>s?m==null?void 0:m[o]:"",v={fullName:t("fullName"),address:t("address"),city:t("city"),passport:t("passport"),country:t("country"),passportIssuingAuthority:t("passportIssuingAuthority"),sex:t("sex")||j[0].value,tin:t("tin"),email:t("email"),phone:t("phone"),dateOfBirth:t("dateOfBirth"),notice:t("notice"),...x?{password:(m==null?void 0:m.password)??"",files:[],image:null}:{}},B=async(o,{setSubmitting:n,resetForm:c})=>{try{await y(o,{onSuccess:()=>{u(!0),c()},onError:d=>{q(_(d),{type:"error"})}})}finally{n(!1)}};return s&&!m&&!h?e.jsx(I,{to:F.personnel.details(s)}):!x&&!m&&h?null:e.jsx(M,{initialValues:v,validationSchema:P().shape({fullName:l().required(),email:l().email().required(),dateOfBirth:l().required(),role:l().test(o=>Number(o)!==-1),sex:l().test(o=>Number(o)!==-1),passportIssuingAuthority:l().required(),address:l().min(4).required(),city:l().min(4).required(),country:l().min(4).required(),passport:l().min(8).lowercase().uppercase().required(),phone:l().required(),tin:l().required()}),onSubmit:B,children:({isSubmitting:o})=>e.jsxs(A,{className:p(i.container,"full-width"),children:[e.jsxs("div",{className:i.userInfo,children:[e.jsxs("span",{className:"full-width",children:[e.jsx("div",{className:i.formLabel,children:"Паспортные данные"}),e.jsx("div",{children:e.jsxs("fieldset",{disabled:o,children:[e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"fullName"})}),e.jsx(r,{name:"fullName",className:"form-input",type:"text",placeholder:"ФИО"})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"email"})}),e.jsx(r,{name:"email",className:"form-input",type:"text",placeholder:"Почта",errors:!0})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"phone"})}),e.jsx(r,{name:"phone",className:"form-input",type:"text",placeholder:"Телефон"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"passport"})}),e.jsx(r,{name:"passport",className:"form-input",type:"text",placeholder:"Номер паспорта"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"passportIssuingAuthority"})}),e.jsx(r,{name:"passportIssuingAuthority",className:"form-input",type:"text",placeholder:"Кем выдан"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"tin"})}),e.jsx(r,{name:"tin",className:"form-input form-input-text",type:"text",placeholder:"ИНН"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"country"})}),e.jsx(r,{name:"country",className:"form-input",type:"text",placeholder:"Страна"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"city"})}),e.jsx(r,{name:"city",className:"form-input",type:"text",placeholder:"Город \\ поселок"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"address"})}),e.jsx(r,{name:"address",className:"form-input",type:"text",placeholder:"Адрес"})]})]})})]}),e.jsxs("span",{className:p(i.userInfoGender),children:[e.jsxs("fieldset",{className:"center",children:[e.jsx(r,{name:"image",className:"form-input",children:({form:n,meta:c})=>e.jsx(E,{isLoad:!0,defaultImage:c.value,onChange:d=>{n.setFieldValue(x?"image":"newImage",d)}})}),e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"image"})})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:i.date,children:"Дата рождения"}),e.jsx(r,{name:"dateOfBirth",className:"form-input",children:({form:n,meta:c})=>e.jsx(L,{sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"207px",padding:"0 20px",maxWidth:"none",background:"#FFF",borderRadius:"69px",border:"1px solid #578695",fontSize:"18px",color:"#A1B6C1"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#A1B6C1"}},className:i.datePicker,value:c.value,onChange:d=>d&&n.setFieldValue("dateOfBirth",w(d).toISOString())})}),e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"dateOfBirth"})})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx(r,{name:"sex",className:"form-input",children:n=>e.jsx(O,{...n,className:p(i.select,"form-input"),selectOptions:j})}),e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"sex"})})]})]})]}),e.jsx("fieldset",{className:"full-width",children:e.jsxs("div",{className:i.loadFails,children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"files"})}),e.jsx("span",{className:i.title,children:"Прикрепленные документы"}),e.jsx(r,{name:"files",children:({form:n,meta:c})=>e.jsx(k,{id:"button-load-file",title:"Загрузить",filesData:c.value,onChange:d=>n.setFieldValue("files",d),onDelete:()=>{}})})]})}),e.jsx("div",{className:"form-textarea-label",children:"Заметка"}),e.jsx(r,{name:"notice",className:p(i.comment,"form-textarea"),type:"text",placeholder:"Заметка",component:"textarea"}),e.jsxs("div",{children:[e.jsx(f,{className:p(i.submit,"form-submit"),type:"submit",color:"primary",disabled:o,children:"Сохранить"}),s&&e.jsx(f,{className:p(i.delete,"form-submit"),type:"submit",color:"primary",disabled:o,children:"Удалить"})]}),e.jsx(V,{isOpen:g,onSuccess:()=>u(!1),onClose:()=>u(!1),type:"info",children:e.jsx("div",{children:x?"Пациент успешно создан!":"Данные успешно сохранены!"})})]})})}const H="_root_17h90_1",R="_formContainer_17h90_5",N={root:H,formContainer:R};function Ne(){const s=C();return e.jsxs("div",{className:N.root,children:[e.jsx(G,{title:s!=null&&s.patientId?"Редактировать пациента":"Добавить пациента"}),e.jsx("div",{className:N.formContainer,children:e.jsx($,{patientId:s!=null&&s.patientId?s.patientId:void 0,isCreate:!(s!=null&&s.patientId)})})]})}export{Ne as default};
