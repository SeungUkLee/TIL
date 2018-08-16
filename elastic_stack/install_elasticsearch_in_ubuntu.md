# Install ElasticSearch 6.X in Ubuntu 16.04 (AWS EC2 instance)

우선 ElasticSearch 는 기본적으로 Java1.8 을 필요로 한다. 다음과 같이 자바8을 설치하고 마지막으로 버전 체크로 잘 설치가 되었는지 확인을 한다.

~~~
sudo add-apt-repository -y ppa:webupd8team/java
sudo apt-get update
sudo apt-get -y install oracle-java8-installer
java -version 
~~~

설치가 완료되면 ElasticSearch 를 설치하면 된다. 설치는 ElasticSearch Reference 의 [Install Elasticsearch with Debian Package](https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html#deb-running-init) 글을 참고하였다.

## Import the ElasticSearch PGP Key

~~~
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
~~~

## Installing from the APT repository

진행하기전에 apt-transport-https 패키지를 설치한다.

~~~
sudo apt-get install apt-transport-https
~~~

저장소 정의를 `/etc/apt/sources.list.d/elastic-6.x.list` 에 정의한다.

~~~
echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
~~~

그런다음 ElasticSearch 를 설치한다.

~~~
sudo apt-get update && sudo apt-get install elasticsearch
~~~

## Running Elasticsearch with SysV init

`update-rc.d` 명령을 통해 재부팅해도 ElasticSearch 가 자동으로 시작되도록 할 수 있다.

~~~
sudo update-rc.d elasticsearch defaults 95 10
~~~

다음과 같이 `service` 명령을 사용하여 ElasticSearch 를 시작하고 중지 할 수 있다.

~~~
sudo -i service elasticsearch start
sudo -i service elasticsearch stop
~~~

마지막으로 ElasticSearch 가 잘 실행되었는지 확인하자.

~~~
service elasticsearch status
curl -XGET 'localhost:9200'
~~~


## ElasticSearch 가 실행되지 않을 경우

`service elasticsearch status` 명령으로 확인하였는데 failed 상태이고 다음과 같은 로그를 출력하고 있다면 

~~~
Aug 02 02:35:14 ip-172-31-29-3 systemd[1]: Started Elasticsearch.
Aug 02 02:35:14 ip-172-31-29-3 elasticsearch[12558]: Java HotSpot(TM) 64-Bit Server VM warning: INFO: os::commit_memory(0x00000000c5330000, 986513408, 0) failed; error='Cannot all
Aug 02 02:35:14 ip-172-31-29-3 elasticsearch[12558]: #
Aug 02 02:35:14 ip-172-31-29-3 elasticsearch[12558]: # There is insufficient memory for the Java Runtime Environment to continue.
Aug 02 02:35:14 ip-172-31-29-3 elasticsearch[12558]: # Native memory allocation (mmap) failed to map 986513408 bytes for committing reserved memory.
Aug 02 02:35:14 ip-172-31-29-3 elasticsearch[12558]: # An error report file with more information is saved as:
Aug 02 02:35:14 ip-172-31-29-3 elasticsearch[12558]: # /var/log/elasticsearch/hs_err_pid12558.log
Aug 02 02:35:14 ip-172-31-29-3 systemd[1]: elasticsearch.service: Main process exited, code=exited, status=1/FAILURE
Aug 02 02:35:14 ip-172-31-29-3 systemd[1]: elasticsearch.service: Unit entered failed state.
Aug 02 02:35:14 ip-172-31-29-3 systemd[1]: elasticsearch.service: Failed with result 'exit-code'.
~~~

사용하고 있는 서버의 메모리를 늘리거나 `/etc/elasticsearch/jvm.options` 에서 -Xms1g -Xmx1g 를 -Xmx512m 으로 설정을 수정하면 해결이 될 수도 있다.  

[Log when cannot allocate memory]( https://github.com/elastic/elasticsearch/issues/15315) 사이트를 참고해보니 사용하고 있는 aws 인스턴스 메모리(1GB) 보다 ElasticSearch 에서 시작할 때 사용하는 메모리가 더 커서 실행이 되지 않는 것 같아 사이트를 참고하여 위와 같은 방법으로 해결하였다.


## Reference

[Install Elasticsearch with Debian Package](https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html#deb-running-init) 

[Log when cannot allocate memory]( https://github.com/elastic/elasticsearch/issues/15315)
