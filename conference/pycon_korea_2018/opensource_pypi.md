# PyCon Korea 2018 - 나도 할 수 있다 오픈 소스! setup.py에서 PyPI까지

## setup.py 작성

### setuptools
파이썬 프로젝트 패키징 / 배포를 위한 패키지

### setuptools.setup
setuptools.setup 을 사용하여 패키지를 만들 수 있다. 패키지를 배포하면서 필요한 정보를 정의하는 함수이며 setup 함수안에는 정말 많은 정보들이 들어간다.

* 파이썬 모듈을 엮어서 패키지로 만드는 데 필요한 정보들
* 배포에 필요한 정보들
* 패키지에 대한 설명
* 정말 많은 정보들이 있음

## setuptools.setup 인자

* 패키지 이름: name (파이썬 모듈안에서 사용하는 이름과는 별개)
* 패키지 작성자 정보: author, author_email
* 피키지 설명 : description,
	* long_description : 긴 설명은 다양한 모맷 지원, long_description_content_type
* 라이센스: license https://choosealicense.com 참고
어떤 라이센스가 고민이면 위 사이트에 들어가서 라이센스 선택의 도움을 받을 수 있음. (보통 GPL, MIT)

* 패키지 버전: version
	* 보통 유의적 버전(semantic version)하고 비슷하게 작성
	* 버전 작성하는거에 대한 PEP도 있음 - PEP 396
* 패키지 웹페이지 주소: url

``` python
setup {
	name='name',
	author='author',
	author_email='foo' '@' 'gmail.com', # 스팸 방지
	description="Python lib",
	long_description=readme(),
	long_description_content_type='text/markdown',
	license='GPL',
	version='0.1.0',
	url='https://github.com/foo/bar',
```

``` python
def readme() -> str:
	with open('./README.md') as f:
		return f.read()
```

### PEP 396 - Module Version Numbers

* 페키지의 버전을 패키지 안에 정의해야 한다면, `__version__`  이란 이름으로 정의해야함
	* 패턴은  PEP 440 참고
* 문자열이어야 함
* VCS에서 제공하는 리비전의 번호(커밋 해시)가 포함돼서는 안됨
* `setup.py` 의 version 인자는 패키지의 `__version__` 으로 부터 얻어오거나, 그 반대가 되어야함

그래서 보통 최상위 패키지에 import 해주는데 이 방법도 문제가 있음

``` python
from foo import __version__
setup {
	...
	version=__version__,
	...
}
```

가령 `__init__.py` 에서 다른 모듈을 임포트하는 경우가 있다. 표준 라이브러리 외에 서드파티 라이브러리를 임포트하는 모듈을 임포트하고 있다고 하자. 이러면 setup.py 를 실행하면 에러가 난다. 왜냐하면, setup.py가 특정 라이브러리를 설치하려고 하는데 설치하려고 할 때 패키지를 실행하게되면서 그 서드파티 라이브러리를 찾을 수 없어서 에러가 난다.

(예를 들어, 작성하고 있는 패키지가 의존하는 라이브러리를 constant 모듈에서 임포트하면 setup.py 에서 에러가 남)

``` python
from .constatnt import DEFAULT_PADDING
__version__ = '0.1.0'
```

그래서 `ast` 모듈로 `__init.py` 을 읽어서 `__version__` 정보를 보여주도록 하면 된다.

``` python
import ast

def get_version():
	filename = 'foo/__init__.py'
	with open(filename, 'r') as f:
		tree = ast.parse(f.read(), filename)
	for node in tree.body:
		if(isinstance(node, ast.Assign) and node.targets[0].id == '__version__'):
			return ast.literal_eval(node.value)
		else:
			raise ValueError('could not find __version__')
```

## setuptools.setup 인자(2)

패키지 의존성 관련 내용. 패키지 의존성을 해결하기 위해서는 packages 나 py_modules 인자에 패키지를 리스팅해주면 된다.

* 패키지 모듈: packages vs py_modules
	* py_modules : 패키지 크기가 크지 않거나, 아예 루트 패키지가 없을 때 사용.
	* packages : 모듈이 여러 개인 패키지를 작성할 때 사용. setuptools.find_packages() 로 패키지를 찾을 수 잇음
