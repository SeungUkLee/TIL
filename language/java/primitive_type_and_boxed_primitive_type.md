# Primitive Type & Boxed Primitive Type

자바에는 기본 자료형이 **Primitive Type** 과 객체로 제공하는 **Boxed Primitive Type** 이 있다. Boxed Primitive Type 은 보통 Primitive Type 을 감싸고 있다고 해서 Wrapper 클래스라고도 부른다. 자바 1.5 이상부터는 이 둘 사이의 Cast를 자동으로 해주는 Autoboxing / AutoUnboxing 을 지원하면서 편리하게 사용이 가능하다.

## Primitive Type, Boxed Primitive Type 언제 사용해야 될까?
명시적으로 null 을 반환해야할 경우, Primitive Type 의 경우 int 는 0, boolean은 false와 같이 기본값을 가지고 있어 원하지 않는 값이 제공될 수 있다. 그래서 `int n = null;` 이라고하면 Error가 발생한다. 이 때는 Boxed Primitive Type을 사용해야한다. ex) `Integer n = null';` 또는 Collection의 key/value로 사용될 때 Collection에는 Primitive Type을 넣을 수 없으므로 Boxed Primitive Type을 사용한다. 마지막으로 parameterized type의 경우에도 Boxed Primitive Type을 사용한다. ex) `List<String>`

## Primitive Type and Boxed Primitive Type Difference
Primitive Type은 스택영역에 저장되고 Boxed Primitive는 힙 영역에 저장되어 둘 사이의 메모리 효율과 접근 속도면에서 Primitive Type이 조금 더 뛰어나다고 할 수 있다. 그래서 위와 같은 경우 말고는 Primitive Type을 사용하는 것이 좀 더 좋다고 생각한다. 이러한 성능 뿐만 아니라 다음과 같은 상황에서 문제가 될 수 있다.

1. `==` 와 같은 비교 연산자
객체에서의 `==`은 값의 비교가 아니라 **레퍼런스 비교**이다.
Autoboxing / AutoUnboxing으로 인해 혼돈 할 수 있으니 주의하는게 좋다. (레퍼런스 비교임에도 불구하고 Caching을 하고 있어 일부 범위에서는 예상 외의 결과가 나온다.)

2. Autoboxing / AutoUnboxing 으로 인해 불필요한 성능저하 초래
```java
public static void main(String[] args) {
    Long sum = 0L;

    for (long i=0; i<Integer.MAX_VALUE; i++) {
        sum += i;
    }

    System.out.println(sum);
}
```
위의 코드를 보면 for 루프안에 `sum += i` 수행시 Boxed Primitive Type이 AutoUnboxing 되어 Primitive 로 변환되어 계산되어 에러는 없지만 성능면에서 떨어지는 결과가 발생한다.

다른 하나 특이한 점은 Boxed Primitive Type에서 Caching을 하고 있다는 점이다.

```java
Integer i1 = 127;
Integer i2 = 127;
Integer j1 = 128;
Integer j2 = 128;

System.out.println(i1 == j2);
System.out.println(j1 == j2);
```

위 코드의 결과를 보면 true, false 라고 나온다. `Integer i1 = 127`은 컴파일시에 `Integer i1 = Integer.valueOf(127)`로 변환되는데 valueOf() 메소드에서는 해당 int 값에 대한 Integer 객체를 생성해서 반환하는 것이다. `==`는 객체 레퍼런스 비교이니 둘 다 false가 되어야하는거 아닌가? 라고 의문을 품을 수 있다. 하지만 여기서 알아야 하는게 바로 Caching 이다. Boxed Primitive Type 에서는 자주 사용되는 범위의 값에 대해 Caching된 객체를 가지고 있다. 실제 Integer.java 소스를 확인해보자.

```java [Integer.java]
public static Integer valueOf(int i) {
    if (i >= IntegerCache.low && i <= IntegerCache.high)
        return IntegerCache.cache[i + (-IntegerCache.low)];
    return new Integer(i);
}

private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];
    static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;
        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);
        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }
    private IntegerCache() {}
}
```
내부적으로 Caching 된 Integer 객체를 반환하고 -128 ~ 127 범위에 대해 객체 Caching을 해 놓고 있는 것을 볼 수 있다. 결국 저 범위의 숫자에 대해 반환된 객체는 Caching 된 동일 객체이므로 `==` 비교를 하면 true 로 나오는 것이다.
