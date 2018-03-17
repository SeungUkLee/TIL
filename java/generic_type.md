# Java Genric Type

## Class Generic Type

~~~ java
class ClassGenricType<T> {
    private T a;

    public void setA(T a) {
        this.a = a;
    }

    public T get() {
        return t;
    }
}
~~~

Class Generic Type을 어떤 경우에 사용될까? ArrayList 클래스를 생각하면 될 것 같다. T는 type parameter라고 부른다.
`ClassGenericType<String> cgt = new ClassGenericType<>();`

## Interface Generic Type

~~~ java
interface InterfaceGenericType<T1, T2> {
    T1 methodA(T2 t);
    T2 methodB(T t);
}
~~~

Interface Generic Type은 위 Class Generic Type과 사용방법이 많이 유사하다. 위 코드를 보면 제너릭 타입이 2개 선언된 것을 볼 수 있는데 abstract method의 제너릭 타입을 다르게 주고 싶을 때 사용할 수 있다.

## Method Generic Type

~~~ java
class MethodGenericType {
    public static <T> int methodGeneric(T t) {
        int count = 1;
        // ....
        return count;
    }
}
~~~

위 코드처럼 method argument type이 T가 선언되어 있으면 메서드의 리턴 타입 옆에 제너릭 타입을 선언을 해야한다. ex) `public static <T> int methodGeneric(T t)`

## Wildcard Generic Type

~~~ java
class WildcardGenericType {
    
    public List<? extends Number> methodA() {
        return new ArrayList<Long>();
    }

    /* Bounded wildcard parameterized type */
    public <T> List<? extends String> methodB(T param) {
        return new ArrayList<String>();
    }

    /* Unbounded wildcard parameterized type */
    public List<?> methodC() {
        return new ArrayList<>();
    }
}
~~~

위 코드를 보면 ? 있는것을 볼 수 있다. 이는 알 수 없는 타입이다. 따라서 다음과 같이 정리할 수 있다.

`<?>` :  모든 객체 자료형. 내부적으로 Object로 인식.

`<? supper 객체자료형>` : 명시된 객제자료형의 상위 객체. 내부적으로 Object로 인식.

`<? extends 객체자료형>` : 명시된 객체자료형을 상속한 하위 객체. 내부적으로 명시된 객체자료형으로 인식.

## Not Allowed Generic Type

* `private static T t` : static 필드는 제너릭 타입을 가질 수 없음.
* `new T()` : T type은 인스턴스로 생성할 수 없음.
* `List<int> list = new ArrayList<>()` : primitive 타입으로 제너릭 타입을 선언할 수 없음.


## 참고
[Java Generic 정리](http://lng1982.tistory.com/240).