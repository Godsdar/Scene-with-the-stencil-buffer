import * as THREE from 'three';

export default function createTorus(sphereSize, texture) {
  return new THREE.Mesh(
    new THREE.TorusGeometry(
      sphereSize * 0.65 - 1e-3,
      sphereSize * 0.35,
      96,
      96,
    ),
    new THREE.MeshPhongMaterial({
      map: texture,
    }),
  );
}
