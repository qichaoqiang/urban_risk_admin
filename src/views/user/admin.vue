<template>
	<div class="user_container">
		<Row type="flex" justify="space-between" align="middle">
			<div class="title">管理员账号管理</div>
			<Button v-if="hasAuth('guanliyuan_store')" type="primary" icon="ios-add" @click="openAdminModel"></Button>
		</Row>
		<div v-if="hasAuth('guanliyuan')">
			<Divider />
			<Form :model="searchForm" inline>
				<FormItem>
		        	<Input clearable v-model="searchForm.username" placeholder="用户名"></Input>
		        </FormItem>
		        <FormItem>
		        	<Select clearable v-model="searchForm.role_id" placeholder="角色名称" style="width: 100px;">
		                <Option v-for="item in roleData" :key="item.role_id" :value="item.role_id">{{item.role_name}}</Option>
		            </Select>
		        </FormItem>
		        <FormItem>
	                <Button type="primary" @click="getAdminList">查询</Button>
	            </FormItem>
			</Form>
			<Table :loading="loading" :columns="adminColumns" :data="adminData" style="margin-top: 16px">
				<template slot-scope="{ row }" slot="role_id">
					<span>{{getRole(row.role_id)}}</span>
				</template>
				<template slot-scope="{ row }" slot="quyu">
					<span>{{getQuyu(row.quyu_id)}}</span>
				</template>
				<template slot-scope="{ row }" slot="action">
					<Button v-if="hasAuth('guanliyuan_show')" type="primary" size="small" ghost style="margin-right: 5px" @click="viewAdminModel(row)">查看</Button>
					<Button v-if="hasAuth('guanliyuan_update')" type="primary" size="small" ghost style="margin-right: 5px" @click="editAdminModel(row)">编辑</Button>
		            <Poptip v-if="hasAuth('guanliyuan_destroy')" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeAdmin(row)">
				        <Button type="error" size="small" ghost>删除</Button>
				    </Poptip>
				</template>
			</Table>
			<Row type="flex" justify="end">
				<Page
	                size="small"
	                style="margin-top: 10px"
	                :page-size="adminPage.pageSize"
	                :total="adminPage.totalRow"
	                show-elevator
	                show-total
	                show-sizer
	                @on-change="handleChangeAdminPage"
	                @on-page-size-change="handleChangeAdminPageSize"
	            />
			</Row>
		</div>
		<Modal :title="`${modelTypeList[modeType - 1]}管理员账号`" v-model="showAdminModel" @on-visible-change="adminModelChange">
			<Form :disabled="modeType == 3" :model="adminForm" label-position="left" :label-width="120">
				<FormItem label="用户名">
		        	<Input clearable v-model="adminForm.username"></Input>
		        </FormItem>
		        <FormItem label="密码">
		        	<Input clearable type="password" v-model="adminForm.password"></Input>
		        </FormItem>
		        <FormItem label="姓名">
		        	<Input clearable v-model="adminForm.nickname"></Input>
		        </FormItem>
		        <FormItem label="邮箱">
		        	<Input type="email" clearable v-model="adminForm.email"></Input>
		        </FormItem>
		        <FormItem label="联系电话">
		        	<Input clearable type="tel" v-model="adminForm.tel"></Input>
		        </FormItem>
		        <FormItem label="角色">
		        	<Select clearable v-model="adminForm.role_id" style="width: 100%">
		                <Option v-for="item in roleData" :key="item.role_id" :value="item.role_id">{{item.role_name}}</Option>
		            </Select>
		        </FormItem>
		        <FormItem label="管辖区域">
		        	<Cascader 
		            	clearable 
		            	change-on-select
		            	v-model="adminForm.quyu" 
		            	:data="areaList" 
		            	:load-data="loadArea"></Cascader>
		        </FormItem>
		        <FormItem label="管辖项目">
		        	<Select clearable multiple v-model="adminForm.xm_id" style="width: 100%">
		                <Option v-for="item in projectData" :key="item.xm_id" :value="item.xm_id">{{item.xmmc}}</Option>
		            </Select>
		        </FormItem>
			</Form>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button v-if="modeType != 3" type="primary" size="large" @click="saveAdmin">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
	import { authData } from './auth.js'
	import areajs from '@/common/js/area'
	export default {
		name: '',
		mixins: [areajs],
		data() {
			return {
				showAdminModel: false,
				modeType: '',
				searchForm: {
					username: '',
					role_id: '',
				},
				loading: true,
				adminData: [],
				adminColumns: [
					{
                        title: '序号',
                        type: 'index',
                        fixed: 'left',
                        width: 80
                    }, {
                        title: '用户名',
                        key: 'username',
                        minWidth: 100
                    }, {
                        title: '姓名',
                        key: 'nickname',
                        minWidth: 120
                    }, {
                        title: '邮箱',
                        key: 'email',
                        minWidth: 200
                    }, {
                        title: '联系电话',
                        key: 'tel',
                        minWidth: 150
                    }, {
                        title: '角色',
                        slot: 'role_id',
                        minWidth: 120
                    }, {
                        title: '管辖区域',
                        slot: 'quyu',
                        minWidth: 100
                    }, {
                        title: '操作',
                        slot: 'action',
                        fixed: 'right',
                        width: 200
                    }
				],
				adminForm: {
					username: '',
					password: '',
					nickname: '',
					email: '',
					tel: '',
					role_id: '',
					quyu: [],
					xm_id: []
				},
				adminPage: {
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
				authData: JSON.parse(JSON.stringify(authData)),
				roleData: [],
				projectData: []
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			openAdminModel() {
				this.modeType = 1
				this.showAdminModel = true
			},
			handleChangeAdminPage(val) {
				this.adminPage.pageIndex = val
				this.getAdminList()
			},
			handleChangeAdminPageSize(val) {
				this.adminPage.pageSize = val
				this.getAdminList()
			},
			async getAdminList() {
				this.loading = true
				let params = {
					...this.searchForm,
					per_page: this.adminPage.pageSize,
					page: this.adminPage.pageIndex,
				}
				let { status_code, data } = await api.getAdminList(params)
				if(status_code == 200) {
					this.adminData = data.data
					this.adminPage.totalRow = data.total
				}
				this.loading = false
			},
			async openAdminModel() {
				// this.authData = JSON.parse(JSON.stringify(authData))
				this.modeType = 1;
				this.showAdminModel = true
			},
			editAdminModel(row) {
				this.adminForm = {
					username: row.username,
					password: row.password,
					nickname: row.nickname,
					email: row.email,
					tel: row.tel,
					role_id: row.role_id,
					quyu: [row.quyu_id],
					xm_id: row.xm_id.split(',').map(item => item - 0)
				}
				this.admin_id = row.admin_id
				this.modeType = 2;
				this.showAdminModel = true
			},
			viewAdminModel(row) {
				this.adminForm = {
					username: row.username,
					password: row.password,
					nickname: row.nickname,
					email: row.email,
					tel: row.tel,
					role_id: row.role_id,
					quyu: [row.quyu_id],
					xm_id: row.xm_id.split(',').map(item => item - 0)
				}
				this.admin_id = row.admin_id
				this.modeType = 3;
				this.showAdminModel = true
			},
			adminModelChange(status) {
				if(!status) {
					this.adminForm = {
						username: '',
						password: '',
						nickname: '',
						email: '',
						tel: '',
						role_id: '',
						quyu: [],
						xm_id: []
					}
					console.log(authData)
					this.authData = JSON.parse(JSON.stringify(authData))
				}
			},
			async removeAdmin(row) {
				let { status_code } = await api.deleteAdminItem(row.admin_id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getAdminList()
			},
			async saveAdmin() {
				let params = {
					...this.adminForm,
					quyu_id: this.adminForm.quyu[0] ? this.adminForm.quyu[this.adminForm.quyu.length - 1] : '',
					xm_id: this.adminForm.xm_id.join(',')
				}
				delete params.quyu
				if(this.modeType == 2) {
					params.admin_id = this.admin_id
				}
				let { status_code, message } = await api.addAdminItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showAdminModel = false
					this.getAdminList()
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
	        async getRoleList() {
				let params = {
					per_page: 1000,
					page: 1
				}
				let { status_code, data } = await api.getRoleList(params)
				if(status_code == 200) {
					this.roleData = data.data
				}
			},
			async getProjectList() {
				let params = {
					per_page: 1000,
					page: 1
				}
				let { status_code, data } = await api.getProjectList(params)
				if(status_code == 200) {
					this.projectData = data.data
				}
			},
			getRole(id) {
				return this.roleData.find(item => item.role_id == id) ? this.roleData.find(item => item.role_id == id).role_name : ''
			},
			getQuyu(id) {
				console.log(this.areaList.find(item => item.value == id))
				return this.areaList.find(item => item.value == id) ? this.areaList.find(item => item.value == id).label : ''
			}
		},
		created() {
			this.getArea('', list => {
				this.areaList = list
			})
			this.getRoleList()
			this.getProjectList()
			this.getAdminList()
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.user_container {
		
	}
</style>