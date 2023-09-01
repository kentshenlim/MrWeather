import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import fontSize from '../styles/fontSize';
import color from '../styles/color';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  padding: 0.25rem;
  gap: 0.125rem;
  cursor: pointer;
  &&:hover {
    background-color: ${color.highlight} !important;
    opacity: 1 !important;
  }
  > * {
    margin: 0;
    padding: 0;
    font-size: ${fontSize.smallest};
  }
`;

export default function Plate({ value, style, children }) {
  return (
    <Wrapper style={style}>
      {children}
      <p>{value}</p>
    </Wrapper>
  );
}

Plate.propTypes = {
  value: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
