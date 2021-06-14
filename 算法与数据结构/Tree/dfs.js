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
const resule = (root) => {
  console.log(root.val);
  root.children.forEach(resule)
}
resule(tree);