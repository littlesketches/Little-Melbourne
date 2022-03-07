import { Sky } from 'https://unpkg.com/three@0.127.0/examples/jsm/objects/Sky.js';
import { Vector3, MathUtils } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { settings, world } from '../settings.js'
export { createSky };

///////////////////////////////////////////////////////////
/// INIT AND CREATE THE THREE JS SKY SHADER WITH GUI    ///
///////////////////////////////////////////////////////////

function createSky(renderer, scene, camera, gui) {
    // Add Sky (minor adaptation from  https://threejs.org/examples/webgl_shaders_sky.html)
    const sky = new Sky();
    sky.scale.setScalar( 450000 );
    sky.rotation.y = Math.PI

    const sun = new Vector3();

    /// GUI Default settings  
    function guiChanged() {
      const uniforms = sky.material.uniforms;

      uniforms[ 'turbidity' ].value = settings.sky.turbidity;
      uniforms[ 'rayleigh' ].value = settings.sky.rayleigh;
      uniforms[ 'mieCoefficient' ].value = settings.sky.mieCoefficient;
      uniforms[ 'mieDirectionalG' ].value = settings.sky.mieDirectionalG;

      const phi = MathUtils.degToRad( 90 - settings.sky.elevation );
      const theta = MathUtils.degToRad( settings.sky.azimuth - 180 );
      sun.setFromSphericalCoords( 1, phi, theta );
      uniforms[ 'sunPosition' ].value.copy( sun );
      renderer.toneMappingExposure = settings.sky.exposure;

      // Control the directional light position
      const radius = Math.cos(MathUtils.degToRad(settings.sky.elevation)) * 5500
      world.elements.lights.directionalLight.position.x = Math.sin(MathUtils.degToRad(settings.sky.azimuth  - 180)) * radius
      world.elements.lights.directionalLight.position.z = Math.cos(MathUtils.degToRad(settings.sky.azimuth - 180)) * radius
      world.elements.lights.directionalLight.position.y = settings.sky.elevation * 400 /5
      // Re-render
      renderer.render( scene, camera );
    }

    // Add GUI
    const skyFolder = gui.__folders["Environment controls"].addFolder('Sky (atmosphere) controls' );
    skyFolder.add( settings.sky, 'turbidity', 0.0, 20.0, 0.1 ).name('Turbidity').onChange( guiChanged );
    skyFolder.add( settings.sky, 'rayleigh', 0.0, 4, 0.001 ).name('Rayleigh ').onChange( guiChanged );
    skyFolder.add( settings.sky, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
    skyFolder.add( settings.sky, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
    skyFolder.add( settings.sky, 'elevation', -10, 90, 0.1 ).name('Elevation (sun)').onChange( guiChanged );
    skyFolder.add( settings.sky, 'azimuth', 0, 360, 0.1 ).name('Azimuth (sun horizon position)').onChange( guiChanged );
    skyFolder.add( settings.sky, 'exposure', 0, 1, 0.0001 ).name('Exposure (light level)').onChange( guiChanged );

    guiChanged();

    return sky
};