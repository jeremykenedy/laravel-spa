export default function guest({ store, next }) {
  if (store.getters['auth/authenticated']) {
    return next({
      name: 'dashboard',
    });
  }

  return next();
}
