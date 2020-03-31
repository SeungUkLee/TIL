node.js 보다 deno 에서 어떤점들이 더 개선되었는지 deno 의 장점을 간단하게 보자.

우선 node.js 에서는 `package.json`, `node_modules`, npm 을 사용한다. npm 은 중앙 집중 방식을 사용한다. 
그래서 우리는 필요한 패키지들을 npm 을 통해 install 하여 사용한다. npm 에 의존적이다.
`node_moudules` 는 점점 모듈들을 추가하다보면 무거워진다.


반면에, deno 는 `package.json`, `node_modules`, npm 을 사용하지 않는다.
무엇인가 import 하고 싶으면 다음과 같이 url을 추가하면 된다.

```ts
import { serve } from "https://deno.land/std@v0.36.0/http/server.ts"
```

그래서 deno 에서는 `package.json`, `node_modules`, npm 을 없애버렸다.


그럼 이제 어떻게 deno는 node.js 보다 더 안전하다고 할 수 있을까?

nodejs 에서는 필요한 패키지가 있으면 npm 을 통해 install 한다. 
다운로드해서 컴퓨터에 실행할 때, 제약이라는게 있을 수가 없다. 
내가 받은 코드가 컴퓨터에 어떤 악영향이 있을지 예상할 수가 없다.
우리는 그냥 모르는 코드를 신뢰하면서 그냥 다운로드하여 사용한다. 

바로 이점이 보안에 취약하다는 것이다. 
우리가 다운로드 받은 코드들을 하나하나 점검할 시간은 없다. 
이것을 deno가 해결하는 방법은 바로 샌드박스 안에서 코드를 돌리는 것이다. 
코드는 실행되지만 우리 컴퓨터에서 분리된 상태에서 돌아간다. 

예를 들어 어떤 코드는 파일 시스템에서만 접근할 수 있고, 인터넷 연결은 안된다고 정확하게 deno 에게 알려주고 싶다면 다음과 같이 하면된다. 

```
$ deno --allow-read https://deno.land/std/examples/cat.ts /etc/passwd
```

또는 인터넷 연결은 되지만 내 파일은 열람할 수 없다고 한다면 다음과 같이 하면된다.

```
$ deno --allow-net https://deno.land/std/examples/echo_server.ts
```

즉 코드의 권한과 범위를 지정할 수 있다.


