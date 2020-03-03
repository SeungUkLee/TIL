# TypeScript Types

## Basic Types

타입스크립트에서 기본적으로 제공하는 데이터 타입. 사용자가 만든 타입은 결국은 이 basic type 들로 쪼개진다. 자바스크립트 기본 자료형들을 포함한다 (superset).

* ECMAScript 표준에 따른 기본 자료형 (6가지)
	* Boolean, Number, String, Null, Undefined, Symbol, Array : object 형
* 프로그래밍을 도울 몇 가지 타입이 더 제공
	* Any, Void, Never, Enum, Tuple : object 형

## Primitive Types

오브젝트와 레프런스 형태가 아닌 실제 값을 저장하는 자료형. 프리미티브 형의 내장 함수를 사용 가능한 것은 자바스크립트 처리 방식 덕분이다.

ES2016 기준 총 6가지
* boolean, number, string, symbol, null, undefined

literal 값으로 primitive type 을 나타낼 수 있다. 
```typescript
true;
'hello';
3.14;
null;
undefined;
```

또는 래퍼 객체로 만들 수 있다 (하지만 래퍼 객체로 사용하지는 말자 - 복잡해진다).

```typescript
new Boolean(false); // typeof new Boolean(false) : 'object' 
new String('world'); // typeof new String('world') : 'object' 
new Number(42); // typeof new Number(42) : 'object' 
Symbol('foo'); // typeof Symbol('foo') : 'symbol'
```

### Boolean / boolean

가장 기본적인 데이터 타입. true or false 값으로 구성. 
```typescript
let isDone: boolean = false; 
typeof isDone === 'boolean' // true 

// Type 'boolean' is assignable to type 'Boolean'. 
let isOk: Boolean = true; 

// Type 'Boolean' is not assignable to type 'boolean'. 
// 'boolean' is a primitive, but 'Boolean' is a wrapper object. 
// Prefer using 'boolean' when possible. 
let isNotOk: boolean = new Boolean(true);
```

