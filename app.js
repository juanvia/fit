const {
  multiply,
  subtract,
  transpose,
  inv,
  matrix,
  format,
} = require("mathjs");

const { sum, zip } = require("ramda");

const solve = (A, b) => {
  const transposed = transpose(A);
  const product = multiply(transposed, A);
  const inverse = inv(product);
  const pseudoInverse = multiply(inverse, transposed);
  const x = multiply(pseudoInverse, b);
  return x;
};

// const A = matrix([
//   [4, 2, 1],
//   [25, 5, 1],
//   [49, 7, 1],
//   [121, 11, 1],
//   [196, 14, 1],
//   [324, 18, 1],
// ]);

const A = matrix([
  [4, 2, 1],
  [25, 5, 1],
  [49, 7, 1],
  [121, 11, 1],
  [196, 14, 1],
  [324, 18, 1],
]);

const b = matrix([5, 5, 8, 7, 9, 7]);
const x = solve(A, b);
console.log(format(x, 5));
const residual = subtract(multiply(A, x), b);
const squares = residual.map((x) => x * x);
console.log(format(residual, 5));
console.log(format(squares, 5));

// const xs = [2, 5, 7, 11, 14, 18];
// const ys = [5, 5, 8, 7, 9, 7];

// const y = (x) => 0.171831 * x + 5.20094;

// const otherYs = xs.map(y);

// const yDifferences = zip(ys, otherYs).map(([y1, y2]) => y1 - y2);

// const cost = sum(yDifferences);

// console.log(yDifferences);
