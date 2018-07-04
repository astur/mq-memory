const test = require('ava');
const mq = require('.');

test('stub', t => {
    t.pass();
    t.is(mq, mq);
});

test.todo('add');
test.todo('get');
test.todo('ack');
test.todo('ping');
test.todo('tries');
test.todo('ttl');
test.todo('null-trie');
test.todo('insistent');
test.todo('size tries');
test.todo('size no-tries');
test.todo('init items');
test.todo('queue options');
test.todo('get strict');
