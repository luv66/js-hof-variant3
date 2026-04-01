const { chain, groupBy, pluck } = require('./src/collection-utilities');

const users = [
  { id: 1, name: 'Oleg', role: 'admin' },
  { id: 2, name: 'Ivan', role: 'user' },
  { id: 3, name: 'Alice', role: 'admin' }
];

console.log('--- Тест pluck ---');
console.log(pluck('name', users));

console.log('\n--- Тест Chaining (Сортування та вибір імен) ---');
const result = chain(users)
  .sortBy(['name'])
  .pluck('name')
  .value();

console.log(result);