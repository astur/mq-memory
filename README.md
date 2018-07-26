# mq-memory

Easy in-memory message queue. Same tool as [mq-mongo](https://github.com/astur/mq-mongo) but storing queue data in memory (not database).

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

> #### Note:
> This tool is much easier and quicker then `mq-mongo`. Use it if you have no big amount of data and if you don't need persistent queue between script starts.

## Install

```bash
npm i mq-memory
```

## Usage

```js
const mq = require('mq-memory');
const q = mq(options);
q.get().then(msg => {/* Do something */});
```

#### options

* __`options.ttl`__ - time-to-live (ms) for taken message before it will be acked or returned to queue. Defaults to 30000.
* __`options.tries`__ - just how many times single message may be taken and returned to queue without ack. Defaults to 10.
* __`options.strict`__ - if `true` method `get` will work in strict mode (throws error instead of returning `null`). Defaults to `false`.
* __`options.insistent`__ - if `true` then `get` will begins from last failed (returned to queue without ack) messages. If `false` then `get` follow 'FIFO' rule.
* __`options.items`__ - message or array of messages for adding to queue on start.

#### methods

* __`q.add(something)`__ - adds single message or array of messages to queue. Returns number of added messages.
* __`q.get(ttl)`__ - gets message from queue. Optional parameter is individual `ttl` for that specific message. Returns message object if there is messages ready. If no waiting messages returns `null` or (if `options.strict` set to `true`) throws error.
* __`q.ack(tag)`__ - deletes successfully handled message (specified by tag field) from queue. Returns `tag` string of deleted message or null (if no message with such tag or if ttl expires).
* __`q.ping(tag, ttl)`__ - prolong ttl of message specified by tag field. Optional parameter `ttl` defaults to `options.ttl` of queue.
* __`q.waiting()`__ - returns quantity of messages in queue.
* __`q.active()`__ - returns quantity of messages in work (waiting for ack).
* __`q.failed()`__ - returns quantity of failed messages (all tries is over).
* __`q.total()`__ - returns total quantity of messages (sum of three above).
* __`q.stats()`__ - returns object with quantities of waiting, active and failed messages.
* __`q.options()`__ - getter, returns object with some options (`{ttl, tries, insistent}`).

#### message fields

* __`msg.data`__ - payload data of message.
* __`msg.created`__ - time (unix TS, number) when message was added to queue.
* __`msg.expires`__ - time (unix TS, number) when message will returns to queue.
* __`msg.tries`__ - just how many times this message was getted from queue.
* __`msg.tag`__ - unique tag for this try (for use in `ack` and `ping`).

## License

MIT

[npm-url]: https://npmjs.org/package/mq-memory
[npm-image]: https://badge.fury.io/js/mq-memory.svg
[travis-url]: https://travis-ci.org/astur/mq-memory
[travis-image]: https://travis-ci.org/astur/mq-memory.svg?branch=master