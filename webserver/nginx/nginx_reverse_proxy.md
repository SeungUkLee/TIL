# Nginx Reverse Proxy

## Proxy 서버란?
Proxy server는 자신을 통해 Client가 다른 네트워크 서비스에 연결할 수 있게 중계해주는 역할을 한다. 서비스의 규모가 커지면 분산 시스템으로 서비스가 구성되어지는 경우가 많은데 이때 Proxy server를 사용하여 분산 시스템을 뒤로 숨겨 시스템을 단순화할 수 있다.

## Reverse Proxy
클라이언트 요청을 받아 반대편(reverse) 네트워크로 전달한다. 이때 Reverse Proxy는 단순히 클라이언트 요청을 전달하는 역할을 하고 요청처리는 뒷단에 있는 서버들이 처리한다. 따라서 하나의 Proxy Server가 여러 대의 서버로 요청을 전달 하도록 구성이 가능한데 이를 **로드 벨런서** 라고 한다.

> HAProxy, Nginx, Apache 웹 서버들이 가지고 있는 리버스 프록시 기능을 이용하여 로드 벨런싱 환경을 구축하기도 한다.

## Static Reverse Proxy Server 구성
- 가장 일반적인 구성(일반적인 로드벨런서).
- upstream 영역에 프록시 대상 호스트의 목록을 성정.
- upstream은 proxy 할 타켓 서버를 설정하기 위해 사용.

~~~
upstream test_upstream {
    server web_01;
    server web_02;
}
~~~

test_upstream은 upstream의 이름이며 Nginx는 하나 이상의 upstream을 구헝하며, 이름으로 구분가능하다.


## Reference

[NginX로 Reverse-Proxy 서버 만들기](https://www.joinc.co.kr/w/man/12/proxy).

[nginx를 이용한 Reverse Proxy 서버 구축](http://interconnection.tistory.com/27).
 
