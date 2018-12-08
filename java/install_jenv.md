# Java 여러 버전 설치 & 사용하기 (Install jenv)

만약 여러 버전의 Java 를 사용하고 싶으면 jenv 를 사용하면 된다. 

## 1. Update Homebrew

Homebrew 를 업데이트한다.

~~~ shell
$ brew upate
~~~

간혹 Homebrew 를 업데이트하기 위해 `brew update && brew upgrade brew-cask && brew cleanup && brew cask cleanup` 명령어를 사용하는 글들이 보인다. 18.12.5일 기준으로 이 명령어를 치면 에러가 출력되어 찾아보았다. [USAGE: Clarify upgrade #22632](https://github.com/Homebrew/homebrew-cask/pull/22632) 이 글의 내용을 보니 지금은 `brew update` 를 하면 다 해주는 것 같다.

## 2. Install Java Latest & Java 8

최신 Java 버전을 설치하자. 

~~~ shell
$ brew cask info java
$ brew cask install java
~~~

이제 Java8 을 설치하자.

~~~ shell
$ brew cask install caskroom/versions/java8
~~~

## 3. Install jenv

이제 Java 버전을 관리해주는 jenv 를 설치하자.

~~~ shell
$ brew install jenv
~~~

설치가 끝나면 `~/.zshrc` 에 아래 코드를 추가.

~~~ shell
if which jenv > /dev/null; then eval "$(jenv init -)"; fi
~~~

저장후 `source` 실행.

~~~ shell
$ source ~/.zshrc
~~~

그런다음 jenv 관리 항목에 추가.

~~~ shell
jjenv add /Library/Java/JavaVirtualMachines/openjdk-11.0.1.jdk/Contents/Home/
~~~

> 각 버전의 상세 버전은 조금씩 다를 수 있음.

## 4. 전역 & 로컬 버전 설정.

`jenv global` 명령어로 특정 Java 버전을 전역으로 설정할 수 있다.

특정 디렉토리(프로젝트)에서만 다른 버전을 사용하고 싶으면 해당 디렉토리로 이동하여 `jenv local` 명령어를 사용하면 된다.

사용하고 있는 Java 버전을 확인하고 싶으면 `jenv versioins` 를 사용하면 된다.

~~~ shell
$ jenv versions
~~~

## 5. jshell

jshell 은 간단한 Java 코드를 굳이 ide 를 실행하여 작성할 필요없이 간단하게 코드를 작성할 수 있게 해준다. Java9 부터 사용할 수 있다.



## Reference
[Mac에 Java 여러 버전 설치 & 사용하기](https://jojoldu.tistory.com/329)