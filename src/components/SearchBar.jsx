import { useEffect, useRef, useState } from 'react';
import { Search } from 'react-feather';
import { styled } from 'styled-components';

import color from '../styles/color';
import fontSize from '../styles/fontSize';
import debounce from '../utils/debounce';
import fetchLocation from '../utils/fetchLocation';

const borderRadius = '2rem';

const Wrapper = styled.div`
  display: flex;
  min-width: 3rem;
  position: relative;
  border-radius: ${borderRadius};
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
  border-top-left-radius: ${borderRadius};
  border-bottom-left-radius: ${borderRadius};
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
  border-top-right-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
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

const Suggest = styled.div`
  position: absolute;
  width: 100%;
  border: solid red 3px;
  top: 100%;
  background-color: green;
  > div {
    /* background-color: blue; */
    text-align: left;
    padding-left: 1rem;
  }
`;

const debouncedFetchLocation = debounce(fetchLocation, 1000);

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [optList, setOptList] = useState([]);

  async function updateOptList(text) {
    const locationsFull = await fetchLocation(text);
    const locations = locationsFull.map((obj) => ({
      name: obj.name,
      id: obj.id,
    }));
    console.log(locations);
    setOptList(locations);
  }

  function handleChange(e) {
    const searchTextNew = e.target.value;
    console.log(searchTextNew);
    setSearchText(searchTextNew);
    if (searchTextNew.length == 0) setOptList([]);
    else if (searchTextNew.length > 2) updateOptList(searchTextNew);
  }

  const autoCompleteJSXArr = optList.map((loc) => (
    <div key={loc.id}>{loc.name}</div>
  ));

  return (
    <Wrapper>
      <Input
        placeholder="Search City..."
        value={searchText}
        onChange={handleChange}
      ></Input>
      <Button>
        <Search color={color.quaternary} />
      </Button>
      <Suggest>{autoCompleteJSXArr}</Suggest>
    </Wrapper>
  );
}
