
import { CameraHelper } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createCameraHelper(light) {
  const helper = new CameraHelper(light );
  return helper;
}

export { createCameraHelper };
