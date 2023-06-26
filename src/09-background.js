//https://opengameart.org/content/skiingpenguins-skybox-pack
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { WEBGL } from './webgl'

if (WEBGL.isWebGLAvailable()) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xeeeeee)
  const acesHelper = new THREE.AxesHelper(5)
  scene.add(acesHelper)
  //카메라 추가
  const fov = 50
  const aspect = window.innerWidth / window.innerHeight
  const near = 0.5
  const far = 2000
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 20, 100)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  //렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  // renderer.shadowMap.enabled = true

  //OrbitControls 추가 ( 카메라 세팅 이후에 코딩작성 필수!)
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 20
  controls.maxDistance = 350
  // controls.maxPolarAngle = Math.PI / 2
  controls.update()

  //texture(background)
  const skyMaterialArray = []
  const texture_ft = new THREE.TextureLoader().load(
    '../static/background/arid_ft.jpg'
  )
  const texture_bk = new THREE.TextureLoader().load(
    '../static/background/arid_bk.jpg'
  )
  const texture_dn = new THREE.TextureLoader().load(
    '../static/background/arid_dn.jpg'
  )
  const texture_up = new THREE.TextureLoader().load(
    '../static/background/arid_up.jpg'
  )
  const texture_rt = new THREE.TextureLoader().load(
    '../static/background/arid_rt.jpg'
  )
  const texture_lf = new THREE.TextureLoader().load(
    '../static/background/arid_lf.jpg'
  )
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_bk,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_up,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_dn,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_rt,
    }),
    new THREE.MeshStandardMaterial({
      map: texture_lf,
    })
  )

  //material반복문
  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide
  }

  // 메쉬 추가
  const skyGeometry = new THREE.BoxGeometry(600, 600, 600)
  // const skyMaterial = new THREE.MeshStandardMaterial({
  //   color: 0x333333,
  // })
  // skyMaterial.side = THREE.BackSide //default :바깥에만 적용, back:안에다가 적용
  const sky = new THREE.Mesh(skyGeometry, skyMaterialArray)
  scene.add(sky)

  const ambientLight = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambientLight)

  function animate() {
    requestAnimationFrame(animate)
    // controls.update()
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
