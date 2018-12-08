강의를 시작하기 전에 필요한 setup 을 하는 시간이었다. 우선 `sbt` 를 설치하였다. Mac 환경이라 `brew` 를 통해 설치하였다. 

[sbt 공식사이트](https://www.scala-sbt.org/download.html) 에서 소개하는데로 설치를 하였다.

~~~ shell
$ brew install sbt@1
~~~

IDE 는 Intellij 를 사용하였고 Intellij 에서 Scala plugin 을 다운로드 받았다. 강의에서 프로젝트 생성 및 import 하는 방법을 상세히 가르켜 주고 있었다. 

매 강의 마다 과제를 주는데 이를 해결하고 제출해야한다. 

과제는 recursion(재귀) 를 활용하여 `List` 의 `sum` 과 `max` 메소드를 구현하는 것과 간단한 테스트 코드를 작성하는 것이었다.

~~~ scala
object Lists {

    def sum(xs: List[Int]): Int = {
      if (xs.isEmpty) 0
      else if (xs.tail.isEmpty) xs.head
      else xs.head + sum(xs.tail)
    }
  
    def max(xs: List[Int]): Int = {
      if (xs.isEmpty) throw new java.util.NoSuchElementException();
      else if (xs.tail.isEmpty) xs.head
      else if (xs.head > xs.tail.head) max(xs.head :: xs.tail.tail)
      else max(xs.tail)
    }
  }

~~~

테스트 코드에는 Scala 테스트에 대해 상세히 설명되어있다.
설명은 다음과 같다.

---
test suite 는 단순히 프로그램의 component 에 대한 테스트 모음.

test suite 는 `org.scalatest.FunSuite` 타입을  `extends` 하는 클래스를 정의함으로써 생성.

~~~ scala
class ListsSuite extends FunSuite { ... }
~~~

`@RunWith` 어노테이션을 추가하면 built-in JUnit test runner 를 사용하여 tes t suite 를 실행할 수 있다.

test suite 는 실행하기 위한 2가지 방법이 있다.
1. sbt 콘솔에서 test 명령을 실행하는 방법
2. ide 를 통해 테스트하는 방법

테스트는 2개의 arguments 를 취하는 `test` operator 를 사용하여 작성.

1. test 에 대한 설명 - 이 설명은 고유해야한다.
2. test body - 테스트를 구현하는 스칼라 코드.

test body 를 구현하는 가장 일반적인 방법은 `assert` 메소드를 사용하는 것.
인자가 `true` 인지 평가한다.

~~~ scala
test("one plus one is two")(assert(1 + 1 == 2))
~~~


스칼라에서는 block syntax 즉 `( )` 대신 `{ }` 를 사용하여 메소드에 인수를 전달 가능하다. 이렇게 하면 테스트를 보다 읽기 쉬운 방법으로 작성할 수 있다.

~~~ scala
test("one plus one is two"){
	assert(1 + 1 == 3)
}
~~~


만약 위 코드를 테스트 하면 문제점이 하나 있다. 바로 실패한 이유를 알려주지 않는다는 것이다. 이 상황에서 `==`` 대신에 `===` 를 사용해야한다.(이는 ScalaTest 에서만 가능)
테스트를 작성할 때는 항상 `==` 대신에 `===` 연산자를 사용하는 것이 좋다.


예외 처리 방법을 테스트하기 위해 `intercept` operator 를 사용한다.
~~~ scala
test("intNotZero throws an exception if its argument is 0") {
  intercept[IllegalArgumentException] {
    intNotZero(0)
  }
}

def intNotZero(x: Int): Int = {
  if (x == 0) throw new IllegalArgumentException("zero is not allowed")
  else x
}

~~~


