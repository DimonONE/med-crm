import{h as s}from"./index-8d56a7e0.js";import{u as l}from"./hooks-390b4af5.js";import{u as r}from"./useMutation-501ab2ae.js";const o={root:["personnel"],listOfPersonnel:()=>[...o.root,"list-of-personnel"],detail:()=>[...o.root,"detail"],createPersonnel:()=>[...o.root,"create-personnel"],updatePersonnel:()=>[...o.root,"update-personnel"]};function O(){return r({mutationKey:o.createPersonnel(),mutationFn:async e=>{const n=new FormData;return Object.entries(e).filter(([t])=>t!=="files").forEach(([t,a])=>{n.append(t,a)}),Array.isArray(e.files)&&e.files.forEach((t,a)=>{n.append("files",t,`file${a}`)}),(await s({url:"/admin/create-personal",method:"POST",data:n,headers:{"Content-Type":"multipart/form-data"}})).data}})}function L(){return r({mutationKey:o.updatePersonnel(),mutationFn:async e=>{const n=new FormData;return Object.entries(e).filter(([t])=>t!=="newFiles").forEach(([t,a])=>{n.append(t,a)}),e.newImage&&n.delete("image"),Array.isArray(e.newFiles)&&e.newFiles.forEach((t,a)=>{n.append("newFiles",t,`newFiles${a}`)}),(await s({url:"/admin/update-personal",method:"POST",data:n,headers:{"Content-Type":"multipart/form-data"}})).data}})}const c=async e=>(await s({url:"/admin/all-personal",method:"GET",params:e})).data;function E(e){return l({queryKey:o.listOfPersonnel(),fetchPage:c,initialQuery:e})}const T=[{value:-1,label:"Все"},{value:"doctor",label:"Доктор"}],f="_container_1w4it_1",u="_userInfo_1w4it_10",d="_formLabel_1w4it_15",m="_userInfoGender_1w4it_23",_="_date_1w4it_28",p="_loadFails_1w4it_36",w="_title_1w4it_41",y="_select_1w4it_49",P="_submit_1w4it_54",h="_comment_1w4it_70",g={container:f,userInfo:u,formLabel:d,userInfoGender:m,date:_,loadFails:p,title:w,select:y,submit:P,delete:"_delete_1w4it_55",comment:h};export{O as a,L as b,T as r,g as s,E as u};
