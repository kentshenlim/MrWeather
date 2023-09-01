import { styled } from 'styled-components';
import mrWeather from '../assets/img/mrWeather.png';
import fontSize from '../styles/fontSize';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 12rem;
`;

const TitleText = styled.h1`
  margin: 0;
  font-size: ${fontSize.largest};
`;

const TitleAnchor = styled.a``;

const TitleImg = styled.img`
  width: 80%;
  margin-top: -0.5rem;
`;

export default function AppTitle() {
  return (
    <Wrapper>
      <TitleText>MrWeather</TitleText>
      <TitleAnchor
        href="https://github.com/kentshenlim/MrWeather"
        target="_blank"
      >
        <TitleImg src={mrWeather} alt="MrWeather Icon" />
      </TitleAnchor>
    </Wrapper>
  );
}
