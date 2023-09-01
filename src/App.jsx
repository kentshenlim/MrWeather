import { styled } from 'styled-components';
import './App.css';

const Wrapper = styled.div`
  border: solid red 3px;
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Wrapper>
      <h1>Hello MrWeather</h1>
    </Wrapper>
  );
}

export default App;
