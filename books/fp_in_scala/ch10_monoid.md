# Monoid

이번 장에서는 **purely algebraic** 구조가 나온다. 오직 대수에 의해서만 정의되는 구조인 **monoid(모노이드)**에 대해 배우게 된다. 모노이드 인터페이스의 인스턴스들은 같은 법칙들만 만족한다는 점 말고는 공통점이 거의 없다. 하지만 이러한 대수적 구조만으로도 유용하고 다형적인 함수를 작성할 수 있음을 배운다.

이번 장에서는 살펴볼 모노이드의 유용함은 크게 두가지이다.

1. 병렬로 계산할 수 있는 조각들로 나눌 수 있다
2. 간단한 계산을 조립하여 복잡한 계산을 만들 수 있다

따라서 이번장에서 크게 배우게 될 것은 다음과 같다.

1. purely algebraic
2. 모노이드
3. 모노이드의 유용함

---

## Monoid 란?

문자열 연결 대수를 생각해보자. 문자열 연결 연산 `+` 는 항등원(identity element)가 빈 문자열이다 ( `s + "" == "" + s` ). 그리고 결합법치(associative law)를 만족한다 (`(r+s)+t == r+(s+t)`)

이러한 법칙들은 정수 덧셈에서도 똑같이 적용이된다 (정수 덧셈은 결합법칙이 성립하고 항등원은 0 이다).

부울 연산자 `&&` 와 `||` 도 마찬가지이다 (결합법칙 만족, 각각 항등원 true, false 를 가짐)

이런 대수는 어디에서나 볼 수 있고 이런 종류의 대수를 **모노이드**라고 한다. 결합법칙, 항등법칙을 합쳐서 **모노이드 법칙**이라고 부른다.

하나의 모노디으는 다음과 같은 요소들로 구성되어있다.

* 타입 `A`
* `A` 타입의 값 2개를 받아 하나의 값으로 계산하는 이항 연산 `op`. 임의의 `x: A`, `y: A`, `z: A` 에 대해 `op(op(x, y), z) == op(x, op(y, z))` 가 성립
* 항등원인 값 `zero: A`. 임의의 `x: A`에 대해 `op(x, zero) == x`, `op(zero, x) == x` 이다.

이를 스칼라 `trait` 로 표현하면 다음과 같다

```scala
trait Monoid[A] {
    def op(a1: A, a2: A): A
    def zero: A
}
```

이 `trait` 를 이용하여 String 모노이드, 리스트 모노이드를 형성할 수 있다.

```scala
val stringMonoid = new Monoid[String] {
    def op(a1: String, a2: String) = a1 + a2
    def zero = ""
}

val listMonoid[A] = new Monoid[List[A]] {
    def op(a1: List[A], a2: List[A]) = a1 ++ a2
    def zero = Nil
}
```

정리하자면, 모노이드란 

* 하나의 타입과 모노이드 연산들, 법칙들의 집합
* 모노이드는 대수일 뿐
* 타입 `A` 와, 관련 법칙들을 만족하는 `Monoid[A]`의 구현
* **모노이드는 하나의 타입이되 그 타입에 대해 결합법칙을 만족하며 항등원을 가진 이항 연산이 존재하는 타입**


> 대수(algebra)?
>
> 수학에서 하나의 대수는 하나 이상의 집합과 그 집합들의 원소에 적용하는 함수들, 공리(axiom)들로 이루어진다. 공리들로부터 정리(theorem)를 유도할 수 있다.
>
> 공리는 항상 참이라고 간주되는 명제, 정리 역시 참으로 간주되는 명제이다.
>
> 일부 데이터 타입들에 작용하는 함수들과 그 함수들 사이의 관계를 명시하는 일련의 법칙이라고 할 수 있다.
>
> [공리와 정리 참고]
>
> [공리? 정리? 정의?](http://blog.naver.com/PostView.nhn?blogId=rodem_math&logNo=220290844317&parentCategoryNo=&categoryNo=53&viewDate=&isShowPopularPosts=true&from=search)
>
> [정의와 공리 그리고 정리](https://suhak.tistory.com/243)
