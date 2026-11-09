import{G as He,y as de,u as h,_ as X,D as at,V as be,P as Fe,p as Ve,R as Ge,k as lt,F as Oe,l as ye,m as J,W as ct,c as Me,r as Ne,S as ke,t as we,U as Be,o as ft,v as K,L as dt,n as $e,M as qe,Q as ut,i as H,x as mt,q as pt,B as ht}from"./useVisibleFrameloop-BLUJH5Jy.js";import{r,a as vt,j as $}from"./mount-DEcotNDq.js";const te=new h,Pe=new h,gt=new h,je=new be;function xt(s,e,t){const o=te.setFromMatrixPosition(s.matrixWorld);o.project(e);const n=t.width/2,i=t.height/2;return[o.x*n+n,-(o.y*i)+i]}function yt(s,e){const t=te.setFromMatrixPosition(s.matrixWorld),o=Pe.setFromMatrixPosition(e.matrixWorld),n=t.sub(o),i=e.getWorldDirection(gt);return n.angleTo(i)>Math.PI/2}function wt(s,e,t,o){const n=te.setFromMatrixPosition(s.matrixWorld),i=n.clone();i.project(e),je.set(i.x,i.y),t.setFromCamera(je,e);const c=t.intersectObjects(o,!0);if(c.length){const a=c[0].distance;return n.distanceTo(t.ray.origin)<a}return!0}function St(s,e){if(e instanceof Ve)return e.zoom;if(e instanceof Fe){const t=te.setFromMatrixPosition(s.matrixWorld),o=Pe.setFromMatrixPosition(e.matrixWorld),n=e.fov*Math.PI/180,i=t.distanceTo(o);return 1/(2*Math.tan(n/2)*i)}else return 1}function bt(s,e,t){if(e instanceof Fe||e instanceof Ve){const o=te.setFromMatrixPosition(s.matrixWorld),n=Pe.setFromMatrixPosition(e.matrixWorld),i=o.distanceTo(n),c=(t[1]-t[0])/(e.far-e.near),a=t[1]-c*e.far;return Math.round(c*i+a)}}const Se=s=>Math.abs(s)<1e-10?0:s;function Qe(s,e,t=""){let o="matrix3d(";for(let n=0;n!==16;n++)o+=Se(e[n]*s.elements[n])+(n!==15?",":")");return t+o}const Mt=(s=>e=>Qe(e,s))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),Pt=(s=>(e,t)=>Qe(e,s(t),"translate(-50%,-50%)"))(s=>[1/s,1/s,1/s,1,-1/s,-1/s,-1/s,-1,1/s,1/s,1/s,1,1,1,1,1]);function Et(s){return s&&typeof s=="object"&&"current"in s}const Rt=r.forwardRef(({children:s,eps:e=.001,style:t,className:o,prepend:n,center:i,fullscreen:c,portal:a,distanceFactor:u,sprite:d=!1,transform:f=!1,occlude:l,onOcclude:g,castShadow:L,receiveShadow:C,material:A,geometry:z,zIndexRange:S=[16777271,0],calculatePosition:j=xt,as:m="div",wrapperClass:p,pointerEvents:x="auto",...w},W)=>{const{gl:F,camera:y,scene:O,size:M,raycaster:ne,events:ie,viewport:ue}=He(),[b]=r.useState(()=>document.createElement(m)),me=r.useRef(),B=r.useRef(null),Ae=r.useRef(0),oe=r.useRef([0,0]),Y=r.useRef(null),pe=r.useRef(null),Q=(a==null?void 0:a.current)||ie.connected||F.domElement.parentNode,V=r.useRef(null),se=r.useRef(!1),re=r.useMemo(()=>l&&l!=="blending"||Array.isArray(l)&&l.length&&Et(l[0]),[l]);r.useLayoutEffect(()=>{const U=F.domElement;l&&l==="blending"?(U.style.zIndex=`${Math.floor(S[0]/2)}`,U.style.position="absolute",U.style.pointerEvents="none"):(U.style.zIndex=null,U.style.position=null,U.style.pointerEvents=null)},[l]),r.useLayoutEffect(()=>{if(B.current){const U=me.current=vt(b);if(O.updateMatrixWorld(),f)b.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const v=j(B.current,y,M);b.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${v[0]}px,${v[1]}px,0);transform-origin:0 0;`}return Q&&(n?Q.prepend(b):Q.appendChild(b)),()=>{Q&&Q.removeChild(b),U.unmount()}}},[Q,f]),r.useLayoutEffect(()=>{p&&(b.className=p)},[p]);const Le=r.useMemo(()=>f?{position:"absolute",top:0,left:0,width:M.width,height:M.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:i?"translate3d(-50%,-50%,0)":"none",...c&&{top:-M.height/2,left:-M.width/2,width:M.width,height:M.height},...t},[t,i,c,M,f]),Ye=r.useMemo(()=>({position:"absolute",pointerEvents:x}),[x]);r.useLayoutEffect(()=>{if(se.current=!1,f){var U;(U=me.current)==null||U.render(r.createElement("div",{ref:Y,style:Le},r.createElement("div",{ref:pe,style:Ye},r.createElement("div",{ref:W,className:o,style:t,children:s}))))}else{var v;(v=me.current)==null||v.render(r.createElement("div",{ref:W,style:Le,className:o,children:s}))}});const Z=r.useRef(!0);de(U=>{if(B.current){y.updateMatrixWorld(),B.current.updateWorldMatrix(!0,!1);const v=f?oe.current:j(B.current,y,M);if(f||Math.abs(Ae.current-y.zoom)>e||Math.abs(oe.current[0]-v[0])>e||Math.abs(oe.current[1]-v[1])>e){const G=yt(B.current,y);let I=!1;re&&(Array.isArray(l)?I=l.map(N=>N.current):l!=="blending"&&(I=[O]));const ee=Z.current;if(I){const N=wt(B.current,y,ne,I);Z.current=N&&!G}else Z.current=!G;ee!==Z.current&&(g?g(!Z.current):b.style.display=Z.current?"block":"none");const ae=Math.floor(S[0]/2),et=l?re?[S[0],ae]:[ae-1,0]:S;if(b.style.zIndex=`${bt(B.current,y,et)}`,f){const[N,Ce]=[M.width/2,M.height/2],he=y.projectionMatrix.elements[5]*Ce,{isOrthographicCamera:Ue,top:tt,left:nt,bottom:it,right:ot}=y,st=Mt(y.matrixWorldInverse),rt=Ue?`scale(${he})translate(${Se(-(ot+nt)/2)}px,${Se((tt+it)/2)}px)`:`translateZ(${he}px)`;let k=B.current.matrixWorld;d&&(k=y.matrixWorldInverse.clone().transpose().copyPosition(k).scale(B.current.scale),k.elements[3]=k.elements[7]=k.elements[11]=0,k.elements[15]=1),b.style.width=M.width+"px",b.style.height=M.height+"px",b.style.perspective=Ue?"":`${he}px`,Y.current&&pe.current&&(Y.current.style.transform=`${rt}${st}translate(${N}px,${Ce}px)`,pe.current.style.transform=Pt(k,1/((u||10)/400)))}else{const N=u===void 0?1:St(B.current,y)*u;b.style.transform=`translate3d(${v[0]}px,${v[1]}px,0) scale(${N})`}oe.current=v,Ae.current=y.zoom}}if(!re&&V.current&&!se.current)if(f){if(Y.current){const v=Y.current.children[0];if(v!=null&&v.clientWidth&&v!=null&&v.clientHeight){const{isOrthographicCamera:G}=y;if(G||z)w.scale&&(Array.isArray(w.scale)?w.scale instanceof h?V.current.scale.copy(w.scale.clone().divideScalar(1)):V.current.scale.set(1/w.scale[0],1/w.scale[1],1/w.scale[2]):V.current.scale.setScalar(1/w.scale));else{const I=(u||10)/400,ee=v.clientWidth*I,ae=v.clientHeight*I;V.current.scale.set(ee,ae,1)}se.current=!0}}}else{const v=b.children[0];if(v!=null&&v.clientWidth&&v!=null&&v.clientHeight){const G=1/ue.factor,I=v.clientWidth*G,ee=v.clientHeight*G;V.current.scale.set(I,ee,1),se.current=!0}V.current.lookAt(U.camera.position)}});const ze=r.useMemo(()=>({vertexShader:f?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[f]);return r.createElement("group",X({},w,{ref:B}),l&&!re&&r.createElement("mesh",{castShadow:L,receiveShadow:C,ref:V},z||r.createElement("planeGeometry",null),A||r.createElement("shaderMaterial",{side:at,vertexShader:ze.vertexShader,fragmentShader:ze.fragmentShader})))}),Ze=parseInt(Ge.replace(/\D+/g,"")),Je=Ze>=125?"uv1":"uv2",De=new Me,le=new h;class Ee extends lt{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new Oe(e,3)),this.setAttribute("uv",new Oe(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,o=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),o.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const o=new ye(t,6,1);return this.setAttribute("instanceStart",new J(o,3,0)),this.setAttribute("instanceEnd",new J(o,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let o;e instanceof Float32Array?o=e:Array.isArray(e)&&(o=new Float32Array(e));const n=new ye(o,t*2,1);return this.setAttribute("instanceColorStart",new J(n,t,0)),this.setAttribute("instanceColorEnd",new J(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ct(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Me);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),De.setFromBufferAttribute(t),this.boundingBox.union(De))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ne),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const o=this.boundingSphere.center;this.boundingBox.getCenter(o);let n=0;for(let i=0,c=e.count;i<c;i++)le.fromBufferAttribute(e,i),n=Math.max(n,o.distanceToSquared(le)),le.fromBufferAttribute(t,i),n=Math.max(n,o.distanceToSquared(le));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class Xe extends Ee{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,o=new Float32Array(2*t);for(let n=0;n<t;n+=3)o[2*n]=e[n],o[2*n+1]=e[n+1],o[2*n+2]=e[n+2],o[2*n+3]=e[n+3],o[2*n+4]=e[n+4],o[2*n+5]=e[n+5];return super.setPositions(o),this}setColors(e,t=3){const o=e.length-t,n=new Float32Array(2*o);if(t===3)for(let i=0;i<o;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];else for(let i=0;i<o;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5],n[2*i+6]=e[i+6],n[2*i+7]=e[i+7];return super.setColors(n,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class _e extends ke{constructor(e){super({type:"LineMaterial",uniforms:we.clone(we.merge([Be.common,Be.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new be(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${Ze>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const ve=new K,Te=new h,Re=new h,P=new K,E=new K,D=new K,ge=new h,xe=new $e,_=new dt,We=new h,ce=new Me,fe=new Ne,T=new K;let R,q;function Ie(s,e,t){return T.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),T.multiplyScalar(1/T.w),T.x=q/t.width,T.y=q/t.height,T.applyMatrix4(s.projectionMatrixInverse),T.multiplyScalar(1/T.w),Math.abs(Math.max(T.x,T.y))}function _t(s,e){const t=s.matrixWorld,o=s.geometry,n=o.attributes.instanceStart,i=o.attributes.instanceEnd,c=Math.min(o.instanceCount,n.count);for(let a=0,u=c;a<u;a++){_.start.fromBufferAttribute(n,a),_.end.fromBufferAttribute(i,a),_.applyMatrix4(t);const d=new h,f=new h;R.distanceSqToSegment(_.start,_.end,f,d),f.distanceTo(d)<q*.5&&e.push({point:f,pointOnLine:d,distance:R.origin.distanceTo(f),object:s,face:null,faceIndex:a,uv:null,[Je]:null})}}function At(s,e,t){const o=e.projectionMatrix,i=s.material.resolution,c=s.matrixWorld,a=s.geometry,u=a.attributes.instanceStart,d=a.attributes.instanceEnd,f=Math.min(a.instanceCount,u.count),l=-e.near;R.at(1,D),D.w=1,D.applyMatrix4(e.matrixWorldInverse),D.applyMatrix4(o),D.multiplyScalar(1/D.w),D.x*=i.x/2,D.y*=i.y/2,D.z=0,ge.copy(D),xe.multiplyMatrices(e.matrixWorldInverse,c);for(let g=0,L=f;g<L;g++){if(P.fromBufferAttribute(u,g),E.fromBufferAttribute(d,g),P.w=1,E.w=1,P.applyMatrix4(xe),E.applyMatrix4(xe),P.z>l&&E.z>l)continue;if(P.z>l){const m=P.z-E.z,p=(P.z-l)/m;P.lerp(E,p)}else if(E.z>l){const m=E.z-P.z,p=(E.z-l)/m;E.lerp(P,p)}P.applyMatrix4(o),E.applyMatrix4(o),P.multiplyScalar(1/P.w),E.multiplyScalar(1/E.w),P.x*=i.x/2,P.y*=i.y/2,E.x*=i.x/2,E.y*=i.y/2,_.start.copy(P),_.start.z=0,_.end.copy(E),_.end.z=0;const A=_.closestPointToPointParameter(ge,!0);_.at(A,We);const z=qe.lerp(P.z,E.z,A),S=z>=-1&&z<=1,j=ge.distanceTo(We)<q*.5;if(S&&j){_.start.fromBufferAttribute(u,g),_.end.fromBufferAttribute(d,g),_.start.applyMatrix4(c),_.end.applyMatrix4(c);const m=new h,p=new h;R.distanceSqToSegment(_.start,_.end,p,m),t.push({point:p,pointOnLine:m,distance:R.origin.distanceTo(p),object:s,face:null,faceIndex:g,uv:null,[Je]:null})}}}class Ke extends ft{constructor(e=new Ee,t=new _e({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,o=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let c=0,a=0,u=t.count;c<u;c++,a+=2)Te.fromBufferAttribute(t,c),Re.fromBufferAttribute(o,c),n[a]=a===0?0:n[a-1],n[a+1]=n[a]+Te.distanceTo(Re);const i=new ye(n,2,1);return e.setAttribute("instanceDistanceStart",new J(i,1,0)),e.setAttribute("instanceDistanceEnd",new J(i,1,1)),this}raycast(e,t){const o=this.material.worldUnits,n=e.camera;n===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=e.params.Line2!==void 0&&e.params.Line2.threshold||0;R=e.ray;const c=this.matrixWorld,a=this.geometry,u=this.material;q=u.linewidth+i,a.boundingSphere===null&&a.computeBoundingSphere(),fe.copy(a.boundingSphere).applyMatrix4(c);let d;if(o)d=q*.5;else{const l=Math.max(n.near,fe.distanceToPoint(R.origin));d=Ie(n,l,u.resolution)}if(fe.radius+=d,R.intersectsSphere(fe)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),ce.copy(a.boundingBox).applyMatrix4(c);let f;if(o)f=q*.5;else{const l=Math.max(n.near,ce.distanceToPoint(R.origin));f=Ie(n,l,u.resolution)}ce.expandByScalar(f),R.intersectsBox(ce)!==!1&&(o?_t(this,t):At(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(ve),this.material.uniforms.resolution.value.set(ve.z,ve.w))}}class Lt extends Ke{constructor(e=new Xe,t=new _e({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const Wt=r.forwardRef(function({children:e,follow:t=!0,lockX:o=!1,lockY:n=!1,lockZ:i=!1,...c},a){const u=r.useRef(null),d=r.useRef(null),f=new ut;return de(({camera:l})=>{if(!t||!d.current)return;const g=d.current.rotation.clone();d.current.updateMatrix(),d.current.updateWorldMatrix(!1,!1),d.current.getWorldQuaternion(f),l.getWorldQuaternion(u.current.quaternion).premultiply(f.invert()),o&&(d.current.rotation.x=g.x),n&&(d.current.rotation.y=g.y),i&&(d.current.rotation.z=g.z)}),r.useImperativeHandle(a,()=>d.current,[]),r.createElement("group",X({ref:d},c),r.createElement("group",{ref:u},e))}),zt=r.forwardRef(function({points:e,color:t=16777215,vertexColors:o,linewidth:n,lineWidth:i,segments:c,dashed:a,...u},d){var f,l;const g=He(S=>S.size),L=r.useMemo(()=>c?new Ke:new Lt,[c]),[C]=r.useState(()=>new _e),A=(o==null||(f=o[0])==null?void 0:f.length)===4?4:3,z=r.useMemo(()=>{const S=c?new Ee:new Xe,j=e.map(m=>{const p=Array.isArray(m);return m instanceof h||m instanceof K?[m.x,m.y,m.z]:m instanceof be?[m.x,m.y,0]:p&&m.length===3?[m[0],m[1],m[2]]:p&&m.length===2?[m[0],m[1],0]:m});if(S.setPositions(j.flat()),o){t=16777215;const m=o.map(p=>p instanceof H?p.toArray():p);S.setColors(m.flat(),A)}return S},[e,c,o,A]);return r.useLayoutEffect(()=>{L.computeLineDistances()},[e,L]),r.useLayoutEffect(()=>{a?C.defines.USE_DASH="":delete C.defines.USE_DASH,C.needsUpdate=!0},[a,C]),r.useEffect(()=>()=>{z.dispose(),C.dispose()},[z]),r.createElement("primitive",X({object:L,ref:d},u),r.createElement("primitive",{object:z,attach:"geometry"}),r.createElement("primitive",X({object:C,attach:"material",color:t,vertexColors:!!o,resolution:[g.width,g.height],linewidth:(l=n??i)!==null&&l!==void 0?l:1,dashed:a,transparent:A===4},u)))});function Ct(s,e,t,o){const n=class extends ke{constructor(c={}){const a=Object.entries(s);super({uniforms:a.reduce((u,[d,f])=>{const l=we.clone({[d]:{value:f}});return{...u,...l}},{}),vertexShader:e,fragmentShader:t}),this.key="",a.forEach(([u])=>Object.defineProperty(this,u,{get:()=>this.uniforms[u].value,set:d=>this.uniforms[u].value=d})),Object.assign(this,c)}};return n.key=qe.generateUUID(),n}const Ut=()=>parseInt(Ge.replace(/\D+/g,"")),Ot=Ut(),Bt=Ct({cellSize:.5,sectionSize:1,fadeDistance:100,fadeStrength:1,fadeFrom:1,cellThickness:.5,sectionThickness:1,cellColor:new H,sectionColor:new H,infiniteGrid:!1,followCamera:!1,worldCamProjPosition:new h,worldPlanePosition:new h},`
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
    uniform float fadeFrom;
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

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${Ot>=154?"colorspace_fragment":"encodings_fragment"}>
    }
  `),Ht=r.forwardRef(({args:s,cellColor:e="#000000",sectionColor:t="#2080ff",cellSize:o=.5,sectionSize:n=1,followCamera:i=!1,infiniteGrid:c=!1,fadeDistance:a=100,fadeStrength:u=1,fadeFrom:d=1,cellThickness:f=.5,sectionThickness:l=1,side:g=ht,...L},C)=>{mt({GridMaterial:Bt});const A=r.useRef(null);r.useImperativeHandle(C,()=>A.current,[]);const z=new pt,S=new h(0,1,0),j=new h(0,0,0);de(x=>{z.setFromNormalAndCoplanarPoint(S,j).applyMatrix4(A.current.matrixWorld);const w=A.current.material,W=w.uniforms.worldCamProjPosition,F=w.uniforms.worldPlanePosition;z.projectPoint(x.camera.position,W.value),F.value.set(0,0,0).applyMatrix4(A.current.matrixWorld)});const m={cellSize:o,sectionSize:n,cellColor:e,sectionColor:t,cellThickness:f,sectionThickness:l},p={fadeDistance:a,fadeStrength:u,fadeFrom:d,infiniteGrid:c,followCamera:i};return r.createElement("mesh",X({ref:A,frustumCulled:!1},L),r.createElement("gridMaterial",X({transparent:!0,"extensions-derivatives":!0,side:g},m,p)),r.createElement("planeGeometry",{args:s}))});function jt({a:s,b:e,color:t,fromColor:o,toColor:n,count:i=4,speed:c=.08,size:a=.04,opacity:u=1}){const d=r.useMemo(()=>new h(s[0],s[1],s[2]),[s[0],s[1],s[2]]),f=r.useMemo(()=>new h(e[0],e[1],e[2]),[e[0],e[1],e[2]]),l=r.useRef(),g=r.useMemo(()=>new $e,[]),L=r.useMemo(()=>new h,[]),C=r.useMemo(()=>new H(o||t||"#ffffff"),[o,t]),A=r.useMemo(()=>new H(n||t||o||"#ffffff"),[n,t,o]),z=r.useMemo(()=>new H("#ffffff"),[]),S=r.useMemo(()=>new H,[]),j=r.useMemo(()=>{let p=1234+i*17;const x=()=>(p=(p*9301+49297)%233280,p/233280),w=()=>Math.sqrt(-2*Math.log(Math.max(x(),1e-9)))*Math.cos(2*Math.PI*x());return Array.from({length:i},(W,F)=>({off:F/i,lat:w(),rot:x()*Math.PI*2,sz:.55+x()*.85,hot:x()<.22,tw:x()*Math.PI*2}))},[i]),m=r.useMemo(()=>{const p=new h().subVectors(f,d);p.divideScalar(p.length()||1);const x=Math.abs(p.y)>.9?new h(1,0,0):new h(0,1,0),w=new h().crossVectors(p,x).normalize(),W=new h().crossVectors(p,w).normalize();return{p1:w,p2:W}},[d,f]);return de(p=>{const x=l.current;if(!x)return;const w=p.clock.elapsedTime*c,W=a*7,F=p.clock.elapsedTime;for(let y=0;y<i;y++){const O=j[y],M=(w+O.off)%1;L.lerpVectors(d,f,M);const ne=Math.sin(Math.PI*M),ie=O.lat*W*ne;L.addScaledVector(m.p1,Math.cos(O.rot)*ie),L.addScaledVector(m.p2,Math.sin(O.rot)*ie);const ue=O.hot?.65+.35*Math.sin(F*3+O.tw):1,b=ne*O.sz*(O.hot?1.7:1)*ue;g.makeScale(b,b,b),g.setPosition(L),x.setMatrixAt(y,g),S.copy(C).lerp(A,M),O.hot&&S.lerp(z,.5),x.setColorAt(y,S)}x.instanceMatrix.needsUpdate=!0,x.instanceColor&&(x.instanceColor.needsUpdate=!0)}),$.jsxs("instancedMesh",{ref:l,args:[void 0,void 0,i],children:[$.jsx("sphereGeometry",{args:[a,6,6]}),$.jsx("meshBasicMaterial",{color:"#ffffff",transparent:!0,opacity:u,toneMapped:!1,depthWrite:!1})]})}function Ft({points:s,color:e,lineWidth:t,opacity:o=.5,fromColor:n,toColor:i,dotColor:c,dotCount:a=4,dotSpeed:u=.08,dotSize:d=.038}){const f=r.useMemo(()=>n&&i?[new H(n),new H(i)]:void 0,[n,i]),l=Math.min(1,o*1.15+.05);return $.jsxs($.Fragment,{children:[$.jsx(zt,{points:s,color:f?void 0:e,vertexColors:f,lineWidth:t,transparent:!0,opacity:o,toneMapped:!1}),$.jsx(jt,{a:s[0],b:s[1],color:c||i||e||"#ffffff",fromColor:n||e,toColor:i||e,count:a,speed:u,size:d,opacity:l})]})}export{Wt as B,Ft as F,Ht as G,Rt as H,zt as L};
