## 组合式 API 基础

在 Vue 组件中，我们将此位置称为 `setup`。

### [#](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#setup-组件选项)`setup` 组件选项

新的 `setup` 组件选项在创建组件**之前**执行，一旦 `props` 被解析，就作为组合式 API 的入口点。

- 由于在执行 `setup` 时，组件实例尚未被创建，因此在 `setup` 选项中没有 `this`。这意味着，除了 `props` 之外，你将无法访问组件中声明的任何属性——**本地状态**、**计算属性**或**方法**。

### 新的生命周期

```javascript
setup(props,context) {
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
    })
    // 视图更新时渲染
    onUpdated(() => {
      console.log('onUpdated');
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })
    // 首次渲染执行
    onRenderTracked(() => {
      console.log('onRenderTracked')
    })
    // 页面重新渲染
    onRenderTriggered(() => {
      console.log('onRenderTriggered')
    })
    const name = ref('张三')
    const handelClick = () => {
      name.value = 'wujf'
    }
    return {
      name,
      handelClick
    }
```

