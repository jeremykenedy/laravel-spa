import {
  mergeProps as e,
  useSSRContext as t,
  resolveComponent as o,
} from 'vue';
import {
  ssrRenderAttrs as n,
  ssrRenderClass as s,
  ssrRenderComponent as a,
  ssrRenderList as l,
  ssrInterpolate as i,
  ssrRenderSlot as r,
} from 'vue/server-renderer';
import { _ as u } from '../app2.mjs';
import {
  ChevronRightIcon as d,
  ChevronLeftIcon as p,
} from '@heroicons/vue/24/outline';
const c = {
  name: 'PerPage',
  components: {},
  props: {
    items: { type: Array, required: !0 },
    perPage: { type: Number, default: 10 },
  },
  setup: () => ({}),
  data: () => ({ per: 10, ready: !1 }),
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.per = this.perPage;
  },
  beforeUnmount() {},
  updated() {},
  methods: {},
};
const h = c.setup;
c.setup = (e, o) => {
  const n = t();
  return (
    (n.modules || (n.modules = new Set())).add(
      'resources/js/components/PerPage.vue',
    ),
    h ? h(e, o) : void 0
  );
};
const g = u(c, [
    [
      'ssrRender',
      function (t, o, s, a, l, i, r, u) {
        l.items && l.items.length >= 1
          ? o(
              `<div${n(
                e({ class: 'inline-block rounded border pl-4' }, a),
              )}><label>Per Page</label><select id="perPage" required name="perPage" class="utline-0 border-0 bg-transparent text-center text-gray-600 focus:outline-0 active:outline-0 dark:text-gray-100"><option value="1" class="focus:outline-none">1</option><option value="5" class="focus:outline-none">5</option><option value="10" class="focus:outline-none">10</option><option value="25" class="focus:outline-none">25</option><option value="50" class="focus:outline-none">50</option><option value="100" class="focus:outline-none">100</option><option value="1000" class="focus:outline-none">1000</option><option value="1000" class="focus:outline-none">10000</option><option value="1000000000000" class="focus:outline-none">All</option></select></div>`,
            )
          : o('\x3c!----\x3e');
      },
    ],
  ]),
  m = {
    name: 'Pagination',
    components: { ChevronRightIcon: d, ChevronLeftIcon: p },
    props: {
      pagination: { type: Object, required: !0 },
      offset: { type: Number, default: 4 },
    },
    computed: {
      pages() {
        if (!this.pagination.to) return null;
        let e = this.pagination.current_page - this.offset;
        e < 1 && (e = 1);
        let t = e + 2 * this.offset;
        t >= this.pagination.last_page && (t = this.pagination.last_page);
        const o = [];
        for (let n = e; n <= t; n++) o.push(n);
        return o;
      },
      showPagination() {
        return this.pages.length > 1;
      },
    },
    methods: {
      change(e) {
        this.$emit('paginate', e);
      },
    },
  };