BigInt 5:00 다시 볼 것 ([타입스크립트 기본 자료형 1탄 (boolean, number, bigint) | 타입스크립트 기초 워크숍 201812 - 12 - YouTube](https://www.youtube.com/watch?v=4GWBN9EZc_w&list=PLV6pYUAZ-ZoFwOspuVHBvmhQRalqvj7Jf&index=12))


## Literal Types
리터럴 타입도 타입으로 취급된다. 타입은 좁힐수록 좋다.


> JavaScript에서 값을 표현하기 위해 상수값을 사용할 수 있습니다. 그것은 변수가 아니라 고정된 값으로서 "문자 그대로(literally)" 스크립트에 값을 제공하는 것입니다.
> 
> [Literals - JavaScript | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Obsolete_Pages/Core_JavaScript_1.5_Guide/Literals)

```typescript
const age = 36; 
const name = 'seu'; 
const isMale = true; 
const fruits = ['apple', 'banana']; 
const person = { name: 'seu', age: 36 };
```
``` typescript
let age: 36 = 36; 
age = 37; // Error 
let name: 'seu' = 'seu'; 
name = 'SEU'; // Error 
let isMale: true = true; 
isMale = false; // Error 
let fruits: ['apple', 'banana'] = ['apple', 'banana']; 
fruits = ['apple', 'banana', 'cherry']; // Error but tuple 
let person: { name: 'seu', age: 36 } = { name: 'seu', age: 36 }; 
person = { name: 'seu', age: 37 // Error };
```

## var, let, const 과 type
var - 호이스팅(O), 변수의 유효 범위가 함수 스코프, 재선언 가능
let, const - 변수 유효 범위가 블록 스코프, 호이스팅 (X), 재선언 불가

### let 과 const 의 타입 추론

```typescript
let myName = 'seu';
const myAge = 28;
```

`myNam` 은 `string` 으로 추론하지만 `myAge` 는 리터럴 타입으로 추론하여 `28` 이 뜨는 것을 확인 할 수 있다. 그래서 `myAge` 에 다른 값을 넣으면 안된다.  `28` 이라는 리터럴 타입에 다른 값을 넣을 수 없기 때문이다.

```typescript
let a: string = 'aa';
let b = 'bb';

const c: string = 'cc';
const d = 'dd';
```

* `a` 는 명시적으로 지정된 `string` 타입
* `b` 는 타입 추론에 의한 `string` 타입
* `c` 는 명시적으로 지정된 `string` 타입
* `d` 는 타입추론에 의한 타입인 리터럴 타입 `'dd'`

## Object Types
그렇게 좋지는 않다. 역할은 어떤 녀석이 오브젝트 타입이야하고 알려주는 역할이 아니다. 주로 Primitive Types 인지 아닌지 확인할 때 사용한다. 그래서 object 로 지정된 자리에 boolean, number, string, symbol, null, undefined 가 오게되면 에러가 나타난다.

```typescript
Object.create(0) // Error
```

## Array Types

원래 자바스크립트에서 array 는 객체이다. 사용 방법은 `Array<타입>` , `타입[]`

```typescript
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

## Tuple Types
```typescript
let tu: [string, number] = ['hello', 1]
let tu2: [string, number] = ['hello', 1, 'world'] // Error
```

## Any Types
어떤 타입이어도 상관없는 타입. 컴파일 타입에 타입 체크가 정상적으로 이루어지지 않기 때문에 최대한 쓰지 않도록 한다.

### Avoid leaking any

`any` 는 조재할 수 밖에 없다. `any` 로 지정된 값을 이용하여 새로운 값으로 만들어 사용하는 지점에서 누수를 막아주도록 노력해야한다. 

* 문제 상황
```typescript
function leakingAny(obj: any) {
  let a = obj.num;
  let b = a + 1;
  return b;
}

let c = leakingAny({ num: 0 })
let d: string = c.indexOf('0');
```

* 해결
위 코드는 입력값도 `any` 타입, 리턴값도 `any` 타입인 문제가 있다. 리턴값이 `any` 타입이 되는 것을 막아보자.
```typescript
function leakingAny(obj: any) {
  let a: number = obj.num;
  let b = a + 1;
  return b;
}

let c = leakingAny({ num: 0 })
let d: string = c.indexOf('0');
```


## Never Types
* 끝나지 않는 리턴에 주로 사용. 하지만 이런 상황인 경우에는 안써도 추론에 의해 `never` 인지 안다.

```typescript
// Function returning never must have unreachable end point
// never 를 처리하지 않으면, void 로 추론
function error(message: string): never {
    throw new Error(message);
}

// Inferred return type is never
// never 를 처리하지 않아도, never 로 추론
function fail() {
    return error("Something failed");
}

// Function returning never must have unreachable end point
// never 를 처리하지 않으면, void 로 추론
function infiniteLoop(): never {
    while (true) {
    }
}
```

* Tip) 에러를 막는 용도로 사용, 잘못된 타입을 넣는 실수를 막고자 사용할 수 있다

```typescript
// T 가 object 형이 아닌 경우 사용할 수 없도록 필터링
type Indexable<T> = T extends string
? T & { [index: string]: any }
  : never;
```

## Union Types
여러 타입을 조합하여 하나의 타입으로 만들 수 있는 타입이다.

```typescript
function foo(value: string | number) { 
  // ...
}
```

Literal Types 과 함께 사용하여 인자 범위를 강하게 좁힐 수 있다.

```typescript
function boo(value: 'left' | 'right') {
  // ...
}
```

Type Guards 와 함께 사용하여 타입을 좁힐 수도 있다.

```typescript
function foo(value: string | number) {
  if (typeof value === 'string') {
    return value.indexOf('')
  }
  // 여기부턴 number
  return value;
}
```

`value` 는 `string` 또는 `number` 타입이 올 수 있다. `if` 문에서 타입이 `string` 인 부분을 리턴하기 때문에 밑에서 부터는 `string` 이 아닌 부분만 남게된다.

## Type Guard

런타임에 사용하는 연산자인 `typeof`, `instanceof`, `in`, literal type, custom type guard 을 이용하면 컴파일 타임에 인식을 한다. 타입 가드를 사용하면 **조건문 블록 스코프 내에서 타입을 좁힐 수 있다.**

자세한 내용은 레퍼런스 참고

## Type Assertioins & non-null assertions

Type Assertions 는 형변환과는 다르다. 실제로 형이 변하지않는다. 

## Reference

* [Basic Types](https://www.notion.so/Basic-Types-23f0f4e010b7484986d22a93eb88e50d)
* [Primitive Types](https://www.notion.so/Primitive-Types-b062f7e77a5e47e180806b3efcd5ef4e)
* [Literal Types](https://www.notion.so/Literal-Types-b90cf8d8a6c04a6483489da1aee0ad5d)
* [var, let, const and type](https://www.notion.so/var-let-const-type-ce1d948686dc4b698e48daeac8a71d41)
* [Object Types](https://www.notion.so/Object-Types-c6f32992d94844cfa06941244f8d8d01)
* [Array Types](https://www.notion.so/Array-Types-8ff9412149ae4bd687b3f4d318c7f52c)
* [Tuple Types](https://www.notion.so/Tuple-Types-57c0519b49cd4f0b869c050604194ea3)
* [Any Types](https://www.notion.so/Any-Types-e82595e46b814ac4b982aac49ab3e81b)
* [Unknown Types](https://www.notion.so/Unknown-Types-939ed9069f9143d684842edfe214c0b2)
* [Never Types](https://www.notion.so/Never-Types-7d7f63052d81433ba6f13a73e6b3398d)
* [Union Types](https://www.notion.so/Union-Types-c277c34290234aafa586ab1c1dbb5ef3)
* [Type Guard](https://www.notion.so/Type-Guard-4601863eaa6c422e8b495e1bb4ba75eb)
* [Type Assertions & non-null assertions](https://www.notion.so/Type-Assertions-non-null-assertions-bae9b0fd527244079b887384db6a9e98)