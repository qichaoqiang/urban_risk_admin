import { path } from './path.js'
console.log(path)

const path_ = path

const menu = [
	// {
	// 	name: 'overview',
	// 	path: '/overview',
	// 	icon: 'md-book',
	// 	meta: {
	// 		title: '总览',
	// 	},
	// 	component: resolve => require(['@/views/overview/index'], resolve),
	// },
	{
		path: '/info',
		name: 'info',
		icon: 'ios-barcode',
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
				component: resolve => require([`@/views/baseInfo/${path_}/base.vue`], resolve),
			},
			{
				name: 'riskInfo',
				path: '/riskInfo',
				meta: {
					title: '风险信息',
					parent: 'info'
				},
				component: resolve => require([`@/views/baseInfo/${path_}/risk.vue`], resolve),
			}
		]
	},
	{
		name: 'city',
		path: '/city',
		icon: 'ios-podium',
		meta: {
			title: '项目管理',
		},
		component: resolve => require(['@/views/city/index'], resolve),
	},
	{
		name: 'map',
		path: '/map',
		icon: 'md-reorder',
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
	},
	{
		name: 'user',
		path: '/user',
		icon: 'ios-people',
		meta: {
			title: '用户管理',
		},
		component: resolve => require(['@/views/user/index'], resolve),
		children: [
			{
				name: 'user_character',
				path: '/user_character',
				meta: {
					title: '角色管理',
					parent: 'user'
				},
				component: resolve => require(['@/views/user/role'], resolve),
			},
			{
				name: 'user_account',
				path: '/user_account',
				meta: {
					title: '管理员账号管理',
					parent: 'user'
				},
				component: resolve => require(['@/views/user/admin'], resolve),
			},
			{
				name: 'qy_account',
				path: '/qy_account',
				meta: {
					title: '采集账号管理',
					parent: 'user'
				},
				component: resolve => require(['@/views/user/qyAccount'], resolve),
			}
		]
	},
	{
		name: 'system',
		path: '/system',
		icon: 'md-settings',
		meta: {
			title: '系统设置',
		},
		component: resolve => require(['@/views/system/index'], resolve),
		children: [
			{
				name: 'system_area',
				path: '/system_area',
				meta: {
					title: '区域管理',
					parent: 'system'
				},
				component: resolve => require(['@/views/system/area'], resolve),
			},
			{
				name: 'system_dept',
				path: '/system_dept',
				meta: {
					title: '部门管理',
					parent: 'system'
				},
				component: resolve => require(['@/views/system/department'], resolve),
			},{
				name: 'system_riskSourceType',
				path: '/system_riskSourceType',
				meta: {
					title: '风险源类别',
					parent: 'system'
				},
				component: resolve => require(['@/views/system/riskType'], resolve),
			},
			{
				name: 'system_riskRules',
				path: '/system_riskRules',
				meta: {
					title: '风险评估标准',
					parent: 'system'
				},
				component: resolve => require(['@/views/system/riskRules'], resolve),
			}
		]
	}
]

export default menu