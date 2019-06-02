import solve from '../solve'
import {matrix} from 'mathjs'

const A = matrix([
  [1, 1, 1],
  [4, 2, 1],
  [0, 0, 1]
])
const b = matrix([6, 9, 5])
console.log(solve(A,b)._data.map(e => e.toFixed(2)))
