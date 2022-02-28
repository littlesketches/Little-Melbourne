import { WebGLRenderer, sRGBEncoding, PCFSoftShadowMap, ACESFilmicToneMapping } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
// import { WebGLRenderer, sRGBEncoding, PCFSoftShadowMap, ACESFilmicToneMapping } from 'https://unpkg.com/three@0.122.0/build/three.module.js';


function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });

  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = sRGBEncoding;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = settings.sky.exposure;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap; // default THREE.PCFShadowMap
  renderer.antialias = true
  return renderer;
}

export { createRenderer };
