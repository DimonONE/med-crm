import{P as p,a as P,u as b,b as j,r as i,j as r,B as A}from"./index-28b8728f.js";import{A as k}from"./index.esm-2e63961d.js";import{u as v,A as L}from"./styles.module-4af57399.js";import{S as N,a as I}from"./SidebarItemList-c6ab61ab.js";import{f as M,h as f,d as y}from"./helpers-96bd5b30.js";import"./index.esm-7458ef39.js";/* empty css               */import"./index.es-b4da052e.js";import"./hooks-9171095e.js";import"./useBaseQuery-d5b5de49.js";import"./useMutation-267c9319.js";import"./styles.module-6fbcb23a.js";import"./times-5f17a510.js";import"./extendSxProp-3260528d.js";import"./utils-045dd2ef.js";import"./arrow-bottom-filter-ed2c8b82.js";import"./lodash-f37d900b.js";import"./Sidebar-c6cdc5c8.js";function E({userId:e,timeMonth:s,timeWeek:t,vacations:n,workTimes:c,visits:o}){return{userId:e,timeMonth:s,timeWeek:t,vacations:n,workTimes:c,visits:o}}function R(e){return e!=null&&e.pages.length?e.pages.flatMap(s=>s.map(t=>E({userId:t.doctor.id,timeMonth:t.totalMonth,timeWeek:t.totalWeek,vacations:t.doctor.vacations,workTimes:t.doctor.workTimes,visits:t.doctor.visits}))):[]}function T(e){return e!=null&&e.pages.length?e.pages.flatMap(s=>s.map(t=>({id:t.doctor.id,title:t.doctor.fullName,subTitle:t.doctor.specialization,link:p.personnel.details(t.doctor.id)}))):[]}function Y(){const e=P(),s=b(),[t]=j(),[n,c]=i.useState(null),{data:o,fetchNextPage:u,updateQueryParameters:h,hasNextPage:g}=v({fieldBySort:t.get("fieldBySort")}),l=i.useRef(null),m=i.useRef(null),x=i.useMemo(()=>T(o),[o]),S=i.useMemo(()=>R(o),[o]);return i.useEffect(()=>{const a=n?M(n):{};h({...a})},[n]),i.useEffect(()=>{f(l,m)()},[e]),r.jsxs("div",{className:"d-flex",children:[r.jsx(N,{ref:l,items:x,selectId:e==null?void 0:e.clinicId,onScroll:f(l,m),children:r.jsx(I,{isSearch:!0,filters:"Ф.И.О.",handleChange:a=>{c(d=>({...d,doctorName:a}))}})}),r.jsx("div",{children:r.jsx(L,{ref:m,personnelList:S,hasNextPage:g,handleFetchNextPage:u,handleUpdateFilters:a=>{c(d=>({...d,...a}))},dataLength:y(o),onScroll:f(m,l)})}),r.jsxs(A,{className:"fixed-button",onClick:()=>s(p.personnel.add),children:[r.jsx(k,{}),"Добавить персонал"]})]})}export{Y as default};