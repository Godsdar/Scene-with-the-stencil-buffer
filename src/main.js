import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import createObjects from './modules/createObjects';
import setLights from './modules/setLights';
import backgroundScene from '/forestishBackground.jpg';
import { GUI } from 'dat.gui';
import addGui from './modules/addGui';

let camera, scene, renderer, controls;

// вращение сцены
const rotate = { isRotate: false };
// объект для регулировки скорости вращения сцены
const speed = { n: 1 };
// создаем таймер
const clock = new THREE.Clock();

// функция инициализации сцены
function init () {
  const ambientColor = 'white';
  const directionalColor = 'white';
  const ambientIntensity = 1;
  const directionalIntensity = 2;
  const fogColor = 'white';
  const gui = new GUI(); // создаем GUI

  // создаем текстуру
  const backgroundTexture = new THREE.TextureLoader().load(backgroundScene);
  // устанавливаем камеру
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );

  camera.position.z = 7; // отодвигаем камеру от начала координат
  scene = new THREE.Scene(); // создаем сцену
  scene.background = backgroundTexture; // накладываем текстуру на задний фон
  // создаем рендерер
  renderer = new THREE.WebGLRenderer({ stencil: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // включаем тени
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // Обеспечиваем возможность навигации по сцене при помощи мыши
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // Установка освещения
  const { ambient, directional, directionalTarget } = setLights({
    ambientColor,
    ambientIntensity,
    directionalColor,
    directionalIntensity,
  });
  // добавляем источники света на сцену
  scene.add(ambient, directional, directionalTarget);
  // добавляем туман
  scene.fog = new THREE.FogExp2(fogColor, 0.05);
  // определяем параметры будущих объектов сцены
  const surfaceParams = { width: 10, height: 10, depth: 1 };
  const sphereParams = { radius: 0.7 };
  const cubeParams = { size: 1.5 };
  // создаем объекты сцены
  const { surface, torus, sphere, cube } = createObjects({
    surfaceParams,
    sphereParams,
    cubeParams,
  });
  // добавляем созданные объекты на сцену
  scene.add(surface, torus, sphere, cube);
  // добавляем GUI
  addGui({ gui, rotate, speed, torus, cube, sphere });
  // добавляем в конец HTML-тега body элемент, где будет рендериться сцена
  document.body.appendChild(renderer.domElement);
}

// функция анимации вращения сцены
function animate () {
  // время, прошедшее с момента предыдущего обновления сцены
  const delta = clock.getDelta();
  /* если чекбокс в GUI установлен,
     то вращаем сцену с заданной скоростью
     (равной числу оборотов в секунду) */
  rotate.isRotate && (scene.rotation.y -= speed.n * delta);
  // очищаем буфер цвета, буфер глубины и буфер трафарета
  renderer.clear(true, true, true);
  renderer.render(scene, camera); // рендерим сцену
  requestAnimationFrame(animate); // запускаем цикл анимации
}
// вызываем написанные функции
init();
animate();
