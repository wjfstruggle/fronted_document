class dataManage {
  constructor(private data:string[] | number[]) {
    
  }
  getItem(index:number) {
    return this.data[index]
  }
}
const data  = new dataManage(['111'])


interface Item {
  name:string
}
// 泛型
class dataManage2<T extends Item> {
  constructor(private data:T[]) {
    
  }
  getItem(index:number): string {
    return this.data[index].name
  }
}
const data2  = new dataManage2([
  {
    name:'wujf'
  }
])