import * as THREE from 'three';

let sprites: THREE.Sprite[] = [];
const ORBIT_RADIUS = 2.0;
const INNER_RADIUS = 1.5;
const OUTER_RADIUS = 2.4;
const INNER_RADIUS_3 = 1.2;
const MID_RADIUS_3 = 1.8;
const OUTER_RADIUS_3 = 2.4;
const MAX_SINGLE = 10;
const MAX_DOUBLE = 20;
const FONT_SIZE = 40;

export function createOrbitingCharacters(
  scene: THREE.Scene,
  characters: string[],
  color: string,
): THREE.Sprite[] {
  clearOrbitingCharacters(scene);

  const useTriple = characters.length > MAX_DOUBLE;
  const useDouble = !useTriple && characters.length > MAX_SINGLE;

  sprites = characters.map((char, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 64, 64);
    ctx.font = `bold ${FONT_SIZE}px "Noto Serif SC", "SimSun", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(255,255,255,0.5)';
    ctx.shadowBlur = 4;
    ctx.fillText(char, 32, 33);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(material);

    let radius: number;
    let baseScale: number;
    let zOffset = 0;
    if (useTriple) {
      const ring = i % 3;
      radius = ring === 0 ? INNER_RADIUS_3 : ring === 1 ? MID_RADIUS_3 : OUTER_RADIUS_3;
      baseScale = ring === 0 ? 0.38 : ring === 1 ? 0.45 : 0.50;
      zOffset = ring === 0 ? 0.08 : ring === 1 ? 0 : -0.08;
    } else if (useDouble) {
      radius = i % 2 === 0 ? INNER_RADIUS : OUTER_RADIUS;
      baseScale = i % 2 === 0 ? 0.5 : 0.6;
      zOffset = i % 2 === 1 ? -0.05 : 0.05;
    } else {
      radius = ORBIT_RADIUS;
      baseScale = 0.65;
    }

    let count: number;
    let idx: number;
    let angleOffset = 0;
    if (useTriple) {
      count = Math.ceil(characters.length / 3);
      idx = Math.floor(i / 3);
      angleOffset = (i % 3) * (Math.PI / 9);
    } else if (useDouble) {
      count = Math.ceil(characters.length / 2);
      idx = Math.floor(i / 2);
      angleOffset = i % 2 === 1 ? 0.15 : 0;
    } else {
      count = characters.length;
      idx = i;
    }
    const angle = (idx / count) * Math.PI * 2 + angleOffset;

    sprite.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      zOffset,
    );
    sprite.scale.set(baseScale, baseScale, 1);
    sprite.userData = { character: char, angle, baseColor: color, radius, baseScale };

    scene.add(sprite);
    return sprite;
  });

  return sprites;
}

export function updateOrbitPositions(deltaTime: number): void {
  sprites.forEach(sprite => {
    const angle = sprite.userData.angle;
    const r = sprite.userData.radius;
    sprite.userData.angle = angle + deltaTime * 0.15;
    sprite.position.x = Math.cos(sprite.userData.angle) * r;
    sprite.position.y = Math.sin(sprite.userData.angle) * r;
  });
}

export function highlightSprite(sprite: THREE.Sprite | null): void {
  sprites.forEach(s => {
    if (s === sprite) {
      s.scale.set(s.userData.baseScale * 1.35, s.userData.baseScale * 1.35, 1);
      (s.material as THREE.SpriteMaterial).opacity = 1;
    } else {
      s.scale.set(s.userData.baseScale, s.userData.baseScale, 1);
      (s.material as THREE.SpriteMaterial).opacity = 0.7;
    }
  });
}

export function resetHighlight(): void {
  sprites.forEach(s => {
    s.scale.set(s.userData.baseScale, s.userData.baseScale, 1);
    (s.material as THREE.SpriteMaterial).opacity = 1;
  });
}

export function clearOrbitingCharacters(scene: THREE.Scene): void {
  sprites.forEach(s => {
    scene.remove(s);
    s.material.map?.dispose();
    s.material.dispose();
  });
  sprites = [];
}

export function getOrbitingSprites(): THREE.Sprite[] {
  return sprites;
}