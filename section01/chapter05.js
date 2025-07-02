let num1 = 10;
let num2 = 3;
console.log(num1 / num2);
//=3.3333333333333335 라고 뜨는데 끝에 5는 컴퓨터가 실수 타입을 완벽히 기억하지 못하기 때문에 쓰여진 것.

//num 타입 중 Infinity(양수 무한대), -Infinity(음수 무한대), NaN(Not a Number = 숫자가 아님)
let num3 = Infinity;
console.log(num3);
console.log(typeof num3);

let num4 = NaN;
console.log(typeof num4);
//NaN 도 number 타입은 맞다.

// null 타입
let num5 = null;
console.log(num5);
//=> 어떤 값도 갖지 않은, 아무 객체도 가르키고 있지 않은 상태

//undefined 타입
//=> 아무 것도 정해지지 않은! 타입의 상태

//강제 형변환
let str1 = "10";
let str2 = "20";
let strToNum1 = Number(str1);
console.log(10 + strToNum1);
console.log(str1 + str2);

//NaN 나오는! 형변환 해도 숫자로 못 바꾸는 경우
let str3 = Number("20abc");
console.log(str3);
//근데? 숫자만 끌어오고 싶을 떄 parseInt 쓰면 됨
let str4 = parseInt("20abc");
console.log(str4);
//근데 문자가 앞에 오면 NaN으로 나온다..
let str5 = parseInt("abc20");
console.log(str5);

//null 병합 연산자
let a;
let b = null;

if (b === "null" || b === undefined) {
  console.log("a값은 null or undefined는 안 됨.");
} else {
  a = b;
  console.log(`a=${a}`);
}
//위 식을 한 번에 표현
a = b ?? 0;
