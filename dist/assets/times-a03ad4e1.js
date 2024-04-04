import{aq as Y,ar as j,r as c,al as U,s as Q,j as f,_ as R,D as V,t as L,as as W,at as F,au as G,d as a}from"./index-8d56a7e0.js";import{c as D,b as J,T as K,f as q,d as z,m as X,g as w}from"./styles.module-4835680a.js";import{e as $}from"./extendSxProp-e91b8432.js";const Z=["className","component"];function ee(A={}){const{themeId:v,defaultTheme:S,defaultClassName:l="MuiBox-root",generateClassName:y}=A,h=Y("div",{shouldForwardProp:o=>o!=="theme"&&o!=="sx"&&o!=="as"})(j);return c.forwardRef(function(g,n){const p=U(S),T=$(g),{className:C,component:_="div"}=T,I=Q(T,Z);return f.jsx(h,R({as:_,ref:n,className:V(C,y?y(l):l),theme:v&&p[v]||p},I))})}const te=L("MuiBox",["root"]),se=te,ae=W(),oe=ee({themeId:F,defaultTheme:ae,defaultClassName:se.root,generateClassName:G.generate}),ie=oe,ne=A=>c.createElement("svg",{width:9,height:11,viewBox:"0 0 9 11",fill:"none",xmlns:"http://www.w3.org/2000/svg",...A},c.createElement("path",{d:"M0.206054 5.15765L8.88006 0.246034L8.88006 10.0693L0.206054 5.15765Z",fill:"#0E5F8C"})),re=A=>c.createElement("svg",{width:9,height:11,viewBox:"0 0 9 11",fill:"none",xmlns:"http://www.w3.org/2000/svg",...A},c.createElement("path",{d:"M8.66528 5.1568L-0.00872097 10.0684L-0.00872044 0.245181L8.66528 5.1568Z",fill:"#0E5F8C"})),ce="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIsSURBVHgBlZRPchJREMb79UR0yQ0yuUFcW6XMUiiNrK0S5gQMJxBOIDmBQ6Vci2WFuJuhouvoCcATyFIw0233/MsbJkmRrnrwZnjv119/rx8G7oiPX6OW4zgnMnVlNGWsE05+wRZCv+utbttjapB59AYBP+QQCc43mmYOBWNMmPxNxrvQCmx6cfkemEYyXRHQKWxSFesy0Xl0jAYCAOypUmLy/I73swa7AdGUNhDYkJr6i8hFxkiV2kBzkxGvGHjWb7e6sEfkwCtV2Gu/ONJ3qB+OcdSjFW94WC7+HDVrAOud/9JTK8YydUVMP4VpBlHUYsOxbSg2MJrOF0sBuJkN33v4GP/IAQUlsO1NVJmI6WXK/sGxTviap7YKMqTPrgCis2+XA+AkVPVyKLPKOqAvKiaDORmsgY2lvUizirlpGUSkCla0EbN3e4whff50/uMQ4Z5AfLSEBwSm0iW2tD2yf1CPitJE4SnkJRceFuGgc6jfbzvPfkuzQ5ypgFYlDSVBWVrHC4qSoQF9exlz6lfaZ6hHbMDEYHBgHz0hdQX0tPBIgCNKyJO7OSnW5C3h5srzppVLjQ5GAp28az8fwh5h3QKoNK3/youVLkccnOm12h/kSmuUyasXfb4INVHq1TUN/ddepafUhoMnBwNJrH7qvfSl/PBWGGQ+jOSeKtCVsZbSU3PF6KaszhocOOaEx1qRvbcGK8qQ1m7J/9aJ7HSNgSazgnlBBLNdSBH/AcFGJlwD5/I1AAAAAElFTkSuQmCC";function fe(A){const{startTime:v,endTime:S,width:l=650,handleChange:y,defaultTimeValue:h}=A,B=a().hour(9).minute(11).second(11).toDate(),[o,g]=c.useState([v.toDate(),S.toDate()]),[n,p]=c.useState([B]),[T,C]=c.useState(!1);let _=null;const I=s=>{if(T){C(!1);return}let e=D(s);const x=q(e,n);if(x||n.length===1){const t=D(n),i=a(t[0].start).isSame(B)?[]:t,r=z(a(x),t);if(a(t[0].start).isSame(B)&&!r)return;e=r&&(_==null||_)?[...i,r]:X(e)}const m=e.flatMap(({start:t,end:i})=>[t.toDate(),i.toDate()]);_=null,p(m)},N=()=>{n.length!==1&&(_=_===null)},M=()=>{C(!0);const s=w(a(o[0]).hour()-1),e=w(a(o[1]).hour()-1);s.hour()+1===0?g([s.set("hour",12).toDate(),e.set("hour",24).toDate()]):s.hour()+1===24?g([w(11).toDate(),e.hour(23).toDate()]):g([s.toDate(),e.toDate()])},H=()=>{C(!0);const s=w(a(o[0]).hour()+1),e=w(a(o[1]).hour()+1);e.hour()===1?g([e.toDate(),o[0]]):g([s.toDate(),e.toDate()])},O=(s,e)=>{const x=e.reduce((m,{start:t,end:i})=>{if(t.isSame(s)||i.isSame(s)||s.isAfter(t)&&s.isBefore(i)){const r=t.isSame(s)?t.add(1,"hour"):t,k=i.isSame(s)?i.subtract(1,"hour"):i;r.isBefore(k)&&m.push({start:r,end:k})}else m.push({start:t,end:i});return m},[]).flatMap(({start:m,end:t})=>[m.toDate(),t.toDate()]);p(x)};return c.useEffect(()=>{document.querySelectorAll(".react_time_range__time_range_container .react_time_range__track").forEach(d=>{if(!d.querySelector(".border-blok")){const b=document.createElement("div");b.className="border-blok",d.appendChild(b)}});const e=document.querySelector(".react_time_range__wrapper"),x=document.querySelectorAll(".react_time_range__time_range_container .react_time_range__tick_label"),m=e==null?void 0:e.querySelector(".react_time_range__close_button_container"),t=document.createElement("div");m||(t.className="react_time_range__close_button_container",t.style.width=`${typeof l=="string"?l:`${l}px`}`,e==null||e.appendChild(t)),x.forEach(d=>{if(e){const u=document.createElement("button");u.type="button",u.className="react_time_range__close-button",u.style.top=`${d.scrollHeight}px`,u.style.width=`calc(100% / ${S.diff(v,"hour")})`;const b=D(n);u.onclick=()=>O(a(d.innerHTML,"HH:mm"),b);const E=document.createElement("img");E.src=ce,u.appendChild(E),t.appendChild(u)}});const r=D(n).map(d=>({startTime:a(d.start).toString(),endTime:a(d.end).toISOString()})),k=a(B).format("YYYY-MM-DDTHH:mm:ss"),P=a(r[0].startTime).format("YYYY-MM-DDTHH:mm:ss");r.length===1&&k===P||y(r)},[n]),c.useEffect(()=>{if(h!=null&&h.length){const s=J(h);p(s)}},[h]),f.jsx(ie,{className:"react_time_range__wrapper",sx:{".react_time_range__time_range_container":{width:`${typeof l=="string"?l:`${l}px`} !important`},".react_time_range__tick_label":{width:`calc(100% / ${S.diff(v,"hour")}) !important`}},children:f.jsxs("div",{className:"react_time_range__time_content",children:[f.jsxs("button",{type:"button",onClick:M,children:[" ",f.jsx(ne,{})]}),f.jsx(K,{step:18e5/2,mode:1,selectedInterval:n,timelineInterval:o,onUpdateCallback:N,onChangeCallback:I}),f.jsxs("button",{type:"button",onClick:H,children:[" ",f.jsx(re,{})]})]})})}const Ae=[{id:1,time:"09:00",isActive:!1},{id:2,time:"10:00",isActive:!1},{id:3,time:"11:00",isActive:!1},{id:4,time:"12:00",isActive:!1},{id:5,time:"13:00",isActive:!1},{id:6,time:"14:00",isActive:!1},{id:7,time:"15:00",isActive:!1},{id:8,time:"16:00",isActive:!1},{id:9,time:"17:00",isActive:!1},{id:10,time:"18:00",isActive:!1},{id:11,time:"19:00",isActive:!1}],he=[{id:1,day:"ПН",isActive:!1},{id:2,day:"ВТ",isActive:!1},{id:3,day:"СР",isActive:!0},{id:4,day:"ЧТ",isActive:!1},{id:5,day:"ПТ",isActive:!1},{id:6,day:"СБ",isActive:!1},{id:0,day:"ВС",isActive:!1}];export{ne as S,fe as T,re as a,he as d,Ae as t};
