# Spacemacs

## 1. 설치

- spacemacs 설치

```shell
git clone https://github.com/syl20bnr/spacemacs ~/.emacs.d
```

`~/.emacs.d/init.el` 파일을 열어보면 이맥스 관련 설정을 볼 수 있다.

- emacs 설치

```shell
brew install cask emacs
```

## 2. 기본 편집 방법

emacs, vim, spacemacs 단축키 다 사용할 수 있다. 여기서는 spacemacs 단축키만 나열하겠다.

- `SPC` `f` `f` (file find) : 파일 찾기 및 새로운 파일 새성
- `SPC` `f` `s` (file save) : 파일 저장
- `SPC` `b` `d` (buffer delete) : 버퍼 닫기

특수한 파일을 편집하기 위한 확장 설치는 그냥 해당 파일을 열면된다. 그러면 해당 확장 레이어를 설치할건지 물어본다.

## 3. Dired 탐색기

Dired 는 Directory Editor, Emacs 용 파일 네비게이터이다. 쉽게 말해서 탐색기나 파인더와 비슷하다. (기본 탑재된거라서 별도의 설치 필요 없음)

- `SPC` `a` `d` (application dired) : Dired 실행

실행해보면 디렉토리와 파일 모습들이 나온다. Vim 처럼 `/` 키로 검색이 가능하다. 디렉토리에 들어갈떄는 엔터키를 누르면 된다.

- `C` (copy file) : 파일 복사하기
- `R` (move or rename file) : 파일을 옮기거나 이름 변경
- `D` (delete file) : 파일 삭제
- `ENTER` : 선택한 파일 편집하기
- `!` 누르고 원하는 커맨드 입력 : 파일을 다른 애플리케이션으로 열기 (ex. ! open)


## 4. Buffer and Window

**버퍼*** : 모든 텍스트를 편집할 수 있는 영역

- `SPC` `Tab` : 이전 버퍼 표시
- `SPC` `b` `b` : 버퍼 리스트 보기

**윈도우** : 창을 분할한 영역

`SPC` `w` 로 윈도우 메뉴를 살펴볼 수 있다

- `SPC` `w` `-` : 창이 위아래로 나뉜다
- `SPC` `w` `/` : 창이 좌우로 나뉜다

`^w` 키를 누른 후 `h`, `j`, `k`, `l` 방향키로 해당 방향의 윈도우로 이동이 가능 (Vim 스타일)

- `SPC` `[숫자]` : 해당 윈도우로 이동
- `SPC` `w` `d` : 윈도우 닫기




## Reference

[Spacemacs #1 Installation / Troubleshooting / How to quit | 설치하고 설치에러도 겪어보고 종료해보기](https://www.youtube.com/watch?v=q8jYiK2QPoM)

[Spacemacs #2 Basic Editing | 기본 편집 방법](https://www.youtube.com/watch?v=v1IS_zh7ul0)

[Spacemacs #3 Dired | 탐색기? 파인더? 파일 관리기?](https://www.youtube.com/watch?v=KjsWekqvqkE)

[Spacemacs #4 Buffer and Window | 버퍼와 윈도우에 대하여](https://www.youtube.com/watch?v=DoNt2XMk-_U&t=5s)
