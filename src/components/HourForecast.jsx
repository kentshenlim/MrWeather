import { styled } from 'styled-components';
import color from '../styles/color';
import fontSize from '../styles/fontSize';

const Table = styled.table`
  width: 100%;
  color: ${color.primary};
  border-collapse: collapse;
  & tr:first-child {
    border-bottom: solid ${color.secondary} 2px;
    height: 4rem;
  }
  & th,
  & td {
    padding: 0.5rem;
  }
  & th:not(:first-child),
  & td:not(:first-child) {
    border-left: solid ${color.secondary} 2px;
  }
  & th {
    font-size: ${fontSize.small};
  }
  & td {
    font-size: ${fontSize.smallest};
  }
  @media only screen and (max-width: 800px) {
    & th {
      font-size: ${fontSize.smallest};
    }
  }
`;

export default function HourForecast({ timeTempData }) {
  const timeArrJSX = timeTempData.map((arr, idx) => {
    return <th key={idx}>{arr[0]}</th>;
  });
  const tempArrJSX = timeTempData.map((arr, idx) => {
    return <td key={idx}>{arr[1]}</td>;
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

HourForecast.propTypes = {
  timeTempData: isGoodArray,
};
