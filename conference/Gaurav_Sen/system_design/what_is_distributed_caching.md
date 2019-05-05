# What is Distributed Caching? Explained with Redis!

[Gaurav Sen - What is Distributed Caching? Explained with Redis!](https://www.youtube.com/watch?v=U3RkDLtS7uY) 영상을 보고 정리한 파일입니다.

---

분산 시스템에서의 캐싱은 확장 가능한 시스템을 디자인(설계)할 때 중요한 요소이다. 캐시(cache)란 무엇이며 캐시를 사용하는 이유에 대해 알아보고 분산 시스템에서 캐시의 주요 기능이 무엇인지 알아보자.

여기서는 LRU 및 Sliding Window 의 cache management policies 에 대해 설명한다. 고성능을 위해 cache eviction policy 을 신중하게 선택해야한다. 데이터 일관성과 메모리 사용량을 낮추기 위해 Write Through 또는 Write Back 일관성 정책을 선택해야한다.

캐시 관리는 cache hit ratios 와 성능과의 관계 때문에 중요하다. 여기서 분산 환경에서 다양한 시나리오 대헤 이야기한다.

---

캐시를 사용하면 다음과 같은 이점을 얻을 수 있다.

1. Reduce Network Calls
2. Avoid Recomputations
예를 들어 모든 사용자들의 평균나이의 정보를 달라는 요청이 왔다고 가정하자. 평균나이를 계산하기 위해 우선, DB에서 모든 사용자 정보들을 가져와 계산을 해야한다. 이는 굉장히 expensive of cost 이며 매 요청마다 이렇게 계산하기에는 서버에 큰 부담이 될 수 있다. 이때 평균나이를 구한다음 캐시에 저장하면 된다. 


3. Reduce DB load
사용자들이 정보를 얻기위해 DB에 많은 요청을 할 것이다. 이는 DB에 많은 load 를 가하는데 캐시를 이용하면 DB load 를 줄일 수 있다. 캐시에 정보를 저장하고 hitting the db 를 피할 수 있다.

캐시를 사용하다보면 다음과 같은 의문을 가질 수 있다.

1. 언제 캐시에 entry(항목)을 만들어야 하는가?
2. 캐시에 언제 데이터를 로드할 것인가?
3. 언제 캐시에 데이터를 제거할 것인가?

데이터 loading 또는 evicting(제거) 결정 방법을 policy(정책)이라고 한다. 캐시 성능은 거의 cache policy 에 좌우된다. 대표적으로 **LRU**, **Sliding Windo** 정책이 있다.

## 더 참고해야 될 거
[Design Of A Modern Cache](http://highscalability.com/blog/2016/1/25/design-of-a-modern-cache.html)
