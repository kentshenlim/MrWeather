import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  width: 60%;
  border-bottom: solid black 3px;
  border: solid green 3px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: solid red 3px;
  && > * {
    margin: 0;
    text-align: left;
  }
`;

export default function Navbar({ location, dateStr, timeStr }) {
  return (
    <Wrapper>
      <LeftWrapper>
        <h2>{location}</h2>
        <p>{dateStr}</p>
        <p>{timeStr}</p>
      </LeftWrapper>
    </Wrapper>
  );
}

Navbar.propTypes = {
  location: PropTypes.string.isRequired,
  dateStr: PropTypes.string.isRequired,
  timeStr: PropTypes.string.isRequired,
};
