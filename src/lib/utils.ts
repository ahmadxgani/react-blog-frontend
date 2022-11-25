import { escapeRegExp } from "lodash";

export function buildRegExpFromDelimiters(delimiters: any) {
  const delimiterChars = delimiters
    .map((delimiter: any) => {
      const chrCode = delimiter - 48 * Math.floor(delimiter / 48);
      return String.fromCharCode(96 <= delimiter ? chrCode : delimiter);
    })
    .join("");
  const escapedDelimiterChars = escapeRegExp(delimiterChars);
  return new RegExp(`[${escapedDelimiterChars}]+`);
}

export function canDrag(params: any) {
  const { moveTag, readOnly, allowDragDrop } = params;

  return moveTag !== undefined && !readOnly && allowDragDrop;
}

export function canDrop(params: any) {
  const { readOnly, allowDragDrop } = params;

  return !readOnly && allowDragDrop;
}
