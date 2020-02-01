# Typescript Node Starter
`include` 는 compliation에 포함할 파일의 glob patterns 배열을 사용한다. `include` 및 `exclude` 를 대체하는 개별 파일 이름의 배열을 취하는 `files` 옵션도 있다.

```json
"include": [
    "src/**/*"
]
```

## Type Definition (`.d.ts`) files
TypeScript 는 `.d.ts` 파일을 사용하여 TypeScript 로 작성되지 않은 JavaScript 라이브러리에 대한 types 를 제공한다. `.d.ts` 파일이 있으면 TypeScript 가 해당 라이브러리를 type check 하여 editor 의 도움을 받을 수 있어 유용하다.

`.d.ts` 파일이 올바르게 설정되었는지 확인하는 것은 매우 중요하다. 일단 파일이 배치되면 high quality type checking 이 제공되기 떄문이다.

> NOTE
> `"noImplicityAny": true` 를 사용하고 있으므로 사용하는 모든 라이브러리에 대해 `.d.ts` 파일이 있어야한다. `false` 로 설정할 수 있지만 `true` 로 성정하여 모든 라이브러리에 대해 `.d.ts` 파일을 갖는 것이 가장 좋다. (`.d.ts` 파일이 비어있는 경우에도!)

### Installing `.d.ts` files from DefinitelyTyped
대부분 DefinitelyTyped 에서 사용중인 라이브러리의 `.d.ts` 파일을 찾을 수 있다. 이 `.d.ts` 파일은 npm `@types` 을 이용하여 설치할 수 있다. (ex. `npm install --save-dev @types/jquery`) 

> NOTE
> `.d.ts` 파일은 컴파일시에만 사용되므로 npm 으로 설치할 경우 `--save-dev` (or `-D`) 옵션을 사용하여 설치하자

npm 을 사용하여 `.d.ts` 파일을 설치하면 `node_modules/@types` 폴더에 해당 파일이 표시된다. 컴파일러는 JavaScript 라이브러리를 확인할 때 항상 이 폴더에서 `.d.ts` 파일을 찾는다.

#### What if a library isn't on DefinitelyTyped?
`@types`에서 `.d.ts` 파일을 설치시 찾을 수 없거나 DefinitelyTyped 를 확인하여 특정 라이브러리를 찾을 수없는 경우 고유한 `.d.ts` 파일을 작성해야한다. (ex. `src/types`폴더를 만들어 작성)

#### Setting up TypeScript to look for `.d.ts` files in another folder
컴파일러는 default 로 `node_modules/@types` 를 바라고복 있자만 컴파일러가 자체 `.d.ts` 파일을 찾도록 돕기위해 `tsconfig.json` 에서 경로를 설정할 수 있다. 경로 매핑은 혼란스러울 수 있지만 기본 아이디어는 TypeScript 컴파일러는 resolving modeuls 할 때 특정 위치에서 특정 순서로 보이며 컴파일러에게 정확히 수행하는 방법을 알려준다.

> TypeScript compiler will look in specific places, in a specific order when resolving modules, and we have the ability to tell the compiler exactly how to do it

```json
"baseUrl": ".",
"paths": {
    "*": [
        "node_modules/*",
        "src/types/*"
    ]
}
```

 모든 import (`*`) 에 대해 `node_modules/@types`에서 찾는 것 외에도 우리가 만든 `.d.ts` 파일 위치 `<baseUrl> + src/types/*`를  컴파일러에게 알려준다. 

```js
import * as flash from "express-flash";
```

먼저 컴파일러는 `node_modules/@types` 에서 `.d.ts` 파일을 찾은 다음 없으면 `src/types` 에서 `express-flash.d.ts` 파일을 찾는다.

#### Using `dts-gen`
`.d.ts` 파일에 익숙하지 않으면 dts-gen 도구를 사용하는 것이 좋다. 대부분의 경우 `.d.ts` 파일의 훌륭한 scaffold 를 얻을 수 있다. 

### Writing a `.d.ts` file
`.d.ts` 생성할 떄 `dts-gen` 을 사용하지 않는다면 직접 작성해야한다. `types` 폴더에 `<some-library>.d.ts`  파일을 만들어 아래 코드를 추가한다.
```ts
declare module "<some-library>"
```
훌륭한 type checking 및 IntelliSense 를 제공하는 `.d.ts` 파일을 작성할 떄 이 문서를 참고하자 ([Introduction · TypeScript](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html))

