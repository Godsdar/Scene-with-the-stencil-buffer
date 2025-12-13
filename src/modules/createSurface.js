import * as THREE from 'three';
import surfaceTexture from '/walnut-wood-textured-background-design.jpg';

export default function createSurface (size = 10) {
  console.log("size: " + typeof size);
  const loader = new THREE.TextureLoader();
  const texture = loader.load(surfaceTexture);
  
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter
  texture.colorSpace = THREE.SRGBColorSpace;

  const geometry = new THREE.BoxGeometry(size, size, 1);
  const material = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  const surface = new THREE.Mesh(geometry, material);
  surface.position.set(0, -2, 0);
  surface.rotation.x += Math.PI / 2;
  surface.receiveShadow = true;

  return surface;
};