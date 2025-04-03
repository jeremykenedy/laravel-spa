import moment from 'moment';

/*

// Example Usage:

import {
  inputNotEmpty,
  isEmpty,
  isObjEmpty,
  validateEmail,
  parseDisplayDate
} from "@services/utilities";

*/

export function inputNotEmpty(key, row) {
  if (row[key] == '' || row[key] == null || row[key].length == 0) {
    return false;
  }
  if (row[key].length > 0) {
    return true;
  }
  return false;
}

export function isEmpty(item) {
  if (item == '' || item == null || item.length == 0) {
    return true;
  }
  if (item.length > 0) {
    return false;
  }
  return true;
}

export function isObjEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export async function validateEmail(address, checkDomain = false) {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  let email,
    valid = false,
    error = false,
    same = false,
    domain = false;
  try {
    const url = new URL(`http://${address}`);
    const { username, hostname } = url;
    email = `${username}@${hostname}`;
    same = address === email;
    valid = emailPattern.test(email);

    if (checkDomain) {
      function hasMX(dns) {
        return dns?.Answer?.[0]?.data ? true : false;
      }
      domain = await fetch(`https://cloudflare-dns.com/dns-query?name=${hostname}&type=MX`, {
        headers: { Accept: 'application/dns-json' },
      })
        .then((res) => res.json())
        .then(hasMX)
        .catch(hasMX);
    }
  } catch (fail) {
    return false;
  }

  if (same && valid && domain && !error) {
    return true;
  }

  return false;
}

export function parseDisplayDate(date) {
  if (date && date != true) {
    return moment(date).format('MMM Do YYYY, h:mma');
  }

  return moment(new Date()).format('MMM Do YYYY, h:mma');
}
