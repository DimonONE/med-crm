import{r as b,j as e,N as I,P as F,c as p,d as w,S as O,B as f,Q as q,a as C}from"./index-fa80df68.js";import{a as i}from"./styles.module-f0edd1c7.js";import{a as M,b as A,E as r,F as a}from"./formik.esm-f9c5b2d0.js";import{c as P,a as l}from"./index.esm-68c64567.js";import{u as S}from"./sessionApi-ff99e280.js";import{L as E}from"./LoadImage-23e11f8d.js";import{e as _}from"./utils-045dd2ef.js";import{s as j}from"./utils-fbd87c09.js";import{D as L}from"./DatePicker-ccbcad4d.js";import{F as k}from"./FileLoader-9416bd51.js";import{M as V}from"./Modal-3bd2326b.js";import{c as D}from"./patientsApi-8ab9cda6.js";import"./styles.module-749ea44e.js";/* empty css               */import"./styles.module-2ab3757a.js";import"./styles.module-6cec8057.js";import"./styles.module-eea2a584.js";import"./styles.module-47d05e94.js";import{B as G}from"./BackButton-7ca9a21c.js";import"./useQuery-229aca3d.js";import"./useBaseQuery-e8d907b8.js";import"./close-gray-ico-004632ab.js";import"./Typography-03a50c65.js";import"./extendSxProp-ac3efb2b.js";import"./hooks-80c184ed.js";import"./useMutation-d5f6a419.js";import"./styles.module-4a1edd24.js";function $({patientId:s,isCreate:x}){const{data:m,isLoading:h}=S(s||"",{enabled:!!s}),{mutate:y}=D(),[g,u]=b.useState(!1),t=o=>s?m==null?void 0:m[o]:"",v={fullName:t("fullName"),address:t("address"),city:t("city"),passport:t("passport"),country:t("country"),passportIssuingAuthority:t("passportIssuingAuthority"),sex:t("sex")||j[0].value,tin:t("tin"),email:t("email"),phone:t("phone"),dateOfBirth:t("dateOfBirth"),notice:t("notice"),...x?{password:(m==null?void 0:m.password)??"",files:[],image:null}:{}},B=async(o,{setSubmitting:n,resetForm:c})=>{try{await y(o,{onSuccess:()=>{u(!0),c()},onError:d=>{q(_(d),{type:"error"})}})}finally{n(!1)}};return s&&!m&&!h?e.jsx(I,{to:F.personnel.details(s)}):!x&&!m&&h?null:e.jsx(M,{initialValues:v,validationSchema:P().shape({fullName:l().required(),email:l().email().required(),dateOfBirth:l().required(),role:l().test(o=>Number(o)!==-1),sex:l().test(o=>Number(o)!==-1),passportIssuingAuthority:l().required(),address:l().min(4).required(),city:l().min(4).required(),country:l().min(4).required(),passport:l().min(8).lowercase().uppercase().required(),phone:l().required(),tin:l().required()}),onSubmit:B,children:({isSubmitting:o})=>e.jsxs(A,{className:p(i.container,"full-width"),children:[e.jsxs("div",{className:i.userInfo,children:[e.jsxs("span",{className:"full-width",children:[e.jsx("div",{className:i.formLabel,children:"Паспортные данные"}),e.jsx("div",{children:e.jsxs("fieldset",{disabled:o,children:[e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"fullName"})}),e.jsx(a,{name:"fullName",className:"form-input",type:"text",placeholder:"ФИО"})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"email"})}),e.jsx(a,{name:"email",className:"form-input",type:"text",placeholder:"Почта",errors:!0})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"phone"})}),e.jsx(a,{name:"phone",className:"form-input",type:"text",placeholder:"Телефон"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"passport"})}),e.jsx(a,{name:"passport",className:"form-input",type:"text",placeholder:"Номер паспорта"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"passportIssuingAuthority"})}),e.jsx(a,{name:"passportIssuingAuthority",className:"form-input",type:"text",placeholder:"Кем выдан"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"tin"})}),e.jsx(a,{name:"tin",className:"form-input form-input-text",type:"text",placeholder:"ИНН"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"country"})}),e.jsx(a,{name:"country",className:"form-input",type:"text",placeholder:"Страна"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"city"})}),e.jsx(a,{name:"city",className:"form-input",type:"text",placeholder:"Город \\ поселок"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"address"})}),e.jsx(a,{name:"address",className:"form-input",type:"text",placeholder:"Адрес"})]})]})})]}),e.jsxs("span",{className:p(i.userInfoGender),children:[e.jsxs("fieldset",{className:"center",children:[e.jsx(a,{name:"image",className:"form-input",children:({form:n,meta:c})=>e.jsx(E,{isLoad:!0,defaultImage:c.value,onChange:d=>{n.setFieldValue(x?"image":"newImage",d)}})}),e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"image"})})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:i.date,children:"Дата рождения"}),e.jsx(a,{name:"dateOfBirth",className:"form-input",children:({form:n,meta:c})=>e.jsx(L,{sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"207px",padding:"0 20px",maxWidth:"none",background:"#FFF",borderRadius:"69px",border:"1px solid #578695",fontSize:"18px",color:"#A1B6C1"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#A1B6C1"}},className:i.datePicker,value:c.value,onChange:d=>d&&n.setFieldValue("dateOfBirth",w(d).toISOString())})}),e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"dateOfBirth"})})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx(a,{name:"sex",className:"form-input",children:n=>e.jsx(O,{...n,className:p(i.select,"form-input"),selectOptions:j})}),e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"sex"})})]})]})]}),e.jsx("fieldset",{className:"full-width",children:e.jsxs("div",{className:i.loadFails,children:[e.jsx("div",{className:"error-message",children:e.jsx(r,{name:"files"})}),e.jsx("span",{className:i.title,children:"Прикрепленные документы"}),e.jsx(a,{name:"files",children:({form:n,meta:c})=>e.jsx(k,{id:"button-load-file",title:"Загрузить",filesData:c.value,onChange:d=>n.setFieldValue("files",d),onDelete:()=>{}})})]})}),e.jsx("div",{className:"form-textarea-label",children:"Заметка"}),e.jsx(a,{name:"notice",className:p(i.comment,"form-textarea"),type:"text",placeholder:"Заметка",component:"textarea"}),e.jsxs("div",{children:[e.jsx(f,{className:p(i.submit,"form-submit"),type:"submit",color:"primary",disabled:o,children:"Сохранить"}),s&&e.jsx(f,{className:p(i.delete,"form-submit"),type:"submit",color:"primary",disabled:o,children:"Удалить"})]}),e.jsx(V,{isOpen:g,onSuccess:()=>u(!1),onClose:()=>u(!1),type:"info",children:e.jsx("div",{children:x?"Пациент успешно создан!":"Данные успешно сохранены!"})})]})})}const H="_root_17h90_1",R="_formContainer_17h90_5",N={root:H,formContainer:R};function je(){const s=C();return e.jsxs("div",{className:N.root,children:[e.jsx(G,{title:s!=null&&s.patientId?"Редактировать пациента":"Добавить пациента"}),e.jsx("div",{className:N.formContainer,children:e.jsx($,{patientId:s!=null&&s.patientId?s.patientId:void 0,isCreate:!(s!=null&&s.patientId)})})]})}export{je as default};
