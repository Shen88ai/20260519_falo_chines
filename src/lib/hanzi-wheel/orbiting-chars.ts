import * as THREE from 'three';

let sprites: THREE.Sprite[] = [];
const ORBIT_RADIUS = 1.8;
const FONT_SIZE = 36;

export function createOrbitingCharacters(
  scene: THREE.Scene,
  characters: string[],
  color: string,
): THREE.Sprite[] {
  clearOrbitingCharacters(scene);

  sprites = characters.map((char, i) => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 64, 64);
    ctx.font = `bold ${FONT_SIZE}px "Noto Serif SC", "SimSun", serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.shadowColor = `${color}66`;
    ctx.shadowBlur = 8;
    ctx.fillText(char, 32, 34);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(material);

    const angle = (i / characters.length) * Math.PI * 2;
    sprite.position.set(
      Math.cos(angle) * ORBIT_RADIUS,
      Math.sin(angle) * ORBIT_RADIUS,
      0,
    );
    sprite.scale.set(0.4, 0.4, 1);
    sprite.userData = { character: char, angle, baseColor: color };

    scene.add(sprite);
    return sprite;
  });

  return sprites;
}

export function updateOrbitPositions(deltaTime: number): void {
  sprites.forEach(sprite => {
    const angle = sprite.userData.angle;
    sprite.userData.angle = angle + deltaTime * 0.15;
    sprite.position.x = Math.cos(sprite.userData.angle) * ORBIT_RADIUS;
    sprite.position.y = Math.sin(sprite.userData.angle) * ORBIT_RADIUS;
  });
}

export function highlightSprite(sprite: THREE.Sprite | null): void {
  sprites.forEach(s => {
    if (s === sprite) {
      s.scale.set(0.55, 0.55, 1);
      (s.material as THREE.SpriteMaterial).opacity = 1;
    } else {
      s.scale.set(0.4, 0.4, 1);
      (s.material as THREE.SpriteMaterial).opacity = 0.7;
    }
  });
}

export function resetHighlight(): void {
  sprites.forEach(s => {
    s.scale.set(0.4, 0.4, 1);
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