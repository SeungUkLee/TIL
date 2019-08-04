# Why Learn Functional Programming in JavaScript?

이 글에서는 자바스크립트의 기본 사항을 처음부터 다루며 ES6 및 함수형 프로그래밍을 다룬다. 

이 글은 소프트웨어 합성이라고 불리며, 함수형 프로그래밍이란 함수 합성, 고차 함수 등을 사용하여 소프트웨어를 작성하는 방빕이다. 왜 하스켈이나, Elm 대신 자바스크립트로 함수형 프로그래밍을 배우는지 알 수 있을 것이다.

우선 자바스크립트는 함수형 프로그래밍에 필요한 가장 중요한 기능을 가지고 있다는 것을 인지하고 있자.

**1. first class 함수**

함수를 값으로 사용함. 함수를 인수로 전달하거나 또 다른 함수의 반환값으로 사용되거나, 함수를 변수 및 객체 속성에 할당할 수 있다. 이는 **고차 함수(high order function)** 를 허용하며 **부분 적용(partial appliction)**, **Currying** 및 **합성** 을 가능하게 한다.

**2. 익명함수와 간결한 람다 구문**

간결한 람다는 고차원 함수로 작업하기가 더 쉽다.

**3. 클로저(closure)**

클로저는 어휘 스코프와 함수의 묶음이다. 클로저는 함수가 만들어질 때 함께 만들어진다. 함수가 다른 함수 내부에서 정의되면 외부 함수가 종료된 후에도 외부 함수의 변수 바인딩에 접근할 수 있다. 클로저는 partial application 에서 고정된 인수를 얻는 방법이다. 고정 인수는 반환된 함수의 클로저 범위에 바인딩 된 인수이다. `add(1)(2)` 에서 `1` 은 `add(1)` 에 의해 리턴된 함수의 고정 인수이다.

## What JavaScript is Missing


## What JavaScript Has that Pure Functional Languages Lack

## Reference

[Why Learn Functional Programming in JavaScript?](https://medium.com/javascript-scene/why-learn-functional-programming-in-javascript-composing-software-ea13afc7a257)