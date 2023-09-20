import { styled } from 'styled-components';
import Navbar from './components/Navbar';
import AppTitle from './components/AppTitle';
import Dashboard from './components/Dashboard';
import ForecastTable from './components/ForecastTable';
import color from './styles/color';
import fontSize from './styles/fontSize';
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
  > * {
    padding: 0 1rem;
  }
  > :last-child {
    margin-top: auto;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 7rem;
`;

const mockData = [
  ['1000', 23],
  ['1300', 25],
  ['1600', 26],
  ['1900', 23],
  ['2200', 22],
  ['0100', 21],
  ['0400', 19],
  ['0700', 20],
];

function App() {
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
      <ForecastTable timeTempData={mockData} />
    </Wrapper>
  );
}

export default App;
