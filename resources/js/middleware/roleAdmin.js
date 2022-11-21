export default function roleAdmin({ store, next }) {
  if (
    !store.getters['auth/authenticated'] ||
    (!store.state.auth.roles.superAdmin && !store.state.auth.roles.admin)
  ) {
    return next({
      name: 'NotFound',
    });
  }
  return next();
}
