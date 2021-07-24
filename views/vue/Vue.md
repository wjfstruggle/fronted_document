### `Vue`面试

#### 1、`v-if`和`v-for`哪个优先级更高?如果两个同时出现，应该怎么优化得到更好的性能?

源码中找答案：`src\compiler\codegen\index.js`

![image-20210724111433396](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724111433396.png)

测试：

```html
<div id="app">
    <ul>
        1、`v-for`和`v-if`在同一层级
      <li v-for="item in list" v-if="item.flag" :key="item.name">{{item.name}}</li>
        2、`v-for`和`v-if`不在同一层级
        <template v-if="list.length>0">
        	<li v-for="item in list" :key="item.name">{{item.name}}</li>
        </template>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data() {
        return {
          list: [{ flag: true,  name: '战三' }, { flag: false,  name: '李四' } ]
        }
      }
    })
    console.log(app.$options.render)
  </script>
</body>
```

**两者同层级时，渲染函数如下**

```js
with(this){return _c('div',{attrs:{"id":"app"}},[_c('ul',_l((list),function(item){return (item.flag)?_c('li',{key:item.name},[_v(_s(item.name))]):_e()}),0)])}
}
```

**两者不同层级时，渲染函数如下**

```js
with(this){return _c('div',{attrs:{"id":"app"}},[_c('ul',[(list.length>0)?_l((list),function(item){return _c('li',{key:item.name},[_v(_s(item.name))])}):_e()],2)])}
}
```

结论：

1. `v-for比v-if`优先被解析
2. 如果同时出现，每次渲染都会先执行循环在判断条件，无论如何循环都避免不了，浪费性能
3. 要避免这种情况，在外层嵌套一层`template`。在这一层做`v-if`判断，然后再内部执行 for循环

#### 2、`Vue`组件`data`为什么必须是个函数而`Vue`的根实例则没有此限制?

源码中找答案：`src\core\instance\state.js initState()`

![image-20210724113206358](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724113206358.png)

测试：

```js
<body>
  <div id="app">
    <p>{{count}}</p>
    <child></child>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script>
    Vue.component('child', {
      template: `<div>{{count2}}</div>`,
      data: {
        count2: 22 
	// 报错：[Vue warn]: The "data" option should be a function that returns a per-instance value in component definitions.
      }
    })
    const app = new Vue({
      el: "#app",
      data: {
        count: 1
      }
    })
  </script>
</body>
```

结论：

`Vue`组件可能存在多个实例，如果使用对象形式定义data，则会导致它们共用一个data对象，那么状态变更将会影响所有组件实例，这是不合理的;采用函数形式定义，在`initData`时会将其作为工厂函数返回全新data对象，有效规避多实例之间状态污染问题。而在`Vue`根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不需要担心这种情况。

#### 3、你知道vue中key的作用和工作原理吗?说说你对它的理解。

源码中找答案：`\src\core\vdom\patch.js updateChildren()`

测试：

```html
<body>
  <div id="app">
    <ul>
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: "#app",
      data() {
        return {
          list: ['a', 'b', 'c', 'd', 'e']
        }
      },
      created() {
        setTimeout(() => {
          this.list.splice(2, 0, 'f')
        }, 2000)
      }
    })
  </script>
</body>
```

视图：

![image-20210724125725726](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724125725726.png)

不使用key:

![image-20210724125818691](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210724125818691.png)

使用key

```js
//首次循环Patch A
A B C D E
A B F C D E
//第二次循环Patch
B B C D E
B F C D E
//第三次循环Patch
E C D E
F C D E
//第四次循环Patch
D C D
F C D
//第五次循环Patch
C C
F C
//sh.余部处理结束..newsh.史剩下的...创建并插入到C.煎面
```

结论：

1. `key`的作用主要是为了高效的更新虚拟`DOM`，其原理是`vue`,在 `patch`过程中通过` key`可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少 `DOM`操
2. 2.另外，若不设置 `key`还可能在列表更新时引发一些隐蔽的`bug `
3. `vue`中在使用相同标签名元素的过渡切换时，也会使用到 key属性，其目的也是为了让`vue`可以区分它们，否则`vue,`只会替换其内部属性而不会触发过渡效果。