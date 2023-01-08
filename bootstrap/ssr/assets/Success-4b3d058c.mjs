import { XMarkIcon as e } from '@heroicons/vue/24/outline';
import {
  resolveComponent as o,
  mergeProps as r,
  useSSRContext as s,
} from 'vue';
import {
  ssrRenderAttrs as t,
  ssrInterpolate as n,
  ssrRenderComponent as l,
} from 'vue/server-renderer';
import { _ as c } from '../app2.mjs';
const p = {
  components: { XMarkIcon: e },
  props: { content: { type: String, default: 'hello !' } },
};
const a = p.setup;
p.setup = (e, o) => {
  const r = s();
  return (
    (r.modules || (r.modules = new Set())).add(
      'resources/js/components/Success.vue',
    ),
    a ? a(e, o) : void 0
  );
};
const u = c(p, [
  [
    'ssrRender',
    function (e, s, c, p, a, u, d, m) {
      const i = o('XMarkIcon');
      s(
        `<div${t(
          r(
            {
              class:
                'relative mx-auto flex w-full items-start rounded border border border-green-100 bg-green-100 px-4 py-3 text-green-500 md:p-2',
              role: 'alert shadow',
            },
            p,
          ),
        )}><span class="block w-full text-left sm:inline">${n(
          a.content,
        )}</span><span class="">`,
      ),
        s(l(i, { class: 'h-5 w-5 cursor-pointer font-bold' }, null, c)),
        s('</span></div>');
    },
  ],
]);
export { u as S };
