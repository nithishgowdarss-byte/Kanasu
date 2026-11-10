import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface ThreeCanvasProps {
  scrollProgress: number; // 0 to 1 across the page
  activeStage: number; // 0 to 4
  theme: 'midnight' | 'amber' | 'granite';
  explodedView: number; // 0 to 1
  onFpsUpdate?: (fps: number, frameTimeMs: number, rendererName: string) => void;
}

// Reusable math scratchpads for zero-GC in render loop
const _tempVec3A = new THREE.Vector3();
const _tempVec3B = new THREE.Vector3();

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  scrollProgress,
  activeStage,
  theme,
  explodedView,
  onFpsUpdate,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(scrollProgress);
  const explodedRef = useRef(explodedView);
  const themeRef = useRef(theme);
  const stageRef = useRef(activeStage);
  const [glInfo, setGlInfo] = useState<string>('Initializing GPU...');

  // Keep refs synchronized without triggering re-initialization
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    explodedRef.current = explodedView;
  }, [explodedView]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    stageRef.current = activeStage;
  }, [activeStage]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software WebGL Guard
    let isSoftwareGl = false;
    let rendererString = 'WebGL Hardware Accelerated';
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (gl) {
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        rendererString = gpu;
        isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
        gl.getExtension('WEBGL_lose_context')?.loseContext();
      }
    } catch {
      isSoftwareGl = false;
    }
    setGlInfo(rendererString);

    // 2. Setup Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0d14, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection Map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key Light + Cool Hemisphere Fill + Accent Rim)
    const keyLight = new THREE.DirectionalLight(0xffecd2, 2.2);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x1e293b, 0x090d16, 1.4);
    scene.add(hemiLight);

    const rimLight = new THREE.PointLight(0xf97316, 3.5, 15);
    rimLight.position.set(-6, -2, -4);
    scene.add(rimLight);

    // Master Group containing 5 hierarchical procedural stages
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Color definitions
    const amberGold = new THREE.Color(0xf59e0b);
    const deepSlate = new THREE.Color(0x1e293b);
    const polishedGold = new THREE.Color(0xd97706);
    const cyanNeural = new THREE.Color(0x38bdf8);
    const emeraldHonor = new THREE.Color(0x10b981);

    // ==========================================
    // STAGE 0: Vidhana Soudha Heritage Legislative Monument (Composite Group)
    // ==========================================
    const monumentGroup = new THREE.Group();
    monumentGroup.position.set(0, 0, 0);

    // Base Plinth (Granite tiered steps)
    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.7,
      metalness: 0.1,
    });
    const plinthMesh1 = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.25, 4.2), plinthMat);
    plinthMesh1.position.y = -1.2;
    plinthMesh1.receiveShadow = !isSoftwareGl;
    monumentGroup.add(plinthMesh1);

    const plinthMesh2 = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 3.6), plinthMat);
    plinthMesh2.position.y = -1.0;
    monumentGroup.add(plinthMesh2);

    // Main Hall Body
    const hallMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.45,
      metalness: 0.2,
    });
    const hallMesh = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.2, 2.6), hallMat);
    hallMesh.position.y = -0.3;
    hallMesh.castShadow = !isSoftwareGl;
    monumentGroup.add(hallMesh);

    // Portico Columns (8 fluted columns)
    const colMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.3,
      metalness: 0.15,
    });
    const colGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.1, 16);
    for (let i = -3; i <= 3; i += 2) {
      const colFront = new THREE.Mesh(colGeo, colMat);
      colFront.position.set(i * 0.4, -0.3, 1.35);
      colFront.castShadow = !isSoftwareGl;
      monumentGroup.add(colFront);
    }

    // Central Grand Dome
    const domeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      roughness: 0.2,
      metalness: 0.85,
    });
    const domeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.85, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.5),
      domeMat
    );
    domeMesh.position.y = 0.3;
    domeMesh.castShadow = !isSoftwareGl;
    monumentGroup.add(domeMesh);

    // Kalasa / Golden Spire
    const spireGeo = new THREE.ConeGeometry(0.12, 0.7, 16);
    const spireMesh = new THREE.Mesh(spireGeo, domeMat);
    spireMesh.position.y = 1.3;
    monumentGroup.add(spireMesh);

    // Ashoka Pillar Capital Lion Crest Emulation
    const crestGeo = new THREE.TorusGeometry(0.35, 0.06, 12, 32);
    const crestMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.15 });
    const crestMesh = new THREE.Mesh(crestGeo, crestMat);
    crestMesh.position.set(0, 0.1, 1.32);
    monumentGroup.add(crestMesh);

    masterGroup.add(monumentGroup);

    // ==========================================
    // STAGE 1: Dual Syllabus Gyroscope (Paper I & II Orbits)
    // ==========================================
    const syllabusGroup = new THREE.Group();
    syllabusGroup.position.set(0, -6, 0);

    const ringOuterMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ringInnerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.7,
      roughness: 0.3,
    });

    const ringOuter = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.08, 16, 64), ringOuterMat);
    syllabusGroup.add(ringOuter);

    const ringInner = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.07, 16, 64), ringInnerMat);
    ringInner.rotation.x = Math.PI / 3;
    syllabusGroup.add(ringInner);

    // Central Knowledge Core
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      metalness: 0.4,
      roughness: 0.1,
      transmission: isSoftwareGl ? 0 : 0.85,
      transparent: true,
      opacity: isSoftwareGl ? 0.6 : 1,
      ior: 1.6,
      thickness: 1.2,
    });
    const coreOrb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 2), coreMat);
    syllabusGroup.add(coreOrb);

    // Orbiting Subject Satellites (6 KAS subjects)
    const satelliteGroup = new THREE.Group();
    const satGeo = new THREE.DodecahedronGeometry(0.2, 1);
    const satColors = [0xf97316, 0x38bdf8, 0x10b981, 0xa855f7, 0xfacc15, 0xec4899];
    const satellites: THREE.Mesh[] = [];

    for (let i = 0; i < 6; i++) {
      const satMesh = new THREE.Mesh(
        satGeo,
        new THREE.MeshStandardMaterial({
          color: satColors[i],
          metalness: 0.6,
          roughness: 0.25,
        })
      );
      satellites.push(satMesh);
      satelliteGroup.add(satMesh);
    }
    syllabusGroup.add(satelliteGroup);
    masterGroup.add(syllabusGroup);

    // ==========================================
    // STAGE 2: Hindsight Neural Cortex (Synaptic Memory Lattice)
    // ==========================================
    const cortexGroup = new THREE.Group();
    cortexGroup.position.set(0, -12, 0);

    const nodeCount = 28;
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.7,
    });
    const weakMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.7,
    });

    const nodes: THREE.Mesh[] = [];
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const radius = 1.8 + (Math.sin(i * 1.5) * 0.3);
      const pos = new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      nodePositions.push(pos);

      // Flag a few as "weak areas being repaired by Hindsight"
      const isWeak = i % 5 === 0;
      const nMesh = new THREE.Mesh(nodeGeo, isWeak ? weakMat : nodeMat);
      nMesh.position.copy(pos);
      cortexGroup.add(nMesh);
      nodes.push(nMesh);
    }

    // Connect nodes with synaptic line geometry
    const lineIndices: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.4) {
          lineIndices.push(i, j);
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry().setFromPoints(nodePositions);
    lineGeo.setIndex(lineIndices);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const neuralLines = new THREE.LineSegments(lineGeo, lineMat);
    cortexGroup.add(neuralLines);

    masterGroup.add(cortexGroup);

    // ==========================================
    // STAGE 3: The Crucible Prelims Speed Chrono (Mechanical Gauge)
    // ==========================================
    const chronoGroup = new THREE.Group();
    chronoGroup.position.set(0, -18, 0);

    // Outer Gauge Bezel
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.15,
    });
    const bezelMesh = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.16, 16, 64), bezelMat);
    chronoGroup.add(bezelMesh);

    // Golden Dial Plate with tick marks
    const dialMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.4,
    });
    const dialMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.85, 1.85, 0.08, 36), dialMat);
    dialMesh.rotation.x = Math.PI / 2;
    chronoGroup.add(dialMesh);

    // Negative Mark Warning Arc (0.25 penalty zone indicator)
    const arcMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0x991b1b,
      emissiveIntensity: 0.3,
      metalness: 0.5,
    });
    const penaltyArc = new THREE.Mesh(
      new THREE.RingGeometry(1.6, 1.78, 32, 1, 0, Math.PI * 0.5),
      arcMat
    );
    penaltyArc.position.z = 0.05;
    chronoGroup.add(penaltyArc);

    // Stopwatch Hands
    const handGroup = new THREE.Group();
    handGroup.position.z = 0.08;
    const handGeo = new THREE.BoxGeometry(0.06, 1.3, 0.04);
    const handMat = new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.8, roughness: 0.2 });
    const mainHand = new THREE.Mesh(handGeo, handMat);
    mainHand.position.y = 0.5;
    handGroup.add(mainHand);

    const centerPin = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.12, 16),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9 })
    );
    centerPin.rotation.x = Math.PI / 2;
    handGroup.add(centerPin);

    chronoGroup.add(handGroup);
    masterGroup.add(chronoGroup);

    // ==========================================
    // STAGE 4: Peak Mastery - KAS Officer State Emblem & Crest
    // ==========================================
    const crestGroup = new THREE.Group();
    crestGroup.position.set(0, -24, 0);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.18,
    });

    // Outer Crest Shield
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 1.6);
    shieldShape.lineTo(1.4, 1.0);
    shieldShape.lineTo(1.1, -0.6);
    shieldShape.lineTo(0, -1.6);
    shieldShape.lineTo(-1.1, -0.6);
    shieldShape.lineTo(-1.4, 1.0);
    shieldShape.closePath();

    const extrudeSettings = {
      depth: 0.2,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };
    const shieldGeo = new THREE.ExtrudeGeometry(shieldShape, extrudeSettings);
    shieldGeo.center();
    const shieldMesh = new THREE.Mesh(shieldGeo, goldMat);
    crestGroup.add(shieldMesh);

    // Gandaberunda Double-Headed Mythical Eagle Silhouette Wings (Karnataka State Symbol)
    const wingMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9, roughness: 0.2 });
    const wingGeo = new THREE.TorusGeometry(0.7, 0.08, 12, 24, Math.PI * 0.8);
    const leftWing = new THREE.Mesh(wingGeo, wingMat);
    leftWing.position.set(-0.3, 0.2, 0.2);
    leftWing.rotation.z = Math.PI * 0.15;
    crestGroup.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, wingMat);
    rightWing.position.set(0.3, 0.2, 0.2);
    rightWing.rotation.z = -Math.PI * 0.15;
    rightWing.scale.x = -1;
    crestGroup.add(rightWing);

    // Halo Star of Administrative Excellence
    const starGeo = new THREE.OctahedronGeometry(0.35, 0);
    const starMesh = new THREE.Mesh(starGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.8, roughness: 0.1 }));
    starMesh.position.set(0, 0.1, 0.3);
    crestGroup.add(starMesh);

    masterGroup.add(crestGroup);

    // Contact Grounding Plane under Monument
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const shadowMesh = new THREE.Mesh(new THREE.CircleGeometry(2.8, 32), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.25;
    scene.add(shadowMesh);

    // 5. High-FPS 120Hz Animation Loop with Delta Tracking & Exponential Damping
    let frameId = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();
    let smoothedFps = 120;

    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const glCtx = renderer.getContext() as WebGL2RenderingContext;
      const sync = glCtx.fenceSync?.(glCtx.SYNC_GPU_COMMANDS_COMPLETE, 0);
      glCtx.flush();
      const poll = () => {
        const state = sync && glCtx.getSyncParameter(sync, glCtx.SYNC_STATUS);
        if (state === glCtx.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) glCtx.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const now = performance.now();
      const delta = Math.min(clock.getDelta(), 0.1);
      const frameDeltaMs = now - lastTime;
      lastTime = now;

      frameCount++;
      if (now - fpsTimer >= 500) {
        const measuredFps = Math.round((frameCount * 1000) / (now - fpsTimer));
        smoothedFps = Math.round(smoothedFps * 0.7 + measuredFps * 0.3);
        fpsTimer = now;
        frameCount = 0;
        if (onFpsUpdate) {
          onFpsUpdate(smoothedFps, Math.round(frameDeltaMs * 10) / 10, rendererString);
        }
      }

      // Smooth scroll interpolation (120fps glide)
      const currentScroll = scrollRef.current;
      const targetY = currentScroll * 24; // Stages are separated by 6 units (0, -6, -12, -18, -24)
      masterGroup.position.y = THREE.MathUtils.damp(masterGroup.position.y, targetY, 7.5, delta);

      // Exploded View effect
      const exp = explodedRef.current;
      plinthMesh1.position.y = THREE.MathUtils.damp(plinthMesh1.position.y, -1.2 - exp * 0.8, 8, delta);
      domeMesh.position.y = THREE.MathUtils.damp(domeMesh.position.y, 0.3 + exp * 1.2, 8, delta);
      spireMesh.position.y = THREE.MathUtils.damp(spireMesh.position.y, 1.3 + exp * 1.8, 8, delta);

      // Autonomous mechanical rotations
      const t = clock.getElapsedTime();
      monumentGroup.rotation.y = t * 0.15 + (currentScroll * Math.PI * 2);

      // Stage 1 Gyroscope rotations
      ringOuter.rotation.x = t * 0.4;
      ringOuter.rotation.y = t * 0.3;
      ringInner.rotation.y = -t * 0.6;
      ringInner.rotation.z = t * 0.3;
      coreOrb.rotation.y = -t * 0.8;

      // Orbit satellites
      satellites.forEach((sat, i) => {
        const angle = t * 0.7 + (i * Math.PI) / 3;
        const rad = 2.5 + exp * 0.6;
        sat.position.set(Math.cos(angle) * rad, Math.sin(t * 0.5 + i) * 0.4, Math.sin(angle) * rad);
        sat.rotation.y = t * 2;
      });

      // Stage 2 Cortex Pulsing
      cortexGroup.rotation.y = -t * 0.2;
      cortexGroup.rotation.x = Math.sin(t * 0.3) * 0.15;
      nodes.forEach((n, idx) => {
        const pulse = 1 + Math.sin(t * 3 + idx) * 0.15;
        n.scale.setScalar(pulse);
      });

      // Stage 3 Chrono hand rotation
      mainHand.rotation.z = -t * 1.2;
      chronoGroup.rotation.y = Math.sin(t * 0.5) * 0.3;

      // Stage 4 Crest oscillation
      crestGroup.rotation.y = Math.sin(t * 0.8) * 0.4;
      starMesh.rotation.z = t * 1.5;
      starMesh.rotation.x = t * 0.5;

      // Camera gentle dynamic breathing
      camera.position.x = THREE.MathUtils.damp(camera.position.x, Math.sin(t * 0.4) * 0.4, 3, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, 2 + Math.cos(t * 0.3) * 0.2, 3, delta);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }
    tick();

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div ref={mountRef} className="w-full h-full pointer-events-auto" />
      {/* Subtle ambient gradient overlay that reinforces WCAG AA contrast */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#0a0d14]/40 to-[#0a0d14]/90 pointer-events-none" />
    </div>
  );
};
