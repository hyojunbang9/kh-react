//배열 삽입! push
let arr1 = [1, 2, 3];
arr1.push(4);
console.log(arr1);
const newLength = arr1.push(5, 6, 7); //push는 배열의 길이를 리턴한다.
console.log(arr1);
console.log(newLength);

//배열 내용 삭제! pop
//배열의 맨 뒤에 있는 요소를 제거 및 반환
let arr2 = [1, 2, 3];
const poppedItem = arr2.pop(); //제거한값을 반환한다.
console.log(poppedItem);
console.log(arr2);
