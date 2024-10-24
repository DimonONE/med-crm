import{r as P,j as e,N as S,P as A,c as d,S as h,d as j,B as N,Q as y,a as C}from"./index-b7b75947.js";import{a as E,b as k,E as a,F as r}from"./formik.esm-4440c82b.js";import{c as V,a as x}from"./index.esm-f3eb9c4c.js";import{u as _}from"./sessionApi-8469633a.js";import{L}from"./LoadImage-7e045af5.js";import{e as g}from"./utils-045dd2ef.js";import{s as v}from"./utils-dfdb9c39.js";import{D}from"./DatePicker-7916f172.js";import{F as q}from"./FileLoader-47d88ffe.js";import{M as G}from"./Modal-60b947f0.js";import{a as $,b as H,r as b,s as n}from"./styles.module-2aaee108.js";import{B as R}from"./BackButton-b2e45c58.js";import"./useQuery-00968507.js";import"./useBaseQuery-020bfd66.js";import"./close-gray-ico-51fb0ef4.js";import"./styles.module-8bcd8ee9.js";/* empty css               */import"./Typography-953e41f9.js";import"./extendSxProp-09d42ce9.js";import"./styles.module-f9591ad8.js";import"./styles.module-eea2a584.js";import"./hooks-196f33c9.js";import"./useMutation-3de9e6b6.js";import"./styles.module-4a1edd24.js";function U({personnelId:s,isCreate:p}){const{data:t,isLoading:f}=_(s||"",{enabled:!!s}),{mutate:B}=$(),{mutate:F}=H(),[O,u]=P.useState(!1),i=l=>s?t==null?void 0:t[l]:"",I={fullName:i("fullName"),passport:i("passport"),country:i("country"),role:i("role")||b[0].value,city:i("city"),address:i("address"),passportIssuingAuthority:i("passportIssuingAuthority"),sex:i("sex")||v[0].value,tin:i("tin"),email:i("email"),phone:i("phone"),dateOfBirth:i("dateOfBirth"),notice:i("notice"),...s?{id:s.toString(),files:t==null?void 0:t.files,image:t==null?void 0:t.image}:{},...p?{password:(t==null?void 0:t.password)??"",files:[],image:null}:{}},M=async(l,{setSubmitting:o,resetForm:c})=>{try{"password"in l?await B(l,{onSuccess:()=>{u(!0),c()},onError:m=>{y(g(m),{type:"error"})}}):await F(l,{onSuccess:()=>{u(!0),c()},onError:m=>{y(g(m),{type:"error"})}})}finally{o(!1)}};return s&&!t&&!f?e.jsx(S,{to:A.personnel.details(s)}):!p&&!t&&f?null:e.jsx(E,{initialValues:I,validationSchema:V().shape({fullName:x().required(),email:x().email().required(),dateOfBirth:x().required(),role:x().test(l=>Number(l)!==-1),sex:x().test(l=>Number(l)!==-1)}),onSubmit:M,children:({isSubmitting:l})=>e.jsxs(k,{className:d(n.container,"full-width"),children:[e.jsxs("div",{className:n.userInfo,children:[e.jsxs("span",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"role"})}),e.jsx(r,{name:"role",className:"form-input",children:o=>e.jsx(h,{...o,className:d("form-input"),selectOptions:b})}),e.jsx("div",{className:n.formLabel,children:"Паспортные данные"}),e.jsx("div",{children:e.jsxs("fieldset",{disabled:l,children:[e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"fullName"})}),e.jsx(r,{name:"fullName",className:"form-input",type:"text",placeholder:"ФИО"})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"email"})}),e.jsx(r,{name:"email",className:"form-input",type:"text",placeholder:"Почта"})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx(r,{name:"phone",className:"form-input",type:"text",placeholder:"Телефон"}),e.jsx(a,{name:"phone"})]}),!s&&e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"password"})}),e.jsx(r,{name:"password",className:"form-input",type:"text",placeholder:"Пароль"})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"passport"})}),e.jsx(r,{name:"passport",className:"form-input",type:"text",placeholder:"Номер паспорта"})]}),e.jsxs("fieldset",{children:[e.jsx(r,{name:"passportIssuingAuthority",className:"form-input",type:"text",placeholder:"Кем выдан"}),e.jsx(a,{name:"passportIssuingAuthority"})]}),e.jsxs("fieldset",{children:[e.jsx(r,{name:"tin",className:"form-input form-input-text",type:"text",placeholder:"ИНН"}),e.jsx(a,{name:"tin"})]}),e.jsxs("fieldset",{children:[e.jsx(r,{name:"country",className:"form-input",type:"text",placeholder:"Страна"}),e.jsx(a,{name:"country"})]}),e.jsxs("fieldset",{children:[e.jsx(r,{name:"city",className:"form-input",type:"text",placeholder:"Город \\ поселок"}),e.jsx(a,{name:"city"})]}),e.jsxs("fieldset",{children:[e.jsx(r,{name:"address",className:"form-input",type:"text",placeholder:"Адрес"}),e.jsx(a,{name:"address"})]})]})})]}),e.jsxs("span",{className:d(n.userInfoGender),children:[e.jsxs("fieldset",{className:"center",children:[e.jsx(r,{name:"image",type:"file",className:"form-input",children:({form:o,meta:c})=>e.jsx(L,{isLoad:!0,defaultImage:c.value,onChange:m=>{o.setFieldValue(p?"image":"newImage",m)}})}),e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"image"})})]}),e.jsxs("fieldset",{children:[e.jsx("div",{className:n.date,children:"Дата рождения"}),e.jsx(r,{name:"dateOfBirth",className:"form-input",children:({form:o,meta:c})=>e.jsx(D,{defaultValue:j(c.value),onChange:m=>{o.setFieldValue("dateOfBirth",j(m).toISOString())},className:n.datePicker,sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"207px",padding:"0 20px",maxWidth:"none",background:"#FFF",borderRadius:"69px",border:"1px solid #578695",fontSize:"18px",color:"#A1B6C1"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#A1B6C1"}}})}),e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"dateOfBirth"})})]}),e.jsxs("fieldset",{children:[e.jsx(r,{name:"sex",className:"form-input",children:o=>e.jsx(h,{...o,defaultOption:o.field.value,className:d(n.select,"form-input"),selectOptions:v})}),e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"sex"})})]})]})]}),e.jsxs("div",{className:n.loadFails,children:[e.jsx("span",{className:n.title,children:"Прикрепленные документы"}),e.jsxs("fieldset",{children:[e.jsx(r,{name:"files",className:"form-input",children:({form:o,meta:c})=>e.jsx(q,{id:"button-load-file",title:"Загрузить",filesData:c.value,onChange:m=>{o.setFieldValue(p?"files":"newFiles",m)},onDelete:m=>{o.setFieldValue(p?"files":"newFiles",m)}})}),e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"files"})})]})]}),e.jsxs("fieldset",{className:"full-width",children:[e.jsx("div",{className:"form-textarea-label",children:"Заметка"}),e.jsx(r,{name:"notice",className:d(n.comment,"form-textarea"),type:"text",placeholder:"Заметка",component:"textarea"}),e.jsx("div",{className:"error-message",children:e.jsx(a,{name:"notice"})})]}),e.jsxs("div",{children:[e.jsx(N,{className:d(n.submit,"form-submit"),type:"submit",color:"primary",disabled:l,children:"Сохранить"}),s&&e.jsx(N,{className:d(n.delete,"form-submit"),type:"submit",color:"primary",disabled:l,children:"Удалить"})]}),e.jsx(G,{isOpen:O,onSuccess:()=>u(!1),onClose:()=>u(!1),type:"info",children:e.jsx("div",{children:p?"Персонал успешно создан!":"Данные успешно сохранены!"})})]})})}const z="_root_1akvp_1",Q="_formContainer_1akvp_5",w={root:z,formContainer:Q};function je(){const s=C();return e.jsxs("div",{className:w.root,children:[e.jsx(R,{title:s!=null&&s.personnelId?"Редактировать персонал":"Добавить персонал"}),e.jsx("div",{className:w.formContainer,children:e.jsx(U,{personnelId:s!=null&&s.personnelId?s.personnelId:void 0,isCreate:!(s!=null&&s.personnelId)})})]})}export{je as default};
