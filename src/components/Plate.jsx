import { styled } from 'styled-components';
import PropTypes from 'prop-types';
import fontSize from '../styles/fontSize';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  padding: 0.25rem;
  cursor: pointer;
  &&:hover {
    background-color: green;
  }
  > * {
    margin: 0;
    padding: 0;
    font-size: ${fontSize.smallest};
  }
`;

export default function Plate({ param, value, style }) {
  return (
    <Wrapper style={style}>
      <h3>{param}</h3>
      <p>{value}</p>
    </Wrapper>
  );
}

Plate.propTypes = {
  param: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};
