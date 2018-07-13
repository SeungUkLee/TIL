# Immutable state vs Mutable state

우선 concurrency(동시성) 과 paralelism(병렬) 차이점에 대해 알아 볼 필요가 있다.. 이 둘은 비슷한 것 같지만 서로 다르다.


옛날에 concurrent 에 대해 두 가지 모델이 있었다.
- 1. Shared state concurrency
- 2. Message passing concurrency

그 당시 "Message passing concurrency"를 따랐던 언어는 거의 없었고 
거의 대부분 엔지니어들은 shared state 쪽이었다.


message passing concurrency 에는 shared state 가 없다. 모든 계산은 프로세스에서 수행되며 데이터를 교환하는 유일한 방법은 asynchronous message passing(비동기 메시지 전달)을 사용하는 것이다.


shared state concurrency 는 "mutable state(변경 가능한 상태)"라는 개념을 포함하고 있다. 즉 memory가 변경 될 수 있다. 


만약 프로세스가 하나 밖에 없으면 괜찮다. 하지만 여러 개의 프로세스가 동일한 메모리를 공유하고 수정하는 경우 이는 심각한 문제가 될 수 있다. shared memory를 동시에 수정하지 못하게 locking 메커니즘이 필요한데 mutex 또는 synchronised method 가 있다.


Immutable Data Structures = No Locks

Immutable Data Structures = Easy to parallelize






## Reference
[Immutable vs mutable state… Concurrency models](https://medium.com/@ostvp/immutable-vs-mutable-state-concurrency-models-5895debc14a)