import { styled } from 'styled-components';
import Clock from 'react-clock';
import PropTypes from 'prop-types';
import 'react-clock/dist/Clock.css';
import color from '../styles/color';

const Wrapper = styled.div`
  /* See https://github.com/wojtekmaj/react-clock/issues/22 for react-clock with dynamic size */
  width: max(10vw, 100px);
  height: max(10vw, 100px);
  position: absolute;
  top: 50%;
  right: 2%;
  transform: translateX(-50%) translateY(-50%);
  > .react-clock {
    width: inherit !important;
    height: inherit !important;
    padding-top: 100%;
    & .react-clock__face {
      border: solid ${color.highlight} 10px;
      box-shadow: 0px 0px 80px ${color.sunShadow};
      background-color: ${color.sunFace};
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
