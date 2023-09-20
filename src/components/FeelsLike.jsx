import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import color from '../styles/color';

const Title = styled.h2`
  color: ${color.quaternary};
  text-align: left;
  width: 70%;
`;

export default function FeelsLike({ text }) {
  return <Title>{text}</Title>;
}

FeelsLike.propTypes = {
  text: PropTypes.string.isRequired,
};
