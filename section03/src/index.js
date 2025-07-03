//외부 공개 모듈을 가져온다. => import
/*
const moduleData = require("./math");

console.log(moduleData);
console.log(moduleData.add(10, 20));
console.log(moduleData.sub(10, 20));
*/

// =>

import { add, sub } from "./math.js";
import randomColor from "randomcolor";

console.log(add(10, 20));
console.log(sub(10, 20));

// => import add from "./math.js"; 라고 써도 됨
// => default는 { } 안 써도 됨!

let color = randomColor();
console.log(`color = ${color}`);
