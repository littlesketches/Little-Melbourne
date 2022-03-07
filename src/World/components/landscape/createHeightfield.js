import { Vector3, Ray, Raycaster } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
export { createHeightfield }

///////////////////////////////////////////////////////////
/// CREATE HEIGHTFIELD MAP FOR PHYSICS "FLOOR"          /// 
///////////////////////////////////////////////////////////

const createHeightfield = function(world, heightfield){
  heightfield.offset = {
    x: world.elements[heightfield.elName].position.x,
    z: world.elements[heightfield.elName].position.z
  }
  heightfield.matrix = []
  const rayOrigin = new Vector3()
  rayOrigin.y = 200
  const ray = new Ray()
  ray.direction = new Vector3(0, -1, 0).normalize()
  const raycaster = new Raycaster()
  const divisions = 100

  for(let i = 0; i < divisions; i++){
    heightfield.matrix.push([])
    for(let j = 0; j < divisions; j++){
      rayOrigin.x = i * heightfield.sceneWidth / (divisions + 1) - heightfield.sceneWidth * 0.5  + (i === 0 ? 1: i === (divisions - 1) ? -1.25 : 0)
      rayOrigin.z = (divisions - j) * heightfield.sceneWidth / (divisions + 1)  - heightfield.sceneWidth * 0.5 + (j === 0 ? 1: j ===  (divisions - 1) ? -1.25 : 0)
      ray.origin = rayOrigin
      raycaster.ray = ray
      const intersects = raycaster.intersectObject(world.elements[heightfield.elName], false)
      heightfield.matrix [i][j] = intersects.length > 0 ? rayOrigin.y - intersects[0].distance + 2 : 0
    }
  }
};