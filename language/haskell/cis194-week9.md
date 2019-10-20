# Functors

## Motivation

컨테이너의 모든 요소에 "map" 할 수 있도록 설계된 여러 함수를 보았다. 예를 들어

``` haskell
map :: (a -> b) -> [a] -> [b]
treeMap:: (a -> b) -> Tree a -> Tree b

-- Homework5
maybeEval :: (ExprT -> Int) -> Maybe ExprT -> Maybe Int
maybeMap :: (a -> b) -> Maybe a -> Maybe b

```

여기서 우리는 반복되는 패턴을 발견할 수 있다. 어느 부분이 다르고 공통점은 무엇인지 파악하여 일반화할 수 있다. 

다른 부분은 바로 "mapped over" 된 컨테이너이다.

```haskell
thingMap :: (a -> b) -> f a -> f b
```

컨테이너라는 것들은 어떤 것들이 있으며 `f` 와 같은 type variable 를 할당할 수 있을까?

## A brief digression on kinds

모든 표현식에 type 이 있는 것처럼 type 에는 kinds 라고 불리는 "types" 가 있다. ghci 에서는 `:kind` 를 사용하여 tpyes 의 kinds 를 볼 수 있다. `Int` 의 kind 가 무엇인지 살펴보자.

```
Prelude> :k Int
Int :: *
```

`Int` 는 `*` kind 를 가지고 있다. 실제로 type of some values 를 가지고 있는 모든 type 은 kind `*` 를 가지고 있다.

```
Prelude> :k Bool
Bool :: *
Prelude> :k Char
Char :: *
Prelude> :k Maybe Int
Maybe Int :: *

```

`Maybe Int` 가 kind `*` 를 가지고 있다면 `Maybe` 는 어떨까? `Maybe` 에는 values of type 이 없다. `Maybe Int` type 과 `Maybe Bool` type 의 values 는 있지만 `Maybe` type 은 없다. `Maybe` 는 어쩌면 type 과 비슷할지도 모른다. 

```haskell
Prelude> :k Maybe
Maybe :: * -> *
```

확인해보니 `Maybe` 는 kind `* -> *` 를 가지고 있다. 어떤 의미에서 `Maybe` 는 a function on types 이다(우리는 보통 이를 type constructor 라고 부른다). `Maybe` 는 input types 으로 kind `*` 를 사용하고 다른 kind`*` 의 type 을 생성한다. 예를 들어 입력 `Int :: *` 를 사용하여 새로운 type `Maybe Int :: *` 를 생성할 수 있다.

kind `* -> *` 를 가지는 다른 type constructor 는 어떤 것들이 있을까? `Tree` 또는 `[]` 와 같은 type constructors 가 있다.

``` haskell
Prelude> :k []
[] :: * -> *
Prelude :k [] Int
[] Int :: *
Prelude> :k [Int]  -- special syntax for [] Int
[Int] :: *
Prelude> :k Tree
Tree :: * -> *

```

다른 종류의 type constructors 는 어떨까? Homework7 의 `JoinList` 는 어떨까?

``` haskell
data JoinList m a = Empty
		  | Single m a
		  | Append m (JoinList m a) (JoinList m a)

```

```
Prelude> :k JoinList
JoinList :: * -> * -> *
```

`JoinList` 는 매개변수로 two types 를 가지고 new type 을 다시 제공하는 것을 예상할 수 있다 (물론 curried 때문에 매개변수로 one type 을 가지고 `* -> *` 를 돌려주는 것으로 생각할 수 있다)

다른 하나는 다음과 같다

```
Prelude> :k (->)
(->) :: * -> * -> *
```

이는 함수 type constructor 가 2개의 type arguments 를 취한다는 의미이다. 다른 연산자와 마찬가지로 infix 로 사용한다.

```
Prelude> :k (->) Int Char
(->) Int Char :: *
```

좋았으! 그럼 이거는 어떨까?

```haskell
data Funny f a = Funny a (f a)
```

```
Prelude> :k Funny
Funny :: (* -> *) -> * -> *
```

`Funny` 는 2개의 arguments 를 가진다. 첫번째로 kind `* -> *`, 그리고 두번쨰로 kind `*`. (ghci 는 `Funny` 의 kind 를 어떻게 알까? 그것은 type inference 처럼 kind inference 를 한다). `Funny` 는`map` 이 higher-order function 인 것 처럼 higher-order type constructor 이다. 

> Note
>
> function 과 마찬가지로 types 도 partially applied 될 수 있다

