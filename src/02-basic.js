import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 100
  //렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //빛 추가
  const pointLight = new THREE.PointLight(0xffffff, 1)
  pointLight.position.set(0, 2, 12) //x,y,z축
  scene.add(pointLight)

  //공통 부분
  const geometry = new THREE.TorusGeometry(10, 5, 16, 100)
  let setColor = 0xff8000

  //01
  const material01 = new THREE.MeshBasicMaterial({ color: setColor })
  const torus01 = new THREE.Mesh(geometry, material01)
  torus01.position.x = -70

  //02
  const material02 = new THREE.MeshStandardMaterial({
    color: setColor,
    roughness: 0.3,
    metalness: 0.5,
    // wireframe: true,
  })
  const torus02 = new THREE.Mesh(geometry, material02)
  torus02.position.x = -35

  //03
  const material03 = new THREE.MeshPhysicalMaterial({
    color: setColor,
    clearcoat: 1,
  })
  const torus03 = new THREE.Mesh(geometry, material03)

  //04
  const material04 = new THREE.MeshLambertMaterial({ color: setColor })
  const torus04 = new THREE.Mesh(geometry, material04)
  torus04.position.x = 35

  //05
  const material05 = new THREE.MeshPhongMaterial({
    color: setColor,
    shininess: 70,
    specular: 0x004fff,
  })
  const torus05 = new THREE.Mesh(geometry, material05)
  torus05.position.x = 75

  scene.add(torus01, torus02, torus03, torus04, torus05)

  function animate() {
    requestAnimationFrame(animate)
    torus01.rotation.y += 0.01
    torus02.rotation.y += 0.01
    torus03.rotation.y += 0.01
    torus04.rotation.y += 0.01
    torus05.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()

  //반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