const b = m.setup;
m.setup = (e, o) => {
  const n = t();
  return (
    (n.modules || (n.modules = new Set())).add(
      'resources/js/components/Pagination.vue',
    ),
    b ? b(e, o) : void 0
  );
};
const f = u(m, [
    [
      'ssrRender',
      function (t, r, u, d, p, c, h, g) {
        const m = o('ChevronLeftIcon'),
          b = o('ChevronRightIcon');
        r(`<div${n(e({ class: 'vue-pagination' }, d))}>`),
          g.showPagination
            ? (r(
                `<ul class="list-reset border-grey-light mb-2 flex w-auto rounded border font-sans"><li><span class="${s(
                  [
                    1 == p.pagination.current_page ? 'disabled opacity-50' : '',
                    'hover:bg-blue text-blue border-grey-light block cursor-pointer border-r px-3 py-1 hover:text-white',
                  ],
                )}">`,
              ),
              r(a(m, { class: 'ml-2 mr-2 h-6 w-6' }, null, u)),
              r(
                '<span class="sr-only">Previous</span></span></li>\x3c!--[--\x3e',
              ),
              l(g.pages, (e) => {
                r(
                  `<li><span class="${s([
                    e == p.pagination.current_page
                      ? 'border-blue disabled border-r bg-slate-900 text-white'
                      : 'text-blue-400 hover:bg-slate-600 hover:text-white',
                    'block cursor-pointer rounded px-3 py-1',
                  ])}">${i(e)}</span></li>`,
                );
              }),
              r(
                `\x3c!--]--\x3e<li><span class="${s([
                  p.pagination.current_page == p.pagination.last_page
                    ? 'disabled opacity-50'
                    : '',
                  'hover:bg-blue text-blue block cursor-pointer px-3 py-1 hover:text-white',
                ])}">`,
              ),
              r(a(b, { class: 'ml-2 mr-2 h-6 w-6' }, null, u)),
              r('<span class="sr-only">Next</span></span></li></ul>'))
            : r('\x3c!----\x3e'),
          r(
            `<div class="mb-2 text-center text-xs"> Showing page ${i(
              p.pagination.current_page,
            )} of ${i(p.pagination.last_page)} <br> (Total Records: ${i(
              p.pagination.total,
            )}) </div></div>`,
          );
      },
    ],
  ]),
  v = {
    name: 'AppModal',
    props: {
      showModal: { type: Boolean, default: !1 },
      showClose: { type: Boolean, default: !0 },
      modalWidthClass: {
        type: String,
        default: 'min-w-[96%] sm:min-w-[60%] lg:min-w-[50%]',
      },
    },
    data: () => ({}),
    computed: {
      hasTitleSlot() {
        return this.$slots.title;
      },
      hasBodySlot() {
        return this.$slots.body;
      },
      hasFooterSlot() {
        return this.$slots.footer;
      },
    },
    methods: {
      closeModal() {
        this.$emit('closeModal');
      },
      confirmModal() {
        this.$emit('confirmModal');
      },
    },
  };
const x = v.setup;
v.setup = (e, o) => {
  const n = t();
  return (
    (n.modules || (n.modules = new Set())).add(
      'resources/js/components/common/AppModal.vue',
    ),
    x ? x(e, o) : void 0
  );
};
const y = u(v, [
  [
    'ssrRender',
    function (e, t, l, i, u, d, p, c) {
      const h = o('AppButton');
      t(`<div${n(i)}>`),
        u.showModal
          ? (t(
              `<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none"><div class="${s(
                [u.modalWidthClass, 'relative my-6 mx-auto w-auto'],
              )}"><div class="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none dark:bg-slate-600"><div class="flex items-start justify-between rounded-t p-5"><h3 class="text-3xl font-semibold">`,
            ),
            c.hasTitleSlot
              ? r(e.$slots, 'title', {}, null, t, l)
              : t('\x3c!----\x3e'),
            t('</h3>'),
            u.showClose
              ? t(
                  a(
                    h,
                    {
                      text: 'X',
                      class:
                        'text-1xl float-right border-0 bg-transparent text-gray-600 shadow-none outline-none hover:text-gray-800 focus:outline-none',
                      onClick: (e) => c.closeModal(),
                    },
                    null,
                    l,
                  ),
                )
              : t('\x3c!----\x3e'),
            t('</div><div class="relative flex-auto p-6">'),
            c.hasBodySlot
              ? r(e.$slots, 'body', {}, null, t, l)
              : t('\x3c!----\x3e'),
            t('</div>'),
            c.hasFooterSlot
              ? (t('<div class="flex items-center justify-end p-6">'),
                c.hasFooterSlot
                  ? r(e.$slots, 'footer', {}, null, t, l)
                  : t('\x3c!----\x3e'),
                t('</div>'))
              : t(
                  '<div class="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6"><button class="mr-1 mb-1 rounded border border-solid border-red-500 bg-transparent px-6 py-3 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear hover:bg-red-500 hover:text-white focus:outline-none active:bg-red-600" type="button"> Close </button><button class="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none" type="button"> Confirm </button></div>',
                ),
            t('</div></div></div>'))
          : t('\x3c!----\x3e'),
        u.showModal
          ? t('<div class="fixed inset-0 z-40 bg-black opacity-25"></div>')
          : t('\x3c!----\x3e'),
        t('</div>');
    },
  ],
]);
export { y as A, f as P, g as a };
