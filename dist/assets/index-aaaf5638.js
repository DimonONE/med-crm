import{P as d,d as P,u as j,a as I,r as a,j as s,B as L}from"./index-47557d54.js";import{A as N}from"./index.esm-8d31d495.js";import{u as S}from"./patientsApi-f5b95a05.js";import"./styles.module-997487cd.js";import"./index.esm-16d0899d.js";import"./styles.module-eea2a584.js";import"./styles.module-47d05e94.js";/* empty css               */import"./styles.module-49f2e5e5.js";import{f as b,h as f,d as A}from"./helpers-96bd5b30.js";import"./styles.module-2cc1501a.js";import"./styles.module-6cec8057.js";import{S as R,a as v}from"./SidebarItemList-cf354a19.js";import{P as E,a as k}from"./PatientInfo-96c5d708.js";import"./hooks-3d3e7638.js";import"./useBaseQuery-01eea3a2.js";import"./useQuery-4996d838.js";import"./useMutation-0530390b.js";import"./Sidebar-dc976827.js";import"./arrow-bottom-filter-7973e549.js";import"./doctorApi-49ef4d9e.js";import"./LoadImage-2beb6735.js";import"./close-gray-ico-49cb4fac.js";import"./FileLoader-aae1cc7b.js";import"./Modal-28a1387e.js";import"./utils-045dd2ef.js";import"./servicesApi-551647e1.js";function y({id:e,createdAt:i,fullName:t,dateOfBirth:o,status:r,phone:p}){return{id:e,createdAt:i,fullName:t,dateOfBirth:o,status:r,phone:p}}function B(e){return e!=null&&e.pages.length?e.pages.flatMap(i=>i.map(t=>y({id:t.id,createdAt:t.createdAt,fullName:t.fullName,dateOfBirth:t.dateOfBirth,status:t.status,phone:t.phone}))):[]}function M(e){return e!=null&&e.pages.length?e.pages.flatMap(i=>i.map(t=>({id:t.id,title:t.fullName,subTitle:`Код клиники: ${t.id}`,link:d.patients.details(t.id)}))):[]}P.locale("ru");function nt(){const e=j(),i=I(),[t,o]=a.useState(null),{data:r,fetchNextPage:p,updateQueryParameters:u,hasNextPage:h}=S(),l=a.useRef(null),m=a.useRef(null),x=a.useMemo(()=>M(r),[r]),g=a.useMemo(()=>B(r),[r]);return a.useEffect(()=>{const n=t?b(t):{};u({...n})},[t]),a.useEffect(()=>{f(l,m)()},[i]),s.jsxs("div",{children:[s.jsxs("div",{className:"d-flex",children:[s.jsx(R,{ref:l,items:x,selectId:i==null?void 0:i.patientId,onScroll:f(l,m),children:s.jsx(v,{isSearch:!0,filters:"Ф.И.О.",handleChange:n=>{o(c=>({...c,filter:n}))}})}),s.jsx("div",{children:i.patientId?s.jsx(E,{patientId:i.patientId}):s.jsx(k,{ref:m,patientList:g,hasNextPage:h,handleFetchNextPage:p,handleUpdateFilters:n=>{o(c=>({...c,...n}))},dataLength:A(r),onScroll:f(m,l)})})]}),s.jsxs(L,{className:"fixed-button",onClick:()=>e(d.patients.add),children:[s.jsx(N,{}),"Добавить пациента"]})]})}export{nt as default};
