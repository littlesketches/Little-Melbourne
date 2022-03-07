export { world, settings, heightfield, direction }

///////////////////////////////////////////////////
/// INITIATE APP GLOBAL VARIABLES               ///
///////////////////////////////////////////////////


const world = {                 // Global object for storing the scene
    elements:   {},                  // used to store references to scene objects for manipulation post-render 
}               
const direction = {}            // Global object for storing the animation direction 
const settings = {              // Global object for settings, references (and state)   
    camera: {
        type:           'perspective',
        pos:            { x: -1590 ,  y: 750,     z: 1830   }, 
        target:         { x: 1000 ,    y: 150,      z: 0   }, 
        perspective: {  
            fov:        35,
            near:       0.1,
            far:        1000000
        }
    },
    lights:{
        ambientLight: {
            sky:            '#FFFFFF',
            ground:         '#FFFFFF',  
            intensity:      0.5
        },
        directionalLight: {
            color:          '#FFFFFF',
            intensity:      2.0
        }
    },
    sky: {
        turbidity:          6,
        rayleigh:           0.2,
        mieCoefficient:     0.03,
        mieDirectionalG:    0.6,
        elevation:          10,
        azimuth:            80,
        exposure:           0.5
    },
    fog: {
        color:              'rgb(115, 38, 70)',
        density:            0.0000,
    },
    elements: {
        datGUIFolders:      {},
        camera: {
            perspective:        null
        },
        lights: {
            ambientLight:       null,
            directionalLight:   null
        },
        fog:            null,
        landscape: {
            buildings:      true,
            roads:          true,
            footpaths:      true,
            cyclePaths:     true
        },
        text: {
            visible:        true
        },  
        fireflies: {
            visible:        true
        }
    },     
    physics:{
        heightData:         [],
        objMap:             {},
        material:           {},
        contactMaterial:    {}
    },
    gui: {
        stats:      null
    },
    debug: {
        showGUI:            true,
        showHeightfield:    false,
        showAnimationCam:   false,
        showCameraHelper:   false,
    },    
    options: {
        simulatePhysics:    true,
        show3dText:         true,
        animationMode:      false
    },
    palette: {
        wes: ['isleOfDogs1', 'isleOfDogs2'],
        grass: '#A4CD9B',
        water: '#4882A5'
    },
    sceneEls: {
        buildings: {}
    }
}

const heightfield = {           // Heightfield surface built from raycasting in the physics module
    elName:         'ground-plane',
    sceneWidth:     10000
} 

