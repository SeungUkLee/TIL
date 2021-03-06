> Eric Elliott 의 Composing Software 시리즈를 보고 정리한 글입니다.

# The Rise and Fall and Rise of Functional Programming

소프트웨어 설계에서 함수 합성이 얼마나 중요한 지 논의 할 것이다.

## The Rise of Functional Programming

컴퓨터 과학의 초기 Alonzo Church 와 Alan Turing 이라는 위대한 컴퓨터 과학자가 있었다. 이들은 서로 다른 동시에 동등한 두 가지 보편적인 (universal) 계산 모델을 만들었다. 이 두 모델 모두 계산가능한 모든 것을 계산할 수 있었다.

- Alonzo Church : **람다 대수 (lambda calculus)** 를 만듬
- Alan Turing : **튜링 머신**을 만듬

> **람다 대수**는 함수 합성을 기반으로 하는 계산의 보편적인 모델이고 **튜링 머신**은 이론상으로 존재하는 기계이며 테이프의 기호를 조작하는 보편적인 계산 모델이다.

람다 대수는 함수 합성에 관한 것이다. 함수 합성 관점에서 생각하는 소프트웨어를 작성하는 것은 매우 직관적이고 표현적인 접근 방식이다.

람다 대수는 다음 3가지 중요한 특징이 있다.

**1. 함수는 항상 익명이다.**

자바스크립트에서 `const sum = (x, y) => x + y` 에서 오른쪽 부분이 익명의 함수 표현식이다.

**2. 람다 대수의 함수는 단일 입력만 허용한다.**

하나 이상의 매개 변수가 필요한 경우 함수는 하나의 입력을 받아 다음 함수를 사용하는 방식으로 새로운 함수를 반환할 수 있다. 예를 들어 `(x, y) => x + y` 는 `x => y => x + y` 와 같은 단항 함수로 표현될 수 있다. 

다항 함수에서 단항 함수로의 변환을 **Currying** 이라고 한다.

**3. 함수는 first class 이다.**

함수가 first class 이면 함수를 다른 함수에 대한 입력, 반환값으로 사용할 수 있다.

이러한 특성들로 기본 빌딩을 구성하게되면 소프트웨어를 작성하기위한 간단하면서도 표현력있는 어휘가 된다.

> 자바스크립트는 람다 대수의 중요 특성을 지원하지만 강제하지는 않는다

예를 들어 `f . g` 는 다음과 같이 구현할 수 있다.

``` javascript
compose = f => g => x => f(g(x))
```

이를 이용하는 방법은 다음과 같다

``` javascript
double = n => n * 2
inc = n  => n + 1

compose(double)(inc)(3)
```

`compose()` 는 첫번째 인수로 `double` 함수를 사용, 두번째 인수로 `inc` 함수를 사용, 마지막 인수로 `3`을 **적용(apply)** 한다. 정리하자면 `compose(double)(inc)(3)` 는 3번의 호출과정을 거친다.

1. 첫 번째 `double` 을 받고 새로운 함수를 리턴
2. 리턴된 함수는 `inc` 를 받고 새로운 함수를 리턴
3. 다음에 리턴된 함수는 `3` 을 취하여 `f(g(x))` 를 평가하는데 이는 `double(inc(3))` 이다.
4. `x` 는 `3` 으로 평가, `inc()` 로 전달
5. `inc(3)` 은 `4` 로 평가
6. `double(4)` 는 `8` 로 평가
7. 최종적으로 `8` 을 리턴

람다 대수는 소프트웨어 설계에 엄청난 영향을 주었고 1980년 이전 많은 사람들은 함수를 합성하며 소프트웨어를 작성하였다.

## The Fall of Functional Programming

1970년에서 1980년 사이 소프트웨어 작성 방법이 단순히 합성하는 것에 벗어나 컴퓨터에게 일련의 명령(instruction)을 내리는 방식으로 바뀌고 OOP가 등장한다. 구성 요소를 캡슐화하고 메세지를 전달하는 아이디어는 기능을 재사용하기 위해 상속에 의한 계층 구조와 is-a 관계라는 끔찍한 아이디어에 의해 왜곡된다.

결국 함수형 프로그래밍은 밀려나게된다.

## The Rise of Functional Programming

2010년 경 자바스크립트의 사용이 폭발적으로 증가한다. 자바스크립트는 람다 대수의 중요한 특징들이 포함되어 있었는데 사람들은 "함수형 프로그래밍"이라는 새로운 무언가에 대해 인지하기 시작한다.

2015년, 함수 합성으로 소프트웨어를 개발하려는 아이디어는 다시 인기를 얻는다. 자바스크립트는 currying 및 람다 표현을 쉽게 읽고 만들 수 있는 화살표 함수를 추가가 되어 함수형 프로그래밍 붐에서 로켓 연료와 같은 역할을 하게 된다.

**합성은 소프트웨어의 동작을 명료하게 모델링하는 간단하고 우아한 표현 방법이다.** 작은 소프트웨어 구성 요서들을 합성하여 더 큰 구성 요소와 기능을 만드는 프로세스는 조직화, 이해, 디버그, 확장, 테스트 및 유지 관리가 더 쉬운 소프트웨어를 만든다.

## Reference

[The Rise and Fall and Rise of Functional Programming](https://medium.com/javascript-scene/the-rise-and-fall-and-rise-of-functional-programming-composable-software-c2d91b424c8c)