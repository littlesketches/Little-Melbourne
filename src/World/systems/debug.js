import { GUI } from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/dat.gui.module.js';
import Stats from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/stats.module'
import { settings, world } from '../settings.js'
export { createDatGUI };

///////////////////////////////////////////////////////////////
/// INIT AND CREATE A DEBUG PANE WITH EMBEDDED RENDER STATS /// 
///////////////////////////////////////////////////////////////

function createDatGUI() {

  // Dat GUI and main folders
  const gui = new GUI({name: 'Little Melbourne'});
  settings.elements.datGUIFolders.perfFolder = gui.addFolder("Scene");
  settings.elements.datGUIFolders.envFolder =  gui.addFolder("Environment controls")
  settings.elements.datGUIFolders.particlesFolder =  gui.addFolder("Particle systems")

  // 1. Add Stats.js (integrated into Dat GUI)
  settings.gui.stats = Stats()
  document.body.appendChild(settings.gui.stats.dom)

  const perfLi = document.createElement("li"),
    perfContainer = document.createElement("div"),
    perfPropName    = document.createElement("span"),
    perfStatsContainer = document.createElement("span");

  settings.gui.stats.domElement.style.position = "static";
  perfPropName.classList.add('title')
  perfPropName.innerHTML = "Perf. monitor"
  perfLi.appendChild(perfContainer)
  perfContainer.appendChild(perfPropName)
  perfContainer.appendChild(perfStatsContainer)
  perfLi.classList.add("gui-stats")
  perfStatsContainer.appendChild( settings.gui.stats.domElement);
  settings.elements.datGUIFolders.perfFolder.__ul.appendChild(perfLi);

  // 2. Add Lighting controls (with subfolders for directional and hemisphere lights)
  const lightFolder = settings.elements.datGUIFolders.envFolder.addFolder('Lighting controls'),
    directionalLightFolder = lightFolder.addFolder('Directional light (sun)'),
    hemiLightFolder = lightFolder.addFolder('Ambient (hemisphere) light')

  directionalLightFolder.add(world.elements.lights.directionalLight, 'intensity', 0, 50, 0.05).name('Intensity')
    .onChange(() => settings.lights.directionalLight.intensity = world.elements.lights.directionalLight.intensity)
  directionalLightFolder.addColor(settings.lights.directionalLight, 'color').name('Colour')
    .onChange(() => world.elements.lights.directionalLight.color.set(world.lights.directionalLight.color) )

  hemiLightFolder.add(world.elements.lights.ambientLight, 'intensity', 0, 20, 0.05).name('Intensity')
    .onChange(() => settings.lights.ambientLight.intensity = world.elements.lights.ambientLight.intensity)
  hemiLightFolder.addColor(settings.lights.ambientLight, 'sky').name('Sky colour')
    .onChange(() => world.elements.lights.ambientLight.color.set(settings.lights.ambientLight.sky) )
  hemiLightFolder.addColor(settings.lights.ambientLight, 'ground').name('Ground colour')
    .onChange(() => world.elements.lights.ambientLight.groundColor.set(settings.lights.ambientLight.ground) )

  return gui;
};
