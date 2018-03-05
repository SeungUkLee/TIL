> 코드는 JAVA 코드를 사용하였습니다. 

# Singleton Pattern(싱글톤 패턴)

Singleton(싱글톤)이란 정확히 **하나의 인스턴스**만 생성되는 클래스이다.
싱글톤 패턴은 어떤 클래스를 딱 하나만 생성하고 이를 여기저기서 사용하는 패턴이라고 생각하면 될 것 같다. 즉 인스턴스가 사용될 때 똑같은 인스턴스를 만들어 내는 것이 아니라 **동일 인스턴스를 사용**하게끔 하는 것이 싱글톤 패턴의 기본 전략이다.
주로 프로그램상에서 동일한 커넥션 객체를 만들때 사용된다.

## 일반적인 방법 (Eager, Lazy)

``` java [EagerSingleton.java]
public class EagerSingleton {
    private static EagerInitialization instance = new EagerSingleton();

    private EagerSingleton () {}

    public static EagerSingleton getInstance() {
        return instance;
    }
}
```
가장 기본적인 싱글톤 패턴이다. instance를 만드는데 `private static`을 이용하여 인스턴스화에 상관없이 사용이 가능하면서 `EagerSingleton.instance`으로 접근을 불가능하게 한다. 생성자에 `private` 접근제어자를 붙여 `new` 키워드로 인스턴스 생성을 못하게하여 동일한 인스턴스 생성을 막았다. `getInstance`으로 외부 클래스에서 EagerSingleton 클래스의 인스턴스를 가질 수 있도록 하였다.

하지만 EagerSingleton클래스의 `new EagerSingleton()` 부분으로 클래스가 인스턴스화 되는 시점에서 에러처리를 할 수 없다. `static` block을 이용하여 위 코드를 수정하여 에러처리를 해보자.

``` java [EagerSingleton2.java]
public class EagerSingleton2 {
    private static EagerInitialization instance;

    static {
        try {
            instance = new EagerSingleton();
        } catch (Exception e) {
            throw new RuntimeException("Exception Creating EagerSingleton2 instance!")
        }
    }
    private EagerSingleton () {}

    public static EagerSingleton2 getInstance() {
        return instance;
    }
}
``` 
`static` 초기화 block을 이용하면 클래스가 로딩 될 때 최초 한번만 실행하게되는데 이를 이용하면 logic을 담을 수 있어 변수 셋팅이나 에러처리를 위한 구문을 담을 수 있다.   

하지만 클래스가 load되는 시점에서 인스턴스를 생성시키는데 큰 프로그램일때는 이 같은 경우에도 부담스러울 수 있다.

``` java [LazySingleton.java]
public class LazySingleton {
    private static LazySingleton instance;

    private LazySingleton () {}

    public static LazySingleton getInstance() {
        if (null == instance) {
            instance = new LazySingleton();
        }
        return instance;
    }
}
```

`new LazySingleton();`을 `getInstance()` 메소드안에 사용하고 null check로 비어져있을경우에만 `new`를 이용하여 생성한다. 최초 사용시점에 인스턴스화 되기 때문에 프로그램이 메모리에 적재되는 시점에 부담이 많이 줄어든다. 하지만 muilti thread 방식일 경우 동일 시점에 `getInstance()` 메소드를 호출하게 되면 인스턴스가 두 번 생길 위험이 있다. 
`getInstance()` 앞에 `synchronized`를 붙여 동기화를 사용하여 여러 thread가 동시에 접근하여 생기는 문제점을 해결할 수 있지만 많은 thread가 `getInstance()`를 호출하게 되면 높은 cost 비용으로 프로그램 전체에 성능저하가 발생하게 된다. 

위와 같은 문제점들을 해결하기 위해 ` Initialization on demand holder idiom` 기법으로 사용한 Singleton Pattern이 나오게 된다.

## Initialization on demand holder idiom

## Use Enum