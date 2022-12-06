import { createRouter, createWebHistory } from 'vue-router';
import { trackRouter } from 'vue-gtag-next';
import routes from '@/router/routes.js';
import store from '@/store';
import middlewarePipeline from '@/middleware/middlewarePipeline';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }

  const { middleware } = to.meta;

  const context = {
    to,
    from,
    store,
    next,
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1),
  });
});

trackRouter(router);

export default router;
