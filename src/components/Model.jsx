import { styled } from 'styled-components';
import { useEffect, useRef } from 'react';
import loadModel from '../utils/loadModel';
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

export default function Model() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const container = wrapperRef.current;
    const model3D = loadModel({
      model: model,
      rendererWidth: window.innerWidth / 3,
      rendererHeight: window.innerHeight / 3,
      cameraPositionZ: 1.5,
    });
    container.appendChild(model3D.domElement);
    return () => {
      container.removeChild(model3D.domElement);
      model3D.cleanUp();
    };
  }, []);

  return <Wrapper id="container3D" ref={wrapperRef}></Wrapper>;
}
