import React, { useEffect, useRef } from 'react';

/**
 * The same luminous point-cloud brain built for /experience (teal cortex stipple, hanging
 * temporal lobes, cerebellum, brain stem, golden firing hot-spots) -- scaled down and slowed
 * down as a background ornament, replacing the original SVG wireframe RotatingBrain here.
 *
 * Three.js is loaded at runtime from jsdelivr (not a bundled dependency) so this stays a plain
 * drop-in component; if the CDN is unreachable the section just renders without the ornament.
 * Skips all animation under prefers-reduced-motion, and fully disposes the WebGL context on
 * unmount.
 */
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

const RotatingBrainCloud: React.FC<{ className?: string }> = ({ className = '' }) => {
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
        return; // CDN unreachable -- leave the section without the ornament, nothing breaks
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

      /* ---- shape maths, ported from /experience ---- */
      const hash = (x: number, y: number, z: number) => {
        const n = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
        return n - Math.floor(n);
      };
      const vnoise = (x: number, y: number, z: number) => {
        const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
        let xf = x - xi, yf = y - yi, zf = z - zi;
        const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
        const L = (a: number, b: number, t: number) => a + (b - a) * t;
        return L(
          L(L(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), L(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v),
          L(L(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), L(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v),
          w
        );
      };
      const ridged5 = (x: number, y: number, z: number) => {
        let sum = 0, amp = 0.55, freq = 1.0, norm = 0;
        for (let o = 0; o < 5; o++) {
          let n = vnoise(x * freq + o * 17.3, y * freq - o * 9.1, z * freq + o * 4.7) * 2 - 1;
          n = 1.0 - Math.abs(n);
          n = n * n;
          sum += n * amp; norm += amp; freq *= 2.02; amp *= 0.5;
        }
        return sum / norm;
      };

      const R0 = 1.9;
      const stretch = [1.34, 0.94, 1.12];
      const brainBaseDisp = (n: any) => {
        const topMask = THREE.MathUtils.clamp(n.y * 1.1 + 0.7, 0, 1);
        const fissure = Math.exp(-Math.pow(n.x / 0.06, 2)) * 0.27 * topMask;
        const sylv = Math.exp(-Math.pow((Math.abs(n.x) - 0.58) / 0.11, 2)) * Math.exp(-Math.pow((n.y - 0.02) / 0.16, 2)) * 0.16;
        const flat = Math.max(0, -n.y - 0.5) * 0.3;
        const frontBulge = Math.max(0, n.z) * 0.11 * THREE.MathUtils.clamp(1 - Math.abs(n.x) * 0.6, 0, 1);
        const occipitalTaper = Math.max(0, -n.z) * 0.14 * THREE.MathUtils.clamp(1 - n.y * 0.4, 0, 1);
        return -fissure - sylv - flat + frontBulge - occipitalTaper;
      };
      const brainFolds = (n: any) =>
        (ridged5(n.x * 2.5 + 11, n.y * 2.5, n.z * 2.5) - 0.52) * 0.5 +
        (ridged5(n.x * 5.4 + 3, n.y * 5.4, n.z * 5.4) - 0.5) * 0.14 +
        (ridged5(n.x * 9.5 + 7, n.y * 9.5, n.z * 9.5) - 0.5) * 0.045;
      const brainDisp = (n: any) => brainBaseDisp(n) + brainFolds(n);
      const shapeLobes = (v: any, n: any) => {
        const cb = Math.exp(-((v.x * v.x) / 1.05 + Math.pow(v.y + 1.6, 2) / 0.5 + Math.pow(v.z + 1.55, 2) / 0.65));
        v.multiplyScalar(1 + cb * 0.24);
        const side = Math.min(1, Math.abs(n.x) / 0.78);
        const lowness = THREE.MathUtils.clamp(-n.y * 1.15 + 0.22, 0, 1);
        const temporal = Math.pow(side, 1.4) * lowness;
        v.y -= temporal * 0.44;
        v.x *= 1 + temporal * 0.17;
        v.z += temporal * 0.12;
        return v;
      };
      const brainSurface = (n: any, radialScale: number, disp: number) => {
        const rad = R0 * (1 + disp) * radialScale;
        const v = new THREE.Vector3(n.x * stretch[0], n.y * stretch[1], n.z * stretch[2]).multiplyScalar(rad);
        return shapeLobes(v, n);
      };
      const brainPoint = (radialScale: number) => {
        const z = Math.random() * 2 - 1, theta = Math.random() * Math.PI * 2, rr = Math.sqrt(Math.max(0, 1 - z * z));
        const n = new THREE.Vector3(rr * Math.cos(theta), z, rr * Math.sin(theta));
        const disp = brainDisp(n);
        const v = brainSurface(n, radialScale, disp);
        const weight = THREE.MathUtils.clamp(disp * 3.0 + 0.5, 0, 1);
        return { v, weight };
      };

      const brainGroup = new THREE.Group();
      brainGroup.rotation.z = 0.3;
      brainGroup.rotation.y = 2.07;
      scene.add(brainGroup);

      // scaled down for a background ornament, not the full-page hero
      const PARTICLES = 9000, DEPTH = 1400, STEM = 700, SPARKLE = 16, FIRESPOT = 6;
      const total = PARTICLES + DEPTH + STEM;
      const bpos = new Float32Array(total * 3);
      const bseed = new Float32Array(total);
      const bweight = new Float32Array(total);
      let bi = 0;
      for (let i = 0; i < PARTICLES; i++) {
        const { v, weight } = brainPoint(1.0 + (Math.random() - 0.5) * 0.01);
        bpos[bi * 3] = v.x; bpos[bi * 3 + 1] = v.y; bpos[bi * 3 + 2] = v.z;
        bweight[bi] = weight; bseed[bi] = Math.random() * 10; bi++;
      }
      for (let i = 0; i < DEPTH; i++) {
        const { v, weight } = brainPoint(0.9 + Math.random() * 0.07);
        bpos[bi * 3] = v.x; bpos[bi * 3 + 1] = v.y; bpos[bi * 3 + 2] = v.z;
        bweight[bi] = weight * 0.28; bseed[bi] = Math.random() * 10; bi++;
      }
      {
        const stemHeight = 2.05, stemTopR = 0.46, stemBottomR = 0.13;
        for (let i = 0; i < STEM; i++) {
          const t = Math.random();
          const y = -stemHeight / 2 + t * stemHeight;
          const baseR = THREE.MathUtils.lerp(stemBottomR, stemTopR, t);
          const pons = Math.exp(-Math.pow((t - 0.8) / 0.1, 2)) * 0.11;
          const medulla = Math.exp(-Math.pow((t - 0.55) / 0.12, 2)) * 0.045;
          const rad = baseR * (1 + pons + medulla) * (0.65 + Math.random() * 0.35);
          const ang = Math.random() * Math.PI * 2;
          let x = Math.cos(ang) * rad, z = Math.sin(ang) * rad;
          z -= Math.pow(Math.max(0, 0.6 - t), 1.4) * 0.4;
          x += 0.02; z += -0.22;
          bpos[bi * 3] = x; bpos[bi * 3 + 1] = y - 1.82; bpos[bi * 3 + 2] = z;
          bweight[bi] = 0.55 + Math.random() * 0.3; bseed[bi] = Math.random() * 10; bi++;
        }
      }

      const brainGeo = new THREE.BufferGeometry();
      brainGeo.setAttribute('position', new THREE.BufferAttribute(bpos, 3));
      brainGeo.setAttribute('seed', new THREE.BufferAttribute(bseed, 1));
      brainGeo.setAttribute('weight', new THREE.BufferAttribute(bweight, 1));
      const brainMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uDim: { value: new THREE.Color('#0e3a4a') }, uMid: { value: new THREE.Color('#3fc2c9') }, uBright: { value: new THREE.Color('#eafffa') },
          uRes: { value: new THREE.Vector2(width, height) },
        },
        vertexShader: `
          attribute float seed; attribute float weight; uniform float uTime; uniform vec2 uRes;
          varying float vW; varying float vTw;
          void main(){
            vW = weight;
            vTw = 0.55 + 0.45*sin(uTime*0.8 + seed*6.28);
            vec4 mv = modelViewMatrix*vec4(position,1.0);
            float base = 1.15 + weight*2.3;
            gl_PointSize = max(base*vTw*uRes.y/900.0*(6.0/max(-mv.z,1.0)), 1.0);
            gl_Position = projectionMatrix*mv;
          }`,
        fragmentShader: `
          uniform vec3 uDim; uniform vec3 uMid; uniform vec3 uBright; varying float vW; varying float vTw;
          void main(){
            vec2 p=gl_PointCoord-0.5; float l=length(p); if(l>0.5) discard;
            float core = smoothstep(0.5,0.0,l);
            vec3 col = mix(uDim, uMid, clamp(vW*1.3,0.0,1.0));
            col = mix(col, uBright, pow(vW,3.0)*0.55);
            float a = core * (0.17 + vW*0.5) * (0.75+0.25*vTw);
            gl_FragColor = vec4(col, a);
          }`,
      });
      brainGroup.add(new THREE.Points(brainGeo, brainMat));

      // sparkle accents
      const sparkleGeo = new THREE.BufferGeometry();
      const spos: number[] = [], sseed: number[] = [];
      for (let i = 0; i < SPARKLE; i++) { const { v } = brainPoint(1.0); spos.push(v.x, v.y, v.z); sseed.push(Math.random() * 10); }
      sparkleGeo.setAttribute('position', new THREE.Float32BufferAttribute(spos, 3));
      sparkleGeo.setAttribute('seed', new THREE.Float32BufferAttribute(sseed, 1));
      const sparkleMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color('#eafffa') }, uRes: { value: new THREE.Vector2(width, height) } },
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
      brainGroup.add(new THREE.Points(sparkleGeo, sparkleMat));

      // golden firing hot-spots
      const fireGeo = new THREE.BufferGeometry();
      const fpos: number[] = [], fseed: number[] = [], fspeed: number[] = [];
      for (let i = 0; i < FIRESPOT; i++) {
        const { v } = brainPoint(1.01);
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
      brainGroup.add(new THREE.Points(fireGeo, fireMat));

      const clock = new THREE.Clock();
      let spin = 0;
      const frame = () => {
        if (disposed) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = performance.now() / 1000;
        if (!reduced) {
          spin += dt * 0.06;
          brainGroup.rotation.y = 2.07 + spin;
          brainGroup.rotation.x = Math.sin(t * 0.15) * 0.05;
          brainMat.uniforms.uTime.value = t;
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
        brainMat.uniforms.uRes.value = r;
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

export default RotatingBrainCloud;
