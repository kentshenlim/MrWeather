import { styled } from 'styled-components';
import mrWeather from '../assets/img/mrWeather.png';
import fontSize from '../styles/fontSize';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12rem;
  > h1 {
    margin: 0;
    font-size: ${fontSize.largest};
  }
  > a > img {
    width: 80%;
  }
`;

export default function AppTitle() {
  return (
    <Wrapper>
      <h1>MrWeather</h1>
      <a href="https://github.com/kentshenlim/MrWeather" target="_blank">
        <img src={mrWeather} alt="MrWeather Icon" />
      </a>
    </Wrapper>
  );
}
