/* eslint-disable */

// import { track } from '@services/analytics';
export function track(
  action,
  category = 'click event',
  label = 'clicked',
  value = 1,
) {
  let appGaEnabled = GA_ENABLED; // eslint-disable-line
  if (appGaEnabled) {
    this.$gtag.event(action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}
