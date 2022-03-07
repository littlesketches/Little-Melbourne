import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/DRACOLoader.js';
import { setupModel } from './setupModel.js';
export { loadLandscape};

////////////////////////////////////////////////////////////////
//// LOAD THE MAIN GLTF MODEL WITH ALL ENVIRONMENT FEATURES ////
////////////////////////////////////////////////////////////////

const dracoLoader = new DRACOLoader(),
  gltfLoader = new GLTFLoader(),
  modelPath = 'https://unpkg.com/three@0.127.0/examples/js/libs/draco/'

async function loadLandscape() {
  dracoLoader.setDecoderPath(modelPath)
  gltfLoader.setDRACOLoader(dracoLoader)

  const [landscapeData] = await Promise.all([
    gltfLoader.loadAsync('./assets/models/little-melbourne-draco.glb')
  ]);

  return setupModel(landscapeData);
};
