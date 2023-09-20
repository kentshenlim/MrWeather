import { styled } from 'styled-components';
import { useState } from 'react';
import color from '../styles/color';
import fontSize from '../styles/fontSize';

const boxRadius = '6px';

const Table = styled.table`
  width: 100%;
  color: ${color.ternary};
  border-collapse: collapse;
  & tr:first-child {
    border-bottom: solid ${color.secondary} 2px;
    height: 4rem;
    font-family: 'orbitron';
  }
  & th,
  & td {
    padding: 0.5rem;
    cursor: pointer;
  }
  & th:not(:first-child),
  & td:not(:first-child) {
    border-left: solid ${color.secondary} 2px;
  }
  & th {
    font-size: ${fontSize.small};
    border-top-left-radius: ${boxRadius};
    border-top-right-radius: ${boxRadius};
  }
  & td {
    font-size: ${fontSize.smallest};
    border-bottom-left-radius: ${boxRadius};
    border-bottom-right-radius: ${boxRadius};
  }
  @media only screen and (max-width: 800px) {
    & th {
      font-size: ${fontSize.smallest};
    }
  }
`;

export default function ForecastTable({ timeTempData }) {
  const [activeIdx, setActiveIdx] = useState(-1);

  function handleMouseOver(idx) {
    setActiveIdx(idx);
  }

  function handleMouseOut(idx) {
    setActiveIdx(-1);
  }

  function getDynamicStyle(idx) {
    return {
      backgroundColor: activeIdx == idx ? color.highlightDim : 'transparent',
      color: activeIdx == idx ? color.accent : 'inherit',
    };
  }

  const timeArrJSX = timeTempData.map((arr, idx) => {
    return (
      <th
        key={idx}
        onMouseOver={() => {
          handleMouseOver(idx);
        }}
        onMouseOut={() => {
          handleMouseOut(idx);
        }}
        style={getDynamicStyle(idx)}
      >
        {arr[0]}
      </th>
    );
  });

  const tempArrJSX = timeTempData.map((arr, idx) => {
    return (
      <td
        key={idx}
        onMouseOver={() => {
          handleMouseOver(idx);
        }}
        onMouseOut={() => {
          handleMouseOut(idx);
        }}
        style={getDynamicStyle(idx)}
      >
        {arr[1]}
      </td>
    );
  });

  return (
    <Table>
      <tbody>
        <tr>{timeArrJSX}</tr>
        <tr>{tempArrJSX}</tr>
      </tbody>
    </Table>
  );
}

function isGoodArray(props, propName, componentName) {
  const timeTempData = props[propName];
  for (const item of timeTempData) {
    if (item.length !== 2)
      throw new Error(`Invalid prop ${propName}. Expected array of length 2`);
    for (const entry of item) {
      if ((typeof entry !== 'number') & (typeof entry !== 'string'))
        throw new Error(
          `Invalid prop ${propName}. Expected array element type of either string or number only`
        );
    }
  }
}

ForecastTable.propTypes = {
  timeTempData: isGoodArray,
};
