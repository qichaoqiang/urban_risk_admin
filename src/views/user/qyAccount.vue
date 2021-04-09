<template>
	<div class="user_container">
		<Row type="flex" justify="space-between" align="middle">
			<div class="title">采集账号管理</div>
			<!-- <div>
				<Button type="primary" @click="showExcelModel = true" style="margin-right: 20px;">导入</Button>
				<Button type="primary" icon="ios-add" @click="openAcccountModel"></Button>
			</div> -->
		</Row>
		<div v-if="hasAuth('caijizhanghao')">
			<Divider />
			<Form :model="searchForm" inline>
				<FormItem>
		        	<Input clearable v-model="searchForm.username" placeholder="用户名" style="width: 300px"></Input>
		        </FormItem>
		        <FormItem>
              <Cascader readonly change-on-select :transfer="true" v-model="searchForm.fxylb" :data="fxylbList"
                :load-data="loadFxylb" placeholder="风险源类别"></Cascader>
		        	<!-- <Input clearable v-model="searchForm.fxylb" placeholder="风险源类别"></Input> -->
		        </FormItem>
		        <FormItem>
	                <Button type="primary" @click="getAccountList">查询</Button>
	            </FormItem>
			</Form>
			<Table :columns="accountColumns" :data="accountData" style="margin-top: 16px">
				<template slot-scope="{ row }" slot="action">
					<Button type="primary" size="small" ghost @click="changePassword(row)" style="margin-right: 5px;">修改密码</Button>
		            <Poptip v-if="hasAuth('caijizhanghao_destroy')" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeAccount(row)">
				        <Button type="error" size="small" ghost>删除</Button>
				    </Poptip>
				</template>
			</Table>
			<Row type="flex" justify="end">
				<Page
	                size="small"
	                style="margin-top: 10px"
	                :page-size="accountPage.pageSize"
	                :total="accountPage.totalRow"
	                show-elevator
	                show-total
	                show-sizer
	                @on-change="handleChangeAccountPage"
	                @on-page-size-change="handleChangeAccountPageSize"
	            />
			</Row>
		</div>
		<Modal v-model="isShowchangePassword" title="修改密码" @on-visible-change="passwordModelChange">
            <Form ref="password" :model="passwordForm" :rules="rules" label-position="left" :label-width="120">
				<!-- <FormItem label="原密码">
		        	<Input clearable v-model="passwordForm.password1"></Input>
		        </FormItem> -->
		        <FormItem label="新密码" prop="password1">
		        	<Input clearable type="password" v-model="passwordForm.password1"></Input>
		        </FormItem>
		        <FormItem label="确认密码" prop="password2">
		            <Input clearable type="password" v-model="passwordForm.password2"></Input>
		        </FormItem>
			</Form>
			<div slot="footer">
	            <Button type="text" size="large" @click="isShowchangePassword = false">取消</Button>
		        <Button :loading="addUserLoading" type="primary" size="large" @click="savePassword">保存</Button>
	        </div>
        </Modal>
	</div>
</template>

