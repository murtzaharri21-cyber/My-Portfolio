/**
 * Ghulam Murtaza 3D WebGL Engine (Three.js)
 * High-performance, responsive multi-scene 3D interactive graphics
 */

class PortfolioThreeScene {
  constructor(containerId = 'webgl-container') {
    this.container = document.getElementById(containerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.currentMode = 'nexus'; // 'nexus' | 'globe' | 'cube'
    
    // Group holders
    this.starfieldGroup = null;
    this.nexusGroup = null;
    this.globeGroup = null;
    this.cubeGroup = null;
    
    // Mouse tracking & Parallax
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;
    this.scrollProgress = 0;
    
    // Animation clock
    this.clock = null;
    this.curvePoints = [];
    this.arcPhotons = [];
    
    this.init();
  }

  init() {
    if (!this.container || typeof THREE === 'undefined') {
      console.warn("Three.js not loaded or container missing");
      return;
    }

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030712, 0.018);

    // 2. Camera setup
    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 18);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // 4. Lights setup
    this.setupLights();

    // 5. Build Scene Objects
    this.createStarfield();
    this.createNexusCore();
    this.createInteractiveGlobe();
    this.createTechCube();

    // 6. Clock
    this.clock = new THREE.Clock();

    // 7. Event Listeners
    this.setupEvents();

