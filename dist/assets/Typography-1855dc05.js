import{v as b,t as B,w as C,y as u,_ as s,r as W,C as M,s as R,j as P,D as j,E as U}from"./index-47557d54.js";import{e as _}from"./extendSxProp-3e7e7834.js";function E(a){return b("MuiTypography",a)}B("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);const N=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],$=a=>{const{align:t,gutterBottom:r,noWrap:n,paragraph:e,variant:o,classes:p}=a,i={root:["root",o,a.align!=="inherit"&&`align${u(t)}`,r&&"gutterBottom",n&&"noWrap",e&&"paragraph"]};return U(i,E,p)},D=C("span",{name:"MuiTypography",slot:"Root",overridesResolver:(a,t)=>{const{ownerState:r}=a;return[t.root,r.variant&&t[r.variant],r.align!=="inherit"&&t[`align${u(r.align)}`],r.noWrap&&t.noWrap,r.gutterBottom&&t.gutterBottom,r.paragraph&&t.paragraph]}})(({theme:a,ownerState:t})=>s({margin:0},t.variant==="inherit"&&{font:"inherit"},t.variant!=="inherit"&&a.typography[t.variant],t.align!=="inherit"&&{textAlign:t.align},t.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},t.gutterBottom&&{marginBottom:"0.35em"},t.paragraph&&{marginBottom:16})),y={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},L={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},w=a=>L[a]||a,z=W.forwardRef(function(t,r){const n=M({props:t,name:"MuiTypography"}),e=w(n.color),o=_(s({},n,{color:e})),{align:p="inherit",className:i,component:g,gutterBottom:d=!1,noWrap:f=!1,paragraph:l=!1,variant:h="body1",variantMapping:c=y}=o,v=R(o,N),m=s({},o,{align:p,color:e,className:i,component:g,gutterBottom:d,noWrap:f,paragraph:l,variant:h,variantMapping:c}),x=g||(l?"p":c[h]||y[h])||"span",T=$(m);return P.jsx(D,s({as:x,ref:r,ownerState:m,className:j(T.root,i)},v))}),O=z;export{O as T};
