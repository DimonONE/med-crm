import{r as I,j as t,M as $,u as Y,F as J,P as q,Q as U,c as f,f as Q,R as Z,B as A,d as G,S as ee,$ as te,k as N}from"./index-28b8728f.js";import{U as ne,C as oe}from"./Checkbox-aa482c20.js";import"./styles.module-60436982.js";import{e as ae}from"./utils-045dd2ef.js";import"./styles.module-eea2a584.js";import{M as se}from"./Modal-25888893.js";import{D as re}from"./DatePicker-abb74157.js";import{l as le}from"./lodash-f37d900b.js";import{u as P}from"./useMutation-267c9319.js";import{u as K}from"./useQuery-5e80a04e.js";import{C as ce}from"./CardsNavigate-bcbe1f7e.js";import{S as ie}from"./services-ico-9fbacd7d.js";var W=(e=>(e.ALL="all",e.PERIODONTICS="4",e.THERAPY="5",e.SURGERY="6",e.ORTHOPEDICS="7",e.OTHER="1",e))(W||{});const ue={1:"Другое",4:"Пародонтология",5:"Терапия",6:"Хирургия",7:"Ортопедия"},de="_root_1modc_1",pe={root:de},me=I.memo(({templateId:e,onDeleteTemplate:s})=>t.jsxs(t.Fragment,{children:[t.jsx($,{onClick:()=>!1,children:"Просмотр"}),t.jsx($,{onClick:()=>!1,children:"Копировать"}),t.jsx($,{onClick:()=>!1,children:"Копировать все"}),t.jsx($,{onClick:()=>!1,children:"Вставить"}),t.jsx($,{onClick:()=>!1,children:"Переименовать"}),t.jsx($,{onClick:()=>s(e),children:"Удалить"})]}));function Lt({id:e,onNavigate:s}){const{data:o,refetch:r}=yt({offset:0,limit:100,category:e===W.ALL?"":ue[e]??""}),{mutate:l}=Ct(),g=Y(),{checkUserRole:c}=J(),_=c("superAdmin"),p=I.useMemo(()=>o!=null&&o.data.length?o.data.map(({id:h,name:x})=>({id:h,title:x??"",ico:t.jsx(ie,{}),link:q.template.preview(e,h==null?void 0:h.toString())})):[],[o]),v=h=>{h.preventDefault(),h.stopPropagation(),alert("onCopy")},C=({link:h,id:x})=>{if(c("superAdmin")){g(h);return}s&&s(x)},k=I.useCallback(h=>{l(h,{onSuccess:()=>{U("Success!",{type:"success"}),r()},onError:x=>{U(ae(x),{type:"error"})}})},[l]),B=I.useCallback(h=>t.jsx(me,{templateId:h,onDeleteTemplate:k}),[k]);return t.jsx(ce,{className:pe.root,cards:p,hasCopy:_,onCopy:v,onClick:C,menuItems:_?B:void 0})}const _e="_modalContent_kcoom_1",ke="_headBlock_kcoom_1",he="_inputBlock_kcoom_6",fe="_dropdownBlock_kcoom_15",be="_dropdown_kcoom_15",ge="_buttonBlock_kcoom_30",ve="_modal_kcoom_1",Pt={modalContent:_e,headBlock:ke,inputBlock:he,dropdownBlock:fe,dropdown:be,buttonBlock:ge,modal:ve},Be="_root_1t3c7_2",ye="_selectItem_1t3c7_6",Ce="_circle_1t3c7_15",Ie="_right_1t3c7_44",V={root:Be,selectItem:ye,circle:Ce,right:Ie};function z(e){const[s,o]=I.useState(!1),r=I.useRef(null),{children:l,preview:g,className:c,positionParams:_,onDelete:p,onEdit:v,onUpdate:C}=e,[k,B]=I.useState({element:null,offsetX:0}),h=le.debounce(u=>{C&&C({sizeX:u})},200),x=u=>{if(r.current){const L=r.current.getBoundingClientRect(),w=u.clientX,T=r.current.offsetWidth,j=w-L.left<=20,M=L.right-w<=20;if(j||M){const d=b=>{const X=b.clientX-w;let O;j?(O=T-X,r.current.style.left=`${L.left+X}px`):M&&(O=T+X),O&&O>0&&(r.current.style.width=`${O}px`,h(O))},a=()=>{document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",a)}}},D=()=>{o(!0)},E=u=>{B(u)},y=u=>{var L;u.preventDefault(),E({element:u.currentTarget,offsetX:"clientX"in u?((L=r.current)==null?void 0:L.clientWidth)??0/2:0})},i=u=>{u.key==="Enter"?D():(u.key==="ContextMenu"||u.shiftKey&&u.key==="F10")&&y(u)},F=()=>{o(!1)},S=()=>{B({element:null,offsetX:0})},R={...(_==null?void 0:_.sizeX)&&{width:_.sizeX}};return g?t.jsx("div",{style:R,className:c,children:l}):t.jsxs("div",{className:V.root,style:R,children:[t.jsxs("div",{ref:r,onClick:D,tabIndex:0,onMouseDown:x,onBlur:F,onKeyDown:i,onContextMenu:y,role:"button",className:f(c,{[V.selectItem]:s}),children:[l,t.jsx("div",{className:V.right})]}),k.element&&t.jsxs(Q,{anchorEl:k.element,open:!!k.element,onClose:S,anchorPosition:{top:0,left:0},style:{marginLeft:k.offsetX/2,marginTop:-20},children:[v&&t.jsx($,{onClick:()=>{v(),S()},children:"Редактировать"}),t.jsx($,{onClick:()=>{p(),S()},children:"Удалить"})]})]})}const xe="_defaultInput_lipk0_2",we="_selectItem_lipk0_19",Te="_createItem_lipk0_20",je="_circle_lipk0_29",Ne="_right_lipk0_63",Se="_lineContent_lipk0_96",Oe="_preview_lipk0_104",Ee="_text_lipk0_107",ze="_bold_lipk0_110",$e="_inputBlock_lipk0_113",De="_list_lipk0_123",Le="_radioBlock_lipk0_132",Pe="_radioButton_lipk0_132",Re="_checked_lipk0_141",Xe="_dropdown_lipk0_158",Fe="_empty_lipk0_166",Me="_checkbox_lipk0_170",Ke="_modalDropdown_lipk0_177",Ae="_headBlock_lipk0_177",Ve="_deleteButton_lipk0_187",He="_createVariable_lipk0_198",Ue="_createVariablePlus_lipk0_206",Ge="_buttonBlock_lipk0_217",We="_modal_lipk0_177",n={defaultInput:xe,selectItem:we,createItem:Te,circle:je,right:Ne,lineContent:Se,preview:Oe,text:Ee,bold:ze,inputBlock:$e,list:De,radioBlock:Le,radioButton:Pe,checked:Re,dropdown:Xe,empty:Fe,checkbox:Me,modalDropdown:Ke,headBlock:Ae,deleteButton:Ve,createVariable:He,createVariablePlus:Ue,buttonBlock:Ge,modal:We},Rt=Z.memo(e=>{const{onCurrentBlockInfo:s,onToggleVisibility:o,updateTemplatesLineItem:r,updateCurrentBlock:l}=Ye(),g=I.useRef(null),[c,_]=I.useState(""),[p,v]=I.useState(!1),[C,k]=I.useState(!1),[B,h]=I.useState([{id:0,value:-1,label:""}]),{subTemplateId:x,bodyBlockId:D,lineId:E,status:y,type:i="create",isEditValue:F=!1,value:S,handleChange:R,...u}=e,L=()=>{o(!0),s(x,D,E)},w=d=>{if(!F)return;const a={value:d.toString(),...y==="DROPDOWN"&&{value:JSON.stringify(B)},...y==="CHECK_BOX"&&{value:JSON.stringify({value:d.toString(),isChecked:p})}};_(d),l(x,D,E,a),R&&R({id:e.id??E,value:a.value})},T=()=>{r(x,D,E)},j=d=>{l(x,D,E,d)};I.useEffect(()=>{var d;if(S&&_(e.answer??S),S&&y==="DROPDOWN"){const a=JSON.parse(S??"");h(a);const b=e.answer&&JSON.parse(e.answer);_((b==null?void 0:b.value)??((d=a[0])==null?void 0:d.value))}if(S&&y==="CHECK_BOX"){const a=i!=="preview"?c:typeof c=="string"&&JSON.parse(e.answer||S||"{}");v(a.isChecked)}},[]),I.useEffect(()=>{if(y==="CHECK_BOX"){const d=JSON.parse(S||'{"value": ""}'),a={value:JSON.stringify({value:d.value,isChecked:p})};l(x,D,E,a),R&&R({id:e.id??E,value:a.value})}},[p]);const M=()=>{var d;switch(!0){case y==="TEXT":return t.jsx(z,{positionParams:u,preview:i==="preview",onUpdate:j,onDelete:T,className:f(n.lineContent,{[n.preview]:i==="preview"}),children:t.jsx("div",{className:n.inputBlock,children:t.jsx("input",{readOnly:i==="preview",className:f(n.defaultInput,n.text),value:c,onChange:a=>w(a.target.value)})})});case y==="BOLD_TEXT":return t.jsx(z,{positionParams:u,preview:i==="preview",onUpdate:j,onDelete:T,className:f(n.lineContent,{[n.preview]:i==="preview"}),children:t.jsx("div",{className:n.inputBlock,children:t.jsx("input",{readOnly:i==="preview",className:f(n.defaultInput,n.bold),value:c,onChange:a=>w(a.target.value)})})});case y==="POINT_TEXT":return t.jsx(z,{positionParams:u,preview:i==="preview",onUpdate:j,onDelete:T,className:f(n.lineContent,{[n.preview]:i==="preview"}),children:t.jsx("li",{className:n.list,children:t.jsx("div",{className:n.inputBlock,children:t.jsx("input",{readOnly:i==="preview",className:f(n.defaultInput),value:c,onChange:a=>w(a.target.value)})})})});case y==="DROPDOWN":return t.jsx(z,{positionParams:u,onUpdate:j,preview:i==="preview",onEdit:()=>k(!0),onDelete:T,className:f(n.lineContent,{[n.preview]:i==="preview"}),children:t.jsx(ee,{value:c||-1,onChange:a=>w(a.target.value),className:n.dropdown,selectNavigate:!0,selectOptions:B,children:B.map(({label:a,value:b})=>t.jsx($,{value:b,className:"select-link",children:a},b))})});case y==="CHECK_BOX":{const a=i!=="preview"?c:((d=typeof c=="string"&&JSON.parse(c||"{}"))==null?void 0:d.value)??"";return t.jsx(z,{positionParams:u,onUpdate:j,preview:i==="preview",onDelete:T,className:f(n.lineContent,{[n.preview]:i==="preview"}),children:t.jsx(oe,{className:n.checkbox,checked:p,onChange:()=>F&&v(b=>!b),children:t.jsx("input",{readOnly:i==="preview",placeholder:"Ваше значение",className:f(n.defaultInput,n.text),value:a,onChange:b=>w(b.target.value)})})})}case y==="RADIO_BOX":return t.jsx(z,{positionParams:u,onUpdate:j,preview:i==="preview",onDelete:T,className:f(n.lineContent,{[n.preview]:i==="preview"}),children:t.jsxs(t.Fragment,{children:[t.jsxs("button",{type:"button",onClick:()=>w("Yes"),className:f(n.lineContent,n.radioBlock),children:[t.jsx("span",{className:f(n.radioButton,{[n.checked]:c==="Yes"})}),"Да"]}),t.jsxs("button",{type:"button",onClick:()=>w("No"),className:f(n.lineContent,n.radioBlock),children:[t.jsx("span",{className:f(n.radioButton,{[n.checked]:c!=="Yes"})}),"Нет"]})]})});case y==="DATE":return t.jsx(z,{positionParams:u,onUpdate:j,preview:i==="preview",onDelete:T,className:f(n.lineContent,{[n.preview]:i==="preview"}),children:t.jsx(re,{sx:{".MuiInputBase-root.MuiOutlinedInput-root":{width:"150px",height:"42px",padding:"0 20px",maxWidth:"none",background:"#CBECFF",borderRadius:"10px",border:"1px solid #0E5F8C",fontSize:"14px",color:"#0E5F8C"},".MuiInputBase-root .MuiButtonBase-root.MuiIconButton-root":{color:"#0E5F8C"}},value:G(c),onChange:a=>a&&w(G(a).toISOString()),readOnly:!F})});case y==="EMPTY":return t.jsx(z,{positionParams:u,onUpdate:j,preview:i==="preview",onDelete:T,className:f(n.lineContent,n.empty),children:t.jsx("p",{children:i==="create"?"Пустое место":""})});case y==="WRITE_TEXT":return t.jsx(z,{positionParams:u,onUpdate:j,preview:i==="preview",onDelete:T,className:f(n.lineContent),children:t.jsx(ne,{value:c.toString(),name:"",onChange:a=>typeof a=="object"?w(a.target.value):"",readOnly:!F})});default:return t.jsxs("div",{ref:g,onClick:L,tabIndex:0,onKeyDown:()=>!1,role:"button",className:f(n.lineContent,n.createItem),children:[t.jsx("div",{className:n.circle,children:" + "}),t.jsx("div",{className:n.right})]})}};return t.jsxs(t.Fragment,{children:[M(),t.jsx(se,{isOpen:C,type:"custom",onSuccess:()=>k(!1),onClose:()=>k(!1),className:n.modal,children:t.jsxs("div",{className:n.modalDropdown,children:[t.jsx("div",{className:n.headBlock,children:"Дропдаун"}),B.map(({id:d})=>{var a;return t.jsxs("div",{className:n.inputBlock,children:[t.jsx("input",{value:(a=B.find(({id:b})=>d===b))==null?void 0:a.label,onChange:b=>h(X=>X.map(O=>d===O.id?{...O,label:b.target.value}:O)),type:"text",placeholder:B.length===1?"Первый вариант по умолчанию":"Введите вариант"}),t.jsx("button",{type:"button",className:n.deleteButton,disabled:B.length===1,onClick:()=>h(b=>b.filter(({id:X})=>d!==X)),children:"x"})]},d)}),t.jsxs(A,{className:n.createVariable,onClick:()=>h(d=>[...d,{id:d.length+1,value:d.length+1,label:""}]),type:"button",color:"primary-reverse",children:[t.jsx("div",{className:n.createVariablePlus,children:"+"}),"Создать вариант"]}),t.jsxs("div",{className:n.buttonBlock,children:[t.jsx(A,{className:n.submit,type:"submit",color:"secondary",onClick:()=>{T(),k(!1)},children:"Назад"}),t.jsx(A,{className:n.submit,type:"submit",color:"primary",onClick:()=>{j({value:JSON.stringify(B)}),k(!1)},children:"Сохранить"})]})]})})]})}),H=(e,s,o)=>{e(r=>({templates:r.templates.map(l=>l.subTemplateId===s?o(l):l)}))},Ye=te((e,s)=>({toggleVisibility:!1,selectTemplateItem:"",currentBlockInfo:null,templates:[{name:"",positionId:0,subTemplateId:0,lineBlocks:[{positionId:0,bodyBlockId:0,blockInfo:[]}]}],handleTemplatesTitle:(o,r)=>{e(l=>({templates:l.templates.map(g=>g.subTemplateId===o?{...g,name:r}:g)}))},addTemplatesLine:o=>{H(e,o,r=>{const l=r.lineBlocks.length,g={positionId:l,bodyBlockId:l,blockInfo:[]};return{...r,lineBlocks:[...r.lineBlocks,g]}})},updateTemplatesLine:(o,r)=>{H(e,o,l=>({...l,lineBlocks:r}))},onToggleVisibility:o=>{e({toggleVisibility:o,currentBlockInfo:null})},handleTemplates:o=>{e({templates:o})},onCurrentBlockInfo:(o,r,l)=>{e({currentBlockInfo:{subTemplateId:o,bodyBlockId:r,lineId:l}})},updateTemplatesLineItem:(o,r,l)=>{const{templates:g}=s(),c=g.map(_=>{if(_.subTemplateId!==o)return _;const p=_.lineBlocks.map(v=>{if(v.bodyBlockId!==r)return v;const C=v.blockInfo.filter(({lineId:k})=>k!==l);return{...v,blockInfo:C}});return{..._,lineBlocks:p}});e({templates:c})},addCurrentBlock:o=>{const{currentBlockInfo:r}=s();if(!r)return;const{subTemplateId:l,bodyBlockId:g,lineId:c}=r;H(e,l,_=>({..._,lineBlocks:_.lineBlocks.map(p=>{if(p.bodyBlockId===g){if(p.blockInfo.length===0)return{...p,blockInfo:[{lineId:0,positionId:0,sizeX:0,sizeY:0,space:0,status:o,value:""},{lineId:1,positionId:1,sizeX:0,sizeY:0,space:0,status:"default",value:""}]};const v=p.blockInfo.length+2;return{...p,blockInfo:[...p.blockInfo.map(C=>{if(C.lineId===c){const k=p.blockInfo.length+1;return{lineId:k,positionId:k,sizeX:0,sizeY:0,space:0,status:o,value:""}}return C}),{lineId:v,positionId:v,sizeX:0,sizeY:0,space:0,status:"default",value:""}]}}return p})})),e({toggleVisibility:!1,currentBlockInfo:null})},updateCurrentBlock:(o,r,l,g)=>{const{templates:c}=s(),_=c.map(p=>{if(p.subTemplateId!==o)return p;const v=p.lineBlocks.map(C=>{if(C.bodyBlockId!==r)return C;const k=C.blockInfo.map(B=>B.lineId===l?{...B,...g}:B);return{...C,blockInfo:k}});return{...p,lineBlocks:v}});e({templates:_})}})),Je="_wrapper_k08z0_2",qe="_draggable_k08z0_8",Qe="_headBlock_k08z0_19",Ze="_blockWithPadding_k08z0_20",et="_defaultInput_k08z0_30",tt="_dragHandleLeft_k08z0_47",nt="_contentBlockDraggable_k08z0_48",ot="_dragHandleRight_k08z0_59",at="_show_k08z0_73",st="_createLineBlock_k08z0_77",rt="_createLine_k08z0_77",lt="_text_k08z0_92",ct="_contentBlock_k08z0_48",it="_lineContent_k08z0_105",ut="_bold_k08z0_116",dt="_list_k08z0_119",pt="_inputBlock_k08z0_119",mt="_radioBlock_k08z0_125",_t="_radioButton_k08z0_125",kt="_checked_k08z0_134",ht="_dropdown_k08z0_151",ft="_empty_k08z0_159",bt="_selectItem_k08z0_163",gt="_createItem_k08z0_164",vt="_circle_k08z0_173",Bt="_right_k08z0_207",Xt={wrapper:Je,draggable:qe,headBlock:Qe,blockWithPadding:Ze,defaultInput:et,dragHandleLeft:tt,contentBlockDraggable:nt,dragHandleRight:ot,show:at,createLineBlock:st,createLine:rt,text:lt,contentBlock:ct,lineContent:it,bold:ut,list:dt,inputBlock:pt,radioBlock:mt,radioButton:_t,checked:kt,dropdown:ht,empty:ft,selectItem:bt,createItem:gt,circle:vt,right:Bt},m={root:["appointment-table"],templateGetAll:e=>[...m.root,`template-get-all-${e}`],deleteTemplate:()=>[...m.root,"template-delete-template"],deleteSubTemplate:()=>[...m.root,"template-delete-sub-template"],templateGetOne:e=>[...m.root,`template-get-one-${e}`],createUpdateBodyBlock:()=>[...m.root,"create-update-body-block"],createTemplate:()=>[...m.root,"create-template"],createSubTemplate:()=>[...m.root,"create-sub-template"],treatment:(e,s)=>[...m.root,`treatment-treatment-get-${e}-${s}`],treatmentId:()=>[...m.root,"treatment-treatment-get-by-id"],treatmentCreate:()=>[...m.root,"treatment-treatment-create"],treatmentUpdate:()=>[...m.root,"treatment-treatment-update"],treatmentAnswerCreate:()=>[...m.root,"treatment-answer-create"]};function Ft(){return P({mutationKey:m.createUpdateBodyBlock(),mutationFn:async e=>(await N({url:"/template/create-update-body-block",method:"POST",data:e})).data})}function Mt(){return P({mutationKey:m.createTemplate(),mutationFn:async e=>(await N({url:"/template/create-template",method:"POST",data:e})).data})}function Kt(){return P({mutationKey:m.createSubTemplate(),mutationFn:async e=>(await N({url:"/template/create-sub-template",method:"POST",data:e})).data})}function At(e){return K({queryKey:m.templateGetOne(e),queryFn:async()=>(await N({url:`/template/get-one/${e}`,method:"GET"})).data})}function yt({offset:e,limit:s,category:o}){return K({queryKey:m.templateGetAll(o),queryFn:async()=>(await N({url:"/template/get-all",method:"GET",params:{offset:e,limit:s,category:o}})).data})}function Ct(){return P({mutationKey:m.deleteTemplate(),mutationFn:async e=>(await N({url:`/template/delete-template/${e}`,method:"DELETE"})).data})}function Vt(){return P({mutationKey:m.deleteSubTemplate(),mutationFn:async e=>(await N({url:`/template/delete-sub-template/${e}`,method:"DELETE"})).data})}function Ht(e){return K({queryKey:m.treatment(e.patientId,e.category??""),queryFn:async()=>(await N({url:"/treatment/treatment-get",method:"GET",params:e})).data})}function Ut(e){return K({queryKey:m.treatmentId(),queryFn:async()=>{const s=await N({url:`/treatment/treatment-get-by-id/${e}`,method:"GET"});return s==null?void 0:s.data[0]}})}function Gt(){return P({mutationKey:m.treatmentCreate(),mutationFn:async e=>(await N({url:"/treatment/treatment-create",method:"POST",data:e})).data})}function Wt(){return P({mutationKey:m.treatmentCreate(),mutationFn:async e=>(await N({url:"/treatment/treatment-update",method:"POST",data:e})).data})}function Yt(){return P({mutationKey:m.treatmentCreate(),mutationFn:async e=>(await N({url:"/treatment/answer-create",method:"POST",data:e})).data})}export{Rt as C,ue as R,Lt as T,Kt as a,Vt as b,Ct as c,Ft as d,Ye as e,Ut as f,Yt as g,Wt as h,Mt as i,Gt as j,W as k,Xt as l,yt as m,Ht as n,Pt as s,At as u};