import PropTypes from 'prop-types';
import { GitHub } from 'react-feather';
import { styled } from 'styled-components';

import mrWeather from '../assets/img/mrWeather.png';
import color from '../styles/color';
import fontSize from '../styles/fontSize';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12rem;
  > h1 {
    margin: 0;
    font-size: ${fontSize.normal};
  }
  & a {
    color: ${color.accent};
  }
  & img {
    width: 80%;
    transition: all 1s ease-in-out;
  }
  & .rotate {
    animation-name: rotate;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  & .inverted {
    transform: rotate(180deg);
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 520px) {
    width: 7rem;
    > h1 {
      font-size: ${fontSize.small};
    }
    > h1 > :first-child {
      display: none;
    }
  }
`;

export default function AppTitle({ locationStatus }) {
  return (
    <Wrapper>
      <h1>
        <GitHub />
        <a
          href="https://github.com/kentshenlim/MrWeather"
          target="_blank"
          rel="noreferrer"
        >
          &nbsp;MrWeather
        </a>
      </h1>
      <img
        src={mrWeather}
        alt="MrWeather Icon"
        draggable={false}
        className={
          locationStatus == 'loading'
            ? 'rotate'
            : locationStatus == 'error'
            ? 'inverted'
            : ''
        }
      />
    </Wrapper>
  );
}

AppTitle.propTypes = {
  locationStatus: PropTypes.string.isRequired,
};
