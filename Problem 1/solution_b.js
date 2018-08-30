const sum_to_n = n => {
  const arr = Array.from(Array(n + 1).keys());

  const summation = arr.reduce((i, a) => i + a);

  return summation;
};
