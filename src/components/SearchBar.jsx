import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    /* display: none; */
  }
`;

const Button = styled.button`
  background-color: ${color.secondary};
  display: flex;
  align-items: center;
  border-top-right-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
  > * {
    color: ${color.quaternary};
  }
  &:hover > * {
    color: ${color.highlight};
  }
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

export default function SearchBar({
  setLocation,
  locationStatus,
  setLocationStatus,
}) {
  const [searchText, setSearchText] = useState('');
  const [optList, setOptList] = useState([]);
  const [searchBarStatus, setSearchBarStatus] = useState('normal'); // Normal, hidden, extended
  const inputRef = useRef(null);
  const lastSearchRef = useRef('london');
  const blockOptUpdate = useRef(false); // Block opt from being updated even after submission due to race condition

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 850) setSearchBarStatus('hidden');
      else if (window.innerWidth >= 850) setSearchBarStatus('normal');
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (searchBarStatus == 'extended') inputRef.current.focus();
  }, [searchBarStatus]);

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
        if (!blockOptUpdate.current) setOptList(locations);
        else blockOptUpdate.current = false;
      }

      if (searchTextNew.length <= 1) setOptList([]);
      else updateOptList(searchTextNew);
    }, 500),
    []
  );

  function handleChange(e) {
    const searchTextNew = e.target.value;
    setSearchText(searchTextNew);
    debouncedUpdateOptList(searchTextNew);
    setLocationStatus('idle');
  }

  function handleClickSuggestion(e) {
    setSearchText(e.target.textContent);
    inputRef.current.focus();
  }

  function handleBlur() {
    // Click other region = clear suggestion
    setTimeout(() => {
      setOptList([]);
    }, 200);
    // Time out to allow selecting auto fill before clearing
  }

  function submit() {
    lastSearchRef.current = searchText;
    setLocation(searchText);
    setOptList([]);
    setLocationStatus('loading');
    blockOptUpdate.current = true;
  }

  async function handleClickSearch() {
    if (searchBarStatus == 'hidden') {
      setSearchBarStatus('extended');
      return;
    }
    if (searchBarStatus == 'extended') setSearchBarStatus('hidden');
    if (!searchText.length) return;
    if (searchText == lastSearchRef.current) return; // Same text no need search
    const res = await fetchLocation(searchText);
    if (res.length === 0) {
      // No such place
      inputRef.current.focus();
      setLocationStatus('error');
      return;
    }
    submit();
  }

  function handleKeyDown(e) {
    if (locationStatus == 'loading') return;
    if (e.key == 'Enter') handleClickSearch();
  }

  const autoCompleteJSXArr = optList.map((loc) => (
    <div key={loc.id} onClick={handleClickSuggestion}>
      {loc.name}
    </div>
  ));

  const wrapperBorderColor = locationStatus == 'error' ? 'red' : color.accent;
  let inputStyle = {};
  let wrapperStyle = { borderColor: wrapperBorderColor };
  if (searchBarStatus == 'hidden' || searchBarStatus == 'extended') {
    wrapperStyle = {
      borderColor: wrapperBorderColor,
      position: 'absolute',
      top: '50%',
      right: '5%',
    };
  }
  if (searchBarStatus == 'hidden') inputStyle.display = 'none';

  return (
    <Wrapper style={wrapperStyle}>
      <Input
        placeholder="Search City..."
        value={searchText}
        ref={inputRef}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        style={inputStyle}
      ></Input>
      <Button
        onClick={handleClickSearch}
        disabled={locationStatus == 'loading'}
      >
        <Search />
      </Button>
      <Suggest>{autoCompleteJSXArr}</Suggest>
    </Wrapper>
  );
}

SearchBar.propTypes = {
  setLocation: PropTypes.func.isRequired,
  locationStatus: PropTypes.string.isRequired,
  setLocationStatus: PropTypes.func.isRequired,
};
