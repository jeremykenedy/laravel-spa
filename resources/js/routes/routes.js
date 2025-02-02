import {useAuthStore} from "@/store/auth";

const AuthenticatedLayout = () => import('../layouts/Authenticated.vue')
const GuestLayout = ()  => import('../layouts/Guest.vue');
const PostsIndex  = ()  => import('../views/admin/posts/Index.vue');
const PostsCreate  = ()  => import('../views/admin/posts/Create.vue');
const PostsEdit  = ()  => import('../views/admin/posts/Edit.vue');

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
          component: () => import('../views/home/index.vue'),
      },
      {
          path: '/about',
          name: 'about',
          component: () => import('../views/misc/about.vue'),
      },
      {
          path: '/terms',
          name: 'terms',
          component: () => import('../views/misc/terms.vue'),
      },
      {
          path: 'posts',
          name: 'public-posts.index',
          component: () => import('../views/posts/index.vue'),
      },
      {
          path: 'posts/:id',
          name: 'public-posts.details',
          component: () => import('../views/posts/details.vue'),
      },
      {
          path: 'category/:id',
          name: 'category-posts.index',
          component: () => import('../views/category/posts.vue'),
      },
      {
          path: 'login',
          name: 'auth.login',
          component: () => import('../views/login/Login.vue'),
          beforeEnter: guest,
      },
      {
          path: 'register',
          name: 'auth.register',
          component: () => import('../views/register/index.vue'),
          beforeEnter: guest,
      },
      {
          path: 'forgot-password',
          name: 'auth.forgot-password',
          component: () => import('../views/auth/passwords/Email.vue'),
          beforeEnter: guest,
      },
      {
          path: 'reset-password/:token',
          name: 'auth.reset-password',
          component: () => import('../views/auth/passwords/Reset.vue'),
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
              component: () => import('../views/admin/index.vue'),
              meta: { breadCrumb: 'Dashboard' }
          },
          {
              name: 'admin.index',
              path: '',
              component: () => import('../views/admin/index.vue'),
              meta: { breadCrumb: 'Dashboard' }
          },
          {
              name: 'profile.index',
              path: 'profile',
              component: () => import('../views/admin/profile/index.vue'),
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
              component: () => import('../views/admin/categories/Index.vue'),
              meta: { breadCrumb: 'Categories' }
          },
          {
              name: 'categories.create',
              path: 'categories/create',
              component: () => import('../views/admin/categories/Create.vue'),
              meta: { breadCrumb: 'Add new category' }
          },
          {
              name: 'categories.edit',
              path: 'categories/edit/:id',
              component: () => import('../views/admin/categories/Edit.vue'),
              meta: { breadCrumb: 'Edit Category' }
          },
          {
              name: 'permissions.index',
              path: 'permissions',
              component: () => import('../views/admin/permissions/Index.vue'),
              meta: { breadCrumb: 'Permissions' }
          },
          {
              name: 'permissions.create',
              path: 'permissions/create',
              component: () => import('../views/admin/permissions/Create.vue'),
              meta: { breadCrumb: 'Create Permission' }
          },
          {
              name: 'permissions.edit',
              path: 'permissions/edit/:id',
              component: () => import('../views/admin/permissions/Edit.vue'),
              meta: { breadCrumb: 'Permission Edit' }
          },
          {
              name: 'roles.index',
              path: 'roles',
              component: () => import('../views/admin/roles/Index.vue'),
              meta: { breadCrumb: 'Roles' }
          },
          {
              name: 'roles.create',
              path: 'roles/create',
              component: () => import('../views/admin/roles/Create.vue'),
              meta: { breadCrumb: 'Create Role' }
          },
          {
              name: 'roles.edit',
              path: 'roles/edit/:id',
              component: () => import('../views/admin/roles/Edit.vue'),
              meta: { breadCrumb: 'Role Edit' }
          },
          {
              name: 'users.index',
              path: 'users',
              component: () => import('../views/admin/users/Index.vue'),
              meta: { breadCrumb: 'Users' }
          },
          {
              name: 'users.create',
              path: 'users/create',
              component: () => import('../views/admin/users/Create.vue'),
              meta: { breadCrumb: 'Add New' }
          },
          {
              name: 'users.edit',
              path: 'users/edit/:id',
              component: () => import('../views/admin/users/Edit.vue'),
              meta: { breadCrumb: 'User Edit' }
          },
          {
              name: 'browser_sessions.index',
              path: 'browser-sessions',
              component: () => import('../views/admin/browser-sessions/Index.vue'),
              meta: { breadCrumb: 'Browser Sessions' }
          },
          {
              name: 'activity_log.index',
              path: 'activity-log-logs',
              component: () => import('../views/admin/activity-log/Index.vue'),
              meta: { breadCrumb: 'Activity Logs' }
          },
      ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: () => import("../views/errors/404.vue"),
  },
];
