import * as THREE from 'three';

// Функция для добавления GUI
export default function addGui({ gui, rotate, speed, torus, sphere, cube }) {
  /* ползунок для изменения радиусов сферы и тора
  при каждом изменении значения на ползунке,
  перерисовываем соответствующие объекты */
  gui.add(sphere.geometry.parameters, 'radius', 0.3, 1.5)
    .name('Радиус сферы')
    .onChange((radius) => {
      const eps = 1e-3;

      sphere.geometry.dispose();
      torus.geometry.dispose();
      sphere.geometry = new THREE.SphereGeometry(radius, 100, 100);
      torus.geometry = new THREE.TorusGeometry(
        /* 0.65 + 0.35 = 1, поэтому сфера описывается созданным тором.
          Для того, чтобы избежать Z-fighting'а,
          мы отнимаем от радиуса тора одну тысячную */
        radius * 0.65 - eps,
        radius * 0.35 - eps,
        96,
        96,
      );
    });
  
  // ползунок для изменения размера куба
  gui.add(cube.scale, 'x', 0.5, 1.7)
    .name('Размер куба')
    .onChange((size) => cube.scale.set(size, size, size));

  // чекбокс для включения и отключения вращения сцены
  gui.add(rotate, 'isRotate')
    .name('Вращение сцены')
    .onChange(() => (rotate.isRotate ? false : true));

  // ползунок для регулировки скорости вращения сцены
  gui.add(speed, 'n', 0.1, 10)
    .name('Число оборотов в секунду')
    .onChange((nums) => (speed.n = nums));
}
