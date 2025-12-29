import * as THREE from 'three';

/* Функция установки освещения сцены
  Параметры передаем внутри объекта,
  эмулируя передачу аргументов функции по их именам
 */
export default function setLights({
  ambientColor,
  ambientIntensity,
  directionalColor,
  directionalIntensity,
}) {
  // рассеянный свет
  const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
  // направленный свет
  const directionalLight = new THREE.DirectionalLight(
    directionalColor,
    directionalIntensity,
  );
  // устанавливаем позицию направленного света
  directionalLight.position.set(0, 0.5, 0);
  directionalLight.target.position.set(-3, -3, 0);
  // включаем тени
  directionalLight.castShadow = true;
  // возвращаем созданные источники света
  return {
    ambient: ambientLight,
    directional: directionalLight,
    directionalTarget: directionalLight.target,
  };
}
