var isValid = function (s) {
  const stack = []; // 新建一个栈
  if (s.length % 2 == 1) {
    return false // 奇数的长度直接不合法
  }
  for (let i = 0; i < s.length; i++) {
    const val = s[i]
    if (val === '(' || val === '{' || val === '[') {
      stack.push(val) // 判断左括号合法，入栈
    } else {
      const top = stack[stack.length - 1]; // 定义栈顶元素
      if (
        // 栈顶元素的栈底元素匹配
        (top === '(' && val === ')') || (top === '{' && val === '}') || (top === '[' && val === ']')
      ) {
        stack.pop(); // 出栈
      } else {
        return false
      }
    }
  }
  return stack.length === 0; // 栈空了就合法
};
isValid("()");