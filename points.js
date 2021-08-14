const {range, reverse, map, forEach,identity, curry } = require('ramda')
const line = (degree, x) => 
  map(exp=>x**exp, reverse(range(0,degree+1)))

const points = [[2,5],[5,5],[7,8],[11,7],[14,9],[18,7]]
console.log(line(2,2))
const point = curry((degree, p) => {
  console.log({degree,p})
})

const deg = degree => {
  console.log(`Degree: ${degree}`)
  forEach(point(degree),points)
}

forEach(deg,range(1,7))