<script>
	import api from '@/api/api'
  import fxylbjs from '@/common/js/fxylb'
	export default {
		name: '',
    mixins: [fxylbjs],
		data() {
			return {
				showAcccountModel: false,
				showExcelModel: false,
				modeType: '',
				isShowchangePassword: false,
				addUserLoading: false,
				admin_id: '',
				searchForm: {
					username: '',
					fxylb: []
				},
				files: [],
				accountData: [],
				accountColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.accountPage.pageIndex- 1) * this.accountPage.pageSize + 1);
				        }
                    }, {
                        title: '用户名',
                        key: 'username',
                        minWidth: 200
                    }, {
                        title: '姓名',
                        key: 'nickname',
                        minWidth: 200
                    }, {
                        title: '邮箱',
                        key: 'email',
                        minWidth: 200
                    }, {
                        title: '联系电话',
                        key: 'tel',
                        minWidth: 150
                    }, {
                        title: '风险源类别',
                        key: 'fxylbmc',
                        minWidth: 180
                    }, {
                        title: '操作',
                        slot: 'action',
                        fixed: 'right',
                        width: 190
                    }
				],
				accountForm: {
					name: '',
					type: '',
					des: '',
					accountType: '',
				},
				accountPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				passwordForm: {
					password1: '',
					password2: '',
				},
				rules: {
                    password1: [
                        { required: true, message: '请输入新密码', trigger: 'blur' }
                    ],
                    password2: [
                        { required: true, message: '请输入确认密码', trigger: 'blur' }
                    ],
                }
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
      async getFxylbData() {
        let list = []
        let {
          status_code,
          data
        } = await api.getFxylbList({
          act: 'getall'
        })
        if (status_code == 200) {
          this.fxylbData = data
          this.fxylbList = this.toTree(data, 1);
          this.getAccountList()
        }
      },
      toTree(data, index) {
        // 删除 所有 children,以防止多次调用
        data.forEach(function(item) {
          item.selected = false
          item.showChildren = false
          delete item.children
        })
        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        var map = {}
        data.forEach(function(item) {
          map[item.id] = item
        })
        var val = []
        data.forEach(function(item) {
          item.title = item.fxylbmc
          item.value = item.dm
          item.parent_id = item.parent_id
          item.label = item.fxylbmc
          // 以当前遍历项，的pid,去map对象中找到索引的id
          var parent = map[item.parent_id]
          // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
          if (parent) {
            // if(!map[parent.parent_id]) {
            // 	;(parent.children || (parent.children = [])).push(item)
            // }
            ;
            (parent.children || (parent.children = [])).push(item)
          } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item)
          }
        })
        return val
      },
			handleChangeAccountPage(val) {
				this.accountPage.pageIndex = val
				this.getAccountList()
			},
			handleChangeAccountPageSize(val) {
				this.accountPage.pageSize = val
				this.getAccountList()
			},
			async getAccountList() {
				let params = {
					...this.searchForm,
          fxylb: this.searchForm.fxylb[0] ? this.searchForm.fxylb[this.searchForm.fxylb.length - 1] : '',
					per_page: this.accountPage.pageSize,
					page: this.accountPage.pageIndex,
				}
				let { status_code, data } = await api.getCjaccountList(params)
				if(status_code == 200) {
					this.accountData = data.data
					this.accountPage.totalRow = data.total
				}
			},
			async removeAccount(row) {
				let { status_code } = await api.deleteCjaccountItem(row.admin_id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getAccountList()
			},
			changePassword(row) {
				console.log(row)
				this.admin_id = row.admin_id;
				this.isShowchangePassword = true
			},
			savePassword() {
				this.$refs.password.validate(async valid => {
                    if (valid) {
			            if(this.passwordForm.password1 !== this.passwordForm.password2) {
			                this.$Message.error('请输入相同密码，完成密码确认')
			                return
			            }
			            console.log(this.admin_id)
			            let params = {
			            	admin_id: this.admin_id,
			            	password: this.passwordForm.password1
			            }
			            this.addUserLoading = true
			            let { data, code } = await api.changeCjaccountPassword(params)
			            this.$Message.success('修改成功')
			            this.addUserLoading = false
			            this.isShowchangePassword = false
                    }
                })
			},
			passwordModelChange(status) {
				if(!status) {
					this.passwordForm = {
						password1: '',
						password2: '',
					}
					this.$refs.password.resetFields();
				}
			},
			excelModelChange(status) {

			},
	        handleUpload(file) {
	        	this.files.push(file);
	        	return false
	        },
	        uploadFiles() {

	        },
	        exportExcel() {

	        }
		},
		created() {
			// this.getAccountList()
      this.getFxylbData()
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.user_container {

	}
</style>
