//변수 선언(let, const : 상수 서정이 안 된다. 선언할 떄)
const animal = {
  type: "고양이",
  name: "나비",
  color: "black",
};
animal.type = 10;
animal.지현 = "일찐";
console.log(animal);
delete animal.지현;
console.log(animal);

//값이 함수인 프로퍼티를 말함
const person = {
  name: "홍길동",
  // 메서드 선언
  sayHi() {
    console.log("안녕!");
  },
  //익명함수 가능
  sayHi2: function () {
    console.log("안녕2!");
  },
  //화살표함수 가능
  sayHi3: () => {
    console.log("안녕3!");
  },
  //메서드 선언방식
  sayHi4() {
    console.log("안녕4!");
  },
};
person.sayHi();
person["sayHi"](); //괄호표기법으로 함수 호출가능하다.
