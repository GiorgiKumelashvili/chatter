class Func {
    static scrollToBottom(id) {
        if (!id) return;

        const el = document.getElementById(id);
        setTimeout(() => {
            el.scrollTop = el.scrollHeight;
        }, 100);
    }
}

export default Func;
