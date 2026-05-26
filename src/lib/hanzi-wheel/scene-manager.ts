import * as THREE from 'three';
import type { DeviceTier } from './types';
import { detectDeviceTier } from './device-tier';
import { initWheelCore, updateCenterSprite, animateWheel } from './wheel-core';
import { initGalaxyCloud, animateGalaxyCloud } from './galaxy-cloud';
import {
  createOrbitingCharacters,
  updateOrbitPositions,
  getOrbitingSprites,
  highlightSprite,
  resetHighlight,
  clearOrbitingCharacters,
} from './orbiting-chars';
import { stateManager } from './state-manager';
import { buildGroups, categoryColors } from './config';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let animationId: number | null = null;
let lastTime = 0;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
let isInitialized = false;
let wheelGroup: THREE.Group;
let raycaster: THREE.Raycaster;
let mouse: THREE.Vector2;

export async function initScene(canvas: HTMLCanvasElement): Promise<void> {
  if (isInitialized) return;
  isInitialized = true;

  const deviceTier: DeviceTier = detectDeviceTier();

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 2.8;

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: deviceTier !== 'medium',
    alpha: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(deviceTier === 'high' ? 2 : 1, window.devicePixelRatio));

  wheelGroup = new THREE.Group();
  scene.add(wheelGroup);

  initWheelCore(wheelGroup, deviceTier);
  scene.add(initGalaxyCloud());

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  stateManager.init();
  loadCurrentGroup();

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('click', onClick, true);
  window.addEventListener('resize', onResize);
  window.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('hanzi-wheel:category-change', onCategoryChange as EventListener);
  window.addEventListener('hanzi-wheel:group-change', onGroupChange as EventListener);

  startRenderLoop();
}

function loadCurrentGroup(): void {
  const data = stateManager.getData();
  const color = categoryColors[data.currentCategory];
  clearOrbitingCharacters(wheelGroup);
  createOrbitingCharacters(wheelGroup, data.orbitingCharacters, color);
  const groups = buildGroups(data.currentCategory);
  const group = groups.find(g => g.id === data.currentGroup);
  const label = group?.label || data.orbitingCharacters[0] || '';
  updateCenterSprite(label, color);
}

function onCategoryChange(e: CustomEvent): void {
  loadCurrentGroup();
}

function onGroupChange(_e: CustomEvent): void {
  loadCurrentGroup();
}

function onMouseMove(e: MouseEvent): void {
  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const sprites = getOrbitingSprites();
  const intersects = raycaster.intersectObjects(sprites);

  if (intersects.length > 0) {
    const sprite = intersects[0].object as THREE.Sprite;
    const char = sprite.userData.character as string;
    highlightSprite(sprite);
    stateManager.hoverCharacter(char);
    window.dispatchEvent(
      new CustomEvent('hanzi-wheel:character-hover', {
        detail: { character: char, mouseX: e.clientX, mouseY: e.clientY },
      }),
    );
  } else {
    resetHighlight();
    if (stateManager.getState() === 'hovering') {
      stateManager.hoverCharacter(null);
    }
  }
}

function onClick(e: MouseEvent): void {
  if (stateManager.getState() === 'detail') return;

  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const sprites = getOrbitingSprites();
  const intersects = raycaster.intersectObjects(sprites);

  if (intersects.length > 0) {
    const sprite = intersects[0].object as THREE.Sprite;
    const char = sprite.userData.character as string;
    stateManager.selectCharacter(char);
  }
}

function startRenderLoop(): void {
  function loop(time: number) {
    animationId = requestAnimationFrame(loop);
    const delta = time - lastTime;
    if (delta < FRAME_INTERVAL) return;
    lastTime = time - (delta % FRAME_INTERVAL);

    if (stateManager.getState() !== 'detail') {
      updateOrbitPositions(0.016);
      animateWheel(time * 0.001);
      animateGalaxyCloud(time * 0.001);
    }

    renderer.render(scene, camera);
  }
  animationId = requestAnimationFrame(loop);
}

function onResize(): void {
  const canvas = renderer.domElement;
  const parent = canvas.parentElement;
  if (!parent) return;
  const w = parent.clientWidth;
  const h = parent.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function onVisibilityChange(): void {
  if (document.hidden && animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  } else if (!document.hidden && !animationId) {
    startRenderLoop();
  }
}

export function disposeScene(): void {
  if (animationId) cancelAnimationFrame(animationId);
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('click', onClick, true);
  window.removeEventListener('resize', onResize);
  window.removeEventListener('visibilitychange', onVisibilityChange);
  window.removeEventListener('hanzi-wheel:category-change', onCategoryChange as EventListener);
  window.removeEventListener('hanzi-wheel:group-change', onGroupChange as EventListener);
  renderer.dispose();
  isInitialized = false;
}
