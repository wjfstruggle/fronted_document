import { asyncRouterMap, commontRouterMap } from "@/router";

function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return route.meta.role.includes(roles)
    } else {
        return true
    }
}

export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }

        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            if (tmp.hidden && typeof tmp.hidden !== 'boolean') {
                tmp.hidden = tmp.hidden.includes(roles) ? true : false;
            }
            res.push(tmp)
        }
    })
    return res
}

const routes = {
    states: {
        routes: commontRouterMap,
        addRouters: []
    },
    getters: {
        getrouters: state => state.routes,
        getaddRouters: state => state.addRouters
    },
    mutations: {
        SET_ROUTERS: (state, routes) => {
            state.addRouters = routes;
            state.routes = commontRouterMap.concat(routes);
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data;
                let accessedRouters = filterAsyncRoutes(asyncRouterMap, roles)
                commit("SET_ROUTERS", accessedRouters);
                resolve();
            });
        }
    }
}

export default routes