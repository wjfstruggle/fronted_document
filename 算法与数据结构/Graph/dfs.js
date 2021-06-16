const graph = require('./graph');

// 声明一个集合，记录已遍历过的节点
const isVistive = new Set();
const dfs =(n) => {
  console.log(n);
  isVistive.add(n); // 记录已遍历过的节点
  graph[n].forEach(item => {
    if(!isVistive.has(item)) {
      dfs(item)
    }
  })
}
dfs(2);