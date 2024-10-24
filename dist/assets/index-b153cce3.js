import{j as e,d as m,B as h,c as f,Q as d,a as _}from"./index-b7b75947.js";import{a as B,b}from"./formik.esm-4440c82b.js";import{c as j,a as p}from"./index.esm-f3eb9c4c.js";import{u as y}from"./sessionApi-8469633a.js";import{a as g,s as c,b as C}from"./styles.module-05ee1b60.js";import{W as N,a as v}from"./WorkDay-49f5ad86.js";import{d as D,t as S}from"./times-f42c0158.js";import{e as k}from"./utils-045dd2ef.js";import{B as w}from"./BackButton-b2e45c58.js";import{D as x}from"./DatePicker-7916f172.js";import"./useQuery-00968507.js";import"./useBaseQuery-020bfd66.js";import"./index.es-b0e43bb7.js";import"./hooks-196f33c9.js";import"./useMutation-3de9e6b6.js";import"./styles.module-a343e3ff.js";import"./arrow-bottom-filter-f53bd9bf.js";import"./close-gray-ico-51fb0ef4.js";import"./extendSxProp-09d42ce9.js";import"./styles.module-4a1edd24.js";/* empty css               */import"./Typography-953e41f9.js";function M({userId:s}){const{mutate:i}=g(),u=async(n,{setSubmitting:r})=>{try{await i(n,{onSuccess:()=>{d("Success!",{type:"success"})},onError:o=>{d(k(o),{type:"error"})}})}finally{r(!1)}};return e.jsx(B,{initialValues:{userId:s,startDate:"",endDate:""},validationSchema:j().shape({startDate:p().required(),endDate:p().required()}),onSubmit:u,children:({isSubmitting:n,setValues:r})=>e.jsx(b,{children:e.jsxs("div",{className:c.vacationTime,children:[e.jsx("div",{className:c.label,children:"Выберите отпуск"}),e.jsxs("div",{className:c.datePickerBlock,children:["От",e.jsx(x,{sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"170px",height:"38px",padding:"0 14px",maxWidth:"none",background:"#FFF",borderRadius:"10.104px",border:"1.123px solid #A1B6C1",marginRight:"20px",fontSize:"18px",color:"#A1B6C1"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#A1B6C1"},".MuiButtonBase-root":{padding:0,paddingRight:"5px"}},onChange:o=>r(a=>({...a,startDate:m(o).toString()}))}),"До",e.jsx(x,{sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"170px",height:"38px",padding:"0 14px",maxWidth:"none",background:"#FFF",borderRadius:"10.104px",border:"1.123px solid #A1B6C1",fontSize:"18px",color:"#A1B6C1"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#A1B6C1"},".MuiButtonBase-root":{padding:0,paddingRight:"5px"}},onChange:o=>r(a=>({...a,endDate:m(o).toString()}))}),e.jsxs(h,{className:f(c.submit,"form-submit"),type:"submit",color:"primary",children:["Сохранить ",n]})]})]})})})}const I="_root_14lu3_1",W="_formContainer_14lu3_5",F="_label_14lu3_14",T="_name_14lu3_22",A="_workDay_14lu3_23",R="_workTimeBlock_14lu3_24",H="_textHelper_14lu3_34",O="_submit_14lu3_42",t={root:I,formContainer:W,label:F,name:T,workDay:A,workTimeBlock:R,textHelper:H,submit:O};m.locale("en");function ne(){const{userId:s}=_(),{data:i}=y(s),{mutate:u}=C(),n=async(r,{setSubmitting:o,resetForm:a})=>{try{await u(r,{onSuccess:()=>{d("Success!",{type:"success"}),a()},onError:l=>{d(k(l),{type:"error"})}})}finally{o(!1)}};return e.jsxs("div",{className:t.root,children:[e.jsx(w,{title:"Посещаемость, расписание"}),e.jsxs("div",{className:t.formContainer,children:[e.jsx(B,{initialValues:{userId:s,dayOfWeek:m().format("dddd"),times:[]},validationSchema:j().shape({}),onSubmit:n,children:({isSubmitting:r,setValues:o})=>e.jsxs(b,{children:[e.jsx("div",{className:t.label,children:"Имя"}),e.jsx("div",{className:t.name,children:i==null?void 0:i.fullName}),e.jsx("div",{className:t.label,children:"Выберите дни работы"}),e.jsx(N,{daysWork:D,handleChange:a=>{o(l=>({...l,dayOfWeek:m(a).format("dddd")}))},className:t.workDay}),e.jsxs("div",{className:t.workTimeBlock,children:[e.jsx("div",{className:t.label,children:"Выберите время работы"}),e.jsx(v,{editTimes:!0,timesWork:S,handleChange:a=>o(l=>({...l,times:a})),handleDelete:()=>!1}),e.jsx("div",{className:t.textHelper,children:"*Перетащите мышкой от нужного до нужного времени или накликайте левой кнопкой мышки по часам работы сотрудника"}),e.jsxs(h,{className:f(t.submit,"form-submit"),type:"submit",color:"primary",children:["Сохранить ",r]})]})]})}),e.jsx(M,{userId:s})]})]})}export{ne as default};
