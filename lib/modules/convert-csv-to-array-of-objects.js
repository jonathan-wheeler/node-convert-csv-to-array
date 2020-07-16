"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertCSVToArrayOfObjects = void 0;

var _convertStringToNumber = require("convert-string-to-number");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var convertCSVToArrayOfObjects = function convertCSVToArrayOfObjects(data, _ref) {
  var header = _ref.header,
      separator = _ref.separator,
      unquote = _ref.unquote;
  var csv = data;
  var rows = csv.split(/(?!\B"[^"]*)\n(?![^"]*"\B)/g);
  var array = [];
  var separatorRegex = new RegExp("(?!\\B\"[^\"]*)".concat(separator, "(?![^\"]*\"").concat(separator, ")"), 'g');
  var quotedRegex = new RegExp('^["\'](.*)["\']$', 'g');
  var headerRow;
  var headerObj;
  var content = [];

  var processCell = function processCell(cell) {
    if (unquote && cell.match(quotedRegex)) {
      return cell.replace(quotedRegex, '$1');
    }

    return cell;
  };

  rows.forEach(function (row, idx) {
    if (idx === 0) {
      headerRow = row.split(separatorRegex).map(function (cell) {
        return processCell(cell);
      });

      if (header) {
        array.push(headerRow);
      }

      headerRow.forEach(function (headerItem) {
        headerObj = Object.assign({}, headerObj, _defineProperty({}, headerItem, undefined));
      });
    } else if (rows.length - 1 !== idx) {
      var values = row.split(separatorRegex);
      values.forEach(function (value, i) {
        var processedValue = processCell(value);
        var convertedToNumber = (0, _convertStringToNumber.convertStringToNumber)(processedValue);
        var thisValue = Number.isNaN(convertedToNumber) ? processedValue : convertedToNumber;
        headerObj = Object.assign({}, headerObj, _defineProperty({}, headerRow[i], thisValue));
      });
      content.push(headerObj);
    }
  });
  array.push.apply(array, content);
  return array;
};

exports.convertCSVToArrayOfObjects = convertCSVToArrayOfObjects;