import './style.css'
import * as THREE from 'three';
import { OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
const space = new THREE.TextureLoader().load('space.jpg');
scene.background = space;
const gridhelper = new THREE.GridHelper(200, 50)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})



renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

const orbit = new OrbitControls(camera, renderer.domElement)

// Stars
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material)
  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}
Array(200).fill().forEach(addStar)

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xff33339});
const torus = new THREE.Mesh(geometry, material);

//Lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,5,5)
const light = new THREE.AmbientLight(0xffffff)

// Add to Scene
scene.add(torus, pointLight, gridhelper, light);

// Loop for animation and re-render
function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.05;
  torus.rotation.z += 0.01;
  orbit.update()
  renderer.render(scene, camera)
}
animate();