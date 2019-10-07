# Higher-order programming and type inference

## Anonymous functions

`100` 보다 큰 `Integer` 를 함수를 작성한다고하자.

```haskell
-- Type
greaterThan100 :: [Integer] -> [Integer]
-- 하는 일
greaterThan100 [1, 2, 3, 100, 102, 103] -- [102, 103]
```

`greaterThan100` 은 다음과 같이 작성할 수 있다.

```haskell
gt100 :: Integer -> Bool
gt100 x = x > 100

greaterThan100 xs = filter gt100 xs
```

`gt100` 와 같이 일회성 함수에 일일히 이름을 붙여야 한다면 꽤 귀찮을 것이다. 이때 **Lambda abstraction(람다 추상화)** 를 사용할 수 있다.

```haskell
greaterThan100_2 :: [Integer] -> [Integer]
greaterThan100_2 xs = filter (\x -> x > 100) xs
```

`\x -> x > 100` 람다식은 `x`를 인자로 받아 `x > 100` 결과를 반환하는 함수이다.

> `\` 는 그리스 문자 람다(λ)를 표현한 것이다.

당연히 람다가 인자를 여러개 받을 수도 있다.

```haskell
(\x y z -> [x, y+1, z+3]) 5 6 3 -- [5 8, 6]
```

`greaterThan100` 와 같은 경우는 람다를 사용하지 않고 좀 더 간결하게 함수를 정의할 수 있다.

```haskell
greaterThan100_3 :: [Integer] -> [Integer]
greaterThan100_3 xs = filter (>100) xs
```

여기서 `(>100)` 은 **operator section** 이라고 한다. 

> 어떤 연산자 `?` 가 있다면
>
> `(?y)` 는 `\x -> x ? y`
> 
> `(y?)` 는 `\x -> y ? x`
>

operator section 을 사용하면 연산자를 두 피연산자 중 하나에만 **partially apply (부분적으로 적용)** 할 수 있어 인자를 하나만 받는 함수를 얻을 수 있다.

## Function composition

다음과 같은 타입의 함수를 정의해보자

```haskell
(b -> c) -> (a -> b) -> (a -> c)
```

이 함수는 인자가 2개 있다고 할 수 있고 두 인자 모두 함수이다. 함수의 이름은 `foo` 라고 하자. 각 인자에 일단 `f`, `g` 라는 이름을 붙이겠다.

```haskell
foo f g = ...
```

`...` 는 결과가 `a -> c` 인 함수가 되게 만들어야 한다. 일단 람다 추상화를 사용하여 함수를 만들 수 있으니 일단 람다를 하나 넣어보자.

```haskell
foo f g = \x -> ...
```

`x`의 타입은 `a`이다. 람다의 body 부분(`...`)의 타입은 `c` 이다. `f` 와 `g`의 타입은 다음과 같다.

* `f` 는 `b -> c` 타입
* `g` 는 `a -> b` 타입

우리는 `f`, `g` 를 이용하여 다음과 같이 함수를 작성할 수 있다.

```haskell
foo f g = \x -> f (g x)
```

> TODO: `g x` 에 괄호를 치는 이유는??

`foo` 함수는 **function composition (함수 합성)** 이다. 하스켈에서는 `(.)` 라는 연산자로 함수 합성할 수 있다. `f . g`는 `g` 를 먼저 인자에 적용한 다음, 그 결과에 `f`를 적용하는 연산이다.

> 함수 합성을 사용하면 **간결**하고 **우아하게** 코드를 작성할 수 있다. 이는 *wholemeal programming* 스타일 코딩에 유용하다. 
>
> **데이터 구조에 대해 고수준의 변환을 연속적으로 적용하고 싶을 때** `(.)` 를 사용할 수 있기 때문이다.


다음 예제를 보자

```haskell
myTest :: [Integer] -> Bool
myTest xs = even (length (greterThan100 xs))

