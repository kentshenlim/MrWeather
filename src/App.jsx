import { styled } from 'styled-components';
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
  box-shadow: -10px 10px 20px ${color.accent};
  background: rgb(190, 209, 221);
  background: linear-gradient(
    180deg,
    rgba(190, 209, 221, 1) 0%,
    rgba(54, 73, 112, 1) 100%
  );
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
