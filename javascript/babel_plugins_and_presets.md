# 바벨(Babel)이란?
우선 자바스크립트의 역사를 살펴보자. 자바스크립트는 웹을 위한 언어이며 구글 크롬, 사라피 등 브라우저 위에서 작동한다. 그리고 각 브라우저는 서로 다른 자바스크립트 인터프린터를 사용한다. 자바스크립트의 자체적인 표준을 가지고 그에 따라 관리를 하게 되는데 그 표준을 ES(ECMAScript)라고 부른다. 즉 ES5는 5 번째로 제정된 표준이라는 뜻이다 (쉽게 말해서 5번쨰 버전.). ES6는 많은 업데이트를 포함하고 있어 ES6 문법과 ES5 문법이 사용된 자바스크립트 코드 간에는 많은 차이점이 발생하게 된다. 많은 개발자들이 ES6의 새로운 문법을 사용하는 동시에 오래된 브라우저 환경에서도 코드가 문제없이 작동하기를 희망한다. 이떄 바벨이 필요하게 되는데 바벨은 자바스크립트 트랜스파일러이다. 즉 서로 다른 언어 간의 변화를 담당하는데 ES6의 자바스크립트를 ES5의 자바스크립트로 변환하다는 의미이다. 따라서 바벨을 사용하여 모던한 자바스크립트 문법을 널리 지원되는 ES5 문법의 자바스크립트로 변환할 수 있다.

## 바벨 사용법
바벨을 사용하는 방법은 여러가지 있다. 그 중 가장 간단한 `babel-standalone` 패키지 사용 방법을 알아보자.
### babel-standalone 패키지 사용
`script` 태그만 삽입하여 `babel-standalone` 패키지를 사용하는 방법이다. 사용법이 무척 간단하다는 장점이 있다.

~~~ html
<script>
    src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.1/babel.min.js"
</script>
~~~ 

이제 바벨은 type 이 `text/bable` 이거나 `test/jsx` 인 스크립트로 자동으로 변환해준다.

~~~ html
<div id="output"> 

</div>

<script type="text/babel">
    const getMessage = () => "Hi~~"; // ES6 문법.
    document.getElementById('output').innerHTML = getMessage();
</script>
~~~

> 만약 React를 사용하고 있으면 create-react-app을 사용할 수 있는데 기본적인 바벨 세팅이 되어있어 따로 설정없이 손쉽게 사용할 수 있다.

## 바벨 plugin & preset
바벨에서 preset은 특정 기능을 지원하는 여러 plugin의 모음이다.
바벨의 기본적인 preset은 다음 두 가지이다. 바로 `es2015 / react` 이다.
> 현재는 `env`, `react`, `flow` 로 바뀌었다.

ES7 이외에도 자바스크립트의 여러 기능에 대한 제안(proposal)은 다양한 stage 형태로 존재하는데 다음과 같이 단계를 구분한다.

- `stage-0` Strawman : 구체적이지 않은 구성안, 바벨 plugin이 될 수 있음.
- `stage-1` Proposal : 받아 들일 가치가 잇는 제안.
- `stage-2` Draft : 초기 표쥰.
- `stage-3` Candidate : 표준 정의를 마침. 초기 형태의 브라우저 구현이 존재.
- `stage-4` Finished : 다음 표준에 포함될 예정.

## 바벨 plugin 과 preset 사용방법.
바벨을 설정하는 방법은 크게 2가지 방식이 있다. 
1. package.json 을 사용하는 방법,
2. .babelrc 를 사용하는 방법.

### 1. package.json 을 사용하는 방법,
`package.json`에 `plugin` 과 `preset`을 명시한다.

~~~ json
// package.json
{
  "babel": {
    // nest config under "babel"
    "presets": ["es2015", "react", "stage-3"],
    "plugins": ["transform-class-properties"]
  }
}
~~~

### 2. .babelrc 를 사용하는 방법.

~~~ json
// .babelrc
{
  "presets": ["es2015", "react", "stage-3"],
  "plugins": ["transform-class-properties"]
}
~~~

.babelrc를 사용하는 것을 추천.

## Reference
[(번역)(Fullstack React) What are babel "plugins" and "presets"? (And how to use them)](https://gompro.postype.com/post/1696324).