module.exports = (db, {
    ttl = 30000,
    tries = 10,
    insistent = false,
    items = null,
    strict = false,
} = {}) => {
    const store = [];

    const after = (ttl = 0) => Date.now() + ttl;

    const total = () => store.length;

    const waiting = () => store.filter(v => v.expires <= after() && (tries === null || tries > v.tries)).length;

    const active = () => store.filter(v => v.expires > after()).length;

    const failed = () => tries === null ? 0 : store.filter(v => v.expires <= after() && tries <= v.tries).length;

    const stats = () => {};

    const add = () => {};

    const get = () => {};

    const ack = () => {};

    const ping = () => {};

    return {
        add,
        get,
        ack,
        ping,
        total,
        waiting,
        active,
        failed,
        stats,

        get options(){
            return {ttl, tries, insistent};
        },
    };
};
