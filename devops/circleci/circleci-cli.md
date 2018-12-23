# Using the CircleCI CLI
CircleCI Local CLI 을 사용하여 github 에 매번 commit 하고 push 할 필요없이 local 에서 테스트할 수 있다.

## Installation
~~~ shell
$ brew install circleci
~~~

만약 도커를 사용하고 있으면 다음 명령어를 실행한다.

~~~ shell
$ brew install --ignore-dependencies circleci.
~~~

## Configuring The CLI
CLI 를 사용하기전에 CircleCI API Token 을 발급받아야한다. 발급받은 뒤 다음 명령어를 실행한다.

~~~ shell
$ circleci setup
~~~

토큰값을 입력한 다음 default 값으로 `circleci.com` 을 입력하면 된다. 만약 자체 서버 또는 사설 클라우드 서비스에 circleci 를 설치하였다면 서버의 address 를 입력하면 된다. (ex. `circleci.my-org.com`)

## Validate A CircleCI Config
이제 CLI를 이용해서 로컬에서 config 유효성을 검사하여 config.yml 을 테스트하는 추가 커밋을 피할 수 있다.

검증하려면 `.circleci/config.yml` 파일이있는 디렉토리로 이동하여 다음 명령어를 실행하면 된다. 

~~~ shell
$ circleci config validate
# Config file at .circleci/config.yml is valid
~~~

Orbs 로 작업하는 경우 orb 의 유효성을 검사 할 수도 있다.

~~~ shell
$ circleci orb validate /tmp/my_orb.yml
~~~

## Run A Job In A Container On Your Machine
도커를 통해 `config.yml` 에 구성한 jobs 를 실행할 수 있다. 이는 build queue 에 영향을 주지 않고 config 변경 사항을 적용하거나 build process 를 디버깅하기 전에 테스트하는데 유용하다.

다음 명령어를 실행하여 도커를 통해 job 을 실행할 수 있다.

~~~ shell
$ circleci local execute --job JOB_NAME
~~~

workflows 가 아닌 오직 jobs 만 로컬로 실행할 수 있다.

## Limitations of Running Jobs Locally
circleci 을 로컬로 작업을 실행하는 것은 매우 유용하지만 몇 가지 제한 사항이 있다.


### Machine Executor
local jobs 에서는 machine executor 를 사용할 수 없다. mahcine executor 가 job 을 실행하기 위해 추가 VM을 필요로하기 때문이다.


### Workflows
workflows 를 지원하지않는다. 


### Caching and Online-only Commands
현재 로컬 작업에서는 caching 을 지원하지않는다. save_cache 또는 restore_cache 단계가 있으면 이를 건너 뛰고 경고를 표시한다.


### Environment Variables
보안상의 이유로 UI 에 구성된 암호화 된 환경 변수는 로컬 빌드로 가져 오지 않는다. `-e` 플래그를 사용하여 CLI에 env vars를 지정할 수 있다. 자세한 내용은 `circleci help build` 를 통해 확인할 수 있다. 여러 환경 변수가있는 경우, 각 변수에 대해 플래그를 사용해야한다. (ex. `circleci build -e VAR1=FOO -e VAR2=BAR`)


# Testing Config Files Locally
CircleCI API 를 통해 테스트하고 유효성을 검사할 수 있다. script 를 추가하여 config file 을 로컬에서 테스트하기 전에 다음 단계를 완료해야한다.
1. `.circleci` 디렉토리에 스크립트 파일을 추가한다. (ex. `run-build-locally.sh`)
2. API 토큰을 발급받는다.
3. 토큰값을 `export` 명령을 통해 export 한다. `export CIRCLE_TOKEN=<token-from-step-above>`
4. Gather the following information
    - Commit hash from which to build
    - Username
    - Source for project
    - Project name
    - Branch from which to build

----

## Reference
[Using the CircleCI Local CLI
](https://circleci.com/docs/2.0/local-cli/)

