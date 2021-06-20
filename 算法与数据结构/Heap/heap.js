// 插入方法，获取第K个最小元素
class MinHeap {
  constructor() {
    this.heap = [];
  }
  // 交换函数
  swap(i1, i2) {
    let temp = this.heap[i1]
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp;
  }
  // 获取父节点的位置  (index -1 ) / 2 的余数
  getParentIndex(i) {
    return (i - 1) >> 1
  }
  // 获取左节点的位置 index * 2 + 1
  getLeftIndex(i) {
    return i * 2 + 1;
  }
  // 获取右节点的位置 index * 2 + 2
  getRightIndex(i) {
    return i * 2 + 2;
  }
  // 上移操作:将这个值和它的父节点进行交换，直到父节点小于等于这个插入的值。
  shiftUp(index) {
    // index == 0 到栈顶了， 就返回
    if (index == 0) {
      return;
    }
    const parentIndex = this.getParentIndex(index);
    // 和父节点交换
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  // 下移，将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶。
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index);
    const rightIndex = this.getRightIndex(index);
    if (this.heap[leftIndex] < this.heap[index]) {
      this.swap(leftIndex, index)
      this.shiftDown(leftIndex);
    }
    if (this.heap[rightIndex] < this.heap[index]) {
      this.swap(rightIndex, index)
      this.shiftDown(rightIndex);
    }
  }
  // 将值插入堆的底部
  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  pop() {
    this.heap[0] = this.heap.pop(); // 用数组尾部元素替换堆顶
    this.shiftDown(0)
  }
  // 获取堆顶，返回数组的头部
  peek() {
    return this.heap[0]
  }
  // 获取堆得大小：返回数组的长度
  size() {
    return this.heap.length
  }
}
const h = new MinHeap();

h.insert(3)
h.insert(2)
h.insert(1)
h.pop();