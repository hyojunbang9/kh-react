// 1. 배열의 구조 분해 할당 (중요!!)
let arr = [1, 2, 3];
let [one, two, three, four] = arr;
console.log(one, two, three, four);

// 2. 객체의 구조 분해 할당
let person = {
  name: "홍길동",
  age: 27,
  hobby: "테니스",
};

//얕은 복사 (주소 공유)
let { age: myAge, hobby, name, extra = "hello" } = person;

console.log(myAge, name, hobby, extra);
//깊은 복사는 (또 다른 주소)

// 3. 객체 구조 분해 할당을 이용해서 함수의 매개변수를 받는 방법
//함수 종류(3) 함수 선언(호이스팅), 함수 표현(익명 함수, 화살표 함수)
let person2 = {
  name: "홍길동",
  age: 27,
  hobby: "테니스",
};
const func = ({ age: myAge, hobby, name, extra = "hello" }) => {
  console.log(name, myAge, hobby, extra);
};
func(person2);
