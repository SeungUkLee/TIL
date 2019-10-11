# `foldr`, `foldl`, `foldl'`

하스켈에서는 `foldr`, `foldl`, `foldl'` 를 지원하는데 어떤 차이점이 있는지 알아보자

## foldr
매우 큰 리스트의 합을 구한다고하자.
```haskell
> veryBigList = [1..1000000]

> foldr f z [] = z
> foldr f z (x:xs) = x `f` foldr f z xs

> sum1 = foldr (+) 0
> try1 = sum1 veryBigList
```

`try1`을 평가(evaluate)하면 `Exception: stack overflow` 가 발생하는 것을 볼 수 있다.

왜 발생할까?
```haskell
try1 -->
sum1 veryBigList -->
foldr (+) 0 veryBigList -->

foldr (+) 0 [1..1000000] -->
1 + (foldr (+) 0 [2..1000000]) -->
1 + (2 + (foldr (+) 0 [3..1000000])) -->
1 + (2 + (3 + (foldr (+) 0 [4..1000000]))) -->
1 + (2 + (3 + (4 + (foldr (+) 0 [5..1000000])))) -->
-- ...
-- ...  스택이 충분히 크다고 가정하자
-- ...
1 + (2 + (3 + (4 + (... + (999999 + (foldr (+) 0 [1000000]))...)))) -->
1 + (2 + (3 + (4 + (... + (999999 + (1000000 + ((foldr (+) 0 []))))...)))) -->

1 + (2 + (3 + (4 + (... + (999999 + (1000000 + 0))...)))) -->
1 + (2 + (3 + (4 + (... + (999999 + 1000000)...)))) -->
1 + (2 + (3 + (4 + (... + 1999999 ...)))) -->

1 + (2 + (3 + (4 + 500000499990))) -->
1 + (2 + (3 + 500000499994)) -->
1 + (2 + 500000499997) -->
1 + 500000499999 -->
500000500000

```

문제는 `(+)`가 두개의 arguments 에 엄격하기(strict) 때문이다. 즉, `(+)`가 결과를 반환하기 전에 두 인수를 모두 평가 해야한다. 그래서 다음과 같이 평가된다

``` haskell
1 + (2 + (3 + (4 + (...))))
```

`1` 을 스택에 push 하고

``` haskell
2 + (3 + (4 + (...)))
```

평가되고, `2` 을 스택에 push 하고

``` haskell
3 + (4 + (...))
```

평가되고, `3` 을 스택에 push 하고

``` haskell
4 + (...)
```

평가되고, `4`을 스택에 push 하고....

결국에는 스택은 가득차고 stack overflow exception 이 발생한다.

이 문제를 해결하는 방법을 생각해보자

## foldl
(+)'s chain 의 한 가지 문제점은 마지막까지 더 이상 reduced 될 수 없다.

chain에 reduced 될 수 있는 expression이 포함되어 있지 않기 때문이다. 다음 요소(element)로 가기 전에 expression 을 줄일 수 있을까?

우리는 다른 방법으로 chain 을 만들어 redex 를 도입할 수 있다. `1 + (2 + (3 + (...)))` 와 같은 형태를 `(((0 + 1) + 2) + 3) + ...` 로 만들면 항상 redex 할 수 있다.

우리는 `foldl` 함수를 사용하여 위와 같은 형태의 체인을 만들 수 있다.

```haskell
> foldl f z [] = z
> foldl f z (x:xs) = let z' = z `f` x
						in foldl f z' xs
> sum2 = foldl (+) 0
> try2 = sum2 veryBigList
```

`try2`가 평가되는 순간! 두근두근

```
*** Exception: stack overflow
```

**????!!!**

