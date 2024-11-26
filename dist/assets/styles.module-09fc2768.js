import{i as n,aQ as r,aR as a,aS as u,aT as c}from"./index-b7b75947.js";import{u as d}from"./hooks-196f33c9.js";import{u as m}from"./useQuery-00968507.js";import{u as o}from"./useMutation-3de9e6b6.js";const s={superAdmin:{root:["super-admin"],createClinic:()=>[...s.superAdmin.root,"create-clinic"],updateClinic:()=>[...s.superAdmin.root,"update-clinic"],addTypeClinic:()=>[...s.superAdmin.root,"add-type-clinic"],allTypeClinic:()=>[...s.superAdmin.root,"all-type-clinic"],switchStatusClinic:()=>[...s.superAdmin.root,"switch-status-clinic"],listofusers:()=>[...s.superAdmin.root,"listofusers"],statusUser:()=>[...s.superAdmin.root,"status-user"],newPassword:()=>[...s.superAdmin.root,"new-password"]}},l=async t=>(await n({url:"/admin/listofusers",method:"GET",params:t})).data;function x(t){return d({queryKey:s.superAdmin.listofusers(),fetchPage:l,initialQuery:t})}function E(){return m({queryKey:s.superAdmin.allTypeClinic(),queryFn:async()=>(await n({url:"/admin/all-type-clinic",method:"GET"})).data})}function G(){return o({mutationKey:s.superAdmin.createClinic(),mutationFn:async t=>await n({url:"/admin/create-clinic",method:"POST",data:t})})}function Q(){return o({mutationKey:s.superAdmin.updateClinic(),mutationFn:async t=>(await n({url:"/admin/update-clinic",method:"POST",data:t})).data})}function k(){return o({mutationKey:s.superAdmin.statusUser(),mutationFn:async t=>await n({url:"/admin/switch-status-user",method:"POST",data:t})})}function M(){return o({mutationKey:s.superAdmin.newPassword(),mutationFn:async t=>await n({url:"/admin/set-new-password",method:"POST",data:t})})}const _=t=>({clinicInfo:null,addClinicInfo:e=>{t({clinicInfo:e},!1,"superAdminSession/addPatient")},deleteClinicInfo:()=>{t({clinicInfo:null},!1,"superAdminSession/deletePatient")}}),i=r()(a(u((...t)=>({..._(...t)}),{name:"Super admin Session Store"}),{name:"superAdminSession"})),z=()=>c(i,t=>t.clinicInfo),D=t=>i.getState().addClinicInfo(t),H=()=>i.getState().deleteClinicInfo(),p="_editPassword_b6w3j_1",f="_submitPassword_b6w3j_6",J={editPassword:p,submitPassword:f},w="_form_1m454_1",b="_submit_1m454_6",V={form:w,submit:b},y="_root_thb9d_1",S="_title_thb9d_9",h="_subTitle_thb9d_16",A="_row_thb9d_22",C="_column_thb9d_28",j="_editButton_thb9d_36",P="_buttonsRemove_thb9d_40",T="_remove_thb9d_46",v="_modalNameClinic_thb9d_59",W={root:y,title:S,subTitle:h,row:A,column:C,editButton:j,buttonsRemove:P,remove:T,modalNameClinic:v},I="_container_jjua9_1",$="_title_jjua9_9",K="_subTitle_jjua9_16",O="_row_jjua9_22",R="_column_jjua9_28",B="_editButton_jjua9_36",U="_buttonsRemove_jjua9_42",g="_remove_jjua9_46",X={container:I,title:$,subTitle:K,row:O,column:R,editButton:B,buttonsRemove:U,remove:g};export{D as a,M as b,J as c,E as d,G as e,Q as f,z as g,H as h,V as i,k as j,X as k,W as s,x as u};