// 객체의 인터페이스인데 그 안에 함수가 있는 형태
interface Person4 {
    name: string;
    hello(age: number): void;
}


const p41: Person4 = {
    name: 'seunguk',
    hello: function(age: number) {
        console.log(this.name, age);
    }
}

const p42: Person4 = {
    name: 'seunguk',
    hello() {

    }
}

const p43: Person4 = {

}

// 함수의 타입체크는 함수를 할당할 때 타입체크를 하지않고 사용할때 타입체크를 한다
p42.hello()

// 함수를 위한 인터페이스
interface Hello {
    (name: string, age?: number): void;
}

const hello: Hello = () => {}

hello()

