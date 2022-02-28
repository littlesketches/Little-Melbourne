import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { World } from '../World.js';

const clock = new Clock();
let time = Date.now(), oldElapsedTime = 0

class Loop {
  constructor(camera, scene, renderer, physicsWorld) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.physicsWorld = physicsWorld;
    this.updatables = [];
    this.shaderUpdatables = [];
    this.physicsUpdatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {     
      this.tick();
      this.renderer.render(this.scene, this.camera);        // render a frame
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // 0. Clock/time variables
    const elapsedTime = clock.getElapsedTime(),
      currentTime = Date.now(), 
      delta = currentTime - time, 
      deltaTime = elapsedTime - oldElapsedTime    // Previous frame delta for physics timer
   
    time = currentTime                    
    oldElapsedTime = elapsedTime

    // 1. Update physics world simulation
    if(settings.options.simulatePhysics) {
      this.physicsWorld.step( 1 / 60, deltaTime, 6 )      // 60fps and 3 frame catchup
      for (const obj of Object.values(this.physicsUpdatables) ){
        if(obj.dof.x) obj.mesh.position.x = obj.body.position.x
        if(obj.dof.z) obj.mesh.position.z = obj.body.position.z
        if(obj.dof.y) obj.mesh.position.y = obj.body.position.y
      }
    }
    // 2. Update scene (ThreeJS) objects
    for (const object of this.updatables) {
      if(typeof(object.tick) !== 'undefined')  object.tick(elapsedTime, delta / 1000)
      if(typeof(object.update) !== 'undefined')  object.update(delta / 1000)
    }
    // 2. Update scene (ThreeJS) shader uniforms
    for (const object of this.shaderUpdatables) {
      object.uniforms.uTime.value = elapsedTime
    }
    // 3. Update the monitoring
    settings.gui.stats.update()
  }
}

export { Loop };
