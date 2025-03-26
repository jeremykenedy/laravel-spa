import { guest, requireLogin, superAdmin, admin } from "@routes/middleware";

const AuthenticatedLayout = () => import(/* webpackChunkName: "js/AuthenticatedLayout" */ '@layouts/Authenticated.vue')
const GuestLayout = ()  => import(/* webpackChunkName: "js/GuestLayout" */ '@layouts/Guest.vue');
const PostsIndex  = ()  => import(/* webpackChunkName: "js/PostsIndex" */ '@admin/posts/Index.vue');
const PostsCreate  = ()  => import(/* webpackChunkName: "js/PostsCreate" */ '@admin/posts/Create.vue');
const PostsEdit  = ()  => import(/* webpackChunkName: "js/PostsEdit" */ '@admin/posts/Edit.vue');

const Home  = ()  => import(/* webpackChunkName: "js/HomePage" */ '@home/index.vue');
const About  = ()  => import(/* webpackChunkName: "js/AboutPage" */ '@misc/about.vue');
const Terms  = ()  => import(/* webpackChunkName: "js/TermsPage" */ '@misc/terms.vue');
const Pricing  = ()  => import(/* webpackChunkName: "js/PricingPage" */ '@misc/pricing.vue');
const Support  = ()  => import(/* webpackChunkName: "js/SupportPage" */ '@misc/support.vue');

const Posts  = ()  => import(/* webpackChunkName: "js/PostsPage" */ '@posts/index.vue');
const Login  = ()  => import(/* webpackChunkName: "js/LoginPage" */ '@login/Login.vue');
const Register  = ()  => import(/* webpackChunkName: "js/RegisterPage" */ '@register/index.vue');
const ForgotPassword  = ()  => import(/* webpackChunkName: "js/ForgotPasswordPage" */ '@auth/passwords/RequestReset.vue');
const ResetPassword  = ()  => import(/* webpackChunkName: "js/ResetPasswordPage" */ '@auth/passwords/Reset.vue');

const Admin  = ()  => import(/* webpackChunkName: "js/AdminPage" */ '@admin/Admin.vue');
const Dashboard  = ()  => import(/* webpackChunkName: "js/DashboardPage" */ '@admin/Dashboard.vue');
const Categories  = ()  => import(/* webpackChunkName: "js/CategoriesPage" */ '@admin/categories/Index.vue');
const CreateCategory  = ()  => import(/* webpackChunkName: "js/CreateCategoryPage" */ '@admin/categories/Create.vue');
const EditCategory  = ()  => import(/* webpackChunkName: "js/EditCategoryPage" */ '@admin/categories/Edit.vue');
const Permissions  = ()  => import(/* webpackChunkName: "js/PermissionsPage" */ '@admin/Permissions.vue');
const Roles  = ()  => import(/* webpackChunkName: "js/RolesPage" */ '@admin/Roles.vue');
const Users  = ()  => import(/* webpackChunkName: "js/UsersPage" */ '@admin/Users.vue');

const BrowserSessions  = ()  => import(/* webpackChunkName: "js/BrowserSessionsPage" */ '@admin/BrowserSessions.vue');
const ActivityLogs  = ()  => import(/* webpackChunkName: "js/ActivityLogsPage" */ '@admin/ActivityLog.vue');

const NotFound  = ()  => import(/* webpackChunkName: "js/NotFoundPage" */ '@errors/404.vue');
const PhpInfo  = ()  => import(/* webpackChunkName: "js/PhpInfo" */ '@admin/PhpInfo.vue');
const AppSettings  = ()  => import(/* webpackChunkName: "js/AppSettings" */ '@admin/AppSettings.vue');
const Settings  = ()  => import(/* webpackChunkName: "js/Settings" */ '@pages/user-settings/Settings.vue');
const Profile  = ()  => import(/* webpackChunkName: "js/ProfilePage" */ '@pages/user-settings/Profile.vue');
const Account  = ()  => import(/* webpackChunkName: "js/AccountPage" */ '@pages/user-settings/Account.vue');
const Password  = ()  => import(/* webpackChunkName: "js/PasswordPage" */ '@pages/user-settings/Password.vue');

export default [
  {
    path: '/',
    component: GuestLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/about',
        name: 'about',
        component: About,
      },
      {
        path: '/terms',
        name: 'terms',
        component: Terms,
      },
      {
        path: '/pricing',
        name: 'pricing',
        component: Pricing,
      },
      {
        path: '/support',
        name: 'support',
        component: Support,
      },
      {
        path: 'posts',
        name: 'public-posts.index',
        component: Posts,
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
        component: Login,
        beforeEnter: guest,
      },
      {
        path: 'register',
        name: 'auth.register',
        component: Register,
        beforeEnter: guest,
      },
      {
        path: 'forgot-password',
        name: 'auth.forgot-password',
        component: ForgotPassword,
        beforeEnter: guest,
      },
      {
        path: 'reset-password/:token',
        name: 'auth.reset-password',
        component: ResetPassword,
        beforeEnter: guest,
      },
    ]
  },
  {
    path: '/admin',
    component: AuthenticatedLayout,
    beforeEnter: requireLogin,
    children: [
      {
        name: 'admin.index',
        path: '',
        component: Admin,
        meta: { breadCrumb: 'Admin' },
        beforeEnter: superAdmin,
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
        component: Categories,
        meta: { breadCrumb: 'Categories' }
      },
      {
        name: 'categories.create',
        path: 'categories/create',
        component: CreateCategory,
        meta: { breadCrumb: 'Add new category' }
      },
      {
        name: 'categories.edit',
        path: 'categories/edit/:id',
        component: EditCategory,
        meta: { breadCrumb: 'Edit Category' }
      },
      {
        name: 'permissions.index',
        path: 'permissions',
        component: Permissions,
        beforeEnter: superAdmin,
        meta: { breadCrumb: 'Permissions' }
      },
      {
        name: 'roles.index',
        path: 'roles',
        component: Roles,
        beforeEnter: superAdmin,
        meta: { breadCrumb: 'Roles' }
      },
      {
        name: 'users.index',
        path: 'users',
        component: Users,
        beforeEnter: admin,
        meta: { breadCrumb: 'Users' }
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
        component: Dashboard,
        meta: { breadCrumb: 'Dashboard' }
      },
      {
        name: 'browser_sessions.index',
        path: 'browser-sessions',
        component: BrowserSessions,
        meta: { breadCrumb: 'Browser Sessions' }
      },
      {
        name: 'activity_log.index',
        path: 'activity-log-logs',
        component: ActivityLogs,
        meta: { breadCrumb: 'Activity Logs' }
      },
      {
        path: 'phpinfo',
        name: 'phpinfo',
        component: PhpInfo,
        beforeEnter: superAdmin,
      },
      {
        path: 'app-settings',
        name: 'app-settings',
        component: AppSettings,
        beforeEnter: superAdmin,
      },
    ]
  },
  {
    path: '/settings',
    component: AuthenticatedLayout,
    beforeEnter: requireLogin,
    children: [
      {
        name: 'settings.index',
        path: '',
        component: Settings,
        meta: { breadCrumb: 'Settings' }
      },
      {
        name: 'settings.account',
        path: 'account',
        component: Account,
        meta: { breadCrumb: 'Account' }
      },
      {
        name: 'settings.profile',
        path: 'profile',
        component: Profile,
        meta: { breadCrumb: 'Profile' }
      },
      {
        name: 'settings.password',
        path: 'password',
        component: Password,
        meta: { breadCrumb: 'Password' }
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: NotFound,
  },
];
