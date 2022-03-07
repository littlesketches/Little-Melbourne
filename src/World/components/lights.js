import { DirectionalLight, HemisphereLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { settings, world } from '../settings.js'
export { createLights };

/////////////////////////////////////////////////////////////
/// SETUP OF SCENE LIGHTING AND SHADOW MAP                ///
/////////////////////////////////////////////////////////////

function createLights() {
  world.elements.lights = {}
  world.elements.lights.ambientLight = new HemisphereLight(
    settings.lights.ambientLight.sky,
    settings.lights.ambientLight.ground,
    settings.lights.ambientLight.intensity
  );

  world.elements.lights.directionalLight = new DirectionalLight(
    settings.lights.directionalLight.color,
    settings.lights.directionalLight.intensity
  );
  world.elements.lights.directionalLight.castShadow = true

  // Set up shadow properties for the light
  world.elements.lights.directionalLight.shadow.mapSize.height  = 1024 * 3; 
  world.elements.lights.directionalLight.shadow.mapSize.width  = 1024 * 3; 
  world.elements.lights.directionalLight.shadow.camera.near     = 1000; 
  world.elements.lights.directionalLight.shadow.camera.far      = 10000; 
  world.elements.lights.directionalLight.shadow.camera.left     = -5000; 
  world.elements.lights.directionalLight.shadow.camera.right    = 5000; 
  world.elements.lights.directionalLight.shadow.camera.top      = 5000; 
  world.elements.lights.directionalLight.shadow.camera.bottom   = -5000; 
  world.elements.lights.directionalLight.shadow.bias            = 0; 
  world.elements.lights.directionalLight.shadow.radius          = 10; 
  world.elements.lights.directionalLight.shadowCameraVisible = true;

  return { 
    ambientLight:     world.elements.lights.ambientLight, 
    directionalLight: world.elements.lights.directionalLight 
  };
};