# Parallelism models : Actors vs CSP vs Multithreading

Parallelism(병렬) 모델에 가장 잘 알려진 모델의 장단점을 알아보자.

다음은 해당 병렬 처리 모델을 나타내는 프로그래밍 언어들이다.
 - Actors model : Erlang(얼랭), Scala, Rust
 - CSP : Golang
 - Threads : Java, C#, C++

Multithreading 에는 Deadlock, shared state, bad scaling 와 같은 몇가지 문제가 있는데 이러한 문제를 해결하기 위해 많은 솔루션이 제안되어왔다.

> Deadlock(교착상태)란?
두 개 이상의 작업이 서로 상대방의 작업이 끝나기 만을 기다리고 있어 결과적으로 아무것도 완료되지 못하는 상태 - 위키백과

> Shared state 란?
하나 이상의 함수 또는 둘 이상의 데이터 간에 공유되는 상태.

예를들어 locks, mutexes 가 있다. 하지만 이들 모두 synchronization(동기화)와 관련이 있다. Shared state 로 인해 메모리를 변경시키는 등 많은 문제가 발생하며 동일한 데이터를 공유하고 수정하는 여러 프로세스가 있는 경우 이는 큰 재앙이 될 것이다. 


애플리케이션을 parallel(병렬)로 작동시키고 asynchronously(비동기적)으로 수행하는 가장 효율적인 방법이 있다. 바로 actors model 과 csp 이다. 


actors model 과 csp는 모두 message passing 기반이다. 즉 메시지를 보내는 sender 와 메세지를 받는 receiver가 있다. 두 모델 모두 receiver는 synchronous 이다. 즉, 메시지를 수신 할 준비가되면 메시지를 수신 할 때까지 block 된다.


CSP는 fully synchronous 이다. channel writer는 channel reader가 읽을 때까지 반드시 block 해야한다. blocking 기반 메커니즘은 channel 이 하나의 message 만 보유하면 된다는 이점이 있다. 또한 여러면에서 추론하기가 더 쉽다.


Actors model에서 sending 은 asynchronous(비동기)이다. message sender는 reader가 mailbox 에서 가져올 준비가 되어있는지 여부를 차단하지 않으며 대신 message가 일반적으로 mailbox라고하는 대기열에 들어간다.


CSP 에서 프로세스는 channel을 통해 서로 통신을 한다. 프로그램은 그것을 생성하며 first class obecjs로 전달할 수 있다. Actors 에는 address system 과 inboxes 라는 것이 있는데 프로세스 당 주소는 하나뿐(only one)이다.  


CSP 에서 send 및 receive 작업이 차단 될 수 있다. 반면에 actors model에서는 receive 작업만 차단 될 수 있다.


CSP 에서 message 는 전송 된 순서대로 전달되지만 Actors model 에서는 그렇지 않다. 실제로 system은 일부 message를 전혀 전달하지 못할 수도 있다.


CSP model은 한 대의 machine에서 가장 잘 작동하는 반면에 Actors model은 여러 대의 machine 에서 쉽게 확장 된다.


## Conclusion
Actors model은 분산 시스템에 더 적합하다. CSP는 blocking 하는 특성 때문에 여러 machines / runtimes 에서 사용하기가 어렵다.


## Reference
[Parallelism models. Actors vs CSP vs Multithreading](https://medium.com/@ostvp/parallelism-models-actors-vs-csp-vs-multithreading-f1bab1a2ed6b).





