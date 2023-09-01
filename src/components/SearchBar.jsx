import { styled } from 'styled-components';
import color from '../styles/color';
import fontSize from '../styles/fontSize';

const Wrapper = styled.div`
  display: flex;
  min-width: 0;
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
  &:focus {
    outline: none;
  }
`;

const Button = styled.button``;

export default function SearchBar() {
  return (
    <Wrapper>
      <Input placeholder="Search City..."></Input>
      <Button>
        <ion-icon name="search-outline"></ion-icon>
      </Button>
    </Wrapper>
  );
}
