import { PerspectiveCamera } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
export { createCamera };

///////////////////////////////////////////////////////////
/// SETUP OF MAIN PERSPECTIVE CAMERA                    ///
///////////////////////////////////////////////////////////

function createCamera(settings) {
  settings.elements.camera.perspective = new PerspectiveCamera(
      settings.camera.fov, 
      1, 
      settings.camera.perspective.near, 
      settings.camera.perspective.far
    );
  settings.elements.camera.perspective.position.set(settings.camera.pos.x, settings.camera.pos.y, settings.camera.pos.z);

  return settings.elements.camera.perspective;
};