<template>
	<div class="container">
		<Row type="flex" justify="center" v-if="hasAuth('xiangmu')">
			<Col span="23">
				<Row type="flex" justify="space-between" align="middle" style="margin-top: 16px">
					<Col> 
						<Breadcrumb separator=">">
					        <BreadcrumbItem>项目管理</BreadcrumbItem>
					        <BreadcrumbItem>项目列表</BreadcrumbItem>
					    </Breadcrumb>
						<!-- <div class="title">项目列表</div> -->
					</Col>
					<Col v-if="hasAuth('xiangmu_store')">
						<Button type="primary" icon="ios-add" @click="openXmModel"></Button>
					</Col>
				</Row>
				<Divider />
				<Form :model="searchXmForm" inline>
					<FormItem>
			        	<Input clearable v-model="searchXmForm.xmmc" placeholder="项目名称" style="width: 300px"></Input>
			        </FormItem>
			        <FormItem>
		                <Button type="primary" @click="getXmList">查询</Button>
		            </FormItem>
				</Form>
				<Table ref="xmTable" :columns="xmColumns" :data="xmData" :loading="xmLoading">
					<template slot-scope="{ row }" slot="xmmc">
			            <span class="link" @click="openFxyList(row)">{{row.xmmc}}</span>
			        </template>	
					<template slot-scope="{ row }" slot="history">
			            <span class="link" @click="openHistoryModel(row)">查看</span>
			        </template>
					<template slot-scope="{ row }" slot="action">
			            <Button v-if="hasAuth('xiangmu_show')" type="primary" size="small" ghost style="margin-right: 5px" @click="viewXmModel(row)">查看</Button>
			            <Button v-if="hasAuth('xiangmu_update')" type="primary" size="small" ghost style="margin-right: 5px" @click="editXmModel(row)">编辑</Button>
			            <Poptip v-if="hasAuth('xiangmu_update')" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeXm(row)">
					        <Button type="error" size="small" ghost>删除</Button>
					    </Poptip>
			        </template>
				</Table>
				<Row type="flex" justify="end">
					<Page
	                    size="small"
	                    style="margin-top: 10px"
	                    :page-size="xmPage.pageSize"
	                    :total="xmPage.totalRow"
	                    show-elevator
	                    show-total
	                    show-sizer
	                    @on-change="handleChangeXmPage"
	                    @on-page-size-change="handleChangeXmPageSize"
	                />
	            </Row>
			</Col>
		</Row>
		<Modal :title="`${modelTypeList[modeType - 1]}项目`" v-model="showXmModel" @on-visible-change="xmModelChange">
			<Form :disabled="modeType == 3" :model="xmForm" label-position="left" :label-width="120">
				<FormItem label="项目名称">
		        	<Input clearable v-model="xmForm.xmmc"></Input>
		        </FormItem>
		        <FormItem label="项目负责人">
		            <Input clearable v-model="xmForm.xmfzr"></Input>
		        </FormItem>
		        <FormItem label="联系电话">
		            <Input clearable type="tel" v-model="xmForm.lxdh"></Input>
		        </FormItem>
		        <FormItem label="项目简介">
		            <Input clearable type="textarea" :rows="4" v-model="xmForm.xmjj"></Input>
		        </FormItem>
		        <FormItem label="创建时间">
		        	<DatePicker type="date" v-model="xmForm.cjsj"  placeholder="请选择"></DatePicker>
		        </FormItem>
			</Form>
			<div slot="footer">
	            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
		        <Button v-if="modeType != 3" type="primary" size="large" @click="saveXm">保存</Button>
	        </div>
		</Modal>
		<!-- <Modal :title="`${modeType == 1 ? '新增' : '编辑'}项目`" v-model="showXmModel">
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
							<FormItem :label="'风险源类别' + (index + 1)" :label-width="100">
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
		</Modal> -->
		<Drawer title="变更历史" width="500" :closable="false" v-model="showHistoryModel">
			<div slot="header">
				<Breadcrumb separator=">">
			        <BreadcrumbItem>项目管理</BreadcrumbItem>
			        <BreadcrumbItem>项目列表</BreadcrumbItem>
			        <BreadcrumbItem>变更历史</BreadcrumbItem>
			    </Breadcrumb>
			</div>
	        <Table :columns="historyColumns" :data="historyData"></Table>
	    </Drawer>
		<Drawer width="80" :closable="false" v-model="showListModel">
			<div slot="header">
				<Breadcrumb separator=">">
			        <BreadcrumbItem>项目列表</BreadcrumbItem>
			        <BreadcrumbItem>{{xmItem ? xmItem.xmmc : '项目名称'}}</BreadcrumbItem>
			        <BreadcrumbItem>风险源列表</BreadcrumbItem>
			    </Breadcrumb>
			</div>
			<Row type="flex" justify="space-between" :gutter="24">
				<Col span="12">
					<Row type="flex" align="middle" :gutter="24">
						<Col span="6">
							<Select clearable v-model="searchFxyForm.fxdj" placeholder="风险源等级">
				                <Option v-for="item in fxdjList" :key="item.name" :value="item.name">{{item.name}}</Option>
				            </Select>
						</Col>
						<Col span="6">
							<Cascader 
				            	readonly 
				            	change-on-select
				            	v-model="searchFxyForm.fxylb" 
				            	:data="fxylbList" 
				            	:load-data="loadFxylb" 
				            	placeholder="风险源类别"></Cascader>
						</Col>
						<Col span="6">
							<Button type="primary" icon="ios-search" @click="getFxyList">搜索</Button>
						</Col>
					</Row>
				</Col>
				<Col span="12">
					<Row type="flex" justify="end" align="middle" :gutter="24">
						<Col v-if="hasAuth('fengxianyuan_store')">
							<Button type="primary" ghost  @click="importExcel">导入</Button>
						</Col>
						<Col v-if="hasAuth('fengxianyuan_export')">
							<Button type="primary" ghost  @click="exportExcel">导出</Button>
						</Col>
						<Col v-if="hasAuth('fengxianyuan_store')">
							<Button type="primary" icon="ios-add" @click="openFxyModel"></Button>
						</Col>
					</Row>
				</Col>
			</Row>
			<div v-if="hasAuth('fengxianyuan')">
				<Table :columns="fxyColumns" :data="fxyData" :loading="fxyLoading" style="margin-top: 16px">
					<template slot-scope="{ row }" slot="fxdj">
						<div class="fxdj" :style="{background: getFxdj(row.fxdj)}"></div>
					</template>
					<template slot-scope="{ row }" slot="action">
						<Button v-if="hasAuth('fengxianyuan_show')" type="primary" size="small" ghost style="margin-right: 5px" @click="viewFxyModel(row)">查看</Button>
						<Button v-if="hasAuth('fengxianyuan_update')" type="primary" size="small" ghost style="margin-right: 5px" @click="editFxyModel(row)">编辑</Button>
			            <Poptip v-if="hasAuth('fengxianyuan_destroy')" confirm placement="left-end" :transfer="true" title="确认删除该条数据吗？" @on-ok="removeFxy(row)">
					        <Button type="error" size="small" ghost v-if="hasAuth('fengxianyuan')">删除</Button>
					    </Poptip>
					</template>
				</Table>
				<Row type="flex" justify="end">
					<Page
		                size="small"
		                style="margin-top: 10px"
		                :page-size="fxyPage.pageSize"
		                :total="fxyPage.totalRow"
		                show-elevator
		                show-total
		                show-sizer
		                @on-change="handleChangeFxyPage"
		                @on-page-size-change="handleChangeFxyPageSize"
		            />
		        </Row>
			</div>
			<Modal :title="`${modelTypeList[modeType - 1]}风险源`" v-model="showFxyModel" @on-visible-change="fxyModelChange">
				<Form :disabled="modeType == 3" :model="fxyForm" label-position="left" :label-width="120">
					<FormItem label="风险源名称">
			        	<Input clearable v-model="fxyForm.fxymc"></Input>
			        </FormItem>
			        <FormItem label="风险源类别">
			        	<Cascader 
		            	readonly 
		            	change-on-select
		            	v-model="fxyForm.fxylb" 
		            	:data="fxylbList" 
		            	:load-data="loadFxylb" 
		            	placeholder="请选择"></Cascader>
			        </FormItem>
			        <FormItem label="风险值">
			            <InputNumber :min="0" v-model="fxyForm.fxz"></InputNumber>
			        </FormItem>
			        <FormItem label="风险等级">
			            <Select clearable v-model="fxyForm.fxdj" placeholder="请选择">
			                <Option v-for="item in fxdjList" :key="item.name" :value="item.name">{{item.name}}</Option>
			            </Select>
			        </FormItem>
			        <FormItem label="所属区域">
			        	<Cascader 
			            	readonly 
			            	change-on-select
			            	v-model="fxyForm.quyu_id" 
			            	:data="areaList" 
			            	:load-data="loadArea" 
			            	placeholder="所属区域"></Cascader>
			        </FormItem>
			        <FormItem label="经纬度">
			        	<lng :lngAndLat.sync="fxyForm.lngAndLat"></lng>
			        </FormItem>
			        <FormItem label="地址">
			        	<Input clearable v-model="fxyForm.dz"></Input>
			        </FormItem>
			        <!-- <FormItem label="灾害类型">
			            <Select clearable v-model="fxyForm.name" placeholder="请选择">
			                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.name}}</Option>
			            </Select>
			        </FormItem> -->
				</Form>
				<div slot="footer">
		            <!-- <Button type="text" size="large" @click="showWhModel = false">取消</Button> -->
			        <Button v-if="modeType != 3" type="primary" size="large" @click="saveFxy">保存</Button>
		        </div>
			</Modal>
	    </Drawer>
	    <Drawer title="请按照以下格式导入数据" width="80" :closable="false" v-model="showExcelModel" @on-visible-change="excelModelChange">
			<Table :columns="excelColumns" :data="listData" style="margin-top: 16px"></Table>
			<Form label-position="left" :label-width="120" style="margin-top: 16px">
		        <FormItem label="风险源类别">
		        	<Cascader 
	            	readonly 
	            	change-on-select
	            	v-model="fxylb" 
	            	:data="fxylbList" 
	            	:load-data="loadFxylb" 
	            	placeholder="请选择"></Cascader>
		        </FormItem>
		        <FormItem label="excel文件">
		        	<Upload
						:before-upload="handleUpload"
						action="xxx">
				        <Button size="small" type="primary" ghost>选择文件</Button>
				    </Upload>
				    <Row type="flex" align="middle" v-for="(item, index) in files" :key="index">
				    	<Col span="12">{{ item.name }}</Col>
				    	<Col class="link">
				    		<div class="link" style="color: #ed4014" @click="handleRemoveFile(index)">删除</div>
				    	</Col>
				    </Row>
		        </FormItem>
			</Form>
			<!-- <Row type="flex" style="margin-top: 16px;">
				<Col span="4">上传</Col>
				<Col span="20">
					<Upload
						:before-upload="handleUpload"
						action="xxx">
				        <Button type="primary">选择文件</Button>
				    </Upload>
				    <Row type="flex" align="middle" v-for="(item, index) in files" :key="index">
				    	<Col span="12">{{ item.name }}</Col>
				    	<Col class="link">
				    		<div class="link" style="color: #ed4014" @click="handleRemoveFile(index)">删除</div>
				    	</Col>
				    </Row>
				</Col>
			</Row> -->
			<Row type="flex" justify="center" style="margin-top: 16px;">
				<Button type="primary" :disabled="files.length == 0 && fxylb.length > 0" icon="ios-cloud-upload-outline" @click="uploadFiles">开始导入</Button>
			</Row>
	    </Drawer>
	</div>
