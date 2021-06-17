const graph = require('./graph');
// 声明一个集合，记录已遍历过的节点
const isVistive = new Set();
isVistive.add(2)
const bfs = () => {
  const q = [2];
  while (q.length) {
    const n = q.shift();
    console.log(n);
    graph[n].forEach(item => {
      if (!isVistive.has(item)) {
        q.push(item)
        isVistive.add(item);
      }
    })
  }
}
bfs()