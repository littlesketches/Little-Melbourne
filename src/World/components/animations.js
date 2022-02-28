import { Math as MathUtils } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

async function createSceneAnimations(gui) {

  // 1. WIND TURBINE
    // a. Blade rotation animation
    settings.elements.turbine.gale.blades.tick = (elapsedTime, delta) =>  settings.elements.turbine.gale.blades.rotation.z += (delta * Math.PI * 2/ 60)  * settings.wind.turbine.gale.rpm
    settings.elements.turbine.gusto.blades.tick = (elapsedTime, delta) => settings.elements.turbine.gusto.blades.rotation.z += (delta * Math.PI * 2/ 60) * settings.wind.turbine.gusto.rpm

    // b. Add GUI helpers to set wind conditions
    const windFolder = gui.__folders["Environment controls"].addFolder('Wind controls' );
    windFolder.add( settings.wind, 'speed', 0, settings.wind.turbine_performance.windSpeed_max, 0.1 ).onChange( updateForWind )
        .name("Wind speed (m/s)")
    windFolder.add( settings.wind, 'direction', 0, 360, 0.1 ).onChange( updateForWind )
        .name("Direction (deg from north)")

    // c. Method to update turbines for wind conditions
    function updateForWind() {
      // Set estimated blade speed (rpm)
      settings.wind.turbine.gale.rpm  = settings.wind.speed >= settings.wind.turbine_performance.windSpeed_min ? windSpeedToRPM(settings.wind.turbine.gale.factor) : 0
      settings.wind.turbine.gusto.rpm = settings.wind.speed >= settings.wind.turbine_performance.windSpeed_min ? windSpeedToRPM(settings.wind.turbine.gusto.factor) : 0
      // Set blades to face direction of wind
      settings.elements.turbine.gale.blades.rotation.y = MathUtils.degToRad(360 - settings.wind.direction)
      settings.elements.turbine.gale.motor.rotation.y = MathUtils.degToRad(360 - settings.wind.direction)
      settings.elements.turbine.gusto.blades.rotation.y = MathUtils.degToRad(360 - settings.wind.direction)
      settings.elements.turbine.gusto.motor.rotation.y = MathUtils.degToRad(360 - settings.wind.direction)
      // Conversion helper
      function windSpeedToRPM(factor){ return ((settings.wind.speed - settings.wind.turbine_performance.windSpeed_min) / (settings.wind.turbine_performance.windSpeed_max - settings.wind.turbine_performance.windSpeed_min))
        * (settings.wind.turbine_performance.bladeRPM_max -  settings.wind.turbine_performance.bladeRPM_min)  * factor + settings.wind.turbine_performance.bladeRPM_min }
    }

    updateForWind() // Initialise

  // 2.FLOCK OF BIRDS
  settings.elements.flock.tick = (elapsedTime) =>  {
    const degrees = (elapsedTime * Math.PI * 2 ) % 360, 
      radius = 200, elevationDelta = 10
    settings.elements.flock.position.x = Math.sin(MathUtils.degToRad(degrees)) * radius
    settings.elements.flock.position.y = 50 + Math.sin(MathUtils.degToRad(degrees)) * elevationDelta
    settings.elements.flock.position.z = Math.cos(MathUtils.degToRad(degrees)) * radius
    settings.elements.flock.rotation. y = MathUtils.degToRad(degrees + 90)
    return settings.elements.flock.position
  }


  // Return reference to animation objects
  return {
    animGaleBlades: settings.elements.turbine.gale.blades,
    animGustoBlades: settings.elements.turbine.gusto.blades,
    animFlock: settings.elements.flock
  };
}

export { createSceneAnimations };
