import { useEffect, useState } from 'react';
import { CornerDownLeft } from 'react-feather';
import { styled } from 'styled-components';

import AppTitle from './components/AppTitle';
import Dashboard from './components/Dashboard';
import FeelsLike from './components/FeelsLike';
import ForecastTable from './components/ForecastTable';
import Loading from './components/Loading';
import Model from './components/Model';
import Navbar from './components/Navbar';
import color from './styles/color';
import fetchDataWeather, { processData } from './utils/fetchDataWeather';

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

function App() {
  const [location, setLocation] = useState('dubai');
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [data, setData] = useState(null);
  const [isTempC, setIsTempC] = useState(true);
  const [isHourly, setIsHourly] = useState(true);

  useEffect(() => {
    async function fetchAndProcess() {
      const res = await fetchDataWeather(location);
      setData(processData(res, { hourGap: 1 }));
    }
    fetchAndProcess();
  }, [location]);

  function handleClickToggle() {
    setIsHourly(!isHourly);
  }

  if (!data || isLoadingModel)
    return (
      <Wrapper>
        <Model setIsLoadingModel={setIsLoadingModel} />
        <Loading
          text={!data ? 'Fetching weather data ' : 'Loading 3D model '}
        />
      </Wrapper>
    );

  return (
    <Wrapper>
      <Model setIsLoadingModel={setIsLoadingModel} dateObj={data.dateObj} />
      {/* Must come first to prevent rerender, must render while loading */}
      <Header>
        <Navbar
          location={data.location}
          dateStr={data.date}
          timeStr={data.time}
        />
        <AppTitle />
      </Header>
      <div>
        <Dashboard
          height={'5rem'}
          dataObj={data.dashboardObj}
          isTempC={isTempC}
          setIsTempC={setIsTempC}
        />
      </div>
      <FeelsLike
        iconURL={data.feelsLikeObj.iconURL}
        text={`Feels like: ${
          isTempC
            ? data.feelsLikeObj.tempC + ' ℃'
            : data.feelsLikeObj.tempF + ' F'
        } - ${data.feelsLikeObj.text}`}
      />
      <ToggleButton type="button" onClick={handleClickToggle}>
        <CornerDownLeft />
      </ToggleButton>
      <ForecastTable
        timeTempData={isHourly ? data.hourlyForecastArr : data.dailyForecastArr}
      />
    </Wrapper>
  );
}

export default App;
