import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import { Thermometer, Droplet, Wind, Cloud } from 'react-feather';
import Plate from './Plate';
import color from '../styles/color';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  flex-wrap: wrap;
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

export default function Dashboard({ height }) {
  return (
    <Wrapper>
      <Plate
        param={'Temperature'}
        value={'12%'}
        style={{ height: height, border: `solid ${color.secondary} 3px` }}
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
};
