# Itoerator, Generator
Container, Iterable, Iterator, Generator, Generator expression, list set dict comprehension 에 대해 알아보자.

전체적으로 다음과 같은 관계를 가지고 있다.

![Alt text](generator_iterator_iterable_container.jpg "generator & iterator & iterable & container")

generator expression 과 generator function은 generator  이다.
generator는 항상 iterator 다.
next() 메소드로 lazy 하게 값을 생산 할 수 있다.
iterator는 항상 iterable 이다.
iterable은 iter() 메소드로 iterator 를 구할 수 있다 (?)
{list, set, dict} comprehension 은 container를 생산한다.
container는 일반적으로 iterable 하다.

## Container (컨테이너)
컨테이너는 원소들을 가지고 있는 데이터 구조이다. 실세계의 컨테이너(화물, 박스 등) 처럼 생각하면 이해가 잘될 것 같다. 이는 메모리에 상주하는 데이터 구조로 보통 모든 원소값을 메모리에 가지고 있다. 파이썬에서 다음과 같은 컨테이너를 가지고 있다.

* *list*, deque, ..
* *set*, frozonset, ..
* *dict,* defaultdict, OrderdDIct, Counter, ..
* *tuple*, namedtuple, ...
* *str*

어떤 객체가 특정한 원소를 포함하고 있는지 아닌지를 판단(membership test)할 수 있으면 *컨테이너*라고 한다. 

> Note </br>
> 대부분의 컨테이너가 자신이 포함하고 있는 모든 원소들을 생성하는 방법을 제공한다. 하지만 이 기능은 이를 컨테이너로 만드는게 아니라 Iterable(이터레이블)로 만드는 것이다.
> </br>
> 모든 컨테이너가 이터레이블할 필요는 없다. (예를들어 Bloom filter) 이와 같은 확률적인 데이터 구조는 특정 원소를 포함하고 있는지 판단할 수 있지만 각각의 개별 원소를 반환하지 못한다.

## Iterable (이터레이블)
대부분의 컨테이너는 이터레이블하다. 컨테이너가 일반적으로 유한할 경우 이터레이블은 무한한 데이터 소스를 나타낼 수 있다.

이터레이블과 이터레이터 차이점은 다음과 같다. 우선 다음 예시를 보자.

~~~
>>> x = [1,2,3]
>>> y = iter(x)
>>> z = iter(x)
>>> next(y)
1
>>> next(y)
2
>>> next(z)
1
>>> type(x)
<class ‘list’>
>>> type(y)
<class ‘list_iterator’>
~~~

여기서 y 와 z 는 이터레이블 x로 부터 값을 생성하는 *이터레이터의 인스턴스*이고 x는 *이터레이블*이다.  y와 z는 예제에서 볼 수 있듯이 상태를 가진다. x는 데이터 구조(리스트)이지만 이는 필수 요건은 아니다.

> NOTE
> 이터레이블 클래스는 같은 클래스에서 `iter()` 와 `next()` 를 둘다 구현한하며 클래스를 이터레이블과 자체 이터레이터로 만들어주는 `self` 를 반환하는 `iter()` 를 갖는다.  그러나 이터레이터로 다른 객체를 반환해도 상관없다.

~~~python
x = [1,2,3]
for e in x:
	# ....
~~~
위 파이썬 코드는 다음 그림과 같은 일이 일어난다.


파이썬 코드를 디스어셈블링 해보자.

~~~python
>>> x = [1,2,3]
>>> dis.dis(‘for _ in x: pass’)
1 		 	0 SETUP_LOOP        	14 (to 17)
		 	3 LOAD_NAME          	0 (x)
     	 	6 GET_ITER
>> 	        7 FOR_ITER           	6 (to 16)
	     	10 STORE_NAME         	1 (_)
	     	13 JUMP_ABSOLUTE      	7
>>       	16 POP_BLOCK
>>         	17 LOAD_CONST         	0 (None)         
	 		20 RETURN_VALUE 
~~~

 `iter(x)` 를 실행시키는데 필요한 `GET_ITER` 를 호출하고 있는 것을 볼 수 있다. `FOR_ITER` 는 모든 원소를 반복적으로 가져오기 위해 `next()` 를 호출하는 것과 동일한 일을 수행하는 명령어이다. 하지만 인터프린터에서 속도에 최적화 되어있기 떄문에 바이트 코드 명령어에서는 보이지 않는다.


## Iterator (이터레이터)
이터레이터는 `next()` 를 호출할 때 다음값을 생성해내는 상태를 가진 헬퍼 객체이다. `next()` 를 가진 모든 객체는 이터레이터다.  값을 생성해내는 방법과는 무관하다.

이터레이터는 값 생성기라고 볼 수 있다. *다음값* 을 요청할 떄마다 내부 상태를 유지하고 있기 때문에 *다음값* 을 계산하는 방법을 알고있다.

파이썬의 itertools 의 모든 함수는 이터레이터를 반환한다. 일부는 무한 시퀀스를 생성하며 일부는 유한 시퀀스로부터 무한 시퀀스를 생성하고 일부는 무한 시퀀스로부터 유한 시퀀스를 생성한다.

## Reference
[이터레이터와 제너레이터](https://mingrammer.com/translation-iterators-vs-generators/)