# Express.js 기초
express.js는 node.js로 만들어진 웹 프레임워크
express.js는 기본적으로 5가지 개념이 있다.

1. 어플리케이션
2. 미들웨어
3. 라우팅
4. 요청 객체
5. 응답 객체

## 어플리케이션
express 객체(인스턴스)를 어플리케이션이라고 하며 이는 다음 3가지 역할을 한다.
 - 서버에 필요한 기능인 미들웨어를 어플리케이션에 추가한다.
 - 라우팅 설정을 할 수 있다.
 - 서버를 요청 대기 상태로 만들 수 있다.

~~~ javascript index.js
const express = require('express') // express 모듈을 가져옴.
const app = express()              // app 변수가 어플리케이션

app.listen(3000, function() {
    console.log('server is running')
})
~~~

## 미들웨어
미들웨어는 함수들의 연속이다.

~~~ javascript index.js
const express = require('express'); 
const app = express(); 

// 미들웨어는 인터페이스가 정해져있다. 1.req, 2.res, 3.next 
function logger(req, res, next) { 
    console.log("i am logger");
    next(); 
    // 미들웨어는 자기일을 하고 next()를 호출해줘야한다. 이를 호출해줘야 다음 로직을 수행할 수 있다.
}

function logger2(req, res, next) {
    console.log('i am logger2');
    next();
}

app.use(logger) // 미들웨어를 추가할때 use() 사용.
app.use(logger2)

app.listen(3000, function() {
    console.log('server is running');
})
~~~

client로부터 요청이 들어오면 첫번째 미들웨어인 logger 함수가 호출. 그 다음 logger2가 호출된다.
즉, `logger -> logger의 next() -> logger2 -> logger2의 next() ` 이렇게 된다.

다른 사람들이 만들어놓은 미들웨어(써드파티 미들웨어)를 사용할 수 있다. 이것도 노드 모듈 형태로 제공한다.

~~~ javascript index.js 
// ...
const morgan = require('morgan')

// ...

app.use(morgan('dev'))

//...
~~~

미들웨어는 크게 일반 미들웨어, 에러 미들웨어로 나눌 수 있다. 일반 미들웨어는 파라메타를 3개 받지만 에러 미들웨어는 `(err, req, res, next)` 총 4개의 파라메타를 받는다. 에러를 그냥 넘겨버릴 수도 있으며 (`next(err)`) 에러를 처리해서 넘길 수도 있다.

## 라우팅
요청 url에 대해 적절한 헨들러 함수로 연결해 주는 기능을 라우팅이라고 한다.
어플리케이션 객체의 `get()`, `post()` 메소드로 구현할 수 있다.

## 요청 객체, 응답 객체

### 요청 객체
 - 클라이언트 요청 정보를 담은 객체
 - http 모듈의 request 객체를 랩핑한 것.
 - 좀 더 사용하기 쉬운 메소드를 제공. (`req.params()`, `req.body()`, `req.query()`)
 
### 응답 객체
 - 클라이언트 응답 정보를 담은 객체
 - http 모듈의 response 객체를 랩핑한 것.
 - 좀 더 사용하기 쉬운 메소드를 제공.(`req.send()`, `req.status()`, `res.json()`)


----
다음은 express 홈페이지의 Hello World 예제이다.

~~~ javascript
var express = require('express'); // express 모듈을 가져온다.
var app = express(); // express 객체를 하나 만들어서 어플리케이션 변수에다가 할당.

// 라우팅 설정
// 1번쨰 파라메타: 경로 설정. 2번째 파라메타: 설정한 메소드(get,post..)와 경로로 요청이 오면 어떤 로직을 실행할 것인지 작성한다.
// 이때 콜백함수가 파라메타로 req, res객체를 받는다. req, res는 http 모듈의 req, res가 아니라 그것을 한번더 랩핑한 것이다. 
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// 어플리케이션의 listen()를 통해 서버를 구동. 1번째 파라메타: 포트번호, 2번째 파라메타: listen()가 완료되었을떄 실행될 콜백함수.
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
~~~