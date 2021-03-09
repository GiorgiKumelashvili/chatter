import router from '@/router/router';

const isLoggedIn = () => localStorage.getItem('authenticated');

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && !isLoggedIn()) next({ name: 'Login' });
    else next();
});
