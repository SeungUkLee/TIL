# Functions & Evaluation

## 1.1 Programming Paradigms

주 프로그래밍 패러다임으로는 

- imperative programming
- functional programming
- logic programming 

이 있다.

### Imperatvie Programming

명령형 프로그래밍 특징으로는 다음과 같다. 

- modifying mutable varaibles (값을 바꿀수있는)
- using assignments (변수에 할당)
- and control structures such as if-then-else, loops, break, continue, return. (흐름제어 구문)

명령령 프로그래밍은 폰 노이만 구조랑 비슷하다.

- Mutable var = memory cells
- Variable deferences = load instructions 
- Variable assignments = store instructions
- Control structures = jumps

문제는 이런 instructions 들이 `word` 로 구성되어있어 규모가 커지면 `word` 하나하나에 매칭시킬 수 없다. 즉 규모를 늘리려 한다면, 집합, 다항식, 문자열과 같은 high-level-abstraction 을 정의할 방법이 필요한데 이상적으로 **Theory** 를 만들면 해결할 수 있다.

**Theory** 는 다음과 같이 구성되어있다.
- one or more data types
- operations on these types
- laws that describe the relationships between values and operations

일반적으로 **Theory** 는 mutation 에 대해서는 다루지 않지만 imperative programming 에서는 mutation 때문에 theory 의 법칙이 깨질수 있다. 그래서 다음과 같은 스타일로 나아가게 된다.

- concentrate on defining theories for operators expressed as function
- minimize state changes
- treat operators as functions, often composed of simpler functions.

정리하자면, Imperatvie Programming 에서는 high-level abstraction 을 위해 theory 를 이용할 수 있지만 mutation variable 때문에 theroy 의 법칙이 깨질 수 있다. 따라서 이런 단점을 해결하기 위해 나온 것이 Functional Programming(FP) 이다.

FP 는 상태가 imuutable 하기 때문에 **Theory** 를 구성하는 operator 를 만드는 것에 집중할 수 있다. 

### Functional Programming
mutable variables 를 피하고, 함수를 추상화하고 함수를 합성하는 한다. 함수에 집중 할 수 있다. 뿐만 아니라 다음과 같은 이점이 있다.

- 단순한 추론 원리가 가능해짐.
- 모듈화가 더 잘됨.
- 멀터코어와 클라우드 컴퓨팅에서 병령성을 잘 활용할 수 있다.

## 1.2 Elements of Programming

### Expression

많은 프로그래밍 언어들은 다음과 같은 기능들을 제공한다.
- primitive expressions, representing the simplest elements (언어의 가장 간단한 요소를 나타내는)
- ways to combine expressions (expression을 결합하는 방법)
- ways to abstract expressions, which introduce a name for an expression by which it can then be referred to. (expression을 추출하는 방법)

여기서 추출이란 expression 의 이름을 소개한 다음 그 이름으로 expression 을 참조할 수 있다라는 것을 의미한다.

### Evaluation

non-primitive expression 은 최종적으로 value 를 만들기 전까지 다음과 같은 방식으로 evaluated 된다

- Take the leftmost operator
- Evaluate its operands (left before right)
- Apply the operator to the operands

그러나 모든 expression 이 finite value 를 가지는 것은 아니다. 여기서 loop 는 무한루프를 말한다.

~~~ scala
def loop: Int = loop
~~~

## Reference

[FUNCTIONAL PROGRAMMING 1](http://1ambda.github.io/scala/functional-programming-1/)

[Coursera's Functional Programming in Scala](https://www.coursera.org)