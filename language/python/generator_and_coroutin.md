# Generator & Coroutine
파이썬에서 코루틴은 다음과 같이 두가지가 있다.

- 네이티브 코루틴
- 제너레이터 기반 코루틴

제너레이터에 대해 알아보자.

## 파이썬 제너레이터
유한 또는 무한한 횟수만큼 어떤 값을 만들어 내놓는 객체. `yield`  구문을 통해 특정 값을 리턴한 후 사라지지않고 다시 호출하면 방금 리턴하였던 그 자리에서 이어서 계산을 반복하고 다시 값을 내놓는다. 


## 코루틴
위에서 언급한 특징(자신의 위치를 기억함) 때문에 두 개의 제너레이터가 번걸아가면서 제어권을 넘기는 형태를 생각해볼 수 있는데 이 떄 두 제너레이터는 기존의 서브루틴과 다른 개념으로 관계를 맺는다. 이러한 패턴을 **코루틴** 이라고 한다. 

옛날에 동시성 작업을 위해 주로 스레드를 생성하여 작업을 하였다고 한다(멀티 스레드). 하지만 스레드로 인해 **Condition race**, **Dead lock** 등과 같은 문제 때문에 코루틴이 주목받게 되었다고 한다.

코루틴은 주 실행 흐름과는 독립적으로 운용하는 함수가 존재한다는 의미이며 별도의 스레드 없이 메인 스레드 상에서 번갈아가며 병렬처리와 유사한 동작을 할 수 있다.

파이썬에서 제너레이터와 코루틴은 매우 중요하며 많은 곳에서 활용할 수 있다. 예를 들어 제너레이터로 간단한 클래스를 대체할 수 있으며 단위 작업을 제너레이터를 이용하여 만들어 일련의 작업을 파이브라인 형식으로 구성하여 프로그램을 작성할수도 있다.

## Ref
[제너레이터와 코루틴](https://soooprmx.com/archives/5622)