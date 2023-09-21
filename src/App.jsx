import { useState } from 'react';
import { CornerDownLeft } from 'react-feather';
import { styled } from 'styled-components';

import AppTitle from './components/AppTitle';
import Dashboard from './components/Dashboard';
import FeelsLike from './components/FeelsLike';
import ForecastTable from './components/ForecastTable';
import Model from './components/Model';
import Navbar from './components/Navbar';
import color from './styles/color';

import './App.css';

const Wrapper = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 2rem;
  margin: 0 auto;
  padding: 1rem;
  padding-block: 0.75rem;
  box-shadow: -15px 10px 25px ${color.accent};
  background: rgb(190, 209, 221);
  background: linear-gradient(
    180deg,
    rgba(190, 209, 221, 1) 0%,
    rgba(54, 73, 112, 1) 100%
  );
  display: flex;
  flex-direction: column;
  position: relative;
  > * {
    padding: 0 1rem;
  }
  > *:not(#container3D) {
    z-index: 1;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7rem;
`;

const ToggleButton = styled.button`
  margin-top: auto;
  margin-left: auto;
  background-color: transparent;
  color: ${color.ternary};
  &:hover {
    color: ${color.highlight};
  }
  &:active {
    transform: scale(1.1);
  }
`;

const mockDataHourly = [
  ['1000', 23],
  ['1300', 25],
  ['1600', 26],
  ['1900', 23],
  ['2200', 22],
  ['0100', 21],
  ['0400', 19],
  ['0700', 20],
];

const mockDataDaily = [
  ['mon', 23],
  ['tue', 23],
  ['wed', 23],
  ['thu', 23],
  ['fri', 23],
  ['sat', 23],
  ['sun', 23],
];

function App() {
  const [isHourly, setIsHourly] = useState(true);

  function handleClickToggle() {
    setIsHourly(!isHourly);
  }

  return (
    <Wrapper>
      <Header>
        <Navbar
          location="Kuala Lumpur"
          dateStr="23 July 2023"
          timeStr="12:51 pm"
        />
        <AppTitle />
      </Header>
      <div>
        <Dashboard height={'5rem'} />
      </div>
      <FeelsLike text="Feels like: 85°F - It's warmer due to the humidity." />
      <ToggleButton type="button" onClick={handleClickToggle}>
        <CornerDownLeft />
      </ToggleButton>
      <ForecastTable timeTempData={isHourly ? mockDataHourly : mockDataDaily} />
      {/* <Model /> */}
    </Wrapper>
  );
}

export default App;
