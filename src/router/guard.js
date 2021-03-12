import router from '@/router/router';
import Back from '@/utils/Back';

router.beforeEach(async (to, from, next) => {
    const authenticated = await Back.isAuthenticated();

    if (to.name !== 'Login' && !authenticated) next({ name: 'Login' });
    else if (to.name == 'Login' && authenticated) next({ name: 'Home' });
    else next();
});
