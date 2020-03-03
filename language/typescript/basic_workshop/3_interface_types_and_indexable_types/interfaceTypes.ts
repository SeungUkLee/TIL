interface Person1 {
    name: string
    age: number
}


function hello1(person: Person1): void {
    console.log(`hello, I'm ${person.name}`);
}

const p1: Person1 = {
    name: `seunguk`,
    age: 36
}

hello1(p1)