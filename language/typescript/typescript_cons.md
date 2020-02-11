# Typescript cons

## Its type inference is poor at best
타입스크립트는 다소 타입 추론이 열악하다. 다음 예를 보자.

```typescript
function one(name ,age) {
  return two(name, age)
}

function two(name, age) {
  return age + name.length
}

export default one
```

`two` 메소드는 유일하게 `one` 메소드 호출에 의해 호출된다. 따라서 `two`  메소드에 type hinting 하는 것은 의미가 없다. 하지만 Typescript 는 `one` 과 `two` 둘 다 type 을 추가해야한다. `one` 에서 직접 전달된 `name` 과 `age` 매개변수가 무엇인지 유추할 수 없기 때문이다.

```typescript
function one(name: string, age: number): number {
  return two(name, age)
}

function two(name: string, age: number): number {
  return age + name.length
}

export default one
```

코드양이 많으면 이것은 무의미한 type annotations 으로 이어진다. 

## Unsafe type system

## Reference

[Joe Haines](https://www.joehaines.co.uk/why-i-dont-like-typescript)

