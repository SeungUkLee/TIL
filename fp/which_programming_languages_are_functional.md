# 어떤 프로그래밍 언어가 함수형인가?

[함수형 프로그래밍이란?](./what_is_functional_programming.md) 에서 함수형 프로그래밍이 무엇인지 부작용이 무엇인지 알아보았다. 이제 함수형 프로그래밍 언어가 어떤것이 있는지 알아보자.

## Functional Programming is not…

1. **map이나 reduce가 아니다**

많은 언어에서 `map` 이나 `reduce` 와 같은 함수들을 보게 된다. 하지만 이것으로 인하여 어떤 언어가 함수형이 되는 것은 아니다. 시퀀스 자료를 처리하는 과정에서 부작용을 걷어내려고 노력하다보면 얻게되는 함수들일 뿐이다.

2. **람다 함수(lambda functions)가 아니다**

모든 FP 언어에는 first-class function이 있다. 람다 함수 역시 부작용을 피하기 위한 언어를 만들다보면 자연스럽게 얻어지는 것.

3. **타입에 관한 것이 아니다**

정적 타입 검사는 매우 유용하지만 FP의 전제 조건은 아니다. 정적 타입이냐 아니냐가 함수형 언어이다 아니다로 가르지는 못한다.


**함수형 프로그래밍은 부작용에 관한 것이다.**

## What Does This Mean For Languages?

### JavaScript

### Java

### Scala

### Clojure

### Haskell

### Python

### Mocking

## Design Smells

## Reference
- [Which Programming Languages Are Functional?](http://blog.jenkster.com/2015/12/which-programming-languages-are-functional.html)
- [어떤 프로그래밍 언어들이 함수형인가?](https://medium.com/@jooyunghan/%EC%96%B4%EB%96%A4-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%96%B8%EC%96%B4%EB%93%A4%EC%9D%B4-%ED%95%A8%EC%88%98%ED%98%95%EC%9D%B8%EA%B0%80-fec1e941c47f)