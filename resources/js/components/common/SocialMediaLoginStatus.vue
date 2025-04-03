<template>
  <div>
    <SocialMediaLoginStatusItem icon="facebook" name="facebook" enabled-class="text-blue-500 dark:text-blue-500" />
    <SocialMediaLoginStatusItem icon="x" name="twitter" enabled-class="text-blue-300 dark:text-blue-300" />
    <SocialMediaLoginStatusItem icon="instagram" name="instagram" enabled-class="text-green-300 dark:text-yellow-300" />
    <SocialMediaLoginStatusItem icon="github" name="github" enabled-class="text-gray-300 dark:text-gray-300" />
    <SocialMediaLoginStatusItem icon="youtube" name="youtube" enabled-class="text-red-500 dark:text-red-500" />
    <SocialMediaLoginStatusItem icon="google" name="google" enabled-class="text-green-300 dark:text-green-300" />
    <SocialMediaLoginStatusItem icon="linkedin" name="linkedin" enabled-class="text-blue-500 dark:text-blue-500" />
    <!--
    <SocialMediaLoginStatusItem
      icon="apple"
      name="apple"
      enabled-class="text-gray-800 dark:text-gray-200"
    />
    <SocialMediaLoginStatusItem
      icon="z"
      name="zoho"
      enabled-class="text-yellow-600 dark:text-yellow-600"
    />
    <SocialMediaLoginStatusItem
      icon="stack-exchange"
      name="stackexchange"
      enabled-class="text-blue-400 dark:text-blue-400"
    />
    <SocialMediaLoginStatusItem
      icon="square-gitlab"
      name="gitlab"
      enabled-class="text-orange-400 dark:text-orange-400"
    />
    <SocialMediaLoginStatusItem
      icon="square-reddit"
      name="reddit"
      enabled-class="text-orange-700 dark:text-orange-700"
    />
    <SocialMediaLoginStatusItem
      icon="square-snapchat"
      name="snapchat"
      enabled-class="text-yellow-400 dark:text-yellow-400"
    />
    <SocialMediaLoginStatusItem
      icon="meetup"
      name="meetup"
      enabled-class="text-red-400 dark:text-red-400"
    />
    <SocialMediaLoginStatusItem
      icon="atlassian"
      name="atlassian"
      enabled-class="text-blue-800 dark:text-blue-800"
    />
    -->
  </div>
</template>

<script>
import SocialMediaLoginStatusItem from '@components/common/SocialMediaLoginStatusItem.vue';

export default {
  name: 'SocialMediaLoginStatus',
  components: {
    SocialMediaLoginStatusItem,
  },
};
</script>
