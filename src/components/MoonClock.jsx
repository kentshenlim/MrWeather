import PropTypes from 'prop-types';
import Clock from 'react-clock';
import { styled } from 'styled-components';

import color from '../styles/color';

import 'react-clock/dist/Clock.css';

const Wrapper = styled.div`
  /* See https://github.com/wojtekmaj/react-clock/issues/22 for react-clock with dynamic size */
  width: max(10vw, 60px);
  height: max(10vw, 60px);
  position: absolute;
  top: 0%;
  right: 2%;
  transform: translateX(-50%);
  > .react-clock {
    width: inherit !important;
    height: inherit !important;
    padding-top: 100%;
    & .react-clock__face {
      border: solid ${color.highlight} 10px;
      box-shadow: 0px 0px 80px ${color.moonShadow};
      background-color: ${color.moonFace};
    }
    & .react-clock__hand__body {
      background-color: ${color.highlightDim};
    }
    & .react-clock__mark__body {
      background-color: ${color.highlightDim};
    }
  }
`;

export default function MoonClock({ time }) {
  return (
    <Wrapper>
      <Clock value={time} renderSecondHand={false} renderMinuteMarks={false} />
    </Wrapper>
  );
}

MoonClock.propTypes = {
  time: PropTypes.instanceOf(Date),
};
