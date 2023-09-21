import { Search } from 'react-feather';
import { styled } from 'styled-components';

import color from '../styles/color';
import fontSize from '../styles/fontSize';

const Wrapper = styled.div`
  display: flex;
  min-width: 3rem;
  overflow: hidden;
  border-radius: 2rem;
  &:has(> input:focus) {
    border: solid ${color.accent} 2px;
  }
`;

const Input = styled.input`
  flex: 1 1 0;
  min-width: 0;
  padding-left: 1rem;
  font-size: ${fontSize.small};
  border: transparent;
  background-color: ${color.ternary};
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 850px) {
    display: none;
  }
`;

const Button = styled.button`
  background-color: ${color.secondary};
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1100px) {
    padding: 0.6rem;
  }
  @media only screen and (max-width: 850px) {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    margin-left: auto;
  }
`;

export default function SearchBar() {
  return (
    <Wrapper>
      <Input placeholder="Search City..."></Input>
      <Button>
        <Search color={color.quaternary} />
      </Button>
    </Wrapper>
  );
}
