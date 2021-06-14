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
// const inorder = (root) => {
//   if (!root) {
//     return false
//   }
//   inorder(root.left) // 对根节点的左子树进行中序遍历。
//   console.log(root.val) // 4,2,5,1,6,3,7
//   inorder(root.right) // 对根节点的右子树进行中序遍历。
// }
// inorder(bt)

/**
 * 非递归
 */
const inorder = (root) => {
  if (!root) {
    return false
  }
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left
    }
    const n = stack.pop();
    console.log(n.val); // 4,2,5,1,6,3,7
    p = n.right
  }
}
inorder(bt)