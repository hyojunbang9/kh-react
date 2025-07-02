//배열 내장 함수
const arr = [1, 2, 3, 4];
const newArr = [];

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

//향상 된 for문과 비슷하다 생각해도 됨! (출력만 한다.)
// arr.forEach((value, index, array) => {
//   console.log(value);
//   console.log(index);
//   console.log(array);
//   console.log("===================");
// });

arr.forEach((e) => {
  console.log(e);
  newArr.push(e);
});
console.log(newArr);

//배열 내장 객체 MAP => 위도와 경도를 주면 => 그 위치에 새로운 값을 리턴 시킨다. (값이 변화됨)
const newArr2 = arr.map((e) => e * 2);
console.log(newArr2);

//배열 내장 객체 찾기 4, includes
arr.forEach((e) => {
  if (e === 3) {
    console.log(e);
  }
});

console.log(`4값 체크 유무 : ${arr.includes(4)}`);

//배열 내장 객체 indexof
arr.indexOf(4);
console.log(`4값 위치 : ${arr.indexOf(4)}`);

//배열 내장 객체 findIndex (indexof와 달리 값을 조작 할 수 있다.)
const resultIndex = arr.findIndex((e) => {
  return e === 5;
});
console.log(`4의 findIndex : ${arr.resultIndex(3)}`);

//배열 내장 객체 find에 해당되는 객체를 찾아 리턴
let arr5 = [{ name: "구길동" }, { name: "홍길동" }];

const resultArray = arr5.find((e) => {
  return e.name === "길동";
});
console.log(resultArray);

//배열 내장 객체 filter에 해당되는 객체를 찾아 리턴
let arr6 = [
  { name: "구길동", hobby: "테니스" },
  { name: "저길동", hobby: "테니스" },
  { name: "홍길동", hobby: "독서" },
];

const resultArray2 = arr6.filter((e) => {
  return e.hobby === "테니스";
});
console.log(resultArray2);

//배열 내장 객체 map
const resultArray3 = arr6.map((e) => {
  return e.name;
});
console.log(resultArray3);
