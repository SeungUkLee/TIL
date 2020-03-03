function helloString(msg: string): string {
    return msg;
}

function helloNumber(msg: number): number {
    return msg;
}

function helloAny(msg: any): any {
    return msg;
}

helloAny('hello') 
// 리턴타입이 any 이기 때문에 타입 추론이 불가능하다

function helloGeneric<T>(msg: T): T {
    return msg
}

helloGeneric(1).toString // 타입 추론이 가능
helloGeneric('hello').length

// 너 앞에서는 T 에 number 를 넣기로 했는데 왜 string 을 넣니? 하면서 에러 발생
// helloGeneric<number>('hello') // error 

function helloArray<T>(msg: T[]): T {
    return msg[0];
}

console.log(helloArray(['hello', 5])) 
// 우리는 리턴타입이 무조건 string 인 것을 알지만 확인해보면 리턴타입이 string 또는 number 로 찍힌다

function helloTuple<T, K>(msg: [T, K]): T {
    return msg[0]
}

console.log(helloTuple(['hello', 5]))
// 리턴 타입의 타입 추론이 string 으로 되어있는 것을 확인할 수 있다

type HelloFunctionGeneric = <T>(msg: T) => T;
const helloFunction: HelloFunctionGeneric = <T>(msg: T): T => {
    return msg;

}
console.log(helloFunction('hello'))