왜 stack overflow 가 발생하는지 살펴보자.. :(

```haskell
try2 -->
sum2 veryBigList -->
foldl (+) 0 veryBigList -->

foldl (+) 0 [1..1000000] -->

let z1 =  0 + 1
in foldl (+) z1 [2..1000000] -->

let z1 =  0 + 1
    z2 = z1 + 2
in foldl (+) z2 [3..1000000] -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
in foldl (+) z3 [4..1000000] -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
in foldl (+) z4 [5..1000000] -->

-- ... after many foldl steps ...

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
in foldl (+) z999997 [999998..1000000] -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
    z999998 = z999997 + 999998
in foldl (+) z999998 [999999..1000000] -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
    z999998 = z999997 + 999998
    z999999 = z999998 + 999999
in foldl (+) z999999 [1000000] -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
    z999998 = z999997 + 999998
    z999999 = z999998 + 999999
    z100000 = z999999 + 1000000
in foldl (+) z1000000 [] -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
    z999998 = z999997 + 999998
    z999999 = z999998 + 999999
    z100000 = z999999 + 1000000
in z1000000 -->

-- 이제 + 의 큰 체인이 만들어진다:

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
    z999998 = z999997 + 999998
    z999999 = z999998 + 999999
in z999999 + 1000000 -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
    z999998 = z999997 + 999998
in  (z999998 + 999999) + 1000000 -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
in  ((z999997 + 999998) + 999999) + 1000000 -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
in  (((z999996 + 999997) + 999998) + 999999) + 1000000 -->

-- ...
-- ... 스택 오버플로우가 발생하지 않았다고 가정하자
-- ...

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
in  (((((z4 + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
in  ((((((z3 + 4) + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

let z1 =  0 + 1
    z2 = z1 + 2
in  (((((((z2 + 3) + 4) + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

let z1 =  0 + 1
in  ((((((((z1 + 2) + 3) + 4) + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

(((((((((0 + 1) + 2) + 3) + 4) + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

-- Now we can actually start reducing:

((((((((1 + 2) + 3) + 4) + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

(((((((3 + 3) + 4) + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

((((((6 + 4) + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

(((((10 + 5) + ...) + 999997) + 999998) + 999999) + 1000000 -->

((((15 + ...) + 999997) + 999998) + 999999) + 1000000 -->

(((499996500006 + 999997) + 999998) + 999999) + 1000000 -->

((499997500003 + 999998) + 999999) + 1000000 -->

(499998500001 + 999999) + 1000000 -->

499999500000 + 1000000 -->

500000500000 -->

```

분명히 redexes 가 생성되었다. 그러나 redcued 되는 대신 heap 에 할당된다.

```haskell
let z1 =  0 + 1
    z2 = z1 + 2
    z3 = z2 + 3
    z4 = z3 + 4
    ...
    z999997 = z999996 + 999997
    z999998 = z999997 + 999998
    z999999 = z999998 + 999999
    z1000000 = z999999 + 1000000
in z1000000

```

> Note that your heap is only limited by the amount of memory in your system (RAM and swap). So the only thing this does is filling up a large part of your memory.

마지막으로 `z1000000` 을 평가할 때 문제가 발생한다. `z1000000 = z999999 + 1000000`을 평가해야하므로 스택에 `1000000` 이 푸시되고 그런 다음 `z999999` 가 평가된다.

스택이 가득차고 결국 스택 오버플로우가 발생한다.

`foldr`에서 겪었던 문제인데.. 단지 (+) 체인의 방향이 오른쪽에서 왼쪽으로 간다는 것을 알 수 있다.

그렇다면 왜 chain이 이전보다 빨리 reduce 되지않을까?

이는 GHC의 **lazy reduction strategy** 때문이다. 그래서 필요한 경우에만 expression 이 reduced 된다. 이 경우에는 outer-left-most redexes 가 가장먼저 redcued 된다. 이 경우 반복적으로 reduced 되는 outer `foldl (+) ... [1..10000]` redexes 이다. 따라서 inner `z1, z2, z3, ...` redexes 는 `foldl` 이 완전히 사라질 때 reduced 된다.


## foldl'

우리는 어떻게 inner redex 가 outer 보다 먼저 reduce 되어야한다고 시스템에게 알릴 수 있을까? `seq` 함수를 사용하면 가능하다.

```haskell
seq :: a -> b -> b
```

`seq` 는 x 와 y 에 applied 될 때 먼저 x 를 reduce 하고 y를 반환하는 primtive system 함수이다. 이 아이디어는 y 가 x를 참조하므로 y가 reduce 될 때 x는 더 이상 unreduced chain 이 아니다.

```haskell
> foldl' f z [] = z
> foldl' f z (x:xs) = let z' = z `f` x
						 in seq z' $ foldl' f z' xs

> sum3 = foldl' (+) 0
> try3 = sum veryBigList
```

드디어 `try3`가 평가되어 답을 빠르게 얻을 수 있다 !!

```haskell
500000500000
```

무슨 일이 일어 발생했는지 보자.

```haskell
try3 -->
sum3 veryBigList -->
foldl' (+) 0 veryBigList -->

foldl' (+) 0 [1..1000000] -->
foldl' (+) 1 [2..1000000] -->
foldl' (+) 3 [3..1000000] -->
foldl' (+) 6 [4..1000000] -->
foldl' (+) 10 [5..1000000] -->
-- ...
-- ... 더 이상 스택오버플로우는 발생하지 않는다
-- ...
foldl' (+) 499999500000 [1000000] -->
foldl' (+) 500000500000 [] -->
500000500000
```

inner redex 가 반복적으로 reduced 된다는 것을 볼 수 있다.

## 결론
`foldl` 과 `foldl'` 은 strictness 을 제외하고는 동일하므로 `foldr` 과 `foldl'` 중 선택하는 것이 일반적이다.  따라서 둘 다 결과를 반환하면 결과는 동일해야한다. `fold'`은 huge thunk를 만들지 않기 때문에 가장 효율적으로 결과를 받을 수 있다. 그러나 combing 함수의 첫 번쨰 인수에서 lazy 한 경우, `foldl`은 `foldl'`은 예외가 발생하는 반면 `foldl`은  결과를 얻을 수 있다.

```haskell
> (?) :: Int -> Int -> Int
> _ ? 0 = 0
> x ? y = x * y
> list :: [Int]
> list = [2, 3, undefined, 5, 0]
> okay = foldl (?) 1 list
> boom = foldl' (?) 1 list
```

어떤 일이 발생하는지 살펴보자.

```haskell
okey -->
foldl (?) 1 [2,3,undefined,5,0] -->
foldl (?) (1 ? 2) [3,undefined,5,0] -->
foldl (?) ((1 ? 2) ? 3) [undefined,5,0] -->
foldl (?) (((1 ? 2) ? 3) ? undefined) [5,0] -->
foldl (?) ((((1 ? 2) ? 3) ? undefined) ? 5) [0] -->
foldl (?) (((((1 ? 2) ? 3) ? undefined) ? 5) ? 0) [] -->
((((1 ? 2) ? 3) ? undefined) ? 5) ? 0 -->
0

boom -->
foldl' (?) 1 [2,3,undefined,5,0] -->
    1 ? 2 --> 2
foldl' (?) 2 [3,undefined,5,0] -->
    2 ? 3 --> 6
foldl' (?) 6 [undefined,5,0] -->
    6 ? undefined -->
*** Exception: Prelude.undefined
```

`foldl'`에서 예외가 발생한 것을 볼 수 있다. `seq`와 관련된 함수는 top-most(최상위) constructor 만 평가한다.

accumulator가 더 복잡한 object인 경우, `fold'`은 여전히 평가되지 않는 thunks를 형성한다.  값을 필요한만큼 강제하는 strict한 데이터 타입 또는  함수를 도입할 수 있다. Failing that, the "brute force" solution is to use [deepseq](http://hackage.haskell.org/package/deepseq) . For a worked example of this issue, see [Real World Haskellchapter 25](http://book.realworldhaskell.org/read/profiling-and-optimization.html#id678431) .

## Rules of Thumb for Folds

fold는 하스켈에서 유용한 기능 중 하나이다. 다른 언어에서 사용하는 loop (반복문) 같은 것들을 대체하기도 하지만 더 많은 일들을 할 수 있다. 다음은 fold를 사용할 때 몇 가지 팁들이다.

`foldr`은 right fold 뿐만 아니라 list (or other foldables)를 동일한 순서로 관련 요소가 있는 list로 변환할 때 사용한다. 특히 `foldr`은 infinit list를 다른 infinit list로 변환할 때 효과적이다.  예를 들어 `foldr (:) [] == id` 와 같이 사용할 수 있다.

`foldr`을 infinite list 에 적용할 때는 initial element는 관련이 없다.  따라서 `foldr f []`를 `foldr f undefined`로 대체하는 것 처럼 infinite list에만 적용해야하는 함수를 작성할 때 좋은 방법이 될 수 있다. infinite list에만 적용되어야하며 finite list에 적용하려고하면 오류가 발생할 수 있다.


`foldr` 과 `foldl'`은 다음과 같은 차이점을 가진다고 볼 수 있다.

* `foldl'`은 개념적으로 리스트의 순서를 반대로 바꾼다. 한 가지 결과는 infinite list에 적용되는 `foldl'`(unlike  `foldr`)이 bottom이 된다는 것이다(?). `reverse` 와 달리 사용 가능한 결과는 나오지 않는다.
>  `foldl' (flip (:)) [] == reverse`

* `foldl'`은 `foldr`보다 보통 더 좋은 time and space perfermance를 확보할 수 있다.

두 가지 경우에 `foldl'`을 선택해야한다.

* applied 되는 list가 크지만 확실히 유한한 경우 implicit reversal (예를 들어, combining 함수가 `(+)`, `(*)` 또는 `Set.union`과 같은 commutative 하기 때문에) 에는 신경 쓰지 않는다. 코드 성능을 향상시키는데 집중하자.
* 실제로 element에 다른 transformation을 수행하는 것 외에도 list 의 순서를 reverse 하고 싶을 때 특히, fold를 reverse로 시작하거나 follow 하는 것을 발견하면 다른 fold 방식을 사용하고 implicit reverse 를 이용하여 코드를 향상시킬 수 있다.(?)

이전 섹션과 같이 특별한 경우를 제외하고는 `foldl`은 사용하지 않는 것이 좋다.

integer list 의 마지막 자릿수의 곱을 계산하는 fold를 작성한다고 해보자. 이런 경우 유한한 list 인 경우이며  list 의 순서에 의존하지 않기 때문에 `foldl'`을 사용하는 것이 좋다.

GHC 7.10.2에서 실행한 결과, `foldl' (\a e -> (mode10) a) 1 [1..10^7]`는 422ms 만에 컴파일되었으며(all of calculation), 힙 영역에 400 MBytes 이상 할당되었다.  반면에 `foldr (\a e -> (mod e 10)*a) 1 [1..10^7]`은 컴파일 시간이 2203ms 이었으며(the same 422ms calculation time and 1781ms of garbage collection), 550 MByte 이상 힙영역에 할당되었다.  `foldr`은 결과를 평가하지 전에 스택에 계속 쌓이며 이는 garbage collected 대상이다.

조금만 더 생각해보자. fold 가 0 인 숫자에 도달하면 더 이상 평가할 필요가 없다. 실제로 `foldr (\e a -> if mod e 10==0 then 0 else (mod e 10)*a) 1 [1..10^7]` 의 run-time 은 0ms 이며 50 kBytes 보다 적게 힙영역에 할당되었다. 이 fold는 `[1..10^100]` 또는 `[1..]`와 같은 범위에서 빠르게 실행된다. 

lef fold는 short-circuit 될 수 없다.  `foldl' (\a e -> if mod e 10==0 then 0 else (mod e 10)*a) 1 [1..10^7]`을 실행하면 781 ms 와 500 MBytes 이상 힙영역에 할당되는 것을 볼 수 있다: right fold는 말할 것도 없고 원래 left fold보다 열등하다.

## Reference

[Foldr Foldl Foldl'](https://wiki.haskell.org/Foldr_Foldl_Foldl') 