import PropTypes from 'prop-types';
import { Cloud, Droplet, Thermometer, Wind } from 'react-feather';
import { styled } from 'styled-components';
import { useState } from 'react';

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
`;

export default function Dashboard({ height, dataObj, isTempC, setIsTempC }) {
  return (
    <Wrapper data-testid="dashboard-wrapper">
      <Plate
        param={'Temperature'}
        value={isTempC ? dataObj.tempC + '℃' : dataObj.tempF + 'F'}
        style={{ height: height, border: `solid ${color.secondary} 3px` }}
        handleClick={() => setIsTempC(!isTempC)}
      >
        <Thermometer />
      </Plate>
      <Plate
        param={'Humidity'}
        value={'12%'}
        style={{
          height: height,
          border: `double ${color.secondary} 4px`,
          boxShadow: `0px 0px 6px ${color.ternary}`,
        }}
      >
        <Droplet />
      </Plate>
      <Plate
        param={'Humidity'}
        value={'12%'}
        style={{
          height: height,
          backgroundColor: `${color.ternary}`,
          border: `solid black #83828a`,
          boxShadow: `-2px 2px 10px #83828a`,
        }}
      >
        <Wind />
      </Plate>
      <Plate
        param={'Humidity'}
        value={'12%'}
        style={{
          height: height,
          backgroundColor: `${color.quaternary}`,
          opacity: '0.5',
        }}
      >
        <Cloud />
      </Plate>
    </Wrapper>
  );
}

Dashboard.propTypes = {
  height: PropTypes.string.isRequired,
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
