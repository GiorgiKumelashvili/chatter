import router from '@/router/router';
import Func from '@/utils/Func';

router.beforeEach(async (to, from, next) => {
    const authenticated = await Func.isAuthenticated();

    if (to.name !== 'Login' && !authenticated) next({ name: 'Login' });
    else if (to.name == 'Login' && authenticated) next({ name: 'Home' });
    else next();
});
