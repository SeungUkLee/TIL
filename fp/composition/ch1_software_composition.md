> Eric Elliott 의 Composing Software 시리즈를 보고 정리한 글입니다.

**합성** 이란? 전체를 구성하기 위해 부분이나 요소를 결합하는 행위.

우리는 다음 2가지를 배우게 된다.

- 합성 합성 (function composition)
- 객체 합성 (object composition)

# Composing Software

소프트웨어 개발자는 의식하든 못하든 매일 매일 함수와 데이터 구조를 합성한다. 소프트웨어 개발 프로세스란 **큰 문제를 작은 문제로 분해하여 작은 문제를 해결하는 요소를 만들고 이러한 구성 요소들을 합성**하여 완전한 애플리케이션으로 구성하는 것이다.

## 함수 합성

- 함수의 출력에 다른 함수를 결합시키는 과정.
- `(f ∘ g)(x) = f(g(x))`. `∘` 는 합성 연산자로 "composed with" 또는 "after" 이라고 부른다.

다음 예제 코드를 보면 함수를 합성하고 있는 것이다.

``` javascript
const g = n => n + 1;
const f = n => n * 2;

const do = x => {
    const afterG = g(x);
    const afterF = f(afterG);
    return afterF;
};

do (20) // 42
```

ES6 의 **Promise chain** 도 합성함수이다.

``` javascript
const g = n => n + 1;
const f = n => n * 2;

const wait = time => new Promise(
    (resolve, reject) => setTimeout(resolve, time)
)

wait(300)
    .then(() => 20)
    .then(g)
    .then(f)
    .then(v => console.log(v)); // 42
```

마찬가지로 배열 메소드 호출, `lodash` 메소드 , observables (RxJS) 를 체인 할 떄마다 함수를 합성한다. 반환 값을 다른 함수에 전달하는 것도 합성이다. `this` 를 입력으로하여 2개의 메소드를 순차적으로 호출하는 것도 합성이다.

위 코드의 `do` 함수를 다음과 같이 리펙토링할 수 있다.

``` javascript
const g = n => n + 1;
const f = n => n * 2;

const do = x => f(g(x));

do(20); // 42
```

위 코드가 디버깅하기 어렵다고 느껴질 수 있다. 밑에 처럼 함수 합성 방식으로 다시 작성할 수 있다.

``` javascript
const doStuff = x => {  
    const afterG = g(x);  
    console.log(`after g: ${ afterG }`);
    const afterF = f(afterG);  
    console.log(`after f: ${ afterF }`);
    return afterF;  
};

do(20);   
// "after g: 21"  
// "after f: 42"  
```

`trace()` 라는 로거함수를 만들어 다음과 같이 리펙토링이 가능하다.

``` javascript
const trace = label => value => {
    console.log(`${ label }: ${ value }`);  
    return value;  
}

const doStuff = x => {  
    const afterG = g(x);
    trace('after g')(afterG)
    const afterF = f(afterG);  
    trace('after f')(afterF)
    return afterF;  
};

do(20);   
// "after g: 21"  
// "after f: 42"  
```

`Ramda`, `lodash` 와 같은 함수형 프로그래밍 라이브러리를 이용하면 좀 더 깔끔하게 작성이가능하다.

`lodash` 의 `pipe()` 함수를 다음과 같이 직접 정의해서 사용할 수 있다.

``` javascript
const pipe = (...fns) => x => fns.reduce(
    (y, f) => f(y)
, x);

const do = pipe(
    g,
    trace('after g'),
    f,
    trace('after f') 
)
```

`pipe()` 는 한 함수의 출력을 다른 함수의 입력으로 전달하여 함수 파이프 라인을 생성한다.

> pipe 말고 compose 라고도 정의하여 사용한다.

`pipe()` 를 사용하면 중간 변수(intermediary variables)가 필요 없다. 인수를 언급하지 않고 함수를 작성하는 것을 **포인트없는 스타일 (point free style)** 또는 **무인수 방식** 이라고도 한다. 이를 위해 함수를 명시적으로 선언하는 대신 다른 함수를 리턴하는 함수를 호출한다. 즉, `function` 키워드 또는 `=>` 와 같은 화살표 구문이 필요없다.

중간 변수들이 있으면 불필요한 복잡성이 더해지기 떄문에 여기 저기 조금만 사용하는 것이 좋다.

복잡성 감소에는 몇 가지 이점이 있다.

### 단기 기억
함수 파이프라이닝을 사용하여 중간변수들을 소거하고 다른 변수를 기억하는데 우리 두뇌를 사용할 수 있다.

### 신호 대 잡음비
간결함은 코드의 신호 대 잡음 비율(Signal to Noise Ratio)을 향상시킨다. 간결한 표현은 이해력을 향상시킨다. 

일부 코드는 유용한 정보를 제공하고 일부 코드는 공간을 차지한다. 전달되어야 할 의미를 변화시키지 않는 선에서 코드의 양을 줄이면 코드를 더 쉽게 이해할 수 있다.

### 코드의 면적과 버그

여분의 코드는 버그를 숨길 수 있는 추가 표면적을 의미한다. 즉 더 많은 버그가 숨어 버릴 수 있다. 하지만 함수형으로 작성된 코드는 간결하다.

> 적은 코드 = 버그가 적은 표면 = 버그가 적다


## 객체 합성

