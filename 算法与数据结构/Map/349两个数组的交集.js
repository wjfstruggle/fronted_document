/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
/**
 * 
给定两个数组，编写一个函数来计算它们的交集。
示例 1：
输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
示例 2：
输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
 
说明：
输出结果中的每个元素一定是唯一的。
我们可以不考虑输出结果的顺序。
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
//  Map解题
var intersection = function (nums1, nums2) {
  const map = new Map();
  nums1.forEach(item => {
    map.set(item, true)
  })
  const res = [];
  nums2.forEach(item => {
    if (map.get(item)) {
      res.push(item)
      map.delete(item)
    }
  })
  return res;
};