# 자바스크립트 유용한 코딩 기법들

## 배열 선언과 공시에 값 채우기

```js
let array = Array(5).fill('');
console.log('array: ', array); // [ '', '', '', '', '' ]
```

자바스크립트에서는 고정 길이 배열이 아닌 동적 길이 배열을 주로 사용하기 때문에 위 방법은 잘 사용하지는 않는다.

## 빈 배열로 for loop 제거

```js
let sum = 0;
for (let i = 0; i < 10; i++) {
    sum += i
}
```

함수형 프로그래밍이 인기를 얻으면서 위 코드 처럼 `for`, `while` 사용을 잘 하지 않는다.
이 코드는 다음과 같이 수정할 수 있다.

```js
const sum = [...Array(10)].reduce((acc, i) => {
    acc += i
}, 0);
```

lodash 의 `times(n)` 함수를 이용해도 된다. 

## 유일한 값들로 구성되어있는 배열 구하기

```js
const fruits = [
    'Apple',
    'Berry',
    'Grape',
    'Melon',
    'Pear',
    'Apple',
    'Pear'
];

const uniqueWithArrayFrom = Array.from(new Set(fruits));
console.log('uniqueWithArrayFrom', uniqueWithArrayFrom);

const uniqueWithSpreadOperator = [...new Set(fruits)];
console.log('uniqueWithSpreadOperator', uniqueWithSpreadOperator);
```

`Set` 내장 객체를 이용하여 배열의 중복값을 제거할 수 있다. lodash 를 이용하면 `uniq` 함수를 통해 구할 수 있다.

## spread 연산자를 이용하여 객체 병합하기

```js
const product = {
    name: 'Milk',
    packaging: 'Plastic',
    price: '3$',
};

const manufacture = {
    name: 'Company Name',
    address: 'The Company Address',
};

const productManufacturer = {...product, ...manufacture};
console.log('productManufacturer:', productManufacturer);
```

spread 연산자가 나오기 전에는 `Object.assign` 을 주로 사용하였다. 하지만 이 함수는 인자로 넘어가는 객체 자신을 변경시켜 함수형 프로그래밍 컨셉에 부합하지 않는다.


두번쨰로 나오는 예제는 객체들이 담긴 배열로부터 하나의 객체를 만드록 `reduce` 함수, spread 연산자그리고 동적으로 객체 키를 설정하는 기술(Enhanced Object Literals)을 이용한다. 이 방법은 json 객체를 조작할 때 유용하게 사용할 수 있다.

```js
const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'no' },
    { name: 'Marseille', visited: 'yes' },
    { name: 'Rome', visited: 'yes' },
    { name: 'Milan', visited: 'no' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'yes' },
    { name: 'Berlin', visited: 'no' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'yes' }
];

const result = cities.reduce((acc, item) => {
    return {
        ...acc,
        [item.name]: item.visited
    }
}, {});

console.log(result);
```

## Array.map 없이 배열 맵핑하기


```js

const cities = [
    { name: 'Paris', visited: 'no' },
    { name: 'Lyon', visited: 'no' },
    { name: 'Marseille', visited: 'yes' },
    { name: 'Rome', visited: 'yes' },
    { name: 'Milan', visited: 'no' },
    { name: 'Palermo', visited: 'yes' },
    { name: 'Genoa', visited: 'yes' },
    { name: 'Berlin', visited: 'no' },
    { name: 'Hamburg', visited: 'yes' },
    { name: 'New York', visited: 'yes' }
];

const cityNames = Array.from(cities, ({name}) => name);
console.log(cityNames);
```

`Array.map` 대신 `Array.from` 을 이용하여 새로운 배열을 만들어내는 코드이다. 굳이 구분하여 사용할 필요는 없어 보인다. 참고한 사이트를 보면 성능상 `Array.map` 이 아주 근소하게 더 빠른 결과를 나온 것을 볼 수 있다. 그냥 `Array.from` 으로도 이렇게 새로운 배열을 만들 수 있구나하고 넘어가면 될 것 같다.


## 조건부 객체 속성

```js
const getUser = (emailIncluded) => {
    return {
        name: 'John',
        surname: 'Doe',
        ...(emailIncluded && { email: 'john@doe.com'})
    }
};

const user = getUser(true);
console.log(user);

const userWithoutEmail = getUser(false);
console.log(userWithoutEmail);
```

조건에 따라 객체의 인자가 달라져야 하는 경우, 이 방법을 사용하면 유용하다. 두 개의 객체를 만들어서 선택할 필요가 없다. `...emailIncluded && { email: 'john@doe.com'}` 여기서 조심해야되는 부분은 연산자 우선순위이다. `&&` (AND) 연산자 처리가 끝난 후 그 결과에 대해 `...` 연산자로 펼쳐진다.

## 데이터 destructing 하기

```js
const rawUser = {
    name: 'John',
    surname: 'Doe',
    email: 'john@doe.com',
    displayName: 'SuperCoolJohn',
    joined: '2016-05-05',
    image: 'path-to-the-image',
    followers: 45
};

const { name, email } = rawUser;
console.log(name, email);
```

일반적으로 가장 쉽고 자주 사용되는 destructing 은 다음과 같다. rawUser 객체에서 원하는 속성만 뽑아내서 새로운 변수를 만든다.


만약 뽑아낸 속성들로 새로운 객체를 만들어야하면 다음과 같이 하면 된다.

```js
let user = {};
// ({ name: user2.name, surname: user2.surname, ...userDetails} = rawUser);
({ name: user.name, email: user.email } = rawUser);
// console.log(userDetails);
console.log(user);
```

lodash 의 `pick` 함수를 이용하면 가독성 좋게 만들 수 있다.

## 동적 속성 이름

```js
const dynamic = 'email';
let user = {
    name: 'John',
    [dynamic]: 'john@doe.com',
};
console.log(user);
```
ES6에 추가된 기능으로 객체의 key 를 동적으로 생성할 수 있다. ES6 문법을 사용할 수 없으면 아래와 같이 처리해야된다.

```js
const dynamic = 'email';
let user = {
    name: 'John'
};

user[dynamic2] = 'john@doe.com';
console.log(user);
```

## Reference

[유용한 JavaScript 코딩 기법들](https://blog.ull.im/engineering/2019/06/10/some-of-useful-javascript-trick.html)

[ES6 Features](https://codetower.github.io/es6-features/#Enhanced%20Object%20Literals)