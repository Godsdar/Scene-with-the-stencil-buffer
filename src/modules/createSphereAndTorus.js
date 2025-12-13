import * as THREE from 'three';
import createTorus from "./createTorus";
import texture from "/cube texture.jpg";

export default function createSphereAndTorus (sphereSize = 1) {
  const torusTexture = new THREE.TextureLoader().load(texture);
  torusTexture.colorSpace = THREE.SRGBColorSpace;
  const torus = createTorus(sphereSize, torusTexture);
  const sphereGeometry = new THREE.SphereGeometry(sphereSize, 100, 100);
  const sphereMaterial = new THREE.MeshPhongMaterial({
    emissive: '#0a1d38',
    emissiveIntensity: 10,
    fog: true,
    depthWrite: true,
    opacity: 0.5,
    alphaTest: 0.1,
    transparent: true,
  });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  torus.castShadow = true;
  torus.receiveShadow = true;
  torus.rotation.x += Math.PI / 2;
  return {
    torus: torus,
    sphere: sphere
  };
};