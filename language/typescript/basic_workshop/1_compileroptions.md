# Compiler Options

## Compliation Context
Compliation Context 란?

complication context 는 기본적으로 TypeScript 가 어떤 것이 유효하고 어떤 것이 유효하지 않은지 결정하기 위해 파싱하고 분석할 파일의 그룹화를 위한 용어일 뿐이다.

어떤 파일에 대한 정보와 함께 어떤 컴파일러 옵션을 사용하는 지에 대한 정보가 포함되어 있다.

이 논리적인 그룹화를 정의하는 좋은 방법은 `tsconfig.json` 파일을 사용하는 것이다.

> The compilation context is basically just a fancy term for grouping of the files that TypeScript will parse and analyze to determine what is valid and what isn't. Along with the information about which files, the compilation context contains information about /which compiler options/ are in use. A great way to define this logical grouping (we also like to use the term /project/) is using a tsconfig.json file.
> 
> [Compilation Context - TypeScript Deep Dive](https://basarat.gitbook.io/typescript/project/compilation-context)

## tsc
`tsc` 는 타입스크립트 컴파일러를 실행하기 위한 cli 명령어이다.

## tsconfig schema
총 8개의 최상위 프로퍼티로 구성되어있다.
* compileOnSave
* extends
* compileOptions
* files
* include
* exclude
* references
* typeAcquisition

```json
{ 
  "compileOnSave": true, 
  "extends": "path", 
  "compilerOptions": {...},
  "files": [...],
  "include": [...],
  "exclude": [...],
  "references": [...],
  "typeAcquisition": 
}
```

> `compilerOptions` 가 제일 중요

> http://json.schemastore.org/tsconfig

### compileOnSave
true or false 값을 설정 (default 는 false)
ts 파일을 save 를 할때 IDE 에 signal 을 보냄. 제한적(지원되는 IDE만 가능)이고 잘 안씀.

### extends

tsconfig 파일을 여러개두고 서로 상속할 때 사용. 보통 tsconfig 파일을 한개만 쓰지 않는 경우가 많다. (ex. react 와 서버와 같은 프로젝트 안에 공존하고 있으면 react 의 tsconfig 파일과 서버의 tsconfig 파일이 서로 다를 수 있다) 

### files, include, exclude

어떤 파일을 컴파일 할지 안할지 결정. 만약 셋다 설정이 없으면, 전부다 컴파일한다. 

* files
	* 상대 or 절대 경로의 리스트
	* 내가 직접 골라서 컴파일하겠다
	* exclude 보다 쏌
* exclude, include
	* glob 패턴 (.gitignore)
	* include
		* exclude 보다 약함
		* * 같은걸 사용하면, .ts / .tsx / .d.ts 만 include (allowJS)		
	* exclude
		* 따로 설정을 하지 않으면 기본적으로 배제되는 녀석들이 있음 (node_modules, bower_components, jspm_packages, <outDir>)
		* <outDir> 은 include 에 있어도 항상 제외된다.

### CompileOptions

#### typeRoots
type 을 정의한 디렉토리 목록을 지정. 지정하지 않으면 자동으로 `node_modules/@types` 안에 이름이 같은 녀석을 매칭해서 타입으로 지정해서 사용.

#### types
컴파일에 포함할 type declaration files 를 지정.

#### @types
* TypeScript 2.0 부터 사용 가능해진 내장 type definition 시스템
* *아무 설정을 안하면 ?*
	* `node_modules/@types` 라는 모든 경로를 찾아서 사용
* typeRoots 를 사용하면 ?
	* 배열 안에 들어있는 경로들 아래서만 가져옴
* types 를 사용하면 ?
	* 배열 안의 모듈 혹은 `./node_modules/@types/` 안의 모듈 이름에서 찾아옴
	* [] 빈 배열을 넣는다는건 이 시스템을 이용하지 않겠다 뜻
* typeRoots 와 types 를 같이 사용하지않음

#### target

빌드의 결과물을 어떤 버전으로 할 것인지 지정. ECMAScript 대상 버전을 지정. (ex. es5, es6, es2015, es2016 등) 

#### lib

* 기본 type definition 라이브러리를 어떤 것을 사용할 것이냐
* lib 를 지정하지 않을 때,
	* target 이 'es5' 이면, 디폴트로 dom, es5, scripthost 를 사용
	* target 이 'es6' 이면, 디폴트로 dom, es6, dom.iterable, scripthost 를 사용
* lib 를 지정하면 그 lib 배열로만 라이브러리를 사용

타입이 나와야하는데 안나온다 -> lib 설정이 잘못되었을 수도 있다.

#### outDir
컴파일해서 떨어질 장소.

#### module

어떻게 모듈을 쓸지 지정.

* module
	* 컴파일된 모듈의 결과물을 어떤 모듈 시스템으로 할지를 결정
	* target 이 'es6' 이면 es6 가 디폴트이고,
	* target 이 'es6' 가 아니면 commonjs 가 디폴트
	* AMD 나 System 와 사용하려면, `outFile` 이 지정되어야 함
	* ES6 나 ES2015 를 사용하려면, target 이 `es5` 이하여야함
* moduleResolution
	* ts 소스에서 모듈을 사용하는 방식을 지정헤야함
	* Classic or Node 
	* CommonJS 일때만 Node 라고 생각하면됨
* paths 와 baseUrl
	* 상대경로 방식이 아닌 baseUrl 로 꼭지점과 paths 안의 key/value 로 모듈을 가져가는 방식
* rootDirs : 배열 안에서 상대 경로를 찾는 방식. strict 옵션

#### strict

strict 옵션은 왠만하면 키고 사용.

* --noImplicitAny

---

## Reference

* [CompilerOptions](https://www.notion.so/Compiler-Options-fde8ee3f49604c70adffdea1d6c5fd90)