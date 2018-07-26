const test = require('ava');
const delay = require('delay');
const mq = require('.');

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

test('get', t => {
    const q = mq();
    q.add('test1');
    q.add(['test2', 'test3']);
    t.deepEqual(
        [
            q.get(),
            q.get(),
            q.get(),
            q.get(),
        ].map(v => v === null ? v : v.data),
        ['test1', 'test2', 'test3', null],
    );
    t.is(q.total(), 3);
});

test('expiring', async t => {
    const q = mq();
    q.add(['test1', 'test2', 'test3']);
    t.is(q.get(1).data, 'test1');
    await delay(10);
    t.is(q.get().data, 'test2');
    t.is(q.get().data, 'test3');
    t.is(q.get().data, 'test1');
    t.is(q.get(), null);
});

test.todo('ack');
test.todo('ping');
test.todo('tries');
test.todo('ttl');
test.todo('null-trie');

test('insistent', async t => {
    const q = mq({insistent: true});
    q.add(['test1', 'test2']);
    t.is(q.get(1).data, 'test1');
    await delay(10);
    t.is(q.get().data, 'test1');
});

test('size tries', async t => {
    const q = mq({tries: 1});
    t.deepEqual(q.stats(), {active: 0, failed: 0, waiting: 0});
    q.add(Array(9).fill(''));
    q.get(1);
    await delay(10);
    q.get(1);
    await delay(10);
    q.get(1);
    await delay(10);
    q.get();
    q.get();
    t.deepEqual(await q.stats(), {active: 2, failed: 3, waiting: 4});
    t.is(q.total(), 9);
    t.is(q.waiting(), 4);
    t.is(q.active(), 2);
    t.is(q.failed(), 3);
});

test('size no-tries', async t => {
    const q = mq({tries: null});
    t.deepEqual(q.stats(), {active: 0, failed: 0, waiting: 0});
    q.add(Array(9).fill(''));
    q.get(1);
    await delay(10);
    q.get(1);
    await delay(10);
    q.get(1);
    await delay(10);
    q.get();
    q.get();
    t.deepEqual(await q.stats(), {active: 2, failed: 0, waiting: 7});
    t.is(q.total(), 9);
    t.is(q.waiting(), 7);
    t.is(q.active(), 2);
    t.is(q.failed(), 0);
});

test('init items', t => {
    const q = mq({items: ['test1', 'test2']});
    t.is(q.total(), 2);
    t.is(q.waiting(), 2);
});

test('queue options', t => {
    const q = mq();
    t.deepEqual(q.options, {ttl: 30000, tries: 10, insistent: false});
});

test('get strict', t => {
    const q = mq({strict: true});
    q.add('test');
    q.get();
    const e = t.throws(() => q.get());
    t.deepEqual(e.stats, {active: 1, failed: 0, waiting: 0});
    t.is(e.name, 'QueueGetError');
});
