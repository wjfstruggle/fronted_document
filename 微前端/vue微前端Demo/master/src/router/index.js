import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const _import = require('./import-' + process.env.NODE_ENV)

import Layout from "@/views/Layouts";

export const commontRouterMap = [
    {
        path: "/login",
        hidden: true,
        component: _import('Common/Login/index')
    },
    {
        path: '/401',
        name: '401',
        component: _import('Common/Error/401'),
        hidden: true,
    },
    {
        path: '/404',
        name: '404',
        component: _import('Common/Error/404'),
        hidden: true,
    },
    {
        path: '/',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                name: 'index',
                component: _import('Modules/Home/index'),
                meta: {
                    title: '首页',
                    icon: 'el-icon-menu',
                    affix: true,
                },
            },
        ],
    },
];


//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
    {
        path: "/index",
        component: Layout,
        meta: { title: "首页", icon: "el-icon-menu", affix: true, }
    },
    {
        path: "/toolslibrary",
        component: Layout,
        name: "toolslibrary",
        meta: { title: "工具库", icon: "el-icon-tickets", role: ['0', '1', '2'], isMicrApp: true },
        children: [{
            path: "DateTime",
            name: "datetime",
            meta: { title: "日期转换", role: ['0'], isMicrApp: true },
        },
        {
            path: "PreventReclick",
            name: "preventreclick",
            meta: { title: "防止重复点击", role: ['0', '1', '2'], isMicrApp: true }
        },
        {
            path: "Validate",
            name: "validate",
            meta: { title: "常见字段校验", role: ['0', '1', '2'], isMicrApp: true }
        }
        ]
    },
    {
        path: "/element",
        component: Layout,
        name: "element",
        meta: { title: "组件库", icon: "el-icon-tickets", role: ['0', '1', '2'], isMicrApp: true },
        children: [
            {
                path: "HeaderFilter",
                name: "headerFilter",
                meta: { title: "搜索框", role: ['0'], isMicrApp: true },
            },
            {
                path: "VerificationCode",
                name: "verificationCode",
                meta: { title: "图片验证", role: ['0'], isMicrApp: true },
            },
            {
                path: "UploadFiles",
                name: "uploadFiles",
                meta: { title: "文件上传", role: ['0'], isMicrApp: true },
            },
        ]
    },
    {
        path: "/table",
        component: Layout,
        name: "table",
        meta: { title: "表格样式", icon: "el-icon-tickets", role: ['0', '1'], isMicrApp: true },
        children: [{
            path: "example",
            name: "example",
            meta: { title: "表格基础样式", role: ['0'], isMicrApp: true }
        },
        {
            path: "example2",
            name: "example2",
            meta: { title: "表格基础功能", role: ['0'], isMicrApp: true }
        }]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true,
    },
];

const createRouter = () => new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: commontRouterMap
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

/**
 *
 * 从子项目页面跳转到主项目自身的页面时，主项目页面的 css 未加载的 bug
 * 产生这个问题的原因是：在子项目跳转到父项目时，子项目的卸载需要一点点的时间，在这段时间内，父项目加载了，插入了 css，但是被子项目的 css 沙箱记录了，然后被移除了。
 * 父项目的事件监听也是一样的，所以需要在子项目卸载完成之后再跳转。
 *
 * 临时解决办法：先复制一下 HTMLHeadElement.prototype.appendChild 和 window.addEventListener ，
 * 路由钩子函数 beforeEach 中判断一下，如果当前路由是子项目，并且去的路由是父项目的，则还原这两个对象.
 */
const childRoute = ['/element', '/table', '/toolslibrary'];
const isChildRoute = path => childRoute.some(item => path.startsWith(item))
const rawAppendChild = HTMLHeadElement.prototype.appendChild;
const rawAddEventListener = window.addEventListener;

router.beforeEach((to, from, next) => {
    // 从子项目跳转到主项目
    if (isChildRoute(from.path) && !isChildRoute(to.path)) {
        HTMLHeadElement.prototype.appendChild = rawAppendChild;
        window.addEventListener = rawAddEventListener;
    }
    next();
});

export default router
