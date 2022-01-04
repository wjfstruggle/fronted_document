import Mock from 'mockjs'
type MsgType = string | number
const success = (msg:MsgType = '',data?: any) => {
  // 这里定义一个成功返回的统一方法，返回我们在axios封装时指定的三个字段
  return {
    code: 0,
    msg,
    data
  }
}
const error = (code: number, msg: MsgType = '', data?: any) => {
  // 再定义一个返回错误状态的方法，一个必传参数是code，即错误码
  return {
    code,
    msg,
    data
  }
}
interface PostResInterface {
  body: string
  type: 'POST'
  url: string
}
Mock.mock(/\/api\/apis\/login/, loginRes)
function loginRes(req:PostResInterface) {
  console.log(req);
  return success();
  
}