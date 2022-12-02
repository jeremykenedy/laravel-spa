/* eslint-disable */
import moment from 'moment';

// import { parseDisplayDate } from '@services/common';
export function parseDisplayDate(date) {
  return moment(date).format('MMM Do YYYY, h:mma');
}
