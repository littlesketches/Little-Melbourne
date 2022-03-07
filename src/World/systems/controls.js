import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
export { createControls };

///////////////////////////////////////////////////////////
/// THREEJS ORBIT CONTROLS
///////////////////////////////////////////////////////////

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;
  controls.minDistance = 100;
  controls.maxDistance = 8000;
  controls.maxPolarAngle = Math.PI*0.475; 

  controls.tick = () => controls.update(); // forward controls.update to custom .tick method
  return controls;
};