-- (.) 를 사용
myTest2 :: [Integer] -> Bool
myTest2 = even . length . greaterThan100 -- 위 함수보다 더 명확하고 간결
```

이 예제를 보면 함수 적용이 역방향이기 떄문에 함수 합성이 역방향으로 일어나는 것을 볼 수 있다. 

> 1734년 Alexis Claude Clairaut 와 Euler 가 `f(x)` 라는 표기법을 채택했기 때문에 이 전통을 따른 것으로 보인다.

ghci 에서 `(.)` 타입을 살펴보자

```haskell
-- Prelude> :t (.) 로 확인
(.) :: (b -> c) -> (a -> b) -> a -> c
```

`a -> c` 에는 왜 괄호가 없는 걸까?

## Currying and partial application

```haskell
f :: Int -> Int -> Int
f x y = 2 * x + y
```

이 타입에는 멋진 이유가 있다. 그 비밀을 알아보자!

**하스켈의 모든 함수는 인자가 오직 하나 뿐이다.** 위 함수 `f`는 인자가 2개 아닌가? 사실 그렇지 않다. 실제로 `f`는 인자를 하나만 받아서 함수를 반환(`Int -> Int`)하는 함수이다. `f` 가 반환하는 함수는 인자를 받아서 최종 결과를 리턴한다. 따라서 `f` 타입을 다음과 같이 작성할 수 있다.

```haskell
f :: Int -> (Int -> Int)
```

특히, 함수 타입의 `->` 는 *오른쪽 결합법칙 (associate to the right)* 을 따른다. 따라서 어떤 타입의 가장 오른쪽에 있는 화살표를 감싸는 괄호는 생략이 가능하다.

> `W -> X -> Y -> Z` 는 `W -> (X -> (Y -> Z))` 와 같다

반면에, **Function application (함수 적용)** 은 *왼쪽 결합법칙 (left-associative)* 를 따른다. 즉 `f 3 2` 는 `(f 3) 2` 로 해석된다. 이런 결합 법칙은 앞에서 `f` 가 인자를 하나 받아서 함수를 반환한다는 설명과 맞아 떨어진다.

1. `f 3 2` 에서 `Int -> Int` 타입의 함수를 반환하는 `f` 에 `3`을 먼저 적용.
2. `f 3` 가 반환하는 함수는 `Int` 를 받아 `6` 을 더하는 함수. 
3. 이 함수에 다시 `2`를 적용. 따라서 `(f 3) 2` 라고 쓸 수 있음

함수 적용은 왼쪽 결합법칙을 따르기 때문에 `(f 3) 2` 를 `f 3 2` 처럼 괄호를 생략할 수 있어 인자가 둘 이상인 함수를 멋지게 표현할 수 있다.

인자가 여러개인 람다식을 보자.

``` haskell
\x y z -> ...
```

이 식은 실제로 밑의 식의 syntatic sugar 이다.

```haskell
\x -> (\y -> (\z -> ...))
```

마찬가지로 다음과 같은 함수 정의도 

```haskell
f x y z = ...
```

밑의 식의 syntatic sugar 이다.

``` haskell
f = \x -> (\y -> (\z -> ...))
```

이런 특징을 활용하면 앞에서 본 합성 함수 (`foo`, haskell prelude `.`)에서 `\x -> ...` 등을 등호의 왼쪽으로 옮길 수 있다.

```haskell
foo :: (b -> c) -> (a -> b) -> a -> c
foo f g = f (g x)
```

이런 식으로 인자가 하나인 함수를 가지고 인자가 여러개의 함수를 표현하는 방법을 **Currying (커링)** 이라고 한다. 

만약, 함수가 인자를 2개 받아야 한다면 튜플을 사용하자. 

```haskell
-- 튜플을 통해 인자를 2개 받는 함수라고 생각할 수 있다
ff :: (Int, Int) -> Int
ff (x, y) = 2 * x + y
```

하지만 이 함수는 튜플 타입의 인자 1개를 받는 함수라고 생각할 수도 있다. 이렇게 인자가 2개인 함수를 표현하는 2가지 방식을 오가는 함수로 하스켈에는 `curry` 와 `uncurry`가 있다. 이 함수는 다음과 같이 정의할 수 있다.

```haskell
currry :: ((a, b) -> c) -> a -> b -> c
currry f x y = f (x, y)

-- 위 정의는 밑의 정의와 같다
currry2 = \f -> \x -> \y -> f (x, y)

uncurrry :: (a -> b -> c) -> (a, b) -> c
uncurrry f (x, y) = f x y

