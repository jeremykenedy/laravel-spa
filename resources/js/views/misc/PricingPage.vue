<template>
  <div class="-m-6 p-0" style="margin: 0; padding: 0">
    <div class="isolate overflow-hidden">
      <div class="flow-root bg-white dark:bg-gray-900 py-16 sm:pt-32 lg:pb-0">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="relative z-10">
            <h1
              class="mx-auto max-w-4xl text-balance text-center text-5xl font-semibold tracking-tight text-gray-700 dark:text-white sm:text-6xl"
            >
              Pricing that grows with you
            </h1>
            <p
              class="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 dark:text-gray-400 sm:text-xl/8"
            >
              Choose an affordable plan that’s packed with the best features for engaging your audience, creating
              customer loyalty, and driving sales.
            </p>
            <div class="mt-16 flex justify-center">
              <fieldset aria-label="Payment frequency">
                <RadioGroup
                  v-model="frequency"
                  class="grid grid-cols-2 gap-x-1 rounded-full bg-gray-600 dark:bg-white/5 p-1 text-center text-xs/5 font-semibold text-white"
                >
                  <RadioGroupOption
                    v-for="option in pricing.frequencies"
                    :key="option.value"
                    v-slot="{ checked }"
                    as="template"
                    :value="option"
                  >
                    <div :class="[checked ? 'bg-indigo-500' : '', 'cursor-pointer rounded-full px-2.5 py-1']">
                      {{ option.label }}
                    </div>
                  </RadioGroupOption>
                </RadioGroup>
              </fieldset>
            </div>
          </div>
          <div
            class="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3"
          >
            <svg
              viewBox="0 0 1208 1024"
              aria-hidden="true"
              class="hidden dark:block absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
            >
              <ellipse cx="604" cy="512" fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)" rx="604" ry="512" />
              <defs>
                <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                  <stop stop-color="#7775D6" />
                  <stop offset="1" stop-color="#E935C1" />
                </radialGradient>
              </defs>
            </svg>

            <div
              class="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
              aria-hidden="true"
            />
            <div
              v-for="tier in pricing.tiers"
              :key="tier.id"
              :class="[
                tier.featured
                  ? 'z-10 bg-white shadow-xl ring-1 ring-gray-900/10'
                  : 'bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0',
                'relative rounded-2xl',
              ]"
            >
              <div class="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                <h2 :id="tier.id" :class="[tier.featured ? 'text-gray-900' : 'text-white', 'text-sm/6 font-semibold']">
                  {{ tier.name }}
                </h2>
                <div
                  class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch"
                >
                  <div class="mt-2 flex items-center gap-x-4">
                    <p
                      :class="[tier.featured ? 'text-gray-900' : 'text-white', 'text-4xl font-semibold tracking-tight']"
                    >
                      {{ tier.price[frequency.value] }}
                    </p>
                    <div class="text-sm">
                      <p :class="tier.featured ? 'text-gray-900' : 'text-white'">USD</p>
                      <p :class="tier.featured ? 'text-gray-500' : 'text-gray-400'">
                        {{ `Billed ${frequency.value}` }}
                      </p>
                    </div>
                  </div>
                  <a
                    :href="tier.href"
                    :aria-describedby="tier.id"
                    :class="[
                      tier.featured
                        ? 'bg-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                        : 'bg-white/10 hover:bg-white/20 focus-visible:outline-white',
                      'rounded-md px-3 py-2 text-center text-sm/6 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                    ]"
                    >Buy this plan</a
                  >
                </div>
                <div class="mt-8 flow-root sm:mt-10">
                  <ul
                    role="list"
                    :class="[
                      tier.featured
                        ? 'divide-gray-900/5 border-gray-900/5 text-gray-600'
                        : 'divide-white/5 border-white/5 text-white',
                      '-my-2 divide-y border-t text-sm/6 lg:border-t-0',
                    ]"
                  >
                    <li v-for="mainFeature in tier.highlights" :key="mainFeature" class="flex gap-x-3 py-2">
                      <CheckIcon
                        :class="[tier.featured ? 'text-indigo-600' : 'text-gray-500', 'h-6 w-5 flex-none']"
                        aria-hidden="true"
                      />
                      {{ mainFeature }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative bg-gray-50 dark:bg-black lg:pt-14">
        <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <!-- Feature comparison (up to lg) -->
          <section aria-labelledby="mobile-comparison-heading" class="lg:hidden">
            <h2 id="mobile-comparison-heading" class="sr-only">Feature comparison</h2>

            <div class="mx-auto max-w-2xl space-y-16">
              <div v-for="tier in pricing.tiers" :key="tier.id" class="border-t border-gray-900/10">
                <div
                  :class="[
                    tier.featured ? 'border-indigo-600' : 'border-transparent',
                    '-mt-px w-72 border-t-2 pt-10 md:w-80',
                  ]"
                >
                  <h3
                    :class="[
                      tier.featured ? 'text-indigo-600' : 'text-gray-900 dark:text-gray-500',
                      'text-sm/6 font-semibold',
                    ]"
                  >
                    {{ tier.name }}
                  </h3>
                  <p class="mt-1 text-sm/6 text-gray-600">
                    {{ tier.description }}
                  </p>
                </div>

                <div class="mt-10 space-y-10">
                  <div v-for="section in pricing.sections" :key="section.name">
                    <h4 class="text-sm/6 font-semibold text-gray-900 dark:text-gray-400">
                      {{ section.name }}
                    </h4>
                    <div class="relative mt-6">
                      <!-- Fake card background -->
                      <div
                        aria-hidden="true"
                        class="absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block"
                      />

                      <div
                        :class="[
                          tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10',
                          'relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0',
                        ]"
                      >
                        <dl class="divide-y divide-gray-200 text-sm/6">
                          <div
                            v-for="feature in section.features"
                            :key="feature.name"
                            class="flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0"
                          >
                            <dt class="pr-4 text-gray-600">
                              {{ feature.name }}
                            </dt>
                            <dd class="flex items-center justify-end sm:justify-center sm:px-4">
                              <span
                                v-if="typeof feature.tiers[tier.name] === 'string'"
                                :class="tier.featured ? 'font-semibold text-indigo-600' : 'text-gray-900'"
                                >{{ feature.tiers[tier.name] }}</span
                              >
                              <template v-else>
                                <CheckIcon
                                  v-if="feature.tiers[tier.name] === true"
                                  class="mx-auto size-5 text-indigo-600"
                                  aria-hidden="true"
                                />
                                <XMarkIconMini v-else class="mx-auto size-5 text-gray-400" aria-hidden="true" />
                                <span class="sr-only">{{ feature.tiers[tier.name] === true ? 'Yes' : 'No' }}</span>
                              </template>
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <!-- Fake card border -->
                      <div
                        aria-hidden="true"
                        :class="[
                          tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10',
                          'pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block',
                        ]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Feature comparison (lg+) -->
          <section aria-labelledby="comparison-heading" class="hidden lg:block">
            <h2 id="comparison-heading" class="sr-only">Feature comparison</h2>

            <div class="grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block">
              <div v-for="tier in pricing.tiers" :key="tier.id" aria-hidden="true" class="-mt-px">
                <div :class="[tier.featured ? 'border-indigo-600' : 'border-transparent', 'border-t-2 pt-10']">
                  <p
                    :class="[
                      tier.featured ? 'text-indigo-600 dark:text-indigo-500' : 'text-gray-900 dark:text-gray-200',
                      'text-sm/6 font-semibold',
                    ]"
                  >
                    {{ tier.name }}
                  </p>
                  <p class="mt-1 text-sm/6 text-gray-600 dark:text-gray-400">
                    {{ tier.description }}
                  </p>
                </div>
              </div>
            </div>

            <div class="-mt-6 space-y-16">
              <div v-for="section in pricing.sections" :key="section.name">
                <h3 class="text-sm/6 font-semibold text-gray-900 dark:text-gray-200">
                  {{ section.name }}
                </h3>
                <div class="relative -mx-8 mt-10">
                  <!-- Fake card backgrounds -->
                  <div class="absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block" aria-hidden="true">
                    <div class="size-full rounded-lg bg-white dark:bg-gray-700 shadow-sm" />
                    <div class="size-full rounded-lg bg-white dark:bg-gray-700 shadow-sm" />
                    <div class="size-full rounded-lg bg-white dark:bg-gray-700 shadow-sm" />
                  </div>

                  <table class="relative w-full border-separate border-spacing-x-8">
                    <thead>
                      <tr class="text-left">
                        <th scope="col">
                          <span class="sr-only">Feature</span>
                        </th>
                        <th v-for="tier in pricing.tiers" :key="tier.id" scope="col">
                          <span class="sr-only">{{ tier.name }} tier</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(feature, featureIdx) in section.features" :key="feature.name">
                        <th
                          scope="row"
                          class="w-1/4 py-3 pr-4 text-left text-sm/6 font-normal text-gray-900 dark:text-gray-200"
                        >
                          {{ feature.name }}
                          <div
                            v-if="featureIdx !== section.features.length - 1"
                            class="absolute inset-x-8 mt-3 h-px bg-gray-200 dark:bg-gray-600"
                          />
                        </th>
                        <td v-for="tier in pricing.tiers" :key="tier.id" class="relative w-1/4 px-4 py-0 text-center">
                          <span class="relative size-full py-3">
                            <span
                              v-if="typeof feature.tiers[tier.name] === 'string'"
                              :class="[
                                tier.featured
                                  ? 'font-semibold text-indigo-600 dark:text-indigo-300'
                                  : 'text-gray-900 dark:text-gray-200',
                                'text-sm/6',
                              ]"
                              >{{ feature.tiers[tier.name] }}</span
                            >
                            <template v-else>
                              <CheckIcon
                                v-if="feature.tiers[tier.name] === true"
                                class="mx-auto size-5 text-indigo-600 dark:text-indigo-300"
                                aria-hidden="true"
                              />
                              <XMarkIconMini
                                v-else
                                class="mx-auto size-5 text-gray-400 dark:text-gray-200"
                                aria-hidden="true"
                              />
                              <span class="sr-only">{{ feature.tiers[tier.name] === true ? 'Yes' : 'No' }}</span>
                            </template>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- Fake card borders -->
                  <div
                    class="pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block"
                    aria-hidden="true"
                  >
                    <div
                      v-for="tier in pricing.tiers"
                      :key="tier.id"
                      :class="[tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10', 'rounded-lg']"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, h, ref } from 'vue';
