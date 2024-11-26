import{r as w,j as e,f as z,u as W,k as Y,P as q,Q as G,c as h,M as J,R as Q,B as K,d as Z,S as ee,I as te,i as j}from"./index-b7b75947.js";import{U as ne,C as oe}from"./Checkbox-a3d8c858.js";import"./styles.module-60436982.js";import{e as se}from"./utils-045dd2ef.js";import"./styles.module-eea2a584.js";import{M as ae}from"./Modal-60b947f0.js";import{D as re}from"./DatePicker-7916f172.js";import{l as le}from"./lodash-407105e9.js";import{u as $}from"./useMutation-3de9e6b6.js";import{u as F}from"./useQuery-00968507.js";import{C as ce}from"./CardsNavigate-18257e72.js";import{S as ie}from"./services-ico-6c43c8eb.js";var H=(t=>(t.ALL="all",t.PERIODONTICS="4",t.THERAPY="5",t.SURGERY="6",t.ORTHOPEDICS="7",t.OTHER="1",t))(H||{});const de={1:"Другое",4:"Пародонтология",5:"Терапия",6:"Хирургия",7:"Ортопедия"},ue="_root_1modc_1",pe={root:ue},me=w.memo(({templateId:t,onDeleteTemplate:a})=>e.jsxs(e.Fragment,{children:[e.jsx(z,{onClick:()=>!1,children:"Просмотр"}),e.jsx(z,{onClick:()=>!1,children:"Копировать"}),e.jsx(z,{onClick:()=>!1,children:"Копировать все"}),e.jsx(z,{onClick:()=>!1,children:"Вставить"}),e.jsx(z,{onClick:()=>!1,children:"Переименовать"}),e.jsx(z,{onClick:()=>a(t),children:"Удалить"})]}));function Lt({id:t,onNavigate:a}){const{data:s,refetch:r}=xt({offset:0,limit:100,category:t===H.ALL?"":de[t]??""}),{mutate:l}=yt(),f=W(),{checkUserRole:u}=Y(),p=u("superAdmin"),m=w.useMemo(()=>s!=null&&s.data.length?s.data.map(({id:k,name:C})=>({id:k,title:C??"",ico:e.jsx(ie,{}),link:q.template.preview(t,k==null?void 0:k.toString())})):[],[s]),I=k=>{k.preventDefault(),k.stopPropagation(),alert("onCopy")},B=({link:k,id:C})=>{if(u("superAdmin")){f(k);return}a&&a(C)},_=w.useCallback(k=>{l(k,{onSuccess:()=>{G("Success!",{type:"success"}),r()},onError:C=>{G(se(C),{type:"error"})}})},[l]),b=w.useCallback(k=>e.jsx(me,{templateId:k,onDeleteTemplate:_}),[_]);return e.jsx(ce,{className:pe.root,cards:m,hasCopy:p,onCopy:I,onClick:B,menuItems:p?b:void 0})}const _e="_modalContent_kcoom_1",ke="_headBlock_kcoom_1",he="_inputBlock_kcoom_6",fe="_dropdownBlock_kcoom_15",be="_dropdown_kcoom_15",ge="_buttonBlock_kcoom_30",Ie="_modal_kcoom_1",Pt={modalContent:_e,headBlock:ke,inputBlock:he,dropdownBlock:fe,dropdown:be,buttonBlock:ge,modal:Ie},Be="_root_1t3c7_2",xe="_selectItem_1t3c7_6",ye="_circle_1t3c7_15",ve="_right_1t3c7_44",U={root:Be,selectItem:xe,circle:ye,right:ve};function N(t){const[a,s]=w.useState(!1),r=w.useRef(null),{children:l,preview:f,className:u,positionParams:p,onDelete:m,onEdit:I,onUpdate:B}=t,[_,b]=w.useState({element:null,offsetX:0}),k=le.debounce(i=>{B&&B({sizeX:i})},200),C=i=>{if(r.current){const g=r.current.getBoundingClientRect(),y=i.clientX,X=r.current.offsetWidth,o=y-g.left<=20,T=g.right-y<=20;if(o||T){const S=R=>{const A=R.clientX-y;let P;o?(P=X-A,r.current.style.left=`${g.left+A}px`):T&&(P=X+A),P&&P>0&&(r.current.style.width=`${P}px`,k(P))},L=()=>{document.removeEventListener("mousemove",S),document.removeEventListener("mouseup",L)};document.addEventListener("mousemove",S),document.addEventListener("mouseup",L)}}},E=()=>{s(!0)},O=i=>{b(i)},x=i=>{var g;i.preventDefault(),O({element:i.currentTarget,offsetX:"clientX"in i?((g=r.current)==null?void 0:g.clientWidth)??0/2:0})},c=i=>{i.key==="Enter"?E():(i.key==="ContextMenu"||i.shiftKey&&i.key==="F10")&&x(i)},D=()=>{s(!1)},v=()=>{b({element:null,offsetX:0})},M={...(p==null?void 0:p.sizeX)&&{width:p.sizeX}};return f?e.jsx("div",{style:M,className:u,children:l}):e.jsxs("div",{className:U.root,style:M,children:[e.jsxs("div",{ref:r,onClick:E,tabIndex:0,onMouseDown:C,onBlur:D,onKeyDown:c,onContextMenu:x,role:"button",className:h(u,{[U.selectItem]:a}),children:[l,e.jsx("div",{className:U.right})]}),_.element&&e.jsxs(J,{anchorEl:_.element,open:!!_.element,onClose:v,anchorPosition:{top:0,left:0},style:{marginLeft:_.offsetX/2,marginTop:-20},children:[I&&e.jsx(z,{onClick:()=>{I(),v()},children:"Редактировать"}),e.jsx(z,{onClick:()=>{m(),v()},children:"Удалить"})]})]})}const we="_defaultInput_lipk0_2",Ce="_selectItem_lipk0_19",Te="_createItem_lipk0_20",je="_circle_lipk0_29",Ne="_right_lipk0_63",ze="_lineContent_lipk0_96",Se="_preview_lipk0_104",Ee="_text_lipk0_107",$e="_bold_lipk0_110",Oe="_inputBlock_lipk0_113",De="_list_lipk0_123",Le="_radioBlock_lipk0_132",Pe="_radioButton_lipk0_132",Re="_checked_lipk0_141",Me="_dropdown_lipk0_158",Xe="_empty_lipk0_166",Fe="_checkbox_lipk0_170",Ae="_modalDropdown_lipk0_177",Ke="_headBlock_lipk0_177",Ue="_deleteButton_lipk0_187",Ve="_createVariable_lipk0_198",Ge="_createVariablePlus_lipk0_206",He="_buttonBlock_lipk0_217",We="_modal_lipk0_177",n={defaultInput:we,selectItem:Ce,createItem:Te,circle:je,right:Ne,lineContent:ze,preview:Se,text:Ee,bold:$e,inputBlock:Oe,list:De,radioBlock:Le,radioButton:Pe,checked:Re,dropdown:Me,empty:Xe,checkbox:Fe,modalDropdown:Ae,headBlock:Ke,deleteButton:Ue,createVariable:Ve,createVariablePlus:Ge,buttonBlock:He,modal:We},Rt=Q.memo(t=>{const{onCurrentBlockInfo:a,onToggleVisibility:s,updateTemplatesLineItem:r,updateCurrentBlock:l}=Ye(),f=w.useRef(null),[u,p]=w.useState(""),[m,I]=w.useState(!1),[B,_]=w.useState(!1),[b,k]=w.useState([{id:0,value:-1,label:""}]),{subTemplateId:C,bodyBlockId:E,lineId:O,status:x,type:c="create",value:D,...v}=t,M=()=>{s(!0),a(C,E,O)},i=o=>{p(o),l(C,E,O,{value:o.toString(),...x==="DROPDOWN"&&{value:JSON.stringify(b)}})},g=()=>{r(C,E,O)},y=o=>{l(C,E,O,o)};w.useEffect(()=>{var o;if(D&&p(D),D&&x==="DROPDOWN"){const T=JSON.parse(D??"");k(T),p((o=T[0])==null?void 0:o.value)}},[]);const X=()=>{switch(!0){case x==="TEXT":return e.jsx(N,{positionParams:v,preview:c==="preview",onUpdate:y,onDelete:g,className:h(n.lineContent,{[n.preview]:c==="preview"}),children:e.jsx("div",{className:n.inputBlock,children:e.jsx("input",{readOnly:c==="preview",className:h(n.defaultInput,n.text),value:u,onChange:o=>i(o.target.value)})})});case x==="BOLD_TEXT":return e.jsx(N,{positionParams:v,preview:c==="preview",onUpdate:y,onDelete:g,className:h(n.lineContent,{[n.preview]:c==="preview"}),children:e.jsx("div",{className:n.inputBlock,children:e.jsx("input",{readOnly:c==="preview",className:h(n.defaultInput,n.bold),value:u,onChange:o=>i(o.target.value)})})});case x==="POINT_TEXT":return e.jsx(N,{positionParams:v,preview:c==="preview",onUpdate:y,onDelete:g,className:h(n.lineContent,{[n.preview]:c==="preview"}),children:e.jsx("li",{className:n.list,children:e.jsx("div",{className:n.inputBlock,children:e.jsx("input",{readOnly:c==="preview",className:h(n.defaultInput),value:u,onChange:o=>i(o.target.value)})})})});case x==="DROPDOWN":return e.jsx(N,{positionParams:v,onUpdate:y,preview:c==="preview",onEdit:()=>_(!0),onDelete:g,className:h(n.lineContent,{[n.preview]:c==="preview"}),children:e.jsx(ee,{value:u||-1,onChange:o=>i(o.target.value),className:n.dropdown,selectNavigate:!0,selectOptions:b,children:b.map(({label:o,value:T})=>e.jsx(z,{value:T,className:"select-link",children:o},T))})});case x==="CHECK_BOX":return e.jsx(N,{positionParams:v,onUpdate:y,preview:c==="preview",onDelete:g,className:h(n.lineContent,{[n.preview]:c==="preview"}),children:e.jsx(oe,{className:n.checkbox,checked:m,onChange:()=>I(o=>!o),children:e.jsx("input",{readOnly:c==="preview",placeholder:"Ваше значение",className:h(n.defaultInput,n.text),value:u,onChange:o=>i(o.target.value)})})});case x==="RADIO_BOX":return e.jsx(N,{positionParams:v,onUpdate:y,preview:c==="preview",onDelete:g,className:h(n.lineContent,{[n.preview]:c==="preview"}),children:e.jsxs(e.Fragment,{children:[e.jsxs("button",{type:"button",onClick:()=>i("Yes"),className:h(n.lineContent,n.radioBlock),children:[e.jsx("span",{className:h(n.radioButton,{[n.checked]:u==="Yes"})}),"Да"]}),e.jsxs("button",{type:"button",onClick:()=>i("No"),className:h(n.lineContent,n.radioBlock),children:[e.jsx("span",{className:h(n.radioButton,{[n.checked]:u!=="Yes"})}),"Нет"]})]})});case x==="DATE":return e.jsx(N,{positionParams:v,onUpdate:y,preview:c==="preview",onDelete:g,className:h(n.lineContent,{[n.preview]:c==="preview"}),children:e.jsx(re,{sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"150px",height:"42px",padding:"0 20px",maxWidth:"none",background:"#CBECFF",borderRadius:"10px",border:"1px solid #0E5F8C",fontSize:"14px",color:"#0E5F8C"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#0E5F8C"}},value:u,onChange:o=>o&&i(Z(o).toISOString())})});case x==="EMPTY":return e.jsx(N,{positionParams:v,onUpdate:y,preview:c==="preview",onDelete:g,className:h(n.lineContent,n.empty),children:e.jsx("p",{children:c==="create"?"Пустое место":""})});case x==="WRITE_TEXT":return e.jsx(N,{positionParams:v,onUpdate:y,preview:c==="preview",onDelete:g,className:h(n.lineContent,{[n.preview]:c==="preview"}),children:e.jsx(ne,{value:u.toString(),name:"",onChange:o=>typeof o=="object"?i(o.target.value):"",readOnly:c==="preview"})});default:return e.jsxs("div",{ref:f,onClick:M,tabIndex:0,onKeyDown:()=>!1,role:"button",className:h(n.lineContent,n.createItem),children:[e.jsx("div",{className:n.circle,children:" + "}),e.jsx("div",{className:n.right})]})}};return e.jsxs(e.Fragment,{children:[X(),e.jsx(ae,{isOpen:B,type:"custom",onSuccess:()=>_(!1),onClose:()=>_(!1),className:n.modal,children:e.jsxs("div",{className:n.modalDropdown,children:[e.jsx("div",{className:n.headBlock,children:"Дропдаун"}),b.map(({id:o})=>{var T;return e.jsxs("div",{className:n.inputBlock,children:[e.jsx("input",{value:(T=b.find(({id:S})=>o===S))==null?void 0:T.label,onChange:S=>k(L=>L.map(R=>o===R.id?{...R,label:S.target.value}:R)),type:"text",placeholder:b.length===1?"Первый вариант по умолчанию":"Введите вариант"}),e.jsx("button",{type:"button",className:n.deleteButton,disabled:b.length===1,onClick:()=>k(S=>S.filter(({id:L})=>o!==L)),children:"x"})]},o)}),e.jsxs(K,{className:n.createVariable,onClick:()=>k(o=>[...o,{id:o.length+1,value:o.length+1,label:""}]),type:"button",color:"primary-reverse",children:[e.jsx("div",{className:n.createVariablePlus,children:"+"}),"Создать вариант"]}),e.jsxs("div",{className:n.buttonBlock,children:[e.jsx(K,{className:n.submit,type:"submit",color:"secondary",onClick:()=>{g(),_(!1)},children:"Назад"}),e.jsx(K,{className:n.submit,type:"submit",color:"primary",onClick:()=>{y({value:JSON.stringify(b)}),_(!1)},children:"Сохранить"})]})]})})]})}),V=(t,a,s)=>{t(r=>({templates:r.templates.map(l=>l.subTemplateId===a?s(l):l)}))},Ye=te((t,a)=>({toggleVisibility:!1,selectTemplateItem:"",currentBlockInfo:null,templates:[{name:"",positionId:0,subTemplateId:0,lineBlocks:[{positionId:0,bodyBlockId:0,blockInfo:[]}]}],handleTemplatesTitle:(s,r)=>{t(l=>({templates:l.templates.map(f=>f.subTemplateId===s?{...f,name:r}:f)}))},addTemplatesLine:s=>{V(t,s,r=>{const l=r.lineBlocks.length,f={positionId:l,bodyBlockId:l,blockInfo:[]};return{...r,lineBlocks:[...r.lineBlocks,f]}})},updateTemplatesLine:(s,r)=>{V(t,s,l=>({...l,lineBlocks:r}))},onToggleVisibility:s=>{t({toggleVisibility:s,currentBlockInfo:null})},handleTemplates:s=>{t({templates:s})},onCurrentBlockInfo:(s,r,l)=>{t({currentBlockInfo:{subTemplateId:s,bodyBlockId:r,lineId:l}})},updateTemplatesLineItem:(s,r,l)=>{const{templates:f}=a(),u=f.map(p=>{if(p.subTemplateId!==s)return p;const m=p.lineBlocks.map(I=>{if(I.bodyBlockId!==r)return I;const B=I.blockInfo.filter(({lineId:_})=>_!==l);return{...I,blockInfo:B}});return{...p,lineBlocks:m}});t({templates:u})},addCurrentBlock:s=>{const{currentBlockInfo:r}=a();if(!r)return;const{subTemplateId:l,bodyBlockId:f,lineId:u}=r;V(t,l,p=>({...p,lineBlocks:p.lineBlocks.map(m=>{if(m.bodyBlockId===f){if(m.blockInfo.length===0)return{...m,blockInfo:[{lineId:0,positionId:0,sizeX:0,sizeY:0,space:0,status:s,value:""},{lineId:1,positionId:1,sizeX:0,sizeY:0,space:0,status:"default",value:""}]};const I=m.blockInfo.length+2;return{...m,blockInfo:[...m.blockInfo.map(B=>{if(B.lineId===u){const _=m.blockInfo.length+1;return{lineId:_,positionId:_,sizeX:0,sizeY:0,space:0,status:s,value:""}}return B}),{lineId:I,positionId:I,sizeX:0,sizeY:0,space:0,status:"default",value:""}]}}return m})})),t({toggleVisibility:!1,currentBlockInfo:null})},updateCurrentBlock:(s,r,l,f)=>{const{templates:u}=a();console.log("templates",u),console.log("updateParams",f);const p=u.map(m=>{if(m.subTemplateId!==s)return m;const I=m.lineBlocks.map(B=>{if(B.bodyBlockId!==r)return B;const _=B.blockInfo.map(b=>b.lineId===l?{...b,...f}:b);return{...B,blockInfo:_}});return{...m,lineBlocks:I}});console.log("templates",p),t({templates:p})}})),qe="_wrapper_k08z0_2",Je="_draggable_k08z0_8",Qe="_headBlock_k08z0_19",Ze="_blockWithPadding_k08z0_20",et="_defaultInput_k08z0_30",tt="_dragHandleLeft_k08z0_47",nt="_contentBlockDraggable_k08z0_48",ot="_dragHandleRight_k08z0_59",st="_show_k08z0_73",at="_createLineBlock_k08z0_77",rt="_createLine_k08z0_77",lt="_text_k08z0_92",ct="_contentBlock_k08z0_48",it="_lineContent_k08z0_105",dt="_bold_k08z0_116",ut="_list_k08z0_119",pt="_inputBlock_k08z0_119",mt="_radioBlock_k08z0_125",_t="_radioButton_k08z0_125",kt="_checked_k08z0_134",ht="_dropdown_k08z0_151",ft="_empty_k08z0_159",bt="_selectItem_k08z0_163",gt="_createItem_k08z0_164",It="_circle_k08z0_173",Bt="_right_k08z0_207",Mt={wrapper:qe,draggable:Je,headBlock:Qe,blockWithPadding:Ze,defaultInput:et,dragHandleLeft:tt,contentBlockDraggable:nt,dragHandleRight:ot,show:st,createLineBlock:at,createLine:rt,text:lt,contentBlock:ct,lineContent:it,bold:dt,list:ut,inputBlock:pt,radioBlock:mt,radioButton:_t,checked:kt,dropdown:ht,empty:ft,selectItem:bt,createItem:gt,circle:It,right:Bt},d={root:["appointment-table"],templateGetAll:t=>[...d.root,`template-get-all-${t}`],deleteTemplate:()=>[...d.root,"template-delete-template"],deleteSubTemplate:()=>[...d.root,"template-delete-sub-template"],templateGetOne:t=>[...d.root,`template-get-one-${t}`],createUpdateBodyBlock:()=>[...d.root,"create-update-body-block"],createTemplate:()=>[...d.root,"create-template"],createSubTemplate:()=>[...d.root,"create-sub-template"],treatment:(t,a)=>[...d.root,`treatment-treatment-get-${t}-${a}`],treatmentId:()=>[...d.root,"treatment-treatment-get-by-id"],treatmentCreate:()=>[...d.root,"treatment-treatment-create"],treatmentUpdate:()=>[...d.root,"treatment-treatment-update"],treatmentAnswerCreate:()=>[...d.root,"treatment-answer-create"]};function Xt(){return $({mutationKey:d.createUpdateBodyBlock(),mutationFn:async t=>(await j({url:"/template/create-update-body-block",method:"POST",data:t})).data})}function Ft(){return $({mutationKey:d.createTemplate(),mutationFn:async t=>(await j({url:"/template/create-template",method:"POST",data:t})).data})}function At(){return $({mutationKey:d.createSubTemplate(),mutationFn:async t=>(await j({url:"/template/create-sub-template",method:"POST",data:t})).data})}function Kt(t){return F({queryKey:d.templateGetOne(t),queryFn:async()=>(await j({url:`/template/get-one/${t}`,method:"GET"})).data})}function xt({offset:t,limit:a,category:s}){return F({queryKey:d.templateGetAll(s),queryFn:async()=>(await j({url:"/template/get-all",method:"GET",params:{offset:t,limit:a,category:s}})).data})}function yt(){return $({mutationKey:d.deleteTemplate(),mutationFn:async t=>(await j({url:`/template/delete-template/${t}`,method:"DELETE"})).data})}function Ut(){return $({mutationKey:d.deleteSubTemplate(),mutationFn:async t=>(await j({url:`/template/delete-sub-template/${t}`,method:"DELETE"})).data})}function Vt(t){return F({queryKey:d.treatment(t.patientId,t.category??""),queryFn:async()=>(await j({url:"/treatment/treatment-get",method:"GET",params:t})).data})}function Gt(t){return F({queryKey:d.treatmentId(),queryFn:async()=>{const a=await j({url:`/treatment/treatment-get-by-id/${t}`,method:"GET"});return a==null?void 0:a.data[0]}})}function Ht(){return $({mutationKey:d.treatmentCreate(),mutationFn:async t=>(await j({url:"/treatment/treatment-create",method:"POST",data:t})).data})}function Wt(){return $({mutationKey:d.treatmentCreate(),mutationFn:async t=>(await j({url:"/treatment/answer-create",method:"POST",data:t})).data})}export{Rt as C,de as R,Lt as T,At as a,Ut as b,yt as c,Ye as d,Gt as e,Wt as f,Ft as g,Ht as h,H as i,Mt as j,Xt as k,xt as l,Vt as m,Pt as s,Kt as u};