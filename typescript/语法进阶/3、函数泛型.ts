// 泛型，泛指的类型

function join<type>(first:type,second:type) {
  return `${first}${second}`
}

join<number>(1,2)