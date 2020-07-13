<template>
	<div class="user_container">
		<Row type="flex" justify="space-between" align="middle">
			<div class="title">风险源类别</div>
			<Button v-if="hasAuth(`${parents[0] ? parents[parents.length - 1].dm : 'fengxianyuanleibie'}_store`)" type="primary" @click="openFxylbModel" style="width: 60px">
				<Icon type="ios-add" size="28" />
			</Button>
		</Row>
		<div v-if="hasAuth('fengxianyuanleibie')">
			<Divider />
			<Breadcrumb separator=">">
		        <BreadcrumbItem>
		        	<span class="link" @click="navigate(0)">顶级</span>
		        </BreadcrumbItem>
		        <BreadcrumbItem v-for="(item, index) in parents" :key="item.id">
		        	<span class="link" @click="navigate(index + 1)">{{item.fxylbmc}}</span>
		        </BreadcrumbItem>
		    </Breadcrumb>
			<Table :loading="loading" :columns="fxylbColumns" :data="fxylbData" style="margin-top: 16px">
				<template slot-scope="{ row }" slot="fxylbmc">
					<span class="link" @click="open(row)">{{row.fxylbmc}}</span>
				</template>
				<template slot-scope="{ row }" slot="created_at">
					<span>{{row.created_at.split(' ')[0]}}</span>
				</template>
				<template slot-scope="{ row }" slot="action">
					<Button v-if="hasAuth(`${row.dm}_show`)" type="primary" size="small" ghost style="margin-right: 5px" @click="viewFxylbModel(row)">查看</Button>
					<Button v-if="hasAuth(`${row.dm}_update`)" type="primary" size="small" ghost style="margin-right: 5px" @click="editFxylbModel(row)">编辑</Button>
		            <Poptip v-if="hasAuth(`${row.dm}_destroy`)" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeFxylb(row)">
				        <Button type="error" size="small" ghost>删除</Button>
				    </Poptip>
				</template>
			</Table>
			<Row type="flex" justify="end">
				<Page
	                size="small"
	                style="margin-top: 10px"
	                :page-size="fxylbPage.pageSize"
	                :total="fxylbPage.totalRow"
	                show-elevator
	                show-total
	                show-sizer
	                @on-change="handleChangeFxylbPage"
	                @on-page-size-change="handleChangeFxylbPageSize"
	            />
	        </Row>
		</div>
		<Modal width="820" :title="`${modelTypeList[modeType - 1]}风险源类别`" v-model="showFxylbModel" @on-visible-change="fxylbModelChange">
			<Form :disabled="modeType == 3" :model="fxylbForm" ref="fxylb" :rules="fxylbRules" hide-required-mark label-position="left" :label-width="120">
				<FormItem label="父风险源类别">
		        	<Cascader 
		            	readonly 
		            	change-on-select
		            	v-model="fxylbForm.parent_id" 
		            	:data="fxylbList" 
		            	:load-data="loadFxylb"
		            	:render-format="format" 
		            	placeholder="请选择"></Cascader>
		        </FormItem>
				<FormItem label="风险源类别名称" prop="fxylbmc">
		        	<Input clearable v-model="fxylbForm.fxylbmc"></Input>
		        </FormItem>
				<FormItem label="代码" prop="dm">
		        	<Input clearable v-model="fxylbForm.dm"></Input>
		        </FormItem>
				<FormItem label="图标" prop="icon">
		        	<Input clearable v-model="fxylbForm.icon"></Input>
		        </FormItem>
				<FormItem label="排序" prop="px">
		        	<InputNumber :min="0" v-model="fxylbForm.px"></InputNumber>
		        </FormItem>
			</Form>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button v-if="modeType != 3" type="primary" size="large" :loading="fxylbLoading" @click="saveFxylb">保存</Button>
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
				id: '',
				loading: true,
				showFxylbModel: false,
				showfxylbDrawer1: false,
				showfxylbDrawer2: false,
				fxylbLoading: false,
				modeType: '',
				fxylbValue: 'id',
				rowItem: null,
				parents: [],
				fxylbData: [],
				fxylbColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.fxylbPage.pageIndex- 1) * this.fxylbPage.pageSize + 1);
				        }
                    }, {
                        title: '风险源类别',
                        slot: 'fxylbmc',
                        minWidth: 160
                    }, {
                        title: '添加日期',
                        slot: 'created_at',
                        minWidth: 120
                    }, {
                        title: '操作',
                        slot: 'action',
                        fixed: 'right',
                        width: 200
                    }
				],
				fxylbForm: {
					parent_id: [],
					fxylbmc: '',
					dm: '',
					icon: '',
					px: 0,
				},
				fxylbPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
			}
		},
		watch: {

		},
		computed: {
			fxylbRules() {
				return {
					fxylbmc: [{ required: true, message: '请选择', trigger: 'change' }],
					dm: [{ required: true, message: '请输入', trigger: 'change' }],
					icon: [{ required: true, message: '请输入', trigger: 'change' }],
					px: [{ required: true, type: 'number', message: '请输入', trigger: 'change' }],
				}
			},
		},
		methods: {
			format(labels, selectedData) {
                const index = labels.length - 1;
                const data = selectedData[index] || false;
                return labels[index];
            },
			handleChangeFxylbPage(val) {
				this.fxylbPage.pageIndex = val
				this.getFxylbData()
			},
			handleChangeFxylbPageSize(val) {
				this.fxylbPage.pageSize = val
				this.getFxylbData()
			},
			async getFxylbData() {
				this.loading = true
				let params = {
					per_page: this.fxylbPage.pageSize,
					page: this.fxylbPage.pageIndex,
				}
				params.parent_id = this.parents[0] ? this.parents[this.parents.length - 1].id : ''
				let { status_code, data } = await api.getFxylbList(params)
				if(status_code == 200) {
					this.fxylbData = data.data
					this.fxylbPage.totalRow = data.total
				}
				this.loading = false
			},
			openFxylbModel() {
				this.modeType = 1;
				this.getFxylb()
			},
			editFxylbModel(row) {
				this.fxylbForm = {
					parent_id: row.ffxylbbhc.split(','),
					fxylbmc: row.fxylbmc,
					dm: row.dm,
					icon: row.icon,
					px: row.px ? Number(row.px) : 0,
				}
				this.id = row.id
				this.modeType = 2;
				this.showFxylbModel = true
			},
			viewFxylbModel(row) {
				this.fxylbForm = {
					parent_id: row.ffxylbbhc.split(','),
					fxylbmc: row.fxylbmc,
					dm: row.dm,
					icon: row.icon,
					px: row.px ? Number(row.px) : 0,
				}
				this.id = row.id
				this.modeType = 3;
				this.showFxylbModel = true
			},
			fxylbModelChange(status) {
				if(!status) {
					this.$nextTick(() => {
						this.fxylbForm = {
							parent_id: [],
							fxylbmc: '',
							dm: '',
							icon: '',
							px: 0,
						}
						this.$refs.fxylb.resetFields();
					})
				}
			},
			async removeFxylb(row) {
				let { status_code } = await api.deleteFxylbItem(row.id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getFxylbData()
				this.getFxylbList('', list => {
					this.fxylbList = list
				})
			},
			async saveFxylb() {
				this.$refs.fxylb.validate(async valid => {
                    if (valid) {
                    	this.fxylbLoading = true
						let params = {
							...this.fxylbForm,
							parent_id: this.fxylbForm.parent_id[0] ? this.fxylbForm.parent_id[this.fxylbForm.parent_id.length - 1] : 0,
						}
						if(this.modeType == 2) {
							params.id = this.id
						}
						delete params.lngAndLat
						let { status_code, message } = await api.addFxylbItem(params);
						if(status_code == 200) {
							this.$Message.success(message)
							this.showFxylbModel = false
							this.getFxylbData()
							this.getFxylbList('', list => {
								this.fxylbList = list
							}, 'id')
						}
						this.fxylbLoading = false
                    }
                })
			},
			open(row) {
				if(!this.hasAuth(row.dm)) {
					this.$Message.warning('暂无权限查看该项子列表')
					return
				}
				this.parents.push(row)
				this.getFxylbData()
			},
			navigate(index) {
				console.log(index)
				this.parents.splice(index)
				this.fxylbPage = {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				}
				this.getFxylbData()
				
			},
		},
		created() {
			this.getFxylbData()
			this.getFxylbList('', list => {
				this.fxylbList = list
			}, 'id')
		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.user_container {
		
	}
</style>