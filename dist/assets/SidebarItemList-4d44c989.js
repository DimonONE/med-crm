import{r as o,j as e,c as n,K as p,l as v,R as x}from"./index-b7b75947.js";import{l as w}from"./lodash-407105e9.js";import{S as f}from"./Sidebar-ba722fda.js";const j="_root_1s72t_1",g="_name_1s72t_11",u="_search_1s72t_19",h={root:j,name:g,search:u},N=s=>o.createElement("svg",{width:13,height:13,viewBox:"0 0 13 13",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s},o.createElement("path",{d:"M5.05049 10.2525C6.09486 10.2526 7.10935 9.90413 7.93328 9.26238L11.0417 12.3708C11.2739 12.5951 11.6439 12.5886 11.8682 12.3564C12.0869 12.1299 12.0869 11.7708 11.8682 11.5443L8.75976 8.4359C10.3522 6.386 9.98137 3.43332 7.93148 1.84088C5.88158 0.248444 2.92892 0.619267 1.33649 2.66916C-0.255951 4.71906 0.114872 7.67174 2.16477 9.26418C2.99004 9.90529 4.00544 10.2531 5.05049 10.2525ZM2.55291 3.05551C3.9323 1.67609 6.16873 1.67606 7.54815 3.05545C8.92756 4.43484 8.92759 6.67128 7.5482 8.05069C6.16881 9.43011 3.93237 9.43014 2.55296 8.05075C2.55293 8.05072 2.55293 8.05072 2.55291 8.05069C1.17352 6.68135 1.16539 4.45307 2.53473 3.07368C2.54078 3.06761 2.54683 3.06156 2.55291 3.05551Z",fill:"#A1B6C1"}));function K(s){const{filters:t,isSearch:a,handleChange:c,waitSecond:l=1e3,className:i}=s,m=w.debounce(_=>{c&&c(_.target.value)},l);return e.jsxs("div",{className:n(h.root,i),children:[t&&e.jsx("span",{className:h.name,children:t}),a&&e.jsx(p,{placeholder:"Поиск",className:n("form-input",h.search),onChange:m,endAdornment:e.jsx(N,{})})]})}const S=s=>o.createElement("svg",{width:9,height:15,viewBox:"0 0 9 15",fill:"red",xmlns:"http://www.w3.org/2000/svg",...s},o.createElement("path",{d:"M7.99043 6.83599L1.90408 0.749744C1.76331 0.608863 1.57539 0.53125 1.37502 0.53125C1.17465 0.53125 0.986737 0.608863 0.845967 0.749744L0.397749 1.19785C0.10609 1.48984 0.10609 1.96441 0.397749 2.25596L5.50861 7.36682L0.392078 12.4834C0.251308 12.6242 0.173584 12.812 0.173584 13.0123C0.173584 13.2128 0.251308 13.4006 0.392078 13.5416L0.840296 13.9896C0.981177 14.1305 1.16898 14.2081 1.36935 14.2081C1.56972 14.2081 1.75764 14.1305 1.89841 13.9896L7.99043 7.89777C8.13154 7.75644 8.20904 7.56775 8.20859 7.36716C8.20904 7.16579 8.13154 6.97721 7.99043 6.83599Z",fill:"#578695"})),L="_item_1vcvs_1",b="_link_1vcvs_11",d={item:L,link:b};function E({children:s,link:t,className:a}){return t?e.jsx(v,{to:t,className:n(d.item,d.link,a),children:s}):e.jsx("div",{className:n(d.item,a),children:s})}const R="_container_pr732_1",B="_item_pr732_5",I="_active_pr732_5",T="_title_pr732_8",k="_subTitle_pr732_9",A="_arrow_pr732_12",r={container:R,item:B,active:I,title:T,subTitle:k,arrow:A},q=x.forwardRef(({selectId:s,items:t,children:a,onScroll:c},l)=>e.jsxs(f,{ref:l,onScroll:c,children:[a,t.map(({id:i,title:m,subTitle:_,link:C})=>e.jsxs(E,{link:C,className:n(r.item,{[r.active]:i===s}),children:[e.jsxs("div",{className:r.container,children:[e.jsx("div",{className:r.title,children:m}),e.jsx("span",{className:r.subTitle,children:_})]}),C&&e.jsx("div",{className:r.arrow,children:e.jsx(S,{})})]},i))]}));export{q as S,K as a};