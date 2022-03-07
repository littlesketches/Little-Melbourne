import { Group, Mesh, SphereGeometry, PlaneGeometry, BoxGeometry, SphereBufferGeometry, CylinderGeometry, BufferGeometry,  MeshBasicMaterial, MeshStandardMaterial, Vector3} from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { bodyToMesh } from './threeCannonUtils.js'
import * as CANNON from  'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js'
import { settings, heightfield } from '../settings.js'
export { addPhysics };

/////////////////////////////////////////////////////////////////
/// SETUP THE CANNON JS PHYSICS FOR THE SCENE                 ///
/////////////////////////////////////////////////////////////////

function addPhysics(world, scene) {
  const physicsUpdatables = {}

  // 0. Setup physics object materials
  settings.physics.material.default = new CANNON.Material('default')
  settings.physics.material.letter = new CANNON.Material('default')
  settings.physics.contactMaterial.default = new CANNON.ContactMaterial(
    settings.physics.material.default ,
    settings.physics.material.default ,
    {
      friction:       0.2,
      restitution:    0
    }
  )
  settings.physics.contactMaterial.defaultToLetter = new CANNON.ContactMaterial(
    settings.physics.material.letter ,
    settings.physics.material.default ,
    {
      friction:      10,
      restitution:   0
    }
  )

  world.addContactMaterial(settings.physics.contactMaterial.default )
  world.addContactMaterial(settings.physics.contactMaterial.defaultToLetter )
  world.defaultContactMaterial = settings.physics.contactMaterial.default

  // Test sphere
  const radius = 1
  const defaultMeshMaterial = new MeshStandardMaterial({color: '#fff'})
  const ballMaterial = new MeshStandardMaterial({color: '#ee9900'})
  const sphere  = new Mesh(
    new SphereBufferGeometry(radius, 32, 32),
    ballMaterial,
  )
  sphere.position.y = 100

  const sphereBody = new CANNON.Body({
    name:       'Ball',
    mass:       1,
    position:   new CANNON.Vec3(0, sphere.position.y, -120),
    shape:      new CANNON.Sphere(radius),
    material:   settings.physics.material.default
  })


  // 1. Construct heightfield for ground
  const heightfieldPoints_X = heightfield.matrix.length,
    heightfieldPoints_Z = heightfield.matrix[0].length

  heightfield.width = heightfield.sceneWidth + heightfieldPoints_X * 2
  heightfield.elSize =  heightfield.width / heightfieldPoints_X 

  const heightfieldShape = new CANNON.Heightfield(
    heightfield.matrix, 
    { elementSize: heightfield.elSize  }  // Distance between height data points
  )
  const heightfieldBody = new CANNON.Body({ 
    mass: 0,
    material:   settings.physics.material.default 
  })

  heightfieldBody.addShape(heightfieldShape)
  heightfieldBody.position.set(
    -(heightfieldPoints_X * heightfieldShape.elementSize) / 2 + ( heightfield.width / heightfieldPoints_X /2),
    0,
    (heightfieldPoints_Z * heightfieldShape.elementSize) / 2 - ( heightfield.width / heightfieldPoints_Z /2)
  )
  heightfieldBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)

  world.addBody(heightfieldBody)

  // Add heightfield mesh for scene testing: requires renderer to use THREE.JS build 122
  if(settings.debug.showHeightfield){
    const mesh = bodyToMesh(heightfieldBody, defaultMeshMaterial)
    mesh.position.y = 0
    scene.add(mesh)
  }

  physicsUpdatables.sphere = {
    mesh:   sphere,
    body:   sphereBody,
    dof: {x: true, y: true, z: true}
  }


  // Universal flat plane (not used) 
      // const floorBody = new CANNON.Body({
      //   name:       'Plane',
      //   mass:       0,
      //   shape:      new CANNON.Plane(),
      //   position:   new CANNON.Vec3(0, 0, 0),
      // })  
      // floorBody.quaternion.setFromAxisAngle(
      //     new CANNON.Vec3(-1, 0, 0),
      //     Math.PI * 0.5
      // )
      // world.addBody(floorBody)

  return physicsUpdatables
};