> 클래스 상속보다는 객체 합성을 우선해라 - Gang of Four

> 켬퓨터 과학에서 복합 자료형 (composite datatype)이란 프로그래밍 언어의 원시형 및 기타 복합 자료형을 사용하여 프로그램에서 조합할 수 있는 모든 자료형이다. 복합 자료형을 만드는 행위는 합성으로 알려져 있다. - Wikipedia

다음은 원시형과 복합체를 나타내는 코드이다.

``` javascript
// 원시형
const firstName = 'Seunguk';
const lastName = 'Lee';

// 복합체
const fullName = {
    firstName,
    lastName
}
```
모든 `array`, `set`, `map`, `weak map`, `typed array` 등은 복합 자료형이다. 비 원시형 구조를 작성할 때마다 우리는 객체를 합성한다.

GoF 의 컴포지트 패턴은 개체들의 관계를 재귀적으로 구성하여 부분-전체 계층을 표현하는 패턴이다. 사용자는 단일 객체, 복합 객체 모두 동일하게 다루도록 정의한다. 컴포지트 패턴이 객체 합성의 유일한 형태라고 생각할 수 있지만 객체 합성에는 여러가지 종류가 있다.

GoF 에서 **"객체 합성은 여러 디자인 패턴에 다양하게 적용될 것이다"** 말하고 객체가 합성될 때 두 객체의 관계를 정의하기 위한 3가지 표현을 정의한다.

1. **위임 (delegation)** - state, strategy 및 visitor 패턴에서 사용
2. **인지 (acquaintnace)** - 객체가 참조로 다른 객체를 알고 있을 떄 일반적으로 매개변수로 전달됨: 네트워크 요청 처리기가 로거에 대한 참조를 전달하여 요청을 기록. 요청 처리기가 로거를 사용함
3. **집합 (aggregation)** - 자식 객체가 부모 객체의 일부를 형성하는 경우: has - a 관계, 예를 들어 자식 DOM은 부모 노드의 구성 요소, DOM 노드는 자식을 가짐

클래스 상속은 복합 객체를 구성하는 데 사용할 수 있지만 제한적이고 취약한 방법이다. GoF 에서는 객체를 합성하기 위해 클래스 상속을 사용한 단단한 접근 방식보다는 유연한 접근 방식을 사용하도록 조언한다.

> "복합 객체는 객체들이 합쳐져 만들어 지는데, 각각의 latter 는 former 의 일부분이다." - Categorical Methods in Computer Science: With Aspects from Topology (1989)

클래스 상속은 복합 객체를 생성하는 하나의 방법에 불과하다. 모든 클래스는 복합 객체를 생성하지만 모든 복합 객체가 클래스 또는 클래스 상속에 의해 생성되는 것은 아니다. 

**"클래스 상속보다는 객체 합성을 우선해라"** 라는 말은 클래스 계층의 조상(ancestor)에서 모든 속성을 상속하지 않고 작은 구성 요소 부분에서 복합 객체를 형성해야하다라는 말이다. 전자는 객체 지향 설계에서 알려진 다양한 문제를 일으킨다.

- **단단한 결합 문제 The tight coupling problem**
- **깨지기 쉬운 기초 클래스 문제The fragile base class problem**
- **경직된 계층 구조 문제The inflexible hierarchy problem**
- **중복 필요성 문제The duplication by necessity problem**
- **고릴라 / 바나나 문제The gorilla/banana problem**

자바스크립트에서 객체 합성의 가장 일반적인 형태는 객체 연결 (mixin composition 이라고도 함)이라고 한다.

1. 클래스 상속을 사용하여 복합 객체 만들기

``` javascript
class Foo {
    constructor () {
        this.a = 'a'
    }
}

class Bar extends Foo {
    constructor (options) {
        super(options);
        this.b = 'b'
    }
}

const myBar = new Bar(); // {a: 'a', b: 'b'}
```

2. 믹스 인 성분으로 복합 객체 만들기

``` javascript
const a = {  
  a: 'a'  
};

const b = {  
  b: 'b'  
};

const c = {...a, ...b}; // {a: 'a', b: 'b'}

```
## 결론

소프트웨어를 합성하기 위한 컴포넌트는 **함수**, **자료구조**, **클래스** 등의 형태로 취할 수 있다. 프로그래밍 언어마다 컴포넌트에 대해 서로 다른 접근방식을 취한다.

- 자바: 클래스를 제공
- 하스켈: 함수를 제공

그러나 어떤 언어, 어떤 패러다임을 선호하든 관계없이 함수와 자료구조를 합성할 수 밖에 없다.

대부분 논점이 함수형 프로그래밍이다. 그 이우는 자바스크립트에서 함수는 가장 합성을 하기 쉬운 요소이기 때문이다. FP 가 OOP 보다 좋다라는 논의를 하려는게 아니다. OOP vs FP 는 잘못된 이분법이다. 자바스크립트는 FP 와 OOP 를 광범위하게 혼합해서 사용한다.

객체를 합성하여 FP 에서 사용될 자료구조를 만들고 함수형 프로그래밍으로 OOP 에서 객체를 만들 수 있다.

**소프트웨어를 작성하는 방법에 상관없이 훌륭한 합성을 해야한다.**

> 소프트웨어 개발의 핵심은 합성 !


# Reference

[Composing Software: An Introduction](https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea)
