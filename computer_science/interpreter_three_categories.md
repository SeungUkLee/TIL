# Interpreter's three categories

인터프린터는 크게 3가지 종류로 나누어진다.

1. Tree-walking
2. Stack-based
3. Register-based

## Tree Walking Interpreters
소스코드를 트리와 유사한 데이터 구조로 변환하고 트리의 루트에서 시작하여 각 노드를 방문하여 operation 을 수행한다.

### 장점
* Simple!
* 코드를 추가하여 변환할 수 있는 유연성 향상 (코드가 이미 데이터 구조에 있으므로)

### 단점
* 다른 종류의 인터프린터에 비해 Slow 함

## Stack Based Interpreters

가장 일반적인 인터프리터. 예를 들어 JVM, Python VM 등이 있다. 이 인터프린터는 operations 및 결과를 스택에 저장한다. VM이 instruction을 실행하면 가장 최근 값을 스택에서 꺼내고 작업을 수행한 후 결과를 다시 푸시한다.

### 장점
* Register based interpreters 보다 쉬운 코드
* 꽤 괜찮은 성능

### 단점
* 실제 하드웨어 작동 방식과 매핑되지 않음; CPU는 레지스터를 사용함
* 대부분의 tasks 에는 더 많은 instruction 이 필요함

## Register Based Interpreters
BEAM VM (Erlang VM), Lua VM, Dalvik VM (Android)가 이 인터프린터에 속한다.

### 장점
* 실제 하드웨어 작동 방식에 가까움
* 뛰어난 성능

### 단점
* 복잡한 코드
* 컴파일러를 작성할떄 레지스터 allocation 및 de-allocation 에 신경써야함

## Reference
[So You Want to Build a Language VM](https://blog.subnetzero.io/post/building-language-vm-part-01/)

