import React, { useEffect, useRef } from 'react';

/**
 * A modern 3D glass heart -- replaces the flat SVG heart with an extruded, beveled Three.js mesh
 * (the classic parametric heart curve, extruded for real depth), rotating slowly with a fresnel
 * glass shader and a realistic double-thump heartbeat scale pulse. The ECG line + BPM readout
 * underneath are unchanged. Three.js loads at runtime from jsdelivr (not a bundled dependency),
 * matching RotatingBrainCloud/the /experience page. Respects prefers-reduced-motion and fully
 * disposes the WebGL context on unmount.
 */
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js';

const PulsingHeart3D: React.FC<{ className?: string }> = ({ className = '' }) => {
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
        return; // CDN unreachable -- section just shows the ECG/BPM row without the mesh
      }
      if (disposed || !canvasRef.current) return;

      const container = canvasRef.current.parentElement as HTMLElement;
      const width = container.clientWidth || 260;
      const height = container.clientHeight || 260;

      renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
      camera.position.set(0, 0.15, 6.2);

      /* ---- classic parametric heart curve, extruded + bevelled for real 3D depth ---- */
      const shape = new THREE.Shape();
      const N = 64;
      const pts: any[] = [];
      for (let i = 0; i <= N; i++) {
        const t = (i / N) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        pts.push(new THREE.Vector2(x * 0.095, y * 0.095));
      }
      shape.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) shape.lineTo(pts[i].x, pts[i].y);
      shape.closePath();

      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.62, bevelEnabled: true, bevelThickness: 0.16, bevelSize: 0.14, bevelSegments: 10, curveSegments: 40,
      });
      geo.center();
      geo.rotateZ(Math.PI); // the curve plots point-down; flip so the point sits at the bottom
      geo.computeVertexNormals();

      const heartGroup = new THREE.Group();
      scene.add(heartGroup);

      const mat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: true, side: THREE.DoubleSide,
        uniforms: {
          uDeep: { value: new THREE.Color('#0c3b3f') },
          uMid: { value: new THREE.Color('#22d3ee') },
          uBright: { value: new THREE.Color('#eafffa') },
          uTime: { value: 0 },
        },
        vertexShader: `varying vec3 vN; varying vec3 vView; varying vec3 vPos;
          void main(){ vPos=position; vec4 mv=modelViewMatrix*vec4(position,1.0); vView=-mv.xyz; vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*mv; }`,
        fragmentShader: `varying vec3 vN; varying vec3 vView; varying vec3 vPos;
          uniform vec3 uDeep; uniform vec3 uMid; uniform vec3 uBright; uniform float uTime;
          void main(){
            vec3 nd=normalize(vN), vd=normalize(vView);
            vec3 L=normalize(vec3(-0.4,0.7,0.8));
            float diff = 0.45 + 0.55*max(dot(nd,L),0.0);
            float fres = pow(1.0-max(dot(nd,vd),0.0), 2.2);
            float pulse = 0.6+0.4*sin(uTime*4.6);
            vec3 base = mix(uDeep, uMid, diff);
            vec3 col = base + uBright*fres*0.9 + uMid*pulse*0.08;
            float a = 0.72 + fres*0.28;
            gl_FragColor = vec4(col, a);
          }`,
      });
      const mesh = new THREE.Mesh(geo, mat);
      heartGroup.add(mesh);

      // soft outer glow shell, additive fresnel-only (same family as the /experience brain shell)
      const glowMat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color('#5eead4') } },
        vertexShader: `varying vec3 vN; varying vec3 vView;
          void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0); vView=-mv.xyz; vN=normalize(normalMatrix*normal); gl_Position=projectionMatrix*mv; }`,
        fragmentShader: `varying vec3 vN; varying vec3 vView; uniform vec3 uColor;
          void main(){ vec3 nd=normalize(vN), vd=normalize(vView);
            float f=pow(1.0-max(dot(nd,vd),0.0),2.6);
            gl_FragColor=vec4(uColor*f*1.4, f*0.55); }`,
      });
      const glowMesh = new THREE.Mesh(geo, glowMat);
      glowMesh.scale.setScalar(1.12);
      heartGroup.add(glowMesh);

      heartGroup.rotation.x = 0.18;

      const clock = new THREE.Clock();
      let spin = 0;
      const BEAT = 1.15; // seconds per heartbeat, matches the ECG/BPM row's timing
      const frame = () => {
        if (disposed) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        const t = performance.now() / 1000;
        if (!reduced) {
          spin += dt * 0.35;
          heartGroup.rotation.y = spin;
          // realistic double-thump: quick expand, small settle, second smaller thump
          const phase = (t % BEAT) / BEAT;
          const thump = phase < 0.14 ? phase / 0.14
            : phase < 0.28 ? 1 - (phase - 0.14) / 0.14 * 0.15
            : phase < 0.4 ? 0.85 + (phase - 0.28) / 0.12 * 0.15
            : phase < 0.58 ? 1 - (phase - 0.4) / 0.18
            : 0;
          const s = 1 + thump * 0.09;
          heartGroup.scale.setScalar(s);
          mat.uniforms.uTime.value = t;
        }
        renderer.render(scene, camera);
        if (!reduced) raf = requestAnimationFrame(frame);
      };
      frame();

      resizeHandler = () => {
        if (!canvasRef.current) return;
        const c = canvasRef.current.parentElement as HTMLElement;
        const w = c.clientWidth || 260, h = c.clientHeight || 260;
        camera.aspect = w / h; camera.updateProjectionMatrix();
        renderer.setSize(w, h);
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

  return <canvas ref={canvasRef} className={`block ${className}`} />;
};

export default PulsingHeart3D;