import { Dialog, DialogPanel, RadioGroup, RadioGroupOption } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon as XMarkIconOutline } from '@heroicons/vue/24/outline';
import { CheckIcon, XMarkIcon as XMarkIconMini } from '@heroicons/vue/20/solid';

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
];
const pricing = {
  frequencies: [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annually', label: 'Annually' },
  ],
  tiers: [
    {
      name: 'Starter',
      id: 'tier-starter',
      href: '#',
      featured: false,
      description: 'Everything you need to get started.',
      price: { monthly: '$19', annually: '$199' },
      highlights: ['Custom domains', 'Edge content delivery', 'Advanced analytics'],
    },
    {
      name: 'Scale',
      id: 'tier-scale',
      href: '#',
      featured: true,
      description: 'Added flexibility at scale.',
      price: { monthly: '$99', annually: '$999' },
      highlights: [
        'Custom domains',
        'Edge content delivery',
        'Advanced analytics',
        'Quarterly workshops',
        'Single sign-on (SSO)',
        'Priority phone support',
      ],
    },
    {
      name: 'Growth',
      id: 'tier-growth',
      href: '#',
      featured: false,
      description: 'All the extras for your growing team.',
      price: { monthly: '$49', annually: '$499' },
      highlights: ['Custom domains', 'Edge content delivery', 'Advanced analytics', 'Quarterly workshops'],
    },
  ],
  sections: [
    {
      name: 'Features',
      features: [
        {
          name: 'Edge content delivery',
          tiers: { Starter: true, Growth: true, Scale: true },
        },
        {
          name: 'Custom domains',
          tiers: { Starter: '1', Growth: '3', Scale: 'Unlimited' },
        },
        {
          name: 'Team members',
          tiers: { Starter: '3', Growth: '20', Scale: 'Unlimited' },
        },
        {
          name: 'Single sign-on (SSO)',
          tiers: { Starter: false, Growth: false, Scale: true },
        },
      ],
    },
    {
      name: 'Reporting',
      features: [
        {
          name: 'Advanced analytics',
          tiers: { Starter: true, Growth: true, Scale: true },
        },
        {
          name: 'Basic reports',
          tiers: { Starter: false, Growth: true, Scale: true },
        },
        {
          name: 'Professional reports',
          tiers: { Starter: false, Growth: false, Scale: true },
        },
        {
          name: 'Custom report builder',
          tiers: { Starter: false, Growth: false, Scale: true },
        },
      ],
    },
    {
      name: 'Support',
      features: [
        {
          name: '24/7 online support',
          tiers: { Starter: true, Growth: true, Scale: true },
        },
        {
          name: 'Quarterly workshops',
          tiers: { Starter: false, Growth: true, Scale: true },
        },
        {
          name: 'Priority phone support',
          tiers: { Starter: false, Growth: false, Scale: true },
        },
        {
          name: '1:1 onboarding tour',
          tiers: { Starter: false, Growth: false, Scale: true },
        },
      ],
    },
  ],
};
const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Automation', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Submit ticket', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Terms of service', href: '#' },
    { name: 'Privacy policy', href: '#' },
    { name: 'License', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'X',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              d: 'M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z',
            }),
          ]),
      }),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
  ],
};

const mobileMenuOpen = ref(false);
const frequency = ref(pricing.frequencies[0]);
</script>
