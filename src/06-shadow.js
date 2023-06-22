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
  camera.position.set(0, 2, 3)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true //그림자 추가를 위한 속성 true

  //다양한 그림자를 위해 도형추가
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
  cube.castShadow = true //그림자가 있어야 할 도형
  cube.receiveShadow = true
  cube2.castShadow = true //그림자가 있어야 할 도형

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1)
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.rotation.x = -0.5 * Math.PI
  plane.position.y = -0.5
  scene.add(plane)
  plane.receiveShadow = true //그림자를 받을 매체

  //빛에 따라 그림자 적용이 안되는 것도 있음
  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  // scene.add(ambientLight);
  // ambientLight.castShadow = true; //그림자 X

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5) //해와 같은 빛
  directionalLight.position.set(-1.5, 1, -0.2) //위치를 조정할 수 있다.
  const dlHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    0.2,
    0x0000ff
  ) //들어오는 방향을 알려주는 선
  scene.add(directionalLight)
  scene.add(dlHelper)
  directionalLight.castShadow = true //그림자 영향 O
  directionalLight.shadow.radius = 4 //그림자 블러 효과
  // 그림자의 속성을 높여주는 방법 :값이 높을 수록 렌더링에 들어가는 리소스를 많이 잡아 먹을 수 있음
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024

  // const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1);
  // scene.add(hemisphereLight);

  // const pointLight = new THREE.PointLight(0xffffff, 1); //전구같은 빛이라고 생각
  // pointLight.position.set(-0.5, 2, 0.5);
  // const plHelper = new THREE.PointLightHelper(pointLight, 0.5); //들어오는 방향을 알려주는 선
  // scene.add(plHelper);
  // scene.add(pointLight);
  // pointLight.castShadow = true; //그림자 O

  // const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1); //물체
  // scene.add(rectLight);
  // rectLight.position.set(0.5, 0.5, 1); //빛의 위치
  // rectLight.lookAt(0, 0, 0); //빛이 바라보는 위치
  // rectLight.castShadow = true; //그림자 X

  // const spotLight = new THREE.SpotLight(0xffffff, 0.5); //특정 피사체를 집중적으로 표현
  // scene.add(spotLight);
  // spotLight.castShadow = true; //그림자 O

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