``` haskell
Prelude> :k Funny Maybe
Funny Maybe :: * -> *
Prelude> :k Funny Maybe Int
Funny Maybe Int :: *
```

## Functor

mapping pattern 의 본질은 다음 type 과 같은 higher-order function 이다.

```haskell
thingMap :: (a -> b) -> f a -> f b
```

여기서 `f` 는 어떤 type of kind `* -> *` 와 같은 type variable 이다. 그렇다면 이 type 의 function 을 한번에 작성할 수 있을까?

```haskell
thingMap :: (a -> b) -> f a -> f b
thingMap h fa = ???
```

음.. 글쎄..  `f` 가 무엇언지 모른다면 할 수 있는 일은 많지 않다. `thingMap` 은 특정 `f` 마다 다르게 작동해야한다. 해결책은 `Functor` 라는 type class 를 만드는 것이다.

``` haskell
class Functor f where
    fmap :: (a -> b) -> f a -> f b
```

> Note
>
> `Functor` 는 Prelude 에 이미 정의되어 있으며 "functor" 라는 이름은 카테고리 이론에서 비롯된 것으로 C++ 의 functors 와 같지 않다 (기본적으로 first-class functions 이다). 

이제 우리는 f 로 다양한 클래스를 정의할 수 있다. `Functor` 클래스는 types of kind `* -> *` 을 추상화(abstract)한다. 따라서 밑에 처럼 코드를 작성하는 것은 의미없다.

```haskell
instance Functor Int where
	fmap = ...
```

실제로 위와 같이 코드를 작성하면 *kind mismatch error* 가 발생하는 것을 볼 수 있다.

```
[1 of 1] Compiling Main             ( 09-functors.lhs, interpreted )

09-functors.lhs:145:19:
    Kind mis-match
    The first argument of `Functor' should have kind `* -> *',
    but `Int' has kind `*'
    In the instance declaration for `Functor Int'
```

그러나 `Maybe` 와 같은 `Functor` 인스턴스를 만드는 것은 의미가 있다.

``` haskell
instance Functor Maybe where
	fmap _ Nothing = Nothing
	fmap h (Just a) = Just (h a)

instance Functor [] where
	fmap _ [] = []
	fmap f (x:xs) = f x : fmap f xs
	-- or just
	-- fmap = map
```

Functor for IO 인스턴스를 만드는 것을 어떨까?

`fmap :: (a -> b) IO a -> IO b` 는 `IO` action 을 먼저 실행하여 `IO a` action 을 먼저 실행하고 반환하기 전에 함수를 적용하여(applies the function) 결과를 변환한다. 어려움없이 이것을 구현할 수 있다.

``` haskell
instance Functor IO where
	fmap f ioa = ioa >>= (\a -> return (f a))
```

또는 다음과 같이 작성할 수 있다.

``` haskell
instance Functor IO where
	fmap f ioa = ioa >>= (return . f)
```

이제 다른 것들을 시도해보자.

```haskell
instance Functor ((->) e) where
```

음...!! 일단 types 을 보자. `f = (->) e` 이면

```haskell
fmap :: (a -> b) -> (->) e a -> (->) e b
```

또는 `(->)` 를 infix 로 작성하면

```haskell
fmap :: (a -> b) -> (e -> a) -> (e -> b)
```

Hmm, 이 type signature 는 뭔가 익숙하다.

```haskell
instance Functor ((->) e) where
	fmap = (.)
```

와우! 이것은 무엇을 의미할까? type `(e -> a)` 의 value 을 생각하는 한 가지 방법은 `e` 의 각 value 에 대해 `a` value 가 하나인 "e-indexed container" 이다. 이러한 컨테이너의 모든 value 에 대해 function 을 map 하는 것은 function composition 과 정확히 일치한다. 적용하여 원래 컨테이너에서 `a`를 선택한 다음 `(a -> b)` 함수를 적용하여 선택했던 element 를 변환한다.

## Reference & Further More

[Haskell's kind system - a primer](https://diogocastro.com/blog/2018/10/17/haskells-kind-system-a-primer/#fn:void)

[inhabited set](https://ncatlab.org/nlab/show/inhabited+set)

[Difference between a type and a set](https://math.stackexchange.com/questions/489369/difference-between-a-type-and-a-set)

[Kind - HaskellWiki](https://wiki.haskell.org/Kind)

[Type inhabitation - wiki](https://en.wikipedia.org/wiki/Type_inhabitation)

[Kind(type theory) - wiki](https://en.wikipedia.org/wiki/Kind_(type_theory))

[Container(type theory) - wiki](https://en.wikipedia.org/wiki/Container_(type_theory))
