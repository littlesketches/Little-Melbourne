import { DirectionalLight, HemisphereLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createLights() {
  settings.elements.lights.ambientLight = new HemisphereLight(
    settings.lights.ambientLight.sky,
    settings.lights.ambientLight.ground,
    settings.lights.ambientLight.intensity
  );

  settings.elements.lights.directionalLight = new DirectionalLight(
    settings.lights.directionalLight.color,
    settings.lights.directionalLight.intensity
  );
  settings.elements.lights.directionalLight.castShadow = true

  // Set up shadow properties for the light
  settings.elements.lights.directionalLight.shadow.mapSize.height  = 1024 * 3.5; 
  settings.elements.lights.directionalLight.shadow.mapSize.width  = 1024 * 3.5; 
  settings.elements.lights.directionalLight.shadow.camera.near     = 0.5; 
  settings.elements.lights.directionalLight.shadow.camera.far      = 620; 
  settings.elements.lights.directionalLight.shadow.camera.left     = -320; 
  settings.elements.lights.directionalLight.shadow.camera.right    = 300; 
  settings.elements.lights.directionalLight.shadow.camera.top      = 250; 
  settings.elements.lights.directionalLight.shadow.camera.bottom   = -200; 
  settings.elements.lights.directionalLight.shadow.bias            = -0.0005; 
  settings.elements.lights.directionalLight.shadow.radius            =8; 

  return { 
    ambientLight:     settings.elements.lights.ambientLight, 
    directionalLight: settings.elements.lights.directionalLight 
  };
}

export { createLights };
