# 옆집사는 '함수'형 탐방기
 [https://www.youtube.com/watch?v=1u_iCHOE8sE](https://www.youtube.com/watch?v=1u_iCHOE8sE) 
---

> OO maked code understandable by encapsulating moving parts (OO 는 변하는 부분을 encapsulation 해서 감추는 거에 중점을 둔다) - Micael Feathers

> FP makes code understandeable by minimizing moving code parts (FP는 움직이는 부분을 최소하여 이해가 가능한 코드를 만드는 것이다) - Micael Feathers

이 부분을 이해하는 것이 함수형의 개념을 잡는 중요한 방법이다. 그외 이 방법을  구현하기 위해서 수학적인 개념들이 막 접목이된다. 수학적인 개념부터 이해하는 것보다는 이 부분부터 먼저 이해하면서 접근하는 것이 좋다.

## OOP
* 객체 기반
* Object = field (variable) + method (function)
* 메소드는 객체 내부 변수를 참조하여 return value 를 생성
* 개념 - Polymorphism, Inheritance, Encapsulation
* 설계원칙 - 디자인 패턴, SOLID

장점
* 현실 세계를 반영한 객체 기반의 설계
* 코드에 대한 이해도가 빠름
* 코드에 대한 이해도가 빠르다보니 대규모 시스템 설계에서 유리

단점
* 공유 자원(내부에 encapsulation 된 변수, 싱글톤같은 shared instance 등)에 대한 race condition
* Dead lock, Starvation 등


## FP
* 함수 기반
* 수학 함수와 비슷, `f(x) = y`
* 단, 함수는 매개변수를 제외한 다른 외부변수를 참조하지 않는다. - 함수 안의 변수가 유일한 변수 - side effect 가 적고 race condition 에 어느정도 대응 가능
* x에 대한 함수의 출력은 항상 `f(x)`
* 설계 목적
	* 각 함수에 대한 참조 무결성을 보장
	* 병렬, 비동기 처리에 대한 내성 강화

> FP is simpler than oop. - Neal Ford

## OOP 와 FP 에 대해 좀 더 구조적으로 알아보자
### OOP

running 이라는 메소드를 만든다고 하자.  running 이라는 메소드를 각각 implement 하거나 상속하는 클래스가 있을 것이다. Animal 은 running 을 하고 Animal 에는 Men, Dog, Bird 이렇게 있다고 하자.  각자 뛰는 형태나 발이 다르다. 즉 각자 사용하는 정보의 양이 다르다. 이 정보의 양이 Men, Dog, Bird  라는 클래스 내부에 선언이 되어있어서 run 만 호출하면 내부에 선언되어 잇는 변수들을 참조해서 뛰는 동작을 수행하게 되는 것이다.

만약 running 이라는 함수를 여러곳에서 호출하게 되면 호출 순서에 따라 원하지 않는 값이 도출될 수 있다.  내부 변수에 접근하는 순서가 우리가 의도하지않은 상황을 유발시킬 수 있기 때문이다. 그래서 우리는 그런 순서에 대한 제어나 접근 제어에 대해 하게 된다.
 
* Method : running
* The implements of running method is depend on the kind of subclass.



### FP
* method : running
* The running function is independent
* Thr running function does not have any data.
* It makes risks minimized in FP

running 이라는 pure function 이 있다고 하자. MEN, DOG, BIRD 는 자기자신이 가지고 있는 값을 매개변로 넘겨 running 이라는 function 을 수행한다. running 은 순수한 로직만 수행하기 때문에 변수가 변한다거나 race conditon 에 의해 더러운 값이 들어오는 등 risk 최소화할 수 있다.

그래서 FP 는 다음 3 가지를 제거하는 것을 권장한다.
* Local variable (내부적으로 참조하고 있는 변수 - 매개변수와 return value 를 제외한 외부변수)
* Loop (for, while - for 문 안에 외부변수를 참조하여 변경이 일어나면 데이터 무결성, 참조 무결성을 보장 못한다)
* Assignment

## FP 에 나오는 여러 개념들
### Lambda
* 추상화, 변수 바인딩에 기반하여 함수를 표현하는 방법 -> 간단하게 익명 함수라고도 함
* 함수
	* 일반 함수 -> `f(x, y) = z`
	* 항등 함수 -> `g(x) = x`
* High Order Function -> `f(x, y) = z` -> `f(g(x), y) = z`
* Curring -> `f(x, y) =z`, `f(z, y) = a` -> `f(f(x, y), y) = a`

### Closure
* 함수형 객체
* Context capturing
	* 외부 변수를 내부에 캡쳐해서 사용
	* 외부 변수와의 연결성을 끊고 내부에 캡쳐링한 변수를 사용하기 때문에 외부 변수에 대한 참조 무결성 지원

### Partial Application
* Application : 함수의 계산을 위해 매개변수를 바인딩하는 과정
* Partial Application : 매개변수 중 일부만 적용 (모두 바인딩하면 return value 가 떨어지기때문), 지연연산 처리에 응용

