# Scala

## Hello world scala

모든 Program 은 시작 지점(Entry Point)이 필요하다. 스칼라 같은 경우 다음과 같이 여러 Entry Point 들이 있다.

```scala
object Basics {
  def main(args: Array[String]): Unit = {
    // ...
  }
}
```

```scala
object Simple extends App {
  // ...
}
```

이 둘의 차이점은 `args` 를 사용하고 안하고의 차이이다.

## val, lazy val, def
`val`, `lazy val`, `def` 의 차이점은 무엇인가? 이를 알기위해서는 표현식의 평가가 어떻게 진행되는지를 알아야한다.

### 표현식과 값
프로그래밍언어에서 표현식은 무엇인가, 표현식이란 평가(Evaluation)을 통해서 값으로 바뀌는 식 혹은 결과값이 있는 식을 말한다.

```scala
object Expression extends App {
  println(5 + 4)
}
```

이 코드는 `5 + 4` 가 `9` 로 계산되어 출력되는데 `9` 를 `5 + 4`의 평가 결과, 또는 표현식의 값이라 하며 `5 + 4` 를 표현식이라 한다.

### 표현식의 평가 방법

```scala
object Evaluation extends App {
  val cooktimeInMin = {
    println("Hi I'm cup noodle!")
    4
  }
  println("Let's start cooking!")
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("Oh, " + cooktimeInMin + " min is soooo short!")
}
```

```
Hi I'm cup noodle!
Let's start cooking!
Cup noodle takes 4 min.
Oh, 4 min is soooo short!
```

이번에는 `val` 을 `lazy val` 로 바꾸어 실행해보자.

```scala
object Evaluation extends App {
  lazy val cooktimeInMin = {
    println("Hi I'm cup noodle!")
    4
  }
  println("Let's start cooking!")
  println("Cup noodle takes " + cooktimeInMin + " min.")
}
```

```
Let's start cooking!
Hi I'm cup noodle!
Cup noodle takes 4 min.
Oh, 4 min is soooo short!
```

차이점이 보인다. `lazy val` 의 경우 `cooktimeInMin` 이 더 늦게 평가된다. 그럼 언제 늦게 평가되는가? 바로 **정의된 이름이 처음 사용**될 때 평가된다.

`val` 같은 경우는 **정의되자 마자** 평가된다.

다음 코드를 실행하면 그 중요성을 알 수 있다.

```scala
object Evaluation extends App {
  val noodleCookingTimeInMin = {
    Thread.sleep(5000)
    println("Hm... it's hard to calculate!")
    4
  }
  println("Let's start cooking!")
  println("To make hamburger, let's start with making patty!")
}
```

```scala
object Evaluation extends App {
  lazy val noodleCookingTimeInMin = {
    Thread.sleep(5000)
    println("Hm... it's hard to calculate!")
    4
  }
  println("Let's start cooking!")
  println("To make hamburger, let's start with making patty!")
}

```

마지막으로 `def` 는?

```scala
object Evaluation extends App {
  def cooktimeInMin = {
    println("Hi I'm cup noodle!")
    4
  }
  val secPerMin = 60
  println("Let's start cooking!")
  println("Cup noodle takes " + cooktimeInMin + " min.")
  println("Or, it takes " + cooktimeInMin * secPerMin + " sec.")
}
```

`val` 코드와 위 코드를 실행해보면 차이점을 알 수 있다. `def` 는 사용될 때마다 평가된다.

### var 을 사용한 정의

`val` 키워드 말고 `var` 라는 키워드도 있다. 이 둘은 표현식이 평가되는 방식이 동일하다. 즉 정의하는 즉시 평가된다. 그럼 차이점은 무엇인가?

```scala
object Definition extends App {
  val cooktimeInMin = 2
  cooktimeInMin = 4
}
```

```scala
object Definition extends App {
  var cooktimeInMin = 2
  cooktimeInMin = 4
}
```

위 코드들을 실행해보면 `val` 을 사용한 코드는 실행에 실패하고 `var` 은 성공하는 것을 볼 수 있다.

`val`, `lazy val`, `def` 는 한 번 명명한 뒤 그 이름을 다른 값을 위해 사용할 수 없다.

`var` 을 사용하는 것은 그 안의 내용물을 언제든지 변경할 수 있는 **변수를 정의**하는 것이다. 

다른 언어들을 기준으로 쉽게 말하면, `var` 는 일반적으로 변수를 정의하는 것이고 `val`은 `const`, `final` 등의 keyword 를 붙여서 상수(비슷한 것)를 정의하는 것이다.

### 명명과 정의

스칼라에서는 주로 `val`, `lazy val`, `def` 를 사용하는 것이 기본이고 어쩔 수 없이 필요한 경우 (성능 문제 등) 한정적으로 `var` 을 사용한다. 이는 버그를 피하기 위한 코딩 스타일중 하나이다. (여러 언어들도 마찬가지)


## Reference
* [Scala로 시작하는 Hello World · 안녕 프로그래밍](https://www.holaxprogramming.com/2017/11/14/scala-hello-world/)
* [Scala에서의 값 명명과 표현식 평가 · 안녕 프로그래밍](https://www.holaxprogramming.com/2017/11/18/scala-value-naming/)
