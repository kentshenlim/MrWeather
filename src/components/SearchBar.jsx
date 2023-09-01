import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  min-width: 0;
`;

const Input = styled.input`
  flex: 1 1 0;
  min-width: 0;
`;

const Button = styled.button``;

export default function SearchBar() {
  return (
    <Wrapper>
      <Input placeholder="Search.."></Input>
      <Button>Submit</Button>
    </Wrapper>
  );
}
