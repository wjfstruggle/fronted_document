import { useEffect, useState } from 'react'
import { SearchPanel } from './search-panel'
import { List } from './list'
import qs from 'qs'
import { cleanObject, useMount, useDebounce } from 'utils/utils'

// 使用 JS 的同学，大部分的错误都是在runtime（运行时）的时候发现的
// 我们希望在静态代码中就能找到其中一些错误欧 ---》 强类型
const api = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  const debounceParam = useDebounce(param, 1000)

  useEffect(() => {
    fetch(`${api}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam])

  useMount(() => {
    fetch(`${api}/users`).then(async response => {
      console.log('response', response)
      if (response.ok) {
        setUsers(await response.json())
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}