# (Variant 3)

Набір утиліт для роботи з масивами об'єктів.

## Реалізовані функції:
1. **groupBy** — групування за ключем.
2. **sortBy** — сортування за кількома полями.
3. **partition** — розділення масиву за умовою.
4. **pluck** — отримання масиву значень за ключем.
5. **uniqBy** — фільтрація дублікатів.

## Приклад використання (Currying):
const { pluck } = require('./src/collection-utilities');
const getUsersNames = pluck('name'); 
const names = getUsersNames([{name: 'Ivan'}, {name: 'Oleg'}]);

## Приклад ланцюжка (Chaining):
const result = chain(users).sortBy(['age']).pluck('name').value();
