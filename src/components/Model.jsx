import { styled } from 'styled-components';
import { useEffect, useRef } from 'react';
import loadModel from '../utils/loadModel';
import model from '../assets/models/fireInTheSky/scene.gltf';
import MoonClock from './MoonClock';

const Wrapper = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80%;
  height: 80%;
  opacity: 0.6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Model() {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const container = wrapperRef.current;
    const model3D = loadModel({
      model: model,
      rendererWidth: window.innerWidth * 0.8,
      rendererHeight: window.innerHeight * 0.8,
      cameraPositionZ: 0,
    });
    console.log(wrapperRef.current.offsetWidth);
    container.appendChild(model3D.domElement);
    return () => {
      container.removeChild(model3D.domElement);
      model3D.cleanUp();
    };
  }, []);

  return (
    <Wrapper id="container3D" ref={wrapperRef}>
      <MoonClock time={new Date()} />
    </Wrapper>
  );
}
