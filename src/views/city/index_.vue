<template>
	<div class="container">
		<Row type="flex" justify="center">
			<Col span="23">
				<Row type="flex" justify="space-between" align="middle" style="margin-top: 16px">
					<Col> 
						<Breadcrumb separator=">">
					        <BreadcrumbItem>项目列表</BreadcrumbItem>
					        <BreadcrumbItem>风险清单</BreadcrumbItem>
					        <BreadcrumbItem>风险源名称</BreadcrumbItem>
					    </Breadcrumb>
						<!-- <div class="title">项目管理</div> -->
					</Col>
					<Col>
						<Button type="primary" icon="ios-add" @click="add"></Button>
					</Col>
				</Row>
				<Divider />
				<Table :columns="xmColumns" :data="xmData">
					<template slot-scope="{ row }" slot="name">
			            <span class="link" @click="openList(row)">{{row.name}}</span>
			        </template>	
					<template slot-scope="{ row }" slot="history">
			            <span class="link" @click="openHistoryModel(row)">查看</span>
			        </template>
					<template slot-scope="{ row }" slot="action">
			            <Button type="primary" size="small" ghost style="margin-right: 5px" @click="edit(row)">编辑</Button>
			        </template>
				</Table>
				<Page
                    size="small"
                    style="margin-top: 10px"
                    :page-size="form.pageSize"
                    :total="totalRow"
                    show-elevator
                    show-total
                    show-sizer
                    ref="page1"
                    @on-change="handleChangePage"
                />
			</Col>
		</Row>
		<Modal :title="`${modeType == 1 ? '新增' : '编辑'}项目`" v-model="showXmModel">
			<div>
				<part-title text="基本信息"/>
				<Form :model="xmForm" label-position="left" :label-width="120">
					<FormItem label="城市名称">
			        	<Select clearable v-model="xmForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="区域范围">
			        	<Select clearable v-model="xmForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="项目负责人">
			            <Input clearable v-model="xmForm.name"></Input>
			        </FormItem>
			        <FormItem label="联系电话">
			            <Input clearable v-model="xmForm.name"></Input>
			        </FormItem>
				</Form>
				<part-title text="区域风险评估方法"/>
				<Form :model="xmForm" label-position="left" :label-width="120">
					<FormItem label="评估方法">
			        	<Select clearable v-model="xmForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
				</Form>
				<part-title text="区域风险评估方法"/>
				<Form :model="xmForm" label-position="left" :label-width="120">
					<Row type="flex" align="middle" :gutter="16" v-for="(item, index) in xmForm.items" :key="index">
						<Col>
							<FormItem :label="'风险源类型' + (index + 1)" :label-width="100">
					            <Select clearable v-model="item.type" placeholder="请选择">
					                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
					            </Select>
			        		</FormItem>
						</Col>
						<Col>
							<FormItem :label="'评估标准' + (index + 1)" :label-width="100">
					            <Select clearable v-model="item.rule" placeholder="请选择">
					                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
					            </Select>
			        		</FormItem>
						</Col>
						<Col>
							<Button type="error" icon="ios-close" size="small" shape="circle" @click="handleRemove(index)"></Button>
						</Col>
					</Row>
				</Form>
				<Row type="flex" justify="center">
					<Col span="20">
						<Button type="primary" icon="ios-add" @click="handleAdd" long style="margin: 0 auto">添加</Button>
					</Col>
				</Row>
			</div>
			<div slot="footer">
		        <Button type="primary" size="large" @click="saveXm">保存</Button>
	        </div>
		</Modal>
		<Drawer title="变更历史" width="500" :closable="false" v-model="showHistoryModel">
			<div slot="header">
				<Breadcrumb separator=">">
			        <BreadcrumbItem>项目列表</BreadcrumbItem>
			        <BreadcrumbItem>项目名称</BreadcrumbItem>
			        <BreadcrumbItem>变更历史</BreadcrumbItem>
			    </Breadcrumb>
			</div>
	        <Table :columns="historyColumns" :data="historyData"></Table>
	    </Drawer>
		<Drawer title="项目列表" width="800" :closable="false" v-model="showListModel">
			<div slot="header">
				<Breadcrumb separator=">">
			        <BreadcrumbItem>项目列表</BreadcrumbItem>
			        <BreadcrumbItem>项目名称</BreadcrumbItem>
			        <BreadcrumbItem>风险源名称</BreadcrumbItem>
			    </Breadcrumb>
			</div>
			<Row type="flex" justify="end">
				<Col span="3">
					<Button type="primary"  @click="importExcel">导入</Button>
				</Col>
				<Col span="3">
					<Button type="primary"  @click="exportExcel">导出</Button>
				</Col>
				<Col span="3">
					<Button type="primary" icon="ios-add" @click="openItemModel"></Button>
				</Col>
			</Row>
	        <Row type="flex" align="middle" :gutter="20" style='margin-top: 16px'>
				<Col span="6">
					<Select clearable v-model="searchForm.level" placeholder="风险源等级">
		                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
		            </Select>
				</Col>
				<Col span="6">
					<Select clearable v-model="searchForm.type" placeholder="风险源类型">
		                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
		            </Select>
				</Col>
				<Col span="6">
					<Button type="primary" icon="ios-search">搜索</Button>
				</Col>
			</Row>
			<Table :columns="listColumns" :data="listData" style="margin-top: 16px">
				<template slot-scope="{ row }" slot="action">
					<Button type="primary" size="small" ghost style="margin-right: 5px" @click="editItemModel(row)">编辑</Button>
		            <Poptip confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeItem(row)">
				        <Button type="error" size="small" ghost>删除</Button>
				    </Poptip>
				</template>
			</Table>
			<Modal :title="`${modeType == 1 ? '新增' : '编辑'}项目列表`" v-model="showItemModel">
				<Form :model="itemForm" label-position="left" :label-width="120">
					<FormItem label="风险源名称">
			        	<Select clearable v-model="itemForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="风险源类型">
			        	<Select clearable v-model="itemForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="风险分">
			            <InputNumber :min="0" v-model="itemForm.num"></InputNumber>
			        </FormItem>
			        <FormItem label="风险等级">
			            <Select clearable v-model="itemForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="所属区域">
			        	<Select clearable v-model="itemForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="灾害类型">
			            <Select clearable v-model="itemForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem>
				</Form>
				<div slot="footer">
		            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
			        <Button type="primary" size="large" @click="saveItem">保存</Button>
		        </div>
			</Modal>
	    </Drawer>
	    <Drawer title="请按照以下格式导入数据" width="700" :closable="false" v-model="showExcelModel">
			<Table :columns="excelColumns" :data="listData" style="margin-top: 16px"></Table>
			<div class="link" style="margin-top: 16px;">风险源类型对照表</div>
			<Row type="flex" style="margin-top: 16px;">
				<Col span="4">上传</Col>
				<Col span="20">
					<Upload
						multiple
						:before-upload="handleUpload"
						action="xxx">
				        <Button type="primary">添加</Button>
				    </Upload>
				    <Row type="flex" align="middle" v-for="(item, index) in files" :key="index">
				    	<Col span="12">{{ item.name }}</Col>
				    	<Col class="link">
				    		<div class="link" style="color: #ed4014" @click="handleRemoveFile(index)">删除</div>
				    	</Col>
				    </Row>
				</Col>
			</Row>
			<Row type="flex" justify="center" style="margin-top: 16px;">
				<Button type="primary" :disabled="files.length == 0" icon="ios-cloud-upload-outline" @click="uploadFiles">开始导入</Button>
			</Row>
	    </Drawer>
	</div>
