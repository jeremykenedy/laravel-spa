<template>
  <div class="relative isolate overflow-hidden bg-gray-200 dark:bg-gray-900 py-24 sm:py-32">
    <img
      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
      alt="support"
      class="dark-image support-image absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
    />

    <img
      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=lighten&bri=69&gam=12"
      alt="support"
      class="light-image support-image absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
    />

    <div class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div
      class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-5xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 sm:text-7xl">
          Product Support
        </h2>
        <p class="mt-8 text-pretty text-lg font-medium text-gray-700 dark:text-gray-400 sm:text-xl/8">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
          fugiat veniam occaecat fugiat.
        </p>
      </div>
      <div
        class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
      >
        <div
          v-for="card in cards"
          :key="card.name"
          class="flex gap-x-4 rounded-xl bg-gray-800/70 dark:bg-white/5 p-6 ring-1 ring-inset ring-gray-500 dark:ring-white/10"
        >
          <component
            :is="card.icon"
            class="h-7 w-5 flex-none text-indigo-200 dark:text-indigo-400"
            aria-hidden="true"
          />
          <div class="text-base/7">
            <h3 class="font-semibold text-white">
              {{ card.name }}
            </h3>
            <p class="mt-2 text-gray-300">
              {{ card.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { LifebuoyIcon, NewspaperIcon, PhoneIcon } from '@heroicons/vue/20/solid';

const theme = ref(localStorage.getItem('data-theme'));
const img = ref();

onMounted(() => {
  theme.value = localStorage.getItem('data-theme');
  window.addEventListener('theme-localstorage-changed', (event) => {
    theme.value = event.detail.storage;
  });
});

// IMAGE Manipulation
// https://docs.imgix.com/en-US/apis/rendering/overview

const cards = [
  {
    name: 'Sales',
    description: 'Consectetur vel non. Rerum ut consequatur nobis unde. Enim est quo corrupti consequatur.',
    icon: PhoneIcon,
  },
  {
    name: 'Technical Support',
    description: 'Quod possimus sit modi rerum exercitationem quaerat atque tenetur ullam.',
    icon: LifebuoyIcon,
  },
  {
    name: 'Media Inquiries',
    description: 'Ratione et porro eligendi est sed ratione rerum itaque. Placeat accusantium impedit eum odit.',
    icon: NewspaperIcon,
  },
];
</script>

<style scoped>
.dark-image,
.light-image {
  display: none;
}
html.dark .dark-image {
  display: block;
}
html:not(.dark) .light-image {
  display: block;
}
</style>
