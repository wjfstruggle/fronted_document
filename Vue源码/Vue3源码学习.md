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

#### `vue3`源码学习

迁出`Vue3`源码： `git clone https://github.com/vuejs/vue-next.git`

安装依赖： `npm i --ignore-scripts`

⽣成`sourcemap`⽂件，`package.json`

```json
"dev": "node scripts/dev.js --sourcemap"
```

编译： `npm run dev`

⽣成结果：

- `packages\vue\dist\vue.global.js `

- `packages\vue\dist\vue.global.js.map`

调试范例代码： `npm run serve`

##### `vue3`源码架构

![image-20210801104402803](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210801104402803.png)

##### 初始化流程

![image-20210801104742211](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210801104742211.png)																	`vue3`初始化流程

`createApp()`是如何创建`vue`实例的；创建的`vue`实例执⾏`mount()`都做了些什么。

测试代码

```js
<div id="app">
  <h3>{{title}}</h3>
</div>
  <script src="../dist/vue.global.js"></script>
  <script>
    const { createApp } =  Vue
    const app = createApp({
      data() {
        return {
          title:'vue3初始化流程'
        }
      }
    }).mount("#app")
  </script>
```

断点调试`createApp()`

` ensureRenderer() => renderer => createApp() createAppAPI() => createApp `

`app.mount() => render() => patch() => processComponent() => mountComponent() => setupComponent() => setupRenderEffect()`

执⾏流程

`createApp()`

`packages/runtime-dom/src/index.ts`

创建`vue`实例、扩展`mount`⽅法

`createRenderer()/baseCreateRenderer()`

![image-20210801141904075](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210801141904075.png)

`packages/runtime-core/src/renderer.ts`

`创建renderer对象，它对外暴露3个重要⽅法 render , hydrate , createApp ，其中 render ,和 hydrate 的实际 使⽤者是createApp()返回的vue实例对象。`

![image-20210801142159189](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210801142159189.png)

`packages/runtime-core/src/apiCreateApp.ts`

返回⽣产`vue`实例的`createApp`函数。

![image-20210801142539639](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210801142539639.png)

- `render`的使⽤者是`vue`实例的mount⽅法 

- 我们发现`component()/directive()/use()/mixin()`这些⽅法都变成了实例⽅法，它们也会返回实例本身，链式 调⽤成为可能。

```js
createApp({})
 .component('comp', { template: '<div>this is comp</div>' })
 .directive('focus', { mounted(el) { el.focus() } })
 .mount('#app')
```

`mount(rootContainer: HostElement, isHydrate?: boolean)`

` packages/runtime-core/src/apiCreateApp.ts` 将 `createApp(rootComponent) `中传⼊的根组件转换为`vnode`，然后渲染到宿主元素`rootContainer`中。

`render(vnode, container)` 将传⼊`vnode`渲染到容器`container`上。

```js
`packages/runtime-core/src/apiCreateApp.ts` 233行
// 转换vnode逻辑
if (isHydrate && hydrate) {
// ssr
hydrate(vnode as VNode<Node, Element>, rootContainer as any)
} else {
// spa
render(vnode, rootContainer)
}
```

`patch(n1, n2, container) `将传⼊的虚拟节点 n1 跟 n2 进⾏对⽐，并转换为dom操作。初始化时 n1 并不存在，因此操作将是⼀次dom创建。 

`mount(rootContainer) `

`packages/runtime-core/src/apiCreateApp.ts`

 执⾏根组件挂载，创建其`vnode`，并将它render()出来 

`render()`



`packages/runtime-core/src/renderer.ts` 执⾏补丁函数patch()将vnode转换为dom。 

`patch(n1, n2, container) `

```js
 // 向下递归更新
 // 首次是完整递归创建
 patch(
     null,
     subTree,
     container,
     anchor,
     instance,
     parentSuspense,
     isSVG
 )
 if (__DEV__) {
 endMeasure(instance, `patch`)
 }
 initialVNode.el = subTree.el
```

`packages/runtime-core/src/renderer.ts `

根据n2的类型执⾏相对应的处理函数。对于根组件，执⾏的是`processComponent() `

`processComponent()`

```js
if (shapeFlag & ShapeFlags.ELEMENT) {
    processElement(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        optimized
        )
    } else if (shapeFlag & ShapeFlags.COMPONENT) {
        // 初始化走这里
        processComponent(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        optimized
    )
```

