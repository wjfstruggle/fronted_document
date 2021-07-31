### `Vue3`源码解析01

1. `vue3`初体验
2. `vue3`设计理念
3. ⼿写实现初始化流程
4. 调试环境准备 
5. 初始化流程分析
6. ⾃定义渲染器实战

#### `vue3`初体验

```js
<div id="app">
    {{title}}
 </div>
  <script src="http://unpkg.com/vue@next"></script>
  <script>
    // 1.创建实例
    // vue2: new Vue()
    // vue3: createApp()
    const { createApp } = Vue
    // 传入根组件配置
    const app = createApp({
      data() {
        return {
          title: 'hello,vue3!'
        }
      },
    }).mount('#app')
  </script>
```

composition写法：

```js
<div id="app">
    {{title}}
 </div>
  <script src="http://unpkg.com/vue@next"></script>
  <script>
    const { createApp,ref } = Vue
    const app = createApp({
      setup() {
        const title = ref('hello,vue3!')
        return {
          title
        }
      },
    }).mount('#app')
  </script>
```

#### `vue3`设计理念

- 类型⽀持更好 
- 利于`tree-shaking `
- `API`简化、⼀致性：`render`函数，`sync`修饰符，指令定义等 
- 复⽤性：`composition api `
- 性能优化：响应式、编译优化 
- 扩展性：⾃定义渲染器

#### ⼿写`vue3`初始化

整体思路

![image-20210731225820801.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9509248548f94a60bfd6e962857c7410~tplv-k3u1fbpfcp-watermark.image)

基本结构

**`createApp`创建`Vue`实例，它拥有⼀个`mount`⽅法负责初始化**

```js
<script>
  const Vue = {
    createApp() {
     return {
        mount(selector){}
     }
    }
  }
</script>
```

挂载

**将传⼊根组件配置转换为`dom`并追加到宿主元素上,选项中只有数据，往哪放数据并不知道，这⾥就需要编译出render选项**

```js
const Vue = {
    createApp(options) {
        return {
            mount(selector){
                const parent = document.querySelector(selector);
                if(!options.render) {
                    options.render = this.compile(parent.innerHTML)
                }
                const el = options.render.call(options.data())
                parent.innerHTML = ''
                parent.appendChild(el)
            },
            // 将options转换为dom并追加到宿主
            // 获取模板，将数据绑上去
            // 模板是有编译函数编译而来
            compile(template) {
                // template => ast => generate
                return function render() {
                    const h3 = document.createElement("h3")
                    // 注意上下文
                    h3.textContent = this.title;
                    return h3
                }
            }
        }
    }
}
```

兼容`vue2.x`

如果⽤户⽤的是`setup`写法哪？ 此时应该先执⾏`setup`，然后再处理其他选项，这样兼容了`vue 2.x的api`。

```js
 // 处理vue2 options选项
if(options.setup) {
    // 存入app实例上
    this.setupState = options.setup()
}else {
    this.data = options.data()
}
// proxy代理,// 设置render上下文
this.proxy = new Proxy(this, {
    get(target,key){
        // 优先从setupState上获取，其次是data
        if(key in target.setupState) {
            return target.setupState[key]
        }else {
            return target.data[key]
        }
    },
    set(target,key,val){
        if(key in target.setupState) {
            target.setupState[key] = val
        }else {
            target.data[key] = val
        }
    },
})
if(!options.render) {
    options.render = this.compile(parent.innerHTML)
}
// const el = options.render.call(options.data())
const el = options.render.call(this.proxy)
```

扩展性

如何做到不同平台的扩展性？可以抽象出⼀个渲染器概念，不同平台做相应操作。

```js
const Vue = {
      // 创建渲染器
      // opts中传入节点相关操作
      createRenderer({querySelector, insert}) {
        // createApp实际上由渲染器实现
        return {
          createApp(options) {
            // 返回应用程序实例app
            return {
              // 传入宿主
              mount(selector) {
                // 传入的宿主获取
                const parent = querySelector(selector)

                // 处理vue2 options选项
                if (options.setup) {
                  // 存入app实例上
                  this.setupState = options.setup()
                }
                if (options.data) {
                  this.data = options.data()
                }

                // 设置render上下文
                this.proxy = new Proxy(this, {
                  get(target, key) {
                    // 优先从setupState上获取，其次是data
                    if (key in target.setupState) {
                      return target.setupState[key]
                    } else {
                      return target.data[key]
                    }
                  },
                  set(target, key, val) {
                    if (key in target.setupState) {
                      target.setupState[key] = val
                    } else {
                      target.data[key] = val
                    }
                  }
                })

                // 将options转换为dom并追加到宿主
                // 获取模板，将数据绑上去
                // 模板是有编译函数编译而来
                if (!options.render) {
                  options.render = this.compile(parent.innerHTML)
                }
                const el = options.render.call(this.proxy)
                parent.innerHTML = ''
                // parent.appendChild(el)
                insert(el, parent)
              },
              compile(template) {
                // template => ast => generate
                return function render() {
                  const h3 = document.createElement('h3')
                  // 注意上下文
                  h3.textContent = this.title
                  return h3
                }
              }
            }
          }
        }
      },
      // 传入根组件配置
      createApp(options) {
        // 1.根据当前web平台创建一个renderer
        const renderer = Vue.createRenderer({
          querySelector(sel) {
            return document.querySelector(sel)
          },
          insert(child, parent, anchor) {
            parent.insertBefore(child, anchor || null)
          }
        })
        return renderer.createApp(options)
      }
    }
```

