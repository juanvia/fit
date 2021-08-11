const { multiply, transpose, inv, matrix, format } = require( "mathjs")

const solve = (A, b) => {
  const transposed    = transpose(A)
  const product       = multiply(transposed, A)
  const inverse       = inv(product)
  const pseudoInverse = multiply(inverse,transposed)
  const x             = multiply(pseudoInverse, b)
  return x
}

const A = matrix([[2,1],[5,1],[7,1],[11,1],[14,1],[18,1]])
const b = matrix([5,5,8,7,9,7]);

console.log(format(solve(A, b),5))
