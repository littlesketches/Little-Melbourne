import { Group, Color, MeshBasicMaterial, MeshToonMaterial,  MeshStandardMaterial, Vector3, Ray, Raycaster } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function setupModel(data) {
  const model = new Group()
  model.name = 'Model group'
  const children = [...data.scene.children]

console.log(children)
console.log(children.map(d => d.name))
  /// CONFIGURE AND ADD ALL OBJECTS 
  // a. Set up shadows by object (meshes, meshes in paths / applied modifiers in Object3Ds) and objects that are in groups
  for (const child of children){

    if(child.type === 'Group' ){
      for (const mesh of child.children){
        console.log(mesh.name)
      }
    }

    if(child.type === 'Mesh'){
      child.castShadow = true
    }


    if(child.name === 'buildings'){
      // console.log(child)
    }

    if(child.type === 'Group' ){
      const group = new Group() 
      for (const mesh of child.children){
        mesh.castShadow = true
      }
    }

  if(child.name === 'roads'){
    if(child.type === 'Group' ){    // Flat shade the roads
      for (const mesh of child.children){
        mesh.material.flatShading = true
      }
    }
  }

  if(child.name === 'ground-body'){
            child.material.receiveShading = true
  }

  if(child.name === 'water-body'){
console.log(child)


        child.material.flatShading = true
      
    
  }


console.log(child.name)

      model.add(child) 
  }

  return model;
}

export { setupModel };
