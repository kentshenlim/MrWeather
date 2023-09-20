import { styled } from 'styled-components';
import PropTypes from 'prop-types';

const Table = styled.table`
  border: solid red 3px;
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
