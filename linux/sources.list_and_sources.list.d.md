# sources.list and source.list.d
apt 는 패키지를 얻을 수 있는 출처(sources)를 나열하는 파일을 사용하는데 이 파일이 바로 /etc/apt/sources.list 이다. sources.list 와 sources.list.d 에 대한 정보는 `man` 명령어를 통해 알 수 있다.

~~~
$man sources.list
~~~

여기에서는 sources.list.d 에 대해 이렇게 설명되어있다.

/etc/apt/sources.list.d 는 sources.list 항목을 별도의 파일에 추가하는 방법을 제공한다. 형식은 일반 sources.list 파일의 형식과 동일하다. 파일 이름은 .list 로 끝나야하며 문자, 숫자, 밑줄, 하이픈 및 마침표 문자만 포함 할 수 있다. 그렇지 않으면 APT는 파일을 무시했다는 통지를 한다.


즉, 해당 디렉토리의 모든 파일이 main sources list 와 함께 merge 되고 저장소 모음을 함께 구성한다는 의미이다. 모든 저장소를 하나의 파일에 넣을 수 있지만 목록을 여러 파일에 분산하면 유지 관리의 이점이 있다. 저장소를 비활성화하려면 main list 를 조작할 필요없이 파일을 제거하면되고 이는 자동화에 좋다. 
