Array.prototype.binarySearch = function (target) {
  let low = 0; // 最小索引
  let heigh = this.length - 1; // 最大索引
  while (low <= heigh) {
    const mid = Math.floor((low + heigh) / 2) // 获取中间元素下标
    const ele = this[mid] // 获取中间元素的值
    if (ele < target) {
      low = mid + 1;
    } else if (ele > target) {
      heigh = mid - 1
    } else {
      return mid; // 如果中间元素正好是目标值，则搜索结束。
    }
  }
  return -1;
}
const res = [1, 2, 3, 4, 5].binarySearch(4)