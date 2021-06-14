const tree = {
  val: 'a',
  children: [{
    val: 'b',
    children: [{
      val: 'd',
      children: [],
    }, {
      val: 'e',
      children: [],
    }],
  }, {
    val: 'c',
    children: [{
      val: 'g',
      children: [],
    }, {
      val: 'f',
      children: [],
    }],
  }],
}
const bfs = (root) => {
  const q = [root]
  while (q.length > 0) {
    const n = q.shift(); // 对头出队
    console.log(n.val)
    n.children.forEach(item => { // 把对头的`children`挨个入队
      q.push(item)
    })
  }
}
bfs(tree) // a,b,c,d,e,f,g