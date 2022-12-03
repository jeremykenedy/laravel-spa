/* eslint-disable */
import moment from 'moment';

// import { parseDisplayDate } from '@services/common';
export function parseDisplayDate(date) {
  return moment(date).format('MMM Do YYYY, h:mma');
}

// import { capitalizeFirstLetter } from '@services/common';
export function capitalizeFirstLetter(str) {
  if (!str) return '';

  var firstCodeUnit = str[0];

  if (firstCodeUnit < '\uD800' || firstCodeUnit > '\uDFFF') {
    return str[0].toUpperCase() + str.slice(1);
  }

  return str.slice(0, 2).toUpperCase() + str.slice(2);
}
