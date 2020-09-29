# Fish Shell

## Runing Commands

```fish
> mkdir My\ Files
> mkdir 'My Files'
> mkdir "My Files"
```

위 명령은 모두 같다.

## Getting Help

특정 명령에 대해 도움을 받을 수 있다.

```fish
> help set
> man set
```

`help` 는 웹 브라우저에서 오픈한다.

## Syntax Highlighting

- 잘못된 명령은 빨강.
- 유효한 파일 경로에는 밑줄을 긋는다.

## Wildcards

와일드카드 `*` 를 지원하여 여러개의 와일드 카드를 포함 할 수도 있다. 재귀적으로 디렉토리를 검색하고 싶으면 `**` 를 이용하면 된다.

```fish
> ls *.jpg
 a.jpg
 b.jpg

> ls l*.p*
 lena.png
 lesson.pdf

> ls /var/**.log
 /var/log/system.log
 /var/run/sntp.log
```

## Pipes and Redirections

- `|` 를 사용하여 명령 사이를 파이프.
- stdin 및 stdout 은 `<`, `>` 를 통해 리디렉션될 수 있다.
- **다른 쉘과는 달리** stderr은 `^` 으로 리디렉션된다.

```
> grep fish < /etc/shells > ~/output.txt ^ ~/errors.txt
```

## Auto Suggestions

fish는 사용자가 명령을 입력할때 자동으로 명령을 제안해준다. fish가 제안해주는 명령을 수락하려면 `->` 또는 `ctrl f` 를 누르면 된다. 한 단어만 수락하고 싶으면 `Alt ->` 를 누르면 된다.

## Tab Completions

fish에는 탭 완성이 풍부하게 갖추어져 있다.

> git을 사용할 때 차이가 보였는데 `git checkout` 에서 탭을 눌러 zsh 과 비교를 해봤을 떄 zsh 는 브런치만 나오지만, fish 는 브랜치뿐만 아니라 commit id(hash)값도 표시해준다.

## Variables

- 다른 쉘과 마찬가지로 `$` 기호를 통해 변수로 사용.
- 변수는 `""` 에서도 잘 대입되지만 `''` 에서는 대입되지않는다.
- **다른 쉘과 달리** 변수 설정을 위한 전용 구문은 없고 일반적인 방법 `set` 을 이용하여 변수를 설정할 수 있다.
- 변수를 설정할때는 따옴표 사용에 주의해야한다. 만약 따움표없이 그냥 `S Y` 라고 입력하면 `S` 와 `Y` 를 별도의 인수로 취급하여 두 개의 요소 목록으로 만들어진다.

```fish
> echo My home directory is $HOME
My home directory is /home/tutorial

> echo "My current directory is $PWD"
My current directory is /home/tutorial
> echo 'My current directory is $PWD'
My current directory is $PWD

> set name 'S Y'
> echo $name
S Y
```

```fish
> mkdir $name
> ls
S Y
```

- bash 에서는 `S` 와 `Y` 두 개의 디렉토리가 만들어짐

## Exit Status

- **다른 쉘과 달리** 마지막 명령의 종료 상태를 `$status` 에 저장한다.
- 반환값이 0이면 성공, 0이 아닌 값이면 실패

```fish
> false
> echo $status
1
```

## Exports (Shell Variables)

- **다른 쉘과 달리** `export` 명령이 없다.
- 대신 `-export` 또는 `-x` 옵션을 사용할 수 있다.
- set 명령어 활용을 권장한다.
- `-e` 또는 `--erasee` 를 사용하여 변수를 지울 수도 있다.

```fish
> set -x MyVariable SomeValue
> env | grep MyVariable
MyVariablem=SomeValue

> set -e MyVariable
> env | grep MyVariable
(no output)
```

## List

