class Person<T, K> {
    name: T;
    age: K
    constructor(name: T, age: K) {
        
    }
}

const p2 = new Person('lee', 36);
// p2.age = 'se' // error

class Person2<T extends string | number, K> {
    name: T;
    age: K;
    constructor(name: T, age: K) {

    }
}

// const p3 = new Person2(true, 36) // error


