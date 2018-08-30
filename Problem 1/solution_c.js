const sum_to_n = n => {
  let x = 0;
  let summation = 0;

  while (x < n + 1) {
    summation += x;
    x++;
  }
  return summation;
};
