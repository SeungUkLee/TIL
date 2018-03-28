# 테스트 주도 개발 (TDD)
테스트 주도 개발이란? 테스트 코드를 먼저 작성하여 테스트가 하나하나 통과해나가면서 코드를 작성하는 개발 방법.
개발 시간이 좀 더 걸리는 경우가 발생할 수 있지만 유지보수하는 시점으로 가면 시간을 절약할 수 있는 장점이 있다.

node에서는 TDD를 위해서 **mocha**, **should**, **superTest** 라는 3개의 라이브러리가 있다.

## mocha
모카는 테스트 코드를 실행시켜주는 테스트 러너이다.

모카는 크게 2가지로 나누어져있다.
1. Test suite : 테스트 코드를 작성할 때 테스트 환경을 꾸며주는 역할. `describe()`로 test suite를 만들 수 있다.
2. Test case : 실제 테스트 코드를 만드는 역할. `it()`으로 테스트 케이스를 구현할 수 있다.

~~~ javascript
/* utils.js */

function capitialize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);;
}

module.exports = {
    capitalize: capitialize
}
~~~

> 테스트 파일은 뒤에 **spec**이라고 붙는다. `ex) utils.spec.js`

~~~ javascript
/* utils.spec.js */

const utils = require('./utils');
const assert = require('assert'); // 값이 맞다 안맞다 검증하는 노드의 기본 모듈
describe('utils.js 모듈은의 capitialize() 함수는 ' () => {
    it('문자열을 첫번째 문자를 대문자로 변환한다.', () => {
        const result = utils.capitialize('hello')
        assert.equal(result, 'Hello');
    })
});
~~~

테스트는 개발 환경에서 사용하므로 모카를 설치할때 `-dev` 옵션을 사용하여 설치한다.
`$ npm install mocha --save-dev`

## should
노드에서 값이 맞는지 검증하는 모듈인 **assert** 모듈을 기본적으로 제공한다. 하지만 문서에 assert 부분을 확인하면 테스트 코드에는 사용하지말라고 되어있다. 따라서 서드파티 라이브러리를 사용하는데 **should** 검증 라이브러리를 사용하여 가독성이 높은 코드를 작성할 수 있다.

~~~ javascript
/* utils.spec.js */

// ...

describe('utils.js 모듈은의 capitialize() 함수는 ' () => {
    it('문자열을 첫번째 문자를 대문자로 변환한다.', () => {
        const result = utils.capitialize('hello')
        // assert.equal(result, 'Hello');
        result.should.be.equl('Hello');
    });
});

~~~

## superTest
superTest는 익스프레스 통합 테스트용 라이브러리이며 내부적으로 익스프레스 서버를 구동시켜 실제 요청을 보낸 뒤 결과를 검증한다.

~~~ javascript
/* index.js */

// ...
module.exports = app; // 객체를 할당해도 되고 이렇게 변수를 할당해도됨.
~~~

~~~ javascript
/* index.spec.js */

const app = require('./index'); // 이렇게 index 모듈을 가져올려면 index를 모듈로 만들어야한다.
const request = require('superTest');

// describe를 통해 테스트 수트를 만든다.
describe('GET /users는 ', () => {
    it('...', (done) => { // done이라는 콜백함수를 넣는다.
        // 슈퍼 테스트를 실행
        request(app)
            .get('/users')
            .end((err, res) => {
                console.log(res.body)
                done(); // 테스트가 끝나는 시점에 done() 콜백함수를 호출해준다.
            }     
    });
});
~~~

api 서버가 비동기로 동작한다면 `done` 콜백함수를 넣어 테스트가 끝나는 시섬에 `done()` 콜백함수를 호출해주어 비동기 처리도 해줘야한다.