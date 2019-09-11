# Effective Scala - Composability

이 글은 [SpringCamp2013 - Effective Scala](https://www.youtube.com/watch?v=WbV467V8o0w) 를 보고 정리한 글입니다.

---

크게 스칼라의 **Immutability** 와 **Composability** 를 다룬다. (Immutability 는 Effective Scala - Immutability 참고)

# Composability 
- 부분이나 요소들을 모아서 전체를 짜 이루는 것.

스칼라는 scable 한 언어이다. Composability(구성성)은 이러한 scability 를 유지하게 해주는 요소이며 <U>경로 의존 타입, implicive parameter, trait, context bound, upper bound, low bound, type bound 가 있다.</U> 우리는 여기서 경로 의존 타입과 trait 에 대해서만 알아 볼 것이다.

코드 재사용을 높이기 위해 서로를 구성하는데 꼭 필요한 정보가 아니면 다른 모듈에 볼 수 없도록 한다. 이를 information hiding (정보 숨기기) 라고 한다. 예를 들어 우리는 스마트폰이 제공하는 기능들을 사용한다고 했을 때 스마트폰을 잘 사용하기 위해 굳이 내부를 알 필요없다. 고장나면 제조사로 가져가 고치면 된다. 스칼라에서도 마찬가지로 객체가 제공하는 기능들을 사용하는데 객체 관리는 그 객체를 만든 부모 인스턴스가 주로하고 객체를 잘 사용하기 위해 내부를 알 필요는 없다.

## Scala 구성성의 토대: 경로 의존 타입
- 클래스 내부에 정의된 타입 멤버의 타입은 항상 그 클래스 객체의 인스턴스에 의존한다.

~~~ scala
case class CellPhonMaker(name: String) {
    abstract class Model
    case object SmartPhone1 extends Model
    case object SmartPhone2 extends Model
    case object SmartPad extends Model
}

val apple = CellPhoneMaker("Apple")
val apple2 = CellPhoneMaker("Apple")

println(apple == apple2) // true
println(apple.SupperPhone1 == apple2.SupperPhone1) // false
~~~

코드를 간단하게 설명하자면 `CellPhoneMaker` 라는 case class 가 있고 그 안에 case object 로 Model이 3개가 있다(`SmartPhone1`, `SmartPhone2`, `SmartPad`). case class 는 기본적인 data type 이라고 생각하면 된다. 그러면 apple 과 apple2 는 같다고 나와야 하며 결과를 보면 같다고 나온다. 그런데 안에 있는 case object 를 접근하여 비교해보면 다르다고 나오는데 이는 **경로 의존 타입** 때문이다. apple 안에 있는 case object 와 apple2 안에 있는 case object 는 다르다!(타입 자체가 다르다)

다음 예제를 보자.

~~~ scala
class CellPhoneMaker(name: String, address: String) {
    var uniqueSerial = 0

    sealed abstract class Model
    case class SmartPhone1(serial: Int, working: Boolean) extends Model
    case object SmartPhone2(serial: Int, working: Boolean) extends Model
    case object SmartPad(serial: Int, working: Boolean) extends Model

    def produce(): Model = {
        uniqueSerial += 1
        SmartPhone2(uniqueSerial, true)
    }

    def fix(phone: Model): Model = phone match {
        case phone: SmartPhone1 => phone.copy(working = true)
        case phone: SmartPhone2 => phone.copy(working = true)
        case pad: SmartPad => pad.copy(working = true)
    }
}

val apple = new CellPhoneMaker("Apple", "Cupertino")
val lg = new CellPhoneMaker("LG", "Seoul")
val phoneFromLG = lg.produce()

apple.fix(phoneFromLG) // error: type mismatch
~~~

에러가 발생하는 것을 볼 수 있다. apple Model 이 필요한데 lg Model 이 들어와서 에러가 발생한 것인데 lg 의 `produce()` 에서 리턴하는 객체 `SmartPhone2` 와 apple 에서 리턴하는 객체 `SmartPhone2` 와 다르기 때문이다 (타입 자체가 다르다) 

내부 객체(내부 클래스, 멤버 타입, 내부 trait) 선언은 선언을 포함하는 타입이 선언되는 타입을 다루는 주체가 된다는 것을 뜻한다. 그래서 경로 의존 타입 시스템을 통해 컴파일러의 타입체커가 내부 객체 인스턴스의 부모가 누구인지를 실행 전에 안전하게 검사를 해준다. 

불편하다. 피해가는 방법은? `#` 을 이용하면 된다. `#` 을 사용하면 타입 조건은 완화 할 수 있다. `#` 을 이용하여 서로서로 고쳐주는 아름다운 스마트폰 공장 조합을 만들어보자.

~~~ scala
class CellPhoneMaker(name: String, address: String) {
    // 위와 동일 ...

    def fix(phone: CellPhoneMaker#Model): CellPhoneMaker#Model = phone match {
        case phone: CellPhoneMaker#SmartPhone1 => phone.copy(working = true)
        case phone: CellPhoneMaker#SmartPhone2 => phone.copy(working = true)
        case pad: CellPhoneMaker#SmartPad => pad.copy(working = true)
    }
}

val apple = new CellPhoneMaker("Apple", "Cupertino")
val lg = new CellPhoneMaker("LG", "Seoul")
val phoneFromLG = lg.produce()

apple.fix(phoneFromLG)
~~~

## Scala 구성성의 뼈대: trait
- 자유로운 조합이 가능한 구성의 기본 단위
- 우선 순위가 있는 다중 상속 지원
- 구현을 포함 할 수 있는 인터페이스

~~~ scala
trait Maker {
    val name: String
    val address: String

    abstract class Model

    def defaultModel(serial: Int): Model
    var uniqueSerial = 0

    def produce(): Model = {
        uniqueSerial += 1
        defaultModel(uniqueSerial)
    }

    def fix(m: Model): Model = ???
}

class CellPhoneMaker(val name: String, val address: String) extends Maker {
    sealed abstract class Model
    case class SmartPhone1(serial: Int, working: Boolean) extends Model
    case object SmartPhone2(serial: Int, working: Boolean) extends Model
    case object SmartPad(serial: Int, working: Boolean) extends Model

    def defaultModel(serial: Int) = SmartPhone2(serial, true)
}

~~~

`fix()` 부분에서 리턴하는 Model 은 immutable 이기때문에 새롭게 돌려줘야한다. 그런데 Model 을 어떻게 만들지 생각하게된다. Model 을 새롭게 만드는 방법이 필요하다.

~~~ scala
trait Maker {
    val name: String
    val address: String

    abstract class Model {
        def builder(working: Boolean): Model
    }

    def defaultModel(serial: Int): Model
    var uniqueSerial = 0

    def produce(): Model = {
        uniqueSerial += 1
        defaultModel(uniqueSerial)
    }

    def fix(m: Model): Model = m.builder(true)
}

class CellPhoneMaker(val name: String, val address: String) extends Maker {
    sealed abstract class Model
    case class SmartPhone1(serial: Int, working: Boolean) extends Model {
        def builder(workgin: Boolean) = this.copy(working = working)
    }
    case object SmartPhone2(serial: Int, working: Boolean) extends Model = {
        def builder(workgin: Boolean) = this.copy(working = working)
    }
    case object SmartPad(serial: Int, working: Boolean) extends Model = {
        def builder(workgin: Boolean) = this.copy(working = working)
    }

    def defaultModel(serial: Int) = SmartPhone2(serial, true)
}

~~~

위에서 소개된 builder 방법 말고 implicive parameter 를 이용해도 된다.

확장성있는 프로그램 디자인을 위한 팁으로 가능하면 추상 클래스 대신 trait 을 사용하고 조금이라도 중복되는 코드가 있으면 trait 으로 추출하고 섞어 넣어 사용하는 것이 좋다. 스칼라의 표준 라이브러리가 굉장히 잘되어 있다. 아름다운 스칼라 코딩의 정석이라고 볼 수 있다.적극적으로 참고해보자.

스칼라의 장점은 **함수형 언어의 특징** 과 **객체 지향형 언어의 특징** 을 모두 가지고 있다는 점이다. **함수형 언어** 는 값 중심의 연산을 강조하고 함수를 기본적인 타입으로 여기나, 커다란 프로그램을 확장성 있게 구성하는데 약점이 있다(함수가 여기저기 널브러져잇는 그런 상황을 많이 보게됨). **객체 지향형 언어** 는 여러가지 패턴을 통해 커다란 프로그램을 확장성 있게 구성하는데 장점이 있으나(큰틀을 짜는데 좋고 확장성이 좋다), 함수형 언어의 새롭고 안전한 기능들을 사용하지 못한다. 

스칼라를 통해 <U>함수형 언어의 타입 추론, 불변성과 같은 훌륭항 특징들</U>과 <U>객체 지향형 언어의 뛰어난 프로그램 디지인</U>을 **동시에** 할 수 있다.   

1. 함수형 언어 스타일
~~~ scala
sealed abstract class Value
case class IntValue(x: Int) extends Value
case class StringValue(x: String) extends Value

object Eval {
    def add(e1: Value: e2: Value): Option[Int] = (e1, e2) match {
        case (IntValue(x), IntValue(y)) => Some(x + y)
        case _ => None
    }
    def concat(e1: Value, e2: Value): Option[String] = (e1, e2) match {
        case (StringValue(x), StringValue(y)) => Some(x + y)
        case _ => None
    }
}
~~~

2. 객체지향 언어 스타일
~~~ scala
sealed abstract class Value {
    def add(other: Value): Option[Int]
    def concat(other: Value): Option[String]
}

case class IntVlue(x: Int) extends Value {
    def add(other: Value): Option[Int] = other match {
        case IntValue(y) => some(x + y)
        case _ => None
    }
    def concat(other: Value): Option[String] = other match {
        case _ =>  None
    }
}

case class StringValue(x: String) extends Value {
    def add(other: Value): Option[Int] = other match {
        case _ => None
    }
    def concat(other: Value): Option[String] = other match {
        case StringValue(y) => Some(x + y)
        case _ => None
    }
}
~~~

두 코드는 같은 것이다. 단지 스타일이 다를뿐. 어떤 스타일을 선택할지 딜레마에 빠지기 쉬운데 약간의 팁으로 <U>데이터 타입의 변화가 빈번하다면 객체지향 스타일</U>로, <U>연산의 변화가 빈번하다면 함수형 스타일로 코딩하는 것</U>이 좋다.

## 결론
- 스칼라는 그냥 자바처럼 짜도 되지만 스칼라의 진정한 강점은 **멀티 패러다임** 에 있다.
- 함수형 스타일의 특징인 **Immutability(불변성)** 과 스칼라만의 특징인 **Composability(구성성)** 을 고려하며 디자인하면 아름답고 확장성 높은 프로그램을 만들 수 있다.

## Reference
[SpringCamp2013 - Effective Scala](https://www.youtube.com/watch?v=WbV467V8o0w)