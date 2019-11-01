# Applicative - part 2

**Functor** 및 **Applicative** type classes 를 살펴보자.

```haskell
class Functor f where
  fmap :: (a -> b) -> f a -> f b

class Functor f => Applicative f where
  pure  :: a -> f a
  (<*>) :: f (a -> b) -> f a -> f b
```

모든 Applicative 는 Functor 이다. 따라서 `pure` 와 `<*>` 를 이용하여 `fmap` 을 구현할 수 있다.

```haskell
fmap g x = pure g <*> x
```

....

이제 Applicative 인스턴스의 몇 가지 예를 살펴보자.

## More Applicative Examples

### Lists

lists 에 대한 Applicative 인스턴스는 어떨까? 실제로 두 가지 인스턴스가 있다. 하나는 함수의 list 와 인수의 list를 element 별로 일치시킨다 (that is, it "zips" them together). 다른 하나는 함수와 인수를 가능한 모든 방법으로 결합한 것이다.

먼저 가능한 모든 조합을 수행하는 인스턴스를 작성해보자 (For reasons that will become clear next week, this is the default instance.). 이 관점에서 list 는 nondeterminism(비결정적) 이 나타난다. 
// TODO:
즉, `[a]` 타입의 값은 여러 가능성을 가진 단일 값으로 생각할 수 있다.  그런 다음 `(<*>)`는 nondeterministic function application(비결정적 함수 애플리케이션)에 해당한다.  즉 비결정적 함수를 비결정적 인수에 적용하는 것이다.

```haskell
instance Applicative [] where
  pure a        = [a]          -- a "deterministic" value
  [] <*> _      = []
  (f:fs) <*> as = (map f as) ++ (fs <*> as)
```

하나의 예시를 보자

```haskell
names  = ["Joe", "Sara", "Mae"]
phones = ["555-5555", "123-456-7890", "555-4321"]

employees1 = Employee <$> names <*> phones
```

이 예제는 크게 의미가 없지만 이런 식으로 모든 것을 결합하려는 상황을 상상해보자. 예를 들어 다음과 같이 nondeterministic arithmetic(비결정적 산술)을 수행할 수 있다.

```haskell
(.+) = liftA2 (+)    -- addition lifted to some Applicative context
(.*) = liftA2 (*)     -- same for multiplication

-- nondeterministic arithmetic
n = ([4,5] .* pure 2) .+ [6,1] -- (either 4 or 5) times 2, plus either 6 or 1

-- and some possibly-failing arithmetic too, just for fun
m1 = (Just 3 .+ Just 5) .* Just 8
m2 = (Just 3 .+ Nothing) .* Just 8
```

다음으로 요소 단위로 결합하는 인스턴스를 작성해보자.  먼저 중요한 질문에 답해야한다: 길이가 다른 list 는 어떻게 처리할까? 한 가지 생각은 더 긴 list 를 더 짧은 list 만큼 자르고 여분의 elements 는 버리는 것이다. 다른 답변으로는 마지막 요소를 복사하여 더 짧은 list 를 확장하는 것이다(하지만 list 중 하나가 비어 있는 경우에는 어떻게 할 것인가?). 또는 "neutral" element 로 더 짧은 list를 확장한다(그러나 Monoid 인스턴스 또는 application 에 대한 "default" 인수가 필요하다). 

이 결정은 우리가 법칙을 준수해야하므로 pure 를 어떻게 구현해야 하는지 결정할 수 있다.

```haskell
pure f <*> xs === f <$> xs
```

오른쪽은 xs 와 같은 길이의 list 이며 xs의 모든 요소에 f를 적용하여 형성된다.  왼쪽을 똑같이 만들 수 있는 유일한 방법은 pure 가 x의 길이를 미리 알지 못하기 때문에 무한한 f 의 사본을 만드는 것이다.

우리는 다른 list 인스턴스와 구별하기 위해 `newtype` wrapper 를 사용하여 인스턴스를 구현한다. 표준 `Prelude`에 있는 `zipWith` 도 편리하다. 

```haskell
newtype ZipList a = ZipList { getZipList :: [a] }
  deriving (Eq, Show, Functor)

instance Applicative ZipList where
  pure = ZipList . repeat
  ZipList fs <*> ZipList xs = ZipList (zipWith ($) fs xs)
```

다음과 같이 사용할 수 있다.

```haskell
employees2 = getZipList $ Employee <$> ZipList names <*> ZipList phones
```

### Reader / environment

`(->) e` 에 대한 예제를 보자.  "environment" `e`에서 "reading"가 가능하기 때문에 reader 또는 environment applicative 로 알려져 있다. 

```haskell
instance Functor ((->) e) where
  fmap = (.)

instance Applicative ((->) e) where
  pure = const
  f <*> x = \e -> (f e) (x e)
```

`Employee` 예제이다.

```haskell
data BigRecord = BR { getName         :: Name
                    , getSSN          :: String
                    , getSalary       :: Integer
                    , getPhone        :: String
                    , getLicensePlate :: String
                    , getNumSickDays  :: Int
                    }

r = BR "Brent" "XXX-XX-XXX4" 600000000 "555-1234" "JGX-55T3" 2

getEmp :: BigRecord -> Employee
getEmp = Employee <$> getName <*> getPhone

ex01 = getEmp r
```


