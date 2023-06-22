import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  //카메라 추가
  const fov = 80
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.5
  const far = 2000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 1, 10)
  camera.lookAt(new THREE.Vector3(2, 0, 0))

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true, //자글자글한 선 없애기
    alpha: true, //배경을 하얗게
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //도형추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
  })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  scene.add(cube)
  //바닥 추가

  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  //빛
  const pointLight = new THREE.PointLight(0xffffbb, 1)
  pointLight.position.set(0, 2, 12)
  scene.add(pointLight)

  function render(time) {
    renderer.render(scene, camera)
  }
  requestAnimationFrame(render)

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
