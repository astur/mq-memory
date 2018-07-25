const test = require('ava');
const mq = require('.');

test('stub', t => {
    t.pass();
    t.is(mq, mq);
});

test('add', t => {
    const q = mq();
    t.is(q.add(), 0);
    t.is(q.add([]), 0);
    t.is(q.add(null), 0);
    t.is(q.total(), 0);
    t.is(q.add('test'), 1);
    t.is(q.total(), 1);
    t.is(q.add(['test2', 'test3']), 2);
    t.is(q.total(), 3);
    t.is(q.waiting(), 3);
});

test.todo('get');
test.todo('ack');
test.todo('ping');
test.todo('tries');
test.todo('ttl');
test.todo('null-trie');
test.todo('insistent');
test.todo('size tries');
test.todo('size no-tries');
test('init items', t => {
    const q = mq({items: ['test1', 'test2']});
    t.is(q.total(), 2);
    t.is(q.waiting(), 2);
});
test.todo('queue options');
test.todo('get strict');
