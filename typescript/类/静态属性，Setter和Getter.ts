// getter和setter

class Tea {
  constructor(private _name:string) {}
  get name() {
    return this._name
  }
  set name(name:string) {
    const relaName = 'wujf'
    this._name = relaName
  }
}

const tea = new Tea('dell')
console.log(tea.name)
tea.name = '张三'
console.log(tea.name)

class Demo {}