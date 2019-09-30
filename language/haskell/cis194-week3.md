# Recursion patterns, polymorphism, and the Prelude

재귀적으로 문제를 해결하는 경우는 있지만 재귀 함수를 직접 작성하는 일은 거의 없다. 

재귀적으로 작성하다보면 공통적인 패턴을 발견하게 된다. 이러한 패턴을 라이브러리 함수로 추상화함으로써 구체적인 재귀 구현에 신경쓰지 않고 한 단계 더 높은 수준에서 사고할 수 있다. 이는 wholemeal programming 이 지향하는 바이다.


> Wholemeal programming better enables one to draw generalizations out of a problem space by encouraging him to view it from a higher level.
> 
> It means to think of the big picture - develop the general solution first, and then make more specific to the problem in hand (if you need to.)
>
> [What is wholemeal programming](https://www.quora.com/What-is-wholemeal-programming)


## Recursion pattern

`Int`를 값으로 가지는 리스트를 정의해보자

```haskell
data IntList = Empty | Cons Int IntList
    deriving Show
```

`IntList` 에 대해 수행할 수 있는 작업들이 무엇이 있을까?

* 리스트의 모든 원소에 정해지 연산을 적용
* 리스트의 각 원소를 검사하여 불필요한 원소들을 제거
* 리스트의 모든 원소를 어떤 방법으로 "Summarize(요약)"한다 (ex. sum, product..)
* 등등

## map - 리스트의 모든 원소에 정해진 연산을 적용

``` haskell
addOneToAll :: IntList -> IntList
addOneToAll Empty       = Empty
addOneToAll (Cons x xs) = Cons ((+) x 1) (addOneToAll xs)

absAll :: IntList -> IntList
absAll Empty       = Empty
absAll (Cons x xs) = Cons (abs x) (absAll xs)

squareAll :: IntList -> IntList
squareAll Empty       = Empty
squareAll (Cons x xs) = Cons ((*) x x) (squareAll xs)
```

`addOneToAll`, `absAll`, `squareAll` 함수에서 같은 패턴이 있다는 것을 알 수 있다. 우선 다른 부분은 `(+)`, `abs`, `(*)`와 같은 각 원소에 적용할 *함수*이다.

공통점들을 뽑아내어 `mapIntList` 함수를 만들어보자

```haskell
exampleList = Cons (-1) (Cons 2 (Cons (-6) Empty))

addOne x = x + 1
square x = x * x

mapIntList :: (Int -> Int) -> IntList -> IntList
mapIntList _ Empty = Empty
mapIntList f (Cons x xs) = Cons (f x) (mapIntList f xs)

mapIntList addOne exampleList
mapIntList abs    exampleList
mapIntList square exampleList

main = do
    print example1;
    print example2;
    print example3
```

## filter - 검사 결과에 따라 원소 걸러내기

```haskell
-- 리스트에서 짝수만 남긴다
keepOnlyEven :: IntList -> IntList
keepOnlyEven Empty = Empty
keepOnlyEven (Cons x xs)
  | even x    = Cons x (keepOnlyEven xs)
  | otherwise = keepOnlyEven xs
```

이 패턴을 어떻게 generalize(일반화) 할 수 있을까? 무엇이 동일하게 유지되고 무엇을 abstract 할 지 생각해보고 구현해보자.

## fold - 리스트 전체를 한 값으로 요약하기

리스트 전체를 한 값으로 요약하는 패턴으로 보통 fold 나 reduce 라고 부른다. 

> 다음 강의에서 다루기 떄문에 생략

## Polymorphism

`mapIntList` 는 `Int` 리스트만 처리한다. 다른 타입을 처리하는 함수를 만들고 싶으면 새 함수를 정의해야하는데 함수 구현이 거의 동일하다. 다른 점은 **type signature** 뿐이다.

하스켈은 데이터 타입과 함수에 대한 **polymorphism(다형성)**을 지원한다. 프로그래밍 언어에서 다형성이라는 말은 여러 타입에 대해 작동한다는 뜻이다.

> polymorphic (다형적인)이란 "여러 형태를 지니는" 이라는 의미이다

## Polymorphic data types

다형적인 데이터 타입을 선언하는 방법은 다음과 같다

```haskell
data List t = E | C t (List t)
```

> 여기서 `E` 와 `C` 를 사용한 이유는 `Empty` 와 `Cons`를 이미 위에서 사용했기때문. 하스켈에서 모든 데이터 생성자는 모두 같은 네임스케이스 안에 있기 때문에 유일한 이름을 가져야함


`data IntList = ...`에서는 `IntList`라는 타입 이름 뒤에 아무 것도 없었지만 `data List t = ...`에는 `t`라는 변수가 있다. 이 변수를 **type variable(타입 변수)** 라고 부르며 임의의 타입을 나타낸다. 

> 타입 변수는 소문자로 시작
> 타입 이름은 대문자로 시작

**"`List t` 타입은 `t`라는 타입을 파라미터로 받는 `List` 타입이다"** 라고 해석할 수 있다. 다른 말로는 **`List`가 파라미터화된 타입이다** 라고도 한다.

함수가 값을 파라미터로 받아서 다른 값을 내놓듯이, **파라미터화된 타입은 타입을 받아서 다른 타입을 만들어낸다.**

정리하자면, 어떤 타입 `t`가 주어지면 `List t`라는 타입은 `E`라는 (인자가 없는) 데이터 생성자와 `t` 타입의 값과 `List t` 타입의 값을 인자로 받는 `C` 생성자로 이뤄진다.

``` haskell
lst1 :: List Int
lst1 = C 3 (C 5 (C 2 E))

lst2 :: List Char
lst2 = C 'x' (C 'y' (C 'z' E))

lst3 :: List Bool
lst3 = C True (C False E)
```

위와 같이 사용할 수 있다.

## Polymorphic functions

```haskell
filterList _ E = E
filterList p (C x xs)
  | p x       = C x (filterList p xs)
  | otherwise = filterList p xs
```

`filterList` 함수를 추론한 타입을 살펴보자. 

> `:type filterList` 로 확인

`filterList :: (t -> Bool) -> List t -> List t` 라는 결과가 나온다. 이 타입 선언은 모든 `t`라는 타입에 대해 `filterList`는 `t`에서 `Bool`로 가는 함수를 받고, `List t` 를 받고, `List t`를 결과를 반환하는 함수라고 읽을 수 있다.

그럼 `mapIntList` 를 `List t` 에 대해 일반화한 `mapList` 함수가 있다고 하자. 이 함수의 타입은 `mapList :: (t -> t) -> List t -> List t` 와 같은 타입이라고 생각할 수 있다.

**이는 제약이 너무 심하다.** 입력으로 받은 리스트 원소 타입과 반환하는 리스트 원소 타입이 꼭 같을 필요는 없다. 따라서 다음과 같은 타입이 가장 일반적인 `mapList` 타입이 될 수 있다.

```haskell
mapList :: (a -> b) -> List a -> List b
mapList _ E        = E
mapList f (C x xs) = C (f x) (mapList f xs)
```

이렇게 정의된 다형적 함수를 사용할 때, 함수 정의 쪽이 아니라 **함수를 사용(호출, 적용)하는 쪽에서 타입을 선택한다는 점이 중요하다.** 다형적인 함수는 모든 가능한 타입 입력에 대해 정상 작동한다. 이런 특성은 - 어떤 값의 타입을 기반으로 직접 의사결정을 내리는 방법을 제공하지 않는다는 하스켈의 특성과 함께 - 나중에 설명하게 될 더 중요한 성질의 기반이 된다.

## Prelude

`Prelude`는 모든 하스켈 프로그램에 묵시적으로 임포트되는 표준 정의들이 들어있는 모듈이다.

> [Prelude 문서](https://hackage.haskell.org/package/base-4.10.1.0/docs/Prelude.html)를 보면 리스트를 다루는 다양한 다형적인 함수들 뿐만 아니라 여러가지 있는 것을 볼 수 있다.

유용한 다형적 타입 중 하나로 `Maybe`가 있다.

```haskell
data Maybe a = Nothing | Just a
```

`Maybe a` 라는 타입의 값은 내부에 `a` 타입의 값이 들어있거나, `Nothing` 이다.

> `a` 타입의 값이 들어있는 경우 `a` 타입의 값은 `Just` 생성자로 둘러싸여 있는 것을 볼 수 있다
>
> `Nothing`은 오류, 실패 등으로 인해 값이 없음을 의미

## Total and partial functions

다음과 같은 다형적인 타입이 있다고 하자

```
[a] -> a
```

이런 타입의 함수로는 대표적으로 `head` 함수가 있다. 만약 `head`에 빈 리스트가 들어가면 `badHead` 라는 에러가 발생하면서 프로그램이 중단된다. 빈 리스트를 보고 어떤 타입의 원소를 내놓아야 할지 결정할 수 없기 떄문이다.

> `head` 의 [소스코드](https://hackage.haskell.org/package/base-4.10.1.0/docs/src/GHC.List.html#head)를 보면 알 수 있다


이와 같이 `head` 함수를 **partial functioin** 라고 부른다. 다음과 같은 함수를 partial function 이라고 할 수 있다.

* 함수의 인자 타입에 속한 값 중 일부를 함수가 처리할 수 없는 함수
* 인자값 중 일부에 대해서만 부분적으로 정의된 함수

이와 반대로 모든 인자 값에 대해 잘 정의된 함수를 **total function** 이다.

**하스켈에서 가능하면 partial function를 피하자.**

`head` 는 하스켈의 실수라고 한다. `Prelude` 에 들어있는 다른 partial function 로는 `tail`, `init`, `last` `(!!)`가 있다. 이들은 가능하면 사용하지 말자.

## Replacing partial functions

`head`, `tail` 등의 함수를 **패턴 매칭**으로 대신할 수 있는 경우가 많다.

```haskell
doStuff1 :: [Int] -> Int
doStuff1 []  = 0
doStuff1 [_] = 0
doStuff1 xs  = head xs + (head (tail xs)) 

doStuff2 :: [Int] -> Int
doStuff2 []        = 0
doStuff2 [_]       = 0
doStuff2 (x1:x2:_) = x1 + x2
```

두 함수는 같은 결과를 내놓고 모두 total function 이다. 하지만 `doStuff2` 함수는 *obviously* 하게 total function 이며 어떤 일을 하는지 읽기도 쉽다.


## Writing partial functions

만약 partail function 을 직접 작성해야하는 경우 **함수의 출력 타입을 실패로 표현할 수 있는 타입으로 바꾸자**. 대표적으로 `Maybe` 타입이 있다.

```haskell
safeHead :: [a] -> Maybe a
safeHead [] = Nothing
safeHead (x:_) = Just x
```
 
> 실제 `safe` 패키지를 보면 이와 똑같은 일을 하는 `headMay` 함수가 있다

이러한 접근 방법은 어떤 이점이 있을까?

1. `safeHead` 는 절대 프로그램을 중단하지 않음
2. `safeHead` 의 타입을 보면 입력 중 일부는 `safeHead`가 제대로 작동하지 않는다는 사실을 알 수 잇음
3. 타입 시스템이 `safeHead`의 반환 값을 검사해 `Nothing`을 제대로 처리하게 강제해줌

어떤 의미에서 `safeHead`도 partial function 이다. 하지만 partiality 를 타입 시스템에 반영한점이 `head`와 다르다. **goal은 type이 함수에 대해 가능한 많은 정보를 제공하는 것이다.**

만약 항상 빈 리스트가 들어오지 않음을 *guaranteed* 하는 경우에만 `head`를 사용한다면?

그런 경우 `Maybe a` 사용해야 한다면 절대로 벌어질 수 없다는 사실을 이미 알고 있는데도 굳이 `Nothing`을 고려해야한다는 점에서 짜증날 것이다.

답은 실제 그런 조건이 *guaranteed* 된다면 타입에서 표현해야 한다. 타입에 그 사실을 보장하면 컴파일러가 검사를 해준다.

```haskell
data NonEmptyList a = NEL a [a]

nelToList :: NonEmptyList a -> [a]
nelToList (NEL x xs) = x:xs

listToNel :: [a] -> Maybe (NonEmptyList a)
listToNel []     = Nothing
listToNel (x:xs) = Just $ NEL x xs

headNEL :: NonEmptyList a -> a
headNEL (NEL a _) = a

tailNEL :: NonEmptyList -> [a]
tailNEL (NEL _ as) = as
```

> The `$` operator is a function itself:
>
> `f $ x = f x`
>
> If you have a function `(\f -> f x)` you can reduce it to `($ x)`. In other words `map ($ x) fs` is equal to `map (\f -> f x) fs`.
>
> [Application Operator (Or $)](https://www.reddit.com/r/haskell/comments/9r4dn8/application_operator_or/)

## Reference

[재귀 패턴, 다형성, 프렐류드](http://enshahar.com/haskell/cis194/recursion/pattern/prelude/2018/01/06/cis194-recursion/)

[Recursion patterns, polymorphism, and the Prelude](https://www.cis.upenn.edu/~cis194/spring13/lectures/03-rec-poly.html)

