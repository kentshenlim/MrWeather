import { styled } from 'styled-components';
import { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Allow interaction
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Load gltf file (3D model)
import model from '../assets/model/fireInTheSky/scene.gltf';

const Wrapper = styled.div`
  border: solid red 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 50%;
  height: 50%;
  opacity: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Model2() {
  useEffect(() => {
    // Init
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let object; // 3D object
    let controls; // OrbitControls
    const loader = new GLTFLoader(); // Loader for gltf

    // Load the file
    loader.load(
      model,
      function (gltf) {
        // If the file is loaded, add it to the scene
        object = gltf.scene;
        scene.add(object); // Add this loaded object into scene to be rendered later
      },
      function (xhr) {
        // While it is loading, log the progress
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      function (error) {
        // If there is an error, log it
        console.error(error);
      }
    );

    // Instantiate a new renderer and set its size
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for transparent background
    renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);

    // Add the renderer to the DOM

    // Camera and light
    camera.position.z = 1.5;
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
      renderer.render(scene, camera);
    }

    // Camera and window responsive
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
    });

    // Start the 3D rendering
    animate();
    document.getElementById('container3D').appendChild(renderer.domElement);
  }, []);

  return <Wrapper id="container3D"></Wrapper>;
}
