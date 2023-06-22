import * as THREE from 'three'
import { WEBGL } from './webgl'
//참고 사이트 :   https://3dtextures.me/

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
  pointLight.position.set(50, 50, 50)
  scene.add(pointLight)

  //공통 부분
  const geometry = new THREE.SphereGeometry(15, 32, 16)

  //texture
  const texture = new THREE.TextureLoader()
  const textureBaseColor = texture.load('../static/basecolor.jpg')
  const textureheightColor = texture.load('../static/height.png')
  const texturenormalColor = texture.load('../static/normal.jpg')
  const textureroughnessColor = texture.load('../static/roughness.jpg')

  //01
  const material01 = new THREE.MeshBasicMaterial({ map: textureBaseColor })
  const obj01 = new THREE.Mesh(geometry, material01)
  obj01.position.x = -70

  //02
  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: texturenormalColor,
  })
  const obj02 = new THREE.Mesh(geometry, material02)
  obj02.position.x = -35

  //03
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: texturenormalColor,
    displcementMap: textureheightColor,
    displcementScale: 1, //높낮이에 대한 scale
  })
  const obj03 = new THREE.Mesh(geometry, material03)

  //04
  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: texturenormalColor,
    displcementMap: textureheightColor,
    displcementScale: 1,
    roughnessMap: textureroughnessColor,
    roughness: 0.5,
  })
  const obj04 = new THREE.Mesh(geometry, material04)
  obj04.position.x = 35

  scene.add(obj01, obj02, obj03, obj04)

  function animate() {
    requestAnimationFrame(animate)
    obj01.rotation.y += 0.01
    obj02.rotation.y += 0.01
    obj03.rotation.y += 0.01
    obj04.rotation.y += 0.01
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
