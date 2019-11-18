# RESTful API

## RESTful 이란?

REST : 이종 시스템 간의 네트워크 통신 구조. "상태의 전송"이란 의미로, 리소스에 대한 상태를 주고 받는다.

REST의 원칙은 크게 다음과 같이 3가지로 구성된다.
- 메서드 : HEAD/GET, POST, PUT, PATCH, DELETE 등
- 리소스 : 서버에 저장된 데이터. 즉 모델 (ex. Post, Comment 등)
- 메시지(응답) : 200, 404 와 같은 HTTP 상태 코드, 요청 및 응답 헤더와 본문 등.

대부부분의 컴퓨터 시스템이 HTTP 프로토콜을 가지고 서로 다른 시스템끼리 네트워크를 경유해서 데이터를 교환한다. 예를 들어 모바일 기기에 설치한 Facebook application은 HTTP를 이용하여 Facebook server와 통신한다. 사용자가 "뉴스 피드" 메뉴를 선택하면 `"GET /뉴스_피드"` 와 같은 요청을 한다. Facebook client 와 server 가 서로 이렇게 하기로 약속을 했기 때문이다. 이떄 이 약속을 **API** 라고 한다. 

API는 약속이기 때문에 server 와 client가 서로 이해할 수 있는 모양으로 만드는 것이 좋다.

따라서 정리하자면, **RESTful API** 는 HTTP의 특성을 잘 이용한 컴퓨터 간 정보 교환 체계이다.

## RESTful API 모범 사례

**1. 알맞는 HTTP 메서드를 사용하자.**

- GET : 리소스의 상태를 **읽을 때 사용**.
- POST / PUT / DELETE : 리소스의 상태를 **변경할 떄 사용**.

~~~
DELETE /posts/1         (O)
GET /deletePosts?id=1   (X) 
~~~

---------------------------------------

**2. HTTP 메서드 오버라이드**

오랜된 브라우저 나 일부 네트워크 프록시는 GET, POST 메서드만 사용할 수 있다. 이렇게 기능 제약이 있는 경우에 PUT 메소드를 요청할 때는 POST 메서드를 사용하고 `_method=put` 와 같이 힌트를 제공해야 한다.

~~~
POST /posts

---payload---
_method=PUT&title=...&content=...
~~~

> PHP Framework 중 하나인 라라벨은 X-HTTP-Method-Override HTTP 헤더를 이용한 메서드 오버라이드를 지원한다.
~~~
POST /posts
X-HTTP-Method-Override=PUT

---payload---
title=...&content=...
~~~

---------------------------------------

**3. 명사형 컬렉션과 인스턴스 엔드 포인트**

리소스는 서버에 저장된 데이터, 즉 모델을 의미한다고 했다. API를 사용하는 클라이언트에게는 URL 로 표현하며 문맥에 따라 endpoint(엔드포인트)라는 표현을 사용하기도 한다.

REST를 따르면 URL endpoint 는 **컬렉션** 과 **인스턴스**, 이렇게 2가지 종류밖에 없다.

|  <center>형태</center> |  <center>리소스(엔드포인트)</center> |  <center>GET</center> |  <center>POST</center> |  <center>PUT</center> |  <center>DELETE</center> |
|:--------|:--------|:--------|:--------|:--------|:--------|
| 컬렉션 | /posts | 글 목록 | 글 저장 | X | X |
| 인스턴스 | /posts/{id} | {id}글 상세보기 | X | 수정 | 삭제 |

> API 개발에는 HTML 뷰를 다루지 않기 때문에 이를 반환하는 `GET /posts/create` 와 `GET /posts/{id}/edit` 는 필요없다.

**동사는 사용하지말자!!!** 

---------------------------------------

**4. 리소스 이름은 복수를 사용하며, 일돤된 대소문자 규칙을 사용하자.**

post(단수형) 보다는 posts(복수형)을 사용하는 것이 좋다. 리소스와 필드 이름의 표기법을 스네이크 표기법 또는 낙타 표기법, 대기 표기법 등 하나 선택하여 **통일**하자.

~~~
# 이름 표기법 혼용 사례

GET /push_messages      # URL에 스네이크 표기법 사용
{
    "perPage": 11,      # 필드에 낙타 표기법 사용
    "current-page":1    # 필드에 대시 표긱법 사용
}
~~~

