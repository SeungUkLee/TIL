# 함수형 언어란?

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