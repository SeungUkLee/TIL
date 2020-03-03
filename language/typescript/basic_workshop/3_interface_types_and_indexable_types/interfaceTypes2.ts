interface Person2 {
    name: string
    age?: number
}

// 좀더 다이나믹하게 사용가능
const p2: Person2 = {
    name: `seunguk`,
}

function hello2(person: Person2): void {
    // person.age.toString 는 undefined 일 수 있어서 빨간줄이 뜨는 것을 볼 수 있다
    console.log(`${person.name}`);

    if (person.age === undefined) {
        return;
    }
    // 타입가드로 person.age 가 undefined 인 경우를 제외시켰으므로 빨간줄이 안뜸. 
    console.log(`${person.age.toString}`);

}

hello2(p2)