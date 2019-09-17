# Reduce (Composing Software)

함수형 프로그래밍에서 자주 보이는 **Reduce** (fold, accumulate)는 배열을 순회하면서 각 항목을 누적해서 리턴하는 함수이다. 배열의 항목과 누적 값을 반복해서 임의의 함수에 전달하는데 그 함수는 새로운 누적 값을 리턴하는 함수이다.

`Array.prototype.reduce()` 에서 배열은 `this`로 참조할 수 있기 떄문에 인자로 넣을 필요는 없다.

``` js
arr.reduce(
    reducer: (acc: Any, current: Any) => Any,
    initialValue: Any
) => acc: Any
```

`reducer` 는 현재 값을 누적 값으로 **"폴드"** 하는 역할을 한다. 즉, 누적되는 방식을 정의하는 것이다. 익명 함수로 전달이 가능하며 기명 함수로도 전달할 수 있다.

> 일반적으로 `reduce()` 는 컬렉션의 왼쪽에서 오른쪽으로 작동한다.

## Reduce is Versatile

reduce로 `map()`, `filter()`, `forEach()` 등 다양한 함수들을 쉽게 정의할 수 있다.

### Map:

``` js
const map = (fn, arr) => arr.reduce((acc, item, index, arr) => {
    return acc.concat(fn(item, index, arr));
})
```

### Filter:

``` js
const filter = (fn, arr) => arr.reduce((newArr, item) => {
    return fn(item) ? newArr.concat([item]) : newArr;
})
```
---

위 처럼 데이터들을 다룰 떄 함수를 적용하고 결과를 특정한 값으로 누적할 수 있다. 많은 어플리케이션에서 이러한 방식으로 데이터를 다룬다. 만약 데이터가 값이 아닌 함수일 경우 어떻게 해야될까?

### Compose:

Reduce를 사용하여 쉽세 함수를 합성할 수 있다. `f.g` 를 자바스크립트로 표현하면 `f(g(x))` 로 표현된다.

`reduce` 를 사용하면 합성 과정을 추상화하여 다음과 같이 함수를 쉽게 정의할 수 있다.

``` js
f(g(h(x)))
```

그렇게하기 위해서는 `reduce` 를 역으로 실행해야되는데 (오른쪽에서 왼쪽 방향) 자바스크립트는 `.reduceRight()` 라는 함수를 지원하는데 이 함수를 이용하면 된다.

``` js
const compose = (...fns) => {
    x => fns.reduceRight((v, f) => f(v), x);
}
```

`compose()` 는 함수를 합성할 경우 유용한데 함수가 순서대로 적용되는 것을 일련의 사건들로 생각하고 싶다면 어떻게 해야될까?

예를 들어 숫자 `1`을 더한 다음 `x2` 를 하고 싶다고 하자.

``` js
const add1 = x => x + 1;
const double => x => x * 2;

const add1ThenDouble = compose(double, add1)

add1ThenDouble(2) // 6
// ((2 + 1) * 2)
```

첫 번째 단계(`1` 더하기)가 마지막에 나열되는 것을 볼 수 있다. 함수가 적용되는 순서를 이해하려고 할 때 불편하게 작용된다.

따라서 이 문제를 해결하려면 그냥 평소처럼 왼쪽에서 오른쪽으로 reduce 하면 된다.

``` js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const add1ThenDouble = pipe(  
  add1,  
  double  
);

add1ThenDouble(2); // 6  
// ((2 + 1) * 2)
```

> 참고한 문서에 의하면 `compose()` 와 `pipe()` 에 대해서는 나중에 자세히 설명한다고 한다.

## Conclusion

`reduce` 는 다른 함수를 만들때 유용하게 사용할 수 있다.