</template>

<script>
	import partTitle from '@/components/title'
	import tablejs from '@/common/js/table'
	export default {
		name: 'xm',
		components: { partTitle },
		mixins: [tablejs],
		data() {
			return {
				showXmModel: false,
				showHistoryModel: false,
				showListModel: false,
				showItemModel: false,
				showExcelModel: false,
				modeType: '',
				statusList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				xmColumns: [
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
                        title: '项目名称',
                        slot: 'name',
                    }, {
                        title: '项目负责人',
                        key: 'cas',
                    }, {
                        title: '联系电话',
                        key: 'cas',
                    }, {
                        title: '创建时间',
                        key: 'cas',
                    }, {
                        title: '变更历史',
                        slot: 'history',
                    }, {
                        title: '操作',
                        fixed: 'right',
                        width: 150,
                        slot: 'action',
                    }, 
				],
				xmData: [
					{
						name: 'hahaha',
						cas: 1111
					}
				],
				historyColumns: [
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
                        title: '变更内容',
                        key: 'name',
                    }, {
                        title: '创建时间',
                        key: 'cas',
                    }, {
                        title: '变更人',
                        key: 'cas',
                    }
				],
				historyData: [
					{
						name: 'hahaha',
						cas: 1111
					}
				],
				xmForm: {
					name: '',
					items: [
						{
							type: '',
							rule: ''
						}
					],
				},
				searchForm: {
					level: '',
					type: ''
				},
				listColumns: [
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
                        title: '风险源名称',
                        key: 'name',
                    }, {
                        title: '风险源类型',
                        key: 'cas',
                    }, {
                        title: '风险分',
                        key: 'cas',
                    }, {
                        title: '风险源等级',
                        key: 'cas',
                    }, {
                        title: '灾害类型',
                        key: 'cas',
                    }, {
                        title: '操作',
                        slot: 'action',
                        width: 150
                    }
				],
				listData: [
					{
						name: 'hahaha',
						cas: 1111
					}
				],
				itemForm: {
					name: '',
					num: 0
				},
				files: []
			}
		},
		watch: {

		},
		computed: {
			excelColumns() {
				let columns = [...this.listColumns]
				columns.pop()
				return columns
			}
		},
		methods: {
			init() {

			},
			add() {
				this.modeType = 1
				this.showXmModel = true
			},
			edit(row) {
				this.modeType = 2
				this.showXmModel = true
			},
			saveXm() {

			},
			openHistoryModel(row) {
				this.showHistoryModel = true
			},
			openList(row) {
				this.showListModel = true
			},
			openItemModel() {
				this.modeType = 1
				this.showItemModel = true
			},
			editItemModel(row) {
				this.modeType = 2
				this.showItemModel = true
			},
			saveItem() {

			},
			removeItem(row) {

			},
	        handleRemove(index) {
	        	this.xmForm.items.splice(index, 1);
	        },
	        handleAdd() {
	        	this.xmForm.items.push({
	        		type: '',
					rule: ''
	        	});
	        },
	        importExcel() {
	        	this.showExcelModel = true
	        },
	        handleUpload(file) {
	        	this.files.push(file);
	        	return false
	        },
	        handleRemoveFile(index) {
	        	this.files.splice(index, 1);
	        },
	        uploadFiles() {

	        },
	        exportExcel() {
	        	
	        }
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		
	}
</style>