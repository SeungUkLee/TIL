# AWS EC2 (Ubuntu 16.04)에 Docker 설치하기 

먼저 이전에 만든 EC2 인스턴스에 ubuntu 계정으로 SSH로 접속한다.
~~~
# 먼저 Package Database를 update한다.
$ sudo apt-get update
~~~

~~~
# Docker 공식페이지의 keyserver에서 GPG key를 추가한다.
$ sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
~~~

~~~
# Docker repository를 APT sources에 추가한다.
$ sudo apt-add-repository 'deb https://apt.dockerproject.org/repo ubuntu-xenial main'
~~~

~~~
# 새로 추가된 Docker package를 업데이트한다.
$ sudo apt-get update
~~~

~~~
# Default Ubuntu 16.04 repository 대신에 Docker repository로 부터 install하는 것을 확인한다.
$ apt-cache policy docker-engine
~~~

~~~
# docker-engine을 설치한다.
$ sudo apt-get install -y docker-engine
~~~

~~~
# Daemon에서 docker가 실행되고 있는지 확인한다. CentOS의 경우에는 별도로 Daemon으로 실행해주어야 한다.
$ sudo systemctl status docker
~~~

~~~
# 현재 접속한 ubuntu 계정을 docker 실행 그룹에 포함시켜준다. 이전에 생성한 docker 계정도 포함시켜주자.
$ sudo usermod -aG docker $(whoami)
$ sudo usermod -aG docker docker
~~~

## Reference
[EC2에 Docker를 설치하고 Ubuntu 유저에게 권한주기](https://novemberde.github.io/2017/04/01/Docker_3.html).

[Ubuntu 16.04에서 Docker 설치](http://iamartin-gh.herokuapp.com/ubuntu-16-04-docker-install/).

[How To Install and Use Docker on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04).