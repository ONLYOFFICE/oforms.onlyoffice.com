//1>2>3
const increaseDecreaseName = (a, b) => {
  let valueA = a.name.toUpperCase();
  let valueB = b.name.toUpperCase();
  return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
};
//3>2>1
const decreaseIncreaseName = (a, b) => {
  let valueA = a.name.toUpperCase();
  let valueB = b.name.toUpperCase();
  return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
};

const ObjectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

export { increaseDecreaseName, decreaseIncreaseName, ObjectFilter };
