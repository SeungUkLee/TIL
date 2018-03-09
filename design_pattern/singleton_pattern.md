> 코드는 JAVA 코드를 사용하였습니다. 

# Singleton Pattern(싱글톤 패턴)

Singleton(싱글톤)이란 정확히 **하나의 인스턴스**만 생성되는 클래스이다.
싱글톤 패턴은 어떤 클래스를 딱 하나만 생성하고 이를 여기저기서 사용하는 패턴이라고 생각하면 될 것 같다. 즉 인스턴스가 사용될 때 똑같은 인스턴스를 만들어 내는 것이 아니라 **동일 인스턴스를 사용**하게끔 하는 것이 싱글톤 패턴의 기본 전략이다.
주로 프로그램상에서 동일한 커넥션 객체를 만들때 사용된다.

## 일반적인 방법 (Eager, Lazy)

``` java [EagerSingleton.java]
public class EagerSingleton {
    public static final String NAME = new String("EagerSingleton");
    private static final EagerInitialization instance = new EagerSingleton();

    private EagerSingleton () {}

    public static EagerSingleton getInstance() {
        return instance;
    }
}
```
가장 기본적인 싱글톤 패턴이다. instance를 만드는데 `private static`을 이용하여 인스턴스화에 상관없이 사용이 가능하면서 `EagerSingleton.instance`으로 접근을 불가능하게 한다. 생성자에 `private` 접근제어자를 붙여 `new` 키워드로 인스턴스 생성을 못하게하여 동일한 인스턴스 생성을 막았다. `getInstance`으로 외부 클래스에서 EagerSingleton 클래스의 인스턴스를 가질 수 있도록 하였다.

하지만 EagerSingleton클래스의 `new EagerSingleton()` 부분으로 클래스가 인스턴스화 되는 시점에서 에러처리를 할 수 없다. 밑의 코드룰 추가하여 `static` block을 이용하여 에러처리를 할 수는 있다.

``` java
    static {
        try {
            instance = new EagerSingleton();
        } catch (Exception e) {
            throw new RuntimeException("Exception Creating EagerSingleton2 instance!")
        }
    }
``` 
`static` 초기화 block을 이용하면 클래스가 로딩 될 때 최초 한번만 실행하게되는데 이를 이용하면 logic을 담을 수 있어 변수 셋팅이나 에러처리를 위한 구문을 담을 수 있다.   

하지만 클래스가 load되는 시점에서 인스턴스를 생성시키는데 큰 프로그램일때는 이 같은 경우에도 부담스러울 수 있다. EagerSingleton 의 getInstance() 메소드를 호출하지 않고 필드인 NAME에 접근해도 인스턴스가 생성이 되어버린다.

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

위와 같은 문제점들을 해결하기 위해 `Initialization on demand holder idiom` 기법으로 사용한 Singleton Pattern이 나오게 된다.

## Initialization on demand holder idiom

``` java [LazySingleton.java]
public class LazySingleton {
    public static final String NAME = "LazySingleton";

    private static final class LazySingletonHolder {
        private static final LazySingleton INSTANCE = new LazySingleton();
    }

    private LazySingleton() {
        System.out.println("Create LazySingleton");
    }

    public static LazySingleton getInstance() {
        return SingletonHolder.INSTANCE;
    }
}
```
위 코드는 `Initialization on demand holder idiom` 기법으로 사용한 Singleton Pattern 이다.
LazySingleton Instance를 LazySingletonHolder 이 가지고 있다. 즉 NAME 과 같은 필드가 아니므로 NAME 필드에 접근을 해도 인스턴스가 생성되지 않는다. 클래스 초기화는 그 클래스의 필드나 메소드에 접근할 떄 initialization(초기화)가 되므로 NAME 필드에 접근을 해도 LazySingletonHolder class 는 초기화 되지 않는다.
JVM의 class loader의 메커니즘과 class의 load 시점을 이용하여 내부 class를 생성시켜 thread 간의 동기화 문제도 해결가능하다.

## Use Enum

Serialization 한 다음 DeSerialization 을 하면은 인스턴스가 2개가 생성 될 수 있다. 이 문제를 해결하려면 Singleton 자체를 JVM이 컨트롤하게 한다. 싱글톤 및 직렬화 테스트 코드도 같이 올려놓았으니 테스트 해보는 것도 나쁘지 않을 것 같다.

> Serialization (직렬화) 이란? 
저장을 하든 다른쪽으로 통신을 하든 오브젝을 그냥 넘길 수 없으니깐 직렬화를 통해 저장할 수 있는 포맷으로 바꾼다음에 전송하거나 저장을 한다.


```java [EnumSingleton.java]
enum NewSingleton { 
    INSTANCE;

    public void greate(final String name) {
        System.out.println("Hello " + name + "|");
    }
}
```

enum을 통해 단 한번의 인스턴스 생성을 보장하고 INSTANCE가 생성될 때 multi thread 로 부터 안전하다. (추가된 method 들은 safed 하지 않을 수도 있다.)

위 코드는 Effective Java 2판에서 소개된 Singleton Pattern 인데 Enum을 사용해서 만드는 것을 권장하고 있다. 

----
여담으로 테스트떄 싱글톤을 생성하였을 경우 다음 테스트때 또 써도 되는지 알기힘들어 싱글톤은 테스트 할 때 힘들다고 한다.

주로 싱글톤을 Google guice 난 Spring framework 를 이용하여 생성하는데 Spring을 이용하여 생성한 컨트롤러 or 서비스 리포지토리 빈들은 옵션을 따로 주지 않는 이상 싱글톤이라고 생각하면 된다. 예를 들어 UserService에 UserDAO가 있는데 애플리케이션이 도는 중간에 UserDAO를 다른걸로 바꾸지 않는다. 다른 걸로 바꿀 이유도 없고 그렇게 하는 코드를 만들면 문제가 많이 발생하기 때문이다. 그래서 보통 프레임워크한테 통제권을 넘기는 것이 좋다.

----
## 참고
[java singleton pattern (싱글톤 패턴)](https://blog.seotory.com/post/2016/03/java-singleton-pattern).
[YouTube 케빈 TV 30회 - 패턴 이야기 - 싱글톤 패턴](https://www.youtube.com/watch?v=Ba7iYO7_BPc&list=PLRIMoAKN8c6N9znwk74L-PL5sWl4HK0R8).