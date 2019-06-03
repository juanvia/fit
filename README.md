# fit

## solve.js

Returns the vector x in

> Ax=b
>
>where
>
>- A is a m x n matrix
>- x is a n-sized vector
>- b is a m-sized vector
>
>and m is greater than or equal to n

using the least squares method, i.e. calculates x from the formula

>x=(A<sup>T</sup>A)<sup>-1</sup>A<sup>T</sup>b

Actually this is the code:

solve.js
```
import { multiply, transpose, inv } from 'mathjs'

export default (A,b) => multiply(
  multiply(
    inv(
      multiply(
        transpose(A),
        A
      )
    ),
    transpose(A)
  ),
  b
)
```

## Usage

### We will obtain

> y = x<sup>2</sup> + 5

from these points:

> (0,5),  (1,6) and (2,9)

### Resolution

We need the coefficients a<sub>1</sub>, a<sub>2</sub> and a<sub>3</sub> in order to form the equation

> y = a<sub>1</sub>x<sup>2</sup> + a<sub>2</sub>x + a<sub>3</sub>

The general form of any parabole. 

In this example we have three point and three unknows, the fit will be exact.

Let's start with this table 

| Points        | x<sup>2</sup> | x          |     y       |
| ------------- |:-------------:| :---------:| :---------: |
| 1 (1,6)       | 1             | 1          | 6           |
| 2 (2,9)       | 4             | 2          | 9           |
| 3 (0,5)       | 0             | 0          | 5           |

then the matrix <b>A</b> will be:

```javascript
  [ [1, 1, 1],
    [4, 2, 1],
    [0, 0, 1]]
```

and the vector <b>b</b> will be:

(6,9,5) ...or [6 9 5]<sup>T</sup>


In javascript, using mathjs:

```javascirpt
import solve from '../solve'
import {matrix} from 'mathjs'

const A = matrix([
  [1, 1, 1],
  [4, 2, 1],
  [0, 0, 1]
])
const b = matrix([6, 9, 5])
console.log(solve(A,b)._data.map(e => e.toFixed(2)))
```

## Running it

```bash
juan@buschiazzo-pc:~/code/fit$ yarn simple
yarn run v1.10.1
$ babel-node --presets @babel/env examples/simple-parabole.js
[ '1.00', '-0.00', '5.00' ]
Done in 1.01s.

```

Firt element of the vector is the coefficient of x<sup>2</sup> (1 then we omit this coefficient), second element is the coefficient of x (0 then we discard the whole term) and the last element gives us the independent term (5))

... et voilà! the polinomial is:
>y=x<sup>2</sup>+5
