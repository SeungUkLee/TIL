# Nominal Typing

data type 의 compatibility (호환성) 및 equivalence (동등성)은 explicit declarations (명시적 선언) 및(or 또는) type 의 이름으로 결정되는 타입 시스템.
대표적으로 Java, C# 언어가 이 방식으로 타입 체킹한다.

Nominal Typing 과 반대되는 방법으로 **Structural typing** 이 있으며, typescript 가 이 기반으로 타입 시스템을 갖추고 있다.

```typescript
interface Named {
  name: string
}

class Person {
  name: string
}

let p: Named;
p = new Person(); // Structural typing 에서는 OK, Nominal typing 에서는 No
```

`Named` 와 `Person` 은 `name` 이라는 프로퍼티만 가지고 있다. 이는 서로 **compatibility** 하다고 할 수 있다.

## Type Compatibility

1. Comparing two objects

```typescript
let x = { name: 'lee' }
let y = { name: 'lee', age: 20 }

x = y // OK
y = x // NO, x에 age 라는 속성이 없으므로.
```

2. Comparing two functions

```typescript
let x = (a: number) => 0;
let y = (a: number, b: string) => 0;

y = x // OK
x = y // NO
```
`x`의 파라미터의 경우의 수가 `y`에 모두 포함되므로 `y = x` 가능.

```typescript
let x = () => { name: 'lee' }
let y = () => { name: 'lee', age: 20 }

x = y // OK
y = x // NO
```
1번 케이스(Comparing two objects)와 동일한 이유

---

## Reference

[Jbee - typescript type system](https://jaeyeophan.github.io/2018/01/10/TS-7-TypeScript-type-system/)

[위키피디아 - Nominal type system](https://en.wikipedia.org/wiki/Nominal_type_system#:~:text=In%20computer%20science%2C%20a%20nominal,the%20name%20of%20the%20types.)




