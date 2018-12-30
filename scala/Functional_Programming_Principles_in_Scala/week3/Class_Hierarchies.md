# Class Hierarchies

## Abstract Class

abstract class 는 아직 구현되지 않은 멤버를 포함할 수 있다.
`new` operator 로 abstract class 의 인스턴스를 생성하지 못한다.

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
