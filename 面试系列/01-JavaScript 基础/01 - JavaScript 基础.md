## 一 目录

| 目录                                                         |
| ------------------------------------------------------------ |
| [一 目录](#chapter-one)                                      |
| [二 前言](#chapter-two)                                      |
| [三 DOM 常用 API](#chapter-three)                            |
| [四 null 和 undefined 的区别](#chapter-four)                 |
| [五 事件流](#chapter-five)                                   |
| [5.1 addEventListener](#chapter-five-one)                    |
| [5.2 原理](#chapter-five-two)                                |
| [5.3 案例](#chapter-five-three)                              |
| [5.4 练习题](#chapter-five-four)                             |
| [5.5 阻止冒泡](#chapter-five-five)                           |
| [5.6 onmouseover 和 onmouseenter 区别](#chapter-five-six)    |
| [5.7 科普](#chapter-five-seven)                              |
| [六 typeof 和 instanceof 的区别](#chapter-six)               |
| [七 一句话描述 this](#chapter-seven)                         |
| [八 JS 位置](#chapter-eight)                                 |
| [九 JS 拖拽](#chapter-night)                                 |
| [十 setTimeout 实现 setInterval](#chapter-ten)               |
| [十一 实现 Sleep](#chapter-eleven)                           |
| [十二 执行上下文](#chapter-twelve)                           |
| [12.1 执行上下文类型](#chapter-twelve-one)                   |
| [12.2 执行栈](#chapter-twelve-two)                           |
| [十三 函数式编程](#chapter-thirteen)                         |
| [13.1 函数式编程特点](#chapter-thirteen-one)                 |
| [13.2 纯函数](#chapter-thirteen-two)                         |
| [十四 渐进式网络应用（PWA）](#chapter-fourteen)              |
| [14.1 优点](#chapter-fourteen-one)                           |
| [14.2 缺点](#chapter-fourteen-two)                           |
| [十五 规范化](#chapter-fifteen)                              |
| [15.1 CommonJS 规范](#chapter-fifteen-one)                   |
| [15.2 AMD 规范](#chapter-fifteen-two)                        |
| [15.3 CMD 规范](#chapter-fifteen-three)                      |
| [15.4 ES6 Modules 规范](#chapter-fifteen-four)               |
| [十六 babel 编译原理](#chapter-sixteen)                      |
| [十七 题集](#chapter-seventeen)                              |
| [17.1 数组常见 API](#chapter-seventeen-one)                  |
| [17.2 常见 DOM API](#chapter-seventeen-two)                  |
| [17.3 数组去重](#chapter-seventeen-three)                    |
| [17.4 数字化金额](#chapter-seventeen-four)                   |
| [17.5 遍历问题](#chapter-seventeen-five)                     |
| [17.6 setTimeout](#chapter-seventeen-six)                    |
| [17.7 requestAnimationFrame](#chapter-seventeen-seven)       |
| [17.8 暂时性死区](#chapter-seventeen-eight)                  |
| [17.9 输出打印结果](#chapter-seventeen-night)                |
| [17.10 输出打印结果](#chapter-seventeen-ten)                 |
| [17.11 Event Loop](#chapter-seventeen-eleven)                |
| [17.12 输出打印结果](#chapter-seventeen-twelve)              |
| [17.13 使 a == 1 && a == 2 成立](#chapter-seventeen-thirteen) |
| [十八 More](#chapter-eighteen)                               |
|                                                              |

## 二 前言

在 JavaScript 复习过程中，可能会碰到：

1. `null` 和 `undefined` 的区别？
2. `addEventListener` 函数？

这样杂七杂八的问题，亦或者 `a == 1 && a == 2` 这样有趣的问题。

将它们归类到 JavaScript 基础，并在本篇文章中一一讲述。

同时，会有十几道简单题目练手。

## 三 DOM 常用 API

可以使用 `document` 或 `window` 元素的 API 来操作文档本身或获取文档的子类（Web 页面中的各种元素）。

```js
// 获取元素
const node = document.getElementById(id); // 或者 querySelector(".class|#id|name");

// 创建元素
const heading = document.createElement(name); // name: p、div、h1...
heading.innerHTML = '';

// 添加元素
document.body.appendChild(heading);

// 删除元素
document.body.removeChild(node);
复制代码
```

示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>DOM 操作</title>
  <style>
    div {
      border: 1px solid #ccc;
      padding: 50px;
      width: 100px;
    }
  </style>
</head>
<body>
  <div id="dom1">元素 1</div>
  <div class="dom2">元素 2</div>
  
  <button class="btn">点我</button>

  <script>
    (function() {
      const btn = document.querySelector('.btn');

      // 注册点击事件
      btn.onclick = function() {
        const dom1 = document.getElementById('dom1');

        // 第一种添加元素
        const newDom1 = document.createElement('p');
        newDom1.innerHTML = '<a href="https://github.com/LiangJunrong/document-library">jsliang 的文档库</a>';
        dom1.appendChild(newDom1);

        // 第二种添加元素
        const newDom2 = document.createElement('ul');
        newDom2.innerHTML = `
          <li>aaa</li>
          <li>bbb</li>
        `;
        document.body.appendChild(newDom2);

        // 移除元素
        const dom2 = document.querySelector('.dom2');
        document.body.removeChild(dom2);
      }
    })()
  </script>
</body>
</html>
复制代码
```

## 四 null 和 undefined 的区别

使用场景细分如下：

- `null`：

1. `Number(null)` 得到 `0`。
2. 作为函数的参数，表示该函数的参数不是对象。
3. 作为对象原型链的终点。`Object.prototype.__proto__ === null`。

- `undefined`：

1. `Number(undefined)` 得到 `NaN`。
2. 变量被声明但是没有赋值，等于 `undefined`。
3. 调用函数时，对应的参数没有提供，也是 `undefined`。
4. 对象没有赋值，这个属性的值为 `undefined`。
5. 函数没有返回值，默认返回 `undefined`。

## 五 JS数据类型

- 数值（number）：整数和小数（比如`1`和`3.14`）。
- 字符串（string）：文本：`'abc'`。
- 布尔值（boolean）：表示真伪的两个特殊值，即`true`（真）和`false`（假）。
- `undefined`：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值。
- `null`：表示空值，即此处的值为空。
- 对象（object）：各种值组成的集合。
- Symbol：表示独一无二的值。

