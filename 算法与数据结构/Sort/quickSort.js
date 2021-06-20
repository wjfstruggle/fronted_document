Array.prototype.quickSort = function () {
  const rec = (arr) => {
    if (arr.length === 1) {
      return arr;
    }
    const left = []; // 存放基准前面的元素
    const right = []; // 存放基准前面的元素
    const base = arr[0]; // 基准，这里选择第一个元素
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < base) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }
    return [...rec(left), base, ...rec(right)]
  }
  // 挂到原始数组里去
  const res = rec(this)
  res.forEach((n, i) => {
    this[i] = n;
  })
}
const arr = [2, 4, 5, 3, 1]
arr.quickSort();
console.log(arr)