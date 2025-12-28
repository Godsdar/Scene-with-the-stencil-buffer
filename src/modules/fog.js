import * as THREE from 'three';

export default function setFog(color, near, far) {
  const fog = new THREE.fog(color, near, far);
  return fog;
}
