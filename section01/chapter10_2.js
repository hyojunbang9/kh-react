//함수 호이스팅

//콜백 함수 응용
function repeat(count, callback) {
  for (let idx = 1; idx <= count; idx++) {
    callback(idx);
  }
}
function repeat2(count, callback) {
  for (let idx = 1; idx <= count; idx++) {
    let result = callback(idx, idx);
    console.log(`result = ${result}`);
  }
}

//함수 표현식 (화살표 함수)
repeat2(5, (a, b) => a + b);
