// const random = () => {
//   const number = [0, 0, 0, 0, 0, 0];
//   for (let i = 0; i < number.length; i++) {
//     number[i] = Math.floor(Math.random() * 9);
//   }
//   return number.join('').toString();
// };
function random() {
  let number = '';
  for (let i = 0; i < 6; i++) {
    number += Math.floor(Math.random() * 10);
  }
  return number;
}

module.exports = random;
