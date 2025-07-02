//익명 객체
const person = {
  name: "김동진",
  age: 25,
  tall: 179,
  name2: "김동진",
  age2: 25,
  tall2: 179,
  name3: "김동진",
  age3: 25,
  tall3: 179,
};
console.log(person.tall);
console.log(person["tall3"]);

let keyArray = Object.keys(person);
let valuesArray = Object.values(person);
console.log(keyArray);
console.log(valuesArray);
for (let i = 0; i < keyArray.length; i++) {
  console.log(`${keyArray[i]} : ${person[keyArray[i]]}`);
}
