import { useCallback, useState } from 'react';
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
  top: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  > div {
    padding: 0.5rem;
    padding-left: 1rem;
    text-align: left;
    background-color: ${color.quaternary};
    color: ${color.secondary};
    cursor: pointer;
  }
  > div:not(:last-child) {
    border-bottom: dashed ${color.secondary} 2px;
  }
  > div:hover {
    background-color: ${color.highlight};
  }
`;

export default function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const [optList, setOptList] = useState([]);

  const debouncedUpdateOptList = useCallback(
    debounce((searchTextNew) => {
      async function updateOptList(text) {
        const locationsFull = await fetchLocation(text);
        const set = new Set(); // Of name, to remove duplicate
        const locations = []; // {name, id}
        for (const { name, id } of locationsFull) {
          if (set.has(name)) continue;
          set.add(name);
          locations.push({ name, id });
          if (locations.length == 6) break; // Shows only 6
        }
        console.log(locations);
        setOptList(locations);
      }

      if (searchTextNew.length <= 2) setOptList([]);
      else updateOptList(searchTextNew);
    }, 500),
    []
  );

  function handleChange(e) {
    const searchTextNew = e.target.value;
    setSearchText(searchTextNew);
    debouncedUpdateOptList(searchTextNew);
  }

  function handleClickSuggestion(e) {
    setSearchText(e.target.textContent);
  }

  function handleBlur() {
    // Click other region = clear suggestion
    setTimeout(() => {
      setOptList([]);
    }, 100);
    // Time out to allow selecting auto fill before clearing
  }

  const autoCompleteJSXArr = optList.map((loc) => (
    <div key={loc.id} onClick={handleClickSuggestion}>
      {loc.name}
    </div>
  ));

  return (
    <Wrapper>
      <Input
        placeholder="Search City..."
        value={searchText}
        onChange={handleChange}
        onBlur={handleBlur}
      ></Input>
      <Button>
        <Search color={color.quaternary} />
      </Button>
      <Suggest>{autoCompleteJSXArr}</Suggest>
    </Wrapper>
  );
}
