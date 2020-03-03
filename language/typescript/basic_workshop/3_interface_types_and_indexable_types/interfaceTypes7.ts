// Indexable Types
// index 를 설정해서 어떤 값의 형태를 넣어줄 수 있는 스타일
// index 타입은 number, string 
// index 가 number 라는 것은 배열, 하지만 우리가 생각하는 배열과는 조금 다르다.

// typescript 공식사이트 playground 에서 직접해보자
interface StringArray {
    [index: number]: string
}

const sa: StringArray = {}
// 이러한 형태가 가능하다. 하지만 잘 사용하지는 않는다
sa[100] = '백';

// string indexable
interface StringDict {
    [index: string]: string;
}

const sd: StringDict = {}
sd['hundred'] = '백';
sd.hundred = '백';

interface Optional {
    [index: string]: any;
}