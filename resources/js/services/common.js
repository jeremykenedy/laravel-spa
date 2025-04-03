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

export function greeting() {
  const date = new Date();
  const currentTime = date.getHours();
  let greeting;
  if (currentTime >= 0 && currentTime <= 12) {
    greeting = 'Good Morning';
  } else if (currentTime > 12 && currentTime <= 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }
  return greeting;
}

export function providerIcon(provider = null) {
  if (provider.toLowerCase() == 'apple') {
    return 'fa-brands fa-apple text-gray-800 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'twitter') {
    return 'fa-brands fa-twitter text-blue-300 dark:text-blue-200';
  }
  if (provider.toLowerCase() == 'google') {
    return 'fa-brands fa-google text-red-500 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'microsoft') {
    return 'fa-brands fa-microsoft text-blue-300 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'tiktok') {
    return 'fa-brands fa-tiktok text-pink-600 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'youtube') {
    return 'fa-brands fa-youtube text-red-600 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'instagram') {
    return 'fa-brands fa-instagram text-gray-800 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'facebook') {
    return 'fa-brands fa-facebook text-blue-600 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'github') {
    return 'fa-brands fa-github text-gray-700 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'twitch') {
    return 'fa-brands fa-twitch text-blue-300 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'linkedin') {
    return 'fa-brands fa-linkedin text-blue-900 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'zoho') {
    return 'fas fa-z text-yellow-500 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'stackexchange') {
    return 'fa-brands fa-stack-exchange text-blue-400 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'gitlab') {
    return 'fa-brands fa-square-gitlab text-orange-400 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'reddit') {
    return 'fa-brands fa-square-reddit text-orange-700 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'snapchat') {
    return 'fa-brands fa-square-snapchat text-yellow-400 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'meetup') {
    return 'fa-brands fa-meetup text-red-400 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'bitbucket') {
    return 'fa-brands fa-bitbucket text-blue-800 dark:text-gray-200';
  }
  if (provider.toLowerCase() == 'atlassian') {
    return 'fa-brands fa-atlassian text-blue-800 dark:text-gray-200';
  }

  // NEW_PROVIDER_PLUG :: Put New Provider HERE

  return 'fa-solid fa-plug-circle-check text-gray-600 dark:text-gray-200';
}
