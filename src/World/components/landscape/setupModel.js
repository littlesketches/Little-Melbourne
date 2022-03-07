import { Group } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { materials} from './materials.js'
import { createHeightfield } from './createHeightfield.js'
import { settings, world, heightfield } from '../../settings.js'

export { setupModel };

///////////////////////////////////////////////////////////
/// SETUP THE MAIN MODEL ELEMENTS AND ADD TO THE SCENE  ///
///////////////////////////////////////////////////////////

world.materials = materials

function setupModel(data) {
  const model = new Group()
  model.name = 'Melbourne scene'

  const children = [...data.scene.children]
  console.log(children)
  console.log(children.map( d => `${d.type}: ${d.name}`) )

  // MATERIAL / COLOUR PALETTE: for programmatic assignment ot buildings
  const materialPalette = getMaterialPallette(),
      palletteNames = Object.keys(materialPalette),
      paletteLength = Object.keys(materialPalette).length

  /// CONFIGURE AND ADD ALL OBJECTS TO THE MODEL
  // a. Set up and add model object (meshes, meshes in paths / applied modifiers in Object3Ds) and objects that are in groups
  for (const child of children){
  
    switch(child.type){     // Switch to treat groups or specifically named meshses
      case 'Mesh':
        const isBuilding = child.name.slice(0, 9) === 'buildings'
        const pathYScale = 1.25

        //// BUILDING GROUP MESHES
        if(isBuilding){
          // Setup building meshes and and references
          if(typeof world.elements.buildings === 'undefined'){ world.elements.buildings = {} }
          world.elements.buildings[child.name] = child
          child.castShadow = true
          child.receiveShadow = true

          // Assign materials: 
          switch(child.name.slice(-3)){
            case '000':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]
              break

            case '001':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]
              break

            case '002':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]
              break

            case '003':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]
              break

            case '004':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]
              break

            case '005':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]
              break

            case '006':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]
              break

            case '007':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]
              break

            case '008':
                child.material = materialPalette[palletteNames[Number(child.name.slice(-3)) % paletteLength]]

              break

            default: 
              console.log('Unknown building mesh group: ', child)
          }

        //// NON- BUILDING MESHES   
        } else {
          world.elements[child.name] = child

          switch(child.name){
            case 'ground-plane':  // Non-visible plane Used for physics 
              child.material.transparent = true
              child.material.opacity = 0

              break
            case 'ground-body':
              child.receiveShadow = true
              // child.material.depthWrite = false
              child.material.color.set(settings.palette.grass)

              // child.material.metalness =0.5
              child.material.roughness = 0.5
              break

            case 'water-body': 
              // child.material.depthWrite = false
              // child.material.flatShading = true
              child.material.metalness = 1
              child.material.emissive.set(settings.palette.water)
              child.material.emissiveIntensity = 0.25 
              break
            
            case 'soil-body':
              // child.material.depthWrite = false
              child.receiveShadow = true
              break

            case 'roads': 
            case 'bike-paths': 
            case 'footpaths': 
              child.material.flatShading = true
              child.position.set(0, pathYScale * 2, 0)
              child.scale.set(1, pathYScale, 1)


             switch(child.name){
              case 'roads': 
                child.material = materials.normal
              child.material = materials.matcap['glass-black']
                break

              case 'footpaths': 
console.log(materials.matcap)
              child.material = materials.matcap['matte-green']
                  console.log('Footpaths only??')
                break

              case 'bike-paths': 
              child.material = materials.normal
                break 
              }

              break



            default: 
              console.log('Unknown mesh: ', child)
          }
        }

        // Add the mesh to the model
        model.add(child) 

      break

      // Placeholder as model may not have any groups
      case 'Group':
        console.log('Group: '+child.name)
        const meshes = [...child.children]

        switch(child.name){
          default:
            for (const mesh of meshes){
              model.add(mesh) 
            }
        }
        break

        default:
          console.log('Model element is not a mesh or group', child)
    }
  }

  // b. Create the heighfield map from the grounf object
  createHeightfield(world, heightfield)

  // c. Return the complete model
  return model;
}


/////////////////////  HELPER FUNCTIONS //////////////////

function getMaterialPallette(){
  let palette = {}
  for( const paletteName of settings.palette.wes){
    palette = {
      ...palette,
      ...materials.standard.palettes.wes[paletteName]
    }
  }
  return palette
};

