class Func {
    static scrollToBottom(id) {
        if (!id) return;

        const el = document.getElementById(id);
        setTimeout(() => {
            el.scrollTop = el.scrollHeight;
        }, 100);
    }

    static getDarkMode() {
        let isDark = localStorage.getItem('darkMode') ?? false;

        if (typeof isDark !== 'undefined' && isDark !== null) {
            isDark = isDark == 'true';
        }

        return isDark;
    }
}

export default Func;
