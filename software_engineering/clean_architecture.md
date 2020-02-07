# Clean Architecture

## 클린 아키텍처, 디펜던시 의존성

* 클린 아키텍처에서 가장 중요한 개념은 의존성 규칙이다.
* 소스 코드 의존성은 상위 수준 정책을 가리키도록 해야한다. 
* 내부 원 안에 있는 어떤 것도 외부 원에 대해 전혀 알 수 없다.
* 외부 원에 있는 어떤 것도 내부 원들에 영향을 미치기를 원하지 않는다.

**Entities**
- 중요한 비즈니스 규칙을 요약
- 메서드를 포함하는 객체 or 데이터 구조
- 가장 일반적이고 높은 수준의 규칙을 요약
- 외부원의 무언가 바뀌면 가장 덜 바껴야 한다

**UseCase**
- 애플리케이션별 비즈니스 규칙을 포함
- DB, UI or 공통 프레임워크 등 외부에 영향을 받지 않으며 외부 영역으로부터 격리되어야 한다

**Interface Adapter**
- controller, model, view 등 MVC 아키텍처가 포함하는 계층

**Framework & Drivers**
- 데이터베이스 및 웹 프레임워크와 같은 도구로 구성된다

이 4개 영역 이상 필요할 수도 있다. 하지만 디펜던시 규칙은 항상 적용되어야한다. 소스 디펜던시는 항상 안쪽으로 가르키며 내부로 갈수록 추상화 수준은 높아진다

정리하면,

- Entity, Domain : 엔티티 정의
- UseCase : 비즈니스 규칙 정의
- Service, Repository : 비즈니스 규칙 정의, UseCase 의 구체화
- Controller : 애플리케이션 API 엔드포인트
- Data Providers : UseCase 또는 Service, Repository 의 구현체

## Reference

* [웹서비스 백엔드 애플리케이션 아키텍처(1)-클린아키텍처](https://brunch.co.kr/@springboot/228)
