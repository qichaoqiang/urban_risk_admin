import router from './router/index'
import storage from 'good-storage'
import store from './store/index'

router.beforeEach((to, from, next) => {
	if(storage.get('access_token_v2_')) {
		if(store.state.hasMenu) {
			document.title = to.meta.title;
			next()
		}else {
			let { yhlx, fxylb } = storage.get('userInfo')
			let menu
			let path_ = store.state.path[fxylb]
			if(yhlx == 2) {
				menu = [{
					path: '/info',
					name: 'info',
					icon: 'el-icon-tickets',
					meta: {
						title: '企业信息',
					},
					component: resolve => require([`@/views/baseInfo/index.vue`], resolve),
					children: [
						{
							name: 'baseInfo',
							path: '/baseInfo',
							meta: {
								title: '基本信息',
								parent: 'info'
							},
							component: resolve => require([`@/views/baseInfo/view/${path_}/base.vue`], resolve),
						},
						{
							name: 'riskInfo',
							path: '/riskInfo',
							meta: {
								title: '风险信息',
								parent: 'info'
							},
							component: resolve => require([`@/views/baseInfo/view/${path_}/risk.vue`], resolve),
						}
					]
				}]
			}else {
				let authList = storage.get('authList') || []
				menu = []
				menu.push({
					name: 'overview',
					path: '/overview',
					icon: 'el-icon-s-data',
					meta: {
						title: '总览',
					},
					component: resolve => require(['@/views/overview/index'], resolve),
				})
				if(authList.includes('xiangmu')) {
					menu.push({
						name: 'city',
						path: '/city',
						icon: 'el-icon-notebook-1',
						meta: {
							title: '项目管理',
						},
						component: resolve => require(['@/views/city/index'], resolve),
					})
				}
				menu.push({
					name: 'map',
					path: '/map',
					icon: 'el-icon-s-unfold',
					meta: {
						title: '地图管理',
					},
					component: resolve => require(['@/views/map/index'], resolve),
					children: [
						{
							name: 'risk_source',
							path: '/risk_source',
							meta: {
								title: '风险源分布',
								parent: 'map'
							},
							component: resolve => require(['@/views/map/risk_source'], resolve),
						},
						{
							name: 'risk_area',
							path: '/risk_area',
							meta: {
								title: '风险区域',
								parent: 'map'
							},
							component: resolve => require(['@/views/map/risk_area'], resolve),
						}
					]
				})
				if(authList.includes('juese') || authList.includes('guanliyuan') || authList.includes('caijizhanghao')) {
					let item = {
						name: 'user',
						path: '/user',
						icon: 'el-icon-s-custom',
						meta: {
							title: '用户管理',
						},
						component: resolve => require(['@/views/user/index'], resolve),
						children: []
					}
					if(authList.includes('juese')) {
						item.children.push({
							name: 'user_character',
							path: '/user_character',
							meta: {
								title: '角色管理',
								parent: 'user'
							},
							component: resolve => require(['@/views/user/role'], resolve),
						})
					}
					if(authList.includes('guanliyuan')) {
						item.children.push({
							name: 'user_account',
							path: '/user_account',
							meta: {
								title: '管理员账号管理',
								parent: 'user'
							},
							component: resolve => require(['@/views/user/admin'], resolve),
						})
					}
					if(authList.includes('caijizhanghao')) {
						item.children.push({
							name: 'qy_account',
							path: '/qy_account',
							meta: {
								title: '采集账号管理',
								parent: 'user'
							},
							component: resolve => require(['@/views/user/qyAccount'], resolve),
						})
					}
					menu.push(item)
				}
				if(authList.includes('quyu') || authList.includes('fengxianyuanleibie')) {
					let item =  {
						name: 'system',
						path: '/system',
						icon: 'el-icon-s-tools',
						meta: {
							title: '系统设置',
						},
						component: resolve => require(['@/views/system/index'], resolve),
						children: [
							// {
							// 	name: 'system_dept',
							// 	path: '/system_dept',
							// 	meta: {
							// 		title: '部门管理',
							// 		parent: 'system'
							// 	},
							// 	component: resolve => require(['@/views/system/department'], resolve),
							// },
							// {
							// 	name: 'system_riskRules',
							// 	path: '/system_riskRules',
							// 	meta: {
							// 		title: '风险评估标准',
							// 		parent: 'system'
							// 	},
							// 	component: resolve => require(['@/views/system/riskRules'], resolve),
							// }
						]
					}
					if(authList.includes('quyu')) {
						item.children.push({
							name: 'system_area',
							path: '/system_area',
							meta: {
								title: '区域管理',
								parent: 'system'
							},
							component: resolve => require(['@/views/system/area'], resolve),
						})
					}
					if(authList.includes('fengxianyuanleibie')) {
						item.children.push({
							name: 'system_riskSourceType',
							path: '/system_riskSourceType',
							meta: {
								title: '风险源类别',
								parent: 'system'
							},
							component: resolve => require(['@/views/system/riskType'], resolve),
						})
					}
					menu.push(item)
				}
			}
			router.addRoutes([{
				path: '/',
				name: '_home',
				redirect: yhlx == 2 ? '/baseInfo' : '/city',
				component: resolve => require(['@/components/main/main.vue'], resolve),
				meta: {
					hideInMenu: true,
					notCache: true
				},
				children: [
					{
						path: '/base',
						name: 'base',
						meta: {
							hideMenu: true,
							hideInMenu: true,
							title: '首页',
							notCache: true,
							icon: 'md-home'
						},
						component: resolve => require([`@/views/base/view/${path_}/index.vue`], resolve),
					}, {
						path: '/editInfo',
						name: 'editInfo',
						component: resolve => require(['@/views/city/components/index.vue'], resolve),
						meta: {
							hideInMenu: true,
							notCache: true,
							title: '登录'
						},
					},
					...menu
				]
			}])
			storage.set('menu', menu)
			document.title = to.meta.title;
			store.commit('update_hasMenu', true)
			next({ ...to, replace: true })
		}
	}else {
		if(!storage.get('redirectToLogin')) {
			storage.set('redirectToLogin', true)
			next({
				path: '/login',
				replace: true
			})
		}else {
			next()
		}
	}
})