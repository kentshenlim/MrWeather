import PropTypes from 'prop-types';
import { styled } from 'styled-components';

import color from '../styles/color';
import fontSize from '../styles/fontSize';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  padding: 0.25rem;
  gap: 0.125rem;
  cursor: pointer;
  &&:hover {
    background-color: ${color.highlight} !important;
    opacity: 1 !important;
    box-shadow: 0px 0px 10px ${color.highlightDim} !important;
  }
  > * {
    margin: 0;
    padding: 0;
    font-size: ${fontSize.smallest};
  }
  @media only screen and (max-width: 450px) {
    height: 4rem;
    > * {
      font-size: ${fontSize.xSmallest};
    }
  }
`;

export default function Plate({ value, style, children, handleClick }) {
  return (
    <Wrapper style={style} onClick={handleClick}>
      {children}
      <p>{value}</p>
    </Wrapper>
  );
}

Plate.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func,
};
