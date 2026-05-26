import * as THREE from 'three';

const PALETTE = [
  new THREE.Color('#E8E4D9'),
  new THREE.Color('#D4A843'),
  new THREE.Color('#E5FF00'),
  new THREE.Color('#00FF87'),
  new THREE.Color('#7DD3FC'),
];

const PARTICLE_COUNT = 800;

let cloudGroup: THREE.Group;
let positions: Float32Array;
let colors: Float32Array;
let sizes: Float32Array;
let basePositions: Float32Array;

export function initGalaxyCloud(): THREE.Group {
  cloudGroup = new THREE.Group();

  positions = new Float32Array(PARTICLE_COUNT * 3);
  colors = new Float32Array(PARTICLE_COUNT * 3);
  sizes = new Float32Array(PARTICLE_COUNT);
  basePositions = new Float32Array(PARTICLE_COUNT * 3);

  const spread = 4.5;
  const thickness = 1.2;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.pow(Math.random(), 1.2) * spread;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = (Math.random() - 0.5) * thickness;

    const i3 = i * 3;
    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
    basePositions[i3] = x;
    basePositions[i3 + 1] = y;
    basePositions[i3 + 2] = z;

    const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    sizes[i] = 0.008 + Math.random() * 0.025;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const texture = createParticleTexture();

  const mat = new THREE.PointsMaterial({
    size: 0.04,
    map: texture,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexColors: true,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  cloudGroup.add(points);

  cloudGroup.position.z = -1.5;

  return cloudGroup;
}

function createParticleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function animateGalaxyCloud(time: number): void {
  if (!cloudGroup) return;
  cloudGroup.rotation.z += 0.0002;

  const geo = (cloudGroup.children[0] as THREE.Points).geometry;
  const posAttr = geo.attributes.position as THREE.BufferAttribute;
  const pos = posAttr.array as Float32Array;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const drift = Math.sin(time * 0.3 + i * 0.1) * 0.002;
    pos[i3 + 1] += drift;
    pos[i3 + 2] += Math.sin(time * 0.5 + i * 0.05) * 0.0005;
  }
  posAttr.needsUpdate = true;
}
