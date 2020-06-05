<template>
	<div class="user_container">
		<Row type="flex" justify="space-between" align="middle">
			<div class="title">角色管理</div>
			<Button v-if="hasAuth('juese_store')" type="primary" icon="ios-add" @click="openRoleModel"></Button>
		</Row>
		<div v-if="hasAuth('juese')">
			<Divider />
			<Form :model="searchForm" inline>
				<FormItem>
		        	<Input clearable v-model="searchForm.role_name" placeholder="角色名称"></Input>
		        </FormItem>
		        <FormItem>
	                <Button type="primary" @click="getRoleList">查询</Button>
	            </FormItem>
			</Form>
			<Table :columns="roleColumns" :data="roleData" style="margin-top: 16px">
				<template slot-scope="{ row }" slot="action">
					<Button v-if="hasAuth(`juese_show`)" type="primary" size="small" ghost style="margin-right: 5px" @click="viewRoleModel(row)">查看</Button>
					<Button v-if="hasAuth(`juese_update`)" type="primary" size="small" ghost style="margin-right: 5px" @click="editRoleModel(row)">编辑</Button>
		            <Poptip v-if="hasAuth(`juese_destroy`)" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeRole(row)">
				        <Button type="error" size="small" ghost>删除</Button>
				    </Poptip>
				</template>
			</Table>
			<Row type="flex" justify="end">
				<Page
	                size="small"
	                style="margin-top: 10px"
	                :page-size="rolePage.pageSize"
	                :total="rolePage.totalRow"
	                show-elevator
	                show-total
	                show-sizer
	                @on-change="handleChangeRolePage"
	                @on-page-size-change="handleChangeRolePageSize"
	            />
			</Row>
		</div>
		<Modal width="820" :title="`${modelTypeList[modeType - 1]}角色`" v-model="showRoleModel" @on-visible-change="roleModelChange">
			<Form :disabled="modeType == 3" :model="roleForm" label-position="left" :label-width="120">
				<FormItem label="角色名称">
		        	<Input clearable v-model="roleForm.role_name"></Input>
		        </FormItem>
		        <FormItem label="排序">
		        	<InputNumber clearable :min="0" v-model="roleForm.role_weight"></InputNumber>
		        </FormItem>
		        <FormItem label="描述">
		            <Input clearable type="textarea" v-model="roleForm.role_description"></Input>
		        </FormItem>
		        <FormItem label="权限">
		        	<div style="max-height: 400px; overflow: scroll;">
		        		<Tree ref="tree" :load-data="loadData" :data="authData" show-checkbox></Tree>
		        	</div>
		        </FormItem>
			</Form>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button v-if="modeType != 3" type="primary" size="large" @click="saveRole">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import { authData } from './auth.js'
	export default {
		name: '',
		data() {
			return {
				showRoleModel: false,
				modeType: '',
				searchForm: {
					role_name: ''
				},
				role_id: '',
				roleData: [],
				roleColumns: [
					{
                        title: '序号',
                        type: 'index',
                        fixed: 'left',
                        width: 80
                    }, {
                        title: '角色名称',
                        key: 'role_name',
                        minWidth: 100
                    }, {
                        title: '角色描述',
                        key: 'role_description',
                        minWidth: 100
                    }, {
                        title: '角色排序',
                        key: 'role_weight',
                        minWidth: 100
                    }, {
                        title: '角色添加日期',
                        key: 'created_at',
                        minWidth: 140
                    }, {
                        title: '操作',
                        slot: 'action',
                        fixed: 'right',
                        width: 200
                    }
				],
				roleForm: {
					role_name: '',
					role_weight: 0,
					role_description: '',
					role_jurisdiction: '',
				},
				rolePage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				statusList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				// authData: JSON.parse(JSON.stringify(authData)),
				authData: [],
				auth: null,
				fxylbData: [],
				role_jurisdiction: ''
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			// async getFxylbData(parent_id) {
			// 	let params = {
			// 		per_page: 1000,
			// 		page: 1,
			// 	}
			// 	params.parent_id = parent_id ? parent_id : ''
			// 	let { status_code, data } = await api.getFxylbList(params)
			// 	console.log(status_code)
			// 	if(status_code == 200) {
			// 		this.fxylbData = data.data
			// 	}else {
			// 		this.fxylbData = []
			// 	}
			// },
			async loadData (item, callback) {
				let authIds = this.role_jurisdiction.split(',')
				let list = [
					{
						title: '列表',
						id: `${item.dm}`
					}, {
						title: '添加',
						id: `${item.dm}_store`
					}, {
						title: '详情',
						id: `${item.dm}_show`
					}, {
						title: '修改',
						id: `${item.dm}_update`
					}, {
						title: '删除',
						id: `${item.dm}_destroy`
					}
				]
				list.forEach(item => {
					item.checked = authIds.includes(item.id)
				})
				let params = {
					parent_id: item.id_,
					per_page: 1000,
					page: 1,
				}
				let { status_code, data } = await api.getFxylbList(params)
				if(status_code == 200) {
					let list_ = data.data.map(item => {
						let item_ = {
							title: item.fxylbmc,
							id_: item.id,
							dm: item.dm
						}
						if(item.yzj == 1) {
							item_.loading = false
							item_.children = []
						}else {
							item_.children = [
								{
									title: '列表',
									id: `${item.dm}`
								}, {
									title: '添加',
									id: `${item.dm}_store`
								}, {
									title: '详情',
									id: `${item.dm}_show`
								}, {
									title: '修改',
									id: `${item.dm}_update`
								}, {
									title: '删除',
									id: `${item.dm}_destroy`
								}
							]
							item_.children.forEach(item => {
								item.checked = authIds.includes(item.id)
							})
						}
						return item_
					})
					console.log(list_)
					list = [...list, ...list_]
					console.log(list)
				}
				console.log(list)
				callback(list);
            },
			async getAuthList() {
				let { status_code, data } = await api.getAuthList()
				if(status_code == 200) {
					this.auth = data
					this.setAuthData()
				}
			},
			async setAuthData() {
				const map = data_ => {
					let list = []
					for(let key in data_) {
						let item = {
							title: key
						}
						if(typeof data_[key] === 'string') {
							item.id = data_[key]
						}else {
							// item.expand = true
							item.children = map(data_[key])
						}
						list.push(item)
					}
					return list
				}
				let params = {
					per_page: 1000,
					page: 1,
				}
				let { status_code, data } = await api.getFxylbList(params)
				if(status_code == 200) {
					this.fxylbData = data.data
				}else {
					this.fxylbData = []
				}
				let fxylb = {
					title: '管辖行业',
				}
				let authIds = this.role_jurisdiction.split(',')
				fxylb.children = this.fxylbData.map(item => {
					let item_ = {
						title: item.fxylbmc,
						id_: item.id,
						dm: item.dm
					}
					if(item.yzj == 1) {
						item_.loading = false
						item_.children = []
					}else {
						item_.children = [
							{
								title: '列表',
								id: `${item.dm}`
							}, {
								title: '添加',
								id: `${item.dm}_store`
							}, {
								title: '详情',
								id: `${item.dm}_show`
							}, {
								title: '修改',
								id: `${item.dm}_update`
							}, {
								title: '删除',
								id: `${item.dm}_destroy`
							}
						]
						item_.children.forEach(item => {
							item.checked = authIds.includes(item.id)
						})
					}
					return item_
				})
				let childrenList = [
					{
						title: '列表',
						id: `fxylb`
					}, {
						title: '添加',
						id: `fxylb_store`
					}, {
						title: '详情',
						id: `fxylb_show`
					}, {
						title: '修改',
						id: `fxylb_update`
					}, {
						title: '删除',
						id: `fxylb_destroy`
					}
				]
				childrenList.forEach(item => {
					item.checked = authIds.includes(item.id)
				})
				fxylb.children = [...childrenList, ...fxylb.children]
				let auth = map(this.auth)
				this.authData = [...auth, fxylb]
			},
			handleChangeRolePage(val) {
				this.rolePage.pageIndex = val
				this.getRoleList()
			},
			handleChangeRolePageSize(val) {
				this.rolePage.pageSize = val
				this.getRoleList()
			},
			async getRoleList() {
				let params = {
					...this.searchForm,
					per_page: this.rolePage.pageSize,
					page: this.rolePage.pageIndex,
				}
				let { status_code, data } = await api.getRoleList(params)
				if(status_code == 200) {
					this.roleData = data.data
					this.rolePage.totalRow = data.total
				}
			},
			async openRoleModel() {
				// this.authData = JSON.parse(JSON.stringify(authData))
				this.modeType = 1;
				this.showRoleModel = true
			},
			async viewRoleModel(row) {
				this.role_jurisdiction = row.role_jurisdiction;
				row.role_jurisdiction && (this.authData = this.handleAuthData(JSON.parse(JSON.stringify(this.authData)), row.role_jurisdiction.split(',')))
				this.roleForm = {
					role_name: row.role_name,
					role_weight: row.role_weight ? Number(row.role_weight) : 0,
					role_description: row.role_description,
					role_jurisdiction: row.role_jurisdiction,
				}
				this.role_id = row.role_id
				this.modeType = 3;
				this.showRoleModel = true
			},
			async editRoleModel(row) {
				this.role_jurisdiction = row.role_jurisdiction;
				row.role_jurisdiction && (this.authData = this.handleAuthData(JSON.parse(JSON.stringify(this.authData)), row.role_jurisdiction.split(',')))
				this.roleForm = {
					role_name: row.role_name,
					role_weight: row.role_weight ? Number(row.role_weight) : 0,
					role_description: row.role_description,
					role_jurisdiction: row.role_jurisdiction,
				}
				this.role_id = row.role_id
				this.modeType = 2;
				this.showRoleModel = true
			},
			roleModelChange(status) {
				if(!status) {
					this.roleForm = {
						role_name: '',
						role_weight: 0,
						role_description: '',
						role_jurisdiction: '',
					}
					this.setAuthData()
					this.role_jurisdiction = '';
				}
			},
			async removeRole(row) {
				let { status_code } = await api.deleteRoleItem(row.role_id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getRoleList()
			},
			async saveRole() {
				let list = this.$refs.tree.getCheckedNodes().filter(item => item.id)
				let ids = [...new Set(list.map(item => item.id))].join(',')
				let params = {
					...this.roleForm,
					role_jurisdiction: ids
				}
				if(this.modeType == 2) {
					params.role_id = this.role_id
				}
				let { status_code, message } = await api.addRoleItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showRoleModel = false
					this.getRoleList()
				}
				if(this.modeType == 2 && this.role_id == this.$storage.get('userInfo').role_id) {
					api.getRoleInfo(this.role_id).then(res1 => {
	                    if(res1.status_code == 0) {
	                        this.$storage.set('authList', res1.data.role_jurisdiction.split(','))
	                    }
	                })
				}
				
			},
			handleAuthData(data, list) {
	            data.map(item => {
	            	item.checked = list.includes(item.id + '')
	                if (item.children) {
	                    this.handleAuthData(item.children, list)
	                }
	            })
	            return data
	        },
		},
		created() {
			this.getRoleList()
			this.getAuthList()
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.user_container {
		
	}
</style>