* 패키지 분류: classifiers
	* 패키지를 어떻게 분류할 수 있는지 정보를 적어줌
	* 다양한 분류가 PyPI 페이지에 리스팅되어 있음 
		* ref) https://pypi.org/pypi?%3Aaction=list_classifiers
* 엔트리 포인트: entry_points
	* Dynamic Discovery
	* 개인화된 명령어 생성 가능 ('console_scripts')
		* CLI로 제공하고 싶다면 사용하면 됨
* 패키지 의존성 관리
	* install_requires: 패키지 실행에 필요한 패키지들
	* tests_require: 테스트 실행에 필요한 패키지들
	* extrs_require: 추가로 필요한 패키지들
	* tests_require 및 extras_require 에 정의한 패키지는 기본적으로 설치되지 않음. 추가로 설치해야하는 구조

``` python
setup(
	...
	py_modules='foo.py',
	classifiers=[
		...
	],
	entry_points = [
		'console_scripts': [
			'foo=foo:cli'
		]
	...
```

## setup.cfg 사용하기

패키지의 메타데이터를 `setup.cfg` 에 넣을 수 있는 기능이 있다. (setuptools 30.3.0 이상에서 사용 가능)

패키지 메타데이터 같은 것들을 적기 위해 `readme()` 와 `get_version()` 함수를 만들어서 사용하였는데 지시자(attr, file)를 사용하여 코드를 줄일 수 있다.

### PyPI 설정
PyPI 가입하고 가입한 계정을 통해서 패키지 업로드나 수정 권한을 조정할 수 있다. 가입한 계정을 `~/.pypirc` 설정 파일에 적어두면 respository 나 password 를 생략할 수 있어 편하게 업로드 할 수 있다.

``` toml
[distutils]
index-servers = pypi

[pypi]
repository:
	https://upload.pypi/org/legacy/
username: <username>
password: <password>
```

## PyPI에 업로드하기

`$ python setup.py sdist upload` 이렇게 배포해도 되지만 더 좋은 방법들이 존재한다.

### Wheel 로 업로드하기

``` shell
$ pip install wheel
$ python setup.py sdist bdist_wheel upload
```

[13:20] 참고

### Wheel 로 업로드 완료

업로드한 `.whl` 파일을 PyPI 에서 볼 수 있다.


`{패키지이름}-{버전}-{지원파이썬 버전}.whl`

### twine

새로운 파이썬 패키지 배포 도구.

파이썬 버전에 상관없이 PyPI에 HTTPS 를 사용해서 업로드하며 keyring 같은 도구와 같이 사용 가능하다. 배포 파일은 동일하게 만들어서 업로드 가능하고 업로드만 twine 사용하면 된다. 테스트로 업로드도 가능하다.

``` shell
$ python setup.py sdist bdist_wheel
$ twine upload dist/*
$ twine upload \
	--repository-url https://test.pypi.org/legacy/ \
	dist/*
```

## 협업하기

`CONTRIBUTING` 파일을 만들어서 가이드라인을 적자 - 좋은 예제: atom 의 기여 가이드

## 변경 기록 항상 적기

패키지 릴리스마다 어떤 변경점이 있는지 사용자에게 알려주는 것이 좋음 - 하지만 문서 적기는 귀찮음... 
그래서 체인지 로그(Changelog)를 CI 에서 검사해서 항상 적을 수 있도록 유도

[19:03] 참고

## 귀찮은 일 미루기
twin 업로드 명령어를 패키지 업로드할때마다 하는 것은 귀찮다..

CI 서비스에서 git 태그를 이용해서 릴리스할 수 있다. Github 또는 PyPI에 릴리스할 수 있다.


## Etc.
* README 배지 달기
* Github 으로 코드 관리하기
* 커밋에서 이슈 자동으로 닫기

## Reference

[나도 할 수 있다 오픈 소스! — setup.py에서 PyPI까지](https://www.youtube.com/watch?v=4wEFo7L2zRc&t=504s)
