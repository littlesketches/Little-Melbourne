import { World } from './World/World.js';

async function main() {
  const container = document.querySelector('#scene-container');   // Get a reference to the container element
  const littleWorld = new World(container);      // create a new world

  await littleWorld.init();         // complete async tasks
  littleWorld.start();              // start the animation loop

}

main().catch((err) => {
  console.error(err);
});
