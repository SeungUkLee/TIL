# Class Hierarchies

## Abstract Class

abstract class 는 아직 구현되지 않은 멤버를 포함할 수 있다.
`new` operator 로 abstract class 의 인스턴스를 생성하지 못한다.


## Class Extensions

2가지 type 의 tree 가 있다.
1. empty set
2. integer 와 2개의 sub-trees 로 구성된 tree

~~~ scala
abstract class IntSet {
  def incl(x: Int): IntSet
  def contains(x: Int): Boolean
}


object Empty extends IntSet {
  def contains(x: Int): Boolean = false
  def incl(x: Int): IntSet = new NonEmpty(x, Empty, Empty)
}

class NonEmpty(elem: Int, left: IntSet, right: IntSet) extends IntSet {
  def contains(x: Int): Boolean = {
    if (x < elem) left contains x
    else if (x > elem) right contains x
    else true
  }

  def incl(x: Int): IntSet = {
    if (x < elem) new NonEmpty(elem, left incl x, right)
    else if (x > elem) new NonEmpty(elem, left incl x, right)
    else this
  }
}
~~~

`incl()` 를 수행할때 새로운 서브트리를 만드는 것을 볼 수 있다. 이는 immutable 하다는 것을 볼 수 있다. 이전의 데이터들을 변경하지 않으므로 **persistent data structure** 라고 볼 수 있다.

## Terminology

Empty 와 NonEmpty type 은 IntSet type 을 따른다.

## Base Classes and Subclasses

IntSet 은 Empty 와 NonEmpty 의 **superclass** 이며 Empty 와 NonEmpty 는 IntSet 의 **subclass** 이다.

superclass 가 지정되어있지 않으면 Java 패키지의 `java.lang` 의 표준 클래스 `Object` 를 따른다.

`class C` 의 superclass 를 C 의 **base classes** 라고 부른다. 따라서 NonEmpty 의 base classes 는 IntSet 과 Object 이다.

## Implementation and Overriding

Empty 와 NonEmpty 클래스에있는 `contains` 및 `incl` 의 정의는  IntSet 의 abstract functions 를 **구현(implement)** 한 것이다.

`override` 키워드를 사용하여 subclass 의 non-abstract definition 을 재정의(redefine) 할 수 있다.

~~~ java
abstract class Base {
  def foo = 1
  def bar: Int
}

class Sub extends Base {
  override def foo = 2
  def bar = 3
}
~~~

## Object Definitions

`object` 키워드를 사용하여 **singleton object** 를 만들 수 있다.
singleton object 은 value 이다. 따라서 그 자체로 evaluate 된다. 즉, evalutaion 단계를 수행할 필요가 없다. 
