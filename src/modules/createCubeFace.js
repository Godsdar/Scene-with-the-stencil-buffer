import * as THREE from 'three';

function createCubeFace (sideN, params, faceTexture) {
  const pos = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const posShift = params.size * .5;
  const rotShift = Math.PI / 2;

  const holeGeometry = new THREE.CircleGeometry(params.size * .4, 360, 0, Math.PI * 2);

  const holeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    stencilWrite: true,
    stencilFunc: THREE.NeverStencilFunc,
    stencilRef: sideN,
    stencilFail: THREE.ReplaceStencilOp,
  });

  const planeMaterial = new THREE.MeshPhongMaterial({
    map: faceTexture,
    side: THREE.DoubleSide,
    emissive: faceTexture,
    emissiveIntensity: 1000,
    fog: true,
    depthWrite: true,
    stencilWrite: true,
    stencilFunc: THREE.NotEqualStencilFunc,
    stencilRef: sideN,
    stencilZPass: THREE.ReplaceStencilOp,
  });
  // new THREE.materialName({
  //   stencilWrite: true,
  //   stencilFunc: THREE.nameStencilFunc,
  //   stencilRef: sideN,
  //   stencilPassFunc: THREE.passReaction
  // });

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(params.size, params.size), planeMaterial);
  const hole = new THREE.Mesh(holeGeometry, holeMaterial);
  const face = new THREE.Group();

  face.add(hole, plane);

  switch (sideN) {
    case 1:
      pos.setComponent(0, -posShift);
      rot.setComponent(1, -rotShift);
      break;
    case 2:
      pos.setComponent(1, posShift);
      rot.setComponent(0, rotShift);
      break;
    case 3:
      pos.setComponent(1, -posShift);
      rot.setComponent(0, rotShift);
      break;
    case 4:
      pos.setComponent(0, posShift);
      rot.setComponent(1, rotShift);
      break;
    case 5:
      pos.setComponent(2, -posShift);
      break;
    case 6:
      pos.setComponent(2, posShift);
      break;
  }

  face.position.copy(pos);
  face.rotation.x = rot.x;
  face.rotation.y = rot.y;
  face.rotation.z = rot.z;

  face.receiveShadow = true;
  face.castShadow = true;

  return face;
}

export default createCubeFace;