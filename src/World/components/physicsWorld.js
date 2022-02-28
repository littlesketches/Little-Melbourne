import { World, SAPBroadphase } from  'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js'
function createPhysicsWorld(scene) {
  // CannonJS world
  const world = new World()
  world.broadphase = new SAPBroadphase(world)
  world.allowSleep = true
  world.gravity.set(0, -9.82, 0)

  return world
}

export { createPhysicsWorld };
