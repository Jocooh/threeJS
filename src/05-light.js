import * as THREE from 'three'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  //카메라 추가
  const fov = 100
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.5
  const far = 2000

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 1, 1.8)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //도형추가
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  const cube = new THREE.Mesh(geometry, material)
  cube.rotation.y = 0.5
  scene.add(cube)

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)

  //빛
  // const ambientLight = new THREE.AmbientLight(0x404040, 0.2); //전체적인 빛
  // scene.add(ambientLight);

  // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); //해와 같은 빛
  // directionalLight.position.set(1, 2, 1); //위치를 조정할 수 있다.
  // const dlHelper = new THREE.DirectionalLightHelper(
  // 	directionalLight,
  // 	0.2,
  // 	0x0000ff
  // ); //들어오는 방향을 알려주는 선
  // scene.add(directionalLight);
  // scene.add(dlHelper);

  // const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1);
  // scene.add(hemisphereLight);

  const pointLight = new THREE.PointLight(0xffffff, 1) //전구같은 빛이라고 생각
  pointLight.position.set(0.5, 0.5, 0.5)
  const plHelper = new THREE.PointLightHelper(pointLight, 0.5) //들어오는 방향을 알려주는 선
  scene.add(plHelper)
  scene.add(pointLight)

  // const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1); //물체
  // scene.add(rectLight);
  // rectLight.position.set(0.5, 0.5, 1); //빛의 위치
  // rectLight.lookAt(0, 0, 0); //빛이 바라보는 위치

  // const spotLight = new THREE.SpotLight(0xffffff, 0.5); //특정 피사체를 집중적으로 표현
  // scene.add(spotLight);

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
