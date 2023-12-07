(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{3563:function(e,t,o){"use strict";o.d(t,{x:function(){return m}});var n=o(4979),i=o(5374),s=o.n(i),l=o(3700);let c={display:{type:"enum",values:["none","inline","inline-block","block"],default:void 0,responsive:!0}};var u=o(6315),d=o(4687),f=o(4669);let m=n.forwardRef((e,t)=>{let{rest:o,...i}=(0,u.FY)(e),{rest:m,...p}=(0,d.F8)(o),{className:v,asChild:h,display:g=c.display.default,...w}=m,x=h?l.g7:"div";return n.createElement(x,{...w,ref:t,className:s()("rt-Box",v,(0,f.g)(g,"rt-r-display"),(0,d.yt)(p),(0,u.we)(i))})});m.displayName="Box"},7203:function(e,t,o){"use strict";o.d(t,{w:function(){return l}});var n=o(9678),i=o(4979),s=o(2985);let l=i.forwardRef(({userData:e,children:t,geometry:o,threshold:l=15,color:c="black",...u},d)=>{let f=i.useRef(null);return i.useLayoutEffect(()=>{let e=f.current.parent;if(e){let t=o||e.geometry;(t!==f.current.userData.currentGeom||l!==f.current.userData.currentThreshold)&&(f.current.userData.currentGeom=t,f.current.userData.currentThreshold=l,f.current.geometry=new s.EdgesGeometry(t,l))}}),i.useImperativeHandle(d,()=>f.current),i.createElement("lineSegments",(0,n.Z)({ref:f,raycast:()=>null},u),t||i.createElement("lineBasicMaterial",{color:c}))})},4259:function(e,t,o){Promise.resolve().then(o.bind(o,1014))},1014:function(e,t,o){"use strict";o.r(t),o.d(t,{default:function(){return TransformCoordinateSystemPage}});var n,i,s=o(9634),l=o(8081),c=o(3563),u=o(8967),d=o(2403),f=o(9039),m=o(748),p=o(4316),v=o(9678),h=o(4979),g=o(5391),w=o(4768),x=o(3617);let isFunction=e=>"function"==typeof e,y=h.forwardRef(({envMap:e,resolution:t=256,frames:o=1/0,children:n,makeDefault:i,...s},l)=>{let c=(0,g.z)(({set:e})=>e),u=(0,g.z)(({camera:e})=>e),d=(0,g.z)(({size:e})=>e),f=h.useRef(null),m=h.useRef(null),p=(0,x.R)(t);h.useLayoutEffect(()=>{s.manual||f.current.updateProjectionMatrix()},[d,s]),h.useLayoutEffect(()=>{f.current.updateProjectionMatrix()}),h.useLayoutEffect(()=>{if(i)return c(()=>({camera:f.current})),()=>c(()=>({camera:u}))},[f,i,c]);let y=0,b=null,S=isFunction(n);return(0,g.A)(t=>{S&&(o===1/0||y<o)&&(m.current.visible=!1,t.gl.setRenderTarget(p),b=t.scene.background,e&&(t.scene.background=e),t.gl.render(t.scene,f.current),t.scene.background=b,t.gl.setRenderTarget(null),m.current.visible=!0,y++)}),h.createElement(h.Fragment,null,h.createElement("orthographicCamera",(0,v.Z)({left:-(d.width/2),right:d.width/2,top:d.height/2,bottom:-(d.height/2),ref:(0,w.Z)([f,l])},s),!S&&n),h.createElement("group",{ref:m},S&&n(p.texture)))});var b=o(2985);let S=parseInt(b.REVISION.replace(/\D+/g,"")),j=function(e,t,o,n){let i=class extends b.ShaderMaterial{constructor(i={}){let s=Object.entries(e);super({uniforms:s.reduce((e,[t,o])=>{let n=b.UniformsUtils.clone({[t]:{value:o}});return{...e,...n}},{}),vertexShader:t,fragmentShader:o}),this.key="",s.forEach(([e])=>Object.defineProperty(this,e,{get:()=>this.uniforms[e].value,set:t=>this.uniforms[e].value=t})),Object.assign(this,i),n&&n(this)}};return i.key=b.MathUtils.generateUUID(),i}({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,cellThickness:.5,sectionThickness:1,cellColor:new b.Color,sectionColor:new b.Color,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new b.Vector3,worldPlanePosition:new b.Vector3},`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,`
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      float dist = distance(worldCamProjPosition, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${S>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),P=h.forwardRef(({args:e,cellColor:t="#000000",sectionColor:o="#2080ff",cellSize:n=.5,sectionSize:i=1,followCamera:s=!1,infiniteGrid:l=!1,fadeDistance:c=100,fadeStrength:u=1,cellThickness:d=.5,sectionThickness:f=1,side:m=b.BackSide,...p},x)=>{(0,g.e)({GridMaterial:j});let y=h.useRef(null),S=new b.Plane,P=new b.Vector3(0,1,0),E=new b.Vector3(0,0,0);return(0,g.A)(e=>{S.setFromNormalAndCoplanarPoint(P,E).applyMatrix4(y.current.matrixWorld);let t=y.current.material,o=t.uniforms.worldCamProjPosition,n=t.uniforms.worldPlanePosition;S.projectPoint(e.camera.position,o.value),n.value.set(0,0,0).applyMatrix4(y.current.matrixWorld)}),h.createElement("mesh",(0,v.Z)({ref:(0,w.Z)([y,x]),frustumCulled:!1},p),h.createElement("gridMaterial",(0,v.Z)({transparent:!0,"extensions-derivatives":!0,side:m},{cellSize:n,sectionSize:i,cellColor:t,sectionColor:o,cellThickness:d,sectionThickness:f},{fadeDistance:c,fadeStrength:u,infiniteGrid:l,followCamera:s})),h.createElement("planeGeometry",{args:e}))});var E=o(8590),C=o.n(E),z=o(3813),k=o(3522);(n=i||(i={}))[n.Perspective=0]="Perspective",n[n.Orthographic=1]="Orthographic";let D=(0,k.Ue)(()=>({projection:0,view:{position:new b.Vector3,rotation:new b.Euler,zoom:1},model:{position:new b.Vector3,rotation:new b.Euler,scale:new b.Vector3}})),useWorldControls=()=>{let[e,t]=(0,z.M4)("World Coordinate",()=>({position:{value:[0,0,0],step:.1},rotation:{value:[0,0,0],step:.1},scale:{value:[1,1,1],step:.1}}));return(0,h.useEffect)(()=>{D.setState(t=>({...t,model:{position:new b.Vector3(e.position[0],e.position[1],e.position[2]),rotation:new b.Euler(e.rotation[0],e.rotation[1],e.rotation[2]),scale:new b.Vector3(e.scale[0],e.scale[1],e.scale[2])}}))},[e]),e},useViewControls=()=>{let[e,t]=(0,z.M4)("View Coordinate",()=>({type:{disabled:!0,value:"perspective camera",options:["perspective camera","orthographic camera"]},position:{value:[0,0,0],disabled:!0},rotation:{value:[0,0,0],disabled:!0},zoom:{value:1,disabled:!0}})),[o,n]=D(e=>[e.projection,e.view]);(0,h.useEffect)(()=>{let e=n.position,s=n.rotation;t({position:[e.x,e.y,e.z],rotation:[s.x,s.y,s.z],type:o===i.Perspective?"perspective camera":"orthographic camera",zoom:n.zoom})},[t,o,n])},useProjectionControls=()=>{let e=(0,z.M4)("Projection Coordinate",{type:{value:"perspective",options:["perspective","orthographic"]}});(0,h.useEffect)(()=>{let t="perspective"===e.type?i.Perspective:i.Orthographic;D.setState({projection:t})},[e])};var V=o(2905),R=o(7203);let Cube=()=>{let e=(0,h.useRef)(null),[t,o]=D(e=>[e.projection,e.model]),n=new b.Vector3,l=(0,h.useMemo)(()=>new b.Quaternion().setFromEuler(o.rotation),[o]);return(0,g.A)((s,c)=>{var u,d,f;let m=s.camera,p=o.position,v=o.scale;l.setFromEuler(o.rotation),null===(u=e.current)||void 0===u||u.position.lerp(p,5*c),null===(d=e.current)||void 0===d||d.scale.lerp(v,5*c),null===(f=e.current)||void 0===f||f.quaternion.slerp(l,5*c),D.setState(e=>({...e,view:{position:m.position,rotation:m.rotation,zoom:t===i.Perspective?m.position.distanceTo(n):m.zoom}}))}),(0,s.jsx)(V.xu,{ref:e,args:[5,5,5],children:(0,s.jsx)(R.w,{})})},N=C()(()=>Promise.all([o.e(545),o.e(657),o.e(847)]).then(o.bind(o,3588)).then(e=>e.View),{loadableGenerated:{webpack:()=>[3588]},ssr:!1,loading:()=>(0,s.jsx)(l.a,{})});function TransformCoordinateSystemPage(){let e=(0,h.useRef)(),t=(0,h.useRef)(),o=(0,h.useRef)();useProjectionControls(),useWorldControls(),useViewControls();let[n]=D(e=>[e.projection]);return(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)(h.Suspense,{fallback:null,children:[(0,s.jsx)("div",{className:"relative",ref:o}),(0,s.jsxs)(N,{className:"h-full w-full",index:0,track:o,orbit:!0,children:[(0,s.jsx)(Cube,{}),n===i.Perspective?(0,s.jsx)(p.c,{ref:e,makeDefault:!0,position:[0,0,30],fov:60}):(0,s.jsx)(y,{ref:t,makeDefault:!0,position:[0,0,30],zoom:30}),(0,s.jsx)(P,{})]}),(0,s.jsx)("div",{className:"fixed left-0 top-10 z-10 w-screen pl-80",children:(0,s.jsxs)(c.x,{ml:"9",children:[(0,s.jsx)(u.X,{size:"8",weight:"light",mb:"2",children:"Coordinate System"}),(0,s.jsxs)(d.x,{size:"4",weight:"light",children:["Coordinate Systems is used to orient objects in a Scene. ",(0,s.jsx)("br",{}),"It is achieved by combining multiple Coordinate Spaces (represented as a matrix) ",(0,s.jsx)("br",{}),(0,s.jsxs)("ul",{className:"list-disc",children:[(0,s.jsx)("li",{className:"ml-10",children:"Projection Space: 2D space that represents the 3D scene"}),(0,s.jsx)("li",{className:"ml-10",children:"Eye Space: 3D space that represents the viewer's perspective"}),(0,s.jsx)("li",{className:"ml-10",children:"World Space: 3D space that represents the global positions of objects"})]})]}),(0,s.jsx)(u.X,{size:"4",weight:"light"})]})}),(0,s.jsx)("div",{className:"fixed bottom-10 left-0 z-10 w-screen pl-80",children:(0,s.jsx)(f.$,{p:"6",children:(0,s.jsx)(m.V,{children:"Explore the changes in the coordinate system by playing around with the projection, world and view properties."})})})]})})}},8081:function(e,t,o){"use strict";o.d(t,{a:function(){return Loader}});var n=o(9634);let Loader=()=>(0,n.jsx)("div",{className:"flex h-96 w-full flex-col items-center justify-center",children:(0,n.jsxs)("svg",{className:"-ml-1 mr-3 h-5 w-5 animate-spin text-black",fill:"none",viewBox:"0 0 24 24",children:[(0,n.jsx)("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),(0,n.jsx)("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})})},8652:function(e,t,o){"use strict";/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=o(4979),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=n.useState,l=n.useEffect,c=n.useLayoutEffect,u=n.useDebugValue;function r(e){var t=e.getSnapshot;e=e.value;try{var o=t();return!i(e,o)}catch(e){return!0}}var d="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var o=t(),n=s({inst:{value:o,getSnapshot:t}}),i=n[0].inst,d=n[1];return c(function(){i.value=o,i.getSnapshot=t,r(i)&&d({inst:i})},[e,o,t]),l(function(){return r(i)&&d({inst:i}),e(function(){r(i)&&d({inst:i})})},[e]),u(o),o};t.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:d},1973:function(e,t,o){"use strict";/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var n=o(4979),i=o(3916),s="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},l=i.useSyncExternalStore,c=n.useRef,u=n.useEffect,d=n.useMemo,f=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,o,n,i){var m=c(null);if(null===m.current){var p={hasValue:!1,value:null};m.current=p}else p=m.current;var v=l(e,(m=d(function(){function a(t){if(!c){if(c=!0,e=t,t=n(t),void 0!==i&&p.hasValue){var o=p.value;if(i(o,t))return l=o}return l=t}if(o=l,s(e,t))return o;var u=n(t);return void 0!==i&&i(o,u)?o:(e=t,l=u)}var e,l,c=!1,u=void 0===o?null:o;return[function(){return a(t())},null===u?void 0:function(){return a(u())}]},[t,o,n,i]))[0],m[1]);return u(function(){p.hasValue=!0,p.value=v},[v]),f(v),v}},3916:function(e,t,o){"use strict";e.exports=o(8652)},698:function(e,t,o){"use strict";e.exports=o(1973)},3522:function(e,t,o){"use strict";o.d(t,{Ue:function(){return create}});let createStoreImpl=e=>{let t;let o=new Set,setState=(e,n)=>{let i="function"==typeof e?e(t):e;if(!Object.is(i,t)){let e=t;t=(null!=n?n:"object"!=typeof i)?i:Object.assign({},t,i),o.forEach(o=>o(t,e))}},getState=()=>t,n={setState,getState,subscribe:e=>(o.add(e),()=>o.delete(e)),destroy:()=>{console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),o.clear()}};return t=e(setState,getState,n),n},createStore=e=>e?createStoreImpl(e):createStoreImpl;var n=o(4979),i=o(698);let{useSyncExternalStoreWithSelector:s}=i,l=!1,createImpl=e=>{"function"!=typeof e&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");let t="function"==typeof e?createStore(e):e,useBoundStore=(e,o)=>(function(e,t=e.getState,o){o&&!l&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),l=!0);let i=s(e.subscribe,e.getState,e.getServerState||e.getState,t,o);return(0,n.useDebugValue)(i),i})(t,e,o);return Object.assign(useBoundStore,t),useBoundStore},create=e=>e?createImpl(e):createImpl}},function(e){e.O(0,[252,391,367,351,739,904,726,744],function(){return e(e.s=4259)}),_N_E=e.O()}]);