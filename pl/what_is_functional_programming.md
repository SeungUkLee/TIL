# 함수형 프로그래밍이란?

함수는 두 종류의 입출력을 가지고 있다.

1. 문법적으로 보이는 입출력 (일반적인 입출력)

~~~ java
public int square(int x) {
    return x * x
}
~~~

우리는 위 함수를 보고 `int x` 입력으로 출력값 타입은 `int`로 출력된다고 생각한다.

2. 겉으로는 보이지않는 입출력

~~~ java
public void processNext() {
    Message message = InboxQueue.popMessage()
    if (message != null) {
        process(message)
    }
}
~~~

문법적으로 따지면 입출력이 없어보이지만 숨겨진 형태의 입출력을 가지고 있다. 

* 입력 : `popMessage()`를 호출하기 전 `InboxQueue` 상태
* 출력 : `process` 호출로 인해 발생하는 모든 것과 끝나고 났을 때의 `InboxQueue` 상태


`InboxQueue` 상태의 변화를 고려하지 않고서는 `processNext` 호출 결과를 완전히 이해할 수 없다. 그래서 우리는 API만 봐서는 추측할 수 없을 것이다.

이러한 숨겨진 입력과 출력이 바로 **부작용(side-effect)** 이다. 즉 부작용은 다음과 같은 컨셉을 가진다. *"우리가 이 함수를 호출하려면 인수 목록에는 없지만 필요한 것들이 무엇이고, 반환값에 반영되지 않으면서 하는 일은 무엇인가?"*

> 용어를 다음과 같이 구분하기도 한다.
> * 숨겨진 출력 : 부작용 (side-effect)
> * 숨격진 입력 : 부원인 (side-cause)

## Side-Effects are the Complexity Iceberg

함수가 부작용(and 부원인)을 가진다면 다음 함수를 보자.

``` java
public boolean processMessage(Channel channel) {
    // ...
}
```
함수 내부를 보지않고는 어떤 일을 하고 무엇을 필요로 하는지 전혀 알 수 없다. Channel에서 메서지를 꺼내는지 어떤 조건 하에 채널을 닫는건지.. 전혀 알 수 없다.


**부작용은 복잡성 빙산이다.** 함수의 signature 와 이름을 보면 그 함수가 무엇인지 알 수 있을 것 같지만 어떤 요구 사항이나 어떤 숨겨진 변경도 있을 수 있다. 즉 함수 구현을 보지 않고 어떤 것들이 연관되어 있을지 전혀 알 수가 없다. 잠재적으로 엄청나게 큰 복잡성이 숨어 있다. 

함수를 제대로 파악하려면 가능한 대안은 3가지가 있다.
1. 함수 정의를 차고 들거나
2. 복잡성을 표면 위로 드러내거나
3. 그냥 무시하고 잘 되기 기도하거나

## Isn’t This What Encapsulation’s About?
-> No

캡슐화
- 구현 세부 사항을 숨기는 것에 관한 것
- 코드의 내부를 숨겨서 호출 하는 쪽에서 신경 쓸 필요가 없게 하는 것

부작용
- 구현 세부 사항을 숨기는 것에 관한 것이 아님
- 코드와 외부 세상과의 관계를 숨기는 것에 대한 것

> **A function with side-causes** has undocumented assumptions about what **external factors** it’s depending on.
> **A function with side-effects** has undocumented assumptions about what **external factors** it’s going to change.

## Are Side-Effects Bad?

프로그래머가 예상한 그대로 정확하게 동작한다면 괜찮다. 하지만 이러한 코드는 분리하여 테스트하기가 어렵다. 코드를 열어보고 숨겨진 원인과 결과를 파악하고, 그럴듯하게 시뮬레이션 해야한다. TDD할때 블랙 박스 테스트, 화이트 박스 테스트가 있는데 블랙 박스 테스트를 해야한다. 즉, 구현 세부 사항을 무시할 수 있어야 한다는 말이다. 하지만 부작용을 허용하게되면 블랙 박스 테스트를 할 수 없다. 그 안에 무엇인지 확인하지 않고서는 입출력을 결정할 수 없기 때문이다. 디버깅도 마찬가지다. 함수가 부작용을 허용하지 않으면 단지 몇 가지 입출력을 확인하여 올바른지 여부를 파악할 수 있다. 하지만 함수가 부작용이 있으면 시스템의 어디까지 고려해야 할지 그 끝을 알 수 없다. 함수가 무엇이든 의존할 수 있고 무잇이든 변경할 수 있으므로 버그는 어느곳에든 발생할 수 있다. 

