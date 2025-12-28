import * as THREE from 'three';

export default function transparencyExample() {
  const sphereGeo = new THREE.SphereGeometry(0.4);
  const sphereMat = new THREE.MeshPhongMaterial({
    color: 'blue',
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  const coneGeo = new THREE.ConeGeometry(2, 2, 24, 24);
  const coneMat = new THREE.MeshBasicMaterial({
    color: 'yellowgreen',
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const cone = new THREE.Mesh(coneGeo, coneMat);
  return { cone: cone, sphere: sphere };
}
