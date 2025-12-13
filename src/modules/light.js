import * as THREE from 'three';

export default function setLight (scene, ambientColor, ambientIntensity, directionalColor, directionalIntensity) {
  const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
  const directionalLight = new THREE.AmbientLight(directionalColor, directionalIntensity);

  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 512;
  directionalLight.shadow.mapSize.height = 512;
  directionalLight.shadow.camera.light.near = .1;
  directionalLight.shadow.camera.light.far = 100;
  directionalLight.shadow.camera.light.left = -50;
  directionalLight.shadow.camera.light.right = 50;
  directionalLight.shadow.camera.light.top = 50;
  directionalLight.shadow.camera.light.bottom = -50;

  scene.add(ambientLight, directionalLight);
};