```scala
sealed trait HttpError

object HttpError {
  final case class A() extends HttpError
  final case class B() extends HttpError
  final case class C() extends HttpError
}
```

`sealed trait` 쉽게 interface 라고 보면 된다. 함수형 프로그래밍에서는 HttpError 만 타입으로 본다. 
나머지 A, B, C는 타입이 될 수 있는 데이터로 본다. 그래서 노출을 할 때는 타입만 노출을 한다.

하지만 스칼라에서는 언어 특성상 노출이 된다. 그래서 노출이 되지 않기 위해 constructor 함수를 만든다.

---

## Reference

[kevin lee - youtube](https://youtu.be/6oBT0TlsVPs?t=2152)