</template>

<script>
	import api from '@/api/api'
	import partTitle from '@/components/title'
	import tablejs from '@/common/js/table'
	import { getDate } from '@/utils/tool'
	import lng from '../baseInfo/components/lng'
	import areajs from '@/common/js/area'
	import fxylbjs from '@/common/js/fxylb'
	import axios from 'axios'
	import $ from 'zhangjia-zepto'
	export default {
		name: 'xm',
		components: { partTitle, lng },
		mixins: [tablejs, areajs, fxylbjs],
		data() {
			return {
				xm_id: '',
				xmItem: null,
				gkdx_id: '',
				showXmModel: false,
				showHistoryModel: false,
				showListModel: false,
				showFxyModel: false,
				showExcelModel: false,
				xmLoading: true,
				fxyLoading: true,
				modeType: '',
				statusList: [
					{
						value: 1,
						name: 'xxxx'
					}
				],
				fxylb: [],
				xmColumns: [
					{
                        title: '序号',
                        type: 'index',
                        fixed: 'left',
                        width: 80
                    }, {
                        title: '项目名称',
                        slot: 'xmmc',
                        minWidth: 100
                    }, {
                        title: '项目负责人',
                        key: 'xmfzr',
                        minWidth: 120
                    }, {
                        title: '联系电话',
                        key: 'lxdh',
                        minWidth: 100
                    }, {
                        title: '创建时间',
                        key: 'cjsj',
                        minWidth: 100
                    }, 
                    // {
                    //     title: '变更历史',
                    //     slot: 'history',
                    // }, 
                    {
                        title: '操作',
                        width: 200,
                        slot: 'action',
                        fixed: 'right'
                    }, 
				],
				xmData: [],
				xmForm: {
					xmmc: '',
					xmfzr: '',
					lxdh: '',
					xmjj: '',
					cjsj: ''
				},
				searchXmForm: {
					xmmc: ''
				},
				xmPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				fxyColumns: [
					{
                        title: '序号',
                        type: 'index',
                        fixed: 'left',
                        width: 80
                    }, {
                        title: '风险源名称',
                        key: 'fxymc',
                        minWidth: 200
                    }, {
                        title: '风险源类别',
                        key: 'fxylbmc',
                        minWidth: 180
                    }, {
                        title: '风险值',
                        key: 'fxz',
                        minWidth: 100
                    }, {
                        title: '风险源等级',
                        slot: 'fxdj',
                        minWidth: 100
                    }, {
                        title: '操作',
                        slot: 'action',
                        width: 200,
                        fixed: 'right'
                    }
				],
				fxyData: [],
				fxyForm: {
					fxymc: '',
					dz: '',
					quyu_id: [],
					fxz: 0,
					fxdj: '',
					fxylb: [],
					lngAndLat: ''
				},
				searchFxyForm: {
					fxdj: '',
					fxylb: []
				},
				fxdjList: [{
		            name: '红',
		            value: '#F25E5E',
		        }, {
		            name: '橙',
		            value: '#F49852',
		        }, {
		            name: '黄',
		            value: '#EFE850',
		        }, {
		            name: '蓝',
		            value: '#1C86F3',
		        }],
				fxylbList: [],
				fxyPage: {
					pageSize: 10,
					pageIndex: 1,
					totalRow: 0
				},
				historyColumns: [
					{
                        title: '序号',
                        type: 'index',
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
				excelColumns: [
					{
                        title: '风险源名称',
                        key: 'fxymc',
                    }, {
                        title: '地址',
                        key: 'dz',
                    }, {
                        title: '经度',
                        key: 'jd',
                    }, {
                        title: '纬度',
                        key: 'wd',
                    }, {
                        title: '风险值',
                        key: 'fxz',
                    }, {
                        title: '风险等级',
                        key: 'fxdj',
                    }
				],
				listData: [
					{
						fxymc: '名称',
						dz: '地址',
						jd: '120.11',
						wd: '30.35',
						fxz: '90',
						fxdj: '红'
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
			
		},
		methods: {
			handleChangeXmPage(val) {
				this.xmPage.pageIndex = val
				this.getXmList()
			},
			handleChangeXmPageSize(val) {
				this.xmPage.pageSize = val
				this.getXmList()
			},
			async getXmList() {
				this.xmLoading = true
				let params = {
					...this.searchXmForm,
					per_page: this.xmPage.pageSize,
					page: this.xmPage.pageIndex,
				}
				let { status_code, data } = await api.getProjectList(params)
				if(status_code == 200) {
					this.xmData = data.data
					this.xmPage.totalRow = data.total
				}
				this.xmLoading = false
			},
			openXmModel() {
				this.modeType = 1;
				this.showXmModel = true
			},
			viewXmModel(row) {
				this.xmForm = {
					xmmc: row.xmmc,
					xmfzr: row.xmfzr,
					lxdh: row.lxdh,
					xmjj: row.xmjj,
					cjsj: row.cjsj ? new Date(row.cjsj) : '',
				}
				this.xm_id = row.xm_id
				this.modeType = 3;
				this.showXmModel = true
			},
			editXmModel(row) {
				this.xmForm = {
					xmmc: row.xmmc,
					xmfzr: row.xmfzr,
					lxdh: row.lxdh,
					xmjj: row.xmjj,
					cjsj: row.cjsj ? new Date(row.cjsj) : '',
				}
				this.xm_id = row.xm_id
				this.modeType = 2;
				this.showXmModel = true
			},
			xmModelChange(status) {
				if(!status) {
					this.xmForm = {
						xmmc: '',
						xmfzr: '',
						lxdh: '',
						xmjj: '',
						cjsj: ''
					}
				}
			},
			async removeXm(row) {
				let { status_code } = await api.deleteProjectItem(row.xm_id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getXmList()
			},
			async saveXm() {
				let params = {
					...this.xmForm,
					cjsj: this.xmForm.cjsj ? getDate(new Date(this.xmForm.cjsj).getTime(), 'date') : '',
				}
				if(this.modeType == 2) {
					params.xm_id = this.xm_id
				}
				let { status_code, message } = await api.addProjectItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showXmModel = false
					this.getXmList()
				}
			},
			openHistoryModel(row) {
				this.showHistoryModel = true
			},
			openFxyList(row) {
				this.xmItem = row;
				this.getFxyList()
				this.showListModel = true
			},
			handleChangeFxyPage(val) {
				this.fxyPage.pageIndex = val
				this.getFxyList()
			},
			handleChangeFxyPageSize(val) {
				this.fxyPage.pageSize = val
				this.getFxyList()
			},
			async getFxyList() {
				this.fxyLoading = true
				let params = {
					...this.searchFxyForm,
					fxylb: this.searchFxyForm.fxylb[0] ? this.searchFxyForm.fxylb[this.searchFxyForm.fxylb.length - 1] : '',
					xm_id: this.xmItem.xm_id,
					per_page: this.fxyPage.pageSize,
					page: this.fxyPage.pageIndex,
				}
				let { status_code, data } = await api.getFxyList(params)
				if(status_code == 200) {
					this.fxyData = data.data
					this.fxyPage.totalRow = data.total
				}
				this.fxyLoading = false
			},
			openFxyModel() {
				this.modeType = 1;
				this.showFxyModel = true
			},
			viewFxyModel(row) {
				this.fxyForm = {
					fxymc: row.fxymc,
					dz: row.dz,
					quyu_id: row.quyu_id ? [row.quyu_id] : [],
					fxz: row.fxz ? Number(row.fxz) : 0,
					fxdj: row.fxdj,
					fxylb: row.fxylb ? [row.fxylb] : [],
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(6)} ${(row.wd - 0).toFixed(6)}` : ''
				}
				this.gkdx_id = row.gkdx_id
				this.modeType = 3;
				this.showFxyModel = true
			},
			editFxyModel(row) {
				this.fxyForm = {
					fxymc: row.fxymc,
					dz: row.dz,
					quyu_id: row.quyu_id ? [row.quyu_id] : [],
					fxz: row.fxz ? Number(row.fxz) : 0,
					fxdj: row.fxdj,
					fxylb: row.fxylb ? [row.fxylb] : [],
					lngAndLat: row.jd && row.wd ? `${(row.jd - 0).toFixed(6)} ${(row.wd - 0).toFixed(6)}` : ''
				}
				this.gkdx_id = row.gkdx_id
				this.modeType = 2;
				this.showFxyModel = true
			},
			fxyModelChange(status) {
				if(!status) {
					this.fxyForm = {
						fxymc: '',
						dz: '',
						quyu_id: [],
						fxz: 0,
						fxdj: '',
						fxylb: [],
						lngAndLat: ''
					}
				}
			},
			async removeFxy(row) {
				let { status_code } = await api.deleteFxyItem(row.gkdx_id)
				status_code == 200 && this.$Message.success('删除成功')
				this.getFxyList()
			},
			async saveFxy() {
				let params = {
					...this.fxyForm,
					fxylb: this.fxyForm.fxylb[0] ? this.fxyForm.fxylb[this.fxyForm.fxylb.length - 1] : '',
					quyu_id: this.fxyForm.quyu_id[this.fxyForm.quyu_id.length - 1],
					jd: this.fxyForm.lngAndLat.split(' ')[0],
					wd: this.fxyForm.lngAndLat.split(' ')[1],
					xm_id: this.xmItem.xm_id
				}
				if(this.modeType == 2) {
					params.gkdx_id = this.gkdx_id
				}
				delete params.lngAndLat
				let { status_code, message } = await api.addFxyItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.showFxyModel = false
					this.getFxyList()
				}
			},
			getFxdj(val) {
				let item_ = this.fxdjList.find(item => {
					return item.name == val
				})
				return item_ ? item_.value : 'transparent'
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
	        	let list = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
	        	if(list.includes(file.type)) {
	        		this.files = [file]
	        	}else {
	        		this.$Message.error('请选择excel文件')
	        	}
	        	return false
	        },
	        handleRemoveFile(index) {
	        	this.files.splice(index, 1);
	        },
	        async uploadFiles() {
	        	let params = new FormData();
				params.append("xls_file", this.files[0]);
				params.append("fxylb", this.fxylb.join(','));
				params.append("xm_id", this.xmItem.xm_id);
	        	let { status_code, message } = await api.importFxyItem(params);
				if(status_code == 200) {
					this.$Message.success(message)
					this.getFxyList()
				}
	        },
	        async exportExcel() {
	        	let params = {
					...this.searchFxyForm,
					act: 'export',
					fxylb: this.searchFxyForm.fxylb.join(','),
					xm_id: this.xmItem.xm_id,
					per_page: this.fxyPage.pageSize,
					page: this.fxyPage.pageIndex,
				}
				let { status_code, url } = await api.getFxyList(params)
				if(status_code == 200) {
					location.href = process.env.VUE_APP_API + url
				}
	        },
	        excelModelChange(status) {
				if(!status) {
					this.fxylb = []
					this.files = []
					this.xmItem = null
				}
			},
		},
		created() {
			this.getXmList()
			this.getArea('', list => {
				this.areaList = list
			})
			this.getFxylbList('', list => {
				this.fxylbList = list
			})
		},
		mounted() {
			// window.addEventListener('resize', () => {
			// 	console.log(this.$refs.xmTable.$el.offsetWidth)
			// 	let offsetWidth =  this.$refs.xmTable.$el.offsetWidth
			// 	let width = 0;
			// 	this.xmColumns.forEach(item => {
			// 		width += (item.width || item.minWidth || 100)
			// 	})
			// 	if(offsetWidth < width) {
			// 		this.xmColumns[0].fixed = 'left'
			// 		this.xmColumns[this.xmColumns.length - 1].fixed = 'right'
			// 	}else {
			// 		delete this.xmColumns[0].fixed
			// 		delete this.xmColumns[this.xmColumns.length - 1].fixed
			// 	}
			// })
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		
	}
</style>