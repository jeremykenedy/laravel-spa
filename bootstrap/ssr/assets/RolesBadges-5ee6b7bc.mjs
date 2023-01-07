import { ssrRenderAttrs as e } from 'vue/server-renderer';
import { useSSRContext as r } from 'vue';
import { _ as t } from '../app2.mjs';
const s = {
  name: 'RolesBadges',
  components: {},
  props: { roles: { type: Object, required: !0 } },
  setup: () => ({}),
  data: () => ({}),
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeUnmount() {},
  updated() {},
  methods: {},
};
const d = s.setup;
s.setup = (e, t) => {
  const s = r();
  return (
    (s.modules || (s.modules = new Set())).add(
      'resources/js/components/roles/RolesBadges.vue',
    ),
    d ? d(e, t) : void 0
  );
};
const o = t(s, [
  [
    'ssrRender',
    function (r, t, s, d, o, a, n, u) {
      o.roles
        ? (t(`<div${e(d)}>`),
          o.roles.superAdmin
            ? t(
                '<span class="mr-2 cursor-default rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-200 dark:text-blue-800">Super Admin</span>',
              )
            : t('\x3c!----\x3e'),
          o.roles.admin
            ? t(
                '<span class="mr-2 cursor-default rounded bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">Admin</span>',
              )
            : t('\x3c!----\x3e'),
          o.roles.moderator
            ? t(
                '<span class="mr-2 cursor-default rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-200 dark:text-red-900">Moderator</span>',
              )
            : t('\x3c!----\x3e'),
          o.roles.editor
            ? t(
                '<span class="mr-2 cursor-default rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900">Editor</span>',
              )
            : t('\x3c!----\x3e'),
          o.roles.user
            ? t(
                '<span class="mr-2 cursor-default rounded bg-yellow-100 px-2.5 py-0.5 text-sm font-medium text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">User</span>',
              )
            : t('\x3c!----\x3e'),
          t('</div>'))
        : t('\x3c!----\x3e');
    },
  ],
]);
export { o as R };
