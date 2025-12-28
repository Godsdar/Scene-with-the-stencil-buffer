import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import createObjects from './modules/createObjects';
import setLights from './modules/setLights';
import backgroundScene from '/forestishBackground.jpg';
import { GUI } from 'dat.gui';
import addGui from './modules/addGui';

let camera, scene, renderer, controls;
const rotate = { isRotate: false };
const speed = { n: 1 };
const clock = new THREE.Clock();

function init() {
  const ambientColor = 'white';
  const directionalColor = 'red';
  const ambientIntensity = 1;
  const directionalIntensity = 0.1;
  const fogColor = 'white';
  const { hole, plane } = stencilExample();
  const gui = new GUI();

  const backgroundTexture = new THREE.TextureLoader().load(backgroundScene);
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.01,
    1000,
  );

  camera.position.z = 7;
  scene = new THREE.Scene();
  scene.background = backgroundTexture;

  renderer = new THREE.WebGLRenderer({ stencil: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  const { ambient, directional, directionalTarget } = setLights({
    ambientColor,
    ambientIntensity,
    directionalColor,
    directionalIntensity,
  });

  scene.add(ambient, directional, directionalTarget);
  scene.fog = new THREE.FogExp2(fogColor, 0.05);
  const surfaceParams = { width: 10, height: 10, depth: 1 };
  const sphereParams = { radius: 0.7 };
  const cubeParams = { size: 1.5 };
  const { surface, torus, sphere, cube } = createObjects({
    surfaceParams,
    sphereParams,
    cubeParams,
  });
  scene.add(surface, torus, sphere, cube);

  addGui({ gui, rotate, speed, torus, cube, sphere });

  document.body.appendChild(renderer.domElement);
}

function animate() {
  const delta = clock.getDelta();
  rotate.isRotate && (scene.rotation.y -= speed.n * delta);
  renderer.clear(true, true, true);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
animate();
