# tap, cask, mas

homebrew 를 사용할 때 마다 tap, cask, mas 가 무엇인지 잘 기억이 나지 않아 기록하려고 한다.

## tap

* Homebrew 내의 기본 저장소(Formulae)외의 서드 파티 저장소이다.
* `brew tap` 명령어를 통해 현재 추가된 tap 목록들을 확인할 수 있다.
* `brew tap <user/repo>` 명령어를 통해 tap 을 추가할 수 있고, `brew install` 을 이용하여 설치시 해당 저장소를 사용할 수 있다.
* `<user/repo>`는 기본적으로 GitHub 저장소를 가정하고 추가되며, repo 이름은 기본적으로 `homebrew-*` 접두사를 가진다. 

## cask

* cask 는 Homebrew 로 설치하지 않는, 외부 애플리케이션을 설치한다.

## mas

* App Store 에서 설치할 수 있는 애플리케이션을 명령어로 설치 가능.

---

## Reference

* [Brewfile 을 이용해서 팀 개발 환경 만들기](https://medium.com/plustv/brewfile%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-%ED%8C%80-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0-1516cb21f669)