-- 위 정의는 밑의 정의 같다
-- tuple@(x,y)는 tuple 이라는 인자를 받아 튜플의 두 값을 x,y 로 분해해 사용한다
uncurrry2 = \f -> \tuple -> f (fst tuple) (snd tuple)
uncurrry3 = \f -> \tuple@(x,y) -> f x y 
uncurrry4 = \f -> \(x,y) -> f x y
```

특히 어떤 튜플 값이 있을 때 그 튜플을 함수에 적용해햐 한다면 `uncurry` 가 유용하다.

```haskell
uncurry (+) (2, 3) -- 5
```

### Partial application

Partial application 이란 인자가 여럿 있는 함수에서 일부 인자만을 제공하고 나머지 인자는 제공하지 않고 비워두는 것이다. 하스켈에서는 커링을 사용하기 때문에 **partial application(부분 적용)** 을 활용하기 쉽다.

> **Partial application** 이란?
>
> **Application** : 함수의 계산을 위해 매개변수를 바인딩하는 과정
>
> **Partial Application** : 매개변수 중 일부만 적용 (모두 바인딩하면 return value 가 떨어지기때문), 지연연산 처리에 응용
>
> [옆집사는 ‘함수’형 탐방기](https://www.youtube.com/watch?v=1u_iCHOE8sE)

하스켈에서는 인자가 여러개인 함수는 없다. 따라서 하스켈에서는 함수의 첫번째 인자만 partial application 하면 나머지 인자를 필요로 하는 새로운 함수를 얻을 수 있다.

하지만 첫번째 인자가 아닌 중간의 인자를 partial application 하기는 쉽지 않지만 중위 연산자의 경우는 예외이다. `?` 와 같은 중위 연산자가 있으면 이를 사용해 두 인자중 하나를 partial application 할 수 있다. (이를 section 이라고 부른다) 

partial application 을 감안해 파라미터 순서를 정할 때 **"변화할 여지가 가장 적은 것을 앞에 배치하고 자주 변하는 파라미터를 뒤에 배치"** 해야한다. 즉, 인자 중에서 같은 값이 적용되는 경우가 가장 자주 있는 인자를 맨 앞에 배치하고, 가장 자주 바뀌는 인자를 맨뒤에 배치해야한다.


### Wholemeal programming

"Wholemeal programming" 스타일의 코딩을 해보자.

```haskell
foobar :: [Integer] -> Integer
foobar [] = 0
foobar (x:xs)
    | x > 3 = (7*x + 2) + foobar xs
    | otherwise = foobar xs
```

이 코드는 다음과 같은 이유로 하스켈 스타일의 코드라고 할 수 없다.

* 한번에 너무 많은 일을 함
* 너무 저수준에서 작업을 수행

리스트의 각 원소에 어떤 일을 수행하자라고 생각하지말고, 리스트를 전체적으로 어떻게 변환시켜 나가야 할지 생각해야한다. 이때 **Recursion pattern** 을 활용해야한다.

```haskell
foobar2 :: [Integer] -> Integer
foobar2 = sum . map (\x -> 7*x + 2) . filter (>3)
```
`foobar2` 는 3가지 함수를 파이프라인처럼 연결되어있다. 다음과 같이 해석할 수 있다.

1. 먼저 리스트에서 3보다 큰 원소를 `filter` 로 선택 
2. 3보다 큰 원소를 람다로 정의한 산술 연산을 적용
3. 산술 연산을 적용한 결과를 모두 더함

> `filter` 의 타입은  `(a -> Bool) -> [a] -> [a]`
>
> `filter (>3)` 는 `[Integer] -> [Integer]` 함수를 얻을 수 있고 이 함수는 `[Integer]` 에 적용할 수 있는 다른 함수들과 합성이 가능

이렇게 코딩을 하면 함수를 정의할 때 인자를 특별히 참조하지 않고 코딩하게 된다. 어떤 의미에서 이는 **"함수가 어떤 일을 하는가 (what a function does)"** 보다 **"그 함수는 어떤 존재인가 (what a function is)"** 를 기술하는 것이다.

이를 **point-free (포인트 프리)** 스타일의 프로그래밍이라고 부른다. 항상 point-free 스타일을 고수하는 사람이 있는데 아래 결과를 보면 알 수 있듯이 항상 코드를 개선하는 것은 아니다.

```haskell
@pl \f g x y -> f (x ++ g x) (g y)
join . ((flip . ((.) .)) .) . (. ap (++)) . (.)
```

>  `@pl` 이라는 명령은 IRC `#haskell` 채널에 있는 `lambdabot`이 함수를 포인트 프리 식으로 바꿔주는 명령이다.

