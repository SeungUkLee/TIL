# What is Sidecar pattern in k8s

원래 사용하는 기본 컨테이너의 기능을 확장하거나 강화하는 용도의 컨테이너를 추가하는 패턴

기본 컨테이너와 독립적으로 동작하는 별도의 컨테이너를 붙이는 패턴

부가적인 공통 기능들은 사이드카 컨테이너를 추가해서 사용

**장점**

* 상호 의존성을 줄임
* 사이드카 컨테이너 장애 시 기본 컨테이너은 영향을 받지 않음 (**isolation**)

**단점**

* 프로세스 간 통신이 많고 최적화가 필요


## Reference

[쿠버네티스 pod 구성 패턴](https://arisu1000.tistory.com/27863)

[Sidecar pattern](https://blog.leocat.kr/notes/2019/02/16/cloud-sidecar-pattern) 

