//모듈, 클래스, 함수,(선언,표현(2))
/*
const add = function (a, b) {
  return a + b;
};
function sub(a, b) {
  return a - b;
}
*/

// => 위 식을 화살표 함수로도 가능
const add = (a, b) => a + b;
const sub = (a, b) => a - b;

/*
//모듈을 외부로 보내는 (공개)메세지 => import
module.exports = {
  add: add,
  sub: sub,
};*/

// =>
export { add, sub };

// => 최종 export const add = (a, b) => a + b;
// => 찐최종 export default function = (a, b){ return a + b; };
