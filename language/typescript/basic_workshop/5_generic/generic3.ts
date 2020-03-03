// ---
// typescript 의 keyof

interface Person8 {
    name: string;
    age: number;
}

type a = keyof Person8;

const person8 = {
    name: 'Lee',
    age: 22
}

function getProperty(person: Person8, key: string) {
    return person[key] // error
}

function getProperty2<T, K extends keyof T>(person: T, key: K): T[K] {
    return person[key];
}

getProperty2(person8, 'nama') // 실수로 오타를 내도 잡아낸다
getProperty2(person8, 'name')

function setProperty<T, K extends keyof T>(person: T, key: K, value: T[K]): void {
    person[key] = value
}

type PartailPerson8 = Partial<Person8>;
type ReadonlyPerson8 = Readonly<Person8>;
type aaa = Pick<Person8, 'name'>;

interface XYZ {
    x: any;
    y: any;
    z: any;
}   function dropXYZ<T extends XYZ>(obj: T): Pick<T, Exclude<keyof T, "x" | "y" | "z" >>

function dropXYZ<T extends XYZ>(obj: T) {
    let { x, y, z, ...rest } = obj;
    return rest;
}