**5. 관계를 노출할 때는 리소스를 중첩하자.**

~~~
GET /tags/{id}/posts            (O)
GET /tags/1?sub_model=posts     (X)
~~~

---------------------------------------

**6. 컬렉션, 인스턴스 URL을 제외한 나머지 복잡함은 물음표 뒤에 표현하자.**

~~~
GET /posts?q=restful/                   # 검색
GET /posts?sort=view_count&order=asc    # 정렬
GET /posts?page=2                       # 페이징
GET /posts?feilds=id,title              # 필드 선택
~~~

**7. 알맞은 HTTP 응답 코드를 사용하자.**

HTTP 응답 코드에는 제각각 의미를 담고 있으며 상황에 맞게 사용해야 한다.

~~~
200 - OK                        # 성공
304 - Not Modified              # 클라이언트에 캐시된 리소스 대비 서버 리소스의 변경이 없음
400 - Bad Request               # 클라이언트 요청 오류
401 - Unauthorized              # 인증 필요 (실제로는 Unauthenticated 의미)
403 - Forbidden                 # 권한 부족 (실제로는 Unauthorized 의미)
404 - Not Found                 # 요청한 리소스 없음
500 - Internal Server Error     # 서버에서 요청 처리 중 오류
~~~
[HTTP 상태 코드](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C) 를 참고하자.

---------------------------------------

**8. 클라이언트가 길을 잃지 않도록 하자.**

HTML은 링크로 다른 페이지로 이동할 수 있는 반면에 데이터만 제공하는 API 응답을 받은 클라이언트는 어떤 다른 리소스가 있는지 알 수 없다. 따라서 API 응답 데이터에 다른 리소스로 이동하는 URL endpoint를 포함해야하며 이를 HATEOAS 라고 부른다.

~~~
GET /posts

{
    data: [
        {
            id: 1,
            title: "hello world",
            links: [
                rel: "self",
                href: "http://api.app.com:8000/v1/posts"
            ],
            user: {
                id: 3,
                name: "uk",
                links: [
                    rel: "self",
                    href: "http://api.app.com:8000/v1/users/3"
                ]
            }
        },
        {"..."}
    ]
}
~~~

---------------------------------------

**9. API 버전**

서버에 HTML 페이지를 배포하면, 사용자는 곧바로 최신 페이지를 볼 수 있다. 반면, API 서비스에서 서버는 클라이언트가 API를 어떻게 이용하고, 어떻게 구현했는지 알 수 없기 때문에 (클라이언트와 서버가 분리되어있기 떄문.) 서버 측에서 API를 변경하면 클라이언트가 정상 동작한다고 보장할 수 없다. 클라이언트가 새로운 API에 맞추어 코드를 수정하고 배포하려면 시간이 걸리고 이 기간 동안 옛날 API는 그대로 살려두고, 새로운 API는 새로운 URL endpoint로 서비스해야 한다. 따라서 `/v1/posts` 와 같이 하는 것이 좋다.

~~~
GET http://api.app.com:8000/v1/posts    (O)
GET http://app.com:8000/api/v1/posts    (O)
~~~

---------------------------------------

**10. 컨텐츠 / 언어 협상**

클라이언트는 응답 받기를 원하는 본문의 본문 형식을 **요청(Accept)**, 서버는 **응답하는 데이터 형식(Content-Type)**을 준다. 언어도 마찬가지다.

~~~
# Client Reuqest
GET /posts
Accept: application/json
Accept-Language: ko-KR

# Server Response
HTTP /1.1 200 OK
Content-Type: application/json

{"message": "안녕하세요."}
~~~

> 요즘은 JSON 형식을 사용하므로 생략한다.

---------------------------------------

## 결론 및 더 생갹해야 될 것들.
- 뷰에 바인딩된 데이터가 아니다.
- 데이터 자체가 서비스이며 데이터를 더 읽기 쉽게 포장해야한다.
- 성능 향상과 네트워크 트래픽을 절약하기 위한 기능을 추가해야한다.
- API 서비스에서 겪는 문제점들을 해결해야한다. (CORS, 사용량 제한, 아이디 난독화 등.)
- HTTP의 무상태 특성을 이용하여 API 클라이언트를 인증해야한다.

