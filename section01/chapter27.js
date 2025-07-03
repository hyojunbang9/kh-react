// spread 연산자. [a, b, c, d, e, ~~] => . . .
let arr1 = [1, 2, 3];
let arr2 = [5, ...arr1];
console.log(arr2);

let obj1 = {
  a: 1,
  b: 2,
};
let obj2 = {
  a: obj1.a,
  b: obj1.b,
  c: 3,
  d: 4,
};
// spread 연산자. [a, b, c, d, e, ~~] => . . .
let obj3 = {
  ...obj1,
  c: 3,
  d: 4,
};
console.log(obj2);

//spread의 강력한 힘은 깊은 복사!
let obj4 = obj2; //이건 얕은 복사임 => 주소만 참조해서 값을 출력
console.log(obj4);
obj4.d = 10;
console.log("=======");
console.log(obj2); //얕은 복사의 문제.. 공유하기 떄문에 같이 변함
console.log(obj4);

let obj5 = { ...obj3 };
console.log(obj3);
obj5.d = 10;
console.log("=======");
console.log(obj3);
console.log(obj5);

//깊은 복사끼리 내용이 같은지 비교 하려면?
let o1 = { name: "방효준" };
let o2 = { ...o1 };

console.log(o1 === o2);
console.log(JSON.stringify(o1) === JSON.stringify(o2));
console.log(JSON.stringify);
