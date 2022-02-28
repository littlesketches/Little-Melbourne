import { BufferGeometry, BufferAttribute, ShaderMaterial, Points, AdditiveBlending, Vector3, Ray, Raycaster} from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const firefliesVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uSize;

  attribute float aScale;

  void main()
  {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;
      modelPosition.x += sin(uTime + modelPosition.x * 100.0) * 0.1;
      modelPosition.z += cos(uTime + modelPosition.x * 100.0) * 0.1;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;

      gl_Position = projectionPosition;
      
      gl_PointSize = uSize * aScale * uPixelRatio;
      gl_PointSize *= (1.0 / - viewPosition.z);
  }
`

const firefliesFragmentShader = `
  void main()
  {
      float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
      float strength = 0.05 / distanceToCenter - 0.1;

      gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
  } 
`
async function createFireflies(datGUI) {
  // Geometry
  const firefliesGeometry = new BufferGeometry()
  const firefliesCount = 5000
  const positionArray = new Float32Array(firefliesCount * 3)
  const scaleArray = new Float32Array(firefliesCount)

  for(let i = 0; i < firefliesCount; i++){
    const xPos = (Math.random() - 0.5) * heightfield.sceneWidth
    const zPos = (Math.random() - 0.5) * heightfield.sceneWidth
    const yPos = heightfield.matrix
      [Math.floor((xPos + heightfield.sceneWidth * 0.5) * (heightfield.matrix.length - 1) / heightfield.sceneWidth )]
      [Math.floor((zPos + heightfield.sceneWidth * 0.5) * (heightfield.matrix.length - 1) / heightfield.sceneWidth )]

    positionArray[i * 3 + 0] = xPos
    positionArray[i * 3 + 1] = yPos + 10 + (Math.random() * 15 -10)
    positionArray[i * 3 + 2] = zPos

    scaleArray[i] = 2 + Math.random() * 10
  }


  firefliesGeometry.setAttribute('position', new BufferAttribute(positionArray, 3))
  firefliesGeometry.setAttribute('aScale', new BufferAttribute(scaleArray, 1))

  // Material
  const firefliesMaterial = new ShaderMaterial({
      uniforms:
      {
          uTime: { value: 0 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uSize: { value: 100 }
      },
      vertexShader: firefliesVertexShader,
      fragmentShader: firefliesFragmentShader,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
  })

  // Points
  const fireflies = new Points(firefliesGeometry, firefliesMaterial)
fireflies.visible = false
  settings.elements.fireflies  = fireflies


  // Debug
  settings.elements.datGUIFolders.particlesFolder.add(fireflies, 'visible').name('Show fireflies!')
  settings.elements.datGUIFolders.particlesFolder.add(firefliesMaterial.uniforms.uSize, 'value').min(0).max(500).step(1).name('Firefly size')


  return {fireflies, firefliesMaterial}

}

export { createFireflies };
