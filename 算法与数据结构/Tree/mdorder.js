const bt = {
  val: '1',
  left: {
    val: '2',
    left: {
      val: '4',
      left: null,
      right: null
    },
    right: {
      val: '5',
      left: null,
      right: null
    }
  },
  right: {
    val: '3',
    left: {
      val: '6',
      left: null,
      right: null
    },
    right: {
      val: '7',
      left: null,
      right: null
    }
  }
}
// const mdorder = (root) => {
//   if (!root) {
//     return false
//   }
//   mdorder(root.left) // 对根节点的左子树进行中序遍历。
//   mdorder(root.right) // 对根节点的右子树进行中序遍历。
//   console.log(root.val) // 4,5,2,6,7,3,1
// }
// mdorder(bt)

// 非递归
const mdorder = (root) => {
  if (!root) {
    return false
  }
  const stack = [root];
  const outPutStack = [];
  while (stack.length) {
    const n = stack.pop(); // 先访问栈顶元素，即根节点
    outPutStack.push(n) // 存入到逆向输出的数组里
    if (n.left) stack.push(n.left)
    if (n.right) stack.push(n.right)
  }
  while (outPutStack.length) {
    const n = outPutStack.pop();
    console.log(n.val); // 4,5,2,6,7,3,1
  }
}
mdorder(bt)