import{j as o,c as e,k as x}from"./index-47557d54.js";import{s}from"./styles.module-3170904e.js";function f(n){const{cards:d,onClick:i,className:m}=n,t=a=>{i&&i(a)};return o.jsx("div",{className:e(s.root,m),children:d.map(({id:a,title:r,ico:l,link:c,notification:N})=>o.jsxs(x,{to:c,className:e(s.card,{[s.disabled]:c==="#"}),onClick:()=>c!=="#"?t({id:a,link:c,title:r}):void 0,children:[o.jsx("div",{className:s.icon,children:l}),r,N&&o.jsx("div",{className:s.notification})]},a))})}export{f as C};
