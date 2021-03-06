export const splitArray = (array, n = 5) => {
  let rows = [...Array(Math.ceil(array.length / n))];
  let data = rows.map((row, idx) => array.slice(idx * n, idx * n + n));
  return data;
};
