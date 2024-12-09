import{r as g,j as e,c as n,S as I,M as F,d as j,B as T,Q as N,a as O}from"./index-28b8728f.js";import{b as v,c as s}from"./styles.module-4ec819d1.js";import{c as B,a as b}from"./index.esm-7458ef39.js";import"./styles.module-eea2a584.js";import"./styles.module-f9591ad8.js";import"./styles.module-8bcd8ee9.js";import"./utils-9d128c1d.js";/* empty css               */import{a as P,b as W,F as C,E as _}from"./formik.esm-0b43f7b1.js";import{b as R}from"./doctorApi-6ee17efe.js";import{W as w,a as V}from"./WorkDay-46b32312.js";import{d as $,t as q}from"./times-5f17a510.js";import{e as S}from"./utils-045dd2ef.js";import{D as H}from"./DatePicker-abb74157.js";import{g as L}from"./helpers-96bd5b30.js";import{d as Q,e as z}from"./patientsApi-6c556a01.js";import"./styles.module-b235d918.js";import"./styles.module-6cec8057.js";import{B as A}from"./BackButton-03403362.js";import"./useQuery-5e80a04e.js";import"./useBaseQuery-d5b5de49.js";import"./close-gray-ico-ce01fa8c.js";import"./styles.module-6fbcb23a.js";import"./extendSxProp-3260528d.js";import"./Typography-37f7fd1d.js";import"./Popper-0206d46a.js";import"./hooks-9171095e.js";import"./useMutation-267c9319.js";import"./styles.module-4a1edd24.js";function k(u){const{title:m,selectOptions:o,value:l,onChange:p,className:h}=u,f=c=>{const i=o.find(({value:x})=>x===c.target.value);i&&p(i)};return g.useEffect(()=>{p(o[0])},[]),e.jsxs("div",{className:n(v.root,h),children:[e.jsx("span",{className:v.label,children:m}),e.jsx(I,{value:l??0,onChange:f,className:n("form-input",v.selectTime),selectNavigate:!0,defaultOption:o[0].label,selectOptions:o,children:o.map(({label:c,value:i})=>e.jsx(F,{value:i,className:"select-link",children:c},i))})]})}function G({patientId:u}){const[m,o]=g.useState(j()),{data:l}=R(),{mutate:p}=Q(),{mutate:h}=z(),f=g.useMemo(()=>{const a={value:-1,label:"Имя врача"},r=l==null?void 0:l.map(({id:d,fullName:t})=>({value:d,label:t}));return r!=null&&r.length?[a,...r]:[a]},[l]),c=L(),i=async(a,{setSubmitting:r})=>{const[d,t]=a.startTime.split(":").map(Number),[D,M]=a.endTime.split(":").map(Number);p({...a,startTime:j(m).hour(d).minute(t).toISOString(),endTime:j(m).hour(D).minute(M).toISOString()},{onSuccess:()=>{N("Success!",{type:"success"})},onSettled:()=>{r(!1)},onError:E=>{N(S(E),{type:"error"})}})},x=()=>{h("id",{onSuccess:()=>{},onError:a=>{N(S(a),{type:"error"})}})};return e.jsx(P,{initialValues:{patientId:u,userId:"",startTime:"",endTime:"",notice:"",servicePrices:[{}]},validationSchema:B().shape({userId:b().required(),startTime:b().required(),endTime:b().required()}),onSubmit:i,children:({isSubmitting:a,values:r,setFieldValue:d})=>e.jsxs(W,{className:n(s.container,"full-width"),children:[e.jsx("div",{className:s.label,children:"Имя врача"}),e.jsx(C,{name:"userId",className:"form-input",children:t=>e.jsx(I,{...t,className:n(s.select,"form-input"),selectOptions:f})}),!!r.userId&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:s.label,children:"График приема"}),e.jsxs("div",{className:s.dateWork,children:[e.jsx(H,{value:m,className:s.datePicker,onChange:t=>o(t)}),e.jsx(w,{className:s.workDay,defaultValue:m,daysWork:$,handleChange:t=>o(t)})]}),e.jsx(V,{className:s.workTime,timesWork:q,handleChange:()=>!1}),e.jsxs("div",{className:s.times,children:[e.jsx(k,{title:"Время от",value:r.startTime,onChange:t=>d("startTime",t.value),selectOptions:c}),e.jsx(k,{title:"Время до",value:r.endTime,onChange:t=>d("endTime",t.value),selectOptions:c})]}),e.jsxs("fieldset",{className:n(s.complaint,"full-width"),children:[e.jsx("div",{className:s.label,children:"Жалоба"}),e.jsx(C,{name:"notice",className:n(s.complaintField,"form-textarea"),type:"text",placeholder:"Заметка",component:"textarea"}),e.jsx(_,{name:"notice"})]}),e.jsxs("div",{className:s.submitting,children:[e.jsx(T,{color:"primary-reverse",className:s.delete,onClick:()=>x(),children:"Удалить запись"}),e.jsx(T,{className:n(s.submit,"form-submit"),type:"submit",color:"secondary",disabled:a,children:"Применить"})]})]})]})})}const J="_root_1dr9s_1",K="_formContainer_1dr9s_5",y={root:J,formContainer:K};function ke(){const u=O();return e.jsxs("div",{className:y.root,children:[e.jsx(A,{title:"Записать пациента на прием"}),e.jsx("div",{className:y.formContainer,children:e.jsx(G,{patientId:u.patientId})})]})}export{ke as default};
