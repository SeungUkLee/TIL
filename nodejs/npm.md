# NPM

`$ npm install express` 이 명령어로 express 모듈을 설치하면 express는 `node_modules/` 라는 폴던안에 추가된다. 즉 `node_modules/` 폴더는 npm으로 추가한 모듈들이 설치된다.


express 와 morgan 모듈을 설치했다고 가정하자.
`node_modules/` 폴더를 자기가 설치한 것 이외에 설치하지 않은 것들도 볼 수 있다. 이는 설치한 모듈이 사용하는 또다른 외부 모듈들이다.


`$ npm init` 을 통해 프로젝트를 초기화를 해보자. `package.json` 이라는 파일이 생긴다. 파일의 내용에 dependencies를 보면 설치한 express 와 morgan이 있는 것을 볼 수 있는데 이는 `$ npm init` 명령어를 통해 `node_modules/` 폴더안에 우리가 설치한 외부 모듈들의 정보를 기록하기 때문에 볼 수 있는 것이다.

빈 폴더(빈 프로젝트)에 `$ npm init` 명령어를 실행하기 되면 `package.json`의 dependencies에는 아무것도 없는 것을 확인할 수 있다. 이 떄 `$npm install express --save` 명령어를 사용하면 express를 설치하고 `package.json` 파일에 express가 기입되는 것을 볼 수 있다.


그럼 이 `package.json`이 왜 중요할까? 
git으로 관리할 때 `node_modules/` 폴더는 용량이 많아 github에 올려두지 않는다. (.gitignore를 통해 제외시킨다) 만약 다른 개발자가 github에 올려둔 것을 clone하여 사용하게 될 경우 `node_modules/` 폴더가 없기 때문에 바로 실행할 수 없다. 이 떄 `$ npm install` 명령을 사용하면 package.json의 dependencies에 기입된 모듈들을 설치하게 된다.


~~~json package.json
{
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node index.js",
    },
}
~~~
다음과 같이  package.json의 scripts에 "start": "node index.js" 를 추가하자. 그러면 `$ npm start` 명령어를 쓸수 있다.. 그러면 우리가 등록한 node index.js 명령어가 실행된다.  test부분은 테스트 코드를 작성하고 수정할 수 있다. 