//객체 생성(생성자 객체, 리터널 객체)
let obj1 = new Object();
let obj2 = {};

console.log(obj1);
console.log(obj2);

let person = {
  name: "홍길동",
  age: 30,
  hobby: "축구",
  job: "Developer",
  extra: {}, //객체도 들어올 수 있음
  extra2: function () {}, //함수도 들어올 수 있음
  "like cat": true, //한 칸 듸는 번수가 있으면 ""
};

person.name = 10;
console.log(person);
console.log(person["hobby"]);

//추가 기능
person.bhj = "bhj";
console.log(person);
//삭제 기능
delete person.bhj;
console.log(person);

//객체에서 해당되는 멤버 변수가 존재하니?
let result1 = "name" in person;
console.log(result1);
