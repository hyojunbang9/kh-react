//향상된 포문으로 객체의 키 값 가져오기

let person = {
  name: "홍길동",
  age: 27,
  hobby: "테니스",
};
//for( : ),for( of ), for( in )
for (let data in person) {
  console.log(data);
}

let personArray = [
  {
    name: "홍길동",
    age: 27,
    hobby: "테니스",
  },
  {
    name: "홍길동",
    age: 27,
    hobby: "테니스",
  },
];

//for( : ),for( of ), for( in )
for (let person of personArray) {
  console.log(person);
  for (let data in person) {
    console.log(`${data} = ${person[data]}`);
  }
}

//of는 배열이 와야한다
//in은 객체, 배열이 와야한다.
