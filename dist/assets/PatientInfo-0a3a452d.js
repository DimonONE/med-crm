import{l as wt,m as yt,s as ge,n as d,o as Xe,p as Je,r,q as Lt,t as Pt,v as St,w as Mt,x as Rt,y as Et,z as At,A as kt,C as ee,G as qe,D as te,j as e,E as Bt,R as $t,b as Ot,c as j,e as zt,d as R,S as Dt,M as Ft,B as E,Q as Vt,u as Ht,g as Yt,F as Ut,H as se,P as U}from"./index-28b8728f.js";import{T as Wt,a as Zt,I as qt,b as Gt,c as Ge,d as S,e as Kt}from"./index.es-b4da052e.js";import{S as Ke}from"./arrow-bottom-filter-ed2c8b82.js";import{a as Qt}from"./doctorApi-6ee17efe.js";import{a as Xt,b as Jt}from"./patientsApi-6c556a01.js";import{s as C}from"./styles.module-4ec819d1.js";import"./index.esm-7458ef39.js";import{L as es}from"./LoadImage-2fd8a1aa.js";import"./utils-9d128c1d.js";/* empty css               */import{F as ts}from"./FileLoader-a4bb3fb1.js";import"./styles.module-eea2a584.js";import"./styles.module-6fbcb23a.js";import{e as ss}from"./utils-045dd2ef.js";import{S as Qe}from"./close-gray-ico-ce01fa8c.js";import{u as os}from"./servicesApi-3449a3d7.js";import"./styles.module-b235d918.js";import"./styles.module-6cec8057.js";import{P as et}from"./Popper-0206d46a.js";function ns(s){return yt("MuiTooltip",s)}const rs=wt("MuiTooltip",["popper","popperInteractive","popperArrow","popperClose","tooltip","tooltipArrow","touch","tooltipPlacementLeft","tooltipPlacementRight","tooltipPlacementTop","tooltipPlacementBottom","arrow"]),A=rs,as=["arrow","children","classes","components","componentsProps","describeChild","disableFocusListener","disableHoverListener","disableInteractive","disableTouchListener","enterDelay","enterNextDelay","enterTouchDelay","followCursor","id","leaveDelay","leaveTouchDelay","onClose","onOpen","open","placement","PopperComponent","PopperProps","slotProps","slots","title","TransitionComponent","TransitionProps"];function ls(s){return Math.round(s*1e5)/1e5}const is=s=>{const{classes:o,disableInteractive:i,arrow:b,touch:_,placement:f}=s,g={popper:["popper",!i&&"popperInteractive",b&&"popperArrow"],tooltip:["tooltip",b&&"tooltipArrow",_&&"touch",`tooltipPlacement${Xe(f.split("-")[0])}`],arrow:["arrow"]};return Bt(g,ns,o)},cs=ge(et,{name:"MuiTooltip",slot:"Popper",overridesResolver:(s,o)=>{const{ownerState:i}=s;return[o.popper,!i.disableInteractive&&o.popperInteractive,i.arrow&&o.popperArrow,!i.open&&o.popperClose]}})(({theme:s,ownerState:o,open:i})=>d({zIndex:(s.vars||s).zIndex.tooltip,pointerEvents:"none"},!o.disableInteractive&&{pointerEvents:"auto"},!i&&{pointerEvents:"none"},o.arrow&&{[`&[data-popper-placement*="bottom"] .${A.arrow}`]:{top:0,marginTop:"-0.71em","&::before":{transformOrigin:"0 100%"}},[`&[data-popper-placement*="top"] .${A.arrow}`]:{bottom:0,marginBottom:"-0.71em","&::before":{transformOrigin:"100% 0"}},[`&[data-popper-placement*="right"] .${A.arrow}`]:d({},o.isRtl?{right:0,marginRight:"-0.71em"}:{left:0,marginLeft:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"100% 100%"}}),[`&[data-popper-placement*="left"] .${A.arrow}`]:d({},o.isRtl?{left:0,marginLeft:"-0.71em"}:{right:0,marginRight:"-0.71em"},{height:"1em",width:"0.71em","&::before":{transformOrigin:"0 0"}})})),ps=ge("div",{name:"MuiTooltip",slot:"Tooltip",overridesResolver:(s,o)=>{const{ownerState:i}=s;return[o.tooltip,i.touch&&o.touch,i.arrow&&o.tooltipArrow,o[`tooltipPlacement${Xe(i.placement.split("-")[0])}`]]}})(({theme:s,ownerState:o})=>d({backgroundColor:s.vars?s.vars.palette.Tooltip.bg:Je(s.palette.grey[700],.92),borderRadius:(s.vars||s).shape.borderRadius,color:(s.vars||s).palette.common.white,fontFamily:s.typography.fontFamily,padding:"4px 8px",fontSize:s.typography.pxToRem(11),maxWidth:300,margin:2,wordWrap:"break-word",fontWeight:s.typography.fontWeightMedium},o.arrow&&{position:"relative",margin:0},o.touch&&{padding:"8px 16px",fontSize:s.typography.pxToRem(14),lineHeight:`${ls(16/14)}em`,fontWeight:s.typography.fontWeightRegular},{[`.${A.popper}[data-popper-placement*="left"] &`]:d({transformOrigin:"right center"},o.isRtl?d({marginLeft:"14px"},o.touch&&{marginLeft:"24px"}):d({marginRight:"14px"},o.touch&&{marginRight:"24px"})),[`.${A.popper}[data-popper-placement*="right"] &`]:d({transformOrigin:"left center"},o.isRtl?d({marginRight:"14px"},o.touch&&{marginRight:"24px"}):d({marginLeft:"14px"},o.touch&&{marginLeft:"24px"})),[`.${A.popper}[data-popper-placement*="top"] &`]:d({transformOrigin:"center bottom",marginBottom:"14px"},o.touch&&{marginBottom:"24px"}),[`.${A.popper}[data-popper-placement*="bottom"] &`]:d({transformOrigin:"center top",marginTop:"14px"},o.touch&&{marginTop:"24px"})})),ds=ge("span",{name:"MuiTooltip",slot:"Arrow",overridesResolver:(s,o)=>o.arrow})(({theme:s})=>({overflow:"hidden",position:"absolute",width:"1em",height:"0.71em",boxSizing:"border-box",color:s.vars?s.vars.palette.Tooltip.bg:Je(s.palette.grey[700],.9),"&::before":{content:'""',margin:"auto",display:"block",width:"100%",height:"100%",backgroundColor:"currentColor",transform:"rotate(45deg)"}}));let oe=!1,be=null,W={x:0,y:0};function ne(s,o){return i=>{o&&o(i),s(i)}}const us=r.forwardRef(function(o,i){var b,_,f,g,a,w,c,L,N,u,T,x,l,p,m,h,ve,je,_e;const re=Lt({props:o,name:"MuiTooltip"}),{arrow:Ne=!1,children:ae,components:Z={},componentsProps:k={},describeChild:tt=!1,disableFocusListener:st=!1,disableHoverListener:Te=!1,disableInteractive:ot=!1,disableTouchListener:nt=!1,enterDelay:Ie=100,enterNextDelay:we=0,enterTouchDelay:rt=700,followCursor:le=!1,id:at,leaveDelay:ye=0,leaveTouchDelay:lt=1500,onClose:Le,onOpen:Pe,open:it,placement:Se="bottom",PopperComponent:ie,PopperProps:B={},slotProps:$={},slots:q={},title:z,TransitionComponent:ct=qe,TransitionProps:pt}=re,Me=Pt(re,as),P=r.isValidElement(ae)?ae:e.jsx("span",{children:ae}),ce=St(),dt=ce.direction==="rtl",[D,Re]=r.useState(),[pe,ut]=r.useState(null),G=r.useRef(!1),de=ot||le,K=r.useRef(),Q=r.useRef(),O=r.useRef(),Ee=r.useRef(),[mt,Ae]=Mt({controlled:it,default:!1,name:"Tooltip",state:"open"});let y=mt;const ue=Rt(at),F=r.useRef(),X=r.useCallback(()=>{F.current!==void 0&&(document.body.style.WebkitUserSelect=F.current,F.current=void 0),clearTimeout(Ee.current)},[]);r.useEffect(()=>()=>{clearTimeout(K.current),clearTimeout(Q.current),clearTimeout(O.current),X()},[X]);const ke=n=>{clearTimeout(be),oe=!0,Ae(!0),Pe&&!y&&Pe(n)},J=Et(n=>{clearTimeout(be),be=setTimeout(()=>{oe=!1},800+ye),Ae(!1),Le&&y&&Le(n),clearTimeout(K.current),K.current=setTimeout(()=>{G.current=!1},ce.transitions.duration.shortest)}),me=n=>{G.current&&n.type!=="touchstart"||(D&&D.removeAttribute("title"),clearTimeout(Q.current),clearTimeout(O.current),Ie||oe&&we?Q.current=setTimeout(()=>{ke(n)},oe?we:Ie):ke(n))},Be=n=>{clearTimeout(Q.current),clearTimeout(O.current),O.current=setTimeout(()=>{J(n)},ye)},{isFocusVisibleRef:$e,onBlur:ht,onFocus:ft,ref:xt}=At(),[,Oe]=r.useState(!1),ze=n=>{ht(n),$e.current===!1&&(Oe(!1),Be(n))},De=n=>{D||Re(n.currentTarget),ft(n),$e.current===!0&&(Oe(!0),me(n))},Fe=n=>{G.current=!0;const v=P.props;v.onTouchStart&&v.onTouchStart(n)},Ve=me,He=Be,bt=n=>{Fe(n),clearTimeout(O.current),clearTimeout(K.current),X(),F.current=document.body.style.WebkitUserSelect,document.body.style.WebkitUserSelect="none",Ee.current=setTimeout(()=>{document.body.style.WebkitUserSelect=F.current,me(n)},rt)},Ct=n=>{P.props.onTouchEnd&&P.props.onTouchEnd(n),X(),clearTimeout(O.current),O.current=setTimeout(()=>{J(n)},lt)};r.useEffect(()=>{if(!y)return;function n(v){(v.key==="Escape"||v.key==="Esc")&&J(v)}return document.addEventListener("keydown",n),()=>{document.removeEventListener("keydown",n)}},[J,y]);const gt=kt(P.ref,xt,Re,i);!z&&z!==0&&(y=!1);const he=r.useRef(),vt=n=>{const v=P.props;v.onMouseMove&&v.onMouseMove(n),W={x:n.clientX,y:n.clientY},he.current&&he.current.update()},V={},fe=typeof z=="string";tt?(V.title=!y&&fe&&!Te?z:null,V["aria-describedby"]=y?ue:null):(V["aria-label"]=fe?z:null,V["aria-labelledby"]=y&&!fe?ue:null);const I=d({},V,Me,P.props,{className:ee(Me.className,P.props.className),onTouchStart:Fe,ref:gt},le?{onMouseMove:vt}:{}),H={};nt||(I.onTouchStart=bt,I.onTouchEnd=Ct),Te||(I.onMouseOver=ne(Ve,I.onMouseOver),I.onMouseLeave=ne(He,I.onMouseLeave),de||(H.onMouseOver=Ve,H.onMouseLeave=He)),st||(I.onFocus=ne(De,I.onFocus),I.onBlur=ne(ze,I.onBlur),de||(H.onFocus=De,H.onBlur=ze));const jt=r.useMemo(()=>{var n;let v=[{name:"arrow",enabled:!!pe,options:{element:pe,padding:4}}];return(n=B.popperOptions)!=null&&n.modifiers&&(v=v.concat(B.popperOptions.modifiers)),d({},B.popperOptions,{modifiers:v})},[pe,B]),Y=d({},re,{isRtl:dt,arrow:Ne,disableInteractive:de,placement:Se,PopperComponentProp:ie,touch:G.current}),xe=is(Y),Ye=(b=(_=q.popper)!=null?_:Z.Popper)!=null?b:cs,Ue=(f=(g=(a=q.transition)!=null?a:Z.Transition)!=null?g:ct)!=null?f:qe,We=(w=(c=q.tooltip)!=null?c:Z.Tooltip)!=null?w:ps,Ze=(L=(N=q.arrow)!=null?N:Z.Arrow)!=null?L:ds,_t=te(Ye,d({},B,(u=$.popper)!=null?u:k.popper,{className:ee(xe.popper,B==null?void 0:B.className,(T=(x=$.popper)!=null?x:k.popper)==null?void 0:T.className)}),Y),Nt=te(Ue,d({},pt,(l=$.transition)!=null?l:k.transition),Y),Tt=te(We,d({},(p=$.tooltip)!=null?p:k.tooltip,{className:ee(xe.tooltip,(m=(h=$.tooltip)!=null?h:k.tooltip)==null?void 0:m.className)}),Y),It=te(Ze,d({},(ve=$.arrow)!=null?ve:k.arrow,{className:ee(xe.arrow,(je=(_e=$.arrow)!=null?_e:k.arrow)==null?void 0:je.className)}),Y);return e.jsxs(r.Fragment,{children:[r.cloneElement(P,I),e.jsx(Ye,d({as:ie??et,placement:Se,anchorEl:le?{getBoundingClientRect:()=>({top:W.y,left:W.x,right:W.x,bottom:W.y,width:0,height:0})}:D,popperRef:he,open:D?y:!1,id:ue,transition:!0},H,_t,{popperOptions:jt,children:({TransitionProps:n})=>e.jsx(Ue,d({timeout:ce.transitions.duration.shorter},n,Nt,{children:e.jsxs(We,d({},Tt,{children:[z,Ne?e.jsx(Ze,d({},It,{ref:ut})):null]}))}))}))]})}),ms=us,hs="_tableCellItem_o5dqw_1",fs="_statusInfo_o5dqw_8",xs="_status_o5dqw_8",bs="_cancel_o5dqw_17",Cs="_date_o5dqw_20",gs="_name_o5dqw_23",M={tableCellItem:hs,statusInfo:fs,status:xs,cancel:bs,date:Cs,name:gs},xo=$t.forwardRef((s,o)=>{const[,i]=Ot(),[b,_]=r.useState("ASC"),{patientList:f,dataLength:g,hasNextPage:a,handleUpdateFilters:w,handleFetchNextPage:c,onScroll:L}=s,N=u=>{u==="sortBy"&&_(T=>T==="ASC"?"DESC":"ASC")};return r.useEffect(()=>{const u={sortBy:b},T=new URLSearchParams;Object.entries(u).forEach(([x,l])=>{l!=null&&T.set(x,l)}),i(T),w(u)},[b]),f.length?e.jsx("div",{className:j(M.root,"container"),children:e.jsx(Wt,{id:"all-patient-table",ref:o,className:"table-container",onScroll:L,component:zt,children:e.jsx(Zt,{sx:{minWidth:850},"aria-label":"simple table",children:e.jsxs(qt,{scrollableTarget:"all-patient-table",next:c,hasMore:a||!1,loader:null,dataLength:g,children:[e.jsx(Gt,{children:e.jsxs(Ge,{children:[e.jsx(S,{width:"auto",sx:{minWidth:180},className:"table-head-cell",onClick:()=>N("sortBy"),children:e.jsxs("span",{className:M.tableCellItem,children:["ДАТА РОЖ.",e.jsx(Ke,{})]})}),e.jsx(S,{width:"auto",sx:{minWidth:360},className:"table-head-cell",children:"СТАТУС И ДАТА ЗАПИСИ"}),e.jsx(S,{width:"auto",sx:{minWidth:180},className:"table-head-cell",children:"ТЕЛЕФОН"}),e.jsx(S,{width:"100%",className:"table-head-cell",onClick:()=>N("reminder"),children:e.jsxs("span",{className:M.tableCellItem,children:["НАПОМИНАНИЕ",e.jsx(Ke,{})]})})]})}),e.jsx(Kt,{children:f.map(u=>e.jsxs(Ge,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[e.jsx(S,{className:"table-body-cell",component:"th",scope:"row",children:R(u.createdAt).format("DD.MM.YYYY")}),e.jsx(S,{className:"table-body-cell",component:"th",scope:"row",children:e.jsxs("div",{className:M.statusInfo,children:[e.jsx("div",{className:j(M.status,{[M.cancel]:u.status!=="active"}),children:u.status==="active"?"Запись завершена":"Запись отменена"}),e.jsx("div",{className:M.date,children:R(u.createdAt).format("DD.MM.YYYY dd HH:mm")}),e.jsx("div",{className:M.name,children:u.fullName})]})}),e.jsx(S,{className:"table-body-cell",children:u.phone}),e.jsx(S,{className:"table-body-cell"})]},u.createdAt))})]})})})}):null});function vs(s){const{isOpen:o,record:i,onSuccess:b,onClose:_}=s,[f,g]=r.useState([]),[a,w]=r.useState([]),{data:c}=os(),{mutate:L}=Xt(),N=f.reduce((l,p)=>l+p.price,0),u=l=>{const p=c==null?void 0:c.find(({id:h})=>l===h),m=a.filter(({value:h})=>l!==h);p&&(g(h=>[...h,p]),w(m))},T=l=>{const p=f.filter(({id:h})=>l!==h),m=c==null?void 0:c.find(({id:h})=>l===h);g(p),m&&w(h=>[...h,{value:m.id,label:m.name}])},x=()=>{const l=f.map(({name:m,price:h})=>({price:h,name:m})),p={id:i.id,userId:i.userId,startTime:i.startTime,endTime:i.endTime,notice:i.notice??"",servicePrices:l};L(p,{onSuccess:()=>{b({services:f}),_()},onError:m=>{Vt(ss(m),{type:"error"})}})};return r.useEffect(()=>{const l=c?[{value:-1,label:"Выберите услугу"},...c.map(({id:p,name:m})=>({value:p,label:m}))]:[];w(l),g([])},[c,o]),!o||!a.length?null:e.jsx("div",{className:C.root,children:e.jsxs("div",{className:C.modal,children:[e.jsx("button",{type:"button",className:C.modalCloseButton,onClick:_,children:e.jsx(Qe,{})}),e.jsxs("div",{children:[e.jsx("span",{className:C.title,children:"Добавить услуги"}),e.jsx(Dt,{value:-1,onChange:l=>u(l.target.value),className:j("form-input",C.dropdown),selectOptions:a,children:a.map(({label:l,value:p})=>e.jsx(Ft,{value:p,children:l},p))}),e.jsx("div",{className:C.servicesList,children:f.map(({id:l,price:p,name:m})=>e.jsxs("div",{className:C.servicesItem,children:[e.jsxs("span",{className:C.price,children:["₽ ",p]}),e.jsx("span",{className:C.info,children:m}),e.jsx(E,{color:"primary-reverse",onClick:()=>T(l),children:e.jsx(Qe,{})})]},l))})]}),e.jsxs("div",{className:C.priceAll,children:["₽ ",N," ",e.jsx("span",{className:C.priceText,children:"Вся сумма"})," "]}),e.jsxs("div",{className:C.buttonsSubmit,children:[e.jsx(E,{color:"secondary",className:C.button,onClick:_,children:"Отмена"}),e.jsx(E,{className:C.button,onClick:x,children:"Применить"})]})]})})}const js="_root_zgboi_1",_s="_navigateInfo_zgboi_11",Ns="_name_zgboi_16",Ts="_blockInfo_zgboi_24",Is="_textBold_zgboi_35",ws="_textSuccess_zgboi_39",ys="_textValue_zgboi_43",Ls="_image_zgboi_48",Ps="_userImage_zgboi_53",Ss="_buttonSuccess_zgboi_56",Ms="_buttonCancel_zgboi_57",Rs="_userInfo_zgboi_68",Es="_textInfo_zgboi_91",As="_icon_zgboi_96",ks="_date_zgboi_100",Bs="_passportNumber_zgboi_103",$s="_recording_zgboi_107",Os="_contentInfo_zgboi_107",zs="_note_zgboi_107",Ds="_nameDisease_zgboi_115",Fs="_noteInfo_zgboi_119",Vs="_priceAll_zgboi_123",Hs="_button_zgboi_56",Ys="_buttonAttendance_zgboi_141",Us="_tableInfo_zgboi_162",Ws="_disabled_zgboi_175",t={root:js,navigateInfo:_s,name:Ns,blockInfo:Ts,textBold:Is,textSuccess:ws,textValue:ys,image:Ls,userImage:Ps,buttonSuccess:Ss,buttonCancel:Ms,userInfo:Rs,textInfo:Es,icon:As,date:ks,passportNumber:Bs,recording:$s,contentInfo:Os,note:zs,nameDisease:Ds,noteInfo:Fs,priceAll:Vs,button:Hs,buttonAttendance:Ys,tableInfo:Us,disabled:Ws},Zs=s=>r.createElement("svg",{width:26,height:19,viewBox:"0 0 26 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s},r.createElement("path",{d:"M0.979308 9.6363L8.39534 17.8763C8.55355 18.051 8.77438 18.1499 9.00839 18.1499L13.9524 18.1499C14.2771 18.1499 14.5721 17.9587 14.7056 17.6621C14.8374 17.3638 14.783 17.0161 14.5655 16.7755L7.64549 9.08587L14.5655 1.39792C14.783 1.15566 14.839 0.807932 14.7056 0.511291C14.5721 0.213001 14.2771 0.0218334 13.9524 0.0218333L9.0084 0.0218329C8.77438 0.0218329 8.55355 0.12236 8.39534 0.293754L0.979308 8.53378C0.697499 8.84691 0.697499 9.32483 0.979308 9.6363Z",fill:"#876AFF"}),r.createElement("path",{d:"M11.6912 9.6363L19.1073 17.8763C19.2655 18.051 19.4863 18.1499 19.7203 18.1499L24.6643 18.1499C24.989 18.1499 25.284 17.9587 25.4175 17.6621C25.5493 17.3638 25.4949 17.0161 25.2774 16.7755L18.3574 9.08587L25.2774 1.39792C25.4949 1.15566 25.551 0.807932 25.4175 0.511291C25.284 0.213001 24.989 0.0218334 24.6643 0.0218333L19.7203 0.0218329C19.4863 0.0218329 19.2655 0.12236 19.1073 0.293754L11.6912 8.53378C11.4094 8.84691 11.4094 9.32483 11.6912 9.6363Z",fill:"#876AFF"})),Ce=s=>r.createElement("svg",{width:23,height:22,viewBox:"0 0 23 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s},r.createElement("path",{d:"M17.2511 14.0119C16.6666 14.0119 16.1942 14.4844 16.1942 15.0688V18.3888C16.1942 18.9722 15.7207 19.4457 15.1373 19.4457H3.51069C2.92724 19.4457 2.45376 18.9722 2.45376 18.3888V4.64834C2.45376 4.06489 2.92728 3.59141 3.51069 3.59141H9.6516C10.2361 3.59141 10.7085 3.11895 10.7085 2.53447C10.7085 1.95 10.2361 1.47754 9.6516 1.47754H3.51069C1.76249 1.47745 0.339844 2.90014 0.339844 4.64834V18.3888C0.339844 20.137 1.76249 21.5596 3.51069 21.5596H15.1372C16.8854 21.5596 18.308 20.138 18.308 18.3888V15.0689C18.3081 14.4844 17.8356 14.0119 17.2511 14.0119Z",fill:"#229CE1"}),r.createElement("path",{d:"M20.9155 1.34331C20.1481 0.57598 19.1461 0.189105 18.1367 0.167985C17.0745 0.144741 16.0059 0.529448 15.2026 1.33379L8.04701 8.4894C7.00273 9.53792 6.42773 10.9289 6.42773 12.4065V14.774C6.42773 15.3585 6.90019 15.831 7.48467 15.831H9.85223C11.3299 15.831 12.7208 15.256 13.7704 14.2106L20.9164 7.06454C22.4913 5.4887 22.4913 2.9203 20.9155 1.34331ZM12.277 12.7151C11.629 13.3609 10.7666 13.7171 9.85232 13.7171H8.54165V12.4065C8.54165 11.4922 8.89784 10.6297 9.54257 9.98288L14.2598 5.26568L16.993 7.99896L12.277 12.7151ZM19.4209 5.57114L18.4876 6.50445L15.7543 3.77118L16.6876 2.8379C17.4423 2.08323 18.6683 2.08536 19.4209 2.8379C20.1735 3.59147 20.1735 4.81753 19.4209 5.57114Z",fill:"#229CE1"})),qs=s=>r.createElement("svg",{width:19,height:13,viewBox:"0 0 19 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s},r.createElement("path",{d:"M16.9766 0.180664H2.14062C1.26654 0.180664 0.558594 0.893 0.558594 1.7627V11.2549C0.558594 12.1297 1.27174 12.8369 2.14062 12.8369H16.9766C17.8433 12.8369 18.5586 12.1327 18.5586 11.2549V1.7627C18.5586 0.894547 17.8535 0.180664 16.9766 0.180664ZM16.755 1.23535C16.4318 1.55686 10.8693 7.09003 10.6773 7.28107C10.3784 7.5799 9.98117 7.74443 9.55859 7.74443C9.13602 7.74443 8.73875 7.57986 8.43894 7.28008C8.30977 7.15159 2.8087 1.67952 2.36218 1.23535H16.755ZM1.61328 11.0402V1.97803L6.17087 6.5116L1.61328 11.0402ZM2.36285 11.7822L6.91864 7.2554L7.69415 8.02684C8.19218 8.52486 8.85431 8.79911 9.55859 8.79911C10.2629 8.79911 10.925 8.52486 11.4221 8.02782L12.1985 7.2554L16.7543 11.7822H2.36285ZM17.5039 11.0402L12.9463 6.5116L17.5039 1.97803V11.0402Z",fill:"#0E5F8C"})),Gs=s=>r.createElement("svg",{width:19,height:19,viewBox:"0 0 19 19",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s},r.createElement("path",{d:"M15.7112 11.2114C15.3184 10.8024 14.8445 10.5836 14.3422 10.5836C13.844 10.5836 13.3661 10.7983 12.957 11.2074L11.6771 12.4832C11.5718 12.4265 11.4665 12.3739 11.3653 12.3212C11.2194 12.2483 11.0817 12.1795 10.9643 12.1066C9.76539 11.3451 8.67586 10.3528 7.63088 9.06883C7.1246 8.42889 6.78437 7.8902 6.5373 7.3434C6.86943 7.03963 7.17725 6.72371 7.47697 6.41994C7.59038 6.30653 7.70379 6.18907 7.8172 6.07566C8.66776 5.2251 8.66776 4.12342 7.8172 3.27285L6.71146 2.16712C6.58591 2.04156 6.4563 1.91195 6.33479 1.78234C6.09177 1.53123 5.8366 1.27201 5.57333 1.02899C5.18045 0.640159 4.71062 0.433594 4.21648 0.433594C3.72234 0.433594 3.24441 0.640159 2.83938 1.02899C2.83533 1.03304 2.83533 1.03304 2.83128 1.03709L1.45418 2.42634C0.935737 2.94478 0.640065 3.57663 0.57526 4.30973C0.478053 5.49242 0.826379 6.5941 1.0937 7.31505C1.74985 9.08503 2.73002 10.7254 4.19218 12.4832C5.96621 14.6015 8.10072 16.2743 10.539 17.453C11.4706 17.8944 12.714 18.4169 14.1033 18.506C14.1883 18.5101 14.2774 18.5141 14.3584 18.5141C15.2941 18.5141 16.0798 18.178 16.6955 17.5097C16.6995 17.5016 16.7076 17.4975 16.7117 17.4894C16.9223 17.2342 17.1653 17.0034 17.4205 16.7563C17.5946 16.5902 17.7728 16.4161 17.947 16.2338C18.348 15.8166 18.5586 15.3306 18.5586 14.8324C18.5586 14.3302 18.3439 13.8482 17.9348 13.4432L15.7112 11.2114ZM17.1612 15.4764C17.1572 15.4764 17.1572 15.4805 17.1612 15.4764C17.0033 15.6465 16.8413 15.8004 16.6671 15.9705C16.4038 16.2217 16.1365 16.4849 15.8854 16.7806C15.4763 17.218 14.9943 17.4246 14.3625 17.4246C14.3017 17.4246 14.2369 17.4246 14.1762 17.4206C12.9732 17.3436 11.8553 16.8738 11.0169 16.4728C8.72446 15.363 6.71147 13.7874 5.03869 11.7906C3.65754 10.126 2.73407 8.58685 2.12247 6.93433C1.7458 5.9258 1.60809 5.14004 1.66884 4.39884C1.70934 3.92495 1.89161 3.53207 2.22778 3.1959L3.60894 1.81475C3.8074 1.62843 4.01802 1.52717 4.22458 1.52717C4.47975 1.52717 4.68632 1.68109 4.81592 1.8107C4.81997 1.81475 4.82403 1.8188 4.82808 1.82285C5.07514 2.05371 5.31006 2.29268 5.55713 2.54785C5.68269 2.67746 5.8123 2.80707 5.94191 2.94073L7.04764 4.04646C7.47697 4.47579 7.47697 4.87272 7.04764 5.30205C6.93018 5.41951 6.81677 5.53697 6.69931 5.65038C6.35909 5.99871 6.03507 6.32273 5.68269 6.63865C5.67459 6.64675 5.66649 6.6508 5.66244 6.6589C5.31411 7.00723 5.37892 7.34746 5.45182 7.57832C5.45587 7.59047 5.45992 7.60262 5.46397 7.61478C5.75154 8.31143 6.15657 8.96758 6.77222 9.74928L6.77627 9.75333C7.89415 11.1304 9.07279 12.2038 10.3729 13.026C10.539 13.1313 10.7091 13.2163 10.8711 13.2973C11.0169 13.3703 11.1546 13.4391 11.2721 13.512C11.2883 13.5201 11.3045 13.5323 11.3207 13.5404C11.4584 13.6092 11.588 13.6416 11.7217 13.6416C12.0579 13.6416 12.2685 13.431 12.3373 13.3622L13.7225 11.9769C13.8602 11.8392 14.079 11.6732 14.3341 11.6732C14.5852 11.6732 14.7918 11.8311 14.9174 11.9688C14.9214 11.9729 14.9214 11.9729 14.9255 11.9769L17.1572 14.2087C17.5744 14.6218 17.5744 15.0471 17.1612 15.4764Z",fill:"#0E5F8C"}));function bo({patientId:s,backButtonLink:o}){const i=Ht(),b=Yt(),{checkUserRole:_}=Ut(),[f,g]=r.useState(null),{data:a,isLoading:w}=Jt(s),{data:c,refetch:L}=Qt(s),N=(c==null?void 0:c.length)!==0,u=R().diff(R(a==null?void 0:a.dateOfBirth),"year"),T=r.useMemo(()=>c?c.reduce((x,l)=>{const p=l.servicePrices.reduce((m,h)=>m+h.price,0);return x+p},0):0,[c]);return!a&&!w||!a?null:e.jsxs("div",{className:j(t.root,"container"),children:[e.jsxs("div",{className:t.navigateInfo,children:[e.jsx(se,{to:o??U.patients.records,children:e.jsx(Zs,{})}),e.jsx("span",{className:t.name,children:a.fullName}),_("medChief")&&e.jsx(E,{color:"primary-reverse",children:e.jsx(Ce,{})})]}),e.jsxs("div",{className:j("d-flex",t.blockInfo),children:[e.jsxs("div",{className:t.image,children:[e.jsx(es,{className:t.userImage,defaultImage:a.image}),e.jsx(E,{className:j(t.button,t.buttonSuccess,t.buttonRecord),onClick:()=>i(U.patients.editRecord(s)),children:"Записать"})]}),e.jsxs("div",{className:t.userInfo,children:[e.jsxs("div",{className:t.textInfo,children:[e.jsx("div",{className:t.icon,children:e.jsx(Gs,{})}),a.phone]}),e.jsxs("div",{className:t.textInfo,children:[e.jsx("div",{className:t.icon,children:e.jsx(qs,{})}),a.email]}),e.jsx("div",{className:t.textInfo,children:a.sex}),e.jsxs("div",{className:t.textInfo,children:[R(a.dateOfBirth).format("DD.MM.YYYY")," | ",u," ","год(а)"]}),e.jsxs("div",{className:t.textInfo,children:["Код клиента: ",a.id]}),e.jsxs("div",{className:j(t.textInfo,t.date),children:["Рег. ",R(a.createdAt).format("DD.MM.YYYY")]})]}),e.jsxs("div",{className:t.userInfo,children:[e.jsx("div",{className:t.textInfo,children:a.country}),e.jsx("div",{className:t.textInfo,children:a.city}),e.jsx("div",{className:t.textInfo,children:a.address}),e.jsxs("div",{className:j(t.textInfo,t.passportNumber),children:["Номер паспорта: ",a.passport]}),e.jsx("div",{className:t.textInfo,children:a.passportIssuingAuthority})]}),a.files?e.jsxs("div",{children:[e.jsx("div",{className:t.textBold,children:"Прикрепленные документы"}),e.jsx("br",{}),e.jsx(ts,{id:"patient-info-files",title:"Загрузить",hiddenButton:!0,filesData:a.files})]}):null]}),c==null?void 0:c.map(x=>e.jsxs("div",{className:t.blockInfo,children:[e.jsxs("div",{className:t.recording,children:[e.jsxs("div",{className:j(t.textBold,t.textSuccess,"d-flex"),children:["Запись:",e.jsx("button",{type:"button",onClick:()=>!1,children:e.jsx(Ce,{})})]}),e.jsxs("div",{className:t.contentInfo,children:[e.jsxs("div",{children:[`${R(x.startTime).format("DD.MM.YYYY")} | ${R(x.startTime).format("HH:mm dddd")}`," "]}),e.jsxs("div",{children:[e.jsx("span",{children:"Стоматолог:"}),e.jsx("span",{className:t.textValue,children:a.user.fullName})]})]})]}),e.jsxs("div",{className:t.recording,children:[e.jsxs("div",{className:j(t.textBold,"d-flex"),children:["Услуги:",e.jsx("button",{type:"button",onClick:()=>{g(x)},children:e.jsx(Ce,{})})]}),e.jsx("div",{className:t.contentInfo,children:x.servicePrices.map(({price:l,name:p})=>e.jsx("div",{className:t.nameDisease,children:p},`${p}-${l}`))})]}),e.jsxs("div",{className:t.note,children:[e.jsx("div",{className:t.textBold,children:"Жалоба:"}),e.jsx("div",{className:t.contentInfo,children:e.jsx("div",{className:t.noteInfo,children:x.notice})})]}),e.jsxs("div",{className:"d-flex",children:[e.jsx(E,{className:j(t.button,t.buttonSuccess),onClick:()=>!1,children:"В оплату"}),e.jsx(E,{className:j(t.button,t.buttonAttendance),onClick:()=>!1,children:"Неявка"}),e.jsx(E,{className:j(t.button,t.buttonCancel),onClick:()=>!1,children:"Отмена"}),e.jsxs("span",{className:t.priceAll,children:["₽ ",T," "]})]})]},x.id)),e.jsxs("div",{className:t.blockInfo,children:[e.jsxs("div",{children:[e.jsx("span",{children:"Всего посещений:"}),e.jsx("span",{className:t.textValue,children:"9"})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Выручка по клиенту:"}),e.jsx("span",{className:t.textValue,children:"$ 22 445"})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Неявки:"}),e.jsx("span",{className:t.textValue,children:"1"})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Отмены:"}),e.jsx("span",{className:t.textValue,children:"2"})]})]}),e.jsx(ms,{title:N?"":"Нет доступных записей",placement:"left",children:e.jsx("span",{children:e.jsx(se,{to:N?U.reception.info(s,b==null?void 0:b.id):"#",className:`${t.tableInfo} ${N?"":t.disabled}`,onClick:x=>!N&&x.preventDefault(),children:"Таблица приема"})})}),e.jsx(se,{to:U.medInfo.cards(s),className:t.tableInfo,children:"Медицинская информация"}),e.jsx("div",{className:t.tableInfo,children:"История платажей"}),e.jsx(se,{to:U.patients.files("shared"),className:t.tableInfo,children:"Файлы"}),f&&e.jsx(vs,{record:f,isOpen:!!f,onClose:()=>g(null),onSuccess:()=>{L()}})]})}export{bo as P,xo as a};