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
