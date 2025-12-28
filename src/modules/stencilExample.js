import * as THREE from 'three';

export default function stencilExample() {
  const holeGeometry = new THREE.CircleGeometry(0.4, 360, 0, Math.PI * 2);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);

  const holeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    stencilWrite: true,
    stencilFunc: THREE.NeverStencilFunc,
    stencilRef: 1,
    stencilFail: THREE.ReplaceStencilOp,
  });

  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 'blue',
    side: THREE.DoubleSide,
    depthWrite: true,
    stencilWrite: true,
    stencilFunc: THREE.NotEqualStencilFunc,
    stencilRef: 1,
    stencilZPass: THREE.ReplaceStencilOp,
  });

  const hole = new THREE.Mesh(holeGeometry, holeMaterial);
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  return {
    hole: hole,
    plane: plane,
  };
}
