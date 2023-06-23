import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const FogColor = 0x00ffff
  const objColor = 0xffffff
  const FloorColor = 0x555555

  //장면 추가
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(FloorColor)
  // scene.fog = new THREE.Fog(FogColor, 1, 10) //scene에 안개 추가
  scene.fog = new THREE.FogExp2(FogColor, 1)
  //카메라 추가
  const fov = 100
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.1
  const far = 1000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 2, 3)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true

  //orbitControls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2
  controls.maxDistance = 6
  controls.maxPolarAngle = Math.PI / 2

  controls.update()

  //도형
  const geometry = new THREE.TorusKnotGeometry(1, 0.4, 64, 8)
  const material = new THREE.MeshStandardMaterial({
    color: objColor,
  })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  cube.position.y = 1

  scene.add(cube)
  cube.castShadow = true
  cube.receiveShadow = true

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: FloorColor })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)
  plane.receiveShadow = true //그림자를 받을 매체

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5) //해와 같은 빛
  directionalLight.position.set(-1.5, 1, -0.2) //위치를 조정할 수 있다.
  // const dlHelper = new THREE.DirectionalLightHelper(
  //   directionalLight,
  //   0.2,
  //   0x0000ff
  // )
  scene.add(directionalLight)
  // scene.add(dlHelper)
  directionalLight.castShadow = true
  directionalLight.shadow.radius = 4

  // directionalLight.shadow.mapSize.width = 1024
  // directionalLight.shadow.mapSize.height = 1024
  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.y += 0.01

    controls.update()

    renderer.render(scene, camera)
  }
  animate()

  //반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight //이게 없으면 캔버스는 줄어지지만 매체들은 줄어들지 않음 찌부됨
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('resize', onWindowResize)
} else {
  let warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
  console.log(warning)
}
