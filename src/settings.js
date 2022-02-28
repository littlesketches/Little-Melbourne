//////////////////////////////////
/// INITIATE GLOBAL VARIABLES  ///
//////////////////////////////////


const world = {}                // Global object for storing the scene
const direction = {}            // Global object for storing the animation direction 
const settings = {              // Global object for settings, references (and state)
    camera: {
        type:           'perspective',
        pos:            { x: 4000 ,  y: 500,     z: -1800   }, 
        target:         { x: 1000 ,    y: 50,      z: 0   }, 
        perspective: {  
            fov:        35,
            near:       0.1,
            far:        10000000
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
        mieDirectionalG:    0.25,
        elevation:          8,
        azimuth:            80,
        exposure:           0.05
    },
    fog: {
        color:              'rgb(30, 30, 30)',
        density:            0,
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
        flock :         null,
        fog:            null,
        turbine:        {},
        solar:          {
            visible:        true,
            arrays:      []
        },
        storage:           {
            visible:        true
        },
        text:           {
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
    },    
    options: {
        simulatePhysics:    true,
        showNorthRoad:      true,
        show3dText:         true,
        animationMode:      false
    }
}


// Heightfield surface built from raycasting in the physics module
const heightfield = {
    sceneWidth:     500
} 

