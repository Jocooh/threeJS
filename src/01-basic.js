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
  camera.position.z = 50
  //렌더러
  const renderer = new THREE.WebGLRenderer({
    antialias: true, //자글자글한 선 없애기
    alpha: true, //배경을 하얗게
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  //메쉬 01
  const geometry01 = new THREE.TorusGeometry(10, 3, 16, 100)
  const material01 = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  })
  const obj01 = new THREE.Mesh(geometry01, material01)
  scene.add(obj01)

  //메쉬 02
  const geometry02 = new THREE.SphereGeometry(11, 32, 16)
  const material02 = new THREE.MeshBasicMaterial({
    color: 0xc8fe2e,
  })
  const obj02 = new THREE.Mesh(geometry02, material02)
  obj02.position.x = -25
  scene.add(obj02)

  //메쉬 03
  const geometry03 = new THREE.CapsuleGeometry(1, 1, 4, 8)
  const material03 = new THREE.MeshBasicMaterial({
    color: 0xe2a9f3,
  })
  const obj03 = new THREE.Mesh(geometry03, material03)
  obj03.position.x = 25
  scene.add(obj03)

  function animate() {
    requestAnimationFrame(animate)
    obj01.rotation.x += 0.01
    obj01.rotation.y += 0.01
    obj02.rotation.x += 0.01
    obj02.rotation.y += 0.01
    obj03.rotation.x += 0.01
    obj03.rotation.y += 0.01
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
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
