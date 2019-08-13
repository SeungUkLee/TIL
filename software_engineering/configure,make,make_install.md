# configure, make, make install

cpython build 관련 문서를 보면 `configure`, `make`, `make install` 을 순서대로 실행하는 것을 볼 수 있다. 각 명령의 의미하는 게 정확히 무엇인지 궁금하여 찾아보았다.

## `./configure`
- 쉘 파일 이름
- 소프트웨어를 설치할 머신에 대한 정보를 확인하고 현재 머신에 적합한 `Makefile` 을 만듬

## `make`
- 현재 디렉토리의 `Makefile` 을 실행하는 명령어
- 여러 작업을 수행하지만 기본적으로 소스를 컴파일하고 실행가능한 파일을 만듬

## `make install`
- 컴파일하여 생성한 실행 가능한 파일을 머신 디렉토리로 복사

## Reference

[configure, make, make install](https://ohgyun.com/476)

[configure, make, make install 의미](https://refe.tistory.com/entry/configure-make-make-install-%EC%9D%98%EB%AF%B8)


