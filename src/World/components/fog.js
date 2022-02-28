import { FogExp2 } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function addFog(scene, gui) {
  settings.elements.fog = new FogExp2(settings.fog.color, settings.fog.density)
  scene.fog = settings.elements.fog

  const fogFolder = gui.__folders["Environment controls"].addFolder('Fog')

  fogFolder.add(scene.fog, 'density', 0, 0.005, 0.0001).name('Fog density')
  fogFolder.addColor(settings.fog, 'color').name('Colour')
    .onChange(() =>  scene.fog.color.set(settings.fog.color) )

  return { 
    scene
  };
}

export { addFog };
