// Modified based on https://github.com/gjmolter/web-3dmodel-threejs
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Load gltf file (3D model)

export default function loadModel({
  model,
  rendererWidth,
  rendererHeight,
  cameraPositionZ,
  callbackWhenDoneLoading
}) { // Init
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let object; // 3D object
    let controls; // OrbitControls
    const manager = new THREE.LoadingManager(() => { callbackWhenDoneLoading() });
    const loader = new GLTFLoader(manager); // Loader for gltf

    const dLoader = new DRACOLoader();
    dLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
    );
    loader.setDRACOLoader(dLoader);


    // Load the file
    loader.load(
      model,
      function (gltf) {
        // If the file is loaded, add it to the scene
        object = gltf.scene;
        scene.add(object); // Add this loaded object into scene to be rendered later
      },
      function () {
        // While it is loading, log the progress
        // console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      function (error) {
        // If there is an error, log it
        console.error(error);
      }
    );

    // Instantiate a new renderer and set its size
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for transparent background
    renderer.setSize(rendererWidth, rendererHeight);

    // Camera and light
    camera.position.z = cameraPositionZ;
    camera.position.y += 1;
    camera.position.x += 3;
    camera.fov = 55; // Zoom in
    const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
    topLight.position.set(500, 500, 500); // top-left-ish
    topLight.castShadow = true;
    scene.add(topLight);
    const ambientLight = new THREE.AmbientLight(0x333333, 1);
    scene.add(ambientLight);

    // Allows orbit controls
    controls = new OrbitControls(camera, renderer.domElement);

    // Render the scene
    function animate() {
      requestAnimationFrame(animate);
      if (object) object.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    // Camera and window responsive
    function handleResize() {
        const container = document.getElementById('container3D');
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.fov = width > 650 ? 55 : width > 520 ? 65 : width > 475 ? 75 : width > 375 ? 85 : 95;
        camera.updateProjectionMatrix();
        }
    window.addEventListener('resize', handleResize);
    handleResize(); // First run

    // Cleanup function for React effect
    function cleanUp() {
        renderer.dispose();
        window.removeEventListener('resize', handleResize);
    }

    // Start the 3D rendering
    animate();

    return { domElement: renderer.domElement, cleanUp: cleanUp };
}
