(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{3595:function(n,e,t){"use strict";var i=t(5318);e.Z=void 0;var o=i(t(4938)),r=t(5893),a=(0,o.default)((0,r.jsx)("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"}),"Lock");e.Z=a},6429:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return t(4754)}])},4754:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return p}});var i=t(5893),o=t(9520),r=t(7357),a=t(9661),c=t(5861),s=t(4546),l=t(3321),u=t(3795),d=t(3595),h=t(1265),f=t(1927),m=t(7294),x=(0,h.Z)();function p(){var n=(0,m.useState)(""),e=n[0],t=n[1],h=(0,m.useState)(""),p=h[0],g=h[1];return(0,i.jsx)(f.Z,{theme:x,children:(0,i.jsx)(o.Z,{maxWidth:"xs",sx:{height:"100%"},children:(0,i.jsxs)(r.Z,{sx:{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",height:"100%"},children:[(0,i.jsx)(a.Z,{sx:{m:1,backgroundColor:"primary.main"},children:(0,i.jsx)(d.Z,{})}),(0,i.jsx)(c.Z,{component:"h1",variant:"h5",children:"\u0412\u0445\u043e\u0434 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442"}),(0,i.jsxs)(r.Z,{component:"form",sx:{mt:1},onSubmit:function(n){n.preventDefault(),console.log(e,p),fetch("".concat(window.location.origin,":8088/login"),{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"username=".concat(e,"&password=").concat(p)}).then((function(n){200==n.status?n.json().then((function(n){localStorage.setItem("token",n.access_token),document.location.href="/cases"})):n.json().then((function(n){alert(n.detatils)}))}))},children:[(0,i.jsx)(s.Z,{margin:"normal",required:!0,fullWidth:!0,id:"login",label:"\u041b\u043e\u0433\u0438\u043d",value:e,onChange:function(n){t(n.target.value)}}),(0,i.jsx)(s.Z,{margin:"normal",required:!0,fullWidth:!0,id:"password",label:"\u041f\u0430\u0440\u043e\u043b\u044c",type:"password",value:p,onChange:function(n){g(n.target.value)}}),(0,i.jsx)(l.Z,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},children:"\u0412\u043e\u0439\u0442\u0438"})]}),(0,i.jsx)(r.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"flex-end",width:"100%"},children:(0,i.jsx)(u.Z,{href:"/register",variant:"body2",children:"\u041d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430? \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"})})]})})})}}},function(n){n.O(0,[105,750,774,888,179],(function(){return e=6429,n(n.s=e);var e}));var e=n.O();_N_E=e}]);