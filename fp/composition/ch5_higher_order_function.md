# Higher Order Function

**HOF(고차 함수)**
- 함수를 인수로 받는 함수
- 함수를 리턴하는 함수

> 1차 함수(first order function)은 함수를 인수로 사용 x, 함수를 리턴하지 않는다.

`.map()`, `.filter()` 둘 다 인수로 함수를 사용하기 때문에 고차 함수이다.

단어 목록에서 4 글자로 이루어진 단어들을 제외한 단어들을 리턴하는 함수의 코드를 보자

``` js
const censor = words => {  
  const filtered = [];  
  for (let i = 0, { length } = words; i < length; i++) {  
    const word = words[i];  
    if (word.length !== 4) filtered.push(word);  
  }  
  return filtered;  
};

censor(['oops', 'gasp', 'shout', 'sun']);  
// [ 'shout', 'sun' ]
```

그럼 's' 로 시작하는 단어들을 리턴하는 함수의 코드를 보자

``` js
const startsWithS = words => {  
  const filtered = [];  
  for (let i = 0, { length } = words; i < length; i++) {  
    const word = words[i];  
    if (word.startsWith('s')) filtered.push(word);  
  }  
  return filtered;  
};

startsWithS(['oops', 'gasp', 'shout', 'sun']);  
// [ 'shout', 'sun' ]
```

`censor` 함수와 `startsWithS` 함수의 코드를 보면 중복되는 코드가 많다. 목록을 순회하고 주어진 조건으로 필터링하는 부분이 두 함수의 공통점이다. 이 부분을 리펙토링할 수 있다.

우선 리펙토링하기 전에 자바스크립트의 함수가 가지는 특징을 알 필요가 있다. 자바스크립트 함수는 **일급(first-class)**이다. 즉 함수는 다음과 같은 일을 할 수 있다.

- 식별자 (변수)값으로 할당
- 객체 속성 값에 할당
- 인수로 전달
- 함수에서 리턴됨

함수를 데이터처럼 사용할 수 있어 추상화하기가 쉬워진다. 목록을 순회하는 과정을 추상화하고 데이터를 처리하는 함수인 **reducer** 함수를 전달하고 리턴값을 누적하는 **reduce** 함수를 만들 수 있다.

``` js
const reduce = (reducer, initial, arr) => {  
  // shared stuff  
  let acc = initial;  
  for (let i = 0, { length } = arr; i < length; i++) {
    // unique stuff in reducer() call  
    acc = reducer(acc, arr[i]);

  // more shared stuff  
  }  
  return acc;  
};

reduce((acc, curr) => acc + curr, 0, [1,2,3]); // 6
```

위 코드를 간단하게 보자면, `reduce()` 함수는 `reducer` 함수와 누적값의 초기값, 순회할 배열을 인자로 받고 있다. 그리고 배열을 순회하면서 `reducer` 함수가 호출되어 누적값과 현재 배열 요소를 전달한다. 누적값에는 계속해서 값이 누적되고 배열을 모두 순회하면 최종적인 누적값이 리턴된다.

`(acc, curr) => acc + curr` 를 전달하는데 이는 배열 요소를 계속하여 누적하는 프로세스가 된다.

이를 이용해서 리펙토링해보자.

``` js
const filter = (fn, arr) => {
    reduce(
        (acc, curr) => fn(curr) ? acc.concat([curr]) : acc, 
        [],
        arr
    )
}
```

`fn()` 은 **술어(predicate)** 라고 하는데 boolean 값을 리턴하는 함수이다.

``` js
const censor = words => filter(
    word => word.length != 4,
    words
)

const censorStartsWithS = words => filter(
    word => word.length != fourStratsWith('s')
)
```

고차 함수는 다양한 데이터유형에서 동일하게 작동하도록 추상화하는데 사용할 수 있다. **고차 함수를 사용하여 함수에 다형성을 부여할 수 있다**.

## Further More

[Higher-Order Function 이란 무엇인가](https://dev-momo.tistory.com/entry/HigherOrder-Function-이란-무엇인가?category=536788)
