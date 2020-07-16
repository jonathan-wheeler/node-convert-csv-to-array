import { convertStringToNumber } from 'convert-string-to-number';

export const convertCSVToArrayOfObjects = (data, { header, separator, unquote }) => {
  const csv = data;
  const rows = csv.split(/(?!\B"[^"]*)\n(?![^"]*"\B)/g);
  const array = [];
  const separatorRegex = new RegExp(`(?!\\B"[^"]*)${separator}(?![^"]*"${separator})`, 'g');
  const quotedRegex = new RegExp('^["\'](.*)["\']$', 'g');

  let headerRow;
  let headerObj;
  const content = [];
  const processCell = (cell) => {
    if (unquote && cell.match(quotedRegex)) {
      return cell.replace(quotedRegex, '$1');
    }
    return cell;
  };

  rows.forEach((row, idx) => {
    if (idx === 0) {
      headerRow = row.split(separatorRegex).map((cell) => (processCell(cell)));
      if (header) {
        array.push(headerRow);
      }
      headerRow.forEach((headerItem) => {
        headerObj = Object.assign({}, headerObj, {
          [headerItem]: undefined,
        });
      });
    } else if (rows.length - 1 !== idx) {
      const values = row.split(separatorRegex);

      values.forEach((value, i) => {
        const processedValue = processCell(value);
        const convertedToNumber = convertStringToNumber(processedValue);
        const thisValue = Number.isNaN(convertedToNumber) ? processedValue : convertedToNumber;
        headerObj = Object.assign({}, headerObj, {
          [headerRow[i]]: thisValue,
        });
      });

      content.push(headerObj);
    }
  });

  array.push(...content);

  return array;
};
