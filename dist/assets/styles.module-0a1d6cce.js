import{h as n,aH as r,aI as a,aJ as u,aK as c}from"./index-8d56a7e0.js";import{u as d}from"./hooks-390b4af5.js";import{u as m}from"./useQuery-47bca053.js";import{u as o}from"./useMutation-501ab2ae.js";const s={superAdmin:{root:["super-admin"],createClinic:()=>[...s.superAdmin.root,"create-clinic"],updateClinic:()=>[...s.superAdmin.root,"update-clinic"],addTypeClinic:()=>[...s.superAdmin.root,"add-type-clinic"],allTypeClinic:()=>[...s.superAdmin.root,"all-type-clinic"],switchStatusClinic:()=>[...s.superAdmin.root,"switch-status-clinic"],listofusers:()=>[...s.superAdmin.root,"listofusers"],statusUser:()=>[...s.superAdmin.root,"status-user"],newPassword:()=>[...s.superAdmin.root,"new-password"]}},l=async t=>(await n({url:"/admin/listofusers",method:"GET",params:t})).data;function x(t){return d({queryKey:s.superAdmin.listofusers(),fetchPage:l,initialQuery:t})}function E(){return m({queryKey:s.superAdmin.allTypeClinic(),queryFn:async()=>(await n({url:"/admin/all-type-clinic",method:"GET"})).data})}function G(){return o({mutationKey:s.superAdmin.createClinic(),mutationFn:async t=>await n({url:"/admin/create-clinic",method:"POST",data:t})})}function k(){return o({mutationKey:s.superAdmin.updateClinic(),mutationFn:async t=>(await n({url:"/admin/update-clinic",method:"POST",data:t})).data})}function H(){return o({mutationKey:s.superAdmin.statusUser(),mutationFn:async t=>await n({url:"/admin/switch-status-user",method:"POST",data:t})})}function J(){return o({mutationKey:s.superAdmin.newPassword(),mutationFn:async t=>await n({url:"/admin/set-new-password",method:"POST",data:t})})}const _=t=>({clinicInfo:null,addClinicInfo:e=>{t({clinicInfo:e},!1,"superAdminSession/addPatient")},deleteClinicInfo:()=>{t({clinicInfo:null},!1,"superAdminSession/deletePatient")}}),i=r()(a(u((...t)=>({..._(...t)}),{name:"Super admin Session Store"}),{name:"superAdminSession"})),M=()=>c(i,t=>t.clinicInfo),Q=t=>i.getState().addClinicInfo(t),z=()=>i.getState().deleteClinicInfo(),p="_editPassword_b6w3j_1",f="_submitPassword_b6w3j_6",D={editPassword:p,submitPassword:f},w="_form_1m454_1",b="_submit_1m454_6",V={form:w,submit:b},y="_root_thb9d_1",h="_title_thb9d_9",A="_subTitle_thb9d_16",C="_row_thb9d_22",S="_column_thb9d_28",j="_editButton_thb9d_36",P="_buttonsRemove_thb9d_40",T="_remove_thb9d_46",I="_modalNameClinic_thb9d_59",W={root:y,title:h,subTitle:A,row:C,column:S,editButton:j,buttonsRemove:P,remove:T,modalNameClinic:I},v="_container_jjua9_1",$="_title_jjua9_9",K="_subTitle_jjua9_16",O="_row_jjua9_22",B="_column_jjua9_28",R="_editButton_jjua9_36",U="_buttonsRemove_jjua9_42",g="_remove_jjua9_46",X={container:v,title:$,subTitle:K,row:O,column:B,editButton:R,buttonsRemove:U,remove:g};export{Q as a,J as b,D as c,E as d,G as e,k as f,M as g,z as h,V as i,H as j,X as k,W as s,x as u};
