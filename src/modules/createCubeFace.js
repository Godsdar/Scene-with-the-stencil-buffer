import * as THREE from 'three';

// Функция для создания грани куба
function createCubeFace(sideN, params, faceTexture) {
  const pos = new THREE.Vector3(); // вектор позиции грани
  const rot = new THREE.Vector3(); // вектор вращения грани
  const posShift = params.size * 0.5; // сдвиг вектора позиции
  const rotShift = Math.PI / 2; // сдвиг вектора вращения (90 градусов)

  // геометрия отверстия в грани
  const holeGeometry = new THREE.CircleGeometry(
    params.size * 0.4,
    360,
    0,
    Math.PI * 2,
  );

  // материал отверстия в грани
  const holeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    stencilWrite: true,
    stencilFunc: THREE.NeverStencilFunc,
    stencilRef: sideN,
    stencilFail: THREE.ReplaceStencilOp,
  });

  // материал грани
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

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(params.size, params.size),
    planeMaterial,
  );
  const hole = new THREE.Mesh(holeGeometry, holeMaterial);
  const face = new THREE.Group();

  // добавляем грань и отверстие в группу face
  face.add(plane, hole);

  // в зависимости от того, какая грань создается, (левая, верхняя, нижняя и т. п.) определяем её позицию и угол поворота
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

  // устанавливаем позицию грани
  face.position.copy(pos);
  // устанавливаем угол поворота грани
  face.rotation.x = rot.x;
  face.rotation.y = rot.y;
  face.rotation.z = rot.z;

  // включаем тени
  face.receiveShadow = true;
  face.castShadow = true;

  return face;
}

export default createCubeFace;
