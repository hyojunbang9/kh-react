// 1. Date 객체를 생성하는 방법
let date1 = new Date(); // 생성자
console.log(date1);
let date2 = new Date(1997, 1, 7, 23, 59, 59);
console.log(date2); // Fri Feb 07 1997 23:59:59 GMT+0900 (한국 표준시)

// 2. 타임 스탬프
// 특정 시간이 "1970.01.01 00시 00분 00초"로 부터 몇 ms가 지났는지를 의미하는 숫자값
// 숫자값이기 때문에 프로젝트에 자주 사용한다.
date1 = new Date();
let ts1 = date1.getTime();
console.log(ts1); // 1718416413651
let date4 = new Date(ts1);
console.log(date1, date4); // 똑 같은 시간이 출력됨

// 3. 시간 요소들을 추출하는 방법
let year = date1.getFullYear();
let month = date1.getMonth() + 1;
let date = date1.getDate();
let hour = date1.getHours();
let minute = date1.getMinutes();
let seconds = date1.getSeconds();
console.log(year, month, date, hour, minute, seconds);

// 4. 시간 수정하기
date1.setFullYear(2024);
date1.setMonth(2 + 1);
date1.setDate(30);
date1.setHours(23);
date1.setMinutes(59);
date1.setSeconds(59);
console.log(date1);

// 5. 시간을 여러 포맷으로 출력하기
//시간은 제외하고 날짜만 출력하기
console.log(date1.toDateString());
//현지화된 문자에 맞게 출력하기
console.log(date1.toLocaleString());
