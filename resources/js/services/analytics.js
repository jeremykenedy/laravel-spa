/* eslint-disable */

const APP_GA_TAG = GA_TAG;
const APP_GA_ENABLED = GA_ENABLED;

// import { track } from '@services/analytics';
export function track(action, category = 'click event', label = 'clicked', value = 1) {
  let appGaEnabled = APP_GA_ENABLED;
  if (appGaEnabled == 1 || appGaEnabled == true) {
    this.$gtag.event(action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
