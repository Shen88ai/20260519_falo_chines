import * as THREE from 'three';
import type { DeviceTier } from './types';

let centerGroup: THREE.Group;
let centerSprite: THREE.Sprite | null = null;

export function initWheelCore(parent: THREE.Group, deviceTier: DeviceTier): void {
  centerGroup = new THREE.Group();

  // Outer ring (subtle base)
  const ringGeo = new THREE.RingGeometry(1.15, 1.2, 48);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x888888,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  centerGroup.add(ring);

  // Rainbow gradient orbit line (individual dashed segments)
  const segments = 48;
  const radius = 1.2;
  for (let i = 0; i < segments; i++) {
    const a1 = (i / segments) * Math.PI * 2;
    const a2 = ((i + 0.5) / segments) * Math.PI * 2;
    const verts = new Float32Array([
      Math.cos(a1) * radius, Math.sin(a1) * radius, 0,
      Math.cos(a2) * radius, Math.sin(a2) * radius, 0,
    ]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    const hue = i / segments;
    const color = new THREE.Color().setHSL(hue, 1, 0.5);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.7 });
    const seg = new THREE.Line(geo, mat);
    centerGroup.add(seg);
  }

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
  centerSprite.scale.set(0.8, 0.8, 1);
  centerSprite.position.z = 0.1;
  centerGroup.add(centerSprite);

  parent.add(centerGroup);
}

export function updateCenterSprite(label: string, color: string): void {
  if (!centerSprite) return;
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  const fontSize = label.length > 2 ? 28 : label.length > 1 ? 42 : 56;
  ctx.font = `bold ${fontSize}px "Noto Serif SC", "SimSun", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(255,255,255,0.4)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = color;
  ctx.fillText(label, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  (centerSprite.material as THREE.SpriteMaterial).map = texture;
  texture.needsUpdate = true;
}

export function animateWheel(time: number): void {
  centerGroup.rotation.z += 0.001;
  if (centerSprite) {
    const breath = 0.8 + Math.sin(time * 0.002) * 0.1;
    centerSprite.scale.set(breath, breath, 1);
    centerSprite.material.rotation += 0.003;
    (centerSprite.material as THREE.SpriteMaterial).opacity = 0.9 + Math.sin(time * 0.002) * 0.1;
  }
}

export function getWheelGroup(): THREE.Group {
  return centerGroup;
}