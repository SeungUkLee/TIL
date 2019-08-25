# package & imports & exported name

Go는 모든 것이 패키지로 구성되어있으며 프로그램 시작은 main 패키지로부터 시작한다. 관습에 따라, 패키지 이름은 import path 의 마지막 요소와 동일하다. 예를들어 "math/rand" 패키지는 rand 로 시작하는 파일로 구성된다.

~~~ go
package main

import (
	"math/rand"
	"fmt"
)

func main() {
	fmt.Println(rand.Int())
}
~~~

웹 Url 로 패키지를 import 할 수도 있다. 예를 들어 http://github.com/mattetti/goRailsYourself 의 github 저장소의 crypto 패키지를 들고오고 싶으면 

~~~ go
import "github.com/mattetti/goRailsYourself/crypto"
~~~

위와 같이 import 할 수 있다.


이렇게 하면 위 경로에서 crypto 패키지를 가져오기 위해 컴파일러에게 지시를 하게된다. 하지만 캄파일러가 저장소에서 자동으로 코드를 pull down 하는 것이 아니기 때문에 `go get` 명령어로 해당 코드를 직접 pull down 해야한다.

~~~
$ go get github.com/mattetti/goRailsYourself/crypto
~~~

이 명령은 소스코드를 Go path 에 pull down 해준다. Go 를 설치할때 GOPATH 환경 변수를 설정하는데 이것은 바이너리와 라이브러리, 코드(workspace)를 저장하는데 사용한다. 

~~~
$ ls $GOPATH
bin	pkg	src
~~~

각 디렉토리 용도는 다음과 같다.

* src : 패키지의 소스코드가 위치한다.
* pkg : 패키지의 소스코드를 빌드해서 만들어진 라이브러리 파일(.a - ar archive 파일)이 위치한다. 
* bin : 패키지가 main 함수를 포함할 경우 실행 파일이 만들어 지는데, 이들 실행파일이 복사된다


새 프로그램이나 라이브러리를 시작할 때는 정규화 된 경로 (예 : github.com/ <사용자 이름> / <프로젝트 이름>)를 사용하여 src 폴더에서 시작하는 것이 좋다.

~~~
$ ls $GOPATH/src/github.com/mattetti
goblin			goRailsYourself		jet
~~~


패키지를  imports 후에는 exported name (패키지 외부에서 사용할 수 있는 변수, 메서드 및 함수)을 참조할 수 있다. 이 때 Go 에서는 대문자로 시작하면 exported name 이다.


다음 두 코드를 살펴보자.

~~~ go
import (
    "fmt"
    "math"
)

func main() {
    fmt.Println(math.pi)
}
~~~

~~~ go
import (
    "fmt"
    "math"
)

func main() {
    fmt.Println(math.Pi)
}
~~~

Pi 는 exported 되어 외부에서 엑세스 할 수 있지만 pi 는 그렇지 않다. 두 코드를 실행해보면 pi 에서는 다음과 같은 에러가 발생한다.

~~~
cannot refer to unexported name math.pi
~~~

## Reference

[Go Bootcamp Chapter 2 The Basics](http://www.golangbootcamp.com/book/basics).

[Go 언어 시작하기](https://golangkorea.github.io/post/go-start/getting-start/).