const graph = require('./graph');
// 声明一个集合，记录已遍历过的节点
const isVistive = new Set();
const bfs = (root) => {
  const q = [root];
  while (q.length) {
    const n = q.shift();
    console.log(n);
    isVistive.add(n);
    n.forEach(item => {
      if(!isVistive.has(item)) {
        q.push(item)
      }
    })
  }
}
bfs(2)