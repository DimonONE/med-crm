import{R as T,b as C,r as n,j as e,c as P,e as k,d as A,P as I,a as F,u as O,B as w}from"./index-fa80df68.js";import{A as E}from"./index.esm-af256b33.js";import{r as v,u as M}from"./styles.module-cf5b56ac.js";import"./index.esm-68c64567.js";import"./styles.module-eea2a584.js";import"./styles.module-47d05e94.js";/* empty css               */import{S as y,a as B}from"./SidebarItemList-af78babf.js";import{f as U,h as _,d as Y}from"./helpers-96bd5b30.js";import{I as D,S as L}from"./arrow-bottom-filter-c2bfa726.js";import{T as H,a as W,b as Q,c as R,d as p,e as G}from"./TableRow-25070048.js";import"./hooks-80c184ed.js";import"./useBaseQuery-e8d907b8.js";import"./useMutation-d5f6a419.js";import"./Sidebar-bdc4a97e.js";const $="_root_fe40s_1",q="_position_fe40s_1",z="_roles_fe40s_5",J="_active_fe40s_15",V="_optionRole_fe40s_19",X="_tableCellItem_fe40s_28",Z="_buttonLink_fe40s_35",d={root:$,position:q,roles:z,active:J,optionRole:V,tableCellItem:X,buttonLink:Z},K=T.forwardRef((t,a)=>{const[,l]=C(),[i,x]=n.useState(void 0),[o,b]=n.useState({isOpen:!1,value:null}),{personnelList:j,dataLength:g,hasNextPage:m,handleUpdateFilters:h,handleFetchNextPage:S,onScroll:N}=t,c=s=>{if(s==="role"){b(r=>({...r,isOpen:!r.isOpen}));return}x(r=>r===s?null:s)};return n.useEffect(()=>{const s={role:o.value,fieldSort:i};if(s.fieldSort!==void 0){const r=new URLSearchParams;Object.entries(s).forEach(([f,u])=>{u!=null&&r.set(f,u)}),l(r)}h(s)},[i,o.value]),j.length?e.jsx("div",{className:P(d.root,"container"),children:e.jsx(H,{id:"all-personnel-table",ref:a,onScroll:N,className:"table-container",component:k,children:e.jsx(W,{sx:{minWidth:850},"aria-label":"simple table",children:e.jsxs(D,{scrollableTarget:"all-personnel-table",next:S,hasMore:m||!1,loader:null,dataLength:g,children:[e.jsx(Q,{children:e.jsxs(R,{children:[e.jsx(p,{width:"auto",sx:{minWidth:180},className:"table-head-cell",onClick:()=>c("createdAt"),children:e.jsxs("span",{className:d.tableCellItem,children:["ДАТА РЕГ.",e.jsx(L,{})]})}),e.jsx(p,{width:"auto",sx:{minWidth:360},className:"table-head-cell",onClick:()=>c("role"),children:e.jsxs("span",{className:d.tableCellItem,children:["ДОЛЖНОСТЬ",e.jsx(L,{}),e.jsx("div",{className:P(d.roles,{[d.active]:o.isOpen}),children:v.map(({label:s,value:r})=>e.jsx("option",{value:r,className:d.optionRole,onClick:f=>{b(u=>({...u,value:"value"in f.target&&f.target.value!==v[0].value.toString()?f.target.value:null}))},children:s}))})]})}),e.jsx(p,{width:"100%",className:"table-head-cell",children:"ТЕЛЕФОН"})]})}),e.jsx(G,{children:j.map(s=>e.jsxs(R,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(p,{className:"table-body-cell",component:"th",scope:"row",children:A(s.createdAt).format("DD.MM.YYYY")}),e.jsx(p,{className:P("table-body-cell",d.position),component:"th",scope:"row",children:s.role.name}),e.jsx(p,{className:"table-body-cell",component:"th",scope:"row",children:s.phone})]},s.createdAt))})]})})})}):null});function ee({id:t,createdAt:a,role:l,phone:i}){return{id:t,createdAt:a,role:l,phone:i}}function te(t){return t!=null&&t.pages.length?t.pages.flatMap(a=>a.map(l=>ee({id:l.id,createdAt:l.createdAt,role:l.role,phone:l.phone}))):[]}function se(t){return t!=null&&t.pages.length?t.pages.flatMap(a=>a.map(l=>({id:l.id,title:l.fullName,subTitle:`Код клиники: ${l.id}`,link:I.personnel.details(l.id)}))):[]}function je(){const t=F(),[a]=C(),l=O(),[i,x]=n.useState(null),{data:o,fetchNextPage:b,updateQueryParameters:j,hasNextPage:g}=M({status:"approval",fieldSort:a.get("fieldSort"),role:a.get("role")}),m=n.useRef(null),h=n.useRef(null),S=n.useMemo(()=>se(o),[o]),N=n.useMemo(()=>te(o),[o]);return n.useEffect(()=>{const c=i?U(i):{};j({...c})},[i]),n.useEffect(()=>{_(m,h)()},[t]),e.jsxs("div",{children:[e.jsxs("div",{className:"d-flex",children:[e.jsx(y,{ref:m,items:S,selectId:t==null?void 0:t.clinicId,onScroll:_(m,h),children:e.jsx(B,{isSearch:!0,filters:"Ф.И.О.",handleChange:c=>{x(s=>({...s,filter:c}))}})}),e.jsx("div",{children:e.jsx(K,{ref:h,personnelList:N,hasNextPage:g,handleFetchNextPage:b,handleUpdateFilters:c=>{x(s=>({...s,...c}))},dataLength:Y(o),onScroll:_(h,m)})})]}),e.jsxs(w,{className:"fixed-button",onClick:()=>l(I.personnel.add),children:[e.jsx(E,{}),"Добавить персонал"]})]})}export{je as default};