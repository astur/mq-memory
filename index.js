module.exports = (db, {
    ttl = 30000,
    tries = 10,
    insistent = false,
    items = null,
    strict = false,
} = {}) => {
    const after = (ttl = 0) => Date.now() + ttl;
    const prepare = items => {
        if([null, undefined].includes(items)) return null;
        items = (Array.isArray(items) ? items : [items])
            .map(item => Object.assign(
                {data: item, created: after(), expires: 0},
                tries === null ? {} : {tries: 0},
            ));
        if(!items.length) return null;
        return items;
    };

    const store = prepare(items) || [];

    const total = () => store.length;

    const waiting = () => store.filter(v => v.expires <= after() && (tries === null || tries > v.tries)).length;

    const active = () => store.filter(v => v.expires > after()).length;

    const failed = () => tries === null ? 0 : store.filter(v => v.expires <= after() && tries <= v.tries).length;

    const stats = () => {
        const now = after();
        const st = {
            active: 0,
            waiting: 0,
            failed: 0,
        };
        store.forEach(v => {
            if(v.expires > now) st.active++;
            if(v.expires <= now && (tries === null || tries > v.tries)) st.waiting++;
            if(v.expires <= now && tries !== null && tries <= v.tries) st.failed++;
        });
        return st;
    };

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
