import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Cloud, Droplet, Thermometer, Wind } from 'react-feather';
import { styled } from 'styled-components';

import cloudAud from '../assets/audio/cloud.wav';
import waterAud1 from '../assets/audio/water1.wav';
import waterAud2 from '../assets/audio/water2.wav';
import color from '../styles/color';
import Plate from './Plate';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 50%;
  gap: 0.5rem;
  border-bottom: 3px solid;
  border-image: linear-gradient(
      to right,
      ${color.secondary} 50%,
      transparent 50%
    )
    100% 1;
  padding-bottom: 0.5rem;
  @media only screen and (max-width: 520px) {
    width: 70% !important;
  }
  @media only screen and (max-width: 400px) {
    width: 100% !important;
  }
`;

export default function Dashboard({ dataObj, isTempC, setIsTempC }) {
  const [isWindK, setIsWindK] = useState(true);
  const waterAudRef = useRef(null);
  const cloudAudRef = useRef(null);

  return (
    <Wrapper data-testid="dashboard-wrapper">
      <Plate
        param={'Temperature'}
        value={isTempC ? dataObj.tempC + '℃' : dataObj.tempF + 'F'}
        style={{
          border: `solid ${color.secondary} 3px`,
          backgroundColor: `${
            dataObj.tempC < 25
              ? `${color.weatherCold}`
              : dataObj.tempC < 37
              ? `${color.weatherHot}`
              : `${color.weatherDangerous}`
          }`,
        }}
        handleClick={() => setIsTempC(!isTempC)}
      >
        <Thermometer />
      </Plate>
      <Plate
        param={'Humidity'}
        value={dataObj.humidity + '%'}
        style={{
          border: `double ${color.secondary} 4px`,
          boxShadow: `0px 0px 6px ${color.ternary}`,
        }}
        handleClick={() => {
          waterAudRef.current.currentTime = 0;
          waterAudRef.current.play();
        }}
      >
        <Droplet />
        {
          <audio
            src={dataObj.humidity < 50 ? waterAud1 : waterAud2}
            ref={waterAudRef}
          ></audio>
        }
      </Plate>
      <Plate
        param={'Wind'}
        value={isWindK ? dataObj.windKPH + 'K/H' : dataObj.windMPH + 'M/H'}
        style={{
          backgroundColor: `${color.ternary}`,
          border: `solid black #83828a`,
          boxShadow: `-2px 2px 10px #83828a`,
        }}
        handleClick={() => setIsWindK(!isWindK)}
      >
        <Wind />
      </Plate>
      <Plate
        param={'Cloud'}
        value={dataObj.cloud + '%'}
        style={{
          backgroundColor: `rgba(231, 216, 217, ${
            1 - (0.5 / 100) * dataObj.cloud
          })`,
        }}
        handleClick={() => {
          cloudAudRef.current.currentTime = 0;
          cloudAudRef.current.play();
        }}
      >
        <Cloud />
        <audio src={cloudAud} ref={cloudAudRef}></audio>
      </Plate>
    </Wrapper>
  );
}

Dashboard.propTypes = {
  dataObj: PropTypes.exact({
    tempC: PropTypes.number,
    tempF: PropTypes.number,
    humidity: PropTypes.number,
    windKPH: PropTypes.number,
    windMPH: PropTypes.number,
    cloud: PropTypes.number,
  }).isRequired,
  isTempC: PropTypes.bool.isRequired,
  setIsTempC: PropTypes.func.isRequired,
};
