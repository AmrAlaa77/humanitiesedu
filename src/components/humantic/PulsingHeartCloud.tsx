import React, { useEffect, useRef } from 'react';

/**
 * Same luminous point-cloud rendering technique as RotatingBrainCloud (teal core, golden firing
 * hot-spots, sparkle accents, a nearly-transparent glow shell) but shaped as a heart instead of a
 * brain, with a lub-dub heartbeat pulse driving the whole group's scale.
 *
 * Three.js is loaded at runtime from jsdelivr, same as RotatingBrainCloud -- if the CDN is
 * unreachable the section just renders without the ornament.
 */
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

const PulsingHeartCloud: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let disposed = false;
    let raf = 0;
    let renderer: any;
    let resizeHandler: (() => void) | null = null;

    (async () => {
      let THREE: any;
      try {
        THREE = await import(/* @vite-ignore */ THREE_URL);
      } catch {
        return;
      }
      if (disposed || !canvasRef.current) return;

      const container = canvasRef.current.parentElement as HTMLElement;
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 400;

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0, 8);

      /* ---- heart shape: classic 16sin^3 curve, revolved around the vertical axis ---- */
      const heartPoint = (phi: number, theta: number) => {
        const s = Math.sin(phi);
        const r = (s * s * s) / 16; // normalized radius, 0..1
        const y =
          (13 * Math.cos(phi) - 5 * Math.cos(2 * phi) - 2 * Math.cos(3 * phi) - Math.cos(4 * phi)) / 17;
        const x = r * Math.cos(theta);
        const z = r * Math.sin(theta);
        return new THREE.Vector3(x * 2.1, y * 2.0 + 0.15, z * 2.1);
      };

      const heartGroup = new THREE.Group();
      scene.add(heartGroup);

      // gentle-glow shell tracing the same silhouette the cloud samples
      {
        const shellSegs = 48;
        const shellPos: number[] = [];
        const shellIdx: number[] = [];
        for (let i = 0; i <= shellSegs; i++) {
          const phi = (i / shellSegs) * Math.PI;
          for (let j = 0; j <= shellSegs; j++) {
            const theta = (j / shellSegs) * Math.PI * 2;
            const v = heartPoint(phi, theta);
            shellPos.push(v.x, v.y, v.z);
          }
        }
        for (let i = 0; i < shellSegs; i++) {
          for (let j = 0; j < shellSegs; j++) {
            const a = i * (shellSegs + 1) + j;
            const b = a + shellSegs + 1;
            shellIdx.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        const shellGeo = new THREE.BufferGeometry();
        shellGeo.setAttribute('position', new THREE.Float32BufferAttribute(shellPos, 3));
        shellGeo.setIndex(shellIdx);
        shellGeo.computeVertexNormals();
        const shellMat = new THREE.ShaderMaterial({
          transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
          uniforms: { uColor: { value: new THREE.Color('#e0546b') }, uRim: { value: new THREE.Color('#ffeef0') } },
          vertexShader: `varying vec3 vN; varying vec3 vView;
            void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0); vView=-mv.xyz; vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*mv; }`,
          fragmentShader: `varying vec3 vN; varying vec3 vView; uniform vec3 uColor; uniform vec3 uRim;
            void main(){
              vec3 nd=normalize(vN), vd=normalize(vView);
              float fres = pow(1.0-abs(dot(nd,vd)), 2.4);
              vec3 col = mix(uColor, uRim, fres*0.5);
              gl_FragColor = vec4(col, fres*0.24);
            }`,
        });
        heartGroup.add(new THREE.Mesh(shellGeo, shellMat));
      }

      const PARTICLES = 9000, SPARKLE = 14, FIRESPOT = 6;
      const total = PARTICLES;
      const hpos = new Float32Array(total * 3);
      const hseed = new Float32Array(total);
      const hweight = new Float32Array(total);
      for (let i = 0; i < PARTICLES; i++) {
        const phi = Math.random() * Math.PI;
        const theta = Math.random() * Math.PI * 2;
        const v = heartPoint(phi, theta).multiplyScalar(0.985 + Math.random() * 0.03);
        hpos[i * 3] = v.x; hpos[i * 3 + 1] = v.y; hpos[i * 3 + 2] = v.z;
        hweight[i] = 0.35 + Math.random() * 0.65;
        hseed[i] = Math.random() * 10;
      }

      const heartGeo = new THREE.BufferGeometry();
      heartGeo.setAttribute('position', new THREE.BufferAttribute(hpos, 3));
      heartGeo.setAttribute('seed', new THREE.BufferAttribute(hseed, 1));
      heartGeo.setAttribute('weight', new THREE.BufferAttribute(hweight, 1));
      const heartMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uDim: { value: new THREE.Color('#4a0e18') }, uMid: { value: new THREE.Color('#e0546b') }, uBright: { value: new THREE.Color('#ffeef0') },
          uRes: { value: new THREE.Vector2(width, height) },
        },
        vertexShader: `
          attribute float seed; attribute float weight; uniform float uTime; uniform vec2 uRes;
          varying float vW; varying float vTw;
          void main(){
            vW = weight;
            vTw = 0.55 + 0.45*sin(uTime*0.8 + seed*6.28);
            vec4 mv = modelViewMatrix*vec4(position,1.0);
            float base = 0.8 + pow(weight,2.0)*3.2;
            gl_PointSize = max(base*vTw*uRes.y/900.0*(6.0/max(-mv.z,1.0)), 1.0);
            gl_Position = projectionMatrix*mv;
          }`,
        fragmentShader: `
          uniform vec3 uDim; uniform vec3 uMid; uniform vec3 uBright; varying float vW; varying float vTw;
          void main(){
            vec2 p=gl_PointCoord-0.5; float l=length(p); if(l>0.5) discard;
            float core = smoothstep(0.5,0.0,l);
            vec3 col = mix(uDim, uMid, clamp(vW*1.3,0.0,1.0));
            col = mix(col, uBright, pow(vW,3.0)*0.6);
            float a = core * (0.06 + pow(vW,2.1)*0.95) * (0.75+0.25*vTw);
            gl_FragColor = vec4(col, a);
          }`,
      });
      heartGroup.add(new THREE.Points(heartGeo, heartMat));

      // sparkle accents
      const sparkleGeo = new THREE.BufferGeometry();
      const spos: number[] = [], sseed: number[] = [];
      for (let i = 0; i < SPARKLE; i++) {
        const v = heartPoint(Math.random() * Math.PI, Math.random() * Math.PI * 2);
        spos.push(v.x, v.y, v.z); sseed.push(Math.random() * 10);
      }
      sparkleGeo.setAttribute('position', new THREE.Float32BufferAttribute(spos, 3));
      sparkleGeo.setAttribute('seed', new THREE.Float32BufferAttribute(sseed, 1));
      const sparkleMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#ffeef0') }, uRes: { value: new THREE.Vector2(width, height) } },
        vertexShader: `attribute float seed; uniform float uTime; uniform vec2 uRes; varying float vTw;
          void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0);
            vTw = pow(0.5+0.5*sin(uTime*0.6+seed*6.28), 3.0);
            gl_PointSize = max((5.0+vTw*7.0)*uRes.y/900.0*(6.0/max(-mv.z,1.0)), 1.5);
            gl_Position = projectionMatrix*mv; }`,
        fragmentShader: `uniform vec3 uColor; varying float vTw;
          void main(){
            vec2 p=(gl_PointCoord-0.5)*2.0; float ax=abs(p.x), ay=abs(p.y);
            float cross = max(smoothstep(0.9,0.0, ay*5.0+ax*0.25), smoothstep(0.9,0.0, ax*5.0+ay*0.25));
            float core = smoothstep(0.5,0.0, length(p));
            float a = max(cross*0.7, core) * (0.4+0.6*vTw);
            gl_FragColor = vec4(uColor, a);
          }`,
      });
      heartGroup.add(new THREE.Points(sparkleGeo, sparkleMat));

      // golden firing hot-spots
      const fireGeo = new THREE.BufferGeometry();
      const fpos: number[] = [], fseed: number[] = [], fspeed: number[] = [];
      for (let i = 0; i < FIRESPOT; i++) {
        const v = heartPoint(Math.random() * Math.PI, Math.random() * Math.PI * 2);
        fpos.push(v.x, v.y, v.z); fseed.push(Math.random() * 10); fspeed.push(0.35 + Math.random() * 0.55);
      }
      fireGeo.setAttribute('position', new THREE.Float32BufferAttribute(fpos, 3));
      fireGeo.setAttribute('seed', new THREE.Float32BufferAttribute(fseed, 1));
      fireGeo.setAttribute('fspeed', new THREE.Float32BufferAttribute(fspeed, 1));
      const fireMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#ffd57a') }, uRes: { value: new THREE.Vector2(width, height) } },
        vertexShader: `attribute float seed; attribute float fspeed; uniform float uTime; uniform vec2 uRes; varying float vTw;
          void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0);
            vTw = pow(0.5+0.5*sin(uTime*fspeed+seed*6.28), 10.0);
            gl_PointSize = max((6.0+vTw*18.0)*uRes.y/900.0*(6.0/max(-mv.z,1.0)), 1.5);
            gl_Position = projectionMatrix*mv; }`,
        fragmentShader: `uniform vec3 uColor; varying float vTw;
          void main(){
            vec2 p=(gl_PointCoord-0.5)*2.0; float ax=abs(p.x), ay=abs(p.y);
            float cross = max(smoothstep(0.95,0.0, ay*6.0+ax*0.2), smoothstep(0.95,0.0, ax*6.0+ay*0.2));
            float core = smoothstep(0.5,0.0, length(p));
            float a = max(cross*0.85, core) * vTw;
            gl_FragColor = vec4(uColor, a);
          }`,
      });
      heartGroup.add(new THREE.Points(fireGeo, fireMat));

      // heartbeat: quick lub-dub double pulse then a rest, ~72bpm (period ~0.83s per beat cycle)
      const heartbeat = (t: number) => {
        const period = 0.83;
        const p = (t % period) / period;
        const lub = Math.exp(-Math.pow((p - 0.06) / 0.045, 2)) * 0.09;
        const dub = Math.exp(-Math.pow((p - 0.22) / 0.06, 2)) * 0.05;
        return 1 + lub + dub;
      };

      const clock = new THREE.Clock();
      let spin = 0;
      const frame = () => {
        if (disposed) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = performance.now() / 1000;
        if (!reduced) {
          spin += dt * 0.06;
          heartGroup.rotation.y = spin;
          heartGroup.rotation.x = Math.sin(t * 0.15) * 0.05;
          const s = heartbeat(t);
          heartGroup.scale.set(s, s, s);
          heartMat.uniforms.uTime.value = t;
          sparkleMat.uniforms.uTime.value = t;
          fireMat.uniforms.uTime.value = t;
        }
        renderer.render(scene, camera);
        if (!reduced) raf = requestAnimationFrame(frame);
      };
      frame();

      resizeHandler = () => {
        if (!canvasRef.current) return;
        const c = canvasRef.current.parentElement as HTMLElement;
        const w = c.clientWidth || 400, h = c.clientHeight || 400;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        const r = new THREE.Vector2(w, h);
        heartMat.uniforms.uRes.value = r;
        sparkleMat.uniforms.uRes.value = r;
        fireMat.uniforms.uRes.value = r;
        if (reduced) renderer.render(scene, camera);
      };
      window.addEventListener('resize', resizeHandler, { passive: true });
    })();

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss?.();
      }
    };
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default PulsingHeartCloud;
