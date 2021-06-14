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
// 递归
// const preorder = (root) => {
//   if (!root) {
//     return false
//   }
//   console.log(root.val) // 1,2,4,5,3,6,7
//   preorder(root.left)
//   preorder(root.right)
// }
// preorder(bt)

/**
 * 非递归
 * 由于先访问根节点，可以看做栈来操作
 */
const preorder = (root) => {
  if (!root) {
    return false
  }
  const stack = [root];
  while (stack.length) {
    const n = stack.pop(); // 先访问栈顶元素，即根节点
    console.log(n.val); // 1,2,4,5,3,6,7
    // 根据后进先出，先操作右子树进行先序遍历
    if (n.right) stack.push(n.right)
    if (n.left) stack.push(n.left)
  }
}
preorder(bt)