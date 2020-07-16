import { checkIfValid } from './helpers/check-if-valid';
import { convertCSVToArrayOfArrays } from './modules/convert-csv-to-array-of-arrays';
import { convertCSVToArrayOfObjects } from './modules/convert-csv-to-array-of-objects';

export const convertCSVToArray = (data, {
  header, type, separator, unquote,
} = { }) => {
  const thisOptions = {
    header: header !== false,
    type: type || 'object',
    separator: separator || ',',
    unquote: unquote !== false,
  };

  checkIfValid(data, thisOptions);

  if (thisOptions.type === 'object') {
    return convertCSVToArrayOfObjects(data, thisOptions);
  }

  return convertCSVToArrayOfArrays(data, thisOptions);
};

export default convertCSVToArray;
