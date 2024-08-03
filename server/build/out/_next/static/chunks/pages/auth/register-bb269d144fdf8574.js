(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[461],{6659:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/register",function(){return t(5161)}])},3638:function(e,r,t){"use strict";t.d(r,{Y:function(){return l},c:function(){return s}});var a=t(2729),n=t(7283);function i(){let e=(0,a._)(["\n  mutation RegisterUser($email: String!, $password: String!, $username: String!, $avatar: String) {\n    userRegistration(\n      userCredentials: { email: $email, password: $password, username: $username, avatar: $avatar }\n    )\n  }\n"]);return i=function(){return e},e}function o(){let e=(0,a._)(["\n  mutation LoginUser($username: String!, $password: String!) {\n    userLogin(userCredentials: { username: $username, password: $password })\n  }\n"]);return o=function(){return e},e}let s=(0,n.Ps)(i()),l=(0,n.Ps)(o())},5161:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return v}});var a=t(5893),n=t(7294),i=t(629),o=t(7357),s=t(5861),l=t(3321),u=t(8799),p=t(1496),d=t(1479),c=t(319),m=t(990),x=t(1163),h=t(2705),g=t.n(h),f=t(3638);function v(e){let{}=e,[r,t]=(0,n.useState)({email:"",password:"",username:"",avatar:"https://shorturl.at/gwDEY"}),[l,u]=(0,n.useState)(!0),[p,h]=(0,n.useState)(),[v]=(0,c.D)(f.c),k=(0,x.useRouter)(),C=e=>{let r=g().object({email:g().string().email({tlds:{allow:!1}}).required(),username:g().string().required(),password:g().string().min(8).max(32).required(),avatar:g().string().uri()}),{error:t}=r.validate(e);return t?u(!0):u(!1)},j=(e,a)=>{t({...r,[a]:e.target.value.trim()})},_=async e=>{try{await v({variables:{...e}})}catch(e){if(e instanceof m.cA){h(e.message);return}h("Unexpected error")}t({email:"",password:"",username:"",avatar:""}),k.push("/auth/login")};return(0,n.useEffect)(()=>{C(r)},[r]),(0,a.jsx)(y,{children:(0,a.jsxs)(i.Z,{sx:{width:"700px",height:"initial","&:hover":{bgcolor:"primary.light",cursor:"unset"},padding:"50px"},children:[(0,a.jsxs)(o.Z,{sx:{marginBottom:"50px",display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,a.jsx)(d.Z,{sx:{fontSize:"90px",color:"primary.dark",margin:"20px"}}),(0,a.jsx)(s.Z,{variant:"h5",sx:{textAlign:"center",color:"primary.dark",textTransform:"uppercase"},children:"Register new account"})]}),(0,a.jsxs)(o.Z,{sx:{display:"flex",flexDirection:"column",marginBottom:"50px"},children:[(0,a.jsx)(b,{label:"Email",value:r.email,onChange:e=>j(e,"email"),type:"email",required:!0,helperText:"For example: example@someMail.com"}),(0,a.jsx)(b,{label:"Username",value:r.username,onChange:e=>j(e,"username"),required:!0,helperText:"For example: chatUser_4221"}),(0,a.jsx)(b,{label:"Password",value:r.password,onChange:e=>j(e,"password"),type:"password",required:!0,helperText:"Length from 8 to 32 characters"}),(0,a.jsx)(b,{label:"Avatar URL",value:r.avatar,onChange:e=>j(e,"avatar"),type:"url",helperText:"For example: 'https://coolPicture.com' or leave this field as default"})]}),p?(0,a.jsxs)(s.Z,{variant:"h6",color:"error",marginBottom:"20px",children:['An error ocurred: "',p,'"']}):null,(0,a.jsxs)(o.Z,{sx:{display:"flex",flexDirection:"column"},children:[(0,a.jsx)(w,{sx:{"&:disabled":{opacity:"0.7"}},disabled:l,onClick:()=>_(r),children:"Register"}),(0,a.jsx)(w,{onClick:()=>k.push("/auth/login"),sx:{bgcolor:"primary.main",color:"primary.dark","&:hover":{color:"primary.main"}},children:"Login"})]})]})})}let y=(0,p.ZP)(o.Z)(()=>({height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"})),w=(0,p.ZP)(l.Z)(e=>{let{theme:r}=e;return{height:"50px",padding:"0px 30px 0px 30px",backgroundColor:r.palette.primary.dark,borderRadius:"10px",transition:"0.2s",marginTop:"5px",marginBottom:"5px","&:hover":{backgroundColor:r.palette.primary.dark,opacity:"0.8",transition:"0.2s"}}}),b=(0,p.ZP)(u.Z)(e=>{let{theme:r}=e;return{marginTop:"5px",fontSize:"48px",marginBottom:"5px","& label":{color:"grey"},"& label.Mui-focused":{color:r.palette.primary.dark},"& .MuiInput-underline:after":{borderBottomColor:r.palette.primary.dark},"& .MuiOutlinedInput-root":{"& fieldset":{borderColor:r.palette.primary.dark,borderWidth:2},"&:hover fieldset":{borderColor:r.palette.primary.dark,borderWidth:3},"&.Mui-focused fieldset":{borderColor:r.palette.primary.dark}}}})}},function(e){e.O(0,[144,525,902,774,888,179],function(){return e(e.s=6659)}),_N_E=e.O()}]);