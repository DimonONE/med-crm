import{r as u,j as e,c as i,k as d,P as h,B as v,a as N}from"./index-8d56a7e0.js";import{d as s}from"./styles.module-60167116.js";import{c as b}from"./index.esm-1a25c3bb.js";import"./styles.module-eea2a584.js";import"./styles.module-47d05e94.js";/* empty css               */import"./styles.module-4835680a.js";import"./styles.module-84e050ca.js";import"./styles.module-6cec8057.js";import{a as F,b as w,F as m}from"./formik.esm-ad1947c7.js";import{F as x}from"./FileLoader-ce2df32d.js";import{M as g}from"./Modal-d46436c9.js";import{B as y}from"./BackButton-9af6fa7f.js";import"./close-gray-ico-2aa4651a.js";import"./styles.module-4a1edd24.js";function B({status:a}){const[p,c]=u.useState(!1),j={},_=async(n,{setSubmitting:t,resetForm:o})=>{try{console.log(n),o()}finally{t(!1)}};return e.jsx(F,{initialValues:j,validationSchema:b().shape({}),onSubmit:_,children:({isSubmitting:n})=>e.jsxs(w,{className:i(s.container,"full-width"),children:[e.jsxs("div",{className:s.navBar,children:[e.jsx(d,{className:i(s.navigate,{[s.active]:a==="shared"}),to:h.patients.files("shared"),children:"Общие файлы"}),e.jsx(d,{className:i(s.navigate,{[s.active]:a==="move"}),to:h.patients.files("move"),children:"Файлы приемов"})]}),a==="shared"?e.jsxs(e.Fragment,{children:[[1,2,3].map(t=>e.jsxs("div",{className:s.card,children:[e.jsx("span",{className:s.date,children:"23.07.2023"}),e.jsx("span",{className:s.notes,children:"Уважаемая медсестра в широких кругах"}),e.jsx("div",{className:s.loadFails,children:e.jsx(m,{name:"files",children:({form:o,meta:l})=>e.jsx(x,{id:"button-load-file",title:"Загрузить",filesData:l.value,onChange:r=>o.setFieldValue("files",r),onDelete:()=>{}})})})]},t)),e.jsx("div",{className:"form-textarea-label",children:"Заметка"}),e.jsx(m,{name:"notice",className:i(s.comment,"form-textarea"),type:"text",placeholder:"Заметка",component:"textarea"}),e.jsx("button",{type:"button",className:s.downloadButton,children:"Загрузить"}),e.jsx("div",{children:e.jsx(v,{className:i(s.submit,"form-submit"),type:"submit",color:"primary",disabled:n,children:"Сохранить"})})]}):e.jsx(e.Fragment,{children:[1,2,3].map(t=>e.jsxs("div",{className:s.card,children:[e.jsx("span",{className:s.date,children:"Терапия  |  Ирина Ивановна Хакамада "}),e.jsxs("div",{className:s.date,children:[e.jsx("b",{children:"Жалоба:"})," ",e.jsx("span",{className:s.complaint,children:"Боль в верхнем правом зубе под углом гауса блабла"})," "]}),e.jsx("span",{className:s.dateTime,children:"14:30 - 14:50    |    23.07.2023  Четверг  |  +2 файла  "}),e.jsxs("div",{children:[e.jsx("b",{children:"Комментарий:"})," ",e.jsx("span",{className:s.notes,children:" Пломбирование фурмидонтной жидкостью 4\\5 пульпита блабла"})]}),e.jsx("div",{className:s.loadFails,children:e.jsx(m,{name:"files",children:({form:o,meta:l})=>e.jsx(x,{id:"button-load-file",title:"Загрузить",filesData:l.value,onChange:r=>o.setFieldValue("files",r),onDelete:()=>{}})})})]},t))}),e.jsx(g,{isOpen:p,onSuccess:()=>c(!1),onClose:()=>c(!1),type:"warn-info",children:e.jsx("div",{children:"Удалить файл?"})})]})})}const C="_root_1mohw_1",I="_formContainer_1mohw_5",P="_userInfo_1mohw_10",L="_formLabel_1mohw_15",k="_userInfoGender_1mohw_23",D="_date_1mohw_28",G="_loadFails_1mohw_36",S="_title_1mohw_41",E="_select_1mohw_49",V="_submit_1mohw_54",A="_comment_1mohw_69",f={root:C,formContainer:I,userInfo:P,formLabel:L,userInfoGender:k,date:D,loadFails:G,title:S,select:E,submit:V,delete:"_delete_1mohw_55",comment:A};function Z(){const a=N();return e.jsxs("div",{className:f.root,children:[e.jsx(y,{title:"Файлы"}),e.jsx("div",{className:f.formContainer,children:e.jsx(B,{status:a.status})})]})}export{Z as default};
