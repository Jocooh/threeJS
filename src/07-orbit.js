import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  console.log(OrbitControls)
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  //카메라 추가
  const fov = 100
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.5
  const far = 2000

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

  //OrbitControls 추가 ( 카메라 세팅 이후에 코딩작성 필수!)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.minDistance = 2 //default = 0 (최소 줌 값)
  controls.maxDistance = 6
  // controls.maxPolarAngle = 2 //아래 각도 즉, 바닥부터 밑으로의 각도정도
  //만약 딱 바닥까지만 보여주고 싶다. 정확히 반으로 하고 싶다면 아래와 같이 사용
  // controls.maxPolarAngle = Math.PI / 2
  controls.minPolarAngle = 1 //바닥 위로의 각도
  controls.update()

  // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); //사각형
  const geometry = new THREE.IcosahedronGeometry(0.5, 0) //오각형
  const geometry2 = new THREE.IcosahedronGeometry(0.5, 0)
  const material = new THREE.MeshStandardMaterial({
    color: 0x004fff,
  })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  cube.position.y = 0.5
  const cube2 = new THREE.Mesh(geometry2, material)
  cube2.position.set(-1, 1.2, 0.2)

  scene.add(cube, cube2)
  cube.castShadow = true
  cube.receiveShadow = true
  cube2.castShadow = true

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)
  plane.receiveShadow = true //그림자를 받을 매체

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5) //해와 같은 빛
  directionalLight.position.set(-1.5, 1, -0.2) //위치를 조정할 수 있다.
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  )
  scene.add(directionalLight)
  scene.add(dlHelper)
  directionalLight.castShadow = true
  directionalLight.shadow.radius = 4

  // directionalLight.shadow.mapSize.width = 1024
  // directionalLight.shadow.mapSize.height = 1024
  function animate() {
    requestAnimationFrame(animate)
    cube.rotation.y += 0.01
    cube2.rotation.y += 0.01

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
