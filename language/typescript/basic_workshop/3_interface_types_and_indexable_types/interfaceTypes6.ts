// interface 끼리도 상속이 된다.
interface IPerson6 {
    name: string;
}

interface IKorean extends IPerson6 {
    city: string
}

const p6: IPerson6 = {
    name: 'Seunguk'
}

const k6: IKorean = {
    name: 'seunguk',
    city: 'seoul'
}