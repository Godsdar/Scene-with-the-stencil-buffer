import * as THREE from 'three';
import createTorus from './createTorus';
import texture from '/cube texture.jpg';

export default function createSphereAndTorus(params) {
  const torusTexture = new THREE.TextureLoader().load(texture);
  torusTexture.colorSpace = THREE.SRGBColorSpace;
  const torus = createTorus(params.radius, torusTexture);
  const sphereGeometry = new THREE.SphereGeometry(params.radius, 100, 100);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    color: '#ccc',
    depthWrite: true,
    side: THREE.DoubleSide,
    transparent: true,
    alphaTest: 0.5,
    opacity: 0.5,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  torus.castShadow = true;
  torus.receiveShadow = true;
  torus.rotation.x += Math.PI / 2;
  return {
    torus: torus,
    sphere: sphere,
  };
}
