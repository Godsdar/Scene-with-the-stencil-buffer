import * as THREE from "three";
import createCubeFace from "./createCubeFace";
import faceTexture from "/cube texture.jpg";

export default function createCube (params) {
  const cube = new THREE.Group();
  const texture = new THREE.TextureLoader().load(faceTexture);
  texture.colorSpace = THREE.SRGBColorSpace;

  const up = createCubeFace(1, params, texture);
  const down = createCubeFace(2, params, texture);
  const left = createCubeFace(3, params, texture);
  const right = createCubeFace(4, params, texture);
  const front = createCubeFace(5, params, texture);
  const back = createCubeFace(6, params, texture);

  cube.add(up, down, left, right, front, back);

  cube.receiveShadow = true;
  cube.castShadow = true;

  return cube;
}
