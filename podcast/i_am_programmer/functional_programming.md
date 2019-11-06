# 나는 프로그래머다 - 함수형 프로그래머를 찾아서

## 1부

[24:40 ~ ]

스칼라를 FP 쪽으로 사용하려고 하다보면은 하스켈보다 표현하기 어려운 부분이 생긴다(개념적인 부분도). 예를 들어서 하스켈의 Algebra Data Type 에 대응하는 것이 스칼라에서는 sealed trait 과 case class 이다. 차이점은 하스켈로 보자면 타입 노출은 trait 만 되고 case class 는 타입이 아니라 데이터이기 때문에 외부에 타입으로 노출이 안된다.


[31:55 ~ ]

Natural transformation -> morphism of functors
쉽게 말하자면 데이터를 바꾸는 것이 아니라 데이터 밖 Functor 를 바꾸는 것, 껍데기를 바꿈


### Further more

* [개미 수열을 푸는 10가지 방법](https://leanpub.com/programming-look-and-say)

* [LINQ (링크)](https://en.wikipedia.org/wiki/Language_Integrated_Query)

* [SICP (무료로 다운 가능합니다)](https://mitpress.mit.edu/sicp/)

* [Haskell](https://en.wikipedia.org/wiki/Haskell_(programming_language))


* [F#](https://en.wikipedia.org/wiki/F_Sharp_(programming_language))


* [ML](https://en.wikipedia.org/wiki/ML_(programming_language))

* [Functor](https://en.wikipedia.org/wiki/Functor)

* [Natural Transformation](https://en.wikipedia.org/wiki/Natural_transformation)

---

## 2부

**함수형 프로그래밍의 장, 단점**

함수형 언어 프로그래밍 패러다임이 다른 패러다임과 다른점이 추상화를 어디까지 시도하느냐 부분 같다. 굉장히 작은 패턴까지도 추상화 시키고 그 추상화 속에서도 패턴을 찾아서 또 추상화시키고... A라는 문제를 그냥 풀 수 있는데 "A 속에서는 먼가 다른 개념이 녹아있네? 그 개념을 뽑아내서 A는 그 다른 개념의 하나의 special case 구나!" 하고 발견하고 공부하는 것이 굉장히 재밌다. 이런 추상화들에 익숙해지게 되면 몇 개 안되는 추상화들이 여러 문제를 해결하는데 도움을 줄 수 있고 이 부분에서는 생산성에 굉장히 큰 도움을 줄 수 있다. 어떤 문제들이 한번 추상화 시켰더니 "이거는 A구나, 이거는 B구나" 이렇게 되면 이 솔루션들을 바로 적용시킬 수 있기 때문이다.

하지만, 생산성이 마이너스 되는 부분은 당장 풀어야될 A라는 문제가 있는데 "이거는 어떻게 더 추상화 할 수 있지? 아! 이렇게 추상화 될 수 있고 저렇게도 되네.." 이렇게 고민을 많이 하게되고 문제는 점점 산으로 가는 경우가 발생한다. 

스칼라 같은 경우도 똑같은 문제로 굉장히 많은 풀이가 나오는데 선택지가 많다는 것은 생산성의 마이너스 요인이라고 생각한다. 

[3:30 ~]

또 다른 장점으로는 추상화를 연습하는데 큰 도움이 되는 것 같다. 처음에는 오버엔지니어링일 수 있는데 특정 임계점이 넘어가는 순간 코드양이 많이 줄어드는 모습을 볼 수 있다.

[5:35 ~]

어떤 하나의 개념을 배울 때 한번씩 오버를 해봐야되는 것 같다. 그래야지 다시 step back 할 수 있다. "나는 여기까지 써볼래" 하면 그 기술이 어디까지 가는지 경험을 못해보기 때문에 한계를 정해두는 것 보다는 오버 해보면서 생각해보는 것도 좋을 것 같다.

[6:20 ~]

OOP polymorphism 을 통해 해결하려고 했는데 FP의 Free Monad 와 비슷한 개념으로 해결을 해보았다.

[7:50 ~]

Free Monad, Freer Monad

[10:50 ~]

Haxl

[15:00 ~]

개미수열

[23:50 ~]

코루틴이 어찌보면 개미수열 문제의 핵심인 것 같다.

Lazy evaluation은 코루틴을 구현하는 또 다른 하나의 수단(모양)으로 볼 수 있었다. 

제너레이터는 일종의 코루틴이다.

Lazy evaluation 이 적용된 Lazy stream 의 동작방식이 사실은 코루틴의 동작방식과 굉장히 비슷하다.

[26:30 ~]

그러면 코루틴은 참조 투명성을 보장해야 가능한 것인가? 없어도 상관없는 것인가? 
코루틴 자체는 런타임이 지원해야되는 부분이라서 상관없다.

### Futher more

* FP가 가지는 장점은?

    - 추상화의 극대화!

    - 자취를 감추는 코드들. 코딩은 하는거 보다 지우는 것이 더 중요합니다!


* [Monad](https://en.wikipedia.org/wiki/Monad_(functional_programming))

* [Free Monad](https://en.wikipedia.org/wiki/Monad_(functional_programming)#Free_monads)

* [Freer Monad](http://okmij.org/ftp/Haskell/extensible/more.pdf)

* [Facebook Haxl](https://github.com/facebook/Haxl)

* [Audrey Tang](https://en.wikipedia.org/wiki/Audrey_Tang)

    > Audrey Tang은 Perl 6 컴파일러 및 인터프리터인 Pugs를 Haskell로 만드신 대만의 개발자 이며, 현재는 대만의 정무장관을 역임하고 계십니다.

* [개미수열 (Look and Say Sequence, 읽고 말하기 수열)](https://ko.wikipedia.org/wiki/%EC%9D%BD%EA%B3%A0_%EB%A7%90%ED%95%98%EA%B8%B0_%EC%88%98%EC%97%B4)

* [개미 수열을 푸는 10가지 방법](https://leanpub.com/programming-look-and-say)

* [Coroutine](https://en.wikipedia.org/wiki/Coroutine)

* [Goroutines](https://tour.golang.org/concurrency/1)

---

## 3부

[16:10 ~]

함수형 프로그래밍은 추상화에 굉장히 신경을 많이 쓴다.

**Functor 란?**

값을 어딘가 감싸서(`List`, `Array` 처럼) 어떤 함수를 적용하고 싶다. 그랬더니 계속 똑같은 패턴이 반복해서 나타났고 이를 따로 분리한 것이 `map` 이다. 이를 수학적으로 보았는데 Functor 라는 개념과 굉장히 유사해서 이런 이름이 붙여진것 같다.

간단하게 `map` 을 가진 타입 정도로 일단 이해하면 될 것 같다.

Functor 라는 이름이 하스켈 같은 곳에서 어떻게 만들어졌는지 보면 어떤 것을 추상화를 해서 프로그래밍 언어로 표현하고 싶어 나온 것 같다. JAVA8을 보면 `map` 가능한 여러 타입들이 있다. `Stream`, `Optional` 등 `map` 이라는 메소드를 가지고 있지만 이것을 아우르는 하나의 타입은 언어적인 한계 때문에 (**Higher Kinded Type** 이 없어서) 만들지 못했다. 하스켈같은 함수형 프로그래밍하는 사람들한테는 이것마저도 하나의 개념화를 시키는, 프로그래밍 언어에 표현하고 싶어서 Functor 라는 이름을 지어서 나온 것 같다.


[20:53 ~ ]

함수형 언어들 중에서도 Higher Kinded Type 를 지원하지않는 언어들도 있다 (Elm, F# 등). 

Higher Kined Type 은 어떻게 설명하면 좋을까? 우선 Kind 와 Type 을 알아야되는데 OOP 하는 사람한테 설명하기가 어렵다. Algebra Data Type 같은 경우도 type 이 있고 data 가 있는데 이 부분도 OOP 하는 사람들에게는 설명하기 어려워서 그냥 쉽게 생각해서 interface 랑 class 라고 설명하고 넘어간다고 한다. 그래서 아쉽지만 Higher Kinded Type 부분은 설명없이 넘어갔다 ㅠ.ㅠ

### Futher more

* [하스켈 학교](https://www.facebook.com/groups/1065398240148353/)


* [서광열님의 하스켈 블로그](http://kseo.github.io/)


* [Functional Programming Principles in Scala](https://www.coursera.org/learn/progfun1)


* [Introduction to Functional Programming (Haskell코스)](https://www.edx.org/course/introduction-functional-programming-delftx-fp101x-0)

* [Functor](https://en.wikipedia.org/wiki/Functor)

---

## 4부

**Monad** 란?

Functor 와 마찬가지로 Monad 를 잘 몰라도 잘 사용하고 있다. 대표적으로 Promise 가 있다. Promise 의 `then` 메소드가 엄밀하게 따지면 `map` 이라는 Functor 기능과 `bind` (또는 `flatMap`) 라는 Monad 의 기능을 하나의 메소드로 오버로딩 시켜놓은 것이다.

[2:58 ~ ]

A를 B로 바꾸는 어떤 함수 `f` 가 있다고 하자. 함수형 프로그래밍은 함수 `f` 가 일을 하면서 다른일 (전역변수의 값을 변경한다던지, Log 를 남기다던지) 을 하면 안되는 엄격함이 있다.

하지만 우리 프로그램은 일을 하면서 다른 일도 해야한다. 그러면 이것을 감추지말고 타입에 들어내자고 해서 감싼 타입들이 생겨나게된다 (자바를 예를 들자면 제네릭스처럼). 그렇게 되면 "어떤 함수들이 A를 받아서 B로 만들어내는데 무언가 다른일을 더 한다" 하는 관계가 생긴다. 이러한 함수들로 합성하고 싶은데 쉽게 할 방법이 없다. 이를 도와주는 것이 바로 Monad 다.

정리하자면, 다른 일을 하는 함수들을 쉽게 합성하고 싶은데 그 때 마다 코드 패턴이 똑같이 나오니 그것을 Monad 에다가 그 일을 시키는 것이다. 그러면 우리는 다른 일을 하는 함수 들을 쉽게 합성이 가능하다.

예를 들어 Java8 의 `Optional` 타입이 있다. "A가 B를 만들어내는데 B가 없을 수 있다" 이를 `Optional` 타입으로 나타낸 것이다. `Integer -> String` 하는데 `String` 이 없을 수 있어서 `Integer -> Optional<String>` 처럼 한다. 그런데 이와 같은 함수 `String -> Optional<Studuent>` 가 또 있다고 하자. 이 둘 함수를 어떻게 합성할까? `flatMap` 을 통해 부가적인 일을 하는 두 함수를 쉽게 합성이 가능하다. 그럼 `Optional` 은 이 둘의 공통되는 코드를 뽑아내야하는데 그것이 바로 null check 하는 부분이다.

이런 것들을 Functor 가지고는 해결이 안된다. `map` 을 사용하자니 `Integer -> Optional<String>`, `Optional<String> -> Optional<Optional<Student>>` 처럼 `Optional<Optional .. >>` 와 같이 `Optional` 로 계속 감싸지기 때문에 합성이 제대로 이루어지기 힘든 문제가 발생한다.

[8:46 ~]

`map` 을 따로 추출해서 Functor 라는 개념을 만든 것처럼 flat 화 시키는 과정을 Monad 라는 이름으로 추상화 시킨 것이라고 이해하면 될 것 같다. 쉽게 생각해서 그냥 코드 패턴이라고 생각하자. 이러한 코드 패턴을 발견하다보니 굉장히 쓰임새가 많아 졌다.

[9:55 ~]

Monad 는 굉장히 종류가 많다. Free Monad, State Monad, Co Monad, IO Monad 등등...

[11:01 ~]

[The Interpreter Pattern Revisited](https://www.youtube.com/watch?v=hmX2s3pe_qk) 를 통해 Free Monad 에 대해 조금 알 수 있다.

[13:25 ~ ]

SICP 에 따르면 프로그래밍은 어떤 문제를 기술하는 언어를 만들고 그 언어의 인터프린터를 만드는 과정이다. 이러한 관점으로 보자면 어떤 문제를 기술하는 언어를 만든다는 것은 어찌보면 DSL 을 디자인 한다고 볼 수 있다.

> DSL 은 크게 두가지 종류가 있다.
> 1. External DSL
> 2. Embeded DSL (Internal DSL)

Free Monad 는 embeded DSL을 만들기에 굉장히 효과적인 접근방법이다. (개미수열 문제를 해결하는데 한번 적용을 해봤다고 함)

Free Monad를 통해 mock 없이 테스팅이 가능함

[16:52 ~ ]

Monad가 가지는 장점
어떤 시퀀셜한 프로그래밍, 오히려 Impretive Programming 을 함수형 프로그래밍에서 할 수 있는 어떤 도구들을 제공한다. State Monad 등등 여러 Monad 가...

[17:33 ~ ]

**Free Monoid**

Monoid 는 더하기가 가능한 타입 (`Int`, `String` 등) 이다. 

더하기가 가능한 타입이 아닌데 자동으로 더하기가 가능하게 해주는 방법이 있다. 바로 `List` 에 집어 넣는 것이다. `List` 에 무엇이 들어있든 `List` 의 concatenation 으로 더할 수 있다. 

> ex)`Car` + `Car` 은 말이 안되지만 `List<Car>` + `List<Car>` 은 말이 된다.

내부적으로는 더해지는 것은 아니고 `List` 가 합쳐져서 길어질 뿐이다. 어찌되었든 실제 어떤 타입이든 `List` 에 넣는 순간 일단은 더하기가 가능해진다. 실제 더하기를 어떻게 하는지 모르지만 일단은 `List` 에 넣는 순간 더하기가 가능한 것이다. 그러다가 들어있는 데이터들끼리 더하기가 될 수 있는 방법이 생기면(발견하면) 그 때 더할 수 있게 차곡차곡 쌓아놓는 것일뿐이다. 그래서 `List` 를 Free Monoid 라고 한다.

마찬가지로 **Free Monad** 는 어떤 타입이 Monad 가 되려면 flat 하게 처리할 수 있는 합성밥법을 제공해줘야되는데 그 방법을 아직 모른지만 Free Monad 속에 그 어떤 타입을 넣으면 그 녀석은 갑자기 Monad 가 된다. 어떻게 flat 하게 합성할지는 모르겠지만 일단 차곡차곡 쌓아두는 것이다. 그리고 Monad 가 제공하는 Impretive Programming 스타일의 Monad compressions (haskell 의 `do`, scala의 `for`) 같은 것을 갑자기 쓸 수 있게 되는 것이다. 

아직은 Monad 인지 모르는데 (flat 하게 합성할 수 있는 방법을 몰라서) Free Monad 는 `List` 처럼 차곡차곡 쌓아둔다. 그러면 마지막으로 인터프리터가 그 효과들을 누적적용하면서 원하는 결과를 만들어낼 수 있는 것이다. 그래서 Free Monad 는 `List` 와 많이 비슷하다.

[20:34 ~ ]

인터프린터를 바꾼다는 것은 우리가 어떤 오퍼레이션을 기술할 언어를 만들었다고 하자. 그 언어를 여러개의 타입 혹은 인스턴스로 만들어서 Free Monad 안에 넣으면 갑자기 composition 이 가능한 언어가 된다. 왜냐하면 Monad 는 composition 에 대한 것이기 때문에. 그러면 그렇게 compostition 을 다하고 나면은 이 녀석이 실제 하는 일은 아무것도 없는데 "내가 이런 이런 명령들을 이런 식으로 합성할거야" 라는 정보만 가지고 있는 것이다. 그런 다음에 그것을 인터프리터가 실제로 그 일들을 하는 것이다.

보통 인터프린터는 크게 2개, 3개 정도만 만든다고 한다. 하나는 테스트 용도, 다른 하나는 Real. 그리고 Real 중에서도 다른 environment 정도해서 완전히 분리시켜놓는 것이다. 내가 어떤 오퍼레이션을 기술하는 언어하고 오퍼레이션을 실행하는 것이랑 완전히 분리 시켜놓을 수 있는 이득을 얻을 수 있다.

[22:40 ~ ]

Free Monad 로 기술한 어떤 오퍼레이션은 사실 굉장히 pure 한 명령의 트리에 불구하다. 그래서 AST (Abstract Syntax Tree) 라고 표현하기도 한다. 실제 하는일은 없이 그냥 명령들을 트리로 나열 해놓을 뿐인 것이다. 

그래서 이를 적용한 사례들을 보자면, CouchDB, Redis 같은 DB 오퍼레이션 명령들을 DSL 로만 나타내놓는 것이다. 그러면 우리는 Redis 랑 실제 이야기하는 것은 아직 구현하지않고 "나는 Redis 랑 이러한 커맨드들로 이런 오퍼레이션들을 할 거야" 하는 Free Monad 를 이용하면 쉽게 DSL을 만들 수 있다. 그러면 그 인터프린터는 실제 Redis 의 어떤 인스턴스랑 붙어서 데이터를 주고 받을 수 있는 것이다.

### Further more

* [Kind (type theory)](https://en.wikipedia.org/wiki/Kind_(type_theory))

* [Scala: Types of a higher kind](https://blogs.atlassian.com/2013/09/scala-types-of-a-higher-kind/)

* [Monad](https://en.wikipedia.org/wiki/Monad_(functional_programming))

* [Douglas Crockford의 Monad 설명](https://www.youtube.com/watch?v=dkZFtimgAcM)

* [Free Monad](http://underscore.io/blog/posts/2015/04/14/free-monads-are-simple.html)

* [Functional Programming in Scala](https://www.manning.com/books/functional-programming-in-scala)

* [The Interpreter Pattern Revisited](https://www.youtube.com/watch?v=hmX2s3pe_qk)

* [Abstract Syntax Tree (AST)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)

* [Doobie (a pure functional JDBC layer for Scala)](https://github.com/tpolecat/doobie)

---

## 5부 (마지막)

Free Monad 를 이야기하면 트램폴링에 대해서 이야기가 나온다. 이것은 스칼라에서 구현하다 보니 JVM 의 한계 때문에 트램폴링이 필요해져서 나온것이다. (계속 합성하여 스택오버플로우가 발생하기 때문에). Free Monad로 적용되서 어떤 명령의 트리가 만들어지면  그 명령의 트리를 나중에 인터프리터가 실행시켜줘야되는데 인터프리터가 실행시킬때 트리가 크면 클 수록 스택오버플로우가 발생할 수 있기 때문에 이 부분을 트램폴링을 적용해야된다. 자세한 내용은 다음 페이퍼를 참고하자 - [Stackless Scala With Free Monads](http://blog.higher-order.com/assets/trampolines.pdf)

[2:15 ~]

하스켈과 스칼라의 Free Monad는 조금 다르다. 스칼라는 하스켈보다 좀 더 practical 하게 접근하는 분위기가 있어서 그런 것 같다. 하스켈 Free Monad 의 Free 는 엄격하게 카테고리 이론에서의 정의가 있다. 스칼라쪽에서는 쉽게 공짜의 Free 이다. 그래서 하스켈 쪽 자료와 스칼라 쪽 자료를 볼 떄 모양이 다르다 (트램폴링이 들어가야되서 스칼라 쪽은 데이터 생성자가 3개가 존재, 하스켈은 2개).

[5:14 ~]

스칼라에서 트램폴링은 State Monad 에서도 필요하다. 연산 지연시켰다가 나중에 Running 해야되는 곳에서는 필요하기 때문에 State Monad 에서도 필요하다.

[6:05 ~]

**State Monad**

하스켈에서 보자면 전역변수 같은 것도 없고 간단한 카운터 하나 만들기도 어렵다. 그러다보니 함수에 계속 누적시켜야할 파라미터를 넘겨야되는 문제가 발생한다. 이런 것들을 잘 Monad 화 시켰다고 볼 수 있다.

자바나 일반적인 프로그래밍 언어에서는 별 쓸모가 없다. 하지만 하스켈에서 State Monad 가 단독으로 쓰이지는 않는다. Monad 는 하나의 효과에 대해서 하나의 Monad 가 생긴다고 볼 수 있는데 (ex. null -> `Maybe`) 프로그래밍에서 하나의 효과만 쓰지 않으니 이러한 효과들을 중첩을 시켜야되는 경우 발생한다. 그러면 중첩된 Monad 효과 속에 내가 원하는 어떤 데이터를 넣을 떄 많이 사용하는 것 같다.

[7:45 ~]

보통 Monad를 여러개 중첩해서 쓰이기위해 사용하는 방법중에 Monad Transformer 라는 개념이 있는데 이것은 Monad 속에 Monad 를 집어넣고 싶을 떄 사용하는 것이다. 거기에 State 를 많이 끼어넣는 것 같다. 그러면 커다란 오퍼레이션을 진행하는 중에 중간에 내가 원하는 데이터를 쉽게 넣을 수 있다.

[8:12 ~]

Promise 도 이에 해당되는 것인가? Promise 는 비동기만 처리하는 것이고 거기서 굳이 효과를 중첩 시킬필요는 없다 (하스켈같은 경우는 효과 중첩이 어렵기때문).

Promise 관련된 것들을 보면 어디서는 Completion 이 보장된 Future 다. 또 어디서는 Future 는 Readable 인데 Promise 는 Writable 이다. Promise 를 Readable interface 라고 보고 다른 곳에서는 Future 를 Readable interface 라고 본다. 라고 특징을 부여하곤 하는데 이거는 언어마다 가져다 쓴 용어 정의가 달라서 그 단어가 나올때 컨텍스트를 같이 보는 것이 좋은 것 같다.  

[14:34 ~]

함수형 프로그래밍을 하면서 업무에 도움이 된 적이 있었나? (변화가 있었나?)

-> 코드를 보는 관점이 많이 바뀌었다. 자신감 UP. 새로운 언어를 본다던지 라이브러리를 본다던지 좀 더 수월해진것 같다.

[20:53 ~]

C로 CSP 흉내내기

### Further more


* [Trampoline ([트램폴린])](https://en.wikipedia.org/wiki/Trampoline_(computing))

* [Functional Programming is Terrible](https://www.youtube.com/watch?v=hzf3hTUKk8U)

* [State Monad](https://wiki.haskell.org/State_Monad)

* [Monad Transformer](https://en.wikipedia.org/wiki/Monad_transformer)

* [Futures and promises](https://en.wikipedia.org/wiki/Futures_and_promises)

* [Groovy - Currying (6.1. Currying)](http://groovy-lang.org/closures.html)
