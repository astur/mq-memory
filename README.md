# mq-memory

Easy in-memory message queue. Same tool as [mq-mongo](https://github.com/astur/mq-mongo) but storing queue data in memory (not database).

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

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

## License

MIT

[npm-url]: https://npmjs.org/package/mq-memory
[npm-image]: https://badge.fury.io/js/mq-memory.svg
[travis-url]: https://travis-ci.org/astur/mq-memory
[travis-image]: https://travis-ci.org/astur/mq-memory.svg?branch=master