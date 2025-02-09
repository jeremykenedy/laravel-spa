import {useAuthStore} from "@/store/auth";
const AuthenticatedLayout = () => import(/* webpackChunkName: "js/AuthenticatedLayout" */ '@layouts/Authenticated.vue')
const GuestLayout = ()  => import(/* webpackChunkName: "js/GuestLayout" */ '@layouts/Guest.vue');
const PostsIndex  = ()  => import(/* webpackChunkName: "js/PostsIndex" */ '@admin/posts/Index.vue');
const PostsCreate  = ()  => import(/* webpackChunkName: "js/PostsCreate" */ '@admin/posts/Create.vue');
const PostsEdit  = ()  => import(/* webpackChunkName: "js/PostsEdit" */ '@admin/posts/Edit.vue');

const Home  = ()  => import(/* webpackChunkName: "js/HomePage" */ '@home/index.vue');
const About  = ()  => import(/* webpackChunkName: "js/AboutPage" */ '@misc/about.vue');
const Terms  = ()  => import(/* webpackChunkName: "js/TermsPage" */ '@misc/terms.vue');
const Posts  = ()  => import(/* webpackChunkName: "js/PostsPage" */ '@posts/index.vue');
const Login  = ()  => import(/* webpackChunkName: "js/LoginPage" */ '@login/Login.vue');
const Register  = ()  => import(/* webpackChunkName: "js/RegisterPage" */ '@register/index.vue');
const ForgotPassword  = ()  => import(/* webpackChunkName: "js/ForgotPasswordPage" */ '@auth/passwords/RequestReset.vue');
const ResetPassword  = ()  => import(/* webpackChunkName: "js/ResetPasswordPage" */ '@auth/passwords/Reset.vue');
const Dashboard  = ()  => import(/* webpackChunkName: "js/DashboardPage" */ '@admin/index.vue');
const Profile  = ()  => import(/* webpackChunkName: "js/ProfilePage" */ '@admin/profile/index.vue');
const Categories  = ()  => import(/* webpackChunkName: "js/CategoriesPage" */ '@admin/categories/Index.vue');
const CreateCategory  = ()  => import(/* webpackChunkName: "js/CreateCategoryPage" */ '@admin/categories/Create.vue');
const EditCategory  = ()  => import(/* webpackChunkName: "js/EditCategoryPage" */ '@admin/categories/Edit.vue');
const Permissions  = ()  => import(/* webpackChunkName: "js/PermissionsPage" */ '@admin/permissions/Index.vue');
const CreatePermission  = ()  => import(/* webpackChunkName: "js/CreatePermissionPage" */ '@admin/permissions/Create.vue');
const EditPermission  = ()  => import(/* webpackChunkName: "js/EditPermissionPage" */ '@admin/permissions/Edit.vue');
const Roles  = ()  => import(/* webpackChunkName: "js/RolesPage" */ '@admin/roles/Index.vue');
const CreateRoles  = ()  => import(/* webpackChunkName: "js/CreateRolesPage" */ '@admin/roles/Create.vue');
const EditRoles  = ()  => import(/* webpackChunkName: "js/EditRolesPage" */ '@admin/roles/Edit.vue');
const Users  = ()  => import(/* webpackChunkName: "js/UsersPage" */ '@admin/users/Index.vue');
const CreateUser  = ()  => import(/* webpackChunkName: "js/CreateUserPage" */ '@admin/users/Create.vue');
const EditUser  = ()  => import(/* webpackChunkName: "js/EditUserPage" */ '@admin/users/Edit.vue');
const BrowserSessions  = ()  => import(/* webpackChunkName: "js/BrowserSessionsPage" */ '@admin/browser-sessions/Index.vue');
const ActivityLogs  = ()  => import(/* webpackChunkName: "js/ActivityLogsPage" */ '@admin/activity-log/Index.vue');
const NotFound  = ()  => import(/* webpackChunkName: "js/NotFoundPage" */ '@errors/404.vue');

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
        component: Login,
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
        name: 'admin.index',
        path: '',
        component: Dashboard,
        meta: { breadCrumb: 'Dashboard' }
      },
      {
        name: 'profile.index',
        path: 'profile',
        component: Profile,
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
        meta: { breadCrumb: 'Permissions' }
      },
      {
        name: 'permissions.create',
        path: 'permissions/create',
        component: CreatePermission,
        meta: { breadCrumb: 'Create Permission' }
      },
      {
        name: 'permissions.edit',
        path: 'permissions/edit/:id',
        component: EditPermission,
        meta: { breadCrumb: 'Permission Edit' }
      },
      {
        name: 'roles.index',
        path: 'roles',
        component: Roles,
        meta: { breadCrumb: 'Roles' }
      },
      {
        name: 'roles.create',
        path: 'roles/create',
        component: CreateRoles,
        meta: { breadCrumb: 'Create Role' }
      },
      {
        name: 'roles.edit',
        path: 'roles/edit/:id',
        component: EditRoles,
        meta: { breadCrumb: 'Role Edit' }
      },
      {
        name: 'users.index',
        path: 'users',
        component: Users,
        meta: { breadCrumb: 'Users' }
      },
      {
        name: 'users.create',
        path: 'users/create',
        component: CreateUser,
        meta: { breadCrumb: 'Add New' }
      },
      {
        name: 'users.edit',
        path: 'users/edit/:id',
        component: EditUser,
        meta: { breadCrumb: 'User Edit' }
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
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: 'NotFound',
    component: NotFound,
  },
];