## We Can Always Surface Side-Effects
이러한 복잡성에 대해 우리는 단순히 함수가 어떤 입력을 가졌는지 출력으로 무엇을 반환하는지 선언하면 된다. 단순하다. 다음 예제를 보자.

~~~ java
// 숨겨진 입력이 있는 함수
public Program getCurrentProgram(TVGuide guide, int channel) {
  Schedule schedule = guide.getSchedule(channel);

  Program current = schedule.programAt(new Date());

  return current;
}
~~~

이 함수는 숨겨진 입력이 있다. 바로 `new Date()` (현재시간)이다. 우리는 이 입력을 표면화할 수 있다. 


~~~ java
public Program getProgramAt(TVGuide guide, int channel, Date when) {
  Schedule schedule = guide.getSchedule(channel);

  Program program = schedule.programAt(when);

  return program;
}
~~~

이렇게 하면 숨겨진 입출력이 없다. 이러한 버전의 장단점을 살펴보자

### Cons

인자가 3개로 늘어나 복잡해 보일수도 있다.

### Pros

1. 복잡하지 않다

의존성을 숨긴다고 더 간단해지지는 않는다. 의존성을 정직하게 드러낸다고 더 복잡해지지 않는다.

2. 테스트하기 쉽다

첫번째 경우에는 시스템 시간을 바꿔야한다. 하지만 두번째 경우는 시간을 넘겨주기만 하면 되므로 간단하다. 

3. 추론하기 쉽다 

단지 입력과 출력의 관계를 기술하고 있기때문에 입력을 안다면 결과가 무엇인지 안다. 이 코드를 따로 떼어내서 확인할 수 있고 **입력과 출력 사이의 관계만 테스트하면 함수 전체를 테스트한 것이 된다.**

## What is a ‘Pure Function’?

모든 입력이 입력으로 **선언**되고(숨겨진 것이 없어야함) 마찬가지로 모든 출력이 출력으로 **선언**된 함수를 **순수(pure)**하다고 부른다.

> 데이터를 정의하고 그것의 변화과정을 프로그래밍 한 것 - **Imperative(명령적인)**
> 행위를 정의하고 거기에 데이터를 집어 넣는 것 - **Declarative(선언적인)**
> ref) [let us: Go! 2017 가을 - Functional Reactive Programming 패러다임](https://www.youtube.com/watch?v=cXi_CmZuBgg&feature=youtu.be)

## What is ‘Functional Programming’?

함수형 프로그래밍은 **순수 함수를 작성하는 것.** 즉 숨겨진 입출력을 최대한 제거하여 가능한 우리 코드의 대부분이 단지 입력과 출력의 관계를 기술하게끔 하는 것을 말한다. 하지만 완변하게 부작용을 피할 수는 없다. 대부분의 프로그램은 반환값을 얻기 위해서가 아니라 **어떤 동작**을 하기 위해 실행하기 때문이다. 하지만 가능한 모든 곳에서 부작용을 제거하고 제거할 수 없는 경우에는 철저하게 통제해야한다.


## What is a ‘Functional Programming Language’?

많은 경우 순수하지 않은 함수를 순수하게 만들때 모든 입력과 출력을 함수 signature에 올리는 것 뿐이다. 그럼 모든 프로그래밍 언어는 "함수형"인가?? 아니다.

함수형 프로그래밍 언어는 부작용없는 프로그래밍을 지원하고 장려하는 언어이다. 즉, 함수형 언어는 우리가 가능한한 부작용을 제거하고 그렇지 않은 곳에는 철저히 제어할 수 있도록 적극적으로 도와주는 언어, 부작용에 적대적인 언어이다.

