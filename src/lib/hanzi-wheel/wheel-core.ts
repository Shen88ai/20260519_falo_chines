import * as THREE from 'three';
import type { DeviceTier } from './types';

let centerGroup: THREE.Group;
let centerSprite: THREE.Sprite | null = null;

export function initWheelCore(parent: THREE.Group, deviceTier: DeviceTier): void {
  centerGroup = new THREE.Group();

  // Outer ring
  const ringGeo = new THREE.RingGeometry(1.15, 1.2, 48);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0xD4A843,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  centerGroup.add(ring);

  // Dashed orbit line
  const segments = 48;
  const vertices: number[] = [];
  const radius = 1.2;
  for (let i = 0; i < segments; i += 2) {
    const a1 = (i / segments) * Math.PI * 2;
    const a2 = ((i + 1) / segments) * Math.PI * 2;
    vertices.push(
      Math.cos(a1) * radius, Math.sin(a1) * radius, 0,
      Math.cos(a2) * radius, Math.sin(a2) * radius, 0,
    );
  }
  const dashGeo = new THREE.BufferGeometry();
  dashGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const dashMat = new THREE.LineBasicMaterial({ color: 0xD4A843, transparent: true, opacity: 0.12 });
  const ringLine = new THREE.Line(dashGeo, dashMat);
  centerGroup.add(ringLine);

  // Center character sprite (empty initially; populated via updateCenterSprite)
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false });
  centerSprite = new THREE.Sprite(spriteMat);
  centerSprite.scale.set(0.6, 0.6, 1);
  centerSprite.position.z = 0.1;
  centerGroup.add(centerSprite);

  parent.add(centerGroup);
}

export function updateCenterSprite(character: string, color: string): void {
  if (!centerSprite) return;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  ctx.font = 'bold 56px "Noto Serif SC", "SimSun", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = `${color}88`;
  ctx.shadowBlur = 24;
  ctx.fillStyle = color;
  ctx.fillText(character, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  (centerSprite.material as THREE.SpriteMaterial).map = texture;
  texture.needsUpdate = true;
}

export function animateWheel(time: number): void {
  centerGroup.rotation.z += 0.001;
  if (centerSprite) {
    centerSprite.material.rotation += 0.003;
  }
}

export function getWheelGroup(): THREE.Group {
  return centerGroup;
}