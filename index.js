module.exports = (db, {
    name = 'mq',
    ttl = 30000,
    tries = 10,
    insistent = false,
    items = null,
    strict = false,
} = {}) => {
    const total = () => {};

    const waiting = () => {};

    const active = () => {};

    const failed = () => {};

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
