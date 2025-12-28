import createSurface from "./createSurface";
import createSphereAndTorus from "./createSphereAndTorus";
import createCube from "./createCube";

export default function createObjects ({ surfaceParams, sphereParams, cubeParams }) {
  const surface = createSurface(surfaceParams);
  const { torus, sphere } = createSphereAndTorus(sphereParams);
  const cube = createCube(cubeParams);
  return {
    surface: surface,
    torus: torus,
    sphere: sphere,
    cube: cube
  };
};