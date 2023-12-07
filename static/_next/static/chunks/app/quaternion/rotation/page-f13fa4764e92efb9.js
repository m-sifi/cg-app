(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[98],{3280:function(e,n,t){Promise.resolve().then(t.bind(t,7770))},7770:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return QuaternionRotationPage}});var s=t(9634),i=t(8081),a=t(3156),r=t(4612),o=t(4316),l=t(3813),c=t(8590),u=t.n(c),d=t(4979),x=t(2905),f=t(5391),m=t(2985),h=t(3522);let g=(0,h.Ue)(e=>({axis:[0,0,0],angle:0,setAxis:n=>e(()=>({axis:n})),setAngle:n=>e(()=>({angle:n}))})),Cube=()=>{let[e,n]=g(e=>[e.axis,e.angle]),t=(0,d.useRef)(),i=(0,d.useMemo)(()=>n*Math.PI/180,[n]),a=new m.Quaternion;return(0,f.A)((n,s)=>{a.setFromAxisAngle(new m.Vector3(e[0],e[1],e[2]),i),t.current.quaternion.slerp(a,15*s)}),(0,s.jsx)(s.Fragment,{children:(0,s.jsx)("group",{ref:t,children:(0,s.jsx)(x.xu,{args:[5,5,5],children:(0,s.jsx)("meshStandardMaterial",{color:"orange"})})})})};var p=t(5139),j=t(8967),v=t(9039),b=t(748),w=t(9053);let N=u()(()=>t.e(686).then(t.bind(t,3588)).then(e=>e.View),{loadableGenerated:{webpack:()=>[3588]},ssr:!1,loading:()=>(0,s.jsx)(i.a,{})}),useQuaternionControls=()=>{let[e,n]=g(e=>[e.setAxis,e.setAngle]),[{axis:t,vector:s,angle:i},a]=(0,l.M4)(()=>({axis:{value:[0,0,0],step:.1,min:0,max:1},vector:{value:[0,0,0],step:.1,min:0,max:1,disabled:!0},angle:{value:0,step:.1,min:0,max:360}}));(0,d.useEffect)(()=>{n(i)},[n,i]),(0,d.useEffect)(()=>{let n=(0,r.W$)(t);a({vector:n}),e(n)},[t,a,e,s])};function QuaternionRotationPage(){let e=(0,d.useRef)(),[n,t]=g(e=>[e.angle,e.axis]);useQuaternionControls();let i=(0,d.useRef)(),l=(0,d.useMemo)(()=>(0,r.uR)(n),[n]),c=(0,r.NM)(l),u=t.map(e=>e.toFixed(1));return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"relative",ref:i}),(0,s.jsxs)(N,{className:"h-full w-full",index:0,track:i,orbit:!0,children:[(0,s.jsx)(Cube,{}),(0,s.jsx)(a.G,{}),(0,s.jsx)(o.c,{ref:e,makeDefault:!0,position:[15,15,15],fov:60})]}),(0,s.jsx)("div",{className:"fixed left-0 top-10 z-10 w-screen pl-80",children:(0,s.jsxs)(p.W,{p:"4",children:[(0,s.jsxs)(j.X,{size:"4",weight:"light",children:["Quaternion is a 4 dimensional vector that is used to represent rotations in 3D space. ",(0,s.jsx)("br",{}),"It provide compactness over matrices, reducing memory usage, enabling efficient interpolation, avoiding gimbal lock issues, and offering improved numerical stability."]}),(0,s.jsx)(v.$,{size:"1",mt:"2",className:"flex items-center justify-center",children:(0,s.jsx)(w.Y,{className:"mx-auto block",text:"q = s + ix + jy + kz = [s;v] = [s; x, y, z] = cos(\\frac{".concat(c,"}{2}) + sin(\\frac{").concat(c,"}{2})[").concat(u[0]," \\cdot x, ").concat(u[1]," \\cdot y, ").concat(u[2]," \\cdot z]")})})]})}),(0,s.jsx)("div",{className:"fixed bottom-10 left-0 z-10 w-screen pl-80",children:(0,s.jsx)(v.$,{p:"6",children:(0,s.jsx)(b.V,{children:"Experiment with axis-vector and angle values to discover the precision and versatility of quaternion rotations in controlling 3D object orientations."})})})]})}},4612:function(e,n,t){"use strict";t.d(n,{NM:function(){return round},W$:function(){return normalise},uR:function(){return radians}});let round=e=>Math.round(e).toFixed(1),normalise=e=>{let[n,t,s]=e,i=Math.sqrt(n*n+t*t+s*s);return 0==i?[0,0,0]:[n/i,t/i,s/i]},radians=e=>e*Math.PI/180}},function(e){e.O(0,[252,545,197,391,367,351,657,739,594,904,726,744],function(){return e(e.s=3280)}),_N_E=e.O()}]);