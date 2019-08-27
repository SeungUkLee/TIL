# 공변과 불변

모던한 랭귀지들은 타입 바운드(type bound) 개념을 제공하는데 타입 바운드는 3가지로 분류한다.

1. 무공변성 (invariant) : 상속 관계에 상관없이 자기 타입만 허용한다는 의미
2. 공변성 (covariant) : 타입 생성자에게 리스코프 치환 법칙을 허용, 자기자신과 자기자신을 상속받은 타입을 허용한다는 의미
3. 반공변성 (contravariant) : 공변성의 반대 개념, 자기 자신과 부모 객체만 허용한다는 의미

## Reference

[공변성과 반공변성은 무엇인가?](https://edykim.com/ko/post/what-is-coercion-and-anticommunism/)


