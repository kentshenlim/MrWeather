import { styled } from 'styled-components';
import mrWeather from '../assets/img/mrWeather.png';
import fontSize from '../styles/fontSize';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  > img {
    width: 15%;
    min-width: 100px;
    animation-name: rotate;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  > div {
    font-size: ${fontSize.largest};
    > div {
      display: inline-block;
      > span {
        animation: enlarge 1.5s infinite;
        animation-fill-mode: forwards;
      }
      > span:nth-child(2) {
        animation-delay: 0.5s;
      }
      > span:nth-child(3) {
        animation-delay: 1s;
      }
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes enlarge {
    0%,
    100% {
      transform: scale(1);
      opacity: 0;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
  }
`;

export default function Loading({ text }) {
  return (
    <Wrapper>
      <img src={mrWeather} alt="Mr Weather icon" />
      <div>
        <span> {text} </span>
        <div>
          <span>•</span>
          <span>•</span>
          <span>•</span>
        </div>
      </div>
    </Wrapper>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
};

Loading.defaultProps = {
  text: 'Loading ',
};
