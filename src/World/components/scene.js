import { Color, Scene } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
export { createScene };

/////////////////////////////////////////////////////////////////
/// INITIATE THREE JS SCENE
/////////////////////////////////////////////////////////////////

function createScene() {
  const scene = new Scene();
  scene.background = new Color('#fff');

  return scene;
};