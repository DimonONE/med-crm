import{aH as r,aI as a,aJ as o,aK as n}from"./index-47557d54.js";const v=e=>({services:[],setServices:t=>{e({services:t})}}),s=r()(a(o((...e)=>({...v(...e)}),{name:"Services Session Store"}),{name:"servicesSession"})),L=()=>n(s).services,N=e=>{s.getState().setServices(e)},P=e=>{const{services:t}=s.getState(),c=[e,...t];s.getState().setServices(c)},$=e=>{const{services:t}=s.getState(),c=t.filter(({id:i})=>i!==e);s.getState().setServices(c)},_="_root_ihm2f_1",S="_label_ihm2f_6",d="_servicesList_ihm2f_13",g="_servicesItem_ihm2f_20",l="_price_ihm2f_25",m="_info_ihm2f_29",x={root:_,label:S,servicesList:d,servicesItem:g,price:l,info:m},f="_label_1agg4_1",b="_addServices_1agg4_9",p="_servicesPrice_1agg4_17",h="_servicesName_1agg4_28",u="_adding_1agg4_32",D={label:f,addServices:b,servicesPrice:p,servicesName:h,adding:u};export{x as a,D as b,P as c,$ as d,N as s,L as u};
