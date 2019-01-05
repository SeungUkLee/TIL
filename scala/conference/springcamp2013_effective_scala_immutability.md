# Effective Scala - Immutability

이 글은 [SpringCamp2013 - Effective Scala](https://www.youtube.com/watch?v=WbV467V8o0w) 를 보고 정리한 글입니다.

---

크게 스칼라의 **Immutability** 와 **Composability** 를 다룬다. (Composability 는 Effective Scala - Composability 참고)

## Immutability

**Immutability** 란 한번 만들어진 객체는 영원히 변하지 않는 것. 크게 2가지 종류가 존재한다.
- 참조 불변성 : 어떤 변수에 assign 된 것은 절대 바뀌지 않는다.
- 객체 불변성 : 객체가 만들어지면 그 객체는 절대바뀌지 않는다.

스칼라에서 `var` 보다는 `val` 사용을 권장(참조 불변성)하며 `collection.mutable` 보다 `collection.immutable` 사용을 권장(객체 불변성)한다.

스칼라에서 기본적으로 import 되는 Predef 패키지가 있다. 이는 map 을 사용하면 자동적으로 immutable map 으로 변경하여 불변성을 확보해준다.

참조 불변성과 객체 불변성을 이용하면 총 4가지 방법이 나오는데 이중 객체 불변성이 항상 우선이다.

~~~ scala
import collection._
val map = immutable.Map("Lion" -> "10.7") // O
var map = immutable.Map("Lion" -> "10.7") // O
val map = mmutable.Map("Lion" -> "10.7")  // X
var map = mmutable.Map("Lion" -> "10.7")  // X
~~~

그럼 불변성을 유지하는 것이 왜 필요한가? 객체에서 상태(state)를 제거하여 디버깅이 쉽고 병렬화 하기 쉽다. 또한 **참조 투명성(referential transparency)** 을 유지하는데 좋다. **함수를 일반적인 값으로 잘 다루기 위해서는 참조 투명성이 꼭 필요하고 참조 투명성을 유지하기 위해서는 불변성이 필요하다.**

여기서 참조 투명성이란 프로그램의 다른 동작을 바꾸지 않고 어떤 표현식(expression)을 그에 해당하는 값으로 **치환(substution)** 할 수 있을때, 그 표현식은 참조 투명하다고 말한다. 어떤 컨텍스트 어떤 환경에서 불러도 항상 같은 입력값이 들어오면 항상 같은 결과를 리턴한다.(파라미터에만 의존한 리턴값을 리턴한다)

참조 투명성이 가지는 이점은 다음과 같다.
- 프로그래머와 컴파일러가 프로그램의 행동에 대해 유추하기 쉽도록 만든다.
- 따라서, 코드와 알고리즘이 간결해지고 구현이 올바르다는 사실을 증명하기 쉽다.
- memoizatioin(계산기억하기), common subexpression elimination(공통된 표현식 미리 제거하기), parallelization(병렬화) 등을 통해 코드를 optimization(최적화)이 쉽다.(memoization 을 통해 호출할 때 드는 오버헤드를 줄일 수 있다)

하지만 불변성을 유지한다고 해서 장점만 있는 것은 아니다.
- 성능에서의 손해를 감수해야됨
- 기존의 익숙했던 for, while 보다는 재귀호출, fold(쌓아가기)에 익숙해져야한다.
- 때로는 코드가 오히려 더 복잡해진다.

스칼라에서 불변성을 유지하라면 다음 3가지를 적극적으로 활용해야한다. 이는 불변성을 유지하기위한 scala 프로그래밍의 핵심이다.
- `case class`
- `foldLeft`
- `@tailrec`

### case class
`case class` 는 불변성을 유지하는 class 이다. 함수형 언어의 대수적 데이터 타입(ADT)에 대응되며 객체지향형 언어의 데이터 전달 객체(DTO)에 대응된다고 보면 된다. 또한 pattern matching(패턴 맞추기)을 사용하기 위한 핵심이다.

> ADT란?
  기본적인 타입을 가지고 다시 새롭게 조합하여 어떤 타입을 만드는것.
  이것을 마치 컴파일러가 기본적으로 지원하는 타입인것처럼 사용할 수 있다.


#### case class 의 갱신
- 데이터를 변경하려면 새로운 case class를 만들어야 한다.
- `apply()` 메소드 사용 (갱신되는 데이터가 많은 경우)
- `copy` 생성자 사용 (갱신되는 필드가 적을 경우)

#### case class 특징
- 마치 언어에 내장된 데이터 타입처럼 자연스럽다.
- 인자가 너무 많거나, 데이터 구조가 너무 깊으면 곤란한 상황에 빠질 수 있다.

copy 지옥의 example
~~~ scala
case class Person(name: String, age: Int, address: Address)
case class Address(street: String, state: String, country: Country)
case class Country(name: String, location: Location)
case class Location(latitude: Double, longitude: Double)

val company = Address("Nuritkum Square", "Seoul", Country("Republic of Korea", Location(37.34, 126.53)))
val person = Person("John", "30", company)

val persionInNewLocation = 
    person.copy(
        address = persion.address.copy(
            country = preson.address.country.copy(
                location = person.address.country.location.copy(
                    longitude = person.address.country.location.longtitude + 1.0
                )
            )
        )
    )
~~~

위 예제와 같이 copy 지옥에 벗어나려면 자주 업데이트 되는 필드는 helper method 를 따로 만들어 사용하던가 shapeless(scrap your boilerplate) / scalaz(lens) 의 라이브러리를 사용해야한다. 특별히 쉬운 방법은 없다.


case class 에 구현된 기본적인 `equal` 메소드는 자기 이름 옆에 나열되어있는 elements 들에 대해서만 비교를 수행하여 case class 내부 state 가 들어가 있으면 이들은 비교대상에서 제외된다. 그렇다면 case class 의 `equal` 메소드를 오버라이딩하면 되지 않을까하고 생각할 수 있지만 이는 스칼라에서 권장하지 않는다. 뿐만 아니라 case class 자체를 inheritence(상속) 받는 것도 권장하지 않는다.

#### 정리
- 언어에 내장된 상수형 기본 데이터 타입인냥 사용하자
- 상태나 상속이 필요하면 그냥 class 를 사용하자
- case class 에 일반 class 를 넣어 사용하는 것을 피하자

### fold 
- 부수효과가 없는 반복문
- 값 중심의 연산이기 때문에 함수형 언어에서 반복 연산을 담당

#### fold vs 명령형 언어 for
- 일반적인 반복문은 아무것도 되돌려 주지 않는데(return 값이 없다) fold 는 항상 값을 돌려준다
- 일반적인 반복문은 연산중심, fold 는 값이 어떻게 변화하는지를 중심(값 중심)

컬렉션 안의 값들에 각각 1을 더하는 코드를 생각해보자.
1. fold
~~~ scala
val col = List(1, 2, 3, 4, 5)
val result = col.foldRight(List.empty[Int]) {
    (elenm.list) => (elem + 1)::list
}
~~~

결과로 얻어야 하는 것은 List, 주어진 List의 원소 각각에 1을 더해 빈 리스트에 쌓아나가는 방식으로 생각하고 접근 (**값 중심** 으로 생각)

2. for
~~~ java
int array[] = {1, 2, 3, 4, 5};
for(int i = 0, i < array.length; i++) {
    array[i] = array[i] + 1;
}
~~~

Array 각각의 칸에 1을 더하는 작업을 Array 길이 만큼 반복하는 방식으로 생각하고 접근 (**연산 중심** 으로 생각)

#### 정리
- 항상 값 중심으로 먼저 생각하자
- 많이 사용해보자
- 성능지 중요하거나 부수효과(side effect)가 꼭 필요하면 `for` 대신 `while` 을 쓰자 (Scala의 `for` 는 흔히 다른 언어에서 사용되는 `for` 와 다르다)

### tailrec (꼬리 재귀)
꼬리 재귀는 재귀 호출의 단점인 stack overflow(스택 넘침)를 극복한 것이다. 꼬리 재귀를 이용하면 함수 호출을 단순한 반복문으로 최적화하기 때문에 stack overflow 및 호출 부담을 줄일 수 있다. 

다음 예제는 컬렉션 안의 값들에 각각 1을 더하는 예제를 재귀 호출과 꼬리 재귀를 이용한 코드이다.

~~~ scala
def addOne(list: List[Int]): List[Int] = list match {
    case Nil => Nil
    case head::tail => (head + 1)::addOne(tail)
}

val col = (0 to 1000000).toList
val result = addOne(col)
~~~

위 코드는 꼬리 재귀를 사용하지 않은 것이다. `addOne()`들의 결과를 알 수 없으니 값들을 기억하고 있어야한다. 따라서 함수를 계속 호출할때마다 스택에 쌓여 결국에는 `java.lang.StackOverflowError` 가 발생한다. 즉 `(head + 1)` 부분을 기억하고 있지 않고 함수호출때 넘겨주면 된다.

~~~ scala
@tailrec
def addOne(list: List[Int], result: List[Int] = List.empty): List[Int] = list match {
    case Nil => Nil
    case head::tail => addOne(tail, (head + 1)::result)
}

val col = (0 to 1000000).toList
val result = addOne(col)
~~~

위 코드는 재귀 호출의 문제점을 해결한 꼬리 재귀 예제이다. 코드를 보면 `@tailrec` 을 볼 수 있는데 이는 컴파일러가 이것이 꼬리 재귀임을 확인 할 수 있도록 표시를 해둔것이다. 따라서 꼬리 재귀가 아닌데 `@tailrec` 이 붙어있으면 컴파일 에러가 발생한다.

#### 정리
- 동일한 형태의 fold 를 여러번 재사용 해야 할 때 꼬리 재귀 형태의 함수로 만들자
- 기본 인자를 사용하면 helper method 를 따로 만들지 않아도 되므로 편하다
- `@tailrec` 을 붙여 꼬리재귀 임을 컴파일러에게 확인받자.

### 결론(불변성 정리)
- 함수에서 참조 투명성이 깨지지않도록 잘 지켜주는 것이 좋다
- 함수를 일반적인 하나의 값으로 사용하자

## Reference
[SpringCamp2013 - Effective Scala](https://www.youtube.com/watch?v=WbV467V8o0w)