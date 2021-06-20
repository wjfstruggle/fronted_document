Array.prototype.mergeSort = function () {
  // 把数组劈成两半，再递归地对子数组进行分，直到把数组分成一个个元素
  const rec = (arr) => {
    if (arr.length == 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid)
    let right = arr.slice(mid, arr.length)
    const orderLeft = rec(left) // 有序左数组
    const orderRight = rec(right) // 有序右数组
    const res = []; // 新建一个空数组res，用于存放最终排序后的数组。
    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        // 比较两个有序数组的头部，较小者出队并推入res中。
        res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
      } else if (orderLeft.length) { // 如果两个数组还有值，就重复第二步。
        res.push(orderLeft.shift())
      } else if (orderRight.length) { // 如果两个数组还有值，就重复第二步。
        res.push(orderRight.shift())
      }
    }
    return res;
  }
  // 挂到原始数组里去
  const res = rec(this)
  res.forEach((n, i) => {
    this[i] = n;
  })
}
const arr = [5, 4, 3, 2, 1]
arr.mergeSort();