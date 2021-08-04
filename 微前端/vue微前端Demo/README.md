# qiankun-navigation



## 项目介绍

- 本项目采用 vue + qiankun 实践微前端落地。同时qiankun是一个开放式微前端架构，支持当前三大前端框架甚至jq等其他项目无缝接入。

- 主应用和子应用都是使用 `history` 路由模式。
- 主应用不仅只是`微前端`的基座，它也有自己的业务承载，实现在主应用自己的页面和子应用的页面自由跳转。
- 主/子应用，都是使用 `vue-cli 4` 下创建的`vue`项目，单独运行项目命令，请参照 [Vue CLI 官方文档](https://cli.vuejs.org/zh/guide/prototyping.html)

## 主要技术栈

- 前端框架：Vue 2.x
- 微前端框架: qiankun 2.x
- 页面组件：Element 2.x
- 状态管理：Vuex 3.x
- 后台交互：axios 0.21.x

## 主要开发环境及版本

- IDE : VS Code 1.56
- NODE: Node 12.18.x
- NPM : NPM 6.14.x

## 项目结构及模块介绍

```
├─bin                                整个项目的打包，运行执行目录
│  ├─install.js                      安全所有项目依赖
│  ├─start.js                        启动dev项目
│  └─build.js                        打包所有项目
| 
├─master                             主应用
│  ├─src               
│  │  ├─asssets                       静态资源
│  │  ├─components                    组件库
│  │  ├─config                        项目公共配置目录
│  │  ├─core                          项目初始化目录
│  │  	├─registerBar.js              注册qiankun子应用
│  │  	└─render.js                   vue初始化    
│  │  ├─icons                         svg图标配置
│  │  ├─router                        路由管理模块
│  │  ├─survice                       mock模拟接口请求
│  │  ├─store                         状态管理模块
│  │  ├─utils                         通用的工具方法
│  │  ├─views                         页面视图组件
│  │  ├─permission.js                 权限控制模块，处理权限认证逻辑
│  │  └─ ...                          更多vue目录
│  │
│
├─bar-element						  子应用
│  ├─src                    
│  │  └─...                 
│
├─bar-table               			  子应用
│  ├─src                    
│  │  └─...          
│
│
├─bar-toolslibrary         		      子应用
│  ├─src                    
│  │  └─...          

├─package.json          整个微前端服务模块描述文件
├─README.md             README 文件
```

## 安装/运行/打包方式

```bash
# install dependencies
npm run install-all

# serve with hot reload at localhost:8080
npm run serve-all

# build for production with minification
npm run build-all
```

## 功能列表

- 系统登录：系统用户登录，系统登录认证（token方式）
- 主题切换：包括颜色、布局（水平/垂直）、头部设置（固定/不固定）、多标签设置（开启/不开启）

## 其他说明

- 端口配置
  - 主应用默认端口为3000，子应用端口分别为2000，2001，2001，若想修改端口，需要到各应用的 vue.config.js 下修改 port 属性。若修改的是子应用端口，则需同时修改主应用main.js中的子应用配置入口。

