import{j as o,d as r,B as d,c}from"./index-fa80df68.js";import{a as l,b as m}from"./formik.esm-f9c5b2d0.js";import{c as p}from"./index.esm-68c64567.js";import{W as u,a as x}from"./WorkDay-98426e82.js";import{d as h,t as k}from"./times-768f0984.js";import{B}from"./BackButton-7ca9a21c.js";import{D as s}from"./DatePicker-ccbcad4d.js";import"./close-gray-ico-004632ab.js";import"./styles.module-749ea44e.js";import"./extendSxProp-ac3efb2b.js";import"./styles.module-4a1edd24.js";/* empty css               */import"./Typography-03a50c65.js";const _="_root_d01cd_1",b="_formContainer_d01cd_5",j="_label_d01cd_10",g="_name_d01cd_18",f="_workDay_d01cd_19",C="_workTimeBlock_d01cd_20",N="_textHelper_d01cd_30",y="_datePickerBlock_d01cd_38",M="_submit_d01cd_47",t={root:_,formContainer:b,label:j,name:g,workDay:f,workTimeBlock:C,textHelper:N,datePickerBlock:y,submit:M};function O(){return o.jsxs("div",{className:t.root,children:[o.jsx(B,{title:"Посещаемость, расписание"}),o.jsx("div",{className:t.formContainer,children:o.jsx(l,{initialValues:{dayWork:0,timeWork:"",startVacation:"",endVacation:""},validationSchema:p().shape({}),onSubmit:()=>{},children:({isSubmitting:n,setValues:i})=>o.jsxs(m,{children:[o.jsx("div",{className:t.label,children:"Имя"}),o.jsx("div",{className:t.name,children:"Винницкий Богдан Станиславович"}),o.jsx("div",{className:t.label,children:"Выберите дни работы"}),o.jsx(u,{daysWork:h,handleChange:a=>i(e=>({...e,dayWork:r(a).day()})),className:t.workDay}),o.jsxs("div",{className:t.workTimeBlock,children:[o.jsx("div",{className:t.label,children:"Выберите время работы"}),o.jsx(x,{editTimes:!0,timesWork:k,handleChange:a=>i(e=>({...e,timeWork:a.time})),handleDelete:()=>!1}),o.jsx("div",{className:t.textHelper,children:"*Перетащите мышкой от нужного до нужного времени или накликайте левой кнопкой мышки по часам работы сотрудника"})]}),o.jsx("div",{className:t.label,children:"Выберите отпуск"}),o.jsxs("div",{className:t.datePickerBlock,children:["От",o.jsx(s,{sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"170px",height:"38px",padding:"0 14px",maxWidth:"none",background:"#FFF",borderRadius:"10.104px",border:"1.123px solid #A1B6C1",marginRight:"20px",fontSize:"18px",color:"#A1B6C1"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#A1B6C1"},".MuiButtonBase-root":{padding:0,paddingRight:"5px"}},onChange:a=>i(e=>({...e,startVacation:r(a).toString()}))}),"До",o.jsx(s,{sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"170px",height:"38px",padding:"0 14px",maxWidth:"none",background:"#FFF",borderRadius:"10.104px",border:"1.123px solid #A1B6C1",fontSize:"18px",color:"#A1B6C1"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#A1B6C1"},".MuiButtonBase-root":{padding:0,paddingRight:"5px"}},onChange:a=>i(e=>({...e,endVacation:r(a).toString()}))})]}),o.jsxs(d,{className:c(t.submit,"form-submit"),type:"submit",color:"primary",children:["Сохранить ",n]})]})})})]})}export{O as default};