## Aside: Levels of Abstraction

언뜻보기에 Applicative 와 Fuctor 는 차이가 없어보인다. 하지만 그렇지 않다. Applicative (그리고 Monad)는 **"model of computation"** 이라고 부를 자격이 되지만 Functor 는 그렇지 않다.

Applicative 및 Monad 와 같은 작업을 수행 할 때는 *multipe levels of abstraction* (여러 수준의 추상화)가 필요하다는 점을 명시해야한다.  대략적으로 말하면 abstraction 은 lower level 의 세부사항을 감추고 lower level 에 대해 신경쓰기 않고도 사용할 수 있는 higer level 인터페이스를 제공한다. abstraction 의 계층에 대한 아이디어는 널리 퍼져있다.  user programs--OS--kernel--integrated circuits--gates--silicon, 또는 HTTP--TCP--IP--Ethernet, 또는 programming languages--bytecode--assembly--machine code. 하스켈은 하스켈 프로그램 자체내에서(*Haskell programs themselves*) 여러 계층의 abstraction 을 구성할 수 있는 훌륭한 도구를 제공한다. 바로 "programming language" layer stack 을 동적으로 확장한다. 이는 강력하지만 혼란을 초래할 수 있다. 명시적으로 여러 수준에 대해 생각하고 수준간에 전환하는 법을 배워야한다.

**Applicative** 및 **Monad** 와 관련하여 특히 고려해야 할 두가지 수준이 있다.  첫 번째는 다양한 Applicative 및 Monad 인스턴스을 구현하는 수준이다. (i.e. the "raw Haskell" level) **Parser**에 대한 애플리케이션 인스턴스를 구현할 때 이전 숙제에서 이 수준에 대해 경험하였다. 

**Parser** 와 같은 type 에 대한 **Applicative** 인스턴스가 있으면 요점은 *Applicative* 인터페이스를 사용하여 "move up a layer" 할 수 있다.  (**Parser** 와 **Applicative** 인스턴스가 실제고 어떻게 구현되는지에 대한 세부 사항을 생각할 필요없이). 지난주 숙제에 대해 약간의 경험을 쌓았으며 이번 주에 더 많이 얻을 것이다. 이 수준에서의 프로그래밍은 실제로 인스턴스를 구현하는 것과는 매우 다른 느낌이다. 몇 가지 예를 보자.

## The Applicative API
**Applicative** 와 같은 통합 인터페이스를 사용하면 얻을 수 있는 이점 중 하나는 Applicative 의 인스턴스에 해당하는 모든 type 에 작동하는 generic tools 및 control structures 를 작성할 수 있다. 다음 예제를 보자.

```haskell
pair :: Applicative f => f a -> f b -> f(a, b)
```

`pair`는 두 개의 값을 가져와 짝을 짓는다 (but all in the context of some Applicative f).  `(<$>)` 및 `(<*>)` 를 사용하여 인수에 대해 paring 및 "lift" 할 수 잇는 함수를 사용할 수 있다.

```haskell
pair fa fb = (\x y -> (x, y)) <$> fa <*> fb
```

우리는 Haskell 의 `(,)` syntax 를 이용하여 조금 단순화 할 수 있다.

```haskell
pair fa fb = (,) <$> fa <*> fb
```
 
우리는 이전에 이러한 패턴을 보았다. 바로 liftA2 패턴이다. 그래서 더 단순화할 수 있다.

```haskell
pair fa fb = liftA2 (,) fa fb
```

이제 함수 인수를 명시적으로 작성할 필요가 없으니 최종적으로 다음과 같이 단순하게 작성할 수 있다.

```haskell
pair = liftA2 (,)
```

자, 이 함수는 무엇을 할까? 물론 선택한 특정 `f`에 따라 다르다. 여러 가지 예를 살펴보자.

1. `f = Maybe`
인수 둘 다 `Just`이면 결과는 `Just paring` 이고 나머지는 `Nothing` 이다.
2. `f = []`
pair 은 두 list 를 Cartesian product 계산을 한다.
3. `f = ZipList`
pair 은 standard `zip` 함수와 동일하다.
4. `f = IO`
pair 은 두 `IO` action 을 순서대로 실행하여 그 결과의 pair 을 반환한다.
5. `f = Parser`
두 개의 Parser를 순서대로 실행한다. (파서는 입력의 연속 sections을 소비함) 순서대로 실행한 결과의 pair 을 반환한다.  만약 Parser 중 하나라고 실패하면 모두 실패.

다음 함수들을 구현할 수 있을까? `f`가 위의 type 들로 대체될 때 각 함수의 기능을 생각해보자.

```haskell
(*>)       :: Applicative f => f a -> f b -> f b
mapA       :: Applicative f => (a -> f b) -> ([a] -> f [b])
sequenceA  :: Applicative f => [f a] -> f [a]
replicateA :: Applicative f => Int -> f a -> f [a]
```
