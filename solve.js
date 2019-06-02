import {multiply, transpose, inv} from 'mathjs'
export default (A,b) => multiply(multiply(inv(multiply(transpose(A),A)),transpose(A)),b)
