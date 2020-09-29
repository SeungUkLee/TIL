# tmux

tmux 의 가장 큰 장점 중 하나는 세션을 만들때 볼 수 있다. 네트워크를 통한 ssh 접속이 끊어져도 세션을 그대로 살아있게 해준다. 즉, 터미널 접속이 끊어져도 세션이라고 하는 터미널 화면 속 여러 작업들은 그대로 살아서 계속 무언가 일을 하고 있을 수 있다는 말이다. 예를 들어 소스코드 빌드 또는 벤치마크를 돌리는 중에 터미널이 종료되었다면 그 작업을 다시 시작해야하지만 tmux 는 그렇지 않다 (네트워크 연결 끊김으로부터 보호할 수 있다).

장점들을 정리하자면 다음과 같다.

* 터미널 작업 중 detach 하면 프로그램이 background 에서 실행되고 있기 때문에 내가 하고있던 작업 환경을 나중에 attach 하여 이어서 작업할 수 있다.
* 원격으로 작업한 tmux 세션을 로컬에서도 접속하여 작업할 수 있다 (반대도 마찬가지).
* 원격에서 ssh 접속을 한 상태로 작업을 할 때, tmux 는 접속이 끊어져도 background 에서 원하는 작업을 계속 실행할 수 있다.
* 여러 터미널을 동시에 띄워놓은 상태로 빠르게 네비게이션하면서 코딩이 가능.

## session, window, pane

tmux 는 세션(session), 윈도우(window), 페인(pane)과 같이 계층적인 구조로 되어있다.

* **session** : tmux 가 관리하는 가장 큰 단위
* **window** : session 안에 존재하는 탭같은 단위
* **pane**: 윈도우 안에 가로 세로로 분할한 단위

## 간단하게 사용해보자

tmux 세션을 만드는 방법은 `tmux` 라고 입력하면 된다.

* `tmux at` (tmux attach) : 세션에 붙는 명령어

개발환경 측면에서 tmux 의 기능들을 살펴보자.

* `Ctrl b` : 명령어 모드가 켜진다 (b는 default prefix key)
* `Ctrl b "` : 터미널 화면을 가로로 분할
* `Ctrl b 화살표` : 여러 터미널 화면이 있는 상태에서 커서를 옮기면서 각 pane 을 이동해 나갈 수 있다.
* `Ctrl b %` : 세로로 터미널 화면 분할
* `Ctrl b z` : 현재 커서가 있는 창을 전체화면으로 확대 및 축소

분할된 창안에서 크기를 조절하기 위해서는 명령모드에서 `Opt(Alt)` 키를 누르고 `방향키` 를 누르면 된다.

* `Ctrl b Space` : tmux 가 알아서 몇 가지 화면 프리셋을 순회하면서 위치를 다양하게 바꿔준다.
* `Ctrl b d` : 세션을 detach (d 는 detach).
* `tmux ls` : 세션 리스트 확인

세션을 여러개 만들어 두면 커맨드 라인 환경에서도 마치 Window, macOS 에서 여러 윈도우를 관리하는 것 처럼 사용할 수 있다. 다른 세션으로 이동하고 싶으면 명령모드에서 detach 하고 `tmux at -t 세션이름` 명령어를 통해 이동할 수 있다.

세션을 종료하고 싶으면 `Ctrl b x` 를 누르면 `kill-pane 세션이름? (y/n)` 메세지가 나오고 `y` 를 누르면 종료할 수 있다.

---

## Reference & Further more

* [(Linux) tmux 다중터미널 프로그램 다양한 기능 설명 및 환경설정](https://edward0im.github.io/technology/2020/09/28/tmux/)
* [Youtube - 커맨드라인 개발환경 필수템, tmux 사용법 이걸로 끝내자](https://www.youtube.com/watch?v=0eCHCrYMQIw&feature=youtu.be)
* [본격 macOS에 개발환경 구축하기 - tmux](https://subicura.com/2017/11/22/mac-os-development-environment-setup.html#tmux)

