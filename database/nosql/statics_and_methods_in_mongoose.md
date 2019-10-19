# methods and statics in mongoose

mongoose 의 `methods` 와 `statics` 활용 차이은 무엇일까? `methods` 와 `statics` 는 겅의 동일한 역할을 한다. 차이점은 자바 클래스의 일반 method 와 static 메소드의 차이와 동일한다. 

따라서 `methods` 는 새로 만든 객체를 통해 작업할 경우 선언하여 사용하고, `statics` 는 객체 선언이나 데이터 대입 없이 조회와 같은 기능을 만들어 사용하면 된다.

* `methods` 는 하나의 다큐먼트 단위로 사용
* `static` 는 하나의 콜렉션 단위로 사용


## Reference

[mongoose 간단 예제와 methods, statics 활용 차이](http://kese111.blogspot.com/2015/01/mongoose-methods-statics.html)