    // 8. Start loop
    this.animate();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0x0a1428, 2.5);
    this.scene.add(ambientLight);

    const cyanPoint = new THREE.PointLight(0x00f0ff, 4, 35);
    cyanPoint.position.set(10, 8, 12);
    this.scene.add(cyanPoint);

    const violetPoint = new THREE.PointLight(0x8b5cf6, 4, 35);
    violetPoint.position.set(-10, -8, 10);
    this.scene.add(violetPoint);

    const amberPoint = new THREE.PointLight(0xf59e0b, 2, 25);
    amberPoint.position.set(0, 12, -5);
    this.scene.add(amberPoint);
  }

  createStarfield() {
    this.starfieldGroup = new THREE.Group();
    const starCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const violetColor = new THREE.Color(0x8b5cf6);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 120;
      const y = (Math.random() - 0.5) * 120;
      const z = (Math.random() - 0.5) * 80;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      let chosenColor;
      const rand = Math.random();
      if (rand < 0.4) chosenColor = cyanColor;
      else if (rand < 0.7) chosenColor = violetColor;
      else chosenColor = whiteColor;

      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(geometry, material);
    this.starfieldGroup.add(starPoints);
    this.scene.add(this.starfieldGroup);
  }

  createNexusCore() {
    this.nexusGroup = new THREE.Group();

    // Inner Glowing Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x003366,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false
    });
    this.nexusCore = new THREE.Mesh(coreGeo, coreMat);
    this.nexusGroup.add(this.nexusCore);

    // Outer Wireframe Cage
    const cageGeo = new THREE.IcosahedronGeometry(3.2, 2);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    this.nexusCage = new THREE.Mesh(cageGeo, cageMat);
    this.nexusGroup.add(this.nexusCage);

    // Orbital Gyroscopic Rings
    this.rings = [];
    const ringRadii = [4.2, 5.0, 5.8];
    const ringColors = [0x00f0ff, 0x8b5cf6, 0xf59e0b];

    ringRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);
      const ringMat = new THREE.MeshStandardMaterial({
        color: ringColors[idx],
        emissive: ringColors[idx],
        emissiveIntensity: 0.6,
        roughness: 0.3
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI * (0.2 + idx * 0.3);
      ring.rotation.y = Math.PI * (0.1 + idx * 0.25);
      this.rings.push(ring);
      this.nexusGroup.add(ring);
    });

    // Floating Data Satellites
    this.satellites = [];
    for (let i = 0; i < 8; i++) {
      const satGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
      const satMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x00f0ff : 0xf59e0b,
        emissive: i % 2 === 0 ? 0x00a8ff : 0xd97706,
        emissiveIntensity: 0.8
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.userData = {
        angle: (i / 8) * Math.PI * 2,
        dist: 4.8 + Math.sin(i) * 0.6,
        speed: 0.8 + (i % 3) * 0.3,
        elev: (Math.random() - 0.5) * 2
      };
      this.satellites.push(sat);
      this.nexusGroup.add(sat);
    }

    this.scene.add(this.nexusGroup);
  }

  createInteractiveGlobe() {
    this.globeGroup = new THREE.Group();
    this.globeGroup.visible = false; // Hidden initially

    // Wireframe Globe Sphere
    const globeGeo = new THREE.SphereGeometry(3.6, 36, 36);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    this.globeMesh = new THREE.Mesh(globeGeo, globeMat);
    this.globeGroup.add(this.globeMesh);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(3.3, 32, 32);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0b1329,
      roughness: 0.8,
      metalness: 0.2
    });
    this.globeInner = new THREE.Mesh(innerGeo, innerMat);
    this.globeGroup.add(this.globeInner);

    // Key Global Locations (Latitude / Longitude)
    const locations = [
      { name: "Islamabad, PK (Home Base)", lat: 33.6844, lon: 73.0479, color: 0x10b981 },
      { name: "Beijing, CN (Alumni/Partner)", lat: 39.9042, lon: 116.4074, color: 0xf59e0b },
      { name: "Hexi / Gansu, CN (Alumni)", lat: 38.9259, lon: 100.4498, color: 0xf59e0b },
      { name: "London, UK (Client Hub)", lat: 51.5074, lon: -0.1278, color: 0x00f0ff },
      { name: "New York, USA (Client Hub)", lat: 40.7128, lon: -74.0060, color: 0x00f0ff },
      { name: "San Francisco, USA (Client Hub)", lat: 37.7749, lon: -122.4194, color: 0x8b5cf6 },
      { name: "Sydney, AU (Client Hub)", lat: -33.8688, lon: 151.2093, color: 0x00f0ff }
    ];

    const latLonToVector3 = (lat, lon, radius) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    const isbPos = latLonToVector3(33.6844, 73.0479, 3.65);

    // Place Marker Pins & Connecting Arcs
    locations.forEach((loc) => {
      const pos = latLonToVector3(loc.lat, loc.lon, 3.65);

      // Marker
      const pinGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: loc.color,
        emissive: loc.color,
        emissiveIntensity: 1
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(pos);
      this.globeGroup.add(pin);

      // Create Arcs connecting Islamabad to each global hub
      if (loc.name !== "Islamabad, PK (Home Base)") {
        const midPoint = new THREE.Vector3()
          .addVectors(isbPos, pos)
          .multiplyScalar(0.5);
        const dist = isbPos.distanceTo(pos);
        midPoint.normalize().multiplyScalar(3.65 + dist * 0.35); // Arc height

        const curve = new THREE.QuadraticBezierCurve3(isbPos, midPoint, pos);
        const points = curve.getPoints(50);
        const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
        const arcMat = new THREE.LineBasicMaterial({
          color: 0x00f0ff,
          transparent: true,
          opacity: 0.6
        });
        const arcLine = new THREE.Line(arcGeo, arcMat);
        this.globeGroup.add(arcLine);

        // Animated Photons travelling along arcs
        const photonGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const photonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const photon = new THREE.Mesh(photonGeo, photonMat);
        photon.userData = { curve, t: Math.random() };
        this.arcPhotons.push(photon);
        this.globeGroup.add(photon);
      }
    });

    this.scene.add(this.globeGroup);
  }

  createTechCube() {
    this.cubeGroup = new THREE.Group();
    this.cubeGroup.visible = false; // Hidden initially

    // 3x3x3 Cyber Matrix Cube
    this.cubeBlocks = [];
    const size = 0.95;
    const spacing = 1.15;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          // Skip inner center to create hollow cyber look
          if (x === 0 && y === 0 && z === 0) continue;

          const blockGeo = new THREE.BoxGeometry(size, size, size);
          const blockMat = new THREE.MeshStandardMaterial({
            color: 0x0b1739,
            roughness: 0.2,
            metalness: 0.9,
            emissive: 0x002244
          });
          const block = new THREE.Mesh(blockGeo, blockMat);
          block.position.set(x * spacing, y * spacing, z * spacing);

          // Wireframe neon edge
          const edgeGeo = new THREE.EdgesGeometry(blockGeo);
          const edgeMat = new THREE.LineBasicMaterial({
            color: (x + y + z) % 2 === 0 ? 0x00f0ff : 0x8b5cf6
          });
          const wireframe = new THREE.LineSegments(edgeGeo, edgeMat);
          block.add(wireframe);

          block.userData = {
            baseX: block.position.x,
            baseY: block.position.y,
            baseZ: block.position.z,
            phase: Math.random() * Math.PI * 2
          };

          this.cubeBlocks.push(block);
          this.cubeGroup.add(block);
        }
      }
    }

    // Floating central core inside cube
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.2
    });
    this.cubeInnerCore = new THREE.Mesh(coreGeo, coreMat);
    this.cubeGroup.add(this.cubeInnerCore);

    this.scene.add(this.cubeGroup);
  }

  setMode(mode) {
    if (!['nexus', 'globe', 'cube'].includes(mode)) return;
    this.currentMode = mode;

    if (this.nexusGroup) this.nexusGroup.visible = (mode === 'nexus');
    if (this.globeGroup) this.globeGroup.visible = (mode === 'globe');
    if (this.cubeGroup) this.cubeGroup.visible = (mode === 'cube');

    // Update active button state in UI
    document.querySelectorAll('.scene-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  }

  setupEvents() {
    // Mouse Move Parallax
    window.addEventListener('mousemove', (e) => {
      this.targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Touch Tilt
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        this.targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    }, { passive: true });

    // Scroll tracking
    window.addEventListener('scroll', () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      this.scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    }, { passive: true });

    // Resize
    window.addEventListener('resize', () => {
      if (!this.camera || !this.renderer) return;
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock ? this.clock.getDelta() : 0.016;
    const elapsed = this.clock ? this.clock.getElapsedTime() : 0;

    // Smooth Lerp for Mouse Parallax
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

    // Starfield slow rotation & drift
    if (this.starfieldGroup) {
      this.starfieldGroup.rotation.y = elapsed * 0.03;
      this.starfieldGroup.rotation.x = this.mouseY * 0.15;
    }

    // Dynamic Camera adjustments linked to scroll
    if (this.camera) {
      this.camera.position.x = this.mouseX * 2.5;
      this.camera.position.y = -this.mouseY * 2.5 - (this.scrollProgress * 4.0);
      this.camera.position.z = 18 - (this.scrollProgress * 3.5);
      this.camera.lookAt(0, -this.scrollProgress * 2.0, 0);
    }

    // Mode 1: Nexus Core Animation
    if (this.nexusGroup && this.nexusGroup.visible) {
      this.nexusCore.rotation.y = elapsed * 0.4;
      this.nexusCore.rotation.x = elapsed * 0.25;
      this.nexusCage.rotation.y = -elapsed * 0.2;
      this.nexusCage.rotation.z = elapsed * 0.15;

      this.rings.forEach((ring, idx) => {
        ring.rotation.z = elapsed * (0.3 + idx * 0.15) * (idx % 2 === 0 ? 1 : -1);
      });

      this.satellites.forEach((sat) => {
        const angle = sat.userData.angle + elapsed * sat.userData.speed * 0.5;
        sat.position.x = Math.cos(angle) * sat.userData.dist;
        sat.position.z = Math.sin(angle) * sat.userData.dist;
        sat.position.y = sat.userData.elev + Math.sin(elapsed * 2 + sat.userData.dist) * 0.5;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      });

      this.nexusGroup.rotation.y = this.mouseX * 0.4;
      this.nexusGroup.rotation.x = this.mouseY * 0.3;
    }

    // Mode 2: Globe Animation
    if (this.globeGroup && this.globeGroup.visible) {
      this.globeMesh.rotation.y = elapsed * 0.15 + this.mouseX * 0.5;
      this.globeInner.rotation.y = this.globeMesh.rotation.y;
      this.globeGroup.rotation.x = 0.2 + this.mouseY * 0.3;

      // Animate Photons along flight arcs
      this.arcPhotons.forEach((photon) => {
        photon.userData.t = (photon.userData.t + delta * 0.35) % 1.0;
        const pt = photon.userData.curve.getPoint(photon.userData.t);
        photon.position.copy(pt);
      });
    }

    // Mode 3: Tech Matrix Cube Animation
    if (this.cubeGroup && this.cubeGroup.visible) {
      this.cubeGroup.rotation.y = elapsed * 0.35 + this.mouseX * 0.6;
      this.cubeGroup.rotation.x = elapsed * 0.25 + this.mouseY * 0.4;

      this.cubeBlocks.forEach((block) => {
        const pulse = Math.sin(elapsed * 2.5 + block.userData.phase) * 0.15;
        block.position.x = block.userData.baseX * (1 + pulse);
        block.position.y = block.userData.baseY * (1 + pulse);
        block.position.z = block.userData.baseZ * (1 + pulse);
      });

      if (this.cubeInnerCore) {
        this.cubeInnerCore.rotation.x = -elapsed * 0.8;
        this.cubeInnerCore.rotation.y = elapsed * 0.6;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export const threeScene = new PortfolioThreeScene('webgl-container');
