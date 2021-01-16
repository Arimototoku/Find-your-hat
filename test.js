const array = [
  [1, 2],
  [3, 4],
  [5, 6],
];

array[1][0] = "a";
const array2 = [7, 8];

array.push(array2);

console.log(array.join(" - "));

console.log();