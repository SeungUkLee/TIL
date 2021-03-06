

# 도커 컨테이너와 이미지
도커 엔진에서 사용되는 기본 단위는 **이미지** 와 **컨테이너**이다. 간단하게 알아보고 사용법을 익혀보자.

## 도커 이미지
- 이미지는 **컨테이너를 생성할 때 필요한 요소**. 
- 여러개의 계층으로 된 바이너리 파일로 존재.
- 컨테이너를 생성하고 실행할 떄 읽기 전용으로 사용.

## 도커 컨테이너
- 이미지로 컨테이너를 생성
- 컨테이너는 이미지를 읽기 전용으로 사용하되 이미지에서 변경된 사항만 컨테이너 계층에 저장. 따라서 컨테이너에서 무엇을 하든지 원래 이미지는 영향을 받지 않음.
- 생성된 각 컨테이너는 각기 **독립된** 파일시스템을 제공받으며 호스트와 분리되어있음.

# 도커 컨테이너 다루기
도커 컨테이너의 기초적인 사용법을 알아보자.

## 컨테이너 생성
컨테이너를 생성하는 명령어는 run, create 2가지가 있다.

1. docker run

`# docker run -i -t ubuntu:14.04` 

docker run 명령어는 컨테이너를 생성하고 실행하는 역할. run 명령어는 일과적으로 pull, create, start 명령어를 일과적으로 실행한후 attach 가능한 컨테이너이면 내부로 들어간다.

2. docker create

`# docker create -i -t --name myubnutu ubuntu:14.04`

docker create 명령어는 컨테이너를 생성만 하고 내부로 들어가지 않는다.
> --name 온셥은 컨테이너의 이름을 정해주는 옵션이다.

## 컨테이너 목록 확인
`# docker ps` 명령어는 지금까지 생성한 컨테이너의 목록을 확인할 수 있다. (단, **정지되지 않은 컨테이너만!**
`-a` 옵션을 주면 모든 컨테이너를 확인 할 수 있다.

ps 명령어의 출력에 대한 설명은 아래와 같다.
- CONTAINER ID : 컨테이너에게 할당된 고유한 ID 값.
- IMAGE : 컨테이너를 생성할 떄 사용된 이미지의 이름.
- COMMAND : 컨테이너가 시작될 떄 실행될 명령어
- CREATED : 컨테이너가 생성되고 난 뒤 흐른 시간.
- STATUS : 컨테이너 상태
- PORTS : 컨테이너가 개방한 포트와 호스트에 연결한 포트
- NAMES : 컨테이너의 고유한 이름

## 컨테이너 삭제
`# docker rm` 명령어로 더 이상 사용하지 않는 컨테이너를 삭제할 수 있다. 실행 중인 컨테이너는 삭제할 수 없으며 컨테이너를 정지한 뒤 삭제하거나 `-f` 옵션을 추가하여 삭제할 수 있다. 
`# docker container prune` 명령어를 사용하여 모든 컨테이너를 삭제할 수 있다.

ps 명령어와 -a 옵션, -q 옵션을 조합하여 컨테이너를 삭제할 수도 있다. 
> -a 옵션은 컨테이너 상태와 관계 없이 모든 컨테이너를, -q 옵션은 컨테이너의 ID 만 출력하는 역할을 한다.

~~~
# docker stop $(docker ps -a -q)
# docker rm $(docker ps -a -q)
~~~
`#docker ps -a -q` 명령을 사용해 컨테이너 리스트를 변수로 모든 컨테이너를 삭제할 수 있다.

## 컨테이너 외부 노출
컨테이너느 가상머신과 마찬가지로 가상 IP 주소를 할당받는다. (기본적으로 도커는 컨테이너를 172.17.0.x의 IP를 순차적으로 할당)
`$ ifconfig` 명령어로 컨테이너의 네트워크 인터페이스 확인 가능. 아무런 설정을 하지 않았다면 컨테이너는 외부에서 접근이 불가능하며 호스트에서만 접근이 가능하다. 하지만 **eth0 의 IP와 포트를 호스트의 IP와 포트에 바인딩하면 외부에서 접근이 가능하다.**

`# docker run -i -t --name mywebserver -p 80:80 ubuntu:14.04`
`-p` 옵션을 추가하여 컨테이너의 포트를 호스트의 포트와 바인딩해 연결할 수 있게 설정하였다. 
> -p의 입력형식 : [호스트의 포트] : [컨테이너 포트]


