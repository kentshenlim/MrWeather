import { styled } from 'styled-components';
import Navbar from './components/Navbar';
import './App.css';

const Wrapper = styled.div`
  border: solid red 3px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 1rem;
  padding-block: 0.75rem;
`;

function App() {
  return (
    <Wrapper>
      <Navbar
        location="Kuala Lumpur"
        dateStr="23 July 2023"
        timeStr="12:51 pm"
      />
    </Wrapper>
  );
}

export default App;
