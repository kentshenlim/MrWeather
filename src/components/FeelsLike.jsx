import PropTypes from 'prop-types';
import { styled } from 'styled-components';

import color from '../styles/color';
import fontSize from '../styles/fontSize';

const Wrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1rem;
`;

const Title = styled.span`
  color: ${color.accent};
  text-align: left;
  font-weight: normal;
  font-size: ${fontSize.largest};
`;

const Img = styled.img`
  display: inline;
`;

export default function FeelsLike({ iconURL, text }) {
  return (
    <Wrapper>
      <Img src={iconURL} alt="Icon url for current weather" />
      <Title>{text}</Title>
    </Wrapper>
  );
}

FeelsLike.propTypes = {
  iconURL: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