### Summary of `.d.ts` management
일반적으로 다음 단계를 수행하면 `.d.ts` issues 가 발생을 최소화할 수 있다
1. npm 패키지 설치후 `@types` 를 통해 `.d.ts` 파일을 설치하시오
2. `.d.ts` 파일이 DefinitelyTyped 에 잇으면 설치가 완료된다. 존재하지않아 실패하면 3단계 go~
3. 프로젝트가 자신의 `.d.ts` 파일을 제공할 수 있도록 설정되어있는지 확인하자 ([Setting up TypeScript to look for .d.ts files in another folder](https://github.com/microsoft/TypeScript-Node-Starter#setting-up-typescript-to-look-for-dts-files-in-another-folder))
4. `dts-gen` 으로 `.d.ts` 파일을 생성하자. 성공하면 완료된 것이고 그렇지 않은 경우는 5단계로 가자
5. `types` 폴더에 `<some-libarary>.d.ts` 파일을 만들자
6. 다음 코드를 추가하자
```ts
declare module "<some-library>'
```
7. 다음 글 ([Introduction · TypeScript](http://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)) 을 참고하여 `.d.ts` 파일을 개선해나가자

## Debugging
source maps 가 필요하다.

### Source maps
Source maps 을 이용하면 TypeScript 소스 코드에 break poing 를 놓을 수 있으며 런타임에 실행중인 JavaScript 가 중단 점에 도달할 수 있다.

> NOTE
> Source maps 은 TypeScript 에만 국한되지 않는다. JavaScript 가 transformed (transpiled, compiled, optimized, minified, etc) 될 때마다 런타임에 실행되는 코드를 생성 한 소스에 다시 매핑 할 수 있도록 source maps 이 필요하다

#### Configuring source maps
먼저 `tsconfig.json` 에 source map 이 활성화 되어있는지 확인하자.
```json
"compilerOptions" {
    "sourceMap": true
}
```

이 옵션을 사용하면 TypeScript 컴파일러가 출력하는 모든 `.js` 파일 옆에 `.map.js` 파일도 있다. 이 `.map.js` 파일은 디버깅 중에 source `.ts` 파일로 다시 매핑하는 데 필요한 정보를 제공한다.

> NOTE
> `"inlineSourceMap": true` 를 사용하여 "inline" source maps 을 생성 할 수도 있다. 일부 bundler 는 번들을 통한 맵핑을 유지하기 위해 inline source map 이 필요하므로 클라이언트 측 코드를 작성할 때 일반적으로 많이 사용한다. Node.js 코드를 작성할 때는 크게 걱정할 필요는 없다

### Using the debugger in VS Code

[Using the debugger in VS Code](https://github.com/microsoft/TypeScript-Node-Starter#using-the-debugger-in-vs-code) 참고

## Testing
여기서는 Jest 를 선택하였다. Jest 에서 TypeScript 테스트를 설정하는 것은 간단하지 않다.

### Install the components
TypeScript + Jest 지원을 추가하려면 몇 가지 npm 패키지를 설치해야한다.
```
npm install -D jest ts-jest
```
`jest`  는 테스트 프레임워크 자체이며 `ts-jest` 는 TypeScript 테스트를 좀 더 쉽게 수행할 수 있는 간단한 기능이다.

### Configure Jest
Jest 설정은 `jest.config.js` 를 만들어 다음 코드를 추가하자

```js
module.exports = {
    globals: {
        'ts-jest': {
            tsConfigFile: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
    },
    testMatch: [
        '**/test/**/*.test.(ts|js)'
    ],
    testEnvironment: 'node'
};
```

기본적으로 우리는 Jest 에게 `**/test/**/*.test.(ts|js)` 패턴과 일치하는 모든 파일을 테스트하기를 원한다고 말하고 있다( test 폴더에 있는 모든 js, ts 파일). 하지만 우리는 `.ts`파일을 먼저 전처리하고 싶다. 이 전처리 단계는 매우 유연하지만 우리의 경우 `tsconfig.json` 을 사용하여 TypeScript 를 JavaScript 로 컴파일하려고 한다. 이 모든 것을 테스트를 실행할 때 메모리에서 발생하므로 관리할 output `.js` 테스트 파일이 없다.

## ESLint
ESLint 는 code quality and style issues 롤 캐치하는데 도움되는 린터이다.

### ESLint rules
모든 규칙은 `.eslintrc` 구성 파일을 통해 구성된다.

### Running ESLint
npm scripts 를 이용하자
```json
"scripts": {
  "lint": "tsc --noEmit && eslint \"**/*.{js,ts}\" --quiet --fix"
}
```

```
npm run lint
```

### VSCode Extensions
*  [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) 
*  [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) 

---
## Reference
[microsoft - TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter#using-the-debugger-in-vs-code)

