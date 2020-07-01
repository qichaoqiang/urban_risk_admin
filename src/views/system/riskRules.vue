<template>
	<div class="user_container">
		<div class="title">风险评估标准</div>
		<Divider />
		<Tabs :value="tabName">
	        <TabPane label="区域风险评估标准" name="area">
	        	<Row type="flex" justify="space-between" align="middle">
					<div class="title"></div>
					<Button type="primary" icon="ios-add" @click="openAreaModel"></Button>
				</Row>
				<Table :columns="areaColumns" :data="areaData" style="margin-top: 16px">
					<template slot-scope="{ row }" slot="action">
						<Button type="primary" size="small" ghost style="margin-right: 5px" @click="editAreaModel(row)">编辑</Button>
			            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeArea(row)">
					        <Button type="error" size="small" ghost>删除</Button>
					    </Poptip>
					</template>
				</Table>
	        </TabPane>
	        <TabPane label="行业风险评估标准" name="trade">
	        	<Row type="flex" justify="space-between" align="middle">
					<div class="title"></div>
					<Button type="primary" icon="ios-add" @click="openTradeModel"></Button>
				</Row>
				<Table :columns="tradeColumns" :data="tradeData" style="margin-top: 16px">
					<template slot-scope="{ row }" slot="action">
						<Button type="primary" size="small" ghost style="margin-right: 5px" @click="editTradeModel(row)">编辑</Button>
			            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeTrade(row)">
					        <Button type="error" size="small" ghost>删除</Button>
					    </Poptip>
					</template>
				</Table>
	        </TabPane>
	    </Tabs>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}区域风险评估标准`" v-model="showAreaModel">
			<Form :model="areaForm" label-position="left" :label-width="120">
		        <FormItem label="标准名称">
		        	<Input clearable v-model="areaForm.name"></Input>
		        </FormItem>
		        <FormItem label="创建人">
		            <Input clearable v-model="areaForm.des"></Input>
		        </FormItem>
		        <FormItem label="描述">
		            <Input clearable type="textarea" v-model="areaForm.des"></Input>
		        </FormItem>
			</Form>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveArea">保存</Button>
	        </div>
		</Modal>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}行业风险评估标准`" v-model="showTradeModel">
			<Form :model="tradeForm" label-position="left" :label-width="120">
		        <FormItem label="标准名称">
		        	<Input clearable v-model="tradeForm.name"></Input>
		        </FormItem>
		        <FormItem label="风险源类型">
		        	<Select clearable v-model="tradeForm.name" placeholder="请选择">
		                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
		            </Select>
		        </FormItem>
		        <FormItem label="创建人">
		            <Input clearable v-model="tradeForm.des"></Input>
		        </FormItem>
		        <FormItem label="描述">
		            <Input clearable type="textarea" v-model="areaForm.des"></Input>
		        </FormItem>
			</Form>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button type="primary" size="large" @click="saveTrade">保存</Button>
	        </div>
		</Modal>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				showAreaModel: false,
				showTradeModel: false,
				modeType: '',
				tabName: 'area',
				areaData: [
					{
						name: '1111',
						cas: '11'
					}
				],
				areaColumns: [
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
                        title: '标准名称',
                        key: 'name',
                    }, {
                        title: '制定时间',
                        key: 'cas',
                    }, {
                        title: '操作',
                        slot: 'action',
                        width: 150
                    }
				],
				areaForm: {
					name: '',
					type: '',
					des: '',
					auth: '',
				},
				tradeData: [
					{
						name: '1111',
						cas: '11'
					}
				],
				tradeColumns: [
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
                        title: '标准名称',
                        key: 'name',
                    }, {
                        title: '制定时间',
                        key: 'cas',
                    }, {
                        title: '操作',
                        slot: 'action',
                        width: 150
                    }
				],
				tradeForm: {
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
				authData: [
                    {
                        title: 'parent 1',
                        expand: true,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1'
                                    },
                                    {
                                        title: 'leaf 1-1-2'
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1'
                                    },
                                    {
                                        title: 'leaf 1-2-1'
                                    }
                                ]
                            }
                        ]
                    }
                ]
			}
		},
		watch: {

		},
		computed: {

		},
		methods: {
			openAreaModel() {
				this.modeType = 1
				this.showAreaModel = true
			},
			editAreaModel(row) {

			},
			removeArea(row) {
				
			},
			saveArea() {

			},
			openTradeModel() {
				this.modeType = 1
				this.showTradeModel = true
			},
			editTradeModel(row) {

			},
			removeTrade(row) {
				
			},
			saveTrade() {

			},
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