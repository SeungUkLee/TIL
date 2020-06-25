Nominal Type System 과 Structural Type System 의 내용을 보다가 문득 structural type system 과 duck typing 이 비슷하게 느껴져 무슨 차이가 있는지 구글링했다.

다음 내용은 위키피디아에서 발췌한 내용이다.

> Duck typing is similar to, but distinct from, structural typing. Structural typing is a static typing system that determines type compatibility and equivalence by a type's structure, whereas duck typing is dynamic and determines type compatibility by only that part of a type's structure that is accessed during run time.

해석 및 정리하자면,

* **Structural Typing** 
  
  타입 구조에 따라 타입 compatibility (호환성)과 equivalence (동등성)을 결정하는 **정적 타이핑 시스템** 

* **Duck typing** 
  
  **동적**이며 **런타임 중에 액세스되는 타입 구조의 해당 부분만**으로 타입 compatibility (호환성)을 결정


