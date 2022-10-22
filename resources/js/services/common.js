/* eslint-disable */

/** *************************************************************
 * Validation Email Based on Regex Patterns
 ************************************************************** */
export function validateEmail(email, checkRule5 = false) {
  const check1 =
    /[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/;
  const check2 =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const check3 =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const check4 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const check5 = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; // This check dis-allows: @word.two.com
  if (!check1.test(String(email).toLowerCase())) {
    return false;
  }
  if (!check2.test(email)) {
    return false;
  }
  if (!check3.test(email)) {
    return false;
  }
  if (!check4.test(email)) {
    return false;
  }
  if (checkRule5) {
    if (!check5.test(email)) {
      return false;
    }
  }

  return true;
}
