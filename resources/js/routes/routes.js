import {useAuthStore} from "@/store/auth";
const AuthenticatedLayout = () => import('@layouts/Authenticated.vue')
const GuestLayout = ()  => import('@layouts/Guest.vue');
const PostsIndex  = ()  => import('@admin/posts/Index.vue');
const PostsCreate  = ()  => import('@admin/posts/Create.vue');
const PostsEdit  = ()  => import('@admin/posts/Edit.vue');

function requireLogin(to, from, next) {
  const auth = useAuthStore()
  let isLogin = false;
  isLogin = !!auth.authenticated;
  if (isLogin) {
    next()
  } else {
    next('/login')
  }
}

function guest(to, from, next) {
  const auth = useAuthStore()
  let isLogin;
  isLogin = !!auth.authenticated;
  if (isLogin) {
    next('/')
  } else {
    next()
  }
}

export default [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
          path: '/',
          name: 'home',
          component: () => import('@home/index.vue'),
      },
      {
          path: '/about',
          name: 'about',
          component: () => import('@misc/about.vue'),
      },
      {
          path: '/terms',
          name: 'terms',
          component: () => import('@misc/terms.vue'),
      },
      {
          path: 'posts',
          name: 'public-posts.index',
          component: () => import('@posts/index.vue'),
      },
      {
          path: 'posts/:id',
          name: 'public-posts.details',
          component: () => import('@posts/details.vue'),
      },
      {
          path: 'category/:id',
          name: 'category-posts.index',
          component: () => import('@category/posts.vue'),
      },
      {
          path: 'login',
          name: 'auth.login',
          component: () => import('@login/Login.vue'),
          beforeEnter: guest,
      },
      {
          path: 'register',
          name: 'auth.register',
          component: () => import('@register/index.vue'),
          beforeEnter: guest,
      },
      {
          path: 'forgot-password',
          name: 'auth.forgot-password',
          component: () => import('@auth/passwords/RequestReset.vue'),
          beforeEnter: guest,
      },
      {
          path: 'reset-password/:token',
          name: 'auth.reset-password',
          component: () => import('@auth/passwords/Reset.vue'),
          beforeEnter: guest,
      },
    ]
  },
  {
      path: '/dashboard',
      component: AuthenticatedLayout,
      beforeEnter: requireLogin,
      children: [
          {
              name: 'dashboard',
              path: '',
              component: () => import('@admin/index.vue'),
              meta: { breadCrumb: 'Dashboard' }
          },
          {
              name: 'admin.index',
              path: '',
              component: () => import('@admin/index.vue'),
              meta: { breadCrumb: 'Dashboard' }
          },
          {
              name: 'profile.index',
              path: 'profile',
              component: () => import('@admin/profile/index.vue'),
              meta: { breadCrumb: 'Profile' }
          },
          {
              name: 'posts.index',
              path: 'posts',
              component: PostsIndex,
              meta: { breadCrumb: 'Posts' }
          },
          {
              name: 'posts.create',
              path: 'posts/create',
              component: PostsCreate,
              meta: { breadCrumb: 'Add new post' }
          },
          {
              name: 'posts.edit',
              path: 'posts/edit/:id',
              component: PostsEdit,
              meta: { breadCrumb: 'Edit post' }
          },
          {
              name: 'categories.index',
              path: 'categories',
              component: () => import('@admin/categories/Index.vue'),
              meta: { breadCrumb: 'Categories' }
          },
          {
              name: 'categories.create',
              path: 'categories/create',
              component: () => import('@admin/categories/Create.vue'),
              meta: { breadCrumb: 'Add new category' }
          },
          {
              name: 'categories.edit',
              path: 'categories/edit/:id',
              component: () => import('@admin/categories/Edit.vue'),
              meta: { breadCrumb: 'Edit Category' }
          },
          {
              name: 'permissions.index',
              path: 'permissions',
              component: () => import('@admin/permissions/Index.vue'),
              meta: { breadCrumb: 'Permissions' }
          },
          {
              name: 'permissions.create',
              path: 'permissions/create',
              component: () => import('@admin/permissions/Create.vue'),
              meta: { breadCrumb: 'Create Permission' }
          },
          {
              name: 'permissions.edit',
              path: 'permissions/edit/:id',
              component: () => import('@admin/permissions/Edit.vue'),
              meta: { breadCrumb: 'Permission Edit' }
          },
          {
              name: 'roles.index',
              path: 'roles',
              component: () => import('@admin/roles/Index.vue'),
              meta: { breadCrumb: 'Roles' }
          },
          {
              name: 'roles.create',
              path: 'roles/create',
              component: () => import('@admin/roles/Create.vue'),
              meta: { breadCrumb: 'Create Role' }
          },
          {
              name: 'roles.edit',
              path: 'roles/edit/:id',
              component: () => import('@admin/roles/Edit.vue'),
              meta: { breadCrumb: 'Role Edit' }
          },
          {
              name: 'users.index',
              path: 'users',
              component: () => import('@admin/users/Index.vue'),
              meta: { breadCrumb: 'Users' }
          },
          {
              name: 'users.create',
              path: 'users/create',
              component: () => import('@admin/users/Create.vue'),
              meta: { breadCrumb: 'Add New' }
          },
          {
              name: 'users.edit',
              path: 'users/edit/:id',
              component: () => import('@admin/users/Edit.vue'),
              meta: { breadCrumb: 'User Edit' }
          },
          {
              name: 'browser_sessions.index',
              path: 'browser-sessions',
              component: () => import('@admin/browser-sessions/Index.vue'),
              meta: { breadCrumb: 'Browser Sessions' }
          },
          {
              name: 'activity_log.index',
              path: 'activity-log-logs',
              component: () => import('@admin/activity-log/Index.vue'),
              meta: { breadCrumb: 'Activity Logs' }
          },
      ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: () => import("@errors/404.vue"),
  },
];
