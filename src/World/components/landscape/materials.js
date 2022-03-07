import { MeshNormalMaterial, MeshStandardMaterial, MeshMatcapMaterial, TextureLoader } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { world } from '../../settings.js'
import { matcapNames, wesPalettes } from './palettes.js'
export { materials }

/////////////////////////////////////////////////////////////////
/// CREATE SET OF MATERIALS THAT CAN BE USED WITH THE MODEL   ///
/////////////////////////////////////////////////////////////////

const textureLoader = new TextureLoader()
const materials = { 
  normal: new MeshNormalMaterial({
    flatShading: true
  }),
  standard: { 
    hue: {
        yellow: new MeshStandardMaterial({
            color: 0xffffee,
            flatShading: true
        }),
        aqua: new MeshStandardMaterial({
            color: 0xffffee,
            flatShading: true
        }),
    },
    palettes: {
        wes:        {}
    }
  },
  matcap:       {}
}

// a. ADD MATCAP MATERIALS with textureLoader  
for (const filename of matcapNames){
    const name = filename.slice(0, filename.length -4)
    materials.matcap[name] = new MeshMatcapMaterial({
      matcap:         textureLoader.load(`./assets/img/matcap/${filename}` ),
      flatShading:    true
    })
}

// b. ADD WES ANDERSON PALETTES   
Object.entries(wesPalettes).forEach( ([movieName, palette]) => {
    materials.standard.palettes.wes[movieName] = {}
    for (let i = 0; i < palette.length; i++) {
        const hexCode = palette[i]

        materials.standard.palettes.wes[movieName][`${movieName}_${i}`] = new MeshStandardMaterial({
            color:              hexCode,
            emissive:           hexCode,
            emissiveIntensity:  0.125,
            metalness:          0.3,
            roughness:          1
        })
    }
})