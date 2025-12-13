import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import createObjects from "./modules/createObjects";
import setLights from "./modules/setLight";
import backgroundScene from "/forestishBackground.jpg";

let camera, scene, renderer, controls;

function init () {
  let ambientColor = 'white';
  let directionalColor = 'white';
  let ambientIntensity = 1;
  let directionalIntensity = 10;
  const fogColor = 'white';

  const backgroundTexture = new THREE.TextureLoader().load(backgroundScene);
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window. innerHeight, 0.01, 1000 );

  camera.position.z = 7;
  scene = new THREE.Scene();
  scene.background = backgroundTexture;

  renderer = new THREE.WebGLRenderer( { stencil: true, antialias: true } );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  controls = new OrbitControls(camera, renderer.domElement);

  const { ambient, directional, directionalTarget } = setLights({ ambientColor, ambientIntensity, directionalColor, directionalIntensity });

  scene.add(ambient, directional, directionalTarget);
  scene.fog = new THREE.FogExp2(fogColor, .09);
  const surfaceSize = 10;
  const sphereSize = .7;
  const cubeSize = 1.5;
  const { surface, torus, sphere, cube } = createObjects({surfaceSize, sphereSize, cubeSize});
  scene.add(torus, surface, sphere, cube);
  
  document.body.appendChild( renderer.domElement );
}

function animate () {
  // scene.rotation.y += 0.003;

  renderer.clear( true, true, true );
  renderer.render( scene, camera );
  requestAnimationFrame( animate );
}

init();
animate();