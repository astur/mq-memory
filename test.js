const test = require('ava');
const mq = require('.');

test('stub', t => {
    t.pass();
    t.is(mq, mq);
});
