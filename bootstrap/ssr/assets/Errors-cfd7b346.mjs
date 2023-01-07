import { XMarkIcon as e } from '@heroicons/vue/24/outline';
import {
  resolveComponent as r,
  mergeProps as s,
  useSSRContext as t,
} from 'vue';
import {
  ssrRenderAttrs as o,
  ssrInterpolate as n,
  ssrRenderList as l,
  ssrRenderComponent as c,
} from 'vue/server-renderer';
import { _ as i } from '../app2.mjs';
const a = {
  components: { XMarkIcon: e },
  props: {
    type: { type: String, default: 'success' },
    content: { type: Object, default: () => ({}) },
    errors: { type: Object, default: () => ({}) },
    containerClass: { type: String, default: 'md:w-10/12' },
  },
  computed: {
    message() {
      return !(!this.content || !this.content.message) && this.content.message;
    },
    errorsList() {
      return !!this.errors && this.errors;
    },
  },
};
const d = a.setup;
a.setup = (e, r) => {
  const s = t();
  return (
    (s.modules || (s.modules = new Set())).add(
      'resources/js/components/Errors.vue',
    ),
    d ? d(e, r) : void 0
  );
};
const u = i(a, [
  [
    'ssrRender',
    function (e, t, i, a, d, u, p, m) {
      const x = r('XMarkIcon');
      t(
        `<div${o(
          s(
            {
              class: [
                'relative mx-auto flex w-full items-start rounded border border border-red-400 bg-red-400 px-4 py-3 text-white dark:border-red-600 dark:bg-red-600 md:p-2',
                d.containerClass,
              ],
              role: 'alert shadow',
            },
            a,
          ),
        )}>`,
      ),
        !m.errorsList && m.message
          ? t(
              `<span class="block w-full text-center sm:inline">${n(
                m.message,
              )}</span>`,
            )
          : t('\x3c!----\x3e'),
        m.errorsList
          ? (t(
              '<div class="block w-full text-center sm:inline"><ul class="text-left text-sm">\x3c!--[--\x3e',
            ),
            l(m.errorsList, (e) => {
              t('<li><ul>\x3c!--[--\x3e'),
                l(e, (e) => {
                  t(`<li>${n(e)}</li>`);
                }),
                t('\x3c!--]--\x3e</ul></li>');
            }),
            t('\x3c!--]--\x3e</ul></div>'))
          : t('\x3c!----\x3e'),
        t('<span class="">'),
        t(c(x, { class: 'h-5 w-5 cursor-pointer font-bold' }, null, i)),
        t('</span></div>');
    },
  ],
]);
export { u as E };
