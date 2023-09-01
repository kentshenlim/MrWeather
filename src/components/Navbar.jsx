import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import color from '../styles/color';
import fontSize from '../styles/fontSize';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 50%;
  height: 6rem;
  > :last-child {
    flex: 1 1 0;
  }
  border-bottom: solid ${color.secondary} 3px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  min-width: 180px;
  flex-shrink: 0;
  > * {
    margin: 0;
    text-align: left;
    font-size: ${fontSize.smallest};
  }
  > h2 {
    font-size: ${fontSize.normal};
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
