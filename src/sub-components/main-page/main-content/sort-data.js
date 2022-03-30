//1>2>3
const increaseDecreaseName = (a, b) => {
  let valueA = a.attributes.name_form.toUpperCase();
  let valueB = b.attributes.name_form.toUpperCase();
  return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
};
//3>2>1
const decreaseIncreaseName = (a, b) => {
  let valueA = a.attributes.name_form.toUpperCase();
  let valueB = b.attributes.name_form.toUpperCase();
  return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
};

const ObjectFilter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

export { increaseDecreaseName, decreaseIncreaseName, ObjectFilter };
