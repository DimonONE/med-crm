import{r as o,j as s,c as D,A as x}from"./index-47557d54.js";import{S as N}from"./close-gray-ico-49cb4fac.js";import{M as E}from"./Modal-28a1387e.js";import{a}from"./styles.module-47d05e94.js";const L=i=>o.createElement("svg",{width:19,height:19,viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",...i},o.createElement("path",{d:"M18.1806 17.8746C18.1806 18.4975 17.6757 19.0024 17.0528 19.0024H1.26401C0.641156 19.0024 0.13623 18.4975 0.13623 17.8746C0.13623 17.2518 0.641156 16.7469 1.26401 16.7469H17.0528C17.6757 16.7469 18.1806 17.2518 18.1806 17.8746ZM8.36098 14.302C8.58122 14.5222 8.86979 14.6323 9.15843 14.6323C9.447 14.6323 9.73571 14.5222 9.95587 14.302L13.9516 10.3062C14.3921 9.86581 14.3921 9.15175 13.9516 8.71132C13.5112 8.27089 12.7972 8.27089 12.3567 8.71132L10.2862 10.7818V2.08578C10.2862 1.46293 9.78128 0.958008 9.15843 0.958008C8.53558 0.958008 8.03065 1.46293 8.03065 2.08578V10.7818L5.96013 8.71132C5.5197 8.27089 4.80564 8.27089 4.36521 8.71132C3.92478 9.15175 3.92478 9.86581 4.36521 10.3062L8.36098 14.302Z",fill:"#229CE1"}));function O(i){const[t,c]=o.useState(null),[m,r]=o.useState({flag:!1,fileId:""}),{id:h,title:g,filesData:f,accept:j="pdf",multiple:w=!0,onDownload:u,onDelete:p,onChange:C,className:I,hiddenFileInfo:S,hiddenButton:v}=i;o.useEffect(()=>{f&&c(f)},[f]);const F=e=>{const n=e.target.files;if(n){const l=Array.from(n),d=t?[...t,...l]:l;c(d),C&&C(l)}},b=e=>{u?u(`${e.replace("/app",x)}`):window.open(`${e.replace("/app",x)}`,"_blank")},y=e=>{if(t){const n=t.filter(({name:l})=>l!==e);if(c(n),p){const l=t.filter(({name:d})=>d===e);p(n,l),r({flag:!1,fileId:""})}}};return s.jsxs("div",{className:D(a.root,I),children:[!S&&t&&s.jsx("ul",{children:t.map(e=>s.jsxs("li",{className:a.fileInfo,children:["path"in e&&s.jsx("button",{type:"button",onClick:()=>b(e.path),children:s.jsx(L,{})}),s.jsx("span",{className:a.name,children:e.name}),p&&s.jsx("button",{type:"button",onClick:()=>r({flag:!0,fileId:e.name}),children:s.jsx(N,{})})]},e.name))}),!v&&s.jsxs("label",{htmlFor:h,className:a.downloadButton,children:[s.jsx("input",{id:h,className:a.input,name:"files",type:"file",multiple:w,onChange:F,accept:`application/${j}`}),g]}),s.jsx(E,{isOpen:m.flag,onSuccess:()=>y(m.fileId),onClose:()=>r({flag:!1,fileId:""}),type:"warn",children:s.jsx("div",{children:"Удалить файл?"})})]})}export{O as F};