- fish의 모든 변수는 실제로 목록(list)이며, 값의 개수를 포함할 수도 있고, 전혀 포함하지 않을 수도 있다.
- `$PWD` 와 같은 일부 변수에는 하나의 값만 있고 `$PATH` 와 같은 변수에는 여러 값이 있다.
- 리스트에는 다른 리스트를 포함할 수 없다. (no recursion)
- 변수는 문자열의 리스트이다.
- `[]`로 요소에 접근할 수 있다.
- 인덱싱은 `1` 부터 시작하여 끝에서 부터 인덱싱하려면 `-1`을 사용하면 된다.
- `..`를 사용하여 범위로 접근할 수 있다
- for loop를 사용하여 반복할 수 있다
- 다른 리스트나 문자열에 인접한 리스트는 따움표가 붙지 않는 한 곱집합으로 확장된다 (see [Variable expansion](https://fishshell.com/docs/current/index.html#expand-variable)), Brace Expansion 과 유사.

```fish
> echo $PATH
/usr/bin /bin /usr/sbin /sbin /usr/local/bin

> count $PATH
5

> set PATH $PATH /usr/local/bin

> echo $PATH[1]
/usr/bin
> echo $PATH[1..2]
/usr/bin /bin
> echo $PATH[-1..2]
/usr/local/bin /sbin /usr/sbin /bin

> for val in $PATH
    echo "entry: $val"
  end
entry: /usr/bin/
entry: /bin
entry: /usr/sbin
entry: /sbin
entry: /usr/local/bin

> set a 1 2 3
> set 1 a b c
> echo $a$1
1a 2a 3a 1b 2b 3b 1c 2c 3c
> echo $a" banana"
1 banana 2 banana 3 banana
> echo "$a banana"
1 2 3 banana
```

## Variable expansion

- Variable expansion 는 한 명령의 출력을 다른 명령의 인수로 사용한다.
- **다른 쉘과 달리** Variable expansion 를 위해 `를 사용하지 않고 괄호를 사용한다.
- Variable expansion 은 따옴표 안에서는 확장되지 않고 따옴표를 임시로 닫은 다음 사용할 수 있다.
- **다른 쉘과는 달리** 공백이나 공백 같은 명령 공백을 없애지 않는데 이는 pkg-config 와 같은 명령으로 한 줄에 여러 개의 인수를 의미하는 내용을 인쇄할 때 문제가 될 수 있다.
- 공백으로 분할하려면 string split 을 사용하자

```fish
> echo In (pwd), running (uname)
In /home/tutorial, running FreeBSD

> set os (uname)
> echo $os
Linux

> touch "testing_"(date +%s)".txt"
> ls *.txt
testing_1360099791.txt

> printf '%s\n' (pkg-config --libs gio-2.0)
-lgio-2.0 -lgobject-2.0 -lglib-2.0
> printf '%s\n' (pkg-config --libs gio-2.0 | string split " ")
-lgio-2.0
-lgobject-2.0
-lglib-2.0
```

## Semicolon

같은 줄에 여러 명령을 사용하려면 `;` 을 사용하자

## And, Or, Not

- **다른 쉘과 달리** `&&` 또는 `||` 와 같은 구문이 없고 `and`, `or`, `not` 명령을 가지고 있다.

```fish
> cp file1.txt file1_bak.txt; and echo "Backup successful"; or echo "Backup failed"
Backup failed
```

## If, Else, Switch

- `if`, `else if`, `else` 를 사용하여 command 의 종료 상태에 따라 여러 코드를 실행 할 수 있다.
- Combiners 를 사용하여 더 복잡한 조건을 만들 수 있다.
- 복잡한 조건의 경우 `begin`, `end` 를 사용하여 그룹화가 가능하다.
- 여러 개의 인수 또는 와일드 카드 사용가능

```fish
if grep fish /etc/shells
    echo Found fish
else if grep bash /etc/shells
    echo Found bash
else
    echo Got nothing
end

if grep fish /etc/shells; and command -sq fish
    echo fish is installed and configured
end

switch (uname)
case Linux
    echo Hi Tux!
case Darwin
    echo Hi Hexley!
case FreeBSD NetBSD DragonFly
    echo Hi Beastie!
case '*'
    echo Hi, stranger!
end
```

## Functions

- fish에서 함수는 선택적으로 인자를 취할 수 있는 list of commands 이다.
- **다른 쉘과 달리** 인수는 `$1` 과 같은 번호가 매겨진 변수로 전달되지 않고, 단일 목록 `$argv` 가 된다.
- `functions` 를 통해 모든 함수의 이름을 나열할 수 있다.
- 함수 이름을 `functions` 에 전달하면 모든 함수의 소스(source)를 볼 수 있습니다.

```fish
> function say_hello
          echo Hello $argv
  end
> say_hello
Hello
> say_hello everybody!
Hello everybody!

> functions
alias, cd, delete-or-exit, dirh, ...

> functions ls
function ls --description 'List contents of directory'
    command ls -G $argv
end
```

## Loop

- `seq` 를 활용하여 반복할 수 있다.

```fish
> for file in *.txt
    cp $file $file.bak
end

> for x in (seq 5)
    touch file_$x.txt
end
```

## Prompt

- 다른 쉘과 달리 프롬프트 변수는 없다.
- fish는 프롬프트를 표시하기 위해 `fish_prompt`라는 함수를 이용한다.
- `fish_prompt` 를 재정의하여 나만의 프롬프트도 정의가 가능하다.
- `fish_config prompt` 를 실행하여 몇 가지 샘플 프롬프트 중에서 선택 가능하다.
- fish는 또한 `fish_right_prompt` 를 통해 RPROMPT(오른쪽 정렬 프롬프트)를 지원.

```fish
> function fish_prompt
      set_color purple
      date "+%m/%d/%y"
      set_color FF0
      echo (pwd) '>'
      set_color normal
  end
02/06/13
/home/tutorial
```

## \$PATH

- `$PATH` 는 fish 가 명령을 검색하는 디렉토리를 포함하는 환경 변수이다.
- **다른 쉘과 달리** 콜론으로 구분된 문자열이 아닌 리스트이다.

```fish
# /usr/local/bin 과 /usr/sbin 을 $PATH 앞에 추가
> set PATH /usr/local/bin /usr/sbin $PATH

# $PATH 에서 /usr/local/bin 을 제거
> set PATH (string match -v /usr/local/bin $PATH)

# $PATH 에 /usr/local/bin 을 영구적으로 추가
> set -U fish_user_paths /usr/local/bin $fish_user_paths
# 이러한 방법의 이점은 파일에서 수정팔 필요x
# 현재 세션 이후의 모든 인스턴스에도 영향을 미침
# NOTE: config.fish 에 이 줄을 추가하면 안됨. 그렇게 하면 fish를 실행할 떄마다 환경 변수가 계속 길어짐
```

## Autoloading Functions

- fish 는 명령을 만났을 떄, `~/.config/fish/functions` 파일에 있는 명령의 이름을 가진 파일을 찾아 해당 명령에 대한 함수를 자동으로 로드하려한다.
  - (함수를 `ll`가 없는 경우) 함수 `ll` 를 만들고 싶다면, `ll` 함수를 `~/.config/fish/functions` 에 추가하면 된다.
- 이러한 파일을 자동으로 만드는 방법은 `funced` 및 `funcsave` 문서를 참조하자.

```fish
> cat ~/.config/fish/functions/ll.fish
function ll
    ls -lh $argv
end

> cat ~/.config/fish/functions/fish_prompt.fish
function fish_prompt
    echo (pwd) "> "
end
```

## Universal Variables

```fish
> set -U EDITOR vim

# 새로운 쉘을 열어 다음 명령을 실행해보자
> echo $EDITOR
vim
```

---

## Reference & Further more

[피쉬 쉘(Fish Shell) 한글화 문서 [비공식]](https://j2doll.github.io/fish-shell-docs-kor/tutorial/)

[fish-shell documentation](https://fishshell.com/docs/current/index.html)

