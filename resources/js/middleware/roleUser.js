export default function roleUser({ store, next }) {
  if (
    !store.getters['auth/authenticated'] ||
    (!store.state.auth.roles.superAdmin &&
      !store.state.auth.roles.admin &&
      !store.state.auth.roles.user)
  ) {
    return next({
      name: 'NotFound',
    });
  }
  return next();
}
