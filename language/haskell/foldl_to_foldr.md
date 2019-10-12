# `foldl` 을 `foldr` 로 정의하기

> 코드는 하스켈 코드

우선 `foldl` 과 `foldr` 을 재귀적으로 정의해보자.

```haskell
foldl f acc [] = acc
foldl f acc (x:xs) = foldl f (f acc x) xs

foldr f' acc' [] = acc'
foldr f' acc' (x:xs) = f' x (foldr f' acc' xs)
```

`foldr f' acc' = g` 라고 하여 `foldr` 을 다시 정리해보자

```haskell
g [] = acc
g (x:xs) = f' x (g xs)
```

우리는 `foldl` 의 정의를 위 정의와 같은 꼴로 맞추면 된다.

마찬가지로 `h = foldl f` 로 `foldl` 을 축약해보자

```haskell
h acc [] = acc
h acc (x:xs) = h (f acc x) xs
```

여기서 acc 를 우변으로 넘기면 된다. 따라서 `h' = flip h` 라고 한다면

``` haskell
h' [] acc = acc
h' (x:xs) acc = h' xs (f acc x)
```

가 되고 acc 를 넘기면

``` haskell
h' [] = id
h' (x:xs) acc = \acc -> h' xs (f acc x)
```

이때 `\acc -> acc` 는 항등원(idenetity)이기 때문에 `id` 이다.

다시 정리하면,

```haskell
-- h' = flip h
-- h = foldl f
h' [] = id
h' (x:xs) acc = \acc -> h' xs (f acc x)

-- g = foldr f' acc'
g [] = acc
g (x:xs) = f' x (g xs)
```

우리는 `foldl` 을 위 정의를 이용헤서 `foldr` 로 표현할 수 있다.

`foldl`을 다음처럼 적었었다.

```haskell
foldl f acc xs
```

`g = h' = filp h = filp (foldl f) = foldr f' acc'` 이기 때문에

```
foldl f = flip (foldr f' acc')
foldl f acc xs = flip (foldr f' acc') acc xs
foldl f acc xs = (foldr f' acc') xs acc
```

여기서 우리는 `f'` 만 구하면 `foldl` 을 `foldr` 로 정의할 수 있다.

`f'` 는 `\acc -> h' xs (f acc x) = f' x (g xs)` 에서 구할 수 있다.

```
\acc -> h' xs (f acc x) = f' x (g xs)  -- (g = h')
\acc -> h' xs (f acc x) = f' x (h' xs) -- (h' xs = y)
\acc -> y (f acc x) = f' x y
```

따라서 

```haskell
foldl f acc xs = (foldr f' id) xs acc
                where f' x y = \acc -> y (f acc x)
```

가 된다.

## References & Further More

[Foldl을 Foldr로 정의하기 - YouTube](https://www.youtube.com/watch?v=vYYTLcSJ8ns)

[foldl을 foldr로 구현](https://birmjin.tumblr.com/post/111213326517/foldl%EC%9D%84-foldr%EB%A1%9C-%EA%B5%AC%ED%98%84) 

[Foldl as foldr alternative - HaskellWiki](https://wiki.haskell.org/Foldl_as_foldr_alternative)

[Foldl as foldr](https://wiki.haskell.org/Foldl_as_foldr) 