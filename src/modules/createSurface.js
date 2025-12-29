import * as THREE from 'three';
import surfaceTexture from '/walnut-wood-textured-background-design.jpg';

/*
  Функция для создания поверхности.
  Поверхности представляет собой
  куб с очень маленькой высотой
  (получается некая доска)
 */
export default function createSurface({ width, height, depth }) {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(surfaceTexture);

  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });
  const surface = new THREE.Mesh(geometry, material);
  surface.position.set(0, -2, 0);
  surface.rotation.x += Math.PI / 2;
  surface.castShadow = true;
  surface.receiveShadow = true;

  return surface;
}
