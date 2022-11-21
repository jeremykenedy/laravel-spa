export default function roleSuperAdmin({ store, next }) {
  if (
    !store.getters['auth/authenticated'] ||
    !store.state.auth.roles.superAdmin
  ) {
    return next({
      name: 'NotFound',
    });
  }
  return next();
}
