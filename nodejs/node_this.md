# this keyword in node.js

브라우저에서의 `this` 와 node.js 에서의 `this` 는 다르다. **큰 원칙에서의 일관정은 있지만 세세한 부분이 다른다**.

``` js
// test.js
console.log(this)
```

`test.js` 를 만들고 `$ node test.js` 를 실행해보자. 브라우저에서는 window 객체가 나오지만 node.js 에서는 빈 객체가 나오는 것을 볼 수 있다. node 에서는 DOM 관련 객체인 window 와 document 객체는 없다. 이 두 객체는 브라우저 런타임에서 넣어주는 객체인데 노드와 브라우저는 다른 런타임이기때문이다. 

``` js
console.log(this, module.exports, exports)  // {} {} {}
console.log(this === module.exports)  // true
console.log(this === exports)  // true
console.log(module.exports === exports)  // true
```

위의 코드를 실행해보면 `this` 의 정체를 알 수 있는데 바로 `module.exports` 이다. 이 객체는 파일을 모듈로 사용할 수 있게 하는 객체인데 `module.exports` 와 `exports`, `this` 가 같은 것을 확인 할 수 있다. 

node.js 에서 `this` 객체가 전역 객체를 가르키지않는데 항상 그렇지는 않다. 다음 코드를 보자.
``` js
function a() {
    console.log('function a', this === exports, this === global)
}

const b = () => {
    console.log('function b', this === exports)
}

a()  // function a false true
b()  // function b true
```

위 코드를 실행해보면 전역 환경에서 `this` 만 `module.exports` 이고, 함수 선언문에서의 `this` 는 `global` 인 것을 볼 수 있다. arrow function 의 경우는 `this` 가 상위 환경의 `this` 를 물려받기 때문에 `module.exports` 와 같다는 결과가 나온다.

## 결론

**node.js 에서는 전역 환경의 `this` 만 `global` 이 아니고 `module.exports` 를 가르킨다**.