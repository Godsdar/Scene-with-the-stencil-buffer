import * as THREE from "three";
import createCubeFace from "./createCubeFace";
import faceTexture from "/cube texture.jpg";

export default function createCube (width = 1) {
  const cube = new THREE.Group();
  const texture = new THREE.TextureLoader().load(faceTexture);
  texture.colorSpace = THREE.SRGBColorSpace;

  const up = createCubeFace(1, width, texture);
  const down = createCubeFace(2, width, texture);
  const left = createCubeFace(3, width, texture);
  const right = createCubeFace(4, width, texture);
  const front = createCubeFace(5, width, texture);
  const back = createCubeFace(6, width, texture);

  cube.add(up, down, left, right, front, back);

  cube.receiveShadow = true;
  cube.castShadow = true;

  return cube;
}
