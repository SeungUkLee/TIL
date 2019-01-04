# Pattern Matching

Decomposition 을 해결하기 위해 3가지 방법이 있고 다음과 같은 문제가 있다.

1. **Classification and access methods** : quadratic explosion
2. **Type tests and Type casts** : unsafe, low-level
3. **OO(Object-oriented) decomposition** : does not always work, need to touch all classes to add a new method.

## Functional Decomposition with Pattern Matching
Classification, Accessor 의 목적은 다음 2가지라고 봐도된다.

1. Which subclass was used? (서브클래스가 사용되었는가)
2. What were the arguments of the constructor? (생성자의 아규먼트는 무엇이가)

스칼라에서는 **Pattern Matching**, 그리고 그 과정에서 사용하는 **case class** 를 통해 Decomposition 을 자동화한다.

## Case Classes
Case classes 는 `class` 앞에 `case` 가 있다는 점을 제외하면 일반 클래스 정의와 유사하다.

~~~ scala
trait Expr
case class Number(n: Int) extends Expr
case class Sum(e1: Expr, e2: Expr) extends Expr
~~~

`Expr` 이라는 trait 와 2개의 구체적인 subclass(`Number`, `Sum`)를 정의한다.

또한 암시적으로 `apply` 메소드와 함께 objects 를 정의한다.

~~~ scala
object Number {
    def apply(n: Int) = new Number(n)
}

object Sum {
    def apply(e1: Expr, e2: Expr) = new Sum(e1, e2)
}
~~~

따라서 `new Number(1)` 대신 `Number(1)` 로 작성할 수 있다. 그러나 클래스는 비어있다 어떻게 memberdp 접근할 수 있을까?

## Pattern Matching
패턴 매칭은 일반적으로 C/Java 의 `switch` 와 유사하다.

스칼라에서 패턴 매칭은 `match` 라는 키워드를 사용한다.

~~~ scala
def eval(e: Expr): Int = e match {
    case Number(n) => n
    case Sum(e1, e2) => eval(e1) + eval(e2)
}
~~~

패턴 매칭을 사용할 떄 규칙은 다음과 같다.

- 패턴에서 사용하는 변수는 소문자로 시작해야 한다
- 변수는 두번 사용될 수 없다. Sum(x, x) 는 잘못된 패턴이다.
- null, true, false 를 제외하고 상수는 대문자로 시작해야한다.

`Expr` trait 내부에 `eval` 을 삽입하는 것도 가능하다.

~~~ scala
trait Expr {
    def eval: Int = this match {
        case Number(n) => n
        case Sum(e1, e2) => e1.eval + e2.eval
    }
}
~~~

**OO Decomposition** 과 **Functional Decomposition** 모두 장단점이 있다. 어떤 상황에서 어떤 것을 사용할 지 혼란스러운데 약간의 팁으로 만약 메소드를 많이 만드는 경우라면 **Functional Decomposition** (매 클라스마다 메소드를 만들 필요가 없기 때문), 클래스를 많이 만드는 경우라면 **OO Decomposition** 을 사용하는 것이 좋다(클래스를 만들때 마다 eval 함수를 수정할 필요가 없기 때문에 단지 eval 을 가진 클래스를 만들기만 하면 된다).

## Reference

[FUNCTIONAL PROGRAMMING 4](http://1ambda.github.io/scala/functional-programming-4/)

[Coursera's Functional Programming in Scala](https://www.coursera.org)