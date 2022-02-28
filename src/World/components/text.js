import { FontLoader, TextBufferGeometry, MeshNormalMaterial, MeshBasicMaterial, Mesh, Group, BoxGeometry, Vector3, Box3, Quaternion } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import * as CANNON from 'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js'

let landscapeText = {}            // Object of   
async function addLandscapeText(scene, physicsWorld, physicsUpdatables) {
  const wpVector = new Vector3(),
    wpQuaternion = new Quaternion();
  const fontLoader = new FontLoader()
  fontLoader.load(
    // './assets/fonts/helvetiker_regular.typeface.json',
    // './assets/fonts/MaisonNeue-MonoRegular.json',
    './assets/fonts/MaisonNeue-Medium.json',
    async (font) => {
      await renderText(font)
      return landscapeText
    }
  )

  async function renderText(font){
    const textMaterial = new MeshNormalMaterial()     // Material used for all text 3D text
    const textObjects = [
      {     
        text:           'LITTLE HEPBURN ENERGY',             // Full text string
        position:       {x: 150,  y: 1, z: -235},
        rotation:       {x: 0,   y: Math.PI * 1.0 , z: 0},
        prop:           'mainTitle',                 // Reference to text properties object
      },
    ]

    const textProperties = {
      mainTitle: {
        center:         true,
        split:          true,
        letterSpacing:  2,      
        // Three JS text properties
        size:           20,
        height:         5,
        curveSegments:  24,
        bevelEnabled:   true,
      }
    }

    for( const obj of textObjects){
      // Setup group for text characters (and split if set to true)
      const textGroup = new Group(), 
        charsToRender = textProperties[obj.prop].split ? obj.text.split("") : [obj.text] , 
        charLength = charsToRender.length

      // Add text geometry (by split text array) 
      let startX = 0, letterWidths = []
      for (let i = 0; i < charLength; i++){
        if(charsToRender[i] !== " "){
          const textGeometry = new TextBufferGeometry(        
            charsToRender[i], 
            {
                font,
                size:           textProperties[obj.prop].size,
                height:         textProperties[obj.prop].size * 0.25,
                curveSegments:  textProperties[obj.prop].curveSegments,
                bevelEnabled:   textProperties[obj.prop].bevelEnabled,
                bevelThickness: textProperties[obj.prop].size * 0.025,
                bevelSize:      textProperties[obj.prop].size * 0.025,
                bevelOffset:    0,
                bevelSegments:  16
            } 
          )
          if(textProperties[obj.prop].center) textGeometry.center()

          const text = new Mesh(textGeometry, textMaterial),
            textBbox = new Box3().setFromObject(text),
            textWidth = textBbox.max.x - textBbox.min.x
          
          letterWidths.push(textWidth)  // Store all letter widths

          if(i > 0) { // Increment the letter width
            startX += (letterWidths[i-1] + textWidth) * 0.5 + textProperties[obj.prop].letterSpacing
          }

          text.position.x = startX
          textGroup.add(text)

        } else { // Add a space
          startX += textProperties[obj.prop].size
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
      scene.add(textGroupToAdd)
      settings.elements.text[obj.prop] = textGroupToAdd
    }
  }
}

export { addLandscapeText };
