function reactive(obj) {
  return new Proxy(obj, {
    get(target,key){
      console.log('get', target[key])
      return target[key]
    },
    set(target,key,val){
      // notify
      console.log('set', target[key])
      target[key] = val
    },
    deleteProperty(target,key){
      console.log('deleteProperty', target[key])
      delete target[key]
    },
  })
}
const state = reactive({
  foo:'foo'
})
state.foo
state.foo = 'foooo'
delete state.foo