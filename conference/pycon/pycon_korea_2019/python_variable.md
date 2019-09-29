# PyCon Korea 2019 - 파이썬의 변수 (강한 타입, Immutable vs Mutable, Class vs Instance)

이번 글에서 배우게 되는 것들은 다음과 같다.

* immutable 변수와 mutable 변수 차이점
* class 변수와 instance 변수의 차이점
* global 변수, local 변수, non-local 변수의 차이점
* 좋은 소스 코드를 작성하는데 도움이 되는 적합한 변수 선택

---

## 컴퓨터의 기본 동작 원리와 변수의 역할

변수는 데이터를 메모리에 저장할 떄 물리적인 주소 대신 사용하는 기억하기 쉬운 단어로 구성된 꼬리표. **물리적인 메모리 주소는 항상 바뀔 수 있다.**

> [컴퓨터의 기본 동작 원리](https://brunch.co.kr/@insuk/4)

## 동적 바인딩 (Duck Typing) & 강한 타입 언어

데이터의 타입을 정의하지 않고도 변수에 들어간 데이터를 보고서 추론하는 언어가 파이썬. 그러면서 강한 타입 언어이다.

> **강한 타입 언어**란 데이터 변수의 타입이 서로 다르다면 연산처리 시 반드시 타입 변화를 해줘야되는 언어

## immutable vs mutable
 
왜 데이터 타입에 immutable 과 mutable 이 있을까? -> 성능적인 이점떄문에.

값을 자주 바꿔야하는 데이터가 있다고 하자. immutable 데이터 타입의 값을 빈번하게 변경하면 계속해서 객체가 생성될 것이다. -> 메모리를 과하게 사용하는 원인이 되기도 함.

mutable 데이터 타입을 사용하면 객체를 새로 생성하지 않아도 되며, 메모리 누수를 방지하면서 메모리 사용 효율을 올릴 수 있다. 


## class vs instance

``` python
class Programmer:
	languages = []  # 클래스 변수 선언
	def __init__(self, name):  # 초기화 함수 재정의
		self.name = name  # 인스턴스 변수 선언 및 초기화
  def add_lang(self, lang):
		self.languages.append(lang)  # 클래스 변수 값 변경
```

클래스 변수
- 클래스에 의해 생성된 모든 객체가 **같은 값을 조회할 때** 사용하는 변수

인스턴스 변수
- 인스턴스화 될 때마다 새로운 값이 할당되며 서로 다른 객체 간에는 값을 공유할 수 없는 변수 -> **객체 단위로 값이 따로 관리되는 변수는 반드시 인스턴스 변수 사용**

``` python
class BookReader:
	country = 'South Korea'  # 클래스 변수 country 선언
	def __init__(self, name):  # 초기화 함수 재정의
		self.name = name  # 인스턴스 변수 선언 및 초기화
  def read_book(self):
		print(self.name, 'is reading in', self.country)
```

클래스 변수 `country` 값을 변경

``` python
c = BookReader('cho')
a = BookReader('anna')
c.country = 'usa'
c.read_book() # cho is reading in usa
a.read_book() # anna is reading in South Korea
```

Immutable 객체의 값을 변경하니, 객체가 바뀌어 버린 경우이다. 그럼 다음과 같은 상황에서는 무엇을 출력할지 생각해보자.

``` python
BookReader.country = 'italy'
c.read_book()  # usa
a.read_book()  # italy
s = BookReader('sean')
s.read_book()  # italy
```

Immutable 클래스 변수 값을 변경하여 객체가 교체되면, 변경 전에 생성된 객체의 변수는 낙동강 오리알 신세가 된다.


제대로 정의해보자
``` python
class SKBookReader:
	_COUNTRY = 'South Korea'
	def __init__(self, name):
		self.name = name
  def read_book(self):
		print(self.name, 'is reading in', SKBookReader._COUNTRY)
```

1. 내부용 변수 이름은 `_` 로 시작
2. 상수는 대문자로 표기
3. 클래스 변수 접근은 객체(self)가 아닌, 클래스 이름으로

정리하자면,

클래스 변수
- 클래스에 의해 생성된 모든 객체가 **인스턴스화되는 시점에 같은 값을 조회할 때 사용**

인스턴스 변수
- 인스턴스화 될 때마다 새로운 값이 할당되며 서로 다른 객체 간에는 값을 공유할 수 없는 변수 -> **객체 단위로 값이 따로 관리 되는 변수는 반드시 인스턴스 변수 사용** -> **클래스 변수는 객체 이름이 아닌 클래스 이름으로 접근, 되도록 값이 변경되지 않는 경우에 사용하는 것이 안전!**

> [Visualize Python, Java, JavaScript, C, C++, Ruby code execution](http://www.pythontutor.com/visualize.html#mode=edit) 를 활용하면 좀 더 이해가 잘된다


## global vs local vs non-local

[https://docs.python.org/3/tutorial/classes.html#scopes-and-namespaces-example](https://docs.python.org/3/tutorial/classes.html#scopes-and-namespaces-example) 

``` python
def scope_test():
    def do_local():
        spam = "local spam"

    def do_nonlocal():
        nonlocal spam
        spam = "nonlocal spam"

    def do_global():
        global spam
        spam = "global spam"

    spam = "test spam"
    do_local()
    print("After local assignment:", spam)
    do_nonlocal()
    print("After nonlocal assignment:", spam)
    do_global()
    print("After global assignment:", spam)

scope_test()
print("In global scope:", spam)
```

이런 코드는 작성하지말자 (scope 과 namespace 를 설명하기 위한 코드이다)


PEP-8 에 의하면 인스턴스 변수같은 경우에는

* Use one leading underscore only for non-public methods and instance variables.
* To avoid name clashes with subclasses, use two leading underscores to invoke Python's name mangling rules.

라고 나와있다.

> [styleguide | Style guides for Google-originated open-source projects](http://google.github.io/styleguide/pyguide.html) 코드 스타일 관련해서 이 사이트도 참고해보자

정리하자면,

* 파이썬 변수에 대입되는 객체는 데이터 타입에 따라 변할 수 있거나 변할 수 없는 성질을 가짐
* 위 성질에 따라 객체 변경시 서로 다르게 동작하니 주의하여 사용
* 클래스 / 인스턴스 변수, 글로벌 / 로컬 변수는 서로 다른 **scope** 를 가진다. (단, mutable 여부에 따라 예상치 못하게 변경될 수 있다)
* 어떤 변수를 써야 할 지 애매하면, scope 가 좁은 변수(인스턴스, 로컬)를 사용하는 것이 안전함
* 변수를 내부용으로 강제하고 싶다면, 변수 이름을 `_` 로 시작
* 글로벌 변수 사용하지말자
* **PEP8을 꼭 따르자**

---

## Reference

[파이썬의 변수 - PyCon KR 2019](https://www.youtube.com/watch?v=su9LkSogAMc)