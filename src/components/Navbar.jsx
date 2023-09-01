import { styled } from 'styled-components';
import SearchBar from './SearchBar';
import PropTypes from 'prop-types';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 50%;
  height: 6rem;
  & > :last-child {
    flex: 1 1 0;
  }
  border-bottom: solid black 3px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 180px;
  flex-shrink: 0;
  & > * {
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
      <SearchBar />
    </Wrapper>
  );
}

Navbar.propTypes = {
  location: PropTypes.string.isRequired,
  dateStr: PropTypes.string.isRequired,
  timeStr: PropTypes.string.isRequired,
};
