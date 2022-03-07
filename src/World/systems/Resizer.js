export { Resizer };

///////////////////////////////////////////////////////////////
/// CANVAS RESIZE ON SCREEN RESIZE FUNCTION                 ///
///////////////////////////////////////////////////////////////

const setSize = (container, camera, renderer) => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
};

class Resizer {
  constructor(container, camera, renderer) {    
    setSize(container, camera, renderer);         // set initial size

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer);        // set the size again if a resize occurs
      this.onResize();
    });
  }

  onResize() {}
};
