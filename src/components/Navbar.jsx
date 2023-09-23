import PropTypes from 'prop-types';
import { styled } from 'styled-components';

import color from '../styles/color';
import fontSize from '../styles/fontSize';
import SearchBar from './SearchBar';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
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
  width: 40%;
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

export default function Navbar({
  location,
  setLocation,
  dateStr,
  timeStr,
  locationStatus,
  setLocationStatus,
}) {
  return (
    <Wrapper>
      <LeftWrapper>
        <h2>{location}</h2>
        <p>{dateStr}</p>
        <p>{timeStr}</p>
      </LeftWrapper>
      <SearchBar
        setLocation={setLocation}
        locationStatus={locationStatus}
        setLocationStatus={setLocationStatus}
      />
    </Wrapper>
  );
}

Navbar.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  dateStr: PropTypes.string.isRequired,
  timeStr: PropTypes.string.isRequired,
  locationStatus: PropTypes.string.isRequired,
  setLocationStatus: PropTypes.func.isRequired,
};
