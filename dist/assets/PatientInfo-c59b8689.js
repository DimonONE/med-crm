import{R as P,b as Y,r as o,j as e,c as x,e as D,d as _,S as H,f as V,B as N,Q as T,u as R,g as F,k as Z,l as M,P as w}from"./index-b7b75947.js";import{T as O,a as $,I as U,b as q,c as A,d as p,e as W}from"./index.es-b0e43bb7.js";import{S as E}from"./arrow-bottom-filter-f53bd9bf.js";import{a as G}from"./doctorApi-520f7d5e.js";import{a as Q,b as z}from"./patientsApi-86bd4d01.js";import{s as m}from"./styles.module-431a1913.js";import"./index.esm-f3eb9c4c.js";import{L as J}from"./LoadImage-7e045af5.js";import"./utils-dfdb9c39.js";/* empty css               */import{F as K}from"./FileLoader-47d88ffe.js";import"./styles.module-eea2a584.js";import"./styles.module-a343e3ff.js";import{e as X}from"./utils-045dd2ef.js";import{S as k}from"./close-gray-ico-51fb0ef4.js";import{u as e1}from"./servicesApi-92d7aae7.js";import"./styles.module-a9f82462.js";import"./styles.module-6cec8057.js";const s1="_tableCellItem_o5dqw_1",t1="_statusInfo_o5dqw_8",a1="_status_o5dqw_8",n1="_cancel_o5dqw_17",c1="_date_o5dqw_20",l1="_name_o5dqw_23",v={tableCellItem:s1,statusInfo:t1,status:a1,cancel:n1,date:c1,name:l1},ee=P.forwardRef((c,S)=>{const[,C]=Y(),[f,b]=o.useState("ASC"),{patientList:u,dataLength:j,hasNextPage:t,handleUpdateFilters:I,handleFetchNextPage:n,onScroll:y}=c,L=i=>{i==="sortBy"&&b(r=>r==="ASC"?"DESC":"ASC")};return o.useEffect(()=>{const i={sortBy:f},r=new URLSearchParams;Object.entries(i).forEach(([g,a])=>{a!=null&&r.set(g,a)}),C(r),I(i)},[f]),u.length?e.jsx("div",{className:x(v.root,"container"),children:e.jsx(O,{id:"all-patient-table",ref:S,className:"table-container",onScroll:y,component:D,children:e.jsx($,{sx:{minWidth:850},"aria-label":"simple table",children:e.jsxs(U,{scrollableTarget:"all-patient-table",next:n,hasMore:t||!1,loader:null,dataLength:j,children:[e.jsx(q,{children:e.jsxs(A,{children:[e.jsx(p,{width:"auto",sx:{minWidth:180},className:"table-head-cell",onClick:()=>L("sortBy"),children:e.jsxs("span",{className:v.tableCellItem,children:["ДАТА РОЖ.",e.jsx(E,{})]})}),e.jsx(p,{width:"auto",sx:{minWidth:360},className:"table-head-cell",children:"СТАТУС И ДАТА ЗАПИСИ"}),e.jsx(p,{width:"auto",sx:{minWidth:180},className:"table-head-cell",children:"ТЕЛЕФОН"}),e.jsx(p,{width:"100%",className:"table-head-cell",onClick:()=>L("reminder"),children:e.jsxs("span",{className:v.tableCellItem,children:["НАПОМИНАНИЕ",e.jsx(E,{})]})})]})}),e.jsx(W,{children:u.map(i=>e.jsxs(A,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(p,{className:"table-body-cell",component:"th",scope:"row",children:_(i.createdAt).format("DD.MM.YYYY")}),e.jsx(p,{className:"table-body-cell",component:"th",scope:"row",children:e.jsxs("div",{className:v.statusInfo,children:[e.jsx("div",{className:x(v.status,{[v.cancel]:i.status!=="active"}),children:i.status==="active"?"Запись завершена":"Запись отменена"}),e.jsx("div",{className:v.date,children:_(i.createdAt).format("DD.MM.YYYY dd HH:mm")}),e.jsx("div",{className:v.name,children:i.fullName})]})}),e.jsx(p,{className:"table-body-cell",children:i.phone}),e.jsx(p,{className:"table-body-cell"})]},i.createdAt))})]})})})}):null});function o1(c){const{isOpen:S,record:C,onSuccess:f,onClose:b}=c,[u,j]=o.useState([]),[t,I]=o.useState([]),{data:n}=e1(),{mutate:y}=Q(),L=u.reduce((a,l)=>a+l.price,0),i=a=>{const l=n==null?void 0:n.find(({id:h})=>a===h),d=t.filter(({value:h})=>a!==h);l&&(j(h=>[...h,l]),I(d))},r=a=>{const l=u.filter(({id:h})=>a!==h),d=n==null?void 0:n.find(({id:h})=>a===h);j(l),d&&I(h=>[...h,{value:d.id,label:d.name}])},g=()=>{const a=u.map(({name:d,price:h})=>({price:h,name:d})),l={id:C.id,userId:C.userId,startTime:C.startTime,endTime:C.endTime,notice:C.notice??"",servicePrices:a};y(l,{onSuccess:()=>{f({services:u}),b()},onError:d=>{T(X(d),{type:"error"})}})};return o.useEffect(()=>{const a=n?[{value:-1,label:"Выберите услугу"},...n.map(({id:l,name:d})=>({value:l,label:d}))]:[];I(a),j([])},[n,S]),!S||!t.length?null:e.jsx("div",{className:m.root,children:e.jsxs("div",{className:m.modal,children:[e.jsx("button",{type:"button",className:m.modalCloseButton,onClick:b,children:e.jsx(k,{})}),e.jsxs("div",{children:[e.jsx("span",{className:m.title,children:"Добавить услуги"}),e.jsx(H,{value:-1,onChange:a=>i(a.target.value),className:x("form-input",m.dropdown),selectOptions:t,children:t.map(({label:a,value:l})=>e.jsx(V,{value:l,children:a},l))}),e.jsx("div",{className:m.servicesList,children:u.map(({id:a,price:l,name:d})=>e.jsxs("div",{className:m.servicesItem,children:[e.jsxs("span",{className:m.price,children:["₽ ",l]}),e.jsx("span",{className:m.info,children:d}),e.jsx(N,{color:"primary-reverse",onClick:()=>r(a),children:e.jsx(k,{})})]},a))})]}),e.jsxs("div",{className:m.priceAll,children:["₽ ",L," ",e.jsx("span",{className:m.priceText,children:"Вся сумма"})," "]}),e.jsxs("div",{className:m.buttonsSubmit,children:[e.jsx(N,{color:"secondary",className:m.button,onClick:b,children:"Отмена"}),e.jsx(N,{className:m.button,onClick:g,children:"Применить"})]})]})})}const i1="_root_8yh7o_1",r1="_navigateInfo_8yh7o_11",d1="_name_8yh7o_16",m1="_blockInfo_8yh7o_24",h1="_textBold_8yh7o_35",x1="_textSuccess_8yh7o_39",u1="_textValue_8yh7o_43",C1="_image_8yh7o_48",f1="_userImage_8yh7o_53",j1="_buttonSuccess_8yh7o_56",p1="_buttonCancel_8yh7o_57",v1="_userInfo_8yh7o_68",_1="_textInfo_8yh7o_91",N1="_icon_8yh7o_96",b1="_date_8yh7o_100",I1="_passportNumber_8yh7o_103",g1="_recording_8yh7o_107",S1="_contentInfo_8yh7o_107",L1="_note_8yh7o_107",y1="_nameDisease_8yh7o_115",w1="_noteInfo_8yh7o_119",M1="_priceAll_8yh7o_123",B1="_button_8yh7o_56",A1="_buttonAttendance_8yh7o_141",E1="_tableInfo_8yh7o_162",s={root:i1,navigateInfo:r1,name:d1,blockInfo:m1,textBold:h1,textSuccess:x1,textValue:u1,image:C1,userImage:f1,buttonSuccess:j1,buttonCancel:p1,userInfo:v1,textInfo:_1,icon:N1,date:b1,passportNumber:I1,recording:g1,contentInfo:S1,note:L1,nameDisease:y1,noteInfo:w1,priceAll:M1,button:B1,buttonAttendance:A1,tableInfo:E1},k1=c=>o.createElement("svg",{width:26,height:19,viewBox:"0 0 26 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",...c},o.createElement("path",{d:"M0.979308 9.6363L8.39534 17.8763C8.55355 18.051 8.77438 18.1499 9.00839 18.1499L13.9524 18.1499C14.2771 18.1499 14.5721 17.9587 14.7056 17.6621C14.8374 17.3638 14.783 17.0161 14.5655 16.7755L7.64549 9.08587L14.5655 1.39792C14.783 1.15566 14.839 0.807932 14.7056 0.511291C14.5721 0.213001 14.2771 0.0218334 13.9524 0.0218333L9.0084 0.0218329C8.77438 0.0218329 8.55355 0.12236 8.39534 0.293754L0.979308 8.53378C0.697499 8.84691 0.697499 9.32483 0.979308 9.6363Z",fill:"#876AFF"}),o.createElement("path",{d:"M11.6912 9.6363L19.1073 17.8763C19.2655 18.051 19.4863 18.1499 19.7203 18.1499L24.6643 18.1499C24.989 18.1499 25.284 17.9587 25.4175 17.6621C25.5493 17.3638 25.4949 17.0161 25.2774 16.7755L18.3574 9.08587L25.2774 1.39792C25.4949 1.15566 25.551 0.807932 25.4175 0.511291C25.284 0.213001 24.989 0.0218334 24.6643 0.0218333L19.7203 0.0218329C19.4863 0.0218329 19.2655 0.12236 19.1073 0.293754L11.6912 8.53378C11.4094 8.84691 11.4094 9.32483 11.6912 9.6363Z",fill:"#876AFF"})),B=c=>o.createElement("svg",{width:23,height:22,viewBox:"0 0 23 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",...c},o.createElement("path",{d:"M17.2511 14.0119C16.6666 14.0119 16.1942 14.4844 16.1942 15.0688V18.3888C16.1942 18.9722 15.7207 19.4457 15.1373 19.4457H3.51069C2.92724 19.4457 2.45376 18.9722 2.45376 18.3888V4.64834C2.45376 4.06489 2.92728 3.59141 3.51069 3.59141H9.6516C10.2361 3.59141 10.7085 3.11895 10.7085 2.53447C10.7085 1.95 10.2361 1.47754 9.6516 1.47754H3.51069C1.76249 1.47745 0.339844 2.90014 0.339844 4.64834V18.3888C0.339844 20.137 1.76249 21.5596 3.51069 21.5596H15.1372C16.8854 21.5596 18.308 20.138 18.308 18.3888V15.0689C18.3081 14.4844 17.8356 14.0119 17.2511 14.0119Z",fill:"#229CE1"}),o.createElement("path",{d:"M20.9155 1.34331C20.1481 0.57598 19.1461 0.189105 18.1367 0.167985C17.0745 0.144741 16.0059 0.529448 15.2026 1.33379L8.04701 8.4894C7.00273 9.53792 6.42773 10.9289 6.42773 12.4065V14.774C6.42773 15.3585 6.90019 15.831 7.48467 15.831H9.85223C11.3299 15.831 12.7208 15.256 13.7704 14.2106L20.9164 7.06454C22.4913 5.4887 22.4913 2.9203 20.9155 1.34331ZM12.277 12.7151C11.629 13.3609 10.7666 13.7171 9.85232 13.7171H8.54165V12.4065C8.54165 11.4922 8.89784 10.6297 9.54257 9.98288L14.2598 5.26568L16.993 7.99896L12.277 12.7151ZM19.4209 5.57114L18.4876 6.50445L15.7543 3.77118L16.6876 2.8379C17.4423 2.08323 18.6683 2.08536 19.4209 2.8379C20.1735 3.59147 20.1735 4.81753 19.4209 5.57114Z",fill:"#229CE1"})),P1=c=>o.createElement("svg",{width:19,height:13,viewBox:"0 0 19 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",...c},o.createElement("path",{d:"M16.9766 0.180664H2.14062C1.26654 0.180664 0.558594 0.893 0.558594 1.7627V11.2549C0.558594 12.1297 1.27174 12.8369 2.14062 12.8369H16.9766C17.8433 12.8369 18.5586 12.1327 18.5586 11.2549V1.7627C18.5586 0.894547 17.8535 0.180664 16.9766 0.180664ZM16.755 1.23535C16.4318 1.55686 10.8693 7.09003 10.6773 7.28107C10.3784 7.5799 9.98117 7.74443 9.55859 7.74443C9.13602 7.74443 8.73875 7.57986 8.43894 7.28008C8.30977 7.15159 2.8087 1.67952 2.36218 1.23535H16.755ZM1.61328 11.0402V1.97803L6.17087 6.5116L1.61328 11.0402ZM2.36285 11.7822L6.91864 7.2554L7.69415 8.02684C8.19218 8.52486 8.85431 8.79911 9.55859 8.79911C10.2629 8.79911 10.925 8.52486 11.4221 8.02782L12.1985 7.2554L16.7543 11.7822H2.36285ZM17.5039 11.0402L12.9463 6.5116L17.5039 1.97803V11.0402Z",fill:"#0E5F8C"})),Y1=c=>o.createElement("svg",{width:19,height:19,viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",...c},o.createElement("path",{d:"M15.7112 11.2114C15.3184 10.8024 14.8445 10.5836 14.3422 10.5836C13.844 10.5836 13.3661 10.7983 12.957 11.2074L11.6771 12.4832C11.5718 12.4265 11.4665 12.3739 11.3653 12.3212C11.2194 12.2483 11.0817 12.1795 10.9643 12.1066C9.76539 11.3451 8.67586 10.3528 7.63088 9.06883C7.1246 8.42889 6.78437 7.8902 6.5373 7.3434C6.86943 7.03963 7.17725 6.72371 7.47697 6.41994C7.59038 6.30653 7.70379 6.18907 7.8172 6.07566C8.66776 5.2251 8.66776 4.12342 7.8172 3.27285L6.71146 2.16712C6.58591 2.04156 6.4563 1.91195 6.33479 1.78234C6.09177 1.53123 5.8366 1.27201 5.57333 1.02899C5.18045 0.640159 4.71062 0.433594 4.21648 0.433594C3.72234 0.433594 3.24441 0.640159 2.83938 1.02899C2.83533 1.03304 2.83533 1.03304 2.83128 1.03709L1.45418 2.42634C0.935737 2.94478 0.640065 3.57663 0.57526 4.30973C0.478053 5.49242 0.826379 6.5941 1.0937 7.31505C1.74985 9.08503 2.73002 10.7254 4.19218 12.4832C5.96621 14.6015 8.10072 16.2743 10.539 17.453C11.4706 17.8944 12.714 18.4169 14.1033 18.506C14.1883 18.5101 14.2774 18.5141 14.3584 18.5141C15.2941 18.5141 16.0798 18.178 16.6955 17.5097C16.6995 17.5016 16.7076 17.4975 16.7117 17.4894C16.9223 17.2342 17.1653 17.0034 17.4205 16.7563C17.5946 16.5902 17.7728 16.4161 17.947 16.2338C18.348 15.8166 18.5586 15.3306 18.5586 14.8324C18.5586 14.3302 18.3439 13.8482 17.9348 13.4432L15.7112 11.2114ZM17.1612 15.4764C17.1572 15.4764 17.1572 15.4805 17.1612 15.4764C17.0033 15.6465 16.8413 15.8004 16.6671 15.9705C16.4038 16.2217 16.1365 16.4849 15.8854 16.7806C15.4763 17.218 14.9943 17.4246 14.3625 17.4246C14.3017 17.4246 14.2369 17.4246 14.1762 17.4206C12.9732 17.3436 11.8553 16.8738 11.0169 16.4728C8.72446 15.363 6.71147 13.7874 5.03869 11.7906C3.65754 10.126 2.73407 8.58685 2.12247 6.93433C1.7458 5.9258 1.60809 5.14004 1.66884 4.39884C1.70934 3.92495 1.89161 3.53207 2.22778 3.1959L3.60894 1.81475C3.8074 1.62843 4.01802 1.52717 4.22458 1.52717C4.47975 1.52717 4.68632 1.68109 4.81592 1.8107C4.81997 1.81475 4.82403 1.8188 4.82808 1.82285C5.07514 2.05371 5.31006 2.29268 5.55713 2.54785C5.68269 2.67746 5.8123 2.80707 5.94191 2.94073L7.04764 4.04646C7.47697 4.47579 7.47697 4.87272 7.04764 5.30205C6.93018 5.41951 6.81677 5.53697 6.69931 5.65038C6.35909 5.99871 6.03507 6.32273 5.68269 6.63865C5.67459 6.64675 5.66649 6.6508 5.66244 6.6589C5.31411 7.00723 5.37892 7.34746 5.45182 7.57832C5.45587 7.59047 5.45992 7.60262 5.46397 7.61478C5.75154 8.31143 6.15657 8.96758 6.77222 9.74928L6.77627 9.75333C7.89415 11.1304 9.07279 12.2038 10.3729 13.026C10.539 13.1313 10.7091 13.2163 10.8711 13.2973C11.0169 13.3703 11.1546 13.4391 11.2721 13.512C11.2883 13.5201 11.3045 13.5323 11.3207 13.5404C11.4584 13.6092 11.588 13.6416 11.7217 13.6416C12.0579 13.6416 12.2685 13.431 12.3373 13.3622L13.7225 11.9769C13.8602 11.8392 14.079 11.6732 14.3341 11.6732C14.5852 11.6732 14.7918 11.8311 14.9174 11.9688C14.9214 11.9729 14.9214 11.9729 14.9255 11.9769L17.1572 14.2087C17.5744 14.6218 17.5744 15.0471 17.1612 15.4764Z",fill:"#0E5F8C"}));function se({patientId:c,backButtonLink:S}){const C=R(),f=F(),{checkUserRole:b}=Z(),[u,j]=o.useState(null),{data:t,isLoading:I}=z(c),{data:n,refetch:y}=G(c),L=_().diff(_(t==null?void 0:t.dateOfBirth),"year"),i=o.useMemo(()=>n?n.reduce((r,g)=>{const a=g.servicePrices.reduce((l,d)=>l+d.price,0);return r+a},0):0,[n]);return!t&&!I||!t?null:e.jsxs("div",{className:x(s.root,"container"),children:[e.jsxs("div",{className:s.navigateInfo,children:[e.jsx(M,{to:S??w.patients.records,children:e.jsx(k1,{})}),e.jsx("span",{className:s.name,children:t.fullName}),b("medChief")&&e.jsx(N,{color:"primary-reverse",children:e.jsx(B,{})})]}),e.jsxs("div",{className:x("d-flex",s.blockInfo),children:[e.jsxs("div",{className:s.image,children:[e.jsx(J,{className:s.userImage,defaultImage:t.image}),e.jsx(N,{className:x(s.button,s.buttonSuccess,s.buttonRecord),onClick:()=>C(w.patients.editRecord(c)),children:"Записать"})]}),e.jsxs("div",{className:s.userInfo,children:[e.jsxs("div",{className:s.textInfo,children:[e.jsx("div",{className:s.icon,children:e.jsx(Y1,{})}),t.phone]}),e.jsxs("div",{className:s.textInfo,children:[e.jsx("div",{className:s.icon,children:e.jsx(P1,{})}),t.email]}),e.jsx("div",{className:s.textInfo,children:t.sex}),e.jsxs("div",{className:s.textInfo,children:[_(t.dateOfBirth).format("DD.MM.YYYY")," | ",L," год(а)"]}),e.jsxs("div",{className:s.textInfo,children:["Код клиента: ",t.id]}),e.jsxs("div",{className:x(s.textInfo,s.date),children:["Рег. ",_(t.createdAt).format("DD.MM.YYYY")]})]}),e.jsxs("div",{className:s.userInfo,children:[e.jsx("div",{className:s.textInfo,children:t.country}),e.jsx("div",{className:s.textInfo,children:t.city}),e.jsx("div",{className:s.textInfo,children:t.address}),e.jsxs("div",{className:x(s.textInfo,s.passportNumber),children:["Номер паспорта: ",t.passport]}),e.jsx("div",{className:s.textInfo,children:t.passportIssuingAuthority})]}),t.files?e.jsxs("div",{children:[e.jsx("div",{className:s.textBold,children:"Прикрепленные документы"}),e.jsx("br",{}),e.jsx(K,{id:"patient-info-files",title:"Загрузить",hiddenButton:!0,filesData:t.files})]}):null]}),n==null?void 0:n.map(r=>e.jsxs("div",{className:s.blockInfo,children:[e.jsxs("div",{className:s.recording,children:[e.jsxs("div",{className:x(s.textBold,s.textSuccess,"d-flex"),children:["Запись:",e.jsx("button",{type:"button",onClick:()=>!1,children:e.jsx(B,{})})]}),e.jsxs("div",{className:s.contentInfo,children:[e.jsxs("div",{children:[`${_(r.startTime).format("DD.MM.YYYY")} | ${_(r.startTime).format("HH:mm dddd")}`," "]}),e.jsxs("div",{children:[e.jsx("span",{children:"Стоматолог:"}),e.jsx("span",{className:s.textValue,children:t.user.fullName})]})]})]}),e.jsxs("div",{className:s.recording,children:[e.jsxs("div",{className:x(s.textBold,"d-flex"),children:["Услуги:",e.jsx("button",{type:"button",onClick:()=>{j(r)},children:e.jsx(B,{})})]}),e.jsx("div",{className:s.contentInfo,children:r.servicePrices.map(({price:g,name:a})=>e.jsx("div",{className:s.nameDisease,children:a},`${a}-${g}`))})]}),e.jsxs("div",{className:s.note,children:[e.jsx("div",{className:s.textBold,children:"Жалоба:"}),e.jsx("div",{className:s.contentInfo,children:e.jsx("div",{className:s.noteInfo,children:r.notice})})]}),e.jsxs("div",{className:"d-flex",children:[e.jsx(N,{className:x(s.button,s.buttonSuccess),onClick:()=>!1,children:"В оплату"}),e.jsx(N,{className:x(s.button,s.buttonAttendance),onClick:()=>!1,children:"Неявка"}),e.jsx(N,{className:x(s.button,s.buttonCancel),onClick:()=>!1,children:"Отмена"}),e.jsxs("span",{className:s.priceAll,children:["₽ ",i,"  "]})]})]},r.id)),e.jsxs("div",{className:s.blockInfo,children:[e.jsxs("div",{children:[e.jsx("span",{children:"Всего посещений:"}),e.jsx("span",{className:s.textValue,children:"9"})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Выручка по клиенту:"}),e.jsx("span",{className:s.textValue,children:"$ 22 445"})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Неявки:"}),e.jsx("span",{className:s.textValue,children:"1"})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Отмены:"}),e.jsx("span",{className:s.textValue,children:"2"})]})]}),e.jsx(M,{to:w.reception.info(c,f==null?void 0:f.id),className:s.tableInfo,children:"Таблица приема"}),e.jsx(M,{to:w.medInfo.cards(c),className:s.tableInfo,children:"Медицинская информация"}),e.jsx("div",{className:s.tableInfo,children:"История платажей"}),e.jsx(M,{to:w.patients.files("shared"),className:s.tableInfo,children:"Файлы"}),u&&e.jsx(o1,{record:u,isOpen:!!u,onClose:()=>j(null),onSuccess:()=>{y()}})]})}export{se as P,ee as a};