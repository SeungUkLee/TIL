# Install pyenv and pipenv

## 1. pyenv 설치 

[github pyenv README.md](https://github.com/pyenv/pyenv) 참고.

---

### 1.1 Homebrew on macOS

~~~ shell
$ brew update
$ brew install pyenv
~~~

그리고 installation steps 에 #3 부터 하라고 해서 함.

---

### 1.2 Add pyenv init to your shell to enable shims and autocompletion.

~~~ shell
$ echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bash_profile
~~~

문서에서는 /.bash_profile 대신 .zshenv 에 하라고 되어있는데 나는 .zshrc 라서 여기에 적어놨다.

---
### 1.3 Restart your shell so path changes take effect.

~~~
$ exec "$SHELL"
~~~

---
### 1.4 Install Python build dependencies.
https://github.com/pyenv/pyenv/wiki 에 Suggested build environment 에 나와있는대로 함.

~~~ shell
# optional, but recommended:
$ brew install openssl readline sqlite3 xz zlib
~~~ 

Mojave or higher (10.14+) 이면 더 해야 될 것이 있다. 나중에 업그레이드하면 그때 해야겠다.

---


### 1.5 Install Python version into $(pyenv root)/versions.

pyenv 를 통해 인스톨하는 방법을 소개하고 있다.
~~~ shell
$ pyenv install 3.6.5
~~~

`pyenv shell 3.6.5` 명령어를 통해 3.6.5 를 사용할 수 있다. 

---

## 2. pipenv 설치

`brew` 를 통해 설치 가능.

~~~ shell
$ brew install pipenv
~~~

~~~ shell
Error: An unexpected error occurred during the `brew link` step
The formula built, but is not symlinked into /usr/local
Permission denied @ dir_s_mkdir - /usr/local/Frameworks
Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
~~~

라고 에러가 발생하였는데 
[Permissions issue when linking python3 #19286](https://github.com/Homebrew/homebrew-core/issues/19286) 를 참고하여 다음 명령어를 통해 해결.

~~~ shell
$ sudo mkdir /usr/local/Frameworks
$ sudo chown $(whoami):admin /usr/local/Frameworks
~~~

## Reference
[github pyenv README.md](https://github.com/pyenv/pyenv)

[파이선 가상환경을 품은 패키지 관리자, pipenv](https://graspthegist.com/post/python-pipenv/)

[pipenv 소개](http://gyus.me/?p=653)

[Python App을 위한 Pipenv](https://item4.github.io/2018-04-20/Pipenv-for-Python-App/)