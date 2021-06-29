/**
 * 描述：Localstorage工具类
 * @author hgw
 *
 * 按照序号，方法目录如下（添加新方法，序号自增）：
 * 1、描述：存储localStorage
 * 2、描述：获取localStorage
 * 3、描述：删除localStorage
 * */


/**
 * 1、描述：存储localStorage
 * @param name 键值key，储存的字段名称
 * @param content 存储内容
 */
 export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 2、描述：获取localStorage
 * @param name 键值key，储存的字段名称
 */
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 3、描述：删除localStorage
 * @param name 键值key，储存的字段名称
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
/**
 * 4、描述：存储sessionStorage
 * @param name 键值key，储存的字段名称
 * @param content 存储内容
 */
export const SessionSetStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 5、描述：获取sessionStorage
 * @param name 键值key，储存的字段名称
 */
export const SessionGetStore = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}

/**
 * 6、描述：删除sessionStorage
 * @param name 键值key，储存的字段名称
 */
export const SessionRemoveStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}