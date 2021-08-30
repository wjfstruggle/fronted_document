import { FormEvent } from 'react'
import { Link } from "react-router-dom";

export const LoginScreen = () => {
  // FormEvent<HTMLFormElement>
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(event.currentTarget.elements[0])
    // const userName = (event.currentTarget.elements[0] as HTMLInputElement).value
    // const password = (event.currentTarget.elements[1] as HTMLInputElement).value
  }
  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="userName">用户名</label>
      <input type="text" id={'userName'} />
    </div>
    <div>
      <label htmlFor="password">密码</label>
      <input type="text" id={'password'} />
    </div>
    <button type={'submit'}>登录 <Link to="/list"></Link></button>
  </form>
  )
}