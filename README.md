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

## Another example, searching for a line

Buscamos una línea. Hemos medido unos cuantos puntos que nos sirven para encontrarla. Con dos puntos debería alcanzarnos. Pero nuestras mediciónes no son perfectas. Cada par de puntos nos define una línea ligeramente diferente a las demás. Queremos, entonces, una línea que sea la "mejor aproximación" a los puntos que hemos medido.

Tomemos por ejemplo los puntos (2,5) (5,5) (7,8) (11,7) (14,9) (18,7) donde el primer punto del par define la coordenada _x_ y el segundo la coordenada _y_ en un sistema de coordenadas cartesiano ortogonal.

Organizemos estos puntos en una tabla:

|x|y|
|-|-|
|2|5|
|5|5|
|7|8|
|11|7|
|14|9|
|18|7|

Una forma de expresar la recta que buscamos es:

y = mx + b

que podemos expresar

mx + b = y

Ok. Busquemos entonces los valores _m_ y _b_, los coeficientes de nuestra ecuación de la recta.

Empecemos reemplazando _x_ e _y_ (los valores que conocemos) en cada uno de los puntos medidos.

m2 + b = 5

m5 + b = 5 

m7 + b = 8 

m11 + b = 7

m14 + b = 9

m18 + b = 7

(mirando las dos primeras ecuaciones vemos que m=0 y b=5) con lo cual la tercera ecuación queda expulsada del paraíso, junto con todas las demás. Ese es el problema al que nos enfentamos)

Ok.

Expresemos nuestras ecuaciones en forma matricial. La primera ecuación se puede expresar como 

[2 1][m b]<sup>T</sup> = 5

Si incorporamos la segunda ecuación tenemos 

[[2 1][5 1]][m b]<sup>T</sup> = [5 5]<sup>T</sup>

Si continuamos por este camino tenemos  

[[2 1][5 1][7 1][11 1][14 1][18 1]][m b]<sup>T</sup> = [5 5 8 7 9 7]<sup>T</sup>

Llamemos _A_ a nuestra matriz 

A = [[2 1][5 1][7 1][11 1][14 1][18 1]]

Llamemos _x_ (nada que ver con las x de los puntos, esta _x_ alude a un vector) a nuestro vector 

x = [m b]<sup>T</sup> (que contiene a los coeficientes que buscamos)

Y, llamemos _b_ al vector 

b = [5 5 8 7 9 7]<sup>T</sup>

Entonces podemos expresar nuestra búsqueda de una manera muy conveniente:

Buscamos x en la expresión...

> Ax=b

...conociendo que no tiene solución! No existe el vector _x_ tal que para cada una de las ecuaciones dadas...

> |Ax-b| = 0

... por lo menos una de esas ecuaciones nos va a producir esa diferencia con un valor distinto de cero.

Nos conviene elevar al cuadrado esas diferencias. Nos sacamos de encima el problema de los signos. A partir de ahora consideraremos, en vez de las diferencias, el cuadrado de ellas.

Y, dado que el sistema de ecuaciones no tiene solución, busquemos lo mejor que podemos, que obtengamos el menor de los valores que podamos sumando todos los cuadrados de las diferencias. 

Se puede demostrar (ver el documento del link en la descripción) que existe un sólo vector _x_ correspondiente a la ecuación _Ax = b_ para el cual la suma de los cuadrados de las diferencias es mínima.

Y se puede demostrar (ver el documento del link en la descripción, se lo recomendamos) que dicho vector se obtiene a partir de una no muy complicada, si muy divertida y elegante secuencia de operacione matriciales. 

 - Tomamos la matriz A
 - la transponemos
 - a la transpuesta la multiplicamos por A
 - invertimos el producto
 - a la inversa la multiplicamos por la transpuesta calculada
 - a este último producto lo multiplicamos por el vector b

 >x=(A<sup>T</sup>A)<sup>-1</sup>A<sup>T</sup>b


 y el resultado es un vector que contiene los coeficientes que buscamos! Que nos define una recta (que era lo que buscábamos) que es la mejor aproximación (decimos "aproximación por cuadrados mínimos") a los puntos que teníamos.

 ### ¿Y si ahora que la tenemos vemos que la recta está describiendo muy pobremente lo que estamos estudiando?

 La recta es un polinomio 
 
 y = Ax + B. 
 
 Tenemos dos incógnitas y seis puntos. Podemos darnos el lujo de incrementar el _grado_ y buscar el polinomio 

y = Ax<sup>2</sup> + Bx + C

Tenemos seis puntos y tres incognitas. Podemos ir más allá y buscar un polinomio de grado tres

y = Ax<sup>3</sup> + Bx<sup>2</sup> + Cx + D

Veamos este polinomio

...

Es decir que somos nosotros los que determinamos el grado del polinomio de acuerdo con nuestra conveniencia, con la restricción que nos dá la cantidad de puntos medidos (en nuestro caso, con una sola variable independiente, podemos llegar hasta el grado cinco, uno menos que la cantidad de puntos)

 ### ¿Y si buscábamos un plano, o, en general, una superficie?

 También acuden los polinomios en auxilio nuestro. En este caso tenemos los puntos en tres _dimensiones_, considerando que las variables independientes estan en un espacio _bidimensional_, el dominio.

 Por ejemplo, tomando el caso de un polinomio de grado 2 en un dominio bidimensional, tenemos:

 > y= Ax<sup>2</sup> + Bxy + Cy<sup>2</sup> + Dx + Ey + F

 Es un polinomio con seis coeficientes, por lo que necesitamos al menos seis puntos de datos.











