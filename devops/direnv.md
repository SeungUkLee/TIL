# direnv

## direnv 는 어떤 문제를 해결하기위한 도구인가?

일반적으로 쉘을 사용하는 경우 사용자 별로 환경이 구성된다. 배시 쉘을 사용한다고 가정하면 `~/.bashrc`,  `~/.bash_profile`, `~/.profile` 와 같은 파일들을 읽어 사용자 환경을 구축한다. 다수의 프로젝트들을 관리하는 경우 설정 파일들이 복잡해진다. 또한 이렇게 작성한 대부분의 설정은 특정 프로젝트에서 의미가 있는 경우가 많다. 이를 해결하는 도구가 direnv 이다.

## 어떤 도구?

direnv 는 사용자가 현재 디렉토리의 `.envrc` 파일을 추가로 읽어 해당 디렉토리에서만 필요한 설정들을 로드한다. 만약 디렉토리를 빠져나가면 이 설정들은 언로드한다. 따라서 디렉토리 별로 필요한 설정을 정의하는 것이 가능해진다.

## Reference & Further more

[direnv로 디렉토리(프로젝트) 별 개발환경 구축하기루비(Ruby), 파이썬(Python), 노드(Node) 개발 환경 구축](https://www.44bits.io/ko/post/direnv_for_managing_directory_environment)

[폴더별 환경 관리를 위한 direnv](https://blog.outsider.ne.kr/1306)
