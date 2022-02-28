import { CameraHelper }          from 'https://unpkg.com/three@0.127.0/build/three.module.js';

import { loadLandscape }         from './components/landscape/landscape.js';
import { createSceneAnimations}  from './components/animations.js';
import { createSky }             from './components/sky.js';
import { addFog }                from './components/fog.js';
import { addPhysics }            from './components/physics.js';
import { createCamera }          from './components/camera.js';
import { createLights }          from './components/lights.js';
import { createScene }           from './components/scene.js';
import { createFireflies }       from './components/fireflies/fireflies.js';
import { addLandscapeText }      from './components/text.js';

import { createCameraHelper }    from './systems/cameraHelper.js';
import { createControls }        from './systems/controls.js';

import { createDatGUI }          from './systems/debug.js';
import { createRenderer }        from './systems/renderer.js';
import { createPhysicsWorld }    from './components/physicsWorld.js';
import { Resizer }               from './systems/Resizer.js';
import { Loop }                  from './systems/Loop.js';


let cameraHelper, datGUI;

class World {
  constructor(container) {

    world.camera = createCamera(settings);
    world.renderer = createRenderer();
    world.scene = createScene();
    if(settings.options.simulatePhysics) world.physicsWorld =  createPhysicsWorld(world.scene);
    world.loop = new Loop( world.camera,  world.scene,  world.renderer,  world.physicsWorld);
    world.controls = createControls( world.camera,  world.renderer.domElement) 
    container.append( world.renderer.domElement);

    const { ambientLight, directionalLight } = createLights();
    world.loop.updatables.push(world.controls);
    world.scene.add(ambientLight, directionalLight);

    // Helpers
    cameraHelper = createCameraHelper(directionalLight.shadow.camera);
    const resizer = new Resizer(container,  world.camera,  world.renderer);
  }

  async init() {
    world.datGUI = createDatGUI()
    if(!settings.debug.showGUI)  world.datGUI.hide()
    // Camera: Initial target
    world.controls.target.set(settings.camera.target.x, settings.camera.target.y, settings.camera.target.z);                         

    // Add scene elements
    addFog(world.scene, world.datGUI)   

    world.sky = createSky(world.renderer, world.scene, world.camera, world.datGUI);
    const landscape = await loadLandscape();
    // const flock = await loadBirds();
    // const {fireflies, firefliesMaterial} = await createFireflies(world.datGUI)

    world.scene.add( world.sky, landscape );

    // Add Physics simulation
    // if(settings.options.simulatePhysics){
    //   world.loop.physicsUpdatables = await addPhysics(world.physicsWorld,  world.scene)
    //   if(settings.options.show3dText) addLandscapeText(world.scene, world.physicsWorld, world.loop.physicsUpdatables);
    // }

    // Add objects to animation loop (updatables)
    // const { animGaleBlades, animGustoBlades, animFlock} = await createSceneAnimations(world.datGUI);
    // world.loop.updatables.push( animFlock, animGaleBlades, animGustoBlades);
    // for (const bird of flock.children) { world.loop.updatables.push(bird) }  
    // Add shader updatables
    // world.loop.shaderUpdatables.push(firefliesMaterial)
  };

  render() {
    renderer.render(world.scene, world.camera);
  }

  start() {
    world.loop.start();
  }

  stop() {
    world.loop.stop();
  }

}

export { World };
