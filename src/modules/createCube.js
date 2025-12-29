import * as THREE from 'three';
import createCubeFace from './createCubeFace';
import faceTexture from '/cube texture.jpg';

// Функция для создания куба из шести граней
export default function createCube(params) {
  const cube = new THREE.Group(); // создаем группу cube
  const texture = new THREE.TextureLoader().load(faceTexture);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Поочередно создаем грани
  const up = createCubeFace(1, params, texture);
  const down = createCubeFace(2, params, texture);
  const left = createCubeFace(3, params, texture);
  const right = createCubeFace(4, params, texture);
  const front = createCubeFace(5, params, texture);
  const back = createCubeFace(6, params, texture);

  // Добавляем грани в группу
  cube.add(up, down, left, right, front, back);

  // Отбрасывание теней
  cube.receiveShadow = true;
  cube.castShadow = true;

  return cube;
}
