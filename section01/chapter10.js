//함수 호이스팅
add(10, 20);

//함수 선언문에는 함수 호이스팅이 된다. => add(10,20)이 함수 선언문 위에 써도 된다.
function add(num1, num2) {
  console.log(num1 + num2);
}

sub(11, 20); // => 안 됨! why? 표현식, 화살표 함수는 호이스팅이 안 되기 떄문
//함수 표현식
let sub = function add2(num1, num2) {
  console.log(num1 + num2);
};

sub2(11, 20); // => 안 됨! why? 표현식, 화살표 함수는 호이스팅이 안 되기 떄문
//함수 표현식 (익명 함수)
let sub2 = function (num1, num2) {
  console.log(num1 + num2);
};

sub3(20, 30); // => 안 됨! why? 표현식, 화살표 함수는 호이스팅이 안 되기 떄문
//함수 표현식 (화살표 함수(람다식))
let sub3 = (num1, num2) => console.log(num1 + num2);
