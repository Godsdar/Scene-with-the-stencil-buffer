import * as THREE from 'three';

export default function addGui({ gui, rotate, speed, torus, sphere, cube }) {
  gui
    .add(sphere.geometry.parameters, 'radius', 0.3, 1.5)
    .name('Радиус сферы')
    .onChange((radius) => {
      const eps = 1e-3;

      sphere.geometry.dispose();
      torus.geometry.dispose();
      sphere.geometry = new THREE.SphereGeometry(radius, 100, 100);
      torus.geometry = new THREE.TorusGeometry(
        radius * 0.65 - eps,
        radius * 0.35 - eps,
        96,
        96,
      );
    });

  gui
    .add(cube.scale, 'x', 0.5, 1.7)
    .name('Размер куба')
    .onChange((size) => cube.scale.set(size, size, size));

  gui
    .add(rotate, 'isRotate')
    .name('Вращение сцены')
    .onChange(() => (rotate.isRotate ? false : true));

  gui
    .add(speed, 'n', 0.1, 10)
    .name('Число оборотов в секунду')
    .onChange((nums) => (speed.n = nums));
}
