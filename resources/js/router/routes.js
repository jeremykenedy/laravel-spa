import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import Dashboard from '@/views/Dashboard.vue';
import Login from '@/views/Login.vue';
import ForgotPassword from '@/views/ForgotPassword.vue';
import ResetPassword from '@/views/ResetPassword.vue';
import Register from '@/views/Register.vue';
import VerifyEmail from '@/views/VerifyEmail.vue';
import Settings from '@/views/Settings.vue';
import Profile from '@/views/Profile.vue';
import Password from '@/views/Password.vue';
import auth from '@/middleware/auth';
import guest from '@/middleware/guest';

import AdminLayout from '@/layouts/AdminLayout.vue';
import Admin from '@/views/admin/Admin.vue';
import Users from '@/views/admin/Users.vue';
import Roles from '@/views/admin/Roles.vue';

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
    ],
    meta: {
      middleware: [auth], // HERE :: TODO
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
      name: 'profile',
    },
    name: 'settings',
    meta: {
      middleware: [auth],
    },
    children: [
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
    redirect: '/dashboard',
  },
];
