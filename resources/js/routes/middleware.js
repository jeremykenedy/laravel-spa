import { useAuthStore } from '@store/auth';

export function guest(to, from, next) {
  const auth = useAuthStore();
  let isLogin = false;
  isLogin = !!auth.authenticated;
  if (isLogin) {
    next('/');
  } else {
    next();
  }
}

export function requireLogin(to, from, next) {
  const auth = useAuthStore();
  let isLogin = false;
  isLogin = !!auth.authenticated;
  if (isLogin) {
    next();
  } else {
    next('/login');
  }
}

export function superAdmin(to, from, next) {
  const auth = useAuthStore();
  if (
    !auth.authenticated ||
    !auth.user ||
    !auth.user.roles ||
    auth.user.roles.length <= 0 ||
    !auth.userIs('superadmin')
  ) {
    next('/');
  } else {
    next();
  }
}

export function admin(to, from, next) {
  const auth = useAuthStore();
  if (
    !auth.authenticated ||
    !auth.user ||
    !auth.user.roles ||
    auth.user.roles.length <= 0 ||
    (!auth.userIs('admin') && !auth.userIs('superadmin'))
  ) {
    next('/');
  } else {
    next();
  }
}

export function moderator(to, from, next) {
  const auth = useAuthStore();
  if (
    !auth.authenticated ||
    !auth.user ||
    !auth.user.roles ||
    auth.user.roles.length <= 0 ||
    (!auth.userIs('admin') && !auth.userIs('superadmin') && !auth.userIs('moderator'))
  ) {
    next('/');
  } else {
    next();
  }
}

export function editor(to, from, next) {
  const auth = useAuthStore();
  if (
    !auth.authenticated ||
    !auth.user ||
    !auth.user.roles ||
    auth.user.roles.length <= 0 ||
    (!auth.userIs('admin') && !auth.userIs('superadmin') && !auth.userIs('editor'))
  ) {
    next('/');
  } else {
    next();
  }
}

export function user(to, from, next) {
  const auth = useAuthStore();
  if (
    !auth.authenticated ||
    !auth.user ||
    !auth.user.roles ||
    auth.user.roles.length <= 0 ||
    (!auth.userIs('admin') && !auth.userIs('superadmin') && !auth.userIs('user'))
  ) {
    next('/');
  } else {
    next();
  }
}

export function unverified(to, from, next) {
  const auth = useAuthStore();
  if (
    !auth.authenticated ||
    !auth.user ||
    !auth.user.roles ||
    auth.user.roles.length <= 0 ||
    (!auth.userIs('admin') && !auth.userIs('superadmin') && !auth.userIs('unverified'))
  ) {
    next('/');
  } else {
    next();
  }
}
