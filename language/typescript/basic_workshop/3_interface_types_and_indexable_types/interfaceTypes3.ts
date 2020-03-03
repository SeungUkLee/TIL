interface Person3 {
    name: string;
    age?: number;
    // 나머지는 어떤 값이라도 추가할 수 라는 형태 indexable type
    [index: string]: any;
}

const p3: Person3 = {
    name: 'seunguk',
    age: 30,
    gender: 'male',
}