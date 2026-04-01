const { uniqBy } = require('../src/collection-utilities');

const largeData = Array.from({ length: 10000 }, (_, i) => ({
  id: i % 100,
  name: `User ${i}`
}));

console.time('Timer');
uniqBy('id', largeData);
console.timeEnd('Timer');