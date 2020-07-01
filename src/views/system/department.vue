<template>
	<div class="user_container">
		<Row type="flex" justify="space-between" align="middle">
			<div class="title">部门管理</div>
			<Button type="primary" icon="ios-add" @click="openDeptModel"></Button>
		</Row>
		<Divider />
		<Table :columns="deptColumns" :data="deptData" style="margin-top: 16px">
			<template slot-scope="{ row }" slot="action">
				<Button type="primary" size="small" ghost style="margin-right: 5px" @click="editDeptModel(row)">编辑</Button>
	            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeDept(row)">
			        <Button type="error" size="small" ghost>删除</Button>
			    </Poptip>
			</template>
		</Table>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}角色`" v-model="showDeptModel">
			<Form :model="deptForm" label-position="left" :label-width="120">
		        <FormItem label="部门名称">
		        	<Input clearable v-model="deptForm.name"></Input>
		        </FormItem>
				<FormItem label="管理风险源类型">
		        	<Select clearable multiple v-model="deptForm.type" placeholder="请选择">
		                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
		            </Select>
		        </FormItem>
			</Form>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveDept">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				showDeptModel: false,
				modeType: '',
				deptData: [
					{
						name: '1111',
						cas: '11'
					}
				],
				deptColumns: [
					{
                        title: "序号",
						// fixed: 'left',
				        key: "id",
				        width: 80,
				        align: "center",
				        render: (h, params) => {
				            return h('span',params.index + (this.quyuPage.pageIndex- 1) * this.quyuPage.pageSize + 1);
				        }
                    }, {
                        title: '部门名称',
                        key: 'name',
                    }, {
                        title: '管理风险源类型',
                        key: 'cas',
                    }, {
                        title: '添加日期',
                        key: 'cas',
                    }, {
                        title: '操作',
                        slot: 'action',
                        width: 150
                    }
				],
				deptForm: {
					name: '',
					type: '',
					des: '',
					auth: '',
				},
				statusList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			openDeptModel() {
				this.modeType = 1
				this.showDeptModel = true
			},
			saveDept() {

			}
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.user_container {
		
	}
</style>