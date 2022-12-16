import Home from '@pages/Home.vue';
import About from '@pages/About.vue';
import Terms from '@pages/Terms.vue';
import Dashboard from '@pages/Dashboard.vue';
import Login from '@pages/Login.vue';
import ForgotPassword from '@pages/ForgotPassword.vue';
import ResetPassword from '@pages/ResetPassword.vue';
import Register from '@pages/Register.vue';
import VerifyEmail from '@pages/VerifyEmail.vue';
import Settings from '@pages/settings/Settings.vue';
import Profile from '@pages/settings/Profile.vue';
import Password from '@pages/settings/Password.vue';
import Account from '@pages/settings/Account.vue';
import NotFound from '@pages/NotFound.vue';

import AdminLayout from '@/layouts/AdminLayout.vue';
import Admin from '@/views/admin/Admin.vue';
import Users from '@/views/admin/Users.vue';
import Roles from '@/views/admin/Roles.vue';
import Permissions from '@/views/admin/Permissions.vue';
import AppSettings from '@/views/admin/AppSettings.vue';

import auth from '@/middleware/auth';
import guest from '@/middleware/guest';
import roleAdmin from '@/middleware/roleAdmin';
import roleSuperAdmin from '@/middleware/roleSuperAdmin';
import roleUser from '@/middleware/roleUser';

export default [
  {
    path: '/',
    component: Home,
    name: 'home',
  },
  {
    path: '/about',
    component: About,
    name: 'about',
  },
  {
    path: '/terms',
    component: Terms,
    name: 'terms',
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'dashboard',
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'admin',
        component: Admin,
      },
      {
        path: 'users',
        name: 'users',
        component: Users,
      },
      {
        path: 'roles',
        name: 'roles',
        component: Roles,
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: Permissions,
      },
      {
        path: 'app-settings',
        name: 'app-settings',
        component: AppSettings,
      },
    ],
    meta: {
      middleware: [roleAdmin],
    },
  },
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    name: 'forgot-password',
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/reset-password/:token',
    props: (route) => ({
      token: route.params.token,
      email: route.query.email,
    }),
    component: ResetPassword,
    name: 'reset-password',
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
    meta: {
      middleware: [guest],
    },
  },
  {
    path: '/verify-email/:id/:hash',
    props: (route) => ({
      id: route.params.id,
      hash: route.params.hash,
    }),
    component: VerifyEmail,
    name: 'verify-email',
  },
  {
    path: '/settings',
    component: Settings,
    redirect: {
      name: 'account',
    },
    name: 'settings',
    meta: {
      middleware: [auth],
    },
    children: [
      {
        path: 'account',
        component: Account,
        name: 'account',
        meta: {
          middleware: [auth],
        },
      },
      {
        path: 'profile',
        component: Profile,
        name: 'profile',
        meta: {
          middleware: [auth],
        },
      },
      {
        path: 'password',
        component: Password,
        name: 'password',
        meta: {
          middleware: [auth],
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
    name: 'NotFound',
  },
];
