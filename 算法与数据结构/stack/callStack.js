const fn1 = () => {
  console.log(1)
  fn2();
}
const fn2 = () => {
  fn3();
  console.log(2)
}
const fn3 = () => {
  // fn1()
  console.log(3)
}
fn1();