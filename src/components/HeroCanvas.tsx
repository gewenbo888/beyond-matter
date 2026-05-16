"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The opening visual: a single dense mass (the "stone") that progressively
 * disperses into atoms, particles, fields, then a graph of pure relations.
 * Stage is driven by the user's scroll position over the hero section.
 */
export default function HeroCanvas() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mount.current) return;
    const el = mount.current;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(dpr);
    renderer.setSize(el.clientWidth, el.clientHeight, false);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ──────────────────────────────────────────────────────────────────────
    // Point cloud — encodes 4 target shapes per particle (stone → ... → graph).
    // ──────────────────────────────────────────────────────────────────────
    const N = 6500;
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3); // current
    const tA = new Float32Array(N * 3); // stone
    const tB = new Float32Array(N * 3); // atoms (sparse shells)
    const tC = new Float32Array(N * 3); // field lines
    const tD = new Float32Array(N * 3); // graph nodes
    const seed = new Float32Array(N);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    for (let i = 0; i < N; i++) {
      // A: stone — tight, slightly oblate ball
      const r = Math.cbrt(Math.random()) * 0.9;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      tA[i * 3] = r * Math.sin(p) * Math.cos(t) * 1.05;
      tA[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.95;
      tA[i * 3 + 2] = r * Math.cos(p);

      // B: atoms — concentric shells
      const shell = 0.4 + Math.floor(Math.random() * 3) * 0.55;
      const at = Math.random() * Math.PI * 2;
      const ap = Math.acos(2 * Math.random() - 1);
      tB[i * 3] = shell * Math.sin(ap) * Math.cos(at);
      tB[i * 3 + 1] = shell * Math.sin(ap) * Math.sin(at);
      tB[i * 3 + 2] = shell * Math.cos(ap);

      // C: field lines — sine waves drifting through space
      const u = (i / N) * Math.PI * 6;
      tC[i * 3] = Math.cos(u) * (1.6 + 0.25 * Math.sin(u * 1.7));
      tC[i * 3 + 1] = Math.sin(u * 0.7) * 1.1 + rand(-0.08, 0.08);
      tC[i * 3 + 2] = Math.sin(u) * (1.6 + 0.25 * Math.cos(u * 1.3));

      // D: graph nodes — clusters of ~30 with edges hinted by collinearity
      const clusterCount = 12;
      const cluster = Math.floor(Math.random() * clusterCount);
      const ang = (cluster / clusterCount) * Math.PI * 2;
      const cx = Math.cos(ang) * 1.7;
      const cy = Math.sin(ang * 1.3) * 1.0;
      const cz = Math.sin(ang) * 1.7;
      // Some particles sit ON the cluster (nodes), others ON an edge to a neighbour.
      const onEdge = Math.random() < 0.35;
      if (onEdge) {
        const ang2 = (((cluster + 1 + Math.floor(Math.random() * (clusterCount - 2))) % clusterCount) / clusterCount) * Math.PI * 2;
        const nx = Math.cos(ang2) * 1.7;
        const ny = Math.sin(ang2 * 1.3) * 1.0;
        const nz = Math.sin(ang2) * 1.7;
        const m = Math.random();
        tD[i * 3] = cx + (nx - cx) * m + rand(-0.012, 0.012);
        tD[i * 3 + 1] = cy + (ny - cy) * m + rand(-0.012, 0.012);
        tD[i * 3 + 2] = cz + (nz - cz) * m + rand(-0.012, 0.012);
      } else {
        tD[i * 3] = cx + rand(-0.12, 0.12);
        tD[i * 3 + 1] = cy + rand(-0.12, 0.12);
        tD[i * 3 + 2] = cz + rand(-0.12, 0.12);
      }

      pos[i * 3] = tA[i * 3];
      pos[i * 3 + 1] = tA[i * 3 + 1];
      pos[i * 3 + 2] = tA[i * 3 + 2];
      seed[i] = Math.random();
    }

    geom.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geom.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));

    const uniforms = {
      uTime: { value: 0 },
      uStage: { value: 0 }, // 0..3 continuous
      uIvory: { value: new THREE.Color("#f4ecd8") },
      uGold: { value: new THREE.Color("#c9a96e") },
      uCyan: { value: new THREE.Color("#7dd3fc") },
      uDpr: { value: dpr },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute float aSeed;
        uniform float uTime;
        uniform float uStage;
        uniform float uDpr;
        varying float vSeed;
        varying float vStage;
        void main() {
          vSeed = aSeed;
          vStage = uStage;
          vec3 p = position;
          // gentle organic noise that grows with abstraction
          float n = sin(uTime*0.6 + aSeed*40.0) * 0.012 * (0.4 + uStage*0.6);
          p += vec3(n, sin(uTime*0.5 + aSeed*23.0)*0.012, cos(uTime*0.4 + aSeed*17.0)*0.012);
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float size = mix(2.4, 1.6, clamp(uStage*0.33, 0.0, 1.0));
          gl_PointSize = size * uDpr * (260.0 / -mv.z);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uIvory;
        uniform vec3 uGold;
        uniform vec3 uCyan;
        varying float vSeed;
        varying float vStage;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          float a = smoothstep(0.5, 0.0, d);
          // colour drifts from ivory (stone) → gold (atoms/fields) → cyan (graph)
          float s = clamp(vStage*0.333, 0.0, 1.0);
          vec3 col = mix(uIvory, uGold, smoothstep(0.0, 0.5, s));
          col = mix(col, uCyan, smoothstep(0.55, 1.0, s));
          // a little per-particle variation so it doesn't feel flat
          col *= 0.85 + vSeed*0.35;
          gl_FragColor = vec4(col, a * 0.85);
        }
      `,
    });

    const points = new THREE.Points(geom, mat);
    scene.add(points);

    // Soft outer halo
    const haloGeom = new THREE.SphereGeometry(2.6, 64, 64);
    const haloMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      uniforms: { uTime: uniforms.uTime, uStage: uniforms.uStage },
      vertexShader: /* glsl */ `
        varying vec3 vN;
        void main() { vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vN;
        uniform float uTime;
        uniform float uStage;
        void main() {
          float f = pow(1.0 - abs(vN.z), 2.5);
          float pulse = 0.5 + 0.5 * sin(uTime*0.4);
          vec3 col = mix(vec3(0.78,0.66,0.43), vec3(0.49,0.83,0.99), clamp(uStage*0.33,0.0,1.0));
          gl_FragColor = vec4(col, f * 0.18 * (0.7 + 0.3*pulse));
        }
      `,
    });
    scene.add(new THREE.Mesh(haloGeom, haloMat));

    // ──────────────────────────────────────────────────────────────────────
    // Animation loop — interpolate between the 4 targets based on stage.
    // ──────────────────────────────────────────────────────────────────────
    let stage = 0;
    let stageTarget = 0;
    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      stage += (stageTarget - stage) * Math.min(1, dt * 1.6);
      uniforms.uStage.value = stage;
      uniforms.uTime.value += dt;

      // Lerp positions toward the stage targets.
      const arr = (geom.attributes.position as THREE.BufferAttribute).array as Float32Array;
      const k = stage;
      // pick the two enclosing targets and the blend
      const i0 = Math.min(2, Math.floor(k));
      const blend = k - i0;
      const aArr = [tA, tB, tC, tD][i0];
      const bArr = [tA, tB, tC, tD][i0 + 1] ?? tD;
      for (let i = 0; i < N * 3; i++) {
        const target = aArr[i] + (bArr[i] - aArr[i]) * blend;
        arr[i] += (target - arr[i]) * Math.min(1, dt * 2.4);
      }
      (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      points.rotation.y += dt * 0.05;
      points.rotation.x = Math.sin(uniforms.uTime.value * 0.13) * 0.08;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // Resize
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    // Scroll-driven stage
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when hero is fully in view; 3 once we've scrolled ~3 viewports past.
      const past = Math.max(0, -rect.top);
      const k = Math.min(3, past / (vh * 0.7));
      stageTarget = k;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      haloGeom.dispose();
      haloMat.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="absolute inset-0 [contain:strict]" aria-hidden />;
}
