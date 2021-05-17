class Phone {
  constructor(public name:string) {

  }
  // constructor(readonly name:string) {

  // }
}

abstract class Geom {
  constructor(parameters) {
    
  }
}
const phone = new Phone('苹果')
phone.name = '华为'
console.log(phone.name);
