# 자바스크립트 함수

함수는 코드의 재사용이나 정보의 구성 및 은닉 등에 사용하고, 객체의 행위를 지정하는데도 사용한다.

## 1. 함수 객체
함수는 객체이다. 즉 다른 값들처럼 사용할 수 있다. 객체 중에서 객체 리터럴로 생성되는 객체는 Object.prototype에 연결되는 반면에 함수 객체는 Function.prototype에 연결되며 Function은 Object.prototype에 연결된다. 

함수는 두 개의 추가적인 속성이 있는데 이 속성들은 context(함수의 문맥) 와 함수의 행위를 구현하는 코드이다.
또한 모든 함수 객체는 prototype 이라는 속성이 있다. 이 속성의 값은 함수 자체를 값으로 갖는 constructor라는 속성이 있는 객체이다. 

## 2. 함수 리터럴
함수 객체는 함수 리터럴로 생성할 수 있다.

~~~javascript
var add = function (a,b) {
    return a + b
}
~~~

함수 리터럴은 표현식이 나올 수 있는 곳이면 어디든지 위치할 수 있다. 함수 리터럴로 생성한 함수 객체는 외부 문맥으로의 연결이 있는데 이를 Closure(클로저)라고 한다. (부록 b 함수 문장 vs 함수 표현식 참고) 

## 3. 호출
함수를 호출하면 현재 함수의 실행을 잠시 중단하고 매개변수와 함께 호출한 함수로 제어권이 넘어간다.

모든 함수는 명시되어 있는 매개변수와 this와 arguments라는 추가적인 매개변수 2개를 더 받는다.
this : 호출하는 패턴에 따라 결정된다.
> 자바스크립트에서는 함수를 호출하는데 "메소드 호출 패턴", "함수 호출 패턴", "생성자 호출 패턴", "apply 호출 패턴"이 있다.

### 메소드 호출 패턴
함수를 객체의 속성에 저장하는 경우 이 함수를 "메소드"라고 한다. 메소드를 호출할 때, this는 메소드를 포함하고 있는 객체에 바인딩된다.(즉, this는 객체 자체가 된다) 호출되는 표현식이 마침표나 [ ] 을 포함하고 있으면 이 방법을 메소드 호출 패턴이라고 한다.

```js
var myObject = {
    value: 0,
    increment: function (inc) {
          this.value += typeof inc === 'number' ? inc : 1
    }
}

myObject.increment()
console.log(myObject.value)
myObject.increment(2)
console.log(myObject.value)
```

메소드는 자신을 포함하는 객체의 속성들에 접근하기 위해서 this를 사용할 수 있다. 즉 this를 사용해서 객체의 값을 읽거나 변경할 수 있다. this와 객체의 바인딩은 호출 시에 일어난다. 이렇게 매우 늦은 바인딩은 this를 효율적으로 사용하는 함수를 만들 수 있으며 자신의 객체 문맥을 this로 얻는 메소드를 public 메소드라고 부른다.


### 함수 호출 패턴
함수각 객체의 속성이 아닌 경우에는 함수로서 호출한다.

`var sum = add(3,4) // 7`

함수를 이 패턴으로 호출할 때 this는 전역객체에 바인딩된다. 이런 특성은 언어 설계 단계에서의 실수이다.
왜냐하면 내부 함수는 메소드가 객체 접근을 위해 사용하는 this에 자신의 this를 바인딩하지 않고 엉뚱한 값(전역객체)에 연결하기 때문이다.