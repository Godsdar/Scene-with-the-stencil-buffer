import * as THREE from 'three';

export default function setLights({
  ambientColor,
  ambientIntensity,
  directionalColor,
  directionalIntensity,
}) {
  const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
  const directionalLight = new THREE.DirectionalLight(
    directionalColor,
    directionalIntensity,
  );

  directionalLight.position.set(0, 0.5, 0);
  directionalLight.target.position.set(-3, -3, 0);
  directionalLight.castShadow = true;
  return {
    ambient: ambientLight,
    directional: directionalLight,
    directionalTarget: directionalLight.target,
  };
}
