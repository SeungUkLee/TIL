# Generic in Java

다음 유튜브 영상을 보고 정리한 글

> [토비의 봄 TV 4회 (1) 자바 Generics](https://www.youtube.com/watch?v=ipT2XG1SHtQ&t=2s) <br>
> [토비의 봄 TV 4회 (2) Generics에서 와일드카드 활용법, 람다와 인터섹션 타입을 이용한 동적인 기능확장법](https://www.youtube.com/watch?v=PQ58n0hk7DI)

---

## Type parameter & Type argument

```java
class Hello<T> {
    T t;
    T method(T val) { }
}

new Hello<String>();
```

- `Hello` 옆에 `<T>` 는 **타입 파라미터(type parameter)**.
- 컴파일 시점에서 컴파일러가 좀 더 정확하게 타입을 체킹함
- 제네릭을 사용하면 컴파일러가 알아서 적절한 타입 casting 을 해줌
- `new Hello` 옆에 `<String>` 은 **타입 인자(type argument)**

## Raw type

```java
List list = new ArrayList<Integer>();

List<Integer> ints = Arrays.asList(1,2,3);
List rawInts = ints;
List<Integer> ints2 = rawInts;
List<String> strs = rawInts; // compile 에러가 안남!
String str = strs.get(0);  // , 사용하려고 할 떄 에러남
```
- **Raw type**: 제네릭인 경우이면서 타입 파라미터 인자값을 주지 않은 경우.

## Generic method

```java
<T> void print(T t) {
    System.out.println(t);
}
```

- 메소드 레벨에 타입 파라미터를 정의해서 사용

## Generic class

```java
public class Generic2<T> {
    static void print(T t) {
        System.out.println(t);
    }
}
```

- 클래스 레벨로 타입 파라미터를 정의
- 위와 같이 static method 에서 에러남
- 타입 변수 `<T>` 는 이 클래스의 인스턴스가 만들어질때 인자값을 받아옴. static 메소드는 클래스 오브젝트를 만들지 않고 `T` 타입이 무엇인지 알 수가 없음.
- 따라서 `static <T> void print(T t)` 와 같이 작성해서 사용해야됨
- 이름이 같아(`T`) 혼동하기 쉬움 -> `T` 대신 `S` 같은 다른 이름으로 사용하는 것을 권장

## Bounded Type Parameter

- 타입 제한을 둘 때 사용
- `<T extends List>` : `T` 타입은 `List` 의 서브 타입만 가능
- **multiple bound** : 제약을 여러개 두는 것 (ex. `<T extends List & Serializable & Comparable & Closeable>`), **intersection Type** 이라고 함 -> 람다식 정의할 때 사용
- 단 제약을 둘 때 클래스는 하나만 있어야함(클래스 상속이 여러개 안되는거와 비슷)

```java
public class Generic3{

    static long countGreaterThan(Integer[] arr, Integer elem) {
        return Arrays.stream(arr).filter(s -> s > elem).count();
    }

    static <T extends Comparable<T>> long countGreaterThanUsingGeneric(T[] arr, T elem) {
        return Arrays.stream(arr).filter(s -> s.compareTo(elem) > 0).count();
//        return Arrays.stream(arr).filter(s -> s > elem).count();
    }

    public static void main(String[] args) {
        Integer[] arr = new Integer[] {1, 2, 3, 4, 5, 6, 7};
        System.out.println(countGreaterThan(arr, 4));

        String[] arr2 = new String[] {"a", "b", "c", "d", "e"};
        System.out.println(countGreaterThanUsingGeneric(arr2, "b"));
    }

}
```
 
## SubTyping

```java
Integer i = 10;
Number n = i;
```

- `Number` 는 `Integer` 의 슈퍼 클래스이기 떄문에 위와 같이 대입 가능

```java
List<Integer> intList = new ArrayList<>();
List<Number> numberList = intList; // compile error!! why?
```

- `Integer` 는 `Number` 의 서브 타입이지만 `List<Integer>` 는 `List<Number>` 의 서브 타입이 아님
- 타입 파라미터 사이에 슈퍼 타입, 서브 타입 관계가 있다고 해서 위 처럼, 파라미터가 적용된 클래스 사이에 서브 타입, 슈퍼 타입 관계가 형성되지는 않도록 설계됨
- 타입 파라미터의 서브 타입, 슈퍼 타입 관계 즉 상속 관계는 타입 파라미터가 적용이된다
- 제너릭 타입의 상속관계에 영향을 주지 않는다고 생각하면 된다

```java
class MyList<E, P> implements List<E> { 
    // ... 
}

ArrayList<Integer> arrList = new ArrayList<>();
List<Integer> intList2 = arrList;
// List<Integer> 타입은 ArrayList<Integer> 의 슈퍼타입

List<String> s1 = new MyList<String, Integer>();
List<String> s2 = new MyList<String, String>(); // 이렇게 대입이 된다
// MyList 는 List 타입의 서브타입으로 선언을 하였기때문에 된다. 타입 파라미터가 뒤에 어떻게 붙는지는 상관없다
```

## Type Inference

주로 메소드 호출할 때 호출하는 정보를 보고 타입 아규먼트가 무엇이 들어가야되는지 컴파일러가 체크를 해주는 기능을 말한다

``` java
public class Generic5 {
    static <T> void method(T t, List<T> list) {
        // T 타입이 무엇인지 알려면 이 두가지를 체크하고 비교를 해봐야하는데 손쉽게 T 타입이 무엇인지
        // 컴파일러가 알아서 적용해준다 이 안에서 사용할떄도 T 타입에 맞게 적용을 해준다
    }

    public static void main(String[] args) {
        method(1, Arrays.asList(1, 2, 3));

        // 자바 버전이 낮은 경우 추론이 안될수도 있다.
        // <T> 가 <Integer> 라고 컴파일러에게 알려준다.
        Generic5.<Integer>method(1, Arrays.asList(1, 2, 3));
        List<String> str = new ArrayList<>(); // <> 에서도 컴파일러가 타입 추론을 한다.

        List<String> c = Collections.emptyList();
    }
}
```

## Wildcard

``` java
public class Generic6 {
    static <T> void method(List<T> t) {}
    static void method2(List<?> t) {}

    static void method3(List<? extends Comparable> t) {}
    static <T extends Comparable> void method4(List<T> t) {}

    static void printList(List<Object> list) {
        list.forEach(s -> System.out.println(s.toString()));
    }
    static void printList2(List<?> list) {
        list.forEach(s -> System.out.println(s.toString()));
    }
    // printList 와 printList2 차이점은?

    public static void main(String[] args) {
//        List<?> list; // ?: wildcards 라고 한다. 내가 이 타입을 모른다(알 필요도 없다).
//        List<T> list2; // 선언하는 시점에서 나는 이 타입이 무엇인지 모르지만 나는 이 타입이 정해지면 그 타입이 무엇인지 알고 이후에 사용을 하겠다
        List<? extends Object> list; // Object 에 정의되어있는 기능만 가져와 사용을 하겠다
        List<?> list2; // 나는 ? 에 오는 타입이 무엇이 와도 상관이 없어.
        // 나는 타입 파라미터를 받는 List 라는 녀석이 가지고 있는 메소드만 사용을 할래라는 의미이다
        // ? 와 ? extends Object 는 문법적으로 다르게 정의되어있는거지만 사실상 똑같음.

        printList(Arrays.asList(1, 2, 3));
        printList2(Arrays.asList(1, 2, 3));
        // 잘된다

        List<Integer> list3 = Arrays.asList(1, 2, 3);
//        printList(list3); // error 남
        // Integer 는 Object 의 서브 타입이지만, List<Integer> 는 List<Object> 의 서브 타입이 아니다.
        printList2(list3); // error 안남

    }
}
```

``` java
public class Generic7 {
    static class A {}
    static class B extends A {}

    public static void main(String[] args) {
        List<B> listB = new ArrayList<B>();
//        List<A> la = listB; // error
        List<? extends A> la = listB; // 가능
        List<? super B> l2 = listB; // 가능
//        la.add(new B()); // error
        la.add(null);
    }
}
```

``` java
public class Generic8 {
    static <T> void method(List<T> list, T t) {
        // T 타입은 여기 메소드에서 여러 용도로 사용이 가능
    }
    static void method2(List<?> list) {
        // 몇 가지 제약이 있음
//        list.add(1); // 구체적인 값을 못넣음, null 만 가능
//        list.add(null);
//        list.size();
//        list.clear();
//        Iterator<?> it = list.iterator();
        // 위는 가능

    }
    // 유사하게 사용될 수 있지만 이 둘은 다르다
    // 용도와 관례 등 다름

    // 타입 파라미터로 정의하면 예를 들어 List<T>: 엘레멘트에 관심이 있다는 것임
    // 와일드 카드: 타입이 뭔지 모르겠고 리스트가 가지는 메소드를 사용하겠다.
//    static <T> boolean isEmpty(List<T> list) {
    static boolean isEmpty(List<?> list) {
        // 와일드카드를 사용해도 잘됨
        return list.size() == 0;
    }

//    static <T> long frequency(List<T> list, T elem) {
    static long frequency(List<?> list, Object elem) {
        // 와일드카드로 할 시 이렇게 사용
        // 와일드카드 사용법 중 오브젝트 클래스 안에 정의되어있는 toString, equals 이런것들은 사용이 가능
        // 그래서 이런 경우에도 와일드카드로 정의 가능
        return list.stream().filter(s -> s.equals(elem)).count();
    }
    // 위 2가지는 기능상으로는 둘 다 작동함.
    // 하지만 자바의 설계된 사상에 따라 코드를 작성하고 싶으면 와일드카드로 정의하는게 좋
    // 왜냐하면 T 타입을 이용해서 무언가 작업을 수행하겠다라고 의미로 API가 해석이됨.
    // 이는 내부 구현이 노출이됨.
    // API 설계한 사람 입장에서는 그 의도를 바르게 들어내지 못하는 코드가 되어버림
    // 그래서 위 같은 경우에는 와일드카드로 정의하는 것이 좋다

    // 이 메소드도 와일드카드를 이용해서 작성하는게 더 깔끔한 코드가 된다
    // b 가 a의 서브타입 값을 넣어도 문제가 되지 않는다. [26:00 쯤]
    // 그래서 밑에 처럼 와일드카드를 이용해서 작성할 수 있다
    // [와일드카드를 사용하는 가이드라인]
    // 파라미터 값이 이 메소드에서 사용되기위해 넘겨지는 경우라면 상위한정(<? extends T>)을 쓸 수 있게 된다
    // 밑의 코드 같은 경우는 a, b 로 사용되어진다
    // Comparable<? super T> 에서 <? super T> 안에 들어가는 값이라는 것은
    // 메소드 안이 아니라 메소드 밖에 무언가에서 사용되기 위해서 하위한정으로 정의한다...
//    static <T extends Comparable<T>> T max(List<T> list) {
    static <T extends Comparable<? super T>> T max(List<? extends T> list) {
        return list.stream()
                .reduce((a, b) -> a.compareTo(b) > 0 ? a : b)
                .get();
    }


    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1,2,3,4,5);
        method2(list);
        System.out.println(isEmpty(list));
        System.out.println(frequency(list, 3));
        System.out.println(max(list));
        System.out.println(Collections.max(list, (a, b) -> a - b));
        // 람다식은 타입 캐스팅이 가능함
        System.out.println(Collections.max(list,
                (Comparator<Object>)(a, b) -> a.toString().compareTo(b.toString())));
        // Comparator<Object> 에서 월래는 Object 가 아니라 Integer 이다. 하지만 Integer 의 수퍼타입을 사용할 수 있다.
        // 하위 경계를 갖다가 T 타입을 Integer 로 잡아놓는다
        // [30:30~] 다시 볼 것...


    }
}
```

``` java
//[35:40~] 부터 진행
public class Generic9 {
    public static void main(String[] args) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5);
        reverse(list);
        System.out.println(list);
    }


//    static <T> void reverse(List<T> list) {
//        List<T> temp = new ArrayList<>(list);
//        for (int i = 0; i < list.size(); i++) {
//            list.set(i, temp.get(list.size() - i - 1));
//        }
//    }

//    static void reverse(List<?> list) {
//        List<?> temp = new ArrayList<>(list);
//        for (int i = 0; i < list.size(); i++) {
//            list.set(i, temp.get(list.size() - i - 1)); // compile error
//            // [39:00~]
//            // capture 어쩌구 저쩌구 관련된 에러가 나는 것을 볼 수 있다
//            // 와일드카드로 만든것은 capture 라는 프로세스가 돌아가는 경우가 있다
//            // capture 가 무엇이냐면 나는 이 타입을 몰라라고 정의한건데 필요에 따라 이 타입이 무엇인지
//            // 추론을 해야되는 경우가 있다. 이것을 capture 한다고 한다.
//            // capture 가 필요없는 경우에는 상관없는데 capture 가 필요한 상황을 만나면 그것을 capture 할 수 있는지
//            // 확인하고 안되면 이런식의 에러가 발생하는 것이다. 이를 해결하기 위해서는 자바 언어를 설계한 사람들은
//            // 이를 내가 강제로 capture 하는 코드, 일종의 헬퍼 메소드를 만들어라고 한다.
//        }
//    }


//    static void reverse(List<?> list) {
//        // 와일드카드로 넘어온 파라미터를 제네릭 타입으로 받는 코드로 넘겼는데 아무 문제 없이 넘어왔다.
//        // 그럼 월래 전환이 되는건가 생각을 해보면 사실 그렇지 않다.
//        // 대입이 가능하다는 것은 제네릭 타입 파라미터가 적용된 타입(List<T>)이랑 List<?> 타입이랑 일치하거나
//        // List<T> 요놈이 슈퍼 타입이어야 한다. 하지만 그런 관계는 없다.
//        // 하지만 이런 식으로 코드를 작성하였을떄는 와일드카드가 적용된 list 타입을 갖다가
//        // 제네릭 메소드의 제네릭 타입 파라미터가 적용된 이 List<T> 타입으로 컴파일러가 자동으로 capture 를 해준다.
//        // 처음에 이 코드를 보면 이해가 잘 안된다. 그냥 처음부터 reverseHelper 에 작성된 코드로 작성하면 되지않나? 라고 의문을 가진다.
//        // API 를 사용하는 클라이언트 코드를 볼 떄 이를(<T>?) 직접 노출하는 코드는 이 API 내부 구현에 대한 오해를 불러일으킬수 있다.
//        // T 타입을 활용하지 않는 경우에는 와일드카드를 사용하는 것이 맞다.
//        // 하지만 reverseHelper 에 작성된 이런 류의 코드를 작성할 경우에는 capture 문제가 발생하니 이는 강제적으로 helper 메소드를 이용해서
//        // 자연스럽게 메소드 호출 과정에서 capture 가 일어나도록 만들어주고 helper 의 도움을 받아 기능을 완성한다.
//        reverseHelper(list);
//    }
//
//    private static <T> void reverseHelper(List<T> list) {
//        List<T> temp = new ArrayList<>(list);
//        for (int i = 0; i < list.size(); i++) {
//            list.set(i, temp.get(list.size() - i - 1));
//        }
//    }

    // 편법으로 Law Type 을 이용할 수 있다
    // 로직을 이해하는 입장에서는 문제가 없는 코드이다.
    // 실제로 Collection API 의 reverse utility method 가 이런식으로 작성되어있다
    static void reverse(List<?> list) {
        List temp = new ArrayList<>(list);
        List list2 = list;
        for (int i = 0; i < list.size(); i++) {
            list2.set(i, temp.get(list2.size() - i - 1));
        }
    }
}
```