### Point-free programming

포인트 프리 프로그래밍은 `(.)` 연산자를 사용하지 않는 프로그래밍이 아니다. 여기서 포인트라는 말은 함수가 적용되는 대상인 값을 가리키는 변수를 의미한다. 예를 들어 다음을 보자.

```haskell
sum (x:xs) = x + sum xs
sum [] = 0
```

이 코드에서는 `x`, `xs`, `[]` 등의 인자가 직접 드러나 있다. 이런 경우는 포인트 프리 프로그램이 아니다. 하지만 이를 `foldr` 을 사용해 다음과 같이 정의하면 인자가 없기 때문에 포인트 프리 스타일이 된다.

``` haskell
sum = foldr (+) 0
```

[하스켈 기초CIS194 4강 - 고차 프로그래밍과 타입 추론 – 오현석(Frank)의 블로그](http://enshahar.com/haskell/cis194/high/order/programming/2018/01/14/cis194-HighOrderProgramming-TypeInference/) 참고

## Folds

리스트에 대한 Recursion pattern 중에 **fold** 에 대해 알아보자. 다음 함수들에서 공통 패턴이 있는데 바로 리스트에서 원소를 어떤 방법을 사용하여 하나로 묶는 것이다.

```haskell
sum' :: [Integer] -> Integer
sum' []     = 0
sum' (x:xs) = x + sum' xs

product' :: [Integer] -> Integer
product' [] = 1
product' (x:xs) = x * product' xs

length' :: [a] -> Int
length' []     = 0
length' (_:xs) = 1 + length' xs
```

고차 함수를 사용하면 공통 부분과 달라지는 부분을 쉽게 추상화 할 수 있다.

```haskell
fold :: b -> (a -> b -> b) -> [a] -> b
fold z f []     = z
fold z f (x:xs) = f x (fold z f xs)
```

`fold` 함수를 보면 결국 리스트에서 `[]` 를 `z`로 대치하고, `(:)` 를 `f`로 대치한다. 즉, 다음과 같다.

```haskell
fold f z [a, b, c] == a `f` (b `f` (c `f` z))
```

(이런 관점에서 `fold` 를 생각해보면 리스트가 아닌 다른 데이터 타입에 대해 `fold` 를 어떻게 더 일반화할 수 있을지 알수도 있을 것이다)

`fold` 를 사용하여 앞의 세 함수를 다시 작성해보자

```haskell
sum`` = fold 0 (+)
product`` = fold 1 (*)
length`` = fold 0 (\_ s -> 1 + s)
```

> `\_ s -> 1 + s` 는 `\_ -> (1+)` 또는 `const (1+)` 로도 적을 수 있다
>
> `const (1+)` 에 대해서는 [하스켈 기초CIS194 4강 - 고차 프로그래밍과 타입 추론 – 오현석(Frank)의 블로그](http://enshahar.com/haskell/cis194/high/order/programming/2018/01/14/cis194-HighOrderProgramming-TypeInference/) 를 참고하자.

prelude 에는 이미 `fold` 와 같은 역할을 하는 함수가 있다. 바로 `foldr` 이다. 다만 `foldr` 의 인자는 여기서 본 정의와 순서가 다르지만 기능을 동일하다. 

TODO: 다음 함수를 foldr 로 정의해보자

```haskell
length :: [a] -> Int
sum :: Num a => [a] -> a
product :: Num a => [a] -> a
and :: [Bool] -> Bool
or :: [Bool] -> Bool
any :: (a -> Bool) -> [a] -> Bool
all :: (a -> Bool) -> [a] -> Bool
```

`foldl` 도 있는데 이는 왼쪽부터 fold 하는 함수이다. `foldr` 과 `foldl` 은 다음과 같다.

```haskell
foldr f z [a,b,c] == a `f` (b `f` (c `f` z))
foldl f z [a,b,c] == ((z `f` a) `f` b) `f` c
```

일반적으로 `Data.List` 에 정의된 `foldl'` 을 사용하는 것을 권장하는데 `foldl'` 이 `foldl` 보다 효율이 더 좋기 때문이다.
