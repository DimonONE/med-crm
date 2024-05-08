import{h as x,r as u,d as c,j as e,c as N,R as E,u as L,b as V,Q as O,e as D,B as M,P as Y}from"./index-b826c59e.js";import{T as R,a as H,I as K,b as $,c as I,d as r,S as P,e as U}from"./arrow-bottom-filter-2724c2e2.js";import{u as G}from"./hooks-e608dca4.js";import{u as g}from"./useMutation-411caa39.js";import{g as C}from"./styles.module-907b7742.js";import{T as q,d as Q}from"./times-14e96864.js";import{e as z}from"./utils-045dd2ef.js";const o={root:["staff-attendance"],listOfAttendance:()=>[...o.root,"list-of-attendance"],createWorkTime:()=>[...o.root,"create-work-time"],createVisits:()=>[...o.root,"create-visits"],createVacation:()=>[...o.root,"create-vacation"]},J=async a=>(await x({url:"/users/work-list",method:"GET",params:a})).data;function xe(a){return G({queryKey:o.listOfAttendance(),fetchPage:J,initialQuery:a})}function pe(){return g({mutationKey:o.createWorkTime(),mutationFn:async a=>(await x({url:"/users/create-work-time",method:"POST",data:a})).data})}function Te(){return g({mutationKey:o.createVacation(),mutationFn:async a=>(await x({url:"/users/create-vacation",method:"POST",data:a})).data})}function X(){return g({mutationKey:o.createVisits(),mutationFn:async a=>(await x({url:"/users/create-visits",method:"POST",data:a})).data})}const Z="_dayOff_135p2_1",ee="_vacations_135p2_8",v={dayOff:Z,vacations:ee};function te({vacations:a,workTimes:l,defaultTimeValue:f,handleChange:p}){const[m,T]=u.useState(!0),s=a.find(n=>c().isBetween(c(n.startTime),c(n.endTime),null,"[]")),j=l.filter(n=>n.dayOfWeek===c().format("dddd")).length===0;if(u.useEffect(()=>{T(!1)},[]),s){const n=c(s.startTime).format("DD.MM.YYYY"),_=c(s.endTime).format("DD.MM.YYYY");return e.jsx("div",{className:N(v.dayOff,v.vacations),children:`ОТПУСК: ${n} - ${_}`})}if(j)return e.jsx("div",{className:v.dayOff,children:"ВЫХОДНОЙ"});const h=n=>{m||f.length===n.length||p(n)};return e.jsx(q,{defaultTimeValue:f,startTime:C(9),endTime:C(20),handleChange:h})}const ae="_days_1cdrt_1",se="_day_1cdrt_1",ne="_active_1cdrt_18",ce="_tableCellItem_1cdrt_22",re="_workTime_1cdrt_29",d={days:ae,day:se,active:ne,tableCellItem:ce,workTime:re},je=E.forwardRef((a,l)=>{const f=L(),[,p]=V(),[m,T]=u.useState(void 0),[s,j]=u.useState(null),{personnelList:h,dataLength:n,hasNextPage:_,handleUpdateFilters:W,handleFetchNextPage:w,onScroll:A}=a,{mutate:B}=X(),S=t=>{T(i=>i===t?null:t)};return u.useEffect(()=>{s&&(s==null?void 0:s.times.length)>0&&B({userId:s.userId,date:c().toISOString(),times:s.times},{onSuccess:()=>{O("Success!",{type:"success"})},onError:t=>{O(z(t),{type:"error"})}})},[s]),u.useEffect(()=>{const t={fieldBySort:m!==null?m:void 0};if(m!==void 0){const i=new URLSearchParams;Object.entries(t).forEach(([k,y])=>{y!=null&&i.set(k,y)}),p(i)}W(t)},[m]),h.length?e.jsx("div",{className:N(d.root,"container"),children:e.jsx(R,{id:"all-attendance-table",ref:l,onScroll:A,className:"table-container",component:D,children:e.jsx(H,{sx:{minWidth:850},"aria-label":"simple table",children:e.jsxs(K,{scrollableTarget:"all-attendance-table",next:w,hasMore:_||!1,loader:null,dataLength:n,children:[e.jsx($,{children:e.jsxs(I,{children:[e.jsx(r,{width:"100%",className:"table-head-cell",children:"СЕГОДНЯШНИЙ ДЕНЬ"}),e.jsx(r,{style:{minWidth:"240px"},className:"table-head-cell",children:"ТЕКУЩАЯ НЕДЕЛЯ"}),e.jsx(r,{style:{minWidth:"140px"},className:"table-head-cell",onClick:()=>S("totalWeek"),children:e.jsxs("span",{className:d.tableCellItem,children:["Часы нед",e.jsx(P,{})]})}),e.jsx(r,{style:{minWidth:"140px"},className:"table-head-cell",onClick:()=>S("totalMonth"),children:e.jsxs("span",{className:d.tableCellItem,children:["Часы мес",e.jsx(P,{})]})}),e.jsx(r,{className:"table-head-cell",children:"НАСТРОИТЬ"})]})}),e.jsx(U,{children:h.map(t=>e.jsxs(I,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(r,{className:"table-body-cell",component:"th",scope:"row",children:e.jsx(te,{vacations:t.vacations,workTimes:t.workTimes,defaultTimeValue:t.visits,handleChange:i=>j({userId:t.userId,times:i})})}),e.jsx(r,{className:"table-body-cell",component:"th",scope:"row",children:e.jsx("div",{className:d.days,children:Q.map(({id:i,day:k})=>{const F=t.vacations.some(b=>c().isBetween(c(b.startTime),c(b.endTime),null,"[]"))?!0:t.workTimes.every(b=>b.dayOfWeek!==c().day(i).format("dddd"));return e.jsx("span",{className:N(d.day,{[d.active]:!F}),children:k},i)})})}),e.jsx(r,{className:"table-body-cell",align:"left",children:Number(t.timeWeek).toFixed(1)}),e.jsx(r,{className:"table-body-cell",align:"left",children:Number(t.timeMonth).toFixed(1)}),e.jsx(r,{className:"table-body-cell",children:e.jsx(M,{className:d.buttonLink,color:"secondary",onClick:()=>f(Y.attendance.schedule(t.userId)),children:"Настроить"})})]},t.timeWeek))})]})})})}):null}),ie="_vacationTime_18ytm_1",oe="_datePickerBlock_18ytm_9",le="_submit_18ytm_18",_e={vacationTime:ie,datePickerBlock:oe,submit:le};export{je as A,Te as a,pe as b,_e as s,xe as u};
