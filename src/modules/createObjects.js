import createSurface from "./createSurface";
import createSphereAndTorus from "./createSphereAndTorus";
import createCube from "./createCube";

export default function createObjects ({surfaceSize, sphereSize, cubeSize}) {
  const surface = createSurface(surfaceSize);
  const { torus, sphere } = createSphereAndTorus(sphereSize);
  const cube = createCube(cubeSize);
  return {
    surface: surface,
    torus: torus,
    sphere: sphere,
    cube: cube
  };
};