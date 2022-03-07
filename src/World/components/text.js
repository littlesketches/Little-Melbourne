import { FontLoader, TextBufferGeometry, MeshStandardMaterial, MeshNormalMaterial, MeshBasicMaterial, Mesh, Group, BoxGeometry, Vector3, Box3, Quaternion } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js'
import { settings, world } from '../settings.js'
export { addLandscapeText };

///////////////////////////////////////////////////////////
/// CREATE THE LANDSCAPE TEXT WITH PHYSICS              ///
///////////////////////////////////////////////////////////

let landscapeText = {}            // Object of   

async function addLandscapeText(scene, physicsWorld, physicsUpdatables) {
  const wpVector = new Vector3(),
    wpQuaternion = new Quaternion();
  const fontLoader = new FontLoader()
  fontLoader.load(
    './assets/fonts/helvetiker_regular.typeface.json',
    async (font) => {
      await renderText(font)
      return landscapeText
    }
  )

  async function renderText(font){
    const textMaterial = new MeshNormalMaterial()     // Material used for all text 3D text
      // textMaterial.emissive.set('#55ff00')
      // textMaterial.emissiveIntensity = 0.75
      // textMaterial.castShadow = true

    const textObjects = [
      {     
        text:           'LITTLE',             // Full text string
        position:       {x: 1200,  y: 300, z: -3200},
        rotation:       {x: 0,   y: Math.PI * 2.0 , z: 0},
        prop:           'mainTitle-little',                 // Reference to text properties object
      },
      {     
        text:           'MELBOURNE',             // Full text string
        position:       {x: 4000,  y: 300, z: -2500},
        rotation:       {x: 0,   y: Math.PI * -0.5 , z: 0},
        prop:           'mainTitle-melbourne',                 // Reference to text properties object
      },

    ]

    const textProperties = {
      default: {
        center:         true,
        split:          true,
        letterSpacing:  80,      
        // Three JS text properties
        size:           500,
        depth:          200,
        curveSegments:  24,
        bevelEnabled:   true,
      }
    }

    for( const obj of textObjects){
      const textProps = textProperties[obj.prop] ? textProperties[obj.prop] : textProperties.default

      // Setup group for text characters (and split if set to true)
      const textGroup = new Group(), 
        charsToRender = textProps.split ? obj.text.split("") : [obj.text] , 
        charLength = charsToRender.length

      // Add text geometry (by split text array) 
      let startX = 0, letterWidths = []
      for (let i = 0; i < charLength; i++){
        if(charsToRender[i] !== " "){
          const textGeometry = new TextBufferGeometry(        
            charsToRender[i], 
            {
                font,
                size:           textProps.size,
                height:         textProps.depth,
                curveSegments:  textProps.curveSegments,
                bevelEnabled:   textProps.bevelEnabled,
                bevelThickness: textProps.size * 0.025,
                bevelSize:      textProps.size * 0.025,
                bevelOffset:    0,
                bevelSegments:  16
            } 
          )
          if(textProps.center) textGeometry.center()

          const text = new Mesh(textGeometry, textMaterial),
            textBbox = new Box3().setFromObject(text),
            textWidth = textBbox.max.x - textBbox.min.x
          
          letterWidths.push(textWidth)  // Store all letter widths

          if(i > 0) { // Increment the letter width
            startX += (letterWidths[i-1] + textWidth) * 0.5 + textProps.letterSpacing
          }

          text.position.x = startX
          textGroup.add(text)

        } else { // Add a space
          startX += textProps.size
          letterWidths.push(5)  // Add a letter width for the space
        }
      }
      // Position text group and add to scene
      textGroup.position.set(obj.position.x, obj.position.y, obj.position.z)  
      textGroup.rotation.set(obj.rotation.x, obj.rotation.y, obj.rotation.z)  

      const children = [...textGroup.children],
        textGroupToAdd = new Group()

      textGroupToAdd.name = obj.prop

      for (let i = 0; i < children.length; i++){
        // Get text geometry dims and world position
        const mesh = children[i],
          worldPos = mesh.getWorldPosition(wpVector), 
          worldQuat = mesh.getWorldQuaternion(wpQuaternion), 
          bbox = new Box3().setFromObject(mesh),
          bbox_x = bbox.max.x - bbox.min.x,
          bbox_y = bbox.max.y - bbox.min.y,
          bbox_z = bbox.max.z - bbox.min.z

        // Add each char to scene in world position
        textGroupToAdd.add(mesh)
        mesh.position.set(worldPos.x, worldPos.y, worldPos.z) 
        mesh.quaternion.set( worldQuat.x, worldQuat.y, worldQuat.z, worldQuat.w) 

        const body = new CANNON.Body({
          mass:         10,
          position:     new CANNON.Vec3(worldPos.x, worldPos.y, worldPos.z),
          quaternion:   new CANNON.Quaternion(worldQuat.x, worldQuat.y, worldQuat.z, worldQuat.w),
          shape:        new CANNON.Box(new CANNON.Vec3(bbox_x * 0.5, bbox_y * 0.5, bbox_x * 1) ), // use x value for depth to create larger footprint to present falling through floor
          material:     settings.physics.material.letter
        })

        physicsWorld.addBody(body)
        physicsUpdatables[`${obj.prop}_${i}`] = { 
          mesh, 
          body,
          dof: {x: false, y: true, z: false}
        }
      }
      // Add text group to scene and create object reference

      // world.elements.text
      scene.add(textGroupToAdd)
      settings.elements.text[obj.prop] = textGroupToAdd
    }
  }
};