`packages/runtime-core/src/renderer.ts`

 执⾏组件挂载或更新，由于⾸次执⾏时n1为空，因此执⾏组件挂载逻辑辑`mountComponent()`

`mountComponent()` 

```js
 if (n1 == null) {
     // 挂载
     if (n2.shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
         ;(parentComponent!.ctx as KeepAliveContext).activate(
             n2,
             container,
             anchor,
             isSVG,
             optimized
         )
     } else {
         // 没有缓存走这里
         // mountComponent：
         // 1.udpateComponent
         // 2.new Watcher
         mountComponent(
             n2,
             container,
             anchor,
             parentComponent,
             parentSuspense,
             isSVG,
             optimized
         )
     }
```

`packages/runtime-core/src/renderer.ts `

创建组件实例，执⾏`setupComponent()`设置其数据状态，其中就包括setup()选项的执⾏

```js
   // 2.组件实例安装，相当于组件初始化，this._init
    // 属性声明，响应式等等
    setupComponent(instance)
    if (__DEV__) {
      endMeasure(instance, `init`)
    }
```

##### setup()如何⽣效

在`vue3`中如果要使⽤`composition-api`，就需要写在`setup()`中，它是如何⽣效并和`options-api`和谐共处的？

测试代码

```js
  <div id="app">
    <h3>{{title}}</h3>
  </div>
  <script src="../dist/vue.global.js"></script>
  <script>
    const { createApp ,ref} =  Vue
    const app = createApp({
      setup() {
        const title = 'vue3初始化流程'
        return {
          title
        }
      }
    }).mount("#app")
  </script>
```

执⾏过程

根组件执⾏挂载mount()时，执⾏渲染函数render()获取组件vnode，然后执⾏补丁函数patch()将其转换为真实 dom，对于组件类型会调⽤processComponent()，这⾥会实例化组件并处理其setup选项。

![image-20210801144811396](C:\Users\wujf\AppData\Roaming\Typora\typora-user-images\image-20210801144811396.png)

setupComponent()

`packages/runtime-core/src/component.ts`

初始化props、slots和data

setupStatefulComponent(instance, isSSR) 

`packages/runtime-core/src/component.ts`

 代理组件实例上下⽂，调⽤setup() setup()会接收两个参数，分别是props和setupContext，可⽤于获取属性、插槽内容和派发事件

```js
createApp({
props: ['bar'], // 属性依然需要声明
setup(props) {
 // 作为setupResult返回
 return { bar: props.bar }
 }
// 传⼊rootProps
}, {bar: 'bar'}).mount('#app')
```

`handleSetupResult(instance, setupResult, isSSR)`
`packages/runtime-core/src/component.ts`
处理setup返回结果，如果是函数则作为组件的渲染函数，如果是对象则对其做响应化处理。

### `Vue3`源码解析02

1. composition-api体验
2. Vue3响应式源码
3. 响应式原理：Vue2 vs Vue3
4. 造轮⼦

composition-api  [文档](https://vue-composition-api-rfc.netlify.com )

初体验

```js
<div id="app">
    <button @click="add">点击 {{count}}</button>
    {{count}}
    <ul>
      <li v-for="(item,index) in lists" :key="index">
        <div>{{item.title}}</div>
        <div>{{item.content}}</div>
      </li>
    </ul>
  </div>
  <script src="../dist/vue.global.js"></script>
  <script>
    const {createApp, ref, onMounted,onUnmounted,toRefs,reactive,computed} = Vue
    function useTab() {
      const state = reactive({
        list:[
          {index:0,title:'首页','content':'新闻首页'},
          {index:1,title:'新闻','content':'新闻多督导'},
          {index:2,title:'热门','content':'热门赛事'},
        ],
        obj:{},
        count:1
      })
      // 点击事件
      const add = ()=> {
        state.count++
      }
      // 计算属性
      const lists = computed(() => {
        return state.list.filter(item => item.index == 1 || item.index == 2)
      })
      return {
        add,
        lists,
        state
      }
    }
    const app = createApp({
      setup() {
        const {add,lists,state} = useTab()
        onMounted(() => {
          setInterval(() => {
            state.count ++
          }, 1000);
        })
        onUnmounted(() => {
          clearInterval()
        })
        return {
          add,
          lists,
          ...toRefs(state)
        }
      }
    }).mount("#app")
  </script>
```

更多组合式api的用法，看这篇文章  [Vue3知识点,组合式api的使用](https://juejin.cn/post/6979509256881963039)

