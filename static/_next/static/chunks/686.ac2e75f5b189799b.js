"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[686,847],{3588:function(e,t,r){r.r(t),r.d(t,{View:function(){return f}});var n=r(9634),i=r(4979),o=r(2985),c=r(5391);let isOrthographicCamera=e=>e&&e.isOrthographicCamera,a=new o.Color;function Container({canvasSize:e,scene:t,index:r,children:n,frames:o,rect:l,track:s}){let u=(0,c.z)(e=>e.get),d=(0,c.z)(e=>e.camera),f=(0,c.z)(e=>e.scene),g=(0,c.z)(e=>e.setEvents),m=0;return(0,c.A)(r=>{if(o===1/0||m<=o){var i;l.current=null==(i=s.current)?void 0:i.getBoundingClientRect(),m++}if(l.current){let{position:{left:i,bottom:o,width:c,height:s},isOffscreen:u}=function(e,t){let{right:r,top:n,left:i,bottom:o,width:c,height:a}=t,l=t.bottom<0||n>e.height||r<0||t.left>e.width;if("top"in e){let t=e.top+e.height,s=i-e.left;return{position:{width:c,height:a,left:s,top:n,bottom:t-o,right:r},isOffscreen:l}}let s=e.height-o;return{position:{width:c,height:a,top:n,left:i,bottom:s,right:r},isOffscreen:l}}(e,l.current),g=c/s;isOrthographicCamera(d)?(d.left!==-(c/2)||d.right!==c/2||d.top!==s/2||d.bottom!==-(s/2))&&(Object.assign(d,{left:-(c/2),right:c/2,top:s/2,bottom:-(s/2)}),d.updateProjectionMatrix()):d.aspect!==g&&(d.aspect=g,d.updateProjectionMatrix()),r.gl.setViewport(i,o,c,s),r.gl.setScissor(i,o,c,s),r.gl.setScissorTest(!0),u?(r.gl.getClearColor(a),r.gl.setClearColor(a,r.gl.getClearAlpha()),r.gl.clear(!0,!0)):r.gl.render(n?f:t,d),r.gl.setScissorTest(!0)}},r),i.useEffect(()=>{let e=u().events.connected;return g({connected:s.current}),()=>g({connected:e})},[]),i.useEffect(()=>{"top"in e||console.warn("Detected @react-three/fiber canvas size does not include position information. <View /> may not work as expected. Upgrade to @react-three/fiber ^8.1.0 for support.\n See https://github.com/pmndrs/drei/issues/944")},[]),i.createElement(i.Fragment,null,n)}let View=({track:e,index:t=1,frames:r=1/0,children:n})=>{var a,l;let s=i.useRef(null),{size:u,scene:d}=(0,c.z)(),[f]=i.useState(()=>new o.Scene),g=i.useCallback((t,r)=>{if(s.current&&e.current&&t.target===e.current){let{width:e,height:n,left:i,top:o}=s.current,c=t.clientX-i,a=t.clientY-o;r.pointer.set(c/e*2-1,-(2*(a/n))+1),r.raycaster.setFromCamera(r.pointer,r.camera)}},[s,e]),[m,v]=i.useReducer(()=>!0,!1);return i.useEffect(()=>{var t;s.current=null==(t=e.current)?void 0:t.getBoundingClientRect(),v()},[e]),i.createElement(i.Fragment,null,m&&(0,c.g)(i.createElement(Container,{canvasSize:u,frames:r,scene:d,track:e,rect:s,index:t},n,i.createElement("group",{onPointerOver:()=>null})),f,{events:{compute:g,priority:t},size:{width:null==(a=s.current)?void 0:a.width,height:null==(l=s.current)?void 0:l.height}}))};var l=r(9678),s=r(6465);let u=i.forwardRef(({makeDefault:e,camera:t,regress:r,domElement:n,enableDamping:o=!0,keyEvents:a=!1,onChange:u,onStart:d,onEnd:f,...g},m)=>{let v=(0,c.z)(e=>e.invalidate),p=(0,c.z)(e=>e.camera),h=(0,c.z)(e=>e.gl),E=(0,c.z)(e=>e.events),b=(0,c.z)(e=>e.setEvents),w=(0,c.z)(e=>e.set),C=(0,c.z)(e=>e.get),z=(0,c.z)(e=>e.performance),k=t||p,x=n||E.connected||h.domElement,j=i.useMemo(()=>new s.zxs(k),[k]);return(0,c.A)(()=>{j.enabled&&j.update()},-1),i.useEffect(()=>(a&&j.connect(!0===a?x:a),j.connect(x),()=>void j.dispose()),[a,x,r,j,v]),i.useEffect(()=>{let callback=e=>{v(),r&&z.regress(),u&&u(e)},onStartCb=e=>{d&&d(e)},onEndCb=e=>{f&&f(e)};return j.addEventListener("change",callback),j.addEventListener("start",onStartCb),j.addEventListener("end",onEndCb),()=>{j.removeEventListener("start",onStartCb),j.removeEventListener("end",onEndCb),j.removeEventListener("change",callback)}},[u,d,f,j,v,b]),i.useEffect(()=>{if(e){let e=C().controls;return w({controls:j}),()=>w({controls:e})}},[e,j]),i.createElement("primitive",(0,l.Z)({ref:m,object:j,enableDamping:o},g))});var d=r(2528);let Three=e=>{let{children:t}=e;return(0,n.jsx)(d.v.In,{children:t})},f=(0,i.forwardRef)((e,t)=>{let{children:r,orbit:o,className:c,...a}=e,l=(0,i.useRef)(null);return(0,i.useImperativeHandle)(t,()=>l.current),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{ref:l,...a,className:c}),(0,n.jsx)(Three,{children:(0,n.jsxs)(View,{track:l,children:[r,o&&(0,n.jsx)(u,{makeDefault:!0})]})})]})});f.displayName="View"},2528:function(e,t,r){r.d(t,{v:function(){return l}});var n,i,o=r(4979),c=r(3522);let a="undefined"!=typeof window&&(null!=(n=window.document)&&n.createElement||(null==(i=window.navigator)?void 0:i.product)==="ReactNative")?o.useLayoutEffect:o.useEffect,l=function(){let e=(0,c.Ue)(e=>({current:[],version:0,set:e}));return{In:({children:t})=>{let r=e(e=>e.set),n=e(e=>e.version);return a(()=>{r(e=>({version:e.version+1}))},[]),a(()=>(r(({current:e})=>({current:[...e,t]})),()=>r(({current:e})=>({current:e.filter(e=>e!==t)}))),[t,n]),null},Out:()=>{let t=e(e=>e.current);return o.createElement(o.Fragment,null,t)}}}()}}]);