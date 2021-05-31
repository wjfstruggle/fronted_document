import Mock from 'mockjs'

//拦截请求生成随机数据
Mock.mock('/list/arr', {
  id:"@id()",
  username:"@cname()",
  avatar:"@image('200*200','red','#fff','avatar')",
  description:"@paragraph()",
  ip:"@ip()",
  email:"@email()"        
})