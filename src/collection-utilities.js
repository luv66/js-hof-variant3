// Функція для каррування
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...args2) => curried.apply(this, args.concat(args2));
  };
};

// 1. groupBy
const groupBy = curry((prop, data) => {
  return data.reduce((acc, obj) => {
    const key = typeof prop === 'function' ? prop(obj) : obj[prop];
    (acc[key] = acc[key] || []).push(obj);
    return acc;
  }, {});
});

// 2. sortBy (багатокритеріальне)
const sortBy = curry((properties, data) => {
  return [...data].sort((a, b) => {
    for (const prop of properties) {
      const [key, order = 'asc'] = Array.isArray(prop) ? prop : [prop];
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
});

// 3. partition
const partition = curry((predicate, data) => {
  return data.reduce((acc, val) => {
    acc[predicate(val) ? 0 : 1].push(val);
    return acc;
  }, [[], []]);
});

// 4. pluck
const pluck = curry((key, data) => data.map(obj => obj[key]));

// 5. uniqBy
const uniqBy = curry((prop, data) => {
  const seen = new Set();
  return data.filter(item => {
    const key = typeof prop === 'function' ? prop(item) : item[prop];
    return seen.has(key) ? false : seen.add(key);
  });
});

// Реалізація Chaining (ланцюжків)
const chain = (data) => {
  return {
    data,
    pluck(key) { return chain(pluck(key, this.data)); },
    groupBy(prop) { return chain(groupBy(prop, this.data)); },
    sortBy(props) { return chain(sortBy(props, this.data)); },
    value() { return this.data; }
  };
};

module.exports = { groupBy, sortBy, partition, pluck, uniqBy, chain };